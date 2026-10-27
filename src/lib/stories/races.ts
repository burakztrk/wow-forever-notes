// Races shown in the story pages' race strip, in order. `slug` marks a written
// story (src/pages/[lang]/stories/<slug>.astro); `id` matches src/data/races.json.
export interface StoryRace {
  id: string;
  name: string;
  faction: 'a' | 'h';
  slug?: string;
}

export const STORY_RACES: StoryRace[] = [
  { id: 'alliance-gnome', name: 'Gnome', faction: 'a', slug: 'gnome' },
  { id: 'alliance-dwarf', name: 'Dwarf', faction: 'a', slug: 'dwarf' },
  { id: 'alliance-human', name: 'Human', faction: 'a', slug: 'human' },
  { id: 'alliance-night-elf', name: 'Night Elf', faction: 'a', slug: 'night-elf' },
  { id: 'horde-orc', name: 'Orc', faction: 'h', slug: 'orc' },
  { id: 'horde-troll', name: 'Troll', faction: 'h', slug: 'troll' },
  { id: 'horde-tauren', name: 'Tauren', faction: 'h' },
  { id: 'horde-undead', name: 'Undead', faction: 'h' },
];

/** Story slug for a race id, if its story is written. */
export const storySlug = (raceId: string) => STORY_RACES.find((r) => r.id === raceId)?.slug;
