// Runs before `astro build` (see package.json). Astro's content loader only
// logs markdown render errors, so glossary mistakes would otherwise ship as an
// empty post with a green build. This makes them fatal:
//   - every :spell/:talent/:racial/:tip reference must resolve in the glossary
//   - every post must exist in every language
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import remarkDirective from 'remark-directive';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { findMissingTranslations } from '../src/lib/posts';
import remarkGlossary from '../src/lib/remark-glossary';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

const files = readdirSync(BLOG_DIR, { recursive: true, encoding: 'utf8' })
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.split(path.sep).join('/'));

const problems: string[] = findMissingTranslations(files.map((f) => f.replace(/\.md$/, '')));

for (const rel of files) {
  const source = readFileSync(path.join(BLOG_DIR, rel), 'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  const processor = unified().use(remarkParse).use(remarkDirective).use(remarkGlossary);
  try {
    await processor.run(processor.parse(source), { path: rel, data: {} } as never);
  } catch (err) {
    problems.push((err as Error).message);
  }
}

// Turkish tooltip coverage: a warning, not a failure (tooltips fall back to English).
const glossary = JSON.parse(readFileSync(path.join(process.cwd(), 'src/data/glossary.json'), 'utf8')) as {
  entries: { desc?: string; descTr?: string }[];
};
const untranslated = glossary.entries.filter((e) => e.desc?.trim() && !e.descTr).length;
if (untranslated) {
  console.warn(`check-content: warning: ${untranslated} glossary entries have no Turkish text — run \`npm run translate\``);
}

if (problems.length) {
  console.error(`check-content: ${problems.length} problem(s)\n\n${problems.join('\n\n')}`);
  process.exit(1);
}
console.log(`check-content: ${files.length} post files OK`);
