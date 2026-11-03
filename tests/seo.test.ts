import { describe, expect, it } from 'vitest';
import { LANGS, SITE_TITLE } from '../src/config';
import { ui } from '../src/i18n';
import { about } from '../src/i18n/about';
import { breadcrumbs } from '../src/lib/breadcrumbs';
import {
  DESCRIPTION_MAX,
  TITLE_MAX,
  blogPostingJsonLd,
  breadcrumbJsonLd,
  clampDescription,
  jsonLdGraph,
  jsonLdString,
  pageTitle,
} from '../src/lib/seo';

describe('pageTitle', () => {
  it('adds the site name while it fits', () => {
    expect(pageTitle('Races – WoW Forever')).toBe(`Races – WoW Forever · ${SITE_TITLE}`);
  });
  it('drops the site name when the whole title would be too long', () => {
    const long = 'WoW Forever patch notes Nov 2: last round before launch';
    expect(pageTitle(long)).toBe(long);
  });
  it('falls back to the site name', () => {
    expect(pageTitle(undefined)).toBe(SITE_TITLE);
  });
});

describe('clampDescription', () => {
  it('keeps short text', () => {
    expect(clampDescription('  Short   text. ')).toBe('Short text.');
  });
  it('cuts at a sentence end when one is close enough', () => {
    const text = `${'a'.repeat(120)}. ${'b'.repeat(80)}`;
    expect(clampDescription(text)).toBe(`${'a'.repeat(120)}.`);
  });
  it('cuts at a word with an ellipsis otherwise', () => {
    const text = 'word '.repeat(60);
    const out = clampDescription(text);
    expect(out.length).toBeLessThanOrEqual(DESCRIPTION_MAX);
    expect(out.endsWith('word…')).toBe(true);
  });
});

describe('page titles and descriptions in both languages', () => {
  it.each(LANGS)('%s: home and list pages fit the snippet', (lang) => {
    const t = ui(lang);
    expect(t.homeTitle.length).toBeLessThanOrEqual(TITLE_MAX);
    expect(t.homeTitle).toMatch(/WoW Forever/);
    for (const key of ['metaHome', 'metaNotes', 'metaRaces', 'metaClasses', 'metaSearch', 'metaCreator'] as const) {
      expect(t[key].length, key).toBeLessThanOrEqual(DESCRIPTION_MAX);
      expect(t[key].length, key).toBeGreaterThanOrEqual(70);
      expect(t[key], key).toMatch(/WoW Forever/);
    }
    expect(about[lang].description.length).toBeLessThanOrEqual(DESCRIPTION_MAX);
  });
});

describe('breadcrumbs', () => {
  it('has no trail on the home page', () => {
    expect(breadcrumbs('en', '/en/', 'x')).toEqual([]);
  });
  it('puts a post under the notes list', () => {
    expect(breadcrumbs('en', '/en/blog/wow-forever-2026-11-02/', 'Nov 2 notes')).toEqual([
      { name: 'Home', url: '/en/' },
      { name: 'Notes', url: '/en/notes/' },
      { name: 'Nov 2 notes', url: '/en/blog/wow-forever-2026-11-02/' },
    ]);
  });
  it('puts a race stats page under races and a class stats page under classes', () => {
    expect(breadcrumbs('tr', '/tr/stats/alliance-human/', 'Human ırk yetenekleri · WoW Forever')[1].url).toBe('/tr/races/');
    expect(breadcrumbs('tr', '/tr/stats/mage/', 'Mage · WoW Forever').map((c) => c.name)).toEqual([ui('tr').navHome, ui('tr').navClasses, 'Mage']);
  });
  it('stops at the section on a list page', () => {
    expect(breadcrumbs('en', '/en/races/', 'Races – WoW Forever')).toEqual([
      { name: 'Home', url: '/en/' },
      { name: 'Races', url: '/en/races/' },
    ]);
  });
});

describe('JSON-LD', () => {
  it('numbers breadcrumb items from 1 with absolute URLs', () => {
    const list = breadcrumbJsonLd([{ name: 'Home', url: '/en/' }], 'https://foreverwow.app');
    expect(list.itemListElement[0]).toEqual({ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://foreverwow.app/en/' });
  });
  it('uses the updated date as dateModified', () => {
    const post = blogPostingJsonLd({
      title: 'T',
      date: new Date('2026-11-02'),
      updated: new Date('2026-11-03'),
      url: '/en/blog/x/',
      lang: 'en',
      tags: [],
    });
    expect(post.datePublished).toBe('2026-11-02T00:00:00.000Z');
    expect(post.dateModified).toBe('2026-11-03T00:00:00.000Z');
  });
  it('drops empty nodes and escapes "<"', () => {
    const graph = jsonLdGraph([{ '@type': 'Thing', name: '</script>' }, false, undefined]);
    expect(graph['@graph']).toHaveLength(1);
    expect(jsonLdString(graph)).not.toContain('</script>');
  });
});
