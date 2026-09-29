# LUFÉ square redesign — wave 2 common rules (apply to every step)

Repo: Next.js 16 App Router, React 19, TypeScript, Tailwind v4, vitest (env "node", include `tests/**/*.test.ts`).
Design source of truth (read-only, never edit): `/Users/aaron/dev/lufe-website-apple/docs/proposals/lufe-square-site/`
- Final page files are named in your step section; `compare-*.html` records the owner's A/B choices; `assets/lufe.css` + `assets/lufe.js` define look & motion.
- Decisions (authoritative): `docs/redesign/DECISIONS.md` in your worktree. Hard rules: `docs/redesign/PLAN.md`.
- Where a compare page offers A/B, implement the option DECISIONS.md says (almost always B).

Already built and merged — USE these, do not re-implement or modify them:
- `@/components/ui`: `Carousel` (props: children, label, showControls?, className?, itemClassName? — itemClassName replaces the default card width class), `Segmented` (controlled; options/value/onChange/label), `Disclosure` (summary, children, defaultOpen?, id?; children always in SSR HTML), `ExpandCard` (card, panel, title, image?, className?; panel content in SSR HTML, portals to body after hydration), `ChoiceGroup`, `flip(container, mutate)` (wraps mutate in flushSync; children need `data-key`).
- `@/lib/motion` springs (`useSpring(initial, { precision })` — pass precision 0.001–0.002 for unitless 0..1/index values; default 0.5 is for pixels).
- Global shell (Navbar, Footer, MessageBox bottom sheet via `useMessageBox().open()`), glass classes `lufe-glass-panel|light|dark` in globals.css.

## Hard rules
1. **Content is verbatim from the current source code** (the page's existing components and `src/data/**`): headings, paragraphs, numbers, button labels, link targets, alt text. The proposal HTML only dictates layout/presentation/interaction. If the proposal has text the source lacks → do not add it. If the source has content the proposal lacks → keep it (place it sensibly in the new layout). Never paraphrase. Keep all existing `metadata`/`generateMetadata`, canonical, JSON-LD, `generateStaticParams` exactly as they are.
2. **SEO**: everything collapsed, tabbed, filtered, carousel-ed or shown in a floating panel must have its text in the server-rendered HTML (visually hidden is fine; rendering only after a click is NOT). Filters must hide non-matching items, not unmount them, unless every item is still reachable via SSR markup.
3. Square corners everywhere (no `rounded-*` except tiny dots / progress dots).
4. Motion only via the ui primitives or `@/lib/motion` springs; interruptible; respect `prefers-reduced-motion`. No scroll-triggered fades, no counting numbers, no auto popups, no decorative loops. (Home Hero keeps its existing auto-advance — see step.)
5. 390px-wide phones: no horizontal page scroll (use `min-w-0` on grid children, `overflow-hidden` where carousels bleed).
6. **You may only change/create files listed in your step's "Allowed paths"**, plus new test files under `tests/components/<your-area>/`. **Forbidden**: `src/app/globals.css`, `src/app/layout.tsx`, `src/app/template.tsx`, `src/components/{Navbar,Footer,MessageBox}.tsx`, `src/components/ui/**`, `src/lib/**`, `src/data/**` (read-only), `package.json`, lockfiles, `src/app/fonts/**`. If you believe a forbidden file must change, do not change it — explain in the PR body.
7. Styles live in the page's own components as Tailwind classes (arbitrary values allowed). Do not add global CSS.
8. **Fonts**: never commit `src/app/fonts/**`. If the font-subset guard fails the build ("uncovered non-ASCII characters"), that means you introduced characters not in the current source — re-check rule 1. If the characters are truly verbatim from source, list them in the PR body and continue.
9. **Build queue — use EXACTLY this, nothing else** (do NOT use lockf/flock/files; a lock *file* at that path deadlocks everyone):
   ```
   until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done
   npm run build > /tmp/lufe-build-$(basename $PWD).log 2>&1; rc=$?
   rmdir /tmp/lufe-build.lock
   tail -20 /tmp/lufe-build-$(basename $PWD).log; echo "build rc=$rc"
   ```
   Always rmdir, even on failure. Never run more than one build at a time yourself.
10. vitest ALWAYS as `npx vitest run --maxWorkers=2`. Do not start `next dev`/`next start`, browsers, Playwright or agent-browser — the reviewer does visual checks. Leave no background processes.
11. Log hygiene: never print whole files, HTML or base64 to stdout; keep command output short (`| tail -20`).

## Tests required
Add `tests/components/<area>/<page>.test.ts` (use `createElement` + `renderToStaticMarkup`, see `tests/components/article-detail.test.ts`):
- Render each page component you changed to static markup and assert that **every** collapsible / panel / carousel / tab text exists in the markup — derive expected strings from the same data source the component uses (e.g. iterate `src/data/*` arrays), not hand-copied samples.
- Assert no `rounded-` class appears in the markup (allow `rounded-full` only for dots if you use them, and say so).
Server components that are async or use Next-only APIs may be tested via their client child components instead.

## Verification before delivery (paste the real summary lines into the PR body)
1. `npx tsc --noEmit`  2. `npm run lint` (0 errors)  3. `npx vitest run --maxWorkers=2`  4. locked build (rule 9) rc=0
5. `git diff --name-only origin/redesign/square...HEAD` — only allowed paths + your tests.

## Delivery
Conventional commits (`feat(<area>): …`). Push your branch. `gh pr create --base redesign/square --head <your branch>` with: what each proposal decision became, a table "source text kept that proposal lacked / proposal text NOT added", SSR guarantee notes, verification output. Do not merge. Do not touch main.

## Typography (added after review of the first PR — applies to every page)
Production components use `font-light` headings and `font-heading` (Playfair serif) numerals. The approved design replaces that with the proposal scale in `assets/lufe.css` L33–41:
- `.display` clamp(36px,6vw,72px)/1.1 weight 650; `.h1` clamp(34px,5vw,60px)/1.12 650; `.h2` clamp(30px,4.4vw,52px)/1.14 650; `.h3` clamp(21px,2.2vw,26px)/1.3 600; `.h4` 18px/1.4 600; `.lead` clamp(17px,1.5vw,20px)/1.7 color tx2. Headings use `font-sans` (Noto Sans TC is a 100–900 variable font, so `font-[650]` renders correctly). `text-wrap: balance` on display/h1/h2.
- Numbers/stats (`.num`): Inter (`font-sans` resolves Latin digits to Inter), `tabular-nums`, `tracking-[-0.035em]`, weight 600. No Playfair/serif, no `font-light` on headings or numbers.
Match the proposal page's actual classes (check which of display/h1/h2/h3 each heading uses in the page HTML).
- **globals.css already defines the proposal tokens** `.display .h1 .h2 .h3 .h4 .lead .num .eyebrow` — prefer these classes. ⛔ Remove the legacy classes `section-heading` and `hero-title` from every element you touch: they are unlayered CSS with `font-weight: 300` and silently override any Tailwind `font-[650]` utility (verified on /about: headings with `section-heading font-[650]…` compute to weight 300). After building, check computed `font-weight` of every h1/h2 is ≥ 600.
- **Text on dark (navy) backgrounds**: body/lead/subtitle text must be `text-white/65`–`/75` (proposal on-dark lead); never `text-tx2`/`text-tx3`/grey tokens or legacy classes like `section-desc` on navy — reviewers found several hero subtitles and section descriptions nearly illegible. Must meet WCAG AA (4.5:1 for body text).
