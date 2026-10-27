import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { LORE } from '../src/i18n/lore';
import { LORE_STORIES, loreHtml, loreIds, loreSearch, loreTips } from '../src/lib/stories/lore';
import { STORY_RACES } from '../src/lib/stories/races';

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

  it('are each named in a story, and every story names the same ones in both languages', () => {
    const named = new Set<string>();
    expect(Object.keys(LORE_STORIES)).toEqual(STORY_RACES.flatMap((r) => (r.slug ? [r.slug] : [])));
    for (const story of Object.values(LORE_STORIES)) {
      const tr = loreIds(story.tr).sort();
      expect(loreIds(story.en).sort()).toEqual(tr);
      tr.forEach((id) => named.add(id));
    }
    expect([...named].sort()).toEqual(LORE.map((e) => e.id).sort());
  });
});

describe('loreSearch', () => {
  it('indexes every card under its name and aliases, with the stories that name it', () => {
    const { cards, lore } = loreSearch('tr');
    expect(lore.map((l) => l.id).sort()).toEqual(Object.keys(cards).sort());
    expect(lore).toHaveLength(LORE.length);
    for (const l of lore) expect(l.stories.length, l.id).toBeGreaterThan(0);
    const bolvar = lore.find((l) => l.id === 'lore:bolvar')!;
    expect(bolvar.names).toContain('Bolvar Fordragon');
    expect(bolvar.stories).toEqual([{ name: 'Human', url: '/tr/stories/human/' }]);
    expect(loreSearch('en').lore.find((l) => l.id === 'lore:bolvar')!.stories[0].url).toBe('/en/stories/human/');
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
