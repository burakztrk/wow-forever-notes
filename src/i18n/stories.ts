import type { Lang } from '../config';

// Race story pages (src/pages/[lang]/stories/). Game names stay English in
// both languages, as everywhere on the site. Strings may hold <strong>/<b>
// markup where noted; they are rendered with set:html.

// Labels drawn inside the story maps and drawings (src/lib/stories/gnome-art.ts).
export const GNOME_ART_LABELS: Record<Lang, Record<string, string>> = {
  tr: {
    neighbours: 'Komşular',
    swFalls: 'Stormwind yıkılır',
    hordeInvasion: 'Horde istilası',
    swRefugees: 'Stormwind mültecileri',
    toPortal: 'Dark Portal’a kadar',
    allianceOffensive: 'Alliance taarruzu',
    gnCrisis: 'Gnomeregan krizi',
    exile: 'Sürgün',
    ulduarOrigin: 'Ulduar · köken',
    sSurface: 'Yüzey',
    sUpper: 'Üst kat',
    sWorks: 'Atölye',
    sLower: 'Alt kat',
    sTunnels: 'Tüneller',
    ekAria: 'Eastern Kingdoms haritası: Lordaeron kuzeyde, Khaz Modan ortada, Stormwind ve Dark Portal güneyde',
    dmAria: 'Dun Morogh haritası: Gnomeregan batıda, Ironforge kuzeydoğuda; sürgün ve dönüş yolları',
    worldAria: 'Azeroth ve Outland şematik haritası: Ulduar, Ironforge, Fizzcrank Airstrip, Toshley’s Station',
    gearsAria: 'Birbirine geçen iki dişli: büyük demir Dwarf dişlisi ve küçük bronz Gnome dişlisi',
    sceneAria: 'Gnomeregan kesiti: üç kat, havalandırmalar ve alttan gelen Trogg’lar; kaydırdıkça zehirli gaz yükselir',
  },
  en: {
    neighbours: 'Neighbours',
    swFalls: 'Stormwind falls',
    hordeInvasion: 'Horde invasion',
    swRefugees: 'Stormwind refugees',
    toPortal: 'Back to the Dark Portal',
    allianceOffensive: 'Alliance offensive',
    gnCrisis: 'Gnomeregan crisis',
    exile: 'Exile',
    ulduarOrigin: 'Ulduar · origin',
    sSurface: 'Surface',
    sUpper: 'Upper',
    sWorks: 'Works',
    sLower: 'Lower',
    sTunnels: 'Tunnels',
    ekAria: 'Map of the Eastern Kingdoms: Lordaeron in the north, Khaz Modan in the middle, Stormwind and the Dark Portal in the south',
    dmAria: 'Map of Dun Morogh: Gnomeregan in the west, Ironforge in the north-east; the routes into exile and back',
    worldAria: 'Schematic map of Azeroth and Outland: Ulduar, Ironforge, Fizzcrank Airstrip, Toshley’s Station',
    gearsAria: 'Two meshing gears: a large iron Dwarf gear and a small bronze Gnome gear',
    sceneAria: 'Cross-section of Gnomeregan: three levels, vents and troggs coming up from below; the poison gas rises as you scroll',
  },
};

/** Strings shared by every story page. */
export const STORY_UI: Record<
  Lang,
  { races: string; cue: string; chapter: string; whyItMatters: string; outroLabel: string; nextLabel: string; read: string; soon: string; notesTitle: string; notesText: string; imagesTitle: string }
> = {
  tr: {
    races: 'Irklar',
    cue: 'Hikayeye in',
    chapter: 'Bölüm',
    whyItMatters: 'Neden önemli',
    outroLabel: 'Kapanış',
    nextLabel: 'Sıradaki hikaye',
    read: 'Hikayeyi oku',
    soon: 'Yakında',
    notesTitle: 'Not',
    notesText: 'Çizimler bu sayfa için hazırlanmış şematik illüstrasyonlardır; oyun haritalarındaki işaretlerin konumu yaklaşıktır.',
    imagesTitle: 'Görseller',
  },
  en: {
    races: 'Races',
    cue: 'Into the story',
    chapter: 'Chapter',
    whyItMatters: 'Why it matters',
    outroLabel: 'Epilogue',
    nextLabel: 'Next story',
    read: 'Read the story',
    soon: 'Coming soon',
    notesTitle: 'Note',
    notesText: 'The drawings are schematic illustrations made for this page; the markers on the game maps are placed approximately.',
    imagesTitle: 'Images',
  },
};

type Step = { era: string; title: string; text: string; status: string; tone: 'home' | 'mute' | 'al' | 'ok' | 'no' };
type Item = { name: string; text: string };

export interface GnomeStory {
  metaDescription: string;
  overline: string;
  lead: string;
  facts: { label: string; value: string; extra?: string }[];
  chapters: Record<'origin' | 'kinship' | 'wars' | 'fall' | 'today', string>;
  origin: { title: string; titleNote: string; paragraphs: string[]; stagesLabel: string; stages: Item[]; metal: string; flesh: string; note: string };
  kinship: {
    title: string;
    paragraphs: string[];
    dwarf: string;
    gnome: string;
    resultLabel: string;
    resultTitle: string;
    results: string[];
    note: string;
  };
  wars: { title: string; intro: string; mapLabel: string; steps: Step[]; note: string };
  fall: {
    title: string;
    intro: string;
    sceneCaption: string;
    statLabel: string;
    statAria: string;
    statPrefix: string;
    statSuffix: string;
    statText: string; // may hold <strong>
    statDetail: string;
    exileLabel: string;
    exileTitle: string;
    mapCaption: string;
    exileKey: string;
    legend: Item[];
    places: { tag: string; name: string; text: string }[];
    note: string;
  };
  today: {
    title: string;
    leaderLabel: string;
    leaderText: string;
    tech: Item[];
    beyondLabel: string;
    beyondTitle: string;
    mapCaption: string;
    expeditionsKey: string;
    legend: Item[];
    note: string;
  };
  outro: { title: string; text: string; nextText: string };
  images: string;
}

