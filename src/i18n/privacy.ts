import type { Lang } from '../config';

// Privacy policy for the website and the Forever Campfire: Codex app (the
// store listings link to /<lang>/privacy/). Keep it in line with what the app
// actually does: no accounts, ads, analytics or notifications.

export interface PrivacySection {
  heading: string;
  paragraphs: string[];
  links?: { label: string; href: string }[];
}

export interface PrivacyPage {
  title: string;
  updated: string;
  intro: string;
  sections: PrivacySection[];
}

const GITHUB_PRIVACY = 'https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement';
const GOOGLE_PRIVACY = 'https://policies.google.com/privacy';
const ISSUES = 'https://github.com/burakztrk/wow-forever-notes/issues';

export const privacy: Record<Lang, PrivacyPage> = {
  tr: {
    title: 'Gizlilik politikası',
    updated: 'Son güncelleme: 17 Ekim 2026',
    intro:
      'Bu politika Forever Campfire: Codex web sitesi ve mobil uygulaması için geçerlidir. İkisi de resmi olmayan, hayranlar tarafından yapılmış ve ücretsiz projelerdir. Hesap, reklam, analitik ya da izleme yoktur.',
    sections: [
      {
        heading: 'Toplanan veriler',
        paragraphs: [
          'Senden ad, e-posta, konum ya da benzeri kişisel bilgi istemiyoruz ve toplamıyoruz. Uygulamada giriş yapılan bir hesap yok.',
        ],
      },
      {
        heading: 'Uygulamanın cihazında sakladıkları',
        paragraphs: [
          'Uygulama, yama notlarını ve oyun verisini (yetenekler, talent\'lar, ırklar, class\'lar) bu siteden indirir ve çevrimdışı çalışabilmek için cihazında saklar. Dil tercihin ve kaydettiğin talent build\'leri de yalnızca cihazında tutulur.',
          'Bu veriler bize ya da başka birine gönderilmez. Uygulamayı silince hepsi silinir.',
        ],
      },
      {
        heading: 'Barındırma ve üçüncü taraflar',
        paragraphs: [
          'Site ve uygulamanın indirdiği veriler GitHub Pages üzerinde barındırılır. Her web isteğinde olduğu gibi GitHub, IP adresin gibi teknik bilgileri kendi politikasına göre işleyebilir. Web sitesi yazı tiplerini Google Fonts\'tan yükler.',
          'Oyun verisi wclbox, WoW Forever Tools ve Blizzard Forums kaynaklarından derlenir. Bu kaynaklara senin cihazından istek gönderilmez.',
        ],
        links: [
          { label: 'GitHub gizlilik bildirimi', href: GITHUB_PRIVACY },
          { label: 'Google gizlilik politikası', href: GOOGLE_PRIVACY },
        ],
      },
      {
        heading: 'Çocuklar',
        paragraphs: ['Site ve uygulama çocuklara yönelik değildir ve kimseden kişisel veri toplamaz.'],
      },
      {
        heading: 'Değişiklikler ve iletişim',
        paragraphs: [
          'Bu politika değişirse güncel hali bu sayfada yayınlanır. Soruların için GitHub üzerinden bir issue açabilirsin.',
        ],
        links: [{ label: 'GitHub issues', href: ISSUES }],
      },
    ],
  },
  en: {
    title: 'Privacy policy',
    updated: 'Last updated: 17 October 2026',
    intro:
      'This policy covers the Forever Campfire: Codex website and mobile app. Both are unofficial, fan-made and free. There are no accounts, ads, analytics or tracking.',
    sections: [
      {
        heading: 'Data we collect',
        paragraphs: [
          'We do not ask for or collect your name, email, location or any similar personal information. The app has no sign-in.',
        ],
      },
      {
        heading: 'What the app stores on your device',
        paragraphs: [
          'The app downloads the patch notes and game data (spells, talents, races, classes) from this website and keeps a copy on your device so it works offline. Your language preference and saved talent builds are also stored only on your device.',
          'None of this is sent to us or anyone else. Uninstalling the app deletes it.',
        ],
      },
      {
        heading: 'Hosting and third parties',
        paragraphs: [
          'The website and the data the app downloads are hosted on GitHub Pages. As with any web request, GitHub may process technical information such as your IP address under its own policy. The website loads fonts from Google Fonts.',
          'Game data is compiled from wclbox, WoW Forever Tools and the Blizzard Forums. Your device does not send requests to those sources.',
        ],
        links: [
          { label: 'GitHub privacy statement', href: GITHUB_PRIVACY },
          { label: 'Google privacy policy', href: GOOGLE_PRIVACY },
        ],
      },
      {
        heading: 'Children',
        paragraphs: ['The website and the app are not directed at children and collect no personal data from anyone.'],
      },
      {
        heading: 'Changes and contact',
        paragraphs: ['If this policy changes, the current version is published on this page. For questions, open an issue on GitHub.'],
        links: [{ label: 'GitHub issues', href: ISSUES }],
      },
    ],
  },
};
