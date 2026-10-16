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
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fetchJson } from './lib/http';
import { DEV_NOTES_TOPIC_ID, forumPostJson, forumTopicJson, wclboxDataBase, BLIZZARD_FORUM } from './lib/sources';
import {
  diffUpdates,
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
  const state = await readState();

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

  const posts = [];
  for (const p of diff.newPosts) posts.push({ ...p, official: await officialText(p.id) });
  const report = {
    generatedAt: new Date().toISOString(),
    state,
    newBuilds: diff.newBuilds,
    newPosts: posts,
    devNotes: diff.devNotesChanged ? devNotes : null,
  };
  await mkdir(path.dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(report, null, 2) + '\n');

  console.log('UPDATES_FOUND');
  for (const b of diff.newBuilds) console.log(`build ${b.id} (${b.date})`);
  for (const p of diff.newPosts) console.log(`post ${p.date} ${p.topic} — ${p.url}`);
  if (diff.devNotesChanged && devNotes) console.log(`dev notes: ${devNotes.title}`);
  console.log(`details: ${path.relative(ROOT, OUT_FILE)}`);
} catch (err) {
  console.error(`ERROR ${(err as Error).message}`);
  process.exit(2);
}
