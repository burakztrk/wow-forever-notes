import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../config';
import { assertTranslationsComplete, splitId } from './posts';

export type Post = CollectionEntry<'blog'> & { lang: Lang; slug: string };

// Drafts render in `astro dev` only; production builds skip them.
const showDrafts = import.meta.env.DEV;

export async function getAllPosts(): Promise<Post[]> {
  const entries = await getCollection('blog');
  assertTranslationsComplete(entries.map((e) => e.id));
  return entries
    .filter((e) => showDrafts || !e.data.draft)
    .map((e) => ({ ...e, ...splitId(e.id) }))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getPosts(lang: Lang): Promise<Post[]> {
  return (await getAllPosts()).filter((p) => p.lang === lang);
}
