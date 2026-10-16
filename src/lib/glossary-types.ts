// Shared data model for src/data/*.json. Written by `npm run sync`, read by
// the site (tooltips) and later by class/race pages.

export const CLASSES = [
  'warrior',
  'paladin',
  'hunter',
  'rogue',
  'priest',
  'shaman',
  'mage',
  'warlock',
  'druid',
] as const;
export type ClassId = (typeof CLASSES)[number];

export type GlossaryKind = 'spell' | 'talent' | 'racial';

// Forever compared with Classic Era
export type ChangeStatus = 'new' | 'changed' | 'unchanged' | 'removed';

export type CostType = 'mana' | 'rage' | 'energy' | 'health' | 'other';

export interface GlossaryEntry {
  id: string; // "spell/mage-conjure-water", "talent/calc-mage-arcane-…", "racial/racial-orc-blood-fury"
  kind: GlossaryKind;
  name: string;
  icon?: string; // file name under public/icons/ without extension
  class?: ClassId; // spells and talents
  races?: string[]; // racials: race ids from races.json
  school?: string; // spells, e.g. "Arcane"
  tree?: string; // talents, e.g. "Arcane"
  tier?: number; // talents: 1-based row in the tree
  row?: number; // talents: grid row
  col?: number; // talents: grid column
  maxRank?: number;
  learnedAt?: number;
  cost?: string; // normalized, e.g. "140 Mana"
  costType?: CostType;
  cast?: string; // "Instant", "3 sec"
  range?: string; // "30 yd"
  cooldown?: string; // "2 min"
  passive?: boolean;
  desc: string; // English, Forever text, highest rank
  descTr?: string; // Turkish, from src/data/i18n/tr.json (npm run translate)
  status: ChangeStatus;
  change?: string; // short English note on what changed vs Classic
  changeTr?: string;
  sourceUrl: string;
}

export interface GlossaryFile {
  generatedAt: string;
  build: string | null;
  source: string;
  entries: GlossaryEntry[];
}

export interface RaceInfo {
  id: string; // "alliance-human"
  name: string;
  faction: 'Alliance' | 'Horde';
  icon?: string;
  classes: ClassId[];
  racials: string[]; // glossary ids
}

export interface ClassInfo {
  id: ClassId;
  name: string;
  trees: string[]; // talent tree names in display order
  spells: string[]; // glossary ids
  talents: string[]; // glossary ids
}
