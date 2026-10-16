import { describe, expect, it } from 'vitest';
import {
  normalizeCast,
  normalizeCooldown,
  normalizeCost,
  normalizeRange,
  normalizeSchool,
  parseSpellDetail,
  parseSpellList,
  parseTalentPage,
} from '../scripts/sync/parse';

// Minimal hand-written markup mirroring wclbox's structure (class names and
// nesting); keeps the parsers honest without storing copies of their pages.

const spellList = `
<button class="fsk-row k-changed"><img src="/tubiao/spell_nature_starfall.jpg"/>
  <span class="fsk-row-text"><strong>Arcane Missiles</strong><span>Rank 8: 209 (Classic Era: 230)</span></span>
  <span class="fsk-row-meta"><span class="tfk-tag k-modified">Changed</span><small>Arcane · 8 ranks · Learned from level 8</small></span></button>
<button class="fsk-row k-talent"><img src="/tubiao/spell_arcane_blast.jpg"/>
  <span class="fsk-row-text"><strong>Arcane Blast</strong><span>Classic Era does not have this spell</span></span>
  <span class="fsk-row-meta"><span class="tfk-tag k-talent">Talents</span><small>Arcane · 5 ranks · Learned from level 20</small></span></button>
<ul><li><a href="/en/fashu/mage/mage-arcane-missiles">Arcane Missiles</a></li>
<li><a href="/en/fashu/mage/calc-mage-arcane-arcane-blast">Arcane Blast</a></li>
<li><a href="/en/fashu/mage/mage-arcane-missiles#x">Arcane Missiles All Ranks →</a></li></ul>`;

const spellDetail = `
<p class="tfb-kicker"><img src="/tubiao/spell_frost_iceshock.jpg"/>Mage · Arcane</p><h1>Counterspell</h1>
<p class="tfb-lede">Unchanged from Classic Era · Learned from level 24 · 1 rank records</p>
<section class="spell-rank" id="rank-1"><div class="fsk-compare">
  <div class="fsk-card"><h3>Forever · Learned at level 24</h3><dl class="spell-facts">
    <div><dt>Cost</dt><dd>100 points of mana</dd></div><div><dt>Range</dt><dd>30 yards</dd></div>
    <div><dt>Cast time</dt><dd>Instant</dd></div><div><dt>Cooldown</dt><dd>Cooldown 30 seconds</dd></div></dl>
    <p>Counters the enemy's spellcast.</p></div>
  <div class="fsk-card"><h3>Classic Era · Learned at level 24</h3><p>Old text.</p></div></div></section>`;

const talentPage = `
<section><header class="tf-tree-header"><h2>Arcane</h2></header><div class="tf-grid">
  <button data-talent-id="calc-mage-arcane-wand-specialization" class="tf-node" style="grid-row:1;grid-column:1" aria-label="Wand Specialization, 0/2 points"></button>
</div></section>
<article class="talent-reference-entry" id="talent-info-calc-mage-arcane-wand-specialization">
  <div class="talent-reference-name"><img src="/tubiao/inv_wand_01.jpg"/><h4>Wand Specialization</h4><span class="tfk-tag k-moved">Moved</span></div>
  <p class="talent-reference-condition">Maximum 2 levels · Tier 1 · No tier point requirement</p>
  <p class="talent-reference-effect"><b>Level 2 : </b>Increases the damage dealt by your wand by 25%.</p>
  <p class="talent-reference-change">Change summary: Move from Tier 2 to Tier 1.</p>
  <details><dl><dt> Forever · Rank 1</dt><dd>Increases wand damage by 13%.</dd>
  <dt> Forever · Rank 2</dt><dd>Increases wand damage by 25%.</dd>
  <dt> Classic Era · Rank 2</dt><dd>Old text.</dd></dl></details>
</article>
<article class="talent-reference-entry" id="talent-info-calc-mage-arcane-arcane-power">
  <div class="talent-reference-name"><h4>Arcane Power</h4></div>
  <p class="talent-reference-condition">Maximum 1 levels · Tier 7 · Requires Arcane points in lower tiers 30 points</p>
  <p class="talent-reference-effect">x</p>
</article>`;

describe('normalizers', () => {
  it('normalizes costs', () => {
    expect(normalizeCost('105 points of mana')).toEqual({ cost: '105 Mana', costType: 'mana' });
    expect(normalizeCost('15 rage')).toEqual({ cost: '15 Rage', costType: 'rage' });
  });
  it('maps machine-translated spellbook tabs to official tree names', () => {
    expect(normalizeSchool('Shoot')).toBe('Marksmanship');
    expect(normalizeSchool('Shadow Magic')).toBe('Shadow');
    expect(normalizeSchool('Arcane')).toBe('Arcane');
  });
  it('normalizes cast, range and cooldown', () => {
    expect(normalizeCast('Cast time 3 seconds')).toBe('3 sec');
    expect(normalizeCast('Instant cast')).toBe('Instant');
    expect(normalizeRange('30 yards')).toBe('30 yd');
    expect(normalizeCooldown('2-minute cooldown')).toBe('2 min');
  });
});

describe('parseSpellList', () => {
  it('reads rows, statuses and detail slugs', () => {
    const rows = parseSpellList(spellList, 'mage');
    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({
      name: 'Arcane Missiles',
      slug: 'mage-arcane-missiles',
      icon: 'spell_nature_starfall',
      school: 'Arcane',
      ranks: 8,
      learnedAt: 8,
      status: 'changed',
    });
    expect(rows[1]).toMatchObject({ name: 'Arcane Blast', status: 'new', slug: 'calc-mage-arcane-arcane-blast' });
  });
});

describe('parseSpellDetail', () => {
  it('uses the Forever card of the highest rank', () => {
    expect(parseSpellDetail(spellDetail)).toMatchObject({
      name: 'Counterspell',
      icon: 'spell_frost_iceshock',
      school: 'Arcane',
      status: 'unchanged',
      cost: '100 Mana',
      cast: 'Instant',
      range: '30 yd',
      cooldown: '30 sec',
      desc: "Counters the enemy's spellcast.",
    });
  });
});

describe('parseTalentPage', () => {
  it('joins tree position with the reference entry', () => {
    const { trees, talents } = parseTalentPage(talentPage);
    expect(trees).toEqual(['Arcane']);
    expect(talents[0]).toMatchObject({
      id: 'calc-mage-arcane-wand-specialization',
      name: 'Wand Specialization',
      tree: 'Arcane',
      tier: 1,
      row: 1,
      col: 1,
      maxRank: 2,
      status: 'changed',
      desc: 'Increases the damage dealt by your wand by 25%.',
      change: 'Move from Tier 2 to Tier 1.',
      ranks: ['Increases wand damage by 13%.', 'Increases wand damage by 25%.'],
      tierPoints: 0,
    });
    expect(talents[1]).toMatchObject({ name: 'Arcane Power', tierPoints: 30, ranks: [] });
  });
});
