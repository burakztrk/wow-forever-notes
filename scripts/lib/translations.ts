import { createHash } from 'node:crypto';
import type { GlossaryEntry } from '../../src/lib/glossary-types';

// Turkish tooltip text. Translations live in src/data/i18n/tr.json keyed by a
// hash of the exact English text, so a sync only leaves *new or changed*
// English strings untranslated; everything else is reused.

export interface TranslationRecord {
  en: string; // kept for review and to spot stale entries
  tr: string;
}
export type TranslationCache = Record<string, TranslationRecord>;

export interface PendingText {
  key: string;
  en: string;
  // context for the translator
  name: string;
  kind: string;
  class?: string;
}

export const textKey = (en: string) => createHash('sha1').update(en.trim()).digest('hex').slice(0, 16);

const FIELDS = [
  ['desc', 'descTr'],
  ['change', 'changeTr'],
] as const;

// Fills descTr/changeTr from the cache (clears them when there is no
// translation for the current English text). Returns texts still missing.
export function applyTranslations(entries: GlossaryEntry[], cache: TranslationCache): PendingText[] {
  const pending = new Map<string, PendingText>();
  for (const e of entries) {
    for (const [src, dst] of FIELDS) {
      const en = e[src];
      if (!en?.trim()) {
        delete e[dst];
        continue;
      }
      const key = textKey(en);
      const hit = cache[key];
      if (hit?.tr) e[dst] = hit.tr;
      else {
        delete e[dst];
        if (!pending.has(key)) pending.set(key, { key, en, name: e.name, kind: e.kind, class: e.class });
      }
    }
  }
  return [...pending.values()];
}

// Numbers carry the meaning of a tooltip; a translation must keep every one.
const numbers = (s: string) =>
  (s.match(/\d+(?:[.,]\d+)?/g) ?? []).map((n) => n.replace(',', '.')).sort();

export function validateTranslation(en: string, tr: string): string | undefined {
  if (!tr?.trim()) return 'empty translation';
  const want = numbers(en);
  const have = numbers(tr);
  const missing = [...want];
  for (const n of have) {
    const i = missing.indexOf(n);
    if (i >= 0) missing.splice(i, 1);
  }
  if (missing.length) return `numbers missing in Turkish text: ${missing.join(', ')}`;
  return undefined;
}

// Drops cache records no entry uses any more (old builds' wording).
export function pruneCache(entries: GlossaryEntry[], cache: TranslationCache): TranslationCache {
  const used = new Set<string>();
  for (const e of entries) for (const [src] of FIELDS) if (e[src]?.trim()) used.add(textKey(e[src]!));
  return Object.fromEntries(Object.entries(cache).filter(([k]) => used.has(k)));
}
