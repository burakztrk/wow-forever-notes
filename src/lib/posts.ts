import { LANGS, type Lang } from '../config';

// Pure helpers over blog entry ids ("tr/wow-forever-2026-10-15"), kept free of
// astro:content so they can be unit-tested.

export function splitId(id: string): { lang: Lang; slug: string } {
  const [lang, ...rest] = id.split('/');
  if (!(LANGS as readonly string[]).includes(lang) || rest.length !== 1) {
    throw new Error(`Blog entry "${id}" must live in src/content/blog/{${LANGS.join(',')}}/<slug>.md`);
  }
  return { lang: lang as Lang, slug: rest[0] };
}

// Every post must exist in every language. Returns human-readable problems;
// an empty array means all pairs are complete.
export function findMissingTranslations(ids: string[]): string[] {
  const byLang = new Map<Lang, Set<string>>(LANGS.map((l) => [l, new Set()]));
  for (const id of ids) {
    const { lang, slug } = splitId(id);
    byLang.get(lang)!.add(slug);
  }
  const allSlugs = new Set(ids.map((id) => splitId(id).slug));
  const problems: string[] = [];
  for (const slug of [...allSlugs].sort()) {
    for (const lang of LANGS) {
      if (!byLang.get(lang)!.has(slug)) problems.push(`missing ${lang}/${slug}.md`);
    }
  }
  return problems;
}

export function assertTranslationsComplete(ids: string[]): void {
  const problems = findMissingTranslations(ids);
  if (problems.length) {
    throw new Error(`Every blog post needs a TR and an EN file:\n  ${problems.join('\n  ')}`);
  }
}
