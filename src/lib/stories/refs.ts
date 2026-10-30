// The written story of a race or class, as the race and class pages' banners show it
// (StoryBanner.astro, ClassStoryBanner.astro) and as the app's data files carry it
// (`story` on each race in /data/v1/races.json and each class in classes.json), so the
// app's race and class screens can show the same banner and open the story.
import { LANGS, type Lang } from '../../config';
import { CLASS_STORIES } from '../../i18n/class-stories';
import {
  DWARF_STORY,
  GNOME_STORY,
  HUMAN_STORY,
  NIGHT_ELF_STORY,
  ORC_STORY,
  SKYBORNE_STORY,
  TAUREN_STORY,
  TROLL_STORY,
  UNDEAD_STORY,
} from '../../i18n/stories';
import { storyClass } from './classes';
import { storyRace } from './races';

/** Copy of each written race story, by slug. */
export const RACE_STORIES = {
  gnome: GNOME_STORY,
  dwarf: DWARF_STORY,
  human: HUMAN_STORY,
  'night-elf': NIGHT_ELF_STORY,
  orc: ORC_STORY,
  troll: TROLL_STORY,
  tauren: TAUREN_STORY,
  undead: UNDEAD_STORY,
  skyborne: SKYBORNE_STORY,
} as const;

export interface StoryRef {
  /** Page slug: race stories at /<lang>/stories/<slug>/, class stories at /<lang>/classes/<slug>/ (the old
   * /<lang>/stories/<class>/ URLs redirect there). */
  slug: string;
  /** Cover art, site-relative (/stories/…), or null when the story has none yet. */
  cover: string | null;
  /** Banner text, one per language. */
  lead: Record<Lang, string>;
}

const leads = (story: Record<Lang, { lead: string }> | undefined) =>
  story ? (Object.fromEntries(LANGS.map((l) => [l, story[l].lead])) as Record<Lang, string>) : undefined;

/** The written story of a race id, or null. */
export function raceStoryRef(raceId: string): StoryRef | null {
  const entry = storyRace(raceId);
  const lead = entry?.slug ? leads(RACE_STORIES[entry.slug as keyof typeof RACE_STORIES]) : undefined;
  return entry?.slug && lead ? { slug: entry.slug, cover: entry.cover?.src ?? null, lead } : null;
}

/** The written story of a class id, or null. */
export function classStoryRef(classId: string): StoryRef | null {
  const entry = storyClass(classId);
  const lead = entry?.slug ? leads(CLASS_STORIES[entry.slug]) : undefined;
  return entry?.slug && lead ? { slug: entry.slug, cover: entry.cover?.src ?? null, lead } : null;
}
