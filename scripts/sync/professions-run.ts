import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { ItemRef, LegacyFile, ProfessionsFile, ProfessionsGuide } from '../../src/lib/profession-types';
import { fetchJson, fetchText } from '../lib/http';
import { WCLBOX, WOWFOREVERTOOLS } from '../lib/sources';
import {
  applyRankTranslations,
  applyRewardTranslations,
  applyTranslations,
  type PendingText,
  type TranslationCache,
} from '../lib/translations';
import {
  buildLegacy,
  buildProfession,
  guideProblems,
  itemFromShard,
  itemsFromBooks,
  type WclItem,
  type WclLegacy,
  type WclProfession,
  type WclProfessionBook,
  type WftLegacyFile,
} from './professions';
import { readChunkData, wftAppScript, wftChunkMap } from './wowforevertools';

// Fetches and writes src/data/professions.json and src/data/legacy.json.
// Called by `npm run sync` and on its own by `npm run sync:professions`.

export interface ProfessionSyncOptions {
  root: string;
  dataBase: string; // wclbox release data URL (…/_shuju/<release>/en/)
  cacheDir: string;
  build: string | null;
  itemShards?: number; // wclbox items/id/<id % shards>.json
  log: (...m: unknown[]) => void;
}

export interface ProfessionSyncResult {
  icons: Set<string>;
  pending: PendingText[];
}

const json = (v: unknown) => JSON.stringify(v, null, 2) + '\n';

export async function syncProfessions(o: ProfessionSyncOptions): Promise<ProfessionSyncResult> {
  const opts = { cacheDir: o.cacheDir };
  const dataDir = path.join(o.root, 'src/data');
  const guide = JSON.parse(await readFile(path.join(dataDir, 'professions-guide.json'), 'utf8')) as ProfessionsGuide;

  // ---------- professions ----------
  const all = await fetchJson<WclProfession[]>(`${o.dataBase}professions.json`, opts);
  const list = all.filter((p) => p.kind !== 'system');
  const camping = all.find((p) => p.slug === 'camping');
  const books: (WclProfessionBook | undefined)[] = [];
  for (const p of list) {
    books.push(
      await fetchJson<WclProfessionBook>(`${o.dataBase}zhuanye/${p.slug}.json`, opts).catch((err) => {
        o.log(`  ${p.slug}: no profession book (${(err as Error).message})`);
        return undefined;
      }),
    );
  }
  const built = list.map((p, i) => buildProfession(p, books[i], `${WCLBOX}/en/zhuanye/${p.slug}`));
  const professions = built.map((b) => b.profession);

  // item names and icons
  const wcl = await fetchJson<WclLegacy>(`${o.dataBase}legacy.json`, opts).catch(() => undefined);
  const wanted = new Set<number>(built.flatMap((b) => [...b.itemIds]));
  for (const g of Object.values(guide.professions)) for (const id of g.tools) wanted.add(id);
  for (const r of wcl?.tree.progress_track?.rewards ?? []) if (r.item) wanted.add(r.item);
  // Names, icons and tooltip lines from wclbox item shards (items/id/<id % shards>.json);
  // the profession books fill in anything a shard lacks.
  const known = itemsFromBooks(books);
  const items: Record<string, ItemRef> = {};
  const shards = new Map<number, number[]>();
  for (const id of wanted) {
    if (!o.itemShards) break;
    const shard = id % o.itemShards;
    shards.set(shard, [...(shards.get(shard) ?? []), id]);
  }
  for (const [shard, ids] of [...shards].sort(([a], [b]) => a - b)) {
    const data = await fetchJson<Record<string, WclItem>>(`${o.dataBase}items/id/${shard}.json`, opts).catch(
      () => ({}) as Record<string, WclItem>,
    );
    for (const id of ids) if (data[id]) items[id] = itemFromShard(data[id]);
  }
  for (const id of [...wanted].sort((a, b) => a - b)) {
    const book = known.get(id);
    if (book) items[id] = { ...book, ...items[id], icon: items[id]?.icon ?? book.icon };
  }
  const unresolved = [...wanted].filter((id) => !items[id]);
  if (unresolved.length) o.log(`  items without a name: ${unresolved.join(', ')}`);

  const problems = guideProblems(guide, professions);
  if (problems.length) {
    o.log(`GUIDE_OUTDATED ${problems.length} — update src/data/professions-guide.json:`);
    for (const p of problems) o.log(`  - ${p}`);
  }

  const professionsFile: ProfessionsFile = {
    generatedAt: new Date().toISOString(),
    build: o.build,
    source: `${WCLBOX}/en/zhuanye (新手盒子·魔兽世界无限数据库)`,
    professions,
    campingPerks: (camping?.perks ?? []).map((id) => `legacy/${id.replace(/^legacy-perk-/, '')}`),
    items: Object.fromEntries(Object.entries(items).sort(([a], [b]) => Number(a) - Number(b))),
  };
  o.log(
    `professions: ${professions.length}, camp objects ${professions.reduce((n, p) => n + p.campObjects.length, 0)}, items ${Object.keys(items).length}`,
  );

  // ---------- Legacy ----------
  const app = wftAppScript(await fetchText(`${WOWFOREVERTOOLS}/`));
  if (!app) throw new Error('wowforevertools: app script not found');
  const chunk = wftChunkMap(await fetchText(`${WOWFOREVERTOOLS}/assets/${app}`, opts)).get('talents/legacy');
  if (!chunk) throw new Error('wowforevertools: no talents/legacy chunk');
  const wft = readChunkData<WftLegacyFile>(await fetchText(`${WOWFOREVERTOOLS}/assets/${chunk}`, opts));
  if (!wft?.trees?.length) throw new Error('wowforevertools: Legacy chunk has no trees');
  const legacy: LegacyFile = {
    generatedAt: new Date().toISOString(),
    source: `${WOWFOREVERTOOLS}/legacy (client text); ${WCLBOX}/en/chuancheng (rewards, challenges)`,
    ...buildLegacy(wft, wcl, o.build),
  };

  // Turkish perk text from the shared translation cache (npm run translate)
  const trCache = JSON.parse(
    await readFile(path.join(dataDir, 'i18n/tr.json'), 'utf8').catch(() => '{}'),
  ) as TranslationCache;
  const pending = [...applyTranslations(legacy.perks, trCache), ...applyRewardTranslations(legacy.rewards, items, trCache)];
  for (const p of applyRankTranslations(legacy.perks, trCache)) if (!pending.some((u) => u.key === p.key)) pending.push(p);
  o.log(`legacy: ${legacy.trees.length} trees, ${legacy.perks.length} perks, ${legacy.reserved.length} unrevealed`);

  await writeFile(path.join(dataDir, 'professions.json'), json(professionsFile));
  await writeFile(path.join(dataDir, 'legacy.json'), json(legacy));

  const icons = new Set<string>(
    [
      ...professions.flatMap((p) => [p.icon, ...p.campObjects.map((c) => c.icon)]),
      ...Object.values(items).map((i) => i.icon),
      ...legacy.trees.map((t) => t.icon),
      ...legacy.perks.map((p) => p.icon),
      ...legacy.rewards.map((r) => r.icon),
      'inv_misc_questionmark',
    ].filter((i): i is string => !!i),
  );
  return { icons, pending };
}