export const GNOME_STORY: Record<Lang, GnomeStory> = {
  tr: {
    metaDescription: 'Gnome’ların hikayesi: Titan kökeni, Dwarf kardeşliği, büyük savaşlar, Gnomeregan’ın düşüşü ve bugün.',
    overline: 'Hikaye 01',
    lead: 'Titan’ların makinesi olarak doğdular, etten bir halk olarak uyandılar. Boyları kısa, ama icatları Alliance ordularını yıllardır ayakta tutuyor.',
    facts: [
      { label: 'Yurt', value: 'Dun Morogh', extra: 'Khaz Modan' },
      { label: 'Eski başkent', value: 'Gnomeregan', extra: 'kayıp' },
      { label: 'Bugünkü üs', value: 'New Tinkertown' },
      { label: 'Lider', value: 'High Tinker Gelbin Mekkatorque' },
      { label: 'Binek', value: 'Mechanostrider' },
      { label: 'En yakın müttefik', value: 'Ironforge Dwarf’ları' },
    ],
    chapters: { origin: 'Köken', kinship: 'Kardeşlik', wars: 'Savaşlar', fall: 'Düşüş', today: 'Bugün' },
    origin: {
      title: 'Metalden Ete',
      titleNote: '(Curse of Flesh)',
      paragraphs: [
        'İlk gnome’lar et ve kemikten değildi. Titan Watcher Mimiron onları, Titan yapılarının bakımını yapan mekanik hizmetkârlar olarak tasarladı. Bu Mechagnome’lar ne acıkır ne yorulurdu.',
        'Sonra Old Gods’un yaydığı Curse of Flesh, metal ve taş gövdeleri ete ve kemiğe çevirdi. Gnome’lar kırılgan oldu; karşılığında duygu, merak ve özgür irade kazandı.',
      ],
      stagesLabel: 'Gnome’un dönüşüm aşamaları',
      stages: [
        { name: 'Mimiron', text: 'Titan Watcher, tasarımcı' },
        { name: 'Mechagnome', text: 'Metal gövde, programlı görev' },
        { name: 'Curse of Flesh', text: 'Old Gods’un laneti, metal ete döner' },
        { name: 'Gnome', text: 'Organik beden, esnek zihin' },
      ],
      metal: 'Metal',
      flesh: 'Et',
      note: 'Kas gücünü kaybettiler, zihinsel esneklik kazandılar. Gnome tarihinin geri kalanı bu takasın üzerine kurulu.',
    },
    kinship: {
      title: 'Khaz Modan’da iki halk',
      paragraphs: [
        'Dun Morogh’un karlı dağlarında gnome’lar, Ironforge Dwarf’larıyla komşu oldu. İki halk da Titan kökenli olduğu için birbirini kuzen sayar.',
        'Dwarf’lar gnome zekâsını erkenden tanıdı ve onları en yakın askeri müttefikleri kabul etti. Bu bağ, Azeroth’un en uzun soluklu ittifaklarından biri olarak bugün de sürüyor.',
      ],
      dwarf: 'Derin madencilik, demircilik, barut ve ağır silahlar.',
      gnome: 'Dişli, buhar, hidrolik ve ince işçilik isteyen mekanizmalar.',
      resultLabel: 'Buhar ve pirinç',
      resultTitle: 'Eastern Kingdoms’ın en güçlü sanayisi',
      results: ['Buhar tankları', 'Zırhlı araçlar', 'Mekanize tüfekler'],
      note: 'Dwarf hammaddesi gnome tasarımıyla birleşince Khaz Modan, Eastern Kingdoms’ın teknolojik ve askeri kalesine dönüştü. İki halk birlikte, ayrı ayrı olduklarından çok daha güçlüydü.',
    },
    wars: {
      title: 'Cephenin arkasındaki akıl',
      intro: 'Gnome’lar ön safta kaba kuvvetle değil, cepheye gönderdikleri makinelerle savaştı. Kaydırdıkça harita, gnome’ların büyük savaşlardaki yerini adım adım gösteriyor.',
      mapLabel: 'Eastern Kingdoms savaş haritası',
      steps: [
        {
          era: 'Khaz Modan',
          title: 'Dağ kalesi',
          text: 'Eastern Kingdoms’ın ortasında, karlı zirvelerle çevrili Khaz Modan. Ironforge merkezde, Gnomeregan batıda.',
          status: 'Yurt',
          tone: 'home',
        },
        {
          era: 'First War',
          title: 'Stormwind düşer',
          text: 'Horde, Dark Portal’dan geçip Stormwind’i yıkar. Gnome’lar savaşa girmez; tek başına kalan bir krallığın nasıl çöktüğünü uzaktan izler.',
          status: 'Gözlemci',
          tone: 'mute',
        },
        {
          era: 'Alliance of Lordaeron',
          title: 'Birlik kurulur',
          text: 'King Terenas Menethil II ve Lord Anduin Lothar yeni bir ittifak kurar. Human, Dwarf ve High Elf’lerle birlikte gnome’lar da saflara katılır.',
          status: 'Kurucu müttefik',
          tone: 'al',
        },
        {
          era: 'Second War',
          title: 'Makineler cephede',
          text: 'Uçan makineler, denizaltılar, buhar gücü ve ateşli silahlar. Horde, Dark Portal’a kadar geri püskürtülür ve Alliance en büyük zaferini kazanır.',
          status: 'Zafer',
          tone: 'ok',
        },
        {
          era: 'Third War',
          title: 'Hyjal’da yoklar',
          text: 'Lordaeron Scourge’a düşer, Burning Legion’a karşı son savaş Kalimdor’da, Mount Hyjal’da verilir. Gnome’lar orada değildir, çünkü kendi başkentleri çökmektedir.',
          status: 'Katılamadı',
          tone: 'no',
        },
      ],
      note: 'Gnome katkısı asker sayısıyla ölçülmez. Uçan makineler, zırhlı araçlar ve otomatik taretler, Alliance ordusunda birim başına düşen gücü katladı.',
    },
    fall: {
      title: 'Gnomeregan’ın düşüşü',
      intro: 'Third War’dan hemen önce, yerin derinliklerinden gelen ilkel Trogg’lar Gnomeregan’ı bastı. Savaştan yorgun müttefiklerine yük olmak istemeyen gnome’lar, tek başlarına savaşmayı seçti.',
      sceneCaption: 'Gnomeregan’ın alt katları, şematik kesit. Kaydırdıkça gaz yükselir, ışıklar söner.',
      statLabel: 'Radyasyon kararı',
      statAria: 'Yüzde 80',
      statPrefix: '%',
      statSuffix: '',
      statText: '<strong>Gnome nüfusunun yaklaşık %80’i</strong> öldü ya da radyasyonla aklını yitirdi.',
      statDetail:
        'High Tinker Gelbin Mekkatorque, danışmanı Sicco Thermaplugg’un önerisiyle şehri radyasyonla doldurma kararı verdi. Trogg’lar durmadı; zehir gnome’ları vurdu. Thermaplugg sonradan ihanet etti ve şehirde kalan radyasyonlu gnome’ların başına geçti.',
      exileLabel: 'Sürgün ve dönüş',
      exileTitle: 'Gnomeregan’dan Ironforge’a, sonra yeniden kapıya',
      mapCaption: 'Dun Morogh.',
      exileKey: 'Sürgün yolu',
      legend: [
        { name: 'Gnomeregan', text: 'Eski başkent; radyasyonla kaybedildi' },
        { name: 'New Tinkertown', text: 'Şehrin kapısındaki yeni üs' },
        { name: 'Kharanos', text: 'Sürgün yolunun ortasındaki köy' },
        { name: 'Ironforge · Tinker Town', text: 'Dwarf başkentindeki gnome mahallesi' },
        { name: 'Coldridge Valley', text: 'Dun Morogh’un güneydeki vadisi' },
      ],
      places: [
        { tag: 'Eski başkent', name: 'Gnomeregan', text: 'Dun Morogh’un batısındaki teknoloji kenti. Trogg istilası ve radyasyonla tahliye edildi.' },
        { tag: 'Sığınak', name: 'Tinker Town', text: 'Dwarf’ların Ironforge içinde gnome’lara açtığı mahalle. Hem yuva hem atölye oldu.' },
        { tag: 'Yeni üs', name: 'New Tinkertown', text: 'Operation Gnomeregan ile şehrin kapısında kurulan yüzey üssü. Geri dönüşün karargâhı.' },
      ],
      note: 'Felaket gnome’ları pasifleştirmedi. Yönetim anlayışları daha rasyonel, güvenlik odaklı ve askeri mühendisliğe dayalı hâle geldi; Ironforge sürgünü iki halkı hiç olmadığı kadar yaklaştırdı.',
    },
    today: {
      title: 'Alliance’ın teknoloji motoru',
      leaderLabel: 'Lider',
      leaderText:
        'Gnome yönetimi kan bağına değil liyakate dayanır. Mekkatorque, mühendislik dehası ve mantık odaklı kararlarıyla halkını en zor dönemde ayakta tuttu.',
      tech: [
        { name: 'Mechanostrider', text: 'Fiziksel sınırları mühendislikle aşan robotik binek.' },
        { name: 'Uçan makineler', text: 'Second War’dan beri Alliance’ın havadaki gözü.' },
        { name: 'Denizaltılar', text: 'Buhar ve pirinçle suyun altına inen savaş araçları.' },
        { name: 'Zırhlı araçlar', text: 'Dwarf zırhı, gnome motoru. Kuşatmanın ağır yükü.' },
        { name: 'Ateşli silahlar', text: 'Orc ve Tauren gücü karşısında savaş alanını eşitler.' },
        { name: 'Arcane', text: 'Zihinsel disiplin, gnome’ları usta Mage’ler yapar.' },
      ],
      beyondLabel: 'Khaz Modan’ın ötesinde',
      beyondTitle: 'Ulduar’dan Outland’e gnome izleri',
      mapCaption: 'Azeroth ve Outland, şematik harita. Ölçek ve konumlar temsilidir.',
      expeditionsKey: 'Gnome seferleri',
      legend: [
        { name: 'Ulduar', text: 'Northrend, Storm Peaks. Mimiron’un evi; Mechagnome’ların kökeni' },
        { name: 'Fizzcrank Airstrip', text: 'Northrend, Borean Tundra’daki gnome ileri karakolu' },
        { name: 'Ironforge', text: 'Khaz Modan’daki çıkış noktası' },
        { name: 'Dark Portal', text: 'Outland’e açılan geçit' },
        { name: 'Toshley’s Station', text: 'Outland, Blade’s Edge Mountains’taki gnome üssü' },
        { name: 'Mount Hyjal', text: 'Third War’un son cephesi; gnome’lar katılamadı' },
      ],
      note: 'Kaba kuvvette geride kalan Alliance ordusu, gnome mühendisliği ve arcane disipliniyle donanınca en güçlü rakipleriyle eşit şartlarda savaşabildi.',
    },
    outro: {
      title: 'Küçük ama vazgeçilmez',
      text: 'Kayıplarından ders çıkaran, pes etmeyen ve keşfetmeyi bırakmayan bir halk. Gnomeregan’ın kapısında hâlâ ışık yanıyor.',
      nextText: 'Khaz Modan’ın diğer yarısı: Ironforge, Titan mirası ve üç klanın hikayesi.',
    },
    images: 'Ironforge görüntüsü ve haritalar WoW Forever’dan. Mechagnome, Gelbin Mekkatorque, Sicco Thermaplugg ve Troglodyte görselleri Blizzard Entertainment’a aittir (Troglodyte model sayfası: Matthew McKeown).',
  },
  en: {
    metaDescription: 'The gnomes’ story: Titan origins, kinship with the dwarves, the great wars, the fall of Gnomeregan and today.',
    overline: 'Story 01',
    lead: 'They were born as machines of the Titans and woke as a people of flesh. Short in stature, yet their inventions have kept the Alliance’s armies standing for years.',
    facts: [
      { label: 'Homeland', value: 'Dun Morogh', extra: 'Khaz Modan' },
      { label: 'Former capital', value: 'Gnomeregan', extra: 'lost' },
      { label: 'Current base', value: 'New Tinkertown' },
      { label: 'Leader', value: 'High Tinker Gelbin Mekkatorque' },
      { label: 'Mount', value: 'Mechanostrider' },
      { label: 'Closest ally', value: 'The dwarves of Ironforge' },
    ],
    chapters: { origin: 'Origin', kinship: 'Kinship', wars: 'Wars', fall: 'The fall', today: 'Today' },
    origin: {
      title: 'From Metal to Flesh',
      titleNote: '(Curse of Flesh)',
      paragraphs: [
        'The first gnomes were not flesh and bone. The Titan Watcher Mimiron designed them as mechanical servants that kept the Titan works running. These mechagnomes never hungered and never tired.',
        'Then the Curse of Flesh, spread by the Old Gods, turned their metal and stone bodies into flesh and bone. The gnomes became fragile, and in return they gained feeling, curiosity and free will.',
      ],
      stagesLabel: 'Stages of the gnomes’ transformation',
      stages: [
        { name: 'Mimiron', text: 'Titan Watcher, the designer' },
        { name: 'Mechagnome', text: 'Metal body, programmed duty' },
        { name: 'Curse of Flesh', text: 'The Old Gods’ curse turns metal to flesh' },
        { name: 'Gnome', text: 'Organic body, flexible mind' },
      ],
      metal: 'Metal',
      flesh: 'Flesh',
      note: 'They lost muscle and gained a flexible mind. The rest of gnome history is built on that trade.',
    },
    kinship: {
      title: 'Two peoples in Khaz Modan',
      paragraphs: [
        'In the snowy mountains of Dun Morogh the gnomes became neighbours of the Ironforge dwarves. Both peoples have Titan origins, so they call each other cousins.',
        'The dwarves recognised gnomish genius early and took the gnomes as their closest military ally. The bond still stands as one of the longest-lasting alliances on Azeroth.',
      ],
      dwarf: 'Deep mining, smithing, gunpowder and heavy weapons.',
      gnome: 'Gears, steam, hydraulics and mechanisms that need a fine hand.',
      resultLabel: 'Steam and brass',
      resultTitle: 'The strongest industry in the Eastern Kingdoms',
      results: ['Steam tanks', 'Armoured vehicles', 'Mechanised rifles'],
      note: 'Dwarven raw materials met gnomish design, and Khaz Modan became the technological and military fortress of the Eastern Kingdoms. Together the two peoples were far stronger than apart.',
    },
    wars: {
      title: 'The mind behind the front',
      intro: 'Gnomes fought not with brute strength on the front line but with the machines they sent there. As you scroll, the map shows their part in the great wars step by step.',
      mapLabel: 'War map of the Eastern Kingdoms',
      steps: [
        {
          era: 'Khaz Modan',
          title: 'Mountain fortress',
          text: 'Khaz Modan, ringed by snowy peaks in the middle of the Eastern Kingdoms. Ironforge at its heart, Gnomeregan to the west.',
          status: 'Homeland',
          tone: 'home',
        },
        {
          era: 'First War',
          title: 'Stormwind falls',
          text: 'The Horde comes through the Dark Portal and destroys Stormwind. The gnomes stay out of the war and watch from afar as a kingdom left on its own collapses.',
          status: 'Onlooker',
          tone: 'mute',
        },
        {
          era: 'Alliance of Lordaeron',
          title: 'An alliance is formed',
          text: 'King Terenas Menethil II and Lord Anduin Lothar form a new alliance. The gnomes join its ranks alongside humans, dwarves and high elves.',
          status: 'Founding ally',
          tone: 'al',
        },
        {
          era: 'Second War',
          title: 'Machines at the front',
          text: 'Flying machines, submarines, steam power and firearms. The Horde is driven back to the Dark Portal and the Alliance wins its greatest victory.',
          status: 'Victory',
          tone: 'ok',
        },
        {
          era: 'Third War',
          title: 'Absent at Hyjal',
          text: 'Lordaeron falls to the Scourge, and the last stand against the Burning Legion is fought at Mount Hyjal in Kalimdor. The gnomes are not there: their own capital is collapsing.',
          status: 'Could not join',
          tone: 'no',
        },
      ],
      note: 'The gnomish contribution is not measured in soldiers. Flying machines, armoured vehicles and automatic turrets multiplied the strength of every Alliance unit.',
    },
    fall: {
      title: 'The fall of Gnomeregan',
      intro: 'Just before the Third War, primitive troggs from deep underground overran Gnomeregan. Not wanting to burden allies worn out by war, the gnomes chose to fight alone.',
      sceneCaption: 'Gnomeregan’s lower levels, schematic cross-section. As you scroll, the gas rises and the lights go out.',
      statLabel: 'The radiation decision',
      statAria: '80 percent',
      statPrefix: '',
      statSuffix: '%',
      statText: '<strong>About 80% of the gnome population</strong> died or lost their minds to radiation.',
      statDetail:
        'High Tinker Gelbin Mekkatorque, on the advice of Sicco Thermaplugg, decided to flood the city with radiation. The troggs did not stop; the poison struck the gnomes. Thermaplugg later turned traitor and took command of the irradiated gnomes left in the city.',
      exileLabel: 'Exile and return',
      exileTitle: 'From Gnomeregan to Ironforge, then back to the gate',
      mapCaption: 'Dun Morogh.',
      exileKey: 'Route into exile',
      legend: [
        { name: 'Gnomeregan', text: 'Former capital, lost to radiation' },
        { name: 'New Tinkertown', text: 'New base at the city gate' },
        { name: 'Kharanos', text: 'Village halfway along the route into exile' },
        { name: 'Ironforge · Tinker Town', text: 'Gnome quarter in the dwarven capital' },
        { name: 'Coldridge Valley', text: 'Dun Morogh’s southern valley' },
      ],
      places: [
        { tag: 'Former capital', name: 'Gnomeregan', text: 'The city of technology in western Dun Morogh. Evacuated after the trogg invasion and the radiation.' },
        { tag: 'Refuge', name: 'Tinker Town', text: 'The quarter the dwarves opened to the gnomes inside Ironforge. It became both home and workshop.' },
        { tag: 'New base', name: 'New Tinkertown', text: 'The surface base built at the city gate during Operation Gnomeregan. Headquarters of the return.' },
      ],
      note: 'The disaster did not break the gnomes. Their leadership became more rational, more security-minded and more grounded in military engineering, and the exile in Ironforge brought the two peoples closer than ever.',
    },
    today: {
      title: 'The Alliance’s engine of technology',
      leaderLabel: 'Leader',
      leaderText:
        'Gnomes are led by merit, not bloodline. Mekkatorque’s engineering genius and logical decisions kept his people standing through their darkest years.',
      tech: [
        { name: 'Mechanostrider', text: 'A robotic mount that gets past physical limits through engineering.' },
        { name: 'Flying machines', text: 'The Alliance’s eye in the sky since the Second War.' },
        { name: 'Submarines', text: 'War machines of steam and brass that go under the waves.' },
        { name: 'Armoured vehicles', text: 'Dwarven armour, gnomish engine. The heavy end of a siege.' },
        { name: 'Firearms', text: 'They level the field against the strength of orcs and tauren.' },
        { name: 'Arcane', text: 'Mental discipline makes gnomes masterful mages.' },
      ],
      beyondLabel: 'Beyond Khaz Modan',
      beyondTitle: 'Gnome footprints from Ulduar to Outland',
      mapCaption: 'Azeroth and Outland, schematic map. Scale and positions are approximate.',
      expeditionsKey: 'Gnome expeditions',
      legend: [
        { name: 'Ulduar', text: 'Northrend, Storm Peaks. Mimiron’s home, where the mechagnomes began' },
        { name: 'Fizzcrank Airstrip', text: 'Gnome outpost in Northrend’s Borean Tundra' },
        { name: 'Ironforge', text: 'The starting point in Khaz Modan' },
        { name: 'Dark Portal', text: 'The gateway to Outland' },
        { name: 'Toshley’s Station', text: 'Gnome base in Outland’s Blade’s Edge Mountains' },
        { name: 'Mount Hyjal', text: 'The last front of the Third War; the gnomes could not join' },
      ],
      note: 'Outmatched in raw strength, the Alliance armies could face their strongest enemies on equal terms once armed with gnomish engineering and arcane discipline.',
    },
    outro: {
      title: 'Small but indispensable',
      text: 'A people who learn from their losses, never give up and never stop exploring. A light still burns at the gate of Gnomeregan.',
      nextText: 'The other half of Khaz Modan: Ironforge, the Titan legacy and the story of three clans.',
    },
    images: 'Ironforge screenshot and maps from WoW Forever. The Mechagnome image, Gelbin Mekkatorque, Sicco Thermaplugg and troglodyte images belong to Blizzard Entertainment (troglodyte model sheet: Matthew McKeown).',
  },
};

