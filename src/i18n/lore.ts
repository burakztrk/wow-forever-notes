import type { Lang } from '../config';

// Lore cards for the proper names in the race stories: hovering (or tapping) a name in the
// story text shows who or what it is. Names stay English in both languages, as everywhere on
// the site; `aliases` are the exact spellings the story copy uses (src/i18n/stories.ts), longest
// match first, and `icon` is a file in public/icons. Matching lives in src/lib/stories/lore.ts.

export interface LoreText {
  /** Role line under the name. */
  sub: string;
  text: string;
  /** Muted line at the bottom: where to find it in the game, when there is one. */
  note?: string;
}

export interface LoreEntry {
  id: string;
  name: string;
  icon: string;
  aliases: string[];
  tr: LoreText;
  en: LoreText;
}

export const LORE_UI: Record<Lang, { inGame: string }> = {
  tr: { inGame: 'Oyunda' },
  en: { inGame: 'In game' },
};

export const LORE: LoreEntry[] = [
  // ---------------------------------------------------------------- people
  {
    id: 'thoradin',
    name: 'Thoradin',
    icon: 'ability_warrior_battleshout',
    aliases: ['Thoradin'],
    tr: {
      sub: 'Arathi şefi · Arathor’un kurucusu',
      text: 'Arathi kabilesinin şefi. Dark Portal’dan yaklaşık 2.800 yıl önce insan kabilelerini birleştirip Strom’u kurdu ve ilk insan ulusu Arathor’u ilan etti. Troll Wars’da elf’lerle birlikte Amani’yi yendi. Anduin Lothar onun soyundan gelen son kişiydi.',
    },
    en: {
      sub: 'Arathi chieftain · founder of Arathor',
      text: 'Chieftain of the Arathi tribe. About 2,800 years before the Dark Portal he united the human tribes, built Strom and declared Arathor, the first human nation. With the elves he defeated the Amani in the Troll Wars. Anduin Lothar was the last of his line.',
    },
  },
  {
    id: 'lothar',
    name: 'Anduin Lothar',
    icon: 'classicon_warrior',
    aliases: ['Anduin Lothar', 'Lothar'],
    tr: {
      sub: 'Stormwind şampiyonu · Arathi soyunun son temsilcisi',
      text: 'King Llane’in çocukluk arkadaşı ve komutanı. First War’da Stormwind’i savundu, şehir düşünce hayatta kalanları Lordaeron’a taşıdı. Alliance of Lordaeron’un başkomutanı oldu ve Second War’da Blackrock Spire önünde Orgrim Doomhammer’la dövüşürken öldü. “Lion of Azeroth” olarak anılır.',
    },
    en: {
      sub: 'Champion of Stormwind · last of the Arathi line',
      text: 'King Llane’s childhood friend and champion. He defended Stormwind in the First War and, when the city fell, took the survivors to Lordaeron. He became supreme commander of the Alliance of Lordaeron and died before Blackrock Spire in the Second War, fighting Orgrim Doomhammer. He is remembered as the Lion of Azeroth.',
    },
  },
  {
    id: 'medivh',
    name: 'Medivh',
    icon: 'classicon_mage',
    aliases: ['Medivh'],
    tr: {
      sub: 'Son Guardian of Tirisfal',
      text: 'Karazhan kulesinde yaşayan güçlü büyücü. İçinde Burning Legion’ın efendisi Sargeras’ın ruhu saklıydı; onun etkisiyle Horde’u Azeroth’a getiren Dark Portal’ın açılmasına yardım etti. First War’da Karazhan’da öldürüldü. Third War’da gizemli bir peygamber olarak geri döndü ve insanları batıya, Kalimdor’a yönlendirdi.',
    },
    en: {
      sub: 'The last Guardian of Tirisfal',
      text: 'A powerful mage who lived in the tower of Karazhan. The spirit of Sargeras, master of the Burning Legion, hid inside him, and under its sway he helped open the Dark Portal that brought the Horde to Azeroth. He was slain in Karazhan during the First War. In the Third War he returned as a mysterious prophet and sent the humans west to Kalimdor.',
    },
  },
  {
    id: 'guldan',
    name: 'Gul’dan',
    icon: 'classicon_warlock',
    aliases: ['Gul’dan'],
    tr: {
      sub: 'Orc warlock’u · Shadow Council',
      text: 'Draenor’daki orc’ları demon büyüsüyle yozlaştıran warlock. Medivh’le birlikte Dark Portal’ı açtı. Second War’ın ortasında Horde’u terk edip Tomb of Sargeras’ın peşine düştü; bu ihanet Horde’u zayıflattı ve Gul’dan o yolculukta öldü.',
    },
    en: {
      sub: 'Orc warlock · the Shadow Council',
      text: 'The warlock who corrupted the orcs of Draenor with demonic magic. With Medivh he opened the Dark Portal. In the middle of the Second War he abandoned the Horde to seek the Tomb of Sargeras; the betrayal weakened the Horde, and Gul’dan died on that journey.',
    },
  },
  {
    id: 'khadgar',
    name: 'Khadgar',
    icon: 'spell_arcane_teleporthalloftheguardian',
    aliases: ['Khadgar'],
    tr: {
      sub: 'Medivh’in çırağı',
      text: 'Kirin Tor’un Karazhan’a gönderdiği genç büyücü. Ustası Medivh’in ihanetini fark etti ve Lothar’la birlikte onu durdurdu. Second War’da Alliance’ın baş büyücülerindendi; savaştan sonra Dark Portal’ın öte yanına, Draenor’a geçti.',
    },
    en: {
      sub: 'Medivh’s apprentice',
      text: 'The young mage the Kirin Tor sent to Karazhan. He saw through his master Medivh and stopped him together with Lothar. He was one of the Alliance’s leading mages in the Second War, and after it he crossed the Dark Portal to Draenor.',
    },
  },
  {
    id: 'garona',
    name: 'Garona',
    icon: 'ability_rogue_eviscerate',
    aliases: ['Garona'],
    tr: {
      sub: 'Yarı-orc casus',
      text: 'Horde’un Medivh’in yanına elçi olarak gönderdiği yarı-orc kadın. Lothar ve Khadgar’la birlikte Medivh’e karşı savaştı, ama Gul’dan’ın kontrolü altında King Llane’i öldürdü ve Stormwind’in düşüşünü hızlandırdı.',
    },
    en: {
      sub: 'Half-orc spy',
      text: 'The half-orc woman the Horde sent to Medivh as an envoy. She fought Medivh alongside Lothar and Khadgar, but under Gul’dan’s control she killed King Llane and hastened the fall of Stormwind.',
    },
  },
  {
    id: 'llane',
    name: 'Llane Wrynn',
    icon: 'race_human_male',
    aliases: ['Llane Wrynn', 'Llane'],
    tr: {
      sub: 'Azeroth krallığının kralı',
      text: 'First War sırasında Stormwind’in kralı; Varian’ın babası, Lothar’ın ve Medivh’in çocukluk arkadaşı. Horde’a karşı direnirken Garona tarafından öldürüldü ve ölümüyle Stormwind düştü.',
    },
    en: {
      sub: 'King of Azeroth',
      text: 'King of Stormwind during the First War; Varian’s father and the childhood friend of Lothar and Medivh. He was killed by Garona while holding out against the Horde, and with his death Stormwind fell.',
    },
  },
  {
    id: 'varian',
    name: 'Varian Wrynn',
    icon: 'ability_warrior_warcry',
    aliases: ['Varian Wrynn', 'Varian'],
    tr: {
      sub: 'Stormwind kralı · kayıp',
      text: 'King Llane’in oğlu. Babası öldürüldüğünde çocuktu; Lothar onu Lordaeron’a götürdü ve orada büyüdü. Second War’dan sonra yeniden kurulan Stormwind’in tahtına oturdu. Theramore’daki barış görüşmesine giderken ortadan kayboldu; nerede olduğunu kimse bilmiyor.',
    },
    en: {
      sub: 'King of Stormwind · missing',
      text: 'King Llane’s son. He was a child when his father was killed; Lothar took him to Lordaeron, where he grew up. After the Second War he took the throne of the rebuilt Stormwind. He vanished on his way to peace talks in Theramore, and no one knows where he is.',
    },
  },
  {
    id: 'anduin',
    name: 'Anduin Wrynn',
    icon: 'classicon_priest',
    aliases: ['Anduin Wrynn', 'Anduin'],
    tr: {
      sub: 'Stormwind’in çocuk kralı',
      text: 'Varian’ın oğlu; adını babasını yetiştiren Anduin Lothar’dan alır. Babası kaybolunca çok genç yaşta tahta çıktı. Büyüyene kadar krallığı onun adına Highlord Bolvar Fordragon yönetiyor.',
      note: 'Stormwind Keep',
    },
    en: {
      sub: 'The boy king of Stormwind',
      text: 'Varian’s son, named after Anduin Lothar, who raised his father. He came to the throne very young when his father vanished. Until he comes of age, Highlord Bolvar Fordragon rules the kingdom in his name.',
      note: 'Stormwind Keep',
    },
  },
  {
    id: 'terenas',
    name: 'Terenas Menethil II',
    icon: 'spell_holy_sealofmight',
    aliases: ['King Terenas Menethil II', 'Terenas Menethil II', 'Terenas'],
    tr: {
      sub: 'Lordaeron kralı',
      text: 'En büyük insan krallığı Lordaeron’un kralı. First War’dan sonra Lothar’ın uyarısıyla insan krallıklarını toplayıp Alliance of Lordaeron’u kurdu. Third War’da Northrend’den dönen kendi oğlu Arthas tarafından taht odasında öldürüldü.',
    },
    en: {
      sub: 'King of Lordaeron',
      text: 'King of Lordaeron, the greatest human kingdom. After the First War, warned by Lothar, he gathered the human kingdoms and founded the Alliance of Lordaeron. In the Third War he was killed in his throne room by his own son Arthas, back from Northrend.',
    },
  },
  {
    id: 'turalyon',
    name: 'Turalyon',
    icon: 'spell_holy_holybolt',
    aliases: ['Turalyon'],
    tr: {
      sub: 'Silver Hand paladini · Alliance komutanı',
      text: 'Lothar’ın yardımcısı olan genç paladin; Knights of the Silver Hand’in ilk üyelerinden. Lothar Blackrock Spire’da düşünce komutayı aldı ve Second War’ı kazandı. Savaştan sonra Dark Portal’dan Draenor’a geçen sefere katıldı ve geri dönmedi.',
    },
    en: {
      sub: 'Paladin of the Silver Hand · Alliance commander',
      text: 'Lothar’s young second-in-command and one of the first Knights of the Silver Hand. When Lothar fell at Blackrock Spire he took command and won the Second War. After the war he joined the expedition through the Dark Portal to Draenor and never came back.',
    },
  },
  {
    id: 'doomhammer',
    name: 'Orgrim Doomhammer',
    icon: 'inv_hammer_04',
    aliases: ['Orgrim Doomhammer', 'Doomhammer'],
    tr: {
      sub: 'Horde’un warchief’i',
      text: 'First War’da önceki warchief Blackhand’i öldürüp Horde’un başına geçti ve Stormwind’i yıktı. Second War’da Horde’u yönetti; Blackrock Spire önünde Lothar’ı öldürdü ama savaşı kaybetti ve esir düştü.',
    },
    en: {
      sub: 'Warchief of the Horde',
      text: 'In the First War he killed the warchief Blackhand, took the Horde for himself and destroyed Stormwind. He led the Horde in the Second War and killed Lothar before Blackrock Spire, but he lost the war and was taken prisoner.',
    },
  },
  {
    id: 'perenolde',
    name: 'Aiden Perenolde',
    icon: 'inv_misc_coin_01',
    aliases: ['Aiden Perenolde', 'Perenolde'],
    tr: {
      sub: 'Alterac lordu',
      text: 'Alterac krallığının hükümdarı. Second War’da krallığını korumak için Horde’la gizlice anlaştı ve Alliance’a ihanet etti. İhanet ortaya çıkınca tutuklandı ve Alterac, Lordaeron’un yönetimine geçti. Alterac soylularının bir kısmı bugün Syndicate’i oluşturuyor.',
    },
    en: {
      sub: 'Lord of Alterac',
      text: 'Ruler of the kingdom of Alterac. In the Second War he made a secret deal with the Horde to save his kingdom and betrayed the Alliance. When it came out he was arrested and Alterac was placed under Lordaeron’s rule. Some of Alterac’s nobles now make up the Syndicate.',
    },
  },
  {
    id: 'greymane',
    name: 'Genn Greymane',
    icon: 'race_human_male',
    aliases: ['Genn Greymane'],
    tr: {
      sub: 'Gilneas kralı',
      text: 'Gilneas’ın gururlu ve inatçı kralı. Second War’dan sonra toplama kamplarının vergilerini ödemeyi reddedip Alliance’tan ayrıldı ve krallığını Greymane Wall’la dünyaya kapattı. O günden beri Gilneas’tan haber gelmiyor.',
    },
    en: {
      sub: 'King of Gilneas',
      text: 'The proud and stubborn king of Gilneas. After the Second War he refused to pay for the internment camps, left the Alliance and shut his kingdom off from the world behind the Greymane Wall. No word has come out of Gilneas since.',
    },
  },
  {
    id: 'trollbane',
    name: 'Thoras Trollbane',
    icon: 'inv_axe_09',
    aliases: ['Thoras Trollbane'],
    tr: {
      sub: 'Stromgarde kralı',
      text: 'Arathor’un eski başkenti Strom’un, yani Stromgarde’ın kralı. Second War’da Lothar’ın yakın dostu ve Alliance’ın en sadık savaşçılarındandı. Savaştan sonra Alterac topraklarının Stromgarde’a verilmemesine kızıp Alliance’tan çekildi.',
    },
    en: {
      sub: 'King of Stromgarde',
      text: 'King of Stromgarde, the old Arathi capital of Strom. In the Second War he was a close friend of Lothar and one of the Alliance’s most loyal fighters. After the war, angry that Alterac’s lands were not given to Stromgarde, he withdrew from the Alliance.',
    },
  },
  {
    id: 'daelin',
    name: 'Daelin Proudmoore',
    icon: 'trade_fishing',
    aliases: ['Daelin Proudmoore'],
    tr: {
      sub: 'Kul Tiras’ın Lord Admiral’i',
      text: 'Kul Tiras’ın hükümdarı ve Alliance donanmasının komutanı; Jaina’nın babası. Second War’da orc’larla savaşırken büyük oğlunu kaybetti ve orc’lara karşı derin bir nefret besledi. Third War’dan sonra Kalimdor’daki Horde’a saldırdı ve bu savaşta öldü.',
    },
    en: {
      sub: 'Lord Admiral of Kul Tiras',
      text: 'Ruler of Kul Tiras, commander of the Alliance fleet and Jaina’s father. He lost his eldest son fighting the orcs in the Second War and nursed a deep hatred of them. After the Third War he attacked the Horde in Kalimdor and died in that fighting.',
    },
  },
  {
    id: 'arthas',
    name: 'Arthas Menethil',
    icon: 'spell_shadow_deathcoil',
    aliases: ['Arthas Menethil', 'Arthas'],
    tr: {
      sub: 'Lordaeron veliahtı · Lich King’in şövalyesi',
      text: 'King Terenas’ın oğlu ve Uther’in öğrencisi olan paladin. Vebayı durdurmak isterken Stratholme’u arındırdı, sonra Northrend’de Frostmourne’u alıp Lich King’in hizmetine girdi. Lordaeron’a dönüp babasını öldürdü ve krallığı Scourge’a teslim etti.',
    },
    en: {
      sub: 'Crown prince of Lordaeron · the Lich King’s knight',
      text: 'King Terenas’s son and a paladin trained by Uther. Trying to stop the plague, he purged Stratholme, then took up Frostmourne in Northrend and entered the Lich King’s service. He came home, killed his father and handed the kingdom to the Scourge.',
    },
  },
  {
    id: 'jaina',
    name: 'Jaina Proudmoore',
    icon: 'spell_frost_frostbolt02',
    aliases: ['Jaina Proudmoore', 'Jaina'],
    tr: {
      sub: 'Kirin Tor büyücüsü · Theramore’un kurucusu',
      text: 'Lord Admiral Daelin Proudmoore’un kızı, Dalaran’da yetişmiş genç büyücü. Arthas’la vebanın izini sürdü ama Stratholme’da ondan ayrıldı. Hayatta kalanları Kalimdor’a götürdü, Mount Hyjal’da savaştı ve Dustwallow Marsh kıyısında Theramore’u kurdu.',
      note: 'Theramore, Dustwallow Marsh',
    },
    en: {
      sub: 'Mage of the Kirin Tor · founder of Theramore',
      text: 'Daughter of Lord Admiral Daelin Proudmoore and a young mage trained in Dalaran. She tracked the plague with Arthas but left him at Stratholme. She led the survivors to Kalimdor, fought at Mount Hyjal and founded Theramore on the coast of Dustwallow Marsh.',
      note: 'Theramore, Dustwallow Marsh',
    },
  },
  {
    id: 'uther',
    name: 'Uther the Lightbringer',
    icon: 'spell_holy_layonhands',
    aliases: ['Uther'],
    tr: {
      sub: 'Knights of the Silver Hand’in lideri',
      text: 'İlk paladin tarikatı Knights of the Silver Hand’in kurucularından ve lideri; Arthas’ın hocası. Stratholme’u arındırma emrine karşı çıktı ve Arthas’tan ayrıldı. Arthas Scourge’la döndüğünde ona karşı savaştı ve öldü.',
      note: 'Uther’s Tomb, Western Plaguelands',
    },
    en: {
      sub: 'Leader of the Knights of the Silver Hand',
      text: 'One of the founders and the leader of the Knights of the Silver Hand, the first order of paladins, and Arthas’s teacher. He opposed the order to purge Stratholme and broke with Arthas. When Arthas returned with the Scourge, Uther fought him and died.',
      note: 'Uther’s Tomb, Western Plaguelands',
    },
  },
  {
    id: 'kelthuzad',
    name: 'Kel’Thuzad',
    icon: 'spell_shadow_darksummoning',
    aliases: ['Kel’Thuzad'],
    tr: {
      sub: 'Cult of the Damned’ın kurucusu',
      text: 'Kirin Tor üyesiyken yasak ölü büyüsüne yönelen ve onlardan ayrılan büyücü. Lich King’in hizmetine girip Cult of the Damned’ı kurdu ve Lordaeron’a vebalı tahılı yaydı. Arthas onu Andorhal’da öldürdü; Kel’Thuzad bir lich olarak geri getirildi ve Burning Legion’ı Dalaran’a çağırdı.',
    },
    en: {
      sub: 'Founder of the Cult of the Damned',
      text: 'A member of the Kirin Tor who turned to forbidden necromancy and left them. He entered the Lich King’s service, founded the Cult of the Damned and spread the tainted grain across Lordaeron. Arthas killed him at Andorhal; he was raised again as a lich and called the Burning Legion to Dalaran.',
    },
  },
  {
    id: 'archimonde',
    name: 'Archimonde',
    icon: 'spell_shadow_demonictactics',
    aliases: ['Archimonde'],
    tr: {
      sub: 'Burning Legion komutanı',
      text: 'Sargeras’ın Burning Legion’daki baş komutanlarından biri. Third War’da Kel’Thuzad’ın çağrısıyla Azeroth’a geldi ve Dalaran’ı yerle bir etti. Mount Hyjal’da World Tree’ye ulaşmaya çalışırken yenildi ve öldü.',
    },
    en: {
      sub: 'Commander of the Burning Legion',
      text: 'One of Sargeras’s chief commanders in the Burning Legion. In the Third War he came to Azeroth at Kel’Thuzad’s call and levelled Dalaran. He was defeated and killed at Mount Hyjal while trying to reach the World Tree.',
    },
  },
  {
    id: 'sargeras',
    name: 'Sargeras',
    icon: 'spell_shadow_curseofsargeras',
    aliases: ['Sargeras'],
    tr: {
      sub: 'Burning Legion’ın efendisi',
      text: 'Bir zamanlar Titan’ların koruyucusuyken yozlaşan ve Burning Legion’ı kuran düşmüş Titan. Ruhunu Medivh’in içine gizleyerek Dark Portal’ın açılmasına yol açtı.',
    },
    en: {
      sub: 'Master of the Burning Legion',
      text: 'A fallen Titan, once the Titans’ champion, who turned and founded the Burning Legion. By hiding his spirit inside Medivh he brought about the opening of the Dark Portal.',
    },
  },
  {
    id: 'bolvar',
    name: 'Bolvar Fordragon',
    icon: 'classicon_paladin',
    aliases: ['Highlord Bolvar Fordragon', 'Bolvar Fordragon', 'Bolvar'],
    tr: {
      sub: 'Highlord · Stormwind’in kral vekili',
      text: 'Stormwind’in en saygın paladin komutanı ve King Varian’ın güvendiği adamlardan biri. Varian ortadan kaybolunca, oğlu Anduin büyüyene kadar krallığı onun adına yönetmek için tahtın vekili oldu. Kararlarını Stormwind Keep’teki taht salonundan veriyor.',
      note: 'Stormwind Keep',
    },
    en: {
      sub: 'Highlord · regent of Stormwind',
      text: 'Stormwind’s most respected paladin commander and one of King Varian’s trusted men. When Varian vanished he became regent, ruling in the name of Varian’s son Anduin until the boy comes of age. He holds court in the throne room of Stormwind Keep.',
      note: 'Stormwind Keep',
    },
  },
  {
    id: 'prestor',
    name: 'Katrana Prestor',
    icon: 'inv_jewelry_talisman_03',
    aliases: ['Lady Katrana Prestor', 'Katrana Prestor'],
    tr: {
      sub: 'Saray danışmanı',
      text: 'Stormwind sarayında Bolvar’ın yanında duran soylu hanım. Kökeni hakkında kimse bir şey bilmiyor, ama House of Nobles üzerinde büyük etkisi var; Varian’ın kayboluşundan sonra sözü daha da ağırlaştı.',
      note: 'Stormwind Keep',
    },
    en: {
      sub: 'Adviser at court',
      text: 'The noblewoman at Bolvar’s side in Stormwind’s court. No one knows where she comes from, yet she holds great sway over the House of Nobles, and her word has carried more weight since Varian vanished.',
      note: 'Stormwind Keep',
    },
  },
  {
    id: 'vancleef',
    name: 'Edwin VanCleef',
    icon: 'ability_rogue_ambush',
    aliases: ['Edwin VanCleef', 'VanCleef'],
    tr: {
      sub: 'Defias Brotherhood’un lideri',
      text: 'Stormwind’i yeniden inşa eden Stonemasons’ Guild’in ustabaşı. House of Nobles ücretlerini ödemeyince ustalarla birlikte şehirden ayrıldı ve Westfall’da Defias Brotherhood’u kurdu. Amacı Stormwind’den intikam almak.',
      note: 'Deadmines, Westfall',
    },
    en: {
      sub: 'Leader of the Defias Brotherhood',
      text: 'Master of the Stonemasons’ Guild that rebuilt Stormwind. When the House of Nobles would not pay, he left the city with his masons and founded the Defias Brotherhood in Westfall. He wants revenge on Stormwind.',
      note: 'Deadmines, Westfall',
    },
  },
  {
    id: 'ymiron',
    name: 'Ymiron',
    icon: 'spell_frost_frostarmor02',
    aliases: ['Ymiron'],
    tr: {
      sub: 'Vrykul kralı',
      text: 'Northrend’deki vrykul’ların kralı. Curse of Flesh yüzünden vrykul’lar küçük ve zayıf bebekler doğurmaya başlayınca bu çocukların öldürülmesini emretti. Saklanıp kurtulan çocuklar insanların ataları oldu.',
    },
    en: {
      sub: 'King of the vrykul',
      text: 'King of the vrykul of Northrend. When the Curse of Flesh made vrykul mothers bear small, weak babies, he ordered those children killed. The ones hidden and saved became the ancestors of humans.',
    },
  },
  {
    id: 'muradin',
    name: 'Muradin Bronzebeard',
    icon: 'race_dwarf_male',
    aliases: ['Muradin Bronzebeard', 'Muradin'],
    tr: {
      sub: 'Ironforge prensi · Magni’nin kardeşi',
      text: 'King Magni Bronzebeard’ın kardeşi. Northrend’de Arthas’ın yanındaydı; Frostmourne’un laneti yüzünden yere yığıldı ve öldüğü sanıldı.',
    },
    en: {
      sub: 'Prince of Ironforge · Magni’s brother',
      text: 'King Magni Bronzebeard’s brother. He was at Arthas’s side in Northrend, was struck down by Frostmourne’s curse and was believed dead.',
    },
  },

  // ---------------------------------------------------------------- places
  {
    id: 'arathor',
    name: 'Arathor',
    icon: 'inv_banner_03',
    aliases: ['Arathor'],
    tr: {
      sub: 'İlk insan ulusu',
      text: 'Thoradin’in kurduğu, başkenti Strom olan ilk insan krallığı. Elf’lerle ittifak kurup Troll Wars’ı kazandı. Yüzyıllar içinde dağıldı ve yerini yedi insan krallığına bıraktı.',
    },
    en: {
      sub: 'The first human nation',
      text: 'The first human kingdom, founded by Thoradin with Strom as its capital. It allied with the elves and won the Troll Wars. Over the centuries it drifted apart and gave way to the seven human kingdoms.',
    },
  },
  {
    id: 'stromgarde',
    name: 'Stromgarde',
    icon: 'ability_townwatch',
    aliases: ['Stromgarde', 'Strom'],
    tr: {
      sub: 'Krallık · Arathi Highlands',
      text: 'İnsanlığın ilk başkenti Strom, Arathor dağıldıktan sonra Stromgarde adıyla Trollbane hanedanının krallığı oldu. Yedi krallığın en savaşçısı sayılır. Bugün Stromgarde Keep, Syndicate’e ve ogre’lara karşı eski başkenti korumaya çalışıyor.',
      note: 'Arathi Highlands',
    },
    en: {
      sub: 'Kingdom · Arathi Highlands',
      text: 'Strom, humanity’s first capital, became Stromgarde, the Trollbane family’s kingdom, once Arathor drifted apart. It is counted the most martial of the seven kingdoms. Today Stromgarde Keep is trying to hold the old capital against the Syndicate and the ogres.',
      note: 'Arathi Highlands',
    },
  },
  {
    id: 'quelthalas',
    name: 'Quel’Thalas',
    icon: 'inv_misc_head_elf_01',
    aliases: ['Quel’Thalas'],
    tr: {
      sub: 'High elf krallığı',
      text: 'Eastern Kingdoms’ın kuzeyindeki high elf yurdu. Amani trolleriyle binlerce yıl savaştı; Troll Wars’da insanların yardımıyla kurtuldu ve Arathi soyuna yemin etti. Third War’da Scourge tarafından yakılıp yıkıldı.',
    },
    en: {
      sub: 'Kingdom of the high elves',
      text: 'The high elves’ homeland in the north of the Eastern Kingdoms. It fought the Amani trolls for thousands of years, was saved with human help in the Troll Wars and swore an oath to the Arathi line. In the Third War the Scourge burned it.',
    },
  },
  {
    id: 'dalaran',
    name: 'Dalaran',
    icon: 'inv_misc_book_08',
    aliases: ['Dalaran'],
    tr: {
      sub: 'Büyücüler şehri · Kirin Tor',
      text: 'Arathor’un büyücülerinin kuzeyde kurduğu şehir; insan büyücülüğünün merkezi ve Kirin Tor’un yurdu. Third War’da Archimonde tarafından yerle bir edildi. Kalıntıları bugün mor bir kubbenin altında yeniden kuruluyor.',
      note: 'Alterac Mountains',
    },
    en: {
      sub: 'City of magi · the Kirin Tor',
      text: 'The city Arathor’s magi founded in the north; the heart of human magic and home of the Kirin Tor. Archimonde levelled it in the Third War. Its ruins are now being rebuilt under a violet dome.',
      note: 'Alterac Mountains',
    },
  },
  {
    id: 'lordaeron',
    name: 'Lordaeron',
    icon: 'spell_arcane_portalundercity',
    aliases: ['Lordaeron'],
    tr: {
      sub: 'Krallık · kuzey',
      text: 'Yedi krallığın en büyüğü ve en zengini; Menethil hanedanının krallığı. Alliance of Lordaeron onun başkentinde kuruldu. Third War’da Scourge’a düştü; toprakları bugün Plaguelands, başkentinin altında ise Forsaken’ın Undercity’si var.',
      note: 'Tirisfal Glades · Plaguelands',
    },
    en: {
      sub: 'Kingdom · the north',
      text: 'The largest and richest of the seven kingdoms, ruled by the Menethil family. The Alliance of Lordaeron was founded in its capital. It fell to the Scourge in the Third War; its lands are now the Plaguelands, and the Forsaken’s Undercity lies beneath its capital.',
      note: 'Tirisfal Glades · Plaguelands',
    },
  },
  {
    id: 'alterac',
    name: 'Alterac',
    icon: 'spell_frost_frost',
    aliases: ['Alterac Mountains', 'Alterac'],
    tr: {
      sub: 'Krallık · dağlar',
      text: 'Lordaeron ile Stromgarde arasındaki dağlık küçük krallık; Perenolde hanedanının yurdu. Troll Wars’ın büyük savaşı bu dağların eteklerinde verildi. Second War’daki ihanetten sonra krallık sona erdi; bugün dağlarda Syndicate ve ogre’lar dolaşıyor.',
      note: 'Alterac Mountains',
    },
    en: {
      sub: 'Kingdom · the mountains',
      text: 'A small mountain kingdom between Lordaeron and Stromgarde, home of the Perenolde family. The great battle of the Troll Wars was fought at the foot of these mountains. The kingdom ended after its betrayal in the Second War; the Syndicate and ogres now roam the mountains.',
      note: 'Alterac Mountains',
    },
  },
  {
    id: 'gilneas',
    name: 'Gilneas',
    icon: 'spell_nature_stoneskintotem',
    aliases: ['Gilneas'],
    tr: {
      sub: 'Krallık · güneybatı yarımadası',
      text: 'Silverpine Forest’ın güneyindeki yarımadada kurulu, gururlu ve kendi başına buyruk krallık. Second War’dan sonra Alliance’tan ayrıldı; King Genn Greymane ülkesini Greymane Wall’la dışarıya kapattı. Duvarın ardında neler olduğunu kimse bilmiyor.',
    },
    en: {
      sub: 'Kingdom · the south-western peninsula',
      text: 'A proud, self-reliant kingdom on the peninsula south of Silverpine Forest. It left the Alliance after the Second War, and King Genn Greymane shut it off behind the Greymane Wall. No one knows what lies beyond the wall.',
    },
  },
  {
    id: 'kultiras',
    name: 'Kul Tiras',
    icon: 'inv_misc_map02',
    aliases: ['Kul Tiras'],
    tr: {
      sub: 'Ada krallığı · deniz gücü',
      text: 'Lordaeron’un güneybatısında, açık denizdeki ada krallığı; donanmasıyla denizlere hükmeder ve Proudmoore ailesi tarafından yönetilir. Second War’da Alliance’ın gemilerinin çoğunu Kul Tiras sağladı.',
    },
    en: {
      sub: 'Island kingdom · sea power',
      text: 'An island kingdom out at sea south-west of Lordaeron. Its fleet rules the waves and the Proudmoore family rules it. In the Second War Kul Tiras supplied most of the Alliance’s ships.',
    },
  },
  {
    id: 'stormwind',
    name: 'Stormwind',
    icon: 'spell_arcane_portalstormwind',
    aliases: ['Stormwind City', 'Stormwind'],
    tr: {
      sub: 'Azeroth krallığı · Alliance’ın başkenti',
      text: 'Arathi soylularının güneyde kurduğu Azeroth krallığının başkenti. First War’da Horde tarafından yerle bir edildi; Second War’dan sonra Stonemasons’ Guild’in elinde yeniden yükseldi. Bugün Alliance’ın en güçlü şehri.',
      note: 'Elwynn Forest',
    },
    en: {
      sub: 'Kingdom of Azeroth · capital of the Alliance',
      text: 'Capital of the kingdom of Azeroth, founded in the south by Arathi nobles. The Horde razed it in the First War; after the Second War it rose again at the hands of the Stonemasons’ Guild. Today it is the strongest city of the Alliance.',
      note: 'Elwynn Forest',
    },
  },
  {
    id: 'karazhan',
    name: 'Karazhan',
    icon: 'inv_misc_key_08',
    aliases: ['Karazhan'],
    tr: {
      sub: 'Medivh’in kulesi',
      text: 'Deadwind Pass’teki büyücü kulesi; Medivh’in evi. Lothar, Khadgar ve Garona First War sırasında Medivh’i burada öldürdü. Bugün terk edilmiş ve lanetli bir yer.',
      note: 'Deadwind Pass',
    },
    en: {
      sub: 'Medivh’s tower',
      text: 'The mage tower in Deadwind Pass, Medivh’s home. Lothar, Khadgar and Garona slew Medivh here during the First War. Today it stands abandoned and cursed.',
      note: 'Deadwind Pass',
    },
  },
  {
    id: 'blackmorass',
    name: 'Black Morass',
    icon: 'spell_shadow_lifedrain02',
    aliases: ['Black Morass'],
    tr: {
      sub: 'Bataklık · bugünkü Blasted Lands',
      text: 'Dark Portal’ın açıldığı bataklık. Portalın etrafındaki toprak savaşlarla kavrularak bugünkü Blasted Lands’e dönüştü.',
      note: 'Blasted Lands',
    },
    en: {
      sub: 'Swamp · today’s Blasted Lands',
      text: 'The swamp where the Dark Portal was opened. The land around the portal was scorched by war and became today’s Blasted Lands.',
      note: 'Blasted Lands',
    },
  },
  {
    id: 'darkportal',
    name: 'Dark Portal',
    icon: 'spell_shadow_summonvoidwalker',
    aliases: ['Dark Portal'],
    tr: {
      sub: 'Draenor’a açılan kapı',
      text: 'Medivh ve Gul’dan’ın Black Morass’ta açtığı, Azeroth’u orc’ların dünyası Draenor’a bağlayan geçit. Horde bu kapıdan geldi. Second War’ın sonunda Alliance tarafından yıkıldı.',
      note: 'Blasted Lands',
    },
    en: {
      sub: 'The gate to Draenor',
      text: 'The gateway Medivh and Gul’dan opened in the Black Morass, joining Azeroth to Draenor, the orcs’ world. The Horde came through it. The Alliance destroyed it at the end of the Second War.',
      note: 'Blasted Lands',
    },
  },
  {
    id: 'draenor',
    name: 'Draenor',
    icon: 'race_orc_male',
    aliases: ['Draenor'],
    tr: {
      sub: 'Orc’ların dünyası',
      text: 'Orc’ların ve draenei’lerin yaşadığı dünya. Horde burada demon büyüsüyle yozlaştırıldıktan sonra Dark Portal’dan Azeroth’a geçti.',
    },
    en: {
      sub: 'World of the orcs',
      text: 'The world of the orcs and the draenei. The Horde was corrupted there by demonic magic before it crossed the Dark Portal into Azeroth.',
    },
  },
  {
    id: 'blackrockspire',
    name: 'Blackrock Spire',
    icon: 'spell_fire_fire',
    aliases: ['Blackrock Spire'],
    tr: {
      sub: 'Horde’un son kalesi',
      text: 'Blackrock Mountain’daki kale; Second War’da Horde’un son büyük direniş noktası. Lothar burada Orgrim Doomhammer’la dövüşürken öldü ve Turalyon’un ordusu kaleyi düşürdü. Bugün Blackrock orc’larının yuvası.',
      note: 'Blackrock Mountain',
    },
    en: {
      sub: 'The Horde’s last stronghold',
      text: 'The fortress in Blackrock Mountain and the Horde’s last great stand in the Second War. Lothar died here fighting Orgrim Doomhammer, and Turalyon’s army took the fortress. Today it is the den of the Blackrock orcs.',
      note: 'Blackrock Mountain',
    },
  },
  {
    id: 'stratholme',
    name: 'Stratholme',
    icon: 'spell_fire_incinerate',
    aliases: ['Stratholme'],
    tr: {
      sub: 'Lordaeron şehri',
      text: 'Lordaeron’un kuzeydoğusundaki büyük şehir. Halkı vebalı tahıldan zehirlenince Arthas şehri arındırma emri verdi; bu karar Arthas’ın düşüşünün başlangıcı oldu. Bugün Scourge’un ve Scarlet Crusade’in savaştığı bir harabe.',
      note: 'Eastern Plaguelands',
    },
    en: {
      sub: 'City of Lordaeron',
      text: 'A great city in the north-east of Lordaeron. When its people were poisoned by the tainted grain, Arthas ordered it purged, the start of his fall. Today it is a ruin where the Scourge and the Scarlet Crusade fight.',
      note: 'Eastern Plaguelands',
    },
  },
  {
    id: 'andorhal',
    name: 'Andorhal',
    icon: 'trade_herbalism',
    aliases: ['Andorhal'],
    tr: {
      sub: 'Lordaeron kasabası',
      text: 'Lordaeron’un tahıl ambarlarının bulunduğu kasaba. Cult of the Damned vebalı tahılı buradan dağıttı; Arthas Kel’Thuzad’ı burada öldürdü.',
      note: 'Western Plaguelands',
    },
    en: {
      sub: 'Town of Lordaeron',
      text: 'The town of Lordaeron’s granaries. The Cult of the Damned handed out the tainted grain from here, and Arthas killed Kel’Thuzad here.',
      note: 'Western Plaguelands',
    },
  },
  {
    id: 'theramore',
    name: 'Theramore',
    icon: 'spell_arcane_teleportstormwind',
    aliases: ['Theramore'],
    tr: {
      sub: 'Jaina’nın şehri',
      text: 'Jaina Proudmoore’un Third War’dan sonra Dustwallow Marsh kıyısındaki bir adada kurduğu şehir; Lordaeron mültecilerinin ve Kul Tiras’lıların yeni yurdu. Alliance’ın Kalimdor’daki en güçlü kalesi.',
      note: 'Dustwallow Marsh',
    },
    en: {
      sub: 'Jaina’s city',
      text: 'The city Jaina Proudmoore founded after the Third War on an island off Dustwallow Marsh; a new home for Lordaeron’s refugees and the people of Kul Tiras. It is the Alliance’s strongest fortress in Kalimdor.',
      note: 'Dustwallow Marsh',
    },
  },
  {
    id: 'southshore',
    name: 'Southshore',
    icon: 'trade_fishing',
    aliases: ['Southshore'],
    tr: {
      sub: 'Hillsbrad kasabası',
      text: 'Hillsbrad Foothills’in güney kıyısındaki insan kasabası. Lordaeron’un düşüşünden sonra bölgede ayakta kalan birkaç Alliance yerleşiminden biri.',
      note: 'Hillsbrad Foothills',
    },
    en: {
      sub: 'Town in Hillsbrad',
      text: 'A human town on the southern shore of the Hillsbrad Foothills. It is one of the few Alliance settlements in the region still standing after the fall of Lordaeron.',
      note: 'Hillsbrad Foothills',
    },
  },
  {
    id: 'westfall',
    name: 'Westfall',
    icon: 'trade_herbalism',
    aliases: ['Westfall'],
    tr: {
      sub: 'Stormwind’in tahıl ambarı',
      text: 'Stormwind’in batısındaki tarım bölgesi; bir zamanlar krallığın ambarıydı. Bugün çiftliklerinin çoğu terk edilmiş, yolları Defias haydutlarının elinde.',
    },
    en: {
      sub: 'Stormwind’s breadbasket',
      text: 'The farmland west of Stormwind, once the kingdom’s granary. Today most of its farms are abandoned and its roads belong to Defias bandits.',
    },
  },
  {
    id: 'moonbrook',
    name: 'Moonbrook',
    icon: 'trade_mining',
    aliases: ['Moonbrook'],
    tr: {
      sub: 'Westfall köyü',
      text: 'Westfall’un güneyinde, Defias’ın ele geçirdiği köy. Deadmines’ın girişi buradadır.',
      note: 'Westfall',
    },
    en: {
      sub: 'Village in Westfall',
      text: 'The village in southern Westfall the Defias have taken over. The entrance to the Deadmines is here.',
      note: 'Westfall',
    },
  },
  {
    id: 'deadmines',
    name: 'Deadmines',
    icon: 'trade_mining',
    aliases: ['Deadmines'],
    tr: {
      sub: 'Defias’ın gizli limanı',
      text: 'Moonbrook’un altında uzanan eski maden. Defias Brotherhood burada, madenin sonundaki gizli limanda Stormwind’e karşı bir savaş gemisi inşa ediyor.',
      note: 'Moonbrook, Westfall',
    },
    en: {
      sub: 'The Defias’ hidden harbour',
      text: 'An old mine running beneath Moonbrook. At the hidden harbour at its end, the Defias Brotherhood is building a warship against Stormwind.',
      note: 'Moonbrook, Westfall',
    },
  },
  {
    id: 'sentinelhill',
    name: 'Sentinel Hill',
    icon: 'ability_warrior_battleshout',
    aliases: ['Sentinel Hill'],
    tr: {
      sub: 'People’s Militia’nın karargâhı',
      text: 'Westfall’un ortasındaki kule ve karakol. Gryan Stoutmantle’ın kurduğu People’s Militia, Defias’a karşı mücadeleyi buradan yürütüyor.',
      note: 'Westfall',
    },
    en: {
      sub: 'Headquarters of the People’s Militia',
      text: 'The tower and outpost in the middle of Westfall. The People’s Militia founded by Gryan Stoutmantle runs its fight against the Defias from here.',
      note: 'Westfall',
    },
  },
  {
    id: 'greymanewall',
    name: 'Greymane Wall',
    icon: 'spell_nature_stoneskintotem',
    aliases: ['Greymane Wall'],
    tr: {
      sub: 'Gilneas’ın duvarı',
      text: 'King Genn Greymane’in Second War’dan sonra Gilneas’ı dış dünyaya kapatmak için ördüğü dev surlar. Gilneas o günden beri duvarın ardında yalnız.',
    },
    en: {
      sub: 'The wall of Gilneas',
      text: 'The huge wall King Genn Greymane raised after the Second War to shut Gilneas off from the world. Gilneas has stood alone behind it ever since.',
    },
  },
  {
    id: 'hyjal',
    name: 'Mount Hyjal',
    icon: 'spell_holy_divineillumination',
    aliases: ['Mount Hyjal'],
    tr: {
      sub: 'Kutsal dağ · Kalimdor',
      text: 'Kalimdor’daki kutsal dağ; tepesinde night elf’lerin World Tree’si yükselir. Third War’un son savaşı burada verildi: insanlar, orc’lar ve night elf’ler birlikte Archimonde’u durdurdu.',
      note: 'Hyjal Summit (raid)',
    },
    en: {
      sub: 'Sacred mountain · Kalimdor',
      text: 'The sacred mountain of Kalimdor, crowned by the night elves’ World Tree. The last battle of the Third War was fought here: humans, orcs and night elves stopped Archimonde together.',
      note: 'Hyjal Summit (raid)',
    },
  },
  {
    id: 'plaguelands',
    name: 'Plaguelands',
    icon: 'spell_shadow_unholyfrenzy',
    aliases: ['Plaguelands'],
    tr: {
      sub: 'Eski Lordaeron toprakları',
      text: 'Lordaeron’un vebayla zehirlenip Scourge’a düşen toprakları. Batı ve doğu olarak ikiye ayrılır; bugün ölümsüzlerin, Scarlet Crusade’in ve Argent Dawn’ın savaş alanı.',
      note: 'Western ve Eastern Plaguelands',
    },
    en: {
      sub: 'The old lands of Lordaeron',
      text: 'The lands of Lordaeron that the plague poisoned and the Scourge took. They are split into west and east, and today they are a battlefield for the undead, the Scarlet Crusade and the Argent Dawn.',
      note: 'Western and Eastern Plaguelands',
    },
  },
  {
    id: 'northrend',
    name: 'Northrend',
    icon: 'spell_frost_frostarmor',
    aliases: ['Northrend'],
    tr: {
      sub: 'Buzlu kıta',
      text: 'Azeroth’un kuzeyindeki buzlu kıta; vrykul’ların ve Lich King’in yurdu. Arthas Frostmourne’u burada buldu.',
    },
    en: {
      sub: 'The frozen continent',
      text: 'The frozen continent in the far north of Azeroth, home of the vrykul and the Lich King. Arthas found Frostmourne there.',
    },
  },
  {
    id: 'kalimdor',
    name: 'Kalimdor',
    icon: 'inv_misc_map02',
    aliases: ['Kalimdor'],
    tr: {
      sub: 'Batıdaki kıta',
      text: 'Eastern Kingdoms’ın batısındaki büyük kıta; night elf’lerin ve tauren’lerin yurdu. Third War’da Jaina, Lordaeron’un hayatta kalanlarını buraya getirdi.',
    },
    en: {
      sub: 'The western continent',
      text: 'The great continent west of the Eastern Kingdoms, home of the night elves and the tauren. In the Third War Jaina brought Lordaeron’s survivors here.',
    },
  },
  {
    id: 'khazmodan',
    name: 'Khaz Modan',
    icon: 'spell_arcane_portalironforge',
    aliases: ['Khaz Modan'],
    tr: {
      sub: 'Dwarf ve Gnome yurdu',
      text: 'Eastern Kingdoms’ın ortasındaki dağlık bölge; Ironforge dwarf’larının ve Gnomeregan gnome’larının yurdu. Second War’da Horde tarafından baştan sona istila edildi.',
    },
    en: {
      sub: 'Land of dwarves and gnomes',
      text: 'The mountain lands in the middle of the Eastern Kingdoms, home of the dwarves of Ironforge and the gnomes of Gnomeregan. The Horde overran it from end to end in the Second War.',
    },
  },
  {
    id: 'ironforge',
    name: 'Ironforge',
    icon: 'spell_arcane_teleportironforge',
    aliases: ['Ironforge'],
    tr: {
      sub: 'Dwarf başkenti',
      text: 'Khaz Modan’ın dağlarına oyulmuş dwarf başkenti. Second War’da kuşatıldı ama hiç düşmedi; Alliance’ın en sağlam müttefiki.',
      note: 'Dun Morogh',
    },
    en: {
      sub: 'Capital of the dwarves',
      text: 'The dwarven capital carved into the mountains of Khaz Modan. It was besieged in the Second War but never fell, and it is the Alliance’s firmest ally.',
      note: 'Dun Morogh',
    },
  },

  // ---------------------------------------------------------------- peoples, orders and powers
  {
    id: 'titans',
    name: 'Titan',
    icon: 'spell_holy_divinespirit',
    aliases: ['Titan'],
    tr: {
      sub: 'Dünyaların mimarları',
      text: 'Kozmosu düzenleyen dev varlıklar. Azeroth’u şekillendirdiler ve onu korusun diye vrykul, earthen ve mechagnome gibi Titan yapılarını yarattılar.',
    },
    en: {
      sub: 'Architects of worlds',
      text: 'Vast beings who order the cosmos. They shaped Azeroth and made titan-forged beings such as the vrykul, the earthen and the mechagnomes to keep it.',
    },
  },
  {
    id: 'oldgods',
    name: 'Old Gods',
    icon: 'spell_shadow_antishadow',
    aliases: ['Old Gods'],
    tr: {
      sub: 'Kadim kötülükler',
      text: 'Titan’ların Azeroth’un derinliklerine hapsettiği kadim varlıklar. Zincirlerinin ardından yaydıkları yozlaşma, Titan yapılarını değiştiren Curse of Flesh oldu.',
    },
    en: {
      sub: 'Ancient evils',
      text: 'Ancient beings the Titans imprisoned deep inside Azeroth. The corruption they spread from behind their chains became the Curse of Flesh that changed the titan-forged.',
    },
  },
  {
    id: 'curse',
    name: 'Curse of Flesh',
    icon: 'spell_shadow_curse',
    aliases: ['Curse of Flesh'],
    tr: {
      sub: 'Old Gods’un laneti',
      text: 'Old Gods’un Titan yapılarına bulaştırdığı yozlaşma. Taş ve metal gövdeleri ete çevirdi, vrykul’ların çocuklarını küçük ve ölümlü doğurttu. Dwarf, Gnome ve Human bu lanetten doğdu.',
    },
    en: {
      sub: 'The Old Gods’ curse',
      text: 'The corruption the Old Gods spread among the titan-forged. It turned bodies of stone and metal to flesh and made the vrykul bear small, mortal children. Dwarves, gnomes and humans were born of it.',
    },
  },
  {
    id: 'vrykul',
    name: 'Vrykul',
    icon: 'inv_axe_02',
    aliases: ['vrykul', 'Vrykul'],
    tr: {
      sub: 'Titan yapısı devler',
      text: 'Titan’ların Northrend’de yarattığı dev savaşçılar. Curse of Flesh yüzünden küçük ve ölümlü çocuklar doğurmaya başladılar; bu çocuklar insanların atalarıdır.',
    },
    en: {
      sub: 'Titan-forged giants',
      text: 'Giant warriors the Titans made in Northrend. The Curse of Flesh made them bear small, mortal children, and those children are the ancestors of humans.',
    },
  },
  {
    id: 'amani',
    name: 'Amani',
    icon: 'race_troll_male',
    aliases: ['Amani'],
    tr: {
      sub: 'Troll imparatorluğu',
      text: 'Eastern Kingdoms’ın kuzeyindeki orman trollerinin imparatorluğu; high elf’lerin kadim düşmanı. Troll Wars’da insanlarla elf’lerin ittifakına yenildi. Second War’da Horde’a katılıp Quel’Thalas’ın ormanlarını yaktılar.',
    },
    en: {
      sub: 'Troll empire',
      text: 'The forest trolls’ empire in the north of the Eastern Kingdoms and the ancient enemy of the high elves. It was beaten by the alliance of humans and elves in the Troll Wars. In the Second War the Amani joined the Horde and burned the forests of Quel’Thalas.',
    },
  },
  {
    id: 'highelves',
    name: 'High elf',
    icon: 'inv_misc_head_elf_02',
    aliases: ['high elves', 'high elf'],
    tr: {
      sub: 'Quel’Thalas halkı',
      text: 'Quel’Thalas’ta yaşayan elf halkı; kökleri Kalimdor’dan sürülen eski night elf’lere dayanır. Troll Wars’da insanlara büyü öğrettiler ve Arathi soyuna yardım edeceklerine yemin ettiler.',
    },
    en: {
      sub: 'People of Quel’Thalas',
      text: 'The elves of Quel’Thalas, descended from night elves exiled from Kalimdor long ago. In the Troll Wars they taught humans magic and swore to aid the Arathi line.',
    },
  },
  {
    id: 'kirintor',
    name: 'Kirin Tor',
    icon: 'classicon_mage',
    aliases: ['Kirin Tor'],
    tr: {
      sub: 'Dalaran’ın büyücü konseyi',
      text: 'Dalaran’ı yöneten büyücüler konseyi. Büyü bilgisini korur, büyücüleri yetiştirir ve büyünün kötüye kullanılmasını denetler. Third War’da şehirleri yıkıldı ama konsey yaşamaya devam ediyor.',
    },
    en: {
      sub: 'The magi council of Dalaran',
      text: 'The council of magi that rules Dalaran. It guards magical knowledge, trains mages and watches for the misuse of magic. Its city fell in the Third War, but the council lives on.',
    },
  },
  {
    id: 'council',
    name: 'Council of Tirisfal',
    icon: 'inv_misc_book_03',
    aliases: ['Council of Tirisfal'],
    tr: {
      sub: 'Gizli büyücü konseyi',
      text: 'İnsan büyücüler ile high elf’lerin, Burning Legion’ı Azeroth’tan uzak tutmak için gizlice kurduğu konsey. Gücünü tek bir koruyucuya, Guardian of Tirisfal’a emanet etti.',
    },
    en: {
      sub: 'Secret council of magi',
      text: 'The council human magi and high elves founded in secret to keep the Burning Legion away from Azeroth. It entrusted its power to a single protector, the Guardian of Tirisfal.',
    },
  },
  {
    id: 'guardian',
    name: 'Guardian of Tirisfal',
    icon: 'spell_holy_divinepurpose',
    aliases: ['Guardian of Tirisfal'],
    tr: {
      sub: 'Azeroth’un koruyucusu',
      text: 'Council of Tirisfal’ın büyük bir güç emanet ettiği tek büyücü; görevi Azeroth’u Burning Legion’a karşı korumaktı. Son Guardian, Sargeras’ın etkisine düşen Medivh oldu.',
    },
    en: {
      sub: 'Protector of Azeroth',
      text: 'The single mage the Council of Tirisfal entrusted with great power, sworn to guard Azeroth against the Burning Legion. The last Guardian was Medivh, who fell under Sargeras’s sway.',
    },
  },
  {
    id: 'horde',
    name: 'Horde',
    icon: 'race_orc_male',
    aliases: ['Horde'],
    tr: {
      sub: 'Orc ordusu',
      text: 'Draenor’dan Dark Portal’la gelen orc klanlarının ordusu. First War’da Stormwind’i yıktı, Second War’da Alliance’a yenildi; hayatta kalan orc’lar toplama kamplarına kapatıldı. Bugünkü Horde, Thrall’ın Kalimdor’da kurduğu yeni bir birlik.',
    },
    en: {
      sub: 'Army of the orcs',
      text: 'The host of orc clans that came from Draenor through the Dark Portal. It razed Stormwind in the First War and lost to the Alliance in the Second; the surviving orcs were locked in internment camps. Today’s Horde is a new union Thrall founded in Kalimdor.',
    },
  },
  {
    id: 'alliance',
    name: 'Alliance of Lordaeron',
    icon: 'inv_banner_03',
    aliases: ['Alliance of Lordaeron'],
    tr: {
      sub: 'İnsan krallıklarının ittifakı',
      text: 'Second War öncesinde King Terenas’ın kurduğu ittifak: yedi insan krallığına Ironforge dwarf’ları, gnome’lar ve high elf’ler katıldı. Horde’u yendi ama savaştan sonra çözülmeye başladı.',
    },
    en: {
      sub: 'Alliance of the human kingdoms',
      text: 'The alliance King Terenas founded before the Second War: the dwarves of Ironforge, the gnomes and the high elves joined the seven human kingdoms. It beat the Horde, but began to come apart after the war.',
    },
  },
  {
    id: 'cult',
    name: 'Cult of the Damned',
    icon: 'spell_shadow_ritualofsacrifice',
    aliases: ['Cult of the Damned'],
    tr: {
      sub: 'Ölüm tarikatı',
      text: 'Kel’Thuzad’ın Lich King adına kurduğu tarikat. Yoksul köylülere sonsuz yaşam vaat ederek üye topladı ve Lordaeron’a vebalı tahılı yaydı.',
    },
    en: {
      sub: 'Death cult',
      text: 'The cult Kel’Thuzad founded for the Lich King. It drew in poor villagers with the promise of eternal life and spread the tainted grain across Lordaeron.',
    },
  },
  {
    id: 'scourge',
    name: 'Scourge',
    icon: 'spell_shadow_raisedead',
    aliases: ['Scourge'],
    tr: {
      sub: 'Ölümsüz ordu',
      text: 'Lich King’in yönettiği ölümsüzler ordusu; vebayla ölenler Scourge askeri olarak kalkar. Third War’da Lordaeron’u ve Quel’Thalas’ı yıktı ve bugün Plaguelands’i elinde tutuyor.',
    },
    en: {
      sub: 'The undead army',
      text: 'The army of the undead commanded by the Lich King; those who die of the plague rise as its soldiers. It destroyed Lordaeron and Quel’Thalas in the Third War and holds the Plaguelands today.',
    },
  },
  {
    id: 'legion',
    name: 'Burning Legion',
    icon: 'spell_shadow_summoninfernal',
    aliases: ['Burning Legion'],
    tr: {
      sub: 'Demon ordusu',
      text: 'Sargeras’ın dünyaları yakıp yıkan demon ordusu. Azeroth’u binlerce yıldır hedef alıyor; Third War’da Mount Hyjal’da durduruldu.',
    },
    en: {
      sub: 'The demon army',
      text: 'Sargeras’s army of demons that burns world after world. It has had its eye on Azeroth for thousands of years and was stopped at Mount Hyjal in the Third War.',
    },
  },
  {
    id: 'lichking',
    name: 'Lich King',
    icon: 'spell_frost_chillingblast',
    aliases: ['Lich King'],
    tr: {
      sub: 'Scourge’un efendisi',
      text: 'Northrend’deki Frozen Throne’a hapsedilmiş, Scourge’u yöneten güç. Vebayı Kel’Thuzad aracılığıyla yaydı ve Arthas’ı Frostmourne’la kendine bağladı.',
    },
    en: {
      sub: 'Master of the Scourge',
      text: 'The power bound in the Frozen Throne in Northrend that commands the Scourge. It spread the plague through Kel’Thuzad and bound Arthas to itself with Frostmourne.',
    },
  },
  {
    id: 'frostmourne',
    name: 'Frostmourne',
    icon: 'spell_frost_frostbrand',
    aliases: ['Frostmourne'],
    tr: {
      sub: 'Lanetli kılıç',
      text: 'Lich King’in Northrend’de Arthas için hazırladığı runik kılıç. Arthas onu alırken ruhunu da kılıca kaptırdı.',
    },
    en: {
      sub: 'The cursed blade',
      text: 'The runeblade the Lich King left for Arthas in Northrend. When Arthas took it up, he lost his soul to it.',
    },
  },
  {
    id: 'stonemasons',
    name: 'Stonemasons’ Guild',
    icon: 'inv_hammer_20',
    aliases: ['Stonemasons’ Guild'],
    tr: {
      sub: 'Taş ustaları loncası',
      text: 'First War’dan sonra Stormwind’i yeniden inşa eden ustalar loncası; başlarında Edwin VanCleef vardı. İş bitince House of Nobles ücretlerini ödemeyi reddetti ve loncanın öfkeli üyeleri Defias Brotherhood’u kurdu.',
    },
    en: {
      sub: 'Guild of stonemasons',
      text: 'The guild of masons that rebuilt Stormwind after the First War, led by Edwin VanCleef. When the work was done, the House of Nobles refused to pay, and the guild’s angry members founded the Defias Brotherhood.',
    },
  },
  {
    id: 'nobles',
    name: 'House of Nobles',
    icon: 'inv_misc_coin_06',
    aliases: ['House of Nobles'],
    tr: {
      sub: 'Stormwind soyluları',
      text: 'Stormwind’in soylularından oluşan meclis. Şehrin yeniden inşasının ücretini ödemeyi reddetti ve taş ustalarının isyanına yol açtı.',
    },
    en: {
      sub: 'Nobles of Stormwind',
      text: 'The assembly of Stormwind’s nobles. It refused to pay for the rebuilding of the city and drove the stonemasons to revolt.',
    },
  },
  {
    id: 'defias',
    name: 'Defias Brotherhood',
    icon: 'ability_rogue_garrote',
    aliases: ['Defias Brotherhood', 'Defias'],
    tr: {
      sub: 'Haydut örgütü',
      text: 'Ücretleri ödenmeyen taş ustalarının Edwin VanCleef önderliğinde kurduğu örgüt. Kırmızı maskeleriyle tanınırlar; Westfall’u ve Elwynn’in kenarlarını haraca bağlarken Deadmines’ta Stormwind’e karşı gizli bir savaş gemisi yapıyorlar.',
      note: 'Westfall · Deadmines',
    },
    en: {
      sub: 'Bandit brotherhood',
      text: 'The brotherhood the unpaid stonemasons founded under Edwin VanCleef. Known by their red masks, they bleed Westfall and the edges of Elwynn while building a secret warship against Stormwind in the Deadmines.',
      note: 'Westfall · Deadmines',
    },
  },
  {
    id: 'militia',
    name: 'People’s Militia',
    icon: 'ability_warrior_battleshout',
    aliases: ['People’s Militia'],
    tr: {
      sub: 'Westfall halk milisi',
      text: 'Westfall’u Defias’a karşı korumak için Gryan Stoutmantle’ın gönüllülerden kurduğu milis. Karargâhı Sentinel Hill.',
      note: 'Sentinel Hill, Westfall',
    },
    en: {
      sub: 'Westfall’s volunteer militia',
      text: 'The volunteer militia Gryan Stoutmantle raised to protect Westfall from the Defias. Its headquarters is Sentinel Hill.',
      note: 'Sentinel Hill, Westfall',
    },
  },
  {
    id: 'scarlet',
    name: 'Scarlet Crusade',
    icon: 'spell_holy_sealofwrath',
    aliases: ['Scarlet Crusade', 'Scarlet Monastery'],
    tr: {
      sub: 'Fanatik paladin tarikatı',
      text: 'Lordaeron’un hayatta kalanlarından doğan, ölümsüzlere karşı savaşı fanatizme vardıran tarikat. Vebalı olduğundan şüphelendikleri herkesi düşman sayarlar. Kalesi Tirisfal Glades’teki Scarlet Monastery.',
      note: 'Scarlet Monastery, Tirisfal Glades',
    },
    en: {
      sub: 'Fanatical crusade',
      text: 'An order born of Lordaeron’s survivors that has turned the war on the undead into fanaticism. Anyone they suspect of the plague is an enemy. Its fortress is the Scarlet Monastery in Tirisfal Glades.',
      note: 'Scarlet Monastery, Tirisfal Glades',
    },
  },
  {
    id: 'argent',
    name: 'Argent Dawn',
    icon: 'spell_holy_resurrection',
    aliases: ['Argent Dawn', 'Light’s Hope Chapel'],
    tr: {
      sub: 'Scourge’a karşı ittifak',
      text: 'Scourge’a karşı savaşan, Scarlet Crusade’den çok daha ölçülü bir örgüt; her ırktan üyeyi kabul eder. Üssü Eastern Plaguelands’teki Light’s Hope Chapel.',
      note: 'Light’s Hope Chapel, Eastern Plaguelands',
    },
    en: {
      sub: 'Alliance against the Scourge',
      text: 'An order that fights the Scourge with far more restraint than the Scarlet Crusade and accepts members of every race. Its base is Light’s Hope Chapel in the Eastern Plaguelands.',
      note: 'Light’s Hope Chapel, Eastern Plaguelands',
    },
  },
  {
    id: 'syndicate',
    name: 'Syndicate',
    icon: 'spell_shadow_curseoftounges',
    aliases: ['Syndicate'],
    tr: {
      sub: 'Alterac’ın suç örgütü',
      text: 'Alterac’ın topraksız kalan soylularının kurduğu suç örgütü. Kaybettikleri toprakları geri almak için Alterac Mountains’ta, Hillsbrad’de ve Arathi Highlands’te soygun ve suikast düzenliyorlar.',
      note: 'Alterac Mountains · Arathi Highlands',
    },
    en: {
      sub: 'Alterac’s crime syndicate',
      text: 'A criminal organisation founded by Alterac’s landless nobles. To win back the lands they lost, they rob and assassinate across the Alterac Mountains, Hillsbrad and the Arathi Highlands.',
      note: 'Alterac Mountains · Arathi Highlands',
    },
  },

  // ---------------------------------------------------------------- wars and lands
  {
    id: 'azeroth',
    name: 'Azeroth',
    icon: 'inv_misc_map02',
    aliases: ['Azeroth'],
    tr: {
      sub: 'Dünya · Stormwind’in eski krallığı',
      text: 'Bu hikayelerin geçtiği dünyanın adı. Aynı ad, First War’dan önce başkenti Stormwind olan güneydeki insan krallığının da adıydı; krallık yeniden kurulduktan sonra Stormwind adıyla anılır oldu.',
    },
    en: {
      sub: 'The world · Stormwind’s old kingdom',
      text: 'The name of the world these stories take place on. It was also the name of the southern human kingdom whose capital was Stormwind before the First War; once rebuilt, the kingdom came to be called Stormwind.',
    },
  },
  {
    id: 'arathi',
    name: 'Arathi',
    icon: 'inv_banner_03',
    aliases: ['Arathi'],
    tr: {
      sub: 'İnsan kabilesi · Thoradin’in soyu',
      text: 'İlk insan kabilelerinin en güçlüsü. Şefleri Thoradin diğer kabileleri birleştirip Arathor’u kurdu; onun soyuna Arathi soyu denir. High elf’lerin eski yemini bu soyaydı ve son temsilcisi Anduin Lothar oldu.',
    },
    en: {
      sub: 'Human tribe · the line of Thoradin',
      text: 'The strongest of the first human tribes. Its chieftain Thoradin united the others and founded Arathor; his descendants are the Arathi line. The high elves’ old oath was sworn to that line, and Anduin Lothar was its last heir.',
    },
  },
  {
    id: 'arathihighlands',
    name: 'Arathi Highlands',
    icon: 'ability_townwatch',
    aliases: ['Arathi Highlands'],
    tr: {
      sub: 'Bölge · Lordaeron’un güneyi',
      text: 'Arathi kabilesinin yurdu olan yaylalar; Thoradin Strom’u burada kurdu. Bugün Stromgarde Keep’in insanları bölgeyi Syndicate’e ve ogre’lara karşı savunuyor.',
      note: 'Arathi Highlands',
    },
    en: {
      sub: 'Region · south of Lordaeron',
      text: 'The highlands the Arathi tribe called home, where Thoradin built Strom. Today the people of Stromgarde Keep defend the region against the Syndicate and the ogres.',
      note: 'Arathi Highlands',
    },
  },
  {
    id: 'trollwars',
    name: 'Troll Wars',
    icon: 'race_troll_male',
    aliases: ['Troll Wars'],
    tr: {
      sub: 'Savaş · Dark Portal’dan yaklaşık 2.800 yıl önce',
      text: 'Amani trollerinin Quel’Thalas’ı kuşatmasıyla başlayan savaş. Arathor’un insanları ile high elf’ler ilk kez birlikte savaştı; elf’lerden büyü öğrenen insan büyücüler Alterac Mountains’ın eteklerinde trolleri ateşle dağıttı.',
    },
    en: {
      sub: 'War · about 2,800 years before the Dark Portal',
      text: 'The war that began when the Amani trolls besieged Quel’Thalas. Arathor’s humans and the high elves fought side by side for the first time, and the human magi the elves had taught scattered the trolls with fire at the foot of the Alterac Mountains.',
    },
  },
  {
    id: 'firstwar',
    name: 'First War',
    icon: 'spell_fire_flameshock',
    aliases: ['First War'],
    tr: {
      sub: 'Savaş · Horde ile Azeroth krallığı',
      text: 'Dark Portal’dan gelen Horde ile Azeroth krallığı arasındaki savaş. Medivh öldü, King Llane öldürüldü ve Stormwind yerle bir oldu; Lothar hayatta kalanları Lordaeron’a götürdü.',
    },
    en: {
      sub: 'War · the Horde against the kingdom of Azeroth',
      text: 'The war between the Horde, newly come through the Dark Portal, and the kingdom of Azeroth. Medivh died, King Llane was killed and Stormwind was razed; Lothar led the survivors to Lordaeron.',
    },
  },
  {
    id: 'secondwar',
    name: 'Second War',
    icon: 'inv_sword_48',
    aliases: ['Second War'],
    tr: {
      sub: 'Savaş · Horde ile Alliance of Lordaeron',
      text: 'Horde’un Khaz Modan’dan Lordaeron’a kadar ilerlediği savaş. Alliance of Lordaeron Horde’u güneye püskürttü; Lothar Blackrock Spire’da öldü, Turalyon zaferi kazandı ve Dark Portal yıkıldı.',
    },
    en: {
      sub: 'War · the Horde against the Alliance of Lordaeron',
      text: 'The war in which the Horde pushed from Khaz Modan all the way to Lordaeron. The Alliance of Lordaeron drove it back south; Lothar died at Blackrock Spire, Turalyon won the day and the Dark Portal was destroyed.',
    },
  },
  {
    id: 'thirdwar',
    name: 'Third War',
    icon: 'spell_shadow_unholystrength',
    aliases: ['Third War'],
    tr: {
      sub: 'Savaş · Scourge ve Burning Legion',
      text: 'Vebayla başlayıp Burning Legion’ın gelişiyle büyüyen savaş. Lordaeron, Quel’Thalas ve Dalaran düştü. Savaş Kalimdor’da, Mount Hyjal’da insanların, orc’ların ve night elf’lerin birlikte Archimonde’u durdurmasıyla bitti.',
    },
    en: {
      sub: 'War · the Scourge and the Burning Legion',
      text: 'The war that began with the plague and grew with the coming of the Burning Legion. Lordaeron, Quel’Thalas and Dalaran fell. It ended in Kalimdor, at Mount Hyjal, where humans, orcs and night elves stopped Archimonde together.',
    },
  },
];
