import { normalizeName } from './glossary';
import type { GlossaryEntry, GlossaryKind } from './glossary-types';

// The reader's note on a saved talent build: plain text, at most
// MAX_NOTE_LENGTH characters. Shown with the class's spell / talent names and
// the racials as tooltips and web addresses as links. Same rules and test
// vectors as the mobile app's domain/BuildNote.kt; change both sides together.

export const MAX_NOTE_LENGTH = 5000;

export type NotePart =
  | { kind: 'text'; text: string }
  | { kind: 'tip'; text: string; id: string }
  | { kind: 'link'; text: string; url: string };

const KIND_RANK: Record<GlossaryKind, number> = { talent: 0, spell: 1, racial: 2 };

// Name → glossary id for the names a note on `cls`'s planner can mention: the
// class's talents and spells and every racial. A name shared by several
// entries picks a talent, then a spell, then a racial, and a current entry
// before a removed one.
export function noteTerms(entries: readonly GlossaryEntry[], cls: string): Record<string, string> {
  const best = new Map<string, GlossaryEntry>();
  const rank = (e: GlossaryEntry) => KIND_RANK[e.kind] * 2 + Number(e.status === 'removed');
  for (const e of entries) {
    if (e.kind !== 'racial' && e.class !== cls) continue;
    const key = normalizeName(e.name);
    const old = best.get(key);
    if (!old || rank(e) < rank(old)) best.set(key, e);
  }
  return Object.fromEntries([...best.values()].map((e) => [e.name, e.id]));
}

// http(s):// or www. up to a space; apostrophes end it too, so a Turkish
// suffix ("foreverwow.app'te") stays outside the link.
const URL_RE = /(?<![\p{L}\p{N}])(?:https?:\/\/|www\.)[^\s<>"'’]+/giu;
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const count = (s: string, c: string) => s.split(c).length - 1;

// Drops sentence punctuation after an address; a closing bracket stays when it
// closes one inside the address.
function trimUrl(raw: string): string {
  let url = raw;
  for (;;) {
    const c = url.slice(-1);
    if (c && '.,;:!?'.includes(c)) url = url.slice(0, -1);
    else if (c === ')' && count(url, '(') < count(url, ')')) url = url.slice(0, -1);
    else if (c === ']' && count(url, '[') < count(url, ']')) url = url.slice(0, -1);
    else return url;
  }
}

function namePattern(terms: Record<string, string>): RegExp | null {
  const names = Object.keys(terms)
    .sort((a, b) => b.length - a.length)
    .map((n) => escapeRe(n).replace(/'/g, "['’]"));
  return names.length ? new RegExp(`(?<![\\p{L}\\p{N}])(?:${names.join('|')})(?![\\p{L}\\p{N}])`, 'giu') : null;
}

// Splits a note into text, tooltip names and links. Names match whole words,
// ignoring case, longest first, every mention; a one-word name ("Frostbolt")
// only when it starts with a capital, so plain words ("charge") stay text.
export function splitNote(text: string, terms: Record<string, string>): NotePart[] {
  const ids = new Map(Object.entries(terms).map(([name, id]) => [normalizeName(name), { id, oneWord: !/\s/.test(name) }]));
  const pattern = namePattern(terms);
  const out: NotePart[] = [];
  const pushText = (s: string) => {
    if (!s) return;
    const last = out[out.length - 1];
    if (last?.kind === 'text') last.text += s;
    else out.push({ kind: 'text', text: s });
  };
  const names = (s: string) => {
    if (!pattern) return pushText(s);
    let at = 0;
    for (const m of s.matchAll(pattern)) {
      const term = ids.get(normalizeName(m[0]));
      if (!term || (term.oneWord && !/^\p{Lu}/u.test(m[0]))) continue;
      pushText(s.slice(at, m.index));
      out.push({ kind: 'tip', text: m[0], id: term.id });
      at = m.index! + m[0].length;
    }
    pushText(s.slice(at));
  };

  let at = 0;
  for (const m of text.matchAll(URL_RE)) {
    const shown = trimUrl(m[0]);
    if (!/[\p{L}\p{N}]/u.test(shown.replace(/^(?:https?:\/\/|www\.)/i, ''))) continue;
    names(text.slice(at, m.index));
    out.push({ kind: 'link', text: shown, url: /^www\./i.test(shown) ? `https://${shown}` : shown });
    at = m.index! + shown.length;
  }
  names(text.slice(at));
  return out;
}

export interface NoteTipInfo {
  kind: GlossaryKind;
  icon?: string;
}

const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

// HTML for the note view: names become the site's .wf-tip spans (the shared
// tooltip script opens them), links open in a new tab. Line breaks are kept
// by the container's `white-space: pre-wrap`.
export function noteHtml(parts: NotePart[], info: (id: string) => NoteTipInfo | undefined, iconBase: string): string {
  return parts
    .map((p) => {
      if (p.kind === 'text') return esc(p.text);
      if (p.kind === 'link') return `<a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer nofollow ugc">${esc(p.text)}</a>`;
      const tip = info(p.id);
      if (!tip) return esc(p.text);
      const icon = tip.icon
        ? `<img class="wf-tip-icon" src="${esc(iconBase + tip.icon)}.jpg" alt="" width="18" height="18" loading="lazy">`
        : '';
      return `<span class="wf-tip wf-tip--${esc(tip.kind)}" data-tip="${esc(p.id)}" tabindex="0">${icon}${esc(p.text)}</span>`;
    })
    .join('');
}
