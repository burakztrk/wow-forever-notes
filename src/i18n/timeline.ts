import type { Lang } from '../config';
import type { EraId } from '../lib/stories/timeline';

// Story timeline page (src/pages/[lang]/stories/timeline.astro). Events and places in
// src/lib/stories/timeline.ts. Every event retells, in short, what the linked story chapters say;
// game and proper names stay English in both languages.

export const TIMELINE_UI: Record<
  Lang,
  {
    title: string;
    metaDescription: string;
    overline: string;
    lead: string;
    filterLabel: string;
    all: string;
    races: string;
    classes: string;
    rulerLabel: string;
    prev: string;
    next: string;
    /** "{n} / {total}" */
    count: string;
    readIn: string;
    mapLabel: string;
    offMap: string;
    zoomIn: string;
    zoomOut: string;
    note: string;
    /** Links from a story page to its events on the timeline: header, closing section. */
    storyLink: string;
    storyCta: string;
    /** Stories index card. */
    cardOver: string;
    cardLead: string;
    cardCta: string;
  }
> = {
  tr: {
    title: 'Zaman Çizelgesi',
    metaDescription:
      'Irk ve sınıf hikayelerindeki önemli olaylar kronolojik bir cetvelde: Well of Eternity’den Third War’a ve bugüne, her olay Azeroth haritasında gösterilir.',
    overline: 'Irk ve sınıf hikayeleri',
    lead: 'Hikayelerde anlatılan önemli olaylar, sırasıyla. Cetvelden bir olay seç; harita olayın geçtiği yere gider.',
    filterLabel: 'Hikayeye göre',
    all: 'Hepsi',
    races: 'Irklar',
    classes: 'Sınıflar',
    rulerLabel: 'Zaman cetveli',
    prev: 'Önceki olay',
    next: 'Sonraki olay',
    count: '{n} / {total}',
    readIn: 'Hikayede oku',
    mapLabel: 'Olayların geçtiği yerler, Azeroth haritası',
    offMap: 'Bu haritada değil; konum semboliktir.',
    zoomIn: 'Olaya yakınlaş',
    zoomOut: 'Tüm haritayı göster',
    note: 'Yıllar Dark Portal’ın açılışına göre ve hikayelerin verdiği kadarıyla yaklaşıktır (−: önce). Haritadaki konumlar yaklaşıktır; Northrend, Draenor ve Skywall gibi bu haritada olmayan yerler kesik çizgiyle, sembolik olarak gösterilir.',
    storyLink: 'Zaman çizelgesi',
    storyCta: 'Bu hikayenin olaylarını zaman çizelgesinde gör',
    cardOver: 'Irklar ve sınıflar',
    cardLead: 'Hikayelerdeki olaylar tek bir cetvelde: Well of Eternity’den bugüne, her biri haritada.',
    cardCta: 'Çizelgeyi aç →',
  },
  en: {
    title: 'Timeline',
    metaDescription:
      'The major events of the race and class stories on one chronological ruler: from the Well of Eternity to the Third War and today, each shown on the Azeroth map.',
    overline: 'Race and class stories',
    lead: 'The major events the stories tell, in order. Pick an event on the ruler and the map moves to where it happened.',
    filterLabel: 'By story',
    all: 'All',
    races: 'Races',
    classes: 'Classes',
    rulerLabel: 'Timeline ruler',
    prev: 'Previous event',
    next: 'Next event',
    count: '{n} / {total}',
    readIn: 'Read it in',
    mapLabel: 'Where the events happened, map of Azeroth',
    offMap: 'Not on this map; the position is symbolic.',
    zoomIn: 'Zoom to the event',
    zoomOut: 'Show the whole map',
    note: 'Years count from the opening of the Dark Portal and are approximate, as far as the stories give them (−: before). Positions on the map are approximate; places off this map, such as Northrend, Draenor and Skywall, are drawn dashed at a symbolic spot.',
    storyLink: 'Timeline',
    storyCta: 'See this story’s events on the timeline',
    cardOver: 'Races and classes',
    cardLead: 'The events of every story on one ruler: from the Well of Eternity to today, each one on the map.',
    cardCta: 'Open the timeline →',
  },
};

export const TIMELINE_ERAS: Record<Lang, Record<EraId, { name: string; when?: string }>> = {
  tr: {
    ancient: { name: 'Kadim Çağ' },
    ancients: { name: 'War of the Ancients', when: '≈ −10.000' },
    vigil: { name: 'Uzun Nöbet' },
    kingdoms: { name: 'Krallıklar Çağı', when: '≈ −2.800 … −230' },
    draenor: { name: 'Draenor' },
    first: { name: 'First War', when: '0' },
    second: { name: 'Second War' },
    between: { name: 'Savaşlar Arası' },
    third: { name: 'Third War' },
    after: { name: 'Savaştan Sonra', when: 'Bugün' },
  },
  en: {
    ancient: { name: 'Ancient Times' },
    ancients: { name: 'War of the Ancients', when: '≈ −10,000' },
    vigil: { name: 'The Long Vigil' },
    kingdoms: { name: 'Age of Kingdoms', when: '≈ −2,800 … −230' },
    draenor: { name: 'Draenor' },
    first: { name: 'First War', when: '0' },
    second: { name: 'Second War' },
    between: { name: 'Between the Wars' },
    third: { name: 'Third War' },
    after: { name: 'After the War', when: 'Today' },
  },
};

export interface TimelineEventCopy {
  title: string;
  /** A date or time span, when the stories give one. */
  when?: string;
  text: string;
}

