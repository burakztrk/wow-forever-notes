import { readFileSync } from 'node:fs';
import path from 'node:path';
import { visit } from 'unist-util-visit';
import { createSectionResolver, SECTION_KINDS, sectionKey, type SectionKind, type SectionResolution, type SectionResolver } from './post-sections';

// remark plugin: groups a post into collapsible class / race / profession
// sections (see src/lib/post-sections.ts for the markup).
//
//   ## Character & class changes
//   ### General                 ← plain heading, not a section
//   - …
//   ::class[Hunter]             ← section starts here
//   - …
//   ::class[Mage]               ← next section
//   - …
//   ## Racial changes           ← a heading of depth ≤ 3 ends the section
//   ::race[Tauren]
//
// Each directive must sit on its own line at the top level of the post. An
// unknown class, race or profession fails the build, like glossary names.
// Runs after remark-glossary (which skips directive nodes when auto-linking).

export interface RemarkSectionsOptions {
  resolver?: SectionResolver; // defaults to the synced data in src/data
  open?: boolean; // sections start expanded in the post (default true)
}

type Node = {
  type: string;
  name?: string;
  depth?: number;
  value?: string;
  children?: Node[];
  attributes?: Record<string, string | null | undefined>;
  data?: Record<string, unknown>;
};

const KINDS = new Set<string>(SECTION_KINDS);
const textOf = (n: Node): string => (n.value ?? '') + (n.children ?? []).map(textOf).join('');

let cached: { cwd: string; resolver: SectionResolver } | undefined;
function defaultResolver(): SectionResolver {
  const cwd = process.cwd();
  if (cached?.cwd !== cwd) {
    const read = (f: string) => JSON.parse(readFileSync(path.join(cwd, 'src/data', f), 'utf8'));
    cached = {
      cwd,
      resolver: createSectionResolver({
        classes: read('classes.json'),
        races: read('races.json'),
        professions: read('professions.json').professions,
      }),
    };
  }
  return cached.resolver;
}

function sectionNode(kind: SectionKind, ids: string[], label: string, anchor: string, open: boolean): Node {
  const heading: Node = {
    type: 'heading',
    depth: 3,
    children: [{ type: 'text', value: label }],
    data: { hProperties: { id: anchor } },
  };
  return {
    type: 'noteSection',
    children: [{ type: 'noteSectionSummary', children: [heading], data: { hName: 'summary' } }],
    data: {
      hName: 'details',
      hProperties: {
        className: ['note-section', `note-section--${kind}`],
        dataSection: kind,
        dataIds: ids.join(' '),
        open,
      },
    },
  };
}

export default function remarkSections(options: RemarkSectionsOptions = {}) {
  const open = options.open ?? true;
  return (tree: Node, file: { path?: string }) => {
    const resolver = options.resolver ?? defaultResolver();
    const errors: string[] = [];
    const isSection = (n: Node) => n.type === 'leafDirective' && KINDS.has(n.name ?? '');

    // directives nested in lists or quotes would silently not split the post
    for (const top of tree.children ?? []) {
      if (isSection(top)) continue;
      visit(top as any, (n: Node) => {
        if (isSection(n)) errors.push(`::${n.name}[${textOf(n)}] must be on its own line at the top level of the post`);
      });
    }

    const out: Node[] = [];
    const anchors = new Set<string>();
    let current: Node | undefined;
    for (const node of tree.children ?? []) {
      if (isSection(node)) {
        const kind = node.name as SectionKind;
        const label = textOf(node).trim();
        const res: SectionResolution = label
          ? resolver.resolve(kind, label, node.attributes?.id)
          : { error: 'needs a label, e.g. ::class[Warrior]' };
        if (!res.ids) {
          errors.push(`::${kind}[${label}] → ${res.error}`);
          continue;
        }
        let anchor = `${kind}-${sectionKey(label) || res.ids[0]}`;
        for (let i = 2; anchors.has(anchor); i++) anchor = `${kind}-${sectionKey(label)}-${i}`;
        anchors.add(anchor);
        current = sectionNode(kind, res.ids, label, anchor, open);
        out.push(current);
        continue;
      }
      if (current && ((node.type === 'heading' && (node.depth ?? 1) <= 3) || node.type === 'thematicBreak')) {
        current = undefined;
      }
      (current ? current.children! : out).push(node);
    }

    if (errors.length) {
      throw new Error(`Post sections in ${file.path ?? 'markdown'}:\n  ${errors.join('\n  ')}`);
    }
    tree.children = out;
  };
}
