import { describe, expect, it } from 'vitest';
import { MAX_NOTE_LENGTH, noteHtml, noteTerms, splitNote, type NotePart } from '../src/lib/build-note';
import type { GlossaryEntry } from '../src/lib/glossary-types';

// Same vectors as the mobile app's BuildNoteTest.kt.

const TERMS: Record<string, string> = {
  Frostbolt: 'spell/frostbolt',
  Charge: 'spell/charge',
  Blizzard: 'spell/blizzard',
  'Improved Blizzard': 'talent/improved-blizzard',
  'Ice Barrier': 'talent/ice-barrier',
  "Winter's Chill": 'talent/winters-chill',
};

const text = (t: string): NotePart => ({ kind: 'text', text: t });
const tip = (t: string, id: string): NotePart => ({ kind: 'tip', text: t, id });
const link = (t: string, url = t): NotePart => ({ kind: 'link', text: t, url });

describe('splitNote', () => {
  const cases: [string, string, NotePart[]][] = [
    ['names', 'Use Frostbolt, then Ice Barrier.', [text('Use '), tip('Frostbolt', 'spell/frostbolt'), text(', then '), tip('Ice Barrier', 'talent/ice-barrier'), text('.')]],
    ['multi-word names ignore case', 'ice barrier first', [tip('ice barrier', 'talent/ice-barrier'), text(' first')]],
    ['one-word names need a capital', 'charge in, then Charge', [text('charge in, then '), tip('Charge', 'spell/charge')]],
    ['longest name first', 'Improved Blizzard > Blizzard', [tip('Improved Blizzard', 'talent/improved-blizzard'), text(' > '), tip('Blizzard', 'spell/blizzard')]],
    ['whole words only', 'Frostbolts and Blizzardy', [text('Frostbolts and Blizzardy')]],
    ['curly apostrophe', 'Winter’s Chill stacks', [tip('Winter’s Chill', 'talent/winters-chill'), text(' stacks')]],
    ['turkish suffix after a name', "Frostbolt'u kullan", [tip('Frostbolt', 'spell/frostbolt'), text("'u kullan")]],
    ['every mention, line breaks kept', 'Frostbolt\nFrostbolt', [tip('Frostbolt', 'spell/frostbolt'), text('\n'), tip('Frostbolt', 'spell/frostbolt')]],
    ['link without trailing dot', 'See https://foreverwow.app/tr/talents/mage/#b=05-0-55.', [text('See '), link('https://foreverwow.app/tr/talents/mage/#b=05-0-55'), text('.')]],
    ['www link in brackets', '(www.wowhead.com/classic)', [text('('), link('www.wowhead.com/classic', 'https://www.wowhead.com/classic'), text(')')]],
    ['bracket inside a link', 'https://en.wikipedia.org/wiki/Mage_(class)', [link('https://en.wikipedia.org/wiki/Mage_(class)')]],
    ['turkish suffix after a link', "https://foreverwow.app'te bak", [link('https://foreverwow.app'), text("'te bak")]],
    ['no names inside a link', 'https://x.com/Frostbolt Frostbolt', [link('https://x.com/Frostbolt'), text(' '), tip('Frostbolt', 'spell/frostbolt')]],
    ['bare scheme is text', 'https:// and www.', [text('https:// and www.')]],
    ['empty', '', []],
  ];
  for (const [name, input, expected] of cases) {
    it(name, () => expect(splitNote(input, TERMS)).toEqual(expected));
  }

  it('works without terms', () => {
    expect(splitNote('Frostbolt https://a.b', {})).toEqual([text('Frostbolt '), link('https://a.b')]);
  });
});

describe('noteTerms', () => {
  const entry = (e: Partial<GlossaryEntry> & Pick<GlossaryEntry, 'id' | 'kind' | 'name'>): GlossaryEntry =>
    ({ desc: '', status: 'unchanged', sourceUrl: '', ...e }) as GlossaryEntry;
  const entries = [
    entry({ id: 'spell/ice-barrier', kind: 'spell', name: 'Ice Barrier', class: 'mage' }),
    entry({ id: 'talent/ice-barrier', kind: 'talent', name: 'Ice Barrier', class: 'mage' }),
    entry({ id: 'spell/old-blink', kind: 'spell', name: 'Blink', class: 'mage', status: 'removed' }),
    entry({ id: 'spell/blink', kind: 'spell', name: 'Blink', class: 'mage' }),
    entry({ id: 'spell/charge', kind: 'spell', name: 'Charge', class: 'warrior' }),
    entry({ id: 'racial/shadowmeld', kind: 'racial', name: 'Shadowmeld', races: ['alliance-night-elf'] }),
  ];

  it("keeps the class's names and the racials, talent before spell, current before removed", () => {
    expect(noteTerms(entries, 'mage')).toEqual({
      'Ice Barrier': 'talent/ice-barrier',
      Blink: 'spell/blink',
      Shadowmeld: 'racial/shadowmeld',
    });
  });
});

describe('noteHtml', () => {
  const info = (id: string) => (id === 'spell/frostbolt' ? { kind: 'spell' as const, icon: 'frostbolt' } : undefined);

  it('escapes text, makes tips and safe links', () => {
    const html = noteHtml(splitNote('<b>Frostbolt</b> & Charge https://a.b/?x="1"', { Frostbolt: 'spell/frostbolt', Charge: 'spell/charge' }), info, '/icons/');
    expect(html).toBe(
      '&lt;b&gt;<span class="wf-tip wf-tip--spell" data-tip="spell/frostbolt" tabindex="0"><img class="wf-tip-icon" src="/icons/frostbolt.jpg" alt="" width="18" height="18" loading="lazy">Frostbolt</span>&lt;/b&gt; &amp; Charge ' +
        '<a href="https://a.b/?x=" target="_blank" rel="noopener noreferrer nofollow ugc">https://a.b/?x=</a>&quot;1&quot;',
    );
  });

  it('caps at 5000 characters', () => {
    expect(MAX_NOTE_LENGTH).toBe(5000);
  });
});
