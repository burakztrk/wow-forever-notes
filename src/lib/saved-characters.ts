import { MAX_NAME_LENGTH, type KeyValue } from './saved-builds';

// Characters the reader saved from the creator, kept in localStorage. Same
// shape and rules as the mobile app's CharacterStore: a name, the race and
// class picked on the creator, and the character's talent build (the #b=
// share code, "" until one is saved). Newest first.

export interface SavedCharacter {
  id: string;
  name: string;
  race: string;
  cls: string;
  code: string;
}

const KEY = 'wf-saved-characters';

export function loadCharacters(store: KeyValue | null): SavedCharacter[] {
  try {
    const list = JSON.parse(store?.getItem(KEY) ?? '[]');
    return Array.isArray(list)
      ? list
          .filter((c) => c && typeof c.id === 'string' && typeof c.race === 'string' && typeof c.cls === 'string')
          .map((c) => ({ ...c, code: typeof c.code === 'string' ? c.code : '' }))
      : [];
  } catch {
    return [];
  }
}

function write(store: KeyValue | null, list: SavedCharacter[]): SavedCharacter[] {
  try {
    store?.setItem(KEY, JSON.stringify(list));
  } catch {
    // private mode or full storage: keep working in memory for this page
  }
  return list;
}

export function addCharacter(store: KeyValue | null, name: string, race: string, cls: string, code = ''): SavedCharacter[] {
  const list = loadCharacters(store);
  const taken = new Set(list.map((c) => c.id));
  let n = list.length + 1;
  while (taken.has(`c${n}`)) n++;
  const clean = name.trim().slice(0, MAX_NAME_LENGTH) || '—';
  return write(store, [{ id: `c${n}`, name: clean, race, cls, code }, ...list]);
}

// Saves the character's talent build and moves it to the top. Unknown ids
// leave the list as it is.
export function updateCharacterBuild(store: KeyValue | null, id: string, code: string): SavedCharacter[] {
  const list = loadCharacters(store);
  const character = list.find((c) => c.id === id);
  if (!character) return list;
  return write(store, [{ ...character, code }, ...list.filter((c) => c.id !== id)]);
}

export function removeCharacter(store: KeyValue | null, id: string): SavedCharacter[] {
  return write(
    store,
    loadCharacters(store).filter((c) => c.id !== id),
  );
}
