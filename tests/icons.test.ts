import { describe, expect, it } from 'vitest';
import { referencedIcons } from '../scripts/sync/icons';
import classes from '../src/data/classes.json';
import glossary from '../src/data/glossary.json';
import races from '../src/data/races.json';
import type { ClassInfo, GlossaryFile, RaceInfo } from '../src/lib/glossary-types';

describe('referencedIcons', () => {
  const icons = referencedIcons(
    (glossary as GlossaryFile).entries,
    classes as ClassInfo[],
    races as RaceInfo[],
  );

  it('includes race icons, so sync downloads them', () => {
    for (const race of races as RaceInfo[]) if (race.icon) expect(icons).toContain(race.icon);
  });

  it('includes class, tree and glossary icons', () => {
    expect(icons).toContain('classicon_mage');
    for (const c of classes as ClassInfo[]) for (const t of c.treeIcons ?? []) if (t) expect(icons).toContain(t);
    expect(icons).not.toContain('');
  });
});
