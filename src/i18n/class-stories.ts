import type { Lang } from '../config';

// Class story pages (src/pages/[lang]/classes/<class>.astro, served at /<lang>/classes/<class>/).
// Game terms, spell names, order names, and proper names stay English in both languages.

export interface ClassStoryData {
  metaDescription: string;
  overline: string;
  lead: string;
  facts: { label: string; value: string; extra?: string }[];
  chapters: {
    origin: string;
    two: string;
    three: string;
    four: string;
    five: string;
  };
  origin: {
    title: string;
    titleNote?: string;
    paragraphs: string[];
    stagesLabel: string;
    stages: { name: string; text: string }[];
    note: string;
  };
  two: {
    title: string;
    paragraphs: string[];
    cardsLabel: string;
    cards: { name: string; text: string; status: string; tone: 'home' | 'mute' | 'al' | 'ok' | 'no' }[];
    note: string;
  };
  three: {
    title: string;
    paragraphs: string[];
    cardsLabel: string;
    cards: { name: string; text: string; status: string; tone: 'home' | 'mute' | 'al' | 'ok' | 'no' }[];
    note: string;
  };
  four: {
    title: string;
    paragraphs: string[];
    specsLabel: string;
    specs: { name: string; role: string; text: string; spells: string[] }[];
    note: string;
  };
  five: {
    title: string;
    paragraphs: string[];
    figuresLabel: string;
    figures: { name: string; title: string; text: string }[];
    note: string;
  };
  outro: {
    title: string;
    text: string;
    nextText: string;
  };
}

export const MAGE_STORY: Record<Lang, ClassStoryData> = {
  tr: {
    metaDescription: 'Mage sınıfının tarihi: Arcane’in Well of Eternity ile şafağı, Dalaran ve Kirin Tor’un kuruluşu, Guardian of Tirisfal ve üç büyü okulu.',
    overline: 'Kadim Sırlar ve Büyü Okulları',
    lead: 'Zamanı büken, gökten alevler yağdıran ve düşmanlarını buza hapseden büyücüler, Azeroth’un en tehlikeli ve en bilgin zihinleridir.',
    facts: [
      { label: 'Rol', value: 'Menzilli Büyü Hasarı (Ranged DPS)' },
      { label: 'Birincil Kaynak', value: 'Mana' },
      { label: 'Zırh Tipi', value: 'Kumaş (Cloth)' },
      { label: 'İkonik Büyüler', value: 'Polymorph, Blink, Fireball, Blizzard, Portal' },
      { label: 'Tarihi Merkez', value: 'Dalaran ve Kirin Tor', extra: 'Violet Citadel' },
    ],
    chapters: {
      origin: 'Arcane’in Şafağı ve Well of Eternity',
      two: 'Troll Wars ve Dalaran’ın Yükselişi',
      three: 'Order of Tirisfal ve Son Guardian',
      four: 'Üç Kadim Disiplin: Arcane, Fire, Frost',
      five: 'Küllerinden Doğan Kirin Tor ve Modern Çağ',
    },
    origin: {
      title: 'Kozmik Enerji ve Kadim Göl',
      titleNote: 'Well of Eternity',
      paragraphs: [
        'Arcane, evrenin dokusunu birbirine bağlayan matematiksel ve mutlak düzendir. Titan’ların Azeroth’u şekillendirirken geride bıraktığı ley hatları, gezegenin damarlarında akan saf enerji ırmaklarıdır.',
        'Antik Kalimdor’un kalbinde parıldayan Well of Eternity, bu kozmik gücün yeryüzündeki en büyük kaynağıydı. Kraliçe Azshara ve Highborne soyluları gölün derinliklerindeki gücü açgözlülükle sömürdü; bu kibir, Burning Legion’ın dikkatini Azeroth’a çekerek Great Sundering ile kıtaların parçalanmasına yol açtı.',
        'Felaketten sağ kurtulan High Elf’ler, gölden alınan kutsal sularla kuzeyde Sunwell’i kurdu ve büyü mirasını yeni yurtları Quel’Thalas’ta yaşatmaya devam etti.',
      ],
      stagesLabel: 'Büyünün Köken Evreleri',
      stages: [
        { name: 'Titan Düzeni', text: 'Azeroth’un kabuğuna işlenen ley hatları ve düzen enerjisi.' },
        { name: 'Well of Eternity', text: 'Highborne soylularının ham büyüyü keşfetmesi ve ilk büyü ritüelleri.' },
        { name: 'Sundering Felaketi', text: 'Büyünün kontrolsüz kullanımının dünyayı parçalaması ve yıkım.' },
        { name: 'Sunwell Mirası', text: 'Quel’Thalas’ta kurulan yeni güneş kuyusu ve elf büyüsünün rafine edilişi.' },
      ],
      note: 'Büyü bir armağan değil, muazzam bir sorumluluktur. Kontrol edilmeyen Arcane, evrenin en karanlık güçlerini bir fener gibi kendine çeker.',
    },
    two: {
      title: 'İnsanlara Büyü Öğretmek',
      paragraphs: [
        'Great Sundering’den binlerce yıl sonra, Amani orman trolleri High Elf krallığı Quel’Thalas’ı yok olmanın eşiğine getirdi. Çaresiz kalan elf’ler, Arathor İmparatorluğu’nun insan kralı Thoradin’e elçiler gönderdi.',
        'Tarihi bir antlaşmayla High Elf büyücüleri, 100 insan askerine Arcane sanatlarının temellerini öğretti. Troll Wars sırasında insan ve elf büyücülerinin ortak alev fırtınaları Amani ordularını küle çevirdi ve iki halk arasında ebedi bir bağ kuruldu.',
        'Savaşın ardından insan büyücüler, kabile hayatından uzaklaşarak Lordamere Gölü kıyısında kendi bağımsız şehir devletleri Dalaran’ı kurdu. Şehir, Kirin Tor adı verilen seçkin büyücüler konseyi tarafından yönetilen bir magokrasiye dönüştü.',
      ],
      cardsLabel: 'Dalaran ve Troll Wars Gelişmeleri',
      cards: [
        { name: 'İlk Yüz İnsan', text: 'Thoradin’in seçtiği 100 savaşçıya büyü öğretildi ve ilk insan büyücüler doğdu.', status: 'Dönüm Noktası', tone: 'ok' },
        { name: 'Troll Wars Zaferi', text: 'Devasa alev büyüleri Amani troll ordularını yok ederek krallıkları kurtardı.', status: 'Zafer', tone: 'ok' },
        { name: 'Dalaran’ın Kuruluşu', text: 'Büyü çalışmalarının özgürce ve halktan izole yürütüleceği şehir inşa edildi.', status: 'Kuruluş', tone: 'home' },
        { name: 'Kirin Tor Meclisi', text: 'Büyünün güvenliğini denetleyen ve Dalaran’ı yöneten Council of Six kuruldu.', status: 'Düzen', tone: 'al' },
      ],
      note: 'İnsanların büyüyü bu kadar hızlı kavraması elf’leri şaşırttı. Ancak insanların disiplinsiz büyü kullanımı, iblislerin yeniden Azeroth’a sızmasına zemin hazırladı.',
    },
    three: {
      title: 'Order of Tirisfal ve Son Guardian',
      paragraphs: [
        'Dalaran’da büyünün yoğunlaşmasıyla birlikte küçük çaplı iblis saldırıları baş gösterdi. Halkı paniğe sevk etmemek adına elf ve insan büyücüler gizli bir ittifak kurdu: Council of Tirisfal.',
        'Meclis, her nesilde en yetenekli büyücüyü seçip tüm meclisin gücünü ona aktararak bir “Guardian” yarattı. Bu koruyucu, halktan gizli şekilde dünyayı dolaşıp Burning Legion ajanlarını tek başına avlamakla görevliydi.',
        'Ancak kibir en büyük düşman oldu. Magna Aegwynn, Sargeras’ın avatarını Northrend’de mağlup ettikten sonra meclise meydan okudu ve gücünü oğlu Medivh’e devretti. Bilmediği şey, Sargeras’ın ruhunun henüz doğmamış Medivh’in bedenine gizlendiğiydi. Son Guardian Medivh, ork’ları Azeroth’a davet eden Dark Portal’ı açarak First War’ı başlattı.',
      ],
      cardsLabel: 'Tirisfal ve Medivh Süreci',
      cards: [
        { name: 'Council of Tirisfal', text: 'İblis avlamak için gücünü tek bir büyücüye aktaran gizli meclis.', status: 'Gizli İttifak', tone: 'home' },
        { name: 'Magna Aegwynn', text: 'Sargeras’ın avatarını yenen ama kibriyle kaderi mühürleyen efsanevi Guardian.', status: 'Guardian', tone: 'al' },
        { name: 'Medivh’in İhaneti', text: 'İçindeki karanlığa yenik düşerek Dark Portal’ı açan son Guardian.', status: 'Yıkım', tone: 'no' },
        { name: 'Guardian Çağının Sonu', text: 'Medivh’in ölümüyle tek bir kişiye sınırsız güç yükleme geleneği sona erdi.', status: 'Kapanış', tone: 'mute' },
      ],
      note: 'Guardian geleneği, mutlak gücün tek bir fani zihne emanet edilemeyeceğini kanıtladı. Medivh’in düşüşü, Azeroth’un gördüğü en büyük trajedilerin fitilini ateşledi.',
    },
    four: {
      title: 'Üç Kadim Disiplin: Arcane, Fire, Frost',
      paragraphs: [
        'Kirin Tor kütüphanelerinde büyücüler yeteneklerini üç temel uzmanlık dalında rafine etti. Her uzmanlık, büyücünün zihinsel ve ruhsal doğasına hitap eden farklı bir felsefeyi temsil eder.',
        'Arcane, ham kozmik kudreti ve zamanı manipüle eder; Fire, elemental yıkımın en vahşi ve dizginlenemez formunu serbest bırakır; Frost ise kusursuz zihinsel odaklanma ve düşmanı mutlak durağanlığa mahkûm eden savunma sanatıdır.',
      ],
      specsLabel: 'Büyü Uzmanlıkları',
      specs: [
        {
          name: 'Arcane',
          role: 'Saf Kozmik Güç ve Zaman',
          text: 'Gerçekliğin dokusunu büker, zamanı yavaşlatır ve saf mana patlamalarıyla düşmanı atomlarına ayırır. Yüksek mana tüketir ama anlık hasar potansiyeli sınırsızdır.',
          spells: ['Arcane Missiles', 'Arcane Power', 'Blink', 'Presence of Mind'],
        },
        {
          name: 'Fire',
          role: 'Piromansi ve Kaos',
          text: 'Alevin yakıcı öfkesini çağırır. Kritik vuruşlarla alevlenen düşmanlar kül olana kadar yanmaya devam eder. En yüksek patlayıcı alan hasarına sahiptir.',
          spells: ['Fireball', 'Pyroblast', 'Combustion', 'Flamestrike'],
        },
        {
          name: 'Frost',
          role: 'Mutlak Sıfır ve Kontrol',
          text: 'Zihni soğukkanlı bir kaleye dönüştürür. Düşmanları dondurarak hareket kabiliyetlerini yok eder, Ice Block ile büyücüyü mutlak dokunulmazlığa kavuşturur.',
          spells: ['Frostbolt', 'Blizzard', 'Ice Block', 'Cone of Cold'],
        },
      ],
      note: 'Büyücü hiçbir silaha güvenmez; onun zırhı zihni, kılıcı ise dudaklarından dökülen kadim sözcüklerdir.',
    },
    five: {
      title: 'Küllerinden Doğan Kirin Tor ve Modern Çağ',
      paragraphs: [
        'Third War’da iblis lordu Archimonde, Dalaran’ı kumdan bir kale gibi yerle bir etti. Ancak büyücülerin azmi kırılamadı. Şehir sihirli bir kubbe altında yeniden inşa edildi ve sonrasında gökyüzüne kaldırılarak uçan bir kaleye dönüştürüldü.',
        'Jaina Proudmoore Theramore’u kurarak büyücülerin barış vizyonunu temsil etti; Khadgar ise Outland ve ötesinde Burning Legion’a karşı direnişin sembolü oldu.',
        'Bugün hem Alliance hem Horde saflarında savaşan büyücüler, zekâ ve iradenin kaba kuvvetten daima üstün olduğunu her savaş alanında kanıtlamaya devam ediyor.',
      ],
      figuresLabel: 'Tarihe Yön Veren Büyücüler',
      figures: [
        { name: 'Khadgar', title: 'Archmage · Kirin Tor Lideri', text: 'Medivh’in çırağıydı; ustasının ihanetini ortaya çıkardı ve Dark Portal’ın kapatılmasında başrol oynadı.' },
        { name: 'Jaina Proudmoore', title: 'Lady of Theramore', text: 'Antonidas’ın en parlak öğrencisi. Third War’da insanları Kalimdor’a taşıdı ve Hyjal Zirvesi’nde savaştı.' },
        { name: 'Antonidas', title: 'Grand Magus of Dalaran', text: 'Kirin Tor’un uzun yıllar liderliğini yaptı; Scourge kuşatmasında şehri canı pahasına savundu.' },
      ],
      note: 'Taşlar yıkılabilir, kütüphaneler yanabilir; ancak bilgi zihinde kaldığı sürece Dalaran asla yok edilemez.',
    },
    outro: {
      title: 'Zihnin Ebedi Kudreti',
      text: 'Mage olmak, evrenin sınırlarını zorlamak ve bedeli ne olursa olsun gerçeğin peşinden gitmektir. Arcane fısıltıları dinmeyecek.',
      nextText: 'Yabanın çağrısını dinleyen, canavarlarla kadim bir bağ kuran avcıların hikayesine geç.',
    },
  },
  en: {
    metaDescription: 'The history of the Mage class: the dawn of Arcane at the Well of Eternity, the rise of Dalaran and the Kirin Tor, the Guardian of Tirisfal, and the three schools of magic.',
    overline: 'Ancient Mysteries and Schools of Magic',
    lead: 'Bending time, calling down fiery cataclysms, and freezing foes in absolute zero, mages represent the most dangerous and scholarly minds of Azeroth.',
    facts: [
      { label: 'Role', value: 'Ranged Magic Damage (DPS)' },
      { label: 'Primary Resource', value: 'Mana' },
      { label: 'Armor Type', value: 'Cloth' },
      { label: 'Iconic Spells', value: 'Polymorph, Blink, Fireball, Blizzard, Portal' },
      { label: 'Historical Sanctuary', value: 'Dalaran & the Kirin Tor', extra: 'The Violet Citadel' },
    ],
    chapters: {
      origin: 'The Dawn of Arcane & Well of Eternity',
      two: 'The Troll Wars & The Rise of Dalaran',
      three: 'The Order of Tirisfal & The Last Guardian',
      four: 'Three Ancient Disciplines: Arcane, Fire, Frost',
      five: 'The Kirin Tor Reborn & Modern Era',
    },
    origin: {
      title: 'Cosmic Order & The Primal Well',
      titleNote: 'Well of Eternity',
      paragraphs: [
        'Arcane is the mathematical, immutable order binding the cosmos together. When the Titans shaped Azeroth, they left behind ley lines—glowing rivers of raw power coursing beneath the crust.',
        'At the heart of ancient Kalimdor shone the Well of Eternity, the vastest reservoir of cosmic energy on the world. Queen Azshara and her Highborne recklessly tapped into its depths; this hubris lured the Burning Legion, culminating in the Great Sundering that shattered the world into continents.',
        'Survivors among the High Elves salvaged sacred vials from the well, consecrated the Sunwell in northern Quel’Thalas, and refined the arcane traditions in their new kingdom.',
      ],
      stagesLabel: 'Origins of Magic',
      stages: [
        { name: 'Titan Ordering', text: 'Ley lines woven into the world’s crust as conduits of pure cosmic order.' },
        { name: 'Well of Eternity', text: 'The Highborne discover raw power and codify the first arcane rituals.' },
        { name: 'The Sundering', text: 'Unchecked sorcery rips the primordial supercontinent apart.' },
        { name: 'Sunwell Heritage', text: 'Quel’Thalas establishes a new font of magic, refining elven wizardry.' },
      ],
      note: 'Magic is not a gift; it is a precarious burden. Unchecked Arcane acts like a radiant beacon to the darkest horrors of the cosmos.',
    },
    two: {
      title: 'Teaching Humanity Sorcery',
      paragraphs: [
        'Millennia after the Sundering, the Amani troll empire pushed the High Elves of Quel’Thalas to the brink of annihilation. In desperation, the elves sent emissaries to King Thoradin of the human Empire of Arathor.',
        'Under a historic pact, elven magi instructed 100 human warriors in the fundamentals of the Arcane. During the Troll Wars, synchronized firestorms called down by humans and elves incinerated the Amani vanguard, forging an eternal alliance.',
        'After the victory, human magi departed the tribal heartland and founded Dalaran beside Lordamere Lake. Governed by the Council of Six and the Kirin Tor, it became a sovereign magocracy dedicated entirely to study and scholarship.',
      ],
      cardsLabel: 'Dalaran & Troll Wars Milestones',
      cards: [
        { name: 'The First Hundred', text: 'Thoradin’s selected warriors mastered the basics, becoming humanity’s first magi.', status: 'Turning Point', tone: 'ok' },
        { name: 'Troll Wars Victory', text: 'Colossal pillar-storms of fire decimated the Amani army and saved both realms.', status: 'Victory', tone: 'ok' },
        { name: 'Foundation of Dalaran', text: 'A dedicated city-state founded to study magic away from suspicious commoners.', status: 'Foundation', tone: 'home' },
        { name: 'The Kirin Tor', text: 'The Council of Six established to govern the magocracy and safeguard arcane research.', status: 'Order', tone: 'al' },
      ],
      note: 'Human adaptability in mastering magic astonished the elves, but their undisciplined spellcraft soon attracted demons once again.',
    },
    three: {
      title: 'The Order of Tirisfal & The Last Guardian',
      paragraphs: [
        'As spellcraft intensified in Dalaran, minor demonic incursions plagued the surrounding lands. To prevent widespread panic, human and elven leaders formed a clandestine covenant: the Council of Tirisfal.',
        'Every generation, the Council channeled a portion of their collective power into a single champion—the Guardian of Tirisfal. Wandering in secret, the Guardian eliminated demonic infiltrators without disrupting the mortal world.',
        'Yet supreme pride became their undoing. Magna Aegwynn defeated the avatar of Sargeras in Northrend and severed ties with the Council, bequeathing her mantle directly to her son, Medivh. Unbeknownst to her, Sargeras’s malignant spirit had entered the unborn child. Corrupted from within, Medivh orchestrated the opening of the Dark Portal, igniting the First War.',
      ],
      cardsLabel: 'Tirisfal & Medivh Progression',
      cards: [
        { name: 'Council of Tirisfal', text: 'A covert order channeling supreme power into one champion to hunt demonic spies.', status: 'Secret Order', tone: 'home' },
        { name: 'Magna Aegwynn', text: 'The legendary Guardian who felled the avatar of Sargeras but succumbed to pride.', status: 'Guardian', tone: 'al' },
        { name: 'Medivh’s Fall', text: 'Possessed by the Dark Titan, the Last Guardian opened the Dark Portal.', status: 'Tragedy', tone: 'no' },
        { name: 'End of Guardianship', text: 'With Medivh’s fall, vesting unchecked omnipotence in a single mortal ceased forever.', status: 'Closure', tone: 'mute' },
      ],
      note: 'The Guardian institution proved that absolute power cannot be entrusted to a single mortal mind. Medivh’s corruption changed the destiny of Azeroth forever.',
    },
    four: {
      title: 'Three Ancient Disciplines: Arcane, Fire, Frost',
      paragraphs: [
        'Within the libraries of the Kirin Tor, mages categorized their arts into three distinct specializations. Each path demands a unique temperament, mental discipline, and philosophical focus.',
        'Arcane commands pure reality manipulation and temporal distortion; Fire unleashes volatile pyromancy and catastrophic explosive power; Frost embodies stoic control, turning chilling cold into both an impenetrable shield and an inescapable prison.',
      ],
      specsLabel: 'Mage Specializations',
      specs: [
        {
          name: 'Arcane',
          role: 'Pure Energy & Time Distortion',
          text: 'Manipulates the fabric of reality, slows time, and disintegrates adversaries with concentrated volleys of raw mana. Highly mana-intensive with devastating burst windows.',
          spells: ['Arcane Missiles', 'Arcane Power', 'Blink', 'Presence of Mind'],
        },
        {
          name: 'Fire',
          role: 'Pyromancy & Destruction',
          text: 'Channels volatile flames that sear and ignite foes. Cascading critical strikes ensure that burned enemies continue smoldering until nothing remains.',
          spells: ['Fireball', 'Pyroblast', 'Combustion', 'Flamestrike'],
        },
        {
          name: 'Frost',
          role: 'Absolute Zero & Battlefield Control',
          text: 'Employs icy calm to freeze enemies in place, shattering brittle ice barriers and shielding the caster inside an impenetrable block of enchanted ice.',
          spells: ['Frostbolt', 'Blizzard', 'Ice Block', 'Cone of Cold'],
        },
      ],
      note: 'A mage relies neither on heavy armor nor sharpened blades; their ward is intellect, and their weapon is the spoken word of power.',
    },
    five: {
      title: 'The Kirin Tor Reborn & The Modern Era',
      paragraphs: [
        'In the Third War, the demon lord Archimonde reduced Dalaran’s towering spires to dust. Yet the resolve of its magi endured. Sheltered beneath an opaque arcane dome, the city was reconstructed and eventually levitated into the heavens.',
        'Jaina Proudmoore championed unity by establishing Theramore, while Khadgar stood as a stalwart bulwark against the Burning Legion across Draenor and Azeroth.',
        'Today, mages across both Alliance and Horde prove on every battlefield that intellect, study, and iron will triumph over brute strength.',
      ],
      figuresLabel: 'Pivotal Historical Magi',
      figures: [
        { name: 'Khadgar', title: 'Archmage · Head of the Kirin Tor', text: 'Apprentice to Medivh who unmasked his master’s dark secret and led the Expedition beyond the Dark Portal.' },
        { name: 'Jaina Proudmoore', title: 'Lady of Theramore', text: 'Antonidas’s brilliant protégée who led survivors to Kalimdor and stood firm at Mount Hyjal.' },
        { name: 'Antonidas', title: 'Grand Magus of Dalaran', text: 'Longtime leader of the Kirin Tor who defended the city to the last against the Scourge.' },
      ],
      note: 'Stone may crumble and scrolls may burn, but so long as knowledge lives within the mind, Dalaran will never perish.',
    },
    outro: {
      title: 'The Mind Triumphant',
      text: 'To be a mage is to explore the outer reaches of reality and accept the perils of knowledge. The whispers of the Arcane never cease.',
      nextText: 'Heed the call of the wilderness and discover the ancient bond of the Hunter.',
    },
  },
};

