import type { APIRoute } from 'astro';
import glossaryData from '../../data/glossary.json';
import { LANGS, type Lang } from '../../config';
import type { GlossaryFile } from '../../lib/glossary-types';
import { tooltipPayload } from '../../lib/tooltip-payload';

// Search index for /<lang>/search/: the whole glossary as a tooltip payload in
// that language, loaded by the page on first use.

export function getStaticPaths() {
  return LANGS.map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = ({ params }) => {
  const ids = (glossaryData as GlossaryFile).entries.map((e) => e.id);
  return new Response(JSON.stringify(tooltipPayload(ids, params.lang as Lang)), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
