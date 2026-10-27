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
    aliases: ['high elves', 'high elf', 'High Elf'],
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

  // ---------------------------------------------------------------- Gnome and Dwarf stories
  {
    id: 'gnomeregan',
    name: 'Gnomeregan',
    icon: 'trade_engineering',
    aliases: ['Gnomeregan'],
    tr: {
      sub: 'Gnome başkenti · kayıp',
      text: 'Dun Morogh’un batısındaki gnome başkenti; teknolojinin merkezi. Third War’dan hemen önce trogg istilası ve şehri radyasyonla doldurma kararıyla kaybedildi. Bugün içinde radyasyonla aklını yitirmiş gnome’lar ve Thermaplugg var.',
      note: 'Dun Morogh',
    },
    en: {
      sub: 'Capital of the gnomes · lost',
      text: 'The gnome capital in western Dun Morogh and the heart of their technology. Just before the Third War it was lost to the trogg invasion and the decision to flood it with radiation. Irradiated gnomes and Thermaplugg live in it today.',
      note: 'Dun Morogh',
    },
  },
  {
    id: 'dunmorogh',
    name: 'Dun Morogh',
    icon: 'spell_frost_frostarmor',
    aliases: ['Dun Morogh'],
    tr: {
      sub: 'Bölge · Khaz Modan',
      text: 'Khaz Modan’ın karlı batı bölgesi; Ironforge ve Gnomeregan burada. Dwarf ve gnome karakterler oyuna bu topraklarda başlar.',
    },
    en: {
      sub: 'Region · Khaz Modan',
      text: 'The snowy western part of Khaz Modan, home of Ironforge and Gnomeregan. Dwarf and gnome characters start the game here.',
    },
  },
  {
    id: 'newtinkertown',
    name: 'New Tinkertown',
    icon: 'trade_engineering',
    aliases: ['New Tinkertown'],
    tr: {
      sub: 'Gnome üssü',
      text: 'Operation Gnomeregan sırasında Gnomeregan’ın kapısında kurulan gnome üssü; şehri geri alma çabasının karargâhı.',
    },
    en: {
      sub: 'Gnome base',
      text: 'The gnome base built at the gate of Gnomeregan during Operation Gnomeregan, headquarters of the effort to take the city back.',
    },
  },
  {
    id: 'mekkatorque',
    name: 'Gelbin Mekkatorque',
    icon: 'classicon_mage',
    aliases: ['High Tinker Gelbin Mekkatorque', 'Gelbin Mekkatorque', 'Mekkatorque'],
    tr: {
      sub: 'High Tinker · gnome’ların lideri',
      text: 'Gnome’ların seçilmiş lideri ve dâhi bir mühendis. Trogg istilasında danışmanı Sicco Thermaplugg’un önerisiyle Gnomeregan’ı radyasyonla doldurma kararı verdi; sonra hayatta kalan halkını Ironforge’a götürüp yeniden ayağa kaldırdı.',
      note: 'Tinker Town, Ironforge',
    },
    en: {
      sub: 'High Tinker · leader of the gnomes',
      text: 'The gnomes’ elected leader and an engineering genius. During the trogg invasion, on the advice of Sicco Thermaplugg, he decided to flood Gnomeregan with radiation; he then led his surviving people to Ironforge and got them back on their feet.',
      note: 'Tinker Town, Ironforge',
    },
  },
  {
    id: 'thermaplugg',
    name: 'Sicco Thermaplugg',
    icon: 'spell_shadow_unholyfrenzy',
    aliases: ['Sicco Thermaplugg', 'Thermaplugg'],
    tr: {
      sub: 'Mekkatorque’un hain danışmanı',
      text: 'Mekkatorque’a Gnomeregan’ı radyasyonla doldurmayı öneren danışman. Şehir kaybedilince içeride kaldı, radyasyonlu gnome’ların başına geçti ve kendine Mekgineer unvanını aldı.',
      note: 'Gnomeregan',
    },
    en: {
      sub: 'Mekkatorque’s treacherous adviser',
      text: 'The adviser who urged Mekkatorque to flood Gnomeregan with radiation. When the city was lost he stayed inside, took command of the irradiated gnomes and named himself Mekgineer.',
      note: 'Gnomeregan',
    },
  },
  {
    id: 'tinkertown',
    name: 'Tinker Town',
    icon: 'trade_engineering',
    aliases: ['Tinker Town'],
    tr: {
      sub: 'Ironforge’daki gnome mahallesi',
      text: 'Dwarf’ların Gnomeregan’dan kaçan gnome’lara Ironforge içinde açtığı mahalle; gnome’ların hem yuvası hem atölyesi.',
      note: 'Ironforge',
    },
    en: {
      sub: 'The gnome quarter of Ironforge',
      text: 'The quarter the dwarves opened inside Ironforge to the gnomes who fled Gnomeregan; both their home and their workshop.',
      note: 'Ironforge',
    },
  },
  {
    id: 'mechanostrider',
    name: 'Mechanostrider',
    icon: 'ability_mount_charger',
    aliases: ['Mechanostrider'],
    tr: {
      sub: 'Gnome bineği',
      text: 'Gnome mühendislerinin yaptığı, iki ayaklı mekanik binek.',
    },
    en: {
      sub: 'Gnome mount',
      text: 'The two-legged mechanical mount built by gnome engineers.',
    },
  },
  {
    id: 'mimiron',
    name: 'Mimiron',
    icon: 'spell_holy_divinespirit',
    aliases: ['Mimiron'],
    tr: {
      sub: 'Titan Watcher',
      text: 'Titan’ların Ulduar’da görevlendirdiği Watcher’lardan biri. Mekanik dehasıyla Mechagnome’ları o tasarladı.',
    },
    en: {
      sub: 'Titan Watcher',
      text: 'One of the Watchers the Titans set over Ulduar. His mechanical genius designed the mechagnomes.',
    },
  },
  {
    id: 'mechagnome',
    name: 'Mechagnome',
    icon: 'trade_engineering',
    aliases: ['Mechagnome', 'mechagnomes', 'mechagnome'],
    tr: {
      sub: 'Titan yapısı',
      text: 'Mimiron’un tasarladığı metal işçiler. Curse of Flesh onları etten gnome’lara çevirdi.',
    },
    en: {
      sub: 'Titan-forged',
      text: 'The metal workers designed by Mimiron. The Curse of Flesh turned them into gnomes of flesh.',
    },
  },
  {
    id: 'trogg',
    name: 'Trogg',
    icon: 'race_scourge_male',
    aliases: ['Trogg', 'troggs', 'trogg'],
    tr: {
      sub: 'Lanetli earthen',
      text: 'Curse of Flesh’in en ağır vurduğu earthen’lardan doğan ilkel, saldırgan yeraltı canlıları. Gnomeregan’ı istila eden ve Uldaman’ın derinliklerinde yaşayanlar onlar.',
    },
    en: {
      sub: 'Cursed earthen',
      text: 'Primitive, savage underground creatures descended from the earthen the Curse of Flesh struck hardest. They overran Gnomeregan and live deep in Uldaman.',
    },
  },
  {
    id: 'ulduar',
    name: 'Ulduar',
    icon: 'spell_holy_divineillumination',
    aliases: ['Ulduar'],
    tr: {
      sub: 'Titan şehri · Northrend',
      text: 'Northrend’in Storm Peaks bölgesindeki dev Titan şehri; Mimiron’un ve Mechagnome’ların yurdu. Altında Old God Yogg-Saron hapsedilmiş.',
    },
    en: {
      sub: 'Titan city · Northrend',
      text: 'The vast Titan city in Northrend’s Storm Peaks, home of Mimiron and the mechagnomes. The Old God Yogg-Saron is imprisoned beneath it.',
    },
  },
  {
    id: 'outland',
    name: 'Outland',
    icon: 'spell_shadow_summonvoidwalker',
    aliases: ['Outland'],
    tr: {
      sub: 'Draenor’un kalıntısı',
      text: 'Orc’ların dünyası Draenor’un parçalanmasından geriye kalan topraklar; Dark Portal’ın öte yanı.',
    },
    en: {
      sub: 'What is left of Draenor',
      text: 'The lands left over when Draenor, the orcs’ world, was torn apart; the far side of the Dark Portal.',
    },
  },
  {
    id: 'kharanos',
    name: 'Kharanos',
    icon: 'trade_alchemy',
    aliases: ['Kharanos'],
    tr: {
      sub: 'Dun Morogh köyü',
      text: 'Dun Morogh’un ortasındaki dwarf köyü; Thunderbrew bira imalathanesiyle bilinir.',
      note: 'Dun Morogh',
    },
    en: {
      sub: 'Village in Dun Morogh',
      text: 'The dwarven village in the middle of Dun Morogh, known for the Thunderbrew distillery.',
      note: 'Dun Morogh',
    },
  },
  {
    id: 'coldridge',
    name: 'Coldridge Valley',
    icon: 'spell_frost_frostward',
    aliases: ['Coldridge Valley'],
    tr: {
      sub: 'Dun Morogh vadisi',
      text: 'Dwarf ve gnome karakterlerin oyuna başladığı karlı vadi.',
      note: 'Dun Morogh',
    },
    en: {
      sub: 'Valley in Dun Morogh',
      text: 'The snowy valley where dwarf and gnome characters begin the game.',
      note: 'Dun Morogh',
    },
  },
  {
    id: 'opgnomeregan',
    name: 'Operation Gnomeregan',
    icon: 'trade_engineering',
    aliases: ['Operation Gnomeregan'],
    tr: {
      sub: 'Gnome harekâtı',
      text: 'Gnome’ların Mekkatorque önderliğinde Gnomeregan’ı geri almak için başlattığı harekât.',
    },
    en: {
      sub: 'Gnome campaign',
      text: 'The campaign the gnomes launched under Mekkatorque to take Gnomeregan back.',
    },
  },
  {
    id: 'fizzcrank',
    name: 'Fizzcrank Airstrip',
    icon: 'trade_engineering',
    aliases: ['Fizzcrank Airstrip'],
    tr: {
      sub: 'Gnome karakolu · Northrend',
      text: 'Northrend’in Borean Tundra bölgesindeki gnome hava üssü.',
    },
    en: {
      sub: 'Gnome outpost · Northrend',
      text: 'The gnome airbase in Northrend’s Borean Tundra.',
    },
  },
  {
    id: 'toshley',
    name: 'Toshley’s Station',
    icon: 'trade_engineering',
    aliases: ['Toshley’s Station'],
    tr: {
      sub: 'Gnome üssü · Outland',
      text: 'Outland’in Blade’s Edge Mountains bölgesindeki gnome araştırma istasyonu.',
    },
    en: {
      sub: 'Gnome base · Outland',
      text: 'The gnome research station in Outland’s Blade’s Edge Mountains.',
    },
  },
  {
    id: 'ragnaros',
    name: 'Ragnaros',
    icon: 'spell_fire_fire',
    aliases: ['Firelord Ragnaros', 'Ragnaros'],
    tr: {
      sub: 'Firelord · ateşin Elemental Lord’u',
      text: 'Elemental Plane’in ateş katı Firelands’in efendisi. Thaurissan’ın ritüeliyle Azeroth’a çağrıldı; ortaya çıkışı dağları parçalayıp Blackrock Mountain’ı yarattı. Dark Iron’ları köleleştirdi ve dağın en derinindeki Molten Core’da hüküm sürüyor.',
      note: 'Blackrock Mountain',
    },
    en: {
      sub: 'The Firelord · Elemental Lord of fire',
      text: 'Lord of the Firelands, the fire side of the Elemental Plane. Thaurissan’s ritual summoned him to Azeroth; his arrival shattered the mountains and raised Blackrock Mountain. He enslaved the Dark Irons and rules from the Molten Core deep inside the mountain.',
      note: 'Blackrock Mountain',
    },
  },
  {
    id: 'bronzebeard',
    name: 'Bronzebeard',
    icon: 'race_dwarf_male',
    aliases: ['Bronzebeards', 'Bronzebeard'],
    tr: {
      sub: 'Dwarf klanı',
      text: 'Ironforge’un en kalabalık klanı; ordunun ve tüccarların çoğu onlardan. Üç Çekiç Savaşı’nı kazanıp Ironforge’u ellerinde tuttular; King Magni ve Muradin bu klandan.',
    },
    en: {
      sub: 'Dwarf clan',
      text: 'Ironforge’s largest clan, source of most of its army and merchants. They won the War of the Three Hammers and kept Ironforge; King Magni and Muradin are Bronzebeards.',
    },
  },
  {
    id: 'wildhammer',
    name: 'Wildhammer',
    icon: 'inv_hammer_04',
    aliases: ['Wildhammers', 'Wildhammer'],
    tr: {
      sub: 'Dwarf klanı',
      text: 'Dağlarda ve gökyüzünde yaşayan özgür ruhlu klan; grifonlara binen savaşçılarıyla ünlü. Üç Çekiç Savaşı’ndan sonra Grim Batol’a, oradan Hinterlands’teki Aerie Peak’e yerleştiler.',
      note: 'Aerie Peak, The Hinterlands',
    },
    en: {
      sub: 'Dwarf clan',
      text: 'A free-spirited clan of the mountains and the open sky, famous for its gryphon riders. After the War of the Three Hammers they settled Grim Batol, and later Aerie Peak in the Hinterlands.',
      note: 'Aerie Peak, The Hinterlands',
    },
  },
  {
    id: 'darkiron',
    name: 'Dark Iron',
    icon: 'spell_fire_soulburn',
    aliases: ['Dark Irons', 'Dark Iron'],
    tr: {
      sub: 'Dwarf klanı',
      text: 'Büyüyle uğraşan ve en zengin maden damarlarını elinde tutan klan. Üç Çekiç Savaşı’nda yenildiler; Ragnaros’un gelişinden sonra onun kölesi olup Blackrock Mountain’ın altında Shadowforge City’yi kurdular.',
      note: 'Blackrock Mountain',
    },
    en: {
      sub: 'Dwarf clan',
      text: 'The clan of sorcery that held the richest veins of ore. They lost the War of the Three Hammers; after Ragnaros came they became his slaves and built Shadowforge City beneath Blackrock Mountain.',
      note: 'Blackrock Mountain',
    },
  },
  {
    id: 'thaurissan',
    name: 'Thaurissan',
    icon: 'spell_shadow_soulgem',
    aliases: ['Sorcerer-Thane Thaurissan', 'Thaurissan'],
    tr: {
      sub: 'Sorcerer-Thane · Dark Iron lideri',
      text: 'Dark Iron klanının büyücü lideri. Üç Çekiç Savaşı’nda Ironforge’un tahtı için savaştı; yenilginin eşiğinde Ragnaros’u çağırdı ve bu çağrının ilk kurbanı kendisi oldu.',
    },
    en: {
      sub: 'Sorcerer-Thane · leader of the Dark Irons',
      text: 'The sorcerer who led the Dark Iron clan. He fought for the throne of Ironforge in the War of the Three Hammers and, facing defeat, summoned Ragnaros; he was the summoning’s first victim.',
    },
  },
  {
    id: 'modgud',
    name: 'Modgud',
    icon: 'spell_shadow_lifedrain',
    aliases: ['Modgud'],
    tr: {
      sub: 'Thaurissan’ın eşi',
      text: 'Dark Iron büyücüsü. Üç Çekiç Savaşı’nda Grim Batol’a saldıran orduyu yönetti ve Khardros Wildhammer tarafından öldürüldü; ölümü Grim Batol’u lanetledi.',
    },
    en: {
      sub: 'Thaurissan’s wife',
      text: 'A Dark Iron sorceress. She led the army that struck Grim Batol in the War of the Three Hammers and was killed by Khardros Wildhammer; her death left Grim Batol cursed.',
    },
  },
  {
    id: 'anvilmar',
    name: 'Modimus Anvilmar',
    icon: 'race_dwarf_male',
    aliases: ['High King Modimus Anvilmar', 'Anvilmar'],
    tr: {
      sub: 'Ironforge’un High King’i',
      text: 'Üç klanı tek tahtta bir arada tutan son kral. Yaşlılıktan ölünce taht boş kaldı ve Üç Çekiç Savaşı başladı.',
    },
    en: {
      sub: 'High King of Ironforge',
      text: 'The last king to hold the three clans under one throne. When he died of old age the throne stood empty and the War of the Three Hammers began.',
    },
  },
  {
    id: 'madoran',
    name: 'Madoran Bronzebeard',
    icon: 'race_dwarf_male',
    aliases: ['Thane Madoran Bronzebeard', 'Madoran'],
    tr: {
      sub: 'Bronzebeard thane’i',
      text: 'Üç Çekiç Savaşı’nda Bronzebeard’ları yöneten ve Ironforge’u elinde tutan lider.',
    },
    en: {
      sub: 'Thane of the Bronzebeards',
      text: 'The leader who led the Bronzebeards in the War of the Three Hammers and held Ironforge.',
    },
  },
  {
    id: 'khardros',
    name: 'Khardros Wildhammer',
    icon: 'inv_hammer_04',
    aliases: ['Thane Khardros Wildhammer', 'Khardros'],
    tr: {
      sub: 'Wildhammer thane’i',
      text: 'Üç Çekiç Savaşı’nda Wildhammer’ları yönetti. Grim Batol’da Modgud’u öldürdü ve sonra klanını Aerie Peak’e taşıdı.',
    },
    en: {
      sub: 'Thane of the Wildhammers',
      text: 'He led the Wildhammers in the War of the Three Hammers, killed Modgud at Grim Batol and later moved his clan to Aerie Peak.',
    },
  },
  {
    id: 'magni',
    name: 'Magni Bronzebeard',
    icon: 'race_dwarf_male',
    aliases: ['King Magni Bronzebeard', 'Magni Bronzebeard', 'Magni'],
    tr: {
      sub: 'Ironforge kralı',
      text: 'Bronzebeard klanından Ironforge kralı; Muradin’in ağabeyi. Second War’da Ironforge’u Horde’un kuşatmasına karşı savundu ve krallığını Alliance’a bağladı.',
      note: 'High Seat, Ironforge',
    },
    en: {
      sub: 'King of Ironforge',
      text: 'The Bronzebeard king of Ironforge and Muradin’s elder brother. In the Second War he held Ironforge against the Horde’s siege and pledged his kingdom to the Alliance.',
      note: 'High Seat, Ironforge',
    },
  },
  {
    id: 'moira',
    name: 'Moira Thaurissan',
    icon: 'spell_holy_divinepurpose',
    aliases: ['Moira Thaurissan', 'Moira'],
    tr: {
      sub: 'Magni’nin kızı',
      text: 'Magni Bronzebeard’ın kızı. Dark Iron imparatoru Dagran Thaurissan’la evlenip Blackrock Mountain’a gitti; Ironforge’da kaçırıldığına inanılır. Sonraki yıllarda Ironforge’da Dark Iron’ları temsil edecekti.',
      note: 'Blackrock Mountain',
    },
    en: {
      sub: 'Magni’s daughter',
      text: 'Magni Bronzebeard’s daughter. She married the Dark Iron emperor Dagran Thaurissan and went to Blackrock Mountain; Ironforge believes she was kidnapped. In later years she would speak for the Dark Irons in Ironforge.',
      note: 'Blackrock Mountain',
    },
  },
  {
    id: 'dagran',
    name: 'Dagran Thaurissan II',
    icon: 'race_dwarf_male',
    aliases: ['Dagran Thaurissan II'],
    tr: {
      sub: 'İki tahtın varisi',
      text: 'Moira ile Dark Iron imparatoru Dagran Thaurissan’ın oğlu; hem Ironforge’un hem Dark Iron tahtının varisi.',
    },
    en: {
      sub: 'Heir to two thrones',
      text: 'Son of Moira and the Dark Iron emperor Dagran Thaurissan; heir to both Ironforge and the Dark Iron throne.',
    },
  },
  {
    id: 'falstad',
    name: 'Falstad Wildhammer',
    icon: 'inv_hammer_04',
    aliases: ['Falstad Wildhammer', 'Falstad'],
    tr: {
      sub: 'Aerie Peak’in lideri',
      text: 'Hinterlands’teki Aerie Peak’te Wildhammer’ları yöneten grifon binicisi.',
      note: 'Aerie Peak, The Hinterlands',
    },
    en: {
      sub: 'Leader of Aerie Peak',
      text: 'The gryphon rider who leads the Wildhammers of Aerie Peak in the Hinterlands.',
      note: 'Aerie Peak, The Hinterlands',
    },
  },
  {
    id: 'kurdran',
    name: 'Kurdran Wildhammer',
    icon: 'inv_hammer_04',
    aliases: ['Kurdran Wildhammer', 'Kurdran'],
    tr: {
      sub: 'Grifon binicilerinin komutanı',
      text: 'Second War’da Wildhammer grifon binicilerini yönetti; savaştan sonra Dark Portal’ın öte yanına giden sefere katıldı.',
    },
    en: {
      sub: 'Commander of the gryphon riders',
      text: 'He led the Wildhammer gryphon riders in the Second War and afterwards joined the expedition through the Dark Portal.',
    },
  },
  {
    id: 'alexstrasza',
    name: 'Alexstrasza',
    icon: 'inv_misc_head_dragon_01',
    aliases: ['Dragonqueen Alexstrasza', 'Alexstrasza'],
    tr: {
      sub: 'Dragonqueen · kırmızı ejderhaların kraliçesi',
      text: 'Hayatın koruyucusu olan kırmızı ejderha kraliçesi. Second War’da Dragonmaw orc’ları onu Grim Batol’da tutsak edip yavrularını savaş için kullandı; savaştan sonra kurtarıldı.',
    },
    en: {
      sub: 'Dragonqueen · queen of the red dragons',
      text: 'Queen of the red dragons and guardian of life. In the Second War the Dragonmaw orcs held her captive at Grim Batol and used her young for war; she was freed after the war.',
    },
  },
  {
    id: 'dragonmaw',
    name: 'Dragonmaw',
    icon: 'race_orc_male',
    aliases: ['Dragonmaw'],
    tr: {
      sub: 'Orc klanı',
      text: 'Ejderhaları köleleştiren orc klanı; Grim Batol’da Alexstrasza’yı tutsak etti.',
      note: 'Wetlands',
    },
    en: {
      sub: 'Orc clan',
      text: 'The orc clan that enslaved dragons and held Alexstrasza captive at Grim Batol.',
      note: 'Wetlands',
    },
  },
  {
    id: 'grimbatol',
    name: 'Grim Batol',
    icon: 'spell_shadow_curse',
    aliases: ['Grim Batol'],
    tr: {
      sub: 'Dağ kalesi · Wetlands',
      text: 'Wildhammer’ların Üç Çekiç Savaşı’ndan sonra yerleştiği kale. Modgud’un ölümüyle lanetlendi ve terk edildi; Second War’da Dragonmaw klanı Alexstrasza’yı burada tutsak etti.',
      note: 'Wetlands',
    },
    en: {
      sub: 'Mountain fortress · Wetlands',
      text: 'The fortress the Wildhammers settled after the War of the Three Hammers. Cursed by Modgud’s death, it was abandoned; in the Second War the Dragonmaw clan held Alexstrasza captive there.',
      note: 'Wetlands',
    },
  },
  {
    id: 'aeriepeak',
    name: 'Aerie Peak',
    icon: 'ability_mount_whitetiger',
    aliases: ['Aerie Peak'],
    tr: {
      sub: 'Wildhammer yuvası',
      text: 'Hinterlands’teki Wildhammer dwarf’larının dağ yuvası; grifon binicilerinin evi.',
      note: 'The Hinterlands',
    },
    en: {
      sub: 'Home of the Wildhammers',
      text: 'The mountain home of the Wildhammer dwarves in the Hinterlands, where the gryphon riders live.',
      note: 'The Hinterlands',
    },
  },
  {
    id: 'hinterlands',
    name: 'The Hinterlands',
    icon: 'achievement_zone_barrens_01',
    aliases: ['Hinterlands'],
    tr: {
      sub: 'Bölge · Lordaeron’un doğusu',
      text: 'Lordaeron’un doğusundaki ormanlık tepeler; Aerie Peak’teki Wildhammer’lara ve troll kabilelerine ev sahipliği yapar.',
    },
    en: {
      sub: 'Region · east of Lordaeron',
      text: 'Wooded hills east of Lordaeron, home to the Wildhammers of Aerie Peak and to troll tribes.',
    },
  },
  {
    id: 'thandol',
    name: 'Thandol Span',
    icon: 'ability_townwatch',
    aliases: ['Thandol Span'],
    tr: {
      sub: 'Dwarf köprüsü',
      text: 'Arathi Highlands ile Wetlands’i bağlayan dev dwarf köprüsü; Bronzebeard ve Wildhammer dostluğunun simgesi.',
      note: 'Wetlands · Arathi Highlands',
    },
    en: {
      sub: 'Dwarven bridge',
      text: 'The great dwarven bridge between the Arathi Highlands and the Wetlands, a sign of Bronzebeard and Wildhammer friendship.',
      note: 'Wetlands · Arathi Highlands',
    },
  },
  {
    id: 'blackrockmountain',
    name: 'Blackrock Mountain',
    icon: 'spell_fire_selfdestruct',
    aliases: ['Blackrock Mountain'],
    tr: {
      sub: 'Ragnaros’un volkanı',
      text: 'Ragnaros’un gelişiyle yükselen volkan. İçinde Dark Iron’ların Shadowforge City’si, derinliklerinde Molten Core, tepesinde Blackrock Spire var.',
      note: 'Searing Gorge · Burning Steppes',
    },
    en: {
      sub: 'Ragnaros’s volcano',
      text: 'The volcano raised by Ragnaros’s arrival. The Dark Irons’ Shadowforge City lies inside it, the Molten Core deep below and Blackrock Spire on top.',
      note: 'Searing Gorge · Burning Steppes',
    },
  },
  {
    id: 'searinggorge',
    name: 'Searing Gorge',
    icon: 'spell_fire_incinerate',
    aliases: ['Searing Gorge'],
    tr: {
      sub: 'Bölge · Blackrock’ın kuzeyi',
      text: 'Blackrock Mountain’ın kuzeyindeki kavrulmuş kanyon; Dark Iron’lar burada maden işletiyor.',
    },
    en: {
      sub: 'Region · north of Blackrock',
      text: 'The scorched canyon north of Blackrock Mountain, where the Dark Irons work their mines.',
    },
  },
  {
    id: 'burningsteppes',
    name: 'Burning Steppes',
    icon: 'spell_fire_flameshock',
    aliases: ['Burning Steppes'],
    tr: {
      sub: 'Bölge · Blackrock’ın güneyi',
      text: 'Blackrock Mountain’ın güneyindeki küllü bozkır; bugün Blackrock orc’larının elinde.',
    },
    en: {
      sub: 'Region · south of Blackrock',
      text: 'The ash-covered steppe south of Blackrock Mountain, held today by the Blackrock orcs.',
    },
  },
  {
    id: 'shadowforge',
    name: 'Shadowforge City',
    icon: 'spell_fire_soulburn',
    aliases: ['Shadowforge City'],
    tr: {
      sub: 'Dark Iron şehri',
      text: 'Dark Iron’ların Blackrock Mountain’ın altında kurduğu şehir; imparatorları Dagran Thaurissan’ın sarayı burada.',
      note: 'Blackrock Depths',
    },
    en: {
      sub: 'City of the Dark Irons',
      text: 'The city the Dark Irons built beneath Blackrock Mountain, seat of their emperor Dagran Thaurissan.',
      note: 'Blackrock Depths',
    },
  },
  {
    id: 'moltencore',
    name: 'Molten Core',
    icon: 'spell_fire_fireball02',
    aliases: ['Molten Core'],
    tr: {
      sub: 'Ragnaros’un yuvası',
      text: 'Blackrock Mountain’ın en derinindeki lav mağaraları; Ragnaros’un Azeroth’taki yuvası.',
      note: 'Blackrock Mountain',
    },
    en: {
      sub: 'Ragnaros’s lair',
      text: 'The lava caverns at the bottom of Blackrock Mountain, Ragnaros’s seat on Azeroth.',
      note: 'Blackrock Mountain',
    },
  },
  {
    id: 'elementalplane',
    name: 'Elemental Plane',
    icon: 'spell_nature_earthquake',
    aliases: ['Elemental Plane'],
    tr: {
      sub: 'Elementlerin âlemi',
      text: 'Ateş, su, toprak ve havanın Elemental Lord’larının hapsedildiği âlem. Ragnaros’un krallığı Firelands bu âlemin ateş katıdır.',
    },
    en: {
      sub: 'Realm of the elements',
      text: 'The realm where the Elemental Lords of fire, water, earth and air are bound. Ragnaros’s kingdom, the Firelands, is its fire side.',
    },
  },
  {
    id: 'firelands',
    name: 'Firelands',
    icon: 'spell_fire_firebolt02',
    aliases: ['Firelands'],
    tr: {
      sub: 'Ragnaros’un krallığı',
      text: 'Elemental Plane’in ateş katı; Ragnaros’un asıl yurdu.',
    },
    en: {
      sub: 'Ragnaros’s kingdom',
      text: 'The fire side of the Elemental Plane and Ragnaros’s true home.',
    },
  },
  {
    id: 'uldaman',
    name: 'Uldaman',
    icon: 'spell_holy_divinespirit',
    aliases: ['Uldaman'],
    tr: {
      sub: 'Titan kasası · Badlands',
      text: 'Badlands’in altındaki Titan kasası; earthen’lar burada uyudu. Explorers’ League burayı kazıyor, derinliklerinde trogg’lar ve Titan muhafızları dolaşıyor.',
      note: 'Badlands',
    },
    en: {
      sub: 'Titan vault · Badlands',
      text: 'The Titan vault beneath the Badlands where the earthen slept. The Explorers’ League digs here, and troggs and Titan guardians roam its depths.',
      note: 'Badlands',
    },
  },
  {
    id: 'explorers',
    name: 'Explorers’ League',
    icon: 'inv_misc_map02',
    aliases: ['Explorers’ League'],
    tr: {
      sub: 'Dwarf kâşifler örgütü',
      text: 'Ironforge’un Hall of Explorers’ında toplanan kâşifler; dwarf’ların Titan kökenlerinin izini sürüyorlar.',
      note: 'Hall of Explorers, Ironforge',
    },
    en: {
      sub: 'Dwarven explorers',
      text: 'The explorers who gather in Ironforge’s Hall of Explorers and trace the dwarves’ Titan origins.',
      note: 'Hall of Explorers, Ironforge',
    },
  },
  {
    id: 'greatforge',
    name: 'Great Forge',
    icon: 'trade_blacksmithing',
    aliases: ['Great Forge'],
    tr: {
      sub: 'Ironforge’un demirhanesi',
      text: 'Ironforge’un kalbindeki dev demirhane; şehir onun çevresine kuruldu.',
      note: 'Ironforge',
    },
    en: {
      sub: 'The forge of Ironforge',
      text: 'The huge forge at the heart of Ironforge, around which the city was built.',
      note: 'Ironforge',
    },
  },
  {
    id: 'earthen',
    name: 'Earthen',
    icon: 'spell_nature_stoneskintotem',
    aliases: ['earthen', 'Earthen'],
    tr: {
      sub: 'Titan yapısı',
      text: 'Titan’ların dünyanın derinliklerini işlesin diye taştan yarattığı işçiler. Curse of Flesh onları dwarf’lara ve trogg’lara çevirdi.',
    },
    en: {
      sub: 'Titan-forged',
      text: 'Workers of stone the Titans made to shape the depths of the world. The Curse of Flesh turned them into dwarves and troggs.',
    },
  },
  {
    id: 'threehammers',
    name: 'War of the Three Hammers',
    icon: 'inv_hammer_20',
    aliases: ['War of the Three Hammers', 'Üç Çekiç Savaşı'],
    tr: {
      sub: 'Dwarf iç savaşı · Dark Portal’dan ~230 yıl önce',
      text: 'Anvilmar’ın ölümünden sonra Bronzebeard, Wildhammer ve Dark Iron klanları arasında Ironforge tahtı için çıkan iç savaş. Bronzebeard’lar kazandı; Dark Iron’ların çağırdığı Ragnaros Blackrock Mountain’ı yarattı.',
    },
    en: {
      sub: 'Dwarven civil war · ~230 years before the Dark Portal',
      text: 'The civil war for the throne of Ironforge between the Bronzebeard, Wildhammer and Dark Iron clans after Anvilmar died. The Bronzebeards won; Ragnaros, summoned by the Dark Irons, raised Blackrock Mountain.',
    },
  },
  {
    id: 'council3',
    name: 'Council of Three Hammers',
    icon: 'inv_banner_03',
    aliases: ['Council of Three Hammers', 'Üç Çekiç Konseyi'],
    tr: {
      sub: 'Ironforge’un konseyi',
      text: 'Sonraki yıllarda, Magni’nin yokluğunda Ironforge’u yönetecek konsey: Bronzebeard, Wildhammer ve Dark Iron klanları birer temsilciyle oturur.',
    },
    en: {
      sub: 'Council of Ironforge',
      text: 'The council that would rule Ironforge in later years, while Magni was gone: the Bronzebeard, Wildhammer and Dark Iron clans each send one member.',
    },
  },
  {
    id: 'redridge',
    name: 'Redridge Mountains',
    icon: 'spell_nature_earthquake',
    aliases: ['Redridge Mountains', 'Redridge'],
    tr: {
      sub: 'Dağlar · Elwynn’in doğusu',
      text: 'Elwynn Forest’ın doğusundaki dağlar. Üç Çekiç Savaşı’ndan sonra Thaurissan karargâhını bu sıradağlarda kurdu; Ragnaros’un gelişiyle dağların bir kısmı Blackrock Mountain’a dönüştü.',
      note: 'Redridge Mountains',
    },
    en: {
      sub: 'Mountains · east of Elwynn',
      text: 'The mountains east of Elwynn Forest. After the War of the Three Hammers Thaurissan made his stronghold in this range; when Ragnaros came, part of it became Blackrock Mountain.',
      note: 'Redridge Mountains',
    },
  },
  {
    id: 'dunalgaz',
    name: 'Dun Algaz',
    icon: 'ability_townwatch',
    aliases: ['Dun Algaz'],
    tr: {
      sub: 'Dağ geçidi',
      text: 'Dun Morogh ve Loch Modan’ı Wetlands’e bağlayan dağ geçidi.',
    },
    en: {
      sub: 'Mountain pass',
      text: 'The mountain pass that joins Dun Morogh and Loch Modan to the Wetlands.',
    },
  },
  {
    id: 'wetlands',
    name: 'Wetlands',
    icon: 'trade_fishing',
    aliases: ['Wetlands'],
    tr: {
      sub: 'Bölge · Khaz Modan’ın kuzeyi',
      text: 'Khaz Modan’ın kuzeyindeki bataklık bölge; Grim Batol, Dun Algaz ve Menethil Harbor burada.',
    },
    en: {
      sub: 'Region · north of Khaz Modan',
      text: 'The marshy region north of Khaz Modan, home of Grim Batol, Dun Algaz and Menethil Harbor.',
    },
  },
  {
    id: 'ashbringer',
    name: 'Ashbringer',
    icon: 'spell_holy_sealofwrath',
    aliases: ['Ashbringer'],
    tr: {
      sub: 'Kutsal kılıç',
      text: 'Magni’nin dövdüğü kutsal kılıç; ölümsüzlere karşı Light’ın en güçlü silahlarından biri.',
    },
    en: {
      sub: 'Holy blade',
      text: 'The holy sword forged by Magni, one of the Light’s mightiest weapons against the undead.',
    },
  },
  {
    id: 'frostborn',
    name: 'Frostborn',
    icon: 'spell_frost_frost',
    aliases: ['Frostborn'],
    tr: {
      sub: 'Northrend dwarf’ları',
      text: 'Northrend’in Storm Peaks bölgesinde yaşayan, buzla yoğrulmuş dwarf’lar.',
    },
    en: {
      sub: 'Dwarves of Northrend',
      text: 'The frost-hardened dwarves of Northrend’s Storm Peaks.',
    },
  },

  // ---------------------------------------------------------------- Night Elf story
  {
    id: 'teldrassil',
    name: 'Teldrassil',
    icon: 'spell_arcane_teleportdarnassus',
    aliases: ['Teldrassil'],
    tr: {
      sub: 'Yeni World Tree',
      text: 'Archdruid Fandral Staghelm’in Third War’dan sonra Darkshore açıklarına diktiği dev ağaç; amacı night elf’lerin kaybettiği ölümsüzlüğü geri kazanmaktı. Ejderha Aspect’leri ağacı kutsamadı ve dallarının arasında yozlaşma izleri görülüyor. Tepesinde Darnassus var.',
      note: 'Teldrassil',
    },
    en: {
      sub: 'The new World Tree',
      text: 'The giant tree Archdruid Fandral Staghelm planted off Darkshore after the Third War, hoping to win back the immortality the night elves had lost. The Dragon Aspects did not bless it, and signs of corruption show among its branches. Darnassus stands on its crown.',
      note: 'Teldrassil',
    },
  },
  {
    id: 'darnassus',
    name: 'Darnassus',
    icon: 'spell_arcane_portaldarnassus',
    aliases: ['Darnassus'],
    tr: {
      sub: 'Night elf başkenti',
      text: 'Teldrassil’in tepesine kurulu night elf başkenti. Tyrande’nin Temple of the Moon’u ve druid’lerin Cenarion Enclave’i burada.',
      note: 'Teldrassil',
    },
    en: {
      sub: 'Capital of the night elves',
      text: 'The night elf capital on the crown of Teldrassil, home of Tyrande’s Temple of the Moon and the druids’ Cenarion Enclave.',
      note: 'Teldrassil',
    },
  },
  {
    id: 'tyrande',
    name: 'Tyrande Whisperwind',
    icon: 'spell_holy_elunesgrace',
    aliases: ['Tyrande Whisperwind', 'Tyrande'],
    tr: {
      sub: 'Elune’ün Yüce Rahibesi · Sentinel’lerin lideri',
      text: 'War of the Ancients’ta Elune’ün genç bir rahibesiydi ve Malfurion’la birlikte direnişe önderlik etti. On bin yıl boyunca Sentinel’leri yönetip halkını korudu; bugün night elf’leri Darnassus’tan yönetiyor.',
      note: 'Temple of the Moon, Darnassus',
    },
    en: {
      sub: 'High Priestess of Elune · leader of the Sentinels',
      text: 'A young priestess of Elune in the War of the Ancients who led the resistance with Malfurion. For ten thousand years she led the Sentinels and guarded her people; today she rules the night elves from Darnassus.',
      note: 'Temple of the Moon, Darnassus',
    },
  },
  {
    id: 'fandral',
    name: 'Fandral Staghelm',
    icon: 'ability_druid_travelform',
    aliases: ['Fandral Staghelm', 'Fandral'],
    tr: {
      sub: 'Archdruid',
      text: 'Malfurion’un yokluğunda druid’lerin lideri. Oğlu Valstann’ı War of the Shifting Sands’te kaybetti. Ölümsüzlüğü geri getirmek için Teldrassil’i dikti; Aspect’lerin onayı olmadan dikilen ağaç bugün tartışmalı.',
      note: 'Cenarion Enclave, Darnassus',
    },
    en: {
      sub: 'Archdruid',
      text: 'Leader of the druids while Malfurion is gone. He lost his son Valstann in the War of the Shifting Sands. He planted Teldrassil to bring back immortality; a tree planted without the Aspects’ blessing is a matter of dispute today.',
      note: 'Cenarion Enclave, Darnassus',
    },
  },
  {
    id: 'elune',
    name: 'Elune',
    icon: 'spell_nature_moonglow',
    aliases: ['Elune'],
    tr: {
      sub: 'Ay tanrıçası',
      text: 'Night elf’lerin taptığı Ay tanrıçası. Rahibeleri Sisters of Elune’dur ve Tyrande onların yüce rahibesidir.',
    },
    en: {
      sub: 'Goddess of the moon',
      text: 'The moon goddess the night elves worship. Her priestesses are the Sisters of Elune, and Tyrande is their high priestess.',
    },
  },
  {
    id: 'nightsaber',
    name: 'Nightsaber',
    icon: 'ability_druid_catform',
    aliases: ['Nightsaber'],
    tr: {
      sub: 'Night elf bineği',
      text: 'Night elf’lerin bindiği, gece renkli postlu iri kedi; Sentinel’ler savaşa onlarla girer.',
    },
    en: {
      sub: 'Night elf mount',
      text: 'The great night-furred cat the night elves ride; the Sentinels go to war on them.',
    },
  },
  {
    id: 'kaldorei',
    name: 'Kaldorei',
    icon: 'race_nightelf_male',
    aliases: ['Kaldorei', 'kaldorei'],
    tr: {
      sub: 'Night elf’lerin kendi adı',
      text: 'Night elf dilinde “yıldızların çocukları”. Well of Eternity’nin kıyısındaki karanlık trollerden doğan halkın kadim adı.',
    },
    en: {
      sub: 'The night elves’ own name',
      text: '“Children of the stars” in their own tongue; the ancient name of the people born of the dark trolls on the shores of the Well of Eternity.',
    },
  },
  {
    id: 'darktroll',
    name: 'Dark troll',
    icon: 'race_troll_male',
    aliases: ['karanlık trol', 'dark trolls'],
    tr: {
      sub: 'Kalimdor trolleri',
      text: 'Kalimdor’da yaşayan bir troll kabilesi. Well of Eternity’nin kıyısına yerleşenler, Well’in gücüyle değişerek ilk night elf’ler oldu.',
    },
    en: {
      sub: 'Trolls of Kalimdor',
      text: 'A troll tribe of Kalimdor. Those who settled on the shores of the Well of Eternity were changed by its power into the first night elves.',
    },
  },
  {
    id: 'well',
    name: 'Well of Eternity',
    icon: 'spell_arcane_arcane03',
    aliases: ['Well of Eternity'],
    tr: {
      sub: 'Büyünün kaynağı',
      text: 'Kadim Kalimdor’un ortasındaki, büyü dolu sularıyla parlayan göl. Highborne’ların onu kötüye kullanması Burning Legion’ı Azeroth’a çekti; War of the Ancients’ın sonunda çöktü ve Great Sundering’e yol açtı.',
    },
    en: {
      sub: 'The source of magic',
      text: 'The lake at the heart of ancient Kalimdor, shining with waters full of magic. The Highborne’s abuse of it drew the Burning Legion to Azeroth; it collapsed at the end of the War of the Ancients and caused the Great Sundering.',
    },
  },
  {
    id: 'zinazshari',
    name: 'Zin-Azshari',
    icon: 'inv_misc_gem_sapphire_01',
    aliases: ['Zin-Azshari'],
    tr: {
      sub: 'Kadim başkent',
      text: 'Kraliçe Azshara’nın Well of Eternity kıyısındaki görkemli başkenti. Great Sundering’de dalgaların altında kaldı.',
    },
    en: {
      sub: 'The ancient capital',
      text: 'Queen Azshara’s splendid capital on the shore of the Well of Eternity. It sank beneath the waves in the Great Sundering.',
    },
  },
  {
    id: 'azshara',
    name: 'Azshara',
    icon: 'inv_misc_gem_pearl_04',
    aliases: ['Azshara'],
    tr: {
      sub: 'Kadim night elf kraliçesi',
      text: 'Güzelliğine tapılan kraliçe. Sargeras’ın vaatlerine kanıp Burning Legion’a kapıyı açtı. Well çökerken sarayıyla birlikte dalgaların altında kayboldu.',
    },
    en: {
      sub: 'Queen of the ancient night elves',
      text: 'The queen worshipped for her beauty. Swayed by Sargeras’s promises, she opened the door to the Burning Legion, and when the Well collapsed she vanished beneath the waves with her palace.',
    },
  },
  {
    id: 'highborne',
    name: 'Highborne',
    icon: 'spell_arcane_starfire',
    aliases: ['Highborne'],
    tr: {
      sub: 'Night elf soyluları',
      text: 'Azshara’nın sarayındaki büyücü soylular. Well of Eternity’nin gücünü kötüye kullanıp Legion’ı çağırdılar. Kırılmadan sonra büyüden vazgeçmeyenler sürgüne gönderildi ve Quel’Thalas’ta high elf’lere dönüştü.',
    },
    en: {
      sub: 'Night elf nobles',
      text: 'The sorcerer nobles of Azshara’s court. They abused the power of the Well of Eternity and summoned the Legion. After the Sundering, those who would not give up magic were exiled and became the high elves of Quel’Thalas.',
    },
  },
  {
    id: 'ancients',
    name: 'War of the Ancients',
    icon: 'spell_shadow_summoninfernal',
    aliases: ['War of the Ancients'],
    tr: {
      sub: 'Savaş · Dark Portal’dan ~10.000 yıl önce',
      text: 'Burning Legion’ın Well of Eternity’den Azeroth’a geçtiği ilk istila. Malfurion, Tyrande, Illidan ve Cenarius’un önderliğindeki direniş Well’in çöküşüyle sona erdi.',
    },
    en: {
      sub: 'War · ~10,000 years before the Dark Portal',
      text: 'The Burning Legion’s first invasion of Azeroth, through the Well of Eternity. The resistance led by Malfurion, Tyrande, Illidan and Cenarius ended with the Well’s collapse.',
    },
  },
  {
    id: 'malfurion',
    name: 'Malfurion Stormrage',
    icon: 'ability_druid_flourish',
    aliases: ['Malfurion Stormrage', 'Malfurion'],
    tr: {
      sub: 'İlk druid · kayıp',
      text: 'Cenarius’un öğrencisi ve ilk night elf druid’i; Illidan’ın ikiz kardeşi, Tyrande’nin sevdiği adam. War of the Ancients’ta Well’in yok edilmesini sağladı, sonra Nordrassil’i dikti. Third War’dan sonra Emerald Dream’e daldı ve uyanmadı.',
    },
    en: {
      sub: 'The first druid · lost',
      text: 'Cenarius’s student and the first night elf druid; Illidan’s twin and the man Tyrande loves. He brought about the Well’s destruction in the War of the Ancients and then planted Nordrassil. After the Third War he entered the Emerald Dream and did not wake.',
    },
  },
  {
    id: 'illidan',
    name: 'Illidan',
    icon: 'spell_shadow_soulleech_2',
    aliases: ['Illidan Stormrage', 'Illidan'],
    tr: {
      sub: 'Malfurion’un ikizi · sürgün',
      text: 'Well’in yok edilmesine razı olmayıp Mount Hyjal’da yeni bir Well yaratan büyücü. On bin yıl zindanda kaldı; Third War’da serbest bırakılınca Skull of Gul’dan’ın gücünü emdi ve sürgüne gönderildi.',
    },
    en: {
      sub: 'Malfurion’s twin · exile',
      text: 'The sorcerer who would not let the Well be lost and made a new one on Mount Hyjal. He spent ten thousand years in prison; freed in the Third War, he drained the power of the Skull of Gul’dan and was banished.',
    },
  },
  {
    id: 'cenarius',
    name: 'Cenarius',
    icon: 'spell_nature_forceofnature',
    aliases: ['Cenarius'],
    tr: {
      sub: 'Ormanın yarı-tanrısı',
      text: 'Doğanın koruyucusu yarı-tanrı; Malfurion’a druid’liği öğretti. Third War’da Ashenvale’de Grom Hellscream tarafından öldürüldü.',
    },
    en: {
      sub: 'Demigod of the forest',
      text: 'The demigod who guards nature and taught Malfurion the ways of the druid. He was killed by Grom Hellscream in Ashenvale during the Third War.',
    },
  },
  {
    id: 'sundering',
    name: 'Great Sundering',
    icon: 'spell_nature_earthshock',
    aliases: ['Great Sundering', 'Sundering'],
    tr: {
      sub: 'Dünyanın bölünüşü',
      text: 'Well of Eternity’nin çöküşüyle kadim Kalimdor’un paramparça olması. Bugünkü kıtalar ve ortalarında dönen Maelstrom bu felaketten kaldı.',
    },
    en: {
      sub: 'The breaking of the world',
      text: 'The shattering of ancient Kalimdor when the Well of Eternity collapsed. Today’s continents, and the Maelstrom churning between them, are what it left.',
    },
  },
  {
    id: 'maelstrom',
    name: 'Maelstrom',
    icon: 'spell_nature_cyclone',
    aliases: ['Maelstrom'],
    tr: {
      sub: 'Dünyanın ortasındaki girdap',
      text: 'Well of Eternity’nin çöktüğü yerde dönen dev girdap; Great Sundering’in hâlâ kapanmayan yarası.',
    },
    en: {
      sub: 'The whirlpool at the world’s heart',
      text: 'The vast whirlpool turning where the Well of Eternity collapsed; the wound of the Great Sundering that never closed.',
    },
  },
  {
    id: 'nordrassil',
    name: 'Nordrassil',
    icon: 'spell_nature_regeneration',
    aliases: ['Nordrassil'],
    tr: {
      sub: 'World Tree · Mount Hyjal',
      text: 'Malfurion ve druid’lerin Illidan’ın yarattığı ikinci Well’in üzerine diktiği World Tree. Ejderha Aspect’lerinin kutsamasıyla night elf’lere ölümsüzlük verdi. Third War’da Archimonde’u yok etmek için gücü feda edildi.',
    },
    en: {
      sub: 'World Tree · Mount Hyjal',
      text: 'The World Tree Malfurion and the druids planted over the second Well that Illidan made. Blessed by the Dragon Aspects, it gave the night elves immortality. In the Third War its power was spent to destroy Archimonde.',
    },
  },
  {
    id: 'aspects',
    name: 'Dragon Aspects',
    icon: 'inv_misc_head_dragon_01',
    aliases: ['Dragon Aspects', 'Aspect'],
    tr: {
      sub: 'Beş büyük ejderha',
      text: 'Titan’ların dünyayı korumak için güçlendirdiği beş ejderha ailesinin liderleri. Nordrassil’i kutsayıp night elf’lere ölümsüzlük verdiler; Teldrassil’i ise kutsamadılar.',
    },
    en: {
      sub: 'The five great dragons',
      text: 'The leaders of the five dragonflights, empowered by the Titans to guard the world. They blessed Nordrassil and gave the night elves immortality; they did not bless Teldrassil.',
    },
  },
  {
    id: 'maiev',
    name: 'Maiev Shadowsong',
    icon: 'ability_ambush',
    aliases: ['Maiev Shadowsong', 'Maiev'],
    tr: {
      sub: 'Watchers’ın lideri',
      text: 'On bin yıl boyunca Illidan’ın zindanını bekleyen Watchers’ın başı. Third War’da Illidan serbest kalınca onun peşine düştü.',
    },
    en: {
      sub: 'Leader of the Watchers',
      text: 'Head of the Watchers who guarded Illidan’s prison for ten thousand years. When he was freed in the Third War she set out after him.',
    },
  },
  {
    id: 'watchers',
    name: 'Watchers',
    icon: 'spell_holy_mindvision',
    aliases: ['Watchers'],
    tr: {
      sub: 'Gardiyanlar',
      text: 'Illidan’ı ve night elf’lerin diğer tehlikeli tutsaklarını bekleyen gardiyan tarikatı.',
    },
    en: {
      sub: 'Wardens',
      text: 'The order of wardens that guards Illidan and the night elves’ other dangerous prisoners.',
    },
  },
  {
    id: 'barrowden',
    name: 'Barrow Den',
    icon: 'spell_nature_sleep',
    aliases: ['Barrow Dens', 'Barrow Den'],
    tr: {
      sub: 'Druid’lerin uyku yeri',
      text: 'Druid’lerin Emerald Dream’de dolaşmak için uyudukları yeraltı odaları.',
    },
    en: {
      sub: 'Where the druids sleep',
      text: 'The underground chambers where druids sleep while they walk the Emerald Dream.',
    },
  },
  {
    id: 'emeralddream',
    name: 'Emerald Dream',
    icon: 'spell_nature_naturetouchgrow',
    aliases: ['Emerald Dream'],
    tr: {
      sub: 'Doğanın düş âlemi',
      text: 'Azeroth’un el değmemiş hâlini yansıtan ruhani âlem; yeşil ejderha Ysera tarafından korunur. Druid’ler bu âlemde dolaşır, Malfurion orada kayboldu.',
    },
    en: {
      sub: 'The dream of nature',
      text: 'The spirit realm that mirrors Azeroth as it was before anyone touched it, watched over by the green dragon Ysera. Druids walk it, and Malfurion was lost there.',
    },
  },
  {
    id: 'sentinels',
    name: 'Sentinels',
    icon: 'spell_nature_sentinal',
    aliases: ['Sentinels', 'Sentinel'],
    tr: {
      sub: 'Night elf muhafızları',
      text: 'Tyrande’nin komutasındaki kadın savaşçılar. Druid’ler uyurken on bin yıl boyunca night elf topraklarını korudular; bugün Ashenvale’de Horde’la savaşıyorlar.',
    },
    en: {
      sub: 'Night elf guardians',
      text: 'The women warriors under Tyrande’s command. They guarded night elf lands for ten thousand years while the druids slept, and today they fight the Horde in Ashenvale.',
    },
  },
  {
    id: 'ahnqiraj',
    name: 'Ahn’Qiraj',
    icon: 'spell_nature_insectswarm',
    aliases: ['Ahn’Qiraj'],
    tr: {
      sub: 'Qiraji kalesi · Silithus',
      text: 'Silithus’taki qiraji kalesi; altında Old God C’Thun yatıyor. War of the Shifting Sands’ten beri Scarab Wall’un ardında mühürlü.',
      note: 'Silithus',
    },
    en: {
      sub: 'Qiraji fortress · Silithus',
      text: 'The qiraji fortress in Silithus, with the Old God C’Thun beneath it. It has been sealed behind the Scarab Wall since the War of the Shifting Sands.',
      note: 'Silithus',
    },
  },
  {
    id: 'qiraji',
    name: 'Qiraji',
    icon: 'spell_nature_insectswarm',
    aliases: ['qiraji'],
    tr: {
      sub: 'Böcek halkı',
      text: 'Ahn’Qiraj’da yaşayan ve Old God C’Thun’a hizmet eden böcek halkı.',
    },
    en: {
      sub: 'The insect people',
      text: 'The insect people of Ahn’Qiraj who serve the Old God C’Thun.',
    },
  },
  {
    id: 'shiftingsands',
    name: 'War of the Shifting Sands',
    icon: 'spell_nature_earthbind',
    aliases: ['War of the Shifting Sands'],
    tr: {
      sub: 'Savaş · yaklaşık bin yıl önce',
      text: 'Qiraji’lerin Ahn’Qiraj’dan taşıp Kalimdor’u tehdit ettiği savaş. Night elf’ler bronz ejderhaların yardımıyla onları Scarab Wall’un ardına kapattı.',
    },
    en: {
      sub: 'War · about a thousand years ago',
      text: 'The war in which the qiraji poured out of Ahn’Qiraj and threatened Kalimdor. The night elves, helped by the bronze dragons, sealed them behind the Scarab Wall.',
    },
  },
  {
    id: 'scarabwall',
    name: 'Scarab Wall',
    icon: 'spell_nature_stoneclawtotem',
    aliases: ['Scarab Wall'],
    tr: {
      sub: 'Ahn’Qiraj’ı mühürleyen sur',
      text: 'War of the Shifting Sands’in sonunda bronz ejderhaların gücüyle örülen dev büyülü duvar; qiraji’leri Ahn’Qiraj’ın içinde tutuyor.',
      note: 'Silithus',
    },
    en: {
      sub: 'The wall that seals Ahn’Qiraj',
      text: 'The great enchanted wall raised with the bronze dragons’ power at the end of the War of the Shifting Sands; it keeps the qiraji inside Ahn’Qiraj.',
      note: 'Silithus',
    },
  },
  {
    id: 'valstann',
    name: 'Valstann Staghelm',
    icon: 'ability_hunter_snipershot',
    aliases: ['Valstann'],
    tr: {
      sub: 'Fandral’ın oğlu',
      text: 'War of the Shifting Sands’te qiraji’lere karşı savaşırken öldürülen genç night elf; ölümü babası Fandral’ı derinden değiştirdi.',
    },
    en: {
      sub: 'Fandral’s son',
      text: 'The young night elf killed fighting the qiraji in the War of the Shifting Sands; his death changed his father Fandral deeply.',
    },
  },
  {
    id: 'silithus',
    name: 'Silithus',
    icon: 'spell_nature_insectswarm',
    aliases: ['Silithus'],
    tr: {
      sub: 'Bölge · Kalimdor’un güneyi',
      text: 'Kalimdor’un güneyindeki çöl; Ahn’Qiraj ve Scarab Wall burada.',
      note: 'Silithus',
    },
    en: {
      sub: 'Region · southern Kalimdor',
      text: 'The desert in the south of Kalimdor, home of Ahn’Qiraj and the Scarab Wall.',
      note: 'Silithus',
    },
  },
  {
    id: 'cthun',
    name: 'C’Thun',
    icon: 'inv_misc_eye_01',
    aliases: ['C’Thun'],
    tr: {
      sub: 'Old God',
      text: 'Ahn’Qiraj’ın altında hapsedilmiş Old God; qiraji’ler ona hizmet eder.',
    },
    en: {
      sub: 'Old God',
      text: 'The Old God imprisoned beneath Ahn’Qiraj, served by the qiraji.',
    },
  },
  {
    id: 'moonglade',
    name: 'Moonglade',
    icon: 'spell_arcane_teleportmoonglade',
    aliases: ['Moonglade'],
    tr: {
      sub: 'Druid’lerin vadisi',
      text: 'Kalimdor’un kuzeyinde, druid’lerin kutsal saydığı huzurlu vadi; Cenarion Circle’ın merkezi Nighthaven burada.',
      note: 'Moonglade',
    },
    en: {
      sub: 'Vale of the druids',
      text: 'The peaceful vale in northern Kalimdor that the druids hold sacred; Nighthaven, heart of the Cenarion Circle, lies here.',
      note: 'Moonglade',
    },
  },
  {
    id: 'cenarioncircle',
    name: 'Cenarion Circle',
    icon: 'spell_nature_healingtouch',
    aliases: ['Cenarion Circle'],
    tr: {
      sub: 'Druid’ler birliği',
      text: 'Night elf ve tauren druid’lerinin birlikte oluşturduğu örgüt; doğayı korumak için Kalimdor’un dört bir yanında çalışıyor.',
      note: 'Nighthaven, Moonglade',
    },
    en: {
      sub: 'Order of druids',
      text: 'The order night elf and tauren druids share, working across Kalimdor to protect nature.',
      note: 'Nighthaven, Moonglade',
    },
  },
  {
    id: 'nighthaven',
    name: 'Nighthaven',
    icon: 'spell_nature_moonglow',
    aliases: ['Nighthaven'],
    tr: {
      sub: 'Moonglade köyü',
      text: 'Moonglade’deki druid köyü; Cenarion Circle burada toplanır.',
      note: 'Moonglade',
    },
    en: {
      sub: 'Village in Moonglade',
      text: 'The druid village in Moonglade where the Cenarion Circle gathers.',
      note: 'Moonglade',
    },
  },
  {
    id: 'thrall',
    name: 'Thrall',
    icon: 'spell_nature_bloodlust',
    aliases: ['Thrall'],
    tr: {
      sub: 'Horde’un warchief’i',
      text: 'Toplama kamplarında büyüyen orc. Horde’u yeniden kurdu ve Third War’da halkını Kalimdor’a götürdü; orada Durotar’ı ve başkenti Orgrimmar’ı kurdu.',
      note: 'Orgrimmar',
    },
    en: {
      sub: 'Warchief of the Horde',
      text: 'The orc who grew up in the internment camps. He rebuilt the Horde, led his people to Kalimdor in the Third War and founded Durotar and its capital, Orgrimmar.',
      note: 'Orgrimmar',
    },
  },
  {
    id: 'grom',
    name: 'Grom Hellscream',
    icon: 'ability_warrior_warcry',
    aliases: ['Grom Hellscream', 'Grom'],
    tr: {
      sub: 'Warsong klanının şefi',
      text: 'Third War’da Ashenvale’in ormanlarını kestiren Warsong orc’larının lideri. Demon kanı içerek güçlendi ve Cenarius’u öldürdü; sonra lanetten kurtuldu ve Mannoroth’u öldürürken kendisi de öldü.',
    },
    en: {
      sub: 'Chieftain of the Warsong clan',
      text: 'Leader of the Warsong orcs who cut down Ashenvale’s forests in the Third War. He drank demon blood, gained its strength and killed Cenarius; later he broke free of the curse and died killing Mannoroth.',
    },
  },
  {
    id: 'warsong',
    name: 'Warsong',
    icon: 'inv_axe_09',
    aliases: ['Warsong'],
    tr: {
      sub: 'Orc klanı',
      text: 'Grom Hellscream’in klanı. Ashenvale’de night elf ormanlarını kesip kereste toplayan orc’lar; Sentinel’lerle savaşları bugün de sürüyor.',
      note: 'Ashenvale',
    },
    en: {
      sub: 'Orc clan',
      text: 'Grom Hellscream’s clan, the orcs who log the night elves’ forests in Ashenvale; their war with the Sentinels goes on today.',
      note: 'Ashenvale',
    },
  },
  {
    id: 'ashenvale',
    name: 'Ashenvale',
    icon: 'spell_nature_protectionformnature',
    aliases: ['Ashenvale'],
    tr: {
      sub: 'Bölge · Kalimdor',
      text: 'Night elf’lerin kadim ormanı; Cenarius burada öldü. Bugün Sentinel’ler ile Horde arasında bitmeyen bir savaş alanı.',
      note: 'Ashenvale',
    },
    en: {
      sub: 'Region · Kalimdor',
      text: 'The ancient forest of the night elves, where Cenarius died. Today it is an endless battleground between the Sentinels and the Horde.',
      note: 'Ashenvale',
    },
  },
  {
    id: 'skull',
    name: 'Skull of Gul’dan',
    icon: 'inv_misc_bone_10',
    aliases: ['Skull of Gul’dan'],
    tr: {
      sub: 'Lanetli kafatası',
      text: 'Ölen orc büyücüsü Gul’dan’ın demon gücüyle dolu kafatası. Third War’da Illidan onun gücünü emdi; kafatasının zehri Felwood’u yozlaştırdı.',
    },
    en: {
      sub: 'The cursed skull',
      text: 'The skull of the dead orc warlock Gul’dan, full of demonic power. In the Third War Illidan drained its power, and its poison corrupted Felwood.',
    },
  },
  {
    id: 'tichondrius',
    name: 'Tichondrius',
    icon: 'spell_shadow_haunting',
    aliases: ['Tichondrius'],
    tr: {
      sub: 'Dreadlord',
      text: 'Burning Legion’ın dreadlord komutanlarından; Third War’da Legion’ın planlarını yönetenlerden biri. Illidan, Skull of Gul’dan’ın gücüyle onu öldürdü.',
    },
    en: {
      sub: 'Dreadlord',
      text: 'One of the Burning Legion’s dreadlord commanders and among those who ran the Legion’s plans in the Third War. Illidan killed him with the power of the Skull of Gul’dan.',
    },
  },
  {
    id: 'felwood',
    name: 'Felwood',
    icon: 'spell_shadow_soulgem',
    aliases: ['Felwood'],
    tr: {
      sub: 'Bölge · yozlaşmış orman',
      text: 'Bir zamanlar Ashenvale’in parçası olan orman; Legion’ın ve Skull of Gul’dan’ın etkisiyle zehirlendi. Bugün Cenarion Circle onu iyileştirmeye çalışıyor.',
      note: 'Felwood',
    },
    en: {
      sub: 'Region · the corrupted forest',
      text: 'A forest that was once part of Ashenvale, poisoned by the Legion and the Skull of Gul’dan. The Cenarion Circle is trying to heal it.',
      note: 'Felwood',
    },
  },
  {
    id: 'horn',
    name: 'Horn of Cenarius',
    icon: 'inv_misc_horn_03',
    aliases: ['Horn of Cenarius'],
    tr: {
      sub: 'Kadim boru',
      text: 'Malfurion’un Mount Hyjal’da çaldığı kutsal boru; çağrısıyla gelen wisp’ler Archimonde’u yok etti.',
    },
    en: {
      sub: 'The ancient horn',
      text: 'The sacred horn Malfurion sounded on Mount Hyjal; the wisps it called destroyed Archimonde.',
    },
  },
  {
    id: 'wisp',
    name: 'Wisp',
    icon: 'spell_nature_wispsplode',
    aliases: ['wisps', 'wisp'],
    tr: {
      sub: 'Night elf ruhları',
      text: 'Night elf’lerin ölümden sonra dönüştüğü ışık ruhları. Mount Hyjal’da binlerce wisp Archimonde’u sardı ve Nordrassil’in gücüyle onu yok etti.',
    },
    en: {
      sub: 'Night elf spirits',
      text: 'Spirits of light the night elves become after death. On Mount Hyjal thousands of wisps swarmed Archimonde and destroyed him with Nordrassil’s power.',
    },
  },
  {
    id: 'darkshore',
    name: 'Darkshore',
    icon: 'spell_nature_starfall',
    aliases: ['Darkshore'],
    tr: {
      sub: 'Bölge · Kalimdor’un kuzeybatısı',
      text: 'Teldrassil’in karşısındaki kıyı bölgesi; Auberdine burada.',
      note: 'Darkshore',
    },
    en: {
      sub: 'Region · north-western Kalimdor',
      text: 'The coast across from Teldrassil, home of Auberdine.',
      note: 'Darkshore',
    },
  },
  {
    id: 'temple',
    name: 'Temple of the Moon',
    icon: 'spell_holy_elunesgrace',
    aliases: ['Temple of the Moon'],
    tr: {
      sub: 'Elune’ün tapınağı',
      text: 'Darnassus’taki Elune tapınağı; Tyrande Whisperwind burada bulunur.',
      note: 'Darnassus',
    },
    en: {
      sub: 'Temple of Elune',
      text: 'The temple of Elune in Darnassus, where Tyrande Whisperwind is found.',
      note: 'Darnassus',
    },
  },
  {
    id: 'shadowglen',
    name: 'Shadowglen',
    icon: 'spell_nature_rejuvenation',
    aliases: ['Shadowglen'],
    tr: {
      sub: 'Başlangıç vadisi',
      text: 'Teldrassil’deki vadi; night elf karakterler oyuna burada başlar.',
      note: 'Teldrassil',
    },
    en: {
      sub: 'Starting vale',
      text: 'The vale on Teldrassil where night elf characters begin the game.',
      note: 'Teldrassil',
    },
  },
  {
    id: 'dolanaar',
    name: 'Dolanaar',
    icon: 'spell_nature_regenerate',
    aliases: ['Dolanaar'],
    tr: {
      sub: 'Teldrassil köyü',
      text: 'Teldrassil’in ortasındaki night elf köyü.',
      note: 'Teldrassil',
    },
    en: {
      sub: 'Village on Teldrassil',
      text: 'The night elf village in the middle of Teldrassil.',
      note: 'Teldrassil',
    },
  },
  {
    id: 'ruttheran',
    name: 'Rut’theran Village',
    icon: 'trade_fishing',
    aliases: ['Rut’theran Village'],
    tr: {
      sub: 'Teldrassil limanı',
      text: 'Teldrassil’in kökündeki köy; Auberdine’e giden gemi buradan kalkar.',
      note: 'Teldrassil',
    },
    en: {
      sub: 'Teldrassil’s harbour',
      text: 'The village at the foot of Teldrassil, where the boat to Auberdine leaves.',
      note: 'Teldrassil',
    },
  },
  {
    id: 'auberdine',
    name: 'Auberdine',
    icon: 'trade_fishing',
    aliases: ['Auberdine'],
    tr: {
      sub: 'Darkshore limanı',
      text: 'Darkshore kıyısındaki night elf kasabası; gemiler buradan Teldrassil’e ve Menethil Harbor’a gider.',
      note: 'Darkshore',
    },
    en: {
      sub: 'Harbour of Darkshore',
      text: 'The night elf town on the Darkshore coast, with boats to Teldrassil and Menethil Harbor.',
      note: 'Darkshore',
    },
  },
  {
    id: 'astranaar',
    name: 'Astranaar',
    icon: 'spell_nature_sentinal',
    aliases: ['Astranaar'],
    tr: {
      sub: 'Ashenvale karakolu',
      text: 'Ashenvale’in ortasında, bir göl adasına kurulu night elf kasabası.',
      note: 'Ashenvale',
    },
    en: {
      sub: 'Outpost in Ashenvale',
      text: 'The night elf town on an island in a lake in the middle of Ashenvale.',
      note: 'Ashenvale',
    },
  },
  {
    id: 'feathermoon',
    name: 'Feathermoon Stronghold',
    icon: 'spell_nature_starfall',
    aliases: ['Feathermoon Stronghold'],
    tr: {
      sub: 'Feralas kalesi',
      text: 'Feralas açıklarındaki adada kurulu Sentinel kalesi.',
      note: 'Feralas',
    },
    en: {
      sub: 'Fortress in Feralas',
      text: 'The Sentinel fortress on an island off the coast of Feralas.',
      note: 'Feralas',
    },
  },
  {
    id: 'feralas',
    name: 'Feralas',
    icon: 'spell_nature_thorns',
    aliases: ['Feralas'],
    tr: {
      sub: 'Bölge · Kalimdor’un batısı',
      text: 'Kalimdor’un batı kıyısındaki yağmur ormanları; açıklarında Feathermoon Stronghold var.',
    },
    en: {
      sub: 'Region · western Kalimdor',
      text: 'The rainforests on Kalimdor’s west coast, with Feathermoon Stronghold offshore.',
    },
  },
  {
    id: 'menethil',
    name: 'Menethil Harbor',
    icon: 'trade_fishing',
    aliases: ['Menethil Harbor'],
    tr: {
      sub: 'Wetlands limanı',
      text: 'Wetlands’in batı kıyısındaki liman; Auberdine’den ve Theramore’dan gelen gemiler burada yanaşır.',
      note: 'Wetlands',
    },
    en: {
      sub: 'Harbour of the Wetlands',
      text: 'The harbour on the west coast of the Wetlands, where the boats from Auberdine and Theramore come in.',
      note: 'Wetlands',
    },
  },

  // ---------------------------------------------------------------- Orc story
  {
    id: 'nerzhul',
    name: 'Ner’zhul',
    icon: 'spell_nature_ancestralguardian',
    aliases: ['Ner’zhul'],
    tr: {
      sub: 'Shadowmoon klanının yaşlı shaman’ı',
      text: 'Draenor’daki orc’ların en saygı gören shaman’ı. Kil’jaeden onu ataların sesiyle aldattı; Ner’zhul gerçeği görünce çırağı Gul’dan onun yerini aldı. Second War’dan sonra Draenor’da kalan Horde’un başına geçti; açtığı yeni geçitler Draenor’u parçaladı ve Kil’jaeden onun ruhundan Lich King’i yarattı.',
    },
    en: {
      sub: 'Elder shaman of the Shadowmoon clan',
      text: 'The most revered shaman of the orcs of Draenor. Kil’jaeden deceived him in the voice of the ancestors; when Ner’zhul saw the truth, his apprentice Gul’dan took his place. After the Second War he led the Horde left on Draenor; the new gateways he opened tore Draenor apart, and Kil’jaeden made the Lich King out of his spirit.',
    },
  },
  {
    id: 'kiljaeden',
    name: 'Kil’jaeden',
    icon: 'spell_shadow_metamorphosis',
    aliases: ['Kil’jaeden'],
    tr: {
      sub: 'Burning Legion’ın lordu',
      text: 'Sargeras’ın Burning Legion’daki komutanlarından. Kaçan draenei’lerin peşinde Draenor’a geldi; orc’ları önce Ner’zhul, sonra Gul’dan aracılığıyla yozlaştırıp Legion’ın ordusu yaptı.',
    },
    en: {
      sub: 'Lord of the Burning Legion',
      text: 'One of Sargeras’s commanders in the Burning Legion. Hunting the fleeing draenei, he came to Draenor and corrupted the orcs, first through Ner’zhul and then through Gul’dan, into an army for the Legion.',
    },
  },
  {
    id: 'draenei',
    name: 'Draenei',
    icon: 'spell_holy_holybolt',
    aliases: ['draenei', 'Draenei'],
    tr: {
      sub: 'Draenor’a sığınan halk',
      text: 'Burning Legion’a katılmayı reddedip kendi dünyalarından kaçan halk; peygamberleri Velen’in önderliğinde Draenor’a sığındılar. Kil’jaeden’in kışkırttığı Horde onların çoğunu öldürdü.',
    },
    en: {
      sub: 'The people who found refuge on Draenor',
      text: 'A people who refused to join the Burning Legion and fled their own world; led by their prophet Velen, they found refuge on Draenor. The Horde, stirred up by Kil’jaeden, killed most of them.',
    },
  },
  {
    id: 'shadowcouncil',
    name: 'Shadow Council',
    icon: 'spell_shadow_ritualofsacrifice',
    aliases: ['Shadow Council'],
    tr: {
      sub: 'Gul’dan’ın gizli warlock’ları',
      text: 'Gul’dan’ın Horde’u perde arkasından yönettiği warlock topluluğu. Orc’lara demon büyüsünü yaydılar ve Blackhand’i kukla warchief yaptılar. Orgrim Doomhammer warchief olunca konseyi dağıttı.',
    },
    en: {
      sub: 'Gul’dan’s secret warlocks',
      text: 'The circle of warlocks through which Gul’dan ruled the Horde from behind the scenes. They spread demonic magic among the orcs and made Blackhand a puppet warchief. Orgrim Doomhammer broke up the council when he became warchief.',
    },
  },
  {
    id: 'mannoroth',
    name: 'Mannoroth',
    icon: 'spell_shadow_curseofmannoroth',
    aliases: ['Mannoroth'],
    tr: {
      sub: 'Pit lord · Burning Legion',
      text: 'Burning Legion’ın pit lord’u. Draenor’da klan şefleri onun kanını içti ve Horde Legion’a bağlandı. Third War’da Grom Hellscream’i Ashenvale’de yeniden yozlaştırdı; Demon Fall Canyon’da Grom’un baltasıyla öldü ve orc’ları bağlayan lanet sona erdi.',
    },
    en: {
      sub: 'Pit lord · the Burning Legion',
      text: 'A pit lord of the Burning Legion. On Draenor the clan chieftains drank his blood, binding the Horde to the Legion. In the Third War he corrupted Grom Hellscream again in Ashenvale; he died by Grom’s axe in Demon Fall Canyon, and the curse that bound the orcs ended.',
    },
  },
  {
    id: 'durotan',
    name: 'Durotan',
    icon: 'ability_mount_whitedirewolf',
    aliases: ['Durotan'],
    tr: {
      sub: 'Frostwolf klanının şefi · Thrall’ın babası',
      text: 'Mannoroth’un kanını içmeyi reddeden şef. Gul’dan’a karşı çıktığı için klanıyla birlikte Alterac Mountains’a sürüldü; o ve eşi Draka suikastçılar tarafından öldürüldü. Bebek oğulları Thrall’ı Aedelas Blackmoore buldu. Durotar onun adını taşır.',
    },
    en: {
      sub: 'Chieftain of the Frostwolf clan · Thrall’s father',
      text: 'The chieftain who refused to drink Mannoroth’s blood. For standing against Gul’dan he was exiled with his clan to the Alterac Mountains, where he and his mate Draka were murdered by assassins. Aedelas Blackmoore found their baby son, Thrall. Durotar bears his name.',
    },
  },
  {
    id: 'frostwolf',
    name: 'Frostwolf',
    icon: 'spell_nature_spiritwolf',
    aliases: ['Frostwolf'],
    tr: {
      sub: 'Orc klanı',
      text: 'Durotan’ın klanı. Gul’dan’a karşı çıktıkları için Alterac Mountains’a sürüldüler ve kamplardan uzak kaldılar; Thrall şamanizmi onların yanında öğrendi. Bugün Alterac Valley’de Stormpike dwarf’larıyla savaşıyorlar.',
      note: 'Alterac Valley',
    },
    en: {
      sub: 'Orc clan',
      text: 'Durotan’s clan. Exiled to the Alterac Mountains for standing against Gul’dan, they stayed out of the camps; Thrall learned shamanism among them. Today they fight the Stormpike dwarves in Alterac Valley.',
      note: 'Alterac Valley',
    },
  },
  {
    id: 'blackhand',
    name: 'Blackhand',
    icon: 'ability_warrior_punishingblow',
    aliases: ['Blackhand'],
    tr: {
      sub: 'Blackrock klanının şefi · ilk warchief',
      text: 'Gul’dan’ın Horde’un başına getirdiği şef. First War’da Horde’u yönetti; Orgrim Doomhammer onu bir düelloda öldürdü. Oğulları Rend ve Maim bugün Blackrock Spire’da Dark Horde’un başında.',
    },
    en: {
      sub: 'Chieftain of the Blackrock clan · the first warchief',
      text: 'The chieftain Gul’dan put at the head of the Horde. He led it in the First War, and Orgrim Doomhammer killed him in a duel. His sons Rend and Maim lead the Dark Horde in Blackrock Spire today.',
    },
  },
  {
    id: 'blackrock',
    name: 'Blackrock',
    icon: 'spell_fire_fire',
    aliases: ['Blackrock klanının', 'Blackrock clan'],
    tr: {
      sub: 'Orc klanı',
      text: 'Blackhand’in klanı; Second War’da Horde’un en güçlü kollarından biri. Bugün Blackrock orc’ları Rend Blackhand’in Dark Horde’unda, Blackrock Mountain’da ve Burning Steppes’te savaşıyor.',
      note: 'Blackrock Mountain',
    },
    en: {
      sub: 'Orc clan',
      text: 'Blackhand’s clan, one of the Horde’s strongest in the Second War. Today Blackrock orcs fight in Rend Blackhand’s Dark Horde, in Blackrock Mountain and the Burning Steppes.',
      note: 'Blackrock Mountain',
    },
  },
  {
    id: 'tomb',
    name: 'Tomb of Sargeras',
    icon: 'spell_shadow_curseofsargeras',
    aliases: ['Tomb of Sargeras'],
    tr: {
      sub: 'Denizin dibindeki tapınak',
      text: 'Guardian Aegwynn’in Sargeras’ın bedenini mühürleyip denize gömdüğü tapınak. Gul’dan buradaki gücü ele geçirmek için Second War’ın ortasında Horde’u terk etti; adayı denizden yükseltti, ama içerideki demonlar onu parçaladı.',
    },
    en: {
      sub: 'The temple beneath the sea',
      text: 'The temple where the Guardian Aegwynn sealed Sargeras’s body and sank it into the sea. Gul’dan abandoned the Horde in the middle of the Second War to seize the power there; he raised the isle from the sea, but the demons inside tore him apart.',
    },
  },
  {
    id: 'durnholde',
    name: 'Durnholde Keep',
    icon: 'spell_frost_chainsofice',
    aliases: ['Durnholde Keep', 'Durnholde'],
    tr: {
      sub: 'Kale · toplama kamplarının merkezi',
      text: 'Second War’dan sonra orc toplama kamplarını yöneten kale; komutanı Aedelas Blackmoore’du. Thrall burada köle olarak büyüdü. Bugün yıkık kalede Syndicate haydutları var.',
      note: 'Hillsbrad Foothills',
    },
    en: {
      sub: 'Fortress · seat of the internment camps',
      text: 'The fortress that ran the orc internment camps after the Second War, under Aedelas Blackmoore. Thrall grew up there as a slave. Today Syndicate bandits hold the ruined keep.',
      note: 'Hillsbrad Foothills',
    },
  },
  {
    id: 'blackmoore',
    name: 'Aedelas Blackmoore',
    icon: 'inv_sword_27',
    aliases: ['Aedelas Blackmoore', 'Blackmoore'],
    tr: {
      sub: 'Durnholde Keep’in komutanı',
      text: 'Toplama kamplarından sorumlu Lordaeron soylusu. Bebek Thrall’ı alıp gladyatör olarak yetiştirdi ve onu kendi amaçları için kullanmayı planladı. Thrall’ın Durnholde’a saldırısında öldü.',
    },
    en: {
      sub: 'Commander of Durnholde Keep',
      text: 'The Lordaeron nobleman in charge of the internment camps. He took the infant Thrall, raised him as a gladiator and planned to use him for his own ends. He died in Thrall’s attack on Durnholde.',
    },
  },
  {
    id: 'taretha',
    name: 'Taretha Foxton',
    icon: 'inv_misc_note_02',
    aliases: ['Taretha Foxton', 'Taretha'],
    tr: {
      sub: 'Thrall’ın Durnholde’daki dostu',
      text: 'Durnholde’da hizmetçi olarak çalışan genç kadın. Thrall’la yıllarca gizlice mektuplaştı ve kaçmasına yardım etti; Blackmoore bunu öğrenince onu öldürttü.',
    },
    en: {
      sub: 'Thrall’s friend at Durnholde',
      text: 'A young woman who served at Durnholde. For years she exchanged letters with Thrall in secret and helped him escape; when Blackmoore found out, he had her killed.',
    },
  },
  {
    id: 'drekthar',
    name: 'Drek’Thar',
    icon: 'spell_nature_earthbindtotem',
    aliases: ['Drek’Thar'],
    tr: {
      sub: 'Frostwolf klanının yaşlı shaman’ı',
      text: 'Kör bir shaman ve Frostwolf’ların bilgesi. Thrall’a elementlerle konuşmayı öğretti. Bugün Alterac Valley’de Frostwolf Keep’ten klanını Stormpike dwarf’larına karşı yönetiyor.',
      note: 'Alterac Valley',
    },
    en: {
      sub: 'Elder shaman of the Frostwolf clan',
      text: 'A blind shaman and the wise man of the Frostwolves. He taught Thrall to speak with the elements. Today he leads his clan against the Stormpike dwarves from Frostwolf Keep in Alterac Valley.',
      note: 'Alterac Valley',
    },
  },
  {
    id: 'alteracvalley',
    name: 'Alterac Valley',
    icon: 'inv_misc_pelt_wolf_01',
    aliases: ['Alterac Valley'],
    tr: {
      sub: 'Vadi · Alterac Mountains',
      text: 'Alterac Mountains’ın güneyindeki karlı vadi. Frostwolf orc’ları ile Stormpike dwarf’ları vadinin hâkimiyeti için savaşıyor.',
      note: 'Alterac Mountains',
    },
    en: {
      sub: 'Valley · the Alterac Mountains',
      text: 'The snowy valley in the south of the Alterac Mountains, where the Frostwolf orcs and the Stormpike dwarves fight for control.',
      note: 'Alterac Mountains',
    },
  },
  {
    id: 'stormpike',
    name: 'Stormpike',
    icon: 'inv_hammer_20',
    aliases: ['Stormpike'],
    tr: {
      sub: 'Dwarf seferi',
      text: 'Ironforge’dan gelen Stormpike Guard: Alterac Valley’de kazı yapıp Frostwolf orc’larıyla savaşan dwarf seferi. Komutanları Vanndar Stormpike.',
      note: 'Alterac Valley',
    },
    en: {
      sub: 'Dwarf expedition',
      text: 'The Stormpike Guard from Ironforge: a dwarf expedition digging in Alterac Valley and fighting the Frostwolf orcs. Their commander is Vanndar Stormpike.',
      note: 'Alterac Valley',
    },
  },
  {
    id: 'darkspear',
    name: 'Darkspear',
    icon: 'race_troll_male',
    aliases: ['Darkspear'],
    tr: {
      sub: 'Troll kabilesi',
      text: 'Thrall’ın Kalimdor yolunda, fırtınanın attığı adada tanıştığı troll kabilesi. Şefleri Sen’jin öldükten sonra oğlu Vol’jin’in önderliğinde Horde’a katıldılar; bugün Durotar’da Sen’jin Village ve Echo Isles’ta yaşıyorlar.',
      note: 'Durotar',
    },
    en: {
      sub: 'Troll tribe',
      text: 'The troll tribe Thrall met on his way to Kalimdor, on the island where the storm threw his fleet. After their chief Sen’jin died they joined the Horde under his son Vol’jin; today they live in Sen’jin Village and on the Echo Isles in Durotar.',
      note: 'Durotar',
    },
  },
  {
    id: 'senjin',
    name: 'Sen’jin',
    icon: 'spell_nature_mentalquickness',
    aliases: ['Sen’jin'],
    tr: {
      sub: 'Darkspear’ların eski şefi',
      text: 'Darkspear trollerinin bilge şefi. Horde’un geleceğini bir görüde gördü; adada murloc’lara esir düşüp kurban edildi. Durotar’daki Sen’jin Village onun adını taşır.',
    },
    en: {
      sub: 'Former chief of the Darkspear',
      text: 'The wise chief of the Darkspear trolls. He saw the Horde’s coming in a vision; on the island he was captured by murlocs and sacrificed. Sen’jin Village in Durotar bears his name.',
    },
  },
  {
    id: 'voljin',
    name: 'Vol’jin',
    icon: 'racial_troll_berserk',
    aliases: ['Vol’jin'],
    tr: {
      sub: 'Darkspear’ların şefi',
      text: 'Sen’jin’in oğlu. Babasının ölümünden sonra Darkspear trollerini Horde’a kattı; bugün Thrall’ın en yakın müttefiklerinden.',
      note: 'Orgrimmar',
    },
    en: {
      sub: 'Chief of the Darkspear',
      text: 'Sen’jin’s son. After his father’s death he brought the Darkspear trolls into the Horde; today he is one of Thrall’s closest allies.',
      note: 'Orgrimmar',
    },
  },
  {
    id: 'cairne',
    name: 'Cairne Bloodhoof',
    icon: 'race_tauren_male',
    aliases: ['Cairne Bloodhoof', 'Cairne'],
    tr: {
      sub: 'Tauren’lerin yüce şefi',
      text: 'Tauren kabilelerini birleştiren yaşlı şef. Thrall halkının centaur’lardan kurtulup Mulgore’a yerleşmesine yardım etti; o günden beri Horde’un en sadık dostu. Thunder Bluff’tan yönetiyor.',
      note: 'Thunder Bluff',
    },
    en: {
      sub: 'High chieftain of the tauren',
      text: 'The old chieftain who united the tauren tribes. Thrall helped his people escape the centaurs and settle in Mulgore, and he has been the Horde’s most loyal friend ever since. He rules from Thunder Bluff.',
      note: 'Thunder Bluff',
    },
  },
  {
    id: 'mulgore',
    name: 'Mulgore',
    icon: 'spell_arcane_teleportthunderbluff',
    aliases: ['Mulgore'],
    tr: {
      sub: 'Bölge · tauren’lerin yurdu',
      text: 'The Barrens’ın batısındaki yeşil ovalar. Tauren’ler Third War’dan sonra buraya yerleşti; başkentleri Thunder Bluff burada.',
    },
    en: {
      sub: 'Region · home of the tauren',
      text: 'The green plains west of the Barrens. The tauren settled here after the Third War; their capital, Thunder Bluff, stands here.',
    },
  },
  {
    id: 'barrens',
    name: 'The Barrens',
    icon: 'achievement_zone_barrens_01',
    aliases: ['The Barrens', 'Barrens'],
    tr: {
      sub: 'Bölge · Kalimdor’un ortası',
      text: 'Durotar’ın batısında uzanan sıcak bozkır. Ortasındaki Crossroads, Horde’un Kalimdor’daki yollarının kesiştiği karakol.',
    },
    en: {
      sub: 'Region · the heart of Kalimdor',
      text: 'The hot savannah west of Durotar. The Crossroads in its middle is the outpost where the Horde’s roads in Kalimdor meet.',
    },
  },
  {
    id: 'demonfall',
    name: 'Demon Fall Canyon',
    icon: 'spell_shadow_summoninfernal',
    aliases: ['Demon Fall Canyon'],
    tr: {
      sub: 'Kanyon · Ashenvale',
      text: 'Ashenvale’in doğusundaki kanyon. Grom Hellscream Mannoroth’u burada öldürdü; yakınındaki Grom’s Monument onun anısını taşıyor.',
      note: 'Ashenvale',
    },
    en: {
      sub: 'Canyon · Ashenvale',
      text: 'The canyon in eastern Ashenvale where Grom Hellscream killed Mannoroth; Grom’s Monument nearby keeps his memory.',
      note: 'Ashenvale',
    },
  },
  {
    id: 'durotar',
    name: 'Durotar',
    icon: 'inv_axe_02',
    aliases: ['Durotar'],
    tr: {
      sub: 'Bölge · orc’ların yurdu',
      text: 'Kalimdor’un doğu kıyısındaki kurak, kızıl topraklar. Thrall buraya babası Durotan’ın adını verdi. Orc ve troll karakterler oyuna burada başlar; başkent Orgrimmar bölgenin kuzeyinde.',
    },
    en: {
      sub: 'Region · home of the orcs',
      text: 'The dry red land on Kalimdor’s east coast. Thrall named it after his father, Durotan. Orc and troll characters begin here; the capital, Orgrimmar, lies in the north.',
    },
  },
  {
    id: 'orgrimmar',
    name: 'Orgrimmar',
    icon: 'spell_arcane_teleportorgrimmar',
    aliases: ['Orgrimmar'],
    tr: {
      sub: 'Horde’un başkenti',
      text: 'Durotar’ın kuzeyinde, kayalık bir kanyona kurulu orc başkenti; adını Orgrim Doomhammer’dan alır. Thrall Grommash Hold’dan yönetir; şehrin dışındaki kulelerden zeppelin’ler kalkar.',
      note: 'Durotar',
    },
    en: {
      sub: 'Capital of the Horde',
      text: 'The orc capital built in a rocky canyon in northern Durotar, named after Orgrim Doomhammer. Thrall rules from Grommash Hold; zeppelins leave from the towers outside the city.',
      note: 'Durotar',
    },
  },
  {
    id: 'grommash',
    name: 'Grommash Hold',
    icon: 'ability_warrior_challange',
    aliases: ['Grommash Hold'],
    tr: {
      sub: 'Thrall’ın salonu · Orgrimmar',
      text: 'Orgrimmar’daki büyük salon; adını Grom Hellscream’den (Grommash) alır. Warchief Thrall ve danışmanları burada.',
      note: 'Orgrimmar',
    },
    en: {
      sub: 'Thrall’s hall · Orgrimmar',
      text: 'The great hall of Orgrimmar, named after Grom Hellscream (Grommash). Warchief Thrall and his advisors are here.',
      note: 'Orgrimmar',
    },
  },
  {
    id: 'valleyoftrials',
    name: 'Valley of Trials',
    icon: 'spell_nature_strengthofearthtotem02',
    aliases: ['Valley of Trials'],
    tr: {
      sub: 'Başlangıç vadisi · Durotar',
      text: 'Durotar’ın güneyindeki vadi; orc ve troll karakterler oyuna burada başlar.',
      note: 'Durotar',
    },
    en: {
      sub: 'Starting valley · Durotar',
      text: 'The valley in southern Durotar where orc and troll characters begin.',
      note: 'Durotar',
    },
  },
  {
    id: 'razorhill',
    name: 'Razor Hill',
    icon: 'inv_axe_12',
    aliases: ['Razor Hill'],
    tr: {
      sub: 'Kasaba · Durotar',
      text: 'Durotar’ın ortasındaki orc kasabası; Valley of Trials’tan çıkan maceracıların Orgrimmar yolundaki ilk durağı.',
      note: 'Durotar',
    },
    en: {
      sub: 'Town · Durotar',
      text: 'The orc town in the middle of Durotar; the first stop on the road to Orgrimmar for adventurers leaving the Valley of Trials.',
      note: 'Durotar',
    },
  },
  {
    id: 'senjinvillage',
    name: 'Sen’jin Village',
    icon: 'trade_fishing',
    aliases: ['Sen’jin Village'],
    tr: {
      sub: 'Köy · Durotar',
      text: 'Durotar’ın güney kıyısındaki Darkspear köyü; adını şef Sen’jin’den alır.',
      note: 'Durotar',
    },
    en: {
      sub: 'Village · Durotar',
      text: 'The Darkspear village on Durotar’s south coast, named after the chief Sen’jin.',
      note: 'Durotar',
    },
  },
  {
    id: 'echoisles',
    name: 'Echo Isles',
    icon: 'spell_nature_cyclone',
    aliases: ['Echo Isles'],
    tr: {
      sub: 'Adalar · Durotar',
      text: 'Durotar’ın güney kıyısı açıklarındaki adalar; Darkspear trollerinin yurdu. Kendini kara büyüye kaptıran witch doctor Zalazane adaları ele geçirdi ve Darkspear’lar karşı kıyıya, Sen’jin Village’a çekildi.',
      note: 'Durotar',
    },
    en: {
      sub: 'Islands · Durotar',
      text: 'The islands off Durotar’s south coast, home of the Darkspear trolls. The witch doctor Zalazane, lost to dark magic, has taken them, and the Darkspear have withdrawn to Sen’jin Village on the shore.',
      note: 'Durotar',
    },
  },
  {
    id: 'tiragarde',
    name: 'Tiragarde Keep',
    icon: 'inv_shield_05',
    aliases: ['Tiragarde Keep'],
    tr: {
      sub: 'Kale · Durotar',
      text: 'Durotar’ın doğu kıyısında, Daelin Proudmoore’un saldırısından kalan Kul Tiras kalesi; askerleri hâlâ burada.',
      note: 'Durotar',
    },
    en: {
      sub: 'Fortress · Durotar',
      text: 'The Kul Tiras fortress on Durotar’s east coast, left over from Daelin Proudmoore’s attack; its soldiers are still there.',
      note: 'Durotar',
    },
  },
  {
    id: 'eitrigg',
    name: 'Eitrigg',
    icon: 'inv_shield_06',
    aliases: ['Eitrigg'],
    tr: {
      sub: 'Thrall’ın danışmanı',
      text: 'Second War’ın gazisi; savaştan sonra Horde’dan ayrıldı. Lordaeron’da paladin Tirion Fordring onun hayatını bağışladı ve onu savunduğu için şövalyeliğini kaybetti. Eitrigg sonra Thrall’ın Horde’una katıldı.',
      note: 'Orgrimmar',
    },
    en: {
      sub: 'Thrall’s advisor',
      text: 'A veteran of the Second War who left the Horde after the war. In Lordaeron the paladin Tirion Fordring spared his life and lost his knighthood for defending him. Eitrigg later joined Thrall’s Horde.',
      note: 'Orgrimmar',
    },
  },
  {
    id: 'tirion',
    name: 'Tirion Fordring',
    icon: 'spell_holy_sealofwrath',
    aliases: ['Tirion Fordring'],
    tr: {
      sub: 'Sürgündeki paladin',
      text: 'Lordaeron’un saygın paladin’i. Orc gazi Eitrigg’in hayatını bağışlayıp onu savunduğu için unvanını kaybetti ve sürgüne gönderildi; bugün Plaguelands’de münzevi bir hayat sürüyor.',
    },
    en: {
      sub: 'The exiled paladin',
      text: 'A respected paladin of Lordaeron. For sparing the orc veteran Eitrigg and defending him, he was stripped of his title and exiled; today he lives as a hermit in the Plaguelands.',
    },
  },
  {
    id: 'rend',
    name: 'Rend Blackhand',
    icon: 'inv_misc_head_dragon_black',
    aliases: ['Rend Blackhand'],
    tr: {
      sub: 'Dark Horde’un warchief’i',
      text: 'Blackhand’in oğlu. Thrall’ı tanımayıp Blackrock Spire’da kendini warchief ilan etti ve Dark Horde’u kurdu; Blackrock orc’larını kara ejderha Nefarian’ın hizmetine soktu.',
      note: 'Blackrock Spire',
    },
    en: {
      sub: 'Warchief of the Dark Horde',
      text: 'Blackhand’s son. Refusing to follow Thrall, he proclaimed himself warchief in Blackrock Spire and founded the Dark Horde, putting the Blackrock orcs in the service of the black dragon Nefarian.',
      note: 'Blackrock Spire',
    },
  },
  {
    id: 'darkhorde',
    name: 'Dark Horde',
    icon: 'spell_shadow_ragingscream',
    aliases: ['Dark Horde'],
    tr: {
      sub: 'Orc ordusu · Blackrock Spire',
      text: 'Rend Blackhand’in Thrall’a karşı Blackrock Spire’da kurduğu orc ordusu; kara ejderha Nefarian’ın hizmetinde.',
      note: 'Blackrock Spire',
    },
    en: {
      sub: 'Orc army · Blackrock Spire',
      text: 'The orc army Rend Blackhand raised against Thrall in Blackrock Spire, in the service of the black dragon Nefarian.',
      note: 'Blackrock Spire',
    },
  },
  {
    id: 'burningblade',
    name: 'Burning Blade',
    icon: 'spell_fire_flametounge',
    aliases: ['Burning Blade'],
    tr: {
      sub: 'Kült',
      text: 'Demon büyüsünden vazgeçmeyen orc’ların kültü. Durotar’ın mağaralarında ve Desolace’taki Thunder Axe Fortress’ta saklanıp Burning Legion’a hizmet ediyorlar.',
      note: 'Durotar · Desolace',
    },
    en: {
      sub: 'Cult',
      text: 'The cult of orcs who would not give up demonic magic. They hide in the caves of Durotar and in Thunder Axe Fortress in Desolace, serving the Burning Legion.',
      note: 'Durotar · Desolace',
    },
  },
  {
    id: 'desolace',
    name: 'Desolace',
    icon: 'spell_shadow_deathscream',
    aliases: ['Desolace'],
    tr: {
      sub: 'Bölge · Kalimdor’un batısı',
      text: 'Stonetalon Mountains’ın güneyindeki ölü, gri topraklar; centaur kabileleri ve Burning Blade kültistleri burada.',
    },
    en: {
      sub: 'Region · western Kalimdor',
      text: 'The dead grey land south of the Stonetalon Mountains, home to centaur tribes and Burning Blade cultists.',
    },
  },
  {
    id: 'crossroads',
    name: 'The Crossroads',
    icon: 'inv_misc_map02',
    aliases: ['Crossroads'],
    tr: {
      sub: 'Karakol · The Barrens',
      text: 'The Barrens’ın ortasında, yolların kesiştiği Horde karakolu.',
      note: 'The Barrens',
    },
    en: {
      sub: 'Outpost · the Barrens',
      text: 'The Horde outpost in the middle of the Barrens, where the roads meet.',
      note: 'The Barrens',
    },
  },
  {
    id: 'splintertree',
    name: 'Splintertree Post',
    icon: 'inv_tradeskillitem_01',
    aliases: ['Splintertree Post'],
    tr: {
      sub: 'Karakol · Ashenvale',
      text: 'Ashenvale’in doğusundaki Horde karakolu; Warsong’larla Sentinel’ler arasındaki savaşın ön cephesi.',
      note: 'Ashenvale',
    },
    en: {
      sub: 'Outpost · Ashenvale',
      text: 'The Horde outpost in eastern Ashenvale, on the front line of the war between the Warsong and the Sentinels.',
      note: 'Ashenvale',
    },
  },
  {
    id: 'gromgol',
    name: 'Grom’gol Base Camp',
    icon: 'spell_nature_stormreach',
    aliases: ['Grom’gol Base Camp', 'Grom’gol'],
    tr: {
      sub: 'Kamp · Stranglethorn Vale',
      text: 'Stranglethorn Vale’in kuzeybatı kıyısındaki Horde kampı. Orgrimmar’dan ve Undercity’den kalkan zeppelin’ler buraya iner.',
      note: 'Stranglethorn Vale',
    },
    en: {
      sub: 'Camp · Stranglethorn Vale',
      text: 'The Horde camp on the north-west coast of Stranglethorn Vale, where the zeppelins from Orgrimmar and Undercity land.',
      note: 'Stranglethorn Vale',
    },
  },
  {
    id: 'stranglethorn',
    name: 'Stranglethorn Vale',
    icon: 'ability_mount_jungletiger',
    aliases: ['Stranglethorn Vale', 'Stranglethorn'],
    tr: {
      sub: 'Bölge · Eastern Kingdoms’un güneyi',
      text: 'Eastern Kingdoms’un güneyindeki sık orman; troll kabileleri, korsanlar ve avcılar burada.',
    },
    en: {
      sub: 'Region · the south of the Eastern Kingdoms',
      text: 'The dense jungle in the south of the Eastern Kingdoms, home to troll tribes, pirates and hunters.',
    },
  },
  {
    id: 'stonard',
    name: 'Stonard',
    icon: 'spell_nature_stoneclawtotem',
    aliases: ['Stonard'],
    tr: {
      sub: 'Kasaba · Swamp of Sorrows',
      text: 'Swamp of Sorrows’taki orc kasabası; Horde’un Eastern Kingdoms’taki en büyük üslerinden biri.',
      note: 'Swamp of Sorrows',
    },
    en: {
      sub: 'Town · Swamp of Sorrows',
      text: 'The orc town in the Swamp of Sorrows, one of the Horde’s largest bases in the Eastern Kingdoms.',
      note: 'Swamp of Sorrows',
    },
  },
  {
    id: 'swampofsorrows',
    name: 'Swamp of Sorrows',
    icon: 'spell_shadow_lifedrain',
    aliases: ['Swamp of Sorrows'],
    tr: {
      sub: 'Bölge · Eastern Kingdoms',
      text: 'Duskwood’un doğusundaki bataklık; güneyinde Blasted Lands ve Dark Portal var.',
    },
    en: {
      sub: 'Region · the Eastern Kingdoms',
      text: 'The swamp east of Duskwood, with the Blasted Lands and the Dark Portal to the south.',
    },
  },
  {
    id: 'hammerfall',
    name: 'Hammerfall',
    icon: 'ability_warrior_sunder',
    aliases: ['Hammerfall'],
    tr: {
      sub: 'Karakol · Arathi Highlands',
      text: 'Arathi Highlands’in kuzeydoğusundaki orc karakolu; Horde’un Lordaeron’un güneyindeki dayanağı.',
      note: 'Arathi Highlands',
    },
    en: {
      sub: 'Outpost · the Arathi Highlands',
      text: 'The orc outpost in the north-east of the Arathi Highlands, the Horde’s foothold south of Lordaeron.',
      note: 'Arathi Highlands',
    },
  },
  {
    id: 'undercity',
    name: 'Undercity',
    icon: 'spell_arcane_teleportundercity',
    aliases: ['Undercity'],
    tr: {
      sub: 'Forsaken’ların başkenti',
      text: 'Lordaeron başkentinin yıkıntıları altındaki şehir; Sylvanas Windrunner’ın Forsaken’larının yurdu. Orgrimmar’dan kalkan zeppelin buraya iner.',
      note: 'Tirisfal Glades',
    },
    en: {
      sub: 'Capital of the Forsaken',
      text: 'The city beneath the ruins of Lordaeron’s capital, home of Sylvanas Windrunner’s Forsaken. The zeppelin from Orgrimmar lands here.',
      note: 'Tirisfal Glades',
    },
  },
  {
    id: 'forsaken',
    name: 'Forsaken',
    icon: 'spell_shadow_raisedead',
    aliases: ['Forsaken'],
    tr: {
      sub: 'Horde’un undead halkı',
      text: 'Lich King’in denetiminden kurtulan undead’ler. Sylvanas Windrunner’ın önderliğinde Undercity’de yaşıyorlar ve Horde’la ittifak kurdular.',
    },
    en: {
      sub: 'The undead of the Horde',
      text: 'Undead who broke free of the Lich King’s control. Led by Sylvanas Windrunner, they live in Undercity and have allied with the Horde.',
    },
  },

  // ---------------------------------------------------------------- Troll story
  {
    id: 'zandalar',
    name: 'Zandalar',
    icon: 'spell_holy_spiritualguidence',
    aliases: ['Zandalar Tribe', 'Zandalari', 'Zandalar'],
    tr: {
      sub: 'Güney Denizleri’ndeki troll ülkesi',
      text: 'Güney Denizleri’ndeki Zandalar adasının Zandalari trolleri, trollerin en eski ve en bilge kabilesi sayılır. Classic’te Zandalar Tribe, Hakkar’ın dönüşünü durdurmak için Yojamba Isle’a yerleşti ve maceracılardan yardım istiyor.',
      note: 'Yojamba Isle',
    },
    en: {
      sub: 'The troll land of the South Seas',
      text: 'The Zandalari trolls of the isle of Zandalar in the South Seas are held to be the oldest and wisest of the troll tribes. In Classic the Zandalar Tribe has settled on Yojamba Isle to stop Hakkar’s return and asks adventurers for help.',
      note: 'Yojamba Isle',
    },
  },
  {
    id: 'loa',
    name: 'Loa',
    icon: 'spell_nature_invisibilitytotem',
    aliases: ['loa', 'Loa'],
    tr: {
      sub: 'Trollerin tanrı-ruhları',
      text: 'Trollerin taptığı ve adaklarla çağırdığı ruhlar. Her kabilenin kendi loa’sı vardır; kimi loa’lar bilgelik ve koruma verir, kimileri kan ister. Trollerin büyüsü voodoo bu bağa dayanır.',
    },
    en: {
      sub: 'The trolls’ god-spirits',
      text: 'The spirits the trolls worship and call with offerings. Every tribe has its own loa; some give wisdom and protection, some demand blood. The trolls’ magic, voodoo, rests on this bond.',
    },
  },
  {
    id: 'aqir',
    name: 'Aqir',
    icon: 'spell_nature_insectswarm',
    aliases: ['aqir', 'Aqir'],
    tr: {
      sub: 'Böcek halkı',
      text: 'Kalimdor’da troll imparatorluklarına karşı savaşan böcek halkı. Yenilip güneye çekildiler; torunları Ahn’Qiraj’da qiraji olarak yaşıyor.',
    },
    en: {
      sub: 'The insect people',
      text: 'The insect people who fought the troll empires in Kalimdor. Beaten, they withdrew south; their descendants live on in Ahn’Qiraj as the qiraji.',
    },
  },
  {
    id: 'gurubashi',
    name: 'Gurubashi',
    icon: 'inv_spear_04',
    aliases: ['Gurubashi'],
    tr: {
      sub: 'Cengel trollerinin imparatorluğu',
      text: 'Stranglethorn’un cengellerinde yaşayan cengel trollerinin imparatorluğu; başkenti Zul’Gurub’du. Hakkar’la kurduğu karanlık bağ ve ardından gelen ayaklanma imparatorluğu kabilelere böldü.',
      note: 'Stranglethorn Vale',
    },
    en: {
      sub: 'The jungle trolls’ empire',
      text: 'The empire of the jungle trolls of Stranglethorn, with its capital at Zul’Gurub. A dark bond with Hakkar, and the uprising that followed, split it into tribes.',
      note: 'Stranglethorn Vale',
    },
  },
  {
    id: 'zulgurub',
    name: 'Zul’Gurub',
    icon: 'spell_shadow_darkritual',
    aliases: ['Zul’Gurub'],
    tr: {
      sub: 'Gurubashi’nin başkenti',
      text: 'Stranglethorn’un kuzeydoğusundaki göl çevresinde yükselen eski Gurubashi başkenti. Classic’te rahipleri burada Hakkar’ı yeniden çağırdı.',
      note: 'Stranglethorn Vale',
    },
    en: {
      sub: 'Capital of the Gurubashi',
      text: 'The old Gurubashi capital by the lake in north-eastern Stranglethorn. In Classic its priests have summoned Hakkar again here.',
      note: 'Stranglethorn Vale',
    },
  },
  {
    id: 'hakkar',
    name: 'Hakkar the Soulflayer',
    icon: 'ability_racial_bloodrage',
    aliases: ['Hakkar the Soulflayer', 'Hakkar'],
    tr: {
      sub: 'Kan tanrısı loa',
      text: 'Atal’ai rahiplerinin çağırdığı, her gün kan kurbanı isteyen kan tanrısı. Gurubashi’nin ayaklanması bedenini yok etti; Classic’te rahipleri onu Zul’Gurub’da yeniden çağırdı.',
      note: 'Zul’Gurub',
    },
    en: {
      sub: 'The blood-god loa',
      text: 'The blood god the Atal’ai priests summoned, who demanded a blood sacrifice every day. The Gurubashi’s uprising destroyed his body; in Classic his priests have summoned him again in Zul’Gurub.',
      note: 'Zul’Gurub',
    },
  },
  {
    id: 'atalai',
    name: 'Atal’ai',
    icon: 'spell_shadow_curseoftounges',
    aliases: ['Atal’ai'],
    tr: {
      sub: 'Hakkar’ın rahipleri',
      text: 'Hakkar’a tapan troll rahipler. Gurubashi’den sürülünce Swamp of Sorrows’ta tapınaklarını kurdular; tapınak batınca Sunken Temple’ın içinde kaldılar.',
      note: 'Swamp of Sorrows',
    },
    en: {
      sub: 'The priests of Hakkar',
      text: 'The troll priests who worship Hakkar. Driven out of the Gurubashi, they built their temple in the Swamp of Sorrows; when it sank they were left inside the Sunken Temple.',
      note: 'Swamp of Sorrows',
    },
  },
  {
    id: 'sunkentemple',
    name: 'Sunken Temple',
    icon: 'spell_shadow_lifedrain02',
    aliases: ['Atal’Hakkar', 'Sunken Temple'],
    tr: {
      sub: 'Batık tapınak · Swamp of Sorrows',
      text: 'Atal’ai’nin Hakkar için kurduğu Atal’Hakkar tapınağı. Rahipler onu yeniden çağırmaya kalkışınca Ysera’nın yeşil ejderhaları tapınağı bataklığın altına gömdü.',
      note: 'Swamp of Sorrows',
    },
    en: {
      sub: 'Sunken temple · Swamp of Sorrows',
      text: 'The temple of Atal’Hakkar the Atal’ai built for Hakkar. When the priests tried to summon him again, Ysera’s green dragons sank it beneath the swamp.',
      note: 'Swamp of Sorrows',
    },
  },
  {
    id: 'ysera',
    name: 'Ysera',
    icon: 'inv_misc_head_dragon_01',
    aliases: ['Ysera'],
    tr: {
      sub: 'Yeşil ejderhaların lideri',
      text: 'Yeşil ejderha sürüsünün lideri ve Emerald Dream’in bekçisi. Ejderhaları Atal’Hakkar tapınağını bataklığa gömdü.',
    },
    en: {
      sub: 'Leader of the green dragonflight',
      text: 'Leader of the green dragonflight and warden of the Emerald Dream. Her dragons sank the temple of Atal’Hakkar into the swamp.',
    },
  },
  {
    id: 'yojamba',
    name: 'Yojamba Isle',
    icon: 'trade_fishing',
    aliases: ['Yojamba Isle'],
    tr: {
      sub: 'Ada · Stranglethorn Vale',
      text: 'Stranglethorn kıyısındaki adada Zandalar Tribe’ın karargâhı; troller Hakkar’a karşı buradan yardım topluyor.',
      note: 'Stranglethorn Vale',
    },
    en: {
      sub: 'Island · Stranglethorn Vale',
      text: 'The Zandalar Tribe’s base on an island off Stranglethorn; the trolls gather help against Hakkar from here.',
      note: 'Stranglethorn Vale',
    },
  },
  {
    id: 'gurubashiarena',
    name: 'Gurubashi Arena',
    icon: 'ability_warrior_challange',
    aliases: ['Gurubashi Arena'],
    tr: {
      sub: 'Dövüş arenası · Stranglethorn Vale',
      text: 'Stranglethorn’un ortasındaki eski Gurubashi arenası; bugün oyuncuların düello yaptığı bir meydan.',
      note: 'Stranglethorn Vale',
    },
    en: {
      sub: 'Fighting arena · Stranglethorn Vale',
      text: 'The old Gurubashi arena in the middle of Stranglethorn, now a place where players duel.',
      note: 'Stranglethorn Vale',
    },
  },
  {
    id: 'baliamah',
    name: 'Balia’mah Ruins',
    icon: 'spell_nature_stoneskintotem',
    aliases: ['Balia’mah Ruins'],
    tr: {
      sub: 'Troll harabeleri · Stranglethorn Vale',
      text: 'Stranglethorn’un kuzeybatısında, Bloodscalp trollerinin yaşadığı eski Gurubashi harabeleri.',
      note: 'Stranglethorn Vale',
    },
    en: {
      sub: 'Troll ruins · Stranglethorn Vale',
      text: 'Old Gurubashi ruins in north-western Stranglethorn where the Bloodscalp trolls live.',
      note: 'Stranglethorn Vale',
    },
  },
  {
    id: 'zulaman',
    name: 'Zul’Aman',
    icon: 'inv_spear_05',
    aliases: ['Zul’Aman'],
    tr: {
      sub: 'Amani’nin başkenti',
      text: 'Eastern Kingdoms’ın kuzey ormanlarındaki Amani başkenti; troller buradan Quel’Thalas’a saldırdı.',
    },
    en: {
      sub: 'Capital of the Amani',
      text: 'The Amani capital in the northern forests of the Eastern Kingdoms, from which the trolls attacked Quel’Thalas.',
    },
  },
  {
    id: 'zuljin',
    name: 'Zul’jin',
    icon: 'inv_spear_07',
    aliases: ['Zul’jin'],
    tr: {
      sub: 'Amani’nin savaş beyi',
      text: 'Second War’da Amani’yi Horde’a katan troll savaş beyi. Elf’lerden öç almak istiyordu ve Quel’Thalas’ın ormanlarını yaktı.',
    },
    en: {
      sub: 'Warlord of the Amani',
      text: 'The troll warlord who brought the Amani into the Horde in the Second War. He wanted revenge on the elves and burned the forests of Quel’Thalas.',
    },
  },
  {
    id: 'jinthaalor',
    name: 'Jintha’Alor',
    icon: 'spell_nature_tremortotem',
    aliases: ['Jintha’Alor'],
    tr: {
      sub: 'Troll kalesi · Hinterlands',
      text: 'Hinterlands’in güneydoğusunda, Vilebranch trollerinin kalesi.',
      note: 'The Hinterlands',
    },
    en: {
      sub: 'Troll stronghold · The Hinterlands',
      text: 'The Vilebranch trolls’ stronghold in the south-east of the Hinterlands.',
      note: 'The Hinterlands',
    },
  },
  {
    id: 'vilebranch',
    name: 'Vilebranch',
    icon: 'spell_shadow_curse',
    aliases: ['Vilebranch'],
    tr: {
      sub: 'Orman trolleri · Amani soyundan',
      text: 'Hinterlands’teki Jintha’Alor’un orman trolleri; Amani’nin küçülmüş kalıntılarından biri ve bölgenin en tehlikeli kabilesi.',
      note: 'The Hinterlands',
    },
    en: {
      sub: 'Forest trolls · of the Amani line',
      text: 'The forest trolls of Jintha’Alor in the Hinterlands; one of the Amani’s shrunken remnants and the most dangerous tribe in the region.',
      note: 'The Hinterlands',
    },
  },
  {
    id: 'witherbark',
    name: 'Witherbark',
    icon: 'spell_nature_removecurse',
    aliases: ['Witherbark'],
    tr: {
      sub: 'Orman trolleri · Amani soyundan',
      text: 'Arathi Highlands’te yaşayan Amani soyundan orman trolleri; Alliance’a düşman.',
      note: 'Arathi Highlands',
    },
    en: {
      sub: 'Forest trolls · of the Amani line',
      text: 'Forest trolls of the Amani line who live in the Arathi Highlands; hostile to the Alliance.',
      note: 'Arathi Highlands',
    },
  },
  {
    id: 'revantusk',
    name: 'Revantusk',
    icon: 'inv_misc_pelt_boar_ruin_02',
    aliases: ['Revantusk Village', 'Revantusk'],
    tr: {
      sub: 'Orman trolleri · Horde’un dostu',
      text: 'Hinterlands’teki Revantusk Village’ın trolleri. Horde’la ittifak kurmuş bir Amani kabilesi.',
      note: 'The Hinterlands',
    },
    en: {
      sub: 'Forest trolls · friends of the Horde',
      text: 'The trolls of Revantusk Village in the Hinterlands, an Amani tribe allied with the Horde.',
      note: 'The Hinterlands',
    },
  },
  {
    id: 'zulfarrak',
    name: 'Zul’Farrak',
    icon: 'spell_fire_searingtotem',
    aliases: ['Zul’Farrak'],
    tr: {
      sub: 'Troll kalesi · Tanaris',
      text: 'Tanaris çölündeki Sandfury trollerinin kalesi.',
      note: 'Tanaris',
    },
    en: {
      sub: 'Troll fortress · Tanaris',
      text: 'The fortress of the Sandfury trolls in the Tanaris desert.',
      note: 'Tanaris',
    },
  },
  {
    id: 'sandfury',
    name: 'Sandfury',
    icon: 'spell_nature_cyclone',
    aliases: ['Sandfury'],
    tr: {
      sub: 'Kum trolleri',
      text: 'Zul’Farrak’ın çevresinde yaşayan çöl trolleri; Tanaris’te yolculara saldırıyorlar.',
      note: 'Tanaris',
    },
    en: {
      sub: 'Sand trolls',
      text: 'Desert trolls who live around Zul’Farrak and attack travellers in Tanaris.',
      note: 'Tanaris',
    },
  },
  {
    id: 'tanaris',
    name: 'Tanaris',
    icon: 'spell_fire_volcano',
    aliases: ['Tanaris'],
    tr: {
      sub: 'Çöl · Kalimdor’un güneydoğusu',
      text: 'Kalimdor’un güneydoğusundaki sıcak çöl; Zul’Farrak burada.',
    },
    en: {
      sub: 'Desert · south-eastern Kalimdor',
      text: 'The hot desert in south-eastern Kalimdor, where Zul’Farrak stands.',
    },
  },
  {
    id: 'frostmane',
    name: 'Frostmane',
    icon: 'spell_frostresistancetotem_01',
    aliases: ['Frostmane'],
    tr: {
      sub: 'Buz trolleri',
      text: 'Dun Morogh’un karlı vadilerinde yaşayan buz trolleri; Ironforge’un komşusu ve dwarf’ların düşmanı.',
      note: 'Dun Morogh',
    },
    en: {
      sub: 'Ice trolls',
      text: 'Ice trolls who live in the snowy valleys of Dun Morogh, neighbours of Ironforge and enemies of the dwarves.',
      note: 'Dun Morogh',
    },
  },
  {
    id: 'bloodscalp',
    name: 'Bloodscalp',
    icon: 'inv_spear_01',
    aliases: ['Bloodscalp'],
    tr: {
      sub: 'Cengel trolleri · Gurubashi soyundan',
      text: 'Stranglethorn’un kuzeyinde yaşayan cengel trolleri; Gurubashi’nin parçalanmış kabilelerinden biri.',
      note: 'Stranglethorn Vale',
    },
    en: {
      sub: 'Jungle trolls · of the Gurubashi line',
      text: 'Jungle trolls who live in northern Stranglethorn; one of the tribes the Gurubashi empire split into.',
      note: 'Stranglethorn Vale',
    },
  },
  {
    id: 'skullsplitter',
    name: 'Skullsplitter',
    icon: 'ability_warrior_cleave',
    aliases: ['Skullsplitter'],
    tr: {
      sub: 'Cengel trolleri · Gurubashi soyundan',
      text: 'Stranglethorn’un ortasında yaşayan cengel trolleri; Gurubashi’nin parçalanmış kabilelerinden biri.',
      note: 'Stranglethorn Vale',
    },
    en: {
      sub: 'Jungle trolls · of the Gurubashi line',
      text: 'Jungle trolls who live in the middle of Stranglethorn; one of the tribes the Gurubashi empire split into.',
      note: 'Stranglethorn Vale',
    },
  },
  {
    id: 'shatterspear',
    name: 'Shatterspear',
    icon: 'inv_spear_07',
    aliases: ['Shatterspear'],
    tr: {
      sub: 'Orman trolleri',
      text: 'Darkshore’daki night elf topraklarında yaşayan orman trolleri; Teldrassil’in komşuları.',
      note: 'Darkshore',
    },
    en: {
      sub: 'Forest trolls',
      text: 'Forest trolls who live on the night elf lands of Darkshore, neighbours of Teldrassil.',
      note: 'Darkshore',
    },
  },
  {
    id: 'smolderthorn',
    name: 'Smolderthorn',
    icon: 'spell_fire_flameshock',
    aliases: ['Smolderthorn'],
    tr: {
      sub: 'Cengel trolleri',
      text: 'Blackrock Spire’ın alt katlarında yaşayan trol kabilesi; Blackrock orc’larıyla aynı karargâhı paylaşıyor.',
      note: 'Blackrock Spire',
    },
    en: {
      sub: 'Jungle trolls',
      text: 'A troll tribe living on the lower levels of Blackrock Spire, sharing the stronghold with the Blackrock orcs.',
      note: 'Blackrock Spire',
    },
  },
  {
    id: 'zalazane',
    name: 'Zalazane',
    icon: 'warlock_curse_shadow',
    aliases: ['Zalazane'],
    tr: {
      sub: 'Çılgın witch doctor',
      text: 'Kara büyüye kapılıp Echo Isles’ı ele geçiren Darkspear witch doctor’u. Kabilesinin üyelerini köleleştiriyor.',
      note: 'Echo Isles',
    },
    en: {
      sub: 'The mad witch doctor',
      text: 'The Darkspear witch doctor lost to dark magic who took the Echo Isles. He enslaves members of his own tribe.',
      note: 'Echo Isles',
    },
  },
  {
    id: 'gadrin',
    name: 'Master Gadrin',
    icon: 'spell_nature_manaregentotem',
    aliases: ['Master Gadrin', 'Gadrin'],
    tr: {
      sub: 'Sen’jin Village’ın bilgesi',
      text: 'Darkspear’ın karadaki köyünün yaşlı bilgesi. Echo Isles’ı Zalazane’den kurtarmak için maceracılardan yardım istiyor.',
      note: 'Sen’jin Village',
    },
    en: {
      sub: 'Sage of Sen’jin Village',
      text: 'The old sage of the Darkspear’s village on the shore. He asks adventurers for help in freeing the Echo Isles from Zalazane.',
      note: 'Sen’jin Village',
    },
  },
  // ---------------------------------------------------------------- Skyborne story
  {
    id: 'shendorei',
    name: 'shen’dorei',
    icon: 'race_skyborne',
    aliases: ['shen’dorei', 'Shen’dorei'],
    tr: {
      sub: 'Skyborne’ın kendi adı · “gizli halk”',
      text: 'Skyborne’ın kendilerine verdiği ad: “gizli halk”. Eldre’Thalas’tan kaçan isyancıların torunlarıdır; Blizzard onlara “shen’dorei high elf” der.',
    },
    en: {
      sub: 'The Skyborne’s own name · “the hidden people”',
      text: 'The name the Skyborne give themselves: “the hidden people”. They descend from the rebels who fled Eldre’Thalas; Blizzard calls them “shen’dorei high elves”.',
    },
  },
  {
    id: 'eldrethalas',
    name: 'Eldre’Thalas',
    icon: 'inv_misc_book_08',
    aliases: ['Eldre’Thalas'],
    tr: {
      sub: 'Shen’dralar Highborne’larının şehri',
      text: 'Well of Eternity’nin kaybından sonra Prince Tortheldrin’in yönettiği Highborne şehri. Bugün Feralas’ta Dire Maul olarak ayaktadır; Skyborne buradan kaçan isyancıların torunlarıdır.',
      note: 'Feralas · Dire Maul',
    },
    en: {
      sub: 'City of the Shen’dralar Highborne',
      text: 'The Highborne city ruled by Prince Tortheldrin after the loss of the Well of Eternity. It stands today as Dire Maul in Feralas; the Skyborne descend from the rebels who fled it.',
      note: 'Feralas · Dire Maul',
    },
  },
  {
    id: 'diremaul',
    name: 'Dire Maul',
    icon: 'inv_misc_rune_06',
    aliases: ['Dire Maul'],
    tr: {
      sub: 'Eldre’Thalas’ın bugünkü hâli · Feralas zindanı',
      text: 'Feralas’taki eski Highborne şehri Eldre’Thalas’ın yıkıntısı. Classic’te Shen’dralar’ın ve Prince Tortheldrin’in bulunduğu bir zindandır.',
      note: 'Feralas',
    },
    en: {
      sub: 'Today’s Eldre’Thalas · dungeon in Feralas',
      text: 'The ruins of the old Highborne city of Eldre’Thalas in Feralas. In Classic it is a dungeon where the Shen’dralar and Prince Tortheldrin are found.',
      note: 'Feralas',
    },
  },
  {
    id: 'shendralar',
    name: 'Shen’dralar',
    icon: 'inv_scroll_05',
    aliases: ['Shen’dralar'],
    tr: {
      sub: 'Eldre’Thalas’ın Highborne halkı',
      text: 'Eldre’Thalas’ta yaşayan Highborne halkı ve bilginleri. Prince Tortheldrin’in yönetiminde kaldılar; bir kısmı ona karşı isyan edip kaçtı ve Skyborne’ın atası oldu.',
    },
    en: {
      sub: 'The Highborne people of Eldre’Thalas',
      text: 'The Highborne people and scholars who lived in Eldre’Thalas. They stayed under Prince Tortheldrin’s rule; some rebelled against him, fled, and became the ancestors of the Skyborne.',
    },
  },
  {
    id: 'tortheldrin',
    name: 'Prince Tortheldrin',
    icon: 'spell_shadow_sealofkings',
    aliases: ['Prince Tortheldrin', 'Tortheldrin'],
    tr: {
      sub: 'Eldre’Thalas’ın prensi',
      text: 'Well of Eternity’nin kaybından sonra Eldre’Thalas’ı yöneten prens. Şehri ayakta tutmak için Immol’thar’ın gücünü emmek istedi; buna karşı çıkanlar isyan etti. Classic’te Dire Maul’un içinde bir boss olarak bulunur.',
      note: 'Dire Maul',
    },
    en: {
      sub: 'Prince of Eldre’Thalas',
      text: 'The prince who ruled Eldre’Thalas after the Well of Eternity was lost. He meant to drain Immol’thar’s power to keep the city alive, and those who opposed him rebelled. In Classic he is a boss inside Dire Maul.',
      note: 'Dire Maul',
    },
  },
  {
    id: 'immolthar',
    name: 'Immol’thar',
    icon: 'spell_shadow_summoninfernal',
    aliases: ['Immol’thar'],
    tr: {
      sub: 'Eldre’Thalas’ın altında bağlanan iblis',
      text: 'Tortheldrin’in Shen’dralar’a gücünü emdirmek istediği iblis. Bu plan Highborne’lar arasında isyana yol açtı. Classic’te Dire Maul’da bir boss olarak bulunur.',
      note: 'Dire Maul',
    },
    en: {
      sub: 'Demon bound beneath Eldre’Thalas',
      text: 'The demon whose power Tortheldrin wanted the Shen’dralar to drain. The plan set off a rebellion among the Highborne. In Classic it is a boss in Dire Maul.',
      note: 'Dire Maul',
    },
  },
  {
    id: 'shalnan',
    name: 'Shal’nan',
    icon: 'inv_helmet_23',
    aliases: ['Shal’nan'],
    tr: {
      sub: '“Veiled One” · isyanın maskeli lideri',
      text: 'Warcraft Wiki’ye göre Eldre’Thalas isyanının adı bilinmeyen, maskeli lideri. Son çatışmadan tek sağ çıkan oldu; halkını batıya götürdü, Zephras’ta liderliği konseye devredip sonra kayboldu. Tek kaynak: wiki.',
    },
    en: {
      sub: '“The Veiled One” · masked leader of the rebellion',
      text: 'According to the Warcraft Wiki, the unnamed, masked leader of the Eldre’Thalas rebellion. He was the only survivor of the final confrontation, led his people west, handed leadership to a council on Zephras and later vanished. Single source: the wiki.',
    },
  },
  {
    id: 'skywall',
    name: 'Skywall',
    icon: 'inv_elemental_primal_air',
    aliases: ['Skywall'],
    tr: {
      sub: 'Elemental Plane of Air’de ilkel ruhların âlemi',
      text: 'Elemental Plane of Air’deki, ilkel elemental ruhların hüküm sürdüğü âlem. Skyborne’ın isyancı atalarına sığınak olan Zephras Isle burada demirlenmiştir.',
    },
    en: {
      sub: 'Realm of primordial spirits in the Elemental Plane of Air',
      text: 'The realm in the Elemental Plane of Air ruled by primordial elemental spirits. Zephras Isle, the refuge of the Skyborne’s rebel ancestors, is anchored here.',
    },
  },
  {
    id: 'alakir',
    name: 'Al’Akir',
    icon: 'spell_nature_cyclone',
    aliases: ['Al’Akir'],
    tr: {
      sub: 'Rüzgârın efendisi · Windlord',
      text: 'Elemental Plane of Air’in efendisi Windlord. Warcraft Wiki’ye göre rüzgâr ruhları ondan söz etmekten kaçınır. Al’Aketh kültü ona tapar.',
    },
    en: {
      sub: 'Master of the wind · the Windlord',
      text: 'The Windlord, master of the Elemental Plane of Air. According to the Warcraft Wiki the wind spirits avoid speaking of him. The Al’Aketh cult worships him.',
    },
  },
  {
    id: 'zephras',
    name: 'Zephras Isle',
    icon: 'inv_misc_volatileair',
    aliases: ['Zephras Isle', 'Zephras'],
    tr: {
      sub: 'Skyborne’ın göğe kaldırılan adası',
      text: 'Rüzgâr ruhlarının Skywall’a kaldırdığı ada ve Skyborne’ın başlangıç bölgesi (1–12). Ruhlar kaybolunca adayı tutan pylon’lar çözülmeye başladı.',
      note: 'Skyborne başlangıç bölgesi',
    },
    en: {
      sub: 'The Skyborne’s island lifted into the sky',
      text: 'The island the wind spirits lifted into Skywall and the Skyborne starting zone (1–12). When the spirits vanished, the pylons holding it began to unravel.',
      note: 'Skyborne starting zone',
    },
  },
  {
    id: 'valanaar',
    name: 'Valanaar',
    icon: 'inv_banner_03',
    aliases: ['Valanaar'],
    tr: {
      sub: 'Zephras Isle’ın ana şehri',
      text: 'Zephras Isle’ın ana şehri: banka, açık artırma, eğitmenler ve Azeroth’a giden skyship’lerin iskelesi burada.',
      note: 'Zephras Isle',
    },
    en: {
      sub: 'Main city of Zephras Isle',
      text: 'The main city of Zephras Isle: the bank, the auction house, trainers and the dock for the skyships to Azeroth are here.',
      note: 'Zephras Isle',
    },
  },
  {
    id: 'highorder',
    name: 'High Order',
    icon: 'classicon_mage',
    aliases: ['High Order'],
    tr: {
      sub: 'Skyborne’ın Alliance kolu',
      text: 'Eldre’Thalas’ın Highborne bilginlerinin torunları. Kayıp arcane bilgiyi geri kazanıp shen’dorei’yi ruh hamilerinden bağımsız yaşatmak ister. Mage olabilen tek Skyborne kolu.',
    },
    en: {
      sub: 'The Skyborne’s Alliance branch',
      text: 'Descendants of the Highborne scholars of Eldre’Thalas. They want to recover lost arcane knowledge so the shen’dorei can live without spirit patrons. The only Skyborne branch that can be mages.',
    },
  },
  {
    id: 'windshapers',
    name: 'Windshapers',
    icon: 'classicon_shaman',
    aliases: ['Windshapers', 'Windshaper'],
    tr: {
      sub: 'Skyborne’ın Horde kolu',
      text: 'Skysight armağanını ilk alan shen’dorei’nin torunları. Elemental geleneği korur ve kaybolan ruhların izini sürer. Shaman olabilen tek Skyborne kolu.',
    },
    en: {
      sub: 'The Skyborne’s Horde branch',
      text: 'Descendants of the first shen’dorei to receive the gift of skysight. They keep the elemental tradition and follow the trail of the vanished spirits. The only Skyborne branch that can be shamans.',
    },
  },
  {
    id: 'alaketh',
    name: 'Al’Aketh',
    icon: 'spell_shadow_darksummoning',
    aliases: ['Al’Aketh'],
    tr: {
      sub: 'Al’Akir’e tapan kült',
      text: 'Zephras Isle’ı yıkmak isteyen, Al’Akir’e tapan kült. Lideri High Priestess Lorthuna. Ruhlar kaybolduktan sonra ortaya çıktı; Falaath Village’da tutundu.',
    },
    en: {
      sub: 'Cult that worships Al’Akir',
      text: 'A cult that worships Al’Akir and wants to destroy Zephras Isle. Its leader is High Priestess Lorthuna. It rose after the spirits vanished and dug in at Falaath Village.',
    },
  },
  {
    id: 'lorthuna',
    name: 'High Priestess Lorthuna',
    icon: 'classicon_priest',
    aliases: ['High Priestess Lorthuna', 'Lorthuna'],
    tr: {
      sub: 'Al’Aketh’in lideri',
      text: 'Al’Aketh kültünün başrahibesi. Shrine of Akir’de Rohash’ı çağırdı. Akıbeti kaynaklarda tutmaz: wiki göğe savrulduğunu, bir rehber portaldan kaçtığını yazar.',
      note: 'Shrine of Akir',
    },
    en: {
      sub: 'Leader of the Al’Aketh',
      text: 'High priestess of the Al’Aketh cult. She called Rohash at the Shrine of Akir. Her fate differs by source: the wiki says she was thrown into the sky, one guide says she fled through a portal.',
      note: 'Shrine of Akir',
    },
  },
  {
    id: 'shrineofakir',
    name: 'Shrine of Akir',
    icon: 'spell_nature_eyeofthestorm',
    aliases: ['Shrine of Akir'],
    tr: {
      sub: 'Zephras Isle’ın son çatışma yeri',
      text: 'Zephras Isle’da High Order, Windshapers ve Peacekeepers’ın Al’Aketh’le karşılaştığı tapınak. Rohash burada göründü.',
      note: 'Zephras Isle',
    },
    en: {
      sub: 'Site of Zephras Isle’s final clash',
      text: 'The shrine on Zephras Isle where the High Order, the Windshapers and the Peacekeepers faced the Al’Aketh. Rohash appeared here.',
      note: 'Zephras Isle',
    },
  },
  {
    id: 'rohash',
    name: 'Rohash',
    icon: 'ability_thunderbolt',
    aliases: ['Rohash'],
    tr: {
      sub: 'Conclave of Wind · “Lord of the East Wind”',
      text: 'Al’Akir’in Conclave of Wind’inden bir rüzgâr lordu. Shrine of Akir’de göründü ve Al’Akir’in gazabıyla tehdit etti. Zephras Isle’ın son boss’udur.',
      note: 'Shrine of Akir',
    },
    en: {
      sub: 'Conclave of Wind · “Lord of the East Wind”',
      text: 'A wind lord of Al’Akir’s Conclave of Wind. He appeared at the Shrine of Akir and threatened the Skyborne with Al’Akir’s wrath. He is the final boss of Zephras Isle.',
      note: 'Shrine of Akir',
    },
  },
  {
    id: 'peacekeepers',
    name: 'Peacekeepers',
    icon: 'ability_warrior_defensivestance',
    aliases: ['Peacekeepers'],
    tr: {
      sub: 'Zephras Isle’ın milis gücü',
      text: 'Zephras Isle’ın milis gücü. Captain Valennia Stormfist’in komutasında High Order ile Windshapers arasındaki barışı korumaya çalışır.',
    },
    en: {
      sub: 'Zephras Isle’s militia',
      text: 'The militia of Zephras Isle. Under Captain Valennia Stormfist they try to keep the peace between the High Order and the Windshapers.',
    },
  },
  {
    id: 'elaadrin',
    name: 'Elaadrin Evengale',
    icon: 'ability_mage_incantersabsorbtion',
    aliases: ['Supreme Magister Elaadrin Evengale', 'Elaadrin Evengale'],
    tr: {
      sub: 'High Order’ın lideri · Supreme Magister',
      text: 'High Order’ın lideri. Alliance Skyborne’ın görev zincirinde Supreme Magister unvanıyla geçer.',
    },
    en: {
      sub: 'Leader of the High Order · Supreme Magister',
      text: 'Leader of the High Order. He appears as Supreme Magister in the Alliance Skyborne quest chain.',
    },
  },
  {
    id: 'ayessa',
    name: 'Ayessa Dawnsinger',
    icon: 'spell_nature_stormreach',
    aliases: ['Grand Skyseer Ayessa Dawnsinger', 'Ayessa Dawnsinger'],
    tr: {
      sub: 'Windshapers’ın lideri · Grand Skyseer',
      text: 'Windshapers’ın lideri. Grand Skyseer unvanı yalnızca Warcraft Wiki’de geçer.',
    },
    en: {
      sub: 'Leader of the Windshapers · Grand Skyseer',
      text: 'Leader of the Windshapers. The Grand Skyseer title appears only on the Warcraft Wiki.',
    },
  },
  {
    id: 'earthenring',
    name: 'Earthen Ring',
    icon: 'spell_nature_earthbindtotem',
    aliases: ['Earthen Ring'],
    tr: {
      sub: 'Elementlerle uğraşan shaman topluluğu',
      text: 'Elementlerin dengesi için çalışan shaman topluluğu. Windshapers ona uzandı; Muln Earthfury Shrine of Akir’de Skyborne’a yardım etti.',
    },
    en: {
      sub: 'Shaman circle devoted to the elements',
      text: 'The circle of shamans who work for the balance of the elements. The Windshapers reached out to it; Muln Earthfury helped the Skyborne at the Shrine of Akir.',
    },
  },
  {
    id: 'ansirem',
    name: 'Ansirem Runeweaver',
    icon: 'spell_arcane_blast',
    aliases: ['Ansirem Runeweaver'],
    tr: {
      sub: 'Kirin Tor’un arşmagı',
      text: 'Kirin Tor’dan Archmage. Shrine of Akir’de Skyborne’ın yardımına gelen Kirin Tor birliğine önderlik etti.',
    },
    en: {
      sub: 'Archmage of the Kirin Tor',
      text: 'An Archmage of the Kirin Tor. He led the Kirin Tor force that came to the Skyborne’s aid at the Shrine of Akir.',
    },
  },
  {
    id: 'muln',
    name: 'Muln Earthfury',
    icon: 'spell_nature_earthquake',
    aliases: ['Muln Earthfury'],
    tr: {
      sub: 'Earthen Ring’in shaman’ı',
      text: 'Earthen Ring’den shaman. Shrine of Akir’de Rohash’ı geri çekilmeye ikna etti.',
    },
    en: {
      sub: 'Shaman of the Earthen Ring',
      text: 'A shaman of the Earthen Ring. At the Shrine of Akir he persuaded Rohash to withdraw.',
    },
  },
  {
    id: 'rathiril',
    name: 'Rathiril Sunlance',
    icon: 'inv_staff_goldfeathered_01',
    aliases: ['Rathiril Sunlance'],
    tr: {
      sub: 'High Order’ın Elder’ı',
      text: 'Warcraft Tavern’ın Zephras Isle rehberine göre High Order’ın Elder’ı. Başka bir kaynak onu doğrulamaz.',
    },
    en: {
      sub: 'Elder of the High Order',
      text: 'The High Order’s Elder, according to Warcraft Tavern’s Zephras Isle guide. No other source confirms him.',
    },
  },
  {
    id: 'talaanis',
    name: 'Talaanis Shadowsong',
    icon: 'inv_feather_01',
    aliases: ['High Elder Talaanis Shadowsong', 'Talaanis Shadowsong'],
    tr: {
      sub: 'Zephras Isle konseyinin başı',
      text: 'Warcraft Wiki’ye göre Zephras Isle konseyinin başı, durumu “kayıp”. Warcraft Tavern adı farklı yazar ve onu Valanaar’da gösterir.',
    },
    en: {
      sub: 'Head of the Zephras Isle council',
      text: 'According to the Warcraft Wiki the head of the Zephras Isle council, status “missing”. Warcraft Tavern spells the name differently and places the elder in Valanaar.',
    },
  },
  {
    id: 'skywatcher',
    name: 'Skywatcher Plateau',
    icon: 'spell_arcane_teleportthunderbluff',
    aliases: ['Skywatcher Plateau'],
    tr: {
      sub: 'Mulgore’da Horde Skyborne’ın indiği yer',
      text: 'Horde Skyborne’ın skyship’inin indiği yer; wiki ve Method onu Mulgore’da gösterir. Warcraft Tavern ile MMOexp Thunder Bluff der.',
      note: 'Mulgore',
    },
    en: {
      sub: 'Where Horde Skyborne land in Mulgore',
      text: 'Where the Horde Skyborne skyship lands; the wiki and Method put it in Mulgore. Warcraft Tavern and MMOexp say Thunder Bluff.',
      note: 'Mulgore',
    },
  },
  {
    id: 'anvilas',
    name: 'Anvilas · Siroccas',
    icon: 'inv_misc_gem_sapphire_01',
    aliases: ['Anvilas', 'Siroccas'],
    tr: {
      sub: 'Skywall’daki diğer iki ada',
      text: 'Warcraft Wiki’ye göre Skywall’daki diğer iki ada. Zephras ile bağları koptu; çöken adaların mültecileri Zephras’a sığındı.',
    },
    en: {
      sub: 'Two other islands in Skywall',
      text: 'According to the Warcraft Wiki, two other islands in Skywall. Contact with Zephras was lost, and refugees from collapsing islands took shelter on Zephras.',
    },
  },
];
