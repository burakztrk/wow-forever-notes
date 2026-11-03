import type { Lang } from '../config';

// /<lang>/about/: who makes the site, where the data comes from and how the
// patch notes are written. Search engines and readers use this to judge how
// far the site can be trusted (docs/seo.md), so keep it true: when the sources,
// the writing process or the contact route change, change this page too.

export interface AboutSection {
  heading: string;
  paragraphs: string[];
  links?: { label: string; href: string }[];
}

export interface AboutPage {
  title: string; // <title> and h1
  description: string; // meta description, ≤ 160 characters
  intro: string;
  sections: AboutSection[];
}

const REPO = 'https://github.com/burakztrk/wow-forever-notes';
const ISSUES = `${REPO}/issues`;
const PLAY = 'https://play.google.com/store/apps/details?id=com.booapps.forevercampfire';
const WCLBOX = 'https://wowforever.wclbox.com/en';
const WFT = 'https://wowforevertools.com/';
const FORUMS = 'https://us.forums.blizzard.com/en/wow/';
const CWF = 'https://classicwowforever.com/';

export const about: Record<Lang, AboutPage> = {
  tr: {
    title: 'Forever Campfire: Codex hakkında',
    description:
      'Forever Campfire: Codex nedir, WoW Forever yama notlarını nasıl yazıyoruz, oyun verisi nereden geliyor ve bir hatayı nasıl bildirirsin.',
    intro:
      'Forever Campfire: Codex, World of Warcraft: Forever (WoW Forever) için resmi olmayan, ücretsiz bir hayran sitesidir. Blizzard Entertainment ile bir bağı yoktur. Yama notlarını Türkçe ve İngilizce özetler; büyüleri, talent’ları, ırk yeteneklerini, meslekleri ve Legacy ağacını tek yerde toplar.',
    sections: [
      {
        heading: 'Sitede neler var',
        paragraphs: [
          'Yama ve geliştirme notlarının özetleri (her build için bir yazı), her büyü, talent ve ırk yeteneği için açıklama kartları, 51 puanlık talent hesaplayıcı, oyundaki gibi bir ırk/class seçim ekranı, meslek rehberi ve 1–300 rotaları, Legacy hesaplayıcı ve ırkların ve sınıfların hikayeleri.',
          'Aynı veriyi kullanan Android uygulaması Google Play’de: Forever Campfire: Codex.',
        ],
        links: [{ label: 'Google Play', href: PLAY }],
      },
      {
        heading: 'Yama notlarını nasıl yazıyoruz',
        paragraphs: [
          'Her yazı Blizzard’ın resmi forum gönderilerine ve o build’in istemci verisine dayanır. Kaynaklar her yazının sonunda linklidir. Kaynakta olmayan bir şey yazmayız, kaynak metni kopyalamayız, özetleriz. Oyundaki adlar iki dilde de İngilizce kalır, böylece oyunda aradığın adla eşleşir.',
          'Özetler yapay zekâ yardımıyla bu kaynaklardan hazırlanır ve yayından önce otomatik kontrollerden geçer: yazıdaki her büyü ve talent adı veritabanında olmalı, Türkçe ve İngilizce yazının aynı bölümleri olmalı. Sonradan düzeltilen bir yazıda “Güncellendi” tarihi görünür.',
        ],
      },
      {
        heading: 'Oyun verisi nereden geliyor',
        paragraphs: [
          'Büyü, talent ve ırk yeteneği verileri ile ikonlar wclbox’tan, büyü açıklamalarının istemci metni WoW Forever Tools’tan, meslek içerikleri Classic WoW Forever’dan (CC BY 4.0) gelir. Veriler her yeni build’de yeniden çekilir. Kartlar kaynağına linklidir.',
        ],
        links: [
          { label: 'wclbox', href: WCLBOX },
          { label: 'WoW Forever Tools', href: WFT },
          { label: 'Classic WoW Forever', href: CWF },
          { label: 'Blizzard forumları', href: FORUMS },
        ],
      },
      {
        heading: 'Hata bildir, katkı yap',
        paragraphs: [
          'Yanlış bir değer ya da eksik bir not gördüysen GitHub’da bir issue aç. Sitenin bütün kodu ve içeriği açık kaynak.',
        ],
        links: [
          { label: 'Hata bildir (GitHub issues)', href: ISSUES },
          { label: 'Kaynak kod', href: REPO },
        ],
      },
    ],
  },
  en: {
    title: 'About Forever Campfire: Codex',
    description:
      'What Forever Campfire: Codex is, how the WoW Forever patch notes are written, where the game data comes from and how to report a mistake.',
    intro:
      'Forever Campfire: Codex is an unofficial, free fan site for World of Warcraft: Forever (WoW Forever). It is not affiliated with Blizzard Entertainment. It summarizes the patch notes in English and Turkish and puts the spells, talents, racials, professions and the Legacy tree in one place.',
    sections: [
      {
        heading: 'What is on the site',
        paragraphs: [
          'Summaries of the patch and development notes (one post per build), a card for every spell, talent and racial, a 51-point talent calculator, an in-game style race and class screen, a professions guide with 1–300 routes, a Legacy calculator and the stories of the races and classes.',
          'The Android app, which uses the same data, is on Google Play: Forever Campfire: Codex.',
        ],
        links: [{ label: 'Google Play', href: PLAY }],
      },
      {
        heading: 'How the patch notes are written',
        paragraphs: [
          'Every post is based on Blizzard’s official forum posts and that build’s client data. The sources are linked at the end of each post. We write nothing that is not in the sources and summarize instead of copying. Game names stay in English in both languages, so they match what you search for in game.',
          'The summaries are drafted with AI assistance from those sources and pass automatic checks before they go out: every spell and talent name in a post must exist in the database, and the English and Turkish posts must have the same sections. A post corrected later shows an “Updated” date.',
        ],
      },
      {
        heading: 'Where the game data comes from',
        paragraphs: [
          'Spell, talent and racial data and the icons come from wclbox, the client text of the spell descriptions from WoW Forever Tools, and the professions content from Classic WoW Forever (CC BY 4.0). The data is pulled again for every new build. The cards link to their source.',
        ],
        links: [
          { label: 'wclbox', href: WCLBOX },
          { label: 'WoW Forever Tools', href: WFT },
          { label: 'Classic WoW Forever', href: CWF },
          { label: 'Blizzard forums', href: FORUMS },
        ],
      },
      {
        heading: 'Report a mistake, contribute',
        paragraphs: [
          'If you see a wrong value or a missing note, open an issue on GitHub. All of the site’s code and content is open source.',
        ],
        links: [
          { label: 'Report a mistake (GitHub issues)', href: ISSUES },
          { label: 'Source code', href: REPO },
        ],
      },
    ],
  },
};
