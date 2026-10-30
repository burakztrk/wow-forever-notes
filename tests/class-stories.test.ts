import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { LANGS } from '../src/config';
import { CLASS_STORIES } from '../src/i18n/class-stories';
import { STORY_CLASSES, storyClass, storyClassSlug } from '../src/lib/stories/classes';

const root = fileURLToPath(new URL('..', import.meta.url));

describe('STORY_CLASSES metadata', () => {
  it('defines 9 classes with valid icons and colors', () => {
    expect(STORY_CLASSES).toHaveLength(9);
    for (const c of STORY_CLASSES) {
      expect(c.id).toBeTruthy();
      expect(c.name).toBeTruthy();
      expect(c.color).toMatch(/^var\(--class-\w+\)$/);
      expect(existsSync(join(root, 'public/icons', `${c.icon}.jpg`)), c.icon).toBe(true);
    }
  });

  it('correctly resolves storyClass and storyClassSlug', () => {
    expect(storyClass('mage')?.slug).toBe('mage');
    expect(storyClassSlug('mage')).toBe('mage');
    expect(storyClass('unknown')).toBeUndefined();
  });
});

describe('class story copy symmetry', () => {
  it('keeps TR and EN in step for all written class stories', () => {
    for (const [slug, story] of Object.entries(CLASS_STORIES)) {
      for (const lang of LANGS) {
        expect(story[lang], `${slug} ${lang}`).toBeDefined();
        expect(story[lang].metaDescription.length, `${slug} ${lang} meta`).toBeGreaterThan(10);
        expect(story[lang].lead.length, `${slug} ${lang} lead`).toBeGreaterThan(10);
      }
      const [tr, en] = [story.tr, story.en];
      expect(en.facts.length, `${slug} facts`).toBe(tr.facts.length);
      expect(Object.keys(en.chapters), `${slug} chapters`).toEqual(Object.keys(tr.chapters));
      expect(en.origin.stages.length, `${slug} stages`).toBe(tr.origin.stages.length);
      expect(en.two.cards.length, `${slug} ch2 cards`).toBe(tr.two.cards.length);
      expect(en.two.cards.map((c) => c.tone)).toEqual(tr.two.cards.map((c) => c.tone));
      expect(en.three.cards.length, `${slug} ch3 cards`).toBe(tr.three.cards.length);
      expect(en.three.cards.map((c) => c.tone)).toEqual(tr.three.cards.map((c) => c.tone));
      expect(en.four.specs.length, `${slug} specs`).toBe(tr.four.specs.length);
      expect(en.four.specs.map((s) => s.name)).toEqual(tr.four.specs.map((s) => s.name));
      expect(en.five.figures.length, `${slug} figures`).toBe(tr.five.figures.length);
      expect(en.five.figures.map((f) => f.name)).toEqual(tr.five.figures.map((f) => f.name));
    }
  });

  it('has page templates for every written class story', () => {
    for (const [slug] of Object.entries(CLASS_STORIES)) {
      const pagePath = join(root, 'src/pages/[lang]/classes', `${slug}.astro`);
      expect(existsSync(pagePath), `Page exists for ${slug}`).toBe(true);
    }
  });
});