// ---------------------------------------------------------------- Dwarf

export const DWARF_ART_LABELS: Record<Lang, Record<string, string>> = {
  tr: {
    oneThrone: 'Tek taht, üç klan',
    siege: 'Kuşatma',
    gryphons: 'Grifon binicileri',
    crestAria: 'Üç çekiç: Wildhammer, Bronzebeard ve Dark Iron; kaydırdıkça birbirinden ayrılıyor',
    ekAria: 'Eastern Kingdoms haritası: Ironforge, Grim Batol, Thaurissan ve Blackrock Mountain, Aerie Peak ve Thandol Span',
    kzAria: 'Second War’da Khaz Modan haritası: Horde’un Ironforge’a ilerleyişi ve Wildhammer grifon binicilerinin yolu',
    worldAria: 'Azeroth haritası: Ironforge, Uldaman ve Aerie Peak',
  },
  en: {
    oneThrone: 'One throne, three clans',
    siege: 'Siege',
    gryphons: 'Gryphon riders',
    crestAria: 'Three hammers: Wildhammer, Bronzebeard and Dark Iron; they drift apart as you scroll',
    ekAria: 'Map of the Eastern Kingdoms: Ironforge, Grim Batol, Thaurissan and Blackrock Mountain, Aerie Peak and Thandol Span',
    kzAria: 'Map of Khaz Modan in the Second War: the Horde’s advance on Ironforge and the route of the Wildhammer gryphon riders',
    worldAria: 'Map of Azeroth: Ironforge, Uldaman and Aerie Peak',
  },
};

