// npm run check-updates               → prints NO_UPDATES or UPDATES_FOUND
// npm run check-updates -- --mark-seen → records the current newest build/post in src/data/state.json
//
// Deterministic answer to "is there anything new since the last post?" for the
// scheduled job. Compares wclbox's build list and Blizzard blue posts, plus the
// official dev notes topic, against src/data/state.json.
//
// NO_UPDATES: nothing is written anywhere.
// UPDATES_FOUND: details (new builds with per-class/race changes, official post
// texts) go to .cache/updates.json (gitignored) for the writer to read.
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fetchJson } from './lib/http';
import { DEV_NOTES_TOPIC_ID, forumPostJson, forumTopicJson, wclboxDataBase, BLIZZARD_FORUM } from './lib/sources';
import {
  diffUpdates,
  groupByBuild,
  stateFromDate,
  nextState,
  type DevNotesTopic,
  type UpdateState,
  type WclBluePost,
  type WclBuild,
} from './lib/updates';

const ROOT = process.cwd();
const STATE_FILE = path.join(ROOT, 'src/data/state.json');
const OUT_FILE = path.join(ROOT, '.cache/updates.json');
const markSeen = process.argv.includes('--mark-seen');
// Test mode: pretend the last published build is <id> (e.g. 1.60.1.70374) so a
// real, already-published update shows up as new. Never touches state.json.
const sinceIdx = process.argv.indexOf('--since');
const since = sinceIdx > 0 ? process.argv[sinceIdx + 1] : undefined;
if (since && markSeen) {
  console.error('ERROR --since (test mode) cannot be combined with --mark-seen');
  process.exit(2);
}
// Backfill: --from YYYY-MM-DD lists every build and blue post on or after that
// date (one group per build) so older notes can be published too. Builds that
// already have a post (frontmatter `build:`) are marked and skipped.
const fromIdx = process.argv.indexOf('--from');
const from = fromIdx > 0 ? process.argv[fromIdx + 1] : undefined;
if (from && (!/^\d{4}-\d{2}-\d{2}$/.test(from) || since || markSeen)) {
  console.error('ERROR --from needs YYYY-MM-DD and cannot be combined with --since or --mark-seen');
  process.exit(2);
}

async function publishedBuilds(): Promise<Set<string>> {
  const dir = path.join(ROOT, 'src/content/blog/tr');
  const out = new Set<string>();
  for (const f of await readdir(dir).catch(() => [] as string[])) {
    const m = (await readFile(path.join(dir, f), 'utf8')).match(/^build:\s*"?([\d.]+)"?\s*$/m);
    if (m) out.add(m[1]);
  }
  return out;
}

async function readState(): Promise<UpdateState> {
  try {
    return JSON.parse(await readFile(STATE_FILE, 'utf8')) as UpdateState;
  } catch {
    return { lastBuild: null, lastBluePostAt: null, devNotesLastPostedAt: null };
  }
}

async function devNotesTopic(): Promise<DevNotesTopic | null> {
  try {
    const t = await fetchJson<{ title: string; last_posted_at: string; slug: string }>(
      forumTopicJson(DEV_NOTES_TOPIC_ID),
    );
    return { title: t.title, lastPostedAt: t.last_posted_at, url: `${BLIZZARD_FORUM}/t/${t.slug}/${DEV_NOTES_TOPIC_ID}` };
  } catch (err) {
    console.error(`warn: dev notes topic unavailable: ${(err as Error).message}`);
    return null;
  }
}

// Official text of a blue post (Discourse "cooked" HTML → plain text).
async function officialText(postId: number): Promise<string | null> {
  try {
    const p = await fetchJson<{ cooked: string }>(forumPostJson(postId));
    return p.cooked
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|li|h\d)>/gi, '\n')
      .replace(/<li>/gi, '- ')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;|&rsquo;/g, '’')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  } catch (err) {
    console.error(`warn: post ${postId} unavailable: ${(err as Error).message}`);
    return null;
  }
}

