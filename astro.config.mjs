// @ts-check
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { markdownProcessor, SITE_BASE } from './src/lib/markdown.ts';

// Custom domain: https://foreverwow.app (served from the root, so base is '/').
const base = SITE_BASE || '/';
const site = 'https://foreverwow.app';
// Pages that must stay out of the sitemap: the root redirect and the 404.
const unlisted = new Set([new URL(base, site).href, new URL(`${base.replace(/\/$/, '')}/404/`, site).href]);

// <lastmod> for the patch notes (their `updated` or `date` frontmatter) and for the
// pages that list them (the newest post). Other pages get none: a lastmod that is
// not a real content change teaches Google to ignore it.
const postDates = new Map();
for (const lang of ['tr', 'en']) {
  const dir = `./src/content/blog/${lang}`;
  if (!existsSync(dir)) continue;
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const head = readFileSync(`${dir}/${file}`, 'utf8').split('\n---')[0];
    if (/^draft:\s*true/m.test(head)) continue;
    const date = (head.match(/^updated:\s*(\S+)/m) ?? head.match(/^date:\s*(\S+)/m))?.[1];
    if (date) postDates.set(new URL(`${base.replace(/\/$/, '')}/${lang}/blog/${file.replace(/\.md$/, '')}/`, site).href, date);
  }
}
const newest = (lang) =>
  [...postDates].filter(([url]) => url.includes(`/${lang}/blog/`)).map(([, d]) => d).sort().pop();
const lastmod = (url) => {
  if (postDates.has(url)) return postDates.get(url);
  const m = url.match(/\/(tr|en)\/(notes\/)?$/);
  return m ? newest(m[1]) : undefined;
};

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
    // class stories moved from /<lang>/stories/<class>/ to /<lang>/classes/<class>/, race stories from
    // /<lang>/stories/<race>/ to /<lang>/races/<race>/ (src/lib/stories/urls.ts), and a race's own page
    // /<lang>/races/<id>/ to /<lang>/stats/<id>/
    ...Object.fromEntries(
      ['tr', 'en'].flatMap((l) => [
        ...['mage', 'hunter', 'paladin', 'warrior', 'rogue', 'priest', 'shaman', 'warlock', 'druid'].map((c) => [`/${l}/stories/${c}`, `/${l}/classes/${c}/`]),
        ...['gnome', 'dwarf', 'human', 'night-elf', 'orc', 'troll', 'tauren', 'undead', 'skyborne'].map((r) => [`/${l}/stories/${r}`, `/${l}/races/${r}/`]),
        ...[
          'alliance-human',
          'alliance-dwarf',
          'alliance-night-elf',
          'alliance-gnome',
          'alliance-skyborne-high-order',
          'horde-orc',
          'horde-undead',
          'horde-tauren',
          'horde-troll',
          'horde-skyborne-windshaper',
        ].map((r) => [`/${l}/races/${r}`, `/${l}/stats/${r}/`]),
      ]),
    ),
  },
  integrations: [
    sitemap({
      filter: (page) => !unlisted.has(page),
      serialize: (item) => {
        const date = lastmod(item.url);
        return date ? { ...item, lastmod: new Date(date).toISOString() } : item;
      },
      // hreflang alternates between /tr/… and /en/… versions of a page
      i18n: { defaultLocale: 'tr', locales: { tr: 'tr', en: 'en' } },
    }),
  ],
  markdown: {
    processor: markdownProcessor, // src/lib/markdown.ts
  },
});
