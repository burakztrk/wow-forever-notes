# AGENTS.md

WoW Forever Notes — static Astro 7 blog (GitHub Pages) with daily WoW Forever beta patch-note summaries in
Turkish and English, plus hover tooltips for spells, talents and racials.

## Commands

```bash
npm ci
npm run dev            # http://localhost:4321/wow-forever-notes/ (drafts visible)
npm run build          # production build (drafts skipped); fails on bad glossary references or missing translations
npm test               # vitest: parsers, update detection, glossary/remark plugin, TR/EN pairing
npm run sync           # refresh src/data/*.json + public/icons/ from wclbox (~10 min first run, cached in .cache/http)
npm run check-updates  # NO_UPDATES | UPDATES_FOUND (details in .cache/updates.json) | ERROR
npm run check-updates -- --mark-seen   # advance src/data/state.json after publishing
npm run check-updates -- --from 2026-10-01   # backfill: one group per build since that date; skips builds that already have a post
npm run check-updates -- --since 1.60.1.70374   # test mode: treat that build as last published; state.json untouched
npm run translate      # apply src/data/i18n/tr.json to the glossary; lists missing Turkish texts
npm run translate -- --apply <file.json>   # merge new translations (validated: numbers must survive)
```

Node 22.12+.

## Layout

- `src/config.ts` — `DEFAULT_LANG` (root redirect target) and `LANGS`.
- `src/content/blog/{tr,en}/<slug>.md` — one file per language, same slug. Schema: `src/content.config.ts`.
- `src/data/glossary.json` — spells, talents, racials (generated; do not hand-edit except `descTr`).
  `races.json`, `classes.json` — race→class matrix, talent trees (for the future class/race pages).
  `state.json` — what check-updates has already seen.
- `src/lib/remark-glossary.ts` — `:spell[…]`, `:talent[…]`, `:racial[…]`, `:tip[…]` directives → tooltip spans;
  auto-links unambiguous multi-word names; unknown names fail the build.
- `src/scripts/tooltip.ts` + `src/lib/tooltip-render.ts` — client tooltip (event delegation, floating-ui).
- `src/pages/[lang]/{races,classes,search}/` — race, class and search pages, same rules as the mobile app (`src/lib/codex.ts`,
  `src/lib/search.ts`; vectors in `tests/codex.test.ts`, `tests/search.test.ts`). Saved talent builds live in localStorage
  (`src/lib/saved-builds.ts`, same shape as the app's `BuildStore`). Change both sides together.
- `scripts/sync/` — wclbox parsers (`parse.ts`), wowforevertools chunk reader (`wowforevertools.ts`, acorn, literals only — never eval) and the sync entry point. `scripts/check-updates.ts`.
- `docs/scheduled-job.md` — instructions for the daily scheduled writer job.

## Rules

- Every hardcoded root-relative URL goes through `withBase()` (`src/utils/url.ts`); the site lives under `/wow-forever-notes/`.
- Posts: TR and EN together, game names stay English in both, no copied source text, nothing that is not in the sources.
- Credit wclbox ("新手盒子·魔兽世界无限数据库" + page URL) — already in the footer and every tooltip. wowforevertools (description text) is credited in the footer and README.
- Sync etiquette: ≤2 requests/second, identifying User-Agent, cache on disk. bluetracker.gg and mobalytics.gg block bots.
- Public repo: no secrets, `.env*` is gitignored; scan before pushing.
- Code comments and UI strings in English; Turkish lives in `src/i18n` and `src/content/blog/tr`.
