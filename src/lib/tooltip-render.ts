import type { GlossaryEntry } from './glossary-types';

// Tooltip markup, built in the browser from the page's JSON island.
// Three looks share one template: spell (chips row), talent (tree + points),
// racial (race names + cooldown). Ranks are intentionally not shown.

export interface TipEntry
  extends Pick<
    GlossaryEntry,
    | 'id'
    | 'kind'
    | 'name'
    | 'icon'
    | 'class'
    | 'school'
    | 'tree'
    | 'tier'
    | 'maxRank'
    | 'learnedAt'
    | 'cost'
    | 'costType'
    | 'cast'
    | 'range'
    | 'cooldown'
    | 'passive'
    | 'status'
    | 'change'
    | 'sourceUrl'
  > {
  desc: string; // already in the page language (TR falls back to EN)
  raceNames?: string[];
}

export interface TipStrings {
  instant: string;
  cooldown: string;
  points: string;
  row: string;
  learnedAt: string;
  statusNew: string;
  statusChanged: string;
  statusUnchanged: string;
  statusRemoved: string;
  source: string;
}

export interface TipPayload {
  iconBase: string; // ".../icons/"
  strings: TipStrings;
  entries: Record<string, TipEntry>;
}

const esc = (s: string | number | undefined) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function renderTooltip(e: TipEntry, p: TipPayload): string {
  const s = p.strings;
  const statusLabel = {
    new: s.statusNew,
    changed: s.statusChanged,
    unchanged: s.statusUnchanged,
    removed: s.statusRemoved,
  }[e.status];

  let sub = '';
  if (e.kind === 'spell') sub = [e.class && cap(e.class), e.school].filter(Boolean).join(' · ');
  if (e.kind === 'talent') sub = [e.tree, e.tier ? `${s.row} ${e.tier}` : ''].filter(Boolean).join(', ');
  if (e.kind === 'racial') sub = (e.raceNames ?? []).join(', ');

  const chips: string[] = [];
  if (e.kind === 'spell' && e.class) {
    chips.push(`<span class="wft-chip class-${esc(e.class)}">${esc(cap(e.class))}</span>`);
  }
  if (e.cast) chips.push(`<span class="wft-chip">${esc(e.cast === 'Instant' ? s.instant : e.cast)}</span>`);
  if (e.cost) chips.push(`<span class="wft-chip wft-cost--${esc(e.costType ?? 'other')}">${esc(e.cost)}</span>`);
  if (e.range) chips.push(`<span class="wft-chip">${esc(e.range)}</span>`);
  if (e.cooldown) chips.push(`<span class="wft-chip">${esc(s.cooldown)} ${esc(e.cooldown)}</span>`);

  const rankPill =
    e.kind === 'talent' && e.maxRank ? `<span class="wft-pill">${esc(e.maxRank)} ${esc(s.points)}</span>` : '';
  const learned =
    e.kind === 'spell' && e.learnedAt ? `<p class="wft-note">${esc(s.learnedAt)} ${esc(e.learnedAt)}</p>` : '';
  const change = e.status === 'changed' && e.change ? `<p class="wft-change">${esc(e.change)}</p>` : '';
  const icon = e.icon
    ? `<img class="wft-icon" src="${esc(p.iconBase + e.icon)}.jpg" alt="" width="44" height="44">`
    : `<span class="wft-icon wft-icon--empty"></span>`;

  return `
    <div class="wft-head">
      ${icon}
      <div class="wft-title">
        <div class="wft-name wft-name--${esc(e.kind)}">${esc(e.name)}</div>
        ${sub ? `<div class="wft-sub">${esc(sub)}</div>` : ''}
      </div>
      ${rankPill}
    </div>
    ${chips.length ? `<div class="wft-chips">${chips.join('')}</div>` : ''}
    <p class="wft-desc">${esc(e.desc).replace(/\n+/g, '<br>')}</p>
    ${learned}
    <div class="wft-foot">
      <span class="wft-status wft-status--${esc(e.status)}"><i></i>${esc(statusLabel)}</span>
      <a class="wft-source" href="${esc(e.sourceUrl)}" target="_blank" rel="noopener">${esc(s.source)} ↗</a>
    </div>
    ${change}`;
}
