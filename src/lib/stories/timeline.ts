// Story timeline (/<lang>/stories/timeline/): the major events told in the race and class stories, in
// chronological order, each pinned to a place on the Azeroth map (public/maps/azeroth.webp, 1002×668, the
// same map and coordinates as the story drawings) and linked to the story chapters that tell it.
// Copy (TR + EN) in src/i18n/timeline.ts; page in src/pages/[lang]/stories/timeline.astro,
// behaviour in src/scripts/timeline.ts.
import type { Lang } from '../../config';
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
import { withBase } from '../../utils/url';
import { STORY_CLASSES } from './classes';
import { STORY_RACES } from './races';

export const ERAS = ['ancient', 'ancients', 'vigil', 'kingdoms', 'draenor', 'first', 'second', 'between', 'third', 'after'] as const;
export type EraId = (typeof ERAS)[number];

export interface TimelinePlace {
  name: string;
  x: number;
  y: number;
  /** Not on this map (Northrend, Draenor, Skywall…): the pin is a symbolic position, drawn dashed. */
  off?: boolean;
}

/** Eastern Kingdoms map coordinates (public/maps/eastern-kingdoms.webp) → the Azeroth map, as in the story drawings. */
const ek = (x: number, y: number) => ({ x: Math.round((374 + x * 0.78) * 10) / 10, y: Math.round((69 + y * 0.744) * 10) / 10 });

export const PLACES = {
  // Kalimdor and the seas
  well: { name: 'Well of Eternity', x: 497, y: 342 },
  ahnqiraj: { name: 'Ahn’Qiraj', x: 196, y: 452 },
  barrens: { name: 'The Barrens', x: 262, y: 330 },
  hyjal: { name: 'Mount Hyjal', x: 268, y: 222 },
  moonglade: { name: 'Moonglade', x: 226, y: 160 },
  teldrassil: { name: 'Teldrassil', x: 160, y: 112 },
  ashenvale: { name: 'Ashenvale', x: 210, y: 262 },
  felwood: { name: 'Felwood', x: 222, y: 210 },
  demonfall: { name: 'Demon Fall Canyon', x: 258, y: 248 },
  stonetalon: { name: 'Stonetalon Peak', x: 196, y: 292 },
  mulgore: { name: 'Mulgore · Thunder Bluff', x: 215, y: 350 },
  maraudon: { name: 'Maraudon · Desolace', x: 158, y: 372 },
  diremaul: { name: 'Dire Maul', x: 176, y: 436 },
  orgrimmar: { name: 'Orgrimmar', x: 300, y: 286 },
  echo: { name: 'Echo Isles', x: 318, y: 356 },
  theramore: { name: 'Theramore', x: 308, y: 392 },
  darkspear: { name: 'Darkspear isle', x: 384, y: 440 },
  // Eastern Kingdoms
  quelthalas: { name: 'Quel’Thalas', ...ek(615, 70) },
  stratholme: { name: 'Stratholme', ...ek(560, 112) },
  lightshope: { name: 'Light’s Hope Chapel', ...ek(612, 162) },
  lordaeron: { name: 'Lordaeron', ...ek(468, 155) },
  andorhal: { name: 'Andorhal', ...ek(503, 165) },
  dalaran: { name: 'Dalaran', ...ek(466, 190) },
  alterac: { name: 'Alterac Mountains', ...ek(486, 206) },
  durnholde: { name: 'Durnholde Keep', ...ek(492, 238) },
  strom: { name: 'Strom · Arathi Highlands', ...ek(522, 258) },
  grimbatol: { name: 'Grim Batol', ...ek(572, 322) },
  ironforge: { name: 'Ironforge', ...ek(455, 372) },
  gnomeregan: { name: 'Gnomeregan', ...ek(424, 366) },
  uldaman: { name: 'Uldaman', x: 764, y: 368 },
  blackrock: { name: 'Blackrock Mountain', ...ek(505, 438) },
  stormwind: { name: 'Stormwind', ...ek(437, 455) },
  karazhan: { name: 'Karazhan', ...ek(510, 522) },
  portal: { name: 'Dark Portal', ...ek(543, 556) },
  zulgurub: { name: 'Zul’Gurub', x: 758, y: 494 },
  // beyond this map: symbolic positions
  northrend: { name: 'Northrend', x: 575, y: 60, off: true },
  tomb: { name: 'Tomb of Sargeras', x: 641, y: 286, off: true },
  draenor: { name: 'Draenor', x: 928, y: 472, off: true },
  zephras: { name: 'Zephras Isle · Skywall', x: 545, y: 186, off: true },
} satisfies Record<string, TimelinePlace>;
export type PlaceId = keyof typeof PLACES;

