// Data model for src/data/professions.json and src/data/legacy.json (written by
// `npm run sync:professions`) and the hand-edited src/data/professions-guide.json.
// Game names (professions, items, perks, zones) stay English in both languages.

import type { ClassId } from './glossary-types';

// ---------- professions.json (generated) ----------

export type ProfessionKind = 'primary' | 'secondary';
export type ProfessionSection = 'crafting' | 'gathering' | 'secondary';

export interface ItemRef {
  name: string;
  icon?: string;
  quality?: number; // 0 poor … 5 legendary (name colour)
  lines?: string[]; // English client tooltip lines (Forever), cleaned up
}

// [item id, count]
export type ItemCount = [number, number];

export interface CampObject {
  id: number; // the object's item id
  name: string;
  icon?: string;
  skill: number; // profession skill needed to place it (20 / 140 / 300)
  replaces?: string; // the lower-tier object it can replace
  reagents: ItemCount[];
  blueprint?: string; // "Blueprint: Anvil" (tier 2 and 3 objects)
}

export interface RouteStep {
  from: number;
  to: number;
  recipe: string; // recipe name, e.g. "Rough Sharpening Stone"
  item?: number; // item it makes (no item for enchants)
  crafts: number;
  reagents: ItemCount[]; // per craft
  source: string; // "trainer", "vendor", "drop", …
}

export interface Shopping {
  buy: ItemCount[];
  gather: ItemCount[];
  make: ItemCount[];
}

// One gathering band: a node (Copper Vein), a creature level range (skinning)
// or a fishing skill band; zones are the best few, most nodes first.
export interface GatherBand {
  name?: string; // node name, e.g. "Copper Vein"
  skill?: number; // skill needed (mining, herbalism, fishing)
  levels?: [number, number]; // creature levels (skinning)
  items: number[];
  zones: string[];
}

export interface Profession {
  slug: string; // "blacksmithing", "first-aid"
  name: string;
  icon: string;
  kind: ProfessionKind;
  section: ProfessionSection;
  newRecipes: number; // recipe items new in the Forever beta client
  milestones: { skill: number; points: number }[]; // Legacy points
  certification: boolean; // a 300-skill title sold for Merchant's Favor
  campObjects: CampObject[];
  route?: RouteStep[]; // crafting: leveling route 1–300
  routeCap?: number; // the beta skill cap the route's first shopping list stops at
  shopping?: { toCap: Shopping; afterCap: Shopping };
  gathering?: GatherBand[];
  perks: string[]; // Legacy perk ids (legacy.json) that help this profession
  sourceUrl: string;
}

export interface ProfessionsFile {
  generatedAt: string;
  build: string | null;
  source: string;
  professions: Profession[];
  campingPerks: string[]; // Legacy perk ids that help camping
  items: Record<string, ItemRef>; // every item id the professions and the guide's tools reference
}

// ---------- legacy.json (generated) ----------

export interface LegacyPerk {
  id: string; // "legacy/well-rested"
  name: string;
  icon: string;
  tree: number; // index into trees
  tier: number; // 1-based: 0, 5, 10 points spent in the tree
  lane: number; // 1-based column
  maxRank: number;
  tierPoints: number;
  requires?: string; // id of the perk that must be at max rank
  ranks: string[]; // English text per rank
  ranksTr?: string[];
  desc: string; // top rank, English (translation key)
  descTr?: string;
  cast?: string; // "25 sec"
  cooldown?: string; // "23 hr"
  reserved?: false;
}

// A node the client has but Blizzard has not revealed (shown as "?").
export interface LegacyReserved {
  id: string;
  tree: number;
  tier: number;
  lane: number;
  reserved: true;
}

export interface LegacyTree {
  name: string;
  slug: string;
  icon: string;
}

// Account rewards for total points earned (not spent).
export interface LegacyReward {
  points: number;
  name: string;
  icon: string;
  item?: number; // item id (tooltip data in professions.json items)
  linesTr?: string[]; // Turkish item lines, same order (npm run translate)
}

export interface LegacyFile {
  generatedAt: string;
  build: string | null;
  source: string;
  maxPoints: number; // per character at launch
  pointsPerTier: number;
  unlockLevel: number; // the Legacy panel opens at this level
  totalChallenges: number; // points the launch challenges are worth
  challenges: { key: string; name: string; count: number; points: number }[];
  trees: LegacyTree[];
  perks: LegacyPerk[];
  reserved: LegacyReserved[];
  rewards: LegacyReward[];
}

// ---------- professions-guide.json (hand-edited) ----------

export interface Text {
  en: string;
  tr: string;
}

export interface CampBuff {
  key: string;
  kind: 'combat' | 'utility'; // combat buffs last 1 hour; utility = services and rest
  buff: Text; // "Stamina"
  bonus: Text; // "+3–56 Stamina"
  object: string; // camp object name, must exist in professions.json
  profession: string; // profession slug
  conflict?: string; // class buff it does not stack with (English game name)
  conflictTip?: string; // glossary name for the tooltip when `conflict` is not a glossary entry
  note?: Text;
}

export interface Campfire {
  name: string; // "Journeyman Campfire"
  learn: number; // Cooking skill to learn the blueprint
  use: number; // Cooking skill to use the kit
  slots: number;
  material: string;
  blueprintFrom?: Text;
}

export type Goal = 'leveling' | 'gold' | 'raids' | 'pvp';

export interface ClassPick {
  leveling: [string, string]; // profession slugs
  gold: [string, string];
  raids: [string, string];
  pvp: [string, string];
  why: Text; // why the leveling pair
}

export interface ProfessionGuide {
  summary: Text;
  tools: number[]; // item ids, resolved to names/icons by the sync
  materials?: Text; // short note on what it consumes
  blueprints?: Record<string, Text>; // camp object name → where its blueprint drops
}

export interface ProfessionsGuide {
  updated: string; // YYYY-MM-DD, when the guide text was last checked
  sources: { label: string; url: string }[];
  camping: {
    intro: Text;
    steps: Text[];
    rules: Text[];
    campfires: Campfire[];
  };
  buffs: CampBuff[];
  trainerRanks: { name: string; to: number; skill: number; level: number }[];
  classes: Record<ClassId, ClassPick>;
  // why the gold / raid / PvP pairs: gold and pvp are the same pair for every class,
  // raid notes are keyed by "<slug>+<slug>" in the order the class picks list them
  goalNotes: { gold: Text; pvp: Text; raids: Record<string, Text> };
  professions: Record<string, ProfessionGuide>;
}
