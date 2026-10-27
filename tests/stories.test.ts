import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { LANGS } from '../src/config';
import { DWARF_ART_LABELS, DWARF_STORY, GNOME_ART_LABELS, GNOME_STORY, STORY_UI } from '../src/i18n/stories';
import { fillArt } from '../src/lib/stories/art';
import { DWARF_ART } from '../src/lib/stories/dwarf-art';
import { GNOME_ART } from '../src/lib/stories/gnome-art';
import { STORY_RACES, storySlug } from '../src/lib/stories/races';

const art = [
  { name: 'gnome', labels: GNOME_ART_LABELS, drawings: [GNOME_ART.gears, GNOME_ART.ek, GNOME_ART.scene, GNOME_ART.dm, GNOME_ART.world] },
  { name: 'dwarf', labels: DWARF_ART_LABELS, drawings: [DWARF_ART.crest, DWARF_ART.ek, DWARF_ART.scene, DWARF_ART.kz, DWARF_ART.world] },
];

const keys = (o: object) => Object.keys(o).sort();

describe('story art', () => {
  it('has a label for every placeholder in every language', () => {
    for (const { labels, drawings } of art) {
      for (const lang of LANGS) {
        for (const svg of drawings) expect(fillArt(svg, labels[lang], '/')).not.toMatch(/%%\w+%%/);
      }
      expect(keys(labels.en)).toEqual(keys(labels.tr));
    }
  });

  it('fills the base path and escapes labels', () => {
    expect(fillArt('<image href="%%base%%a.webp"/>', {}, '/sub')).toBe('<image href="/sub/a.webp"/>');
    expect(fillArt('<text>%%x%%</text>', { x: 'A & <B>' }, '/')).toBe('<text>A &amp; &lt;B&gt;</text>');
    expect(() => fillArt('%%missing%%', {}, '/')).toThrow(/missing/);
  });

  it('gives the scroll-told map one camera per step', () => {
    const cams = (svg: string) => keys(JSON.parse(/data-cams='([^']+)'/.exec(svg)?.[1] ?? '{}'));
    for (const lang of LANGS) {
      expect(cams(GNOME_ART.ek)).toHaveLength(GNOME_STORY[lang].wars.steps.length);
      expect(cams(DWARF_ART.ek)).toHaveLength(DWARF_STORY[lang].hammers.steps.length);
    }
  });
});

describe('story copy', () => {
  it('keeps TR and EN gnome stories in step', () => {
    const [tr, en] = [GNOME_STORY.tr, GNOME_STORY.en];
    expect(en.facts.length).toBe(tr.facts.length);
    expect(en.wars.steps.map((s) => s.tone)).toEqual(tr.wars.steps.map((s) => s.tone));
    expect(en.wars.steps.map((s) => s.era)).toEqual(tr.wars.steps.map((s) => s.era));
    expect(en.fall.legend.map((l) => l.name)).toEqual(tr.fall.legend.map((l) => l.name));
    expect(en.today.legend.map((l) => l.name)).toEqual(tr.today.legend.map((l) => l.name));
    expect(en.today.tech.length).toBe(tr.today.tech.length);
  });

  it('keeps TR and EN dwarf stories in step', () => {
    const [tr, en] = [DWARF_STORY.tr, DWARF_STORY.en];
    expect(en.facts.length).toBe(tr.facts.length);
    expect(en.origin.stages.map((s) => s.name)).toEqual(tr.origin.stages.map((s) => s.name));
    expect(en.hammers.clans.map((c) => c.name)).toEqual(tr.hammers.clans.map((c) => c.name));
    expect(en.hammers.steps.map((s) => s.tone)).toEqual(tr.hammers.steps.map((s) => s.tone));
    expect(en.fire.places.map((p) => p.name)).toEqual(tr.fire.places.map((p) => p.name));
    expect(en.wars.legend.map((l) => l.name)).toEqual(tr.wars.legend.map((l) => l.name));
    expect(en.wars.cards.map((c) => c.tone)).toEqual(tr.wars.cards.map((c) => c.tone));
    expect(en.today.council.map((c) => c.name)).toEqual(tr.today.council.map((c) => c.name));
    expect(en.today.legend.map((l) => l.name)).toEqual(tr.today.legend.map((l) => l.name));
    // the page pairs these lists with fixed icon sets
    expect(tr.hammers.clans).toHaveLength(3);
    expect(tr.today.council).toHaveLength(3);
    expect(tr.fire.places).toHaveLength(3);
    expect(tr.wars.cards).toHaveLength(4);
  });

  it('has the shared strings in every language', () => {
    expect(keys(STORY_UI.en)).toEqual(keys(STORY_UI.tr));
  });
});

describe('story races', () => {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const races = JSON.parse(readFileSync(join(root, 'src/data/races.json'), 'utf8')) as unknown;
  const ids = new Set(JSON.stringify(races).match(/"id":"[a-z-]+"/g)?.map((m) => m.slice(6, -1)));

  it('lists real races and has a page for every written story', () => {
    for (const race of STORY_RACES) {
      expect(ids.has(race.id), race.id).toBe(true);
      if (race.slug) expect(existsSync(join(root, 'src/pages/[lang]/stories', `${race.slug}.astro`)), race.slug).toBe(true);
    }
    expect(storySlug('alliance-dwarf')).toBe('dwarf');
    expect(storySlug('horde-orc')).toBeUndefined();
  });
});
