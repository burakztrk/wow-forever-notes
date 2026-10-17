// Talent builds the reader saved by name, kept in localStorage. Same shape and
// rules as the mobile app's BuildStore: the code is the #b= share code, newest
// first, saving the same class + name again replaces the old entry.

export interface SavedBuild {
  id: string;
  cls: string;
  name: string;
  code: string;
}

export interface KeyValue {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

const KEY = 'wf-saved-builds';

export function loadBuilds(store: KeyValue | null): SavedBuild[] {
  try {
    const list = JSON.parse(store?.getItem(KEY) ?? '[]');
    return Array.isArray(list) ? list.filter((b) => b && typeof b.id === 'string' && typeof b.cls === 'string') : [];
  } catch {
    return [];
  }
}

function write(store: KeyValue | null, list: SavedBuild[]): SavedBuild[] {
  try {
    store?.setItem(KEY, JSON.stringify(list));
  } catch {
    // private mode or full storage: keep working in memory for this page
  }
  return list;
}

export function saveBuild(store: KeyValue | null, cls: string, name: string, code: string): SavedBuild[] {
  const builds = loadBuilds(store);
  const clean = name.trim() || code || '—';
  const existing = builds.find((b) => b.cls === cls && b.name.toLowerCase() === clean.toLowerCase());
  let id = existing?.id;
  if (!id) {
    const taken = new Set(builds.map((b) => b.id));
    let n = builds.length + 1;
    while (taken.has(`b${n}`)) n++;
    id = `b${n}`;
  }
  return write(store, [{ id, cls, name: clean, code }, ...builds.filter((b) => b.id !== id)]);
}

export function removeBuild(store: KeyValue | null, id: string): SavedBuild[] {
  return write(
    store,
    loadBuilds(store).filter((b) => b.id !== id),
  );
}

export function browserStore(): KeyValue | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
