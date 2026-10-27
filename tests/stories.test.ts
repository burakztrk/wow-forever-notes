import { describe, expect, it } from 'vitest';
import { LANGS } from '../src/config';
import { GNOME_ART_LABELS, GNOME_STORY } from '../src/i18n/stories';
import { fillArt } from '../src/lib/stories/art';
import { GNOME_ART } from '../src/lib/stories/gnome-art';

const drawings = [GNOME_ART.gears, GNOME_ART.ek, GNOME_ART.scene, GNOME_ART.dm, GNOME_ART.world];

describe('story art', () => {
  it('has a label for every placeholder in every language', () => {
    for (const lang of LANGS) {
      for (const svg of drawings) {
        const filled = fillArt(svg, GNOME_ART_LABELS[lang], '/');
        expect(filled).not.toMatch(/%%\w+%%/);
      }
    }
  });

  it('fills the base path and escapes labels', () => {
    expect(fillArt('<image href="%%base%%a.webp"/>', {}, '/sub')).toBe('<image href="/sub/a.webp"/>');
    expect(fillArt('<text>%%x%%</text>', { x: 'A & <B>' }, '/')).toBe('<text>A &amp; &lt;B&gt;</text>');
    expect(() => fillArt('%%missing%%', {}, '/')).toThrow(/missing/);
  });

  it('keeps TR and EN stories in step', () => {
    const [tr, en] = [GNOME_STORY.tr, GNOME_STORY.en];
    expect(en.facts.length).toBe(tr.facts.length);
    expect(en.wars.steps.map((s) => s.tone)).toEqual(tr.wars.steps.map((s) => s.tone));
    expect(en.wars.steps.map((s) => s.era)).toEqual(tr.wars.steps.map((s) => s.era));
    expect(en.fall.legend.map((l) => l.name)).toEqual(tr.fall.legend.map((l) => l.name));
    expect(en.today.legend.map((l) => l.name)).toEqual(tr.today.legend.map((l) => l.name));
    expect(en.today.tech.length).toBe(tr.today.tech.length);
    expect(Object.keys(GNOME_ART_LABELS.en).sort()).toEqual(Object.keys(GNOME_ART_LABELS.tr).sort());
  });
});
