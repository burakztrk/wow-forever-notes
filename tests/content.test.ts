import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { checkPosts } from '../scripts/lib/content-check';

// Renders the real posts through the site's markdown processor (gfm,
// smartypants, remark-directive, remark-glossary), like `astro build` does.
describe('blog posts', async () => {
  const { problems, posts } = await checkPosts(path.join(process.cwd(), 'src/content/blog'));

  it('all render without problems', () => {
    expect(problems).toEqual([]);
  });

  it.each(posts.filter((p) => !p.draft).map((p) => [p.file, p] as const))('%s has a body with tooltips', (_, post) => {
    expect(post.html.trim()).not.toBe('');
    expect(post.html).toContain('data-tip=');
    expect(post.glossaryIds.length).toBeGreaterThan(0);
  });

  it("resolves names with apostrophes after smartypants curls them (Winter's Chill)", () => {
    const post = posts.find((p) => p.file === 'en/wow-forever-2026-10-01.md')!;
    expect(post.html).toMatch(/data-tip="talent\/calc-mage-frost-winter-s-chill"[^>]*>(<img[^>]*>)?Winter’s Chill</);
  });
});
