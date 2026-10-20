---
title: "WoW Forever notes: October 8 update (build 70291)"
date: 2026-10-08
tags: [wow-forever, patch-notes]
accent: warning
excerpt: "New City of Dalaran dungeon opened for testing, dungeon creature XP increased by 20%, multi-weapon swaps restored within the same GCD, and extensive class fixes."
draft: false
build: "1.60.1.70291"
sources:
  - https://us.forums.blizzard.com/en/wow/t/wow-forever-beta-development-notes-%E2%80%93-updated-october-15/2360696/5
  - https://us.forums.blizzard.com/en/wow/t/the-wow-forever-podcast-episode-3-dive-into-dungeons-with-devs-ft-hammerdancegaming/2376010/20
  - https://us.forums.blizzard.com/en/wow/t/world-of-warcraft-forever-class-deep-dives-%E2%80%94-mage-and-shaman/2375389/58
  - https://wowforever.wclbox.com/en/buding
---

The WoW Forever Beta realm was updated to build **1.60.1.70291** following the October 8 maintenance. The new City of Dalaran dungeon is now available for testing, party dungeon experience calculations revert to Classic Era rules, and base dungeon creature kill XP is boosted by 20%.

## Character & Class changes

### General / Rage Mechanics

- Resolved issues where damage taken calculations for Rage were using player health rather than expected mob damage, preventing higher Stamina gear from penalizing Rage gain.
- Rage calculations now correctly process damage absorbs without negating Rage generation.

::class[Druid]

- Fixed a bug preventing Druids from using Mana Potions while shapeshifted in Bear, Dire Bear, or Cat Form.
- :spell[Bear Form] and :spell[Dire Bear Form] threat bonus increased to 50% (was 30%).
- :spell[Demoralizing Roar] now applies threat to all affected targets.
- **Feral:** Predatory Instincts renamed to Natural Instinct and now additionally increases spell healing by 12%/25% of Intellect. Shifting Power can no longer be used while already at full energy.

::class[Hunter]

- :spell[Disengage] received its intended doubled threat reduction.
- Resolved an issue causing hunter pets to repeatedly gain health when at low health.
- **Survival:** :talent[Expose Prey] duration increased to 10 seconds (was 5). :talent[Entrapment] now properly observes diminishing returns and only procs on Frost Trap's initial activation.

::class[Mage]

- Fixed an issue where :talent[Impact] could proc off Flamestrike's periodic damage ticks.
- Base points and points-per-level curves smoothed for early ranks of :spell[Frostbolt], :spell[Fireball], and :spell[Arcane Missiles].

::class[Paladin]

- :spell[Retribution Aura] now uses the casting Paladin's spell power rather than the struck target's, and its values were returned to Vanilla baselines.
- **Protection:** :talent[Reckoning]{class=paladin} now has a 1.5-second internal cooldown. Seal of Fury and Shield Specialization no longer generate threat when restoring Mana.

::class[Priest]

- **Discipline:** :spell[Penance] tuned and fixed to be a 2-second channel rather than treating it as 3 seconds, with increased healing on ranks 2 and 4.

::class[Shaman]

- :spell[Flametongue Totem] now respects shapeshifted attack speed rather than equipped weapon speed.
- All Shaman weapon imbues (:spell[Rockbiter Weapon], :spell[Flametongue Weapon], :spell[Frostbrand Weapon], :spell[Windfury Weapon]) increased to 60-minute durations and can coexist with temporary sharpening stones and oils.
- :spell[Water Shield] mana return accurately displayed in the buff tooltip.

::class[Warlock]

- Warlock pets are now stunned while summoning a new pet.
- Demonology: Demonic Brand bonus pet damage only produces high threat when dealing Shadow damage.

::class[Warrior]

- :spell[Demoralizing Shout] now generates threat on all affected targets.
- **Arms:** :talent[Deep Wounds] is once again a prerequisite for :talent[Impale] and no longer scales off off-hand weapon Attack Power.
- **Protection:** Fixed an issue preventing :spell[Last Stand] from granting the proper amount of health on activation.

## Important bug fixes

- Restored Classic looting behavior where empty creatures can still be interacted with.
- Fixed visual flickering on large models and addressed unintentional long-distance creature pulls.

## System changes & updates

- **New Dungeon:** City of Dalaran dungeon open for testing.
- **Weapon Swapping:** Players can once again swap multiple weapons within the same GCD (e.g. two-handed to sword-and-board).
- **Dungeon Experience:** Dungeon creature kill XP increased by ~20%. In parties with varying levels, kill XP penalties were removed and reverted to Classic Era calculations based solely on the individual player's level.
- **Cooldown Manager:** Support extended to all classes, racial abilities, and trinkets.
- **Legacy System:** All testers granted completion of the Legacy Challenge with 16 Legacy Points to test builds, with respec costs lowered.
- **Discord Voice:** Integrated Discord Voice setting added under in-game audio options for party leaders.

## Known issues

- Updated textures for Skyborne cat form and Zephras Isle creatures will arrive in an upcoming patch.
- Hunters with the Ferocity talent may see an unchanged pet critical strike chance on the character sheet (visual only).
