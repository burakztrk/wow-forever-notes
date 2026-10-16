import type { Lang } from '../config';

// Privacy policy for the website and the Forever Campfire: Codex app (the
// store listings link to /<lang>/privacy/). Keep it in line with what the app
// actually does: no accounts, ads or analytics; FCM token only when
// notifications are on.

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
const FIREBASE_PRIVACY = 'https://firebase.google.com/support/privacy';
const GOOGLE_PRIVACY = 'https://policies.google.com/privacy';
const ISSUES = 'https://github.com/burakztrk/wow-forever-notes/issues';

export const privacy: Record<Lang, PrivacyPage> = {
  tr: {
    title: 'Gizlilik politikası',
    updated: 'Son güncelleme: 17 Ekim 2026',
    intro:
      'Bu politika WoW Forever Notes web sitesi ve Forever Campfire: Codex mobil uygulaması için geçerlidir. İkisi de resmi olmayan, hayranlar tarafından yapılmış ve ücretsiz projelerdir. Hesap, reklam, analitik ya da izleme yoktur.',
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
          'Uygulama, yama notlarını ve oyun verisini (yetenekler, talent\'lar, ırklar, class\'lar) bu siteden indirir ve çevrimdışı çalışabilmek için cihazında saklar. Dil ve bildirim tercihlerin de yalnızca cihazında tutulur.',
          'Bu veriler bize ya da başka birine gönderilmez. Uygulamayı silince hepsi silinir.',
        ],
      },
      {
        heading: 'Bildirimler',
        paragraphs: [
          'Yeni yazı bildirimlerini açarsan uygulama Google\'ın Firebase Cloud Messaging (FCM) hizmetini kullanır. FCM cihazın için rastgele bir kayıt anahtarı (token) üretir ve cihazını seçtiğin dile ait konuya (ör. notes-tr) abone eder. Bu anahtar yalnızca bildirimi cihazına ulaştırmak için kullanılır. Biz anahtarları görmüyor ve saklamıyoruz.',
          'Bildirimleri uygulamanın Ayarlar ekranından ya da cihazının sistem ayarlarından istediğin zaman kapatabilirsin.',
        ],
        links: [{ label: 'Firebase gizlilik bilgileri', href: FIREBASE_PRIVACY }],
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
      'This policy covers the WoW Forever Notes website and the Forever Campfire: Codex mobile app. Both are unofficial, fan-made and free. There are no accounts, ads, analytics or tracking.',
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
          'The app downloads the patch notes and game data (spells, talents, races, classes) from this website and keeps a copy on your device so it works offline. Your language and notification preferences are also stored only on your device.',
          'None of this is sent to us or anyone else. Uninstalling the app deletes it.',
        ],
      },
      {
        heading: 'Notifications',
        paragraphs: [
          'If you turn on new-post notifications, the app uses Google Firebase Cloud Messaging (FCM). FCM creates a random registration token for your device and subscribes it to the topic for your language (for example notes-en). The token is used only to deliver notifications to your device. We do not see or store tokens.',
          'You can turn notifications off at any time in the app\'s settings or in your device\'s system settings.',
        ],
        links: [{ label: 'Firebase privacy information', href: FIREBASE_PRIVACY }],
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
