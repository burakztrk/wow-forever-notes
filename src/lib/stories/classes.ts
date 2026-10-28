// Classes shown in the story pages' class strip, in order. `slug` marks a written
// story (src/pages/[lang]/stories/<slug>.astro); `id` matches src/data/classes.json.
export interface StoryClass {
  id: string;
  name: string;
  slug?: string;
  icon: string;
  color: string;
  /** Cover art for the story banner on class pages and index */
  cover?: { src: string; position: string };
}

export const STORY_CLASSES: StoryClass[] = [
  { id: 'mage', name: 'Mage', slug: 'mage', icon: 'classicon_mage', color: 'var(--class-mage)' },
  { id: 'hunter', name: 'Hunter', slug: 'hunter', icon: 'classicon_hunter', color: 'var(--class-hunter)' },
  { id: 'paladin', name: 'Paladin', slug: 'paladin', icon: 'classicon_paladin', color: 'var(--class-paladin)' },
  { id: 'warrior', name: 'Warrior', slug: 'warrior', icon: 'classicon_warrior', color: 'var(--class-warrior)' },
  { id: 'rogue', name: 'Rogue', slug: 'rogue', icon: 'classicon_rogue', color: 'var(--class-rogue)' },
  { id: 'priest', name: 'Priest', slug: 'priest', icon: 'classicon_priest', color: 'var(--class-priest)' },
  { id: 'shaman', name: 'Shaman', slug: 'shaman', icon: 'classicon_shaman', color: 'var(--class-shaman)' },
  { id: 'warlock', name: 'Warlock', slug: 'warlock', icon: 'classicon_warlock', color: 'var(--class-warlock)' },
  { id: 'druid', name: 'Druid', slug: 'druid', icon: 'classicon_druid', color: 'var(--class-druid)' },
];

/** The story entry for a class id, if its story is written. */
export const storyClass = (classId: string) => STORY_CLASSES.find((c) => c.id === classId && c.slug);

/** Story slug for a class id, if its story is written. */
export const storyClassSlug = (classId: string) => STORY_CLASSES.find((c) => c.id === classId)?.slug;
