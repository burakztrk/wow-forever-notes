import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  buildLegacy,
  buildProfession,
  formatDuration,
  guideProblems,
  itemLines,
  perkId,
  type WclProfession,
  type WftLegacyFile,
} from '../scripts/sync/professions';
import guide from '../src/data/professions-guide.json';
import legacyData from '../src/data/legacy.json';
import professionsData from '../src/data/professions.json';
import { CLASSES } from '../src/lib/glossary-types';
import type { LegacyFile, ProfessionsFile, ProfessionsGuide } from '../src/lib/profession-types';
import { addBlock, decodeBuild, encodeBuild, isValid, type TalentNode } from '../src/lib/talent-rules';

const professionsFile = professionsData as ProfessionsFile;
const legacy = legacyData as LegacyFile;

describe('professions guide (hand-edited) matches the synced data', () => {
  it('names only professions and camp objects that exist', () => {
    expect(guideProblems(guide as ProfessionsGuide, professionsFile.professions)).toEqual([]);
  });

  it('has a pick for every class and Turkish text everywhere', () => {
    const g = guide as ProfessionsGuide;
    expect(Object.keys(g.classes).sort()).toEqual([...CLASSES].sort());
    const texts = [
      g.camping.intro,
      ...g.camping.steps,
      ...g.camping.rules,
      ...g.buffs.flatMap((b) => [b.buff, b.bonus]),
      ...Object.values(g.classes).map((c) => c.why),
      ...Object.values(g.professions).map((p) => p.summary),
    ];
    for (const t of texts) {
      expect(t.en.trim()).not.toBe('');
      expect(t.tr.trim()).not.toBe('');
    }
    for (const c of Object.values(g.classes)) expect(g.goalNotes.raids[c.raids.join('+')]).toBeDefined();
  });

  it('every tool in the guide resolved to an item name', () => {
    for (const p of Object.values((guide as ProfessionsGuide).professions))
      for (const id of p.tools) expect(professionsFile.items[id]?.name).toBeTruthy();
  });

  it('every icon the pages use is in public/icons', () => {
    const icons = new Set<string>([
      ...professionsFile.professions.flatMap((p) => [p.icon, ...p.campObjects.map((o) => o.icon ?? '')]),
      ...legacy.perks.map((p) => p.icon),
      ...legacy.trees.map((t) => t.icon),
      ...legacy.rewards.map((r) => r.icon),
    ]);
    icons.delete('');
    const missing = [...icons].filter((i) => !existsSync(path.join('public/icons', `${i}.jpg`)));
    expect(missing).toEqual([]);
  });
});

