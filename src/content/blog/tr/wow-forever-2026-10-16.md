---
title: "WoW Forever notları: 15 Ekim güncellemesi (build 70425)"
date: 2026-10-16
tags: [wow-forever, patch-notes]
accent: warning
excerpt: "Irk yeteneklerinde geniş çaplı düzenleme, Mage için Arcane Blast yeniden tasarımı ve yeni Frost Blast, Hunter'da Auto Shot için sabit durma şartı."
draft: false
build: "1.60.1.70425"
sources:
  - https://us.forums.blizzard.com/en/wow/t/wow-forever-beta-development-notes-%E2%80%93-updated-october-15/2360696/6
  - https://us.forums.blizzard.com/en/wow/t/beta-realm-maintenance-october-15/2383475/1169
  - https://us.forums.blizzard.com/en/wow/t/druid-cat-form-quest/2384010/56
  - https://wowforever.wclbox.com/en/buding
---

Beta realm 15 Ekim bakımında **1.60.1.70425** build'ine güncellendi. Eski build'deki oyuncuların oyundan çıkıp güncellemeyi Battle.net uygulamasından yapması gerekiyor. Bu turun en büyük başlıkları ırk yeteneklerindeki düzenleme ve Mage'in Arcane ağacındaki değişiklikler.

## Karakter & Sınıf değişiklikleri

### Genel

- Wand ile ateş etmeden önce artık 0,5 saniye sabit durmak gerekiyor. Bu davranış World of Warcraft'ın ilk sürümlerindeki gibi.

### Hunter

- :spell[Auto Shot] da ateş etmeden önce 0,5 saniye sabit durmayı istiyor. :spell[Aimed Shot] gibi büyüleri cast ederken Auto Shot atılmaya devam ediyor.
- :talent[Trueshot Aura] artık bütün raid'i etkiliyor.
- :talent[Resourcefulness] artık yalnızca melee ve ranged yeteneklerin kritik vuruşlarında tetikleniyor, trap'lerle tetiklenmiyor. Ayrıca :spell[Strider Kick]'in mana maliyetini de doğru şekilde düşürüyor.
- Aynı anda bir ateş ve bir buz tuzağı aktif olabiliyor. Önceden tüm türler için toplam tek tuzak sınırı vardı.
- :spell[Summon Hawk] artık hawk'u büyünün atıldığı hedefte çağırıyor ve onu o hedefe bağlı tutuyor.
- Pet yetenekleri zayıfladı: Dismember'ın iyileştirme azaltması %25'e (önceden %50), Sonic Blast'ın cast yavaşlatması %30'a (önceden %60) indi. İkisinin de süresi kısaldı, cooldown'u uzadı.

### Mage

- Yeni büyü :spell[Frost Blast] 24. seviyede öğreniliyor. 1,5 saniyelik cast'le hasar veriyor ve hedefi %40 yavaşlatıyor. Frostbolt'u etkileyen tüm talentlerden yararlanıyor. Geliştiricilerin açıklaması: down-rank cezası yüzünden Rank 1 :spell[Frostbolt]'un gördüğü işi bu büyü üstleniyor.
- :spell[Arcane Blast] yeniden tasarlandı. Artık 1,5 saniyelik cast. Her kullanımda Mage'e Intellect'inin %15'i kadar ek spell damage veriyor ve en fazla 4 kez stack oluyor. Etki ilk uygulandığı andan itibaren 15 saniye sürüyor. Hasar ve spell damage katsayıları %40 düşürüldü.
- :talent[Missile Barrage] ilk sıraya taşındı ve 2 puanlık bir talent oldu. Artık :spell[Arcane Missiles] isabetleri de tetikleyebiliyor.
- Yeni 16 puanlık talent :talent[Arcane Wrath]: 3,5 saniyelik cast, 6 saniye cooldown. Hasarı, Mage'in maksimum manasının %5'i kadar ek spell power'ı varmış gibi hesaplanıyor.
- :talent[Presence of Mind]'ın cast'lerde tüketilmemesi hatası düzeltildi.

### Druid

- :talent[Leader of the Pack] artık yalnızca melee ve ranged kritik şansı veriyor ve bütün raid'i etkiliyor. :spell[Moonkin Form]'un aurası da artık yalnızca spell kritik şansı veriyor ve raid genelinde.
- :spell[Shred] (Rank 1) artık 20. seviyede öğreniliyor (önceden 22).
- :spell[Faerie Fire] Bear ve Dire Bear Form'da artık threat üretiyor.

## Irk değişiklikleri

- **Tauren:**
  - :racial[Endurance] artık %2 kritik hasar ve iyileştirme veriyor (önceden %1 isabet).
  - :racial[Plainsrunning] binekliyken %3 ek hız veriyor. Ama etkiyi korumak için artık saniyede belirli bir mesafe hareket etmek gerekiyor.
  - :racial[War Stomp] cooldown'u 90 saniye, :racial[Cultivation] cooldown'u 15 dakika oldu.
- **Orc:**
  - :racial[Blood Fury] cooldown'u 3 dakikaya çıktı (önceden 2).
  - :racial[Shatter Curse] artık bağışıklık vermiyor, curse ve bane etkilerini temizliyor. Büyü hasarı azaltması %5'e indi (önceden %15).
  - Axe Specialization yerine %1 kritik şansı veren Savage geldi.
- **Troll:** :racial[Regeneration]'ın can yenileme bonusu %20'ye çıktı (önceden %10).
- **Skyborne:**
  - :racial[Wind Blessed] haste bonusu %3'e çıktı (önceden %1).
  - :racial[Walk on Air] cooldown'u 90 saniyeye indi.
  - Skysight ve Read Leyline artık hareket halinde kullanılabiliyor.
- **Human ve Dwarf:**
  - Human'da Sword Specialization yerine %2 kritik şansı veren Ruthless geldi.
  - Dwarf'ta Mace Specialization yerine %2 kritik hasar ve iyileştirme veren Earth Fury geldi.
- **Gnome:** :racial[Eureka!] artık şarjsız, 8 saniyelik bir buff. Power Word: Shield'ı da etkiliyor.
- **Undead:** :racial[Touch of the Grave] daha tutarlı çalışacak şekilde ayarlandı. Tetiklenme şansı caster'larda %30, Paladin/Rogue/Warrior'da %20. 25 saniyelik iç cooldown'u var.

## Önemli bug fix'ler

- Düşük gölge ayarlarında görülen aşırı parlak sis düzeltildi.
- Horde oyuncularının Kirin Tor itibarı kazanabilmesine yol açan hata giderildi.
- Yaratıklar savaş dışındayken canlarını yine doğru şekilde yeniliyor.
- Bazı içeceklerin tooltip'inde toplam mana yenileme miktarı yanlış görünüyordu, düzeltildi.
- 16 Ekim'deki bir hotfix'le Druid'lerin :spell[Cat Form]'u öğrenmek için gereken relic'leri loot'layamaması hatası düzeltildi.

## Yeni geliştirmeler / sistem değişiklikleri

- Yeni oyuncular için bir tutorial deneyimi eklendi.
- Bloom yoğunluğu artık Advanced grafik ayarlarında bir slider.
- Hunter'lar için auto attack ile Auto Shot arasında otomatik geçiş ayarı eklendi. Gamepad'de de çalışıyor.
