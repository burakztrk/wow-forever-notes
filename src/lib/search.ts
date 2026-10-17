// Glossary search, same rules as the mobile app's domain/Search.kt: names
// first, then descriptions in the page language. Pure, so the browser bundle
// does not pull in the glossary.

export interface Searchable {
  name: string;
  desc: string; // already in the page language (TR falls back to EN)
  status: string;
}

export interface SearchHit<T extends Searchable> {
  entry: T;
  score: number;
}

// Lowercase and fold Turkish dotted/dotless i, so "irk", "IRK" and "ırk" match
// alike and a Turkish keyboard finds "Ice Barrier".
export function foldForSearch(s: string): string {
  return s.toLowerCase().replace(/ı/g, 'i').replace(/i̇/g, 'i').trim();
}

export function searchEntries<T extends Searchable>(query: string, entries: Iterable<T>, limit = 50): SearchHit<T>[] {
  const q = foldForSearch(query);
  if (q.length < 2) return [];
  const words = q.split(' ').filter(Boolean);
  const hits: SearchHit<T>[] = [];
  for (const e of entries) {
    const name = foldForSearch(e.name);
    let score: number;
    if (name === q) score = 100;
    else if (name.startsWith(q)) score = 80;
    else if (name.split(/[ \-:]/).some((w) => w.startsWith(q))) score = 60;
    else if (name.includes(q)) score = 50;
    else if (words.every((w) => name.includes(w))) score = 40;
    else if (words.every((w) => foldForSearch(e.desc).includes(w))) score = 10;
    else continue;
    // removed abilities sink a little
    hits.push({ entry: e, score: e.status === 'removed' ? score - 5 : score });
  }
  // same order as Kotlin's compareBy on strings (UTF-16 code units)
  hits.sort((a, b) => b.score - a.score || (a.entry.name < b.entry.name ? -1 : a.entry.name > b.entry.name ? 1 : 0));
  return hits.slice(0, limit);
}
