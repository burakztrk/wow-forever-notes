---
title: "WoW Forever notes: October 1 update (build 70170)"
date: 2026-10-01
tags: [wow-forever, patch-notes]
accent: warning
excerpt: "Level cap raised to 30, the new Excavation Site: Wetlands dungeon unlocked, and broad class balance adjustments across all specializations."
draft: false
build: "1.60.1.70170"
sources:
  - https://us.forums.blizzard.com/en/wow/t/wow-forever-beta-development-notes-%E2%80%93-updated-october-15/2360696/4
  - https://us.forums.blizzard.com/en/wow/t/actions-taken-against-botting-and-rmt/2368705/1
  - https://us.forums.blizzard.com/en/wow/t/legacy-points-for-beta-testing/2368776/1
  - https://wowforever.wclbox.com/en/buding
---

The WoW Forever Beta realm was updated to build **1.60.1.70170** following the October 1 maintenance. This update increases the level cap to 30, introduces new dungeons, and brings significant revisions to class talent trees.

## Character & Class changes

::class[Warrior]

- Additional Rage generated from landing Critical Strikes with basic attacks increased to 100% increased Rage (was 75%).
- Rend and :spell[Sunder Armor] now instantly tap enemies to the Warrior.
- Queueing :spell[Heroic Strike] no longer increases off-hand hit chance.
- :spell[Spearing Strike] no longer requires a two-handed weapon; it now requires Battle Stance.
- **Fury:**
  - :talent[Booming Voice] now increases the area of effect of shouts by 10% to 50% and reduces their Rage cost by 5% to 25%.
  - New Talent Lingering Rage in Row 2 of Fury: increases the time before Rage begins to decay when leaving combat by 2 to 10 seconds.
  - New Talent Furious Precision in Row 3 of Fury: increases chance to hit with off-hand attacks by 4%/7%/10%.
  - :talent[Raging Blow] now reduces the Rage cost of :spell[Cleave] and :spell[Whirlwind] by 3. Whirlwind now always strikes with both weapons without requiring a talent point.
  - :talent[Flurry]{class=warrior} now requires :talent[Death Wish] instead of :talent[Enrage]{class=warrior}.
  - New Talent Gore Drinker in Row 6 of Fury.
  - :spell[Berserker Rage] is now available at level 30 (was 32).
  - :spell[Bloodthirst]'s Attack Power ratio increased to 45% (was 35%).
- **Protection:**
  - :talent[Iron Will] and :talent[Improved Bloodrage] moved to Row 1. :talent[Anticipation]{class=warrior} and :talent[Improved Revenge] moved to Row 2. The Toughness talent has been removed.

::class[Druid]

- :spell[Bear Form] and :spell[Dire Bear Form] generate 75% increased Rage when landing a Critical Strike.
- :spell[Swipe] now correctly scales with 3% of the Druid's Attack Power.
- All Shapeshift Forms are now immune to Disarm effects.
- :spell[Faerie Fire] no longer resets your swing timer when used.
- **Feral:**
  - Primal Bite threat generation roughly doubled.
  - King of the Jungle and Tiger's Fury talents have been removed.
  - New Talent Shifting Power in Row 4 (converts 55% of Base Mana into 40 Energy in Cat Form). Connected in Row 5 is Improved Shifting Power to reduce its cooldown.

::class[Hunter]

- **Marksmanship:** The 31st talent :spell[Sniper Shot] now has a 45-yard range and increases the range of your next 3 shots by 10 yards.
- **Survival:** :talent[Deflection]{class=hunter} Parry increase changed to 1% to 5% (was 2% to 10%).
- Aggressive Mode is back for pets under the spellbook pet tab.

::class[Mage]

- All Mage comprehension scrolls received a balance pass and can no longer be cast while moving.
- **Fire:** Hot Streak renamed to Heating Up. Combustion charges returned to 3 (was 4). :talent[Improved Scorch]'s Fire Vulnerability no longer rolls a second resist check.
- **Frost:** :talent[Winter's Chill] application no longer rolls a resist check.

::class[Paladin]

- **Protection:** :talent[Redoubt] block chance changed to 4%–20% (was 6%–30%). :spell[Holy Shield] block chance increased to 30% (was 20%).
- **Retribution:** :talent[Champion of the Light] Intellect to Spell Damage ratio adjusted to 20%/40%/60%.

::class[Priest]

- :spell[Devouring Plague] can now critically strike.
- Inner Focus no longer applies its critical strike increase to periodic effects.
- :talent[Shadow Weaving] can no longer fail to apply.

::class[Rogue]

- Fixed an issue where missing with :spell[Expose Armor] caused all combo points to be lost.
- Setup now only adds combo points to the target you dodged or resisted a spell from.

::class[Shaman]

- :spell[Ghost Wolf] visibility improved in well-lit areas.
- :spell[Disease Cleansing Totem] fixed to 5-minute duration and :spell[Totemic Recall] now properly restores Mana.

::class[Warlock]

- :spell[Drain Soul] is correctly interrupted when beginning to cast another spell.
- :spell[Hellfire] can now critically strike.
- Soul Harvesting renamed to Soul Harvest with fixed Mana regeneration scaling.

## Racial changes

::race[Gnome]

- :racial[Eureka!] no longer benefits periodic effects (channeled spells do not count as periodics).

::race[Undead]

- :racial[Cannibalize] cannot be used while immune to Physical damage.

## Important bug fixes

- Improved rain visibility across zones.
- Temporarily disabled Ray Traced Shadows option while functionality is being addressed.
- Adjusted weapon visual scaling across all races for consistency when drawn and sheathed.

## System changes & updates

- **Level Cap:** Maximum level raised to 30.
- **Dungeons:** Opened Excavation Site: Wetlands (26-31), Razorfen Downs, and Uldaman.
- **Dungeon & Quest XP:** Dungeon quests award 50% less bonus experience; creature respawn rates adjusted in several leveling zones.
- **Barbershops:** Barbers added to Darnassus and Thunder Bluff with city guards offering directions.
- **Anti-RMT Measures:** Added in-game trading warnings against illicit gold and continued actioning botting accounts.
- **Gamepad Support:** Pet stable and compact raid/party frames updated for gamepad navigation.

## Known issues

- Chaining spells delays next cast animations and sounds until previous cast finishes.
- Enemies can parry or block from behind when standing too close.
- Switching to Gamepad UI mode resets the active edit mode layout to default.
