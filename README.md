# WoW Forever Notes

Daily summaries of official **World of Warcraft: Forever** beta patch and development notes, in Turkish and English.
Spell, talent and racial names in posts show a tooltip on hover (tap on mobile).

**Site:** https://foreverwow.app/

## How it works

1. `npm run check-updates` compares the latest builds and Blizzard blue posts with `src/data/state.json`.
   Nothing new → `NO_UPDATES`, nothing is written.
2. A scheduled job ([docs/scheduled-job.md](docs/scheduled-job.md)) writes the TR + EN posts, using
   `:spell[Aimed Shot]`-style references that are validated against the glossary at build time.
3. A PR is opened and squash-merged once CI passes; `main` deploys to GitHub Pages.

## Development

```bash
npm ci
npm run dev     # http://localhost:4321/
npm test
npm run build
```

Default language: `DEFAULT_LANG` in [src/config.ts](src/config.ts).

## Data sources

- Game data (spells, talents, races) and build change lists:
  [新手盒子·魔兽世界无限数据库 (wclbox)](https://wowforever.wclbox.com/en), refreshed with `npm run sync`.
- Spell and talent descriptions: official English client text from
  [WoW Forever Tools](https://wowforevertools.com/) (also pulled by `npm run sync`; entries it does not
  have keep the wclbox text).
- Official notes: [Blizzard forums](https://us.forums.blizzard.com/en/wow/).

Unofficial fan site. World of Warcraft and related names, icons and data are property of Blizzard Entertainment.
