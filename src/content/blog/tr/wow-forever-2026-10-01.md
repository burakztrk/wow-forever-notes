---
title: "WoW Forever notları: 1 Ekim güncellemesi (build 70170)"
date: 2026-10-01
tags: [wow-forever, patch-notes]
accent: warning
excerpt: "Seviye sınırı 30'a yükseltildi, yeni zindan Excavation Site: Wetlands açıldı ve tüm sınıflarda kapsamlı dengelemeler yapıldı."
draft: false
build: "1.60.1.70170"
sources:
  - https://us.forums.blizzard.com/en/wow/t/wow-forever-beta-development-notes-%E2%80%93-updated-october-15/2360696/4
  - https://us.forums.blizzard.com/en/wow/t/actions-taken-against-botting-and-rmt/2368705/1
  - https://us.forums.blizzard.com/en/wow/t/legacy-points-for-beta-testing/2368776/1
  - https://wowforever.wclbox.com/en/buding
---

Beta realm 1 Ekim bakımında **1.60.1.70170** build'ine güncellendi. Bu güncellemeyle seviye sınırı 30'a yükseltildi, yeni zindanlar açıldı ve sınıfların talent ağaçlarında önemli revizyonlar yapıldı.

## Karakter & Sınıf değişiklikleri

### Warrior

- Temel saldırılarla kritik vuruş yapıldığında üretilen ek Öfke miktarı %100'e çıkarıldı.
- Rend ve :spell[Sunder Armor] artık düşmanları anında Warrior'a etiketliyor.
- :spell[Heroic Strike] sıraya almanın off-hand vuruş şansını artırması hatası düzeltildi.
- :spell[Spearing Strike] artık iki elli silah gerektirmiyor, Battle Stance gerektiriyor.
- **Fury:**
  - :talent[Booming Voice] artık shout'ların etki alanını %10 ila %50 artırıyor ve Öfke maliyetini %5 ila %25 düşürüyor.
  - 2. sıraya yeni Lingering Rage talent'ı eklendi: Savaştan çıktıktan sonra Öfke'nin azalmaya başlamasını 2 ila 10 saniye geciktiriyor.
  - 3. sıraya yeni Furious Precision talent'ı eklendi: Yan el saldırılarının isabet şansını %4/%7/%10 artırıyor.
  - :talent[Raging Blow] artık :spell[Cleave] ve :spell[Whirlwind]'in Öfke maliyetini 3 azaltıyor. Whirlwind artık talent gerektirmeden her zaman iki silahla birden vuruyor.
  - :talent[Flurry]{class=warrior}'ye ulaşmak için artık :talent[Enrage]{class=warrior} değil, :talent[Death Wish] gerekiyor.
  - 6. sıraya yeni Gore Drinker talent'ı eklendi.
  - :spell[Berserker Rage] artık 30. seviyede öğreniliyor (önceden 32).
  - :spell[Bloodthirst]'ün Attack Power oranı %45'e çıkarıldı (önceden %35).
- **Protection:**
  - :talent[Iron Will] ve :talent[Improved Bloodrage] 1. sıraya taşındı. :talent[Anticipation]{class=warrior} ve :talent[Improved Revenge] 2. sıraya alındı. Toughness talent'ı kaldırıldı.

### Druid

- :spell[Bear Form] ve :spell[Dire Bear Form] artık kritik vuruşlarda %75 artırılmış Öfke üretiyor.
- :spell[Swipe] hatası düzeltildi; artık Druid'in Attack Power'ının %3'ü oranında ek hasar alıyor.
- Tüm şekil değiştirme (Shapeshift) formları artık Disarm etkilerine karşı bağışık hale getirildi.
- :spell[Faerie Fire] artık silah vuruş zamanlayıcısını (swing timer) sıfırlamıyor.
- **Feral:**
  - Primal Bite yeteneğinin ürettiği tehdit yaklaşık iki katına çıkarıldı.
  - King of the Jungle ve Tiger's Fury talent'ları kaldırıldı.
  - 4. sıraya yeni Shifting Power talent'ı eklendi (Cat Form'da temel manayı anında 40 Enerjiye dönüştürür). 5. sıraya bekleme süresini azaltan Improved Shifting Power eklendi.

### Hunter

