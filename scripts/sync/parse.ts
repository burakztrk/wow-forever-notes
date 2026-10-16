import * as cheerio from 'cheerio';
import type { ChangeStatus, CostType } from '../../src/lib/glossary-types';

// Parsers for wclbox's prerendered English pages. Pure functions over HTML so
// they can be tested against saved fixtures; selectors are kept in one place.

const clean = (s: string | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();

export function iconFromSrc(src: string | undefined): string | undefined {
  const m = src?.match(/\/tubiao\/([^/?#]+)\.(?:jpg|png|webp)/);
  return m?.[1];
}

// ---------- normalizers ----------

// wclbox's English spellbook tab names are machine translations of the Chinese
// client; map them to the official tree names (talent pages already use those).
const SCHOOL_NAMES: Record<string, string> = {
  Shoot: 'Marksmanship',
  Buff: 'Enhancement',
  Renew: 'Restoration',
  'Elemental Combat': 'Elemental',
  'Shadow Magic': 'Shadow',
  Enrage: 'Fury',
  Weapons: 'Arms',
  Ravage: 'Destruction',
  Poison: 'Poisons',
};

export function normalizeSchool(raw: string | undefined): string | undefined {
  const name = clean(raw);
  return name ? (SCHOOL_NAMES[name] ?? name) : undefined;
}

export function normalizeCost(raw: string): { cost: string; costType: CostType } | undefined {
  const text = clean(raw);
  if (!text) return undefined;
  const m = text.match(/(\d+(?:\.\d+)?%?)\s*(?:points? of\s+)?(?:of base\s+)?(mana|rage|energy|health)/i);
  if (m) {
    const type = m[2].toLowerCase() as CostType;
    const pct = /of base/i.test(text) ? ' (base)' : '';
    return { cost: `${m[1]} ${type[0].toUpperCase()}${type.slice(1)}${pct}`, costType: type };
  }
  return { cost: text, costType: 'other' };
}

function durationShort(text: string): string | undefined {
  const m = text.match(/(\d+(?:\.\d+)?)[\s-]*(seconds?|sec|minutes?|min|hours?|hr)/i);
  if (!m) return undefined;
  const unit = m[2].toLowerCase();
  const short = unit.startsWith('s') ? 'sec' : unit.startsWith('m') ? 'min' : 'hr';
  return `${m[1]} ${short}`;
}

export function normalizeCast(raw: string): string | undefined {
  const text = clean(raw);
  if (!text) return undefined;
  if (/instant/i.test(text)) return 'Instant';
  if (/channel/i.test(text)) return durationShort(text) ? `Channeled ${durationShort(text)}` : 'Channeled';
  return durationShort(text) ?? text;
}

export function normalizeRange(raw: string): string | undefined {
  const text = clean(raw);
  if (!text) return undefined;
  const m = text.match(/(\d+(?:-\d+)?)\s*(?:yards?|yd)/i);
  return m ? `${m[1]} yd` : text;
}

export function normalizeCooldown(raw: string): string | undefined {
  const text = clean(raw);
  return text ? (durationShort(text) ?? text) : undefined;
}

export function statusFromText(text: string): ChangeStatus | undefined {
  if (/not in forever|removed/i.test(text)) return 'removed';
  if (/unchanged|same as classic/i.test(text)) return 'unchanged';
  if (/does not have|new in forever|\badded\b|\bnew\b/i.test(text)) return 'new';
  if (/changed|modified|moved/i.test(text)) return 'changed';
  return undefined;
}

const TAG_STATUS: Record<string, ChangeStatus> = {
  unchanged: 'unchanged',
  same: 'unchanged',
  modified: 'changed',
  changed: 'changed',
  moved: 'changed',
  added: 'new',
  new: 'new',
  removed: 'removed',
};

function tagStatus(className: string | undefined): ChangeStatus | undefined {
  for (const k of (className ?? '').match(/\bk-([a-z]+)/g) ?? []) {
    const s = TAG_STATUS[k.slice(2)];
    if (s) return s;
  }
  return undefined;
}

// ---------- spellbook list: /en/fashu/<class> ----------

export interface SpellListRow {
  name: string;
  slug?: string; // detail page: /en/fashu/<class>/<slug>
  icon?: string;
  school?: string;
  ranks?: number;
  learnedAt?: number;
  status: ChangeStatus;
  summary: string;
}

export function parseSpellList(html: string, cls: string): SpellListRow[] {
  const $ = cheerio.load(html);
  const slugByName = new Map<string, string>();
  $(`a[href^="/en/fashu/${cls}/"]`).each((_, a) => {
    const text = clean($(a).text());
    const slug = ($(a).attr('href') ?? '').split(/[#?]/)[0].split('/').pop();
    if (text && slug && !text.includes('→') && !slugByName.has(text)) slugByName.set(text, slug);
  });

  const rows: SpellListRow[] = [];
  const seen = new Set<string>();
  $('button.fsk-row').each((_, el) => {
    const $el = $(el);
    const name = clean($el.find('.fsk-row-text strong').first().text());
    if (!name || seen.has(name)) return;
    seen.add(name);
    const summary = clean($el.find('.fsk-row-text > span').first().text());
    const meta = clean($el.find('.fsk-row-meta small').text()); // "Arcane · 8 ranks · Learned from level 8"
    const rowClass = $el.attr('class');
    let status =
      tagStatus($el.find('.tfk-tag').attr('class')) ?? tagStatus(rowClass) ?? statusFromText(summary) ?? 'changed';
    if (/k-talent/.test(rowClass ?? '')) status = statusFromText(summary) ?? 'changed';
    rows.push({
      name,
      slug: slugByName.get(name),
      icon: iconFromSrc($el.find('img').attr('src')),
      school: normalizeSchool(meta.split('·')[0]),
      ranks: Number(meta.match(/(\d+)\s*ranks?/)?.[1]) || undefined,
      learnedAt: Number(meta.match(/level\s*(\d+)/i)?.[1]) || undefined,
      status,
      summary,
    });
  });
  return rows;
}

// ---------- spell detail: /en/fashu/<class>/<slug> ----------

export interface SpellDetail {
  name: string;
  icon?: string;
  school?: string;
  status?: ChangeStatus;
  learnedAt?: number;
  maxRank: number;
  cost?: string;
  costType?: CostType;
  cast?: string;
  range?: string;
  cooldown?: string;
  desc: string;
}

export function parseSpellDetail(html: string): SpellDetail {
  const $ = cheerio.load(html);
  const name = clean($('h1').first().text());
  const kicker = clean($('.tfb-kicker').first().text()); // "Mage · Arcane"
  const lede = clean($('.tfb-lede').first().text()); // "Unchanged from Classic Era · Learned from level 4 · 7 rank records"
  const ranks = $('section.spell-rank');
  const last = ranks.last();
  const cards = last.find('.fsk-card');
  let card = cards.filter((_, c) => /^forever/i.test(clean($(c).find('h3').first().text()))).first();
  if (!card.length) card = cards.first();

  const facts: Record<string, string> = {};
  card.find('dl.spell-facts > div').each((_, d) => {
    facts[clean($(d).find('dt').text()).toLowerCase()] = clean($(d).find('dd').text());
  });
  const fact = (re: RegExp) => Object.entries(facts).find(([k]) => re.test(k))?.[1] ?? '';
  const cost = normalizeCost(fact(/cost/));
  const desc = card
    .children('p')
    .map((_, p) => $(p).text().trim())
    .get()
    .filter(Boolean)
    .join('\n');

  const classicOnly = cards.length === 1 && /^classic/i.test(clean(cards.first().find('h3').text()));
  return {
    name,
    icon: iconFromSrc($('.tfb-kicker img').attr('src')),
    school: normalizeSchool(kicker.split('·')[1]),
    status: classicOnly ? 'removed' : statusFromText(lede.split('·')[0] ?? ''),
    learnedAt: Number(clean(card.find('h3').first().text()).match(/level\s*(\d+)/i)?.[1]) || undefined,
    maxRank: Math.max(ranks.length, 1),
    cost: cost?.cost,
    costType: cost?.costType,
    cast: normalizeCast(fact(/cast/)),
    range: normalizeRange(fact(/range/)),
    cooldown: normalizeCooldown(fact(/cool/)),
    desc,
  };
}

// ---------- talent calculator: /en/tianfu/<class> ----------

export interface TalentRow {
  id: string; // wclbox talent id, e.g. "calc-mage-arcane-wand-specialization"
  name: string;
  icon?: string;
  tree?: string;
  tier?: number;
  row?: number;
  col?: number;
  maxRank?: number;
  status: ChangeStatus;
  desc: string;
  change?: string;
  ranks: string[]; // Forever text per rank, rank 1 first
  tierPoints?: number; // "Requires <tree> points in lower tiers N points"
}

export function parseTalentPage(html: string): { trees: string[]; treeIcons: string[]; talents: TalentRow[] } {
  const $ = cheerio.load(html);
  const trees: string[] = [];
  const treeIcons: string[] = [];
  const position = new Map<string, { tree: string; row?: number; col?: number; maxRank?: number }>();

  $('.tf-tree-header').each((_, header) => {
    const tree = clean($(header).find('h2').first().text());
    if (!tree) return;
    trees.push(tree);
    treeIcons.push(iconFromSrc($(header).find('.tf-spec-icon img').attr('src')) ?? '');
    $(header)
      .nextAll('.tf-grid')
      .first()
      .find('button.tf-node[data-talent-id]')
      .each((_, node) => {
        const style = $(node).attr('style') ?? '';
        position.set($(node).attr('data-talent-id')!, {
          tree,
          row: Number(style.match(/grid-row:\s*(\d+)/)?.[1]) || undefined,
          col: Number(style.match(/grid-column:\s*(\d+)/)?.[1]) || undefined,
          maxRank: Number(($(node).attr('aria-label') ?? '').match(/\d+\s*\/\s*(\d+)/)?.[1]) || undefined,
        });
      });
  });

  const talents: TalentRow[] = [];
  $('article.talent-reference-entry').each((_, el) => {
    const $el = $(el);
    const id = ($el.attr('id') ?? '').replace(/^talent-info-/, '');
    if (!id) return;
    const condition = clean($el.find('.talent-reference-condition').text()); // "Maximum 2 levels · Tier 1 · …"
    const effect = clean($el.find('.talent-reference-effect').text()).replace(/^Level\s*\d+\s*:\s*/i, '');
    const change = clean($el.find('.talent-reference-change').text()).replace(/^Change summary:\s*/i, '');
    const pos = position.get(id);
    const ranks: string[] = [];
    $el.find('details dt').each((_, dt) => {
      const label = clean($(dt).text()); // "Forever · Rank 2"
      const n = Number(label.match(/^Forever\s*·\s*Rank\s*(\d+)/i)?.[1]);
      if (n) ranks[n - 1] = clean($(dt).next('dd').text());
    });
    talents.push({
      ranks: ranks.filter(Boolean).length === ranks.length ? ranks : [],
      tierPoints: /no tier point requirement/i.test(condition)
        ? 0
        : Number(condition.match(/lower tiers\s*(\d+)\s*points?/i)?.[1]) || undefined,
      id,
      name: clean($el.find('.talent-reference-name h4').text()),
      icon: iconFromSrc($el.find('.talent-reference-name img').attr('src')),
      tree: pos?.tree,
      tier: Number(condition.match(/Tier\s*(\d+)/i)?.[1]) || undefined,
      row: pos?.row,
      col: pos?.col,
      maxRank: Number(condition.match(/Maximum\s*(\d+)/i)?.[1]) || pos?.maxRank,
      status: tagStatus($el.find('.tfk-tag').attr('class')) ?? 'unchanged',
      desc: effect,
      change: change || undefined,
    });
  });
  return { trees, treeIcons, talents };
}