export const HUNTER_STORY: Record<Lang, ClassStoryData> = {
  tr: {
    metaDescription: 'Hunter sınıfının tarihi: Yabanın çağrısı, canavarlarla kurulan kadim bağ, Quel’Thalas Farstriders birliği ve üç hayatta kalma yolu.',
    overline: 'Yabanın Çağrısı ve Sadakat',
    lead: 'İzleri okuyan, tuzakları kuran ve canavarlarla ruhani bir bağ kuran avcılar, doğanın evcilleştirilemez ruhunu savaş alanına taşır.',
    facts: [
      { label: 'Rol', value: 'Menzilli Fiziksel Hasar (Ranged Physical DPS)' },
      { label: 'Birincil Kaynak', value: 'Mana (Classic) / Odak (Focus)' },
      { label: 'Zırh Tipi', value: 'Deri (Leather) / Seviye 40+ Post (Mail)' },
      { label: 'İkonik Yetenekler', value: 'Tame Beast, Aimed Shot, Hunter’s Mark, Feign Death, Frost Trap' },
      { label: 'Tarihi Birlikler', value: 'Farstriders, Unseen Path, Mountaineers', extra: 'Nesingwary Av Seferleri' },
    ],
    chapters: {
      origin: 'Yabanın Çağrısı ve İlk İz Sürücüler',
      two: 'Canavarlarla Kadim Bağ ve Sadakat',
      three: 'Ormanların Gölgesinde Savaş: Rangers ve Nişancılar',
      four: 'Üç Hayatta Kalma Yolu: Beast Mastery, Marksmanship, Survival',
      five: 'Gözlerden Uzak Patika ve Modern Avcılar',
    },
    origin: {
      title: 'İlk İzler ve İlkel Hayatta Kalma',
      titleNote: 'Survival of the Fittest',
      paragraphs: [
        'Uygarlıklar kurulmadan, büyülü kuleler yükselmeden önce sadece yaban hayat vardı. İlk faniler, vahşi Azeroth’ta hayatta kalabilmek için doğayı bir düşman değil, okunması gereken bir harita olarak kabul etti.',
        'Rüzgârın yönü, kırılan bir dal, topraktaki pençe izi ve havada asılı duran koku... Avcı, duyularını doğanın frekansına ayarlayan ilk savaşçıydı. Kalimdor’un kadim ormanlarında Night Elf nöbetçileri, Mulgore ovalarında Tauren iz sürücüler ve Dun Morogh’un dondurucu tepelerinde Dwarf dağcıları aynı temel gerçeği keşfetti: Doğaya saygı duymayan, onun kurbanı olur.',
        'Avcılar hiçbir zaman avladıkları hayvanlara nefretle yaklaşmadı; her ok atışı, ekosistemin dengesini koruyan kutsal bir döngünün parçasıydı.',
      ],
      stagesLabel: 'Avcılığın Doğuş Aşamaları',
      stages: [
        { name: 'İlkel İz Sürücülük', text: 'Topraktaki izleri, rüzgârı ve hava değişimlerini okuma sanatı.' },
        { name: 'Yay ve Zıpkın', text: 'Mesafeyi avantaja çeviren ilk ilkel menzilli silahların icadı.' },
        { name: 'Kamuflaj ve Pusu', text: 'Çevreye kusursuz uyum sağlayarak görünmez olma yeteneği.' },
        { name: 'Yaban Ruhu', text: 'Yırtıcı hayvanların ruhlarıyla empati kurup onları anlama olgunluğu.' },
      ],
      note: 'Avcı doğaya hükmetmez; onun kurallarına en kusursuz şekilde uyum sağlayarak hayatta kalır.',
    },
    two: {
      title: 'Canavarlarla Kadim Bağ ve Sadakat',
      titleNote: 'Tame Beast',
      paragraphs: [
        'Avcıyı sıradan bir okçudan ayıran en derin güç, vahşi bir canavarın kalbini kazanabilmesidir. Bu bağ bir efendi-köle ilişkisi değil; iki yırtıcının birbirine canını emanet ettiği bir yaşam ortaklığıdır.',
        'Kadim Wild God’lar (Vahşi Tanrılar)—kurt tanrısı Goldrinn, panter tanrıçası Ashamane ve kartal ruhları—avcıların yaban hayatla kurduğu bu telepatik bağı kutsamıştır.',
        'Bir kurtla sırt sırta savaşmak, bir ayının koruyucu kükremesiyle siper almak ya da bir şahinin keskin gözleriyle gökyüzünü taramak... Avcı, evcilleştirdiği yoldaşının gücüyle iki katına çıkar.',
      ],
      cardsLabel: 'Yoldaşlık Boyutları',
      cards: [
        { name: 'Sadakat ve Güven', text: 'Zorla boyun eğdirilen canavar sırt çevirir; sadece sevgi ve besinle beslenen bağ ölümsüzdür.', status: 'Kutsal Bağ', tone: 'home' },
        { name: 'Yırtıcı İçgüdüsü', text: 'Canavarın koku alma ve tehlikeyi sezme duyuları avcının reflekslerine karışır.', status: 'İçgüdü', tone: 'ok' },
        { name: 'Savaş Meydanı Yoldaşı', text: 'Düşmanı yere seren bir pençe darbesi, avcıya ölümcül okunu atacak zamanı kazandırır.', status: 'Taktik', tone: 'al' },
        { name: 'Efsanevi Canavarlar', text: 'Ruhani canavarlar (Spirit Beasts) sadece kalbi saf olan usta avcılara boyun eğer.', status: 'Zirve', tone: 'ok' },
      ],
      note: 'Avcının en yakın dostu saraylarda değil; yanında nefes alan, yaralarını yalayan ve onun için ölüme atılan kurdunun gözlerindedir.',
    },
    three: {
      title: 'Ormanların Gölgesinde Savaş: Rangers ve Nişancılar',
      paragraphs: [
        'Savaş patlak verdiğinde avcılar daima ordunun öncü gözleri ve görünmeyen ölüm melekleri olmuştur. Quel’Thalas’ın Farstriders birliği, ork ve troll istilalarına karşı ormanları birer ölüm labirentine dönüştürdü.',
        'Alleria Windrunner ve kardeşleri Sylvanas ile Vereesa, elf yaylarının menzilini ölümcül bir sanata dönüştürdü. Ağaç tepelerinden atılan tek bir ok, bir ork şefini yere sermeye yetiyordu.',
        'Aynı dönemde Khaz Modan’da Dwarf nişancıları, mekanize tüfekleri ve barut teknolojisini avcılık disiplinine entegre ederek dağ geçitlerini savunulamaz kalelere dönüştürdü.',
      ],
      cardsLabel: 'Tarihi Çatışmalarda Avcılar',
      cards: [
        { name: 'Farstriders Savunması', text: 'Quel’Thalas sınırlarını koruyan efsanevi elf okçu ve korucu birliği.', status: 'Öncü Kuvvet', tone: 'al' },
        { name: 'Second War Orman Pusuları', text: 'Alleria Windrunner liderliğinde ork Horde birliklerinin ikmal hatları kesildi.', status: 'Zafer', tone: 'ok' },
        { name: 'Dwarf Dağcıları (Mountaineers)', text: 'Kar fırtınalarında tüfekleriyle Khaz Modan dağ geçitlerini bekleyen keskin nişancılar.', status: 'Muhafız', tone: 'home' },
        { name: 'Tuzak ve Yıpratma', text: 'Büyük orduları doğrudan karşılamak yerine tuzaklarla adım adım yok etme stratejisi.', status: 'Doktrin', tone: 'mute' },
      ],
      note: 'Avcı savaşı göğüs göğüse değil, düşmanın ayağını bastığı yeri önceden hesaplayarak kazanır.',
    },
    four: {
      title: 'Üç Hayatta Kalma Yolu: Beast Mastery, Marksmanship, Survival',
      paragraphs: [
        'Avcılar avlarını ve silahlarını seçerken üç kadim uzmanlık yolundan birinde ustalaşır. Kimi tamamen canavarların yırtıcı ruhuna sığınır, kimi kusursuz bir nişancıya dönüşür, kimi ise yakın dövüş ve tuzakların ustası olur.',
      ],
      specsLabel: 'Avcı Uzmanlıkları',
      specs: [
        {
          name: 'Beast Mastery',
          role: 'Canavar Efendisi ve Yaban Bağı',
          text: 'Yoldaşıyla tek bir vücut gibi dövüşür. Bestial Wrath ile canavarını durdurulamaz bir öfkeye sokar, egzotik yaratıkları evcilleştirme ayrıcalığına sahiptir.',
          spells: ['Bestial Wrath', 'Intimidation', 'Mend Pet', 'Aspect of the Hawk'],
        },
        {
          name: 'Marksmanship',
          role: 'Kusursuz Keskin Nişancılık',
          text: 'Gözün gördüğü en uzak noktadaki hedefi bile tek atışta delip geçer. Trueshot Aura ile müttefiklerinin menzilli saldırı gücünü artırır.',
          spells: ['Aimed Shot', 'Multi-Shot', 'Trueshot Aura', 'Concussive Shot'],
        },
        {
          name: 'Survival',
          role: 'Tuzaklar ve Vahşi Doğada Yaşam',
          text: 'Zehirli iğneler, dondurucu buz tuzakları, patlayıcılar ve yakın dövüş silahlarıyla her türlü arazi koşulunu düşman için mezara çevirir.',
          spells: ['Frost Trap', 'Freezing Trap', 'Feign Death', 'Counterattack'],
        },
      ],
      note: 'Hedef kaçabilir, saklanabilir; ancak rüzgâr izin verdiği sürece avcının okundan hiçbir canlı kurtulamaz.',
    },
    five: {
      title: 'Gözlerden Uzak Patika ve Modern Avcılar',
      paragraphs: [
        'Avcılar nadiren saraylarda boy gösterir; onların evi vahşi doğanın derinlikleridir. "The Unseen Path" (Görünmeyen Patika) gibi kadim avcı cemiyetleri, Highmountain zirvelerinden tüm dünyadaki dengeleri sessizce gözetler.',
        'Mok’Nathal melez savaşçısı Rexxar, sadık ayısı Misha ile birlikte Horde’un başkenti Orgrimmar’ın kuruluşuna öncülük etmiş ve bir avcının tek başına bile bir ulusun kaderini değiştirebileceğini kanıtlamıştır.',
        'Hemet Nesingwary’nin efsanevi av seferleri ise Stranglethorn Vale’den Northrend tundralarına kadar Azeroth’un en tehlikeli canavarlarını dize getirmiştir.',
      ],
      figuresLabel: 'Efsanevi Avcılar',
      figures: [
        { name: 'Rexxar', title: 'Champion of the Horde · Beastmaster', text: 'Misha, Huffer ve Leokk ile dolaşan yarı-ork yarı-ogre gezgin. Daelin Proudmoore’a karşı savaşı kazandırdı.' },
        { name: 'Alleria Windrunner', title: 'Ranger Captain of Silvermoon', text: 'Second War’da Horde’u avlayan, Dark Portal’ın ötesine geçen efsanevi elven okçu.' },
        { name: 'Hemet Nesingwary', title: 'Büyük Avcı', text: 'Azeroth’un dört bir yanına av seferleri düzenleyen, en vahşi yaratıkları avlayan cüce kaşif.' },
      ],
      note: 'Krallar tahtlarından düşer, ordular dağılır; fakat iz süren bir avcı ve sadık yoldaşı her çağda yaşamaya devam eder.',
    },
    outro: {
      title: 'İzin Sonu ve Yeni Av',
      text: 'Yaban asla uyumaz. Avcı olmak, doğanın nabzını tutmak ve her nefeste rüzgârı dinlemektir. Sadık yoldaşın yanında olduğu sürece asla yalnız değilsin.',
      nextText: 'Kutsal Işığın zırhını kuşanan, inancı çelikle birleştiren Paladin’lerin hikayesine geç.',
    },
  },
  en: {
    metaDescription: 'The history of the Hunter class: the call of the wild, the primal bond with beasts, the Farstriders of Quel’Thalas, and the three paths of survival.',
    overline: 'Call of the Wild & Loyalty',
    lead: 'Reading tracks, laying cunning traps, and communing with untamed beasts, hunters bring the untamed spirit of the wilderness directly to the battlefield.',
    facts: [
      { label: 'Role', value: 'Ranged Physical Damage (DPS)' },
      { label: 'Primary Resource', value: 'Mana (Classic) / Focus' },
      { label: 'Armor Type', value: 'Leather / Mail (Level 40+)' },
      { label: 'Iconic Abilities', value: 'Tame Beast, Aimed Shot, Hunter’s Mark, Feign Death, Frost Trap' },
      { label: 'Historical Orders', value: 'Farstriders, Unseen Path, Mountaineers', extra: 'Nesingwary Expeditions' },
    ],
    chapters: {
      origin: 'Call of the Wild & The First Stalkers',
      two: 'The Ancient Bond & Beast Loyalty',
      three: 'War in the Forest Canopy: Rangers & Marksmen',
      four: 'Three Ways of the Wild: Beast Mastery, Marksmanship, Survival',
      five: 'The Unseen Path & Modern Stalkers',
    },
    origin: {
      title: 'First Tracks & Primal Survival',
      titleNote: 'Survival of the Fittest',
      paragraphs: [
        'Before kingdoms stood or arcane towers pierced the clouds, there was only the wild. Ancient mortals quickly realized that surviving primal Azeroth required reading nature not as an adversary, but as an open book.',
        'The shift of the wind, a snapped branch, fresh claw marks upon moss, the faint scent of musk on the evening breeze... The hunter was the first warrior whose senses attuned to the world’s heartbeat. Night Elf Sentinels in Kalimdor, Tauren braves in Mulgore, and Dwarven mountaineers in Dun Morogh discovered the same truth: those who disrespect nature perish by it.',
        'Hunters never hunted out of malice; every notched arrow maintained the delicate equilibrium of the predator-prey cycle.',
      ],
      stagesLabel: 'Evolution of the Hunt',
      stages: [
        { name: 'Primal Tracking', text: 'Mastering the art of reading ground signs, wind shifts, and seasonal migration.' },
        { name: 'Bow & Harpoon', text: 'Inventing the first ranged implements to turn distance into decisive advantage.' },
        { name: 'Camouflage & Ambush', text: 'Blending seamlessly into foliage to become entirely undetectable.' },
        { name: 'Primal Empathy', text: 'Attuning mentally to the instincts of predatory beasts to understand their spirit.' },
      ],
      note: 'A hunter does not conquer the wild; they survive by mastering its unforgiving laws.',
    },
    two: {
      title: 'The Ancient Bond & Beast Loyalty',
      titleNote: 'Tame Beast',
      paragraphs: [
        'What separates a true hunter from a simple archer is the profound ability to win the loyalty of a wild beast. This bond is no master-servant dynamic; it is an enduring covenant where two predators entrust their lives to one another.',
        'Ancient Wild Gods—Goldrinn the wolf, Ashamane the panther, and great avian spirits—blessed this spiritual bridge between mortal and beast.',
        'Fighting shoulder-to-shoulder with a wolf, sheltering behind a bear’s defensive roar, or scanning the horizon through a hawk’s keen eyes... A hunter’s combat potency is doubled beside their companion.',
      ],
      cardsLabel: 'Facets of Companionship',
      cards: [
        { name: 'Loyalty & Trust', text: 'A beast broken by cruelty will turn; only patience, food, and mutual respect forge an eternal bond.', status: 'Sacred Bond', tone: 'home' },
        { name: 'Predatory Instinct', text: 'The companion’s acute scent and threat detection sharpen the hunter’s own reflexes.', status: 'Instinct', tone: 'ok' },
        { name: 'Tactical Synergy', text: 'A tearing bite pins the enemy, buying the crucial seconds needed for a lethal arrow strike.', status: 'Synergy', tone: 'al' },
        { name: 'Spirit Beasts', text: 'Spectral and mythical creatures yield their loyalty solely to the purest and most seasoned stalkers.', status: 'Mastery', tone: 'ok' },
      ],
      note: 'A hunter’s truest companion is not found in golden palaces, but in the glowing eyes of the wolf resting faithfully beside their campfire.',
    },
    three: {
      title: 'War in the Forest Canopy: Rangers & Marksmen',
      paragraphs: [
        'When war swept across the land, hunters served as the vanguard eyes and unseen executioners of every army. The Farstriders of Quel’Thalas transformed their primeval woodlands into lethal labyrinths against encroaching trolls and orcs.',
        'Alleria Windrunner and her sisters Sylvanas and Vereesa elevated elven marksmanship into an unmatched martial discipline. A single arrow loosed from a tree canopy could fell an orc chieftain before the bowstring ceased vibrating.',
        'Meanwhile in Khaz Modan, Dwarven mountaineers paired rifled barrels and gunpowder with mountaineering cunning, turning narrow crags and snowy defiles into impregnable bastions.',
      ],
      cardsLabel: 'Hunters in Epic Campaigns',
      cards: [
        { name: 'The Farstriders', text: 'Elite elven rangers safeguarding Quel’Thalas’s borders with unmatched bowmanship.', status: 'Vanguard', tone: 'al' },
        { name: 'Second War Guerilla', text: 'Alleria Windrunner led surgical forest ambushes that severed the Horde’s supply train.', status: 'Victory', tone: 'ok' },
        { name: 'Dwarf Mountaineers', text: 'Gunslinging scouts holding Khaz Modan’s frigid passes against superior numbers.', status: 'Guardians', tone: 'home' },
        { name: 'Attrition & Trapping', text: 'Whittling massive armies down piece by piece with cunning snares and feigned retreats.', status: 'Strategy', tone: 'mute' },
      ],
      note: 'The hunter rarely fights toe-to-toe; they win by anticipating where their quarry’s boot will fall three steps before it does.',
    },
    four: {
      title: 'Three Ways of the Wild: Beast Mastery, Marksmanship, Survival',
      paragraphs: [
        'Hunters hone their craft along three disciplined philosophies. Some entrust their soul entirely to their beast companions, others master extreme ballistic precision, while others dominate close-quarters skirmishing with traps and blade.',
      ],
      specsLabel: 'Hunter Specializations',
      specs: [
        {
          name: 'Beast Mastery',
          role: 'Primal Kinship & Exotic Beasts',
          text: 'Fights in seamless coordination with their animal companion, whipping their beast into a furious frenzy with Bestial Wrath and taming the rarest creatures of Azeroth.',
          spells: ['Bestial Wrath', 'Intimidation', 'Mend Pet', 'Aspect of the Hawk'],
        },
        {
          name: 'Marksmanship',
          role: 'Long-Range Ballistic Precision',
          text: 'Eliminates targets at staggering distances with pinpoint shots, enhancing the ranged lethality of all companions with Trueshot Aura.',
          spells: ['Aimed Shot', 'Multi-Shot', 'Trueshot Aura', 'Concussive Shot'],
        },
        {
          name: 'Survival',
          role: 'Traps, Poisons & Wilderness Cunning',
          text: 'Converts any terrain into a lethal hazard using freezing ice traps, blinding venom, improvised explosives, and agile close-quarters parrying.',
          spells: ['Frost Trap', 'Freezing Trap', 'Feign Death', 'Counterattack'],
        },
      ],
      note: 'The quarry may flee or burrow deep; but so long as the wind carries a scent, no prey escapes the hunter’s relentless pursuit.',
    },
    five: {
      title: 'The Unseen Path & Modern Stalkers',
      paragraphs: [
        'Hunters seldom linger in throne rooms; their domain lies out in the untamed wilderness. Secret brotherhoods like the Unseen Path have observed Azeroth’s balance from high mountain eyries since the War of the Ancients.',
        'The Mok’Nathal champion Rexxar, wandering with his beloved bear Misha, played a decisive role in the founding of Durotar and proved that a lone hunter can alter the fate of entire empires.',
        'Meanwhile, Hemet Nesingwary’s legendary expeditions from Stranglethorn Vale to the frozen tundra of Northrend have challenged and documented Azeroth’s most formidable apex predators.',
      ],
      figuresLabel: 'Legendary Huntsmen',
      figures: [
        { name: 'Rexxar', title: 'Champion of the Horde · Beastmaster', text: 'The half-ogre, half-orc wanderer accompanied by Misha and Leokk who vanquished Grand Admiral Proudmoore.' },
        { name: 'Alleria Windrunner', title: 'Ranger Captain of Silvermoon', text: 'Peerless elven marksman who led the pursuit of the Horde through the Dark Portal into the Twisting Nether.' },
        { name: 'Hemet Nesingwary', title: 'Master Hunter & Explorer', text: 'The intrepid dwarven big-game hunter whose legendary expeditions chronicle the fiercest beasts alive.' },
      ],
      note: 'Empires fall and armies crumble to dust, but the hunter following fresh tracks through the dew-laden grass endures across every era.',
    },
    outro: {
      title: 'The Unbroken Trail',
      text: 'The wilderness never sleeps. To be a hunter is to listen to the breath of the world and find clarity under the open sky. Beside your loyal beast, you walk alone no more.',
      nextText: 'Don the consecrated plate and discover the sacred vows of the Paladin.',
    },
  },
};

