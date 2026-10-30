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
  // the classes list lives at /<lang>/classes/; its short-lived home /<lang>/talents/ (the planner pages stay under it) redirects there
  redirects: {
    '/tr/talents': '/tr/classes/',
    '/en/talents': '/en/classes/',
    // /<lang>/stats/<class>/ has no index of its own: the list is /<lang>/classes/
    '/tr/stats': '/tr/classes/',
    '/en/stats': '/en/classes/',
    // class stories moved from /<lang>/stories/<class>/ to /<lang>/classes/<class>/ (src/lib/stories/urls.ts)
    ...Object.fromEntries(
      ['tr', 'en'].flatMap((l) =>
        ['mage', 'hunter', 'paladin', 'warrior', 'rogue', 'priest', 'shaman', 'warlock', 'druid'].map((c) => [`/${l}/stories/${c}`, `/${l}/classes/${c}/`]),
      ),
    ),
  },
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
