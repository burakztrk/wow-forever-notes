import type { APIRoute } from 'astro';
import glossaryData from '../../data/glossary.json';
import { LANGS, type Lang } from '../../config';
import type { GlossaryFile } from '../../lib/glossary-types';
import { tooltipPayload } from '../../lib/tooltip-payload';
import { loreSearch } from '../../lib/stories/lore';

// Search index for /<lang>/search/: the whole glossary as a tooltip payload in
// that language, loaded by the page on first use. The race stories' lore cards
// come along (cards + lore), with links to the stories that name them.

export function getStaticPaths() {
  return LANGS.map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = ({ params }) => {
  const ids = (glossaryData as GlossaryFile).entries.map((e) => e.id);
  const lang = params.lang as Lang;
  const { cards, lore } = loreSearch(lang);
  return new Response(JSON.stringify({ ...tooltipPayload(ids, lang), cards, lore }), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
