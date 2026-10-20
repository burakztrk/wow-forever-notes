import { describe, expect, it } from 'vitest';
import { MAX_NAME_LENGTH, type KeyValue } from '../src/lib/saved-builds';
import { addCharacter, loadCharacters, removeCharacter, updateCharacterBuild } from '../src/lib/saved-characters';

// Same rules as the mobile app's CharacterStore.

const memory = (): KeyValue => {
  const data = new Map<string, string>();
  return { getItem: (k) => data.get(k) ?? null, setItem: (k, v) => void data.set(k, v) };
};

describe('saved characters', () => {
  it('adds newest first with fresh ids and persists', () => {
    const store = memory();
    addCharacter(store, 'Thrall', 'horde-orc', 'shaman');
    addCharacter(store, 'Jaina', 'alliance-human', 'mage');
    expect(loadCharacters(store).map((c) => [c.id, c.name, c.code])).toEqual([
      ['c2', 'Jaina', ''],
      ['c1', 'Thrall', ''],
    ]);
  });

  it('the same name twice is two characters', () => {
    const store = memory();
    addCharacter(store, 'Alt', 'alliance-human', 'mage');
    addCharacter(store, 'Alt', 'alliance-human', 'mage');
    expect(loadCharacters(store)).toHaveLength(2);
  });

  it('trims and caps the name, empty becomes a dash', () => {
    const store = memory();
    addCharacter(store, '   ', 'alliance-human', 'mage');
    addCharacter(store, 'x'.repeat(80), 'alliance-human', 'mage');
    expect(loadCharacters(store).map((c) => c.name)).toEqual(['x'.repeat(MAX_NAME_LENGTH), '—']);
  });

  it('updates the build, moves it to the top, ignores unknown ids', () => {
    const store = memory();
    addCharacter(store, 'A', 'alliance-human', 'mage');
    addCharacter(store, 'B', 'horde-orc', 'warrior');
    updateCharacterBuild(store, 'c1', '05-0-55');
    expect(loadCharacters(store).map((c) => [c.name, c.code])).toEqual([
      ['A', '05-0-55'],
      ['B', ''],
    ]);
    expect(updateCharacterBuild(store, 'nope', '1')).toEqual(loadCharacters(store));
  });

  it('removes and reuses no taken id', () => {
    const store = memory();
    addCharacter(store, 'A', 'alliance-human', 'mage');
    addCharacter(store, 'B', 'horde-orc', 'warrior');
    removeCharacter(store, 'c1');
    const [added] = addCharacter(store, 'C', 'horde-orc', 'warrior');
    expect(added.id).toBe('c3');
    expect(loadCharacters(store).map((c) => c.name)).toEqual(['C', 'B']);
  });

  it('survives broken storage', () => {
    const store = memory();
    store.setItem('wf-saved-characters', '{oops');
    expect(loadCharacters(store)).toEqual([]);
    expect(loadCharacters(null)).toEqual([]);
  });
});
