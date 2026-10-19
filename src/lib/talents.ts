import classesData from '../data/classes.json';
import glossaryData from '../data/glossary.json';
import type { Lang } from '../config';
import { ui } from '../i18n';
import { withBase } from '../utils/url';
import { inClassOrder, type ClassId, type ClassInfo, type GlossaryEntry, type GlossaryFile } from './glossary-types';
import type { TalentNode } from './talent-rules';

// Server-side data for the talent calculator pages.

export const classes = inClassOrder(classesData as ClassInfo[]);
const glossary = glossaryData as GlossaryFile;

export interface TalentView extends TalentNode {
  name: string;
  icon?: string;
  status?: GlossaryEntry['status']; // Legacy perks have none
  meta?: string; // extra tooltip subtitle, e.g. "25 sec cast · 23 hr cooldown"
  ranks: string[]; // text per rank in the page language
  change?: string;
}

export interface TalentPagePayload {
  cls: ClassId | 'legacy';
  trees: string[];
  nodes: TalentView[];
  maxPoints?: number; // default MAX_POINTS (51)
  iconBase: string;
  strings: Record<string, string>;
}

const rowCount = 7;
const colCount = 4;
export const GRID = { rows: rowCount, cols: colCount };

export function talentPage(cls: ClassId, lang: Lang): TalentPagePayload {
  const info = classes.find((c) => c.id === cls)!;
  const nodes: TalentView[] = glossary.entries
    .filter((e) => e.kind === 'talent' && e.class === cls && e.tree && e.row && e.col)
    .map((e) => {
      const maxRank = e.maxRank ?? e.ranks?.length ?? 1;
      const en = e.ranks?.length === maxRank ? e.ranks : Array(maxRank).fill(e.desc);
      const ranks = en.map((text, i) => (lang === 'tr' ? e.ranksTr?.[i] || (i === maxRank - 1 && e.descTr) || text : text));
      return {
        id: e.id,
        tree: info.trees.indexOf(e.tree!),
        row: e.row!,
        col: e.col!,
        maxRank,
        requires: e.requires,
        tierPoints: e.tierPoints ?? 5 * (e.row! - 1),
        name: e.name,
        icon: e.icon,
        status: e.status,
        ranks,
        change: lang === 'tr' && e.changeTr ? e.changeTr : e.change,
      };
    })
    .filter((n) => n.tree >= 0);
  const t = ui(lang);
  return {
    cls,
    trees: info.trees,
    nodes,
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

// Arrow path in grid units (cell 100, gap 24) from a prerequisite to its talent.
const CELL = 100;
const GAP = 24;
const cx = (col: number) => (col - 1) * (CELL + GAP) + CELL / 2;
const top = (row: number) => (row - 1) * (CELL + GAP);
export const gridViewBoxFor = (rows: number, cols: number) => `0 0 ${cols * (CELL + GAP) - GAP} ${rows * (CELL + GAP) - GAP}`;
export const gridViewBox = gridViewBoxFor(rowCount, colCount);

export function arrowPath(from: TalentNode, to: TalentNode): string {
  if (from.row === to.row) {
    const dir = to.col > from.col ? 1 : -1;
    const y = top(from.row) + CELL / 2;
    return `M ${cx(from.col) + (dir * CELL) / 2} ${y} H ${cx(to.col) - (dir * CELL) / 2}`;
  }
  if (from.col === to.col) {
    return `M ${cx(from.col)} ${top(from.row) + CELL} V ${top(to.row)}`;
  }
  const dir = to.col > from.col ? 1 : -1;
  const y = top(from.row) + CELL / 2;
  return `M ${cx(from.col) + (dir * CELL) / 2} ${y} H ${cx(to.col)} V ${top(to.row)}`;
}
