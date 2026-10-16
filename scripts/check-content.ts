// Runs before `astro build` (see package.json). Astro's content loader only
// logs markdown render errors, so a broken post would otherwise ship with an
// empty body and a green build. The checks live in scripts/lib/content-check.ts.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { checkPosts } from './lib/content-check';

const { problems, posts } = await checkPosts(path.join(process.cwd(), 'src/content/blog'));

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
console.log(`check-content: ${posts.length} post files OK`);
