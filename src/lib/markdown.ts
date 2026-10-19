import { unified } from '@astrojs/markdown-remark';
import remarkDirective from 'remark-directive';
import remarkGlossary from './remark-glossary';
import remarkSections from './remark-sections';

// The markdown processor, shared by astro.config.mjs and scripts/check-content.ts
// so the pre-build check renders posts exactly like the site does (including
// Astro's built-in gfm + smartypants, which run before our plugins).
//
// Astro 7's default processor (Sätteri) has no remark plugins; the unified
// processor runs ours: :spell[…] / :talent[…] / :racial[…] → tooltip spans
// (see src/lib/remark-glossary.ts), then ::class[…] / ::race[…] /
// ::profession[…] → collapsible sections (src/lib/remark-sections.ts)
export const SITE_BASE = '';

export const markdownProcessor = unified({
  remarkPlugins: [remarkDirective, [remarkGlossary, { base: SITE_BASE }], remarkSections],
});
