// npm run sync [-- --class mage] [-- --no-icons] [-- --fresh] [-- --no-wft]
//
// Snapshots WoW Forever spell, talent and race data from wclbox into
// src/data/*.json and icons into public/icons/, then replaces spell and talent
// descriptions with the official client text from wowforevertools.com. The output is committed, so
// the site build never depends on the network. Re-run when a new build lands.
import { existsSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { applyTranslations, type TranslationCache } from '../lib/translations';
import {
  CLASSES,
  type ClassId,
  type ClassInfo,
  type GlossaryEntry,
  type GlossaryFile,
  type RaceInfo,
} from '../../src/lib/glossary-types';
import { fetchBinary, fetchJson, fetchText } from '../lib/http';
import { WCLBOX, WOWFOREVERTOOLS, wclboxDataBase, wclboxIcon, wclboxPage, wclboxRelease } from '../lib/sources';
import { parseSpellDetail, parseSpellList, parseTalentPage, statusFromText } from './parse';
import {
  applyWftTexts,
  readChunkData,
  wftAppScript,
  wftChunkMap,
  wftClassTexts,
  type WftAbilitiesFile,
  type WftClassTexts,
  type WftTalentsFile,
} from './wowforevertools';

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, 'src/data');
const ICON_DIR = path.join(ROOT, 'public/icons');

const args = process.argv.slice(2);
const onlyClass = args.includes('--class') ? (args[args.indexOf('--class') + 1] as ClassId) : undefined;
const withIcons = !args.includes('--no-icons');
const withWft = !args.includes('--no-wft');

// Page cache is per wclbox release: a new release means fresh pages, while
// re-running against the same release costs no requests.
const release = await wclboxRelease();
const CACHE_DIR = path.join(ROOT, '.cache/http', release);
if (args.includes('--fresh')) await rm(CACHE_DIR, { recursive: true, force: true });

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const log = (...m: unknown[]) => console.log('[sync]', ...m);

// ---------- races + racials (JSON) ----------

interface WclRacial {
  id: string;
  name: string;
  icon?: string;
  reported_change_kind?: string;
  unranked_effect?: string;
  rank_texts?: Record<string, string>;
  race_profiles?: string[];
  tooltip_metadata?: { passive?: boolean; cast_time?: string; cooldown?: string };
  classic?: { text?: string };
}
interface WclRace {
  id: string;
  race: string;
  faction: 'Alliance' | 'Horde';
  icon?: string;
  classes: ClassId[];
  abilities: WclRacial[];
}

const RACIAL_STATUS: Record<string, GlossaryEntry['status']> = {
  added: 'new',
  modified: 'changed',
  unchanged: 'unchanged',
};

async function syncRaces(dataBase: string) {
  const races = await fetchJson<WclRace[]>(`${dataBase}races.json`, { cacheDir: CACHE_DIR });
  const racials = new Map<string, GlossaryEntry>();
  const raceInfos: RaceInfo[] = races.map((r) => {
    for (const a of r.abilities) {
      const id = `racial/${a.id}`;
      const existing = racials.get(id);
      if (existing) {
        existing.races = [...new Set([...(existing.races ?? []), r.id])];
        continue;
      }
      const ranked = Object.values(a.rank_texts ?? {});
      const meta = a.tooltip_metadata ?? {};
      racials.set(id, {
        id,
        kind: 'racial',
        name: a.name,
        icon: a.icon,
        races: [...new Set([r.id, ...(a.race_profiles ?? [])])],
        passive: meta.passive,
        cast: meta.passive ? undefined : meta.cast_time,
        cooldown: meta.cooldown?.match(/(\d+(?:\.\d+)?)[\s-]*(minute|second|hour)/i)
          ? `${RegExp.$1} ${RegExp.$2.toLowerCase().startsWith('m') ? 'min' : RegExp.$2.toLowerCase().startsWith('s') ? 'sec' : 'hr'}`
          : undefined,
        desc: a.unranked_effect || ranked.at(-1) || a.classic?.text || '',
        status: RACIAL_STATUS[a.reported_change_kind ?? ''] ?? 'unchanged',
        sourceUrl: `${WCLBOX}/en/zhongzu#race=${r.id}`,
      });
    }
    return {
      id: r.id,
      name: r.race,
      faction: r.faction,
      icon: r.icon,
      classes: r.classes,
      racials: r.abilities.map((a) => `racial/${a.id}`),
    };
  });
  log(`races: ${raceInfos.length}, racials: ${racials.size}`);
  return { raceInfos, racials: [...racials.values()] };
}

