import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { LANGS } from '../src/config';
import {
  CURSE_ART_LABELS,
  CURSE_STORY,
  DWARF_ART_LABELS,
  DWARF_STORY,
  GNOME_ART_LABELS,
  GNOME_STORY,
  HUMAN_ART_LABELS,
  HUMAN_STORY,
  STORY_UI,
} from '../src/i18n/stories';
import { fillArt } from '../src/lib/stories/art';
import { CURSE_ART } from '../src/lib/stories/curse-art';
import { DWARF_ART } from '../src/lib/stories/dwarf-art';
import { GNOME_ART } from '../src/lib/stories/gnome-art';
import { HUMAN_ART } from '../src/lib/stories/human-art';
import { STORY_RACES, storySlug } from '../src/lib/stories/races';

const art = [
  { name: 'gnome', labels: GNOME_ART_LABELS, drawings: [GNOME_ART.gears, GNOME_ART.ek, GNOME_ART.scene, GNOME_ART.dm, GNOME_ART.world] },
  { name: 'dwarf', labels: DWARF_ART_LABELS, drawings: [DWARF_ART.crest, DWARF_ART.ek, DWARF_ART.kz, DWARF_ART.world] },
  {
    name: 'human',
    labels: HUMAN_ART_LABELS,
    drawings: [HUMAN_ART.kingdoms, HUMAN_ART.ek, HUMAN_ART.plague, HUMAN_ART.westfall, HUMAN_ART.world],
  },
  { name: 'curse', labels: CURSE_ART_LABELS, drawings: [CURSE_ART.emblem, CURSE_ART.world] },
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
      expect(cams(HUMAN_ART.ek)).toHaveLength(HUMAN_STORY[lang].wars.steps.length);
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

  it('keeps TR and EN human stories in step', () => {
    const [tr, en] = [HUMAN_STORY.tr, HUMAN_STORY.en];
    expect(en.facts.length).toBe(tr.facts.length);
    expect(en.origin.stages.map((s) => s.name)).toEqual(tr.origin.stages.map((s) => s.name));
    expect(en.wars.steps.map((s) => s.tone)).toEqual(tr.wars.steps.map((s) => s.tone));
    expect(en.wars.steps.map((s) => s.era)).toEqual(tr.wars.steps.map((s) => s.era));
    expect(en.wars.cards.map((c) => c.tone)).toEqual(tr.wars.cards.map((c) => c.tone));
    expect(en.fall.cards.map((c) => c.tone)).toEqual(tr.fall.cards.map((c) => c.tone));
    expect(en.today.throne.map((c) => c.name)).toEqual(tr.today.throne.map((c) => c.name));
    for (const key of ['arathor', 'fall', 'today'] as const) expect(en[key].legend.map((l) => l.name)).toEqual(tr[key].legend.map((l) => l.name));
    expect(en.today.westfallLegend.map((l) => l.name)).toEqual(tr.today.westfallLegend.map((l) => l.name));
    // the page pairs these lists with fixed icon sets and numbered map pins
    expect(tr.origin.stages).toHaveLength(4);
    expect(tr.wars.cards).toHaveLength(4);
    expect(tr.fall.cards).toHaveLength(4);
    expect(tr.today.throne).toHaveLength(3);
    const pins = (svg: string) => (svg.match(/class="pnum"/g) ?? []).length;
    expect(pins(HUMAN_ART.kingdoms)).toBe(tr.arathor.legend.length);
    expect(pins(HUMAN_ART.plague)).toBe(tr.fall.legend.length);
    expect(pins(HUMAN_ART.westfall)).toBe(tr.today.westfallLegend.length);
    expect(pins(HUMAN_ART.world)).toBe(tr.today.legend.length);
  });

  it('keeps TR and EN Curse of Flesh pages in step', () => {
    const [tr, en] = [CURSE_STORY.tr, CURSE_STORY.en];
    expect(en.facts.length).toBe(tr.facts.length);
    expect(en.curse.stages).toHaveLength(tr.curse.stages.length);
    expect(en.peoples.changes.map((c) => [c.from, c.to, c.slug])).toEqual(tr.peoples.changes.map((c) => [c.from, c.to, c.slug]));
    expect(en.peoples.legend.map((l) => l.name)).toEqual(tr.peoples.legend.map((l) => l.name));
    expect((CURSE_ART.world.match(/class="pnum"/g) ?? []).length).toBe(tr.peoples.legend.length);
    // every before/after name has an icon, every story link points at a written story
    for (const c of tr.peoples.changes) {
      expect(CURSE_ART.icons, c.from).toHaveProperty(c.from.toLowerCase());
      expect(CURSE_ART.icons, c.to).toHaveProperty(c.to.toLowerCase());
      if (c.slug) expect(STORY_RACES.some((r) => r.slug === c.slug), c.slug).toBe(true);
    }
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
    expect(storySlug('alliance-human')).toBe('human');
  });

  it('reaches the Curse of Flesh page only from the stories that mention the curse', () => {
    const pages = join(root, 'src/pages/[lang]/stories');
    expect(existsSync(join(pages, 'curse-of-flesh.astro'))).toBe(true);
    // not a race story, so not on the index, the race strip or the next-story links
    expect(STORY_RACES.some((r) => r.slug === 'curse-of-flesh')).toBe(false);
    expect(readFileSync(join(pages, 'index.astro'), 'utf8')).not.toMatch(/curse/i);
    for (const slug of ['gnome', 'dwarf', 'human']) {
      expect(readFileSync(join(pages, `${slug}.astro`), 'utf8'), slug).toMatch(/<CurseLink /);
    }
    expect(storySlug('horde-orc')).toBeUndefined();
  });
});
