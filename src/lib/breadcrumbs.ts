// Breadcrumb trail for a page, derived from its URL: Home › section › page.
// BaseLayout turns it into BreadcrumbList JSON-LD (src/lib/seo.ts). The labels
// are the nav labels, so the trail matches what a reader sees in the header.
import type { Lang } from '../config';
import { ui } from '../i18n';
import { privacy } from '../i18n/privacy';
import type { Crumb } from './seo';
import { langHome, withBase } from '../utils/url';

/**
 * `pathname` is the page's root-relative path (Astro.url.pathname), `title` the
 * page's own title without the site name. The home page has no trail.
 */
export function breadcrumbs(lang: Lang, pathname: string, title: string | undefined): Crumb[] {
  const t = ui(lang);
  const rest = pathname.split(`/${lang}/`)[1] ?? '';
  const parts = rest.split('/').filter(Boolean);
  if (!parts.length) return [];

  const list = (key: string, name: string): Crumb => ({ name, url: withBase(`/${lang}/${key}/`) });
  const sections: Record<string, Crumb> = {
    notes: list('notes', t.navNotes),
    blog: list('notes', t.navNotes),
    classes: list('classes', t.navClasses),
    talents: list('classes', t.navClasses),
    races: list('races', t.navRaces),
    professions: list('professions', t.navProfessions),
    legacy: list('legacy', t.navLegacy),
    stories: list('stories', t.navStories),
    search: list('search', t.navSearch),
    creator: list('creator', t.comboTitle),
    privacy: list('privacy', privacy[lang].title),
    about: list('about', t.aboutTitle),
  };
  const [first, id] = parts;
  // /<lang>/stats/<id>/ belongs to a race (alliance-…, horde-…) or a class
  const section = first === 'stats' ? (/^(alliance|horde)-/.test(id ?? '') ? sections.races : sections.classes) : sections[first];
  const trail: Crumb[] = [{ name: t.navHome, url: langHome(lang) }];
  if (section) trail.push(section);
  const here = withBase(`/${lang}/${parts.join('/')}/`);
  if (parts.length > 1 || !section) {
    // the page's own name: its title up to the first " · " ("Mage · Stories" → "Mage")
    const name = (title ?? '').split(' · ')[0].trim();
    if (name && here !== section?.url) trail.push({ name, url: here });
  }
  return trail.length > 1 ? trail : [];
}
