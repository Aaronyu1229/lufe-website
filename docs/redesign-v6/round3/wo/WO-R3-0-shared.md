# WO-R3-0 — Shared motion, counters, FAQ, outline icons, step lines

Read first: `docs/redesign-v6/wo/COMMON.md` (all rules apply), then `docs/redesign-v6/round3/DECISIONS-R3.md` (authority for round 3; §0 G-1, G-4, G-5, G-6, G-7, G-8 FAQ part).
Runs **first and alone**. WO-R3-A and WO-R3-B branch from `origin/redesign/v6` after this PR is merged.

- Branch: `v6/r3-0-shared` from latest `origin/redesign/v6`. PR → `redesign/v6`. Port `3510`.
- Notes covered: #5, #14 (component part), #21, #22, #26, #27, #28.
- Allowed paths:
  - `src/components/HeroBackdropVideo.tsx`, `src/components/HeroBackdrop.tsx`, `src/data/heroVideos.ts`
  - `src/components/DelightLayer.tsx`
  - `src/app/globals.css` (only inside existing layers / `@layer components`; only the selectors named below)
  - `src/components/ui/Carousel.tsx`, `src/components/ui/geometry.ts`, `src/components/ui/Disclosure.tsx`, `src/components/ui/index.ts`
  - `src/components/motion/SnapRail.tsx` (new)
  - `src/components/faq/AccordionItem.tsx`, `src/components/faq/FaqItem.tsx`, `src/components/faq/FaqSection.tsx`, `src/components/faq/FaqList.tsx` (new)
  - `src/components/insights/ArticleFaq.tsx`
  - `src/components/icons/LineIcons.tsx`
  - `src/components/Navbar.tsx` (icon box class only)
  - `src/components/home/PositioningBand.tsx` (icon box class only)
  - `src/components/services/ServicesPage.tsx`, `src/components/services/ChapterPage.tsx`, `src/components/services/MethodologyPage.tsx`, `src/components/services/OptimizePage.tsx`, `src/components/services/methodology/MethodologyExamples.tsx`
  - tests: `tests/components/shared/**`, `tests/components/ui/**`, `tests/components/faq/**`, `tests/components/services/**`, `tests/components/design-layer.test.ts`, `tests/components/navbar.test.ts`, `tests/components/article-detail.test.ts` (FAQ assertions only), `tests/lib/motion.test.ts`
- Do **not** touch any file owned by WO-R3-A / WO-R3-B (cases, assess, about, home sections other than PositioningBand, contact, field-notes, insights pages other than `ArticleFaq.tsx`, resources, subsidy). Their outline-icon and hero changes are done there.
- No new visible Chinese copy in this WO. Run the font guard anyway and paste its output.

## 1. Hero video playback rate (G-1, #5)
1. `src/data/heroVideos.ts`: add `readonly playbackRate: number;` (required) to `HeroVideo` and set exactly these values:
   `about 0.8` · `author 1.25` · `cases 1.25` · `"case:costco-health" 0.6` · `"case:electronics-tariff" 1.25` · `"case:shoe-brand" 1.25` · `"case:bubble-tea" 1.25` · `fieldNotes 0.7` · `insights 1.25` · `resources 1.0` · `contact 1.25` · `subsidies 1.25` · `services 1.0` · `"chapter:m1" 0.75` · `"chapter:m3" 1.25` · `"chapter:m9" 1.25` · `"chapter:after" 1.25` · `"chapter:na" 0.6` · `optimize 1.0` · `methodology 0.8`.
   Add a one-line comment above the object: `// playbackRate = clamp(round to .05, sqrt(75 / median luma-diff per second), 0.6, 1.25); videos shared with the home hero use the home rate. See DECISIONS-R3 G-1.`
