import glossaryData from '../data/glossary.json';
import guideData from '../data/professions-guide.json';
import legacyData from '../data/legacy.json';
import professionsData from '../data/professions.json';
import type { Lang } from '../config';
import { fill, ui } from '../i18n';
import { withBase } from '../utils/url';
import { createGlossary } from './glossary';
import { CLASSES, type ClassId, type GlossaryFile } from './glossary-types';
import type {
  CampObject,
  ItemRef,
  LegacyFile,
  LegacyPerk,
  Profession,
  ProfessionsFile,
  ProfessionsGuide,
  Text,
} from './profession-types';
import type { TalentPagePayload, TalentView } from './talents';
import { tooltipPayload } from './tooltip-payload';
import { itemLineKind, type CardTip, type TipPayload } from './tooltip-render';

// Server-side data for the profession and Legacy pages: the synced files
// (professions.json, legacy.json) joined with the hand-edited guide.

export const professionsFile = professionsData as ProfessionsFile;
export const guide = guideData as ProfessionsGuide;
export const legacy = legacyData as LegacyFile;

export const professions = professionsFile.professions;
export const professionBySlug = new Map(professions.map((p) => [p.slug, p]));
export const primaryProfessions = professions.filter((p) => p.kind === 'primary');
export const secondaryProfessions = professions.filter((p) => p.kind === 'secondary');

export const pick = (text: Text | undefined, lang: Lang) => (text ? text[lang] || text.en : '');

export const item = (id: number): ItemRef => professionsFile.items[String(id)] ?? { name: `#${id}` };
export const iconUrl = (icon?: string) => (icon ? withBase(`/icons/${icon}.jpg`) : undefined);

export const classOrder = [...CLASSES] as ClassId[];

export const pairKey = (pair: readonly string[]) => pair.join('+');

// The camp object that gives a buff (the guide names it, the sync has its icon).
export function campObject(profession: string, name: string) {
  return professionBySlug.get(profession)?.campObjects.find((o) => o.name === name);
}

// Glossary entry for a class buff named in the buff table, for its tooltip.
const glossary = createGlossary((glossaryData as GlossaryFile).entries);
export function classBuffEntry(name: string) {
  const hit = glossary.resolve(name);
  return hit.entry;
}

// ---------- tooltips ----------

export const itemTipId = (id: number) => `item/${id}`;
export const campTipId = (o: CampObject) => `camp/${o.id}`;
const ITEM_PAGE = 'https://wowforever.wclbox.com/en/wupin/';

// Turkish item lines exist only for the Legacy rewards (npm run translate)
const rewardLinesTr = new Map(legacy.rewards.flatMap((r) => (r.item && r.linesTr ? [[r.item, r.linesTr]] : [])));

export function itemCard(id: number, lang: Lang = 'en'): CardTip {
  const it = item(id);
  const lines = it.lines ?? [];
  const tr = lang === 'tr' ? rewardLinesTr.get(id) : undefined;
  return {
    kind: 'item',
    name: it.name,
    icon: it.icon,
    quality: it.quality,
    lines: tr?.length === lines.length ? tr : lines,
    lineKinds: lines.map(itemLineKind),
    sourceUrl: ITEM_PAGE + id,
  };
}

export function itemByName(name: string): number | undefined {
  const hit = Object.entries(professionsFile.items).find(([, it]) => it.name === name);
  return hit ? Number(hit[0]) : undefined;
}

// Camp object card: skill, the profession's camp buff (upgrades keep it),
// materials and where the blueprint drops — all in the page language.
export function campCard(o: CampObject, slug: string, lang: Lang): CardTip {
  const t = ui(lang);
  const p = professionBySlug.get(slug);
  const buff = guide.buffs.find((b) => b.profession === slug && b.object === p?.campObjects[0]?.name);
  const drop = guide.professions[slug]?.blueprints?.[o.name];
  const lines = [
    buff ? `${t.campBuffLabel}: ${pick(buff.bonus, lang)}` : '',
    buff?.conflict ? `${t.colConflict}: ${buff.conflict}` : '',
    o.replaces ? fill(t.canReplace, { name: o.replaces }) : '',
    `${t.colMaterial}: ${o.reagents.map(([id, n]) => `${n} × ${item(id).name}`).join(', ')}`,
  ].filter(Boolean);
  return {
    kind: 'camp',
    name: o.name,
    icon: o.icon,
    sub: `${p?.name ?? slug} · ${fill(t.skillN, { n: o.skill })}`,
    lines,
    note: o.blueprint || drop ? fill(t.blueprintFrom, { src: drop ? pick(drop, lang) : t.sourceUnknown }) : undefined,
  };
}

export function perkCard(perk: LegacyPerk, lang: Lang): CardTip {
  const t = ui(lang);
  return {
    kind: 'perk',
    name: perk.name,
    icon: perk.icon,
    sub: `Legacy · ${legacy.trees[perk.tree]?.name ?? ''}`,
    pill: `${perk.maxRank} rank`,
    lines: [perkText(perk, lang)],
    note: perk.maxRank > 1 ? `${t.rankOne}: ${perkText(perk, lang, 1)}` : undefined,
  };
}

// Spell / talent names inside the guide's prose become tooltips: multi-word,
// unambiguous glossary names, longest first.
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const linkNames = glossary.autoLinkNames().sort((a, b) => b.length - a.length);
const linkRe = new RegExp(`\\b(${linkNames.map(escapeRe).join('|')})\\b`, 'g');

export interface Segment {
  text: string;
  tip?: string; // glossary id
  kind?: string;
}