- **Marksmanship:** 31. talent olan :spell[Sniper Shot] artık 45 yard menzile sahip ve sonraki 3 atışın menzilini 10 yard artırıyor.
- **Survival:** :talent[Deflection]{class=hunter}'ın Parry artışı seviye başına %1'e (%1-5) çekildi.
- Pet'ler için Aggressive modu tekrar kullanıma sunuldu.

### Mage

- Parşömenler hareket halindeyken kullanılamayacak şekilde dengelendi.
- **Fire:** Hot Streak talent'ı Heating Up olarak yeniden adlandırıldı. Combustion şarj sayısı tekrar 3'e döndürüldü. :talent[Improved Scorch]'un Fire Vulnerability etkisi artık direnç için ikinci kez zar atmıyor.
- **Frost:** :talent[Winter's Chill] uygulamasının dirence takılma ihtimali kaldırıldı.

### Paladin

- **Protection:** :talent[Redoubt]'un blok şansı %4-20 aralığına çekildi. :spell[Holy Shield]'ın blok şansı %30'a yükseltildi (önceden %20).
- **Retribution:** :talent[Champion of the Light]'ın Intellect'i büyü hasarına dönüştürme oranı %20/%40/%60 olarak ayarlandı.

### Priest

- :spell[Devouring Plague] artık kritik vurabiliyor.
- Inner Focus artık periyodik etkilere (DoT) kritik vuruş şansı vermiyor.
- :talent[Shadow Weaving]'in uygulanamama sorunu giderildi.

### Rogue

- :spell[Expose Armor] ıska geçtiğinde tüm kombo puanlarının kaybedilmesine neden olan hata düzeltildi.
- Setup artık yalnızca kaçınılan veya direnilen hedefe kombo puanı ekliyor.

### Shaman

- :spell[Ghost Wolf] aydınlık alanlarda daha görünür kılındı.
- :spell[Disease Cleansing Totem] süresi 5 dakikaya sabitlendi ve :spell[Totemic Recall]'un mana yenilememe sorunu giderildi.

### Warlock

- :spell[Drain Soul] başka büyü cast edildiğinde doğru şekilde kesiliyor.
- :spell[Hellfire] artık kritik vuruş yapabiliyor.
- Soul Harvesting talent'ı Soul Harvest olarak adlandırıldı ve mana yenileme artışı düzeltildi.

## Irk değişiklikleri

- **Gnome:** :racial[Eureka!] artık periyodik etkilerden yararlanmıyor (kanallanan büyüler periyodik sayılmaz).
- **Undead:** :racial[Cannibalize], kullanan kişi fiziksel hasara bağışıkken kullanılamaz.

## Önemli bug fix'ler

- Yağmur efektlerinin görünürlüğü iyileştirildi.
- Geçici sorunlar sebebiyle Ray Traced Shadows grafik seçeneği geçici olarak kaldırıldı.
- Karakterlerin sırtındaki ve elindeki silah boyutları ırklar arasında daha tutarlı olacak şekilde eşitlendi.

## Yeni geliştirmeler / sistem değişiklikleri

- **Seviye Sınırı:** Maksimum seviye 30'a çıkarıldı.
- **Yeni Zindanlar:** Excavation Site: Wetlands (26-31) açıldı. Razorfen Downs ve Uldaman zindanları erişime sunuldu.
- **Dungeon ve Görev Deneyimi:** Zindan görevlerinin normal görevlerin üzerinde verdiği bonus XP miktarı %50 azaltıldı; yaratıkların yeniden doğma süreleri ayarlandı.
- **Berberler:** Darnassus ve Thunder Bluff'a berberler eklendi; şehir muhafızları artık yol tarif edebiliyor.
- **RMT ve Bot Önlemleri:** Yabancılarla ticaret yaparken şüpheli altın transferlerine karşı uyarı sistemi eklendi ve haksız kazanç sağlayan hesaplara yaptırımlar uygulandı.
- **Gamepad Desteği:** Evcil hayvan ahırı ve grup arayüzleri kontrolcü desteğine kavuştu.

## Bilinen sorunlar

- Büyüleri arka arkaya zincirleme cast ederken sonraki büyünün animasyon ve ses efektlerinin ilk büyü bitene kadar gecikmesi sorunu.
- Düşmanların arkalarından çok yakın durulduğunda savunma (Block/Parry) yapabilmesi.
- Gamepad moduna geçildiğinde arayüz düzeninin varsayılana sıfırlanması.