export const PALADIN_STORY: Record<Lang, ClassStoryData> = {
  tr: {
    metaDescription: 'Paladin sınıfının tarihi: First War sonrası Alonsus Faol ve Knights of the Silver Hand’in doğuşu, Prince Arthas’ın düşüşü ve Kutsal Işığın üç erdemi.',
    overline: 'Kutsal Işık ve Çelik',
    lead: 'İnancı zırh gibi kuşanan, kutsal çekiçleriyle adaleti dağıtan ve müttefiklerini kutsayan şövalyeler, karanlığa karşı dikilen sarsılmaz kalelerdir.',
    facts: [
      { label: 'Rol', value: 'Tank, Şifacı (Healer), Yakın Dövüş Hasarı (Melee DPS)' },
      { label: 'Birincil Kaynak', value: 'Mana' },
      { label: 'Zırh Tipi', value: 'Post (Mail) / Seviye 40+ Levha (Plate), Kalkan (Shield)' },
      { label: 'İkonik Yetenekler', value: 'Lay on Hands, Divine Shield, Blessing of Protection, Hammer of Justice, Consecration' },
      { label: 'Kutsal Tarikatlar', value: 'Knights of the Silver Hand, Argent Dawn, Blood Knights', extra: 'Chapel of Light, Stratholme' },
    ],
    chapters: {
      origin: 'Kutsal Işığın Doğuşu ve Alonsus Faol',
      two: 'Knights of the Silver Hand ve İlk Beş Şövalye',
      three: 'Prince Arthas, Stratholme ve Tarikatın Bölünüşü',
      four: 'Üç Kutsal Yol ve Erdem: Holy, Protection, Retribution',
      five: 'Işığın Yeniden Doğuşu: Argent Dawn ve Modern Şövalyeler',
    },
    origin: {
      title: 'Kanlı Bir Ders ve Çelikle Birleşen İnanç',
      titleNote: 'First War Trajedisi',
      paragraphs: [
        'First War sırasında ork Horde Stormwind’i kuşattığında, Northshire Abbey’in dindar rahipleri savaş alanına sadece duaları ve kutsal cübbeleriyle çıktı. Sonuç tam bir katliamdı: kana susamış ork baltaları karşısında inanç tek başına kalkan olamadı.',
        'Stormwind düşüp mülteciler Lordaeron’a kaçtığında, Archbishop Alonsus Faol bu acı dersten radikal bir sonuç çıkardı: Kutsal Işık (Holy Light) sadece yaraları saran bir dua olarak kalamazdı; o aynı zamanda zulmü ezen bir çekiç olmalıydı.',
        'Faol, savaş sanatını bilen şövalyeleri ibadetle yoğurmaya, inançlı rahiplere ise ağır zırh giyip kılıç kuşanmayı öğretmeye karar verdi. Böylece Azeroth tarihinin ilk paladinleri—kutsal savaşçıları—doğdu.',
      ],
      stagesLabel: 'Paladinliğin Doğuş Basamakları',
      stages: [
        { name: 'Northshire Katliamı', text: 'Savunmasız rahiplerin First War’da ork orduları tarafından katledilmesi.' },
        { name: 'Alonsus Faol’un Vizyonu', text: 'Dua ile çeliği, inanç ile askeri disiplini birleştirme kararı.' },
        { name: 'Stratholme Kutsaması', text: 'İlk beş adayın kutsal yağlarla mesh edilerek yemin etmesi.' },
        { name: 'Silver Hand Yükselişi', text: 'Alliance of Lordaeron ordusunun manevi ve askeri omurgasının kurulması.' },
      ],
      note: 'Paladin, elinde kılıç tutan bir rahip değil; ruhu kutsal ışıkla mühürlenmiş yaşayan bir mucizedir.',
    },
    two: {
      title: 'Knights of the Silver Hand ve İlk Beş Şövalye',
      titleNote: 'The First Five',
      paragraphs: [
        'Stratholme’daki Alonsus Şapeli’nde Archbishop Faol’un huzurunda beş seçkin savaşçı diz çöktü: Uther the Lightbringer, Turalyon, Tirion Fordring, Saidan Dathrohan ve Gavinrad the Dire. Bu beş adam, Knights of the Silver Hand tarikatının kurucu liderleri oldu.',
        'Second War’da paladinler savaş meydanına çıktığında orduların morali tamamen değişti. Uther’in liderliğinde parıldayan gümüş zırhlar, ork savaş naralarını bastıran ilahiler ve ölüleri bile ayağa kaldıran kutsal şifa dalgaları Alliance’a tarihi zaferi getirdi.',
        'Blackrock Spire önünde komutan Anduin Lothar şehit düştüğünde, Turalyon onun kırık kılıcını kaldırarak Işığın göz kamaştırıcı parıltısıyla Horde başkomutanı Orgrim Doomhammer’ı dize getirdi ve savaşı sonlandırdı.',
      ],
      cardsLabel: 'İlk Beş Şövalye ve İkinci Savaş',
      cards: [
        { name: 'Uther the Lightbringer', text: 'Tarikatın ilk şövalyesi; sarsılmaz erdemi ve adaletiyle Lightbringer unvanını aldı.', status: 'Yüce Komutan', tone: 'home' },
        { name: 'Turalyon', text: 'Lothar’ın düşüşünden sonra Alliance ordularını Dark Portal’a kadar zafere taşıyan şampiyon.', status: 'Zafer', tone: 'ok' },
        { name: 'Tirion Fordring', text: 'Onurlu bir ork olan Eitrigg’i koruduğu için aforoz edilen ama Işığın asla terk etmediği kahraman.', status: 'Onur', tone: 'al' },
        { name: 'Gümüş Zırhın Zaferi', text: 'Orkların karanlık fel büyülerine karşı Kutsal Işığın sarsılmaz üstünlüğü kanıtlandı.', status: 'Zafer', tone: 'ok' },
      ],
      note: 'İlk Beş Şövalye, Kutsal Işığın en saf erdemlerini temsil etti: Merhamet (Compassion), Sebat (Tenacity) ve Saygı (Respect).',
    },
    three: {
      title: 'Prince Arthas, Stratholme ve Tarikatın Bölünüşü',
      paragraphs: [
        'Silver Hand’in en parlak umudu, Lordaeron’un veliaht prensi Arthas Menethil’di. Uther’in çırağı olan genç prens cesur ve adanmıştı; ancak kalbindeki kibir ve intikam ateşi kaderini kararttı.',
        'Third War’da veba Lordaeron’u sararken Stratholme kentine ulaşan Arthas, enfekte olan masum halkın zombiye dönüşmeden önce katledilmesini emretti (Culling of Stratholme). Uther bu vahşeti reddedip prensin emrine karşı gelince, Arthas Silver Hand’i vatana ihanetle suçlayarak tarikatı lağvetti.',
        'Northrend’de lanetli kılıç Frostmourne’u alan Arthas, Lich King’in ilk ölüm şövalyesine dönüştü. Lordaeron’a dönüp öz babası King Terenas’ı ve ustası Uther’i katletti. Silver Hand paramparça oldu; küllerinden fanatik Scarlet Crusade ve asil Argent Dawn doğdu.',
      ],
      cardsLabel: 'İhanet ve Bölünme Süreci',
      cards: [
        { name: 'Culling of Stratholme', text: 'Arthas’ın masum halkı katletme kararı, Uther ile arasındaki köprüleri ebediyen yıktı.', status: 'Kırılma', tone: 'no' },
        { name: 'Frostmourne Laneti', text: 'Prens ruhunu kılıca satarak Kutsal Işığa sırtını döndü ve Scourge şampiyonu oldu.', status: 'İhanet', tone: 'no' },
        { name: 'Uther’in Şehadeti', text: 'Andorhal’da babasının küllerini korurken eski öğrencisi Arthas tarafından katledildi.', status: 'Kayıp', tone: 'mute' },
        { name: 'Tarikatın Parçalanışı', text: 'Scarlet Crusade bağnazlığa saplanırken, Argent Dawn ırk ayrımı gözetmeksizin Işığı savundu.', status: 'Bölünme', tone: 'al' },
      ],
      note: 'Arthas’ın düşüşü, Işığın zorbalık ve intikam amacıyla kullanılamayacağını; kibirle kirletilen inancın en büyük karanlığa dönüşeceğini gösterdi.',
    },
    four: {
      title: 'Üç Kutsal Yol ve Erdem: Holy, Protection, Retribution',
      paragraphs: [
        'Bir paladin Kutsal Işığa üç farklı biçimde kanalize olur. Her disiplin, savaş meydanında ordunun farklı bir ihtiyacını karşılayan kutsal bir görevi icra eder.',
      ],
      specsLabel: 'Paladin Uzmanlıkları',
      specs: [
        {
          name: 'Holy',
          role: 'İlahi Şifa ve Koruma',
          text: 'Kutsal Işığın saf zarafetini çağırır. Ölümcül yaraları anında sarar, müttefiklerini kutsayarak tükenmeyen bir manevi güç aşılar.',
          spells: ['Holy Light', 'Flash of Light', 'Lay on Hands', 'Divine Favor'],
        },
        {
          name: 'Protection',
          role: 'Aşılmaz Kalkan ve Adalet Duvarı',
          text: 'Zırhını ve kalkanını kutsal enerjiyle mühürler. Düşmanın tüm gazabını üzerine çeker; Divine Shield ile mutlak dokunulmazlığa bürünür.',
          spells: ['Holy Shield', 'Redoubt', 'Blessing of Protection', 'Divine Shield'],
        },
        {
          name: 'Retribution',
          role: 'Kutsal Yargı ve Cezalandırma',
          text: 'İki elli ağır çekiciyle kötülüğü ezer. Kutsal mühürler ve yargılarla düşmanı kutsal alevlerle yakarak adaleti infaz eder.',
          spells: ['Seal of Command', 'Judgement', 'Hammer of Justice', 'Consecration'],
        },
      ],
      note: 'Işık herkese açıktır; ancak onun lütfuna sadece kalbinde zerre kadar şüphe barındırmayanlar layık olur.',
    },
    five: {
      title: 'Işığın Yeniden Doğuşu: Argent Dawn ve Modern Şövalyeler',
      paragraphs: [
        'Lordaeron düşmüş olsa da paladinlik ideali yok edilemedi. Highlord Tirion Fordring Hearthglen sürgününden dönerek Argent Crusade’i kurdu ve Lich King’e karşı nihai savaşı başlattı.',
        'Işık artık sadece insanlara ait bir inanç değildi. Blood Elf’ler Naaru gücüyle kurdukları Blood Knights birliğini Sunwell’in arınmasıyla gerçek inançla buluşturdu; Tauren’ler ise güneşe (An’she) tapan Sunwalkers düzenini kurdu.',
        'Bugün bir paladin, nerede bir masum tehdit altındaysa orada duran, karanlığa karşı parıldayan bir umut feneridir.',
      ],
      figuresLabel: 'Tarihe Mührünü Vuran Şövalyeler',
      figures: [
        { name: 'Tirion Fordring', title: 'Highlord of the Argent Crusade', text: 'Ashbringer kılıcını kuşanarak Icecrown Citadel tepesinde Lich King’in hükmüne son veren şampiyon.' },
        { name: 'Lady Liadrin', title: 'Matron of the Blood Knights', text: 'Öfkeyle başladığı yolda halkını arınmış Sunwell’in gerçek ışığına taşıyan Blood Elf lideri.' },
        { name: 'Turalyon', title: 'High Commander of the Alliance', text: 'Second War zaferinden sonra Twisting Nether’da Army of the Light saflarında bin yıl savaşan efsane.' },
      ],
      note: 'Karanlık ne kadar derin olursa olsun, Kutsal Işığın tek bir kıvılcımı bile onu dağıtmaya yeterlidir.',
    },
    outro: {
      title: 'Ebedi Yemin',
      text: 'Paladin olmak, kendi canını başkalarının kurtuluşuna adamaktır. Çekiç adalet için kalkacak, kalkan masumu koruyacak ve Işık asla sönmeyecektir.',
      nextText: 'Çeliğin, iradenin ve saf öfkenin ustaları olan Warrior’ların hikayesine geç.',
    },
  },
  en: {
    metaDescription: 'The history of the Paladin class: Alonsus Faol and the birth of the Silver Hand after the First War, the tragic fall of Prince Arthas, and the three sacred virtues of the Holy Light.',
    overline: 'Holy Light & Tempered Steel',
    lead: 'Clad in consecrated plate, wielding heavy warhammers of divine justice, and blessing allies, paladins stand as unyielding bastions against the encroaching darkness.',
    facts: [
      { label: 'Role', value: 'Tank, Healer, Melee Physical/Holy Damage (DPS)' },
      { label: 'Primary Resource', value: 'Mana' },
      { label: 'Armor Type', value: 'Mail / Plate (Level 40+), Shields' },
      { label: 'Iconic Abilities', value: 'Lay on Hands, Divine Shield, Blessing of Protection, Hammer of Justice, Consecration' },
      { label: 'Sacred Orders', value: 'Knights of the Silver Hand, Argent Dawn, Blood Knights', extra: 'Chapel of Light, Stratholme' },
    ],
    chapters: {
      origin: 'Birth of the Holy Light & Alonsus Faol',
      two: 'Knights of the Silver Hand & The First Five',
      three: 'Prince Arthas, Stratholme & The Schism',
      four: 'Three Sacred Paths & Virtues: Holy, Protection, Retribution',
      five: 'The Light Reborn: Argent Dawn & Modern Knights',
    },
    origin: {
      title: 'A Brutal Lesson & Faith Forged in Steel',
      titleNote: 'Tragedy of the First War',
      paragraphs: [
        'When the orcish Horde besieged Stormwind during the First War, the pious clerics of Northshire Abbey entered the fray bearing only prayer beads and woven vestments. The result was catastrophic slaughter: against blood-crazed orc battleaxes, pure faith without armor offered no defense.',
        'When Stormwind fell and refugees fled north to Lordaeron, Archbishop Alonsus Faol drew a radical conclusion from the carnage: the Holy Light could not remain merely a soothing balm for the wounded; it had to become a crushing warhammer to smash tyranny.',
        'Faol resolved to teach devout clerics how to bear heavy plate and wield greatswords, while instilling knights with profound spiritual piety. Thus, the first paladins—holy warriors of divine purpose—were born.',
      ],
      stagesLabel: 'Origins of the Paladin',
      stages: [
        { name: 'Northshire Massacre', text: 'Defenseless clerics slaughtered during the First War for lack of martial training.' },
        { name: 'Faol’s Vision', text: 'Forging prayer and steel together into a unified chivalric martial doctrine.' },
        { name: 'Stratholme Consecration', text: 'The first five candidates anointed with holy oils and sworn to sacred oaths.' },
        { name: 'Rise of the Silver Hand', text: 'Founding the spiritual and military vanguard of the Alliance of Lordaeron.' },
      ],
      note: 'A paladin is not simply a priest carrying a sword; they are a living conduit through which the Holy Light directly smites wickedness.',
    },
    two: {
      title: 'Knights of the Silver Hand & The First Five',
      titleNote: 'The First Five',
      paragraphs: [
        'Within the Chapel of Alonsus in Stratholme, five chosen champions knelt before the Archbishop: Uther the Lightbringer, Turalyon, Tirion Fordring, Saidan Dathrohan, and Gavinrad the Dire. These five became the founding commanders of the Knights of the Silver Hand.',
        'When the paladins marched into battle during the Second War, allied morale surged dramatically. Under Uther’s righteous leadership, shining plate armor, hymns drowning out savage battlecries, and divine blessings that pulled dying soldiers from death’s door secured victory for the Alliance.',
        'Before the ramparts of Blackrock Spire, supreme commander Anduin Lothar fell in single combat. Turalyon raised Lothar’s shattered sword, and channeling a blinding corona of pure holy radiance, he shattered Orgrim Doomhammer’s resolve and routed the Horde.',
      ],
      cardsLabel: 'The First Five in the Second War',
      cards: [
        { name: 'Uther the Lightbringer', text: 'The supreme commander of the order whose radiant piety earned him the title Lightbringer.', status: 'First Paladin', tone: 'home' },
        { name: 'Turalyon', text: 'Lothar’s lieutenant who rallied the broken army and pursued the Horde to the Dark Portal.', status: 'Victory', tone: 'ok' },
        { name: 'Tirion Fordring', text: 'Stripped of titles for defending the honorable orc Eitrigg, yet never forsaken by the Light.', status: 'Honor', tone: 'al' },
        { name: 'Triumph of the Silver Hand', text: 'Demonstrated the absolute superiority of righteous faith over demonic corruption.', status: 'Triumph', tone: 'ok' },
      ],
      note: 'The First Five embodied the three cardinal virtues of the Holy Light: Compassion, Tenacity, and Respect.',
    },
    three: {
      title: 'Prince Arthas, Stratholme & The Schism',
      paragraphs: [
        'The Silver Hand’s brightest prodigy was Crown Prince Arthas Menethil of Lordaeron. Uther’s beloved pupil was valiant and driven; yet beneath his golden hair festered arrogance, stubborness, and an insatiable thirst for vengeance.',
        'When the undead plague ravaged Lordaeron in the Third War, Arthas arrived at Stratholme and ordered the immediate slaughter of its infected citizens before they could turn (the Culling of Stratholme). When Uther refused to participate in cold-blooded murder, Arthas suspended the Silver Hand on charges of treason.',
        'In the frozen wastes of Northrend, Arthas claimed the cursed runeblade Frostmourne, surrendering his soul to the Lich King. Returning home, he murdered King Terenas and his mentor Uther. The Silver Hand fractured; from its ashes rose the fanatical Scarlet Crusade and the steadfast Argent Dawn.',
      ],
      cardsLabel: 'The Tragedy & Division',
      cards: [
        { name: 'Culling of Stratholme', text: 'Arthas’s refusal to seek another path severed his bond with Uther and the Light forever.', status: 'Fracture', tone: 'no' },
        { name: 'Curse of Frostmourne', text: 'The fallen prince discarded holy oaths to become the supreme death knight of the Scourge.', status: 'Treason', tone: 'no' },
        { name: 'Uther’s Martyrdom', text: 'Defending his king’s urn at Andorhal, the legendary paladin fell to his beloved pupil.', status: 'Sacrifice', tone: 'mute' },
        { name: 'Shattered Brotherhood', text: 'The Scarlet Crusade succumbed to xenophobic madness, while the Argent Dawn embraced all races.', status: 'Schism', tone: 'al' },
      ],
      note: 'Arthas’s tragic fall proved that the Holy Light cannot be wielded as an instrument of vengeance; pride corrupts even the brightest soul into bottomless darkness.',
    },
    four: {
      title: 'Three Sacred Paths & Virtues: Holy, Protection, Retribution',
      paragraphs: [
        'A paladin channels the Holy Light through three distinct vows, each answering a critical wartime need on the frontlines.',
      ],
      specsLabel: 'Paladin Specializations',
      specs: [
        {
          name: 'Holy',
          role: 'Divine Healing & Cleansing',
          text: 'Channels pure celestial grace, immediately mending catastrophic mortal wounds and bestowing enduring blessings of fortitude upon allies.',
          spells: ['Holy Light', 'Flash of Light', 'Lay on Hands', 'Divine Favor'],
        },
        {
          name: 'Protection',
          role: 'Bastion of Truth & Iron Shield',
          text: 'Infuses armor and shield with impenetrable radiance, commanding enemy attention and sheltering the vulnerable beneath Divine Shield.',
          spells: ['Holy Shield', 'Redoubt', 'Blessing of Protection', 'Divine Shield'],
        },
        {
          name: 'Retribution',
          role: 'Righteous Judgment & Retribution',
          text: 'Wields heavy two-handed hammers to deliver divine retribution, burning unholy adversaries with consecrated ground and righteous judgments.',
          spells: ['Seal of Command', 'Judgement', 'Hammer of Justice', 'Consecration'],
        },
      ],
      note: 'The Light is open to all who reach for it; but its miraculous favor descends only upon those who harbor no doubt in their righteous purpose.',
    },
    five: {
      title: 'The Light Reborn: Argent Dawn & Modern Knights',
      paragraphs: [
        'Though Lordaeron fell, the chivalric ideal of the paladin could never be extinguished. Highlord Tirion Fordring emerged from exile, forged the Argent Crusade, and shattered the Lich King’s dominion atop Icecrown Citadel.',
        'Furthermore, the Light expanded beyond humanity. Blood Elves reclaimed genuine faith following the restoration of the Sunwell, while Tauren sunwalkers discovered the solar warmth of An’she.',
        'Today, wherever innocence is imperiled, the paladin stands as an unbroken beacon of hope against the night.',
      ],
      figuresLabel: 'Legendary Paladins',
      figures: [
        { name: 'Tirion Fordring', title: 'Highlord of the Argent Crusade', text: 'Wielding the Ashbringer, he shattered Frostmourne and brought salvation to the souls trapped by the Scourge.' },
        { name: 'Lady Liadrin', title: 'Matron of the Blood Knights', text: 'Guided her people from bitter coercion to true spiritual redemption at the revitalized Sunwell.' },
        { name: 'Turalyon', title: 'High Commander of the Alliance', text: 'Fought the Burning Legion across the stars for a thousand years as supreme general of the Army of the Light.' },
      ],
      note: 'No matter how oppressive the dark may seem, even the faintest ember of the Holy Light possesses the power to shatter the shadows.',
    },
    outro: {
      title: 'The Eternal Oath',
      text: 'To be a paladin is to offer one’s own life in selfless defense of others. The hammer strikes for justice, the shield protects the defenseless, and the Light shall never fade.',
      nextText: 'Discover the fury, battle stances, and unyielding steel of the Warrior.',
    },
  },
};

