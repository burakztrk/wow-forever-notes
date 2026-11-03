---
title: "WoW Forever notları: 2 Kasım geliştirme notları, lansman öncesi son tur (build 70753)"
seoTitle: "WoW Forever yama notları 2 Kasım: lansman öncesi son tur"
date: 2026-11-02
tags: [wow-forever, patch-notes]
accent: warning
excerpt: "Blizzard'ın 4 Kasım lansmanı öncesi son büyük beta turu: sınıflarda artan hasar, yeniden kurulan Druid, Paladin, Rogue ve Warrior talent ağaçları, ırk ayarları, gamepad desteği, ucuzlayan eğitim ve hızlanan respawn."
draft: false
build: "1.60.1.70753"
sources:
  - https://us.forums.blizzard.com/en/wow/t/wow-forever-beta-development-notes-%E2%80%93-updated-november-2/2360696/9
  - https://wowforever.wclbox.com/en/buding
---

Blizzard, 15 Ekim beta güncellemesinden bu yana değişen her şeyi içeren geliştirme notlarını yayınladı (yaklaşık iki buçuk hafta). Build 70753 (2 Kasım) en yeni build. Daha önce duyurulan ırk değişiklikleri post'ta bütünlük için tekrar ediliyor. Sınıf ve talent ayrıntıları resmi post'tan; en sondaki yalnızca build'de görünen değişiklikler wclbox karşılaştırmasından geliyor.

## Önemli bug fix'ler

