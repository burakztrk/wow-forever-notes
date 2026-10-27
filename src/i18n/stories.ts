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
    ekAria: 'Eastern Kingdoms şematik haritası: Lordaeron kuzeyde, Khaz Modan ortada, Stormwind ve Dark Portal güneyde',
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
    ekAria: 'Schematic map of the Eastern Kingdoms: Lordaeron in the north, Khaz Modan in the middle, Stormwind and the Dark Portal in the south',
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
    notesText: 'Haritalar ve çizimler bu sayfa için hazırlanmış şematik illüstrasyonlardır; ölçek ve konumlar temsilidir.',
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
    notesText: 'The maps and drawings are schematic illustrations made for this page; scale and positions are approximate.',
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
      mapCaption: 'Dun Morogh, şematik harita.',
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
    images: 'Ironforge görüntüsü WoW Forever’dan. Gelbin Mekkatorque, Sicco Thermaplugg ve Troglodyte görselleri Blizzard Entertainment’a aittir (Troglodyte model sayfası: Matthew McKeown).',
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
      mapCaption: 'Dun Morogh, schematic map.',
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
    images: 'Ironforge screenshot from WoW Forever. The Gelbin Mekkatorque, Sicco Thermaplugg and troglodyte images belong to Blizzard Entertainment (troglodyte model sheet: Matthew McKeown).',
  },
};

// ---------------------------------------------------------------- Dwarf

