import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../config';
import { notesFor, parseSections, type PostSection, type SectionKind } from './post-sections';
import { assertTranslationsComplete, splitId } from './posts';

export type Post = CollectionEntry<'blog'> & { lang: Lang; slug: string };

// Drafts render in `astro dev` only; production builds skip them.
const showDrafts = import.meta.env.DEV;

export async function getAllPosts(): Promise<Post[]> {
  const entries = await getCollection('blog');
  assertTranslationsComplete(entries.map((e) => e.id));
  // The glob loader logs a markdown render error and keeps the entry with no
  // HTML; fail the build instead of publishing an empty post. The content
  // cache keeps that empty render until the .md changes, so after fixing a
  // plugin delete node_modules/.astro/data-store.json. The content
  // cache keeps that empty render until the .md changes, so after fixing a
  // plugin delete node_modules/.astro/data-store.json.
  const empty = entries.filter((e) => !e.data.draft && !e.rendered?.html?.trim()).map((e) => e.id);
  if (empty.length) {
    throw new Error(`Blog posts rendered to empty HTML (see the markdown error above; after a plugin fix delete node_modules/.astro/data-store.json): ${empty.join(', ')}`);
  }
  return entries
    .filter((e) => showDrafts || !e.data.draft)
    .map((e) => ({ ...e, ...splitId(e.id) }))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getPosts(lang: Lang): Promise<Post[]> {
  return (await getAllPosts()).filter((p) => p.lang === lang);
}

export interface PatchNote {
  post: Post & { date: Date };
  sections: PostSection[];
}

// Class / race / profession sections of this language's posts, newest first
// (see src/lib/post-sections.ts). `id` omitted: every section of that kind.
export async function getPatchNotes(lang: Lang, kind: SectionKind, id?: string): Promise<PatchNote[]> {
  const posts = (await getPosts(lang)).map((p) => ({ ...p, date: p.data.date, sections: parseSections(p.rendered?.html ?? '') }));
  return notesFor(posts, kind, id);
}

export const patchNoteGlossaryIds = (notes: PatchNote[]) => [
  ...new Set(notes.flatMap((n) => n.sections.flatMap((s) => s.glossaryIds))),
];
