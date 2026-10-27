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
  {
    races: string;
    cue: string;
    chapter: string;
    whyItMatters: string;
    outroLabel: string;
    nextLabel: string;
    read: string;
    soon: string;
    notesTitle: string;
    notesText: string;
    imagesTitle: string;
    /** The link from a story's origin chapter to the Curse of Flesh page. */
    curseLink: string;
  }
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
    curseLink: 'Lanet nedir, hangi halkları değiştirdi?',
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
    curseLink: 'What was the curse, and which peoples did it change?',
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

// ---------------------------------------------------------------- Human

export const HUMAN_ART_LABELS: Record<Lang, Record<string, string>> = {
  tr: {
    fromDraenor: 'Draenor’dan',
    swBurns: 'Stormwind yanar',
    exodus: 'Lothar ve mülteciler',
    hordeNorth: 'Horde kuzeye',
    portalFalls: 'Portal yıkılır',
    toNorthrend: 'Northrend’e',
    toKalimdor: 'Kalimdor’a',
    kingdomsAria: 'Eastern Kingdoms haritası: Strom’dan yayılan yedi insan krallığı; Stromgarde, Lordaeron, Dalaran, Alterac, Gilneas, Kul Tiras ve Stormwind',
    ekAria: 'Eastern Kingdoms haritası: Dark Portal ve Stormwind güneyde, Lordaeron kuzeyde; First War ve Second War adım adım',
    plagueAria: 'Third War’da Lordaeron haritası: vebanın Andorhal’dan Stratholme’a yayılışı, Arthas’ın Northrend yolu ve dönüşü, Dalaran ve Jaina’nın batıya göçü',
    westfallAria: 'Westfall haritası: Stormwind’den Moonbrook’a ustaların yolu, Sentinel Hill ve Saldean’s Farm',
    worldAria: 'Azeroth haritası: Stormwind, Theramore, Southshore, Stromgarde, Scarlet Monastery ve Light’s Hope Chapel',
  },
  en: {
    fromDraenor: 'From Draenor',
    swBurns: 'Stormwind burns',
    exodus: 'Lothar and the refugees',
    hordeNorth: 'The Horde marches north',
    portalFalls: 'The Portal falls',
    toNorthrend: 'To Northrend',
    toKalimdor: 'To Kalimdor',
    kingdomsAria: 'Map of the Eastern Kingdoms: the seven human kingdoms that grew out of Strom; Stromgarde, Lordaeron, Dalaran, Alterac, Gilneas, Kul Tiras and Stormwind',
    ekAria: 'Map of the Eastern Kingdoms: the Dark Portal and Stormwind in the south, Lordaeron in the north; the First and Second Wars step by step',
    plagueAria: 'Map of Lordaeron in the Third War: the plague spreading from Andorhal to Stratholme, Arthas’s road to Northrend and back, Dalaran and Jaina’s journey west',
    westfallAria: 'Map of Westfall: the stonemasons’ road from Stormwind to Moonbrook, Sentinel Hill and Saldean’s Farm',
    worldAria: 'Map of Azeroth: Stormwind, Theramore, Southshore, Stromgarde, Scarlet Monastery and Light’s Hope Chapel',
  },
};

type Card = { name: string; text: string; status: string; tone: Step['tone'] };