type Clan = { name: string; leader: string; text: string };
type Tagged = { tag: string; name: string; text: string };

export interface DwarfStory {
  metaDescription: string;
  overline: string;
  lead: string;
  facts: { label: string; value: string; extra?: string }[];
  chapters: Record<'origin' | 'hammers' | 'fire' | 'wars' | 'today', string>;
  origin: { title: string; titleNote: string; paragraphs: string[]; stagesLabel: string; stages: Item[]; stone: string; flesh: string; note: string };
  hammers: { title: string; intro: string; more: string[]; crestCaption: string; clans: Clan[]; mapLabel: string; steps: Step[]; note: string };
  fire: {
    title: string;
    intro: string;
    more: string[];
    ragnaros: { label: string; title: string; caption: string; paragraphs: string[] };
    statLabel: string;
    statAria: string;
    statUnit: string;
    statText: string; // may hold <strong>
    statDetail: string;
    places: Tagged[];
    note: string;
  };
  wars: {
    title: string;
    intro: string;
    more: string[];
    mapCaption: string;
    hordeKey: string;
    gryphonKey: string;
    legend: Item[];
    cards: { name: string; text: string; status: string; tone: Step['tone'] }[];
    note: string;
  };
  today: {
    title: string;
    intro: string[];
    councilLabel: string;
    councilText: string;
    council: (Clan & { image?: string })[];
    beyondLabel: string;
    beyondTitle: string;
    beyondText: string[];
    mapCaption: string;
    routesKey: string;
    legend: Item[];
    note: string;
  };
  outro: { title: string; text: string; nextText: string };
  images: string;
}

