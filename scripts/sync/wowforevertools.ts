import { parse, type Expression, type Node, type Program } from 'acorn';
import type { ClassId, GlossaryEntry } from '../../src/lib/glossary-types';

// wowforevertools.com ships its per-class data as Vite JS chunks
// (`var e=[{name:`Aimed Shot`,ranks:[…]}]…export{t as default}`). Its English
// tooltip text comes from the Forever client, unlike wclbox's English, which is
// machine-translated from the Chinese client. The chunks are parsed with acorn
// and only literal values are read; nothing from the site is ever executed.

export type WftKind = 'abilities' | 'talents';

// The app entry point maps data modules to lazily imported chunks:
//   "../../data/abilities/hunter.json":()=>b(()=>import(`./hunter-BF9jodOT.js`),[])
export function wftChunkMap(appJs: string): Map<string, string> {
  const map = new Map<string, string>();
  const re = /["'`]\.\.\/\.\.\/data\/(abilities|talents)\/([a-z]+)\.json["'`]\s*:[^,]{0,80}?import\(\s*["'`]\.\/([\w-]+\.js)["'`]/g;
  for (const m of appJs.matchAll(re)) map.set(`${m[1]}/${m[2]}`, m[3]);
  return map;
}

export function wftAppScript(indexHtml: string): string | undefined {
  return indexHtml.match(/\/assets\/(app-[\w-]+\.js)/)?.[1];
}

class NotLiteral extends Error {}

function literal(node: Node, env: Map<string, unknown>): unknown {
  const n = node as Expression;
  switch (n.type) {
    case 'Literal':
      if ('regex' in n && n.regex) throw new NotLiteral();
      return n.value;
    case 'TemplateLiteral':
      if (n.expressions.length) throw new NotLiteral();
      return n.quasis[0].value.cooked;
    case 'ArrayExpression':
      return n.elements.map((el) => {
        if (!el) return undefined;
        if (el.type === 'SpreadElement') throw new NotLiteral();
        return literal(el, env);
      });
    case 'ObjectExpression': {
      const obj: Record<string, unknown> = {};
      for (const p of n.properties) {
        if (p.type !== 'Property' || p.kind !== 'init' || p.method) throw new NotLiteral();
        let key: unknown;
        if (p.computed) key = literal(p.key, env);
        else if (p.key.type === 'Identifier') key = p.key.name;
        else key = literal(p.key, env);
        obj[String(key)] = literal(p.value, env);
      }
      return obj;
    }
    case 'UnaryExpression': {
      const v = literal(n.argument, env);
      if (n.operator === '!') return !v;
      if (n.operator === '-') return -(v as number);
      if (n.operator === '+') return +(v as number);
      if (n.operator === 'void') return undefined;
      throw new NotLiteral();
    }
    case 'Identifier':
      if (env.has(n.name)) return env.get(n.name);
      if (n.name === 'undefined') return undefined;
      throw new NotLiteral();
    default:
      throw new NotLiteral();
  }
}

// Returns the chunk's default export, built from top-level `var` declarations
// whose initializers are plain literals (or references to earlier ones).
export function readChunkData<T = unknown>(js: string): T | undefined {
  const program = parse(js, { ecmaVersion: 'latest', sourceType: 'module' }) as Program;
  const env = new Map<string, unknown>();
  let defaultLocal: string | undefined;
  for (const stmt of program.body) {
    if (stmt.type === 'VariableDeclaration') {
      for (const d of stmt.declarations) {
        if (d.id.type !== 'Identifier' || !d.init) continue;
        try {
          env.set(d.id.name, literal(d.init, env));
        } catch (err) {
          if (!(err instanceof NotLiteral)) throw err;
        }
      }
    } else if (stmt.type === 'ExportNamedDeclaration') {
      for (const s of stmt.specifiers) {
        const exported = s.exported.type === 'Identifier' ? s.exported.name : String(s.exported.value);
        if (exported === 'default' && s.local.type === 'Identifier') defaultLocal = s.local.name;
      }
    }
  }
  return defaultLocal && env.has(defaultLocal) ? (env.get(defaultLocal) as T) : undefined;
}

// ---------- data shapes (only the fields we read) ----------

interface WftAbility {
  name: string;
  status?: string;
  ranks?: { rank?: number; text?: string }[];
}
export interface WftAbilitiesFile {
  abilities?: WftAbility[];
}
interface WftTalent {
  name: string;
  status?: string;
  ranks?: (string | { text?: string })[];
}
export interface WftTalentsFile {
  trees?: { name: string; talents?: WftTalent[] }[];
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

function lastText(ranks: (string | { text?: string })[] | undefined): string | undefined {
  for (const r of [...(ranks ?? [])].reverse()) {
    const text = clean(typeof r === 'string' ? r : (r?.text ?? ''));
    if (text) return text;
  }
  return undefined;
}

// Highest-rank Forever text per name. When a name appears twice (e.g. a
// removed Classic entry next to its Forever replacement), the non-removed one wins.
function byName(items: { name: string; status?: string; text?: string }[]): Map<string, string> {
  const out = new Map<string, { text: string; removed: boolean }>();
  for (const it of items) {
    if (!it.text) continue;
    const key = norm(it.name);
    const removed = it.status === 'removed';
    const prev = out.get(key);
    if (!prev || (prev.removed && !removed)) out.set(key, { text: it.text, removed });
  }
  return new Map([...out].map(([k, v]) => [k, v.text]));
}

export interface WftClassTexts {
  spells: Map<string, string>;
  talents: Map<string, string>;
}

export function wftClassTexts(abilities?: WftAbilitiesFile, talents?: WftTalentsFile): WftClassTexts {
  return {
    spells: byName((abilities?.abilities ?? []).map((a) => ({ ...a, text: lastText(a.ranks) }))),
    talents: byName(
      (talents?.trees ?? []).flatMap((t) => t.talents ?? []).map((t) => ({ ...t, text: lastText(t.ranks) })),
    ),
  };
}

// Overwrites `desc` of spells and talents found by class + name; everything
// else keeps its wclbox text. Talent-granted spells (Bestial Wrath, …) are
// only listed as talents there, so each kind falls back to the other.
// Returns how many entries were replaced.
export function applyWftTexts(entries: GlossaryEntry[], texts: Partial<Record<ClassId, WftClassTexts>>): number {
  let replaced = 0;
  for (const e of entries) {
    if (!e.class || (e.kind !== 'spell' && e.kind !== 'talent')) continue;
    const cls = texts[e.class];
    if (!cls) continue;
    const [first, second] = e.kind === 'spell' ? [cls.spells, cls.talents] : [cls.talents, cls.spells];
    const key = norm(e.name);
    const t = first.get(key) ?? second.get(key);
    if (t) {
      e.desc = t;
      replaced++;
    }
  }
  return replaced;
}
