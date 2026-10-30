// The written race stories as carousel slides; the stories index and the home page share them.
import type { Lang } from '../../config';
import { ui } from '../../i18n';
import {
  DWARF_STORY,
  GNOME_STORY,
  HUMAN_STORY,
  NIGHT_ELF_STORY,
  ORC_STORY,
  SKYBORNE_STORY,
  TAUREN_STORY,
  TROLL_STORY,
  UNDEAD_STORY,
} from '../../i18n/stories';
import { CLASS_STORIES } from '../../i18n/class-stories';
import { TIMELINE_UI } from '../../i18n/timeline';
import { races } from '../codex';
import { STORY_CLASSES } from './classes';
import { STORY_RACES } from './races';
import { statsUrl, storyUrl } from './urls';
import { withBase } from '../../utils/url';

export interface StorySlide {
  slug: string;
  href: string;
  name: string;
  /** First line over the name, e.g. "Story 03 · Alliance". */
  over: string;
  lead: string;
  cta: string;
  bg?: { src: string; w: number; h: number };
  /** CSS object-position of the background (race cards use the stylesheet's default). */
  bgPosition?: string;
  /** Colour of the name (class stories). */
  color?: string;
  hero?: string;
  soft?: boolean;
  timeline?: boolean;
}

// Carousel order: the stories index has one carousel per side (the Skyborne belong to both and come
// last); the home page shows every race once, after the timeline.
export const FACTION_ORDER = {
  alliance: ['human', 'dwarf', 'gnome', 'night-elf', 'skyborne'],
  horde: ['orc', 'troll', 'undead', 'tauren', 'skyborne'],
};
export const ALL_RACES_ORDER = ['human', 'dwarf', 'gnome', 'night-elf', 'orc', 'troll', 'undead', 'tauren', 'skyborne'];

export function raceSlides(lang: Lang): StorySlide[] {
  const t = ui(lang);
  const features = [
  {
    slug: 'skyborne',
    name: 'Skyborne',
    faction: 'Alliance · Horde',
    story: SKYBORNE_STORY[lang],
    bg: { src: '/stories/skyborne/cover.webp', w: 1600, h: 923 },
    hero: undefined,
  },
  {
    slug: 'tauren',
    name: 'Tauren',
    faction: 'Horde',
    story: TAUREN_STORY[lang],
    bg: { src: '/stories/tauren/mulgore.webp', w: 848, h: 664 },
    hero: '/stories/tauren/cairne.webp',
  },
  {
    slug: 'undead',
    name: 'Undead',
    faction: 'Horde',
    story: UNDEAD_STORY[lang],
    bg: { src: '/stories/undead/tirisfal.webp', w: 1024, h: 431 },
    hero: '/stories/undead/sylvanas.webp',
  },
  {
    slug: 'troll',
    name: 'Troll',
    faction: 'Horde',
    story: TROLL_STORY[lang],
    bg: { src: '/stories/troll/durotar.webp', w: 1210, h: 1619 },
    hero: '/stories/troll/voljin.webp',
    soft: true,
  },
  {
    slug: 'orc',
    name: 'Orc',
    faction: 'Horde',
    story: ORC_STORY[lang],
    bg: { src: '/stories/orc/orgrimmar.webp', w: 739, h: 415 },
    hero: '/stories/orc/thrall.webp',
    soft: true, // a painting with its own sky: fade its edges
  },
  {
    slug: 'night-elf',
    name: 'Night Elf',
    faction: 'Alliance',
    story: NIGHT_ELF_STORY[lang],
    bg: { src: '/stories/night-elf/well-of-eternity.webp', w: 1600, h: 1068 },
    hero: '/stories/night-elf/azshara.webp',
  },
  {
    slug: 'human',
    name: 'Human',
    faction: 'Alliance',
    story: HUMAN_STORY[lang],
    bg: { src: '/stories/human/stormwind-gate.webp', w: 1920, h: 810 },
    hero: undefined,
  },
  {
    slug: 'dwarf',
    name: 'Dwarf',
    faction: 'Alliance',
    story: DWARF_STORY[lang],
    bg: { src: '/stories/dwarf/ironforge-forge.webp', w: 1920, h: 864 },
    hero: '/stories/dwarf/magni.webp',
  },
  {
    slug: 'gnome',
    name: 'Gnome',
    faction: 'Alliance',
    story: GNOME_STORY[lang],
    bg: { src: '/stories/gnome/ironforge.webp', w: 1767, h: 863 },
    hero: '/stories/gnome/mekkatorque.webp',
  },
];
  return features.map((f) => ({
    slug: f.slug,
    href: withBase(`/${lang}/stories/${f.slug}/`),
    name: f.name,
    over: `${f.story.overline} · ${f.faction}`,
    lead: f.story.lead,
    cta: t.storiesRead,
    bg: f.bg,
    hero: f.hero ? withBase(f.hero) : undefined,
    soft: 'soft' in f ? f.soft : undefined,
  }));
}

