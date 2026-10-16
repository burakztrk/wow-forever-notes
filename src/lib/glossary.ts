import type { GlossaryEntry, GlossaryKind } from './glossary-types';

// Name → entry resolution shared by the remark plugin (build time) and the
// page payload. Pure: takes the entry list, so tests can pass fixtures.

export interface ResolveOptions {
  kind?: GlossaryKind;
  cls?: string; // class id, e.g. "mage"
  race?: string; // race id, e.g. "alliance-human"
}

export type Resolved = { entry: GlossaryEntry; error?: undefined } | { entry?: undefined; error: string };

const KIND_ORDER: Record<GlossaryKind, number> = { spell: 0, talent: 1, racial: 2 };

export interface Glossary {
  byId: Map<string, GlossaryEntry>;
  resolve(name: string, opts?: ResolveOptions): Resolved;
  // names safe to link automatically in plain text (multi-word, unambiguous)
  autoLinkNames(): string[];
}

function suggestions(name: string, names: string[]): string {
  const needle = name.toLowerCase();
  const words = needle.split(/\s+/).filter((w) => w.length > 2);
  const hits = names.filter((n) => {
    const l = n.toLowerCase();
    return l.includes(needle) || needle.includes(l) || words.some((w) => l.includes(w));
  });
  return hits.length ? ` — did you mean: ${hits.slice(0, 5).join(', ')}?` : '';
}

export function createGlossary(entries: GlossaryEntry[]): Glossary {
  const byId = new Map(entries.map((e) => [e.id, e]));
  const byName = new Map<string, GlossaryEntry[]>();
  for (const e of entries) {
    const key = e.name.toLowerCase();
    byName.set(key, [...(byName.get(key) ?? []), e]);
  }
  const allNames = [...new Set(entries.map((e) => e.name))];

  function resolve(name: string, opts: ResolveOptions = {}): Resolved {
    let candidates = byName.get(name.trim().toLowerCase()) ?? [];
    if (!candidates.length) return { error: `unknown name "${name}"${suggestions(name, allNames)}` };
    if (opts.kind) candidates = candidates.filter((e) => e.kind === opts.kind);
    if (opts.cls) candidates = candidates.filter((e) => e.class === opts.cls);
    if (opts.race) candidates = candidates.filter((e) => e.races?.includes(opts.race!));
    if (!candidates.length) {
      const filters = [opts.kind, opts.cls, opts.race].filter(Boolean).join(', ');
      const have = (byName.get(name.trim().toLowerCase()) ?? []).map((e) => `${e.kind}/${e.class ?? e.races?.[0]}`);
      return { error: `"${name}" has no match for {${filters}} (available: ${have.join(', ')})` };
    }
    candidates = [...candidates].sort(
      (a, b) =>
        Number(a.status === 'removed') - Number(b.status === 'removed') || KIND_ORDER[a.kind] - KIND_ORDER[b.kind],
    );
    const owners = new Set(candidates.map((e) => e.class ?? `racial`));
    if (owners.size > 1) {
      return {
        error: `"${name}" is ambiguous (${[...owners].join(', ')}); add {class=...}`,
      };
    }
    return { entry: candidates[0] };
  }

  function autoLinkNames(): string[] {
    return allNames.filter((n) => {
      if (!/\s/.test(n)) return false;
      const r = resolve(n);
      return !!r.entry && r.entry.status !== 'removed';
    });
  }

  return { byId, resolve, autoLinkNames };
}
