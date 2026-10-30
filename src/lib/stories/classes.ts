// Classes shown in the story pages' class strip, in order. `slug` marks a written
// story (src/pages/[lang]/classes/<slug>.astro, URL from src/lib/stories/urls.ts); `id` matches src/data/classes.json.
export interface StoryClass {
  id: string;
  name: string;
  slug?: string;
  icon: string;
  color: string;
  /** Cover art: the story's hero and the banner on the class page (`src` under public/, CSS `position` of the crop; `mobilePosition` on narrow screens, where the text covers the lower half; `cardPosition` in the carousel card on the stories index). */
  cover?: { src: string; w: number; h: number; position: string; mobilePosition?: string; cardPosition?: string };
}

export const STORY_CLASSES: StoryClass[] = [
  { id: 'mage', name: 'Mage', slug: 'mage', icon: 'classicon_mage', color: 'var(--class-mage)', cover: { src: '/stories/class/mage.webp', w: 1024, h: 577, position: '30% 45%', cardPosition: '30% 64%' } },
  { id: 'hunter', name: 'Hunter', slug: 'hunter', icon: 'classicon_hunter', color: 'var(--class-hunter)', cover: { src: '/stories/class/hunter.webp', w: 1200, h: 896, position: '30% 45%', cardPosition: '30% 78%' } },
  { id: 'paladin', name: 'Paladin', slug: 'paladin', icon: 'classicon_paladin', color: 'var(--class-paladin)', cover: { src: '/stories/class/paladin.webp', w: 1200, h: 896, position: '30% 28%', mobilePosition: '30% 34%', cardPosition: '30% 36%' } },
  { id: 'warrior', name: 'Warrior', slug: 'warrior', icon: 'classicon_warrior', color: 'var(--class-warrior)', cover: { src: '/stories/class/warrior.webp', w: 1200, h: 896, position: '30% 45%', cardPosition: '30% 53%' } },
  { id: 'rogue', name: 'Rogue', slug: 'rogue', icon: 'classicon_rogue', color: 'var(--class-rogue)', cover: { src: '/stories/class/rogue.webp', w: 1200, h: 896, position: '30% 20%', mobilePosition: '30% 20%', cardPosition: '30% 21%' } },
  { id: 'priest', name: 'Priest', slug: 'priest', icon: 'classicon_priest', color: 'var(--class-priest)', cover: { src: '/stories/class/priest.webp', w: 1200, h: 702, position: '30% 45%', cardPosition: '30% 39%' } },
  { id: 'shaman', name: 'Shaman', slug: 'shaman', icon: 'classicon_shaman', color: 'var(--class-shaman)', cover: { src: '/stories/class/shaman.webp', w: 1200, h: 896, position: '30% 21%', mobilePosition: '30% 21%', cardPosition: '30% 21%' } },
  { id: 'warlock', name: 'Warlock', slug: 'warlock', icon: 'classicon_warlock', color: 'var(--class-warlock)', cover: { src: '/stories/class/warlock.webp', w: 1200, h: 896, position: '30% 45%', cardPosition: '30% 63%' } },
  { id: 'druid', name: 'Druid', slug: 'druid', icon: 'classicon_druid', color: 'var(--class-druid)', cover: { src: '/stories/class/druid.webp', w: 1200, h: 896, position: '30% 28%', mobilePosition: '30% 31%', cardPosition: '30% 33%' } },
];

/** The story entry for a class id, if its story is written. */
export const storyClass = (classId: string) => STORY_CLASSES.find((c) => c.id === classId && c.slug);

/** Story slug for a class id, if its story is written. */
export const storyClassSlug = (classId: string) => STORY_CLASSES.find((c) => c.id === classId)?.slug;
