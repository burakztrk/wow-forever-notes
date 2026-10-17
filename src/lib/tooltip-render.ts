import type { ChangeStatus, GlossaryEntry } from './glossary-types';

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
  // unit / resource words in chips, e.g. { sec: 'sn', Rage: 'Öfke' }
  units: Record<string, string>;
}

// Swap whole words in chip values ("3 sec" → "3 sn", "15 Rage" → "15 Öfke").
function localize(value: string, units: Record<string, string>): string {
  return value.replace(/[A-Za-z()]+/g, (w) => units[w] ?? w);
}

// A talent tree (class panel on the home page). All text is built at build
// time in the page language.
export interface TreeTip {
  name: string;
  icon?: string;
  sub: string; // "17 talents · 5 new · 8 changed"
  items: { name: string; icon?: string; status: ChangeStatus; meta: string }[];
  more?: string; // "+9 more"
}

export interface TipPayload {
  iconBase: string; // ".../icons/"
  strings: TipStrings;
  entries: Record<string, TipEntry>;
  trees?: Record<string, TreeTip>;
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
  if (e.cast) chips.push(`<span class="wft-chip">${esc(e.cast === 'Instant' ? s.instant : localize(e.cast, s.units))}</span>`);
  if (e.cost) chips.push(`<span class="wft-chip wft-cost--${esc(e.costType ?? 'other')}">${esc(localize(e.cost, s.units))}</span>`);
  if (e.range) chips.push(`<span class="wft-chip">${esc(localize(e.range, s.units))}</span>`);
  if (e.cooldown) chips.push(`<span class="wft-chip">${esc(s.cooldown)} ${esc(localize(e.cooldown, s.units))}</span>`);

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

export function renderTreeTooltip(t: TreeTip, p: TipPayload): string {
  const icon = t.icon
    ? `<img class="wft-icon" src="${esc(p.iconBase + t.icon)}.jpg" alt="" width="44" height="44">`
    : `<span class="wft-icon wft-icon--empty"></span>`;
  const rows = t.items
    .map((i) => {
      const img = i.icon ? `<img src="${esc(p.iconBase + i.icon)}.jpg" alt="" width="24" height="24">` : '<span></span>';
      return `<li>${img}<span class="wft-li-name">${esc(i.name)}<i class="g-dot g-dot--${esc(i.status)}"></i></span><span class="wft-li-meta">${esc(i.meta)}</span></li>`;
    })
    .join('');
  return `
    <div class="wft-head">
      ${icon}
      <div class="wft-title">
        <div class="wft-name wft-name--talent">${esc(t.name)}</div>
        <div class="wft-sub">${esc(t.sub)}</div>
      </div>
    </div>
    <ul class="wft-list">${rows}</ul>
    ${t.more ? `<p class="wft-note">${esc(t.more)}</p>` : ''}`;
}
