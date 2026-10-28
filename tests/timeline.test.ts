import { describe, expect, it } from 'vitest';
import { LANGS } from '../src/config';
import { TIMELINE_ERAS, TIMELINE_EVENTS, TIMELINE_TOPICS } from '../src/i18n/timeline';
import { STORY_CLASSES } from '../src/lib/stories/classes';
import { STORY_RACES } from '../src/lib/stories/races';
import { ERAS, PLACES, TIMELINE, TOPICS, TOPIC_ICONS, storyRef, timelineSlugs, timelineUrl } from '../src/lib/stories/timeline';

describe('story timeline', () => {
  it('has unique event ids, in era order', () => {
    expect(new Set(TIMELINE.map((e) => e.id)).size).toBe(TIMELINE.length);
    const order = TIMELINE.map((e) => ERAS.indexOf(e.era));
    expect(order.every((v) => v >= 0)).toBe(true);
    expect(order).toEqual([...order].sort((a, b) => a - b));
    for (const era of ERAS) expect(TIMELINE.some((e) => e.era === era), era).toBe(true);
  });

  it('gives every event one to three known topics, each used somewhere and drawn', () => {
    for (const e of TIMELINE) {
      expect(e.topics.length, e.id).toBeGreaterThan(0);
      expect(e.topics.length, e.id).toBeLessThanOrEqual(3);
      expect(new Set(e.topics).size, e.id).toBe(e.topics.length);
      for (const k of e.topics) expect(TOPICS, `${e.id}: ${k}`).toContain(k);
    }
    for (const k of TOPICS) {
      expect(TIMELINE.some((e) => e.topics.includes(k)), k).toBe(true);
      expect(TOPIC_ICONS[k], k).toBeTruthy();
      for (const lang of LANGS) expect(TIMELINE_TOPICS[lang][k], `${lang} ${k}`).toBeTruthy();
    }
  });

  it('pins every place inside the Azeroth map', () => {
    for (const e of TIMELINE) {
      for (const p of [e.place, ...(e.from ?? []), ...(e.to ?? [])]) {
        expect(PLACES[p], `${e.id}: ${p}`).toBeDefined();
        expect(e.place === p && (e.from ?? []).concat(e.to ?? []).includes(p), `${e.id} routes to itself`).toBe(false);
      }
    }
    for (const [id, p] of Object.entries(PLACES)) {
      expect(p.x, id).toBeGreaterThan(0);
      expect(p.x, id).toBeLessThan(1002);
      expect(p.y, id).toBeGreaterThan(0);
      expect(p.y, id).toBeLessThan(668);
    }
  });

  it('links every event to existing story chapters', () => {
    for (const e of TIMELINE) {
      expect(e.stories.length, e.id).toBeGreaterThan(0);
      for (const lang of LANGS) for (const ref of e.stories) expect(storyRef(lang, ref), `${e.id} → ${ref}`).toBeDefined();
    }
  });

  it('gives every written race and class story at least one event', () => {
    const written = [...STORY_RACES, ...STORY_CLASSES].map((s) => s.slug).filter(Boolean);
    expect(timelineSlugs().sort()).toEqual([...written].sort());
    expect(timelineUrl('tr', '/tr/stories/orc/')).toBe('/tr/stories/timeline/#s=orc');
    expect(timelineUrl('en', '/en/stories/curse-of-flesh/')).toBeUndefined();
  });

  it('keeps TR and EN copy in step', () => {
    for (const lang of LANGS) {
      expect(Object.keys(TIMELINE_ERAS[lang]).sort()).toEqual([...ERAS].sort());
      expect(Object.keys(TIMELINE_EVENTS[lang]).sort()).toEqual(TIMELINE.map((e) => e.id).sort());
      for (const e of TIMELINE) {
        const c = TIMELINE_EVENTS[lang][e.id];
        expect(c.title.length, `${lang} ${e.id}`).toBeGreaterThan(2);
        expect(c.text.length, `${lang} ${e.id}`).toBeGreaterThan(60);
        expect(!!c.when, `${e.id} when`).toBe(!!TIMELINE_EVENTS.en[e.id].when);
      }
    }
  });
});
