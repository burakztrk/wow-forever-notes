import type { Lang } from '../config';

// UI strings. Game terms (spell, talent, race, class names) stay in English in
// both languages; only the site chrome is translated here.
const strings = {
  tr: {
    langName: 'Türkçe',
    tagline: 'WoW Forever beta yama ve geliştirme notları, Türkçe özetler.',
    latest: 'Son notlar',
    noPosts: 'Henüz yazı yok.',
    readMore: 'Devamı',
    build: 'Build',
    draft: 'Taslak',
    sources: 'Kaynaklar',
    backToList: '← Tüm notlar',
    switchTo: 'Dili değiştir',
    disclaimer:
      'Resmi olmayan bir hayran sitesidir. World of Warcraft ve ilgili isim, ikon ve veriler Blizzard Entertainment’ın mülkiyetindedir.',
    dataCredit: 'Oyun verisi',
    // tooltip labels
    instant: 'Anında',
    castSec: 'sn',
    yd: 'yd',
    cooldown: 'Bekleme',
    points: 'puan',
    row: 'satır',
    learnedAt: 'Öğrenme seviyesi',
    statusNew: 'Forever’da yeni',
    statusChanged: 'Classic’e göre değişti',
    statusUnchanged: 'Classic ile aynı',
    statusRemoved: 'Forever’da yok',
    source: 'Kaynak',
  },
  en: {
    langName: 'English',
    tagline: 'WoW Forever beta patch and development notes, summarized.',
    latest: 'Latest notes',
    noPosts: 'No posts yet.',
    readMore: 'Read more',
    build: 'Build',
    draft: 'Draft',
    sources: 'Sources',
    backToList: '← All notes',
    switchTo: 'Switch language',
    disclaimer:
      'Unofficial fan site. World of Warcraft and related names, icons and data are property of Blizzard Entertainment.',
    dataCredit: 'Game data',
    instant: 'Instant',
    castSec: 'sec',
    yd: 'yd',
    cooldown: 'Cooldown',
    points: 'points',
    row: 'row',
    learnedAt: 'Learned at level',
    statusNew: 'New in Forever',
    statusChanged: 'Changed from Classic',
    statusUnchanged: 'Same as Classic',
    statusRemoved: 'Not in Forever',
    source: 'Source',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UiKey = keyof (typeof strings)['en'];
export type UiStrings = Record<UiKey, string>;

export function ui(lang: Lang): UiStrings {
  return strings[lang];
}

export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/Istanbul',
  });
}
