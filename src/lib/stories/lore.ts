// Lore tooltips in the story text: proper names (src/i18n/lore.ts) become hover/tap cards,
// drawn by the site's shared tooltip (src/scripts/tooltip.ts, CardTip with kind "lore").
import type { Lang } from '../../config';
import { LORE, LORE_UI, type LoreEntry } from '../../i18n/lore';
import type { CardTip, TipPayload } from '../tooltip-render';
import { tooltipPayload } from '../tooltip-payload';

const byAlias = new Map<string, LoreEntry>();
for (const e of LORE) for (const a of e.aliases) byAlias.set(a, e);

const reEscape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// longest alias first, so "Alliance of Lordaeron" wins over "Lordaeron" and "Stromgarde" over "Strom";
// a name only matches as a whole word (a Turkish suffix after an apostrophe is fine: "Lothar’ın")
const NAMES = new RegExp(
  `(?<![\\p{L}\\p{N}])(${[...byAlias.keys()].sort((a, b) => b.length - a.length).map(reEscape).join('|')})(?![\\p{L}\\p{N}])`,
  'gu',
);

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const loreTipId = (id: string) => `lore:${id}`;

/** Plain text → HTML with the first mention of each name wrapped in a tooltip span. */
export function loreHtml(text: string): string {
  const seen = new Set<string>();
  let out = '';
  let last = 0;
  for (const m of text.matchAll(NAMES)) {
    const entry = byAlias.get(m[0])!;
    if (seen.has(entry.id)) continue;
    seen.add(entry.id);
    out += escapeHtml(text.slice(last, m.index));
    out += `<span class="wf-tip wf-tip--lore" data-tip="${loreTipId(entry.id)}" tabindex="0">${escapeHtml(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + escapeHtml(text.slice(last));
}

/** Ids of the lore entries named anywhere in these texts (or nested objects of texts). */
export function loreIds(value: unknown): string[] {
  const ids = new Set<string>();
  const walk = (v: unknown) => {
    if (typeof v === 'string') for (const m of v.matchAll(NAMES)) ids.add(byAlias.get(m[0])!.id);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  };
  walk(value);
  return [...ids];
}

function loreCard(e: LoreEntry, lang: Lang): CardTip {
  const t = e[lang];
  return {
    name: e.name,
    icon: e.icon,
    kind: 'lore',
    sub: t.sub,
    lines: [t.text],
    note: t.note ? `${LORE_UI[lang].inGame}: ${t.note}` : undefined,
  };
}

/** Tooltip island (#wf-glossary) for a story page: one card per lore entry it names. */
export function loreTips(lang: Lang, ids: string[]): TipPayload {
  const cards: Record<string, CardTip> = {};
  for (const id of ids) {
    const e = LORE.find((x) => x.id === id);
    if (e) cards[loreTipId(id)] = loreCard(e, lang);
  }
  return { ...tooltipPayload([], lang), cards };
}
