// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { markdownProcessor, SITE_BASE } from './src/lib/markdown.ts';

// Custom domain: https://foreverwow.app (served from the root, so base is '/').
const base = SITE_BASE || '/';
const site = 'https://foreverwow.app';
// Pages that must stay out of the sitemap: the root redirect and the 404.
const unlisted = new Set([new URL(base, site).href, new URL(`${base.replace(/\/$/, '')}/404/`, site).href]);

export default defineConfig({
  output: 'static',
  site,
  base,
  // the classes list moved to /<lang>/talents/
  redirects: { '/tr/classes': '/tr/talents/', '/en/classes': '/en/talents/' },
  integrations: [
    sitemap({
      filter: (page) => !unlisted.has(page),
      // hreflang alternates between /tr/… and /en/… versions of a page
      i18n: { defaultLocale: 'tr', locales: { tr: 'tr', en: 'en' } },
    }),
  ],
  markdown: {
    processor: markdownProcessor, // src/lib/markdown.ts
  },
});
