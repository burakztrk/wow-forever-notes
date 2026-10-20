---
title: "WoW Forever notları: 8 Ekim güncellemesi (build 70291)"
date: 2026-10-08
tags: [wow-forever, patch-notes]
accent: warning
excerpt: "Yeni City of Dalaran zindanı açıldı, zindan yaratıklarından kazanılan XP %20 artırıldı, GCD içinde birden fazla silah değişimi geri geldi ve sınıflarda kapsamlı hata düzeltmeleri yapıldı."
draft: false
build: "1.60.1.70291"
sources:
  - https://us.forums.blizzard.com/en/wow/t/wow-forever-beta-development-notes-%E2%80%93-updated-october-15/2360696/5
  - https://us.forums.blizzard.com/en/wow/t/the-wow-forever-podcast-episode-3-dive-into-dungeons-with-devs-ft-hammerdancegaming/2376010/20
  - https://us.forums.blizzard.com/en/wow/t/world-of-warcraft-forever-class-deep-dives-%E2%80%94-mage-and-shaman/2375389/58
  - https://wowforever.wclbox.com/en/buding
---

Beta realm 8 Ekim bakımında **1.60.1.70291** build'ine güncellendi. Yeni zindan City of Dalaran testlere açılırken, zindan XP hesaplaması Classic Era mantığına döndürüldü ve temel canavar XP'si %20 artırıldı.

## Karakter & Sınıf değişiklikleri

### Genel / Öfke Mekaniği

- Hasar alırken üretilen Öfke (Rage) formülü düzeltildi. Artık oyuncunun kendi canı yerine yaratığın beklenen canı üzerinden hesaplanıyor; bu sayede daha fazla Stamina kuşanmak Öfke kazancını düşürmüyor.
- Damage absorb kalkanları varken alınan hasarlar artık yok sayılmıyor ve Öfke kazandırmaya devam ediyor.

::class[Druid]

- Şekil değiştirmişken (Bear/Dire Bear/Cat Form) Mana Potion kullanılamama hatası giderildi.
- :spell[Bear Form] ve :spell[Dire Bear Form] tehdit bonusu %30'dan %50'ye çıkarıldı.
- :spell[Demoralizing Roar] artık etkilenen tüm hedeflere doğru şekilde tehdit uyguluyor.
- **Feral:** Predatory Instincts talent'ı Natural Instinct olarak yeniden adlandırıldı ve Intellect'in %12/%25'i kadar büyü iyileştirmesi sağlama özelliği eklendi. Shifting Power artık Enerji doluyken harcanamıyor.

::class[Hunter]

- :spell[Disengage] yeteneğinin amaçlanan iki kat tehdit azaltması uygulandı.
- Evcil hayvanların düşük candayken tekrar tekrar can kazanmasına yol açan hata düzeltildi.
- **Survival:** :talent[Expose Prey] süresi 10 saniyeye çıkarıldı (önceden 5). :talent[Entrapment] artık azalan verimlere (diminishing returns) tabi ve Frost Trap periyodik tetiklenmesinde değil sadece ilk açılışta çalışıyor.

::class[Mage]

- :talent[Impact] talent'ının Flamestrike'ın periyodik hasarından tetiklenmesi hatası giderildi.
- :spell[Frostbolt], :spell[Fireball] ve :spell[Arcane Missiles] büyülerinin düşük seviyelerdeki hasar artış eğrisi daha tutarlı hale getirildi.

::class[Paladin]

- :spell[Retribution Aura]'nın vuran hedefin büyü gücünü kullanması hatası giderildi; temel hasarı ve büyü gücü katsayısı Vanilla değerlerine döndürüldü.
- **Protection:** :talent[Reckoning]{class=paladin} tetiklenmesine 1,5 saniyelik iç bekleme süresi eklendi. Seal of Fury ve Shield Specialization'ın mana yenilerken tehdit üretmesi kaldırıldı.

::class[Priest]

- **Discipline:** :spell[Penance] 3 saniyelik kanal yerine 2 saniyelik kanal olarak düzeltildi ve hasar/iyileştirme değerleri dengelendi; Rank 2 ve 4 iyileştirmeleri artırıldı.

::class[Shaman]

- :spell[Flametongue Totem], şekil değiştirmiş hedeflerde silah hızını değil karakterin gerçek saldırı hızını esas alıyor.
- Tüm silah geliştirmelerinin (:spell[Rockbiter Weapon], :spell[Flametongue Weapon], :spell[Frostbrand Weapon], :spell[Windfury Weapon]) süresi 60 dakikaya çıkarıldı ve bileme taşları/yağlarla birlikte kullanılabilir hale geldi.
- :spell[Water Shield] mana yenileme miktarı tooltip'te doğru gösterildi.

::class[Warlock]

- Yeni evcil hayvan çağrılırken mevcut pet artık sersemliyor (stun).
- Demonology: Demonic Brand'in ek pet hasarı yalnızca Shadow hasarı vurduğunda yüksek tehdit üretiyor.

::class[Warrior]

- :spell[Demoralizing Shout] artık etkilenen tüm hedeflerde tehdit üretiyor.
- **Arms:** :talent[Deep Wounds] artık :talent[Impale]'e ulaşmak için zorunlu. Off-hand silahın Attack Power'ı ile ölçeklenmesi hatası giderildi.
- **Protection:** :spell[Last Stand]'in doğru miktarda can kazandırmama hatası düzeltildi.

## Önemli bug fix'ler

- Yaratıklardan eşya düşmese bile etkileşime girilebilen Classic yağmalama davranışı geri getirildi.
- Büyük yaratıklardaki görsel titreme ve beklenmedik uzak mesafe yaratık çekme (pull) hataları giderildi.

## Yeni geliştirmeler / sistem değişiklikleri

- **Yeni Zindan:** City of Dalaran zindanı teste açıldı.
- **Silah Değişimi:** Tek bir genel bekleme süresi (GCD) içinde makro yardımıyla birden fazla silah değişimi (örneğin iki elli silahtan kalkan ve tek elli silaha) yeniden mümkün kılındı.
- **Zindan Deneyimi:** Zindandaki yaratıklardan kazanılan taban XP yaklaşık %20 artırıldı. Düşük seviyeli grup üyelerinin yüksek seviyelilerle zindan yaparken aldıkları ceza Classic Era sistemine döndürülerek yalnızca kendi seviyelerine göre hesaplanacak şekilde düzeltildi.
- **Cooldown Manager:** Tüm sınıflar, ırk yetenekleri ve trinket'lar bekleme süresi yöneticisinde desteklenir hale geldi.
- **Legacy Sistemi:** Beta testini hızlandırmak amacıyla tüm oyunculara 16 Legacy puanı tanımlandı ve sıfırlama maliyetleri düşürüldü.
- **Discord Voice:** Oyun içi sesli sohbet menüsüne grup liderinin seçimine bağlı Discord Voice entegrasyonu seçeneği eklendi.

## Bilinen sorunlar

- Skyborne druid'in kedi formu ve Zephras Isle yaratıklarının yüksek çözünürlüklü dokuları sonraki bir build'de gelecek.
- Hunter Ferocity talent'ını seçtiğinde evcil hayvanın kritik şansının karakter sayfasında artmamış görünmesi (yalnızca görsel hata).
