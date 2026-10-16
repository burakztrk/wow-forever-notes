// @ts-check
import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import remarkGlossary from './src/lib/remark-glossary.ts';

// GitHub Pages project site: https://burakztrk.github.io/wow-forever-notes/
// For a custom domain later (e.g. wow.ozturk.ai) change `site` and set
// `base: '/'` — links go through withBase(), so nothing else changes.
const base = '/wow-forever-notes';

export default defineConfig({
  output: 'static',
  site: 'https://burakztrk.github.io',
  base,
  markdown: {
    // Astro 7's default processor (Sätteri) has no remark plugins; the unified
    // processor runs ours: :spell[…] / :talent[…] / :racial[…] → tooltip spans
    // (see src/lib/remark-glossary.ts)
    processor: unified({ remarkPlugins: [remarkDirective, [remarkGlossary, { base }]] }),
  },
});
