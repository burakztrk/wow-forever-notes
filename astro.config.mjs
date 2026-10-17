// @ts-check
import { defineConfig } from 'astro/config';
import { markdownProcessor, SITE_BASE } from './src/lib/markdown.ts';

// GitHub Pages project site: https://burakztrk.github.io/wow-forever-notes/
// For a custom domain later (e.g. wow.ozturk.ai) change `site` and set
// SITE_BASE to '/' — links go through withBase(), so nothing else changes.
const base = SITE_BASE;

export default defineConfig({
  output: 'static',
  site: 'https://burakztrk.github.io',
  base,
  markdown: {
    processor: markdownProcessor, // src/lib/markdown.ts
  },
});
