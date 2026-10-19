import type {
  CampObject,
  GatherBand,
  ItemCount,
  ItemRef,
  LegacyFile,
  LegacyPerk,
  LegacyReserved,
  Profession,
  ProfessionsGuide,
  RouteStep,
  Shopping,
} from '../../src/lib/profession-types';

// Professions and the Legacy tree.
//
//   - wclbox /professions.json + /zhuanye/<slug>.json: profession list, camp
//     objects and their reagents, leveling routes with shopping lists,
//     gathering nodes. Its English item and zone names come from the client;
//     its prose is machine-translated, so none of it is used.
//   - wowforevertools talents/legacy chunk: the Legacy tree with the client's
//     English tooltip text, ranks, gates and prerequisites.
//   - wclbox /legacy.json: rewards, challenge counts, cast times.
// The pure builders below are tested; scripts/sync/professions-run.ts fetches.

// ---------- wclbox shapes (only the fields we read) ----------

interface WclReagent {
  id: number;
  name: string;
  count: number;
}
interface WclCampObject {
  id: number;
  name: string;
  icon?: string;
  skill: number;
  replaces?: string | null;
  reagents?: WclReagent[];
  blueprint?: { name: string } | null;
}
export interface WclProfession {
  slug: string;
  name: string;
  icon: string;
  kind: string; // primary | secondary | system
  section: string; // crafting | gathering | cooking | fishing | first-aid | camping
  perks?: string[];
  milestones?: { skill: number; legacy_points: number }[];
  camp_objects?: WclCampObject[];
  certification?: unknown;
  recipe_count?: number;
}

interface WclRecipe {
  name: string;
  mk?: [number, number];
  r?: [number, number][];
  how?: string;
}
type WclZone = [string, number] | string;
export interface WclProfessionBook {
  cap?: number;
  route?: {
    steps: number[][]; // [from, to, recipe spell id, crafts, (one-off flag)]
    recipes: Record<string, WclRecipe>;
    shop?: Partial<Record<keyof Shopping, [number, number][]>>;
    after?: Partial<Record<keyof Shopping, [number, number][]>>;
  };
  nodes?: { name: string; skill: number; items: number[]; zones: WclZone[] }[];
  bands?: { lv: [number, number]; items: number[]; zones: WclZone[] }[];
  waters?: { sure: number; bite?: number; zones: WclZone[] }[];
  items?: Record<string, [string, number, string]>; // id → [name, quality, icon]
}

interface WclLegacyPerk {
  id: string; // "legacy-perk-well-rested"
  cast_ms?: number;
  cooldown_ms?: number;
}
export interface WclLegacy {
  perks: WclLegacyPerk[];
  challenges: { name: string; items: { points?: number }[] }[];
  tree: {
    rules?: { launch_spending_cap?: number; launch_earnable_total?: number };
    progress_track?: { rewards: { at: number; name: string; icon: string; item?: number }[] };
  };
}

// ---------- wowforevertools shapes ----------

export interface WftLegacyTalent {
  id: number;
  name: string;
  icon: string;
  row: number; // lane, 0-based
  col: number; // tier, 0-based
  maxRank: number;
  requires?: { id: number; ranks: number }[];
  requiresPoints?: number;
  ranks: string[];
  reserved?: boolean;
}
export interface WftLegacyFile {
  rules?: { maxPoints?: number; pointsPerTier?: number };
  trees: { name: string; slug: string; icon: string; talents: WftLegacyTalent[] }[];
}

// ---------- helpers ----------

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const perkId = (name: string) => `legacy/${slugify(name)}`;
const wclPerkId = (id: string) => `legacy/${id.replace(/^legacy-perk-/, '')}`;

const zoneName = (z: WclZone) => (Array.isArray(z) ? z[0] : z);
const topZones = (zones: WclZone[], n = 4) => zones.slice(0, n).map(zoneName);
const counts = (list?: [number, number][]): ItemCount[] => (list ?? []).map(([id, n]) => [id, n]);
const shopping = (s?: Partial<Record<keyof Shopping, [number, number][]>>): Shopping => ({
  buy: counts(s?.buy),
  gather: counts(s?.gather),
  make: counts(s?.make),
});

export function formatDuration(ms: number): string | undefined {
  if (!ms) return undefined;
  const sec = ms / 1000;
  if (sec < 60) return `${sec} sec`;
  if (sec < 3600) return `${Math.round(sec / 60)} min`;
  return `${Math.round(sec / 3600)} hr`;
}

// ---------- professions ----------

export interface BuiltProfession {
  profession: Profession;
  itemIds: Set<number>; // every item the profession references
}

