// Class / race / profession sections of a patch-note post.
//
// A post marks a section with a leaf directive on its own line:
//
//   ::class[Warrior]
//   ::race[Gnome]                 (Skyborne → both Skyborne races)
//   ::profession[Mining]
//   ::profession[General]{id=general}
//
// remark-sections (src/lib/remark-sections.ts) turns each one into
//   <details class="note-section …" data-section="class" data-ids="warrior" open>
//     <summary><h3 id="class-warrior">Warrior</h3></summary> …body… </details>
// and the helpers below read those sections back out of the rendered HTML for
// the class, race and profession pages and for /data/v1/posts.json. Pure
// functions, no astro:content, so they can be unit-tested.

export const SECTION_KINDS = ['class', 'race', 'profession'] as const;
export type SectionKind = (typeof SECTION_KINDS)[number];

// profession ids beyond the synced profession slugs
export const EXTRA_PROFESSION_IDS = ['camping', 'general'] as const;

export interface PostSection {
  kind: SectionKind;
  ids: string[]; // class id, race ids or profession slug
  title: string; // the directive label, e.g. "Warrior"
  anchor: string; // heading id in the post, e.g. "class-warrior"
  html: string; // section body (without its heading)
  glossaryIds: string[]; // tooltip ids used in the body
}

export interface SectionData {
  classes: { id: string; name: string }[];
  races: { id: string; name: string }[];
  professions: { slug: string; name: string }[];
}

export type SectionResolution = { ids: string[]; error?: undefined } | { ids?: undefined; error: string };

export const sectionKey = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');

// "alliance-night-elf" → "night-elf"
const raceSuffix = (id: string) => id.replace(/^(alliance|horde)-/, '');

export function createSectionResolver(data: SectionData) {
  const valid: Record<SectionKind, Set<string>> = {
    class: new Set(data.classes.map((c) => c.id)),
    race: new Set(data.races.map((r) => r.id)),
    profession: new Set([...data.professions.map((p) => p.slug), ...EXTRA_PROFESSION_IDS]),
  };
  const names: Record<SectionKind, string[]> = {
    class: data.classes.map((c) => c.name),
    race: [...new Set(data.races.map((r) => r.name))],
    profession: [...data.professions.map((p) => p.name), 'Camping'],
  };

  function byLabel(kind: SectionKind, key: string): string[] {
    if (kind === 'class') {
      return data.classes.filter((c) => c.id === key || sectionKey(c.name) === key).map((c) => c.id);
    }
    if (kind === 'profession') {
      if (key === 'camping') return ['camping'];
      return data.professions.filter((p) => p.slug === key || sectionKey(p.name) === key).map((p) => p.slug);
    }
    const exact = data.races.filter((r) => r.id === key || raceSuffix(r.id) === key || sectionKey(r.name) === key);
    if (exact.length) return exact.map((r) => r.id);
    // "Skyborne" covers "skyborne-high-order" and "skyborne-windshaper"
    return data.races.filter((r) => raceSuffix(r.id).startsWith(`${key}-`)).map((r) => r.id);
  }

  return {
    resolve(kind: SectionKind, label: string, id?: string | null): SectionResolution {
      if (id) {
        const ids = id
          .split(/[\s,]+/)
          .map((s) => s.trim())
          .filter(Boolean);
        const bad = ids.filter((i) => !valid[kind].has(i));
        if (!ids.length || bad.length) {
          return { error: `unknown ${kind} id "${bad.join(', ') || id}"; use one of: ${[...valid[kind]].join(', ')}` };
        }
        return { ids };
      }
      const ids = byLabel(kind, sectionKey(label));
      if (!ids.length) {
        const hint = kind === 'profession' ? ` (or add {id=general})` : '';
        return { error: `unknown ${kind} "${label}"; use one of: ${names[kind].join(', ')}${hint}` };
      }
      return { ids };
    },
  };
}

export type SectionResolver = ReturnType<typeof createSectionResolver>;

// ---------- reading sections back from rendered HTML ----------

const SECTION_RE =
  /<details class="note-section[^"]*" data-section="(class|race|profession)" data-ids="([^"]*)"[^>]*>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g;

const decodeEntities = (s: string) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&(quot|lt|gt|apos|amp);/g, (_, n) => ({ quot: '"', lt: '<', gt: '>', apos: "'", amp: '&' })[n as 'amp']);

export function parseSections(html: string): PostSection[] {
  const out: PostSection[] = [];
  for (const m of html.matchAll(SECTION_RE)) {
    const [, kind, ids, summary, body] = m;
    const glossaryIds = [...new Set([...body.matchAll(/data-tip="([^"]+)"/g)].map((t) => t[1]))];
    out.push({
      kind: kind as SectionKind,
      ids: ids.split(' ').filter(Boolean),
      title: decodeEntities(summary.replace(/<[^>]*>/g, '')).trim(),
      anchor: /\bid="([^"]+)"/.exec(summary)?.[1] ?? '',
      html: body.trim(),
      glossaryIds,
    });
  }
  return out;
}

// For /data/v1/posts.json: older app parsers flatten unknown tags such as
// <details>, so the API keeps the sections as <section> (a block tag they
// already walk into) and drops the <summary> wrapper around the heading.
export function sectionsAsBlocks(html: string): string {
  return html
    .replace(/<details (class="note-section[^>]*?)(?: open(?:="")?)?>/g, '<section $1>')
    .replace(/<summary>(<h3[^>]*>[\s\S]*?<\/h3>)<\/summary>/g, '$1')
    .replace(/<\/details>/g, '</section>');
}

// ---------- page lists ----------

export interface SectionedPost {
  date: Date;
  sections: PostSection[];
}

// Posts with sections for `kind` (and `id`, when given), newest first, each
// with only the matching sections.
export function notesFor<P extends SectionedPost>(
  posts: P[],
  kind: SectionKind,
  id?: string,
): { post: P; sections: PostSection[] }[] {
  return posts
    .map((post) => ({
      post,
      sections: post.sections.filter((s) => s.kind === kind && (id === undefined || s.ids.includes(id))),
    }))
    .filter((n) => n.sections.length > 0)
    .sort((a, b) => b.post.date.getTime() - a.post.date.getTime());
}