export const TIMELINE_EVENTS: Record<Lang, Record<string, TimelineEventCopy>> = {
  tr: {
    'curse-of-flesh': {
      title: 'Curse of Flesh',
      text: 'Old Gods’un laneti, Titan’ların taştan ve metalden işçilerini ete kemiğe çevirir. Uldaman gibi kasalarda uyuyan earthen’lar dwarf olarak uyanır, Mimiron’un mechagnome’ları gnome’a dönüşür, Northrend vrykul’larının saklanan çocukları ilk insanlar olur.',
    },
    'troll-empires': {
      title: 'İlk troll imparatorlukları',
      text: 'Kalimdor henüz tek parça bir kıtayken, en eskileri Zandalari olan troll kabileleri böcek halkı aqir’e karşı birleşip onları geri püskürtür. Aqir’in torunları yüzyıllar sonra Ahn’Qiraj’ın qiraji’leri olarak geri dönecektir.',
    },
    kaldorei: {
      title: 'Yıldızların çocukları',
      text: 'Bir dark troll kabilesi Well of Eternity’nin kıyısına yerleşir. Kuyunun gücü onları nesiller içinde kaldorei’ye, yani night elf’lere dönüştürür; Elune’a tapan bu halk Queen Azshara’nın yönetiminde Zin-Azshari’yi kurar.',
    },
    'shu-halo': {
      title: 'Shu’halo ve Cenarius',
      text: 'Tauren’ler kodo sürülerinin ve Earth Mother’ın izinde Kalimdor ovalarında dolaşır. Ormanların yarı tanrısı Cenarius ilk tauren mistiklerine doğanın yolunu öğretir.',
    },
    azshara: {
      title: 'Azshara kapıyı açar',
      text: 'Queen Azshara ve Highborne’lar kuyudan giderek daha fazla güç çeker. Sargeras onlara daha fazlasını vaat eder; Burning Legion için kuyunun içinde bir kapı açarlar ve War of the Ancients başlar.',
    },
    'first-druid': {
      title: 'İlk druid',
      text: 'Malfurion Stormrage doğanın yolunu Cenarius’tan öğrenir ve ilk druid olur. Tyrande, Illidan, ejderhalar ve orman ruhlarıyla birlikte direnişe önderlik eder; tauren savaşçılar da yanlarında savaşır.',
    },
    broxigar: {
      title: 'Broxigar Sargeras’ı yaralar',
      text: 'Orc savaşçı Broxigar the Red, Well of Eternity’deki yarığa atlar ve karanlık titan Sargeras’a bizzat vurur: bir ölümlünün ona açtığı tek yara.',
    },
    sundering: {
      title: 'Great Sundering',
      when: 'Dark Portal’dan ≈ 10.000 yıl önce',
      text: 'Legion’ın kapısını kapatmak için Malfurion, Well of Eternity’yi yok eder. Kuyu çöker; Azshara sarayıyla dalgaların altında kaybolur, tek kıta parçalanır ve kuyunun yerinde Maelstrom döner.',
    },
    nordrassil: {
      title: 'Nordrassil ve uzun uyku',
      text: 'Illidan, kuyudan gizlice doldurduğu şişeleri Mount Hyjal’daki bir göle döker. Druid’ler yeni kuyunun üzerine World Tree Nordrassil’i diker; ağaç night elf’lere ölümsüzlük verir. Illidan zindana kapatılır, druid’ler Emerald Dream’de uykuya dalar, Tyrande’nin Sentinel’leri nöbet tutar.',
    },
    'quel-thalas': {
      title: 'Highborne doğuya gider',
      text: 'Arcane büyüden vazgeçmeyen Highborne’lar sürgüne gönderilir. Denizi aşıp Quel’Thalas’ı kurar ve Sunwell’i yükseltirler; high elf’ler onların torunlarıdır.',
    },
    'eldre-thalas': {
      title: 'Eldre’Thalas’ta isyan',
      when: 'War of the Ancients’tan sonra',
      text: 'Prince Tortheldrin şehri yaşatmak için demon Immol’thar’ın gücünü emmek ister. Maskeli Shal’nan’ın önderliğindeki asiler ona karşı ayaklanır; bir anlatıya göre Eldre’narr limanına kaçıp batıya yelken açarlar.',
    },
    skywall: {
      title: 'Rüzgârlarla antlaşma',
      when: 'Tartışmalı: “binlerce yıl önce”',
      text: 'Kaçaklar rüzgâr ruhlarıyla anlaşır; ruhlar bir kara parçasını gökyüzüne kaldırıp Skywall’a bağlar ve onları Azeroth’tan saklar. O toprak, shen’dorei’nin yurdu Zephras Isle olur.',
    },
    arathor: {
      title: 'Thoradin Arathor’u kurar',
      when: 'Dark Portal’dan ≈ 2.800 yıl önce',
      text: 'Arathi şefi Thoradin insan kabilelerini birleştirir, Arathi Highlands’te Strom’u kurar ve ilk insan ulusunu ilan eder: Arathor.',
    },
    'troll-wars': {
      title: 'Troll Wars',
      when: 'Dark Portal’dan ≈ 2.800 yıl önce',
      text: 'Amani, Quel’Thalas’ı kuşatır. Yardım karşılığında elf’ler yüz insana büyü öğretir; Alterac Mountains’in eteklerinde büyücülerin ateşi trolleri dağıtır ve elf’ler Arathor soyuna sonsuza dek yardım edeceklerine yemin eder.',
    },
    dalaran: {
      title: 'Dalaran ve yedi krallık',
      text: 'İnsan büyücüler Lordamere Gölü kıyısında Kirin Tor’un yönettiği Dalaran’ı kurar. Arathor zamanla yedi krallığa bölünür: Stromgarde, Lordaeron, Dalaran, Alterac, Gilneas, Kul Tiras ve Stormwind.',
    },
    tirisfal: {
      title: 'Tirisfal’ın Guardian’ları',
      text: 'Dikkatsiz büyü demonları Azeroth’a çeker. İnsan ve elf büyücüler gizlice Council of Tirisfal’ı kurar ve her nesilde güçlerini tek bir koruyucuya, Guardian’a emanet eder.',
    },
    hakkar: {
      title: 'Kan tanrısı',
      text: 'Gurubashi imparatorluğu zayıflarken Atal’ai rahipleri Hakkar the Soulflayer’ı çağırır. Kabileler her gün kurban isteyen tanrıya karşı ayaklanır ve Atal’ai’yi sürgüne yollar; imparatorluk bölünür, zayıf Darkspear ormandan sürülür.',
    },
    centaurs: {
      title: 'Centaur’ların doğuşu',
      when: 'Dark Portal’dan ≈ 1.100 yıl önce',
      text: 'Tauren shaman’ları Earth Mother’ı değil Princess Theradras’ı uyandırır. Onun Cenarius’un oğlu Zaetar’la birlikteliğinden centaur’lar doğar; Desolace kurur ve centaur klanları yüzyıllar boyunca ovalarda tauren’leri avlar.',
    },
    'shifting-sands': {
      title: 'War of the Shifting Sands',
      when: '≈ 1.000 yıl önce',
      text: 'Qiraji orduları Ahn’Qiraj’dan taşar. Night elf’ler bronz ejderhaların yardımıyla onları Scarab Wall’un ardına kapatır; Fandral Staghelm’in oğlu Valstann bu savaşta ölür.',
    },
    'three-hammers': {
      title: 'War of the Three Hammers',
      when: 'Dark Portal’dan ≈ 230 yıl önce',
      text: 'High King Anvilmar ölünce Ironforge’un üç klanı taht için savaşır. Bronzebeard’lar şehri elinde tutar; Wildhammer’lar Grim Batol’a gider, Dark Iron’lar güneye sürülür.',
    },
    ragnaros: {
      title: 'Ragnaros uyanır',
      text: 'Yenilgiyle yüz yüze kalan Thaurissan, Ateşin Lordu Ragnaros’u çağırır. Thaurissan ölür, dağlar parçalanıp Blackrock Mountain’a dönüşür, Searing Gorge ve Burning Steppes yanar; Dark Iron’lar Ragnaros’un kölesi olur.',
    },
    aegwynn: {
      title: 'Aegwynn ve gizli tohum',
      text: 'Guardian Magna Aegwynn, Sargeras’ın avatarını Northrend’de yener ve gücünü oğlu Medivh’e devreder. Sargeras’ın ruhunun henüz doğmamış çocuğa saklandığını bilmez.',
    },
    kiljaeden: {
      title: 'Kil’jaeden’in yalanı',
      text: 'Draenor’da Kil’jaeden, shaman Ner’zhul’a ataların sesiyle fısıldar. Ner’zhul oyunu sonunda fark eder, ama çırağı Gul’dan Shadow Council’i kurup orc’lara fel büyüsünü öğretir; elementler susar ve orc’ların derisi yeşile döner.',
    },
    'blood-pact': {
      title: 'Mannoroth’un kanı',
      text: 'Klan şefleri pit lord Mannoroth’un kanını içer; ilk içen Grom Hellscream’dir, Durotan reddeder. Klanlar Horde olur, Horde’un öfkesi dinmez ve draenei şehirleri birer birer düşer.',
    },
    'dark-portal': {
      title: 'Dark Portal açılır',
      when: 'Yıl 0',
      text: 'Sargeras’ın etkisindeki Medivh, Gul’dan’ın warlock’larıyla iki dünya arasında bir geçit açar. Horde, Black Morass bataklığından çıkar ve Stormwind krallığına yürür.',
    },
    medivh: {
      title: 'Medivh Karazhan’da düşer',
      text: 'Anduin Lothar, genç büyücü Khadgar ve yarı orc Garona son Guardian’ı kendi kulesinde öldürür. Guardian çağı onunla birlikte sona erer.',
    },
    'stormwind-falls': {
      title: 'Stormwind düşer',
      text: 'Garona, Horde adına King Llane’i öldürür ve şehir yerle bir edilir; Orgrim Doomhammer Horde’u Blackhand’den alır. Zırhsız Northshire rahipleri katledilir, gnome’lar olanları uzaktan izler.',
    },
    'exodus-north': {
      title: 'Mülteciler kuzeye gider',
      text: 'Lothar hayatta kalanları ve genç Prens Varian’ı gemilerle Lordaeron’a götürür. Archbishop Alonsus Faol, Holy Light’ın zırh kuşanması gerektiğine karar verir: paladin fikri doğar.',
    },
    alliance: {
      title: 'Alliance of Lordaeron',
      text: 'King Terenas Menethil II insan krallıklarını toplar, komuta Lothar’a verilir. Lothar Arathi soyunun son temsilcisi olduğu için high elf’ler eski yeminlerini tutar; dwarf’lar ve gnome’lar da saflara katılır.',
    },
    'silver-hand': {
      title: 'Knights of the Silver Hand',
      text: 'Faol, Stratholme’de ilk beş paladin’i kutsar: Uther, Turalyon, Tirion Fordring, Saidan Dathrohan ve Gavinrad. Onların Işığı Second War’da Alliance ordularına güç verir.',
    },
    'ironforge-siege': {
      title: 'Dağ teslim olmaz',
      text: 'Horde Khaz Modan’ı baştan başa geçip Ironforge’u kuşatır, ama dağa oyulmuş kale hiç düşmez. Savunmayı Magni Bronzebeard yönetir, Wildhammer grifonları gökten saldırır ve Doomhammer sonunda yoluna devam eder.',
    },
    'grim-batol': {
      title: 'Zincirli Ejderha Kraliçesi',
      text: 'Dragonmaw klanı Wildhammer’ların terk ettiği Grim Batol’u ele geçirir ve Ejderha Kraliçesi Alexstrasza’yı orada esir tutar. Yavruları Horde’un savaş ejderhaları olur.',
    },
    'quel-thalas-burns': {
      title: 'Quel’Thalas yanar',
      text: 'Zul’jin’in Amani’leri elf’lerden intikam almak için Horde’a katılır ve Quel’Thalas ormanlarını ateşe verir. Windrunner kardeşlerin Farstrider’ları ağaçların arasından karşılık verir.',
    },
    'guldan-betrays': {
      title: 'Gul’dan’ın ihaneti',
      text: 'Lordaeron’un başkenti kuşatılmış ve zafer yakınken Gul’dan, kendine bağlı klanlarla Horde’u terk edip Tomb of Sargeras’ın gücünü ele geçirmeye gider. Orada ölür; bölünen Horde geri çekilir.',
    },
    'blackrock-spire': {
      title: 'Blackrock Spire zaferi',
      text: 'Lothar, Blackrock Spire önünde Orgrim Doomhammer’la savaşırken düşer. Turalyon onun kırık kılıcını kaldırır, Horde’u bozguna uğratıp savaşı kazanır; Dark Portal yıkılır.',
    },
    camps: {
      title: 'Toplama kampları',
      text: 'Esir orc’lar Durnholde Keep’ten yönetilen kamplara kapatılır; demon kanının etkisi geçince derin bir uyuşukluğa gömülürler. Kampların masrafı krallıklara vergi olarak yüklenir: Gilneas Alliance’tan ayrılır ve ittifak çatırdamaya başlar.',
    },
    'lich-king': {
      title: 'Lich King',
      text: 'Kil’jaeden, Ner’zhul’un ruhunu bir zırha ve Frostmourne kılıcına bağlayıp Icecrown buzullarındaki Frozen Throne’a kapatır. Lich King buzun içinden Kel’Thuzad’a ulaşır; Kel’Thuzad, Cult of the Damned’i kurar.',
    },
    thrall: {
      title: 'Thrall zincirlerini kırar',
      text: 'Durnholde’de gladyatör olarak yetiştirilen Thrall, Taretha Foxton’ın yardımıyla kaçar. Alterac Mountains’te Drek’Thar ona şamanizmi öğretir; Doomhammer’la birlikte kampları açar ve ölen savaş şefi Horde’u ona bırakır.',
    },
    'stormwind-rebuilt': {
      title: 'Stormwind yeniden yükselir',
      text: 'Lordaeron’un desteğiyle Stonemasons’ Guild, Stormwind’i yeniden inşa eder ve Varian Wrynn babasının tahtına oturur. Soylular ustalara ücretlerini ödemez; Edwin VanCleef onları Westfall’a götürüp Defias Brotherhood’u kurar.',
    },
    gnomeregan: {
      title: 'Gnomeregan’ın düşüşü',
      text: 'Trogg’lar yeraltının derinliklerinden Gnomeregan’a taşar. Mekkatorque, Sicco Thermaplugg’ın tavsiyesiyle şehri radyasyonla doldurur; gnome’ların yaklaşık %80’i ölür ya da aklını yitirir, hayatta kalanlar Ironforge’a sığınır.',
    },
    plague: {
      title: 'Plague of Undeath',
      text: 'Kel’Thuzad’ın tarikatı Andorhal’ın ambarlarından zehirli tahıl dağıtır; onu yiyenler ölüp Scourge olarak dirilir. Arthas Menethil vebanın izini sürüp Kel’Thuzad’ı öldürür; Lordaeron’un rahipleri en karanlık sınavlarıyla yüzleşir.',
    },
    stratholme: {
      title: 'Culling of Stratholme',
      text: 'Şehrin tahılı yediğini gören Arthas, halkı dönüşmeden Stratholme’ü kılıçtan geçirir. Uther ve Jaina ona sırt çevirir; Arthas da Silver Hand’i görevden alır.',
    },
    darkspear: {
      title: 'Fırtınadan çıkanlar',
      text: 'Gizemli bir kâhinin uyarısıyla Thrall gemileri ele geçirip batıya açılır. Fırtına filoyu Darkspear adasına atar; Sen’jin ölür, oğlu Vol’jin ve Darkspear Horde’a katılır.',
    },
    frostmourne: {
      title: 'Frostmourne',
      text: 'Vebanın kaynağını arayan Arthas Northrend’e ulaşır ve lanetli kılıcı eline alır. Ruhunu Lich King’e verir; yanındaki Muradin Bronzebeard kılıcın lanetiyle yere serilir ve öldüğü sanılır.',
    },
    terenas: {
      title: 'Bir kralın ölümü',
      text: 'Lordaeron, dönen prensini zafer kutlamasıyla karşılar. Arthas babası King Terenas’ı taht salonunda öldürür, ardından hocası Uther’i de; en büyük insan krallığı Scourge’a düşer.',
    },
    sunwell: {
      title: 'Quel’Thalas’ın düşüşü',
      text: 'Arthas, Kel’Thuzad’ı diriltmek için high elf’lerin üzerine yürür. Sylvanas Windrunner her kapıyı ve nehri savunur; düştüğünde Arthas onu banshee yapar ve Kel’Thuzad’ı lich olarak diriltmek için Sunwell kirletilir.',
    },
    'dalaran-falls': {
      title: 'Archimonde Dalaran’ı yıkar',
      text: 'Kel’Thuzad, Burning Legion komutanı Archimonde’u çağırır; Archimonde büyücüler şehrini toza çevirir. Kâhinin uyarısını dinleyen Jaina Proudmoore hayatta kalanları denizin ötesine, Kalimdor’a götürür.',
    },
    cairne: {
      title: 'Thrall ve Cairne',
      text: 'Barrens ovalarında Horde, Kolkar centaur’larıyla savaşan tauren’lerle karşılaşır. Thrall, Cairne Bloodhoof’un halkını savunur ve iki halk arasında kalıcı bir dostluk doğar.',
    },
    'thunder-bluff': {
      title: 'Thunder Bluff kurulur',
      text: 'Horde’un koruduğu kodo kervanı kanyonları aşıp Mulgore’un yeşil yaylalarına ulaşır ve Thunder Bluff yüksek tepelerin üzerinde yükselir. Rexxar ve Rokhan daha sonra Cairne’in oğlu Baine’i centaur’lardan kurtarır.',
    },
    oracle: {
      title: 'Stonetalon’un kâhini',
      text: 'Cairne’in rehberliğinde Thrall, Stonetalon Peak’e tırmanır. Kutsal mağaradaki kâhin Medivh’tir; Thrall’ı ve Jaina Proudmoore’u Burning Legion’ın gelişine karşı uyarır.',
    },
    cenarius: {
      title: 'Cenarius düşer',
      text: 'Grom Hellscream’in Warsong klanı Ashenvale’in kutsal ağaçlarını keser. Kazanmak için Grom, Mannoroth’un kanıyla zehirlenmiş bir pınardan içer; Cenarius’u öldürür ama yeniden Legion’ın kölesi olur.',
    },
    illidan: {
      title: 'Illidan serbest',
      text: 'Tyrande, Illidan’ı on bin yıllık zindanından çıkarır. Illidan, Skull of Gul’dan’ın gücünü emip Tichondrius’u öldürür; ama güç onu da değiştirir ve Malfurion onu sürgün eder. Zehirlenen orman Felwood olur.',
    },
    mannoroth: {
      title: 'Kan lanetinin sonu',
      text: 'Thrall, Jaina’nın yardımıyla Grom’u yakalayıp lanetten arındırır. Demon Fall Canyon’da Grom baltasını Mannoroth’a saplayıp onu öldürür, kendisi de ölür; orc’ları bağlayan lanet onlarla birlikte sona erer.',
    },
    hyjal: {
      title: 'Mount Hyjal muharebesi',
      text: 'Medivh’in çağrısıyla night elf’ler, insanlar, orc’lar ve tauren’ler Archimonde’un önündeki geçitleri tutar. World Tree’nin dibinde Malfurion, Horn of Cenarius’u öttürür; wisp’ler Archimonde’u yok eder, Nordrassil yarı yanmış kalır ve night elf’ler ölümsüzlüklerini kaybeder.',
    },
    'frozen-throne': {
      title: 'Frozen Throne çatlar',
      text: 'Illidan, Dalaran’ın yıkıntılarında Eye of Sargeras’ı Icecrown’a karşı kullanır. Malfurion onu durdurur ama Frozen Throne çatlar; Lich King’in pençesi gevşer ve Sylvanas ile birçok undead iradesini geri kazanır: Forsaken.',
    },
    undercity: {
      title: 'Undercity',
      text: 'Sylvanas, Arthas’a pusu kurar, üç dreadlord’u birer birer yener ve müttefiki Garithos’a sırt çevirir. Yıkık başkentin altındaki mahzenlerde yeni başkentini ilan eder: Undercity.',
    },
    durotar: {
      title: 'Durotar ve Orgrimmar',
      text: 'Thrall halkını Kalimdor’un kızıl doğu kıyısına yerleştirir ve topraklara babasının adını verir: Durotar; Orgrimmar da Doomhammer’ın adını taşır. Daelin Proudmoore bir filoyla saldırır ve ölür; Rexxar yeni yurdun kuruluşunda belirleyici rol oynar.',
    },
    theramore: {
      title: 'Theramore',
      text: 'Jaina Proudmoore, Dustwallow Marsh kıyısında Theramore’u kurar. Lordaeron’un mültecileri yeni bir yurt, Alliance da Kalimdor’da bir kale bulur.',
    },
    teldrassil: {
      title: 'Teldrassil',
      text: 'Ölümsüzlüğü geri kazanmak isteyen Fandral Staghelm, Darkshore açıklarına Dragon Aspect’lerin kutsamadığı yeni bir World Tree diker. Tepesinde Darnassus yükselir, Malfurion Emerald Dream’de kaybolur ve night elf’ler Alliance’a katılır.',
    },
    hamuul: {
      title: 'İlk tauren druid',
      text: 'Malfurion, yeni çağın ilk tauren archdruid’i Hamuul Runetotem’i yetiştirir. Tauren ve night elf druid’ler artık Moonglade’deki Cenarion Circle’ı paylaşır.',
    },
    'forsaken-horde': {
      title: 'Forsaken Horde’a katılır',
      text: 'Sylvanas’ın elçileri her kapıdan geri çevrilir; ta ki Thunder Bluff’ta Hamuul Runetotem ve Cairne Bloodhoof onlar adına konuşana dek. Thrall kabul eder ve Undercity, Horde’un Eastern Kingdoms’taki kalesi olur.',
    },
    crusade: {
      title: 'Silver Hand bölünür',
      text: 'Lordaeron düşünce paladin tarikatı dağılır. Fanatik Scarlet Crusade her undead’e savaş açarken Argent Dawn, Light’s Hope Chapel’dan daha ölçülü bir mücadele yürütür.',
    },
    zalazane: {
      title: 'Zalazane Echo Isles’ı alır',
      text: 'Third War’dan sonra Darkspear, Durotar açıklarındaki Echo Isles’a yerleşir. Witch doctor Zalazane karanlık büyüyle adaları ele geçirir; kurtulanlar Sen’jin Village’da direnirken Vol’jin, Thrall’ın yanında durur.',
    },
    varian: {
      title: 'Kralsız taht',
      text: 'King Varian Wrynn, Theramore’daki barış görüşmelerine giderken ortadan kaybolur. Küçük oğlu Anduin tahta çıkar, Bolvar Fordragon kral vekili olarak yönetir ve sarayda Lady Katrana Prestor’un sözü giderek ağırlaşır.',
    },
    'hakkar-returns': {
      title: 'Hakkar geri döner',
      text: 'Kan tanrısının rahipleri Hakkar’ı Zul’Gurub’da yeniden çağırır. Zandalar Tribe, Yojamba Isle’a yerleşip maceracılardan onu durdurmalarını ister.',
    },
    'skyborne-crisis': {
      title: 'Susan rüzgâr',
      when: 'Ruhların kayboluşu tartışmalı: “birkaç yüzyıl önce”',
      text: 'Rüzgâr ruhları kaybolur ve Zephras’ı Skywall’a bağlayan pylon’lar çökmeye başlar. High Order ile Windshaper’lar birbirinden uzaklaşır; Al’Akir’e tapan Al’Aketh tarikatı pylon’lara saldırır ve Shrine of Akir’deki ateşkes Rohash’ın tehdidiyle karşılaşır.',
    },
    'skyborne-descent': {
      title: 'Azeroth’a iniş',
      text: 'İki kol Skywall’dan ayrılıp Alliance ile Horde’dan yardım istemeye karar verir. Skyship’ler Valanaar’dan kalkar: High Order Dalaran’a, Windshaper’lar Mulgore’daki Skywatcher Plateau’ya iner.',
    },
  },
  en: {
    'curse-of-flesh': {
      title: 'The Curse of Flesh',
      text: 'The Old Gods’ curse turns the Titans’ workers of stone and metal into flesh. The earthen wake in vaults such as Uldaman as dwarves, Mimiron’s mechagnomes become gnomes, and the hidden children of Northrend’s vrykul become the first humans.',
    },
    'troll-empires': {
      title: 'The first troll empires',
      text: 'While Kalimdor is still a single continent, the troll tribes, the Zandalari oldest among them, unite against the insect people of the aqir and drive them back. The aqir’s descendants will return centuries later as the qiraji of Ahn’Qiraj.',
    },
    kaldorei: {
      title: 'Children of the stars',
      text: 'A tribe of dark trolls settles on the shores of the Well of Eternity. Over generations its power changes them into the kaldorei, the night elves, who worship Elune and build Zin-Azshari under Queen Azshara.',
    },
    'shu-halo': {
      title: 'The Shu’halo and Cenarius',
      text: 'The tauren wander the plains of Kalimdor in the steps of the kodo herds and the Earth Mother. Cenarius, demigod of the forests, teaches their first mystics the ways of nature.',
    },
    azshara: {
      title: 'Azshara opens the gate',
      text: 'Queen Azshara and the Highborne draw ever more power from the Well. Sargeras promises them more, and they open a gate inside the Well for the Burning Legion: the War of the Ancients begins.',
    },
    'first-druid': {
      title: 'The first druid',
      text: 'Malfurion Stormrage learns the ways of nature from Cenarius and becomes the first druid. With Tyrande, Illidan, the dragons and the forest spirits he leads the resistance; tauren warriors fight beside them.',
    },
    broxigar: {
      title: 'Broxigar strikes Sargeras',
      text: 'The orc warrior Broxigar the Red leaps into the rift at the Well of Eternity and strikes the dark titan Sargeras himself: the only wound a mortal ever dealt him.',
    },
    sundering: {
      title: 'The Great Sundering',
      when: '≈ 10,000 years before the Dark Portal',
      text: 'To close the Legion’s gate, Malfurion destroys the Well of Eternity. It collapses; Azshara and her palace sink beneath the waves, the single continent breaks apart and the Maelstrom churns where the Well stood.',
    },
    nordrassil: {
      title: 'Nordrassil and the long sleep',
      text: 'Illidan pours vials he filled at the Well into a lake on Mount Hyjal. The druids plant the World Tree Nordrassil over the new Well, and it grants the night elves immortality. Illidan is imprisoned; the druids sleep in the Emerald Dream while Tyrande’s Sentinels keep watch.',
    },
    'quel-thalas': {
      title: 'The Highborne go east',
      text: 'The Highborne who will not give up arcane magic are sent into exile. They cross the sea, found Quel’Thalas and raise the Sunwell; the high elves are their descendants.',
    },
    'eldre-thalas': {
      title: 'Revolt in Eldre’Thalas',
      when: 'After the War of the Ancients',
      text: 'Prince Tortheldrin means to drain the demon Immol’thar to keep the city alive. Rebels led by the masked Shal’nan rise against him; by one account they flee to the port of Eldre’narr and sail west.',
    },
    skywall: {
      title: 'A pact with the winds',
      when: 'Disputed: “thousands of years ago”',
      text: 'The fugitives strike a bargain with the wind spirits, who lift a piece of land into the sky, anchor it in Skywall and hide them from Azeroth. That land becomes Zephras Isle, home of the shen’dorei.',
    },
    arathor: {
      title: 'Thoradin founds Arathor',
      when: '≈ 2,800 years before the Dark Portal',
      text: 'Thoradin, chieftain of the Arathi, unites the human tribes, builds Strom in the Arathi Highlands and declares the first human nation: Arathor.',
    },
    'troll-wars': {
      title: 'The Troll Wars',
      when: '≈ 2,800 years before the Dark Portal',
      text: 'The Amani besiege Quel’Thalas. In return for help, the elves teach magic to one hundred humans; at the foot of the Alterac Mountains the magi’s fire breaks the trolls, and the elves swear to aid Arathor’s bloodline forever.',
    },
    dalaran: {
      title: 'Dalaran and the seven kingdoms',
      text: 'Human magi found Dalaran on Lordamere Lake, ruled by the Kirin Tor. Arathor drifts apart into seven kingdoms: Stromgarde, Lordaeron, Dalaran, Alterac, Gilneas, Kul Tiras and Stormwind.',
    },
    tirisfal: {
      title: 'The Guardians of Tirisfal',
      text: 'Careless magic draws demons to Azeroth. Human and elven magi secretly found the Council of Tirisfal and entrust their power to a single protector each generation: the Guardian.',
    },
    hakkar: {
      title: 'The blood god',
      text: 'As the Gurubashi empire weakens, the Atal’ai priests summon Hakkar the Soulflayer. The tribes rise against his daily sacrifices and exile the Atal’ai; the empire splits, and the weak Darkspear are driven out of the jungle.',
    },
    centaurs: {
      title: 'The birth of the centaurs',
      when: '≈ 1,100 years before the Dark Portal',
      text: 'Tauren shamans wake not the Earth Mother but Princess Theradras. From her union with Zaetar, son of Cenarius, the centaurs are born; Desolace withers, and the centaur clans hunt the tauren across the plains for centuries.',
    },
    'shifting-sands': {
      title: 'The War of the Shifting Sands',
      when: '≈ 1,000 years ago',
      text: 'Qiraji armies pour out of Ahn’Qiraj. Helped by the bronze dragons, the night elves seal them behind the Scarab Wall; Fandral Staghelm’s son Valstann dies in the war.',
    },
    'three-hammers': {
      title: 'The War of the Three Hammers',
      when: '≈ 230 years before the Dark Portal',
      text: 'High King Anvilmar dies and Ironforge’s three clans fight for the throne. The Bronzebeards keep the city; the Wildhammers go to Grim Batol and the Dark Irons are driven south.',
    },
    ragnaros: {
      title: 'Ragnaros wakes',
      text: 'Facing defeat, Thaurissan summons the Firelord Ragnaros. Thaurissan dies, the peaks shatter into Blackrock Mountain, Searing Gorge and the Burning Steppes burn, and the Dark Irons become the Firelord’s slaves.',
    },
    aegwynn: {
      title: 'Aegwynn and the hidden seed',
      text: 'The Guardian Magna Aegwynn defeats the avatar of Sargeras in Northrend and passes her power to her son Medivh. She does not know that Sargeras’s spirit has hidden in the unborn child.',
    },
    kiljaeden: {
      title: 'Kil’jaeden’s lie',
      text: 'On Draenor, Kil’jaeden whispers to the shaman Ner’zhul in the voice of the ancestors. Ner’zhul sees through him in the end, but his apprentice Gul’dan founds the Shadow Council and teaches the orcs fel; the elements fall silent and the orcs’ skin turns green.',
    },
    'blood-pact': {
      title: 'The blood of Mannoroth',
      text: 'The clan chieftains drink the blood of the pit lord Mannoroth; Grom Hellscream drinks first, Durotan refuses. The clans become the Horde, its rage does not cool, and the draenei cities fall one by one.',
    },
    'dark-portal': {
      title: 'The Dark Portal opens',
      when: 'Year 0',
      text: 'Medivh, under the sway of Sargeras, opens a gate between the worlds with Gul’dan’s warlocks. The Horde comes out in the swamp of the Black Morass and marches on the kingdom of Stormwind.',
    },
    medivh: {
      title: 'Medivh falls in Karazhan',
      text: 'Anduin Lothar, the young mage Khadgar and the half-orc Garona slay the last Guardian in his own tower. The age of the Guardians ends with him.',
    },
    'stormwind-falls': {
      title: 'Stormwind falls',
      text: 'Garona kills King Llane for the Horde, and the city is burned to the ground; Orgrim Doomhammer takes the Horde from Blackhand. The unarmoured clerics of Northshire are slaughtered, and the gnomes watch from afar.',
    },
    'exodus-north': {
      title: 'The refugees sail north',
      text: 'Lothar takes the survivors and young Prince Varian by ship to Lordaeron. Archbishop Alonsus Faol resolves that the Holy Light must take up plate and hammer: the idea of the paladin is born.',
    },
    alliance: {
      title: 'The Alliance of Lordaeron',
      text: 'King Terenas Menethil II gathers the human kingdoms and gives Lothar command. Because Lothar is the last of the Arathi line, the high elves keep their old oath; the dwarves and gnomes join the ranks too.',
    },
    'silver-hand': {
      title: 'The Knights of the Silver Hand',
      text: 'In Stratholme, Faol anoints the first five paladins: Uther, Turalyon, Tirion Fordring, Saidan Dathrohan and Gavinrad. Their Light lifts the Alliance’s armies in the Second War.',
    },
    'ironforge-siege': {
      title: 'The mountain holds',
      text: 'The Horde overruns Khaz Modan and besieges Ironforge, but the fortress in the mountain never falls. Magni Bronzebeard leads the defence, Wildhammer gryphons strike from the sky, and Doomhammer finally marches on.',
    },
    'grim-batol': {
      title: 'The Dragonqueen in chains',
      text: 'The Dragonmaw take Grim Batol, abandoned by the Wildhammers, and hold the Dragonqueen Alexstrasza captive there. Her young become the Horde’s war dragons.',
    },
    'quel-thalas-burns': {
      title: 'Quel’Thalas burns',
      text: 'Zul’jin’s Amani join the Horde for revenge on the elves and set the forests of Quel’Thalas on fire. The Farstriders of the Windrunner sisters strike back from the trees.',
    },
    'guldan-betrays': {
      title: 'Gul’dan’s betrayal',
      text: 'With Lordaeron’s capital under siege and victory close, Gul’dan abandons the Horde with his clans to seize the power of the Tomb of Sargeras. He dies there, and the divided Horde falls back.',
    },
    'blackrock-spire': {
      title: 'Victory at Blackrock Spire',
      text: 'Lothar falls before Blackrock Spire fighting Orgrim Doomhammer. Turalyon raises his broken sword, routs the Horde and wins the war; the Dark Portal is destroyed.',
    },
    camps: {
      title: 'The internment camps',
      text: 'The captured orcs are locked in camps run from Durnholde Keep, sunk in a deep lethargy as the demon blood wears off. The camps’ cost falls on the kingdoms as taxes: Gilneas leaves the Alliance, and the Alliance begins to crack.',
    },
    'lich-king': {
      title: 'The Lich King',
      text: 'Kil’jaeden binds the spirit of Ner’zhul to a suit of armour and the runeblade Frostmourne and locks it in the Frozen Throne on the glaciers of Icecrown. From the ice the Lich King reaches Kel’Thuzad, who founds the Cult of the Damned.',
    },
    thrall: {
      title: 'Thrall breaks free',
      text: 'Raised as a gladiator at Durnholde, Thrall escapes with Taretha Foxton’s help. In the Alterac Mountains Drek’Thar teaches him shamanism; with Doomhammer he frees the camps, and the dying warchief leaves him the Horde.',
    },
    'stormwind-rebuilt': {
      title: 'Stormwind rises again',
      text: 'With Lordaeron’s help the Stonemasons’ Guild rebuilds Stormwind and Varian Wrynn takes his father’s throne. The nobles refuse to pay the masons; Edwin VanCleef leads them to Westfall and founds the Defias Brotherhood.',
    },
    gnomeregan: {
      title: 'The fall of Gnomeregan',
      text: 'Troggs pour up from the deep into Gnomeregan. On Sicco Thermaplugg’s advice Mekkatorque floods the city with radiation; about 80% of the gnomes die or lose their minds, and the survivors take refuge in Ironforge.',
    },
    plague: {
      title: 'The Plague of Undeath',
      text: 'Kel’Thuzad’s cult hands out tainted grain from the granaries of Andorhal; those who eat it die and rise as the Scourge. Arthas Menethil tracks the plague and kills Kel’Thuzad, and Lordaeron’s priesthoods face their darkest trial.',
    },
    stratholme: {
      title: 'The Culling of Stratholme',
      text: 'Seeing that the city has eaten the grain, Arthas puts Stratholme to the sword before its people can turn. Uther and Jaina turn their backs on him, and Arthas suspends the Silver Hand.',
    },
    darkspear: {
      title: 'Out of the storm',
      text: 'Warned by a mysterious prophet, Thrall seizes ships and sails west. A storm throws the fleet onto the Darkspear isle; Sen’jin dies, and his son Vol’jin and the Darkspear join the Horde.',
    },
    frostmourne: {
      title: 'Frostmourne',
      text: 'Hunting the source of the plague, Arthas reaches Northrend and takes up the cursed runeblade. He gives his soul to the Lich King; Muradin Bronzebeard is struck down at his side and believed dead.',
    },
    terenas: {
      title: 'The death of a king',
      text: 'Lordaeron greets its returning prince with a victory celebration. Arthas kills his father, King Terenas, in the throne room and his mentor Uther after him; the greatest human kingdom falls to the Scourge.',
    },
    sunwell: {
      title: 'The fall of Quel’Thalas',
      text: 'Arthas marches on the high elves to raise Kel’Thuzad. Sylvanas Windrunner defends every gate and river; when she falls he makes her a banshee, and the Sunwell is defiled to raise Kel’Thuzad as a lich.',
    },
    'dalaran-falls': {
      title: 'Archimonde levels Dalaran',
      text: 'Kel’Thuzad summons Archimonde, commander of the Burning Legion, who reduces the city of magi to dust. Heeding the prophet’s warning, Jaina Proudmoore leads the survivors west across the sea to Kalimdor.',
    },
    cairne: {
      title: 'Thrall meets Cairne',
      text: 'On the plains of the Barrens the Horde finds the tauren fighting the Kolkar centaurs. Thrall defends Cairne Bloodhoof’s people, and a lasting friendship is born between the two peoples.',
    },
    'thunder-bluff': {
      title: 'Thunder Bluff is founded',
      text: 'Guarded by the Horde, Cairne’s kodo caravan crosses the canyons to the green tablelands of Mulgore, and Thunder Bluff rises on the high mesas. Rexxar and Rokhan later rescue Cairne’s son Baine from the centaurs.',
    },
    oracle: {
      title: 'The Oracle of Stonetalon',
      text: 'Guided by Cairne, Thrall climbs Stonetalon Peak. The Oracle in the sacred cave is Medivh, who warns Thrall and Jaina Proudmoore of the Burning Legion’s coming.',
    },
    cenarius: {
      title: 'Cenarius falls',
      text: 'Grom Hellscream’s Warsong cut down the sacred trees of Ashenvale. To win, Grom drinks from a spring poisoned with Mannoroth’s blood; he kills Cenarius but becomes the Legion’s slave once more.',
    },
    illidan: {
      title: 'Illidan set free',
      text: 'Tyrande frees Illidan from his ten-thousand-year prison. He drains the Skull of Gul’dan and kills Tichondrius, but the power changes him and Malfurion banishes him; the poisoned forest becomes Felwood.',
    },
    mannoroth: {
      title: 'The end of the blood curse',
      text: 'With Jaina’s help Thrall captures Grom and cleanses him. At Demon Fall Canyon Grom buries his axe in Mannoroth and kills him, dying himself; the curse that bound the orcs ends with them.',
    },
    hyjal: {
      title: 'The Battle of Mount Hyjal',
      text: 'At Medivh’s call, night elves, humans, orcs and tauren hold the passes before Archimonde. At the World Tree Malfurion sounds the Horn of Cenarius; wisps destroy Archimonde, Nordrassil is left half burned and the night elves lose their immortality.',
    },
    'frozen-throne': {
      title: 'The Frozen Throne cracks',
      text: 'In the ruins of Dalaran, Illidan turns the Eye of Sargeras on Icecrown. Malfurion stops him, but the Frozen Throne cracks; the Lich King’s grip slackens, and Sylvanas and many undead win back their will: the Forsaken.',
    },
    undercity: {
      title: 'Undercity',
      text: 'Sylvanas ambushes Arthas, defeats the three dreadlords one by one and turns on her ally Garithos. In the crypts beneath the ruined capital she proclaims her new capital: Undercity.',
    },
    durotar: {
      title: 'Durotar and Orgrimmar',
      text: 'Thrall settles his people on Kalimdor’s red east coast and names it after his father, Durotar; Orgrimmar bears Doomhammer’s name. Daelin Proudmoore attacks with a fleet and dies, and Rexxar plays a decisive part in founding the new land.',
    },
    theramore: {
      title: 'Theramore',
      text: 'Jaina Proudmoore founds Theramore on the coast of Dustwallow Marsh. The refugees of Lordaeron find a new home, and the Alliance a stronghold in Kalimdor.',
    },
    teldrassil: {
      title: 'Teldrassil',
      text: 'To win back immortality, Fandral Staghelm plants a new World Tree off Darkshore without the Dragon Aspects’ blessing. Darnassus rises on its crown, Malfurion is lost in the Emerald Dream, and the night elves join the Alliance.',
    },
    hamuul: {
      title: 'The first tauren druid',
      text: 'Malfurion trains Hamuul Runetotem, the first tauren archdruid of the new age. Tauren and night elf druids now share the Cenarion Circle in Moonglade.',
    },
    'forsaken-horde': {
      title: 'The Forsaken join the Horde',
      text: 'Sylvanas’s envoys are turned away at every gate until Hamuul Runetotem and Cairne Bloodhoof speak for them in Thunder Bluff. Thrall agrees, and Undercity becomes the Horde’s stronghold in the Eastern Kingdoms.',
    },
    crusade: {
      title: 'The Silver Hand splits',
      text: 'With Lordaeron fallen, the paladins’ order breaks apart. The fanatical Scarlet Crusade wars on every undead, while the Argent Dawn fights a steadier fight from Light’s Hope Chapel.',
    },
    zalazane: {
      title: 'Zalazane takes the Echo Isles',
      text: 'After the Third War the Darkspear settle on the Echo Isles off Durotar. The witch doctor Zalazane seizes them with dark magic; the survivors hold out in Sen’jin Village while Vol’jin stands at Thrall’s side.',
    },
    varian: {
      title: 'A throne without a king',
      text: 'King Varian Wrynn vanishes on the road to peace talks in Theramore. His young son Anduin takes the throne, Bolvar Fordragon rules as regent, and Lady Katrana Prestor’s word carries more and more weight at court.',
    },
    'hakkar-returns': {
      title: 'Hakkar returns',
      text: 'The blood god’s priests summon Hakkar again in Zul’Gurub. The Zandalar Tribe settles on Yojamba Isle and asks adventurers to stop him.',
    },
    'skyborne-crisis': {
      title: 'The silenced wind',
      when: 'The spirits’ vanishing is disputed: “a few centuries ago”',
      text: 'The wind spirits vanish and the pylons that tie Zephras to Skywall begin to fail. The High Order and the Windshapers drift apart; the Al’Aketh, a cult of Al’Akir, attack the pylons, and the truce at the Shrine of Akir meets Rohash’s threat.',
    },
    'skyborne-descent': {
      title: 'The descent to Azeroth',
      text: 'The two branches decide to leave Skywall and ask the Alliance and the Horde for help. Skyships sail from Valanaar: the High Order to Dalaran, the Windshapers to Skywatcher Plateau in Mulgore.',
    },
  },
};
