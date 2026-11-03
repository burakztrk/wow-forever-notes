import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const accent = z.enum(['primary', 'warning', 'success', 'error']);

// One file per language with the same slug:
//   src/content/blog/tr/wow-forever-YYYY-MM-DD.md
//   src/content/blog/en/wow-forever-YYYY-MM-DD.md
// Entry ids come out as "tr/wow-forever-YYYY-MM-DD".
const blog = defineCollection({
  loader: glob({ pattern: '{tr,en}/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // shorter <title> for search results when `title` is over 60 characters (the h1 keeps `title`)
    seoTitle: z.string().max(60).optional(),
    date: z.date(),
    // set when a published post is revised (shown on the page, dateModified in JSON-LD)
    updated: z.date().optional(),
    tags: z.array(z.string()).default([]),
    accent: accent.default('warning'),
    excerpt: z.string().optional(),
    draft: z.boolean().default(false),
    // WoW Forever client build the post covers, e.g. "1.60.1.70425"
    build: z.string().optional(),
    sources: z.array(z.string().url()).default([]),
  }),
});

export const collections = { blog };
