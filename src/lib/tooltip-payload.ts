import glossaryData from '../data/glossary.json';
import racesData from '../data/races.json';
import type { Lang } from '../config';
import { ui } from '../i18n';
import { withBase } from '../utils/url';
import type { GlossaryFile, RaceInfo } from './glossary-types';
import type { TipEntry, TipPayload } from './tooltip-render';

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

export function tooltipPayload(ids: string[], lang: Lang): TipPayload {
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
