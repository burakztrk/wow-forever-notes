import classesData from '../data/classes.json';
import glossaryData from '../data/glossary.json';
import racesData from '../data/races.json';
import { inClassOrder, type ClassInfo, type GlossaryEntry, type GlossaryFile, type RaceInfo } from './glossary-types';

// Lookups for the race and class pages, same rules as the mobile app's
// domain/Codex.kt.

export const races = racesData as RaceInfo[];
export const classList = inClassOrder(classesData as ClassInfo[]);
const byId = new Map((glossaryData as GlossaryFile).entries.map((e) => [e.id, e]));

export const glossaryEntry = (id: string) => byId.get(id);

// Factions in a fixed order (Alliance, Horde, then anything new), races in file order.
export function racesByFaction(list: RaceInfo[] = races): [string, RaceInfo[]][] {
  const factions = [...new Set(['Alliance', 'Horde', ...list.map((r) => r.faction)])];
  return factions.map((f): [string, RaceInfo[]] => [f, list.filter((r) => r.faction === f)]).filter(([, rs]) => rs.length);
}

export const racialsOf = (race: RaceInfo, lookup: (id: string) => GlossaryEntry | undefined = glossaryEntry) =>
  race.racials.map(lookup).filter((e): e is GlossaryEntry => !!e);

// Playable classes in CLASSES order (when the list is classList).
export const classesOf = (race: RaceInfo, list: ClassInfo[] = classList) => list.filter((c) => race.classes.includes(c.id));

export const racesFor = (cls: ClassInfo, list: RaceInfo[] = races) => list.filter((r) => r.classes.includes(cls.id));

export interface SpellGroup {
  school: string;
  spells: GlossaryEntry[];
}

// The class's spells grouped by school (first appearance order), each group
// sorted by level and name. Spells without a school go last under "".
// The page filters in the browser with the same rule (row data-status).
export type SpellFilter = 'all' | 'new' | 'changed';

export function spellGroups(
  cls: ClassInfo,
  lookup: (id: string) => GlossaryEntry | undefined = glossaryEntry,
  filter: SpellFilter = 'all',
): SpellGroup[] {
  const spells = cls.spells
    .map(lookup)
    .filter((e): e is GlossaryEntry => !!e && (filter === 'all' || e.status === filter));
  const schools = [...new Set(spells.map((s) => s.school ?? ''))];
  schools.sort((a, b) => Number(a === '') - Number(b === ''));
  return schools.map((school) => ({
    school,
    spells: spells
      .filter((s) => (s.school ?? '') === school)
      .sort((a, b) => (a.learnedAt ?? Infinity) - (b.learnedAt ?? Infinity) || (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)),
  }));
}

export interface ClassSummary {
  spells: number;
  talents: number;
  newSpells: GlossaryEntry[];
  changedSpells: number;
  trees: { name: string; icon?: string; talents: number }[];
}

// Numbers for the home page class panel. Entries missing from the glossary are skipped.
export function classSummary(cls: ClassInfo, lookup: (id: string) => GlossaryEntry | undefined = glossaryEntry): ClassSummary {
  const spells = cls.spells.map(lookup).filter((e): e is GlossaryEntry => !!e);
  const talents = cls.talents.map(lookup).filter((e): e is GlossaryEntry => !!e);
  return {
    spells: spells.length,
    talents: talents.length,
    newSpells: spells.filter((s) => s.status === 'new'),
    changedSpells: spells.filter((s) => s.status === 'changed').length,
    trees: cls.trees.map((name, i) => ({
      name,
      icon: cls.treeIcons?.[i],
      talents: talents.filter((t) => t.tree === name).length,
    })),
  };
}

// Whether a race can play a class (home page class bar).
export const canPlay = (race: RaceInfo, cls: ClassInfo) => race.classes.includes(cls.id);
