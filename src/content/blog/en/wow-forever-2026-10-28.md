---
title: "WoW Forever notes: Mage talent shuffle, Hunter tuning and a name-check fix (build 70685)"
date: 2026-10-28
tags: [wow-forever, patch-notes]
accent: warning
excerpt: "Blizzard fixes a name check that blocked harmless names; the builds also move and retune a batch of Mage talents, lower two Hunter attack power values and bring the Orc Blood Fury cooldown change into the client."
draft: false
build: "1.60.1.70685"
sources:
  - https://us.forums.blizzard.com/en/wow/t/overly-restrictive-name-check-and-fix-incoming-october-27/2394467/1
  - https://wowforever.wclbox.com/en/buding
---

Since the last post (build 70634) there were two builds, 70658 and 70685, both on October 28. The only official post is about the name check. The class and race changes below come from the wclbox build comparison, not from an official note.

## Name check fix

Blizzard has been working on the restricted name list, which the game uses to check for non-profane names it wants to restrict, such as major Warcraft lore characters or names blocked for technical reasons. A bug in that process made the check too strict: it wrongly blocked names containing "c-o-n".

The fix comes with the next realm restart in each region. If you got "That name is restricted" for a name you think should have been allowed, you can try again afterwards.

## Character & Class changes

The class changes below come from the wclbox build comparison (machine-translated from the Chinese client), not from an official post.

::class[Hunter]

- :spell[Aspect of the Hawk] drops from 90 to 47 points in the comparison.
- :spell[Trueshot Aura] drops from 75 to 40 points in the comparison.
- wclbox does not name the rank for either value.

::class[Mage]

- **Arcane:**
  - Arcane Focus (5 ranks) is removed.
  - :talent[Improved Channeling] moves from column 3 to column 2 (its Classic Era name is Enhanced Arcane Missiles).
  - :talent[Arcane Resilience] now has 2 ranks (was 1) and moves from tier 3 to tier 1.
  - :talent[Missile Barrage] moves within the tree and its proc chances are adjusted.
- **Fire:**
  - :talent[Improved Fire Blast] now has 2 ranks (was 3) and moves from tier 2 to tier 3. At max rank it reduces the Fire Blast cooldown by 2 seconds and adds 15 yards of range.
  - :talent[Critical Mass] now has 3 ranks (was 5): 2%, 4% and 6% fire spell critical strike chance.
  - :talent[Incinerate]{class=mage} now has 5 ranks (was 2) and moves from tier 3 to tier 1. It raises the critical strike chance of Fire Blast, Ice Lance, Arcane Blast and Scorch by up to 30% at max rank (Classic Era name: Burn Out).
- **Frost:**
  - :spell[Ice Lance] now lists an 8 second cooldown.
  - Frost Blast, the spell added in the October 16 notes, no longer appears in wclbox's spell list. wclbox does not say why.

## Race changes

::race[Orc]

- :racial[Blood Fury] now has a 2-minute cooldown (was 3 minutes) in the client. Blizzard announced this in the October 27 supplement.

## Known issues

- No official known-issues list came with these posts.
