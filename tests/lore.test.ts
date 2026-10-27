import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { LORE } from '../src/i18n/lore';
import { HUMAN_STORY } from '../src/i18n/stories';
import { loreHtml, loreIds, loreTips } from '../src/lib/stories/lore';

const root = fileURLToPath(new URL('..', import.meta.url));
const plain = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
const tipped = (html: string) => [...html.matchAll(/data-tip="lore:([a-z]+)"[^>]*>([^<]+)</g)].map((m) => `${m[1]}=${m[2]}`);

describe('lore entries', () => {
  it('have unique ids and aliases, both languages and an icon', () => {
    expect(new Set(LORE.map((e) => e.id)).size).toBe(LORE.length);
    const aliases = LORE.flatMap((e) => e.aliases);
    expect(new Set(aliases).size).toBe(aliases.length);
    for (const e of LORE) {
      expect(e.aliases.length, e.id).toBeGreaterThan(0);
      for (const t of [e.tr, e.en]) {
        expect(t.sub, e.id).toBeTruthy();
        expect(t.text, e.id).toBeTruthy();
      }
      expect(Boolean(e.tr.note), e.id).toBe(Boolean(e.en.note));
      expect(existsSync(join(root, 'public/icons', `${e.icon}.jpg`)), e.icon).toBe(true);
    }
  });

  it('are all named in the Human story, in both languages', () => {
    const all = LORE.map((e) => e.id).sort();
    expect(loreIds(HUMAN_STORY.tr).sort()).toEqual(all);
    expect(loreIds(HUMAN_STORY.en).sort()).toEqual(all);
  });
});

describe('loreHtml', () => {
  it('wraps the first mention of each name and keeps the text', () => {
    const text = 'Lothar, Lothar’ın dostu Bolvar & <Varian>.';
    const html = loreHtml(text);
    expect(plain(html)).toBe(text);
    expect(tipped(html)).toEqual(['lothar=Lothar', 'bolvar=Bolvar', 'varian=Varian']);
  });

  it('prefers the longest name and matches whole words only', () => {
    expect(tipped(loreHtml('Alliance of Lordaeron, Lordaeron’da kuruldu.'))).toEqual([
      'alliance=Alliance of Lordaeron',
      'lordaeron=Lordaeron',
    ]);
    expect(tipped(loreHtml('Strom, Stromgarde adını aldı.'))).toEqual(['stromgarde=Strom']);
    expect(tipped(loreHtml('Stromgarde Keep'))).toEqual(['stromgarde=Stromgarde']);
    expect(tipped(loreHtml('Anduin Lothar and young Anduin'))).toEqual(['lothar=Anduin Lothar', 'anduin=Anduin']);
    expect(tipped(loreHtml('Hordes and Stormwindish'))).toEqual([]);
  });

  it('builds one card per id, with the in-game note', () => {
    const tips = loreTips('tr', ['bolvar', 'nope']);
    expect(Object.keys(tips.cards ?? {})).toEqual(['lore:bolvar']);
    expect(tips.cards?.['lore:bolvar']).toMatchObject({ name: 'Bolvar Fordragon', kind: 'lore', note: 'Oyunda: Stormwind Keep' });
    expect(loreTips('en', ['bolvar']).cards?.['lore:bolvar'].note).toBe('In game: Stormwind Keep');
  });
});
