import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { describe, expect, it } from 'vitest';
import { createGlossary } from '../src/lib/glossary';
import type { GlossaryEntry } from '../src/lib/glossary-types';
import remarkGlossary from '../src/lib/remark-glossary';

const base = { desc: 'x', status: 'unchanged' as const, sourceUrl: 'https://example.test' };
const entries: GlossaryEntry[] = [
  { ...base, id: 'spell/hunter-aimed-shot', kind: 'spell', name: 'Aimed Shot', class: 'hunter', icon: 'inv_spear_07' },
  { ...base, id: 'spell/hunter-arcane-shot', kind: 'spell', name: 'Arcane Shot', class: 'hunter' },
  { ...base, id: 'spell/mage-mana-shield', kind: 'spell', name: 'Mana Shield', class: 'mage' },
  { ...base, id: 'spell/mage-polymorph', kind: 'spell', name: 'Polymorph', class: 'mage' },
  { ...base, id: 'talent/mage-improved-channeling', kind: 'talent', name: 'Improved Channeling', class: 'mage' },
  { ...base, id: 'spell/mage-presence-of-mind', kind: 'spell', name: 'Presence of Mind', class: 'mage' },
  { ...base, id: 'talent/mage-presence-of-mind', kind: 'talent', name: 'Presence of Mind', class: 'mage' },
  { ...base, id: 'talent/warrior-shield-spec', kind: 'talent', name: 'Shield Specialization', class: 'warrior' },
  { ...base, id: 'talent/paladin-shield-spec', kind: 'talent', name: 'Shield Specialization', class: 'paladin' },
  { ...base, id: 'racial/racial-orc-blood-fury', kind: 'racial', name: 'Blood Fury', races: ['horde-orc'] },
];

async function render(md: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkGlossary, { entries, base: '/wow-forever-notes' })
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(md);
  return { html: String(file), ids: (file.data as any).astro.frontmatter.glossaryIds as string[] };
}

describe('createGlossary', () => {
  const g = createGlossary(entries);
  it('resolves case-insensitively and prefers spells over same-class talents', () => {
    expect(g.resolve('aimed shot').entry?.id).toBe('spell/hunter-aimed-shot');
    expect(g.resolve('Presence of Mind').entry?.id).toBe('spell/mage-presence-of-mind');
    expect(g.resolve('Presence of Mind', { kind: 'talent' }).entry?.id).toBe('talent/mage-presence-of-mind');
  });
  it('asks for a class when a name is shared across classes', () => {
    expect(g.resolve('Shield Specialization').error).toMatch(/ambiguous.*class=/);
    expect(g.resolve('Shield Specialization', { cls: 'paladin' }).entry?.id).toBe('talent/paladin-shield-spec');
  });
  it('suggests close names for unknown ones', () => {
    expect(g.resolve('Aimed Shots').error).toMatch(/did you mean: Aimed Shot/);
  });
  it('only auto-links unambiguous multi-word names', () => {
    const names = g.autoLinkNames();
    expect(names).toContain('Aimed Shot');
    expect(names).not.toContain('Polymorph');
    expect(names).not.toContain('Shield Specialization');
  });
});

describe('remarkGlossary', () => {
  it('turns directives into tooltip spans with icons', async () => {
    const { html, ids } = await render('Use :spell[Aimed Shot] and :racial[Blood Fury].');
    expect(html).toContain('class="wf-tip wf-tip--spell" data-tip="spell/hunter-aimed-shot" tabindex="0"');
    expect(html).toContain('src="/wow-forever-notes/icons/inv_spear_07.jpg"');
    expect(ids).toEqual(['spell/hunter-aimed-shot', 'racial/racial-orc-blood-fury']);
  });

  it('fails the build for names that are not in the glossary', async () => {
    await expect(render('Cast :spell[Fireball of Doom] now.')).rejects.toThrow(/unknown name "Fireball of Doom"/);
  });

  it('checks the directive kind', async () => {
    await expect(render(':talent[Aimed Shot]')).rejects.toThrow(/no match for \{talent\}/);
  });

  it('auto-links the first plain mention, keeping Turkish suffixes outside', async () => {
    const { html } = await render("Aimed Shot'ın hasarı arttı. Aimed Shot yine güçlü.");
    expect(html).toMatch(/<span class="wf-tip wf-tip--spell"[^>]*>.*Aimed Shot<\/span>'ın/);
    expect(html.match(/data-tip=/g)).toHaveLength(1);
  });

  it('prefers the longest name and leaves headings, code and links alone', async () => {
    const md = '## Aimed Shot\n\nSee `Arcane Shot` and [Mana Shield](https://x.test). Improved Channeling helps.';
    const { html, ids } = await render(md);
    expect(html).toContain('<h2>Aimed Shot</h2>');
    expect(html).toContain('<code>Arcane Shot</code>');
    expect(ids).toEqual(['talent/mage-improved-channeling']);
  });

  it('restores colon text that is not a glossary directive', async () => {
    const { html } = await render('Rank 8:Value changed.');
    expect(html).toContain('Rank 8:Value changed.');
  });
});