export const WARRIOR_STORY: Record<Lang, ClassStoryData> = {
  tr: {
    metaDescription: 'Warrior sınıfının tarihi: Saf çelik, sarsılmaz irade, Broxigar ve Lothar’ın efsanesi ve savaş alanını titreten üç duruş.',
    overline: 'Çelik, İrade ve Saf Öfke',
    lead: 'Büyüye ya da tanrıların lütfuna sığınmayan, bedenini ve çeliğini sınıra kadar zorlayan savaşçılar, her ordunun sarsılmaz ön cephe omurgasıdır.',
    facts: [
      { label: 'Rol', value: 'Tank, Yakın Dövüş Hasarı (Melee DPS)' },
      { label: 'Birincil Kaynak', value: 'Öfke (Rage)' },
      { label: 'Zırh Tipi', value: 'Post (Mail) / Seviye 40+ Levha (Plate), Kalkan (Shield)' },
      { label: 'İkonik Yetenekler', value: 'Charge, Mortal Strike, Whirlwind, Shield Wall, Execute' },
      { label: 'Tarihi Kahramanlar', value: 'Broxigar the Red, Anduin Lothar, Varok Saurfang', extra: 'Warsong, Blackrock, Mountain Kings' },
    ],
    chapters: {
      origin: 'Çelik ve İlkel Hayatta Kalma',
      two: 'Öfkenin Simyası ve Savaş Duruşları',
      three: 'Efsanevi Ön Cephe ve Kanlı Meydanlar',
      four: 'Üç Savaş Yolu: Arms, Fury, Protection',
      five: 'Savaş Meydanının Ebedi Muhafızları',
    },
    origin: {
      title: 'Ödünç Alınmamış Güç',
      titleNote: 'Raw Steel',
      paragraphs: [
        'Büyücüler manaya, rahipler inanca, şamanlar elementlere bel bağlar. Ancak savaşçının elinde yalnızca iki şey vardır: bedeninin sınırları ve tuttuğu çeliğin keskinliği.',
        'İlk kabileler vahşi yırtıcılarla ve devasa canavarlarla karşılaştığında kalkan tutmayı, kemikten baltalar savurmayı ve darbelere dayanmayı öğrenenler ilk savaşçılardı. Kalimdor steplerinde Tauren kabileleri, Khaz Modan madenlerinde cüceler ve Draenor bozkırlarında ork klanları aynı evrensel gerçeği çelikle yazdı: Güç talep edilmez, bilek hakkıyla alınır.',
        'Savaşçı hiçbir ilahi ayrıcalık beklemez; yere düşerse kendi kas gücüyle ayağa kalkar, yaralanırsa acıyı silaha dönüştürür.',
      ],
      stagesLabel: 'Savaşçılığın Doğuş Basamakları',
      stages: [
        { name: 'İlk Silahlar', text: 'Kemik, taş ve tunçtan dövülen ilkel yakın dövüş aletleri.' },
        { name: 'Çeliğin Dövülmesi', text: 'Demir ocaklarında ağır zırh ve kalkanların mükemmelleştirilmesi.' },
        { name: 'Duruş Disiplini', text: 'Saldırı, savunma ve çılgınlık arasında kusursuz taktiksel geçişler.' },
        { name: 'Kırılmaz İrade', text: 'Korku ve büyülü etkilere karşı zihni demir bir kaleye çevirme sanatı.' },
      ],
      note: 'Savaşçı zayıflık tanımaz; en ölümcül büyü bile kaburgasını kıran bir kılıç darbesi karşısında dağılır.',
    },
    two: {
      title: 'Öfkenin Simyası ve Savaş Duruşları',
      titleNote: 'Rage & Stances',
      paragraphs: [
        'Bir savaşçının gücü sakin sularda değil, fırtınanın göbeğinde büyür. Alınan her darbe, savrulan her kılıç kanı kaynatır ve “Rage” (Öfke) adı verilen ilkel savaş enerjisini serbest bırakır.',
        'Ancak kör bir öfke yıkım getirir; usta savaşçı öfkesini üç temel duruşla (Battle Stance, Defensive Stance, Berserker Stance) zapt eder. Taktiksel zekâ ile vahşi kuvvetin kusursuz birleşimi, savaşçıyı savaş alanının yöneticisi yapar.',
        'Hamstring ile kaçan düşmanı biçmek, Overpower ile zayıf anı yakalamak ve Execute ile son nefesi tüketmek bir refleks değil, binlerce çatışmada öğrenilmiş bir danstır.',
      ],
      cardsLabel: 'Savaşçının Temel Dinamikleri',
      cards: [
        { name: 'Battle Stance', text: 'Mükemmel denge; hücum ve savunma arasında akıcı taktiksel geçiş.', status: 'Denge', tone: 'home' },
        { name: 'Defensive Stance', text: 'Kalkanın ardında taşlaşan irade; hasarı soğurup tehdidi kendine çekme.', status: 'Savunma', tone: 'al' },
        { name: 'Berserker Stance', text: 'Savunmayı hiçe sayan çılgınlık; ölümcül kritik vuruşlar ve fırtına gibi saldırılar.', status: 'Saldırı', tone: 'ok' },
        { name: 'Execute Anı', text: 'Düşman sendelediğinde acımasızca inen ve savaşı anında noktalayan darbe.', status: 'İnfaz', tone: 'mute' },
      ],
      note: 'Öfke savaşçıyı tüketmez; savaşçı öfkesini çelik gibi tavlayıp düşmanın üzerine salar.',
    },
    three: {
      title: 'Efsanevi Ön Cephe ve Kanlı Meydanlar',
      paragraphs: [
        'Azeroth tarihi büyücüler ve krallar tarafından yazılmış gibi görünse de, o tarihi kanlarıyla mühürleyenler savaşçılardı. First ve Second War’da Anduin Lothar, parçalanmış orduları bir araya getirerek Blackrock Dağı önünde son nefesine kadar savaştı.',
        'War of the Ancients sırasında efsanevi ork savaşçısı Broxigar the Red, karanlık portaldan Burning Legion’ın kalbine atladı. Yüz binlerce iblisi tek başına doğrayarak iblis lordlarının cesetlerinden bir tepe oluşturdu ve karanlık titan Sargeras’ın bacağını yaralayarak bir faniye imkânsız olanı başardı.',
        'High Overlord Varok Saurfang ise ork onurunun yaşayan timsali olarak nesiller boyu orduların başında durdu ve asla geri adım atmadı.',
      ],
      cardsLabel: 'Efsanevi Savaş Kahramanlıkları',
      cards: [
        { name: 'Broxigar the Red', text: 'Sargeras’ı yaralayan tek fani; iblis dağları üzerinde can veren efsane.', status: 'Efsane', tone: 'ok' },
        { name: 'Anduin Lothar', text: 'Lion of Azeroth; Blackrock Spire önünde Horde komutanıyla teke tek çarpışan lider.', status: 'Onur', tone: 'home' },
        { name: 'Orgrim Doomhammer', text: 'Blackrock şefi; muazzam çekiciyle Stormwind ve Lordaeron seferlerine yön veren komutan.', status: 'Kuvvet', tone: 'al' },
        { name: 'Varok Saurfang', text: 'Third War’dan Ahn’Qiraj kapılarına kadar ön cephede orduyu komuta eden efsanevi general.', status: 'Komuta', tone: 'ok' },
      ],
      note: 'Bir savaşçının şerefi, kaç düşman öldürdüğüyle değil; müttefiklerini korumak için kaç yaraya göğüs gerdiğiyle ölçülür.',
    },
    four: {
      title: 'Üç Savaş Yolu: Arms, Fury, Protection',
      paragraphs: [
        'Demir ve kan üç farklı dövüş felsefesinde vücut bulur. Her yol, savaşçının fiziğini ve savaş algısını farklı bir mükemmellik seviyesine ulaştırır.',
      ],
      specsLabel: 'Savaşçı Uzmanlıkları',
      specs: [
        {
          name: 'Arms',
          role: 'Taktiksel İki Elli Silah Ustalığı',
          text: 'Tek bir devasa kılıç, balta veya gürzle kusursuz vuruşlar yapar. Mortal Strike ile hedefin şifa almasını engeller, Sweeping Strikes ile düşman saflarını biçer.',
          spells: ['Mortal Strike', 'Sweeping Strikes', 'Overpower', 'Tactical Mastery'],
        },
        {
          name: 'Fury',
          role: 'Çift Silahlı Çılgınlık ve Hız',
          text: 'Her iki elinde birer silahla dönen bir kasırgaya dönüşür. Bloodthirst ile vurdukça yaralarını sarar, durmaksızın saldırarak düşmana nefes aldırmaz.',
          spells: ['Bloodthirst', 'Flurry', 'Death Wish', 'Whirlwind'],
        },
        {
          name: 'Protection',
          role: 'Aşılmaz Levha Zırh ve Kalkan',
          text: 'Ordunun en önünde devasa bir kale gibi dikilir. Taunt ile dikkatleri üzerine çeker, Shield Slam ve Shield Wall ile gelen her darbeyi kırar.',
          spells: ['Shield Slam', 'Shield Wall', 'Last Stand', 'Taunt'],
        },
      ],
      note: 'Kılıç savurmak kolaydır; müttefiklerinin arkasında güvende hissettiği bir duvar olmak ise ömür boyu disiplin gerektirir.',
    },
    five: {
      title: 'Savaş Meydanının Ebedi Muhafızları',
      paragraphs: [
        'Savaş meydanları değişir, krallıklar çöker; fakat ön safta kalkanını yere vuran bir savaşçıya duyulan ihtiyaç asla sona ermez.',
        'Gnomeregan’ın derinliklerinden Molten Core’un alevlerine, Blackwing Lair’den Naxxramas’ın buzlu koridorlarına kadar hiçbir zafer, düşmanın pençelerini kendi göğsünde karşılayan savaşçılar olmadan kazanılamaz.',
        'Savaşçı son nefesini verene kadar ayakta kalır; çünkü onun sözlüğü geri çekilmeyi bilmez.',
      ],
      figuresLabel: 'Tarihe Adını Kazıyan Savaşçılar',
      figures: [
        { name: 'Muradin Bronzebeard', title: 'High Thane of Ironforge', text: 'Dağ krallarının en büyüğü; çift silahıyla savaş meydanında devleşen cüce kahraman.' },
        { name: 'Cairne Bloodhoof', title: 'High Chieftain of the Tauren', text: 'Kadim savaş mızrağı ve devasa cüssesiyle sürüsünü koruyan bilge ve güçlü şef.' },
        { name: 'Magni Bronzebeard', title: 'King of Ironforge', text: 'Ashbringer kılıcını döven, çelik ve demir sanatını hükümdarlıkla birleştiren kral.' },
      ],
      note: 'Dünya parçalansa bile savaşçı dimdik durur; onun çeliği Azeroth’un son savunma hattıdır.',
    },
    outro: {
      title: 'Kırılmaz Demir',
      text: 'Savaşçı olmak, en karanlık fırtınaya göğsünü siper etmektir. Kılıç bilenecek, kalkan kalkacak ve öfke asla sönmeyecektir.',
      nextText: 'Gölgelerin efendisi, sessiz adımlarla yürüyen Rogue’ların hikayesine geç.',
    },
  },
  en: {
    metaDescription: 'The history of the Warrior class: unyielding steel, iron will, the legends of Broxigar and Lothar, and the three stances of battlefield mastery.',
    overline: 'Steel, Will & Pure Rage',
    lead: 'Relying neither on magic nor divine benediction, pushing physical sinew and cold steel to the absolute limit, warriors form the unbreakable frontline of every army.',
    facts: [
      { label: 'Role', value: 'Tank, Melee Physical Damage (DPS)' },
      { label: 'Primary Resource', value: 'Rage' },
      { label: 'Armor Type', value: 'Mail / Plate (Level 40+), Shields' },
      { label: 'Iconic Abilities', value: 'Charge, Mortal Strike, Whirlwind, Shield Wall, Execute' },
      { label: 'Legendary Champions', value: 'Broxigar the Red, Anduin Lothar, Varok Saurfang', extra: 'Warsong, Blackrock, Mountain Kings' },
    ],
    chapters: {
      origin: 'Primal Steel & Unborrowed Might',
      two: 'The Crucible of Rage & Combat Stances',
      three: 'Legends of the Vanguard & Bloodstained Soil',
      four: 'Three Paths of Steel: Arms, Fury, Protection',
      five: 'Eternal Guardians of the Frontline',
    },
    origin: {
      title: 'Power Forged in Blood',
      titleNote: 'Raw Steel',
      paragraphs: [
        'Magi beseech the Arcane, priests petition the Light, and shamans entreat the elements. The warrior depends solely on two things: the limits of physical muscle and the honed edge of tempered iron.',
        'When primal humanoids faced terrifying beasts and ancient horrors, those who raised battered shields, swung stone axes, and held the perimeter became the first warriors. Tauren braves in Kalimdor, Dwarven forge-masters in Khaz Modan, and Orcish clans across Draenor etched the same truth in cold steel: strength is not granted; it is taken through unyielding resolve.',
        'A warrior expects no divine salvation. When knocked down, they rise on sheer stubbornness; when grievously wounded, they transform agonizing pain directly into lethal momentum.',
      ],
      stagesLabel: 'Evolution of the Warrior',
      stages: [
        { name: 'Primal Weapons', text: 'Improvised bone, flint, and bronze implements forged to survive hostile wilds.' },
        { name: 'The Iron Crucible', text: 'Refining plate armor and interlocking shields to withstand devastating blows.' },
        { name: 'Discipline of Stances', text: 'Seamless tactical transitions between aggressive posture, defense, and fury.' },
        { name: 'Unbreakable Will', text: 'Tempering the mind into an iron redoubt impervious to fear and magical deceit.' },
      ],
      note: 'The warrior knows no fear; even the most cataclysmic spellcaster falters when cold steel bites deeply into bone.',
    },
    two: {
      title: 'The Crucible of Rage & Combat Stances',
      titleNote: 'Rage & Stances',
      paragraphs: [
        'A warrior’s strength does not dwell in tranquil contemplation; it erupts in the maelstrom of direct combat. Every blow absorbed and every swing landed sets the blood ablaze, generating the raw energetic resource known as Rage.',
        'Yet unchecked rage leads to ruin. The veteran warrior channels fury through three disciplined stances: Battle Stance, Defensive Stance, and Berserker Stance. This synthesis of sharp tactical awareness and savage power transforms the warrior into the maestro of the frontline.',
        'Severing hamstrings to halt retreat, punishing minor openings with Overpower, and delivering the merciless coup de grâce with Execute are instincts honed through countless deadly engagements.',
      ],
      cardsLabel: 'Martial Stances & Dynamics',
      cards: [
        { name: 'Battle Stance', text: 'Flawless balance; fluid transitions between aggressive assault and reactive parries.', status: 'Equilibrium', tone: 'home' },
        { name: 'Defensive Stance', text: 'Immovable fortress behind tower shields; absorbing punishment and anchoring threat.', status: 'Bulwark', tone: 'al' },
        { name: 'Berserker Stance', text: 'Sacrificing personal safety for overwhelming critical strikes and ferocious whirlwind attacks.', status: 'Offense', tone: 'ok' },
        { name: 'Execute', text: 'The devastating finishing strike delivered without hesitation the instant an adversary falters.', status: 'Execution', tone: 'mute' },
      ],
      note: 'Rage does not consume the warrior; the warrior tempers fury like molten steel and drives it home against the enemy.',
    },
    three: {
      title: 'Legends of the Vanguard & Bloodstained Soil',
      paragraphs: [
        'Though historians credit crowned monarchs and scholarly magi with shaping epochs, it was frontline warriors who bought those triumphs with arterial blood. In the First and Second Wars, Supreme Commander Anduin Lothar rallied fractured remnants and stood defiant before Blackrock Spire.',
        'During the War of the Ancients, the orc warrior Broxigar the Red leaped into the dimensional rift of the Well of Eternity. Standing atop a mountain of slain demons, he struck the dark titan Sargeras himself, etching the only mortal wound ever inflicted upon the lord of the Burning Legion.',
        'Generations later, High Overlord Varok Saurfang embodied martial honor across every major campaign, anchoring frontlines from the gates of Ahn’Qiraj to Northrend.',
      ],
      cardsLabel: 'Heroic Deeds of the Vanguard',
      cards: [
        { name: 'Broxigar the Red', text: 'The only mortal to ever wound Sargeras, dying heroically atop a mountain of demon corpses.', status: 'Legend', tone: 'ok' },
        { name: 'Anduin Lothar', text: 'The Lion of Azeroth who fought the supreme warchief in single combat before Blackrock.', status: 'Honor', tone: 'home' },
        { name: 'Orgrim Doomhammer', text: 'Chieftain of the Blackrock whose mighty warhammer shattered kingdoms across the Eastern Kingdoms.', status: 'Might', tone: 'al' },
        { name: 'Varok Saurfang', text: 'Supreme frontline general whose seasoned tactical command guided the Horde for decades.', status: 'Command', tone: 'ok' },
      ],
      note: 'A warrior’s honor is not tallied by foes slain, but by the scars borne while safeguarding those who stood behind them.',
    },
    four: {
      title: 'Three Paths of Steel: Arms, Fury, Protection',
      paragraphs: [
        'The philosophy of cold steel diverges into three specialized martial doctrines, each training the warrior’s physiology and reflexes to a distinct pinnacle of battlefield execution.',
      ],
      specsLabel: 'Warrior Specializations',
      specs: [
        {
          name: 'Arms',
          role: 'Two-Handed Tactical Precision',
          text: 'Wields massive greatswords, axes, and polearms with surgical precision. Inflicts crippling Mortal Strikes that halve incoming healing while cleaving through ranks with Sweeping Strikes.',
          spells: ['Mortal Strike', 'Sweeping Strikes', 'Overpower', 'Tactical Mastery'],
        },
        {
          name: 'Fury',
          role: 'Dual-Wielding Berserker Ferocity',
          text: 'Becomes an unstoppable tempest of razor-sharp steel. With Bloodthirst, every tearing strike restores vitality, sustaining a frenzied momentum that crushes all resistance.',
          spells: ['Bloodthirst', 'Flurry', 'Death Wish', 'Whirlwind'],
        },
        {
          name: 'Protection',
          role: 'Impenetrable Bastion & Tower Shield',
          text: 'The bedrock of every dungeon and raid group. Commands all enemy aggression with Taunt, while Shield Wall and Shield Slam break the momentum of legendary horrors.',
          spells: ['Shield Slam', 'Shield Wall', 'Last Stand', 'Taunt'],
        },
      ],
      note: 'Anyone can swing a sword; but holding an unbroken wall while allies cast spells in safety requires a lifetime of relentless discipline.',
    },
    five: {
      title: 'Eternal Guardians of the Frontline',
      paragraphs: [
        'Battlefields evolve and empires decay; yet the necessity of an indomitable warrior planting boots firmly into the mud never wanes.',
        'From the fiery depths of the Molten Core to the frozen heights of Icecrown Citadel, no glorious victory was ever claimed without warriors absorbing lethal claws and demonic flames into their own armor.',
        'The warrior stands until their final breath; for their code acknowledges no retreat.',
      ],
      figuresLabel: 'Titans of the Battlefield',
      figures: [
        { name: 'Muradin Bronzebeard', title: 'High Thane of Ironforge', text: 'Greatest of the Mountain Kings who entered battle dual-wielding maces as a living avatar of stone.' },
        { name: 'Cairne Bloodhoof', title: 'High Chieftain of the Tauren', text: 'Revered elder chieftain whose massive halberd and indomitable presence sheltered his nomadic people.' },
        { name: 'Magni Bronzebeard', title: 'King of Ironforge', text: 'Forged the legendary Ashbringer in the Great Forge, uniting peerless metalworking with royal combat prowess.' },
      ],
      note: 'Though the earth itself should crack and shatter, the warrior stands firm. Their steel remains the final bastion of Azeroth.',
    },
    outro: {
      title: 'Unbending Iron',
      text: 'To be a warrior is to stand directly in the teeth of the darkest storm. Swords shall be honed, shields shall hold, and the rage within shall never die.',
      nextText: 'Step into the shadows and uncover the lethal arts of the Rogue.',
    },
  },
};

