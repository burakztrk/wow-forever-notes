---
title: "WoW Forever notları: Mage talent düzeni, Hunter ayarı ve isim kontrolü düzeltmesi (build 70685)"
date: 2026-10-28
tags: [wow-forever, patch-notes]
accent: warning
excerpt: "Blizzard zararsız isimleri engelleyen bir isim kontrolünü düzeltiyor; build'ler ayrıca bir grup Mage talent'ını taşıyıp yeniden ayarlıyor, iki Hunter saldırı gücü değerini düşürüyor ve Orc Blood Fury bekleme süresi değişikliğini istemciye getiriyor."
draft: false
build: "1.60.1.70685"
sources:
  - https://us.forums.blizzard.com/en/wow/t/overly-restrictive-name-check-and-fix-incoming-october-27/2394467/1
  - https://wowforever.wclbox.com/en/buding
---

Son yazıdan (build 70634) beri iki build geldi: 70658 ve 70685, ikisi de 28 Ekim. Tek resmi post isim kontrolüyle ilgili. Aşağıdaki sınıf ve ırk değişiklikleri resmi bir notadan değil, wclbox'un build karşılaştırmasından geliyor.

## İsim kontrolü düzeltmesi

Blizzard kısıtlı isim listesi üzerinde çalışıyor. Oyun bu listeyi, küfürlü olmayan ama kısıtlamak istediği isimleri (örneğin büyük Warcraft lore karakterleri ya da teknik nedenlerle engellenen isimler) kontrol etmek için kullanıyor. Bu süreçteki bir hata kontrolü fazla katı yaptı: içinde "c-o-n" geçen isimleri yanlışlıkla engelliyordu.

Düzeltme her bölgedeki bir sonraki realm yeniden başlatmasıyla geliyor. İzin verilmesi gerektiğini düşündüğün bir isim için "That name is restricted" mesajı aldıysan, sonrasında tekrar deneyebilirsin.

## Karakter & Sınıf değişiklikleri

Aşağıdaki sınıf değişiklikleri resmi bir posttan değil, wclbox'un build karşılaştırmasından (Çince istemciden çevrilmiş) geliyor.

::class[Hunter]

- :spell[Aspect of the Hawk] karşılaştırmada 90 puandan 47 puana düşüyor.
- :spell[Trueshot Aura] karşılaştırmada 75 puandan 40 puana düşüyor.
- wclbox iki değer için de hangi rank olduğunu belirtmiyor.

::class[Mage]

- **Arcane:**
  - Arcane Focus (5 rank) kaldırıldı.
  - :talent[Improved Channeling] sütun 3'ten sütun 2'ye taşındı (Classic Era'daki adı Enhanced Arcane Missiles).
  - :talent[Arcane Resilience] artık 2 rank (önceden 1) ve Tier 3'ten Tier 1'e taşındı.
  - :talent[Missile Barrage] ağaç içinde taşındı ve tetiklenme şansları ayarlandı.
- **Fire:**
  - :talent[Improved Fire Blast] artık 2 rank (önceden 3) ve Tier 2'den Tier 3'e taşındı. Maksimum rankta Fire Blast bekleme süresini 2 saniye azaltır ve menzili 15 yard artırır.
  - :talent[Critical Mass] artık 3 rank (önceden 5): Fire büyülerinin kritik vuruş şansı %2, %4 ve %6.
  - :talent[Incinerate]{class=mage} artık 5 rank (önceden 2) ve Tier 3'ten Tier 1'e taşındı. Fire Blast, Ice Lance, Arcane Blast ve Scorch büyülerinin kritik vuruş şansını maksimum rankta %30'a kadar artırır (Classic Era'daki adı Burn Out).
- **Frost:**
  - :spell[Ice Lance] artık 8 saniyelik bekleme süresi gösteriyor.
  - 16 Ekim notlarında eklenen Frost Blast büyüsü artık wclbox'un büyü listesinde yok. wclbox nedenini belirtmiyor.

## Irk değişiklikleri

::race[Orc]

- :racial[Blood Fury] istemcide artık 2 dakikalık bekleme süresine sahip (önceden 3 dakika). Blizzard bunu 27 Ekim ekinde duyurmuştu.

## Bilinen sorunlar

- Bu postlarla resmi bir bilinen sorunlar listesi gelmedi.
