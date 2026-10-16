// Talent calculator rules (Classic style), shared by the page script and tests.
//
//   - a talent needs `tierPoints` points spent in *lower rows* of its own tree
//   - a talent with `requires` needs that talent at max rank
//   - total points are capped at MAX_POINTS (level 60: 51 points)
// A point can only be removed if every other spent point stays valid.

export const MAX_POINTS = 51;
export const FIRST_TALENT_LEVEL = 10; // level 10 = 1 point, level 60 = 51

export interface TalentNode {
  id: string;
  tree: number; // index into the class's trees
  row: number;
  col: number;
  maxRank: number;
  requires?: string; // id of prerequisite talent
  tierPoints: number;
}

export type Ranks = Record<string, number>;

export function treePoints(nodes: TalentNode[], ranks: Ranks, tree: number, belowRow = Infinity): number {
  return nodes
    .filter((n) => n.tree === tree && n.row < belowRow)
    .reduce((sum, n) => sum + (ranks[n.id] ?? 0), 0);
}

export const totalPoints = (ranks: Ranks) => Object.values(ranks).reduce((a, b) => a + b, 0);

export const requiredLevel = (points: number) => (points > 0 ? FIRST_TALENT_LEVEL - 1 + points : 0);

// Why a talent cannot take a point right now (undefined = it can).
export type Block = { kind: 'max' } | { kind: 'points' } | { kind: 'tier'; need: number; have: number } | { kind: 'requires'; id: string };

export function addBlock(nodes: TalentNode[], ranks: Ranks, node: TalentNode): Block | undefined {
  if ((ranks[node.id] ?? 0) >= node.maxRank) return { kind: 'max' };
  if (totalPoints(ranks) >= MAX_POINTS) return { kind: 'points' };
  const have = treePoints(nodes, ranks, node.tree, node.row);
  if (have < node.tierPoints) return { kind: 'tier', need: node.tierPoints, have };
  if (node.requires) {
    const req = nodes.find((n) => n.id === node.requires);
    if (req && (ranks[req.id] ?? 0) < req.maxRank) return { kind: 'requires', id: req.id };
  }
  return undefined;
}

// Every spent point still satisfies its tier and prerequisite rules.
export function isValid(nodes: TalentNode[], ranks: Ranks): boolean {
  if (totalPoints(ranks) > MAX_POINTS) return false;
  for (const n of nodes) {
    const r = ranks[n.id] ?? 0;
    if (!r) continue;
    if (r > n.maxRank) return false;
    if (treePoints(nodes, ranks, n.tree, n.row) < n.tierPoints) return false;
    if (n.requires) {
      const req = nodes.find((x) => x.id === n.requires);
      if (req && (ranks[req.id] ?? 0) < req.maxRank) return false;
    }
  }
  return true;
}

export function canRemove(nodes: TalentNode[], ranks: Ranks, node: TalentNode): boolean {
  const r = ranks[node.id] ?? 0;
  if (!r) return false;
  return isValid(nodes, { ...ranks, [node.id]: r - 1 });
}

// ---------- share code: one digit per talent, trees joined by "-" ----------
// Talents are ordered by tree, then row, then column; trailing zeros dropped.

export function orderNodes(nodes: TalentNode[]): TalentNode[] {
  return [...nodes].sort((a, b) => a.tree - b.tree || a.row - b.row || a.col - b.col);
}

export function encodeBuild(nodes: TalentNode[], ranks: Ranks, treeCount: number): string {
  const ordered = orderNodes(nodes);
  const parts: string[] = [];
  for (let t = 0; t < treeCount; t++) {
    parts.push(
      ordered
        .filter((n) => n.tree === t)
        .map((n) => String(ranks[n.id] ?? 0))
        .join('')
        .replace(/0+$/, ''),
    );
  }
  return parts.join('-').replace(/-+$/, '');
}

// Returns undefined for a code that does not fit this class or breaks the rules.
export function decodeBuild(nodes: TalentNode[], code: string, treeCount: number): Ranks | undefined {
  if (!/^[0-9-]*$/.test(code)) return undefined;
  const parts = code.split('-');
  if (parts.length > treeCount) return undefined;
  const ordered = orderNodes(nodes);
  const ranks: Ranks = {};
  for (let t = 0; t < treeCount; t++) {
    const digits = parts[t] ?? '';
    const treeNodes = ordered.filter((n) => n.tree === t);
    if (digits.length > treeNodes.length) return undefined;
    treeNodes.forEach((n, i) => {
      const r = Number(digits[i] ?? 0);
      if (r) ranks[n.id] = r;
    });
  }
  return isValid(nodes, ranks) ? ranks : undefined;
}