export const ROGUE_STORY: Record<Lang, ClassStoryData> = {
  tr: {
    metaDescription: 'Rogue sınıfının tarihi: Gölgelerin sanatı, Ravenholdt Manor, ölümcül zehirler ve gizli suikast loncalarının üç yolu.',
    overline: 'Gölgeler, Zehirler ve Sessiz Adımlar',
    lead: 'Onurun bir zayıflık olduğu karanlık sokaklarda yaşayan, gölgelerden vurup kaybolan haydutlar, Azeroth’un en tehlikeli ve görünmez bıçaklarıdır.',
    facts: [
      { label: 'Rol', value: 'Yakın Dövüş Hasarı (Melee DPS)' },
      { label: 'Birincil Kaynak', value: 'Enerji (Energy) ve Kombo Puanları (Combo Points)' },
      { label: 'Zırh Tipi', value: 'Deri (Leather)' },
      { label: 'İkonik Yetenekler', value: 'Stealth, Vanish, Blind, Eviscerate, Sap, Ambush' },
      { label: 'Gizli Cemiyetler', value: 'Ravenholdt Manor, SI:7, Defias Brotherhood, Shattered Hand', extra: 'The Syndicate' },
    ],
    chapters: {
      origin: 'Gölgelerin Sanatı ve Sessiz Adımlar',
      two: 'Ravenholdt ve Gizli Suikast Loncaları',
      three: 'Ölümcül Aletler, Kilitler ve Zehirler',
      four: 'Üç Suikast Yolu: Assassination, Combat, Subtlety',
      five: 'Görünmeyen Eller: Casuslar ve Krallık Yıkanlar',
    },
    origin: {
      title: 'Karanlıkta Hayatta Kalmak',
      titleNote: 'Shadowcraft',
      paragraphs: [
        'Ağır zırhlar gıcırdar, büyülü sözler parıldar; ancak gölgede yürüyen biri için ses ve ışık ölümdür. Haydutluk, kanunların korumadığı arka sokaklarda, korsan güvertelerinde ve saray entrikalarında doğdu.',
        'Bir Rogue adil bir dövüş aramaz. Onun felsefesi basittir: düşman kılıcını çekmeden önce işi bitir, arkadan yaklaş ve iş bittiğinde geride yalnızca bir ceset ile rüzgârın fısıltısını bırak.',
        'Gölgeye adım atmak (Stealth) sadece saklanmak değildir; çevreyle kusursuz bir uyum yakalamak, nefesi yavaşlatmak ve varlığını dünya algısından silmektir.',
      ],
      stagesLabel: 'Gölgelerin Sanatı',
      stages: [
        { name: 'Sessiz Adım', text: 'Kuru yaprakların veya kırık camların üzerinde bile tek bir ses çıkarmadan yürüme.' },
        { name: 'Zayıf Nokta Tespiti', text: 'Zırhın birleşim yerlerini ve hayati organları tek bir bakışta hesaplama.' },
        { name: 'Gözden Kaybolma', text: 'Görüş açısını ve ışık kırılmalarını kullanarak düşmanın gözünün önünde yok olma.' },
        { name: 'Ölümcül Fırsatçılık', text: 'Düşmanın tökezlediği saliseyi ölümcül bir hançer darbesine dönüştürme.' },
      ],
      note: 'Dövüşün onurlusu olmaz; kazanan ve ölen vardır. Haydut daima yaşayan tarafta kalmayı seçer.',
    },
    two: {
      title: 'Ravenholdt ve Gizli Suikast Loncaları',
      titleNote: 'League of Assassins',
      paragraphs: [
        'Hillsbrad tepelerinin ardındaki sisli vadide, krallıkların haritalarında yer almayan bir sığınak gizlidir: Ravenholdt Manor. Lord Jorach Ravenholdt tarafından yönetilen bu gizli cemiyet, dünyanın en yetenekli hırsız ve suikastçılarını yetiştirir.',
        'Stormwind’in karanlık dehlizlerinde ise Mathias Shaw liderliğindeki SI:7 istihbarat servisi, krallığın bekası için gayriresmî operasyonlar yürütür. Karşı tarafta Edwin VanCleef’in kurduğu Defias Brotherhood, taş ustalarının intikamını almak için Westfall’ı bir suç yuvasına çevirmiştir.',
        'Horde saflarında ise bir zamanlar Draenor’da kendi elini keserek sadakat yemini eden Shattered Hand klanı, Orgrimmar’ın gölgelerinde çalışan gizli bir suikast ve istihbarat ağına dönüşmüştür.',
      ],
      cardsLabel: 'Gizli Suikast Ağları',
      cards: [
        { name: 'Ravenholdt Manor', text: 'Tüm taraflardan bağımsız çalışan, suikast ve hırsızlık sanatının zirve loncası.', status: 'Lonca', tone: 'home' },
        { name: 'SI:7 Servisi', text: 'Master Mathias Shaw yönetiminde Stormwind krallığı adına çalışan elit casuslar.', status: 'İstihbarat', tone: 'al' },
        { name: 'Defias Brotherhood', text: 'Edwin VanCleef’in Deadmines derinliklerinde kurduğu isyankar haydut ordusu.', status: 'İsyan', tone: 'no' },
        { name: 'Shattered Hand', text: 'Orgrimmar’ın Cleft of Shadow dehlizlerinde Horde adına gölgeleri yöneten ajanlar.', status: 'Gölge', tone: 'ok' },
      ],
      note: 'Tahtları savaşlar değil, gecenin karanlığında kralın kadehine dökülen bir damla zehir devirir.',
    },
    three: {
      title: 'Ölümcül Aletler, Kilitler ve Zehirler',
      paragraphs: [
        'Bir haydudun cepleri bir ölüm laboratuvarıdır. Bitkilerden ve zehirli yaratıklardan damıtılan toksinler, hançerlerin uçlarına titizlikle sürülür: Instant Poison ile anında can alan, Crippling Poison ile kaçışı imkânsız kılan formüller.',
        'Maymuncuklar en karmaşık cüce kasalarını açarken, kör edici tozlar (Blind) düşmanın duyularını felç eder. Düşman ne olduğunu anlayamadan Vanish ile sislerin arasına karışan bir rogue’u aramak rüzgârı kovalamaktan farksızdır.',
      ],
      cardsLabel: 'Haydudun Cephaneliği',
      cards: [
        { name: 'Ölümcül Zehirler', text: 'Bıçaklara sürülen toksinler organları çürütür, kasları kilitler ve kanı zehirler.', status: 'Kimya', tone: 'ok' },
        { name: 'Maymuncuk Sanatı', text: 'Hırsız aletleriyle kilitli kapıları ve zengin hazine sandıklarını sessizce açma.', status: 'Zanaat', tone: 'home' },
        { name: 'Kör Edici Toz', text: 'Düşmanın gözüne atılan tozla hedefin yön algısını tamamen yok etme.', status: 'Taktik', tone: 'al' },
        { name: 'Vanish Numarası', text: 'Duman bombası ve gölge adımıyla çatışmanın ortasında tamamen buharlaşma.', status: 'Kaçış', tone: 'mute' },
      ],
      note: 'Silahın kalitesi değil, hedefin neresine ve ne zaman saplandığı önemlidir.',
    },
    four: {
      title: 'Üç Suikast Yolu: Assassination, Combat, Subtlety',
      paragraphs: [
        'Rogue yetenekleri üç farklı öldürme sanatına ayrılır. Biri zehirlerle ve kritik hançer darbeleriyle ilgilenirken, diğeri kılıç düellosuna, üçüncüsü ise saf gölge illüzyonuna dayanır.',
      ],
      specsLabel: 'Haydut Uzmanlıkları',
      specs: [
        {
          name: 'Assassination',
          role: 'Zehirler ve Soğukkanlı Cinayet',
          text: 'Çift hançer ve ölümcül toksinlerle çalışır. Cold Blood ile garantilenen kritik Eviscerate vuruşları, düşmanı saniyeler içinde kan kaybından yere serer.',
          spells: ['Cold Blood', 'Eviscerate', 'Vigor', 'Seal Fate'],
        },
        {
          name: 'Combat',
          role: 'Sokak Dövüşü ve Kılıç Ustalığı',
          text: 'Gölgelerden çıkıp kılıç veya gürzlerle göğüs göğüse vuruşur. Adrenaline Rush ve Blade Flurry ile aynı anda birden fazla düşmanı doğrayan bir kasırgaya dönüşür.',
          spells: ['Adrenaline Rush', 'Blade Flurry', 'Riposte', 'Sinister Strike'],
        },
        {
          name: 'Subtlety',
          role: 'Gölge Dansı ve Görünmezlik',
          text: 'Gölge manipülasyonunun mutlak ustasıdır. Ambush ile arkadan felç edici darbeler vurur, Preparation ile tüm yetenek bekleme sürelerini sıfırlar.',
          spells: ['Preparation', 'Ambush', 'Premeditation', 'Ghostly Strike'],
        },
      ],
      note: 'Düşman kılıcını çekene kadar yaşıyorsa, suikastçı işini eksik yapmış demektir.',
    },
    five: {
      title: 'Görünmeyen Eller: Casuslar ve Krallık Yıkanlar',
      paragraphs: [
        'Azeroth’un kaderini değiştiren en büyük dönüm noktalarında bir rogue’un parmak izi vardır. Yarı-ork suikastçı Garona Halforcen, Shadow Council’ın büyüsü altında King Llane Wrynn’i öldürerek Stormwind’in düşüşünü hazırladı.',
        'Valeera Sanguinar, Varian Wrynn’in arenadaki gladyatör yoldaşı ve kralın en sadık kişisel koruması olarak krallığın kurtarılmasında kilit rol oynadı.',
        'Savaş meydanları ne kadar kalabalık olursa olsun, savaşı bitiren son darbe daima gölgelerden uzanan sessiz bir hançerden gelir.',
      ],
      figuresLabel: 'Efsanevi Suikastçılar',
      figures: [
        { name: 'Garona Halforcen', title: 'Master Assassin', text: 'King Llane’i katleden, kaderi trajedilerle örülü gelmiş geçmiş en ölümcül kadın suikastçı.' },
        { name: 'Edwin VanCleef', title: 'Defias Lideri', text: 'Stormwind’i yeniden inşa eden taş ustası; ihanete uğrayınca krallığı sarsan bir haydut ordusu kurdu.' },
        { name: 'Mathias Shaw', title: 'Leader of SI:7', text: 'Stormwind’in en karanlık sırlarını saklayan, gölgeleri müttefikleri için güvenli kılan baş casus.' },
      ],
      note: 'Gölgeler herkese aittir; ancak orada yalnızca ayak izi bırakmayanlar hayatta kalır.',
    },
    outro: {
      title: 'Sessiz Zafer',
      text: 'Rogue olmak, karanlıkla dost olmak ve gerçeği arkadan izlemektir. Adımların sessiz, hançerin zehirli ve gözlerin daima açık olsun.',
      nextText: 'Işık ve gölgenin kozmik dengesini ruhunda taşıyan Priest’lerin hikayesine geç.',
    },
  },
  en: {
    metaDescription: 'The history of the Rogue class: shadowcraft, Ravenholdt Manor, lethal concoctions, and the three deadly paths of the assassin.',
    overline: 'Shadows, Venoms & Silent Footsteps',
    lead: 'Thriving where honor is an unaffordable liability, striking from the dark and vanishing without a trace, rogues represent the deadliest blades of Azeroth.',
    facts: [
      { label: 'Role', value: 'Melee Physical Damage (DPS)' },
      { label: 'Primary Resource', value: 'Energy & Combo Points' },
      { label: 'Armor Type', value: 'Leather' },
      { label: 'Iconic Abilities', value: 'Stealth, Vanish, Blind, Eviscerate, Sap, Ambush' },
      { label: 'Covert Brotherhoods', value: 'Ravenholdt Manor, SI:7, Defias Brotherhood, Shattered Hand', extra: 'The Syndicate' },
    ],
    chapters: {
      origin: 'Shadowcraft & Silent Footsteps',
      two: 'Ravenholdt & Guilds of Assassins',
      three: 'Lethal Concoctions, Locks & Tools',
      four: 'Three Deadly Paths: Assassination, Combat, Subtlety',
      five: 'The Unseen Hands: Spies & King-Slayers',
    },
    origin: {
      title: 'Survival in the Dark',
      titleNote: 'Shadowcraft',
      paragraphs: [
        'Plate armor rattles and arcane incantations illuminate the dark; to a stalker of the alleys, noise and light mean instant death. The craft of the rogue was born in lawless slums, upon pirate decks, and amid treacherous royal court intrigues.',
        'A rogue never seeks an honorable engagement. Their philosophy is ruthlessly pragmatic: neutralize the target before they draw steel, strike from behind, and leave behind only a corpse and the whispering breeze.',
        'Stealth is far more than simply ducking behind crates; it is total attunement to environmental sightlines, silencing one’s own pulse, and erasing presence from the conscious perception of others.',
      ],
      stagesLabel: 'The Art of Shadows',
      stages: [
        { name: 'Silent Step', text: 'Traversing broken glass or dry forest floors without producing the faintest rustle.' },
        { name: 'Anatomical Vulnerability', text: 'Instantly diagnosing gaps in armor plates and the precise locations of vital organs.' },
        { name: 'Visual Dissolution', text: 'Bending shadows and peripheral blind spots to vanish directly in front of vigilant eyes.' },
        { name: 'Deadly Opportunism', text: 'Pouncing upon the split-second stumble of a foe with fatal precision.' },
      ],
      note: 'There is no honor in slaughter; there are only survivors and corpses. The rogue chooses survival every single time.',
    },
    two: {
      title: 'Ravenholdt & Guilds of Assassins',
      titleNote: 'League of Assassins',
      paragraphs: [
        'Tucked deep within a mist-shrouded valley of the Hillsbrad foothills lies a sanctuary omitted from official kingdom maps: Ravenholdt Manor. Overseen by Lord Jorach Ravenholdt, this clandestine syndicate trains the premier thieves and assassins of the world.',
        'Beneath the cobbled streets of Stormwind, Master Mathias Shaw commands SI:7, executing deniable covert operations essential to kingdom survival. In stark opposition stands Edwin VanCleef’s Defias Brotherhood, turning Westfall into a crime-ridden staging ground for rebellion.',
        'Across the sea, the orcish Shattered Hand clan—who once severed their own wrists in blood-fealty on Draenor—now operates as the covert espionage and wetwork arm of the Horde beneath Orgrimmar.',
      ],
      cardsLabel: 'Clandestine Networks',
      cards: [
        { name: 'Ravenholdt Manor', text: 'An independent brotherhood dedicated to elevating theft and assassination into high art.', status: 'Syndicate', tone: 'home' },
        { name: 'SI:7 Intelligence', text: 'Elite covert operatives serving the Crown under the watchful eye of Mathias Shaw.', status: 'Espionage', tone: 'al' },
        { name: 'Defias Brotherhood', text: 'Disenfranchised stonemasons building an iron juggernaut within the Deadmines.', status: 'Rebellion', tone: 'no' },
        { name: 'Shattered Hand', text: 'Managing covert ops and counter-espionage from Orgrimmar’s Cleft of Shadow.', status: 'Shadows', tone: 'ok' },
      ],
      note: 'Thrones are rarely toppled by grand armies; they collapse when a single drop of tasteless venom touches the monarch’s goblet.',
    },
    three: {
      title: 'Lethal Concoctions, Locks & Tools',
      paragraphs: [
        'A rogue’s pockets are a portable apothecary of ruin. Distilled from toxic botanicals and predatory venom glands, compounds are painted onto sharpened daggers: Instant Poison for lethal trauma, Crippling Poison to guarantee no quarry escapes.',
        'Skeleton lockpicks bypass intricate dwarven tumblers, while blinding dust clouds (Blind) disorient adversaries entirely. Before a stunned guard regains equilibrium, a flash-powder Vanish leaves them swinging at empty air.',
      ],
      cardsLabel: 'The Rogue’s Toolkit',
      cards: [
        { name: 'Lethal Venoms', text: 'Botanical and animal neurotoxins that paralyze lungs and liquefy internal tissue.', status: 'Venom', tone: 'ok' },
        { name: 'Lockpicking Arts', text: 'Bypassing locked iron gates and cracking heavy strongboxes without a trace.', status: 'Thievery', tone: 'home' },
        { name: 'Blinding Powders', text: 'Disorienting powders thrown into eyes to instantly shatter an adversary’s focus.', status: 'Tactics', tone: 'al' },
        { name: 'The Vanish Smoke', text: 'Dissipating into thin air via smoke pellets and blinding shadow maneuvers.', status: 'Evasion', tone: 'mute' },
      ],
      note: 'It matters not how ornate the blade is; what matters is the exact angle it slips between the ribs.',
    },
    four: {
      title: 'Three Deadly Paths: Assassination, Combat, Subtlety',
      paragraphs: [
        'Rogue doctrine fractures into three distinct lethal disciplines. One focuses upon toxic daggers and anatomical ruin, another on swashbuckling martial bladeplay, and the third on pure shadow manipulation.',
      ],
      specsLabel: 'Rogue Specializations',
      specs: [
        {
          name: 'Assassination',
          role: 'Poison Mastery & Cold-Blooded Murder',
          text: 'Wields dual daggers coated in lethal concoctions. Guaranteed critical strikes with Cold Blood unleash devastating Eviscerates that cause immediate exsanguination.',
          spells: ['Cold Blood', 'Eviscerate', 'Vigor', 'Seal Fate'],
        },
        {
          name: 'Combat',
          role: 'Swashbuckling & Martial Bladeplay',
          text: 'Fights openly with swords, maces, or fist weapons. Adrenaline Rush and Blade Flurry turn the rogue into an unrelenting dervish cleaving multiple targets at once.',
          spells: ['Adrenaline Rush', 'Blade Flurry', 'Riposte', 'Sinister Strike'],
        },
        {
          name: 'Subtlety',
          role: 'Shadow Weaving & Ambush Mastery',
          text: 'The master of evasion and psychological terror. Striking from stealth with devastating Ambush hits, Preparation resets all defensive and tactical cooldowns.',
          spells: ['Preparation', 'Ambush', 'Premeditation', 'Ghostly Strike'],
        },
      ],
      note: 'If an adversary has time to draw their sword, the assassin has bungled the execution.',
    },
    five: {
      title: 'The Unseen Hands: Spies & King-Slayers',
      paragraphs: [
        'Pivotal historical upheavals often trace back to the bloody fingerprints of a rogue. The half-orc assassin Garona Halforcen, magically controlled by the Shadow Council, murdered King Llane Wrynn, dooming Stormwind in the First War.',
        'Valeera Sanguinar fought alongside Varian Wrynn as an arena gladiator, later becoming his most trusted confidential operative and bodyguard.',
        'No matter how vast the armies gathered upon the plains, the decisive stroke is frequently delivered by a silent blade slipping out of the pitch-black night.',
      ],
      figuresLabel: 'Master Infiltrators',
      figures: [
        { name: 'Garona Halforcen', title: 'Master Assassin', text: 'The tragic half-orc who assassinated King Llane, forever remembered as one of the deadliest blades alive.' },
        { name: 'Edwin VanCleef', title: 'Defias Kingpin', text: 'Master architect of reconstructed Stormwind who forged an outlaw syndicate after being betrayed by nobles.' },
        { name: 'Mathias Shaw', title: 'Leader of SI:7', text: 'The spymaster holding Stormwind’s darkest secrets, ensuring the survival of the realm from the shadows.' },
      ],
      note: 'The darkness belongs to everyone; but only those who leave no footprint survive within it.',
    },
    outro: {
      title: 'Silent Supremacy',
      text: 'To be a rogue is to ally with the shadows and observe reality from the blind spots of kings. May your footsteps remain soundless and your daggers sharp.',
      nextText: 'Explore the celestial duality of Light and Shadow in the Priest story.',
    },
  },
};

export const PRIEST_STORY: Record<Lang, ClassStoryData> = {
  tr: {
    metaDescription: 'Priest sınıfının tarihi: Kutsal Işık ve Gölgenin ebedi dengesi, Elune rahipleri ve inancın üç boyutu.',
    overline: 'Işık, Gölge ve Ruhun Dengesi',
    lead: 'Kutsal mucizelerle yaraları saran ve zihinleri Void’in fısıltılarıyla parçalayan rahipler, kozmik dengenin yaşayan elçileridir.',
    facts: [
      { label: 'Rol', value: 'Şifacı (Healer), Menzilli Büyü Hasarı (Ranged Shadow DPS)' },
      { label: 'Birincil Kaynak', value: 'Mana' },
      { label: 'Zırh Tipi', value: 'Kumaş (Cloth)' },
      { label: 'İkonik Büyüler', value: 'Power Word: Shield, Flash Heal, Mind Flay, Shadowform, Resurrection, Psychic Scream' },
      { label: 'Kutsal Merkezler', value: 'Cathedral of Light, Temple of the Moon, Northshire Abbey', extra: 'Altar of Shadows' },
    ],
    chapters: {
      origin: 'Işık ve Gölgenin Kozmik Dengesi',
      two: 'Tapınaklar, İlahiler ve Kadim İnançlar',
      three: 'İnancın İmtihanı ve Veba Yılları',
      four: 'Işık ve Karanlığın Üç Boyutu: Discipline, Holy, Shadow',
      five: 'Ruhun Muhafızları ve Modern Rahipler',
    },
    origin: {
      title: 'Evrenin İki Temel Gücü',
      titleNote: 'Cosmic Duality',
      paragraphs: [
        'Evren doğduğunda iki güç çarpıştı: sonsuz sıcaklığı ve yaşamı var eden Kutsal Işık (Holy Light) ve onun yokluğunda derinleşen soğuk, kaotik Gölge (Shadow/Void). Biri olmadan diğeri var olamaz.',
        'Priest, bu iki uçurum arasındaki köprüde duran bilgedir. Işığın çağrısına kulak veren bir rahip, inancın sarsılmaz iradesiyle ölümcül yaraları iyileştirir; karanlığın fısıltılarına teslim olan ise zihinleri felç eden delilik fırtınaları yaratır.',
        'Night Elf’lerin ay tanrıçası Elune’e tapınması, insanların ve cücelerin Church of the Holy Light çatısı altında toplanması ya da Darkspear trollerinin Loa ruhlarıyla konuşması... Her halk inancı kendi kültürüyle yoğurmuştur.',
      ],
      stagesLabel: 'İnancın Kökenleri',
      stages: [
        { name: 'Kozmik Kıvılcım', text: 'Işık ve Karanlığın evrenin şafağında birbiriyle çatışması.' },
        { name: 'Dua ve Şifa', text: 'İlahi varlıklara yakararak bedensel yaraları onarma gücünün keşfi.' },
        { name: 'Gölgenin Fısıltısı', text: 'Boşluğun ve zihinsel manipülasyonun karanlık potansiyelinin anlaşılması.' },
        { name: 'Ruhani Denge', text: 'Aşırı aydınlığın kör ediciliği ile karanlığın deliliği arasında denge kurma.' },
      ],
      note: 'Gölge olmasa ışığın parlaklığı fark edilemezdi; gerçek erdem, ikisini de tanıyıp karanlığa boyun eğmemektir.',
    },
    two: {
      title: 'Tapınaklar, İlahiler ve Kadim İnançlar',
      paragraphs: [
        'Lordaeron’da yükselen Capital City Katedrali ve Stormwind’deki Cathedral of Light, insanlığın manevi kalbi oldu. Archbishop Alonsus Faol, rahiplerini fedakârlık ve şefkat erdemleriyle eğitti.',
        'Kalimdor’un kadim ormanlarında ise Priesthood of Elune, binlerce yıldır barışın ve ay ışığının koruyuculuğunu yaptı. High Priestess Tyrande Whisperwind, Elune’in gazabını yıldız yağmurlarıyla düşman üzerine yağdırırken, saf ışığıyla müttefiklerini kutsadı.',
        'Troll kabilelerinde ise Witch Doctor ve Shadow Hunter’lar, ölümün ve ruhların tanrıları olan Loa’lara kurbanlar sunarak gölgelerin kudretini yönlendirdi.',
      ],
      cardsLabel: 'Kadim İnanç Merkezleri',
      cards: [
        { name: 'Cathedral of Light', text: 'İnsan ve cüce rahiplerin Kutsal Işığa adanmış en büyük ibadethanesi.', status: 'Katedral', tone: 'home' },
        { name: 'Sisterhood of Elune', text: 'Darnassus’ta ay tanrıçası Elune’e tapan kadim gece elfi rahibeleri.', status: 'Ay Işığı', tone: 'al' },
        { name: 'Loa Rahipleri', text: 'Darkspear trollerinin ölüm ve gölge tanrılarıyla kurduğu mistik bağ.', status: 'Voodoo', tone: 'ok' },
        { name: 'Northshire Abbey', text: 'Stormwind’in en eski şifa ocağı ve rahiplerin ilk eğitim merkezi.', status: 'Köken', tone: 'home' },
      ],
      note: 'Farklı isimler verilse de her duanın ardında yatan gerçek birdir: fani dünyanın ötesindeki ilahi kudretle bağ kurmak.',
    },
    three: {
      title: 'İnancın İmtihanı ve Veba Yılları',
      paragraphs: [
        'Third War’da yayılan Scourge vebası, rahiplerin inancını tarihin en ağır sınavından geçirdi. Şifa büyülerinin çaresiz kaldığı bu lanetli salgında pek çok din adamı umutsuzluğa kapıldı.',
        'İnancı kırılanlar Kel’Thuzad’ın fısıltılarına kanarak Cult of the Damned saflarına katıldı ve karanlığa hizmet etti. Ancak sarsılmayanlar, yanan şehirlerin sokaklarında hastalara şifa dağıtmaya ve ruhları huzura kavuşturmaya devam etti.',
        'Bu büyük yıkım, rahiplerin sadece şifa dağıtmakla kalmayıp, zihinlerini korumak için gölgenin acımasız gerçekleriyle de yüzleşmeleri gerektiğini öğretti.',
      ],
      cardsLabel: 'Veba ve İnanç İmtihanı',
      cards: [
        { name: 'Lanetli Salgın', text: 'Şifa büyülerinin bile durduramadığı zombi vebası karşısında inancın sarsılması.', status: 'Kriz', tone: 'no' },
        { name: 'Cult of the Damned', text: 'İnancını kaybedip ölümü ve Lich King’i tanrı kabul eden sapkın rahipler.', status: 'Düşüş', tone: 'no' },
        { name: 'Son Dua ve Fedakârlık', text: 'Ölümün kol gezdiği sokaklarda masumları kurtarmak için can veren din adamları.', status: 'Fedakârlık', tone: 'ok' },
        { name: 'Gölgenin Kabulü', text: 'Zihni korumak için karanlığın doğasını anlamanın zorunluluğunun fark edilmesi.', status: 'Uyanış', tone: 'al' },
      ],
      note: 'En karanlık gecede edilen tek bir samimi dua, binlerce meşaleden daha parlak bir ışık saçar.',
    },
    four: {
      title: 'Işık ve Karanlığın Üç Boyutu: Discipline, Holy, Shadow',
      paragraphs: [
        'Bir rahip zihnini ve ruhunu üç uzmanlık dalından birine adar. Biri saf ilahi lütufla yaraları sararken, diğeri zihinsel kalkanlar örer, üçüncüsü ise Void’in deliliğini düşmana yöneltir.',
      ],
      specsLabel: 'Rahip Uzmanlıkları',
      specs: [
        {
          name: 'Discipline',
          role: 'Zihinsel İrade ve Koruyucu Kalkanlar',
          text: 'Işık ve gölgenin dengesini zihninde kurar. Power Word: Shield ile müttefiklerini hasar almadan önce korur, Inner Focus ile büyülerini güçlendirir.',
          spells: ['Power Word: Shield', 'Inner Focus', 'Power Infusion', 'Mana Burn'],
        },
        {
          name: 'Holy',
          role: 'Saf İlahi Şifa ve Diriliş Mucizeleri',
          text: 'Kutsal Işığın yeryüzündeki saf pınarıdır. Prayer of Healing ile tüm grubu aynı anda iyileştirir, Spirit of Redemption ile ölüm anında bile şifa dağıtır.',
          spells: ['Prayer of Healing', 'Flash Heal', 'Spirit of Redemption', 'Holy Nova'],
        },
        {
          name: 'Shadow',
          role: 'Void Fısıltıları ve Zihinsel Delilik',
          text: 'Shadowform’a bürünerek karanlığın elçisi olur. Mind Flay ve Shadow Word: Pain ile düşmanın ruhunu ve zihnini parçalar, Psychic Scream ile panik yaratır.',
          spells: ['Shadowform', 'Mind Flay', 'Shadow Word: Pain', 'Psychic Scream'],
        },
      ],
      note: 'Işık bedeni iyileştirir, fakat gölge zihni bükebilir. Her ikisine de hâkim olan rahip durdurulamaz.',
    },
    five: {
      title: 'Ruhun Muhafızları ve Modern Rahipler',
      paragraphs: [
        'Savaş meydanında kan gövdeyi götürürken, bir rahibin tek bir fısıltısı ölmekte olan bir askeri hayata döndürebilir.',
        'High Priestess Tyrande Whisperwind, halkını binlerce yıldır Elune’in bilgeliğiyle yönetirken; Prophet Velen, Eredar ırkının saf Işığa bağlı kalan Naaru dostu lideri olarak tüm Azeroth’a umut aşılamıştır.',
        'Bugün bir rahip, müttefiklerinin ruhunu koruyan bir sığınak ve karanlığa karşı dikilen sarsılmaz bir inanç kalesidir.',
      ],
      figuresLabel: 'Tarihe Yön Veren Ruhani Liderler',
      figures: [
        { name: 'Tyrande Whisperwind', title: 'High Priestess of Elune', text: 'On bin yıldır Night Elf halkının ruhani lideri; Elune’in kutsal gazabını savaş alanına taşıyan başrahibe.' },
        { name: 'Alonsus Faol', title: 'Archbishop of the Holy Light', text: 'Silver Hand’i kuran, Kutsal Işığı bir felsefeden askeri bir güce dönüştüren efsanevi başpiskopos.' },
        { name: 'Prophet Velen', title: 'Leader of the Draenei', text: 'Naaru’ların kadim bilgeliğine sahip, Kutsal Işığın evrendeki en saf elçisi ve peygamberi.' },
      ],
      note: 'Bedenler çürür, zırhlar paslanır; fakat temiz bir ruhun inancı zamanın ötesinde parıldamaya devam eder.',
    },
    outro: {
      title: 'Ruhun Ebedi Dengesi',
      text: 'Priest olmak, Işığın merhametini kalbinde, Gölgenin bilgeliğini zihninde taşımaktır. İnancın asla sarsılmasın.',
      nextText: 'Toprağın, rüzgârın ve alevlerin efendisi olan Shaman’ların hikayesine geç.',
    },
  },
  en: {
    metaDescription: 'The history of the Priest class: the eternal balance of Holy Light and Shadow, the priestesses of Elune, and the three dimensions of spiritual conviction.',
    overline: 'Light, Shadow & Spiritual Equilibrium',
    lead: 'Performing miracles of divine restoration and fracturing hostile minds with cosmic Void whispers, priests serve as the living conduits of universal equilibrium.',
    facts: [
      { label: 'Role', value: 'Healer, Ranged Shadow Magic Damage (DPS)' },
      { label: 'Primary Resource', value: 'Mana' },
      { label: 'Armor Type', value: 'Cloth' },
      { label: 'Iconic Spells', value: 'Power Word: Shield, Flash Heal, Mind Flay, Shadowform, Resurrection, Psychic Scream' },
      { label: 'Holy Sanctuaries', value: 'Cathedral of Light, Temple of the Moon, Northshire Abbey', extra: 'Altar of Shadows' },
    ],
    chapters: {
      origin: 'The Cosmic Duality of Light & Shadow',
      two: 'Cathedrals, Hymns & Ancient Creeds',
      three: 'The Trial of Faith & Plague Years',
      four: 'Three Sacred Dimensions: Discipline, Holy, Shadow',
      five: 'Shepherds of the Soul & Modern Priests',
    },
    origin: {
      title: 'Two Primordial Cosmic Forces',
      titleNote: 'Cosmic Duality',
      paragraphs: [
        'When the cosmos roared into being, two fundamental forces clashed: the radiant warmth of the Holy Light, fostering creation and life, and the fathomless chill of the Void, defining the silence between stars. Neither can exist without the other.',
        'The priest stands upon the narrow bridge suspended between these infinite gulfs. Attuned to the Light, their unwavering will knits torn flesh and commands miracles; surrendering to the Shadow, they unleash debilitating torrents of psychic torment.',
        'Night Elven veneration of the moon goddess Elune, human and dwarven fellowship within the Church of the Holy Light, or troll communion with ancestral Loa... every culture refracts spiritual conviction through its own ancestral lens.',
      ],
      stagesLabel: 'Origins of Faith',
      stages: [
        { name: 'Cosmic Genesis', text: 'The foundational collision of Light and Void that ignited the universe.' },
        { name: 'Supplication & Grace', text: 'Discovering that deep mental conviction channels tangible restorative miracles.' },
        { name: 'Shadow Whispers', text: 'Unlocking the profound psychological potency of the cosmic Void.' },
        { name: 'Spiritual Equilibrium', text: 'Synthesizing the blinding purity of Light with the sobering reality of darkness.' },
      ],
      note: 'Without shadow, light has no radiance; true spiritual mastery lies in knowing the darkness without surrendering to its madness.',
    },
    two: {
      title: 'Cathedrals, Hymns & Ancient Creeds',
      paragraphs: [
        'Lordaeron’s Capital City Cathedral and Stormwind’s Cathedral of Light became the spiritual anchors of humanity. Archbishop Alonsus Faol instilled his clergy with the foundational virtues of compassion, tenacity, and reverence.',
        'Across the sea in Darnassus, the Sisterhood of Elune guarded Kalimdor for millennia under the moonlight. High Priestess Tyrande Whisperwind called down astral starlight to incinerate demonic invaders while mending allied wounds.',
        'Meanwhile among the jungle tribes, troll witch doctors offered sacrifices to the primal Loa, balancing ancestral spirits and shadow voodoo upon mossy stone altars.',
      ],
      cardsLabel: 'Sacred Sanctuaries',
      cards: [
        { name: 'Cathedral of Light', text: 'The supreme house of prayer for humans and dwarves venerating the Holy Light.', status: 'Cathedral', tone: 'home' },
        { name: 'Sisterhood of Elune', text: 'Ancient night elven warrior-priestesses devoted to the celestial moon goddess.', status: 'Moonlight', tone: 'al' },
        { name: 'Loa Priesthood', text: 'Troll shamans and shadowcasters communing directly with ancient animal gods.', status: 'Voodoo', tone: 'ok' },
        { name: 'Northshire Abbey', text: 'The cradle of human clerical instruction nestled in the Elwynn woods.', status: 'Origin', tone: 'home' },
      ],
      note: 'Though invocation names differ across cultures, all spiritual traditions reach toward the same transcendent forces beyond mortal grasp.',
    },
    three: {
      title: 'The Trial of Faith & Plague Years',
      paragraphs: [
        'During the Third War, the plague of undeath subjected priesthoods across Lordaeron to their darkest crucible. When traditional prayers failed to arrest the necrotic blight, despair consumed entire cloisters.',
        'Those whose faith broke fell into Kel’Thuzad’s insidious whispers, swelling the ranks of the Cult of the Damned. Yet the steadfast remained in pestilence-choked streets, offering last rites and standing as beacons of solace amid screaming ruin.',
        'This catastrophe permanently broadened priestly doctrine: to preserve the spirit, a shepherd must understand the anatomy of shadow as deeply as the radiance of light.',
      ],
      cardsLabel: 'The Plague & Trial of Conviction',
      cards: [
        { name: 'The Blighted Crucible', text: 'A necrotic plague impervious to healing spells that tested clerical faith to the limit.', status: 'Crisis', tone: 'no' },
        { name: 'Cult of the Damned', text: 'Fallen clerics who traded divine grace for necromantic power under the Lich King.', status: 'Fall', tone: 'no' },
        { name: 'Martyrdom in Ruin', text: 'Brave clerics who refused to flee burning cities, tending to the dying until the end.', status: 'Sacrifice', tone: 'ok' },
        { name: 'Understanding Shadow', text: 'Accepting the necessity of mastering shadowcraft to protect allied sanity.', status: 'Realization', tone: 'al' },
      ],
      note: 'A single sincere prayer whispered in the depths of absolute despair shines brighter than ten thousand torches.',
    },
    four: {
      title: 'Three Sacred Dimensions: Discipline, Holy, Shadow',
      paragraphs: [
        'A priest dedicates their soul to one of three theological paths. One shields allies with unbreakable mental fortresses, another channels direct divine intervention, and the third embraces the madness of the Void.',
      ],
      specsLabel: 'Priest Specializations',
      specs: [
        {
          name: 'Discipline',
          role: 'Mental Fortitude & Protective Wards',
          text: 'Maintains strict equilibrium between light and dark. Prevents lethal damage before it occurs with Power Word: Shield, bestowing Power Infusion upon spellcasters.',
          spells: ['Power Word: Shield', 'Inner Focus', 'Power Infusion', 'Mana Burn'],
        },
        {
          name: 'Holy',
          role: 'Divine Miracles & Collective Restoration',
          text: 'The purest fountain of restorative grace. Mends entire parties simultaneously with Prayer of Healing and continues healing as the Spirit of Redemption beyond death.',
          spells: ['Prayer of Healing', 'Flash Heal', 'Spirit of Redemption', 'Holy Nova'],
        },
        {
          name: 'Shadow',
          role: 'Void Torment & Mental Dissolution',
          text: 'Adopts Shadowform to channel dark cosmic frequencies. Flays enemy sanity with Mind Flay and Shadow Word: Pain, scattering foes in terror with Psychic Scream.',
          spells: ['Shadowform', 'Mind Flay', 'Shadow Word: Pain', 'Psychic Scream'],
        },
      ],
      note: 'The Light repairs mortal bone, but the Shadow can shatter immortal minds. Mastery over both makes the priest invincible.',
    },
    five: {
      title: 'Shepherds of the Soul & Modern Priests',
      paragraphs: [
        'When chaos sweeps the vanguard, a priest’s whispered benediction can snatch a dying champion from the very jaws of the grave.',
        'High Priestess Tyrande Whisperwind has steered her people through ten millennia of conflict by Elune’s radiant wisdom; Prophet Velen of the Draenei remains the immortal herald of cosmic grace and Naaru fellowship.',
        'Today, a priest is an indispensable sanctuary on the battlefield—a lighthouse of unyielding faith standing defiant against the storm.',
      ],
      figuresLabel: 'Revered Spiritual Leaders',
      figures: [
        { name: 'Tyrande Whisperwind', title: 'High Priestess of Elune', text: 'Night Elven leader for ten thousand years, channeling both the gentle grace and wrathful vengeance of Elune.' },
        { name: 'Alonsus Faol', title: 'Archbishop of the Holy Light', text: 'The father of the Silver Hand who codified the Church of the Holy Light into an organized pillar of civilization.' },
        { name: 'Prophet Velen', title: 'Leader of the Draenei', text: 'The immortal visionary blessed by the Naaru, standing as an unbroken apostle of cosmic light across millennia.' },
      ],
      note: 'Flesh crumbles and empires rust into dust; but the conviction of a purified soul reverberates across eternity.',
    },
    outro: {
      title: 'The Eternal Balance',
      text: 'To be a priest is to harbor the mercy of the Light in your heart and the cold truth of the Shadow in your mind. Walk the middle path with an unshakeable soul.',
      nextText: 'Heed the rumbling earth and crackling lightning of the Shaman.',
    },
  },
};