export function timelineSlide(lang: Lang): StorySlide {
  const tl = TIMELINE_UI[lang];
  return {
    slug: 'timeline',
    href: withBase(`/${lang}/stories/timeline/`),
    name: tl.title,
    over: tl.cardOver,
    lead: tl.cardLead,
    cta: tl.cardCta,
    bg: { src: '/maps/azeroth.webp', w: 1002, h: 668 },
    timeline: true,
  };
}

export const pickSlides = (slides: StorySlide[], slugs: string[]) => slugs.map((slug) => slides.find((x) => x.slug === slug)!);

// Class stories as slides, in the order of the class strip.
export function classSlides(lang: Lang): StorySlide[] {
  const t = ui(lang);
  return STORY_CLASSES.filter((c) => c.slug && c.cover).map((c) => {
    const story = CLASS_STORIES[c.slug!][lang];
    return {
      slug: c.slug!,
      href: storyUrl(lang, c.slug!),
      name: c.name,
      over: `${story.overline} · Class`,
      lead: story.lead,
      cta: t.storiesRead,
      bg: { src: c.cover!.src, w: c.cover!.w, h: c.cover!.h },
      bgPosition: c.cover!.cardPosition ?? c.cover!.position,
      color: c.color,
    };
  });
}

export interface MarqueeIcon {
  /** Where the icon itself leads: the story (a race's /stories/<race>/, a class's /classes/<class>/). */
  href: string;
  /** The two links that slide out on hover, stacked: label + target. */
  links: [{ label: string; href: string }, { label: string; href: string }];
  name: string;
  /** Icon file name under public/icons/ (no extension). */
  icon: string;
  /** Edge colour: the class colour, or the colour of the race (src/lib/stories/races.ts). */
  color?: string;
  /** A people on both sides (the Skyborne): half blue, half red edge. */
  bothFactions?: boolean;
}

/** The icon marquee on the home page: the race stories, then the class stories, in three rows of equal length.
 * An icon opens the story; on hover it also links "Race"/"Irk" (/<lang>/races/<id>/) and "Lore" (the story) for a
 * race, "Class" (the story, /<lang>/classes/<id>/) and "Stats" (/<lang>/stats/<id>/) for a class. */
export function marqueeRows(lang: Lang): MarqueeIcon[][] {
  const iconOf = (id: string) => races.find((r) => r.id === id)?.icon;
  const raceRow = STORY_RACES.filter((r) => r.slug && iconOf(r.id)).map((r) => ({
    href: withBase(`/${lang}/stories/${r.slug}/`),
    links: [
      { label: lang === 'tr' ? 'Irk' : 'Race', href: withBase(`/${lang}/races/${r.id}/`) },
      { label: 'Lore', href: withBase(`/${lang}/stories/${r.slug}/`) },
    ] as MarqueeIcon['links'],
    name: r.name,
    icon: iconOf(r.id)!,
    color: r.color,
    bothFactions: r.faction === 'ah',
  }));
  const classRow = STORY_CLASSES.filter((c) => c.slug).map((c) => ({
    href: storyUrl(lang, c.slug!),
    links: [
      { label: 'Class', href: storyUrl(lang, c.slug!) },
      { label: 'Stats', href: statsUrl(lang, c.id) },
    ] as MarqueeIcon['links'],
    name: c.name,
    icon: c.icon,
    color: c.color,
  }));
  const all = [...raceRow, ...classRow];
  const size = Math.ceil(all.length / 3);
  return [0, 1, 2].map((i) => all.slice(i * size, (i + 1) * size));
}