export interface HumanStory {
  metaDescription: string;
  overline: string;
  lead: string;
  facts: { label: string; value: string; extra?: string }[];
  chapters: Record<'origin' | 'arathor' | 'wars' | 'fall' | 'today', string>;
  origin: { title: string; titleNote: string; paragraphs: string[]; stagesLabel: string; stages: Item[]; giant: string; human: string; note: string };
  arathor: {
    title: string;
    intro: string;
    more: string[];
    statLabel: string;
    statAria: string;
    statUnit: string;
    statText: string; // may hold <strong>
    statDetail: string;
    kingdomsLabel: string;
    kingdomsTitle: string;
    mapCaption: string;
    routesKey: string;
    legend: Item[];
    note: string;
  };
  wars: { title: string; intro: string; mapLabel: string; steps: Step[]; cards: Card[]; note: string };
  fall: {
    title: string;
    intro: string;
    more: string[];
    mapCaption: string;
    plagueKey: string;
    arthasKey: string;
    jainaKey: string;
    legend: Item[];
    cards: Card[];
    note: string;
  };
  today: {
    title: string;
    intro: string[];
    throneLabel: string;
    throneText: string;
    throne: (Item & { role: string })[];
    defiasLabel: string;
    defiasTitle: string;
    defiasText: string[];
    westfallCaption: string;
    defiasKey: string;
    westfallLegend: Item[];
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

export const HUMAN_STORY: Record<Lang, HumanStory> = {
  tr: {
    metaDescription:
      'Human’ların hikayesi: vrykul kökeni, Arathor ve Troll Wars, yedi krallık, Stormwind’in düşüşü, Alliance of Lordaeron, Lordaeron’un çöküşü ve kralsız Stormwind.',
    overline: 'Hikaye 03',
    lead: 'Devlerin saklanan çocukları. Krallıkları iki kez yıkıldı, iki kez yeniden kuruldu; Alliance’ı bir arada tutan halk onlar.',
    facts: [
      { label: 'Yurt', value: 'Elwynn Forest', extra: 'Eastern Kingdoms' },
      { label: 'Başkent', value: 'Stormwind City' },
      { label: 'Hükümdar', value: 'Anduin Wrynn', extra: 'kral vekili Bolvar Fordragon' },
      { label: 'Kökler', value: 'Arathor', extra: 'Strom' },
      { label: 'Binek', value: 'At' },
      { label: 'En yakın müttefik', value: 'Ironforge Dwarf’ları' },
    ],
    chapters: { origin: 'Köken', arathor: 'Arathor', wars: 'Savaşlar', fall: 'Düşüş', today: 'Bugün' },
    origin: {
      title: 'Titan’ların Çocukları',
      titleNote: '(Curse of Flesh)',
      paragraphs: [
        'İnsanların hikayesi Northrend’in buzlu dağlarında, devlerle başlar. Titan’lar dünyayı korumaları için vrykul adında dev savaşçılar yarattı.',
        'Old Gods’un Curse of Flesh’i vrykul’lara da ulaştı. Bir gün vrykul anneleri küçük, zayıf ve kısa ömürlü bebekler doğurmaya başladı. Kral Ymiron bu çocukların öldürülmesini emretti.',
        'Bazı aileler emre karşı gelip çocuklarını sakladı. Kurtulan bu çocukların torunları zamanla güneye, Eastern Kingdoms’ın kuzeyine yayıldı ve dev atalarını unuttu. Onlar ilk insanlardı.',
        'İlk insanlar küçük, dağınık kabileler hâlinde yaşadı; avlandılar, toprak için birbirleriyle savaştılar. Kabilelerin en güçlüsü, Lordaeron’un güneyindeki yaylalarda yaşayan Arathi’ydi.',
      ],
      stagesLabel: 'Human’ın doğuş aşamaları',
      stages: [
        { name: 'Titan', text: 'Dünyanın mimarları' },
        { name: 'Vrykul', text: 'Northrend’in dev savaşçıları' },
        { name: 'Curse of Flesh', text: 'Old Gods’un laneti, küçük ve ölümlü bebekler' },
        { name: 'Human', text: 'Kısa ömür, hızlı uyum' },
      ],
      giant: 'Dev',
      human: 'İnsan',
      note: 'Gnome ve Dwarf gibi insanların kökü de Titan’lara uzanıyor; ama onlar taştan ya da metalden değil, Titan’ların dev savaşçılarından geliyor. Kısa ömürlerini hızla çoğalıp her yere yayılarak telafi ettiler.',
    },
    arathor: {
      title: 'Strom’dan yedi krallığa',
      intro:
        'Dark Portal’dan yaklaşık 2.800 yıl önce Arathi şefi Thoradin, insan kabilelerini tek bayrak altında topladı. Arathi Highlands’te Strom şehrini kurdu ve ilk insan ulusunu ilan etti: Arathor.',
      more: [
        'Thoradin’in acelesi vardı: kuzeyde Amani trolleri büyük bir ordu topluyordu. Trollerin asıl hedefi Quel’Thalas’taki high elf’lerdi. Kuşatılan elf’ler yardım istemek için Strom’a geldi.',
        'Thoradin bir şart koştu: elf’ler insanlara büyü öğretecekti. Elf’ler kabul etti. Troll Wars’da insan ve elf orduları Alterac Mountains’ın eteklerinde trollerle karşılaştı; büyücülerin yağdırdığı ateş trolleri dağıttı ve Amani imparatorluğu bir daha eski gücüne kavuşamadı.',
        'Zaferden sonra elf’ler, Arathi soyuna her zaman yardım edeceklerine yemin etti. Bu yemin, binlerce yıl sonra Arathi soyunun son temsilcisi Anduin Lothar yardım istediğinde yeniden gündeme gelecekti.',
        'Büyü insanlara güç verdi ama bir bedeli vardı: dikkatsizce kullanılan büyü Burning Legion’ın şeytanlarını Azeroth’a çekti. İnsan büyücüler ve elf’ler gizlice Council of Tirisfal’ı kurdu ve tek bir koruyucuya, Guardian of Tirisfal’a büyük bir güç emanet etti. Bu unvanın son sahibi Medivh olacaktı.',
        'Arathor büyüdükçe dağıldı. Büyücüler kuzeyde kendi şehirleri Dalaran’ı kurdu, yeni şehirler kuzeye ve batıya yayıldı. Strom’un soylu ailelerinin bir kısmı güneye göçüp Azeroth krallığını ve başkenti Stormwind’i kurdu; Strom ise Stromgarde adıyla kaldı. Tek ulus, sonunda yedi krallığa bölündü.',
      ],
      statLabel: 'Elf’lerin pazarlığı',
      statAria: '100 insan büyücü',
      statUnit: 'büyücü',
      statText: 'High elf’ler <strong>yüz insana</strong> büyü öğretti; Troll Wars’un kaderini bu ilk insan büyücüler değiştirdi.',
      statDetail: 'Thoradin elf’lere yardımı, insanlara büyü öğretilmesi şartıyla kabul etti. İnsan büyücülüğünün ve sonradan Dalaran’ın kökü bu pazarlık.',
      kingdomsLabel: 'Yedi krallık',
      kingdomsTitle: 'Arathor’un mirasçıları',
      mapCaption: 'Dark Portal açılmadan önce yedi insan krallığı. Kul Tiras’ın konumu yaklaşıktır.',
      routesKey: 'Arathor’dan yayılış',
      legend: [
        { name: 'Stromgarde', text: 'Arathor’un eski başkenti Strom; King Thoras Trollbane' },
        { name: 'Lordaeron', text: 'En büyük ve en güçlü krallık; King Terenas Menethil II' },
        { name: 'Dalaran', text: 'Büyücüler şehri; Kirin Tor yönetir' },
        { name: 'Alterac', text: 'Dağlardaki küçük krallık; Lord Aiden Perenolde' },
        { name: 'Gilneas', text: 'Güneybatıdaki yarımada; King Genn Greymane' },
        { name: 'Kul Tiras', text: 'Denizlerin hâkimi ada krallığı; Lord Admiral Daelin Proudmoore' },
        { name: 'Stormwind', text: 'Güneydeki Azeroth krallığı; King Llane Wrynn' },
      ],
      note: 'Yedi krallık aynı kökten geldi ama hiçbir zaman tek bayrak altında birleşmedi. Bunu ancak dışarıdan gelen bir tehdit yapabilecekti.',
    },
    wars: {
      title: 'Stormwind yandı, Alliance doğdu',
      intro:
        'Dark Portal’ın açılmasıyla yüzyıllardır birbirinden uzak duran krallıkların sessiz dönemi bitti. Kaydırdıkça harita, iki büyük savaşı adım adım gösteriyor.',
      mapLabel: 'First War ve Second War haritası',
      steps: [
        {
          era: 'Dark Portal',
          title: 'Kapı açılır',
          text: 'Son Guardian of Tirisfal olan Medivh, Sargeras’ın etkisi altındadır. Orc büyücüsü Gul’dan’la birlikte Black Morass’ta, Draenor’a açılan Dark Portal’ı açar. Horde, Azeroth krallığının topraklarına girer.',
          status: 'İstila',
          tone: 'no',
        },
        {
          era: 'First War',
          title: 'Stormwind düşer',
          text: 'King Llane’in komutanı Anduin Lothar savunmayı yönetir; Lothar, genç büyücü Khadgar ve yarı-orc Garona, Karazhan’da Medivh’i öldürür. Ama Garona, Horde adına King Llane’i öldürür ve Horde Stormwind’i yakıp yıkar.',
          status: 'Yıkım',
          tone: 'no',
        },
        {
          era: 'Exodus',
          title: 'Denizi aşan halk',
          text: 'Lothar, hayatta kalanları ve küçük Prince Varian’ı gemilere bindirip kuzeye, Lordaeron’a götürür. Azeroth krallığından geriye bir mülteci kafilesi kalmıştır.',
          status: 'Sürgün',
          tone: 'mute',
        },
        {
          era: 'Alliance of Lordaeron',
          title: 'Yedi sancak, tek ordu',
          text: 'King Terenas Menethil II insan krallıklarını Lordaeron’da toplar ve Alliance of Lordaeron kurulur; komuta Lothar’a verilir. Lothar Arathi soyunun son temsilcisi olduğu için high elf’ler eski yeminlerine uyar; Ironforge Dwarf’ları ve Gnome’lar da saflara katılır.',
          status: 'İttifak',
          tone: 'al',
        },
        {
          era: 'Second War',
          title: 'Blackrock’ta zafer',
          text: 'Horde Khaz Modan’dan Lordaeron’a kadar ilerler ve Quel’Thalas’ın ormanlarını yakar. Alliance onu güneye geri püskürtür. Lothar, Blackrock Spire önünde Orgrim Doomhammer’la dövüşürken ölür; komutayı alan Turalyon zaferi kazanır ve Dark Portal yıkılır.',
          status: 'Zafer',
          tone: 'ok',
        },
      ],
      cards: [
        {
          name: 'Alterac’ın ihaneti',
          text: 'Lord Aiden Perenolde krallığını kurtarmak için Horde’la gizlice anlaştı. İhanet ortaya çıkınca Perenolde tutuklandı ve Alterac, Lordaeron’un yönetimine geçti.',
          status: 'İhanet',
          tone: 'no',
        },
        {
          name: 'Toplama kampları',
          text: 'Savaştan sonra yakalanan orc’lar kamplara kapatıldı. Kampların masrafı Alliance krallıklarına vergi olarak yüklendi ve hoşnutsuzluk büyüdü.',
          status: 'Ağır yük',
          tone: 'mute',
        },
        {
          name: 'Çatlayan ittifak',
          text: 'Vergilerden bıkan Gilneas Alliance’tan ayrıldı ve Greymane Wall’u ördü. Stromgarde ve Quel’Thalas da çekildi; Alliance zaferden sonra dağılmaya başladı.',
          status: 'Dağılma',
          tone: 'no',
        },
        {
          name: 'Stormwind yeniden',
          text: 'Lordaeron’un desteğiyle Stormwind yeniden inşa edildi ve genç Varian Wrynn babasının tahtına oturdu. Şehri Stonemasons’ Guild ayağa kaldırdı.',
          status: 'Yeniden doğuş',
          tone: 'ok',
        },
      ],
      note: 'Alliance, insan krallıklarını ilk kez aynı sancak altında topladı. Ama zafer, onu bir arada tutan korkuyu da ortadan kaldırdı.',
    },
    fall: {
      title: 'Lordaeron’un düşüşü',
      intro:
        'Second War’dan yıllar sonra kuzeyde bir veba başladı. Kel’Thuzad’ın Cult of the Damned tarikatı Lordaeron’un köylerine zehirli tahıl dağıttı; tahılı yiyenler ölüp Scourge’un ölümsüz askerleri olarak kalktı.',
      more: [
        'Veliaht Prens Arthas Menethil ve genç büyücü Jaina Proudmoore vebanın izini Andorhal’dan Stratholme’a kadar sürdü. Stratholme halkının çoktan zehirlendiğini anlayan Arthas şehri arındırma kararı verdi; Uther ve Jaina ona sırtını döndü.',
        'Arthas vebanın kaynağını yok etmek için Northrend’e gitti. Orada lanetli kılıç Frostmourne’u aldı ve Lich King’in hizmetine girdi. Lordaeron’a döndüğünde babası King Terenas’ı taht odasında öldürdü; en büyük insan krallığı Scourge’a düştü.',
        'Sonra sıra Dalaran’a geldi: Scourge’un çağırdığı Burning Legion komutanı Archimonde, büyücüler şehrini yerle bir etti. Gizemli bir peygamberin uyarısına kulak veren Jaina, hayatta kalanları denizden batıya, Kalimdor’a götürdü.',
        'Kalimdor’da insanlar, eski düşmanları orc’lar ve night elf’lerle omuz omuza Mount Hyjal’da Burning Legion’ı durdurdu. Savaştan sonra Jaina, Dustwallow Marsh kıyısında Theramore’u kurdu. Lordaeron’un yerinde bugün Plaguelands var.',
      ],
      mapCaption: 'Third War’da Lordaeron. Northrend ve Kalimdor haritanın dışında.',
      plagueKey: 'Veba ve Scourge',
      arthasKey: 'Arthas’ın yolu',
      jainaKey: 'Jaina’nın göçü',
      legend: [
        { name: 'Andorhal', text: 'Vebalı tahılın dağıtıldığı kasaba' },
        { name: 'Stratholme', text: 'Arthas’ın arındırdığı şehir' },
        { name: 'Lordaeron', text: 'Başkent; King Terenas burada öldürüldü' },
        { name: 'Dalaran', text: 'Archimonde’un yıktığı büyücüler şehri' },
      ],
      cards: [
        {
          name: 'Stratholme’un arındırılması',
          text: 'Arthas, halkı ölümsüze dönüşmeden önce şehri kılıçtan geçirdi. Uther ve Jaina bu emre karşı çıktı.',
          status: 'Arındırma',
          tone: 'no',
        },
        {
          name: 'Frostmourne',
          text: 'Northrend’de Arthas lanetli kılıcı aldı. Yanındaki dwarf Muradin Bronzebeard, kılıcın laneti yüzünden yere yığıldı.',
          status: 'Lanet',
          tone: 'mute',
        },
        {
          name: 'Kralın ölümü',
          text: 'Lordaeron, dönen prensini zafer şenliğiyle karşıladı. Arthas taht odasında babasını öldürdü ve krallığı Lich King’e teslim etti.',
          status: 'Düşüş',
          tone: 'no',
        },
        {
          name: 'Batıya göç',
          text: 'Jaina Proudmoore hayatta kalanları Kalimdor’a götürdü ve savaştan sonra Theramore’u kurdu. Lordaeron’un mültecileri yeni bir yurt buldu.',
          status: 'Yeni yurt',
          tone: 'al',
        },
      ],
      note: 'Lordaeron’un düşüşü insan dünyasının ağırlık merkezini güneye kaydırdı. Alliance’ın kalbi artık bir kez yıkılıp yeniden kurulan Stormwind’de atıyor.',
    },
    today: {
      title: 'Kralsız taht',
      intro: [
        'Third War’dan sonra Stormwind, insanların en güçlü krallığı olarak kaldı. Ama şehrin kendi yaraları var: King Varian Wrynn, bir barış görüşmesi için Theramore’a giderken ortadan kayboldu.',
        'Tahtta şimdi Varian’ın küçük oğlu Anduin oturuyor. Krallığı onun adına Highlord Bolvar Fordragon yönetiyor; sarayda ise soylu danışman Lady Katrana Prestor’un sözü giderek ağırlaşıyor.',
        'Oyuncuların Elwynn Forest’ta ilk adımlarını attığı Stormwind işte bu Stormwind: başkent ayakta, ama sınırlarında Defias haydutları, Blackrock orc’ları ve Duskwood’un gölgeleri dolaşıyor.',
      ],
      throneLabel: 'Taht',
      throneText: 'Stormwind tahtının bugünkü hâli.',
      throne: [
        {
          role: 'Kayıp kral',
          name: 'Varian Wrynn',
          text: 'First War’da babasını kaybeden prens, yeniden kurulan Stormwind’in kralı oldu. Theramore yolunda kayboldu; nerede olduğunu kimse bilmiyor.',
        },
        { role: 'Çocuk kral', name: 'Anduin Wrynn', text: 'Varian’ın oğlu. Babası kaybolduğunda henüz çocuktu; taç onun adına korunuyor.' },
        { role: 'Kral vekili', name: 'Bolvar Fordragon', text: 'Stormwind’in paladin komutanı. Anduin büyüyene kadar krallığı onun adına yönetiyor.' },
      ],
      defiasLabel: 'Defias Brotherhood',
      defiasTitle: 'Ücreti ödenmeyen ustalar',
      defiasText: [
        'Stormwind’i küllerinden yeniden kuran Stonemasons’ Guild, iş bitince ücretini alamadı: House of Nobles ödemeyi reddetti. Çıkan karışıklıkta ustaların lideri Edwin VanCleef şehirden ayrıldı.',
        'Ustalar Westfall’a çekilip Defias Brotherhood’u kurdu. Westfall’un çiftlikleri boşaldı, yollar haydutların eline geçti; Moonbrook’un altındaki Deadmines’ta gizli bir savaş gemisi inşa ediliyor. Sentinel Hill’deki People’s Militia direnmeye çalışıyor.',
      ],
      westfallCaption: 'Westfall.',
      defiasKey: 'Ustaların yolu',
      westfallLegend: [
        { name: 'Sentinel Hill', text: 'People’s Militia’nın karargâhı' },
        { name: 'Moonbrook', text: 'Deadmines’ın girişi; Defias’ın kalbi' },
        { name: 'Saldean’s Farm', text: 'Westfall’da hâlâ ekilip biçilen birkaç çiftlikten biri' },
      ],
      beyondLabel: 'Stormwind’in ötesinde',
      beyondTitle: 'Dağılmış bir halkın kaleleri',
      beyondText: [
        'Stormwind dışındaki insanlar da direniyor. Lordaeron’un hayatta kalanlarından Scarlet Crusade, ölümsüzlere karşı savaşı fanatizme vardırdı; Argent Dawn ise Light’s Hope Chapel’dan daha ölçülü bir mücadele yürütüyor.',
        'Arathi Highlands’te Stromgarde, Syndicate’e ve ogre’lara karşı eski başkentini korumaya çalışıyor. Hillsbrad’deki Southshore ayakta; Gilneas ise Greymane Wall’un ardında kapılarını kapattı. Kalimdor’da Jaina Proudmoore’un Theramore’u, Alliance’ın batıdaki kalesi.',
      ],
      mapCaption: 'Azeroth’ta insan kaleleri. Konumlar yaklaşıktır.',
      routesKey: 'Alliance yolları',
      legend: [
        { name: 'Stormwind', text: 'Alliance’ın başkenti' },
        { name: 'Theramore', text: 'Jaina’nın Kalimdor’daki şehri' },
        { name: 'Southshore', text: 'Hillsbrad’de ayakta kalan kasaba' },
        { name: 'Stromgarde', text: 'Arathor’un eski başkenti, kuşatma altında' },
        { name: 'Scarlet Monastery', text: 'Scarlet Crusade’in Tirisfal’daki kalesi' },
        { name: 'Light’s Hope Chapel', text: 'Argent Dawn’ın Plaguelands’teki üssü' },
      ],
      note: 'Bölünmüş, kralı kayıp, ama ayakta. İnsanlar hiçbir zaman tek başına en güçlü halk olmadı; güçlerini bir araya getirdikleri halklardan aldılar.',
    },
    outro: {
      title: 'İki kez yıkılan, iki kez kurulan',
      text: 'Saklanan dev çocuklarından Alliance’ın kurucularına. Stormwind’in kapısında kahramanların heykelleri nöbet tutuyor; tahtın sahibi ise hâlâ yolda.',
      nextText: 'Kalimdor’un en eski halkı: Kaldorei, Well of Eternity ve Teldrassil.',
    },
    images:
      'Haritalar WoW Forever’dan. Stormwind kapısı görselindeki World of Warcraft karakterleri ve mekânları Blizzard Entertainment’a aittir.',
  },
  en: {
    metaDescription:
      'The humans’ story: vrykul origins, Arathor and the Troll Wars, the seven kingdoms, the fall of Stormwind, the Alliance of Lordaeron, the fall of Lordaeron and a Stormwind without its king.',
    overline: 'Story 03',
    lead: 'The hidden children of giants. Their kingdoms fell twice and rose twice; they are the people who hold the Alliance together.',
    facts: [
      { label: 'Homeland', value: 'Elwynn Forest', extra: 'Eastern Kingdoms' },
      { label: 'Capital', value: 'Stormwind City' },
      { label: 'Ruler', value: 'Anduin Wrynn', extra: 'regent Bolvar Fordragon' },
      { label: 'Roots', value: 'Arathor', extra: 'Strom' },
      { label: 'Mount', value: 'Horse' },
      { label: 'Closest ally', value: 'The dwarves of Ironforge' },
    ],
    chapters: { origin: 'Origin', arathor: 'Arathor', wars: 'Wars', fall: 'The fall', today: 'Today' },
    origin: {
      title: 'Children of the Titans',
      titleNote: '(Curse of Flesh)',
      paragraphs: [
        'The human story begins with giants, in the frozen mountains of Northrend. The Titans created giant warriors called vrykul to guard the world.',
        'The Curse of Flesh, spread by the Old Gods, reached the vrykul too. One day vrykul mothers began to give birth to small, weak, short-lived babies. King Ymiron ordered those children killed.',
        'Some families defied the order and hid their children. The descendants of the children who survived spread south over time, into the north of the Eastern Kingdoms, and forgot their giant ancestors. They were the first humans.',
        'The first humans lived as small, scattered tribes; they hunted and fought each other for land. The strongest tribe was the Arathi, who lived in the highlands south of Lordaeron.',
      ],
      stagesLabel: 'Stages of the humans’ beginning',
      stages: [
        { name: 'Titan', text: 'Architects of the world' },
        { name: 'Vrykul', text: 'The giant warriors of Northrend' },
        { name: 'Curse of Flesh', text: 'The Old Gods’ curse: small, mortal babies' },
        { name: 'Human', text: 'A short life, quick to adapt' },
      ],
      giant: 'Giant',
      human: 'Human',
      note: 'Like gnomes and dwarves, humans trace their roots to the Titans; but they come not from stone or metal but from the Titans’ giant warriors. They made up for their short lives by multiplying fast and spreading everywhere.',
    },
    arathor: {
      title: 'From Strom to seven kingdoms',
      intro:
        'About 2,800 years before the Dark Portal, Thoradin, chieftain of the Arathi, gathered the human tribes under one banner. He built the city of Strom in the Arathi Highlands and declared the first human nation: Arathor.',
      more: [
        'Thoradin was in a hurry: in the north the Amani trolls were raising a great army. Their real target was the high elves of Quel’Thalas. Besieged, the elves came to Strom to ask for help.',
        'Thoradin set one condition: the elves would teach humans magic. The elves agreed. In the Troll Wars the human and elven armies met the trolls at the foot of the Alterac Mountains; the fire the magi called down broke the trolls, and the Amani empire never regained its old strength.',
        'After the victory the elves swore to aid the bloodline of Arathor forever. That oath would come up again thousands of years later, when Anduin Lothar, the last of the Arathi line, asked for their help.',
        'Magic made humans strong, but it had a price: careless use of it drew the demons of the Burning Legion to Azeroth. Human magi and elves secretly founded the Council of Tirisfal and entrusted great power to a single protector, the Guardian of Tirisfal. The last to hold that title would be Medivh.',
        'As Arathor grew, it drifted apart. The magi founded their own city, Dalaran, in the north, and new cities spread north and west. Some of Strom’s noble families moved south and founded the kingdom of Azeroth and its capital, Stormwind; Strom itself lived on as Stromgarde. In the end the one nation split into seven kingdoms.',
      ],
      statLabel: 'The elves’ bargain',
      statAria: '100 human magi',
      statUnit: 'magi',
      statText: 'The high elves taught magic to <strong>one hundred humans</strong>; those first human magi turned the tide of the Troll Wars.',
      statDetail: 'Thoradin agreed to help the elves on the condition that humans be taught magic. Human sorcery, and later Dalaran itself, grew out of that bargain.',
      kingdomsLabel: 'Seven kingdoms',
      kingdomsTitle: 'The heirs of Arathor',
      mapCaption: 'The seven human kingdoms before the Dark Portal opened. The position of Kul Tiras is approximate.',
      routesKey: 'Spreading out from Arathor',
      legend: [
        { name: 'Stromgarde', text: 'Strom, Arathor’s old capital; King Thoras Trollbane' },
        { name: 'Lordaeron', text: 'The largest and strongest kingdom; King Terenas Menethil II' },
        { name: 'Dalaran', text: 'The city of magi, ruled by the Kirin Tor' },
        { name: 'Alterac', text: 'A small kingdom in the mountains; Lord Aiden Perenolde' },
        { name: 'Gilneas', text: 'The peninsula in the south-west; King Genn Greymane' },
        { name: 'Kul Tiras', text: 'The island kingdom that ruled the seas; Lord Admiral Daelin Proudmoore' },
        { name: 'Stormwind', text: 'The kingdom of Azeroth in the south; King Llane Wrynn' },
      ],
      note: 'The seven kingdoms came from the same root but never stood under one banner. Only a threat from outside could make them do that.',
    },
    wars: {
      title: 'Stormwind burned, the Alliance was born',
      intro:
        'When the Dark Portal opened, the quiet age of kingdoms that had kept apart for centuries came to an end. As you scroll, the map shows the two great wars step by step.',
      mapLabel: 'Map of the First and Second Wars',
      steps: [
        {
          era: 'Dark Portal',
          title: 'The gate opens',
          text: 'Medivh, the last Guardian of Tirisfal, is under the sway of Sargeras. With the orc warlock Gul’dan he opens the Dark Portal to Draenor in the Black Morass. The Horde marches into the kingdom of Azeroth.',
          status: 'Invasion',
          tone: 'no',
        },
        {
          era: 'First War',
          title: 'Stormwind falls',
          text: 'King Llane’s champion Anduin Lothar leads the defence; Lothar, the young mage Khadgar and the half-orc Garona slay Medivh in Karazhan. But Garona kills King Llane for the Horde, and the Horde burns Stormwind to the ground.',
          status: 'Ruin',
          tone: 'no',
        },
        {
          era: 'Exodus',
          title: 'A people across the sea',
          text: 'Lothar puts the survivors and the young Prince Varian on ships and takes them north to Lordaeron. All that is left of the kingdom of Azeroth is a column of refugees.',
          status: 'Exile',
          tone: 'mute',
        },
        {
          era: 'Alliance of Lordaeron',
          title: 'Seven banners, one army',
          text: 'King Terenas Menethil II gathers the human kingdoms at Lordaeron and the Alliance of Lordaeron is formed, with Lothar in command. Because Lothar is the last of the Arathi line, the high elves keep their old oath; the dwarves of Ironforge and the gnomes join the ranks too.',
          status: 'Alliance',
          tone: 'al',
        },
        {
          era: 'Second War',
          title: 'Victory at Blackrock',
          text: 'The Horde pushes from Khaz Modan all the way to Lordaeron and burns the forests of Quel’Thalas. The Alliance drives it back south. Lothar falls before Blackrock Spire fighting Orgrim Doomhammer; Turalyon takes command and wins, and the Dark Portal is destroyed.',
          status: 'Victory',
          tone: 'ok',
        },
      ],
      cards: [
        {
          name: 'Alterac’s betrayal',
          text: 'To save his kingdom, Lord Aiden Perenolde made a secret deal with the Horde. When the betrayal came out, Perenolde was arrested and Alterac was placed under Lordaeron’s rule.',
          status: 'Betrayal',
          tone: 'no',
        },
        {
          name: 'Internment camps',
          text: 'After the war the captured orcs were locked in camps. The cost of the camps fell on the Alliance kingdoms as taxes, and resentment grew.',
          status: 'Heavy burden',
          tone: 'mute',
        },
        {
          name: 'A cracking alliance',
          text: 'Tired of the taxes, Gilneas left the Alliance and raised the Greymane Wall. Stromgarde and Quel’Thalas withdrew too; after its victory the Alliance began to come apart.',
          status: 'Falling apart',
          tone: 'no',
        },
        {
          name: 'Stormwind rebuilt',
          text: 'With Lordaeron’s support Stormwind was rebuilt, and the young Varian Wrynn took his father’s throne. The Stonemasons’ Guild raised the city again.',
          status: 'Reborn',
          tone: 'ok',
        },
      ],
      note: 'The Alliance brought the human kingdoms under one banner for the first time. But victory also took away the fear that held it together.',
    },
    fall: {
      title: 'The fall of Lordaeron',
      intro:
        'Years after the Second War a plague broke out in the north. Kel’Thuzad’s Cult of the Damned handed out tainted grain in the villages of Lordaeron; those who ate it died and rose again as undead soldiers of the Scourge.',
      more: [
        'Crown Prince Arthas Menethil and the young sorceress Jaina Proudmoore tracked the plague from Andorhal to Stratholme. Realising that the people of Stratholme were already poisoned, Arthas decided to purge the city; Uther and Jaina turned their backs on him.',
        'Arthas went to Northrend to destroy the source of the plague. There he took up the cursed blade Frostmourne and entered the Lich King’s service. When he came home he killed his father, King Terenas, in the throne room, and the greatest human kingdom fell to the Scourge.',
        'Then it was Dalaran’s turn: Archimonde, the Burning Legion commander summoned by the Scourge, levelled the city of magi. Heeding the warning of a mysterious prophet, Jaina led the survivors west across the sea to Kalimdor.',
        'In Kalimdor humans stood shoulder to shoulder with their old enemies, the orcs, and with the night elves to stop the Burning Legion at Mount Hyjal. After the war Jaina founded Theramore on the coast of Dustwallow Marsh. Where Lordaeron stood there are now the Plaguelands.',
      ],
      mapCaption: 'Lordaeron in the Third War. Northrend and Kalimdor lie off the map.',
      plagueKey: 'Plague and Scourge',
      arthasKey: 'Arthas’s road',
      jainaKey: 'Jaina’s exodus',
      legend: [
        { name: 'Andorhal', text: 'The town where the tainted grain was handed out' },
        { name: 'Stratholme', text: 'The city Arthas purged' },
        { name: 'Lordaeron', text: 'The capital, where King Terenas was killed' },
        { name: 'Dalaran', text: 'The city of magi, levelled by Archimonde' },
      ],
      cards: [
        {
          name: 'The Culling of Stratholme',
          text: 'Arthas put the city to the sword before its people could turn undead. Uther and Jaina opposed the order.',
          status: 'Purge',
          tone: 'no',
        },
        {
          name: 'Frostmourne',
          text: 'In Northrend Arthas took up the cursed blade. The dwarf at his side, Muradin Bronzebeard, was struck down by its curse.',
          status: 'Curse',
          tone: 'mute',
        },
        {
          name: 'The death of a king',
          text: 'Lordaeron welcomed its returning prince with a victory celebration. Arthas killed his father in the throne room and gave the kingdom to the Lich King.',
          status: 'Fall',
          tone: 'no',
        },
        {
          name: 'The journey west',
          text: 'Jaina Proudmoore led the survivors to Kalimdor and founded Theramore after the war. The refugees of Lordaeron found a new home.',
          status: 'New home',
          tone: 'al',
        },
      ],
      note: 'The fall of Lordaeron moved the centre of the human world south. The heart of the Alliance now beats in Stormwind, a city destroyed once and built again.',
    },
    today: {
      title: 'A throne without a king',
      intro: [
        'After the Third War Stormwind remained the strongest human kingdom. But the city has wounds of its own: King Varian Wrynn vanished on his way to peace talks in Theramore.',
        'Varian’s young son Anduin now sits on the throne. Highlord Bolvar Fordragon rules the kingdom in his name, while at court the word of the noble adviser Lady Katrana Prestor carries more and more weight.',
        'This is the Stormwind players see when they take their first steps in Elwynn Forest: the capital stands, but Defias bandits, Blackrock orcs and the shadows of Duskwood roam its borders.',
      ],
      throneLabel: 'The throne',
      throneText: 'Where the throne of Stormwind stands today.',
      throne: [
        {
          role: 'The lost king',
          name: 'Varian Wrynn',
          text: 'The prince who lost his father in the First War became king of the rebuilt Stormwind. He vanished on the road to Theramore, and no one knows where he is.',
        },
        { role: 'The boy king', name: 'Anduin Wrynn', text: 'Varian’s son. He was still a child when his father vanished; the crown is kept for him.' },
        { role: 'The regent', name: 'Bolvar Fordragon', text: 'Stormwind’s paladin commander. He rules the kingdom as regent until Anduin comes of age.' },
      ],
      defiasLabel: 'The Defias Brotherhood',
      defiasTitle: 'The masons who were never paid',
      defiasText: [
        'The Stonemasons’ Guild, which raised Stormwind from its ashes, was never paid once the work was done: the House of Nobles refused. In the unrest that followed, the masons’ leader Edwin VanCleef left the city.',
        'The masons withdrew to Westfall and founded the Defias Brotherhood. Westfall’s farms emptied and its roads fell to bandits; in the Deadmines beneath Moonbrook a secret warship is being built. The People’s Militia at Sentinel Hill is trying to hold on.',
      ],
      westfallCaption: 'Westfall.',
      defiasKey: 'The masons’ road',
      westfallLegend: [
        { name: 'Sentinel Hill', text: 'Headquarters of the People’s Militia' },
        { name: 'Moonbrook', text: 'Entrance to the Deadmines; the heart of the Defias' },
        { name: 'Saldean’s Farm', text: 'One of the few farms in Westfall still worked' },
      ],
      beyondLabel: 'Beyond Stormwind',
      beyondTitle: 'The strongholds of a scattered people',
      beyondText: [
        'Humans outside Stormwind are holding on too. Among Lordaeron’s survivors, the Scarlet Crusade has turned the war on the undead into fanaticism, while the Argent Dawn fights a more measured fight from Light’s Hope Chapel.',
        'In the Arathi Highlands Stromgarde is trying to hold its old capital against the Syndicate and the ogres. Southshore in Hillsbrad still stands; Gilneas has shut its gates behind the Greymane Wall. In Kalimdor, Jaina Proudmoore’s Theramore is the Alliance’s stronghold in the west.',
      ],
      mapCaption: 'Human strongholds on Azeroth. Positions are approximate.',
      routesKey: 'Alliance roads',
      legend: [
        { name: 'Stormwind', text: 'Capital of the Alliance' },
        { name: 'Theramore', text: 'Jaina’s city in Kalimdor' },
        { name: 'Southshore', text: 'The town that still stands in Hillsbrad' },
        { name: 'Stromgarde', text: 'Arathor’s old capital, under siege' },
        { name: 'Scarlet Monastery', text: 'The Scarlet Crusade’s fortress in Tirisfal' },
        { name: 'Light’s Hope Chapel', text: 'The Argent Dawn’s base in the Plaguelands' },
      ],
      note: 'Divided, their king lost, but still standing. Humans were never the strongest people on their own; their strength came from the peoples they brought together.',
    },
    outro: {
      title: 'Fallen twice, built twice',
      text: 'From the hidden children of giants to the founders of the Alliance. The statues of heroes keep watch at Stormwind’s gate; the king it belongs to is still out on the road.',
      nextText: 'The oldest people of Kalimdor: the kaldorei, the Well of Eternity and Teldrassil.',
    },
    images:
      'Maps from WoW Forever. The World of Warcraft characters and places in the Stormwind gate image belong to Blizzard Entertainment.',
  },
};

// ---------------------------------------------------------------- Curse of Flesh
// A short lore page (src/pages/[lang]/stories/curse-of-flesh.astro), reached only from the
// origin chapters of the stories that mention the curse; it is not listed anywhere else.

export const CURSE_ART_LABELS: Record<Lang, Record<string, string>> = {
  tr: {
    worldAria: 'Azeroth ve Northrend şematik haritası: Ulduar, Utgarde ve Uldaman’dan Khaz Modan ile Lordaeron’a giden yollar; Old God hapishaneleri Ulduar ve Ahn’Qiraj',
  },
  en: {
    worldAria: 'Schematic map of Azeroth and Northrend: routes from Ulduar, Utgarde and Uldaman to Khaz Modan and Lordaeron; the Old God prisons of Ulduar and Ahn’Qiraj',
  },
};

export interface CurseStory {
  metaDescription: string;
  overline: string;
  lead: string;
  facts: { label: string; value: string; extra?: string }[];
  chapters: Record<'curse' | 'peoples' | 'meaning', string>;
  curse: { title: string; paragraphs: string[]; stagesLabel: string; stages: Item[]; before: string; after: string; note: string };
  peoples: {
    title: string;
    intro: string;
    /** `slug` links the card to a written story (src/lib/stories/races.ts). */
    changes: { from: string; to: string; text: string; slug?: string }[];
    mapCaption: string;
    routesKey: string;
    prisonKey: string;
    legend: Item[];
    note: string;
  };
  meaning: { title: string; paragraphs: string[]; note: string };
  outro: { title: string; text: string; storiesLabel: string };
  images: string;
}

export const CURSE_STORY: Record<Lang, CurseStory> = {
  tr: {
    metaDescription:
      'Curse of Flesh: Old Gods’un Titan yapılarına bulaştırdığı lanet. Earthen’ları Dwarf’a, Mechagnome’ları Gnome’a, vrykul çocuklarını insana çeviren dönüşüm.',
    overline: 'Lore · Ara bölüm',
    lead: 'Titan’ların taştan ve metalden yaptığı işçiler, etten bedenlere hapsoldu. Old Gods’un bu laneti Azeroth’un en tanıdık halklarını doğurdu.',
    facts: [
      { label: 'Kaynağı', value: 'Old Gods' },
      { label: 'Hedefi', value: 'Titan yapıları', extra: 'titan-forged' },
      { label: 'Dönüşüm', value: 'Taş ve metal → et ve kemik' },
      { label: 'Doğan halklar', value: 'Dwarf · Gnome · Human' },
      { label: 'Yan etkisi', value: 'Trogg’lar' },
      { label: 'İzleri', value: 'Uldaman · Ulduar' },
    ],
    chapters: { curse: 'Lanet', peoples: 'Halklar', meaning: 'Anlam' },
    curse: {
      title: 'Kusursuz yapıdaki çatlak',
      paragraphs: [
        'Titan’lar Azeroth’u düzenlerken işin ağır yükünü kendi yarattıkları yapılara bıraktı: taştan earthen’lar dağların derinliklerini işledi, metal Mechagnome’lar Titan makinelerini çalıştırdı, dev vrykul’lar dünyayı korudu. Bunlara titan-forged, yani Titan yapısı denir. Yaşlanmaz, hastalanmaz, yorulmazlardı.',
        'Titan’ların yerin altına hapsettiği Old Gods ise boş durmadı. Zincirlerinin ardından yaydıkları yozlaşma Titan yapılarına sinsi bir hastalık gibi bulaştı: Curse of Flesh.',
        'Lanet bir anda vurmadı. Taş ve metal gövdeler nesiller içinde yumuşadı; bazıları Titan kasalarında uyurken değişti, bazılarının çocukları etten doğdu. Ölümsüz işçilerin yerini kırılgan, ölümlü ama kendi kararını veren canlılar aldı.',
      ],
      stagesLabel: 'Lanetin aşamaları',
      stages: [
        { name: 'Titan', text: 'Dünyanın mimarları' },
        { name: 'Titan-forged', text: 'Taş, metal ve dev işçiler' },
        { name: 'Curse of Flesh', text: 'Old Gods’un yozlaşması' },
        { name: 'Ölümlü halklar', text: 'Et, kemik ve özgür irade' },
      ],
      before: 'Taş · metal',
      after: 'Et',
      note: 'Titan’ların gözünde bu bir bozulmaydı. Ama Dwarf, Gnome ve Human tarihinin tamamı bu bozulmanın üzerine kurulu.',
    },
    peoples: {
      title: 'Lanetin dokunduğu halklar',
      intro: 'Aynı lanet farklı yapılarda farklı sonuçlar verdi. Kaydırdıkça harita, her halkın kökeninden bugünkü yurduna giden yolu gösteriyor.',
      changes: [
        {
          from: 'Earthen',
          to: 'Dwarf',
          text: 'Uldaman gibi Titan kasalarında uyuyan taş işçiler etten bedenlerle uyandı ve Khaz Modan’da Ironforge’u kurdu.',
          slug: 'dwarf',
        },
        {
          from: 'Mechagnome',
          to: 'Gnome',
          text: 'Mimiron’un tasarladığı metal işçiler kırılgan ama meraklı bir halka dönüştü ve Gnomeregan’ı kurdu.',
          slug: 'gnome',
        },
        {
          from: 'Vrykul',
          to: 'Human',
          text: 'Northrend’in dev savaşçılarının küçük doğan çocukları Kral Ymiron’dan saklandı; torunları güneye yayıldı.',
          slug: 'human',
        },
        {
          from: 'Earthen',
          to: 'Trogg',
          text: 'Lanetin en ağır vurduğu earthen’lar aklını yitirip yerin altında yaşayan ilkel trogg’lara dönüştü. Gnomeregan’ı basan da onlardı.',
        },
      ],
      mapCaption: 'Azeroth ve Northrend, şematik harita. Konumlar yaklaşıktır.',
      routesKey: 'Kökenden yurda',
      prisonKey: 'Old God hapishanesi',
      legend: [
        { name: 'Ulduar', text: 'Northrend, Storm Peaks. Mimiron’un Mechagnome’larının yurdu; altında Old God Yogg-Saron yatıyor' },
        { name: 'Utgarde', text: 'Northrend, Howling Fjord. Kral Ymiron’un vrykul’ları' },
        { name: 'Uldaman', text: 'Badlands’teki Titan kasası; earthen’lar burada uyudu' },
        { name: 'Khaz Modan', text: 'Dwarf’ların ve Gnome’ların yurdu: Ironforge ve Gnomeregan' },
        { name: 'Lordaeron', text: 'İlk insan kabilelerinin yayıldığı topraklar' },
        { name: 'Ahn’Qiraj', text: 'Kalimdor, Silithus. Old God C’Thun’un hapishanesi' },
      ],
      note: 'Taş, metal ya da dev kanı; sonuç hep aynıydı. Titan’ların kusursuz işçileri, kusurlu ama özgür halklara dönüştü.',
    },
    meaning: {
      title: 'Lanet mi, armağan mı?',
      paragraphs: [
        'Titan yapıları için Curse of Flesh bir kayıptı: ölümsüzlüklerini, güçlerini ve Titan’ların verdiği görevin netliğini yitirdiler.',
        'Ama lanet onlara Titan’ların hiç vermediği bir şey de verdi: kendi yolunu seçme özgürlüğü. Krallık kuran, savaşan, icat eden ve kendi tarihini yazan halklar bu kırılgan bedenlerden doğdu.',
        'Lanetin izleri hâlâ yerin altında duruyor. Explorers’ League Uldaman’ın kasalarını kazıyor; WoW Forever’da Uldaman zindanına inenler, dwarf’ların taştan atalarının uyuduğu salonlarda dolaşıyor.',
      ],
      note: 'Dwarf’ların geçmişi kazma tutkusu, Gnome’ların makinelere yakınlığı, insanların hızla çoğalıp yayılması: üçü de aynı lanetin farklı yüzleri.',
    },
    outro: {
      title: 'Aynı kökten üç halk',
      text: 'Taş, metal ve dev kanı. Lanetin dokunduğu halkların hikayelerini okumaya devam et.',
      storiesLabel: 'Hikayeler',
    },
    images: 'Bu sayfadaki çizimler bu sayfa için hazırlandı. World of Warcraft adları Blizzard Entertainment’a aittir.',
  },
  en: {
    metaDescription:
      'The Curse of Flesh: the Old Gods’ curse on the titan-forged. The change that turned the earthen into dwarves, the mechagnomes into gnomes and the children of the vrykul into humans.',
    overline: 'Lore · Interlude',
    lead: 'The Titans’ workers of stone and metal were trapped in bodies of flesh. This curse of the Old Gods gave birth to Azeroth’s most familiar peoples.',
    facts: [
      { label: 'Source', value: 'The Old Gods' },
      { label: 'Target', value: 'The titan-forged' },
      { label: 'Change', value: 'Stone and metal → flesh and bone' },
      { label: 'Peoples born', value: 'Dwarf · Gnome · Human' },
      { label: 'Side effect', value: 'The troggs' },
      { label: 'Traces', value: 'Uldaman · Ulduar' },
    ],
    chapters: { curse: 'The curse', peoples: 'Peoples', meaning: 'Meaning' },
    curse: {
      title: 'A crack in the perfect design',
      paragraphs: [
        'While the Titans ordered Azeroth, they left the heavy work to beings they made themselves: the stone earthen worked the depths of the mountains, the metal mechagnomes ran the Titan machines, the giant vrykul guarded the world. They are called the titan-forged. They did not age, sicken or tire.',
        'But the Old Gods, whom the Titans had imprisoned beneath the earth, were not idle. The corruption they spread from behind their chains crept into the titan-forged like a slow sickness: the Curse of Flesh.',
        'The curse did not strike all at once. Over generations the bodies of stone and metal softened; some changed while they slept in Titan vaults, others had children born of flesh. Fragile, mortal beings who made their own choices took the place of the deathless workers.',
      ],
      stagesLabel: 'Stages of the curse',
      stages: [
        { name: 'Titan', text: 'Architects of the world' },
        { name: 'Titan-forged', text: 'Workers of stone, metal and giant size' },
        { name: 'Curse of Flesh', text: 'The Old Gods’ corruption' },
        { name: 'Mortal peoples', text: 'Flesh, bone and free will' },
      ],
      before: 'Stone · metal',
      after: 'Flesh',
      note: 'To the Titans this was a flaw. Yet the whole history of dwarves, gnomes and humans is built on that flaw.',
    },
    peoples: {
      title: 'The peoples it touched',
      intro: 'The same curse had different results in different beings. As you scroll, the map shows each people’s road from its origin to the homeland it has today.',
      changes: [
        {
          from: 'Earthen',
          to: 'Dwarf',
          text: 'Stone workers who slept in Titan vaults such as Uldaman woke in bodies of flesh and founded Ironforge in Khaz Modan.',
          slug: 'dwarf',
        },
        {
          from: 'Mechagnome',
          to: 'Gnome',
          text: 'The metal workers designed by Mimiron became a fragile but curious people and founded Gnomeregan.',
          slug: 'gnome',
        },
        {
          from: 'Vrykul',
          to: 'Human',
          text: 'The small children of Northrend’s giant warriors were hidden from King Ymiron; their descendants spread south.',
          slug: 'human',
        },
        {
          from: 'Earthen',
          to: 'Trogg',
          text: 'The earthen the curse struck hardest lost their minds and became the primitive troggs that live underground. They were the ones who overran Gnomeregan.',
        },
      ],
      mapCaption: 'Azeroth and Northrend, schematic map. Positions are approximate.',
      routesKey: 'From origin to homeland',
      prisonKey: 'Old God prison',
      legend: [
        { name: 'Ulduar', text: 'Northrend, Storm Peaks. Home of Mimiron’s mechagnomes; the Old God Yogg-Saron lies beneath it' },
        { name: 'Utgarde', text: 'Northrend, Howling Fjord. King Ymiron’s vrykul' },
        { name: 'Uldaman', text: 'The Titan vault in the Badlands where the earthen slept' },
        { name: 'Khaz Modan', text: 'Home of the dwarves and gnomes: Ironforge and Gnomeregan' },
        { name: 'Lordaeron', text: 'The lands the first human tribes spread across' },
        { name: 'Ahn’Qiraj', text: 'Kalimdor, Silithus. The prison of the Old God C’Thun' },
      ],
      note: 'Stone, metal or giant blood, the result was the same. The Titans’ flawless workers became flawed but free peoples.',
    },
    meaning: {
      title: 'Curse or gift?',
      paragraphs: [
        'For the titan-forged the Curse of Flesh was a loss: they lost their immortality, their strength and the clear purpose the Titans had given them.',
        'But the curse also gave them something the Titans never had: the freedom to choose their own way. Peoples who founded kingdoms, fought, invented and wrote their own history were born from those fragile bodies.',
        'The traces of the curse still lie underground. The Explorers’ League digs the vaults of Uldaman, and in WoW Forever those who enter the Uldaman dungeon walk the halls where the dwarves’ stone ancestors slept.',
      ],
      note: 'The dwarves’ passion for digging up the past, the gnomes’ way with machines, the humans’ knack for multiplying and spreading: all three are faces of the same curse.',
    },
    outro: {
      title: 'Three peoples, one root',
      text: 'Stone, metal and giant blood. Keep reading the stories of the peoples the curse touched.',
      storiesLabel: 'Stories',
    },
    images: 'The drawings on this page were made for it. World of Warcraft names belong to Blizzard Entertainment.',
  },
};

// ---------------------------------------------------------------- Night Elf

export const NIGHT_ELF_ART_LABELS: Record<Lang, Record<string, string>> = {
  tr: {
    sunderingAria: 'Kaydırdıkça Kalimdor’un tek kıtası parçalanıyor ve ortadaki Well of Eternity Maelstrom’a dönüşüyor',
    oneLand: 'Tek kıta',
    ekAria: 'Third War’da Kalimdor’un kuzeyi: Ashenvale, Felwood ve Mount Hyjal; adım adım',
    strangers: 'Yabancılar',
    legion: 'Burning Legion',
    threeArmies: 'Üç ordu',
    teldrassilAria: 'Teldrassil haritası: Darnassus, Shadowglen, Dolanaar ve Rut’theran Village; Auberdine’e giden gemi yolu',
    toAuberdine: 'Auberdine’e',
    worldAria: 'Kalimdor’da night elf yerleşimleri ve gemi yolları: Darnassus, Auberdine, Astranaar, Nighthaven, Feathermoon Stronghold, Menethil Harbor',
  },
  en: {
    sunderingAria: 'As you scroll, the single continent of Kalimdor breaks apart and the Well of Eternity at its centre becomes the Maelstrom',
    oneLand: 'One continent',
    ekAria: 'Northern Kalimdor in the Third War: Ashenvale, Felwood and Mount Hyjal, step by step',
    strangers: 'Strangers',
    legion: 'Burning Legion',
    threeArmies: 'Three armies',
    teldrassilAria: 'Map of Teldrassil: Darnassus, Shadowglen, Dolanaar and Rut’theran Village; the boat to Auberdine',
    toAuberdine: 'To Auberdine',
    worldAria: 'Night elf settlements and sea routes in Kalimdor: Darnassus, Auberdine, Astranaar, Nighthaven, Feathermoon Stronghold, Menethil Harbor',
  },
};

type Place = { tag: string; name: string; text: string };

export interface NightElfStory {
  metaDescription: string;
  overline: string;
  lead: string;
  facts: { label: string; value: string; extra?: string }[];
  chapters: Record<'origin' | 'sundering' | 'vigil' | 'hyjal' | 'today', string>;
  origin: { title: string; titleNote: string; paragraphs: string[]; stagesLabel: string; stages: Item[]; before: string; after: string; note: string };
  sundering: {
    title: string;
    intro: string;
    more: string[];
    figureCaption: string;
    statLabel: string;
    statAria: string;
    statUnit: string;
    statText: string; // may hold <strong>
    statDetail: string;
    cards: Card[];
    note: string;
  };
  vigil: { title: string; intro: string; more: string[]; places: Place[]; note: string };
  hyjal: { title: string; intro: string; mapLabel: string; steps: Step[]; note: string };
  today: {
    title: string;
    intro: string[];
    leadersLabel: string;
    leadersText: string;
    leaders: (Item & { role: string })[];
    treeLabel: string;
    treeTitle: string;
    treeText: string[];
    treeCaption: string;
    boatKey: string;
    treeLegend: Item[];
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

export const NIGHT_ELF_STORY: Record<Lang, NightElfStory> = {
  tr: {
    metaDescription:
      'Night Elf’lerin hikayesi: Well of Eternity, Azshara ve War of the Ancients, Great Sundering, on bin yıllık nöbet, Mount Hyjal’daki fedakârlık ve Teldrassil.',
    overline: 'Hikaye 04',
    lead: 'Ay’ın ışığında uyanan kadim halk. Büyüleriyle dünyayı bir kez yaktılar, sonra on bin yıl onu korudular; ölümsüzlüklerini Azeroth uğruna verdiler.',
    facts: [
      { label: 'Yurt', value: 'Teldrassil', extra: 'Kalimdor' },
      { label: 'Başkent', value: 'Darnassus' },
      { label: 'Liderler', value: 'Tyrande Whisperwind', extra: 'Fandral Staghelm' },
      { label: 'Tanrıça', value: 'Elune' },
      { label: 'Binek', value: 'Nightsaber' },
      { label: 'Kadim adı', value: 'Kaldorei' },
    ],
    chapters: { origin: 'Köken', sundering: 'Kırılma', vigil: 'Nöbet', hyjal: 'Hyjal', today: 'Bugün' },
    origin: {
      title: 'Yıldızların Çocukları',
      titleNote: '(Kaldorei)',
      paragraphs: [
        'Night elf’lerin hikayesi bir gölün kıyısında başlar. On binlerce yıl önce, tek parça hâlindeki Kalimdor’un ortasında büyü dolu sularıyla Well of Eternity parlıyordu.',
        'Kıyısına yerleşen bir grup karanlık trol, nesiller boyunca Well’in gücüyle değişti: boyları uzadı, ömürleri uzadı, gözleri gecede parlamaya başladı. Kendilerine kaldorei, yani “yıldızların çocukları” dediler.',
        'Kaldorei, Ay tanrıçası Elune’e taptı ve Well’in kıyısında büyük bir uygarlık kurdu. Başkentleri Zin-Azshari, kraliçeleri Azshara’ydı; en ayrıcalıklı soyluları, büyüye en yakın olan Highborne’lardı.',
      ],
      stagesLabel: 'Night Elf’in doğuş aşamaları',
      stages: [
        { name: 'Dark troll', text: 'Well’in kıyısındaki troller' },
        { name: 'Well of Eternity', text: 'Büyünün kaynağı' },
        { name: 'Elune', text: 'Ay tanrıçası' },
        { name: 'Kaldorei', text: 'Yıldızların çocukları' },
      ],
      before: 'Troll',
      after: 'Kaldorei',
      note: 'Night elf’lerin büyüyle ilişkisi baştan iki yüzlüydü: onları yaratan güç, neredeyse sonlarını da getirecekti.',
    },
    sundering: {
      title: 'Dünyayı bölen savaş',
      intro:
        'Kraliçe Azshara ve Highborne’lar Well of Eternity’nin büyüsüne giderek daha çok daldı. Bu güç, dünyaların arasındaki boşlukta Burning Legion’ın efendisi Sargeras’ın dikkatini çekti.',
      more: [
        'Sargeras Azshara’ya güç ve ölümsüzlük vaat etti; Azshara ve Highborne’lar Legion’ı Azeroth’a getirmek için Well’in içinde bir geçit açtı. Demonlar Kalimdor’a dökülünce War of the Ancients başladı.',
        'Direnişe genç druid Malfurion Stormrage, Elune rahibesi Tyrande Whisperwind ve Malfurion’un ikiz kardeşi Illidan önderlik etti. Yarı-tanrı Cenarius, ejderhalar ve ormanın kadim ruhları onlara katıldı.',
        'Malfurion, Legion’ın geçidini kapatmanın tek yolunun Well of Eternity’yi yok etmek olduğunu anladı. Geçit kapanırken Well kendi içine çöktü; Azshara ve sarayı dalgaların altında kayboldu. Buna Great Sundering denir: tek kıta paramparça oldu, ortasında bugün Maelstrom dönüyor.',
      ],
      figureCaption: 'Kaydırdıkça tek kıta parçalanıyor, Well of Eternity Maelstrom’a dönüşüyor.',
      statLabel: 'Kırılmanın tarihi',
      statAria: '10.000 yıl',
      statUnit: 'yıl',
      statText: '<strong>Dark Portal’dan yaklaşık 10.000 yıl önce</strong> Well of Eternity çöktü ve dünya bölündü.',
      statDetail:
        'Night elf’ler sonradan ölümsüzlük kazandığı için War of the Ancients’ı bizzat yaşamış olanlar bugün hâlâ hayatta: Tyrande ve Malfurion bunların başında geliyor.',
      cards: [
        {
          name: 'Kraliçe Azshara',
          text: 'Güzelliği ve gücüyle tapınılan kraliçe, Sargeras’a kapıyı açtı. Well çökerken sarayıyla birlikte dalgaların altında kayboldu.',
          status: 'İhanet',
          tone: 'no',
        },
        {
          name: 'Burning Legion',
          text: 'Sargeras’ın demon ordusu Well’den geçerek Kalimdor’u yaktı. Legion’ın komutanları arasında Archimonde da vardı.',
          status: 'İstila',
          tone: 'no',
        },
        {
          name: 'Malfurion ve Cenarius',
          text: 'Cenarius’un öğrencisi Malfurion ilk druid oldu ve ormanın kadim güçlerini direnişin yanına çekti.',
          status: 'Direniş',
          tone: 'al',
        },
        {
          name: 'Illidan’ın şişeleri',
          text: 'Illidan büyünün kaynağının yok olmasına razı olmadı: Well’in suyundan birkaç şişe alıp Mount Hyjal’daki bir göle döktü ve yeni bir Well doğdu.',
          status: 'Gizli kuyu',
          tone: 'mute',
        },
      ],
      note: 'Night elf’ler büyünün dünyayı yakabileceğini kendi gözleriyle gördü. Sonraki on bin yıl boyunca arcane büyüyü yasakladılar.',
    },
    vigil: {
      title: 'On bin yıllık nöbet',
      intro:
        'Kırılmadan sağ kurtulan night elf’ler Mount Hyjal’ın eteklerinde yeniden toplandı. Illidan’ın yarattığı yeni Well, tepede bir tehlike olarak duruyordu.',
      more: [
        'Malfurion ve druid’ler Well’in üzerine dev bir ağaç diktiler: World Tree Nordrassil. Ejderha Aspect’leri ağacı kutsadı; Nordrassil Well’i mühürledi ve night elf’lere ölümsüzlük verdi.',
        'Malfurion arcane büyüyü yasakladı ve Illidan’ı Hyjal’ın altındaki bir zindana kapattı; gardiyanı Maiev Shadowsong ve Watchers oldu. Druid’ler Barrow Den’lerde Emerald Dream’e dalıp yüzyıllar süren uykulara girdi; Tyrande ve Sentinel’ler ise uyanık kalıp halkı korudu.',
        'Büyüden vazgeçmeyen Highborne’lar sürgüne gönderildi. Denizi aşıp Eastern Kingdoms’a vardılar ve Quel’Thalas’ı kurdular: high elf’ler onların torunlarıdır.',
        'Yaklaşık bin yıl önce Silithus’taki Ahn’Qiraj’dan qiraji orduları taştı. War of the Shifting Sands’te night elf’ler bronz ejderhaların yardımıyla onları Scarab Wall’un ardına kapattı; Fandral Staghelm’in oğlu Valstann bu savaşta öldü.',
      ],
      places: [
        { tag: 'Kutsal ağaç', name: 'Nordrassil', text: 'Mount Hyjal’ın tepesindeki World Tree. İkinci Well’i mühürledi ve night elf’lere ölümsüzlük verdi.' },
        { tag: 'Druid’lerin yurdu', name: 'Moonglade', text: 'Druid’lerin kutsal vadisi. Bugün Cenarion Circle’ın merkezi Nighthaven burada.' },
        { tag: 'Mühürlü kapı', name: 'Ahn’Qiraj', text: 'Silithus’ta, qiraji’lerin ve Old God C’Thun’un kalesi; Scarab Wall’un ardında mühürlü duruyor.' },
      ],
      note: 'Ölümsüzlük bir armağandı ama bedeli vardı: night elf’ler on bin yıl boyunca dünyanın geri kalanından uzak ve neredeyse hiç değişmeden yaşadı.',
    },
    hyjal: {
      title: 'Ağacın feda edildiği gece',
      intro: 'On bin yıl sonra Burning Legion geri döndü. Kaydırdıkça harita, Third War’un Kalimdor’daki son perdesini adım adım gösteriyor.',
      mapLabel: 'Third War’da Kalimdor’un kuzeyi',
      steps: [
        {
          era: 'Third War',
          title: 'Yabancılar gelir',
          text: 'Orc’lar ve insanlar denizi aşıp Kalimdor’a ayak basar. Thrall’ın Horde’u ve Jaina’nın insanları, hiç tanımadıkları night elf topraklarına girer; Sentinel’ler onları düşman sayar.',
          status: 'Sınır',
          tone: 'mute',
        },
        {
          era: 'Ashenvale',
          title: 'Cenarius düşer',
          text: 'Grom Hellscream’in Warsong orc’ları Ashenvale’in kutsal ağaçlarını keser. Cenarius ormanı korumaya gelir, ama demon kanı içerek güç kazanan Grom onu öldürür.',
          status: 'Kayıp',
          tone: 'no',
        },
        {
          era: 'Felwood',
          title: 'Illidan serbest',
          text: 'Tyrande, Legion’a karşı güç bulmak için Illidan’ı zindanından çıkarır. Illidan Skull of Gul’dan’ın gücünü emip Legion’ın komutanlarından Tichondrius’u öldürür; ama bu güç onu da değiştirir ve Malfurion onu sürgüne gönderir. Kafatasının zehirlediği orman Felwood’a dönüşür.',
          status: 'Yozlaşma',
          tone: 'no',
        },
        {
          era: 'Mount Hyjal',
          title: 'Üç halk, tek cephe',
          text: 'Peygamber Medivh’in çağrısıyla Malfurion, Thrall ve Jaina Mount Hyjal’da birleşir. İnsanlar, orc’lar ve night elf’ler Archimonde’un Nordrassil’e yürüyüşünü adım adım yavaşlatır.',
          status: 'İttifak',
          tone: 'al',
        },
        {
          era: 'Nordrassil',
          title: 'Ağacın fedakârlığı',
          text: 'Archimonde ağaca ulaştığında Malfurion Horn of Cenarius’u çalar. Binlerce wisp Archimonde’u sarar ve ağacın gücüyle onu yok eder. Nordrassil yarı yanmış kalır, night elf’ler ölümsüzlüklerini kaybeder.',
          status: 'Zafer',
          tone: 'ok',
        },
      ],
      note: 'Ölümsüzlüğü kaybetmek night elf’leri dünyaya geri getirdi. Artık onlar da yaşlanıyor ve yalnız kalamayacaklarını biliyorlar.',
    },
    today: {
      title: 'Teldrassil’in gölgesinde',
      intro: [
        'Ölümsüzlüğü geri kazanmak isteyen Archdruid Fandral Staghelm, Darkshore kıyısında yeni bir World Tree dikti: Teldrassil. Ejderha Aspect’leri bu ağacı kutsamadı ve dallarının arasında şimdiden yozlaşma izleri görülüyor.',
        'Ağacın tepesinde night elf’lerin yeni başkenti Darnassus yükseldi. Tyrande Whisperwind halkını yönetiyor; Malfurion ise Emerald Dream’in derinliklerinde kayboldu ve dönmedi.',
        'Third War’dan sonra night elf’ler binlerce yıllık yalnızlıklarını bırakıp Alliance’a katıldı. Bugün Ashenvale’in ormanlarında Horde’la, Felwood’da Legion’ın kalıntılarıyla savaşıyorlar.',
      ],
      leadersLabel: 'Liderler',
      leadersText: 'Darnassus’un bugünkü yönetimi.',
      leaders: [
        {
          role: 'Elune’ün Yüce Rahibesi',
          name: 'Tyrande Whisperwind',
          text: 'War of the Ancients’tan beri halkının lideri ve Sentinel’lerin komutanı. Darnassus’taki Temple of the Moon’dan yönetiyor.',
        },
        {
          role: 'Archdruid',
          name: 'Fandral Staghelm',
          text: 'Malfurion’un yokluğunda druid’lerin başı. Teldrassil’i o dikti; oğlu Valstann’ı War of the Shifting Sands’te kaybetti.',
        },
        {
          role: 'Kayıp',
          name: 'Malfurion Stormrage',
          text: 'İlk druid ve Tyrande’nin sevdiği adam. Third War’dan sonra Emerald Dream’e daldı ve bir daha uyanmadı.',
        },
      ],
      treeLabel: 'Teldrassil',
      treeTitle: 'Ağacın üstünde bir dünya',
      treeText: [
        'Teldrassil o kadar büyük ki dalları bir bölge kadar geniş. Night elf karakterler oyuna Shadowglen’de başlar; Dolanaar köyünden Darnassus’a uzanan yollar ağacın tepesinde.',
        'Ağacın kökündeki Rut’theran Village’dan kalkan gemi Darkshore kıyısındaki Auberdine’e gider; night elf’lerin kıtayla bağı bu limandır.',
      ],
      treeCaption: 'Teldrassil.',
      boatKey: 'Gemi yolu',
      treeLegend: [
        { name: 'Darnassus', text: 'Night elf başkenti; Temple of the Moon burada' },
        { name: 'Shadowglen', text: 'Night elf karakterlerin başladığı vadi' },
        { name: 'Dolanaar', text: 'Ağacın ortasındaki köy' },
        { name: 'Rut’theran Village', text: 'Ağacın kökündeki liman; Auberdine’e gemi kalkar' },
      ],
      beyondLabel: 'Teldrassil’in ötesinde',
      beyondTitle: 'Kalimdor’daki nöbet yerleri',
      beyondText: [
        'Night elf’ler Kalimdor’un ormanlarına dağılmış karakollarla topraklarını koruyor: Darkshore’da Auberdine, Ashenvale’de Astranaar, Feralas açıklarında Feathermoon Stronghold. Moonglade’deki Nighthaven ise druid’lerin buluşma yeri.',
        'Auberdine’den kalkan gemi Wetlands’teki Menethil Harbor’a gider; night elf’leri Alliance’ın geri kalanına bağlayan yol budur.',
      ],
      mapCaption: 'Kalimdor’da night elf yerleşimleri. Konumlar yaklaşıktır.',
      routesKey: 'Gemi yolları',
      legend: [
        { name: 'Darnassus', text: 'Teldrassil’in tepesindeki başkent' },
        { name: 'Auberdine', text: 'Darkshore kıyısındaki liman kasabası' },
        { name: 'Astranaar', text: 'Ashenvale’in kalbindeki karakol' },
        { name: 'Nighthaven', text: 'Moonglade’de druid’lerin köyü' },
        { name: 'Feathermoon Stronghold', text: 'Feralas açıklarındaki ada kalesi' },
        { name: 'Menethil Harbor', text: 'Eastern Kingdoms’a açılan liman' },
      ],
      note: 'On bin yıl dünyadan uzak yaşayan halk, şimdi Alliance’ın en eski ve en tecrübeli üyesi.',
    },
    outro: {
      title: 'Ay ışığında nöbet',
      text: 'Bir kez dünyayı yaktılar, sonra on bin yıl onu korudular. Elune’ün ışığı hâlâ Teldrassil’in dallarında.',
      nextText: 'Draenor’dan gelen halk: Horde’un kuruluşu ve Thrall’ın Kalimdor’u.',
    },
    images: 'Well of Eternity illüstrasyonu, Azshara, Moonglade ve Mount Hyjal görselleri Blizzard Entertainment’a aittir. Haritalar WoW Forever’dan.',
  },
  en: {
    metaDescription:
      'The night elves’ story: the Well of Eternity, Azshara and the War of the Ancients, the Great Sundering, a ten-thousand-year vigil, the sacrifice at Mount Hyjal and Teldrassil.',
    overline: 'Story 04',
    lead: 'An ancient people who woke in the light of the moon. Their magic set the world on fire once; then they guarded it for ten thousand years and gave up their immortality for Azeroth.',
    facts: [
      { label: 'Homeland', value: 'Teldrassil', extra: 'Kalimdor' },
      { label: 'Capital', value: 'Darnassus' },
      { label: 'Leaders', value: 'Tyrande Whisperwind', extra: 'Fandral Staghelm' },
      { label: 'Goddess', value: 'Elune' },
      { label: 'Mount', value: 'Nightsaber' },
      { label: 'Ancient name', value: 'Kaldorei' },
    ],
    chapters: { origin: 'Origin', sundering: 'Sundering', vigil: 'Vigil', hyjal: 'Hyjal', today: 'Today' },
    origin: {
      title: 'Children of the Stars',
      titleNote: '(Kaldorei)',
      paragraphs: [
        'The night elves’ story begins on the shore of a lake. Tens of thousands of years ago, in the middle of Kalimdor, then a single continent, the Well of Eternity shone with waters full of magic.',
        'A group of dark trolls settled on its shores and, over generations, changed under the Well’s power: they grew taller, their lives grew longer and their eyes began to shine in the night. They called themselves the kaldorei, the “children of the stars”.',
        'The kaldorei worshipped Elune, goddess of the moon, and built a great civilisation on the Well’s shores. Their capital was Zin-Azshari, their queen Azshara; their most privileged nobles, and the closest to magic, were the Highborne.',
      ],
      stagesLabel: 'Stages of the night elves’ beginning',
      stages: [
        { name: 'Dark troll', text: 'Trolls on the shores of the Well' },
        { name: 'Well of Eternity', text: 'The source of magic' },
        { name: 'Elune', text: 'Goddess of the moon' },
        { name: 'Kaldorei', text: 'Children of the stars' },
      ],
      before: 'Troll',
      after: 'Kaldorei',
      note: 'The night elves’ bond with magic was two-edged from the start: the power that made them would nearly be their end.',
    },
    sundering: {
      title: 'The war that broke the world',
      intro:
        'Queen Azshara and the Highborne sank deeper and deeper into the magic of the Well of Eternity. In the void between worlds, that power caught the eye of Sargeras, master of the Burning Legion.',
      more: [
        'Sargeras promised Azshara power and immortality, and she and the Highborne opened a gate inside the Well to bring the Legion to Azeroth. When the demons poured into Kalimdor, the War of the Ancients began.',
        'The resistance was led by the young druid Malfurion Stormrage, the priestess of Elune Tyrande Whisperwind and Malfurion’s twin brother Illidan. The demigod Cenarius, the dragons and the ancient spirits of the forest joined them.',
        'Malfurion saw that the only way to close the Legion’s gate was to destroy the Well of Eternity. As the gate closed, the Well collapsed in on itself, and Azshara and her palace vanished beneath the waves. This is the Great Sundering: the single continent broke apart, and the Maelstrom now churns at its centre.',
      ],
      figureCaption: 'As you scroll, the single continent breaks apart and the Well of Eternity becomes the Maelstrom.',
      statLabel: 'When the world broke',
      statAria: '10,000 years',
      statUnit: 'years',
      statText: 'The Well of Eternity collapsed and the world broke apart <strong>about 10,000 years before the Dark Portal</strong>.',
      statDetail:
        'Because the night elves later became immortal, some who fought in the War of the Ancients are still alive today; Tyrande and Malfurion first among them.',
      cards: [
        {
          name: 'Queen Azshara',
          text: 'The queen worshipped for her beauty and power opened the door to Sargeras. As the Well collapsed, she vanished beneath the waves with her palace.',
          status: 'Betrayal',
          tone: 'no',
        },
        {
          name: 'Burning Legion',
          text: 'Sargeras’s demon army came through the Well and set Kalimdor on fire. Archimonde was among the Legion’s commanders.',
          status: 'Invasion',
          tone: 'no',
        },
        {
          name: 'Malfurion and Cenarius',
          text: 'Cenarius’s student Malfurion became the first druid and brought the ancient powers of the forest to the resistance.',
          status: 'Resistance',
          tone: 'al',
        },
        {
          name: 'Illidan’s vials',
          text: 'Illidan would not let the source of magic be lost: he filled a few vials from the Well and poured them into a lake on Mount Hyjal, and a new Well was born.',
          status: 'A hidden well',
          tone: 'mute',
        },
      ],
      note: 'The night elves saw with their own eyes that magic could burn the world. For the next ten thousand years they banned arcane magic.',
    },
    vigil: {
      title: 'A ten-thousand-year vigil',
      intro:
        'The night elves who survived the Sundering gathered again at the foot of Mount Hyjal. The new Well Illidan had made stood above them like a threat.',
      more: [
        'Malfurion and the druids planted a giant tree over the Well: the World Tree Nordrassil. The Dragon Aspects blessed it; Nordrassil sealed the Well and gave the night elves immortality.',
        'Malfurion banned arcane magic and imprisoned Illidan in a dungeon beneath Hyjal, with Maiev Shadowsong and the Watchers as his jailers. The druids entered the Emerald Dream in the Barrow Dens and slept for centuries, while Tyrande and the Sentinels stayed awake to guard their people.',
        'The Highborne who would not give up magic were sent into exile. They crossed the sea to the Eastern Kingdoms and founded Quel’Thalas: the high elves are their descendants.',
        'About a thousand years ago, qiraji armies poured out of Ahn’Qiraj in Silithus. In the War of the Shifting Sands the night elves, helped by the bronze dragons, sealed them behind the Scarab Wall; Fandral Staghelm’s son Valstann died in that war.',
      ],
      places: [
        { tag: 'Sacred tree', name: 'Nordrassil', text: 'The World Tree on the summit of Mount Hyjal. It sealed the second Well and gave the night elves immortality.' },
        { tag: 'Home of the druids', name: 'Moonglade', text: 'The druids’ sacred vale. Nighthaven, the heart of the Cenarion Circle, stands here today.' },
        { tag: 'A sealed gate', name: 'Ahn’Qiraj', text: 'The fortress of the qiraji and the Old God C’Thun in Silithus, sealed behind the Scarab Wall.' },
      ],
      note: 'Immortality was a gift with a price: for ten thousand years the night elves lived apart from the rest of the world and barely changed.',
    },
    hyjal: {
      title: 'The night the tree was sacrificed',
      intro: 'Ten thousand years later the Burning Legion returned. As you scroll, the map shows the last act of the Third War in Kalimdor step by step.',
      mapLabel: 'Northern Kalimdor in the Third War',
      steps: [
        {
          era: 'Third War',
          title: 'Strangers arrive',
          text: 'Orcs and humans cross the sea and set foot in Kalimdor. Thrall’s Horde and Jaina’s humans enter night elf lands they know nothing about, and the Sentinels treat them as enemies.',
          status: 'Border',
          tone: 'mute',
        },
        {
          era: 'Ashenvale',
          title: 'Cenarius falls',
          text: 'Grom Hellscream’s Warsong orcs cut down the sacred trees of Ashenvale. Cenarius comes to defend the forest, but Grom, strengthened by drinking demon blood, kills him.',
          status: 'Loss',
          tone: 'no',
        },
        {
          era: 'Felwood',
          title: 'Illidan set free',
          text: 'To find power against the Legion, Tyrande frees Illidan from his prison. Illidan drains the power of the Skull of Gul’dan and kills Tichondrius, one of the Legion’s commanders; but the power changes him too, and Malfurion banishes him. The forest the skull poisoned becomes Felwood.',
          status: 'Corruption',
          tone: 'no',
        },
        {
          era: 'Mount Hyjal',
          title: 'Three peoples, one front',
          text: 'At the call of the prophet Medivh, Malfurion, Thrall and Jaina join forces on Mount Hyjal. Humans, orcs and night elves slow Archimonde’s march on Nordrassil step by step.',
          status: 'Alliance',
          tone: 'al',
        },
        {
          era: 'Nordrassil',
          title: 'The tree’s sacrifice',
          text: 'When Archimonde reaches the tree, Malfurion sounds the Horn of Cenarius. Thousands of wisps swarm Archimonde and destroy him with the tree’s power. Nordrassil is left half burned, and the night elves lose their immortality.',
          status: 'Victory',
          tone: 'ok',
        },
      ],
      note: 'Losing their immortality brought the night elves back into the world. Now they age too, and they know they cannot stand alone.',
    },
    today: {
      title: 'In the shadow of Teldrassil',
      intro: [
        'Wanting to win back immortality, Archdruid Fandral Staghelm planted a new World Tree off the coast of Darkshore: Teldrassil. The Dragon Aspects did not bless it, and signs of corruption already show among its branches.',
        'The night elves’ new capital, Darnassus, rose on its crown. Tyrande Whisperwind leads her people, while Malfurion was lost deep in the Emerald Dream and has not returned.',
        'After the Third War the night elves gave up thousands of years of solitude and joined the Alliance. Today they fight the Horde in the forests of Ashenvale and the remnants of the Legion in Felwood.',
      ],
      leadersLabel: 'Leaders',
      leadersText: 'Who leads Darnassus today.',
      leaders: [
        {
          role: 'High Priestess of Elune',
          name: 'Tyrande Whisperwind',
          text: 'Leader of her people since the War of the Ancients and commander of the Sentinels. She rules from the Temple of the Moon in Darnassus.',
        },
        {
          role: 'Archdruid',
          name: 'Fandral Staghelm',
          text: 'Head of the druids while Malfurion is gone. He planted Teldrassil, and he lost his son Valstann in the War of the Shifting Sands.',
        },
        {
          role: 'Lost',
          name: 'Malfurion Stormrage',
          text: 'The first druid and the man Tyrande loves. After the Third War he entered the Emerald Dream and never woke.',
        },
      ],
      treeLabel: 'Teldrassil',
      treeTitle: 'A world on top of a tree',
      treeText: [
        'Teldrassil is so vast that its boughs are as wide as a whole region. Night elf characters begin the game in Shadowglen; the roads from the village of Dolanaar to Darnassus run along the top of the tree.',
        'The boat from Rut’theran Village at the foot of the tree sails to Auberdine on the coast of Darkshore; that harbour is the night elves’ link to the mainland.',
      ],
      treeCaption: 'Teldrassil.',
      boatKey: 'Boat',
      treeLegend: [
        { name: 'Darnassus', text: 'The night elf capital, home of the Temple of the Moon' },
        { name: 'Shadowglen', text: 'The vale where night elf characters begin' },
        { name: 'Dolanaar', text: 'The village in the middle of the tree' },
        { name: 'Rut’theran Village', text: 'The harbour at the foot of the tree; the boat to Auberdine leaves here' },
      ],
      beyondLabel: 'Beyond Teldrassil',
      beyondTitle: 'Watch posts across Kalimdor',
      beyondText: [
        'The night elves guard their lands with outposts scattered through the forests of Kalimdor: Auberdine in Darkshore, Astranaar in Ashenvale, Feathermoon Stronghold off the coast of Feralas. Nighthaven in Moonglade is where the druids gather.',
        'The boat from Auberdine sails to Menethil Harbor in the Wetlands; it is the road that ties the night elves to the rest of the Alliance.',
      ],
      mapCaption: 'Night elf settlements in Kalimdor. Positions are approximate.',
      routesKey: 'Sea routes',
      legend: [
        { name: 'Darnassus', text: 'The capital on the crown of Teldrassil' },
        { name: 'Auberdine', text: 'The harbour town on the coast of Darkshore' },
        { name: 'Astranaar', text: 'The outpost at the heart of Ashenvale' },
        { name: 'Nighthaven', text: 'The druids’ village in Moonglade' },
        { name: 'Feathermoon Stronghold', text: 'The island fortress off Feralas' },
        { name: 'Menethil Harbor', text: 'The harbour that leads to the Eastern Kingdoms' },
      ],
      note: 'A people who lived apart from the world for ten thousand years are now the oldest and most seasoned members of the Alliance.',
    },
    outro: {
      title: 'A vigil by moonlight',
      text: 'Once they set the world on fire; then they guarded it for ten thousand years. Elune’s light still lies on the branches of Teldrassil.',
      nextText: 'The people who came from Draenor: the founding of the Horde and Thrall’s Kalimdor.',
    },
    images: 'The Well of Eternity illustration and the Azshara, Moonglade and Mount Hyjal images belong to Blizzard Entertainment. Maps from WoW Forever.',
  },
};

export const ORC_ART_LABELS: Record<Lang, Record<string, string>> = {
  tr: {
    heroAria: 'Durotar’ın kızıl kayalıkları üzerinde batan güneş, Orgrimmar’ın sivri surları ve Horde sancakları',
    portalAria: 'Eastern Kingdoms haritasında Horde’un iki savaştaki yolu: Dark Portal, Stormwind, Blackrock Spire, Grim Batol ve Lordaeron',
    toTomb: 'Tomb of Sargeras’a',
    chainsAria: 'Kaydırdıkça kopan zincir: iki kelepçe ve aradaki halkalar',
    chained: 'Esaret',
    free: 'Özgürlük',
    ekAria: 'Horde’un Lordaeron’dan Kalimdor’a göçü: deniz yolu, Darkspear adası, The Barrens ve Ashenvale; adım adım',
    stormIsle: 'Fırtına adası',
    centaurs: 'Centaur’lar',
    durotarAria: 'Durotar haritası: Orgrimmar, Valley of Trials, Razor Hill, Sen’jin Village, Echo Isles ve Tiragarde Keep; Valley of Trials’tan Orgrimmar’a giden yol',
    worldAria: 'Horde karakolları ve zeppelin yolları: Orgrimmar, Crossroads, Splintertree Post, Grom’gol Base Camp, Stonard ve Hammerfall',
  },
  en: {
    heroAria: 'The sun setting over the red crags of Durotar, the spiked walls of Orgrimmar and Horde banners',
    portalAria: 'The Horde’s road through both wars on the map of the Eastern Kingdoms: the Dark Portal, Stormwind, Blackrock Spire, Grim Batol and Lordaeron',
    toTomb: 'To the Tomb of Sargeras',
    chainsAria: 'A chain that breaks as you scroll: two shackles and the links between them',
    chained: 'Captivity',
    free: 'Freedom',
    ekAria: 'The Horde’s exodus from Lordaeron to Kalimdor: the sea road, the Darkspear isle, the Barrens and Ashenvale, step by step',
    stormIsle: 'Storm-wrecked isle',
    centaurs: 'Centaurs',
    durotarAria: 'Map of Durotar: Orgrimmar, the Valley of Trials, Razor Hill, Sen’jin Village, the Echo Isles and Tiragarde Keep; the road from the Valley of Trials to Orgrimmar',
    worldAria: 'Horde outposts and zeppelin routes: Orgrimmar, the Crossroads, Splintertree Post, Grom’gol Base Camp, Stonard and Hammerfall',
  },
};

export interface OrcStory {
  metaDescription: string;
  overline: string;
  lead: string;
  facts: { label: string; value: string; extra?: string }[];
  chapters: Record<'origin' | 'portal' | 'camps' | 'exodus' | 'today', string>;
  origin: { title: string; titleNote: string; paragraphs: string[]; stagesLabel: string; stages: Item[]; before: string; after: string; note: string };
  portal: {
    title: string;
    intro: string;
    more: string[];
    figureCaption: string;
    hordeKey: string;
    allianceKey: string;
    guldanKey: string;
    legend: Item[];
    cards: Card[];
    note: string;
  };
  camps: { title: string; intro: string; more: string[]; figureCaption: string; cards: Card[]; note: string };
  exodus: { title: string; intro: string; mapLabel: string; steps: Step[]; note: string };
  today: {
    title: string;
    intro: string[];
    leadersLabel: string;
    leadersText: string;
    leaders: (Item & { role: string })[];
    landLabel: string;
    landTitle: string;
    landText: string[];
    landCaption: string;
    pathKey: string;
    landLegend: Item[];
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

export const ORC_STORY: Record<Lang, OrcStory> = {
  tr: {
    metaDescription:
      'Orc’ların hikayesi: Draenor’un shaman klanları, Kil’jaeden’in aldatmacası ve kan laneti, Dark Portal ve iki savaş, toplama kampları, Thrall’ın yeni Horde’u ve Durotar.',
    overline: 'Hikaye 05',
    lead: 'Başka bir dünyadan gelen savaşçı halk. Bir demonun kanıyla Azeroth’u yaktılar, kamplarda unutuldular; sonra bir kölenin önderliğinde zincirlerini kırdılar.',
    facts: [
      { label: 'Yurt', value: 'Durotar', extra: 'Kalimdor' },
      { label: 'Başkent', value: 'Orgrimmar' },
      { label: 'Lider', value: 'Thrall' },
      { label: 'İnanç', value: 'Şamanizm', extra: 'elementler ve atalar' },
      { label: 'Binek', value: 'Kurt' },
      { label: 'Anavatan', value: 'Draenor' },
    ],
    chapters: { origin: 'Köken', portal: 'Kapı', camps: 'Kamplar', exodus: 'Göç', today: 'Bugün' },
    origin: {
      title: 'Elementlerin halkı',
      titleNote: '(Draenor)',
      paragraphs: [
        'Orc’ların hikayesi Azeroth’ta değil, başka bir dünyada başlar: Draenor. Orc’lar orada klanlar hâlinde yaşayan avcı ve savaşçı bir halktı; tenleri kahverengiydi ve Draenor’un bozkırlarına, ormanlarına, karlı dağlarına dağılmışlardı.',
        'Klanlara yol gösterenler shaman’lardı: toprak, ateş, su ve hava ruhlarıyla, yani elementlerle ve ataların ruhlarıyla konuşan bilgeler. En saygı göreni yaşlı shaman Ner’zhul’du. Orc’lar Draenor’u, başka bir dünyadan kaçıp oraya sığınmış draenei’lerle paylaşıyordu.',
        'Draenei’lerin peşinde Burning Legion’ın lordlarından Kil’jaeden vardı ve orc’ları bu av için bir silaha çevirmeye karar verdi. Ner’zhul’a ataların sesiyle göründü ve draenei’lerin orc’lara saldırmaya hazırlandığını fısıldadı. Ner’zhul sonunda aldatıldığını anladı, ama Kil’jaeden bu kez onun çırağı Gul’dan’ı buldu.',
        'Gul’dan, Shadow Council adlı gizli bir grup kurdu ve orc’lara demon büyüsünü, fel’i öğretti. Elementler bu büyüye dönen shaman’lara sırt çevirdi; fel Draenor’u kuruttu ve orc’ların tenini yeşile boyadı. Son adım bir törende atıldı: klan şefleri pit lord Mannoroth’un kanını içti. İlk içen Grom Hellscream’di; reddedenlerden biri Frostwolf klanının şefi Durotan oldu. Kan, birleşen klanlara, yani Horde’a dinmeyen bir öfke verdi ve draenei’lerin şehirleri birer birer düştü.',
      ],
      stagesLabel: 'Horde’un doğuş aşamaları',
      stages: [
        { name: 'Shaman', text: 'Elementlerle konuşan bilgeler' },
        { name: 'Kil’jaeden', text: 'Ner’zhul’u aldatan demon' },
        { name: 'Gul’dan', text: 'Fel büyüsünün ustası' },
        { name: 'Horde', text: 'Kanla birleşen klanlar' },
      ],
      before: 'Shaman',
      after: 'Horde',
      note: 'Orc’ların yeşil teni bu yozlaşmanın izidir. Kanın öfkesi Horde’u yıllarca yönetecek; orc’lar bu lanetten ancak çok sonra, Kalimdor’da kurtulacaktı.',
    },
    portal: {
      title: 'Kapıdan geçen ordu',
      intro:
        'Draenei’lerin çoğu yok edildi ama Horde’un öfkesi dinmedi; Draenor ise ölmek üzereydi. Gul’dan’ın warlock’ları, Azeroth’taki büyücü Medivh’le birlikte iki dünya arasında bir geçit açtı: Dark Portal.',
      more: [
        'Horde, Black Morass bataklığından Azeroth’a çıktı ve Stormwind krallığına saldırdı. First War’da Orgrim Doomhammer, Gul’dan’ın kuklası olan warchief Blackhand’i öldürüp Horde’un başına geçti. Yarı-orc Garona King Llane’i öldürdü ve Stormwind yerle bir oldu.',
        'Second War’da Doomhammer Horde’u kuzeye yürüttü. Amani trolleri, ogre’lar ve goblin’ler ona katıldı; Dragonmaw klanı ejderha kraliçesi Alexstrasza’yı Grim Batol’da tutsak edip kırmızı ejderhaları savaşa sürdü. Horde Khaz Modan’ı geçti ve Lordaeron’un başkentini kuşattı.',
        'Zafer çok yakındı. Ama tam o sırada Gul’dan, Tomb of Sargeras’ta saklı gücü ele geçirmek için kendisine bağlı klanlarla Horde’u terk etti. Bölünen Horde geri çekildi ve Alliance onu Blackrock Spire’a kadar kovaladı. Doomhammer orada Anduin Lothar’ı öldürdü ama savaşı kaybetti; Dark Portal yıkıldı.',
      ],
      figureCaption: 'Horde’un iki savaştaki yolu; kaydırdıkça çiziliyor. Konumlar yaklaşıktır.',
      hordeKey: 'Horde',
      allianceKey: 'Alliance’ın karşı saldırısı',
      guldanKey: 'Gul’dan’ın ihaneti',
      legend: [
        { name: 'Dark Portal', text: 'Horde’un Azeroth’a çıktığı kapı' },
        { name: 'Stormwind', text: 'First War’da yerle bir edilen şehir' },
        { name: 'Blackrock Spire', text: 'Horde’un Second War’daki kalesi' },
        { name: 'Grim Batol', text: 'Dragonmaw’ın Alexstrasza’yı tuttuğu kale' },
        { name: 'Lordaeron', text: 'Horde’un kuşattığı başkent' },
      ],
      cards: [
        {
          name: 'Blackhand',
          text: 'Blackrock klanının şefi ve Horde’un ilk warchief’i. Gerçek güç Gul’dan’daydı; Blackhand onun kuklasıydı. Doomhammer onu bir düelloda öldürdü.',
          status: 'İlk warchief',
          tone: 'mute',
        },
        {
          name: 'Orgrim Doomhammer',
          text: 'Durotan’ın yakın dostu ve Horde’un ikinci warchief’i. Shadow Council’i dağıttı ve Horde’u Second War’da Lordaeron’un kapılarına kadar götürdü.',
          status: 'Warchief',
          tone: 'home',
        },
        {
          name: 'Gul’dan',
          text: 'Öldürülen warlock’ların ruhlarını Stormwind şövalyelerinin bedenlerine bağlayıp ilk death knight’ları yarattı. Savaşın en kritik anında Horde’u terk etti ve Tomb of Sargeras’ta öldü.',
          status: 'İhanet',
          tone: 'no',
        },
        {
          name: 'Dragonmaw',
          text: 'Alexstrasza’yı Grim Batol’da tutsak eden klan. Onun yavrularını Horde’un savaş ejderhaları yaptılar; Dragonmaw orc’ları bugün de Wetlands’te.',
          status: 'Esir ejderhalar',
          tone: 'no',
        },
      ],
      note: 'Horde’u yenen yalnızca Alliance değildi. Gul’dan’ın ihaneti, demon gücüne yaslanan bir ordunun içeriden nasıl çürüdüğünü gösterdi.',
    },
    camps: {
      title: 'Köle denen çocuk',
      intro:
        'Second War’dan sonra hayatta kalan orc’lar Lordaeron’da kurulan toplama kamplarına kapatıldı. Demon kanının etkisi geçince Horde’un öfkesi yerini derin bir uyuşukluğa bıraktı; bir zamanlar dünyaları yakan savaşçılar parmaklıkların ardında günlerini boş geçirdi.',
      more: [
        'Kampların merkezi Durnholde Keep’ti; kalenin komutanı Aedelas Blackmoore’du. Blackmoore, ormanda öldürülmüş bir orc çiftinin yanında bulduğu bebeği yanına aldı ve onu gladyatör olarak yetiştirdi. Ona “köle” anlamına gelen bir ad verdi: Thrall. Bebeğin Durotan’ın oğlu olduğunu bilmiyordu.',
        'Thrall’a insanların dilini, savaş taktiklerini, okuma yazmayı öğrettiler; ama o hep bir köleydi. Kalede ona dostça davranan tek kişi genç Taretha Foxton’du. Thrall onun yardımıyla Durnholde’dan kaçtı.',
        'Özgür kalan Thrall halkını aradı. Hâlâ insanlarla savaşan Grom Hellscream’i buldu, sonra Alterac Mountains’ta saklanan Frostwolf klanına ulaştı. Frostwolf’ların yaşlı shaman’ı Drek’Thar ona elementlerle konuşmayı öğretti; Thrall halkının unuttuğu yolu, şamanizmi öğrendi.',
        'Saklandığı yerden çıkan Orgrim Doomhammer de ona katıldı. Birlikte kampları birer birer açtılar. Bir baskında ölümcül şekilde yaralanan Doomhammer, ölmeden önce zırhını, çekicini ve Horde’u Thrall’a bıraktı. Yeni warchief Durnholde’a geri döndü ve Blackmoore’u yendi.',
      ],
      figureCaption: 'Kaydırdıkça zincir kopuyor.',
      cards: [
        {
          name: 'Aedelas Blackmoore',
          text: 'Durnholde Keep’in komutanı. Thrall’ı bir silah gibi yetiştirdi ve onun önderliğinde bir orc ordusuyla kendi gücünü kurmayı hayal etti. Thrall’ın Durnholde’a saldırısında öldü.',
          status: 'Gardiyan',
          tone: 'no',
        },
        {
          name: 'Taretha Foxton',
          text: 'Durnholde’da Thrall’la gizlice mektuplaşan genç kadın. Kaçmasına yardım etti; Blackmoore bunu öğrenince onu öldürttü.',
          status: 'Dost',
          tone: 'al',
        },
        {
          name: 'Grom Hellscream',
          text: 'Warsong klanının şefi ve kanı ilk içen orc. Thrall’ın kaçtıktan sonra bulduğu ilk büyük şefti; onun ilk müttefiki ve en yakın dostu oldu.',
          status: 'Warsong',
          tone: 'home',
        },
        {
          name: 'Orgrim Doomhammer',
          text: 'Second War’dan sonra esir düşen, sonra kaçıp saklanan eski warchief. Son savaşında Horde’u Thrall’a emanet etti; Orgrimmar onun adını taşır.',
          status: 'Miras',
          tone: 'mute',
        },
      ],
      note: 'Thrall’ın Horde’u demon kanıyla değil, şamanizm ve onurla bir arada duruyordu. Eski Horde’la yeni Horde arasındaki fark buydu.',
    },
    exodus: {
      title: 'Batıya, Kalimdor’a',
      intro: 'Kamplar boşaldı ama Lordaeron’da orc’lara yer yoktu. Kaydırdıkça harita, Horde’un okyanusu aşıp yeni bir yurt bulmasını adım adım gösteriyor.',
      mapLabel: 'Horde’un Kalimdor’a göçü',
      steps: [
        {
          era: 'Lordaeron',
          title: 'Peygamberin çağrısı',
          text: 'Thrall’ın karşısına kuzgun kılığında gizemli bir peygamber çıkar: Medivh. Lordaeron’u bir felaketin beklediğini söyler ve Horde’u batıya, Kalimdor’a gönderir. Thrall insanların gemilerini ele geçirip denize açılır.',
          status: 'Yola çıkış',
          tone: 'home',
        },
        {
          era: 'Darkspear',
          title: 'Fırtınanın adası',
          text: 'Bir fırtına filoyu bir adaya savurur. Horde orada Darkspear trollerine yardım eder; şefleri Sen’jin hayatını kaybeder, oğlu Vol’jin ve halkı Horde’a katılır.',
          status: 'Yeni müttefik',
          tone: 'ok',
        },
        {
          era: 'The Barrens',
          title: 'Tauren’ler',
          text: 'Kalimdor’a çıkan Horde, The Barrens’ın bozkırlarında centaur’larla savaşan tauren’lere rastlar. Thrall, Cairne Bloodhoof’un halkının Mulgore’a ulaşmasına yardım eder; iki halk arasında kalıcı bir dostluk doğar.',
          status: 'Dostluk',
          tone: 'ok',
        },
        {
          era: 'Ashenvale',
          title: 'Kan yeniden',
          text: 'Grom Hellscream’in Warsong’ları Ashenvale’de ağaç keserken night elf’lerle ve yarı-tanrı Cenarius’la çatışır. Zafer için Grom, Mannoroth’un kanıyla zehirlenmiş bir pınardan içer; Cenarius’u öldürür ama yeniden Legion’ın kölesi olur.',
          status: 'Yozlaşma',
          tone: 'no',
        },
        {
          era: 'Demon Fall Canyon',
          title: 'Lanetin sonu',
          text: 'Thrall, Jaina Proudmoore’un yardımıyla Grom’u yakalar ve onu lanetten arındırır. İkisi birlikte Mannoroth’un karşısına çıkar; Grom baltasını demona saplayıp onu öldürür, ama kendisi de ölür. Orc’ları bağlayan kan laneti onunla birlikte sona erer.',
          status: 'Kurtuluş',
          tone: 'ok',
        },
      ],
      note: 'Grom’un fedakârlığıyla orc’lar özgürleşti. Kısa süre sonra Thrall, Jaina ve Malfurion Mount Hyjal’da Burning Legion’a karşı birlikte savaştı ve Archimonde yenildi.',
    },
    today: {
      title: 'Durotar’ın kızıl toprakları',
      intro: [
        'Third War’dan sonra Thrall halkını Kalimdor’un doğu kıyısındaki kurak, kızıl bir toprağa yerleştirdi ve oraya babasının adını verdi: Durotar. Başkent Orgrimmar ise adını Orgrim Doomhammer’dan aldı.',
        'Barış uzun sürmedi. Jaina’nın babası Daelin Proudmoore bir donanmayla Durotar’a saldırdı; Thrall ve müttefikleri onu yendi, Proudmoore bu savaşta öldü. Kıyıdaki Tiragarde Keep’te Kul Tiras askerleri hâlâ bekliyor.',
        'Bugün Horde yalnızca orc’lardan oluşmuyor: Darkspear trolleri, tauren’ler ve Forsaken’lar da Thrall’ın sancağı altında. Orc’lar ise Ashenvale’de night elf’lerle, kendi topraklarında da Burning Blade kültüyle savaşıyor.',
      ],
      leadersLabel: 'Liderler',
      leadersText: 'Orc’ların bugünkü önderleri.',
      leaders: [
        {
          role: 'Horde’un warchief’i',
          name: 'Thrall',
          text: 'Durotan’ın oğlu, Frostwolf klanının şefi ve bir shaman. Horde’u Orgrimmar’daki Grommash Hold’dan yönetiyor.',
        },
        {
          role: 'Danışman',
          name: 'Eitrigg',
          text: 'Second War’ın yaşlı gazisi. Paladin Tirion Fordring bir zamanlar onun hayatını bağışlamış, bu yüzden şövalyeliğini kaybetmişti. Bugün Grommash Hold’da Thrall’ın yanında.',
        },
        {
          role: 'Frostwolf’ların shaman’ı',
          name: 'Drek’Thar',
          text: 'Thrall’a şamanizmi öğreten yaşlı, kör shaman. Bugün Alterac Valley’de Frostwolf klanını Stormpike dwarf’larına karşı yönetiyor.',
        },
      ],
      landLabel: 'Durotar',
      landTitle: 'Kızıl kanyonların ülkesi',
      landText: [
        'Orc ve troll karakterler oyuna Durotar’ın güneyindeki Valley of Trials’ta başlar. Yol Razor Hill’den geçip kuzeyde Orgrimmar’ın kapılarına uzanır.',
        'Güney kıyısındaki Sen’jin Village ve açıklardaki Echo Isles, Darkspear trollerinin yurdu. Doğu kıyısındaki Tiragarde Keep ise Proudmoore’un askerlerinden kalan kale.',
      ],
      landCaption: 'Durotar.',
      pathKey: 'Başlangıç yolu',
      landLegend: [
        { name: 'Orgrimmar', text: 'Horde’un başkenti; Grommash Hold burada' },
        { name: 'Valley of Trials', text: 'Orc ve troll karakterlerin başladığı vadi' },
        { name: 'Razor Hill', text: 'Durotar’ın ortasındaki orc kasabası' },
        { name: 'Sen’jin Village', text: 'Darkspear trollerinin köyü' },
        { name: 'Echo Isles', text: 'Darkspear trollerinin açıktaki adaları' },
        { name: 'Tiragarde Keep', text: 'Kul Tiras askerlerinin kıyıdaki kalesi' },
      ],
      beyondLabel: 'Durotar’ın ötesinde',
      beyondTitle: 'Horde’un karakolları',
      beyondText: [
        'Orc’lar iki kıtaya dağılmış karakollarla Horde’un sınırlarını tutuyor: The Barrens’ta Crossroads, Ashenvale’de Splintertree Post, Stranglethorn Vale’de Grom’gol Base Camp, Swamp of Sorrows’ta Stonard ve Arathi Highlands’te Hammerfall. Orgrimmar’ın dışındaki kulelerden kalkan zeppelin’ler Grom’gol’a ve Undercity’ye gider.',
        'Her orc Thrall’ın yolunu seçmedi. Blackhand’in oğlu Rend Blackhand, Blackrock Spire’da kendini warchief ilan edip Dark Horde’u kurdu; Dragonmaw’lar hâlâ Wetlands’te, Burning Blade kültü ise Durotar’ın mağaralarında ve Desolace’te demon büyüsünü sürdürüyor.',
      ],
      mapCaption: 'Horde karakolları ve zeppelin yolları. Konumlar yaklaşıktır.',
      routesKey: 'Zeppelin yolları',
      legend: [
        { name: 'Orgrimmar', text: 'Zeppelin kulelerinin olduğu başkent' },
        { name: 'Crossroads', text: 'The Barrens’ın ortasındaki karakol' },
        { name: 'Splintertree Post', text: 'Ashenvale’deki Horde karakolu' },
        { name: 'Grom’gol Base Camp', text: 'Stranglethorn Vale’deki Horde kampı' },
        { name: 'Stonard', text: 'Swamp of Sorrows’taki orc kasabası' },
        { name: 'Hammerfall', text: 'Arathi Highlands’teki orc karakolu' },
      ],
      note: 'Kanla kurulan eski Horde bir dünyayı yaktı. Onurla kurulan yeni Horde ise Azeroth’ta yeri olmayan halklara bir yurt oldu.',
    },
    outro: {
      title: 'Lok’tar ogar',
      text: 'Zafer ya da ölüm, der orc’lar. Bir kez kanla bağlandılar, sonra zincirlerini kırdılar; şimdi Durotar’ın kızıl toprağında kendi kaderlerini yazıyorlar.',
      nextText: 'Echo Isles’ın halkı: voodoo, loa’lar ve Darkspear trollerinin Horde’a katılışı.',
    },
    images: 'Haritalar WoW Forever’dan. Kapak ve zincir çizimleri bu sayfa için hazırlandı. World of Warcraft adları Blizzard Entertainment’a aittir.',
  },
  en: {
    metaDescription:
      'The orcs’ story: the shaman clans of Draenor, Kil’jaeden’s deceit and the blood curse, the Dark Portal and two wars, the internment camps, Thrall’s new Horde and Durotar.',
    overline: 'Story 05',
    lead: 'A warrior people from another world. Bound by a demon’s blood they set Azeroth on fire, were forgotten in the camps, then broke their chains under a slave’s lead.',
    facts: [
      { label: 'Homeland', value: 'Durotar', extra: 'Kalimdor' },
      { label: 'Capital', value: 'Orgrimmar' },
      { label: 'Leader', value: 'Thrall' },
      { label: 'Faith', value: 'Shamanism', extra: 'the elements and the ancestors' },
      { label: 'Mount', value: 'Wolf' },
      { label: 'Homeworld', value: 'Draenor' },
    ],
    chapters: { origin: 'Origin', portal: 'Portal', camps: 'Camps', exodus: 'Exodus', today: 'Today' },
    origin: {
      title: 'People of the elements',
      titleNote: '(Draenor)',
      paragraphs: [
        'The orcs’ story does not begin on Azeroth but on another world: Draenor. There the orcs were a people of hunters and warriors living in clans; their skin was brown, and they were scattered across Draenor’s steppes, forests and snowy mountains.',
        'The clans were guided by shamans: sages who spoke with the spirits of earth, fire, water and air, the elements, and with the spirits of the ancestors. The most revered was the old shaman Ner’zhul. The orcs shared Draenor with the draenei, a people who had fled another world and found refuge there.',
        'Kil’jaeden, one of the lords of the Burning Legion, was hunting the draenei, and he decided to turn the orcs into a weapon for the hunt. He came to Ner’zhul in the voice of the ancestors and whispered that the draenei were preparing to attack the orcs. Ner’zhul saw through the lie in the end, but Kil’jaeden found his apprentice, Gul’dan.',
        'Gul’dan founded a secret circle called the Shadow Council and taught the orcs demonic magic: fel. The elements turned away from the shamans who took it up; fel withered Draenor and turned the orcs’ skin green. The last step was a ceremony: the clan chieftains drank the blood of the pit lord Mannoroth. Grom Hellscream drank first; among those who refused was Durotan, chieftain of the Frostwolf clan. The blood gave the united clans, the Horde, a rage that would not cool, and the draenei cities fell one by one.',
      ],
      stagesLabel: 'Stages of the Horde’s birth',
      stages: [
        { name: 'Shaman', text: 'Sages who speak with the elements' },
        { name: 'Kil’jaeden', text: 'The demon who deceived Ner’zhul' },
        { name: 'Gul’dan', text: 'Master of fel magic' },
        { name: 'Horde', text: 'Clans bound by blood' },
      ],
      before: 'Shaman',
      after: 'Horde',
      note: 'The orcs’ green skin is the mark of that corruption. The blood’s rage would rule the Horde for years; the orcs would only break free of the curse much later, in Kalimdor.',
    },
    portal: {
      title: 'The army through the gate',
      intro:
        'Most of the draenei were wiped out, but the Horde’s rage did not cool, and Draenor itself was dying. Gul’dan’s warlocks, together with Medivh, a sorcerer on Azeroth, opened a gateway between the two worlds: the Dark Portal.',
      more: [
        'The Horde came out into Azeroth in the swamp of the Black Morass and attacked the kingdom of Stormwind. In the First War Orgrim Doomhammer killed the warchief Blackhand, Gul’dan’s puppet, and took the Horde for himself. The half-orc Garona killed King Llane, and Stormwind was razed.',
        'In the Second War Doomhammer marched the Horde north. Amani trolls, ogres and goblins joined him; the Dragonmaw clan took the Dragonqueen Alexstrasza captive at Grim Batol and drove the red dragons to war. The Horde crossed Khaz Modan and laid siege to the capital of Lordaeron.',
        'Victory was close. But at that very moment Gul’dan abandoned the Horde with the clans loyal to him, to seize the power hidden in the Tomb of Sargeras. The divided Horde fell back, and the Alliance chased it all the way to Blackrock Spire. There Doomhammer killed Anduin Lothar, but he lost the war, and the Dark Portal was destroyed.',
      ],
      figureCaption: 'The Horde’s road through both wars, drawn as you scroll. Positions are approximate.',
      hordeKey: 'Horde',
      allianceKey: 'Alliance counter-attack',
      guldanKey: 'Gul’dan’s betrayal',
      legend: [
        { name: 'Dark Portal', text: 'The gate the Horde came through' },
        { name: 'Stormwind', text: 'The city razed in the First War' },
        { name: 'Blackrock Spire', text: 'The Horde’s fortress in the Second War' },
        { name: 'Grim Batol', text: 'Where the Dragonmaw held Alexstrasza' },
        { name: 'Lordaeron', text: 'The capital the Horde besieged' },
      ],
      cards: [
        {
          name: 'Blackhand',
          text: 'Chieftain of the Blackrock clan and the Horde’s first warchief. The real power was Gul’dan’s; Blackhand was his puppet. Doomhammer killed him in a duel.',
          status: 'First warchief',
          tone: 'mute',
        },
        {
          name: 'Orgrim Doomhammer',
          text: 'Durotan’s close friend and the Horde’s second warchief. He broke up the Shadow Council and led the Horde to the gates of Lordaeron in the Second War.',
          status: 'Warchief',
          tone: 'home',
        },
        {
          name: 'Gul’dan',
          text: 'He bound the spirits of slain warlocks to the bodies of Stormwind’s knights and made the first death knights. At the war’s most critical moment he abandoned the Horde, and he died in the Tomb of Sargeras.',
          status: 'Betrayal',
          tone: 'no',
        },
        {
          name: 'Dragonmaw',
          text: 'The clan that held Alexstrasza captive at Grim Batol. They made her young the Horde’s war dragons; Dragonmaw orcs are still in the Wetlands today.',
          status: 'Captive dragons',
          tone: 'no',
        },
      ],
      note: 'The Alliance was not all that beat the Horde. Gul’dan’s betrayal showed how an army leaning on demonic power rots from within.',
    },
    camps: {
      title: 'A boy named Slave',
      intro:
        'After the Second War the surviving orcs were locked in internment camps built across Lordaeron. Once the demon blood wore off, the Horde’s rage gave way to a deep lethargy; warriors who had once burned worlds sat out their days behind the bars.',
      more: [
        'The camps were run from Durnholde Keep, and the keep’s commander was Aedelas Blackmoore. Blackmoore took in a baby he had found beside an orc couple slain in the forest and raised him as a gladiator. He gave him a name that means “slave”: Thrall. He did not know the baby was Durotan’s son.',
        'Thrall was taught the humans’ tongue, their tactics, reading and writing, but he was always a slave. The only one in the keep who treated him kindly was young Taretha Foxton. With her help Thrall escaped from Durnholde.',
        'Free at last, Thrall went looking for his people. He found Grom Hellscream, still fighting the humans, then reached the Frostwolf clan hiding in the Alterac Mountains. The Frostwolves’ old shaman, Drek’Thar, taught him to speak with the elements; Thrall learned the way his people had forgotten, shamanism.',
        'Orgrim Doomhammer came out of hiding to join him. Together they broke open the camps one by one. Mortally wounded in a raid, Doomhammer left his armour, his hammer and the Horde to Thrall before he died. The new warchief went back to Durnholde and defeated Blackmoore.',
      ],
      figureCaption: 'The chain breaks as you scroll.',
      cards: [
        {
          name: 'Aedelas Blackmoore',
          text: 'Commander of Durnholde Keep. He raised Thrall like a weapon and dreamt of building his own power with an orc army led by him. He died in Thrall’s attack on Durnholde.',
          status: 'Jailer',
          tone: 'no',
        },
        {
          name: 'Taretha Foxton',
          text: 'The young woman at Durnholde who secretly exchanged letters with Thrall. She helped him escape; when Blackmoore found out, he had her killed.',
          status: 'Friend',
          tone: 'al',
        },
        {
          name: 'Grom Hellscream',
          text: 'Chieftain of the Warsong clan and the first orc to drink the blood. He was the first great chieftain Thrall found after his escape, and became his first ally and closest friend.',
          status: 'Warsong',
          tone: 'home',
        },
        {
          name: 'Orgrim Doomhammer',
          text: 'The old warchief, captured after the Second War, who escaped and went into hiding. In his last battle he entrusted the Horde to Thrall; Orgrimmar bears his name.',
          status: 'Legacy',
          tone: 'mute',
        },
      ],
      note: 'Thrall’s Horde was held together by shamanism and honour, not by demon blood. That was the difference between the old Horde and the new.',
    },
    exodus: {
      title: 'West, to Kalimdor',
      intro: 'The camps were empty, but there was no place for the orcs in Lordaeron. As you scroll, the map follows the Horde across the ocean to a new home, step by step.',
      mapLabel: 'The Horde’s exodus to Kalimdor',
      steps: [
        {
          era: 'Lordaeron',
          title: 'The prophet’s call',
          text: 'A mysterious prophet in the guise of a raven comes to Thrall: Medivh. He says a catastrophe awaits Lordaeron and sends the Horde west, to Kalimdor. Thrall seizes the humans’ ships and puts out to sea.',
          status: 'Setting out',
          tone: 'home',
        },
        {
          era: 'Darkspear',
          title: 'The isle of the storm',
          text: 'A storm throws the fleet onto an island. There the Horde helps the Darkspear trolls; their chief Sen’jin loses his life, and his son Vol’jin and his people join the Horde.',
          status: 'New allies',
          tone: 'ok',
        },
        {
          era: 'The Barrens',
          title: 'The tauren',
          text: 'Ashore in Kalimdor, the Horde comes upon tauren fighting centaurs on the plains of the Barrens. Thrall helps Cairne Bloodhoof’s people reach Mulgore, and a lasting friendship is born between the two peoples.',
          status: 'Friendship',
          tone: 'ok',
        },
        {
          era: 'Ashenvale',
          title: 'Blood again',
          text: 'Grom Hellscream’s Warsong clash with the night elves and the demigod Cenarius while logging Ashenvale. To win, Grom drinks from a spring poisoned with Mannoroth’s blood; he kills Cenarius but becomes the Legion’s slave once more.',
          status: 'Corruption',
          tone: 'no',
        },
        {
          era: 'Demon Fall Canyon',
          title: 'The end of the curse',
          text: 'With Jaina Proudmoore’s help Thrall captures Grom and cleanses him of the curse. Together they face Mannoroth; Grom buries his axe in the demon and kills him, but dies himself. The blood curse that bound the orcs ends with him.',
          status: 'Deliverance',
          tone: 'ok',
        },
      ],
      note: 'Grom’s sacrifice set the orcs free. Soon after, Thrall, Jaina and Malfurion fought the Burning Legion together at Mount Hyjal, and Archimonde was defeated.',
    },
    today: {
      title: 'The red earth of Durotar',
      intro: [
        'After the Third War Thrall settled his people in a dry, red land on Kalimdor’s east coast and named it after his father: Durotar. The capital, Orgrimmar, takes its name from Orgrim Doomhammer.',
        'The peace did not last. Jaina’s father, Daelin Proudmoore, attacked Durotar with a fleet; Thrall and his allies defeated him, and Proudmoore died in the fighting. Soldiers of Kul Tiras still wait in Tiragarde Keep on the coast.',
        'Today the Horde is not only orcs: the Darkspear trolls, the tauren and the Forsaken also stand under Thrall’s banner. The orcs fight the night elves in Ashenvale and, on their own land, the Burning Blade cult.',
      ],
      leadersLabel: 'Leaders',
      leadersText: 'The orcs’ leaders today.',
      leaders: [
        {
          role: 'Warchief of the Horde',
          name: 'Thrall',
          text: 'Durotan’s son, chieftain of the Frostwolf clan and a shaman. He leads the Horde from Grommash Hold in Orgrimmar.',
        },
        {
          role: 'Advisor',
          name: 'Eitrigg',
          text: 'An old veteran of the Second War. The paladin Tirion Fordring once spared his life and lost his knighthood for it. Today he stands at Thrall’s side in Grommash Hold.',
        },
        {
          role: 'Shaman of the Frostwolves',
          name: 'Drek’Thar',
          text: 'The old, blind shaman who taught Thrall shamanism. Today he leads the Frostwolf clan against the Stormpike dwarves in Alterac Valley.',
        },
      ],
      landLabel: 'Durotar',
      landTitle: 'A land of red canyons',
      landText: [
        'Orc and troll characters begin in the Valley of Trials in southern Durotar. The road runs through Razor Hill to the gates of Orgrimmar in the north.',
        'Sen’jin Village on the south coast and the Echo Isles offshore are the home of the Darkspear trolls. Tiragarde Keep on the east coast is the fortress left by Proudmoore’s soldiers.',
      ],
      landCaption: 'Durotar.',
      pathKey: 'Starting road',
      landLegend: [
        { name: 'Orgrimmar', text: 'Capital of the Horde, home of Grommash Hold' },
        { name: 'Valley of Trials', text: 'The valley where orc and troll characters begin' },
        { name: 'Razor Hill', text: 'The orc town in the middle of Durotar' },
        { name: 'Sen’jin Village', text: 'Village of the Darkspear trolls' },
        { name: 'Echo Isles', text: 'The Darkspears’ islands offshore' },
        { name: 'Tiragarde Keep', text: 'The coastal fortress of the Kul Tiras soldiers' },
      ],
      beyondLabel: 'Beyond Durotar',
      beyondTitle: 'The Horde’s outposts',
      beyondText: [
        'The orcs hold the Horde’s borders with outposts on two continents: the Crossroads in the Barrens, Splintertree Post in Ashenvale, Grom’gol Base Camp in Stranglethorn Vale, Stonard in the Swamp of Sorrows and Hammerfall in the Arathi Highlands. Zeppelins from the towers outside Orgrimmar fly to Grom’gol and to Undercity.',
        'Not every orc chose Thrall’s road. Blackhand’s son, Rend Blackhand, proclaimed himself warchief in Blackrock Spire and founded the Dark Horde; the Dragonmaw are still in the Wetlands, and the Burning Blade cult keeps up its demon magic in the caves of Durotar and in Desolace.',
      ],
      mapCaption: 'Horde outposts and zeppelin routes. Positions are approximate.',
      routesKey: 'Zeppelin routes',
      legend: [
        { name: 'Orgrimmar', text: 'The capital, with the zeppelin towers' },
        { name: 'Crossroads', text: 'The outpost in the middle of the Barrens' },
        { name: 'Splintertree Post', text: 'The Horde outpost in Ashenvale' },
        { name: 'Grom’gol Base Camp', text: 'The Horde camp in Stranglethorn Vale' },
        { name: 'Stonard', text: 'The orc town in the Swamp of Sorrows' },
        { name: 'Hammerfall', text: 'The orc outpost in the Arathi Highlands' },
      ],
      note: 'The old Horde, founded in blood, burned a world. The new Horde, founded on honour, became a home for peoples with no place on Azeroth.',
    },
    outro: {
      title: 'Lok’tar ogar',
      text: 'Victory or death, say the orcs. Once they were bound by blood; then they broke their chains, and now they write their own fate on the red earth of Durotar.',
      nextText: 'The people of the Echo Isles: voodoo, the loa and how the Darkspear joined the Horde.',
    },
    images: 'Maps from WoW Forever. The cover and chain drawings were made for this page. World of Warcraft names belong to Blizzard Entertainment.',
  },
};
