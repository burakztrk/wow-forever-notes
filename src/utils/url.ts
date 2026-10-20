// The site is served from the domain root (astro.config's `base`), but
// every hardcoded root-relative href/src still goes through this helper so a
// sub-path deploy keeps working.
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

// The race and class combination screen (the home page until the dashboard).
// Old links to /<lang>/#race=…&class=… are forwarded here by the dashboard.
export function creatorUrl(lang: string): string {
  return withBase(`/${lang}/creator/`);
}

export function postUrl(lang: string, slug: string): string {
  return withBase(`/${lang}/blog/${slug}/`);
}