// ---------- spells + talents (prerendered HTML) ----------

async function syncClass(cls: ClassId) {
  const opts = { cacheDir: CACHE_DIR };
  const listUrl = wclboxPage(`fashu/${cls}`);
  const rows = parseSpellList(await fetchText(listUrl, opts), cls);
  const spells: GlossaryEntry[] = [];
  for (const row of rows) {
    if (!row.slug) {
      log(`  ${cls}: no detail page for "${row.name}", skipped`);
      continue;
    }
    const url = wclboxPage(`fashu/${cls}/${row.slug}`);
    try {
      const d = parseSpellDetail(await fetchText(url, opts));
      spells.push({
        id: `spell/${row.slug}`,
        kind: 'spell',
        name: d.name || row.name,
        icon: d.icon ?? row.icon,
        class: cls,
        school: d.school ?? row.school,
        maxRank: d.maxRank,
        learnedAt: row.learnedAt ?? d.learnedAt,
        cost: d.cost,
        costType: d.costType,
        cast: d.cast,
        range: d.range,
        cooldown: d.cooldown,
        desc: d.desc,
        status: row.status ?? d.status ?? statusFromText(row.summary) ?? 'unchanged',
        change: row.status === 'changed' ? row.summary : undefined,
        sourceUrl: url,
      });
    } catch (err) {
      log(`  ${cls}: ${row.name}: ${(err as Error).message}`);
    }
  }

  const talentUrl = wclboxPage(`tianfu/${cls}`);
  const { trees, talents } = parseTalentPage(await fetchText(talentUrl, opts));
  const talentEntries: GlossaryEntry[] = talents.map((t) => ({
    id: `talent/${t.id}`,
    kind: 'talent',
    name: t.name,
    icon: t.icon,
    class: cls,
    tree: t.tree,
    tier: t.tier,
    row: t.row,
    col: t.col,
    maxRank: t.maxRank,
    desc: t.desc,
    status: t.status,
    change: t.change,
    sourceUrl: `${talentUrl}#t=${t.id}`,
  }));

  log(`${cls}: ${spells.length} spells, ${talentEntries.length} talents, trees ${trees.join('/')}`);
  const info: ClassInfo = {
    id: cls,
    name: cap(cls),
    trees,
    spells: spells.map((s) => s.id),
    talents: talentEntries.map((t) => t.id),
  };
  return { spells, talents: talentEntries, info };
}

async function downloadIcons(icons: Set<string>) {
  await mkdir(ICON_DIR, { recursive: true });
  let fetched = 0;
  for (const icon of [...icons].sort()) {
    const file = path.join(ICON_DIR, `${icon}.jpg`);
    if (existsSync(file)) continue;
    try {
      await writeFile(file, await fetchBinary(wclboxIcon(icon)));
      fetched++;
    } catch (err) {
      log(`  icon ${icon}: ${(err as Error).message}`);
    }
  }
  log(`icons: ${fetched} downloaded, ${icons.size} referenced`);
}

// ---------- official English text (wowforevertools JS chunks) ----------

