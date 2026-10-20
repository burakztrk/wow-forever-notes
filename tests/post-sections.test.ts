import path from 'node:path';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { describe, expect, it } from 'vitest';
import { checkPosts, sectionMismatches } from '../scripts/lib/content-check';
import { createSectionResolver, notesFor, parseSections, sectionsAsBlocks } from '../src/lib/post-sections';
import remarkSections, { type RemarkSectionsOptions } from '../src/lib/remark-sections';

const resolver = createSectionResolver({
  classes: [
    { id: 'warrior', name: 'Warrior' },
    { id: 'mage', name: 'Mage' },
  ],
  races: [
    { id: 'alliance-gnome', name: 'Gnomes' },
    { id: 'alliance-night-elf', name: 'Night elves' },
    { id: 'horde-skyborne-windshaper', name: 'Skyborne' },
    { id: 'alliance-skyborne-high-order', name: 'Skyborne (High Order)' },
  ],
  professions: [{ slug: 'mining', name: 'Mining' }],
});

async function render(md: string, options: RemarkSectionsOptions = {}) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkSections, { resolver, ...options })
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(md);
  return String(file);
}

describe('section resolver', () => {
  it('matches class and race names, ids and plurals', () => {
    expect(resolver.resolve('class', 'Warrior').ids).toEqual(['warrior']);
    expect(resolver.resolve('race', 'Gnome').ids).toEqual(['alliance-gnome']);
    expect(resolver.resolve('race', 'Night Elf').ids).toEqual(['alliance-night-elf']);
    expect(resolver.resolve('profession', 'Mining').ids).toEqual(['mining']);
  });

  it('maps Skyborne to both Skyborne races', () => {
    expect(resolver.resolve('race', 'Skyborne').ids?.sort()).toEqual([
      'alliance-skyborne-high-order',
      'horde-skyborne-windshaper',
    ]);
  });

  it('takes an explicit id and rejects unknown names', () => {
    expect(resolver.resolve('profession', 'Genel', 'general').ids).toEqual(['general']);
    expect(resolver.resolve('class', 'Monk').error).toMatch(/unknown class "Monk"/);
    expect(resolver.resolve('class', 'X', 'monk').error).toMatch(/unknown class id/);
  });
});

describe('remark-sections', () => {
  const md = [
    '## Class changes',
    '',
    '### General',
    '',
    '- for everyone',
    '',
    '::class[Warrior]',
    '',
    '- rage',
    '',
    '::class[Mage]',
    '',
    '- frost',
    '',
    '## Racial changes',
    '',
    '::race[Gnome]',
    '',
    '- Eureka',
    '',
    '## Bug fixes',
    '',
    '- rain',
  ].join('\n');

  it('wraps each directive and what follows in an open <details>', async () => {
    const html = await render(md);
    expect(html).toContain(
      '<details class="note-section note-section--class" data-section="class" data-ids="warrior" open><summary><h3 id="class-warrior">Warrior</h3></summary>',
    );
    const sections = parseSections(html);
    expect(sections.map((s) => [s.kind, s.ids, s.title, s.anchor])).toEqual([
      ['class', ['warrior'], 'Warrior', 'class-warrior'],
      ['class', ['mage'], 'Mage', 'class-mage'],
      ['race', ['alliance-gnome'], 'Gnome', 'race-gnome'],
    ]);
    expect(sections[0].html).toContain('rage');
    expect(sections[0].html).not.toContain('frost');
    // a heading ends the section: "rain" stays outside
    expect(sections[2].html).not.toContain('rain');
    expect(html).toMatch(/<\/details>\s*<h2>Bug fixes<\/h2>/);
    // plain headings stay plain
    expect(html).toContain('<h3>General</h3>');
  });

  it('can start sections collapsed', async () => {
    expect(await render('::class[Mage]\n\n- x', { open: false })).not.toContain(' open');
  });

  it('fails on unknown names and nested directives', async () => {
    await expect(render('::class[Monk]')).rejects.toThrow(/unknown class "Monk"/);
    await expect(render('- item\n\n  ::class[Mage]')).rejects.toThrow(/top level/);
  });

  it('turns sections into <section> blocks for the data API', async () => {
    const blocks = sectionsAsBlocks(await render(md));
    expect(blocks).not.toMatch(/<details|<summary/);
    expect(blocks).toContain(
      '<section class="note-section note-section--class" data-section="class" data-ids="warrior"><h3 id="class-warrior">Warrior</h3>',
    );
  });
});

describe('notesFor', () => {
  const post = (date: string, html: string) => ({ date: new Date(date), sections: parseSections(html) });
  it('lists matching sections newest first', async () => {
    const a = post('2026-10-01', await render('::class[Mage]\n\n- old'));
    const b = post('2026-10-16', await render('::class[Mage]\n\n- new\n\n::class[Warrior]\n\n- w'));
    const notes = notesFor([a, b], 'class', 'mage');
    expect(notes.map((n) => n.post.date.toISOString().slice(0, 10))).toEqual(['2026-10-16', '2026-10-01']);
    expect(notes[0].sections.map((s) => s.title)).toEqual(['Mage']);
    expect(notesFor([a, b], 'profession')).toEqual([]);
  });
});

describe('real posts', async () => {
  const { posts } = await checkPosts(path.join(process.cwd(), 'src/content/blog'));

  it('have the same sections in every language', () => {
    expect(sectionMismatches(posts)).toEqual([]);
  });

  it('16 October has Hunter, Mage, Druid and every race change as sections', () => {
    const post = posts.find((p) => p.file === 'tr/wow-forever-2026-10-16.md')!;
    const sections = parseSections(post.html);
    expect(sections.filter((s) => s.kind === 'class').map((s) => s.ids[0])).toEqual(['hunter', 'mage', 'druid']);
    expect(sections.filter((s) => s.kind === 'race').flatMap((s) => s.ids)).toContain('alliance-skyborne-high-order');
    expect(sections.find((s) => s.ids.includes('horde-tauren'))!.glossaryIds).toContain('racial/racial-tauren-endurance');
  });

  it('reports a language whose sections differ', () => {
    const html = posts.find((p) => p.file === 'tr/wow-forever-2026-10-16.md')!.html;
    const problems = sectionMismatches([
      { file: 'en/x.md', draft: false, html, glossaryIds: [] },
      { file: 'tr/x.md', draft: false, html: html.replace('data-ids="hunter"', 'data-ids="mage"'), glossaryIds: [] },
    ]);
    expect(problems).toHaveLength(1);
  });
});
