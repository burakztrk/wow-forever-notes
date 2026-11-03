---
title: "WoW Forever notes: November 2 development notes, last round before launch (build 70753)"
date: 2026-11-02
tags: [wow-forever, patch-notes]
accent: warning
excerpt: "Blizzard's last big beta round before the November 4 launch: higher damage across classes, rebuilt Druid, Paladin, Rogue and Warrior talent trees, new race tuning, gamepad support, cheaper training and faster respawns."
draft: false
build: "1.60.1.70753"
sources:
  - https://us.forums.blizzard.com/en/wow/t/wow-forever-beta-development-notes-%E2%80%93-updated-november-2/2360696/9
  - https://wowforever.wclbox.com/en/buding
---

Blizzard posted the development notes for everything changed since the October 15 beta update, covering about two and a half weeks. Build 70753 (November 2) is the newest build. The previously announced racial changes are repeated in the post for completeness. Class and talent details below are from the official post; the one build-only change at the end comes from the wclbox comparison.

## Important bug fixes

- Throw now uses the 0.5 second windup (it wrongly used the throwing weapon's attack speed).
- The Replica Ironforge Air Rifle (Legacy reward) can now be used on allies who also have one equipped.
- The quitter debuff lasts 40 seconds (was 5 minutes).
- The stun lasts 2.5 seconds (was 3 seconds).
- All races now have the correct base stats. For example, Tauren Warriors start with +5 Strength relative to Human Warriors (was +2). The same fix covers High Order and Windshaper Skyborne.
- Roots from procs now have diminishing returns: :tip[Frostbite], :tip[Entrapment], :tip[Improved Wing Clip], :tip[Counterattack] and :tip[Improved Hamstring].
- :tip[Hunter's Mark] can no longer be stacked by applying different ranks, and Rank 4 no longer gives less ranged attack power than Rank 3.
- The Darkspear Islands battleground no longer puts the "Recently Dropped Flag" debuff on a player who drops the flag.

## Character & Class changes

### General

- Developer notes: holding every class to Classic-like power budgets meant each new element had to cost something else. Blizzard raised class damage across the game and raised the health of higher-level creatures to compensate, and says some earlier changes leaned too hastily on Burning Crusade or Wrath-era solutions.
- Apart from bugs and serious outliers, no big tuning changes are planned before the raids open next month. A larger pass is expected once there is data from players past level 30.
- Many talents no longer have a trigger-chance penalty for low-rank spells. Blizzard keeps the penalty: it still lowers the chance to trigger :tip[Arcane Concentration], :tip[Frostbite] and :tip[Fingers of Frost] when cast with a rank learned more than 12 levels below your level.
- Newly learned spells are no longer added to action bars automatically.
- Training costs were rebalanced. Abilities learned at the same level mostly cost the same, and the total to train class abilities from 1 to 60 is about 206 to 207 gold for every class. Warlock costs are reduced by what Grimoires for pets would cost.

::class[Druid]

- :tip[Lacerate]{class=druid} is now a Feral talent instead of being learned by all Druids.
- :tip[Ferocious Bite] gets a new Rank 1 at level 24; existing ranks are relabelled one rank higher.
- :tip[Bear Form] and :tip[Dire Bear Form] threat bonus rises from 50% to 115%, to make up for Blessing of Salvation being removed.
- New passive Poised, learned at level 32: with full Energy out of combat, your next Energy ability costs 10 less.
- Damage increases: :tip[Shred] 200% weapon damage (was 155%), :tip[Claw] 140% (was 110%), :tip[Ravage]{class=druid} 435% (was 350%). Rip, :tip[Rake], :tip[Ferocious Bite] and :tip[Pounce] base points and attack power scaling rise about 25%, and :tip[Starfire] base damage about 40%.
- **Balance:**
  - :tip[Genesis] now raises periodic damage and healing by 2/4/6/8/10% (was 1/2/3/4/5%).
  - :tip[Moonkin Form]{class=druid}'s critical strike bonus again applies to all critical strikes and again does not stack with :tip[Leader of the Pack].
- **Feral:**
  - :tip[Heart of the Wild] moves to the Restoration tree, swapping with Furor.
  - :tip[Lacerate]{class=druid} becomes a 1-point row 4 talent replacing Primal Bite, with two new ranks added.
  - New 1-point talent Predatory Discipline (row 4, column 3, replaces Shifting Power): :tip[Ferocious Bite] no longer converts extra Energy into damage but still deals bonus damage from excess Energy.
  - :tip[Predatory Strikes] moves to column 1, Natural Instinct to column 4, and :tip[Rend and Tear] to column 1 with a larger bonus of 3/6/9/12/15% (was 2/4/6/8/10%).
  - :tip[Leader of the Pack]'s critical strike bonus again applies to all crits and does not stack with Moonkin Aura.
  - :tip[Berserk] is removed. Primal Bite takes its place on row 7, requires :tip[Leader of the Pack] and has 3 ranks. Shifting Power becomes a 1-point row 7 talent requiring Predatory Discipline, giving one Bear-focused and one Cat-focused 31-point talent.
- **Restoration:**
  - Furor moves to Feral (swap with :tip[Heart of the Wild]); Reflection and Subtlety swap rows.
  - :tip[Naturalist] now raises all damage by 2/4/6/8/10% (was 1/2/3/4/5%) and reduces :tip[Wild Growth]{class=druid}'s cast time by 0.1 to 0.5 seconds.
  - Gift of the Earthmother is removed. The new 1-point talent :tip[Bloom] heals the target for 100% of your Spirit when :tip[Rejuvenation] or :tip[Regrowth] expires naturally, or 50% if it is dispelled.
  - :tip[Swiftmend]{class=druid} needs a :tip[Rejuvenation] or :tip[Regrowth] cast by that Druid. :tip[Wild Growth]{class=druid} now has a 3 second base cast time.

::class[Hunter]

- All trap types now share one 30 second cooldown (previously separate for Fire and Frost traps). Fixed the :tip[Explosive Trap] debuff wording, and pets keep their attack speed passives when you untrain them.
- :tip[Aimed Shot] bonus damage rises about 110% on all ranks. :tip[Arcane Shot] base damage rises about 30% and its attack power coefficient goes from 0.1 to 0.15. :tip[Serpent Sting]'s coefficient per tick goes from 3% to 5% and its base damage rises about 20%.
- :tip[Aspect of the Hawk] ranged attack power for ranks 1 to 6 is now 20, 35, 50, 70, 90, 110.
- **Beast Mastery:** :tip[Pathfinding] moves from row 2 to row 3.
- **Marksmanship:**
  - :tip[Barrage] is 5/10/15% (was 3/7/10%).
  - :tip[Sniper Shot]{class=hunter} bonus damage rises 100%.
  - :tip[Trueshot Aura]{class=hunter} ranged attack power values: 20, 35, 50, 75, 100.
- **Survival:**
  - :tip[Lacerating Strikes] always overwrites an existing effect from the same Hunter.
  - :tip[Lightning Reflexes]{class=hunter} gives 3/6/9/12/15% Agility (was 2/4/6/8/10%).

::class[Mage]

- Imbue Iceknife's visual now reads as a Root, not a Stun. Frost Blast is removed.
- **Arcane:**
  - :tip[Missile Barrage] is now consumed at the start of the :tip[Arcane Missiles] channel (was the end) and moves to row 2.
  - :tip[Arcane Resilience] moves to row 1 and allows 3 points, for a maximum armor bonus of 75% of Intellect.
  - Clearcasting is no longer consumed by :tip[Arcane Missiles] while :tip[Missile Barrage] is active; fixed :tip[Arcane Missiles] not proccing Clearcasting.
  - Arcane Focus is removed and merged into the Frost talent :tip[Precision]{class=mage}.
  - :tip[Arcane Blast]{class=mage}: mana cost increase per stack drops from 175% to 100%, spell damage from Intellect per stack from 15% to 12%, and duration rises to 18 seconds.
- **Fire:**
  - Fixed :tip[Ignite] not applying to :tip[Flamestrike] damage after the first tick.
  - Incineration now takes up to 5 points for 10% critical chance on affected spells (was 3 points for 6%).
  - Improved :tip[Fireball] is renamed Accelerant and also shortens the cast time of :tip[Arcane Wrath]{class=mage} by up to 0.5 seconds.
  - :tip[Critical Mass] goes back to 3 points and 6% total (was 5 points, 10%). :tip[Improved Fire Blast] moves to row 3.
- **Frost:**
  - Piercing Ice is removed. :tip[Ice Barrier]{class=mage} now raises your Frost damage by 15% for 1 minute when cast, plus 5% while the barrier holds.
  - :tip[Frost Warding] raises the damage :tip[Ice Barrier]{class=mage} and Frost Wards can absorb, and instead of reflecting spells it has a chance to negate their damage without depleting the Ward.
  - Elemental Precision is renamed :tip[Precision]{class=mage} and is a 3-point talent with 2/4/6% spell hit chance (was 1/2/3/4/5%).
  - :tip[Ice Lance]{class=mage} has an 8 second cooldown shared with :tip[Fire Blast], and its bonus damage to Frozen targets returns to 300%.
  - :tip[Winter's Chill] raises :tip[Cone of Cold] damage by 20% per stack.

::class[Paladin]

- :tip[Righteous Fury] can be trained at level 10 (was 16). It now gives +33% to all threat and an extra 90% threat from Holy damage, and is free through the Legacy talent The Quick and the Dead.
- Salvation, Mass Salvation, Revoke and Blessing of Light are removed.
- Judgement of Fury lasts 3 seconds (was 4).
- **Holy:**
  - :tip[Spiritual Focus] is a 5-point row 1 talent, :tip[Improved Seals] a 5-point talent, :tip[Reverence] a 2-point row 2 talent (maximum effect unchanged). :tip[Purifying Power] moves to row 2; :tip[Divine Favor]{class=paladin} and :tip[Illumination] to row 3.
  - :tip[Unyielding Faith] moves to Retribution, :tip[Holy Conduit] moves, Voice of Truth is removed.
  - Divine Precision moves to row 4 as a 2-point talent with 4/8% Holy hit chance (was 6/12/18%) and now also shortens Silence on you by 10/20%.
  - New talent Oath of Light (row 4): 40 yard range, 8% of base mana, 5 minute oath on an ally that increases :tip[Holy Light], :tip[Flash of Light] and :tip[Holy Shock]{class=paladin} healing, scaling with level.
  - New talent Boundless Light (row 5): +15/30% :tip[Holy Shock]{class=paladin} critical chance on allies without your Oath of Light.
  - :tip[Holy Power]{class=paladin} now raises the critical healing bonus of Holy spells by 10 to 50%.
  - :tip[Light's Vigil]{class=paladin} only works on friendly targets and lost its offensive effect.
- **Protection:**
  - :tip[Reckoning]{class=paladin} performs the right number of attacks per stack and no longer gains stacks while sitting.
  - :tip[Divine Intellect] moves to row 1 of Protection. :tip[Sacred Duty] moves to row 2, no longer gives Stamina, and now shortens Forbearance by 5/10 seconds.
  - :tip[Templar's Bulwark]{class=paladin} moves to row 3 and is now a dispellable Magic effect. :tip[Holy Shield]{class=paladin} moves to row 5.
  - :tip[Improved Righteous Fury] reduces damage by 3/6/9% (was 2/4/6%). :tip[Shield Specialization]{class=paladin} is a 2-point talent (15/30% block value); :tip[Toughness]{class=paladin} moves to row 3, :tip[Anticipation]{class=paladin} to row 4.
  - :tip[Swift Judgement]{class=paladin} now instantly releases your active Seal without sharing Judgement's cooldown.
  - :tip[Iron Creed] becomes a 3-point talent (10/20/30% :tip[Holy Strike] threat, 2/4/6% damage reduction for 6 seconds).
  - One-Handed Weapon Specialization and Improved :tip[Seal of Fury] are removed.
  - New talents: Stoicism (row 5, 10/20% shorter Stun and Charm) and Shieldsworn (row 7, :tip[Holy Strike] cooldown -4 seconds, strikes with the shield, triggers block talents without using charges, and lets you block spells for 6 seconds).
- **Retribution:**
  - :tip[Conviction] (row 2) now gives 2/4/6% critical chance to all spells and attacks. :tip[Sanctified Judgement] moves to row 2.
  - :tip[Vindication] no longer raises attack power.
  - :tip[Two-Handed Weapon Specialization]{class=paladin} (row 4) now raises Holy and Physical damage by 2/4/6% and lowers threat by 7/14/20% with a two-handed weapon.
  - :tip[Champion of the Light] raises spell damage by up to 60% of Intellect and shortens :tip[Hammer of Wrath]'s cast by up to 1 second.
  - Vengeance stacks to 5 and now requires :tip[Seal of Command]{class=paladin}.
  - Instrument of Law and Twist of Light are removed. New row 5 talent Turn Evil shortens :tip[Turn Undead]'s cast and cooldown and lets it affect Demons.
  - Unsealed Wrath is the new 31-point talent: melee attacks store your active Seal for 15 seconds (up to 3 stacks); landing a different Seal consumes the stacks, triggering the stored Seal once per stack. It requires :tip[Repentance]{class=paladin}.

::class[Priest]

- :tip[Power Word: Shield] can be replaced by one of equal or higher rank.
- :tip[Shadow Word: Death] now hurts you for 30% of maximum health if it fails to kill (was 10%), and does not hurt you on a miss.
- Fixed Undead Priest's :tip[Dark Sacrifice] still breaking crowd control.
- **Holy:** Binding Heal is removed and replaced by the talent Holy Binding: when :tip[Flash Heal] heals someone else, you receive 50% of that healing, without threat.
- **Shadow:**
  - :tip[Devouring Contagion] no longer spreads :tip[Devouring Plague] from a critter.
  - :tip[Vampiric Embrace]{class=priest} healing can no longer crit.
  - :tip[Cure Disease]{class=priest} and :tip[Abolish Disease] no longer take you out of :tip[Shadowform]{class=priest}.

::class[Rogue]

- :tip[Slice and Dice] and the :tip[Ruthlessness]{class=rogue} talent no longer make a sitting target stand up.
- New passive Poised, learned at level 18, works like the Druid one. New spell Shank (level 24; 5 Energy, 10 second cooldown, melee range): an off-hand strike for 50% weapon damage that generates 15 Energy and cannot miss; Rank 2 at level 44 generates 25 Energy.
- :tip[Deadly Poison] and :tip[Instant Poison] attack power coefficients are doubled (0.009 and 0.01).
- **Assassination:**
  - :tip[Improved Expose Armor] moves to row 2, :tip[Vigor] to row 3, :tip[Relentless Strikes] to row 5 as a 5-point talent (4 to 20% per Combo Point to restore 25 Energy).
  - :tip[Lethality] becomes a 2-point talent (10/20% critical damage). Murder is removed.
  - New talent Blood Splatter: :tip[Rupture] lasts 6 seconds longer and :tip[Garrote] 9 seconds longer.
  - :tip[Venom]{class=rogue} is a passive on row 5: Shank raises your Poison damage by 30% and poison application chance by 20% for 6 seconds.
  - :tip[Seal Fate] becomes a 3-point talent (33/66/100%). :tip[Mutilate]{class=rogue} moves to row 7 and deals 90% weapon damage plus a larger flat amount.
- **Combat:**
  - Improved :tip[Eviscerate] is renamed Coup de Grace (:tip[Eviscerate] and Death Mark damage and storage +7/13/20%). Improved :tip[Sinister Strike] is renamed Efficient Strikes (:tip[Sinister Strike] and :tip[Hemorrhage]{class=rogue} cost -3/5).
  - :tip[Improved Sprint] moves to row 2; :tip[Weapon Expertise] and :tip[Aggression] to row 4. :tip[Aggression] now boosts :tip[Sinister Strike] and :tip[Eviscerate] by 5/10/15%.
  - :tip[Dual Wield Specialization]{class=rogue} becomes a 2-point row 5 talent (25/50% off-hand damage). :tip[Flawless Execution] reduces cost by 15 (was 10).
  - New talents: Composure (row 3, bigger Poised discount) and Flash of Steel (row 6, more Energy from Shank and a shorter cooldown).
- **Subtlety:**
  - Fixed :tip[Hemorrhage]{class=rogue} and :tip[Ghostly Strike]{class=rogue} dealing too much damage with Daggers.
  - Setup now gives 15/30/45% (was 33/66/100%). Opportunity becomes a 5-point talent (4 to 20% bonus damage). :tip[Camouflage] becomes a 3-point talent.
  - Several talents move rows (Setup, :tip[Dirty Deeds], :tip[Camouflage], :tip[Premeditation]{class=rogue}, Serrated Blades, :tip[Elusiveness], :tip[Ghostly Strike]{class=rogue}, :tip[Heightened Senses]). :tip[Ghostly Strike]{class=rogue} now lets your next :tip[Ambush] or :tip[Garrote] within 7 seconds skip the Stealth requirement.
  - :tip[Hemorrhage]{class=rogue} also raises :tip[Garrote] damage by 15%. Improved Distract, Quietus, Cutthroat and Thousand Cuts are removed.
  - New talents: Quick Getaway (extra Sap target and speed after sapping), Boot Knife (Shank can add 2 Combo Points) and Death Mark (row 7, 25 Energy, 20 yard range, 10 second cooldown; stores part of your damage per Combo Point and deals it after 6 seconds).

::class[Shaman]

- :tip[Windfury Weapon] and :tip[Windfury Totem] now show an extra weapon swing animation.
- :tip[Totemic Projection] is renamed Totemic Call: it teleports your totems to you, with a 30 second cooldown.
- :tip[Lightning Bolt] base damage rises on all ranks (max rank +80%, roughly 78% of the Classic Era base with a shorter cast). :tip[Chain Lightning]'s cast is 2.5 seconds, with about 145% of :tip[Lightning Bolt]'s base damage and about 225% of its mana cost. Shock base damage returns to Classic Era values.
- **Elemental:** :tip[Lightning Overload] gives 10/20/30% (was 3/7/10%). :tip[Lava Burst] is removed and replaced by :tip[Call of Thunder] (+5% crit for :tip[Lightning Bolt] and :tip[Chain Lightning]). :tip[Elemental Mastery]{class=shaman} is renamed Lightning Mastery. :tip[Elemental Reach] no longer affects :tip[Totemic Projection].
- **Enhancement:** :tip[Improved Ghost Wolf] moves to row 4. :tip[Maelstrom Weapon] proc chance doubles. :tip[Stormstrike]{class=shaman} deals 150% normalized weapon damage with a 6 second cooldown. :tip[Mental Dexterity] gives 50/100/150% of Intellect as attack power. :tip[Flurry]{class=shaman} gives 6 to 30% attack speed.
- **Restoration:** :tip[Riptide]{class=shaman} costs about 40% less mana, has a 12 second cooldown (was 6) and no longer heals up front, only over time.

::class[Warlock]

- Spellstones only increase Shadow damage now (they also boosted Fire). Pets gain 2 Health per point of your Stamina (was 7.5). :tip[Bane of Agony] updates its damage dynamically. :tip[Drain Soul]'s chance to grant a Soul Shard on damage is much lower.
- **Affliction:** :tip[Amplify Curse]{class=warlock} now affects :tip[Curse of Exhaustion]{class=warlock} and :tip[Bane of Agony]. :tip[Improved Drains] boosts :tip[Drain Mana] but no longer :tip[Wrack]{class=warlock}. :tip[Wrack]{class=warlock}'s coefficient doubles and base damage per second at level 60 goes from 36 to 86.
- **Destruction:** :tip[Shadow and Flame] gives 4/8/12/16/20% (was 2/4/6/8/10%).

::class[Warrior]

- Fixed the :tip[Victory Rush] tooltip damage. :tip[Defensive Stance] threat bonus rises from 30% to 80%. :tip[Slam]'s cooldown is 15 seconds (was 18).
- **Arms:** :tip[Improved Tactical Mastery] is a 3-point talent (5/10/15 retained Rage). :tip[Two-Handed Weapon Specialization]{class=warrior} gives 2/4/6%. Bloodthrill is a 2-point talent (10/20% chance for :tip[Overpower]). :tip[Improved Slam] reduces :tip[Slam]'s cooldown by 2.5/5 seconds.
- **Fury:**
  - :tip[Blood Craze] and Gore Drinker no longer generate threat; :tip[Blood Craze] doesn't trigger while sitting.
  - :tip[Booming Voice] also cuts :tip[Piercing Howl]{class=warrior}'s Rage cost by 5 to 25%.
  - :tip[Enrage]{class=warrior} moves to row 3. Gore Drinker moves to row 5 and connects to :tip[Blood Craze].
  - :tip[Death Wish]{class=warrior} is no longer required for :tip[Flurry]{class=warrior} (now 3 points, 10/20/30% attack speed); :tip[Bloodthirst]{class=warrior} now requires :tip[Death Wish]{class=warrior}.
  - New talents: Reckless Swings (row 4, costs 25% of base health, your next 4 melee attacks generate 5 extra Rage) and :tip[Improved Whirlwind] (row 6, shorter cooldown and more damage to the closest enemy).
- **Protection:** :tip[Defiance] threat bonus is 7/13/20% (was 5/10/15%).

## Race changes

::race[Dwarf]

- Earth Fury (2% critical damage and healing) is removed; Artisan's Precision is added, giving 1% hit chance with spells and attacks.

::race[Human]

- Ruthless now gives 1% critical chance (was 2%). Human Spirit gives 10% Spirit (was 5%).

::race[Orc]

- Savage (1% critical chance) is removed. :tip[Command] returns: Warlock and Hunter pets deal 5% more damage. :racial[Blood Fury]'s cooldown is 2 minutes (was 3).

::race[Skyborne]

- Wind-Blessed Haste is 2% (was 3%).
- High Order: Read Leyline gives 50% Mana and Health regeneration for 15 seconds (was 100%). It can't be used while Innervate is active. Using it at a Ley Line also grants Attuned for 1 hour, which raises the effect to 100%, persists through death and is removed when entering a raid.
- Windshaper: :tip[Skysight] gives 15% movement speed for 15 seconds (was 10%). Using it at an elemental convergence also grants Charged for 1 hour, which raises it to 30%, with the same death and raid rules.

::race[Tauren]

- :tip[Plainsrunning] gives 2% movement speed per stack (was 1%), up to 60% (was 30%), and no longer affects mounted speed.
- Endurance now only gives 5% more Health (no hit or critical damage modifiers).

::race[Troll]

- Berserking lasts 15 seconds (was 10).

::race[Undead]

- :tip[Cannibalize] can be used again while immune to Physical damage.
- Fixed :tip[Touch of the Grave] not triggering often enough and leaving a beam visual behind; its internal cooldown is 15 seconds (was 25).

## New developments / system changes

- **Gamepad support** is now fully functional: movement, spells, interactions and UI navigation work with a controller, and settings can be changed in Edit Mode and the Options menu.
  - AoE items on the Gamepad Action Bar can be placed at a targeted location; press the button again to confirm.
  - Focus Target can be selected with LB + RB + Face Down, and friendly corpses and critters can be targeted. Enemy players can no longer be picked by Friendly Analog Targeting.
  - Bag UI has new visuals, remaining space and ammo indicators and better Keyring navigation. Ruleset selection, skipping cinematics, ending a flight early and the Pet Move command work with a gamepad.
  - Many focus, Lua error and swing timer issues were fixed.
- Bags no longer equip themselves into free bag slots; you equip them manually.
- Respawn rates were adjusted in many areas to support large player numbers at launch. Rates are generally faster in lower-level zones (starting zones fastest) and slow down as you level. Blizzard plans to lower the low-level rates once the launch surge settles.
- Quest experience, prerequisites and level settings were adjusted, and quests got objective mouseover tooltips and missing or wrong map markers fixes. Some quest log zone sorts and item-destroy abandon issues were fixed.
- Some satyrs were classified as humanoids instead of demons and now count as demons.
- Zone fixes: Alterac Mountains (Dalaran Summoners summoning without limit), Barrens (Rethgar Deathgate can start ":tip[Counterattack]!", Alliance Outrunners spawn randomly), Darkshore ("Holy Diver" gives XP), Mulgore (Gloomrise Hatchlings give less XP), Orgrimmar ("Hidden Enemies" insignia), Ruins of Lordaeron (dungeon quests require level 15), Teldrassil (fewer spiders for "Twisted Hatred"), Wetlands ("Carnage" and "Destruction in Deadmines" fixes).

## Build 70753 (wclbox)

These come from the wclbox comparison, not from the official post.

- Protection Paladin's :tip[Holy Shield] now lists level 60, a 240 mana cost and a 10 second cooldown.
- Orc :tip[Command] is now an instant cast.
- New or changed items in the build include a handful of recipes and plans such as Recipe: Transmute Earth to Water and Plans: Prefect's Waistguard, plus Toughened Leather Armor and Pouch of Violet Dust.

## Known issues

- No known-issues list came with these notes.
