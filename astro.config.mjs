// @ts-check
import { defineConfig } from 'astro/config';
import { markdownProcessor, SITE_BASE } from './src/lib/markdown.ts';

// Custom domain: https://foreverwow.app (served from the root, so base is '/').
const base = SITE_BASE || '/';

export default defineConfig({
  output: 'static',
  site: 'https://foreverwow.app',
  base,
  markdown: {
    processor: markdownProcessor, // src/lib/markdown.ts
  },
});
