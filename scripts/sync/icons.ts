import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fetchBinary } from '../lib/http';
import { wclboxIcon } from '../lib/sources';
import type { ClassInfo, GlossaryEntry, RaceInfo } from '../../src/lib/glossary-types';

// Every icon the site and the app reference: glossary entries, class and tree
// icons, race icons.
export function referencedIcons(entries: GlossaryEntry[], classes: ClassInfo[], races: RaceInfo[]): Set<string> {
  return new Set(
    [
      ...entries.map((e) => e.icon),
      ...classes.flatMap((c) => [c.icon, ...(c.treeIcons ?? [])]),
      ...races.map((r) => r.icon),
    ].filter((i): i is string => !!i),
  );
}

// Downloads icons not yet in public/icons/ (existing files are kept).
export async function downloadIcons(iconDir: string, icons: Set<string>, log: (...m: unknown[]) => void) {
  await mkdir(iconDir, { recursive: true });
  let fetched = 0;
  for (const icon of [...icons].sort()) {
    const file = path.join(iconDir, `${icon}.jpg`);
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
