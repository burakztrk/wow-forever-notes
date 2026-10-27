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

type Step = { era: string; title: string; text: string; status: string; tone: 'home' | 'mute' | 'al' | 'ok' | 'no' };
type Item = { name: string; text: string };

export interface GnomeStory {
  metaDescription: string;
  races: string;
  overline: string;
  lead: string;
  cue: string;
  facts: { label: string; value: string; extra?: string }[];
  chapter: string;
  chapters: Record<'origin' | 'kinship' | 'wars' | 'fall' | 'today', string>;
  whyItMatters: string;
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
  outro: { label: string; title: string; text: string; nextLabel: string; nextText: string; soon: string };
  notes: { title: string; text: string; imagesTitle: string; images: string };
}

export const GNOME_STORY: Record<Lang, GnomeStory> = {
  tr: {
    metaDescription: 'Gnome’ların hikayesi: Titan kökeni, Dwarf kardeşliği, büyük savaşlar, Gnomeregan’ın düşüşü ve bugün.',
    races: 'Irklar',
    overline: 'Hikaye 01',
    lead: 'Titan’ların makinesi olarak doğdular, etten bir halk olarak uyandılar. Boyları kısa, ama icatları Alliance ordularını yıllardır ayakta tutuyor.',
    cue: 'Hikayeye in',
    facts: [
      { label: 'Yurt', value: 'Dun Morogh', extra: 'Khaz Modan' },
      { label: 'Eski başkent', value: 'Gnomeregan', extra: 'kayıp' },
      { label: 'Bugünkü üs', value: 'New Tinkertown' },
      { label: 'Lider', value: 'High Tinker Gelbin Mekkatorque' },
      { label: 'Binek', value: 'Mechanostrider' },
      { label: 'En yakın müttefik', value: 'Ironforge Dwarf’ları' },
    ],
    chapter: 'Bölüm',
    chapters: { origin: 'Köken', kinship: 'Kardeşlik', wars: 'Savaşlar', fall: 'Düşüş', today: 'Bugün' },
    whyItMatters: 'Neden önemli',
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
      label: 'Kapanış',
      title: 'Küçük ama vazgeçilmez',
      text: 'Kayıplarından ders çıkaran, pes etmeyen ve keşfetmeyi bırakmayan bir halk. Gnomeregan’ın kapısında hâlâ ışık yanıyor.',
      nextLabel: 'Sıradaki hikaye',
      nextText: 'Khaz Modan’ın diğer yarısı: Ironforge, Titan mirası ve üç klanın hikayesi.',
      soon: 'Yakında',
    },
    notes: {
      title: 'Not',
      text: 'Haritalar ve çizimler bu sayfa için hazırlanmış şematik illüstrasyonlardır; ölçek ve konumlar temsilidir.',
      imagesTitle: 'Görseller',
      images: 'Ironforge görüntüsü WoW Forever’dan. Gelbin Mekkatorque, Sicco Thermaplugg ve Troglodyte görselleri Blizzard Entertainment’a aittir (Troglodyte model sayfası: Matthew McKeown).',
    },
  },
  en: {
    metaDescription: 'The gnomes’ story: Titan origins, kinship with the dwarves, the great wars, the fall of Gnomeregan and today.',
    races: 'Races',
    overline: 'Story 01',
    lead: 'They were born as machines of the Titans and woke as a people of flesh. Short in stature, yet their inventions have kept the Alliance’s armies standing for years.',
    cue: 'Into the story',
    facts: [
      { label: 'Homeland', value: 'Dun Morogh', extra: 'Khaz Modan' },
      { label: 'Former capital', value: 'Gnomeregan', extra: 'lost' },
      { label: 'Current base', value: 'New Tinkertown' },
      { label: 'Leader', value: 'High Tinker Gelbin Mekkatorque' },
      { label: 'Mount', value: 'Mechanostrider' },
      { label: 'Closest ally', value: 'The dwarves of Ironforge' },
    ],
    chapter: 'Chapter',
    chapters: { origin: 'Origin', kinship: 'Kinship', wars: 'Wars', fall: 'The fall', today: 'Today' },
    whyItMatters: 'Why it matters',
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
      label: 'Epilogue',
      title: 'Small but indispensable',
      text: 'A people who learn from their losses, never give up and never stop exploring. A light still burns at the gate of Gnomeregan.',
      nextLabel: 'Next story',
      nextText: 'The other half of Khaz Modan: Ironforge, the Titan legacy and the story of three clans.',
      soon: 'Coming soon',
    },
    notes: {
      title: 'Note',
      text: 'The maps and drawings are schematic illustrations made for this page; scale and positions are approximate.',
      imagesTitle: 'Images',
      images: 'Ironforge screenshot from WoW Forever. The Gelbin Mekkatorque, Sicco Thermaplugg and troglodyte images belong to Blizzard Entertainment (troglodyte model sheet: Matthew McKeown).',
    },
  },
};
