---
title: "WoW Forever notes: October 15 update (build 70425)"
date: 2026-10-16
tags: [wow-forever, patch-notes]
accent: warning
excerpt: "A broad pass over racial abilities, a reworked Arcane Blast and the new Frost Blast for Mages, and a stand-still rule for Hunter Auto Shot."
draft: false
build: "1.60.1.70425"
sources:
  - https://us.forums.blizzard.com/en/wow/t/wow-forever-beta-development-notes-%E2%80%93-updated-october-15/2360696/6
  - https://us.forums.blizzard.com/en/wow/t/beta-realm-maintenance-october-15/2383475/1169
  - https://us.forums.blizzard.com/en/wow/t/druid-cat-form-quest/2384010/56
  - https://wowforever.wclbox.com/en/buding
---

The October 15 maintenance moved the beta realm to build **1.60.1.70425**. Players still on the old build need to quit and update through the Battle.net app. The headline items this round are a rework of racial abilities and changes to the Mage's Arcane tree.

## Character & class changes

### General

- Wands now need you to stand still for 0.5 seconds before firing, the way early World of Warcraft worked.

::class[Hunter]

- :spell[Auto Shot] has the same 0.5 second stand-still requirement. It keeps firing while you cast spells such as :spell[Aimed Shot].
- :talent[Trueshot Aura] now affects the whole raid.
- :talent[Resourcefulness] only triggers on melee and ranged ability crits now, not traps. It also correctly lowers the mana cost of :spell[Strider Kick].
- You can keep one fire trap and one ice trap active at the same time. Before this, the limit was one trap of any type.
- :spell[Summon Hawk] spawns the hawk on the target you cast it on and keeps it attached to that target.
- Pet abilities were toned down. Dismember now reduces healing by 25% (was 50%). Sonic Blast now slows casting by 30% (was 60%). Both last for less time and have longer cooldowns.

::class[Mage]

- New spell: Frost Blast, learned at level 24. It's a 1.5 second cast that deals damage and slows the target by 40%. Every talent that affects Frostbolt also affects it. The developers added it to cover what Rank 1 :spell[Frostbolt] used to do, now that down-ranking is penalized.
- :spell[Arcane Blast] has been redesigned:
  - It's now a 1.5 second cast.
  - Each cast gives the Mage spell damage equal to 15% of Intellect, stacking up to 4 times.
  - The effect lasts 15 seconds from the first application.
  - Damage and spell damage coefficients are 40% lower.
- :talent[Missile Barrage] moved to the first row and is now a 2-point talent. :spell[Arcane Missiles] hits can trigger it as well.
- New 16-point talent: :talent[Arcane Wrath]. It's a 3.5 second cast on a 6 second cooldown. Its damage is calculated as if the Mage had extra spell power equal to 5% of their maximum mana.
- Fixed :talent[Presence of Mind] not being consumed by spell casts.

::class[Druid]

- :talent[Leader of the Pack] now grants only melee and ranged crit chance, and it affects the whole raid. The aura from :spell[Moonkin Form] now grants only spell crit chance, also raid-wide.
- :spell[Shred] (Rank 1) is learned at level 20 (was 22).
- :spell[Faerie Fire] now generates threat in Bear and Dire Bear Form.

## Racial changes

::race[Tauren]

- :racial[Endurance] now grants 2% critical damage and healing (was 1% hit).
- :racial[Plainsrunning] adds 3% mounted speed. Keeping the effect now requires covering a minimum distance per second.
- :racial[War Stomp] cooldown is down to 90 seconds.
- :racial[Cultivation] cooldown is down to 15 minutes.

::race[Orc]

- :racial[Blood Fury] cooldown is up to 3 minutes (was 2).
- :racial[Shatter Curse] no longer grants immunity. It dispels curses and banes, and its magic damage reduction is 5% (was 15%).
- Axe Specialization is replaced by Savage: 1% crit chance.

::race[Troll]

- :racial[Regeneration] health regeneration bonus is up to 20% (was 10%).

::race[Skyborne]

- :racial[Wind Blessed] haste goes to 3% (was 1%).
- :racial[Walk on Air] cooldown is down to 90 seconds.
- Skysight and Read Leyline can now be used while moving.

::race[Human]

- Sword Specialization is replaced by Ruthless: 2% crit chance.

::race[Dwarf]

- Mace Specialization is replaced by Earth Fury: 2% critical damage and healing.

::race[Gnome]

- :racial[Eureka!] is now an 8 second buff with no charges. It also works with Power Word: Shield.

::race[Undead]

- :racial[Touch of the Grave] was tuned to be more consistent: a 30% proc chance for casters, 20% for Paladins, Rogues and Warriors, and a 25 second internal cooldown.

## Notable bug fixes

- Fixed overly bright fog at low shadow settings.
- Fixed Horde players being able to earn Kirin Tor reputation.
- Creatures regenerate health properly out of combat again.
- Some drink tooltips showed the wrong total mana regeneration. This is fixed.
- An October 16 hotfix fixed Druids being unable to loot the relics needed to learn :spell[Cat Form].

## New features / system changes

- New players get a new tutorial experience.
- Bloom intensity is now a slider in the Advanced graphics options.
- Hunters get a new setting that switches automatically between auto attack and Auto Shot. It works on gamepad too.
