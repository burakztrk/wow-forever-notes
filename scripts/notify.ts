// Push notification for new posts (run by .github/workflows/notify.yml).
//
//   tsx scripts/notify.ts --before <sha> --after <sha> [--dry-run] [--wait-minutes 15]
//
// Finds blog files added between the two commits, waits until each post is in
// the deployed /data/v1/posts.json (so the link in the notification works),
// then sends one FCM topic message to notes-<lang> for the newest new post
// of each language (a backfill of several posts sends one per language). The service
// account comes from FCM_SERVICE_ACCOUNT_JSON; without it nothing is sent and
// the run still succeeds. The secret is never printed.
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import {
  SITE,
  addedPosts,
  buildMessage,
  newestPerLang,
  oauthAssertion,
  parseServiceAccount,
  readFrontmatter,
  type NewPost,
} from './lib/notify';

const USER_AGENT = 'wow-forever-notes-notify/0.1 (+https://github.com/burakztrk/wow-forever-notes)';

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
}

const before = arg('--before');
const after = arg('--after') ?? 'HEAD';
const dryRun = process.argv.includes('--dry-run');
const waitMinutes = Number(arg('--wait-minutes') ?? 15);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function waitForDeploy(posts: NewPost[]): Promise<NewPost[]> {
  const want = new Set(posts.map((p) => `${p.lang}/${p.slug}`));
  const deadline = Date.now() + waitMinutes * 60_000;
  for (;;) {
    try {
      const res = await fetch(`${SITE}/data/v1/posts.json?t=${Date.now()}`, { headers: { 'user-agent': USER_AGENT } });
      if (res.ok) {
        const ids = new Set(((await res.json()) as { posts: { id: string }[] }).posts.map((p) => p.id));
        const live = posts.filter((p) => ids.has(`${p.lang}/${p.slug}`));
        if (live.length === want.size || Date.now() > deadline) return live;
      }
    } catch {
      // retry until the deadline
    }
    if (Date.now() > deadline) return [];
    await sleep(30_000);
  }
}

async function accessToken(saJson: string): Promise<{ token: string; projectId: string }> {
  const sa = parseServiceAccount(saJson);
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: oauthAssertion(sa),
    }),
  });
  if (!res.ok) throw new Error(`OAuth token request failed: HTTP ${res.status}`);
  const { access_token } = (await res.json()) as { access_token: string };
  return { token: access_token, projectId: sa.project_id };
}

async function main() {
  if (!before || /^0+$/.test(before)) {
    console.log('notify: no previous commit to compare with, nothing to do');
    return;
  }
  const diff = execFileSync('git', ['diff', '--name-only', '--diff-filter=A', before, after, '--', 'src/content/blog'], {
    encoding: 'utf8',
  });
  const added = addedPosts(diff.split('\n'));
  const candidates: { lang: NewPost['lang']; slug: string; fm: ReturnType<typeof readFrontmatter> }[] = [];
  for (const post of added) {
    const fm = readFrontmatter(await readFile(`src/content/blog/${post.lang}/${post.slug}.md`, 'utf8'));
    if (fm.draft) console.log(`notify: ${post.lang}/${post.slug} is a draft, skipped`);
    else candidates.push({ ...post, fm });
  }
  const posts = newestPerLang(candidates).map(({ fm, ...post }) => ({ post, fm }));
  if (posts.length === 0) {
    console.log('notify: no new posts');
    return;
  }

  const saJson = process.env.FCM_SERVICE_ACCOUNT_JSON?.trim();
  if (dryRun || !saJson) {
    if (!saJson && !dryRun) console.log('notify: FCM_SERVICE_ACCOUNT_JSON is not set, nothing sent');
    for (const { post, fm } of posts) console.log(JSON.stringify(buildMessage(post, fm)));
    return;
  }

  const live = new Set((await waitForDeploy(posts.map((p) => p.post))).map((p) => `${p.lang}/${p.slug}`));
  const { token, projectId } = await accessToken(saJson);
  let failed = 0;
  for (const { post, fm } of posts) {
    const id = `${post.lang}/${post.slug}`;
    if (!live.has(id)) {
      console.log(`notify: ${id} is not deployed after ${waitMinutes} min, skipped`);
      failed++;
      continue;
    }
    const res = await fetch(`https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`, {
      method: 'POST',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify(buildMessage(post, fm)),
    });
    if (res.ok) console.log(`notify: sent ${id}`);
    else {
      console.log(`notify: ${id} failed: HTTP ${res.status} ${await res.text()}`);
      failed++;
    }
  }
  if (failed) process.exitCode = 1;
}

main().catch((err) => {
  console.error(`notify: ${(err as Error).message}`);
  process.exit(1);
});
