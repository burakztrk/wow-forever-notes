// GitHub Pages serves this site from /wow-forever-notes/ (astro.config's
// `base`), so every hardcoded root-relative href/src needs that prefix.
// Astro rewrites its own generated routes automatically; it does NOT rewrite
// literal strings in our markup, hence this helper.
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  if (path === '/') return base.endsWith('/') ? base : `${base}/`;
  const trimmedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${trimmedBase}${path}`;
}

export function langHome(lang: string): string {
  return withBase(`/${lang}/`);
}

export function postUrl(lang: string, slug: string): string {
  return withBase(`/${lang}/blog/${slug}/`);
}
