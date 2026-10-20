// Head metadata shared by every page: absolute URLs for canonical/hreflang/
// Open Graph and the JSON-LD blocks Google reads (WebSite + SearchAction on
// the home pages, BlogPosting on patch notes).
import { SITE_TITLE, type Lang } from '../config';
import { withBase } from '../utils/url';

export const SITE_URL = 'https://foreverwow.app';

export const OG_LOCALE: Record<Lang, string> = { tr: 'tr_TR', en: 'en_US' };

export function absoluteUrl(path: string, site: URL | string = SITE_URL): string {
  return new URL(path, site).href;
}

export function ogImage(lang: Lang, site?: URL | string): string {
  return absoluteUrl(withBase(`/og/${lang}.png`), site);
}

const publisher = (site?: URL | string) => ({
  '@type': 'Organization',
  name: SITE_TITLE,
  url: absoluteUrl(withBase('/'), site),
  logo: { '@type': 'ImageObject', url: absoluteUrl(withBase('/og/icon-512.png'), site) },
});

export function websiteJsonLd(lang: Lang, description: string, site?: URL | string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_TITLE,
    description,
    url: absoluteUrl(withBase(`/${lang}/`), site),
    inLanguage: lang,
    publisher: publisher(site),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${absoluteUrl(withBase(`/${lang}/search/`), site)}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export interface PostMeta {
  title: string;
  description?: string;
  date: Date;
  url: string; // root-relative, already through withBase()
  lang: Lang;
  tags: string[];
}

export function blogPostingJsonLd(post: PostMeta, site?: URL | string) {
  const url = absoluteUrl(post.url, site);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date.toISOString(),
    dateModified: post.date.toISOString(),
    inLanguage: post.lang,
    url,
    mainEntityOfPage: url,
    image: ogImage(post.lang, site),
    keywords: post.tags.length ? post.tags.join(', ') : undefined,
    author: publisher(site),
    publisher: publisher(site),
  };
}

// JSON for a <script type="application/ld+json">: "<" is escaped so a title
// can never close the script element.
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
