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
