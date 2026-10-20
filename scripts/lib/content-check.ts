import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { markdownConfigDefaults, parseFrontmatter } from '@astrojs/markdown-remark';
import { markdownProcessor } from '../../src/lib/markdown';
import { parseSections } from '../../src/lib/post-sections';
import { findMissingTranslations } from '../../src/lib/posts';

// Renders every post with the site's own markdown processor. Astro's content
// loader only logs render errors and ships the post with empty HTML, so this
// is what makes them fatal (scripts/check-content.ts runs it before the build):
//   - every post must exist in every language
//   - every post must render (unknown glossary names throw in remark-glossary)
//   - a non-draft post must not render to empty HTML
//   - every language has the same class / race / profession sections, in the
//     same order (the class, race and professions pages list them per language)

export interface RenderedPost {
  file: string; // "tr/wow-forever-2026-10-01.md"
  draft: boolean;
  html: string;
  glossaryIds: string[];
}

export async function checkPosts(blogDir: string): Promise<{ problems: string[]; posts: RenderedPost[] }> {
  const files = readdirSync(blogDir, { recursive: true, encoding: 'utf8' })
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.split(path.sep).join('/'))
    .sort();
  const problems = findMissingTranslations(files.map((f) => f.replace(/\.md$/, '')));
  const renderer = await markdownProcessor.createRenderer({ ...markdownConfigDefaults });
  const posts: RenderedPost[] = [];

  for (const file of files) {
    const abs = path.join(blogDir, file);
    const { frontmatter, content } = parseFrontmatter(readFileSync(abs, 'utf8'));
    const draft = frontmatter.draft === true;
    try {
      const { code, metadata } = await renderer.render(content, { fileURL: pathToFileURL(abs), frontmatter });
      const glossaryIds = (metadata.frontmatter.glossaryIds as string[] | undefined) ?? [];
      posts.push({ file, draft, html: code, glossaryIds });
      if (!draft && !code.trim()) problems.push(`${file}: renders to empty HTML`);
    } catch (err) {
      problems.push(`${file}: ${(err as Error).message}`);
    }
  }
  problems.push(...sectionMismatches(posts));
  return { problems, posts };
}

const sectionList = (html: string) => parseSections(html).map((s) => `${s.kind}:${s.ids.join('+')}`);

export function sectionMismatches(posts: RenderedPost[]): string[] {
  const bySlug = new Map<string, RenderedPost[]>();
  for (const p of posts) {
    const slug = p.file.slice(p.file.indexOf('/') + 1);
    bySlug.set(slug, [...(bySlug.get(slug) ?? []), p]);
  }
  const problems: string[] = [];
  for (const [slug, group] of bySlug) {
    const [first, ...rest] = group;
    const want = sectionList(first.html).join(', ');
    for (const p of rest) {
      const got = sectionList(p.html).join(', ');
      if (got !== want) {
        problems.push(`${slug}: sections differ between languages\n  ${first.file}: ${want || '(none)'}\n  ${p.file}: ${got || '(none)'}`);
      }
    }
  }
  return problems;
}
