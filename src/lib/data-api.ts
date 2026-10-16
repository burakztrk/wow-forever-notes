import classesData from '../data/classes.json';
import glossaryData from '../data/glossary.json';
import racesData from '../data/races.json';
import type { GlossaryFile } from './glossary-types';
import { getAllPosts } from './blog';
import { postUrl } from '../utils/url';

// Public read-only data API for the mobile app: /data/v1/*.json, generated at
// build time and served by GitHub Pages (CORS: *). Bump DATA_SCHEMA when a
// field is removed or changes meaning; adding fields is backwards compatible.

export const DATA_SCHEMA = 1;
export const DATA_FILES = ['glossary', 'classes', 'races', 'posts'] as const;

const glossary = glossaryData as GlossaryFile;

const json = (body: unknown) =>
  new Response(JSON.stringify(body), { headers: { 'content-type': 'application/json; charset=utf-8' } });

const siteRoot = () => `${import.meta.env.SITE}${import.meta.env.BASE_URL}`.replace(/\/$/, '');

export async function postsPayload() {
  const posts = await getAllPosts();
  return {
    schema: DATA_SCHEMA,
    posts: posts.map((p) => ({
      id: p.id, // "tr/wow-forever-2026-10-16"
      lang: p.lang,
      slug: p.slug,
      title: p.data.title,
      date: p.data.date.toISOString().slice(0, 10),
      build: p.data.build ?? null,
      excerpt: p.data.excerpt ?? null,
      tags: p.data.tags,
      sources: p.data.sources,
      url: `${import.meta.env.SITE}${postUrl(p.lang, p.slug)}`,
      // rendered HTML: tooltip spans carry data-tip="<glossary id>"; image
      // paths are site-relative, resolve them against manifest.assetBase
      html: p.rendered?.html ?? '',
      glossaryIds: (p.rendered?.metadata?.frontmatter?.glossaryIds as string[] | undefined) ?? [],
    })),
  };
}

export async function manifestPayload() {
  const { posts } = await postsPayload();
  const latest = posts.find((p) => p.lang === 'tr') ?? posts[0];
  return {
    schema: DATA_SCHEMA,
    generatedAt: new Date().toISOString(),
    gameBuild: glossary.build,
    assetBase: siteRoot(),
    iconUrl: `${siteRoot()}/icons/{icon}.jpg`,
    files: Object.fromEntries(DATA_FILES.map((f) => [f, `${siteRoot()}/data/v1/${f}.json`])),
    counts: { glossary: glossary.entries.length, classes: classesData.length, races: racesData.length, posts: posts.length },
    latestPost: latest ? { slug: latest.slug, date: latest.date, build: latest.build } : null,
  };
}

export const respond = {
  manifest: async () => json(await manifestPayload()),
  glossary: () => json({ schema: DATA_SCHEMA, ...glossary }),
  classes: () => json({ schema: DATA_SCHEMA, classes: classesData }),
  races: () => json({ schema: DATA_SCHEMA, races: racesData }),
  posts: async () => json(await postsPayload()),
};
