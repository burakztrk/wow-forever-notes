import { createHash } from 'node:crypto';

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

// Anything with tooltip text: glossary entries and Legacy perks.
export interface Translatable {
  name: string;
  kind?: string;
  class?: string;
  desc: string;
  descTr?: string;
  change?: string;
  changeTr?: string;
  ranks?: string[];
  ranksTr?: string[];
}

export const textKey = (en: string) => createHash('sha1').update(en.trim()).digest('hex').slice(0, 16);

const FIELDS = [
  ['desc', 'descTr'],
  ['change', 'changeTr'],
] as const;

// Fills descTr/changeTr from the cache (clears them when there is no
// translation for the current English text). Returns texts still missing.
export function applyTranslations(entries: Translatable[], cache: TranslationCache): PendingText[] {
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
        if (!pending.has(key)) pending.set(key, { key, en, name: e.name, kind: e.kind ?? 'legacy', class: e.class });
      }
    }
  }
  return [...pending.values()];
}

// Turkish text for each talent rank without translating every rank: rank texts
// usually differ from the top rank only in their numbers, so swap those numbers
// into the Turkish top-rank text. Ranks whose wording differs stay unset
// (the UI falls back to English for them).
const NUM = /\d+(?:[.,]\d+)?/g;
const normNum = (n: string) => n.replace(',', '.');

export function deriveRankTr(topEn: string, topTr: string, rankEn: string): string | undefined {
  if (rankEn === topEn) return topTr;
  if (topEn.replace(NUM, '#') !== rankEn.replace(NUM, '#')) return undefined;
  const from = (topEn.match(NUM) ?? []).map(normNum);
  const to = (rankEn.match(NUM) ?? []).map(normNum);
  const map = new Map<string, string>();
  for (let i = 0; i < from.length; i++) {
    if (map.has(from[i]) && map.get(from[i]) !== to[i]) return undefined; // ambiguous
    map.set(from[i], to[i]);
  }
  return topTr.replace(NUM, (n) => {
    const swapped = map.get(normNum(n));
    return swapped === undefined ? n : n.includes(',') ? swapped.replace('.', ',') : swapped;
  });
}

export function applyRankTranslations(entries: Translatable[], cache: TranslationCache = {}): PendingText[] {
  const pending = new Map<string, PendingText>();
  for (const e of entries) {
    delete e.ranksTr;
    if (!e.ranks?.length) continue;
    const top = e.ranks.at(-1)!;
    // descTr translates `desc`; it only maps onto ranks written the same way
    const topTr =
      e.descTr && top.replace(NUM, '#') === e.desc.replace(NUM, '#') ? deriveRankTr(e.desc, e.descTr, top) : undefined;
    const out = e.ranks.map((r) => {
      const derived = topTr ? deriveRankTr(top, topTr, r) : undefined;
      if (derived) return derived;
      // wording differs from the top rank: translate the rank text itself
      const key = textKey(r);
      const hit = cache[key]?.tr;
      if (hit) return hit;
      if (!pending.has(key)) pending.set(key, { key, en: r, name: e.name, kind: e.kind ?? 'legacy', class: e.class });
      return '';
    });
    if (out.some(Boolean)) e.ranksTr = out;
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
// Legacy reward items: their client lines (professions.json items) are
// translated through the same cache, one entry per line, and stored as
// rewards[].linesTr once every line has a translation.
export interface RewardLike {
  name: string;
  item?: number;
  linesTr?: string[];
}
export type ItemLines = Record<string, { lines?: string[] } | undefined>;

export function rewardLineTexts(rewards: RewardLike[], items: ItemLines): Translatable[] {
  return rewards.flatMap((r) =>
    (r.item ? (items[String(r.item)]?.lines ?? []) : []).map((line) => ({ name: r.name, kind: 'item', desc: line })),
  );
}

export function applyRewardTranslations(rewards: RewardLike[], items: ItemLines, cache: TranslationCache): PendingText[] {
  const pending = new Map<string, PendingText>();
  for (const r of rewards) {
    delete r.linesTr;
    const lines = rewardLineTexts([r], items);
    if (!lines.length) continue;
    for (const p of applyTranslations(lines, cache)) pending.set(p.key, p);
    if (lines.every((l) => l.descTr)) r.linesTr = lines.map((l) => l.descTr!);
  }
  return [...pending.values()];
}

export function pruneCache(entries: Translatable[], cache: TranslationCache): TranslationCache {
  const used = new Set<string>();
  for (const e of entries) {
    for (const [src] of FIELDS) if (e[src]?.trim()) used.add(textKey(e[src]!));
    for (const r of e.ranks ?? []) if (r.trim()) used.add(textKey(r));
  }
  return Object.fromEntries(Object.entries(cache).filter(([k]) => used.has(k)));
}