- Throw artık 0,5 saniyelik hazırlık süresini kullanıyor (yanlışlıkla fırlatma silahının saldırı hızını kullanıyordu).
- Replica Ironforge Air Rifle (Legacy ödülü), aynısını kuşanmış müttefiklerde de kullanılabiliyor.
- Quitter debuff'ı 40 saniye sürüyor (önceden 5 dakika).
- Stun 2,5 saniye sürüyor (önceden 3 saniye).
- Tüm ırklar artık doğru temel statlara sahip. Örneğin Tauren Warrior'lar Human Warrior'lara göre +5 Strength ile başlıyor (önceden +2). Aynı düzeltme High Order ve Windshaper Skyborne için de geçerli.
- Proc'tan gelen root'lar artık diminishing returns'e giriyor: :tip[Frostbite], :tip[Entrapment], :tip[Improved Wing Clip], :tip[Counterattack] ve :tip[Improved Hamstring].
- :tip[Hunter's Mark] farklı rank'lerle üst üste uygulanamıyor; Rank 4 artık Rank 3'ten az ranged attack power vermiyor.
- Darkspear Islands battleground'unda bayrağı bırakan oyuncuya artık "Recently Dropped Flag" debuff'ı gelmiyor.

## Karakter & Sınıf değişiklikleri

### Genel

- Geliştirici notu: her sınıfı Classic benzeri güç bütçesinde tutmak, eklenen her yeni öğenin başka bir şeyden ödün vermesi anlamına geliyordu. Blizzard oyun genelinde sınıf hasarını artırdı, dengelemek için üst seviye yaratıkların canını da yükseltti. Bazı eski değişikliklerin Burning Crusade ya da Wrath dönemi çözümlerine fazla aceleyle yaslandığını da söylüyor.
- Bug'lar ve ciddi aykırı durumlar dışında, önümüzdeki ay raid'ler açılana kadar büyük ayar değişikliği planlanmıyor. 30. seviyeyi geçen oyunculardan veri gelince daha büyük bir ayar turu bekleniyor.
- Birçok talent'ın düşük rank büyü kullanınca tetiklenme şansı cezası kalktı. Blizzard için ceza duruyor: 12 seviyeden fazla altındaki rank'le atıldığında :tip[Arcane Concentration], :tip[Frostbite] ve :tip[Fingers of Frost] tetiklenme şansı hâlâ düşüyor.
- Yeni öğrenilen büyüler artık otomatik olarak action bar'a eklenmiyor.
- Eğitim maliyetleri yeniden ayarlandı. Aynı seviyede öğrenilen yeteneklerin çoğu aynı fiyatta ve 1'den 60'a tüm sınıf yeteneklerini eğitmenin toplam maliyeti her sınıf için yaklaşık 206 ila 207 altın. Warlock maliyetleri, pet Grimoire'larının beklenen fiyatı kadar düşürüldü.

::class[Druid]

- :tip[Lacerate]{class=druid} artık tüm Druid'lerin öğrendiği bir yetenek değil, Feral talent'ı.
- :tip[Ferocious Bite]'a 24. seviyede yeni bir Rank 1 geliyor; mevcut rank'ler bir yukarı etiketlendi.
- :tip[Bear Form] ve :tip[Dire Bear Form] tehdit bonusu %50'den %115'e çıktı (Blessing of Salvation kaldırıldığı için telafi).
- Yeni pasif Poised, 32. seviyede öğrenilir: savaş dışında tam Energy'deyken bir sonraki Energy yeteneğin 10 Energy daha ucuz.
- Hasar artışları: :tip[Shred] silah hasarının %200'ü (önceden %155), :tip[Claw] %140 (önceden %110), :tip[Ravage]{class=druid} %435 (önceden %350). Rip, :tip[Rake], :tip[Ferocious Bite] ve :tip[Pounce]'ın temel puanı ve attack power çarpanı yaklaşık %25, :tip[Starfire]'ın temel hasarı yaklaşık %40 arttı.
- **Balance:**
  - :tip[Genesis] artık periyodik hasar ve iyileştirmeyi %2/4/6/8/10 artırıyor (önceden %1/2/3/4/5).
  - :tip[Moonkin Form]{class=druid}'un kritik vuruş bonusu yine tüm kritik vuruşlara uygulanıyor ve yine :tip[Leader of the Pack] ile üst üste binmiyor.
- **Feral:**
  - :tip[Heart of the Wild], Furor ile yer değiştirerek Restoration ağacına taşındı.
  - :tip[Lacerate]{class=druid}, Primal Bite'ın yerine geçen 4. satır 1 puanlık talent oldu; daha erken öğrenildiği için iki yeni rank eklendi.
  - Yeni 1 puanlık talent Predatory Discipline (4. satır, 3. sütun, Shifting Power'ın yerinde): :tip[Ferocious Bite] artık fazla Energy'yi hasara çevirmiyor ama fazla Energy'ye göre ek hasar vermeye devam ediyor.
  - :tip[Predatory Strikes] 1. sütuna, Natural Instinct 4. sütuna taşındı; :tip[Rend and Tear] 1. sütuna taşındı ve bonusu %3/6/9/12/15 oldu (önceden %2/4/6/8/10).
  - :tip[Leader of the Pack]'in kritik bonusu yine tüm kritik vuruşlara uygulanıyor ve Moonkin Aura ile üst üste binmiyor.
  - :tip[Berserk] talent'ı kaldırıldı. Yerine 7. satırda, :tip[Leader of the Pack] ön koşullu, 3 rank'lik Primal Bite geldi. Shifting Power, Predatory Discipline ön koşullu 7. satır 1 puanlık talent oldu; böylece Feral'in biri Bear, biri Cat odaklı iki 31 puanlık talent'ı var.
- **Restoration:**
  - Furor Feral'e taşındı (:tip[Heart of the Wild] ile takas); Reflection ile Subtlety satır değiştirdi.
  - :tip[Naturalist] artık tüm hasarı %2/4/6/8/10 artırıyor (önceden %1/2/3/4/5) ve :tip[Wild Growth]{class=druid}'un büyü süresini 0,1 ila 0,5 saniye kısaltıyor.
  - Gift of the Earthmother kaldırıldı. Yeni 1 puanlık talent :tip[Bloom]: :tip[Rejuvenation] ya da :tip[Regrowth] süresi dolarak biterse hedef Spirit'inin %100'ü kadar iyileşir, dispel edilirse %50'si kadar.
  - :tip[Swiftmend]{class=druid}, hedefte o Druid'in kendi koyduğu :tip[Rejuvenation] ya da :tip[Regrowth]'u şart koşuyor. :tip[Wild Growth]{class=druid}'un temel büyü süresi 3 saniye.

::class[Hunter]

- Tüm tuzak türleri artık tek bir 30 saniyelik bekleme süresini paylaşıyor (önceden Fire ve Frost tuzaklarının ayrı süresi vardı). :tip[Explosive Trap] debuff metni düzeltildi; pet'ler eğitimleri geri alınınca saldırı hızı pasiflerini kaybetmiyor.
- :tip[Aimed Shot] bonus hasarı tüm rank'lerde yaklaşık %110 arttı. :tip[Arcane Shot] temel hasarı yaklaşık %30 arttı, attack power çarpanı 0,1'den 0,15'e çıktı. :tip[Serpent Sting] tik başına çarpanı %3'ten %5'e, temel hasarı yaklaşık %20 arttı.
- :tip[Aspect of the Hawk] ranged attack power değerleri rank 1-6 için 20, 35, 50, 70, 90, 110.
- **Beast Mastery:** :tip[Pathfinding] 2. satırdan 3. satıra taşındı.
- **Marksmanship:**
  - :tip[Barrage] %5/10/15 (önceden %3/7/10).
  - :tip[Sniper Shot]{class=hunter} bonus hasarı %100 arttı.
  - :tip[Trueshot Aura]{class=hunter} ranged attack power değerleri: 20, 35, 50, 75, 100.
- **Survival:**
  - :tip[Lacerating Strikes], saniye başına hasarı daha düşük olsa bile aynı Hunter'ın mevcut etkisinin üzerine yazıyor.
  - :tip[Lightning Reflexes]{class=hunter} %3/6/9/12/15 Agility veriyor (önceden %2/4/6/8/10).

::class[Mage]

- Imbue Iceknife'ın görseli artık Stun değil Root olduğunu daha net gösteriyor. Frost Blast kaldırıldı.
- **Arcane:**
  - :tip[Missile Barrage] artık :tip[Arcane Missiles] channel'ının başında tüketiliyor (önceden sonunda) ve 2. satıra taşındı.
  - :tip[Arcane Resilience] 1. satıra taşındı ve 3 puana kadar yatırım kabul ediyor; maksimum zırh artışı Intellect'in %75'i.
  - :tip[Missile Barrage] aktifken Clearcasting artık :tip[Arcane Missiles]'ta tüketilmiyor; :tip[Arcane Missiles]'ın Clearcasting tetiklememesi düzeltildi.
  - Arcane Focus kaldırıldı, Frost ağacındaki :tip[Precision]{class=mage} talent'ıyla birleştirildi.
  - :tip[Arcane Blast]{class=mage}: stack başına mana maliyeti artışı %175'ten %100'e, stack başına Intellect'ten gelen büyü hasarı %15'ten %12'ye düştü; süre 18 saniyeye çıktı.
- **Fire:**
  - :tip[Ignite]'ın :tip[Flamestrike] hasarına ilk tikten sonra uygulanmaması düzeltildi.
  - Incineration artık etkilenen büyülerde %10 kritik şansı için 5 puana kadar yatırım kabul ediyor (önceden 3 puan, %6).
  - Improved :tip[Fireball]'un adı Accelerant oldu ve :tip[Arcane Wrath]{class=mage} büyü süresini de 0,5 saniyeye kadar kısaltıyor.
  - :tip[Critical Mass] yine 3 puana ve toplam %6'ya döndü (önceden 5 puan, %10). :tip[Improved Fire Blast] 3. satıra taşındı.
- **Frost:**
  - Piercing Ice kaldırıldı. :tip[Ice Barrier]{class=mage} artık kullanıldığında Frost hasarını 1 dakika boyunca %15, bariyer ayaktayken ek %5 artırıyor.
  - :tip[Frost Warding], :tip[Ice Barrier]{class=mage} ve :tip[Frost Ward]'ların emebileceği hasarı artırıyor; büyü yansıtmak yerine Ward'ı tüketmeden büyünün hasarını tamamen sıfırlama şansı veriyor.
  - Elemental Precision'ın adı :tip[Precision]{class=mage} oldu, 3 puanlık talent'a döndü ve tüm büyülerde %2/4/6 isabet veriyor (önceden %1/2/3/4/5).
  - :tip[Ice Lance]{class=mage}'in :tip[Fire Blast] ile paylaşılan 8 saniyelik bekleme süresi var ve Frozen hedeflere bonus hasarı yine %300.
  - :tip[Winter's Chill], :tip[Cone of Cold] hasarını stack başına %20 artırıyor.

::class[Paladin]

- :tip[Righteous Fury] artık 10. seviyede eğitilebiliyor (önceden 16). Tüm tehdidi %33, Holy hasarından gelen tehdidi ek %90 artırıyor ve Legacy talent'ı The Quick and the Dead ile bedava oluyor.
- Salvation, Mass Salvation, Revoke ve Blessing of Light kaldırıldı.
- Judgement of Fury 3 saniye sürüyor (önceden 4).
- **Holy:**
  - :tip[Spiritual Focus] 1. satırda 5 puanlık, :tip[Improved Seals] 5 puanlık, :tip[Reverence] 2. satırda 2 puanlık talent oldu (maksimum etki aynı). :tip[Purifying Power] 2. satıra; :tip[Divine Favor]{class=paladin} ve :tip[Illumination] 3. satıra taşındı.
  - :tip[Unyielding Faith] Retribution'a taşındı, :tip[Holy Conduit] taşındı, Voice of Truth kaldırıldı.
  - Divine Precision 4. satıra taşındı, 2 puanlık oldu ve Holy isabet şansı %4/8 (önceden %6/12/18); ayrıca üzerinizdeki Silence süresini %10/20 kısaltıyor.
  - Yeni talent Oath of Light (4. satır): 40 yard menzil, temel mananın %8'i, bir müttefike 5 dakikalık yemin; :tip[Holy Light], :tip[Flash of Light] ve :tip[Holy Shock]{class=paladin} iyileştirmesini artırıyor, seviyeyle ölçekleniyor.
  - Yeni talent Boundless Light (5. satır): Oath of Light'ın etkilemediği müttefiklere atılan :tip[Holy Shock]{class=paladin}'ın kritik şansını %15/30 artırıyor.
  - :tip[Holy Power]{class=paladin} artık Holy büyülerinin kritik iyileştirme bonusunu %10 ila %50 artırıyor.
  - :tip[Light's Vigil]{class=paladin} yalnızca dost hedeflerde kullanılabiliyor ve saldırı yönü kaldırıldı.
- **Protection:**
  - :tip[Reckoning]{class=paladin} stack'e göre doğru sayıda saldırı yapıyor ve oturarak stack kazanmıyor.
  - :tip[Divine Intellect] Protection'ın 1. satırına taşındı. :tip[Sacred Duty] 2. satıra taşındı, artık Stamina vermiyor ve Forbearance süresini 5/10 saniye kısaltıyor.
  - :tip[Templar's Bulwark]{class=paladin} 3. satıra taşındı ve dispel edilebilen bir Magic etkisi oldu. :tip[Holy Shield]{class=paladin} 5. satıra taşındı.
  - :tip[Improved Righteous Fury] hasar azaltımı %3/6/9 (önceden %2/4/6). :tip[Shield Specialization]{class=paladin} 2 puanlık talent (%15/30 blok değeri); :tip[Toughness]{class=paladin} 3. satıra, :tip[Anticipation]{class=paladin} 4. satıra taşındı.
  - :tip[Swift Judgement]{class=paladin} artık aktif Seal'ı anında serbest bırakıyor ve Judgement ile bekleme süresi paylaşmıyor.
  - :tip[Iron Creed] 3 puanlık talent oldu (:tip[Holy Strike] tehdidi %10/20/30, 6 saniye boyunca %2/4/6 hasar azaltımı).
  - One-Handed Weapon Specialization ve Improved :tip[Seal of Fury] kaldırıldı.
  - Yeni talent'lar: Stoicism (5. satır, Stun ve Charm süresini %10/20 kısaltır) ve Shieldsworn (7. satır, :tip[Holy Strike] bekleme süresini 4 saniye kısaltır, kalkanla vurur, blok talent'larını şarj harcamadan tetikler ve 6 saniye büyü bloklamana izin verir).
- **Retribution:**
  - :tip[Conviction] (2. satır) artık tüm büyü ve saldırılara %2/4/6 kritik şansı veriyor. :tip[Sanctified Judgement] 2. satıra taşındı.
  - :tip[Vindication] artık attack power artırmıyor.
  - :tip[Two-Handed Weapon Specialization]{class=paladin} (4. satır) artık Holy ve Physical hasarı %2/4/6 artırıyor ve iki elli silahla tehdidi %7/14/20 azaltıyor.
  - :tip[Champion of the Light] büyü hasarını Intellect'in %60'ına kadar artırıyor ve :tip[Hammer of Wrath] büyü süresini 1 saniyeye kadar kısaltıyor.
  - Vengeance 5 stack'e çıkıyor ve artık :tip[Seal of Command]{class=paladin} şart koşuyor.
  - Instrument of Law ve Twist of Light kaldırıldı. 5. satırdaki yeni talent Turn Evil, :tip[Turn Undead]'in büyü süresini ve bekleme süresini kısaltıyor ve Demon'lara da etki etmesini sağlıyor.
  - Unsealed Wrath yeni 31 puanlık talent: yakın dövüş saldırıların aktif Seal'ın bir kopyasını 15 saniye saklıyor (en fazla 3 stack); farklı bir Seal ile vurunca stack'ler tüketiliyor ve saklanan Seal stack başına bir kez normal şansıyla tetikleniyor. :tip[Repentance]{class=paladin} ön koşullu.

::class[Priest]

- :tip[Power Word: Shield] artık eşit ya da daha yüksek rank'li bir :tip[Power Word: Shield] ile değiştirilebiliyor.
- :tip[Shadow Word: Death] öldüremezse Priest'e maksimum canının %30'u kadar hasar veriyor (önceden %10) ve ıskalayınca Priest'e hasar vermiyor.
- Undead Priest'in :tip[Dark Sacrifice]'ının crowd control'ü yine bozması düzeltildi.
- **Holy:** Binding Heal kaldırıldı, yerine Holy Binding talent'ı geldi: :tip[Flash Heal] başkasını iyileştirdiğinde o iyileştirmenin %50'si sana da uygulanıyor, tehdit yaratmaz.
- **Shadow:**
  - :tip[Devouring Contagion] bir critter'dan yayılırken :tip[Devouring Plague]'i artık yaymıyor.
  - :tip[Vampiric Embrace]{class=priest} iyileştirmesi artık kritik vuramıyor.
  - :tip[Cure Disease]{class=priest} ve :tip[Abolish Disease] artık seni :tip[Shadowform]{class=priest}'dan çıkarmıyor.

::class[Rogue]

- :tip[Slice and Dice] ve :tip[Ruthlessness]{class=rogue} talent'ı artık oturan hedefi ayağa kaldırmıyor.
- Yeni pasif Poised, 18. seviyede öğrenilir ve Druid'dekiyle aynı çalışır. Yeni büyü Shank (24. seviye; 5 Energy, 10 saniye bekleme, yakın menzil): off-hand silahla silah hasarının %50'sini vurur, 15 Energy üretir ve ıskalamaz; Rank 2 44. seviyede 25 Energy üretir.
- :tip[Deadly Poison] ve :tip[Instant Poison] attack power çarpanları iki katına çıktı (0,009 ve 0,01).
- **Assassination:**
  - :tip[Improved Expose Armor] 2. satıra, :tip[Vigor] 3. satıra, :tip[Relentless Strikes] 5. satıra taşındı ve 5 puanlık talent oldu (Combo Point başına %4 ila %20 ile 25 Energy geri verir).
  - :tip[Lethality] 2 puanlık talent oldu (%10/20 kritik hasar). Murder kaldırıldı.
  - Yeni talent Blood Splatter: :tip[Rupture] 6, :tip[Garrote] 9 saniye daha uzun sürüyor.
  - :tip[Venom]{class=rogue} 5. satırda pasif oldu: Shank, Poison hasarını %30, poison uygulama şansını %20 artırıyor (6 saniye).
  - :tip[Seal Fate] 3 puanlık talent oldu (%33/66/100). :tip[Mutilate]{class=rogue} 7. satıra taşındı ve silah hasarının %90'ını artı daha yüksek bir sabit değeri vuruyor.
- **Combat:**
  - Improved :tip[Eviscerate]'in adı Coup de Grace oldu (:tip[Eviscerate] ve Death Mark hasarı ve depolama oranı %7/13/20). Improved :tip[Sinister Strike]'ın adı Efficient Strikes oldu (:tip[Sinister Strike] ve :tip[Hemorrhage]{class=rogue} maliyeti -3/5).
  - :tip[Improved Sprint] 2. satıra; :tip[Weapon Expertise] ve :tip[Aggression] 4. satıra taşındı. :tip[Aggression] artık :tip[Sinister Strike] ve :tip[Eviscerate] hasarını %5/10/15 artırıyor.
  - :tip[Dual Wield Specialization]{class=rogue} 5. satırda 2 puanlık talent oldu (off-hand hasarı %25/50). :tip[Flawless Execution] maliyeti 15 azaltıyor (önceden 10).
  - Yeni talent'lar: Composure (3. satır, Poised indirimini artırır) ve Flash of Steel (6. satır, Shank'ten daha fazla Energy ve daha kısa bekleme).
- **Subtlety:**
  - :tip[Hemorrhage]{class=rogue} ve :tip[Ghostly Strike]{class=rogue}'ın Dagger ile fazla hasar vermesi düzeltildi.
  - Setup artık %15/30/45 (önceden %33/66/100). Opportunity 5 puanlık talent oldu (%4 ila %20 bonus hasar). :tip[Camouflage] 3 puanlık talent oldu.
  - Birçok talent satır değiştirdi (Setup, :tip[Dirty Deeds], :tip[Camouflage], :tip[Premeditation]{class=rogue}, Serrated Blades, :tip[Elusiveness], :tip[Ghostly Strike]{class=rogue}, :tip[Heightened Senses]). :tip[Ghostly Strike]{class=rogue} artık 7 saniye içindeki bir sonraki :tip[Ambush] ya da :tip[Garrote]'un Stealth şartını kaldırıyor.
  - :tip[Hemorrhage]{class=rogue} artık :tip[Garrote] hasarını da %15 artırıyor. Improved Distract, Quietus, Cutthroat ve Thousand Cuts kaldırıldı.
  - Yeni talent'lar: Quick Getaway (fazladan Sap hedefi ve Sap sonrası hız), Boot Knife (Shank hedefe 2 Combo Point ekleyebilir) ve Death Mark (7. satır, 25 Energy, 20 yard menzil, 10 saniye bekleme; Combo Point başına hasarının bir kısmını depolar ve 6 saniye sonra vurur).

::class[Shaman]

- :tip[Windfury Weapon] ve :tip[Windfury Totem] artık ek bir silah savurma animasyonu gösteriyor.
- :tip[Totemic Projection]'ın adı Totemic Call oldu: totemleri sana ışınlıyor, bekleme süresi 30 saniye.
- :tip[Lightning Bolt] temel hasarı tüm rank'lerde arttı (maksimum rank +%80, Classic Era temel hasarının yaklaşık %78'i ama daha kısa büyü süresiyle). :tip[Chain Lightning]'in büyü süresi 2,5 saniye, hasarı :tip[Lightning Bolt]'un yaklaşık %145'i, mana maliyeti yaklaşık %225'i. Shock temel hasarları Classic Era değerlerine döndü.
- **Elemental:** :tip[Lightning Overload] %10/20/30 (önceden %3/7/10). :tip[Lava Burst] kaldırıldı, yerine :tip[Call of Thunder] geldi (:tip[Lightning Bolt] ve :tip[Chain Lightning] kritik şansı +%5). :tip[Elemental Mastery]{class=shaman}'nin adı Lightning Mastery oldu. :tip[Elemental Reach] artık :tip[Totemic Projection]'ı etkilemiyor.
- **Enhancement:** :tip[Improved Ghost Wolf] 4. satıra taşındı. :tip[Maelstrom Weapon] tetiklenme şansı iki katına çıktı. :tip[Stormstrike]{class=shaman} normalize silah hasarının %150'sini vuruyor, bekleme süresi 6 saniye. :tip[Mental Dexterity] Intellect'in %50/100/150'si kadar attack power veriyor. :tip[Flurry]{class=shaman} %6 ila %30 saldırı hızı veriyor.
- **Restoration:** :tip[Riptide]{class=shaman} yaklaşık %40 daha ucuz, bekleme süresi 12 saniye (önceden 6) ve artık baştan iyileştirmiyor, yalnızca zamanla iyileştiriyor.

::class[Warlock]

- Spellstone'lar artık yalnızca Shadow hasarını artırıyor (Fire'ı da artırıyordu). Pet'ler Stamina'nın her puanı için 2 Health kazanıyor (önceden 7,5). :tip[Bane of Agony] hasarını dinamik güncelliyor. :tip[Drain Soul]'un hasar verince Soul Shard verme şansı belirgin düştü.
- **Affliction:** :tip[Amplify Curse]{class=warlock} artık :tip[Curse of Exhaustion]{class=warlock} ve :tip[Bane of Agony]'yi de etkiliyor. :tip[Improved Drains] :tip[Drain Mana]'yı artırıyor ama artık :tip[Wrack]{class=warlock}'i artırmıyor. :tip[Wrack]{class=warlock}'in çarpanı iki katına çıktı ve 60. seviyede saniye başına temel hasar 36'dan 86'ya çıktı.
- **Destruction:** :tip[Shadow and Flame] %4/8/12/16/20 veriyor (önceden %2/4/6/8/10).

::class[Warrior]

- :tip[Victory Rush] tooltip'indeki hasar düzeltildi. :tip[Defensive Stance] tehdit bonusu %30'dan %80'e çıktı. :tip[Slam] bekleme süresi 15 saniye (önceden 18).
- **Arms:** :tip[Improved Tactical Mastery] 3 puanlık talent oldu (5/10/15 Rage korur). :tip[Two-Handed Weapon Specialization]{class=warrior} %2/4/6. Bloodthrill 2 puanlık talent oldu (:tip[Overpower] için %10/20 şans). :tip[Improved Slam], :tip[Slam] bekleme süresini 2,5/5 saniye kısaltıyor.
- **Fury:**
  - :tip[Blood Craze] ve Gore Drinker artık tehdit üretmiyor; :tip[Blood Craze] oturarak tetiklenmiyor.
  - :tip[Booming Voice] artık :tip[Piercing Howl]{class=warrior}'un Rage maliyetini de %5 ila %25 düşürüyor.
  - :tip[Enrage]{class=warrior} 3. satıra taşındı. Gore Drinker 5. satıra taşındı ve :tip[Blood Craze]'e bağlandı.
  - :tip[Death Wish]{class=warrior} artık :tip[Flurry]{class=warrior} için şart değil (:tip[Flurry]{class=warrior} 3 puan, %10/20/30 saldırı hızı); :tip[Bloodthirst]{class=warrior} artık :tip[Death Wish]{class=warrior} şart koşuyor.
  - Yeni talent'lar: Reckless Swings (4. satır, temel canın %25'ine mal olur, sonraki 4 yakın dövüş saldırın 5 ek Rage üretir) ve :tip[Improved Whirlwind] (6. satır, daha kısa bekleme ve en yakın düşmana daha fazla hasar).
