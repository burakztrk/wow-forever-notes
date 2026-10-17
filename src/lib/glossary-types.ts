// Shared data model for src/data/*.json. Written by `npm run sync`, read by
// the site (tooltips) and later by class/race pages.

// Class display order everywhere on the site, in classes.json and in the
// mobile app (domain/Codex.kt CLASS_ORDER). Change both sides together.
export const CLASSES = [
  'warrior',
  'hunter',
  'mage',
  'rogue',
  'priest',
  'warlock',
  'paladin',
  'druid',
  'shaman',
] as const;
export type ClassId = (typeof CLASSES)[number];

const classRank = (id: string) => {
  const i = (CLASSES as readonly string[]).indexOf(id);
  return i < 0 ? CLASSES.length : i;
};

// Classes sorted by CLASSES; unknown ids keep their order after the known ones.
export const inClassOrder = <T extends { id: string }>(list: readonly T[]): T[] =>
  [...list].sort((a, b) => classRank(a.id) - classRank(b.id));

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
  // talents (talent builder)
  ranks?: string[]; // English text for rank 1..maxRank
  ranksTr?: string[]; // Turkish, derived from descTr by swapping numbers
  requires?: string; // glossary id of the prerequisite talent (arrow)
  tierPoints?: number; // points needed in this tree before this row unlocks
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
  icon?: string; // class icon, e.g. "classicon_mage"
  trees: string[]; // talent tree names in display order
  treeIcons?: string[]; // icon per tree, same order
  spells: string[]; // glossary ids
  talents: string[]; // glossary ids
}
