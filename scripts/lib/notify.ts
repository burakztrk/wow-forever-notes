import { createSign } from 'node:crypto';

// Pure helpers for scripts/notify.ts: which posts a push added, what the FCM
// message for each looks like, and the OAuth assertion for the service
// account. No network here, so everything is unit-tested.

export const SITE = 'https://foreverwow.app';
export const LANGS = ['tr', 'en'] as const;
export type NotifyLang = (typeof LANGS)[number];

export interface NewPost {
  lang: NotifyLang;
  slug: string;
}

// git diff --name-only --diff-filter=A output → new blog posts
export function addedPosts(paths: string[]): NewPost[] {
  const out: NewPost[] = [];
  for (const p of paths) {
    const m = p.trim().match(/^src\/content\/blog\/(tr|en)\/([^/]+)\.md$/);
    if (m) out.push({ lang: m[1] as NotifyLang, slug: m[2] });
  }
  return out;
}

// A backfill can add many posts at once; notify only the newest per language
// (slugs are date-based: wow-forever-YYYY-MM-DD).
export function newestPerLang<T extends NewPost>(posts: T[]): T[] {
  const best = new Map<NotifyLang, T>();
  for (const p of posts) {
    const cur = best.get(p.lang);
    if (!cur || p.slug > cur.slug) best.set(p.lang, p);
  }
  return LANGS.flatMap((l) => (best.has(l) ? [best.get(l)!] : []));
}

export interface Frontmatter {
  title?: string;
  excerpt?: string;
  build?: string;
  draft?: boolean;
}

// Reads the flat `key: value` lines of a post's frontmatter (title, excerpt,
// build, draft). Lists and nested values are ignored.
export function readFrontmatter(markdown: string): Frontmatter {
  const m = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const fm: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (!kv || kv[2] === '') continue;
    fm[kv[1]] = unquote(kv[2].trim());
  }
  return {
    title: fm.title,
    excerpt: fm.excerpt,
    build: fm.build,
    draft: fm.draft === 'true',
  };
}

function unquote(v: string): string {
  if (v.length >= 2 && v.startsWith('"') && v.endsWith('"')) return v.slice(1, -1).replace(/\\"/g, '"');
  if (v.length >= 2 && v.startsWith("'") && v.endsWith("'")) return v.slice(1, -1).replace(/''/g, "'");
  return v;
}

export const topicFor = (lang: NotifyLang) => `notes-${lang}`;
export const postUrl = (p: NewPost) => `${SITE}/${p.lang}/blog/${p.slug}/`;

const clip = (s: string, max: number) => (s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s);

// FCM HTTP v1 message. The app opens data.url (a website post URL) in place.
export function buildMessage(post: NewPost, fm: Frontmatter) {
  const title = fm.title ?? post.slug;
  const body = clip(fm.excerpt ?? '', 230);
  return {
    message: {
      topic: topicFor(post.lang),
      notification: { title, body },
      data: { type: 'post', lang: post.lang, slug: post.slug, url: postUrl(post) },
      android: { priority: 'high', notification: { channel_id: 'notes', tag: post.slug } },
      apns: { payload: { aps: { 'thread-id': 'notes' } } },
    },
  };
}

export interface ServiceAccount {
  project_id: string;
  client_email: string;
  private_key: string;
}

export function parseServiceAccount(json: string): ServiceAccount {
  const sa = JSON.parse(json) as Partial<ServiceAccount>;
  if (!sa.project_id || !sa.client_email || !sa.private_key) {
    throw new Error('service account JSON needs project_id, client_email and private_key');
  }
  return sa as ServiceAccount;
}

const b64url = (data: string | Buffer) => Buffer.from(data).toString('base64url');

// Signed JWT for the OAuth 2.0 jwt-bearer grant (scope: FCM send).
export function oauthAssertion(sa: ServiceAccount, nowSeconds = Math.floor(Date.now() / 1000)): string {
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/firebase.messaging',
      aud: 'https://oauth2.googleapis.com/token',
      iat: nowSeconds,
      exp: nowSeconds + 3600,
    }),
  );
  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claims}`);
  return `${header}.${claims}.${b64url(signer.sign(sa.private_key))}`;
}
