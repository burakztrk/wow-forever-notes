import { readFileSync } from 'node:fs';
import path from 'node:path';
import { SKIP, visit } from 'unist-util-visit';
import { createGlossary, type Glossary } from './glossary';
import type { GlossaryEntry, GlossaryFile, GlossaryKind } from './glossary-types';

// remark plugin: turns glossary references into tooltip spans.
//
//   :spell[Aimed Shot]                     explicit, kind-checked
//   :talent[Improved Channeling]{class=mage}
//   :racial[Blood Fury]
//   :tip[Mana Shield]                      any kind
//
// An explicit reference that is not in src/data/glossary.json fails the build,
// so a misspelt or invented ability name cannot be published. Plain-text
// mentions of multi-word names are linked automatically (first mention only).
// Requires remark-directive before it in the plugin list.

export interface RemarkGlossaryOptions {
  base?: string; // site base path, for icon URLs
  entries?: GlossaryEntry[]; // defaults to src/data/glossary.json
  autoLink?: boolean;
}

const KINDS = new Set<string>(['spell', 'talent', 'racial', 'tip']);
// never auto-link inside these
const NO_AUTOLINK = new Set(['heading', 'link', 'linkReference', 'inlineCode', 'code', 'html', 'textDirective', 'leafDirective', 'containerDirective']);

type Node = { type: string; value?: string; name?: string; children?: Node[]; attributes?: Record<string, string | null | undefined>; data?: Record<string, unknown> };

const textOf = (n: Node): string => (n.value ?? '') + (n.children ?? []).map(textOf).join('');
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// smartypants has already curled apostrophes in the text by the time we run
const namePattern = (name: string) => escapeRe(name).replace(/'/g, "['\u2019]");

let cached: { file: string; glossary: Glossary } | undefined;
function defaultGlossary(): Glossary {
  const file = path.join(process.cwd(), 'src/data/glossary.json');
  if (cached?.file !== file) {
    const data = JSON.parse(readFileSync(file, 'utf8')) as GlossaryFile;
    cached = { file, glossary: createGlossary(data.entries) };
  }
  return cached.glossary;
}

function tipNode(entry: GlossaryEntry, label: string, base: string): Node {
  const children: unknown[] = [];
  if (entry.icon) {
    children.push({
      type: 'element',
      tagName: 'img',
      properties: {
        src: `${base.replace(/\/$/, '')}/icons/${entry.icon}.jpg`,
        alt: '',
        width: 18,
        height: 18,
        loading: 'lazy',
        className: ['wf-tip-icon'],
      },
      children: [],
    });
  }
  children.push({ type: 'text', value: label });
  return {
    type: 'textDirective',
    name: entry.kind,
    children: [{ type: 'text', value: label }],
    data: {
      hName: 'span',
      hProperties: { className: ['wf-tip', `wf-tip--${entry.kind}`], dataTip: entry.id, tabIndex: 0 },
      hChildren: children,
    },
  };
}

// Unknown directives (e.g. "Rank 8:Value" parsed as :Value) go back to text.
function literal(node: Node): Node {
  const label = node.children?.length ? `[${textOf(node)}]` : '';
  const attrs = Object.entries(node.attributes ?? {});
  const attrText = attrs.length ? `{${attrs.map(([k, v]) => (v ? `${k}="${v}"` : k)).join(' ')}}` : '';
  return { type: 'text', value: `:${node.name}${label}${attrText}` };
}

export default function remarkGlossary(options: RemarkGlossaryOptions = {}) {
  const base = options.base ?? '/';
  return (tree: Node, file: { path?: string; data: Record<string, any> }) => {
    const glossary = options.entries ? createGlossary(options.entries) : defaultGlossary();
    const used = new Set<string>();
    const errors: string[] = [];

    // 1. explicit directives
    visit(tree as any, (node: Node, index, parent: Node | undefined) => {
      if (node.type !== 'textDirective' || !parent || index == null) return;
      if (!KINDS.has(node.name ?? '')) {
        parent.children![index] = literal(node);
        return;
      }
      const label = textOf(node).trim();
      const attrs = node.attributes ?? {};
      const name = (attrs.name ?? label).trim();
      const res = glossary.resolve(name, {
        kind: node.name === 'tip' ? undefined : (node.name as GlossaryKind),
        cls: attrs.class ?? undefined,
        race: attrs.race ?? undefined,
      });
      if (res.error) {
        errors.push(`:${node.name}[${label}] → ${res.error}`);
        return;
      }
      parent.children![index] = tipNode(res.entry, label || res.entry.name, base);
      used.add(res.entry.id);
      return SKIP;
    });

    if (errors.length) {
      throw new Error(`Glossary references in ${file.path ?? 'markdown'}:\n  ${errors.join('\n  ')}`);
    }

    // 2. automatic linking of plain-text mentions
    const names = options.autoLink === false ? [] : glossary.autoLinkNames();
    if (names.length) {
      const pattern = new RegExp(
        `(?<![\\p{L}\\p{N}])(?:${names.sort((a, b) => b.length - a.length).map(namePattern).join('|')})(?![\\p{L}\\p{N}])`,
        'gu',
      );
      visit(tree as any, (node: Node, index, parent: Node | undefined) => {
        if (NO_AUTOLINK.has(node.type)) return SKIP;
        if (node.type !== 'text' || !parent || index == null || !node.value) return;
        const out: Node[] = [];
        let last = 0;
        for (const m of node.value.matchAll(pattern)) {
          const res = glossary.resolve(m[0]);
          if (!res.entry || used.has(res.entry.id)) continue;
          used.add(res.entry.id);
          if (m.index! > last) out.push({ type: 'text', value: node.value.slice(last, m.index) });
          out.push(tipNode(res.entry, m[0], base));
          last = m.index! + m[0].length;
        }
        if (!out.length) return;
        if (last < node.value.length) out.push({ type: 'text', value: node.value.slice(last) });
        parent.children!.splice(index, 1, ...out);
        return index + out.length;
      });
    }

    file.data.astro ??= {};
    file.data.astro.frontmatter ??= {};
    file.data.astro.frontmatter.glossaryIds = [...used];
  };
}