describe('buildProfession', () => {
  const wcl: WclProfession = {
    slug: 'alchemy',
    name: 'Alchemy',
    icon: 'trade_alchemy',
    kind: 'primary',
    section: 'crafting',
    perks: ['legacy-perk-working-overtime'],
    milestones: [{ skill: 150, legacy_points: 1 }],
    camp_objects: [
      { id: 1, name: 'Mana Well', icon: 'x', skill: 20, replaces: null, reagents: [{ id: 2447, name: 'Peacebloom', count: 1 }], blueprint: null },
      { id: 2, name: 'Fermenter', skill: 140, replaces: 'Mana Well', reagents: [], blueprint: { name: 'Blueprint: Fermenter' } },
    ],
    certification: { title: 'x' },
    recipe_count: 58,
  };

  it('maps the leveling route, shopping lists and camp objects', () => {
    const { profession: p, itemIds } = buildProfession(
      wcl,
      {
        cap: 225,
        route: {
          steps: [[1, 15, 100, 21]],
          recipes: { 100: { name: 'Minor Arcane Elixir', mk: [500, 1], r: [[2447, 1]], how: 'trainer' } },
          shop: { buy: [[3371, 152]], gather: [[2447, 116]] },
          after: { make: [[13423, 58]] },
        },
      },
      'https://example.test/alchemy',
    );
    expect(p.section).toBe('crafting');
    expect(p.route).toEqual([{ from: 1, to: 15, recipe: 'Minor Arcane Elixir', item: 500, crafts: 21, reagents: [[2447, 1]], source: 'trainer' }]);
    expect(p.shopping).toEqual({
      toCap: { buy: [[3371, 152]], gather: [[2447, 116]], make: [] },
      afterCap: { buy: [], gather: [], make: [[13423, 58]] },
    });
    expect(p.campObjects[1]).toMatchObject({ replaces: 'Mana Well', blueprint: 'Blueprint: Fermenter' });
    expect(p.perks).toEqual(['legacy/working-overtime']);
    expect(p.certification).toBe(true);
    expect([...itemIds].sort((a, b) => a - b)).toEqual([500, 2447, 3371, 13423]);
  });

  it('turns gathering nodes, creature bands and fishing waters into bands', () => {
    const base = { ...wcl, kind: 'primary', section: 'gathering', camp_objects: [] };
    const mining = buildProfession(base, { nodes: [{ name: 'Copper Vein', skill: 1, items: [2770], zones: [['Durotar', 172], ['Westfall', 171]] }] }, '');
    expect(mining.profession.gathering).toEqual([{ name: 'Copper Vein', skill: 1, items: [2770], zones: ['Durotar', 'Westfall'] }]);
    const skinning = buildProfession(base, { bands: [{ lv: [1, 10], items: [2934], zones: [['Mulgore', 1]] }] }, '');
    expect(skinning.profession.gathering).toEqual([{ levels: [1, 10], items: [2934], zones: ['Mulgore'] }]);
    const fishing = buildProfession({ ...base, kind: 'secondary' }, { waters: [{ sure: 25, zones: ['Elwynn Forest'] }] }, '');
    expect(fishing.profession).toMatchObject({ kind: 'secondary', section: 'secondary', gathering: [{ skill: 25, items: [], zones: ['Elwynn Forest'] }] });
  });
});

describe('buildLegacy', () => {
  const wft: WftLegacyFile = {
    rules: { maxPoints: 16, pointsPerTier: 5 },
    trees: [
      {
        name: 'Professions',
        slug: 'professions',
        icon: 'inv_misc_gear_02',
        talents: [
          { id: 1, name: 'Bartering', icon: 'a', row: 1, col: 1, maxRank: 2, requiresPoints: 5, ranks: ['5%', '10%'] },
          { id: 2, name: 'Dedicated Study', icon: 'b', row: 1, col: 2, maxRank: 1, requires: [{ id: 1, ranks: 2 }], requiresPoints: 10, ranks: ['x'] },
          { id: 3, name: 'Reserved', icon: 'q', row: 2, col: 3, maxRank: 1, ranks: ['?'], reserved: true },
        ],
      },
    ],
  };
  const out = buildLegacy(
    wft,
    {
      perks: [{ id: 'legacy-perk-dedicated-study', cast_ms: 25000, cooldown_ms: 82800000 }],
      challenges: [{ name: 'Trade Skills', items: [{}, {}, { points: 3 }] }],
      tree: { rules: { launch_earnable_total: 81 }, progress_track: { rewards: [{ at: 15, name: 'Toy', icon: 't' }] } },
    },
    '1.60',
  );

  it('draws the sideways client tree as tiers (rows) and lanes (columns)', () => {
    expect(out.perks[0]).toMatchObject({ id: 'legacy/bartering', tree: 0, tier: 2, lane: 2, tierPoints: 5, desc: '10%' });
    expect(out.perks[1]).toMatchObject({ requires: 'legacy/bartering', tier: 3, tierPoints: 10, cast: '25 sec', cooldown: '23 hr' });
    expect(out.reserved).toEqual([{ id: 'legacy/reserved-3', tree: 0, tier: 4, lane: 3, reserved: true }]);
  });

  it('keeps rules, challenges and rewards', () => {
    expect(out).toMatchObject({ maxPoints: 16, totalChallenges: 81, rewards: [{ points: 15, name: 'Toy', icon: 't' }] });
    expect(out.challenges).toEqual([{ key: 'professions', name: 'Trade Skills', count: 3, points: 5 }]);
  });

  it('formats durations and ids', () => {
    expect(formatDuration(0)).toBeUndefined();
    expect(formatDuration(1500)).toBe('1.5 sec');
    expect(formatDuration(120000)).toBe('2 min');
    expect(perkId('The Quick and the Dead')).toBe('legacy/the-quick-and-the-dead');
  });
});