- **Protection:** :tip[Defiance] tehdit bonusu %7/13/20 (önceden %5/10/15).

## Irk değişiklikleri

::race[Dwarf]

- Earth Fury (%2 kritik hasar ve iyileştirme) kaldırıldı; Artisan's Precision eklendi: büyü ve saldırılarda %1 isabet şansı.

::race[Human]

- Ruthless artık %1 kritik şansı veriyor (önceden %2). Human Spirit %10 Spirit veriyor (önceden %5).

::race[Orc]

- Savage (%1 kritik şansı) kaldırıldı. :tip[Command] geri geldi: Warlock ve Hunter pet'lerinin hasarı %5 artıyor. :racial[Blood Fury]'nin bekleme süresi 2 dakika (önceden 3).

::race[Skyborne]

- Wind-Blessed Haste %2 (önceden %3).
- High Order: Read Leyline Mana ve Health yenilenmesini 15 saniye boyunca %50 artırıyor (önceden %100). Innervate aktifken kullanılamıyor. Ley Line yakınında kullanılırsa 1 saat süren Attuned da veriyor; etki %100'e çıkıyor, ölümden sonra da sürüyor ve raid'e girince kalkıyor.
- Windshaper: :tip[Skysight] 15 saniye boyunca %15 hareket hızı veriyor (önceden %10). Elemental convergence yakınında kullanılırsa 1 saat süren Charged da veriyor; etki %30'a çıkıyor, ölüm ve raid kuralları aynı.

