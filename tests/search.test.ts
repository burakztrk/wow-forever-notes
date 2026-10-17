import { describe, expect, it } from 'vitest';
import { foldForSearch, searchEntries, type Searchable } from '../src/lib/search';

// Same vectors as the mobile app's SearchTest.kt. The web index already holds
// the page-language description (TR falls back to EN), so each language gets
// its own list here.

const e = (name: string, desc = '', descTr?: string, status = 'unchanged') => ({ name, desc, descTr, status });
const glossary = [
  e('Frostbolt', 'Launches a bolt of frost.'),
  e('Frost Nova', 'Blasts enemies near the caster.', 'Yakındaki düşmanları dondurur.'),
  e('Ice Barrier', 'Absorbs damage.'),
  e('Arcane Missiles', 'Launches arcane missiles.'),
  e('Old Frost Spell', '', undefined, 'removed'),
];
const inLang = (lang: 'tr' | 'en'): Searchable[] =>
  glossary.map((g) => ({ name: g.name, status: g.status, desc: lang === 'tr' && g.descTr ? g.descTr : g.desc }));
const names = (q: string, lang: 'tr' | 'en' = 'en') => searchEntries(q, inLang(lang)).map((h) => h.entry.name);

describe('search', () => {
  it('ranks name matches above description matches', () => {
    expect(names('frost').slice(0, 3)).toEqual(['Frost Nova', 'Frostbolt', 'Old Frost Spell']);
    expect(names('frostbolt')[0]).toBe('Frostbolt');
    expect(names('launches')).toContain('Arcane Missiles'); // description only
  });

  it('matches word starts and all words', () => {
    expect(names('nova')).toEqual(['Frost Nova']);
    expect(names('missiles arcane')).toEqual(['Arcane Missiles']);
  });

  it('searches Turkish descriptions and folds dotted i', () => {
    expect(names('dondurur', 'tr')).toEqual(['Frost Nova']);
    expect(names('dondurur', 'en')).toEqual([]);
    expect(names('İCE')).toEqual(['Ice Barrier']);
    expect(foldForSearch('ICE BARRİER')).toBe('ice barrier');
    expect(foldForSearch('Irk')).toBe('irk');
  });

  it('ignores too short queries', () => {
    expect(names('f')).toEqual([]);
    expect(names('  ')).toEqual([]);
  });
});
