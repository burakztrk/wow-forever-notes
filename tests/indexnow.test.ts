import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
// @ts-ignore plain .mjs script without type declarations
import { KEY, SITE, sitemapLocs, urlsForChangedFiles } from '../scripts/indexnow.mjs';

describe('indexnow', () => {
  it('serves the key file the key points to', () => {
    const file = `public/${KEY}.txt`;
    expect(existsSync(file)).toBe(true);
    expect(readFileSync(file, 'utf8').trim()).toBe(KEY);
  });

  it('announces a changed post and the pages that list it', () => {
    const urls = urlsForChangedFiles(['src/content/blog/tr/wow-forever-2026-11-04.md', 'src/content/blog/en/wow-forever-2026-11-04.md']);
    expect(urls).toContain(`${SITE}/tr/blog/wow-forever-2026-11-04/`);
    expect(urls).toContain(`${SITE}/en/blog/wow-forever-2026-11-04/`);
    expect(urls).toContain(`${SITE}/tr/notes/`);
    expect(urls).toContain(`${SITE}/en/rss.xml`);
  });

  it('announces nothing for changes outside the site', () => {
    expect(urlsForChangedFiles(['docs/seo.md', 'tests/seo.test.ts', '.github/workflows/ci.yml'])).toEqual([]);
  });

  it('reads <loc> entries', () => {
    expect(sitemapLocs('<urlset><url><loc>https://a/x/</loc></url><url><loc> https://a/y/ </loc></url></urlset>')).toEqual([
      'https://a/x/',
      'https://a/y/',
    ]);
  });
});
