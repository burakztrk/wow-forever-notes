import { describe, expect, it } from 'vitest';
import {
  addBlock,
  canRemove,
  decodeBuild,
  encodeBuild,
  isValid,
  MAX_POINTS,
  requiredLevel,
  type TalentNode,
} from '../src/lib/talent-rules';

const nodes: TalentNode[] = [
  { id: 'a', tree: 0, row: 1, col: 1, maxRank: 5, tierPoints: 0 },
  { id: 'b', tree: 0, row: 1, col: 2, maxRank: 2, tierPoints: 0 },
  { id: 'c', tree: 0, row: 2, col: 1, maxRank: 3, tierPoints: 5 },
  { id: 'd', tree: 0, row: 3, col: 1, maxRank: 1, tierPoints: 10, requires: 'c' },
  { id: 'x', tree: 1, row: 1, col: 1, maxRank: 5, tierPoints: 0 },
];

describe('adding points', () => {
  it('locks a row until enough points are in lower rows of the same tree', () => {
    expect(addBlock(nodes, { a: 4 }, nodes[2])).toEqual({ kind: 'tier', need: 5, have: 4 });
    expect(addBlock(nodes, { a: 4, x: 5 }, nodes[2])).toMatchObject({ kind: 'tier' });
    expect(addBlock(nodes, { a: 5 }, nodes[2])).toBeUndefined();
  });

  it('needs the prerequisite at max rank', () => {
    expect(addBlock(nodes, { a: 5, b: 2, c: 3 }, nodes[3])).toBeUndefined();
    expect(addBlock(nodes, { a: 5, b: 2, c: 2, x: 1 }, nodes[3])).toMatchObject({ kind: 'tier' });
    expect(addBlock(nodes, { a: 5, b: 2, c: 2 }, nodes[3])).toMatchObject({ kind: 'tier' });
    const ok = { a: 5, b: 2, c: 3 };
    expect(addBlock(nodes, { ...ok, c: 2, b: 2, a: 5 }, nodes[3])).toMatchObject({ kind: 'tier' });
  });

  it('stops at max rank and at the point cap', () => {
    expect(addBlock(nodes, { a: 5 }, nodes[0])).toEqual({ kind: 'max' });
    const many = Object.fromEntries(Array.from({ length: MAX_POINTS }, (_, i) => [`z${i}`, 1]));
    expect(addBlock(nodes, many, nodes[4])).toEqual({ kind: 'points' });
  });
});

describe('removing points', () => {
  it('refuses removals that would strand higher rows or dependents', () => {
    const r = { a: 5, c: 1 };
    expect(canRemove(nodes, r, nodes[0])).toBe(false);
    expect(canRemove(nodes, { a: 5, b: 1, c: 1 }, nodes[0])).toBe(true);
    expect(canRemove(nodes, { a: 5, b: 2, c: 3, d: 1 }, nodes[2])).toBe(false);
    expect(canRemove(nodes, r, nodes[2])).toBe(true);
  });
});

describe('share code', () => {
  it('round-trips and drops trailing zeros', () => {
    const r = { a: 5, c: 1, x: 2 };
    const code = encodeBuild(nodes, r, 2);
    expect(code).toBe('501-2');
    expect(decodeBuild(nodes, code, 2)).toEqual(r);
  });

  it('rejects codes that break the rules or do not fit', () => {
    expect(decodeBuild(nodes, '01', 2)).toEqual({ b: 1 });
    expect(decodeBuild(nodes, '001', 2)).toBeUndefined(); // c without tier points
    expect(decodeBuild(nodes, '9', 2)).toBeUndefined();
    expect(decodeBuild(nodes, '1-1-1', 2)).toBeUndefined();
    expect(decodeBuild(nodes, 'abc', 2)).toBeUndefined();
    expect(isValid(nodes, {})).toBe(true);
  });

  it('reports the level needed', () => {
    expect(requiredLevel(0)).toBe(0);
    expect(requiredLevel(1)).toBe(10);
    expect(requiredLevel(51)).toBe(60);
  });
});