::race[Tauren]

- :tip[Plainsrunning] stack başına %2 hareket hızı veriyor (önceden %1), toplam en fazla %60 (önceden %30) ve artık binek hızını artırmıyor.
- Endurance artık yalnızca %5 ek Health veriyor (isabet ya da kritik hasar etkisi yok).

::race[Troll]

- Berserking 15 saniye sürüyor (önceden 10).

::race[Undead]

- :tip[Cannibalize] yine Physical hasara bağışıklıkken kullanılabiliyor.
- :tip[Touch of the Grave]'in yeterince sık tetiklenmemesi ve geride ışın görseli bırakması düzeltildi; internal cooldown 15 saniye (önceden 25).

## Yeni geliştirmeler / sistem değişiklikleri

- **Gamepad desteği** tam işlevsel hale geldi: hareket, büyüler, etkileşimler ve arayüz gezinmesi kumandayla çalışıyor; ayarlar Edit Mode ve Options menüsünden değiştirilebiliyor.
  - Gamepad Action Bar'daki AoE item'lar hedeflenen bir konuma yerleştirilebiliyor; onaylamak için tuşa tekrar basılıyor.
  - Focus Target LB + RB + Face Down ile seçilebiliyor; dost cesetler ve critter'lar hedeflenebiliyor. Düşman oyuncular artık Friendly Analog Targeting ile seçilemiyor.
  - Çanta arayüzü yeni görsellere, kalan alan ve cephane göstergelerine ve daha iyi Keyring gezinmesine kavuştu. Ruleset seçimi, sinematik atlama, uçuşu erken bitirme ve Pet Move komutu gamepad ile çalışıyor.
  - Birçok odak, Lua hatası ve swing timer sorunu düzeltildi.