async function syncWftTexts(classes: ClassId[]): Promise<Partial<Record<ClassId, WftClassTexts>>> {
  // index.html is never cached: it names the current (content-hashed) app script.
  const app = wftAppScript(await fetchText(`${WOWFOREVERTOOLS}/`));
  if (!app) throw new Error('app script not found in index.html');
  const opts = { cacheDir: CACHE_DIR };
  const chunks = wftChunkMap(await fetchText(`${WOWFOREVERTOOLS}/assets/${app}`, opts));
  const load = async <T>(key: string) => {
    const file = chunks.get(key);
    if (!file) {
      log(`  wft: no chunk for ${key}`);
      return undefined;
    }
    return readChunkData<T>(await fetchText(`${WOWFOREVERTOOLS}/assets/${file}`, opts));
  };
  const out: Partial<Record<ClassId, WftClassTexts>> = {};
  for (const cls of classes) {
    out[cls] = wftClassTexts(
      await load<WftAbilitiesFile>(`abilities/${cls}`),
      await load<WftTalentsFile>(`talents/${cls}`),
    );
  }
  return out;
}

// ---------- main ----------

const dataBase = await wclboxDataBase(release);
const meta = await fetchJson<{ foreverBuild?: string }>(`${dataBase}meta.json`, { cacheDir: CACHE_DIR }).catch(
  () => ({}) as { foreverBuild?: string },
);
log(`release ${release}, build ${meta.foreverBuild ?? 'unknown'}`);

const { raceInfos, racials } = await syncRaces(dataBase);
const classes = onlyClass ? [onlyClass] : [...CLASSES];
const entries: GlossaryEntry[] = [...racials];
const classInfos: ClassInfo[] = [];
for (const cls of classes) {
  const { spells, talents, info } = await syncClass(cls);
  entries.push(...spells, ...talents);
  classInfos.push(info);
}

if (withWft) {
  try {
    const replaced = applyWftTexts(entries, await syncWftTexts(classes));
    const total = entries.filter((e) => e.kind !== 'racial').length;
    log(`wft: official text for ${replaced}/${total} spells+talents (rest keep wclbox text)`);
  } catch (err) {
    log(`wft: skipped, keeping wclbox text: ${(err as Error).message}`);
  }
}

const glossary: GlossaryFile = {
  generatedAt: new Date().toISOString(),
  build: meta.foreverBuild ?? null,
  source: `${WCLBOX}/en (新手盒子·魔兽世界无限数据库)${withWft ? `; descriptions: ${WOWFOREVERTOOLS}` : ''}`,
  entries: entries.sort((a, b) => a.id.localeCompare(b.id)),
};

// Turkish texts: reuse cached translations; new/changed English is listed for
// `npm run translate` (see docs/translation-style.md).
const trCache = JSON.parse(
  await readFile(path.join(DATA_DIR, 'i18n/tr.json'), 'utf8').catch(() => '{}'),
) as TranslationCache;
const untranslated = applyTranslations(glossary.entries, trCache);
await mkdir(path.join(ROOT, '.cache'), { recursive: true });
await writeFile(path.join(ROOT, '.cache/translate-pending.json'), JSON.stringify(untranslated, null, 2) + '\n');
log(
  untranslated.length
    ? `TRANSLATE_PENDING ${untranslated.length} Turkish texts → run \`npm run translate\` (.cache/translate-pending.json)`
    : 'translations: all Turkish texts present',
);

await mkdir(DATA_DIR, { recursive: true });
const json = (v: unknown) => JSON.stringify(v, null, 2) + '\n';
await writeFile(path.join(DATA_DIR, 'glossary.json'), json(glossary));
await writeFile(path.join(DATA_DIR, 'races.json'), json(raceInfos));
await writeFile(path.join(DATA_DIR, 'classes.json'), json(classInfos));
log(`wrote ${entries.length} glossary entries`);

if (withIcons) {
  const icons = new Set(entries.map((e) => e.icon).filter((i): i is string => !!i));
  await downloadIcons(icons);
}
