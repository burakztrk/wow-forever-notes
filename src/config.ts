// Site-wide settings. DEFAULT_LANG is the single switch for the default
// language: the root URL redirects there. Change it to 'en' to make English
// the default.
export const LANGS = ['tr', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = 'tr';

export const SITE_TITLE = 'WoW Forever Notes';

export function isLang(value: string | undefined): value is Lang {
  return (LANGS as readonly string[]).includes(value ?? '');
}