export const DWARF_STORY: Record<Lang, DwarfStory> = {
  tr: {
    metaDescription: 'Dwarf’ların hikayesi: earthen kökeni, Üç Çekiç Savaşı, Ragnaros’un uyanışı, Khaz Modan savaşları ve Üç Çekiç Konseyi.',
    overline: 'Hikaye 02',
    lead: 'Titan’ların taştan yarattığı earthen’ların torunları. Dağın kalbinde demir döverler, kaybolan geçmişlerini kazarak ararlar.',
    facts: [
      { label: 'Yurt', value: 'Dun Morogh', extra: 'Khaz Modan' },
      { label: 'Başkent', value: 'Ironforge' },
      { label: 'Yönetim', value: 'Üç Çekiç Konseyi' },
      { label: 'Klanlar', value: 'Bronzebeard · Wildhammer · Dark Iron' },
      { label: 'Binek', value: 'Ram' },
      { label: 'En yakın müttefik', value: 'Gnomeregan Gnome’ları' },
    ],
    chapters: { origin: 'Köken', hammers: 'Üç Çekiç', fire: 'Ateş', wars: 'Savaşlar', today: 'Bugün' },
    origin: {
      title: 'Taştan Ete',
      titleNote: '(Curse of Flesh)',
      paragraphs: [
        'İlk dwarf’lar taştandı. Titan’lar, dünyanın derinliklerini şekillendirmek için earthen adında taş gövdeli işçiler yarattı.',
        'Old Gods’un Curse of Flesh’i bu taş gövdeleri ete ve kemiğe çevirdi. Uldaman gibi Titan kasalarında uykuya dalan earthen’lar uyandıklarında kendilerine dwarf dedi. Buz trollerini yenip bu topraklara Khaz Modan adını verdiler ve Ironforge’u dağın altına oydular.',
        'Earthen’lar Titan’ların derinlikteki işçileriydi: taştan ve madenden yapılmışlar, dağların altındaki Titan yapılarını işletmek için yaratılmışlardı. Old Gods’un laneti onları yalnızca değiştirmedi; yarattığı yeni halklar arasında trogg’lar, gnome’lar ve dwarf’lar vardı. Dwarf’lar bu yüzden gnome’ları ve trogg’ları uzak akraba sayar.',
        'Uyanan earthen’lar önce Khaz Modan’ın karlı dağlarında yaşayan buz trolleriyle çarpıştı. Zaferden sonra dağın kalbine, Great Forge’un çevresine kendi şehirlerini kurdular. Madencilik, demircilik ve taş işçiliği o günden beri dwarf kimliğinin özüdür.',
      ],
      stagesLabel: 'Dwarf’ın dönüşüm aşamaları',
      stages: [
        { name: 'Titan', text: 'Dünyanın mimarları' },
        { name: 'Earthen', text: 'Taş gövde, toprağın işçileri' },
        { name: 'Curse of Flesh', text: 'Old Gods’un laneti, taş ete döner' },
        { name: 'Dwarf', text: 'Etten beden, demirci ruhu' },
      ],
      stone: 'Taş',
      flesh: 'Et',
      note: 'Dwarf’lar kökenlerini hiç unutmadı. Explorers’ League bugün hâlâ Titan izlerini kazıyor; geçmişi aramak bu halkın kimliğinin bir parçası.',
    },
    hammers: {
      title: 'Üç Çekiç Savaşı',
      intro: 'Dark Portal açılmadan yaklaşık 230 yıl önce High King Modimus Anvilmar yaşlılıktan öldü. Taht boş kalınca Ironforge’un üç büyük klanı birbirine girdi.',
      more: [
        'Dwarf toplumu o dönemde belirgin çizgilerle ayrılmıştı. Bronzebeard’lar şehirlerin ve orduların, Wildhammer’lar dağların ve açık gökyüzünün, Dark Iron’lar ise büyünün ve madenciliğin klanıydı. Anvilmar’ın ölümüyle bu denge bozuldu: kralın ardından kimin yöneteceğine karar verecek kimse yoktu.',
        'Her klan tahtın kendi hakkı olduğunu savundu. Ironforge’un salonlarında önce tartışma, sonra tehdit, en sonunda kılıç konuştu. Sorcerer-Thane Thaurissan büyüsünü ve zenginliğini kullanarak şehirde güç toplamaya çalıştı; karşısında Bronzebeard’ların kalabalık ordusu ve Wildhammer savaşçıları duruyordu.',
        'Bu savaş yalnızca bir taht kavgası değildi. Aynı kandan gelen halkın üçe bölünmesi, yüzyıllar sonra bile Ironforge siyasetinde hissedilecek bir yara bıraktı: Wildhammer ile Bronzebeard arasındaki güvensizlik de, Dark Iron’lara duyulan öfke de bu yıllardan kaldı.',
      ],
      crestCaption: 'Kaydırdıkça üç çekiç birbirinden ayrılıyor.',
      clans: [
        { name: 'Bronzebeard', leader: 'Thane Madoran Bronzebeard', text: 'En kalabalık ve en savaşçı klan. Ironforge’un ordusu ve tüccarları onlardandı.' },
        { name: 'Wildhammer', leader: 'Thane Khardros Wildhammer', text: 'Dağlarda yaşayan, Bronzebeard’ların kaba bulduğu özgür ruhlu klan.' },
        { name: 'Dark Iron', leader: 'Sorcerer-Thane Thaurissan', text: 'Büyüyle uğraşan, en zengin maden damarlarını elinde tutan ve kimsenin güvenmediği klan.' },
      ],
      mapLabel: 'Üç Çekiç Savaşı haritası',
      steps: [
        {
          era: 'Ironforge',
          title: 'Tek taht, üç klan',
          text: 'Thaurissan şehirde yönetimi ele geçirmeye çalışır; Bronzebeard ve Wildhammer savaşçıları darbeyi püskürtür. Ama barış gelmez: sokaklarda, surlarda ve madenlerde yıllarca sürecek bir iç savaş başlar.',
          status: 'İç savaş',
          tone: 'no',
        },
        {
          era: 'Bölünme',
          title: 'Bronzebeard’lar kazanır',
          text: 'Madoran’ın Bronzebeard’ları Ironforge’u elinde tutar. Wildhammer’lar kendi yollarına gidip doğuda, Wetlands’deki Grim Batol’a yerleşir. Dark Iron’lar şehirden sürülür; Thaurissan güneyde, Redridge dağlarında kendi karargâhını kurar.',
          status: 'Sürgün',
          tone: 'mute',
        },
        {
          era: 'Thaurissan’s War',
          title: 'İki cepheli saldırı',
          text: 'Thaurissan Ironforge’a, karısı Modgud ise Grim Batol’a saldırır. Madoran şehri savunur; Khardros, Modgud’la dövüşüp onu öldürür. Komutanını kaybeden Dark Iron ordusu geri çekilir ve güneyde kıstırılır.',
          status: 'Zafer',
          tone: 'ok',
        },
        {
          era: 'Ragnaros',
          title: 'Ateşin Lordu uyanır',
          text: 'Yenilginin eşiğindeki Thaurissan son kozunu oynar: Elemental Plane’i yarıp Firelord Ragnaros’u çağırır. Ragnaros emir almaya gelmemişti; ortaya çıkışı Thaurissan’ı öldürür, dağları parçalar ve yerinde Blackrock Mountain yükselir. Ayrıntısı bir sonraki bölümde.',
          status: 'Felaket',
          tone: 'no',
        },
        {
          era: 'Thandol Span',
          title: 'Yeni bir ittifak',
          text: 'Modgud’un ölümüyle lanetlenen Grim Batol’u terk eden Wildhammer’lar Hinterlands’te Aerie Peak’i kurar. Savaşın düşmanlığını geride bırakmak isteyen Bronzebeard ve Wildhammer’lar dostluklarının simgesi olarak Thandol Span’i inşa eder.',
          status: 'İttifak',
          tone: 'al',
        },
      ],
      note: 'Üç Çekiç Savaşı dwarf dünyasını üçe böldü. Bu yaranın kapanması yüzyıllar sürecek ve ancak Üç Çekiç Konseyi’yle mümkün olacaktı.',
    },
    fire: {
      title: 'Blackrock’ın altında',
      intro: 'Ragnaros’un gelişi Redridge’in dağlarını parçaladı. Yeni volkan Blackrock Mountain’ın kuzeyinde Searing Gorge, güneyinde Burning Steppes oluştu; geride küllü bir çorak kaldı.',
      more: [
        'Thaurissan’ın yaptığı ritüel, Elemental Plane’in ateş ayağına açılan bir kapıydı. Kapının açıldığı yerde yer kabuğu çatladı: lav, kül ve zehirli gazlar yüzeye fırladı; dağlar bu baskıyla yukarı itilerek Blackrock Mountain’ı oluşturdu.',
        'Çevredeki bozkırlar ve vadiler önce yandı, sonra kül altında kaldı. Dwarf yerleşimleri, madenler ve Dark Iron ordusunun büyük bölümü ilk dalgada yok oldu; hayatta kalanlar Ragnaros’un esiri oldu.',
        'Bu yüzden Blackrock bölgesi bugün de iki ayrı yara gibi duruyor: kuzeyde Searing Gorge, güneyde Burning Steppes.',
      ],
      ragnaros: {
        label: 'Ragnaros’un gelişi',
        title: 'Dağ neden parçalandı?',
        caption: 'Firelord Ragnaros.',
        paragraphs: [
          'Ragnaros Azeroth’un yüzeyinde değil, Elemental Plane’in ateş ayağında, Firelands’de yaşayan bir Elemental Lord’du; yüzeye çıkması için dünyanın dokusunu yırtması gerekiyordu. Thaurissan’ın ritüeli tam bunu yaptı: iki dünya arasındaki perdeyi inceltip Ragnaros’u içeri çekti.',
          'Sorun şuydu ki Redridge’in dağları o kadar ısıya ve basınca dayanamazdı. Ragnaros ortaya çıktığında altındaki kaya eridi, üstündeki sıra dağlar çöküp birbirine geçti ve geriye tek bir devasa, hâlâ yanan volkan kaldı. Dwarf’lar buna Blackrock Mountain dedi.',
          'Thaurissan Ragnaros’u hizmetkâr olarak çağırmıştı ama Firelord kimseye boyun eğmedi. Dark Iron liderinin ölümüyle ritüel kontrolsüz kaldı; Ragnaros hayatta kalan Dark Iron’ları esir alıp dağın içine bağladı. Shadowforge City, bu esir halkın dağın altında kurduğu şehirdi.',
        ],
      },
      statLabel: 'Savaşın başlangıcı',
      statAria: '230 yıl',
      statUnit: 'yıl',
      statText: '<strong>Dark Portal’dan yaklaşık 230 yıl önce</strong> başlayan iç savaş, bir klanı Ateşin Lordu’nun kölesi yaptı.',
      statDetail:
        'Ragnaros hayatta kalan Dark Iron’ları köleleştirdi. Dağın altında Shadowforge City’yi kuran bu dwarf’lar, diğer klanlara duydukları nefreti yüzyıllar boyunca taşıdı.',
      places: [
        { tag: 'Kuzey', name: 'Searing Gorge', text: 'Volkanın hemen kuzeyindeki vadi: patlamanın sıcak kül ve lav yağmuruna tutulup kavruldu. Toprak sertleşti, bitki kalmadı; bugün kızıl taşlı, dumanlı bir kanyon.' },
        { tag: 'Merkez', name: 'Blackrock Mountain', text: 'Ragnaros’un yükselttiği volkan; altında Shadowforge City ve Molten Core.' },
        { tag: 'Güney', name: 'Burning Steppes', text: 'Güneydeki bozkır: Ragnaros’un çıkışıyla gelen ateş yağmuru ve volkanik küller yüzünden önce yandı, sonra kül altında kaldı. Kızıl toprağı ve sürekli tüten ufku bu yüzden.' },
      ],
      note: 'Bir klanın hırsı bütün bölgeyi yaktı. Blackrock Mountain, sonraki yüzyıllarda Azeroth’u tehdit eden pek çok gücün kalesi olacaktı.',
    },
    wars: {
      title: 'Dağ düşmedi',
      intro: 'Second War’da Horde Khaz Modan’ı baştan sona istila etti. Ironforge kuşatıldı ama şehir hiç düşmedi.',
      more: [
        'Horde’un Khaz Modan’daki en büyük gücü Dragonmaw ve Blackrock klanlarıydı. Wildhammer’ların terk ettiği Grim Batol’u kendilerine karargâh yaptılar ve ejderha kraliçesi Alexstrasza’yı orada tutsak ettiler; ejderhalarını savaş makinesi gibi kullandılar.',
        'Ironforge’un savunması şehrin yapısından geliyordu: dağın içine oyulmuş, dar geçitlerle çevrili bir kale. Orc’ların kuşatma silahları dar tünellerde işe yaramadı; Bronzebeard ve Wildhammer’lar yan yana dövüştü.',
      ],
      mapCaption: 'Second War’da Khaz Modan.',
      hordeKey: 'Horde ilerleyişi',
      gryphonKey: 'Wildhammer grifonları',
      legend: [
        { name: 'Ironforge', text: 'Kuşatıldı ama düşmedi' },
        { name: 'Dun Algaz', text: 'Wetlands’e açılan dağ geçidi' },
        { name: 'Grim Batol', text: 'Horde’un Alexstrasza’yı tuttuğu kale' },
        { name: 'Thandol Span', text: 'İki klanın dostluk köprüsü' },
        { name: 'Aerie Peak', text: 'Wildhammer’ların Hinterlands’teki yuvası' },
        { name: 'Blackrock Mountain', text: 'Ragnaros’un volkanı' },
      ],
      cards: [
        { name: 'Ironforge kuşatması', text: 'Horde şehri kuşatır ama içeri giremez. King Magni Bronzebeard savunmayı yönetir; Orgrim Doomhammer sonunda şehri geride bırakıp yoluna devam eder.', status: 'Direndi', tone: 'ok' },
        { name: 'Wildhammer grifonları', text: 'Kurdran Wildhammer’ın grifon binicileri, fırtına çekiçleriyle Horde’a gökten saldırır.', status: 'Alliance’a katıldı', tone: 'al' },
        { name: 'Grim Batol', text: 'Horde, Wildhammer’ların terk ettiği kaleyi ele geçirir ve Ejderha Kraliçesi Alexstrasza’yı orada tutsak eder.', status: 'Kayıp kale', tone: 'no' },
        { name: 'Muradin ve Ashbringer', text: 'Magni’nin kardeşi Muradin, Arthas’la Northrend’e gider ve Frostmourne’un başında öldüğü sanılır. Yas tutan Magni, Ashbringer’ı döver.', status: 'Yas', tone: 'mute' },
      ],
      note: 'Kuşatmadan sonra Magni, krallığını Alliance of Lordaeron’a bağladı. Ironforge’un ayakta kalması Alliance’ın da ayakta kalması demekti.',
    },
    today: {
      title: 'Üç Çekiç Konseyi',
      intro: [
        'Ironforge’un bugün tek bir kralı yok. Magni Bronzebeard, Cataclysm sırasında Khaz Modan’ı kurtarmak için Old Ironforge’da bir ritüel yaptı ve elmasa dönüştü; yıllar sonra Azeroth’un sesi, Speaker olarak uyandı.',
        'Magni’nin yokluğunda tahtı kızı Moira Thaurissan kısa süreliğine ele geçirdi. Dark Iron’lara duyulan eski öfke yeniden alevlendi; King Varian Wrynn’in araya girmesiyle yönetim üç klana bölüştürüldü.',
        'Böylece Üç Çekiç Savaşı’nı başlatan üç klan, yüzyıllar sonra aynı salonda, aynı masaya oturdu.',
      ],
      councilLabel: 'Konsey',
      councilText: 'Üç Çekiç Konseyi’nde her klanın bir temsilcisi var.',
      council: [
        { name: 'Muradin Bronzebeard', leader: 'Bronzebeard', text: 'Northrend’den dönen kardeş; Bronzebeard’ları temsil eder.' },
        { name: 'Falstad Wildhammer', leader: 'Wildhammer', text: 'Aerie Peak’in lideri; Wildhammer’ları temsil eder.' },
        { name: 'Moira Thaurissan', leader: 'Dark Iron', text: 'Magni’nin kızı; Dark Iron’ları temsil eder. Oğlu Dagran Thaurissan II iki tahtın da varisi.' },
      ],
      beyondLabel: 'Explorers’ League',
      beyondTitle: 'Uldaman’dan Ulduar’a dwarf izleri',
      beyondText: [
        'Dwarf’ların geçmişe merakı Khaz Modan’la sınırlı kalmadı. Explorers’ League, Titan kalıntılarının peşinde Uldaman’ın kasalarını kazıyor; Northrend’de Ulduar’ı ve Storm Peaks’teki Frostborn dwarf’larının dostluğunu buldu.',
        'Wildhammer’lar da gökyüzüne bağlılıklarını sürdürüyor: Hinterlands’deki Aerie Peak’in yanında Outland’de, Shadowmoon Valley’de bir üs kurdular. Northrend ve Outland yolculukları bu haritanın dışında kalıyor.',
      ],
      mapCaption: 'Azeroth’ta dwarf izleri. Konumlar yaklaşıktır.',
      routesKey: 'Keşif yolları',
      legend: [
        { name: 'Ironforge', text: 'Hall of Explorers, Explorers’ League’in merkezi' },
        { name: 'Uldaman', text: 'Badlands’teki Titan kasası; Explorers’ League kazıyor' },
        { name: 'Aerie Peak', text: 'Hinterlands’te Wildhammer yuvası' },
      ],
      note: 'Üç Çekiç Savaşı’yla bölünen klanlar sonunda aynı masaya oturdu. Dwarf tarihi, bu yaranın kapanmasının hikayesi.',
    },
    outro: {
      title: 'Taş kadar sağlam',
      text: 'Bölünen, yanan, kuşatılan ama hiç diz çökmeyen bir halk. Great Forge’un ateşi hâlâ yanıyor.',
      nextText: 'Stormwind’den Lordaeron’a: Alliance’ı kuran halkın hikayesi.',
    },
    images: 'Ironforge ekran görüntüsü, Blackrock illüstrasyonu ve haritalar WoW Forever’dan. Burning Steppes çizimi Peter Lee’ye, Ragnaros görseli Blizzard Entertainment’a aittir. Earthen illüstrasyonu (Jon Neilson) ve Bronzebeard görseli Blizzard Entertainment’a aittir.',
  },
  en: {
    metaDescription: 'The dwarves’ story: earthen origins, the War of the Three Hammers, the coming of Ragnaros, the wars of Khaz Modan and the Council of Three Hammers.',
    overline: 'Story 02',
    lead: 'Descendants of the earthen, shaped from stone by the Titans. They work iron in the heart of the mountain and dig for the past they lost.',
    facts: [
      { label: 'Homeland', value: 'Dun Morogh', extra: 'Khaz Modan' },
      { label: 'Capital', value: 'Ironforge' },
      { label: 'Rule', value: 'Council of Three Hammers' },
      { label: 'Clans', value: 'Bronzebeard · Wildhammer · Dark Iron' },
      { label: 'Mount', value: 'Ram' },
      { label: 'Closest ally', value: 'The gnomes of Gnomeregan' },
    ],
    chapters: { origin: 'Origin', hammers: 'Three Hammers', fire: 'Fire', wars: 'Wars', today: 'Today' },
    origin: {
      title: 'From Stone to Flesh',
      titleNote: '(Curse of Flesh)',
      paragraphs: [
        'The first dwarves were made of stone. The Titans created stone-bodied workers called earthen to shape the depths of the world.',
        'The Curse of Flesh, spread by the Old Gods, turned those stone bodies into flesh and bone. The earthen slept in Titan vaults such as Uldaman, and when they woke they called themselves dwarves. They drove off the ice trolls, named the land Khaz Modan and carved Ironforge beneath the mountain.',
        'The earthen were the Titans’ workers of the deep, built of stone and metal to run the Titan works beneath the mountains. The Old Gods’ curse did not simply change them; the peoples it created include the troggs, the gnomes and the dwarves. That is why dwarves count gnomes and troggs as distant kin.',
        'The awakened earthen first clashed with the ice trolls of Khaz Modan’s snowy peaks. After their victory they built their city at the heart of the mountain, around the Great Forge. Mining, smithing and stonework have been the core of dwarven identity ever since.',
      ],
      stagesLabel: 'Stages of the dwarves’ transformation',
      stages: [
        { name: 'Titan', text: 'Architects of the world' },
        { name: 'Earthen', text: 'Stone bodies, workers of the deep' },
        { name: 'Curse of Flesh', text: 'The Old Gods’ curse turns stone to flesh' },
        { name: 'Dwarf', text: 'A body of flesh, a smith’s soul' },
      ],
      stone: 'Stone',
      flesh: 'Flesh',
      note: 'The dwarves never forgot where they came from. The Explorers’ League still digs for Titan traces; searching the past is part of who they are.',
    },
    hammers: {
      title: 'The War of the Three Hammers',
      intro: 'About 230 years before the Dark Portal opened, High King Modimus Anvilmar died of old age. With the throne empty, Ironforge’s three great clans turned on each other.',
      more: [
        'Dwarven society was sharply divided. The Bronzebeards were the clan of cities and armies, the Wildhammers of mountains and open sky, the Dark Irons of sorcery and mining. Anvilmar’s death broke that balance: no one was left to decide who should rule after the king.',
        'Each clan claimed the throne as its right. In the halls of Ironforge it began with arguments, then threats, and finally swords. Sorcerer-Thane Thaurissan used his magic and wealth to gather power in the city, while the large Bronzebeard army and the Wildhammer warriors stood against him.',
        'It was more than a fight over a throne. A people of one blood split three ways, and the wound would be felt in Ironforge politics for centuries: the distrust between Wildhammer and Bronzebeard, and the anger at the Dark Irons, both date from these years.',
      ],
      crestCaption: 'As you scroll, the three hammers drift apart.',
      clans: [
        { name: 'Bronzebeard', leader: 'Thane Madoran Bronzebeard', text: 'The largest and most martial clan. Most of Ironforge’s army and merchants were Bronzebeards.' },
        { name: 'Wildhammer', leader: 'Thane Khardros Wildhammer', text: 'A free-spirited mountain clan the Bronzebeards thought uncouth.' },
        { name: 'Dark Iron', leader: 'Sorcerer-Thane Thaurissan', text: 'Practised sorcery, held the richest veins of ore and gems, and was trusted by no one.' },
      ],
      mapLabel: 'Map of the War of the Three Hammers',
      steps: [
        {
          era: 'Ironforge',
          title: 'One throne, three clans',
          text: 'Thaurissan tries to seize control of the city; Bronzebeard and Wildhammer warriors beat the coup back. Peace does not follow: a civil war that will last for years begins in the streets, on the walls and in the mines.',
          status: 'Civil war',
          tone: 'no',
        },
        {
          era: 'The split',
          title: 'The Bronzebeards win',
          text: 'Madoran’s Bronzebeards keep Ironforge. The Wildhammers go their own way and settle Grim Batol in the Wetlands to the east. The Dark Irons are driven out of the city; Thaurissan makes his own stronghold in the Redridge Mountains to the south.',
          status: 'Exile',
          tone: 'mute',
        },
        {
          era: 'Thaurissan’s War',
          title: 'A two-pronged attack',
          text: 'Thaurissan strikes Ironforge while his wife Modgud strikes Grim Batol. Madoran holds the city; Khardros fights Modgud and kills her. Leaderless, the Dark Iron army falls back and is trapped in the south.',
          status: 'Victory',
          tone: 'ok',
        },
        {
          era: 'Ragnaros',
          title: 'The Firelord wakes',
          text: 'Facing defeat, Thaurissan plays his last card: he breaches the Elemental Plane and summons the Firelord Ragnaros. Ragnaros had not come to take orders; his arrival kills Thaurissan, shatters the mountains and raises Blackrock Mountain in their place. The next chapter has the details.',
          status: 'Cataclysm',
          tone: 'no',
        },
        {
          era: 'Thandol Span',
          title: 'A new alliance',
          text: 'Leaving Grim Batol, cursed by Modgud’s death, the Wildhammers found Aerie Peak in the Hinterlands. Wanting to leave the war’s hostility behind, the Bronzebeards and Wildhammers build the Thandol Span as a sign of their friendship.',
          status: 'Alliance',
          tone: 'al',
        },
      ],
      note: 'The War of the Three Hammers split the dwarven world in three. Healing that wound would take centuries, and only the Council of Three Hammers would manage it.',
    },
    fire: {
      title: 'Beneath Blackrock',
      intro: 'Ragnaros’s arrival shattered the Redridge peaks. Searing Gorge formed north of the new volcano, Blackrock Mountain, and the Burning Steppes to its south; an ashen waste was left behind.',
      more: [
        'Thaurissan’s ritual was a door opened onto the fire side of the Elemental Plane. Where it opened, the crust cracked: lava, ash and poisonous gas burst out, and the mountains were pushed upward by the pressure into Blackrock Mountain.',
        'The steppes and valleys around it burned first, then lay buried in ash. Dwarven settlements, the mines and most of the Dark Iron army were lost in the first wave; the survivors became Ragnaros’s captives.',
        'That is why the Blackrock region still looks like two separate wounds: Searing Gorge to the north and the Burning Steppes to the south.',
      ],
      ragnaros: {
        label: 'The coming of Ragnaros',
        title: 'Why did the mountain break?',
        caption: 'The Firelord Ragnaros.',
        paragraphs: [
          'Ragnaros was an Elemental Lord who lived not on the surface of Azeroth but in the Firelands, on the fire side of the Elemental Plane; to reach the surface he had to tear the fabric of the world. Thaurissan’s ritual did exactly that: it thinned the veil between the two worlds and pulled Ragnaros through.',
          'The trouble was that the mountains of Redridge could not take that much heat and pressure. When Ragnaros emerged, the rock beneath him melted, the ranges above collapsed and folded into each other, and what was left was a single huge volcano that is still burning. The dwarves named it Blackrock Mountain.',
          'Thaurissan had summoned Ragnaros as a servant, but the Firelord bowed to no one. With the Dark Iron leader dead, the ritual was out of control; Ragnaros took the surviving Dark Irons captive and bound them to the mountain. Shadowforge City was the city that enslaved people built beneath it.',
        ],
      },
      statLabel: 'When the war began',
      statAria: '230 years',
      statUnit: 'years',
      statText: 'The civil war that began <strong>about 230 years before the Dark Portal</strong> left one clan enslaved to the Firelord.',
      statDetail:
        'Ragnaros enslaved the surviving Dark Irons. Under the mountain they built Shadowforge City and carried their hatred of the other clans for centuries.',
      places: [
        { tag: 'North', name: 'Searing Gorge', text: 'The valley just north of the volcano: the blast rained hot ash and lava on it and scorched it. The ground hardened and the plants died; today it is a smoking canyon of red stone.' },
        { tag: 'Centre', name: 'Blackrock Mountain', text: 'The volcano Ragnaros raised; Shadowforge City and the Molten Core lie beneath it.' },
        { tag: 'South', name: 'Burning Steppes', text: 'The steppe to the south: the fire rain and volcanic ash from Ragnaros’s arrival burned it first and buried it after. That is why its soil is red and its horizon never stops smoking.' },
      ],
      note: 'One clan’s ambition set a whole region on fire. In the centuries that followed, Blackrock Mountain became the stronghold of many powers that threatened Azeroth.',
    },
    wars: {
      title: 'The mountain held',
      intro: 'In the Second War the Horde overran Khaz Modan from end to end. Ironforge was besieged, but the city never fell.',
      more: [
        'The Horde’s greatest force in Khaz Modan was the Dragonmaw and Blackrock clans. They made Grim Batol, abandoned by the Wildhammers, their stronghold and held the Dragonqueen Alexstrasza captive there, using her dragons as war machines.',
        'Ironforge’s defence came from the city’s shape: a fortress carved into the mountain and ringed by narrow passes. The orcs’ siege engines were useless in tight tunnels, and Bronzebeards and Wildhammers fought side by side.',
      ],
      mapCaption: 'Khaz Modan in the Second War.',
      hordeKey: 'Horde advance',
      gryphonKey: 'Wildhammer gryphons',
      legend: [
        { name: 'Ironforge', text: 'Besieged, never taken' },
        { name: 'Dun Algaz', text: 'The mountain pass to the Wetlands' },
        { name: 'Grim Batol', text: 'Where the Horde held Alexstrasza' },
        { name: 'Thandol Span', text: 'The bridge of the two clans’ friendship' },
        { name: 'Aerie Peak', text: 'The Wildhammer home in the Hinterlands' },
        { name: 'Blackrock Mountain', text: 'Ragnaros’s volcano' },
      ],
      cards: [
        { name: 'The siege of Ironforge', text: 'The Horde besieges the city but cannot get in. King Magni Bronzebeard leads the defence; Orgrim Doomhammer finally leaves the city behind and marches on.', status: 'Held', tone: 'ok' },
        { name: 'Wildhammer gryphons', text: 'Kurdran Wildhammer’s gryphon riders strike the Horde from the sky with their stormhammers.', status: 'Joined the Alliance', tone: 'al' },
        { name: 'Grim Batol', text: 'The Horde takes the fortress the Wildhammers abandoned and holds the Dragonqueen Alexstrasza captive there.', status: 'Lost fortress', tone: 'no' },
        { name: 'Muradin and the Ashbringer', text: 'Magni’s brother Muradin goes to Northrend with Arthas and is believed dead at Frostmourne. In his grief, Magni forges the Ashbringer.', status: 'Mourning', tone: 'mute' },
      ],
      note: 'After the siege Magni pledged his kingdom to the Alliance of Lordaeron. As long as Ironforge stood, the Alliance stood.',
    },
    today: {
      title: 'The Council of Three Hammers',
      intro: [
        'Ironforge no longer has a single king. During the Cataclysm Magni Bronzebeard performed a ritual in Old Ironforge to save Khaz Modan and was turned to diamond; years later he awoke as the voice of Azeroth, the Speaker.',
        'With Magni gone, his daughter Moira Thaurissan briefly seized the throne. Old anger at the Dark Irons flared again; with King Varian Wrynn’s help, the rule of Ironforge was divided among the three clans.',
        'So the three clans that began the War of the Three Hammers sat, centuries later, in the same hall at the same table.',
      ],
      councilLabel: 'Council',
      councilText: 'In the Council of Three Hammers each clan has a representative.',
      council: [
        { name: 'Muradin Bronzebeard', leader: 'Bronzebeard', text: 'The brother who came back from Northrend; speaks for the Bronzebeards.' },
        { name: 'Falstad Wildhammer', leader: 'Wildhammer', text: 'Leader of Aerie Peak; speaks for the Wildhammers.' },
        { name: 'Moira Thaurissan', leader: 'Dark Iron', text: 'Magni’s daughter; speaks for the Dark Irons. Her son Dagran Thaurissan II is heir to both thrones.' },
      ],
      beyondLabel: 'Explorers’ League',
      beyondTitle: 'Dwarven footprints from Uldaman to Ulduar',
      beyondText: [
        'The dwarves’ curiosity about the past did not stop at Khaz Modan. The Explorers’ League digs the vaults of Uldaman in search of Titan remains; in Northrend it found Ulduar and the friendship of the Frostborn dwarves of the Storm Peaks.',
        'The Wildhammers still hold to the sky: besides Aerie Peak in the Hinterlands they built a base in Outland, in Shadowmoon Valley. The journeys to Northrend and Outland fall outside this map.',
      ],
      mapCaption: 'Dwarven footprints on Azeroth. Positions are approximate.',
      routesKey: 'Expeditions',
      legend: [
        { name: 'Ironforge', text: 'The Hall of Explorers, home of the Explorers’ League' },
        { name: 'Uldaman', text: 'Titan vault in the Badlands, dug by the Explorers’ League' },
        { name: 'Aerie Peak', text: 'The Wildhammer home in the Hinterlands' },
      ],
      note: 'The clans split by the War of the Three Hammers finally sat at one table. Dwarven history is the story of that wound closing.',
    },
    outro: {
      title: 'Solid as stone',
      text: 'A people split, burned and besieged who never bent the knee. The fire of the Great Forge still burns.',
      nextText: 'From Stormwind to Lordaeron: the people who founded the Alliance.',
    },
    images: 'Ironforge screenshot, Blackrock illustration and maps from WoW Forever. The Burning Steppes painting is by Peter Lee; the Ragnaros image belongs to Blizzard Entertainment. The earthen illustration (Jon Neilson) and the Bronzebeard image belong to Blizzard Entertainment.',
  },
};