2. `HeroBackdrop` passes `video.playbackRate` to `HeroBackdropVideo` as a new required prop `playbackRate`.
3. `HeroBackdropVideo`: set `video.defaultPlaybackRate = playbackRate` and `video.playbackRate = playbackRate` in an `onLoadedMetadata` handler **and** immediately before every `play()` call (browsers reset the rate when the source loads). Do not change mounting/visibility logic.
4. Do not change `src/components/home/HeroSection.tsx`.
5. Test (`tests/components/shared/hero-videos.test.ts`): every entry has `playbackRate` in `[0.6, 1.25]`; `services` and `optimize` are `1.0`; snapshot the table above as an object literal.

## 2. Count-ups (G-4, #1 and #14)
`DelightLayer.tsx`:
1. Select only `[data-lufe-counter]` (drop `.num` from the selector). Keep the scorecard / `OUTPUT` / zero-padded exclusions.
2. Pattern: `/^(.*?)(-?\d[\d,]*(?:\.\d+)?)(\D*)$/`. `decimals` = digits after `.` in the matched value; `useGrouping` = matched value contains `,`. Render `prefix + formatted + suffix`, where `formatted = (target * eased).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping })`. Final frame always restores the original string exactly.
3. Timing: duration `2500` ms, easing `1 - (1 - t) ** 3`. Start when the element is ≥ 50% visible: `{ threshold: 0.5 }`. One run per element. Initial text `prefix + 0 (with decimals) + suffix`; min-width locked from the final value as now.
4. Reduced motion: final value immediately, `data-lufe-counted` set.
5. Remove the `--lufe-step-progress` custom property write (no longer used, §5). Keep `data-lufe-step-reached`.
6. Tests (`tests/components/design-layer.test.ts` or new `tests/components/shared/counter-format.test.ts`): extract the parse/format into an exported pure helper `formatCounter(raw: string, progress: number): string` inside `DelightLayer.tsx` and test `"4.7★"→ "0.0★" at 0 / "4.7★" at 1`, `"1.2x"`, `"-15%"`, `"$200萬"`, `"+40%"`, `"120+"`, `"2,000"` (grouping), `"6 個月"`.

## 3. Carousel premium motion (G-5, #14)
`src/components/ui/Carousel.tsx` keeps its API and adds `tone?: "light" | "dark"` (default `"light"`). Existing drag/projection/rubberband/wheel/keyboard stay. Add:
1. **Release spring**: `|velocity| > 500` → `{ damping: 0.85, response: 0.45, velocity }`; otherwise `{ damping: 1, response: 0.45, velocity }`. Arrow/keyboard steps `{ damping: 1, response: 0.45 }`.
2. **Focus emphasis** (every frame `trackX` changes): for each slide wrapper compute `visible = clamp((min(right, vpRight) - max(left, vpLeft)) / width, 0, 1)` in viewport coordinates from cached `offsetLeft/width` + `trackX`; set inline `opacity: 0.45 + 0.55 * visible` and `transform: scale(0.97 + 0.03 * visible)` with `transform-origin: center`. Write via refs/style (no React state per frame).
3. **Parallax**: inside each slide, elements with `[data-carousel-parallax]` get `transform: translate3d(${-0.06 * (slideCenter - viewportCenter)}px,0,0) scale(1.12)`; their parent must already be `overflow-hidden` (consumers ensure this).
4. **Progress rail + counter** below the track, replacing the current controls row layout: `flex items-center gap-4`: rail `relative h-[2px] flex-1` (`bg-bd` light / `bg-white/15` dark) with a thumb `absolute inset-y-0 left-0 bg-gold` whose width = `viewport / content` ratio (min 12%) and `translateX` = progress × (rail − thumb); counter `<span aria-hidden="true">` `01 / 05` (13px, `tabular-nums`, `text-tx3` light / `text-white/55` dark; current = nearest snap index + 1); then the two arrow buttons.
5. **Arrows**: `active:scale-[.94]`, `[@media(hover:hover)]:hover:border-gold`; dark tone: `border-white/25 bg-transparent text-white`.
6. **Reduced motion** (`matchMedia` checked on mount + change): no emphasis (opacity 1, scale 1), no parallax, arrow/keyboard `jump` instead of spring, drag release `jump` to the projected snap.
7. Pass `tone="dark"` where the carousel sits on navy: only the About story carousel — that file is owned by WO-R3-A; this WO only adds the prop (A sets it).
8. Tests (`tests/components/ui/primitives.test.ts`): server markup contains the rail, the `01 / N` counter text, both arrow labels, and no `rounded-`.

