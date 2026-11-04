import { describe, expect, it } from 'vitest';
import { MAX_NOTE_LENGTH } from '../src/lib/build-note';
import { MAX_NAME_LENGTH, loadBuilds, removeBuild, saveBuild, updateBuild, type KeyValue } from '../src/lib/saved-builds';

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

  it('update overwrites the code and keeps the name', () => {
    const store = memory();
    const [frost] = saveBuild(store, 'mage', 'Frost', '05');
    saveBuild(store, 'mage', 'Fire', '-5');
    expect(updateBuild(store, frost.id, '055')[0].name).toBe('Frost');
    expect(loadBuilds(store).map((b) => [b.name, b.code])).toEqual([['Frost', '055'], ['Fire', '-5']]);
    expect(updateBuild(store, 'missing', '1')).toEqual(loadBuilds(store));
  });

  it('caps names at 50 characters like the app', () => {
    expect(saveBuild(memory(), 'mage', ` ${'a'.repeat(80)} `, '5')[0].name).toHaveLength(MAX_NAME_LENGTH);
  });

  it('keeps a trimmed, capped note and leaves an empty one out', () => {
    const store = memory();
    const [frost] = saveBuild(store, 'mage', 'Frost', '05', '  Frostbolt spam \n');
    expect(frost.note).toBe('Frostbolt spam');
    expect(saveBuild(store, 'mage', 'Fire', '-5', '   ')[0]).toEqual({ id: 'b2', cls: 'mage', name: 'Fire', code: '-5' });
    expect(saveBuild(store, 'mage', 'Long', '5', 'x'.repeat(6000))[0].note).toHaveLength(MAX_NOTE_LENGTH);
  });

  it('update keeps the note unless one is given', () => {
    const store = memory();
    const [frost] = saveBuild(store, 'mage', 'Frost', '05', 'first');
    expect(updateBuild(store, frost.id, '055')[0].note).toBe('first');
    expect(updateBuild(store, frost.id, '055', 'second')[0].note).toBe('second');
    expect(updateBuild(store, frost.id, '055', '')[0]).toEqual({ id: frost.id, cls: 'mage', name: 'Frost', code: '055' });
  });
});