export const SHAMAN_STORY: Record<Lang, ClassStoryData> = {
  tr: {
    metaDescription: 'Shaman sınıfının tarihi: Elementlerin çağrısı, Draenor’un ruhları, Thrall’ın uyanışı ve dört elementin uyumu.',
    overline: 'Elementler, Ruhlar ve Totemler',
    lead: 'Yeri titreten, gökten yıldırımlar indiren ve alevlerin gazabıyla savaşan şamanlar, Azeroth ve Draenor’un element ruhlarıyla konuşan bilgelerdir.',
    facts: [
      { label: 'Rol', value: 'Şifacı (Healer), Yakın Dövüş ve Menzilli Büyü Hasarı (Melee/Ranged DPS)' },
      { label: 'Birincil Kaynak', value: 'Mana' },
      { label: 'Zırh Tipi', value: 'Deri (Leather) / Seviye 40+ Post (Mail), Kalkan (Shield)' },
      { label: 'İkonik Yetenekler', value: 'Chain Lightning, Windfury Weapon, Healing Stream Totem, Reincarnation, Bloodlust' },
      { label: 'Kutsal Birlikler', value: 'The Earthen Ring, Darkspear Witch Doctors', extra: 'Oshu’gun, Throne of the Elements' },
    ],
    chapters: {
      origin: 'Draenor’un Ruhları ve Elementlerin Çağrısı',
      two: 'Fel Yozlaşması ve Elementlerin Sessizliği',
      three: 'Thrall’ın Uyanışı ve Şamanizmin Yeniden Doğuşu',
      four: 'Üç Element Yolu: Elemental, Enhancement, Restoration',
      five: 'The Earthen Ring ve Dünya Ruhunun Dengeleyicileri',
    },
    origin: {
      title: 'Dört Element ve Yaşam Ruhu',
      titleNote: 'The Elements',
      paragraphs: [
        'Ateş (Fire), Toprak (Earth), Su (Water) ve Hava (Air)... Evrenin yapı taşları olan bu dört ilkel güç, Azeroth ve antik Draenor’da bilinçli ruhlar olarak yaşar. Ancak bu ruhlar fani efendiler tanımaz; onlara boyun eğdirilemez, yalnızca saygı ve kurbanlarla dostlukları kazanılabilir.',
        'Şaman, elementlerle anlaşma yapan bir arabulucudur. Nagrand steplerinde devasa elmas dağ Oshu’gun etrafında toplanan antik ork klanları ve Kalimdor düzlüklerinde yaşayan Tauren kabileleri, atalarının ruhlarıyla ve doğanın güçleriyle konuşmayı ilk öğrenenlerdi.',
        'Toprağı sarsan depremler, göğü yaran yıldırımlar veya kuraklığı bitiren şifalı yağmurlar... Şaman bu güçleri kendi iradesiyle değil, elementlerin rızasıyla çağırır.',
      ],
      stagesLabel: 'Şamanizmin Doğuş Basamakları',
      stages: [
        { name: 'Ruhlarla İletişim', text: 'Ataların ruhlarını dinleyip rüyalarda elementlerin sesini ayırt etme.' },
        { name: 'Dört Totem', text: 'Toprak, ateş, su ve hava elementlerine adanmış kutsal ahşap totemlerin oyulması.' },
        { name: 'Kozmik Denge', text: 'Ateşin yıkıcılığı ile suyun yatıştırıcılığını aynı bedende dengeleme.' },
        { name: 'Doğa Paktı', text: 'Elementlerin kaba kuvvetle değil, derin bir saygı ve ritüelle çağrılması.' },
      ],
      note: 'Şaman bir büyücü değildir; o elementlere emir vermez. Bir şaman dua eder, elementler ise dostça yanıt verir.',
    },
    two: {
      title: 'Fel Yozlaşması ve Elementlerin Sessizliği',
      paragraphs: [
        'Draenor’da asırlar süren barış, iblis lordu Kil’jaeden’ın gelişiyle parçalandı. Kurnaz büyücü Gul’dan ve onun Shadow Council cemiyeti, ork şamanlarını kandırarak ataların ruhlarını susturdu.',
        'Şamanlar elementlerin sabırlı dilini terk edip şeytani fel büyülerine sığındığında, dünya yanıt vermeyi bıraktı. Gökyüzü kızıla döndü, nehirler kurudu ve elementler derin bir sessizliğe gömüldü. Şamanların yerini karanlık warlock’lar aldı.',
        'Bu felaket, ork halkının kana susamış bir Horde’a dönüşmesine ve Dark Portal’dan geçerek Azeroth’u kana bulamasına zemin hazırladı.',
      ],
      cardsLabel: 'Şamanizmin Düşüşü',
      cards: [
        { name: 'Gul’dan’ın İhaneti', text: 'Ruhların sesini taklit eden iblislerle klanları fel enerjisine yönlendiren sahtekârlık.', status: 'İhanet', tone: 'no' },
        { name: 'Elementlerin Sessizliği', text: 'Fel ateşiyle kirletilen toprakların şamanların çağrılarına tamamen kapanması.', status: 'Terk Ediliş', tone: 'no' },
        { name: 'Warlock’ların Doğuşu', text: 'Doğa paktının kırılarak iblis köleliği ve ruh parçalama ritüellerine geçiş.', status: 'Yozlaşma', tone: 'mute' },
        { name: 'Draenor’un Ölümü', text: 'Element dengesi bozulan gezegenin yavaş yavaş parçalanan Outland’e dönüşmesi.', status: 'Yıkım', tone: 'no' },
      ],
      note: 'Elementlere sırt çeviren bir dünya canlı kalamaz. Draenor’un ölümü, doğanın dengesiyle oynamanın bedeliydi.',
    },
    three: {
      title: 'Thrall’ın Uyanışı ve Şamanizmin Yeniden Doğuşu',
      paragraphs: [
        'İkinci Savaş’ın ardından insan esir kamplarında büyüyen köle gladyatör Thrall, halkının kayıp ruhunu aramak için Alterac Dağları’na kaçtı. Orada Frostwolf klanının kör kâhini Drek’Thar ile karşılaştı.',
        'Drek’Thar genç orka atalarının kadim şamanizm öğretilerini aktardı. Thrall kalbini arındırıp toprağa diz çöktüğünde, asırlardır suskun olan Azeroth elementleri ilk kez bir orka yanıt verdi: rüzgâr etrafında esti, şimşekler silahını kutsadı.',
        'Yeni Warchief olan Thrall, halkını kamplardan kurtararak Kalimdor’a taşıdı ve yeni vatanları Durotar’ı elementlerin rızasıyla kurdu.',
      ],
      cardsLabel: 'Uyanış ve Kurtuluş',
      cards: [
        { name: 'Drek’Thar’ın Rehberliği', text: 'Frostwolf klanının kadim bilgesi, genç ork şefe doğanın dilini öğretti.', status: 'Rehberlik', tone: 'home' },
        { name: 'Elementlerin Geri Dönüşü', text: 'Asırlar sonra ilk kez elementlerin saf bir ork kalbine dostça yanıt vermesi.', status: 'Yeniden Doğuş', tone: 'ok' },
        { name: 'Kampların Özgürleşmesi', text: 'Uyuşukluğa gömülen ork halkının şaman davullarıyla uykusundan uyanması.', status: 'Özgürlük', tone: 'al' },
        { name: 'Durotar’ın Kuruluşu', text: 'Kalimdor çöllerinde doğaya saygı duyan yeni ve onurlu Horde’un inşası.', status: 'Vatan', tone: 'ok' },
      ],
      note: 'Zincirleri kıran şey kaba kuvvet değil; ruhunu ataların bilgeliğiyle yıkayan bir şamanın inancıydı.',
    },
    four: {
      title: 'Üç Element Yolu: Elemental, Enhancement, Restoration',
      paragraphs: [
        'Şaman doğanın dört gücünü üç farklı savaş felsefesinde dengeler. Biri gökleri inleten fırtınalara hükmeder, diğeri çelik silahlarını alev ve rüzgârla döver, üçüncüsü ise hayat veren sularla orduları diriltir.',
      ],
      specsLabel: 'Şaman Uzmanlıkları',
      specs: [
        {
          name: 'Elemental',
          role: 'Fırtına, Şimşek ve Magma Çağrısı',
          text: 'Uzak mesafeden doğanın hiddetini serbest bırakır. Chain Lightning ile hedeften hedefe atlayan yıldırımlar ve Earth Shock ile düşmanı sarsan toprak patlamaları yaratır.',
          spells: ['Chain Lightning', 'Lightning Bolt', 'Elemental Mastery', 'Earth Shock'],
        },
        {
          name: 'Enhancement',
          role: 'Rüzgârla Güçlendirilmiş Silahlar',
          text: 'Silahlarını elementlerle mühürler. Windfury Weapon ile kılıcının tek bir darbesini üç katına çıkarır, Stormstrike ile yakın dövüşte fırtınanın öfkesini indirir.',
          spells: ['Windfury Weapon', 'Stormstrike', 'Flametongue Weapon', 'Ghost Wolf'],
        },
        {
          name: 'Restoration',
          role: 'Yaşam Suları ve Şifalı Yağmurlar',
          text: 'Arındırıcı suların yatıştırıcı kudretini çağırır. Healing Wave ile ölümcül yaraları sarar, Mana Tide Totem ile müttefiklerinin ruhani gücünü yeniler.',
          spells: ['Healing Wave', 'Chain Heal', 'Mana Tide Totem', 'Reincarnation'],
        },
      ],
      note: 'Dört element bir araya geldiğinde durdurulamaz bir güç oluşturur. Şaman, bu fırtınanın kalbindeki sakin gözdür.',
    },
    five: {
      title: 'The Earthen Ring ve Dünya Ruhunun Dengeleyicileri',
      paragraphs: [
        'Şamanizm sadece Horde’a ait değildir. Kadim Tauren kabileleri ve sonradan şamanizmi benimseyen Draenei Kırılmışları (Broken), "The Earthen Ring" cemiyeti çatısı altında birleşti.',
        'Bu tarafsız meclis, dünyanın element dengesini tehdit eden her türlü afete karşı göğüs gerer. Farseer Nobundo, halkı tarafından dışlanmışken Outland’de rüzgârın sesini duyarak ilk Draenei şamanı oldu.',
        'Bugün bir şaman, dağların fısıltısını duyan, denizlerin dalgasını yönlendiren ve yaralı Azeroth’un acısını dindiren kutsal bir koruyucudur.',
      ],
      figuresLabel: 'Efsanevi Şamanlar',
      figures: [
        { name: 'Thrall (Go’el)', title: 'Warchief of the Horde · World-Shaman', text: 'Şamanizmi ork halkına geri kazandıran, elementlerin sevgilisi ve Cataclysm döneminin kurtarıcısı.' },
        { name: 'Drek’Thar', title: 'Farseer of the Frostwolf Clan', text: 'Alterac Dağları’nda sürgünde yaşayan, kör gözleriyle dünyanın ruhunu gören bilge rehber.' },
        { name: 'Farseer Nobundo', title: 'İlk Draenei Şamanı', text: 'Kırılmış bedenine rağmen rüzgârın çağrısına yanıt veren ve halkına şamanizm yolunu açan usta.' },
      ],
      note: 'Toprak ayağının altında sarsılsa bile şaman düşmez; çünkü o toprağın bir parçasıdır.',
    },
    outro: {
      title: 'Fırtınanın Çağrısı',
      text: 'Şaman olmak, doğanın nabzını kendi kalbinde hissetmektir. Totemlerin yere çakılacak, yıldırımlar yolunu aydınlatacak ve elementler seni daima koruyacaktır.',
      nextText: 'Karanlık paktların ve fel ateşinin ustası olan Warlock’ların hikayesine geç.',
    },
  },
  en: {
    metaDescription: 'The history of the Shaman class: communion with the elements, the spirits of Draenor, Thrall’s awakening, and the harmony of the four elemental forces.',
    overline: 'Elements, Spirits & Totemic Harmony',
    lead: 'Rumbling the earth, calling down howling lightning, and unleashing the fury of elemental fire, shamans commune with the living spirits of Azeroth and ancient Draenor.',
    facts: [
      { label: 'Role', value: 'Healer, Melee/Ranged Hybrid Damage (DPS)' },
      { label: 'Primary Resource', value: 'Mana' },
      { label: 'Armor Type', value: 'Leather / Mail (Level 40+), Shields' },
      { label: 'Iconic Abilities', value: 'Chain Lightning, Windfury Weapon, Healing Stream Totem, Reincarnation, Bloodlust' },
      { label: 'Sacred Circles', value: 'The Earthen Ring, Darkspear Witch Doctors', extra: 'Oshu’gun, Throne of the Elements' },
    ],
    chapters: {
      origin: 'Spirits of Draenor & The Elemental Accord',
      two: 'Fel Corruption & The Silence of the Elements',
      three: 'Thrall’s Awakening & Shamanism Reborn',
      four: 'Three Elemental Paths: Elemental, Enhancement, Restoration',
      five: 'The Earthen Ring & Guardians of the World Soul',
    },
    origin: {
      title: 'Four Primal Elements & The Spirit',
      titleNote: 'The Elements',
      paragraphs: [
        'Fire, Earth, Water, and Air... The four foundational elemental pillars exist as conscious, volatile entities across Azeroth and primeval Draenor. They acknowledge no mortal masters; they cannot be enslaved, only appeased through reverence and ritual.',
        'A shaman serves as a diplomatic mediator between mortals and these primordial titans. Beneath the glittering diamond summit of Oshu’gun on the plains of Nagrand, ancestral orcish clans and nomadic Tauren tribes in Kalimdor learned to commune with the spirits of stone, storm, and flame.',
        'Whether commanding sudden tectonic tremors, blinding skyward lightning bolts, or life-giving restorative rainfalls, a shaman operates strictly with the consent and goodwill of the elements.',
      ],
      stagesLabel: 'Evolution of the Shaman',
      stages: [
        { name: 'Ancestral Communion', text: 'Listening to the voices of ancestors within sacred caves to interpret elemental omens.' },
        { name: 'Carving Totems', text: 'Fashioning consecrated wooden totems to anchor earth, fire, water, and air.' },
        { name: 'Harmonious Balance', text: 'Balancing the consuming fury of flame with the tranquil mercy of water.' },
        { name: 'The Primal Accord', text: 'Refusing forceful coercion and earning the spontaneous loyalty of nature spirits.' },
      ],
      note: 'A shaman is no wizard; they issue no arrogant commands. The shaman offers humble prayer, and the elements willingly roar in answer.',
    },
    two: {
      title: 'Fel Corruption & The Silence of the Elements',
      paragraphs: [
        'Centuries of harmonious coexistence shattered with the arrival of the archdemon Kil’jaeden upon Draenor. The ambitious sorcerer Gul’dan and his Shadow Council deceived the chieftains, drowning ancestral spirits under demonic lies.',
        'When shamans abandoned patient communion for the instant, corruptive gratification of demonic fel magic, nature withdrew in horror. Rivers curdled into black sludge, skies choked with sulfur, and the elemental lords fell into total silence. Warlocks usurped the elders.',
        'This catastrophe transformed a proud pastoral society into the blood-maddened Horde, which surged through the Dark Portal to ravage Azeroth.',
      ],
      cardsLabel: 'The Fall of Shamanism',
      cards: [
        { name: 'Gul’dan’s Treason', text: 'Masquerading demonic whispers as ancestral omens to lure clans into blood covenants.', status: 'Betrayal', tone: 'no' },
        { name: 'The Great Silence', text: 'Contaminated by fel radiation, the elements refused all supplication from mortal lips.', status: 'Abandonment', tone: 'no' },
        { name: 'Ascendance of Warlocks', text: 'Shamanic robes discarded for demonic pacts and the agonizing consumption of souls.', status: 'Corruption', tone: 'mute' },
        { name: 'Death of Draenor', text: 'Bereft of elemental harmony, the world cracked into the floating remnants of Outland.', status: 'Cataclysm', tone: 'no' },
      ],
      note: 'No world can endure when its elemental balance is severed. Draenor’s agonizing death was the direct cost of violating nature’s laws.',
    },
    three: {
      title: 'Thrall’s Awakening & Shamanism Reborn',
      paragraphs: [
        'Raised as an enslaved gladiator within human internment camps, the young orc Thrall escaped into the snowy crags of the Alterac Mountains seeking his people’s lost legacy. There he encountered Drek’Thar, blind elder of the Frostwolf clan.',
        'Drek’Thar instructed the youth in ancient shamanic humility. When Thrall knelt upon the snow with a cleansed heart, the long-silent elements of Azeroth answered an orc for the first time in generations: wind swirled around his brow, and lightning crackled along his warhammer.',
        'Ascending as Warchief, Thrall liberated the camps, sailed across the Great Sea, and established Durotar under the benevolent aegis of the spirits.',
      ],
      cardsLabel: 'Awakening & Liberation',
      cards: [
        { name: 'Drek’Thar’s Wisdom', text: 'The blind Frostwolf hermit revealed the lost spiritual heritage of the orcish race.', status: 'Mentorship', tone: 'home' },
        { name: 'The Return of Spirits', text: 'Azeroth’s elemental lords warmly acknowledged a truly humble and contrite heart.', status: 'Rebirth', tone: 'ok' },
        { name: 'Liberation of the Camps', text: 'Apathetic captives awakened from lethargy by the thunderous roar of shamanic war drums.', status: 'Freedom', tone: 'al' },
        { name: 'Founding of Durotar', text: 'Constructing an honorable new homeland founded upon environmental stewardship.', status: 'Sanctuary', tone: 'ok' },
      ],
      note: 'Brute strength alone never broke the chains; it was the spiritual resurrection of a people led by a humble shaman.',
    },
    four: {
      title: 'Three Elemental Paths: Elemental, Enhancement, Restoration',
      paragraphs: [
        'A shaman balances the four elemental forces across three distinct combat disciplines. One unleashes apocalyptic skyward storms, another infuses melee weapons with furious windfury, and the third cleanses all suffering with restorative water.',
      ],
      specsLabel: 'Shaman Specializations',
      specs: [
        {
          name: 'Elemental',
          role: 'Furious Storms & Magma Conduits',
          text: 'Channels raw primal wrath from afar. Cascades Chain Lightning across ranks of foes while seismic Earth Shocks interrupt and rupture enemy spellcasting.',
          spells: ['Chain Lightning', 'Lightning Bolt', 'Elemental Mastery', 'Earth Shock'],
        },
        {
          name: 'Enhancement',
          role: 'Windfury Imbued Martial Combat',
          text: 'Enchants heavy melee weapons with elemental power. Unleashes sudden bursts of triple attacks with Windfury Weapon while directing Stormstrike in close quarters.',
          spells: ['Windfury Weapon', 'Stormstrike', 'Flametongue Weapon', 'Ghost Wolf'],
        },
        {
          name: 'Restoration',
          role: 'Cleansing Tides & Restorative Rain',
          text: 'Invokes soothing waters to mend catastrophic battle wounds. Chain Heal leaps between injured comrades while Mana Tide Totem replenishes party spiritual reserves.',
          spells: ['Healing Wave', 'Chain Heal', 'Mana Tide Totem', 'Reincarnation'],
        },
      ],
      note: 'When the four elements harmonize, their combined power is insurmountable. The shaman remains the eye of that hurricane.',
    },
    five: {
      title: 'The Earthen Ring & Guardians of the World Soul',
      paragraphs: [
        'Shamanism transcends factional allegiance. Ancient Tauren tribes and later the broken Draenei assembled beneath the banner of the Earthen Ring to safeguard the planet.',
        'This neutral circle stands vigilant against elemental catastrophes worldwide. Farseer Nobundo, though mutated and ostracized by former brethren, listened to the gentle voice of the wind across Outland, becoming the first Draenei shaman.',
        'Today, a shaman is an irreplaceable guardian who soothes seismic tremors, steers the howling gales, and ministers to wounded Azeroth.',
      ],
      figuresLabel: 'Pivotal Elemental Masters',
      figures: [
        { name: 'Thrall (Go’el)', title: 'Warchief of the Horde · World-Shaman', text: 'Restored the spiritual soul of his people and served as the paramount anchor of the elements during the Cataclysm.' },
        { name: 'Drek’Thar', title: 'Farseer of the Frostwolf Clan', text: 'Blind seer of Alterac whose inner vision perceived the elemental balance when all others were blind.' },
        { name: 'Farseer Nobundo', title: 'First Draenei Shaman', text: 'Overcame the curse of the Broken by answering the gentle whisper of the wind, guiding his people to the elements.' },
      ],
      note: 'Though the earth beneath your boots shudders and cracks, the shaman never falls; for they and the earth are one.',
    },
    outro: {
      title: 'The Call of the Storm',
      text: 'To be a shaman is to feel the heartbeat of the world pulsing within your own veins. Your totems shall remain grounded, and the elements shall answer your call.',
      nextText: 'Tread into forbidden shadows and uncover the fel pacts of the Warlock.',
    },
  },
};

