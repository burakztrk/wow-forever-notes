// Head metadata shared by every page: absolute URLs for canonical/hreflang/
// Open Graph, title and description lengths, and the JSON-LD graph Google reads.
// Every page gets one graph: the Organization and WebSite entities (with stable
// @ids so Google can join them across pages), the page itself (WebPage,
// CollectionPage, AboutPage or BlogPosting) and its BreadcrumbList.
// Strategy, checks and the sources to follow: docs/seo.md.
import { SITE_TITLE, type Lang } from '../config';
import appConfig from '../data/app-config.json';
import { withBase } from '../utils/url';

export const SITE_URL = 'https://foreverwow.app';
export const REPO_URL = 'https://github.com/burakztrk/wow-forever-notes';

export const OG_LOCALE: Record<Lang, string> = { tr: 'tr_TR', en: 'en_US' };

// Google shows about 50–60 characters of a title and 150–160 of a description.
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 160;

export function absoluteUrl(path: string, site: URL | string = SITE_URL): string {
  return new URL(path, site).href;
}

export function ogImage(lang: Lang, site?: URL | string): string {
  return absoluteUrl(withBase(`/og/${lang}.png`), site);
}

/** `<title>`: the page title with the site name after it while that still fits, the page title alone otherwise. */
export function pageTitle(title: string | undefined, max = TITLE_MAX): string {
  if (!title) return SITE_TITLE;
  const full = `${title} · ${SITE_TITLE}`;
  return full.length <= max ? full : title;
}

/**
 * Meta description cut to `max` characters: at the last sentence end that fits,
 * else at the last word with an ellipsis. Google cuts long ones anyway; this way
 * the cut is ours and never falls mid-word.
 */
export function clampDescription(text: string, max = DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const head = clean.slice(0, max);
  const sentence = Math.max(head.lastIndexOf('. '), head.lastIndexOf('! '), head.lastIndexOf('? '));
  if (sentence >= max * 0.6) return head.slice(0, sentence + 1);
  const word = head.slice(0, max - 1).lastIndexOf(' ');
  return `${head.slice(0, word > 0 ? word : max - 1).replace(/[\s,;:·–—-]+$/, '')}…`;
}

// ---- JSON-LD ---------------------------------------------------------------

const orgId = (site?: URL | string) => absoluteUrl(withBase('/#organization'), site);
const websiteId = (lang: Lang, site?: URL | string) => absoluteUrl(withBase(`/${lang}/#website`), site);

/** Profiles that belong to the site: the public repo and the app's store pages. */
export function sameAs(): string[] {
  return [REPO_URL, appConfig.android.storeUrl, appConfig.ios.storeUrl].filter((u): u is string => !!u);
}

export function organizationJsonLd(site?: URL | string) {
  return {
    '@type': 'Organization',
    '@id': orgId(site),
    name: SITE_TITLE,
    url: absoluteUrl(withBase('/'), site),
    logo: { '@type': 'ImageObject', url: absoluteUrl(withBase('/og/icon-512.png'), site), width: 512, height: 512 },
    sameAs: sameAs(),
  };
}

export function websiteJsonLd(lang: Lang, description: string, site?: URL | string) {
  return {
    '@type': 'WebSite',
    '@id': websiteId(lang, site),
    name: SITE_TITLE,
    alternateName: 'Forever Campfire',
    description,
    url: absoluteUrl(withBase(`/${lang}/`), site),
    inLanguage: lang,
    publisher: { '@id': orgId(site) },
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

export interface Crumb {
  name: string;
  url: string; // root-relative, already through withBase()
}

export function breadcrumbJsonLd(crumbs: Crumb[], site?: URL | string) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.url, site),
    })),
  };
}

export type PageType = 'WebPage' | 'CollectionPage' | 'AboutPage' | 'SearchResultsPage';

export interface PageMeta {
  type: PageType;
  name: string;
  description: string;
  url: string; // root-relative
  lang: Lang;
  image: string; // absolute
  hasBreadcrumb: boolean;
}

export function webPageJsonLd(page: PageMeta, site?: URL | string) {
  const url = absoluteUrl(page.url, site);
  return {
    '@type': page.type,
    '@id': `${url}#webpage`,
    name: page.name,
    description: page.description,
    url,
    inLanguage: page.lang,
    isPartOf: { '@id': websiteId(page.lang, site) },
    publisher: { '@id': orgId(site) },
    primaryImageOfPage: { '@type': 'ImageObject', url: page.image },
    breadcrumb: page.hasBreadcrumb ? { '@id': `${url}#breadcrumb` } : undefined,
  };
}

export interface PostMeta {
  title: string;
  description?: string;
  date: Date;
  updated?: Date;
  url: string; // root-relative, already through withBase()
  lang: Lang;
  tags: string[];
  build?: string;
  sections?: string[]; // class / race / profession names the post covers
}

export function blogPostingJsonLd(post: PostMeta, site?: URL | string) {
  const url = absoluteUrl(post.url, site);
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title.length > 110 ? `${post.title.slice(0, 109)}…` : post.title,
    description: post.description,
    datePublished: post.date.toISOString(),
    dateModified: (post.updated ?? post.date).toISOString(),
    inLanguage: post.lang,
    url,
    mainEntityOfPage: url,
    image: ogImage(post.lang, site),
    keywords: [...post.tags, ...(post.sections ?? [])].join(', ') || undefined,
    about: { '@type': 'VideoGame', name: 'World of Warcraft: Forever', alternateName: 'WoW Forever' },
    version: post.build,
    isPartOf: { '@id': websiteId(post.lang, site) },
    author: { '@id': orgId(site) },
    publisher: { '@id': orgId(site) },
  };
}

/** One `@graph` for the page: drops empty nodes and undefined fields. */
export function jsonLdGraph(nodes: (object | undefined | false)[]) {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) };
}

// JSON for a <script type="application/ld+json">: "<" is escaped so a title
// can never close the script element.
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
