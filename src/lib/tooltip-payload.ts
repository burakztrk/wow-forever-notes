import glossaryData from '../data/glossary.json';
import racesData from '../data/races.json';
import type { Lang } from '../config';
import { fill, ui } from '../i18n';
import { withBase } from '../utils/url';
import type { ClassInfo, GlossaryFile, RaceInfo } from './glossary-types';
import type { TipEntry, TipPayload, TreeTip } from './tooltip-render';

// Builds the per-page JSON island: only the entries the page references.

// Chip words in the Turkish client's wording.
const TR_UNITS: Record<string, string> = {
  sec: 'sn',
  min: 'dk',
  hr: 'sa',
  Channeled: 'Kanal',
  Rage: 'Öfke',
  Energy: 'Enerji',
  Health: 'Can',
  '(base)': '(temel)',
};

const glossary = glossaryData as GlossaryFile;
const byId = new Map(glossary.entries.map((e) => [e.id, e]));
const raceName = new Map((racesData as RaceInfo[]).map((r) => [r.id, r.name]));

export const treeTipId = (cls: ClassInfo, tree: string) => `tree/${cls.id}/${tree}`;

const TREE_TIP_ROWS = 8;

// One tooltip per talent tree: counts plus the talents that are new or changed
// in Forever (new first, then by row), capped to keep the card short.
function treeTips(classes: ClassInfo[], lang: Lang): Record<string, TreeTip> {
  const t = ui(lang);
  const out: Record<string, TreeTip> = {};
  const rank = { new: 0, changed: 1, unchanged: 2, removed: 3 } as const;
  for (const cls of classes) {
    const talents = cls.talents.map((id) => byId.get(id)).filter((e) => !!e);
    cls.trees.forEach((name, i) => {
      const inTree = talents.filter((e) => e.tree === name);
      const fresh = inTree.filter((e) => e.status === 'new').length;
      const changed = inTree.filter((e) => e.status === 'changed').length;
      const shown = inTree
        .filter((e) => e.status === 'new' || e.status === 'changed')
        .sort((a, b) => rank[a.status] - rank[b.status] || (a.tier ?? 0) - (b.tier ?? 0) || (a.name < b.name ? -1 : 1));
      const sub = [fill(t.talentsInTree, { n: inTree.length }), fresh ? fill(t.newCount, { n: fresh }) : '', changed ? fill(t.changedCount, { n: changed }) : '']
        .filter(Boolean)
        .join(' · ');
      out[treeTipId(cls, name)] = {
        name,
        icon: cls.treeIcons?.[i],
        sub,
        items: shown.slice(0, TREE_TIP_ROWS).map((e) => ({
          name: e.name,
          icon: e.icon,
          status: e.status,
          meta: e.tier ? `${t.row} ${e.tier}` : '',
        })),
        more: shown.length > TREE_TIP_ROWS ? fill(t.moreCount, { n: shown.length - TREE_TIP_ROWS }) : undefined,
      };
    });
  }
  return out;
}

export function tooltipPayload(ids: string[], lang: Lang, treeClasses: ClassInfo[] = []): TipPayload {
  const t = ui(lang);
  const entries: Record<string, TipEntry> = {};
  for (const id of ids) {
    const e = byId.get(id);
    if (!e) continue;
    const { descTr, changeTr, races, ranks, ranksTr, requires, tierPoints, ...rest } = e;
    entries[id] = {
      ...rest,
      desc: lang === 'tr' && descTr ? descTr : e.desc,
      change: lang === 'tr' && changeTr ? changeTr : e.change,
      raceNames: races?.map((r) => raceName.get(r) ?? r),
    };
  }
  return {
    iconBase: withBase('/icons/'),
    trees: treeClasses.length ? treeTips(treeClasses, lang) : undefined,
    strings: {
      instant: t.instant,
      cooldown: t.cooldown,
      points: t.points,
      row: t.row,
      learnedAt: t.learnedAt,
      statusNew: t.statusNew,
      statusChanged: t.statusChanged,
      statusUnchanged: t.statusUnchanged,
      statusRemoved: t.statusRemoved,
      source: t.source,
      units: lang === 'tr' ? TR_UNITS : {},
    },
    entries,
  };
}

// JSON safe to embed inside <script type="application/json">
export function islandJson(payload: unknown): string {
  return JSON.stringify(payload).replace(/</g, '\\u003c');
}
