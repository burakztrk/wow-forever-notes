import { describe, expect, it } from 'vitest';
import { findMissingTranslations, splitId } from '../src/lib/posts';

describe('blog translations', () => {
  it('accepts complete TR/EN pairs', () => {
    expect(findMissingTranslations(['tr/a', 'en/a', 'en/b', 'tr/b'])).toEqual([]);
  });

  it('reports the missing side of a pair', () => {
    expect(findMissingTranslations(['tr/a', 'en/a', 'tr/b'])).toEqual(['missing en/b.md']);
  });

  it('rejects files outside a language folder', () => {
    expect(() => splitId('wow-forever-2026-10-15')).toThrow(/tr,en/);
  });
});