try {
  const dataBase = await wclboxDataBase(); // no cache: always live
  const { builds, bluePosts } = await fetchJson<{ builds: WclBuild[]; bluePosts: WclBluePost[] }>(
    `${dataBase}buding.json`,
  );
  const devNotes = await devNotesTopic();
  let state = await readState();
  if (since) {
    const base = builds.find((b) => b.id === since);
    if (!base) {
      console.error(`ERROR --since ${since}: unknown build (known: ${builds.map((b) => b.id).join(', ')})`);
      process.exit(2);
    }
    // everything after that build's day counts as new
    state = { lastBuild: since, lastBluePostAt: `${base.date}T23:59:59.999Z`, devNotesLastPostedAt: null };
    console.log(`TEST MODE: state treated as lastBuild=${since}; src/data/state.json is not used or changed`);
  }
  if (from) {
    state = stateFromDate(from, builds);
    console.log(`BACKFILL MODE: everything on or after ${from}; src/data/state.json is not read`);
  }

  if (markSeen) {
    const next = nextState(state, builds, bluePosts, devNotes, new Date());
    await mkdir(path.dirname(STATE_FILE), { recursive: true });
    await writeFile(STATE_FILE, JSON.stringify(next, null, 2) + '\n');
    console.log(`STATE_UPDATED lastBuild=${next.lastBuild} lastBluePostAt=${next.lastBluePostAt}`);
    process.exit(0);
  }

  const diff = diffUpdates(state, builds, bluePosts, devNotes);
  if (!diff.hasUpdates) {
    console.log('NO_UPDATES');
    if (diff.maintenanceOnly) console.log(`(only maintenance posts: ${diff.newPosts.map((p) => p.topic).join('; ')})`);
    process.exit(0);
  }

  const published = await publishedBuilds();
  const groups = groupByBuild(diff.newBuilds, diff.newPosts).map((g) => ({
    ...g,
    alreadyPublished: !!g.build && published.has(g.build.id),
  }));
  const todo = groups.filter((g) => !g.alreadyPublished);
  if (!todo.length) {
    console.log('NO_UPDATES');
    console.log(`(every build in range already has a post: ${groups.map((g) => g.build?.id).join(', ')})`);
    process.exit(0);
  }

  // official Blizzard text only for the groups that still need a post
  const official = new Map<number, string | null>();
  for (const g of todo) for (const p of g.posts) official.set(p.id, await officialText(p.id));
  const withText = (p: WclBluePost) => ({ ...p, official: official.get(p.id) ?? null });
  const report = {
    generatedAt: new Date().toISOString(),
    mode: from ? `backfill from ${from}` : since ? `test since ${since}` : 'daily',
    state,
    // one blog post (TR + EN) per group, dated with group.date
    groups: groups.map((g) => ({ ...g, posts: g.posts.map(withText) })),
    newBuilds: diff.newBuilds,
    newPosts: diff.newPosts.map(withText),
    devNotes: diff.devNotesChanged ? devNotes : null,
  };
  await mkdir(path.dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(report, null, 2) + '\n');

  console.log('UPDATES_FOUND');
  for (const g of groups) {
    const head = g.build ? `build ${g.build.id} (${g.date})` : `posts before the first new build (${g.date})`;
    console.log(`${head}${g.alreadyPublished ? ' — already published, skip' : ` → post wow-forever-${g.date}`}`);
    for (const p of g.posts) console.log(`  post ${p.date} ${p.topic} — ${p.url}`);
  }
  if (diff.devNotesChanged && devNotes) console.log(`dev notes: ${devNotes.title}`);
  console.log(`details: ${path.relative(ROOT, OUT_FILE)}`);
} catch (err) {
  console.error(`ERROR ${(err as Error).message}`);
  process.exit(2);
}