export const WARLOCK_STORY: Record<Lang, ClassStoryData> = {
  tr: {
    metaDescription: 'Warlock sınıfının tarihi: Fel büyüsünün baştan çıkarıcılığı, Shadow Council, Gul’dan’ın kanlı mirası ve karanlığın üç yolu.',
    overline: 'Fel Ateşi, Şeytanlar ve Ruh Parçaları',
    lead: 'Yasak bilgilerin peşinden giden, iblisleri iradelerine boyun eğdiren ve düşmanlarının ruhlarını sömüren karabüyücüler, karanlıkla ateş arasında yürür.',
    facts: [
      { label: 'Rol', value: 'Menzilli Fel ve Gölge Büyü Hasarı (Ranged DPS)' },
      { label: 'Birincil Kaynak', value: 'Mana ve Ruh Parçaları (Soul Shards)' },
      { label: 'Zırh Tipi', value: 'Kumaş (Cloth)' },
      { label: 'İkonik Büyüler', value: 'Shadow Bolt, Fear, Drain Life, Summon Felhunter, Banish, Soulstone' },
      { label: 'Karanlık Cemiyetler', value: 'Shadow Council, Council of the Black Harvest', extra: 'The Slaughtered Lamb, Cleft of Shadow' },
    ],
    chapters: {
      origin: 'Fel Enerjisinin Cazibesi ve Sargeras’ın Mirası',
      two: 'Shadow Council ve Gul’dan’ın Kanlı Paktı',
      three: 'Şeytani Kölelik ve Ruh Parçaları',
      four: 'Karanlığın Üç Yolu: Affliction, Demonology, Destruction',
      five: 'Gölgelerde Yürüyenler ve Gizli Tarikatlar',
    },
    origin: {
      title: 'Yasak Bilgi ve Sonsuz Açlık',
      titleNote: 'Fel & Shadow',
      paragraphs: [
        'Arcane disiplin gerektirir, Kutsal Işık ise fedakârlık. Ancak evrende sabırsız olanlar için kestirme ve çok daha yıkıcı bir yol vardır: Fel.',
        'Fel, yaşam enerjisini yakıt olarak kullanan, kaotik ve son derece bağımlılık yapıcı bir büyü türüdür. Twisting Nether’ın derinliklerinden gelen bu yeşil alev, dokunduğu her şeyi çürütür, yozlaştırır ve kölesi yapar. Burning Legion’ın efendisi Sargeras, bu gücü tüm dünyaları dize getirmek için kullanmıştır.',
        'Bir Warlock, sınırları kabul etmeyen bir büyücüdür. Ruhunu tehlikeye atma pahasına yasak parşömenleri okur, iblislerin adlarını öğrenir ve evrenin en karanlık sırlarını kendi silahına dönüştürür.',
      ],
      stagesLabel: 'Karanlığa Adım Atış',
      stages: [
        { name: 'Yasak Kitaplar', text: 'Kütüphanelerin en gizli raflarından çalınan karanlık iblis mühürleri.' },
        { name: 'İlk Kan Paktı', text: 'Kendi kanını veya düşmanın yaşamını feda ederek açılan ilk küçük boyut kapısı.' },
        { name: 'İblis Boyunduruk', text: 'İrade savaşıyla bir iblisi zincirleyip dünyevi hizmetkârı yapma.' },
        { name: 'Ruh Hasadı', text: 'Ölen düşmanların ruhlarını kristal parçalara hapsedip yakıt olarak kullanma.' },
      ],
      note: 'Warlock gücü ödünç almaz; onu cehennemin boğazından zorla söker alır. Ancak dikkat etmelidir: fel enerjisi eninde sonunda sahibini de tüketir.',
    },
    two: {
      title: 'Shadow Council ve Gul’dan’ın Kanlı Paktı',
      titleNote: 'Blood of Mannoroth',
      paragraphs: [
        'Warlock sınıfının tarihindeki en karanlık figür, ork büyücü Gul’dan’dır. İblis lordu Kil’jaeden’ın vaatlerine kanan Gul’dan, klanların şeflerini toplayarak onlara iblis Mannoroth’un kanını içirdi.',
        'Bu kan paktı, ork ırkını gözleri kızıla dönen, acımasız ve kana susamış canavarlara dönüştürdü. Gul’dan’ın gölgelerden yönettiği gizli meclis “Shadow Council”, Draenei halkını soykırıma uğrattı ve ölenlerin ruhlarıyla devasa Dark Portal’ı inşa etti.',
        'Birinci Savaş’ta Stormwind’i yıkan ordu, kılıçların ardındaki fel büyücülerinin ve çağırdıkları iblislerin eseriydi.',
      ],
      cardsLabel: 'Shadow Council Olayları',
      cards: [
        { name: 'Mannoroth’un Kanı', text: 'Ork klanlarını köleleştiren ve gözlerini fel yeşiline boyayan zehirli kan kadehi.', status: 'Lanet', tone: 'no' },
        { name: 'Draenei Soykırımı', text: 'Karabüyü ayinlerinde yüz binlerce masumun ruhunun yakıt olarak kullanılması.', status: 'Katliam', tone: 'no' },
        { name: 'Dark Portal Ayini', text: 'İki dünyayı birbirine bağlayan devasa boyut kapısının kurban kanlarıyla açılması.', status: 'Portal', tone: 'mute' },
        { name: 'Tomb of Sargeras', text: 'Gul’dan’ın titan gücünü çalmak için girdiği ama iblisler tarafından parçalandığı mezar.', status: 'İbret', tone: 'no' },
      ],
      note: 'Gul’dan’ın kibri kendi sonunu hazırladı; mezarın kapısında parçalanırken bile karanlık güçlerin asla dost edinmediğini anlamıştı.',
    },
    three: {
      title: 'Şeytani Kölelik ve Ruh Parçaları',
      paragraphs: [
        'Bir warlock asla yalnız savaşmaz. Twisting Nether’ın sonsuz kaosundan çağrılan iblisler, warlock’un çizdiği büyülü mühürlerin içinde irade savaşı verir. Kazanan taraf warlock olursa, iblis ona ebedi kölelikle bağlanır.',
        'Ateş fırlatan afacan Imp’ler, fiziksel darbeleri çeken devasa Voidwalker’lar, zihinleri büyüleyen Succubus’lar ve büyücülerin kabusu olan Felhunter’lar... Her hizmetkâr farklı bir amaca hizmet eder.',
        'Ancak bu köleliğin bir bedeli vardır: “Soul Shard” (Ruh Parçası). Warlock, öldürdüğü düşmanlarının son nefesini taşa hapsederek ritüellerine yakıt yapar. Bu taşlar olmaksızın en güçlü iblisler çağrılamaz, müttefikler ölümden döndürülemez (Soulstone).',
      ],
      cardsLabel: 'İblis Hizmetkârlar',
      cards: [
        { name: 'Imp', text: 'Ateş büyüleri atan ve efendisine küçük kurnazlıklar fısıldayan ilk hizmetkâr.', status: 'Ateş', tone: 'home' },
        { name: 'Voidwalker', text: 'Karanlık boyutun etten duvarı; efendisini ölümcül darbelerden koruyan gölge kalkanı.', status: 'Koruma', tone: 'al' },
        { name: 'Succubus', text: 'Düşmanın aklını çelen, büyücüleri baştan çıkarıp savunmasız bırakan ölümcül baştan çıkarıcı.', status: 'Ayartma', tone: 'ok' },
        { name: 'Felhunter', text: 'Büyü kokusunu alan ve büyücülerin manasını sömürerek susturan iblis tazısı.', status: 'Avcı', tone: 'ok' },
      ],
      note: 'İblis efendisine asla sadakat duymaz; sadece iradesinden korkar. Warlock bir an bile zayıflık gösterirse, parçalanan ilk kişi kendisi olur.',
    },
    four: {
      title: 'Karanlığın Üç Yolu: Affliction, Demonology, Destruction',
      paragraphs: [
        'Warlock sanatı üç farklı karanlık felsefede ustalaşır. Biri yavaş ve acılı ölümleri, diğeri iblis bedenleriyle ruhani kaynaşmayı, üçüncüsü ise fel cehenneminin katıksız patlamalarını hedefler.',
      ],
      specsLabel: 'Warlock Uzmanlıkları',
      specs: [
        {
          name: 'Affliction',
          role: 'Acı Çektirme, Lanetler ve Ruh Emme',
          text: 'Düşmanı doğrudan öldürmez; onu yavaşça çürütür. Corruption, Curse of Agony ve Siphon Life ile düşmanın canını saniyeler içinde tüketirken kendini besler.',
          spells: ['Corruption', 'Curse of Agony', 'Drain Life', 'Siphon Life'],
        },
        {
          name: 'Demonology',
          role: 'İblis Efendiliği ve Ruhani Bağ',
          text: 'Köleleriyle derin bir bağ kurar. Soul Link ile aldığı hasarın bir kısmını iblisine aktarır, gerektiğinde iblisini kurban ederek (Demonic Sacrifice) muazzam güç kazanır.',
          spells: ['Soul Link', 'Demonic Sacrifice', 'Fel Domination', 'Master Demonologist'],
        },
        {
          name: 'Destruction',
          role: 'Kaos, Fel Ateşi ve Yıkım',
          text: 'Twisting Nether’ın en vahşi alevlerini çağırır. Shadow Bolt ve Immolate ile düşmanı yakar, Conflagrate ile patlatarak gökten cehennem taşları yağdırır.',
          spells: ['Shadow Bolt', 'Immolate', 'Conflagrate', 'Shadowburn'],
        },
      ],
      note: 'Düşman acı çekerken warlock güçlenir. Onun dünyasında merhamet, henüz öğrenilmemiş bir zayıflıktan ibarettir.',
    },
    five: {
      title: 'Gölgelerde Yürüyenler ve Gizli Tarikatlar',
      paragraphs: [
        'Hiçbir medeni şehirde bir warlock sokaklarda açıkça gezemez. Stormwind’de The Slaughtered Lamb meyhanesinin altındaki mahzenlerde, Orgrimmar’da ise Cleft of Shadow’un karanlık mağaralarında gizlenirler.',
        'Toplum onları lanetlese de krallar ve savaş şefleri onların gücünü gizlice kullanmaktan çekinmez. Çünkü en korkunç iblisleri ve karanlık lanetleri defetmenin tek yolu, o karanlığı en iyi tanıyanları sahaya sürmektir.',
        'Warlock, bıçağın sırtında yürüyen bir felsefedir: ya güce hükmedersin ya da fel ateşinde kül olursun.',
      ],
      figuresLabel: 'Tarihin En Tehlikeli Büyücüleri',
      figures: [
        { name: 'Gul’dan', title: 'Lord of the Shadow Council', text: 'Horde’u fel ile zehirleyen, tarihin gördüğü en acımasız ve kudretli ork karabüyücü.' },
        { name: 'Cho’gall', title: 'Chieftain of the Twilight’s Hammer', text: 'Gul’dan’ın iki başlı ogre müridi; hem karanlık fel hem de Old God fısıltılarının ustası.' },
        { name: 'Wilfred Fizzlebang', title: 'Master Summoner', text: 'Boyundan büyük iblisleri çağırmaya cüret eden, kibriyle tarihe geçen çılgın gnome büyücüsü.' },
      ],
      note: 'Ateşle oynayan er ya da geç yanar; fakat yanana kadar tüm dünyayı aydınlatacak kadar büyük bir yangın çıkarabilir.',
    },
    outro: {
      title: 'Karanlığın Mirası',
      text: 'Warlock olmak, korkunun üzerine basarak güce uzanmaktır. Ruhlar senin yakıtın, iblisler senin kölen ve fel senin müttefikindir.',
      nextText: 'Doğanın dengesini koruyan, form değiştiren Druid’lerin hikayesine geç.',
    },
  },
  en: {
    metaDescription: 'The history of the Warlock class: the seductive lure of Fel, the Shadow Council, Gul’dan’s bloody legacy, and the three paths of dark sorcery.',
    overline: 'Fel Fire, Demons & Soul Shards',
    lead: 'Pursuing forbidden knowledge, bending demons to an iron will, and siphoning the vital souls of the dying, warlocks tread the razor’s edge between absolute power and damnation.',
    facts: [
      { label: 'Role', value: 'Ranged Fel & Shadow Magic Damage (DPS)' },
      { label: 'Primary Resource', value: 'Mana & Soul Shards' },
      { label: 'Armor Type', value: 'Cloth' },
      { label: 'Iconic Spells', value: 'Shadow Bolt, Fear, Drain Life, Summon Felhunter, Banish, Soulstone' },
      { label: 'Clandestine Covens', value: 'The Shadow Council, Council of the Black Harvest', extra: 'The Slaughtered Lamb, Cleft of Shadow' },
    ],
    chapters: {
      origin: 'The Seductive Lure of Fel & Sargeras’s Legacy',
      two: 'The Shadow Council & Gul’dan’s Blood Pact',
      three: 'Demonic Servitude & The Currency of Souls',
      four: 'Three Paths of Darkness: Affliction, Demonology, Destruction',
      five: 'Walkers of the Shadows & Hidden Covens',
    },
    origin: {
      title: 'Forbidden Lore & Insatiable Hunger',
      titleNote: 'Fel & Shadow',
      paragraphs: [
        'Arcane sorcery demands years of painstaking study, and the Holy Light requires pious submission. Yet for the impatient and the ambitious, the cosmos offers a catastrophic shortcut: Fel.',
        'Fel is an entropic, highly addictive magical frequency fueled directly by the destruction of living souls. Emerging from the abyssal chaos of the Twisting Nether, this emerald fire withers, mutates, and corrupts everything it touches. The dark titan Sargeras wielded it to shatter worlds across the Great Dark Beyond.',
        'A warlock is an arcane scholar who refuses intellectual boundaries. Defying taboo, they transcribe forbidden grimoires, utter the true names of demonic horrors, and convert cosmic evil into personal weaponry.',
      ],
      stagesLabel: 'Descent into Damnation',
      stages: [
        { name: 'Forbidden Grimoires', text: 'Deciphering demonic sigils stolen from the deepest, most restricted vaults.' },
        { name: 'The First Blood Pact', text: 'Tearing open the first micro-rift into the Nether using mortal blood as fuel.' },
        { name: 'Subjugation of Will', text: 'Enslaving extraplanar fiends through sheer, overwhelming mental dominance.' },
        { name: 'Harvesting Souls', text: 'Trapping the departing animus of slain enemies within crystalline soul shards.' },
      ],
      note: 'A warlock does not borrow strength; they tear it directly from the throats of demons. Yet caution is vital: the fel inevitably devours its wielder.',
    },
    two: {
      title: 'The Shadow Council & Gul’dan’s Blood Pact',
      titleNote: 'Blood of Mannoroth',
      paragraphs: [
        'The paramount architect of warlock infamy is the orcish sorcerer Gul’dan. Seduced by Kil’jaeden’s whispers of godlike supremacy, Gul’dan assembled the clan chieftains atop the Throne of Kil’jaeden and offered them the blood of the pit lord Mannoroth.',
        'This unholy covenant tainted an entire noble shamanic race, transforming brown-skinned hunters into red-eyed, bloodthirsty berserkers. Operating in the shadows, Gul’dan’s secret cabal—the Shadow Council—orchestrated the genocide of the Draenei, utilizing their agonized souls to power the Dark Portal.',
        'The catastrophic army that flattened Stormwind during the First War marched beneath the shadow of demonic summoners.',
      ],
      cardsLabel: 'Shadow Council Infamy',
      cards: [
        { name: 'Blood of Mannoroth', text: 'The demonic chalice that bound the orcish race to the Burning Legion’s will.', status: 'Curse', tone: 'no' },
        { name: 'Draenei Slaughter', text: 'Harvesting thousands of innocent souls to construct the dimensional Dark Portal.', status: 'Slaughter', tone: 'no' },
        { name: 'Opening the Rift', text: 'Tearing the fabric between worlds using concentrated necrotic soul batteries.', status: 'Portal', tone: 'mute' },
        { name: 'Tomb of Sargeras', text: 'Where Gul’dan sought the dark titan’s eye, only to be torn apart by furious fiends.', status: 'Hubris', tone: 'no' },
      ],
      note: 'Gul’dan’s monstrous ambition proved his undoing; as demonic talons ripped him to shreds within the Tomb, he learned that darkness knows no loyalty.',
    },
    three: {
      title: 'Demonic Servitude & The Currency of Souls',
      paragraphs: [
        'A warlock never walks the battlefield alone. Ripped screaming from the Twisting Nether, demons find themselves imprisoned within complex containment circles. A brutal psychic contest ensues; should the warlock triumph, the fiend is shackled to mortal commands.',
        'The chattering Imp spitting hellfire, the hulking Voidwalker absorbing physical trauma, the seductive Succubus manipulating enemy minds, and the predatory Felhunter devouring hostile spellcraft... each serves a calculated tactical purpose.',
        'Yet maintaining this demonic zoo demands a grisly currency: Soul Shards. The warlock reaps the final breath of falling adversaries, crystallizing their essence into purple gems required to empower devastating rituals and forge Soulstones to cheat death.',
      ],
      cardsLabel: 'The Demonic Retinue',
      cards: [
        { name: 'The Imp', text: 'A malicious familiar flinging bolts of fire while whispering devious schemes to its master.', status: 'Fire', tone: 'home' },
        { name: 'The Voidwalker', text: 'A creature of the Nether acting as an indomitable living shield against enemy blades.', status: 'Defense', tone: 'al' },
        { name: 'The Succubus', text: 'A lethal temptress charming hostile combatants and turning them against allies.', status: 'Seduction', tone: 'ok' },
        { name: 'The Felhunter', text: 'A predatory hound sniffing out magical currents and silencing spellcasters instantly.', status: 'Mage Hunter', tone: 'ok' },
      ],
      note: 'A demon feels no devotion toward its master; it obeys only out of sheer terror. The moment a warlock falters, the minion strikes.',
    },
    four: {
      title: 'Three Paths of Darkness: Affliction, Demonology, Destruction',
      paragraphs: [
        'Warlock spellcraft branches into three distinct lethal methodologies. One inflicts protracted, agonizing decomposition; another merges the warlock’s life force with demonic minions; the third unleashes catastrophic, explosive chaos.',
      ],
      specsLabel: 'Warlock Specializations',
      specs: [
        {
          name: 'Affliction',
          role: 'Agonizing Curses & Siphoned Life',
          text: 'Inflicts slow, unavoidable decay. Rotting flesh with Corruption and Curse of Agony, while Drain Life sustains the caster on the enemy’s vitality.',
          spells: ['Corruption', 'Curse of Agony', 'Drain Life', 'Siphon Life'],
        },
        {
          name: 'Demonology',
          role: 'Minion Dominance & Soul Linking',
          text: 'Fuses consciousness directly with summoned fiends. Distributes incoming damage with Soul Link and executes Demonic Sacrifice for overwhelming personal surges.',
          spells: ['Soul Link', 'Demonic Sacrifice', 'Fel Domination', 'Master Demonologist'],
        },
        {
          name: 'Destruction',
          role: 'Volatile Chaos & Nether Fire',
          text: 'Calls down screaming cataclysms from the Nether. Incinerates foes with Shadow Bolt and Immolate, culminating in catastrophic Conflagrate detonations.',
          spells: ['Shadow Bolt', 'Immolate', 'Conflagrate', 'Shadowburn'],
        },
      ],
      note: 'As the enemy withers in agony, the warlock grows ever stronger. In this dark calculus, mercy is merely a fatal flaw.',
    },
    five: {
      title: 'Walkers of the Shadows & Hidden Covens',
      paragraphs: [
        'In no civilized realm may a warlock openly practice their dark arts. They gather in hidden subterranean grottos: beneath The Slaughtered Lamb tavern in Stormwind, or within the sulfurous shadows of Orgrimmar’s Cleft of Shadow.',
        'Though rulers publicly condemn their presence, monarchs and warchiefs quietly sanction their operations. When apocalyptic demonic horrors emerge, defeating the darkness requires those who have studied its darkest depths.',
        'The warlock walks the knife’s edge: command the Nether, or be reduced to ash within its flames.',
      ],
      figuresLabel: 'Infamous Dark Sorcerers',
      figures: [
        { name: 'Gul’dan', title: 'Lord of the Shadow Council', text: 'The treacherous orcish warlock whose thirst for godhood doomed his homeland and ignited the First War.' },
        { name: 'Cho’gall', title: 'Chieftain of the Twilight’s Hammer', text: 'Two-headed ogre mage-turned-warlock who fused demonic fel fire with the maddening whispers of the Old Gods.' },
        { name: 'Wilfred Fizzlebang', title: 'Master Summoner', text: 'The ambitious gnome summoner whose catastrophic miscalculation summoned Lord Jaraxxus to the tournament.' },
      ],
      note: 'Those who dance with fire will eventually burn; but until that day arrives, they can set the entire world ablaze.',
    },
    outro: {
      title: 'The Dark Legacy',
      text: 'To be a warlock is to climb toward supremacy upon the shattered bones of fear. Souls are your fuel, demons are your thralls, and the fel shall obey your command.',
      nextText: 'Heed the eternal song of the Emerald Dream in the Druid story.',
    },
  },
};

