// Races shown in the story pages' race strip, in order. `slug` marks a written
// story (src/pages/[lang]/stories/<slug>.astro); `id` matches src/data/races.json.
// A people on both sides (the Skyborne) is one entry: `faction` 'ah', `id` the first race and
// `ids` every race id the story covers.
export interface StoryRace {
  id: string;
  name: string;
  faction: 'a' | 'h' | 'ah';
  slug?: string;
  ids?: string[];
  /** Cover art for the story banner on the race pages: `src` under public/, CSS `position` of the crop. */
  cover?: { src: string; position: string };
}

export const STORY_RACES: StoryRace[] = [
  { id: 'alliance-gnome', name: 'Gnome', faction: 'a', slug: 'gnome', cover: { src: '/stories/gnome/ironforge.webp', position: '30% 45%' } },
  { id: 'alliance-dwarf', name: 'Dwarf', faction: 'a', slug: 'dwarf', cover: { src: '/stories/dwarf/ironforge-forge.webp', position: '30% 50%' } },
  { id: 'alliance-human', name: 'Human', faction: 'a', slug: 'human', cover: { src: '/stories/human/stormwind-gate.webp', position: '30% 45%' } },
  { id: 'alliance-night-elf', name: 'Night Elf', faction: 'a', slug: 'night-elf', cover: { src: '/stories/night-elf/well-of-eternity.webp', position: '40% 50%' } },
  { id: 'horde-orc', name: 'Orc', faction: 'h', slug: 'orc', cover: { src: '/stories/orc/orgrimmar.webp', position: '30% 45%' } },
  { id: 'horde-troll', name: 'Troll', faction: 'h', slug: 'troll', cover: { src: '/stories/troll/durotar.webp', position: '50% 38%' } },
  { id: 'horde-tauren', name: 'Tauren', faction: 'h', slug: 'tauren', cover: { src: '/stories/tauren/mulgore.webp', position: '40% 45%' } },
  { id: 'horde-undead', name: 'Undead', faction: 'h', slug: 'undead', cover: { src: '/stories/undead/tirisfal.webp', position: '30% 50%' } },
  {
    id: 'alliance-skyborne-high-order',
    ids: ['alliance-skyborne-high-order', 'horde-skyborne-windshaper'],
    name: 'Skyborne',
    faction: 'ah',
    slug: 'skyborne',
    cover: { src: '/stories/skyborne/cover.webp', position: '40% 40%' },
  },
];

/** The story entry for a race id, if its story is written. */
export const storyRace = (raceId: string) => STORY_RACES.find((r) => (r.id === raceId || r.ids?.includes(raceId)) && r.slug);

/** Story slug for a race id, if its story is written. */
export const storySlug = (raceId: string) => STORY_RACES.find((r) => r.id === raceId || r.ids?.includes(raceId))?.slug;
