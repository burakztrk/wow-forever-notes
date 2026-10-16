import { describe, expect, it } from 'vitest';
import { applyTranslations, pruneCache, textKey, validateTranslation } from '../scripts/lib/translations';
import type { GlossaryEntry } from '../src/lib/glossary-types';

const entry = (desc: string, change?: string): GlossaryEntry => ({
  id: 'spell/x',
  kind: 'spell',
  name: 'X',
  desc,
  change,
  status: 'changed',
  sourceUrl: 'https://example.test',
});

describe('validateTranslation', () => {
  it('accepts translations that keep every number (decimal comma ok)', () => {
    expect(validateTranslation('Lasts 1.5 sec, 20% more.', '1,5 saniye sürer, %20 daha fazla.')).toBeUndefined();
  });
  it('rejects translations that drop or change a number', () => {
    expect(validateTranslation('Deals 364 to 424 damage.', '364 hasar verir.')).toMatch(/424/);
    expect(validateTranslation('x', '')).toMatch(/empty/);
  });
});

describe('applyTranslations', () => {
  it('fills Turkish fields from the cache and lists what is missing', () => {
    const e = entry('Heals 100.', 'Rank 2: 100 (Classic Era: 90)');
    const pending = applyTranslations([e], { [textKey('Heals 100.')]: { en: 'Heals 100.', tr: '100 iyileştirir.' } });
    expect(e.descTr).toBe('100 iyileştirir.');
    expect(e.changeTr).toBeUndefined();
    expect(pending.map((p) => p.en)).toEqual(['Rank 2: 100 (Classic Era: 90)']);
  });

  it('drops a stale translation when the English text changes', () => {
    const e = { ...entry('Heals 120.'), descTr: '100 iyileştirir.' };
    const pending = applyTranslations([e], { [textKey('Heals 100.')]: { en: 'Heals 100.', tr: '100 iyileştirir.' } });
    expect(e.descTr).toBeUndefined();
    expect(pending).toHaveLength(1);
  });

  it('prunes cache records no entry uses', () => {
    const cache = {
      [textKey('a')]: { en: 'a', tr: 'a-tr' },
      [textKey('old')]: { en: 'old', tr: 'eski' },
    };
    expect(Object.keys(pruneCache([entry('a')], cache))).toEqual([textKey('a')]);
  });
});