describe('Legacy tree rules (talent rules with a 16-point cap)', () => {
  const nodes: TalentNode[] = legacy.perks.map((p) => ({
    id: p.id,
    tree: p.tree,
    row: p.tier,
    col: p.lane,
    maxRank: p.maxRank,
    tierPoints: p.tierPoints,
    requires: p.requires,
  }));
  const max = legacy.maxPoints;
  const byName = (name: string) => nodes.find((n) => n.id === perkId(name))!;

  it('has 3 trees, a 16-point cap and the client gates', () => {
    expect(legacy.trees.map((t) => t.name)).toEqual(['Professions', 'Adventure', 'Resourcefulness']);
    expect(max).toBe(16);
    expect(byName('Dedicated Study')).toMatchObject({ tierPoints: 10, requires: perkId('Bartering') });
  });

  it('gates tiers by points in the tree and prerequisites by full rank', () => {
    expect(addBlock(nodes, {}, byName('Bartering'), max)).toMatchObject({ kind: 'tier', need: 5 });
    const five = { [perkId('Working Overtime')]: 5 };
    expect(addBlock(nodes, five, byName('Bartering'), max)).toBeUndefined();
    const withBartering = { ...five, [perkId('Bartering')]: 1, [perkId('Bountiful Harvest')]: 4 };
    expect(addBlock(nodes, withBartering, byName('Dedicated Study'), max)).toMatchObject({ kind: 'requires' });
  });

  it('stops at 16 points and round-trips the share code', () => {
    const ranks = {
      [perkId('Working Overtime')]: 5,
      [perkId('Bountiful Harvest')]: 5,
      [perkId('Bartering')]: 2,
      [perkId('Dedicated Study')]: 1,
      [perkId('Well Rested')]: 3,
    };
    expect(isValid(nodes, ranks, max)).toBe(true);
    expect(addBlock(nodes, ranks, byName('Gourmand'), max)).toEqual({ kind: 'points' });
    const code = encodeBuild(nodes, ranks, legacy.trees.length);
    expect(decodeBuild(nodes, code, legacy.trees.length, max)).toEqual(ranks);
    // the same code with one more point is over the cap
    expect(decodeBuild(nodes, code.replace('-3', '-4'), legacy.trees.length, max)).toBeUndefined();
  });
});

describe('itemLines (wclbox tooltip lines)', () => {
  it('drops tab prefixes, joins columns and resolves level templates', () => {
    expect(itemLines(['\tHerbs', '1 - 2 Damage\tSpeed 2.00', 'Sell Price: 10c'])).toEqual([
      'Herbs',
      '1 - 2 Damage · Speed 2.00',
      'Sell Price: 10c',
    ]);
    expect(
      itemLines(['Use: Build a mana well that restores $?60<24[10]?60<34[15]?60<44[20]?60<54 [24][29] mana every 5 seconds.(1 hour cooldown)']),
    ).toEqual(['Use: Build a mana well that restores 29 mana every 5 seconds. (1 hour cooldown)']);
  });
});

describe('item tooltip data', () => {
  it('every item the profession pages show has a name and tooltip lines', () => {
    for (const [id, it] of Object.entries(professionsFile.items)) {
      expect(it.name, id).toBeTruthy();
      expect(Array.isArray(it.lines), id).toBe(true);
    }
  });
});

describe('spell names in guide text', () => {
  it('links whole names only', async () => {
    const { segments } = await import('../src/lib/professions');
    expect(segments('does not stack with Blessing of Kings.').find((s) => s.tip)?.tip).toBe('spell/paladin-blessing-of-kings');
    expect(segments('Rocket Boots, the Mind Control Cap and Sapper Charges').some((s) => s.tip)).toBe(false);
  });
});
