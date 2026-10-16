// Pure "is there anything new?" logic for check-updates, kept separate from
// network code so it can be tested with fixtures.

export interface UpdateState {
  lastBuild: string | null; // e.g. "1.60.1.70425"
  lastBluePostAt: string | null; // ISO timestamp of the newest blue post already covered
  devNotesLastPostedAt: string | null; // Discourse last_posted_at of the dev notes topic
  updatedAt?: string;
}

export interface WclBuild {
  id: string;
  date: string;
  version?: string;
  notes?: string[];
  said?: { news?: number[]; dev?: number[] };
  [key: string]: unknown;
}

export interface WclBluePost {
  id: number;
  date: string;
  role?: string;
  topic: string;
  text?: string;
  url: string;
  reply?: boolean;
}

export interface DevNotesTopic {
  title: string;
  lastPostedAt: string;
  url: string;
}

export interface UpdateDiff {
  newBuilds: WclBuild[];
  newPosts: WclBluePost[];
  devNotesChanged: boolean;
  // only realm maintenance posts are new: not worth a post on their own
  maintenanceOnly: boolean;
  hasUpdates: boolean;
}

const MAINTENANCE = /maintenance/i;

export function buildNumber(id: string | null | undefined): number {
  const last = (id ?? '').split('.').pop();
  const n = Number(last);
  return Number.isFinite(n) ? n : -1;
}

export function diffUpdates(
  state: UpdateState,
  builds: WclBuild[],
  posts: WclBluePost[],
  devNotes?: DevNotesTopic | null,
): UpdateDiff {
  const lastBuild = buildNumber(state.lastBuild);
  const newBuilds = builds
    .filter((b) => buildNumber(b.id) > lastBuild)
    .sort((a, b) => buildNumber(a.id) - buildNumber(b.id));

  const since = state.lastBluePostAt ? Date.parse(state.lastBluePostAt) : -Infinity;
  const newPosts = posts.filter((p) => Date.parse(p.date) > since).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

  const devNotesChanged =
    !!devNotes &&
    !!state.devNotesLastPostedAt &&
    Date.parse(devNotes.lastPostedAt) > Date.parse(state.devNotesLastPostedAt);

  const maintenanceOnly =
    newBuilds.length === 0 && !devNotesChanged && newPosts.length > 0 && newPosts.every((p) => MAINTENANCE.test(p.topic));

  const hasUpdates = (newBuilds.length > 0 || newPosts.length > 0 || devNotesChanged) && !maintenanceOnly;
  return { newBuilds, newPosts, devNotesChanged, maintenanceOnly, hasUpdates };
}

// Backfill: a virtual state in which nothing on or after `from` (YYYY-MM-DD)
// has been published yet.
export function stateFromDate(from: string, builds: WclBuild[]): UpdateState {
  const before = builds
    .filter((b) => b.date < from)
    .sort((a, b) => buildNumber(b.id) - buildNumber(a.id))[0];
  return {
    lastBuild: before?.id ?? null,
    lastBluePostAt: new Date(Date.parse(`${from}T00:00:00.000Z`) - 1).toISOString(),
    devNotesLastPostedAt: null,
  };
}

export interface UpdateGroup {
  build: WclBuild | null; // null: posts that came before the first new build
  date: string; // YYYY-MM-DD the post is dated with (the build's date)
  posts: WclBluePost[];
}

// One blog post per build: each blue post goes to the latest new build released
// on or before its day. Posts older than every new build form their own group.
export function groupByBuild(newBuilds: WclBuild[], newPosts: WclBluePost[]): UpdateGroup[] {
  const builds = [...newBuilds].sort((a, b) => buildNumber(a.id) - buildNumber(b.id));
  const groups: UpdateGroup[] = builds.map((b) => ({ build: b, date: b.date, posts: [] }));
  const orphans: WclBluePost[] = [];
  for (const p of newPosts) {
    const day = p.date.slice(0, 10);
    const owner = [...groups].reverse().find((g) => g.date <= day);
    (owner ? owner.posts : orphans).push(p);
  }
  if (orphans.length) {
    const last = orphans.map((p) => p.date.slice(0, 10)).sort().at(-1)!;
    groups.unshift({ build: null, date: last, posts: orphans });
  }
  return groups;
}

// State after the found updates have been published.
export function nextState(
  state: UpdateState,
  builds: WclBuild[],
  posts: WclBluePost[],
  devNotes: DevNotesTopic | null | undefined,
  now: Date,
): UpdateState {
  const newestBuild = [...builds].sort((a, b) => buildNumber(b.id) - buildNumber(a.id))[0];
  const newestPost = [...posts].sort((a, b) => Date.parse(b.date) - Date.parse(a.date))[0];
  const keepNewer = (a: string | null, b: string | undefined) =>
    !b ? a : !a || Date.parse(b) > Date.parse(a) ? b : a;
  return {
    lastBuild:
      newestBuild && buildNumber(newestBuild.id) > buildNumber(state.lastBuild) ? newestBuild.id : state.lastBuild,
    lastBluePostAt: keepNewer(state.lastBluePostAt, newestPost?.date),
    devNotesLastPostedAt: keepNewer(state.devNotesLastPostedAt, devNotes?.lastPostedAt),
    updatedAt: now.toISOString(),
  };
}
