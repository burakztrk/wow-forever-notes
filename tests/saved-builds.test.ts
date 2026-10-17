import { describe, expect, it } from 'vitest';
import { loadBuilds, removeBuild, saveBuild, type KeyValue } from '../src/lib/saved-builds';

// Same vectors as the mobile app's BuildStoreTest.kt.

const memory = (): KeyValue => {
  const data = new Map<string, string>();
  return { getItem: (k) => data.get(k) ?? null, setItem: (k, v) => void data.set(k, v) };
};
const forClass = (store: KeyValue, cls: string) => loadBuilds(store).filter((b) => b.cls === cls);

describe('saved builds', () => {
  it('saves newest first and persists', () => {
    const store = memory();
    saveBuild(store, 'mage', 'Frost PvP', '05-0-55');
    saveBuild(store, 'warrior', 'Arms', '53');
    saveBuild(store, 'mage', 'Fire raid', '-505');
    expect(forClass(store, 'mage').map((b) => b.name)).toEqual(['Fire raid', 'Frost PvP']);
    expect(loadBuilds(store).map((b) => b.name)).toEqual(['Fire raid', 'Arms', 'Frost PvP']);
  });

  it('same name replaces and remove deletes', () => {
    const store = memory();
    const [first] = saveBuild(store, 'mage', 'Frost', '05');
    const [second] = saveBuild(store, 'mage', 'frost ', '055');
    expect(second.id).toBe(first.id);
    expect(forClass(store, 'mage').map((b) => b.code)).toEqual(['055']);
    removeBuild(store, second.id);
    expect(loadBuilds(store)).toEqual([]);
  });

  it('empty name falls back to the code', () => {
    expect(saveBuild(memory(), 'mage', '  ', '501-2')[0].name).toBe('501-2');
  });

  it('survives broken or missing storage', () => {
    const broken: KeyValue = { getItem: () => '{not json', setItem: () => {} };
    expect(loadBuilds(broken)).toEqual([]);
    expect(saveBuild(null, 'mage', 'x', '5').map((b) => b.name)).toEqual(['x']);
  });
});
