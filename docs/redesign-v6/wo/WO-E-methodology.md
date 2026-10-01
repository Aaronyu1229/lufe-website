# WO-E — /services/methodology rewrite (Aaron's spec v2.1)

Read `docs/redesign-v6/wo/COMMON.md` first, then the spec `docs/redesign-v6/methodology/SPEC-v2.1.md` (Traditional Chinese, written by Aaron).
The spec is the authority for this page. Text inside backticks and code blocks goes on the site **verbatim, character for character**.

- Branch: `v6/e-methodology` from `origin/redesign/v6`. PR → `redesign/v6`. Screenshot port `3106`.
- Another Codex run (WO-Z integration) works in parallel in a different worktree; use only the mkdir build lock.

## Overrides of v6 global rules for THIS PAGE ONLY
- COMMON.md voice rule (no 我/你) and full-stop rule do **not** apply: keep every 「我們」「你」 and every 「。」 exactly as in the spec.
- Hero: keep the page's existing hero video from WO-0 (`HERO_VIDEOS` / `HeroBackdrop` video prop); replace only its text with spec §1.

## Allowed paths
- `src/components/services/MethodologyPage.tsx` (rewrite freely; you may split into new files under `src/components/services/methodology/`)
- `src/app/services/methodology/page.tsx` (metadata per spec §0: title, description; keep canonical/JSON-LD structure, update their text)
- `src/data/fieldNotes.ts`: only to remove the two placeholder entries containing 「二代」 (lines ~111–114, a 「待補」 media item). First confirm with `rg` that removing it breaks nothing.
- Tests: `tests/components/services/methodology-page.test.ts` (update), new tests under `tests/components/services/`.

Forbidden in this WO: `src/components/Navbar.tsx` (spec §0 nav subtitle is deliberately NOT applied: v6 removed all menu subtitles per Aaron's notes — mention in PR body), `src/data/articles.ts` (owned by the blog autopilot — it contains one 「二代」 in the FDA article; list it in the PR body, do not edit), `src/app/fonts/**` (do not commit).

## Design
- Reuse existing service sub-page components/typography/spacing (look at `ChapterPage.tsx`, `OptimizePage.tsx`, current `MethodologyPage.tsx`). Square corners, brand colors only, `@layer` for any CSS, all text in SSR HTML.
- §3 two example cards: desktop side by side (equal height); each card has three sub-heads 我們做了什麼／問到了什麼／那又怎樣 (use `LineIcons` for a small icon per sub-head). Mobile (<768px): horizontal scroll-snap carousel, one card per view, two dot indicators below that reflect the active card (IntersectionObserver or scroll position), dots are buttons with aria-labels; no autoplay. Line under cards + mid-page CTA (button opens the same contact path the current page CTA uses).
- §4 two columns desktop, stacked mobile. Render the 0–7 report outline as a compact numbered list.
- §5 five rubric cards as an accordion: first open by default, others closed; content must be in SSR HTML (use `<details>/<summary>` or SSR-rendered panels with `hidden` toggled — not JS-only rendering); keyboard accessible; no weight/% column. 「分數怎麼讀」 decision matrix always expanded (table-like 4 rows). 「打兩次分」 as its own block.
- §6 「我們的規矩」 standalone color block (navy background, large type).
- §7–§9 text sections; §8 footnote superscripts ¹²³ in body and the small-print footnote line at the end of §8 exactly as spec.
- §10 link to `/services` (four-chapter overview) — keep the word 「通路」 as is.
- §11 CTA: 「預約 30 分鐘 →」 opens the existing message/booking flow used elsewhere for 免費初步評估 (find it in Navbar FeatureTile `onMessageOpen` usage and reuse the same mechanism available to pages).
- Motion: only transform/opacity, respect prefers-reduced-motion.

## Verification (paste real output in PR body)
COMMON.md verification steps (tsc, lint 0 errors, vitest, font guard procedure — local `npm run font:rebuild`, never commit fonts, list new characters — locked build, screenshots 1440 + 390 of `/services/methodology` incl. carousel second card and an opened accordion item, `scrollWidth == innerWidth`, console errors).
Plus spec §12 checks:
- `rg -n "接班人|二代|花現喜福|Cheerful Candy" src` → only the articles.ts hit remains (list it).
- In the built `/services/methodology` HTML: no `NT$350`, `₱676`, `512`, `抹茶`; no `%` inside the five rubric cards (the 20 倍 / 50% / 70% / 5% red lines are spec text — check the spec: red lines contain 「%」 in Competition/Profitability; the rule means no weight column, so assert there is no weight column, and report it).
- Diff check: extract every backtick/code-block string from the spec and assert each appears verbatim in the built HTML (write a small throwaway script under /tmp; paste the pass count and any misses).
