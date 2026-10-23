import type { Lang } from '../config';

// Privacy policy for the website and the Forever Campfire: Codex app (the
// store listings link to /<lang>/privacy/). Keep it in line with what the site
// and the app actually do. The website counts visits with Cloudflare Web
// Analytics (cookie-free, no personal data); BaseLayout.astro adds it. The
// Android app sends usage statistics and crash reports through Firebase
// Analytics + Crashlytics under an anonymous Firebase Auth user; the events are listed in the mobile repo's
// shared/src/commonMain/kotlin/com/booapps/forevercampfire/Analytics.kt.

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
const CLOUDFLARE_WEB_ANALYTICS = 'https://www.cloudflare.com/web-analytics/';
const CLOUDFLARE_PRIVACY = 'https://www.cloudflare.com/privacypolicy/';
const FIREBASE_PRIVACY = 'https://firebase.google.com/support/privacy';
const ISSUES = 'https://github.com/burakztrk/wow-forever-notes/issues';

export const privacy: Record<Lang, PrivacyPage> = {
  tr: {
    title: 'Gizlilik politikası',
    updated: 'Son güncelleme: 23 Ekim 2026',
    intro:
      'Bu politika Forever Campfire: Codex web sitesi ve mobil uygulaması için geçerlidir. İkisi de resmi olmayan, hayranlar tarafından yapılmış ve ücretsiz projelerdir. Hesap, reklam ya da çerez yoktur. Web sitesi kişisel veri içermeyen ziyaret istatistikleri tutar; Android uygulaması anonim kullanım istatistikleri ve çökme raporları gönderir, bunları Ayarlar\'dan kapatabilirsin.',
    sections: [
      {
        heading: 'Toplanan veriler',
        paragraphs: [
          'Senden ad, e-posta ya da benzeri kişisel bilgi istemiyoruz. Uygulamada giriş yapılan bir hesap yok. Uygulama yalnızca aşağıda anlatılan, adını ya da e-postanı içermeyen kullanım istatistiklerini ve çökme raporlarını gönderir.',
        ],
      },
      {
        heading: 'Web sitesi ziyaret istatistikleri',
        paragraphs: [
          'Web sitesi kaç kişinin ziyaret ettiğini, hangi sayfaların okunduğunu ve ziyaretlerin hangi ülkelerden geldiğini görmek için Cloudflare Web Analytics kullanır. Çerez kullanmaz, tarayıcında bir şey saklamaz, seni tanımlayan bir kimlik oluşturmaz ve siteler arasında izleme yapmaz.',
          'Ölçüm sırasında Cloudflare sayfa adresini, yönlendiren sayfayı, tarayıcı ve cihaz türünü ve sayfa yükleme süresini alır. Ülke bilgisi IP adresinden çıkarılır; IP adresi istatistiklerde saklanmaz. Bize yalnızca toplu sayılar ulaşır.',
        ],
        links: [
          { label: 'Cloudflare Web Analytics', href: CLOUDFLARE_WEB_ANALYTICS },
          { label: 'Cloudflare gizlilik politikası', href: CLOUDFLARE_PRIVACY },
        ],
      },
      {
        heading: 'Uygulamanın kullanım istatistikleri ve çökme raporları',
        paragraphs: [
          'Android uygulaması, hangi özelliklerin kullanıldığını görmek ve hataları düzeltmek için Google Firebase Analytics ve Firebase Crashlytics kullanır. Kaydedilenler: açtığın ekranlar ve gösterdikleri sayfa (ör. hangi class, ırk, meslek ya da yama notu), dokunduğun işlemler (sekme değiştirme, paylaşma, dış bağlantı açma, talent build\'ini kaydetme ya da paylaşma ve dağıttığın puanlar, build ve karakter silme, dil değiştirme, verileri yenileme, büyü/talent açıklaması açma), uygulama içi aramada yazdığın arama terimleri ve uygulamanın dili. Karakter oluşturduğunda ırkı, class\'ı ve karaktere verdiğin ad gönderilir; bu yüzden karakter adına gerçek adını yazma. Build\'lere verdiğin adlar gönderilmez.',
          'Bu kayıtları bir arada tutabilmek için uygulama her kurulumu Firebase Authentication\'da anonim bir kullanıcı olarak kaydeder. Bu kullanıcının adı, e-postası ya da şifresi yoktur; yalnızca rastgele bir kullanıcı kimliği vardır ve kullanım istatistikleri ile çökme raporları bu kimlikle eşleşir. Uygulamayı silince yeniden kurulumda yeni bir anonim kullanıcı oluşturulur.',
          'Firebase bunlara ek olarak uygulama sürümünü, cihaz modelini, işletim sistemi sürümünü, cihaz dilini, oturum sayısı ve süresini ve IP adresinden çıkarılan yaklaşık konumu (ülke, şehir) alır. Her kurulum için ayrıca rastgele bir uygulama kimliği oluşturulur ve uygulamayı silince sıfırlanır. Reklam kimliği okunmaz.',
          'Uygulama çökerse Crashlytics hata ayrıntılarını (hangi kodda çöktüğü), cihaz modeli ve sistem sürümünü, boş bellek ve depolamayı ve çökmeden hemen önce açılan ekranlarla işlemleri gönderir.',
          'Bu veriler reklam için kullanılmaz, satılmaz ve hizmet sağlayıcı olarak Google dışında kimseyle paylaşılmaz. Google sunucularında (ABD dahil) işlenir; kullanım istatistikleri 2 ay, çökme raporları 90 gün saklanır. Bize yalnızca toplu sayılar ve çökme raporları ulaşır.',
          'İstemezsen uygulamada Ayarlar → Gizlilik → "Kullanım istatistikleri ve çökme raporları" anahtarını kapat; bundan sonra hiçbiri gönderilmez ve anonim giriş yapılmaz. Anonim kullanıcı kaydının silinmesini istersen GitHub üzerinden bize yaz. iOS uygulaması şu an bunları kullanmıyor.',
        ],
        links: [
          { label: 'Firebase gizlilik ve güvenlik', href: FIREBASE_PRIVACY },
          { label: 'Google gizlilik politikası', href: GOOGLE_PRIVACY },
        ],
      },
      {
        heading: 'Uygulamanın cihazında sakladıkları',
        paragraphs: [
          'Uygulama, yama notlarını ve oyun verisini (yetenekler, talent\'lar, ırklar, class\'lar) bu siteden indirir ve çevrimdışı çalışabilmek için cihazında saklar. Dil tercihin, kaydettiğin talent build\'leri ve karakterlerin de yalnızca cihazında tutulur.',
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
        paragraphs: ['Site ve uygulama çocuklara yönelik değildir ve kimseden bilerek kişisel veri toplamaz.'],
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
    updated: 'Last updated: 23 October 2026',
    intro:
      'This policy covers the Forever Campfire: Codex website and mobile app. Both are unofficial, fan-made and free. There are no accounts, ads or cookies. The website keeps visit statistics that contain no personal data; the Android app sends anonymous usage statistics and crash reports, which you can turn off in Settings.',
    sections: [
      {
        heading: 'Data we collect',
        paragraphs: [
          'We do not ask for your name, email or any similar personal information. The app has no sign-in. It only sends the usage statistics and crash reports described below, which contain neither your name nor your email.',
        ],
      },
      {
        heading: 'Website visit statistics',
        paragraphs: [
          'The website uses Cloudflare Web Analytics to see how many people visit, which pages they read and which countries visits come from. It sets no cookies, stores nothing in your browser, creates no identifier for you and does not track you across sites.',
          'For each page view Cloudflare receives the page address, the referring page, the browser and device type and the page load time. The country is derived from your IP address; the IP address is not stored in the statistics. We only see totals.',
        ],
        links: [
          { label: 'Cloudflare Web Analytics', href: CLOUDFLARE_WEB_ANALYTICS },
          { label: 'Cloudflare privacy policy', href: CLOUDFLARE_PRIVACY },
        ],
      },
      {
        heading: 'App usage statistics and crash reports',
        paragraphs: [
          'The Android app uses Google Firebase Analytics and Firebase Crashlytics to see which features are used and to fix bugs. It records the screens you open and the page they show (for example which class, race, profession or patch note), the actions you tap (switching tabs, sharing, opening external links, saving or sharing a talent build and the points in it, deleting builds and characters, changing the language, refreshing the data, opening a spell or talent description), the search terms you type in the in-app search, and the app language. When you create a character, its race, class and the name you give it are sent, so do not use your real name as a character name. The names you give builds are not sent.',
          'To keep these records together, the app registers each installation as an anonymous user in Firebase Authentication. This user has no name, email or password, only a random user ID that the usage statistics and crash reports are linked to. After uninstalling, a reinstall creates a new anonymous user.',
          'Firebase also receives the app version, device model, operating system version, device language, the number and length of sessions, and an approximate location (country, city) derived from your IP address. Each installation also gets a random app identifier that is reset when you uninstall the app. The advertising ID is not read.',
          'If the app crashes, Crashlytics sends the error details (where in the code it crashed), the device model and system version, free memory and storage, and the screens and actions just before the crash.',
          'This data is not used for ads, not sold and not shared with anyone other than Google as the service provider. It is processed on Google servers (including in the US); usage statistics are kept for 2 months and crash reports for 90 days. We only see totals and crash reports.',
          'If you do not want this, turn off Settings → Privacy → "Usage statistics and crash reports" in the app; nothing is sent and no anonymous sign-in happens after that. If you want the anonymous user record deleted, contact us on GitHub. The iOS app does not use them at the moment.',
        ],
        links: [
          { label: 'Firebase privacy and security', href: FIREBASE_PRIVACY },
          { label: 'Google privacy policy', href: GOOGLE_PRIVACY },
        ],
      },
      {
        heading: 'What the app stores on your device',
        paragraphs: [
          'The app downloads the patch notes and game data (spells, talents, races, classes) from this website and keeps a copy on your device so it works offline. Your language preference, saved talent builds and characters are also stored only on your device.',
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
        paragraphs: ['The website and the app are not directed at children and do not knowingly collect personal data from anyone.'],
      },
      {
        heading: 'Changes and contact',
        paragraphs: ['If this policy changes, the current version is published on this page. For questions, open an issue on GitHub.'],
        links: [{ label: 'GitHub issues', href: ISSUES }],
      },
    ],
  },
};
