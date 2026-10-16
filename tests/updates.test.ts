import { describe, expect, it } from 'vitest';
import {
  diffUpdates,
  groupByBuild,
  nextState,
  stateFromDate,
  type UpdateState,
  type WclBluePost,
  type WclBuild,
} from '../scripts/lib/updates';

const builds: WclBuild[] = [
  { id: '1.60.1.70425', date: '2026-10-15' },
  { id: '1.60.1.70374', date: '2026-10-14' },
  { id: '1.60.1.70338', date: '2026-10-10' },
];
const posts: WclBluePost[] = [
  { id: 3, date: '2026-10-16T01:06:44.414Z', topic: 'October 15 Maintenance complete: updated to 70425', url: 'u3' },
  { id: 2, date: '2026-10-16T00:15:23.135Z', topic: 'October 15 Development Instructions', url: 'u2' },
  { id: 1, date: '2026-10-14T20:00:00.000Z', topic: 'Known Issues', url: 'u1' },
];
const caughtUp: UpdateState = {
  lastBuild: '1.60.1.70425',
  lastBluePostAt: '2026-10-16T01:06:44.414Z',
  devNotesLastPostedAt: '2026-10-16T00:15:23.135Z',
};

describe('diffUpdates', () => {
  it('reports nothing when the state is caught up', () => {
    const d = diffUpdates(caughtUp, builds, posts, {
      title: 'Dev notes',
      lastPostedAt: '2026-10-16T00:15:23.135Z',
      url: 'x',
    });
    expect(d.hasUpdates).toBe(false);
    expect(d.newBuilds).toEqual([]);
    expect(d.newPosts).toEqual([]);
  });

  it('finds builds and posts newer than the state, oldest first', () => {
    const d = diffUpdates(
      { lastBuild: '1.60.1.70374', lastBluePostAt: '2026-10-14T20:00:00.000Z', devNotesLastPostedAt: null },
      builds,
      posts,
    );
    expect(d.hasUpdates).toBe(true);
    expect(d.newBuilds.map((b) => b.id)).toEqual(['1.60.1.70425']);
    expect(d.newPosts.map((p) => p.id)).toEqual([2, 3]);
  });

  it('catches up after a missed day (several builds at once)', () => {
    const d = diffUpdates({ ...caughtUp, lastBuild: '1.60.1.70338' }, builds, []);
    expect(d.newBuilds.map((b) => b.id)).toEqual(['1.60.1.70374', '1.60.1.70425']);
  });

  it('treats maintenance-only days as no update', () => {
    const d = diffUpdates({ ...caughtUp, lastBluePostAt: '2026-10-16T00:15:23.135Z' }, builds, posts);
    expect(d.maintenanceOnly).toBe(true);
    expect(d.hasUpdates).toBe(false);
  });

  it('flags an edited dev notes topic even without new posts', () => {
    const d = diffUpdates(caughtUp, builds, posts, {
      title: 'Updated October 17',
      lastPostedAt: '2026-10-17T10:00:00.000Z',
      url: 'x',
    });
    expect(d.devNotesChanged).toBe(true);
    expect(d.hasUpdates).toBe(true);
  });
});

describe('backfill', () => {
  it('stateFromDate treats everything on or after the date as unpublished', () => {
    const s = stateFromDate('2026-10-14', builds);
    expect(s.lastBuild).toBe('1.60.1.70338');
    const d = diffUpdates(s, builds, posts);
    expect(d.newBuilds.map((b) => b.id)).toEqual(['1.60.1.70374', '1.60.1.70425']);
    expect(d.newPosts.map((p) => p.id)).toEqual([1, 2, 3]);
  });

  it('groupByBuild gives each post to the latest build released by its day', () => {
    const d = diffUpdates(stateFromDate('2026-10-14', builds), builds, posts);
    const g = groupByBuild(d.newBuilds, d.newPosts);
    expect(g.map((x) => [x.build?.id, x.date, x.posts.map((p) => p.id)])).toEqual([
      ['1.60.1.70374', '2026-10-14', [1]],
      ['1.60.1.70425', '2026-10-15', [2, 3]],
    ]);
  });

  it('keeps posts older than every new build in their own group', () => {
    const g = groupByBuild([builds[0]], [posts[2]]);
    expect(g[0]).toMatchObject({ build: null, date: '2026-10-14' });
  });
});

describe('nextState', () => {
  it('moves the watermarks to the newest build and post', () => {
    const s = nextState(
      { lastBuild: '1.60.1.70338', lastBluePostAt: null, devNotesLastPostedAt: null },
      builds,
      posts,
      { title: 't', lastPostedAt: '2026-10-16T00:15:23.135Z', url: 'x' },
      new Date('2026-10-16T09:00:00Z'),
    );
    expect(s).toMatchObject(caughtUp);
    expect(diffUpdates(s, builds, posts).hasUpdates).toBe(false);
  });
});
