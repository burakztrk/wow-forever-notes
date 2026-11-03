import type { APIRoute } from 'astro';
import { LANGS, SITE_TITLE, type Lang } from '../../config';
import { ui } from '../../i18n';
import { getPosts } from '../../lib/blog';
import { absoluteUrl } from '../../lib/seo';
import { langHome, postUrl, withBase } from '../../utils/url';

// /<lang>/rss.xml: the patch notes of one language as RSS 2.0 (newest first),
// so feed readers and aggregators pick up a new build the day it is posted.
export function getStaticPaths() {
  return LANGS.map((lang) => ({ params: { lang } }));
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ params, site }) => {
  const lang = params.lang as Lang;
  const t = ui(lang);
  const posts = (await getPosts(lang)).slice(0, 50);
  const self = absoluteUrl(withBase(`/${lang}/rss.xml`), site);
  const items = posts
    .map((p) => {
      const url = absoluteUrl(postUrl(lang, p.slug), site);
      return [
        '<item>',
        `<title>${esc(p.data.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<pubDate>${p.data.date.toUTCString()}</pubDate>`,
        p.data.excerpt ? `<description>${esc(p.data.excerpt)}</description>` : '',
        ...p.data.tags.map((tag) => `<category>${esc(tag)}</category>`),
        '</item>',
      ].join('');
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(`${SITE_TITLE} · ${t.notesTitle}`)}</title>
<link>${absoluteUrl(langHome(lang), site)}</link>
<description>${esc(t.metaNotes)}</description>
<language>${lang}</language>
<atom:link href="${self}" rel="self" type="application/rss+xml"/>
${posts[0] ? `<lastBuildDate>${posts[0].data.date.toUTCString()}</lastBuildDate>` : ''}
${items}
</channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