export function buildProfession(p: WclProfession, book: WclProfessionBook | undefined, sourceUrl: string): BuiltProfession {
  const itemIds = new Set<number>();
  // `replaces` is free, sometimes machine-translated text ("sharpening wheel",
  // "Camp seats"); upgrades replace the tier 1 object, so fall back to it.
  const objectName = (name: string) =>
    (p.camp_objects ?? []).find((o) => o.name.toLowerCase() === name.toLowerCase())?.name ??
    p.camp_objects?.[0]?.name ??
    name;
  const campObjects: CampObject[] = (p.camp_objects ?? []).map((o) => {
    const reagents: ItemCount[] = (o.reagents ?? []).map((r) => [r.id, r.count]);
    reagents.forEach(([id]) => itemIds.add(id));
    return {
      id: o.id,
      name: o.name,
      icon: o.icon,
      skill: o.skill,
      ...(o.replaces ? { replaces: objectName(o.replaces) } : {}),
      reagents,
      ...(o.blueprint ? { blueprint: o.blueprint.name } : {}),
    };
  });

  let route: RouteStep[] | undefined;
  let shop: Profession['shopping'];
  if (book?.route?.steps.length) {
    const recipes = book.route.recipes;
    route = book.route.steps.map(([from, to, spell, crafts]) => {
      const rec = recipes[String(spell)];
      const reagents = counts(rec?.r);
      reagents.forEach(([id]) => itemIds.add(id));
      if (rec?.mk) itemIds.add(rec.mk[0]);
      return {
        from,
        to,
        recipe: rec?.name ?? `#${spell}`,
        ...(rec?.mk ? { item: rec.mk[0] } : {}),
        crafts,
        reagents,
        source: rec?.how ?? 'trainer',
      };
    });
    shop = { toCap: shopping(book.route.shop), afterCap: shopping(book.route.after) };
    for (const s of [shop.toCap, shop.afterCap]) for (const [id] of [...s.buy, ...s.gather, ...s.make]) itemIds.add(id);
  }

  let gathering: GatherBand[] | undefined;
  if (book?.nodes?.length) {
    gathering = book.nodes.map((n) => ({ name: n.name, skill: n.skill, items: n.items, zones: topZones(n.zones) }));
  } else if (book?.bands?.length) {
    gathering = book.bands.map((b) => ({ levels: b.lv, items: b.items, zones: topZones(b.zones) }));
  } else if (book?.waters?.length) {
    gathering = book.waters.map((w) => ({ skill: w.sure, items: [], zones: topZones(w.zones, 6) }));
  }
  gathering?.forEach((g) => g.items.forEach((id) => itemIds.add(id)));

  const section = p.kind === 'primary' ? (p.section === 'gathering' ? 'gathering' : 'crafting') : 'secondary';
  return {
    profession: {
      slug: p.slug,
      name: p.name,
      icon: p.icon,
      kind: p.kind === 'primary' ? 'primary' : 'secondary',
      section,
      newRecipes: p.recipe_count ?? 0,
      milestones: (p.milestones ?? []).map((m) => ({ skill: m.skill, points: m.legacy_points })),
      certification: !!p.certification,
      campObjects,
      ...(route ? { route, routeCap: book?.cap, shopping: shop } : {}),
      ...(gathering ? { gathering } : {}),
      perks: (p.perks ?? []).map(wclPerkId),
      sourceUrl,
    },
    itemIds,
  };
}