export interface TimelineEvent {
  id: string;
  era: EraId;
  place: PlaceId;
  /** Routes drawn into the event's place (a march, a voyage). */
  from?: PlaceId[];
  /** Routes drawn out of the event's place. */
  to?: PlaceId[];
  /** Chapters that tell the event: "<story slug>#<chapter id>", in the order they are listed. */
  stories: string[];
}

export const TIMELINE: TimelineEvent[] = [
  // ancient times
  { id: 'curse-of-flesh', era: 'ancient', place: 'uldaman', stories: ['dwarf#origin', 'gnome#origin', 'human#origin'] },
  { id: 'troll-empires', era: 'ancient', place: 'ahnqiraj', stories: ['troll#origin'] },
  { id: 'kaldorei', era: 'ancient', place: 'well', stories: ['night-elf#origin', 'troll#origin'] },
  { id: 'shu-halo', era: 'ancient', place: 'barrens', stories: ['tauren#origin'] },
  // the War of the Ancients
  { id: 'azshara', era: 'ancients', place: 'well', stories: ['night-elf#sundering', 'mage#origin', 'warlock#origin'] },
  { id: 'first-druid', era: 'ancients', place: 'hyjal', stories: ['druid#origin', 'night-elf#sundering', 'tauren#origin'] },
  { id: 'broxigar', era: 'ancients', place: 'well', stories: ['warrior#three'] },
  { id: 'sundering', era: 'ancients', place: 'well', stories: ['night-elf#sundering', 'mage#origin', 'druid#origin'] },
  // the long vigil
  { id: 'nordrassil', era: 'vigil', place: 'hyjal', stories: ['night-elf#vigil', 'druid#two'] },
  { id: 'quel-thalas', era: 'vigil', place: 'quelthalas', from: ['hyjal'], stories: ['night-elf#vigil', 'mage#origin'] },
  { id: 'eldre-thalas', era: 'vigil', place: 'diremaul', stories: ['skyborne#origin'] },
  { id: 'skywall', era: 'vigil', place: 'zephras', from: ['diremaul'], stories: ['skyborne#skywall'] },
  // the age of kingdoms
  { id: 'arathor', era: 'kingdoms', place: 'strom', stories: ['human#arathor'] },
  { id: 'troll-wars', era: 'kingdoms', place: 'alterac', from: ['quelthalas'], stories: ['human#arathor', 'troll#amani', 'mage#two'] },
  { id: 'dalaran', era: 'kingdoms', place: 'dalaran', stories: ['mage#two', 'human#arathor'] },
  { id: 'tirisfal', era: 'kingdoms', place: 'dalaran', stories: ['mage#three', 'human#arathor'] },
  { id: 'hakkar', era: 'kingdoms', place: 'zulgurub', stories: ['troll#gurubashi'] },
  { id: 'centaurs', era: 'kingdoms', place: 'maraudon', to: ['barrens'], stories: ['tauren#centaurs'] },
  { id: 'shifting-sands', era: 'kingdoms', place: 'ahnqiraj', stories: ['night-elf#vigil'] },
  { id: 'three-hammers', era: 'kingdoms', place: 'ironforge', to: ['grimbatol'], stories: ['dwarf#hammers'] },
  { id: 'ragnaros', era: 'kingdoms', place: 'blackrock', stories: ['dwarf#hammers', 'dwarf#fire'] },
  { id: 'aegwynn', era: 'kingdoms', place: 'northrend', stories: ['mage#three'] },
  // Draenor
  { id: 'kiljaeden', era: 'draenor', place: 'draenor', stories: ['orc#origin', 'shaman#two'] },
  { id: 'blood-pact', era: 'draenor', place: 'draenor', stories: ['orc#origin', 'warlock#two'] },
  // the First War
  { id: 'dark-portal', era: 'first', place: 'portal', from: ['draenor'], stories: ['orc#portal', 'human#wars', 'mage#three'] },
  { id: 'medivh', era: 'first', place: 'karazhan', stories: ['human#wars'] },
  { id: 'stormwind-falls', era: 'first', place: 'stormwind', from: ['portal'], stories: ['human#wars', 'orc#portal', 'rogue#five', 'paladin#origin', 'gnome#wars'] },
  { id: 'exodus-north', era: 'first', place: 'lordaeron', from: ['stormwind'], stories: ['human#wars', 'paladin#origin'] },
  // the Second War
  { id: 'alliance', era: 'second', place: 'lordaeron', stories: ['human#wars', 'gnome#wars', 'dwarf#wars'] },
  { id: 'silver-hand', era: 'second', place: 'stratholme', stories: ['paladin#two'] },
  { id: 'ironforge-siege', era: 'second', place: 'ironforge', from: ['blackrock'], stories: ['dwarf#wars', 'orc#portal', 'hunter#three'] },
  { id: 'grim-batol', era: 'second', place: 'grimbatol', stories: ['dwarf#wars', 'orc#portal'] },
  { id: 'quel-thalas-burns', era: 'second', place: 'quelthalas', stories: ['troll#amani', 'human#wars', 'hunter#three'] },
  { id: 'guldan-betrays', era: 'second', place: 'tomb', from: ['lordaeron'], stories: ['orc#portal'] },
  { id: 'blackrock-spire', era: 'second', place: 'blackrock', from: ['lordaeron'], stories: ['human#wars', 'paladin#two', 'orc#portal', 'warrior#three'] },
  // between the wars
  { id: 'camps', era: 'between', place: 'durnholde', stories: ['orc#camps', 'human#wars'] },
  { id: 'lich-king', era: 'between', place: 'northrend', stories: ['undead#origin'] },
  { id: 'thrall', era: 'between', place: 'alterac', from: ['durnholde'], stories: ['orc#camps', 'shaman#three'] },
  { id: 'stormwind-rebuilt', era: 'between', place: 'stormwind', stories: ['human#wars', 'human#today', 'rogue#two'] },
  { id: 'gnomeregan', era: 'between', place: 'gnomeregan', to: ['ironforge'], stories: ['gnome#fall'] },
  // the Third War
  { id: 'plague', era: 'third', place: 'andorhal', stories: ['undead#origin', 'human#fall', 'priest#three'] },
  { id: 'stratholme', era: 'third', place: 'stratholme', from: ['andorhal'], stories: ['human#fall', 'paladin#three', 'undead#scourge'] },
  { id: 'darkspear', era: 'third', place: 'darkspear', from: ['lordaeron'], stories: ['orc#exodus', 'troll#darkspear'] },
  { id: 'frostmourne', era: 'third', place: 'northrend', stories: ['human#fall', 'paladin#three', 'undead#scourge', 'dwarf#wars'] },
  { id: 'terenas', era: 'third', place: 'lordaeron', from: ['northrend'], stories: ['human#fall', 'undead#scourge', 'paladin#three'] },
  { id: 'sunwell', era: 'third', place: 'quelthalas', stories: ['undead#scourge'] },
  { id: 'dalaran-falls', era: 'third', place: 'dalaran', to: ['theramore'], stories: ['human#fall', 'undead#scourge', 'mage#five'] },
  { id: 'cairne', era: 'third', place: 'barrens', from: ['darkspear'], stories: ['orc#exodus', 'tauren#caravan', 'tauren#march'] },
  { id: 'thunder-bluff', era: 'third', place: 'mulgore', from: ['barrens'], stories: ['tauren#march', 'tauren#caravan'] },
  { id: 'oracle', era: 'third', place: 'stonetalon', stories: ['tauren#march'] },
  { id: 'cenarius', era: 'third', place: 'ashenvale', stories: ['night-elf#hyjal', 'orc#exodus'] },
  { id: 'illidan', era: 'third', place: 'felwood', stories: ['night-elf#hyjal'] },
  { id: 'mannoroth', era: 'third', place: 'demonfall', stories: ['orc#exodus'] },
  { id: 'hyjal', era: 'third', place: 'hyjal', stories: ['night-elf#hyjal', 'tauren#march', 'human#fall', 'gnome#wars'] },
  // after the Third War
  { id: 'frozen-throne', era: 'after', place: 'dalaran', to: ['northrend'], stories: ['undead#breaking'] },
  { id: 'undercity', era: 'after', place: 'lordaeron', stories: ['undead#rebellion'] },
  { id: 'durotar', era: 'after', place: 'orgrimmar', stories: ['orc#today', 'shaman#three', 'hunter#five', 'tauren#caravan'] },
  { id: 'theramore', era: 'after', place: 'theramore', stories: ['human#fall', 'mage#five'] },
  { id: 'teldrassil', era: 'after', place: 'teldrassil', stories: ['night-elf#today'] },
  { id: 'hamuul', era: 'after', place: 'moonglade', stories: ['tauren#today', 'druid#five'] },
  { id: 'forsaken-horde', era: 'after', place: 'mulgore', from: ['lordaeron'], stories: ['tauren#today', 'undead#today'] },
  { id: 'crusade', era: 'after', place: 'lightshope', stories: ['paladin#three', 'human#today'] },
  { id: 'zalazane', era: 'after', place: 'echo', stories: ['troll#darkspear', 'troll#today'] },
  { id: 'varian', era: 'after', place: 'stormwind', stories: ['human#today'] },
  { id: 'hakkar-returns', era: 'after', place: 'zulgurub', stories: ['troll#gurubashi'] },
  { id: 'skyborne-crisis', era: 'after', place: 'zephras', stories: ['skyborne#crisis', 'skyborne#paths'] },
  { id: 'skyborne-descent', era: 'after', place: 'zephras', to: ['dalaran', 'mulgore'], stories: ['skyborne#descent'] },
];