export const DWARF_ART_LABELS: Record<Lang, Record<string, string>> = {
  tr: {
    oneThrone: 'Tek taht, üç klan',
    siege: 'Kuşatma',
    gryphons: 'Grifon binicileri',
    crestAria: 'Üç çekiç: Wildhammer, Bronzebeard ve Dark Iron; kaydırdıkça birbirinden ayrılıyor',
    ekAria: 'Eastern Kingdoms şematik haritası: Ironforge, Grim Batol, Thaurissan ve Blackrock Mountain, Aerie Peak ve Thandol Span',
    sceneAria: 'Blackrock Mountain kesiti: Spire, Depths, Shadowforge ve Molten Core; kaydırdıkça lav yükselir',
    kzAria: 'Second War’da Khaz Modan: Horde’un Ironforge’a ilerleyişi ve Wildhammer grifon binicilerinin yolu',
    worldAria: 'Azeroth ve Outland şematik haritası: Ulduar, Frosthold, Ironforge, Uldaman, Aerie Peak ve Wildhammer Stronghold',
  },
  en: {
    oneThrone: 'One throne, three clans',
    siege: 'Siege',
    gryphons: 'Gryphon riders',
    crestAria: 'Three hammers: Wildhammer, Bronzebeard and Dark Iron; they drift apart as you scroll',
    ekAria: 'Schematic map of the Eastern Kingdoms: Ironforge, Grim Batol, Thaurissan and Blackrock Mountain, Aerie Peak and Thandol Span',
    sceneAria: 'Cross-section of Blackrock Mountain: Spire, Depths, Shadowforge and Molten Core; the lava rises as you scroll',
    kzAria: 'Khaz Modan in the Second War: the Horde’s advance on Ironforge and the route of the Wildhammer gryphon riders',
    worldAria: 'Schematic map of Azeroth and Outland: Ulduar, Frosthold, Ironforge, Uldaman, Aerie Peak and Wildhammer Stronghold',
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
  hammers: { title: string; intro: string; crestCaption: string; clans: Clan[]; mapLabel: string; steps: Step[]; note: string };
  fire: {
    title: string;
    intro: string;
    sceneCaption: string;
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
    mapCaption: string;
    hordeKey: string;
    gryphonKey: string;
    legend: Item[];
    cards: { name: string; text: string; status: string; tone: Step['tone'] }[];
    note: string;
  };
  today: {
    title: string;
    leaderLabel: string;
    leaderRole: string;
    leaderText: string;
    councilLabel: string;
    councilText: string;
    council: Clan[];
    beyondLabel: string;
    beyondTitle: string;
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
      { label: 'Kral', value: 'Magni Bronzebeard' },
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
          text: 'Dark Iron’ların darbe girişimi başarısız olur ve Ironforge’un salonlarında yıllar sürecek bir iç savaş başlar.',
          status: 'İç savaş',
          tone: 'no',
        },
        {
          era: 'Bölünme',
          title: 'Bronzebeard’lar kazanır',
          text: 'Bronzebeard’lar şehri elinde tutar. Wildhammer’lar doğuda Grim Batol’a yerleşir, Dark Iron’lar güneyde, Redridge dağlarında Thaurissan’ı kurar.',
          status: 'Sürgün',
          tone: 'mute',
        },
        {
          era: 'Thaurissan’s War',
          title: 'İki cepheli saldırı',
          text: 'Thaurissan Ironforge’a, karısı Modgud Grim Batol’a saldırır. Madoran şehri savunur, Khardros Modgud’u öldürür ve kaçan Dark Iron ordusu güneyde kıstırılır.',
          status: 'Zafer',
          tone: 'ok',
        },
        {
          era: 'Ragnaros',
          title: 'Ateşin Lordu uyanır',
          text: 'Yenilginin eşiğindeki Thaurissan, Elemental Plane’i yarıp Firelord Ragnaros’u çağırır. Patlama onu öldürür ve dağları parçalar; yerinde Blackrock Mountain yükselir.',
          status: 'Felaket',
          tone: 'no',
        },
        {
          era: 'Thandol Span',
          title: 'Yeni bir ittifak',
          text: 'Modgud’un ölümüyle lanetlenen Grim Batol’u terk eden Wildhammer’lar Hinterlands’te Aerie Peak’i kurar. İki klan dostluklarının simgesi olarak Thandol Span’i inşa eder.',
          status: 'İttifak',
          tone: 'al',
        },
      ],
      note: 'Üç Çekiç Savaşı dwarf dünyasını üçe böldü. Bu yaranın kapanması yüzyıllar sürecek ve ancak Üç Çekiç Konseyi’yle mümkün olacaktı.',
    },
    fire: {
      title: 'Blackrock’ın altında',
      intro: 'Ragnaros’un gelişi Redridge’in dağlarını parçaladı. Yeni volkan Blackrock Mountain’ın kuzeyinde Searing Gorge, güneyinde Burning Steppes oluştu; geride küllü bir çorak kaldı.',
      sceneCaption: 'Blackrock Mountain, şematik kesit. Kaydırdıkça lav yükselir.',
      statLabel: 'Savaşın başlangıcı',
      statAria: '230 yıl',
      statUnit: 'yıl',
      statText: '<strong>Dark Portal’dan yaklaşık 230 yıl önce</strong> başlayan iç savaş, bir klanı Ateşin Lordu’nun kölesi yaptı.',
      statDetail:
        'Ragnaros hayatta kalan Dark Iron’ları köleleştirdi. Dağın altında Shadowforge City’yi kuran bu dwarf’lar, diğer klanlara duydukları nefreti yüzyıllar boyunca taşıdı.',
      places: [
        { tag: 'Kuzey', name: 'Searing Gorge', text: 'Volkanın kuzeyinde yanıp kavrulan vadi.' },
        { tag: 'Merkez', name: 'Blackrock Mountain', text: 'Ragnaros’un yükselttiği volkan; altında Shadowforge City ve Molten Core.' },
        { tag: 'Güney', name: 'Burning Steppes', text: 'Güneyde küle dönen bozkır.' },
      ],
      note: 'Bir klanın hırsı bütün bölgeyi yaktı. Blackrock Mountain, sonraki yüzyıllarda Azeroth’u tehdit eden pek çok gücün kalesi olacaktı.',
    },
    wars: {
      title: 'Dağ düşmedi',
      intro: 'Second War’da Horde Khaz Modan’ı baştan sona istila etti. Ironforge kuşatıldı ama şehir hiç düşmedi.',
      mapCaption: 'Second War’da Khaz Modan, şematik harita.',
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
      leaderLabel: 'Kral',
      leaderRole: 'King of Ironforge',
      leaderText:
        'Cataclysm sırasında Magni, Khaz Modan’ı kurtarmak için Old Ironforge’da bir ritüel yaptı ve elmasa dönüştü. Yıllar sonra Azeroth’un sesi, Speaker olarak uyandı.',
      councilLabel: 'Konsey',
      councilText: 'Magni’nin yokluğunda kızı Moira tahtı kısa süreliğine ele geçirdi. King Varian Wrynn’in aracılığıyla Ironforge’un yönetimi üç klana bölündü.',
      council: [
        { name: 'Muradin Bronzebeard', leader: 'Bronzebeard', text: 'Northrend’den dönen kardeş; Bronzebeard’ları temsil eder.' },
        { name: 'Falstad Wildhammer', leader: 'Wildhammer', text: 'Aerie Peak’in lideri; Wildhammer’ları temsil eder.' },
        { name: 'Moira Thaurissan', leader: 'Dark Iron', text: 'Magni’nin kızı; Dark Iron’ları temsil eder. Oğlu Dagran Thaurissan II iki tahtın da varisi.' },
      ],
      beyondLabel: 'Explorers’ League',
      beyondTitle: 'Uldaman’dan Ulduar’a dwarf izleri',
      mapCaption: 'Azeroth ve Outland, şematik harita. Ölçek ve konumlar temsilidir.',
      routesKey: 'Keşif yolları',
      legend: [
        { name: 'Ulduar', text: 'Storm Peaks’teki Titan şehri; Explorers’ League’in en büyük keşfi' },
        { name: 'Frosthold', text: 'Storm Peaks’te Explorers’ League’in dost olduğu Frostborn dwarf’ları' },
        { name: 'Ironforge', text: 'Hall of Explorers, Explorers’ League’in merkezi' },
        { name: 'Uldaman', text: 'Badlands’teki Titan kasası; Explorers’ League kazıyor' },
        { name: 'Aerie Peak', text: 'Hinterlands’te Wildhammer yuvası' },
        { name: 'Wildhammer Stronghold', text: 'Outland, Shadowmoon Valley’deki Wildhammer üssü' },
      ],
      note: 'Üç Çekiç Savaşı’yla bölünen klanlar sonunda aynı masaya oturdu. Dwarf tarihi, bu yaranın kapanmasının hikayesi.',
    },
    outro: {
      title: 'Taş kadar sağlam',
      text: 'Bölünen, yanan, kuşatılan ama hiç diz çökmeyen bir halk. Great Forge’un ateşi hâlâ yanıyor.',
      nextText: 'Stormwind’den Lordaeron’a: Alliance’ı kuran halkın hikayesi.',
    },
    images: 'Ironforge ekran görüntüsü WoW Forever’dan. Magni Bronzebeard görseli Blizzard Entertainment’a aittir.',
  },
  en: {
    metaDescription: 'The dwarves’ story: earthen origins, the War of the Three Hammers, the coming of Ragnaros, the wars of Khaz Modan and the Council of Three Hammers.',
    overline: 'Story 02',
    lead: 'Descendants of the earthen, shaped from stone by the Titans. They work iron in the heart of the mountain and dig for the past they lost.',
    facts: [
      { label: 'Homeland', value: 'Dun Morogh', extra: 'Khaz Modan' },
      { label: 'Capital', value: 'Ironforge' },
      { label: 'King', value: 'Magni Bronzebeard' },
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
          text: 'A Dark Iron coup fails, and a civil war that will last for years breaks out in the halls of Ironforge.',
          status: 'Civil war',
          tone: 'no',
        },
        {
          era: 'The split',
          title: 'The Bronzebeards win',
          text: 'The Bronzebeards keep the city. The Wildhammers settle Grim Batol to the east; the Dark Irons found Thaurissan in the Redridge Mountains to the south.',
          status: 'Exile',
          tone: 'mute',
        },
        {
          era: 'Thaurissan’s War',
          title: 'A two-pronged attack',
          text: 'Thaurissan strikes Ironforge while his wife Modgud strikes Grim Batol. Madoran holds the city, Khardros kills Modgud, and the fleeing Dark Iron army is trapped in the south.',
          status: 'Victory',
          tone: 'ok',
        },
        {
          era: 'Ragnaros',
          title: 'The Firelord wakes',
          text: 'Facing defeat, Thaurissan breaches the Elemental Plane and summons the Firelord Ragnaros. The blast kills him and shatters the mountains; Blackrock Mountain rises in their place.',
          status: 'Cataclysm',
          tone: 'no',
        },
        {
          era: 'Thandol Span',
          title: 'A new alliance',
          text: 'Leaving Grim Batol, cursed by Modgud’s death, the Wildhammers found Aerie Peak in the Hinterlands. The two clans build the Thandol Span as a sign of their friendship.',
          status: 'Alliance',
          tone: 'al',
        },
      ],
      note: 'The War of the Three Hammers split the dwarven world in three. Healing that wound would take centuries, and only the Council of Three Hammers would manage it.',
    },
    fire: {
      title: 'Beneath Blackrock',
      intro: 'Ragnaros’s arrival shattered the Redridge peaks. Searing Gorge formed north of the new volcano, Blackrock Mountain, and the Burning Steppes to its south; an ashen waste was left behind.',
      sceneCaption: 'Blackrock Mountain, schematic cross-section. As you scroll, the lava rises.',
      statLabel: 'When the war began',
      statAria: '230 years',
      statUnit: 'years',
      statText: 'The civil war that began <strong>about 230 years before the Dark Portal</strong> left one clan enslaved to the Firelord.',
      statDetail:
        'Ragnaros enslaved the surviving Dark Irons. Under the mountain they built Shadowforge City and carried their hatred of the other clans for centuries.',
      places: [
        { tag: 'North', name: 'Searing Gorge', text: 'The scorched valley north of the volcano.' },
        { tag: 'Centre', name: 'Blackrock Mountain', text: 'The volcano Ragnaros raised; Shadowforge City and the Molten Core lie beneath it.' },
        { tag: 'South', name: 'Burning Steppes', text: 'The steppe to the south, burned to ash.' },
      ],
      note: 'One clan’s ambition set a whole region on fire. In the centuries that followed, Blackrock Mountain became the stronghold of many powers that threatened Azeroth.',
    },
    wars: {
      title: 'The mountain held',
      intro: 'In the Second War the Horde overran Khaz Modan from end to end. Ironforge was besieged, but the city never fell.',
      mapCaption: 'Khaz Modan in the Second War, schematic map.',
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
      leaderLabel: 'King',
      leaderRole: 'King of Ironforge',
      leaderText:
        'During the Cataclysm Magni performed a ritual in Old Ironforge to save Khaz Modan and was turned to diamond. Years later he awoke as the voice of Azeroth, the Speaker.',
      councilLabel: 'Council',
      councilText: 'With Magni gone, his daughter Moira briefly seized the throne. With King Varian Wrynn’s help, the rule of Ironforge was divided among the three clans.',
      council: [
        { name: 'Muradin Bronzebeard', leader: 'Bronzebeard', text: 'The brother who came back from Northrend; speaks for the Bronzebeards.' },
        { name: 'Falstad Wildhammer', leader: 'Wildhammer', text: 'Leader of Aerie Peak; speaks for the Wildhammers.' },
        { name: 'Moira Thaurissan', leader: 'Dark Iron', text: 'Magni’s daughter; speaks for the Dark Irons. Her son Dagran Thaurissan II is heir to both thrones.' },
      ],
      beyondLabel: 'Explorers’ League',
      beyondTitle: 'Dwarven footprints from Uldaman to Ulduar',
      mapCaption: 'Azeroth and Outland, schematic map. Scale and positions are approximate.',
      routesKey: 'Expeditions',
      legend: [
        { name: 'Ulduar', text: 'The Titan city in the Storm Peaks; the Explorers’ League’s greatest find' },
        { name: 'Frosthold', text: 'Frostborn dwarves in the Storm Peaks, friends of the Explorers’ League' },
        { name: 'Ironforge', text: 'The Hall of Explorers, home of the Explorers’ League' },
        { name: 'Uldaman', text: 'Titan vault in the Badlands, dug by the Explorers’ League' },
        { name: 'Aerie Peak', text: 'The Wildhammer home in the Hinterlands' },
        { name: 'Wildhammer Stronghold', text: 'Wildhammer base in Outland’s Shadowmoon Valley' },
      ],
      note: 'The clans split by the War of the Three Hammers finally sat at one table. Dwarven history is the story of that wound closing.',
    },
    outro: {
      title: 'Solid as stone',
      text: 'A people split, burned and besieged who never bent the knee. The fire of the Great Forge still burns.',
      nextText: 'From Stormwind to Lordaeron: the people who founded the Alliance.',
    },
    images: 'Ironforge screenshot from WoW Forever. The Magni Bronzebeard image belongs to Blizzard Entertainment.',
  },
};
