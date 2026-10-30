import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { LANGS } from '../src/config';
import classes from '../src/data/classes.json';
import races from '../src/data/races.json';
import { STORY_CLASSES } from '../src/lib/stories/classes';
import { STORY_RACES } from '../src/lib/stories/races';
import { classStoryRef, raceStoryRef, type StoryRef } from '../src/lib/stories/refs';

const root = fileURLToPath(new URL('..', import.meta.url));

// what the app's race and class screens need from `story` in /data/v1/races.json and classes.json
const expectComplete = (ref: StoryRef | null, slug: string | undefined) => {
  expect(ref?.slug).toBe(slug);
  for (const l of LANGS) expect(ref?.lead[l], `${slug} ${l}`).toBeTruthy();
  if (ref?.cover) expect(existsSync(join(root, 'public', ref.cover)), ref.cover).toBe(true);
  // race stories live in races/, class stories in classes/ (src/lib/stories/urls.ts)
  const page = (dir: string) => existsSync(join(root, 'src/pages/[lang]', dir, `${slug}.astro`));
  expect(page('races') || page('classes'), slug).toBe(true);
};

describe('story refs for the app data', () => {
  it('gives every race id of a written story its slug, lead and cover', () => {
    for (const story of STORY_RACES.filter((r) => r.slug)) {
      for (const id of story.ids ?? [story.id]) expectComplete(raceStoryRef(id), story.slug);
    }
  });

  it('gives every class with a written story its slug and lead', () => {
    for (const story of STORY_CLASSES.filter((c) => c.slug)) expectComplete(classStoryRef(story.id), story.slug);
  });

  it('is null for races and classes without a story', () => {
    expect(raceStoryRef('no-such-race')).toBeNull();
    expect(classStoryRef('no-such-class')).toBeNull();
    const told = new Set(STORY_RACES.filter((r) => r.slug).flatMap((r) => r.ids ?? [r.id]));
    for (const race of races) if (!told.has(race.id)) expect(raceStoryRef(race.id), race.id).toBeNull();
    for (const cls of classes) expect(classStoryRef(cls.id) === null, cls.id).toBe(!STORY_CLASSES.some((c) => c.id === cls.id && c.slug));
  });
});
