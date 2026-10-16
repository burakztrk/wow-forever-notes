// npm run translate                        → apply cached Turkish texts to the glossary,
//                                            list what is still missing (.cache/translate-pending.json)
// npm run translate -- --apply <file.json>  → merge new translations ({ "<key>": "<tr>" , … })
//
// Prints TRANSLATIONS_COMPLETE or TRANSLATE_PENDING <n>. Style guide:
// docs/translation-style.md. No network, no API key: the scheduled job (or a
// person) writes the translations file.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { GlossaryFile } from '../src/lib/glossary-types';
import {
  applyRankTranslations,
  applyTranslations,
  pruneCache,
  textKey,
  validateTranslation,
  type TranslationCache,
} from './lib/translations';

const ROOT = process.cwd();
const GLOSSARY = path.join(ROOT, 'src/data/glossary.json');
const CACHE = path.join(ROOT, 'src/data/i18n/tr.json');
const PENDING = path.join(ROOT, '.cache/translate-pending.json');

const json = (v: unknown) => JSON.stringify(v, null, 2) + '\n';
const readJson = async <T>(file: string, fallback: T): Promise<T> => {
  try {
    return JSON.parse(await readFile(file, 'utf8')) as T;
  } catch {
    return fallback;
  }
};

const glossary = await readJson<GlossaryFile>(GLOSSARY, { entries: [] } as unknown as GlossaryFile);
let cache = await readJson<TranslationCache>(CACHE, {});

const applyIdx = process.argv.indexOf('--apply');
if (applyIdx > 0) {
  const file = process.argv[applyIdx + 1];
  const incoming = await readJson<Record<string, string>>(path.resolve(file), {});
  const pending = await readJson<{ key: string; en: string }[]>(PENDING, []);
  const enByKey = new Map(pending.map((p) => [p.key, p.en]));
  // English text can also come from the glossary itself
  for (const e of glossary.entries)
    for (const t of [e.desc, e.change]) if (t?.trim()) enByKey.set(textKey(t), t);

  let added = 0;
  const rejected: string[] = [];
  for (const [key, tr] of Object.entries(incoming)) {
    const en = enByKey.get(key);
    if (!en) {
      rejected.push(`${key}: unknown key`);
      continue;
    }
    const problem = validateTranslation(en, tr);
    if (problem) {
      rejected.push(`${key}: ${problem}\n    en: ${en}\n    tr: ${tr}`);
      continue;
    }
    cache[key] = { en, tr: tr.trim() };
    added++;
  }
  console.log(`translations added: ${added}, rejected: ${rejected.length}`);
  if (rejected.length) console.log(rejected.map((r) => `  - ${r}`).join('\n'));
}

const missing = applyTranslations(glossary.entries, cache);
applyRankTranslations(glossary.entries);
cache = Object.fromEntries(Object.entries(pruneCache(glossary.entries, cache)).sort(([a], [b]) => a.localeCompare(b)));

await mkdir(path.dirname(CACHE), { recursive: true });
await writeFile(CACHE, json(cache));
await writeFile(GLOSSARY, json(glossary));
await mkdir(path.dirname(PENDING), { recursive: true });
await writeFile(PENDING, json(missing));

if (missing.length) {
  console.log(`TRANSLATE_PENDING ${missing.length} (list: ${path.relative(ROOT, PENDING)})`);
} else {
  console.log('TRANSLATIONS_COMPLETE');
}