// wclbox item tooltip lines → display lines: "\tHerbs" → "Herbs",
// "1 - 2 Damage\tSpeed 2.00" → "1 - 2 Damage · Speed 2.00", and level-scaled
// client templates ("$?60<24[10]?60<34[15] [24][29]") → the level 60 value.
export function itemLines(raw: string[] | undefined): string[] {
  return (raw ?? [])
    .map((line) =>
      line
        .replace(/\$\?[0-9<>[\]? ]+/g, (m) => {
          const values = [...m.matchAll(/\[(\d+)\]/g)];
          return values.length ? `${values.at(-1)![1]} ` : '';
        })
        .replace(/\.\(/g, '. (')
        .split('\t')
        .map((part) => part.trim())
        .filter(Boolean)
        .join(' · ')
        .replace(/\s{2,}/g, ' '),
    )
    .filter(Boolean);
}

export interface WclItem {
  n: string;
  k?: string;
  q?: number;
  x?: string[];
}

export const itemFromShard = (it: WclItem): ItemRef => ({
  name: it.n,
  ...(it.k ? { icon: it.k } : {}),
  ...(it.q != null ? { quality: it.q } : {}),
  lines: itemLines(it.x),
});

// Item names and icons: from the profession books first, then wclbox item shards.
export function itemsFromBooks(books: (WclProfessionBook | undefined)[]): Map<number, ItemRef> {
  const out = new Map<number, ItemRef>();
  for (const b of books) {
    for (const [id, [name, quality, icon]] of Object.entries(b?.items ?? {})) {
      if (!out.has(Number(id))) out.set(Number(id), { name, ...(icon ? { icon } : {}), quality });
    }
  }
  return out;
}

// Every profession, camp object and buff the guide names must exist in the
// synced data; a renamed object fails here instead of on the page.
export function guideProblems(guide: ProfessionsGuide, professions: Profession[]): string[] {
  const problems: string[] = [];
  const bySlug = new Map(professions.map((p) => [p.slug, p]));
  for (const b of guide.buffs) {
    const p = bySlug.get(b.profession);
    if (!p) problems.push(`buff ${b.key}: unknown profession ${b.profession}`);
    else if (!p.campObjects.some((o) => o.name === b.object)) problems.push(`buff ${b.key}: ${b.profession} has no camp object "${b.object}"`);
  }
  for (const [cls, pick] of Object.entries(guide.classes)) {
    for (const goal of ['leveling', 'gold', 'raids', 'pvp'] as const) {
      for (const slug of pick[goal]) if (!bySlug.has(slug)) problems.push(`class ${cls} ${goal}: unknown profession ${slug}`);
    }
  }
  for (const [slug, g] of Object.entries(guide.professions)) {
    const p = bySlug.get(slug);
    if (!p) {
      problems.push(`guide: unknown profession ${slug}`);
      continue;
    }
    for (const obj of Object.keys(g.blueprints ?? {})) {
      if (!p.campObjects.some((o) => o.name === obj)) problems.push(`${slug} blueprint: no camp object "${obj}"`);
    }
  }
  for (const p of professions) if (!guide.professions[p.slug]) problems.push(`guide: no text for ${p.slug}`);
  return problems;
}

// ---------- Legacy ----------

const CHALLENGE_KEYS: Record<string, string> = {
  Classes: 'classes',
  'Trade Skills': 'professions',
  Dungeons: 'dungeons',
  Raids: 'raids',
  'Player vs. Player': 'pvp',
  Adventure: 'adventure',
};

// The client lays each tree out sideways (columns are the 0/5/10-point gates).
// The site draws it like a talent tree: tier = gate row, lane = column.
export function buildLegacy(wft: WftLegacyFile, wcl: WclLegacy | undefined, build: string | null): Omit<LegacyFile, 'generatedAt' | 'source'> {
  const pointsPerTier = wft.rules?.pointsPerTier ?? 5;
  const timing = new Map((wcl?.perks ?? []).map((p) => [wclPerkId(p.id), p]));
  const idOf = new Map<number, string>();
  for (const t of wft.trees) for (const x of t.talents) idOf.set(x.id, x.reserved ? `legacy/reserved-${x.id}` : perkId(x.name));

  const perks: LegacyPerk[] = [];
  const reserved: LegacyReserved[] = [];
  wft.trees.forEach((tree, ti) => {
    for (const x of tree.talents) {
      const pos = { tree: ti, tier: x.col + 1, lane: x.row + 1 };
      if (x.reserved) {
        reserved.push({ id: idOf.get(x.id)!, ...pos, reserved: true });
        continue;
      }
      const id = idOf.get(x.id)!;
      const req = x.requires?.[0];
      const t = timing.get(id);
      const cast = formatDuration(t?.cast_ms ?? 0);
      const cooldown = formatDuration(t?.cooldown_ms ?? 0);
      const ranks = x.ranks.map((r) => r.replace(/\s+/g, ' ').trim());
      perks.push({
        id,
        name: x.name,
        icon: x.icon,
        ...pos,
        maxRank: x.maxRank,
        tierPoints: x.requiresPoints ?? x.col * pointsPerTier,
        ...(req && idOf.has(req.id) ? { requires: idOf.get(req.id) } : {}),
        ranks,
        desc: ranks.at(-1) ?? '',
        ...(cast ? { cast } : {}),
        ...(cooldown ? { cooldown } : {}),
      });
    }
  });

  const challenges = (wcl?.challenges ?? []).map((c) => ({
    key: CHALLENGE_KEYS[c.name] ?? slugify(c.name),
    name: c.name,
    count: c.items.length,
    points: c.items.reduce((s, i) => s + (i.points ?? 1), 0),
  }));
  return {
    build,
    maxPoints: wft.rules?.maxPoints ?? wcl?.tree.rules?.launch_spending_cap ?? 16,
    pointsPerTier,
    unlockLevel: 25,
    totalChallenges: wcl?.tree.rules?.launch_earnable_total ?? challenges.reduce((s, c) => s + c.points, 0),
    challenges,
    trees: wft.trees.map((t) => ({ name: t.name, slug: t.slug, icon: t.icon })),
    perks,
    reserved,
    rewards: (wcl?.tree.progress_track?.rewards ?? []).map((r) => ({
      points: r.at,
      name: r.name,
      icon: r.icon,
      ...(r.item ? { item: r.item } : {}),
    })),
  };
}