- Çantalar artık boş çanta slotuna kendiliğinden takılmıyor; oyuncunun elle takması gerekiyor.
- Lansmandaki yüksek oyuncu sayısını karşılamak için birçok bölgede respawn hızları ayarlandı. Hızlar genelde düşük seviyeli bölgelerde daha yüksek (başlangıç bölgeleri en hızlısı) ve seviye arttıkça yavaşlıyor. Blizzard, lansman yoğunluğu durulunca düşük seviyeli bölge hızlarını düşürmeyi planlıyor.
- Quest deneyim değerleri, ön koşulları ve seviye ayarları düzenlendi; quest hedeflerine mouseover tooltip'leri eklendi, eksik ya da hatalı harita işaretleri düzeltildi. Bazı quest log bölge sıralaması ve item yok edince quest'in iptal olmaması sorunları giderildi.
- Bazı satyr'ler humanoid yerine demon olarak sınıflandırıldı.
- Bölge düzeltmeleri: Alterac Mountains (Dalaran Summoner'ların sınırsız summon yapması), Barrens (Rethgar Deathgate ":tip[Counterattack]!" etkinliğini başlatabiliyor, Alliance Outrunner'lar rastgele doğuyor), Darkshore ("Holy Diver" XP veriyor), Mulgore (Gloomrise Hatchling'ler daha az XP veriyor), Orgrimmar ("Hidden Enemies" insignia sorunu), Ruins of Lordaeron (dungeon quest'leri 15. seviye şart koşuyor), Teldrassil ("Twisted Hatred" için daha az örümcek), Wetlands ("Carnage" ve "Destruction in Deadmines" düzeltmeleri).

## Build 70753 (wclbox)

Bunlar resmi post'tan değil, wclbox karşılaştırmasından geliyor.

- Protection Paladin'in :tip[Holy Shield]'ı artık 60. seviye, 240 mana maliyeti ve 10 saniye bekleme süresi gösteriyor.
- Orc :tip[Command] artık anlık büyü.
- Build'deki yeni ya da değişen item'lar arasında Recipe: Transmute Earth to Water ve Plans: Prefect's Waistguard gibi birkaç tarif ve plan, ayrıca Toughened Leather Armor ve Pouch of Violet Dust var.

## Bilinen sorunlar

- Bu notlarla birlikte bilinen sorunlar listesi gelmedi.