## 4. `SnapRail` for native mobile scrollers (G-5)
New client component `src/components/motion/SnapRail.tsx`:
```ts
export function SnapRail(props: { readonly className: string; readonly children: React.ReactNode; readonly tone?: "light" | "dark" }): JSX.Element
```
Renders `<div ref className={className}>{children}</div>` (the caller passes its existing scroller classes unchanged) followed by a rail identical to §3.4 but **only below 768px** (`md:hidden`), counter omitted. On `scroll` (rAF-throttled, passive) and resize: update thumb from `scrollLeft / (scrollWidth - clientWidth)`, and apply the §3.2 opacity/scale emphasis to direct children — only when `window.matchMedia("(max-width: 767px)").matches` and not reduced motion; otherwise clear inline styles. Native scroll-snap supplies momentum; do not add JS dragging.
Apply it to: `ServicesPage.tsx` four-chapter tiles container and `MethodologyExamples.tsx` examples container (wrap, keep their classes, keep `md:grid` desktop behaviour).

## 5. Step connector lines removed + outline icons (G-6, #27, #28)
1. `globals.css`: delete the `.lufe-step-icon::after` rules (both the base and `:not(:last-child)` gradient rule and their media wrapper). Change the reached state to outline: `.lufe-step[data-lufe-step-reached="true"] .lufe-step-icon { border-color: var(--color-gold-d); color: var(--color-gold-d); }` (no background). Keep the one-time icon pop animation and its reduced-motion override.
2. `ChapterPage.tsx` step icon: `lufe-step-icon border border-gold/40 text-gold-d` (remove `bg-gold/10`). Audit the rest of `ChapterPage.tsx` for icon containers with a background and convert them (e.g. `fit` check icons stay stroke-only).
3. `ServicesPage.tsx`: delete the tile top line block (`<div className="relative h-[2px] bg-bd">…</div>` incl. the gold square and the hover line); move the figure's `mt-5` to `mt-0`. Capability icon boxes (navy band): `border border-gold/40 text-gold` (remove `bg-gold/10`).
4. `Navbar.tsx` line ~370 menu icon box: `border border-gold/40 text-gold-d` (remove `bg-gold/10`). `PositioningBand.tsx` card icon box: remove `bg-gold/10` and its hover `bg-gold/15`; use `border border-gold/40 text-gold-d`, hover `[@media(hover:hover)]:group-hover:border-gold-d`.
5. `Disclosure.tsx` chevron box: `border border-bd text-tx2` (remove `bg-black/[.06]`).
6. `LineIcons.tsx`: confirm no `fill="currentColor"`/filled shapes; leave as is if none (state so in the PR).
7. Keep `ChapterBar` lines (explicit exception, DECISIONS G-6).
8. Services-family heroes (G-3): in `ServicesPage`, `ChapterPage`, `MethodologyPage`, `OptimizePage` normalise only the breadcrumb `nav` classes to `mb-7 flex flex-wrap gap-2 text-[13px] text-white/60` (separators `text-white/30`, current `text-white/75`, drop `mx-2` spans' margin in favour of `gap-2`) and add `mb-6` to the `h1` where the next element relies on `mt-5` (remove that `mt-5` instead so spacing stays 24px). No copy changes. Confirm none of these heroes contains a number/stat (G-2) and say so.

## 6. One FAQ style, calm motion (G-7, #21, #22, #26)
1. `AccordionItem.tsx`:
   - Delete the gold left accent `<span>` and `accentProgress`.
   - Button: remove `[@media(hover:hover)]:hover:bg-cream/60`, `active:scale-[.995]`, `transition-[background-color,transform]`. Keep `focus-visible:ring-2 focus-visible:ring-gold`. Hover (hover devices only): plus box `border-gold-d`.
   - Height spring `{ response: 0.32, damping: 1 }` both directions.
   - Content wrapper opacity = `clamp(height.value / max(contentHeight,1) * 1.4 - 0.2, 0, 1)` while moving; `1` when open and settled; `0` when closed.
   - Plus rotation spring `{ response: 0.25, damping: 1 }`.
   - Number colour: remove `transition-colors duration-200` (instant switch).
   - Reduced motion: jump everything (as now).
2. `FaqSection.tsx`: no item open by default (remove `defaultOpen={index === 0}`). Layout unchanged. Render the list via the new `FaqList`.
3. New `FaqList.tsx`: `export function FaqList({ items, idPrefix }: { readonly items: readonly FaqEntry[]; readonly idPrefix: string })` → `<div className="min-w-0">{items.map(item => <FaqItem …/>)}</div>`.
4. `ArticleFaq.tsx`: keep the `<section aria-labelledby="article-faq-heading">` and the `常見問題` `h2`; replace the `<dl>` with `<FaqList idPrefix="article-faq" items={faq.map((item, i) => ({ num: String(i + 1).padStart(2, "0"), question: item.q, answer: item.a }))} />`. Answers stay in server HTML (AccordionItem already renders closed panels). JSON-LD untouched.
5. `RubricItem` (methodology) keeps its own `defaultOpen` (v2.1) — verify it still works.
6. Tests: update `tests/components/faq/faq-section.test.ts` (`aria-expanded="true"` now appears **0** times; no `scaleY(` accent; takeaway still rendered); add an `ArticleFaq` test: markup contains `>01<`, `>02<`, every question and answer.

## 7. Verification
COMMON.md steps 1–8, plus:
- Screenshot paths: `/`, `/services`, `/services/call-center`, `/services/methodology`, `/cases/bubble-tea`, `/about`, `/insights/agent-vs-distributor-exclusive`.
- Playwright extra checks (append to the shot script, at 1440 and 390, paste output):
  ```js
  // count-up mid-animation: home stats (still the old 42+/500+/30+ in this WO — fine)
  await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle" });
  const el = page.locator("[data-lufe-counter]").first();
  await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(1000);
  const mid = await el.textContent(); await page.waitForTimeout(2200);
  const end = await el.textContent();
  console.log(width, "counter", JSON.stringify({ mid, end }), parseFloat(mid.replace(/[^\d.-]/g, "")) > 0 && mid !== end ? "MID-OK" : "MID-FAIL");
  // playbackRate
  await page.goto(`http://localhost:${port}/about`, { waitUntil: "load" }); await page.waitForTimeout(2500);
  console.log(width, "about rate", await page.evaluate(() => document.querySelector("video.lufe-hero-video")?.playbackRate ?? "no-video"));
  // FAQ: none open, opening one works
  await page.goto(`http://localhost:${port}/services`, { waitUntil: "networkidle" });
  console.log(width, "faq open on load", await page.locator('[aria-expanded="true"]').count());
  // step lines gone
  await page.goto(`http://localhost:${port}/services/call-center`, { waitUntil: "networkidle" });
  console.log(width, "step ::after", await page.evaluate(() => getComputedStyle(document.querySelector(".lufe-step-icon"), "::after").content));
  ```
  Expected: `MID-OK`, `about rate 0.8` (or `no-video` only at 390 if save-data/reduced motion — say why), `faq open on load 0`, step `::after` content `none`.
- Carousel: record a 390px Playwright drag on `/cases/bubble-tea` timeline (`page.mouse` down/move/up with a fast flick) and paste before/after `transform` of the track plus the counter text; confirm rail thumb moved.
- `rg -n "lufe-step-icon::after|--lufe-step-progress|bg-gold/10" src/app/globals.css src/components/services src/components/Navbar.tsx src/components/home/PositioningBand.tsx` → no hits (paste).