export function segments(text: string): Segment[] {
  const out: Segment[] = [];
  let last = 0;
  for (const m of text.matchAll(linkRe)) {
    // part of a longer name ("Mind Control Cap" is an item, not the spell)
    if (/^ [A-Z]/.test(text.slice(m.index! + m[0].length, m.index! + m[0].length + 2))) continue;
    const entry = glossary.resolve(m[0]).entry;
    if (!entry) continue;
    if (m.index! > last) out.push({ text: text.slice(last, m.index) });
    out.push({ text: m[0], tip: entry.id, kind: entry.kind });
    last = m.index! + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}

// Tooltip island for a profession page: glossary entries plus item, camp
// object and perk cards.
export function professionTips(
  lang: Lang,
  refs: { glossary?: string[]; items?: number[]; camps?: [CampObject, string][]; perks?: string[] },
): TipPayload {
  const payload = tooltipPayload([...new Set(refs.glossary ?? [])], lang);
  const cards: Record<string, CardTip> = {};
  for (const id of refs.items ?? []) cards[itemTipId(id)] = itemCard(id, lang);
  for (const [o, slug] of refs.camps ?? []) cards[campTipId(o)] = campCard(o, slug, lang);
  for (const id of refs.perks ?? []) {
    const perk = perkById.get(id);
    if (perk) cards[id] = perkCard(perk, lang);
  }
  return { ...payload, cards };
}

// Glossary ids mentioned anywhere in the guide's prose (for the tooltip island).
export function guideGlossaryIds(texts: (Text | undefined)[], lang: Lang): string[] {
  return texts.flatMap((t) => segments(pick(t, lang)).flatMap((s) => (s.tip ? [s.tip] : [])));
}

export function sectionLabel(p: Profession, lang: Lang): string {
  const t = ui(lang);
  return p.section === 'crafting' ? t.profCrafting : p.section === 'gathering' ? t.profGathering : t.profSecondary;
}

// ---------- Legacy ----------

export const perkById = new Map(legacy.perks.map((p) => [p.id, p]));
export const LEGACY_GRID = {
  rows: Math.max(...[...legacy.perks, ...legacy.reserved].map((n) => n.tier)),
  cols: Math.max(...[...legacy.perks, ...legacy.reserved].map((n) => n.lane)),
};

export function perkText(perk: LegacyPerk, lang: Lang, rank = perk.maxRank): string {
  const i = Math.max(1, Math.min(rank, perk.maxRank)) - 1;
  return (lang === 'tr' && perk.ranksTr?.[i]) || perk.ranks[i] || perk.desc;
}

const TR_TIME: Record<string, string> = { sec: 'sn', min: 'dk', hr: 'sa' };
function perkMeta(perk: LegacyPerk, lang: Lang): string | undefined {
  const t = ui(lang);
  const time = (v: string) => (lang === 'tr' ? v.replace(/\b(sec|min|hr)\b/, (u) => TR_TIME[u]) : v);
  const parts = [perk.cast && `${time(perk.cast)} cast`, perk.cooldown && `${t.cooldown} ${time(perk.cooldown)}`];
  return parts.filter(Boolean).join(' · ') || undefined;
}

export function legacyPage(lang: Lang): TalentPagePayload {
  const t = ui(lang);
  const nodes: TalentView[] = legacy.perks.map((p) => ({
    id: p.id,
    tree: p.tree,
    row: p.tier,
    col: p.lane,
    maxRank: p.maxRank,
    requires: p.requires,
    tierPoints: p.tierPoints,
    name: p.name,
    icon: p.icon,
    ranks: Array.from({ length: p.maxRank }, (_, i) => perkText(p, lang, i + 1)),
    meta: perkMeta(p, lang),
  }));
  return {
    cls: 'legacy',
    trees: legacy.trees.map((tr) => tr.name),
    nodes,
    maxPoints: legacy.maxPoints,
    iconBase: withBase('/icons/'),
    strings: {
      pointsLeft: t.pointsLeft,
      reqLevel: t.reqLevel,
      copied: t.copied,
      share: t.share,
      tierNeed: t.tierNeed,
      requiresTalent: t.requiresTalent,
      nextRank: t.nextRank,
      row: t.row,
      statusNew: t.statusNew,
      statusChanged: t.statusChanged,
      statusUnchanged: t.statusUnchanged,
      statusRemoved: t.statusRemoved,
    },
  };
}

// Spell / talent names the guide mentions (prose and the buff table's class
// buffs) → glossary id, for the app: it splits the same text on these names.
export function guideGlossaryTerms(): Record<string, string> {
  const texts = [
    guide.camping.intro,
    ...guide.camping.steps,
    ...guide.camping.rules,
    ...guide.buffs.flatMap((b) => [b.buff, b.bonus, b.note]),
    ...Object.values(guide.classes).map((c) => c.why),
    guide.goalNotes.gold,
    guide.goalNotes.pvp,
    ...Object.values(guide.goalNotes.raids),
    ...Object.values(guide.professions).flatMap((p) => [p.summary, p.materials]),
  ];
  const out: Record<string, string> = {};
  for (const t of texts) {
    for (const lang of ['en', 'tr'] as const) {
      for (const seg of segments(t?.[lang] ?? '')) if (seg.tip) out[seg.text] = seg.tip;
    }
  }
  for (const b of guide.buffs) {
    const e = b.conflict ? classBuffEntry(b.conflictTip ?? b.conflict) : undefined;
    if (b.conflict && e) out[b.conflict] = e.id;
  }
  return Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b)));
}
