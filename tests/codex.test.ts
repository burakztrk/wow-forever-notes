import { describe, expect, it } from 'vitest';
import { classesOf, racesByFaction, racesFor, racialsOf, spellGroups } from '../src/lib/codex';
import type { ClassInfo, GlossaryEntry, RaceInfo } from '../src/lib/glossary-types';

// Same vectors as the mobile app's CodexTest.kt.

const spell = (id: string, school: string | undefined, learnedAt: number | undefined, status: GlossaryEntry['status'] = 'unchanged') =>
  ({ id, kind: 'spell', name: id.split('/')[1], school, learnedAt, status, desc: '', sourceUrl: '' }) as GlossaryEntry;

const glossary = new Map(
  [
    spell('spell/frostbolt', 'Frost', 4),
    spell('spell/fireball', 'Fire', 1, 'changed'),
    spell('spell/blizzard', 'Frost', 20, 'new'),
    spell('spell/arcane-blast', 'Arcane', 20),
    spell('spell/arcane-brilliance', 'Arcane', 20),
    spell('spell/oddity', undefined, 10),
    { id: 'racial/blood-fury', kind: 'racial', name: 'Blood Fury', status: 'unchanged', desc: '', sourceUrl: '' } as GlossaryEntry,
  ].map((e) => [e.id, e]),
);
const lookup = (id: string) => glossary.get(id);

const mage = {
  id: 'mage',
  name: 'Mage',
  trees: ['Arcane', 'Fire', 'Frost'],
  spells: ['spell/frostbolt', 'spell/oddity', 'spell/fireball', 'spell/blizzard', 'spell/arcane-blast', 'spell/arcane-brilliance', 'spell/missing'],
  talents: [],
} as ClassInfo;
const warrior = { id: 'warrior', name: 'Warrior', trees: [], spells: [], talents: [] } as ClassInfo;

const races: RaceInfo[] = [
  { id: 'horde-orc', name: 'Orc', faction: 'Horde', classes: ['warrior', 'mage'], racials: ['racial/blood-fury', 'racial/missing'] },
  { id: 'alliance-human', name: 'Human', faction: 'Alliance', classes: ['mage'], racials: [] },
  { id: 'alliance-dwarf', name: 'Dwarf', faction: 'Alliance', classes: ['warrior'], racials: [] },
];

describe('codex', () => {
  it('groups races Alliance first', () => {
    expect(racesByFaction(races).map(([f, list]) => [f, list.map((r) => r.id)])).toEqual([
      ['Alliance', ['alliance-human', 'alliance-dwarf']],
      ['Horde', ['horde-orc']],
    ]);
  });

  it('resolves racials and playable classes', () => {
    const orc = races[0];
    expect(racialsOf(orc, lookup).map((e) => e.id)).toEqual(['racial/blood-fury']);
    expect(classesOf(orc, [warrior, mage]).map((c) => c.id)).toEqual(['warrior', 'mage']); // classes.json order
    expect(racesFor(mage, races).map((r) => r.id)).toEqual(['horde-orc', 'alliance-human']);
  });

  it('groups spells by school and level', () => {
    const groups = spellGroups(mage, lookup);
    expect(groups.map((g) => g.school)).toEqual(['Frost', 'Fire', 'Arcane', '']);
    expect(groups[0].spells.map((s) => s.name)).toEqual(['frostbolt', 'blizzard']);
    expect(groups[2].spells.map((s) => s.name)).toEqual(['arcane-blast', 'arcane-brilliance']); // same level: by name
  });

  it('filters by status', () => {
    expect(spellGroups(mage, lookup, 'new').flatMap((g) => g.spells.map((s) => s.name))).toEqual(['blizzard']);
    expect(spellGroups(mage, lookup, 'changed').map((g) => g.school)).toEqual(['Fire']);
  });
});