/** The copy of every story the timeline links to, by page slug: chapter names come from here. */
const RACE_STORIES: Record<string, Record<Lang, { chapters: Record<string, string> }>> = {
  gnome: GNOME_STORY,
  dwarf: DWARF_STORY,
  human: HUMAN_STORY,
  'night-elf': NIGHT_ELF_STORY,
  orc: ORC_STORY,
  troll: TROLL_STORY,
  tauren: TAUREN_STORY,
  undead: UNDEAD_STORY,
  skyborne: SKYBORNE_STORY,
};
const STORY_CHAPTERS: Record<string, Record<Lang, { chapters: Record<string, string> }>> = {
  ...RACE_STORIES,
  ...CLASS_STORIES,
};

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

export interface StoryRef {
  slug: string;
  /** Race or class name, English in both languages. */
  name: string;
  /** "race" or "class", for the filter groups. */
  kind: 'race' | 'class';
  chapter: string;
  num: string;
  chapterName: string;
  url: string;
}

/** Resolves "<slug>#<chapter>" to the story, its chapter number and name; undefined if either is unknown. */
export function storyRef(lang: Lang, ref: string): StoryRef | undefined {
  const [slug, chapter] = ref.split('#');
  const copy = STORY_CHAPTERS[slug]?.[lang];
  const race = STORY_RACES.find((r) => r.slug === slug);
  const cls = STORY_CLASSES.find((c) => c.slug === slug);
  if (!copy || !(race || cls) || !(chapter in copy.chapters)) return undefined;
  return {
    slug,
    name: race?.name ?? cls!.name,
    kind: race ? 'race' : 'class',
    chapter,
    num: ROMAN[Object.keys(copy.chapters).indexOf(chapter)],
    chapterName: copy.chapters[chapter],
    url: withBase(`/${lang}/stories/${slug}/#${chapter}`),
  };
}

/** Story slugs (races, then classes, in strip order) that have at least one event on the timeline. */
export function timelineSlugs(): string[] {
  const used = new Set(TIMELINE.flatMap((e) => e.stories.map((s) => s.split('#')[0])));
  return [...STORY_RACES.map((r) => r.slug), ...STORY_CLASSES.map((c) => c.slug)].filter(
    (s): s is string => !!s && used.has(s),
  );
}

/** Timeline URL filtered to one story, if the story has events on it; the slug comes from a story page's path. */
export function timelineUrl(lang: Lang, pathname: string): string | undefined {
  const slug = /\/stories\/([^/]+)\/?$/.exec(pathname)?.[1];
  return slug && timelineSlugs().includes(slug) ? withBase(`/${lang}/stories/timeline/#s=${slug}`) : undefined;
}
