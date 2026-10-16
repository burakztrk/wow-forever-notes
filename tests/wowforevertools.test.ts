import { describe, expect, it } from 'vitest';
import type { GlossaryEntry } from '../src/lib/glossary-types';
import {
  applyWftTexts,
  readChunkData,
  wftAppScript,
  wftChunkMap,
  wftClassTexts,
  type WftAbilitiesFile,
  type WftTalentsFile,
} from '../scripts/sync/wowforevertools';

// Hand-written chunks mirroring wowforevertools' minified Vite output.

const indexHtml = `<script type="module" crossorigin src="/assets/app-b5yGO3Um.js"></script>`;

const appJs = `const x={"../../data/talents/hunter.json":()=>b(()=>import(\`./hunter-CV61h0ir.js\`),[]),
"../../data/abilities/hunter.json":()=>b(()=>import(\`./hunter-BF9jodOT.js\`),[]),
"../../data/classic/hunter.json":()=>b(()=>import(\`./hunter-shSGEaws.js\`),[])};`;

const abilitiesJs = `var e=[{id:\`marksmanship__aimed-shot\`,name:\`Aimed Shot\`,level:20,ranks:[
{rank:1,level:20,text:\`An aimed shot that increases ranged damage by 20.\`,classic:{text:\`Old rank 1.\`}},
{rank:2,level:28,text:\`An aimed shot that increases ranged damage by 34.\`,meta:{cooldownSec:6}}],
passive:!1,status:\`changed\`},
{name:\`Arcane Shot\`,ranks:[{rank:1,text:\`Classic text.\`}],status:\`removed\`},
{name:\`Arcane Shot\`,ranks:[{rank:1,text:\`  Forever   text. \`}],status:\`new\`},
{name:\`Hidden\`,ranks:[{rank:1,text:fn()}]}],
t={class:{id:3,slug:\`hunter\`},abilities:e};export{e as abilities,t as default};`;

const talentsJs = `var e={maxPoints:51},t=[{id:361,name:\`Beast Mastery\`,talents:[
{id:1,name:\`Bestial Wrath\`,maxRank:1,ranks:[\`Sends your pet into a rage.\`],status:\`classic\`},
{id:2,name:\`Thick Hide\`,maxRank:2,ranks:[\`Armor +5%.\`,\`Armor +10%.\`],status:\`changed\`}]}],
n=[],i={class:{id:3},rules:e,trees:t,removedTalents:n};export{i as default,t as trees};`;

const entry = (kind: 'spell' | 'talent', name: string, desc = 'wclbox text'): GlossaryEntry => ({
  id: `${kind}/${name}`,
  kind,
  name,
  class: 'hunter',
  desc,
  status: 'unchanged',
  sourceUrl: '',
});

describe('wowforevertools', () => {
  it('finds the app script and the per-class data chunks', () => {
    expect(wftAppScript(indexHtml)).toBe('app-b5yGO3Um.js');
    const map = wftChunkMap(appJs);
    expect(map.get('abilities/hunter')).toBe('hunter-BF9jodOT.js');
    expect(map.get('talents/hunter')).toBe('hunter-CV61h0ir.js');
    expect(map.has('classic/hunter')).toBe(false);
  });

  it('reads literal data without executing the chunk', () => {
    // a call expression anywhere makes the value (and everything built on it) unreadable
    expect(readChunkData(abilitiesJs)).toBeUndefined();
    const data = readChunkData<WftAbilitiesFile & { class: { slug: string } }>(
      abilitiesJs.replace('fn()', '`Hidden text.`'),
    );
    expect(data?.class.slug).toBe('hunter');
    expect(data?.abilities).toHaveLength(4);
    expect(data?.abilities?.[0].ranks?.[1]).toMatchObject({ rank: 2, meta: { cooldownSec: 6 } });
  });

  it('applies the highest-rank Forever text by class + name', () => {
    const abilities = readChunkData<WftAbilitiesFile>(abilitiesJs.replace('fn()', '`Hidden text.`'));
    const talents = readChunkData<WftTalentsFile>(talentsJs);
    const texts = wftClassTexts(abilities, talents);
    const entries = [
      entry('spell', 'Aimed Shot', 'Aim Shot increases ranged damage by 34.'),
      entry('spell', 'Arcane Shot'),
      entry('spell', 'Bestial Wrath'), // talent-granted spell
      entry('talent', 'Thick Hide'),
      entry('talent', 'Unknown Talent'),
    ];
    expect(applyWftTexts(entries, { hunter: texts })).toBe(4);
    expect(entries.map((e) => e.desc)).toEqual([
      'An aimed shot that increases ranged damage by 34.',
      'Forever text.',
      'Sends your pet into a rage.',
      'Armor +10%.',
      'wclbox text',
    ]);
  });
});
