// npm run sync:professions [-- --no-icons] [-- --fresh]
//
// Refreshes only src/data/professions.json and src/data/legacy.json (plus their
// icons) — a minute instead of the full sync. Prints GUIDE_OUTDATED when the
// hand-edited src/data/professions-guide.json names something the new data no
// longer has, and TRANSLATE_PENDING when Legacy text changed.
import { rm } from 'node:fs/promises';
import path from 'node:path';
import { fetchJson } from '../lib/http';
import { wclboxDataBase, wclboxRelease } from '../lib/sources';
import { downloadIcons } from './icons';
import { syncProfessions } from './professions-run';

const ROOT = process.cwd();
const args = process.argv.slice(2);
const log = (...m: unknown[]) => console.log('[sync:professions]', ...m);

const release = await wclboxRelease();
const cacheDir = path.join(ROOT, '.cache/http', release);
if (args.includes('--fresh')) await rm(cacheDir, { recursive: true, force: true });
const dataBase = await wclboxDataBase(release);
const meta = await fetchJson<{ foreverBuild?: string }>(`${dataBase}meta.json`, { cacheDir }).catch(
  () => ({}) as { foreverBuild?: string },
);
const itemMeta = await fetchJson<{ shard?: number }>(`${dataBase}items/meta.json`, { cacheDir }).catch(
  () => ({}) as { shard?: number },
);
log(`release ${release}, build ${meta.foreverBuild ?? 'unknown'}`);

const { icons, pending } = await syncProfessions({
  root: ROOT,
  dataBase,
  cacheDir,
  build: meta.foreverBuild ?? null,
  itemShards: itemMeta.shard,
  log,
});
if (!args.includes('--no-icons')) await downloadIcons(path.join(ROOT, 'public/icons'), icons, log);
log(pending.length ? `TRANSLATE_PENDING ${pending.length} Legacy texts → run \`npm run translate\`` : 'translations: all Legacy texts present');