export const DRUID_STORY: Record<Lang, ClassStoryData> = {
  tr: {
    metaDescription: 'Druid sınıfının tarihi: Cenarius ve Malfurion, Emerald Dream’in derin uykusu, form değiştirme sanatları ve doğanın üç kutsal çemberi.',
    overline: 'Doğa, Emerald Dream ve Vahşi Formlar',
    lead: 'Ay ve güneşin gazabını çağıran, vahşi canavarların formuna bürünen ve toprağın yaralarını saran druid’ler, Azeroth’un yaşayan koruyucularıdır.',
    facts: [
      { label: 'Rol', value: 'Tank, Şifacı (Healer), Yakın ve Menzilli Hasar (Melee/Ranged DPS)' },
      { label: 'Birincil Kaynak', value: 'Mana (Büyücü), Öfke (Ayı Formu), Enerji (Kedi Formu)' },
      { label: 'Zırh Tipi', value: 'Deri (Leather)' },
      { label: 'İkonik Yetenekler', value: 'Bear Form, Cat Form, Moonkin Form, Rejuvenation, Innervate, Tranquility' },
      { label: 'Kutsal Çemberler', value: 'Cenarion Circle, Druids of the Claw, Druids of the Talon', extra: 'Moonglade, Barrow Dens' },
    ],
    chapters: {
      origin: 'Cenarius ve İlk Shan’do Malfurion',
      two: 'Emerald Dream ve Uzun Nöbet Uykusu',
      three: 'Vahşi Totemler ve Form Değiştirme Sanatı',
      four: 'Doğanın Üç Çemberi: Balance, Feral, Restoration',
      five: 'Cenarion Circle ve Yaralı Dünyanın İyileşmesi',
    },
    origin: {
      title: 'Yarı-Tanrı ve İlk Fani Öğrenci',
      titleNote: 'Shan’do Malfurion',
      paragraphs: [
        'On bin yıl önce, antik Kalimdor’da Highborne soyluları Well of Eternity’nin ham büyüsüne tapınırken, genç bir Night Elf farklı bir ses duydu: ormanların, ağaçların ve toprağın sessiz fısıltısını.',
        'Malfurion Stormrage, ormanların koruyucusu ve yarı-tanrı Cenarius’un huzuruna çıktı. Cenarius, Malfurion’un kalbindeki saf doğa sevgisini görerek onu Azeroth’un ilk fani druidi (Shan’do) olarak yetiştirdi.',
        'Great Sundering felaketi sırasında Kraliçe Azshara’nın çılgınlığı dünyayı parçalarken, Malfurion doğanın köklerini ve fırtınalarını çağırarak iblislere karşı durdu ve druidizmin yıkıcı Arcane büyüsünden çok daha kadim olduğunu kanıtladı.',
      ],
      stagesLabel: 'Druidizmin Doğuş Aşamaları',
      stages: [
        { name: 'Cenarius’un Öğretisi', text: 'Yarı-tanrının fani bir öğrenciye doğanın dilini ve döngüsünü öğretmesi.' },
        { name: 'Bitkilerle Konuşma', text: 'Kökleri, dalları ve sarmaşıkları iradeyle değil, dostça bir sevgiyle yönlendirme.' },
        { name: 'Sundering Direnişi', text: 'Burning Legion istilasına karşı doğanın öfkesini fırtınalarla savaşa sokma.' },
        { name: 'Nordrassil Yemini', text: 'Yeni Dünya Ağacı Nordrassil’in gölgesinde dünyayı korumaya ebedi yemin etme.' },
      ],
      note: 'Druid doğaya sahip olmaz; doğa druide kendi uzantısı gibi davranma ayrıcalığı tanır.',
    },
    two: {
      title: 'Emerald Dream ve Uzun Nöbet Uykusu',
      titleNote: 'The Long Vigil',
      paragraphs: [
        'Great Sundering’in ardından Ejderha Sureti Ysera, Azeroth’un fani uygarlıklar tarafından bozulmamış ilkel yeşil blueprint’i olan “Emerald Dream” (Zümrüt Rüya) boyutunu druid’lerin korumasına açtı.',
        'Malfurion ve Druids of the Claw tarikatı, Moonglade’deki Barrow Den yeraltı tapınaklarında derin bir meditatif uykuya daldı. Bu uyku bir kaçış değil, dünyadaki yaşam dengesini ruhani boyuttan gözeten on bin yıllık kutsal bir nöbetti.',
        'Rahipler ve Sentinels yüzeydeki ormanları korurken, uyuyan druid’ler rüya boyutundaki kabusları ve karanlık sızıntıları temizledi.',
      ],
      cardsLabel: 'Rüya ve Nöbet Boyutları',
      cards: [
        { name: 'Emerald Dream', text: 'Azeroth’un hiçbir baltanın dokunmadığı, kusursuz yeşil yansıması olan rüya boyutu.', status: 'Kutsal Boyut', tone: 'home' },
        { name: 'Barrow Dens', text: 'Druid’lerin asırlarca derin uykuya dalarak rüyayı koruduğu yeraltı tapınakları.', status: 'Uyku', tone: 'al' },
        { name: 'Ysera’nın Kutsaması', text: 'Yeşil Ejderha Sureti’nin druid ruhlarını rüya aleminde kanatları altına alması.', status: 'Lütuf', tone: 'ok' },
        { name: 'Nightmare Tehdidi', text: 'Rüya boyutunun derinliklerinde beliren karanlık kabusların sızıntısı.', status: 'Tehlike', tone: 'no' },
      ],
      note: 'Gözlerini dünyaya kapatan druid, ruhunu tüm Azeroth’un canlılığına açar.',
    },
    three: {
      title: 'Vahşi Totemler ve Form Değiştirme Sanatı',
      paragraphs: [
        'Druidi diğer tüm sınıflardan ayıran en büyük mucize, biçim değiştirme (Shapeshifting) yeteneğidir. Druid bir canavarı taklit etmez; antik Wild God’ların ruhunu kendi bedenine davet eder.',
        'Devasa ayı tanrısı Ursoc’un ruhuyla sarsılmaz bir zırha ve vahşi bir kükremeye kavuşur (Bear Form); panter tanrıçası Ashamane’in çevikliğiyle gölgelerde yürüyen ölümcül bir avcıya dönüşür (Cat Form).',
        'Elune’in lütfuyla devasa Moonkin formuna bürünerek gökyüzünden yıldızlar yağdırır, deniz aslanı formuyla okyanusların derinliklerinde nefes alır ve fırtına kargası olarak gökyüzünde süzülür.',
      ],
      cardsLabel: 'Kutsal Vahşi Formlar',
      cards: [
        { name: 'Bear Form', text: 'Ursoc’un sarsılmaz dayanıklılığı; darbeleri göğüsleyen aşılmaz bir kürk duvarı.', status: 'Tank', tone: 'home' },
        { name: 'Cat Form', text: 'Ashamane’in sessizliği; pençeler ve kanatan ısırıklarla gölgelerden pusu kurma.', status: 'Pusu', tone: 'ok' },
        { name: 'Moonkin Form', text: 'Elune’in kutsal kuşu; yıldız ve ay ışığıyla düşman ordularını kavuran bilge form.', status: 'Büyü', tone: 'al' },
        { name: 'Aquatic & Travel Form', text: 'Suda solungaçsız nefes alma ve karada rüzgâr gibi koşma yeteneği.', status: 'Uyum', tone: 'ok' },
      ],
      note: 'Form değiştirmek kostüm giymek değildir; içindeki vahşi doğayı serbest bırakıp onunla bir olmaktır.',
    },
    four: {
      title: 'Doğanın Üç Çemberi: Balance, Feral, Restoration',
      paragraphs: [
        'Druidizm doğanın üç temel yasasını temsil eder. Biri gökcisimlerinin döngüsünü, diğeri yeryüzündeki yırtıcıların vahşetini, üçüncüsü ise yeşeren yaprakların şifasını kucaklar.',
      ],
      specsLabel: 'Druid Uzmanlıkları',
      specs: [
        {
          name: 'Balance',
          role: 'Ay, Güneş ve Yıldız Gazabı',
          text: 'Gece ve gündüzün kozmik dengesini yönetir. Moonkin Form’a girerek Starfire ve Wrath ile düşmanı ezer, Hurricane ile fırtınalar koparır.',
          spells: ['Moonkin Form', 'Starfire', 'Wrath', 'Hurricane'],
        },
        {
          name: 'Feral Combat',
          role: 'Ayı Dayanıklılığı ve Kedi Çevikliği',
          text: 'Vahşi doğanın iki büyük avcısını bedeninde birleştirir. Ayı formunda ölümcül darbeleri göğüsler, Kedi formunda ise yırtıcı pençeleriyle düşmanı parçalar.',
          spells: ['Feral Charge', 'Faerie Fire (Feral)', 'Leader of the Pack', 'Mangle'],
        },
        {
          name: 'Restoration',
          role: 'Yaşam Ağacı ve Tükenmeyen Şifa',
          text: 'Doğanın canlandırıcı pınarlarını serbest bırakır. Rejuvenation ve Regrowth ile zamana yayılan kesintisiz şifa sağlar, Tranquility ile tüm orduyu iyileştirir.',
          spells: ['Rejuvenation', 'Regrowth', 'Innervate', 'Tranquility'],
        },
      ],
      note: 'Bir yaprak solar, bir diğeri yeşerir; denge bozulmadığı sürece yaşam daima ölümden galip çıkar.',
    },
    five: {
      title: 'Cenarion Circle ve Yaralı Dünyanın İyileşmesi',
      paragraphs: [
        'Moonglade’in kutsal suları etrafında kurulan Cenarion Circle, yüzyıllar boyunca yalnızca Night Elf erkeklerine açık bir cemiyetti. Ancak değişen dünya kuralları yıktı.',
        'Archdruid Malfurion Stormrage, kadınların da çembere katılmasına izin verdi. Daha da önemlisi, Tauren şamanı Hamuul Runetotem’i ilk Tauren druidi olarak eğitti ve doğa koruyuculuğunu iki halkın ortak mirasına dönüştürdü.',
        'Bugün bir druid, yozlaşmış toprakları arındıran, nesli tükenen yaratıkları koruyan ve yaralı Azeroth’un kalbine can veren en kadim hekimdir.',
      ],
      figuresLabel: 'Efsanevi Doğa Muhafızları',
      figures: [
        { name: 'Malfurion Stormrage', title: 'İlk Shan’do · Archdruid', text: 'Cenarius’un ilk öğrencisi, Night Elf halkının koruyucusu ve Azeroth’un gelmiş geçmiş en güçlü druidi.' },
        { name: 'Archdruid Fandral Staghelm', title: 'Archdruid of Darnassus', text: 'Teldrassil’i diken, dik başlı ve gururlu duruşuyla druidizme yön veren güçlü önder.' },
        { name: 'Hamuul Runetotem', title: 'Archdruid of Thunder Bluff', text: 'Malfurion’un ilk Tauren öğrencisi; halkına druidizm öğretisini kazandıran kadim dost.' },
      ],
      note: 'Son ağaç kesilene, son nehir kuruyana kadar druid’lerin nöbeti asla bitmeyecektir.',
    },
    outro: {
      title: 'Doğanın Ebedi Döngüsü',
      text: 'Druid olmak, dünyanın nefesini kendi göğsünde hissetmek ve köklerin bilgeliğine güvenmektir. Rüyalar seni korusun, doğa yolunu aydınlatsın.',
      nextText: 'Arcane ve kadim sırların ustası olan Mage’lerin hikayesine geri dön.',
    },
  },
  en: {
    metaDescription: 'The history of the Druid class: Cenarius and Malfurion, the slumber of the Emerald Dream, primal shapeshifting, and the three sacred circles of nature.',
    overline: 'Nature, The Emerald Dream & Primal Forms',
    lead: 'Calling down the wrath of sun and stars, assuming the ferocious mantle of apex predators, and nurturing the wounded earth, druids stand as the living guardians of Azeroth.',
    facts: [
      { label: 'Role', value: 'Tank, Healer, Melee/Ranged Hybrid Damage (DPS)' },
      { label: 'Primary Resource', value: 'Mana (Caster), Rage (Bear), Energy (Cat)' },
      { label: 'Armor Type', value: 'Leather' },
      { label: 'Iconic Abilities', value: 'Bear Form, Cat Form, Moonkin Form, Rejuvenation, Innervate, Tranquility' },
      { label: 'Sacred Circles', value: 'Cenarion Circle, Druids of the Claw, Druids of the Talon', extra: 'Moonglade, Barrow Dens' },
    ],
    chapters: {
      origin: 'Cenarius & Shan’do Malfurion',
      two: 'The Emerald Dream & The Long Vigil',
      three: 'Primal Totems & The Art of Shapeshifting',
      four: 'Three Circles of Nature: Balance, Feral, Restoration',
      five: 'The Cenarion Circle & World Restoration',
    },
    origin: {
      title: 'The Demigod & The First Mortal Pupil',
      titleNote: 'Shan’do Malfurion',
      paragraphs: [
        'Ten thousand years ago in primeval Kalimdor, while Highborne aristocrats recklessly plumbed the depths of the Well of Eternity, a young Night Elf heard a vastly different voice: the quiet, steady murmur of root, river, and loam.',
        'Malfurion Stormrage sought out Cenarius, the demigod patron of the woodlands. Recognizing the youth’s profound spiritual reverence for the living world, Cenarius instructed him as the very first mortal druid—Shan’do—of Azeroth.',
        'When Queen Azshara’s hubris tore open rifts for the Burning Legion during the Great Sundering, Malfurion mobilized root tangles, gale-force tempests, and primal nature to shatter demonic legions, establishing that druidism outlived all mortal empires.',
      ],
      stagesLabel: 'Genesis of Druidism',
      stages: [
        { name: 'Cenarius’s Tutelage', text: 'The forest demigod instructs a mortal mind in the sacred grammar of nature.' },
        { name: 'Communing with Flora', text: 'Guiding branches and roots through affectionate kinship rather than imperialist coercion.' },
        { name: 'Sundering Resistance', text: 'Mobilizing nature’s untamed fury against demonic vanguards during the cataclysm.' },
        { name: 'Vow of Nordrassil', text: 'Swearing an eternal covenant beneath the boughs of the newly consecrated World Tree.' },
      ],
      note: 'A druid does not own the natural world; nature graciously extends the privilege of acting as its living instrument.',
    },
    two: {
      title: 'The Emerald Dream & The Long Vigil',
      titleNote: 'The Long Vigil',
      paragraphs: [
        'Following the Sundering, the Dragon Aspect Ysera consecrated the World Tree Nordrassil, binding druids to the Emerald Dream—the pristine, untouched primeval blueprint of Azeroth.',
        'Malfurion and the Druids of the Claw retired to the subterranean Barrow Dens of Moonglade, entering millennia of deep restorative hibernation. This slumber was no cowardly abdication; it was an active ten-thousand-year spiritual vigil safeguarding planetary equilibrium from within the Dream.',
        'While priestesses and sentinels patrolled moonlit canopies above, sleeping druids pruned creeping nightmares and shadowy corruptions festering beneath the ethereal canopy.',
      ],
      cardsLabel: 'The Dream & The Vigil',
      cards: [
        { name: 'The Emerald Dream', text: 'Azeroth’s verdant, primeval mirror realm unblemished by mortal axes and stone cities.', status: 'Dream Realm', tone: 'home' },
        { name: 'The Barrow Dens', text: 'Subterranean barrows where generations of druids slept to maintain spiritual guardianship.', status: 'Hibernation', tone: 'al' },
        { name: 'Ysera’s Blessing', text: 'The Green Dragon Aspect sheltering mortal dreamers beneath her emerald wings.', status: 'Benediction', tone: 'ok' },
        { name: 'Nightmare Tendrils', text: 'Insidious tendrils of shadow corrupting the peaceful borders of the verdant Dream.', status: 'Threat', tone: 'no' },
      ],
      note: 'Closing their eyes to the waking world, the druid awakens their soul to the boundless vitality of Azeroth.',
    },
    three: {
      title: 'Primal Totems & The Art of Shapeshifting',
      paragraphs: [
        'What elevates the druid beyond all other disciplines is the profound miracle of shapeshifting. A druid does not merely mimic an animal; they invite the primal spirit of ancient Wild Gods to inhabit their physical form.',
        'Channeling the ancient bear god Ursoc grants an impenetrable wall of fur, muscle, and roaring defiance (Bear Form); assuming the panther spirit of Ashamane yields the silent lethality of an apex predator (Cat Form).',
        'By Elune’s grace, assuming the mighty Moonkin form rains radiant lunar starlight upon enemy lines, while aquatic sea-lion forms and stormcrow wings command the depths and skies.',
      ],
      cardsLabel: 'Sacred Primal Avatars',
      cards: [
        { name: 'Bear Form', text: 'Ursoc’s unyielding bulk; absorbing crushing blows upon dense muscle and thick fur.', status: 'Tank', tone: 'home' },
        { name: 'Cat Form', text: 'Ashamane’s silent stalk; raking claws and ferocious bites delivered from stealth.', status: 'Predator', tone: 'ok' },
        { name: 'Moonkin Form', text: 'Elune’s sacred celestial form channeling starfire and tempestuous lunar hurricanes.', status: 'Balance', tone: 'al' },
        { name: 'Aquatic & Travel', text: 'Slicing through oceanic depths without breathing and racing like the wind on land.', status: 'Adaptation', tone: 'ok' },
      ],
      note: 'Shapeshifting is no superficial costume; it is surrendering human vanity to become one with the beast within.',
    },
    four: {
      title: 'Three Circles of Nature: Balance, Feral, Restoration',
      paragraphs: [
        'Druidism encompasses the three supreme laws of the living world: the celestial orbit of heavenly bodies, the red-in-tooth-and-claw reality of predators, and the gentle sprouting of life.',
      ],
      specsLabel: 'Druid Specializations',
      specs: [
        {
          name: 'Balance',
          role: 'Celestial Moon & Solar Wrath',
          text: 'Harmonizes the cosmic dance of day and night. Assuming Moonkin Form, calls down devastating Starfire and Wrath while summoning localized Hurricanes.',
          spells: ['Moonkin Form', 'Starfire', 'Wrath', 'Hurricane'],
        },
        {
          name: 'Feral Combat',
          role: 'Apex Predator & Indomitable Guardian',
          text: 'Fuses the ferocity of the great cat with the durability of the iron bear. Rakes and shreds adversaries in Cat Form while locking down threats in Bear Form.',
          spells: ['Feral Charge', 'Faerie Fire (Feral)', 'Leader of the Pack', 'Mangle'],
        },
        {
          name: 'Restoration',
          role: 'Perpetual Growth & Healing Rains',
          text: 'Channels the invigorating sap of the World Tree. Sustains allies across protracted engagements with Rejuvenation and Regrowth, culminating in Tranquility.',
          spells: ['Rejuvenation', 'Regrowth', 'Innervate', 'Tranquility'],
        },
      ],
      note: 'A single leaf withers, yet another buds beside it. So long as equilibrium holds, life shall always conquer death.',
    },
    five: {
      title: 'The Cenarion Circle & World Restoration',
      paragraphs: [
        'Founded around the sacred waters of Moonglade, the Cenarion Circle remained exclusive to night elven men for ten thousand years. Yet the shifting realities of modern Azeroth dismantled ancient taboos.',
        'Archdruid Malfurion Stormrage opened the circle to women and personally mentored the Tauren elder Hamuul Runetotem, establishing the first Tauren druid in recorded history and uniting both peoples in environmental stewardship.',
        'Today, a druid is an indispensable healer who purifies blighted wastelands, shelters endangered wildlife, and ministers directly to the wounded World Soul.',
      ],
      figuresLabel: 'Archdruids of the Circle',
      figures: [
        { name: 'Malfurion Stormrage', title: 'First Shan’do · Supreme Archdruid', text: 'Cenarius’s first mortal pupil and the most powerful druid in history who repeatedly saved Azeroth from annihilation.' },
        { name: 'Archdruid Fandral Staghelm', title: 'Archdruid of Darnassus', text: 'The proud and stubborn leader who planted Teldrassil to restore immortality to his people.' },
        { name: 'Hamuul Runetotem', title: 'Archdruid of Thunder Bluff', text: 'Malfurion’s revered Tauren disciple who restored druidism to his nomadic people and forged lasting peace.' },
      ],
      note: 'Until the final tree is felled and the final stream runs dry, the sacred vigil of the druid shall never end.',
    },
    outro: {
      title: 'The Unbroken Cycle',
      text: 'To be a druid is to feel the breath of the living cosmos within your lungs and trust the eternal roots beneath your feet. Walk in harmony with the wild.',
      nextText: 'Return to the beginning and uncover the Arcane mysteries of the Mage.',
    },
  },
};

// All available class stories by slug
export const CLASS_STORIES: Record<string, Record<Lang, ClassStoryData>> = {
  mage: MAGE_STORY,
  hunter: HUNTER_STORY,
  paladin: PALADIN_STORY,
  warrior: WARRIOR_STORY,
  rogue: ROGUE_STORY,
  priest: PRIEST_STORY,
  shaman: SHAMAN_STORY,
  warlock: WARLOCK_STORY,
  druid: DRUID_STORY,
};

