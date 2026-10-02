# WO-R3-B — Home, contact, field notes, insights list, article images, resources, subsidies

Read first: `docs/redesign-v6/wo/COMMON.md`, then `docs/redesign-v6/round3/DECISIONS-R3.md` (§0 G-2, G-3, G-4, G-6, G-8; §A #1–#4, #15–#20, #23–#25; §B-1, §B-5; §C-5).
Depends on **WO-R3-0 merged** (counter behaviour, `FaqSection` calm version, `ArticleFaq` already numbered). Runs in parallel with WO-R3-A (disjoint paths).

- Branch: `v6/r3-b-home-content-resources` from latest `origin/redesign/v6` (must contain R3-0). PR → `redesign/v6`. Port `3530`.
- Notes covered: #1, #2, #3, #4, #15, #16, #17, #18, #19, #20, #23, #24, #25.
- Allowed paths:
  - `src/components/home/JumpingSection.tsx`, `src/components/home/CasesSection.tsx`, `src/components/home/WhySection.tsx`
  - `src/components/contact/**`, `src/components/field-notes/**`, `src/components/Footer.tsx` (one href only)
  - `src/components/insights/InsightsPage.tsx`, `src/components/insights/ArticleDetail.tsx`, `src/components/insights/StaticArticleContent.tsx`
  - delete: `src/data/articleInlineImages.ts`, `public/images/insights/inline/**`
  - `src/app/resources/**` (incl. `subsidies/page.tsx`), `src/components/subsidy/**` (incl. new files), `src/data/subsidies.ts` (matcher removal + one href only — no program content changes)
  - tests: `tests/components/home/**`, `tests/components/contact/**`, `tests/components/field-notes/**`, `tests/components/insights/**`, `tests/components/article-detail.test.ts`, `tests/components/resources/**`, `tests/components/subsidy/**`, `tests/components/footer.test.ts`, `tests/article-rewrites.test.ts` / `tests/image-tiers.test.ts` (only if they reference inline images)
- Never edit `src/data/articles.ts`.

## 1. Home (#1–#4)
`JumpingSection.tsx`:
- `JUMPING_COPY.body` = verbatim:
  `企業出海的前半段，是把產品送到海外——\n訂單、報關、運輸，多數企業都走得過去。\n\n後半段，才是真正的考驗：\n產品要被當地市場接受，通路要談得下來，\n證照、團隊與客服，要有人在當地接住。\n\n多數企業的出海，不是輸在運輸，\n而是輸在抵達之後沒有人接手。\n\n鹿飛，是為了這後半段旅程而成立的`
- Replace `JUMPING_STATS` with `{ value, label, href }`: `120+` / `家北美 Costco 門市同步上架` / `/cases/costco-health`; `10` / `家馬尼拉門市，一年內開出` / `/cases/bubble-tea`; `3x` / `營收成長，皮鞋品牌轉型襪子` / `/cases/shoe-brand`.
- Above the stats grid add `<p className="mb-4 text-[13px] font-semibold text-white/55">鹿飛案例成果</p>`. Each stat cell becomes a `Link` (block, `group`), value keeps `data-lufe-counter` and current classes, label current classes; hover (hover devices) label `text-white/85`; press `scale(.985)`.
- No `躍馬` string may remain in this file (test it).
`CasesSection.tsx`: delete the `<p>` `三條路的成本、坑、時間都不一樣。…` (line ~263). Icon boxes (G-6): line ~194 `bg-navy text-white` box → `border border-navy/30 text-navy`; line ~253 → `border border-gold/40 text-gold-d` (remove `bg-gold/10`, hover → `border-gold-d`).
`WhySection.tsx`: delete the `<p>` `沒有責任轉交，沒有窗口切換，抵達之後也有人接手` (line ~75).

## 2. Contact (#15, #16, #17) — `ContactPage.tsx`, `Footer.tsx`, `FieldNotesPage.tsx`
- Hero to G-3: remove `min-h-[56svh]`; container `pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px] min-w-0`; add breadcrumb `首頁` (link) `/` `聯絡鹿飛`; `h1 mb-6 max-w-[880px] text-white` (`聯絡鹿飛`); lead `lead max-w-[640px] !text-white/75` (text unchanged); add `<ScrollCue />`.
- Delete the `<div className="mt-6 flex flex-col …">` with `預約 30 分鐘諮詢 →` / `快速留言 →`, and the `bookingMailto` constant; remove `useMessageBox`/`open` if now unused.
- Delete `<section id="partners">…</section>`.
- Success-state icon box: `border border-sky text-sky` (remove `bg-sky/10`).
- `Footer.tsx`: `合作夥伴聯繫` href → `/contact`. `FieldNotesPage.tsx`: `/contact#partners` → `/contact`.

## 3. Field notes (#18)
Hero: delete the stats grid; `h1` → `h1 mb-6 max-w-[880px] font-sans text-white` (was `display`); lead loses `mb-12`. Copy unchanged.

## 4. Insights list (#19)
Hero: delete the stats grid; `h1` → `h1 mb-6 max-w-[880px] text-white`; lead `lead max-w-[640px] !text-white/75` (text unchanged, no bottom margin).

## 5. Article pages — one image (#20, G-8)
- Delete `src/data/articleInlineImages.ts` and `public/images/insights/inline/` (all files). `StaticArticleContent`: remove the `inlineImages` prop, the `InlineImage` import and the figure insertion branch (h2 renders alone).
- `ArticleDetail.tsx`:
  - Always render the cover `figure` (remove the `hasInlineImage` condition). Cover source = `image`; if `image` is empty and the database HTML contains an `<img src>`, use the first `src` as the cover.
  - Before `dangerouslySetInnerHTML`, strip images from database HTML with an exported pure helper `stripDatabaseArticleImages(html: string): string` that removes `<figure …>…</figure>` (non-greedy, case-insensitive, multiline), then any remaining `<img …>` tags, then `<p>` elements left empty (`<p>\s*</p>`). Apply after `addDatabaseArticleHeadingIds`.
  - `RelatedArticleRows`: text-only rows (remove the 72px thumbnail; `grid gap-4`, each `Link` → title 14px/600 2-line clamp + date 12px `text-tx3`, `border-t border-bd pt-4`).
  - Mobile related block (`lg:hidden`): replace the `InsightArticleCard` grid with the same text-only `RelatedArticleRows`.
  - Author avatars (32px header, 96px author card) stay.
- Tests (`article-detail.test.ts`): a static article renders exactly one `<figure`; no `insights/inline` string; `stripDatabaseArticleImages` unit cases (figure with caption, bare img, img inside p, uppercase tags).

## 6. Resources hero (#23)
`src/app/resources/page.tsx`: add canonical breadcrumb `首頁 / 資源`; `h1 mb-6 max-w-[880px] text-white`; lead `lead max-w-[640px] !text-white/75`. Copy unchanged.

## 7. Subsidies (#24, #25) — implement DECISIONS §C-5 exactly
1. Hero (G-2, G-3): delete the 4-stat grid and the `Stat` helper; add breadcrumb `首頁 / 資源 / 2026 政府出海補助` (`資源` links to `/resources`); `h1 mb-6 max-w-[880px] text-white` (keep `text-gold/90` → use `text-gold`); lead `lead max-w-[640px] !text-white/75`, content unchanged (drop its `mb-12`).
2. Delete `<SubsidyMatcher />`, `src/components/subsidy/SubsidyMatcher.tsx`, and in `src/data/subsidies.ts` every export used only by the matcher (`SizeAnswer`, `StageAnswer`, `IndustryAnswer`, `ProblemAnswer`, `MatcherAnswers`, `MatcherQuestion`, `MATCHER_QUESTIONS`, `MatchResult`, `matchSubsidies` and their private helpers). Verify each with `rg` before deleting; paste the list. `SUBSIDY_CARD_COPY.href` → `/resources/subsidies#plans` (update its comment to `Link target — the plans section`). Do not change any program data.
3. New components (allowed new files in `src/components/subsidy/`):
   - `SubsidyStageMap.tsx` (client): props `{ subsidies, now, onSelect(slug) }`; three columns `assess → enter → optimize` per §C-5.1, tiles are `<button type="button">`.
   - `SubsidyStatus.tsx`: `subsidyStatus(subsidy, now): "open" | "pending" | "closed"` (rule §C-5.2) + `<SubsidyStatusBadge>` rendering `開放申請中` / `等待公告` / `已截止` with the §C-5.2 classes. Unit-test the rule with `now` before and after `2026-10-30T18:00+08:00` for `market-expansion` and with the exhibition (`預計`) entry.
   - `SubsidyPlanPanel.tsx`: the spec-sheet panel (§C-5.4) — replaces `SubsidyPlanCard`; no `Disclosure`; every list fully rendered.
   - `SubsidyPlans.tsx` (client): wraps `section#plans` heading row (existing copy) + `SubsidyStageMap` + sticky `Segmented` tabs (`label="補助計畫"`, options `${num} ${shortTitle}`) + four `SubsidyPlanPanel`s (`id={slug}`, inactive `hidden`), hash handling and panel enter motion per §C-5.3 (CSS: use a Tailwind arbitrary animation or inline keyframes via a `<style>`-free approach — e.g. a spring from `@/lib/motion` on opacity/translateY; no globals.css edits in this WO).
   - Delete `SubsidyPlanCard.tsx` (incl. `SubsidyComparison`) once unused.
4. Page: replace the "4 個計畫" section and the "不知道哪個適合？先看你現在在哪一步" section with `<SubsidyPlans subsidies={SUBSIDIES} now={now} />`. Pillars section stays; Pillar icon box → `border border-gold/40 text-gold-d` (remove `bg-gold/[.08]`). `SubsidyIcons.tsx`: replace the `fill="currentColor"` dot with a stroke-only circle (same position, `r=0.8`, `stroke="currentColor" strokeWidth="1.5"`, `fill="none"`).
5. FAQ: replace the `Disclosure` list with `<FaqSection title="申請前你最可能想問的事" idPrefix="subsidy-faq" items={SUBSIDY_FAQS.map((f, i) => ({ num: String(i + 1).padStart(2, "0"), question: f.question, answer: f.answer }))} className="bg-white py-[72px] md:py-[96px]" />`; delete the local `FAQItem` and the `Disclosure` import. `FaqJsonLd` unchanged.
6. Copy (verbatim, new): `開放申請中`, `等待公告`, `已截止`, `補助額度`, `時程`, `適用階段`, `狀態`, `適合`, `補助涵蓋`, `可補助費用明細`, `申請與核銷流程`, `容易踩雷的點`, `鹿飛怎麼幫`. All program text comes from `SUBSIDIES` unchanged (stage descriptions drop the final `。` as today).
7. Tests (`tests/components/subsidy/subsidies.test.ts`, `tests/components/resources/resources.test.ts`): remove matcher tests; page markup contains every subsidy `shortTitle`, `amount`, every `whoFor`/`covers`/`coversDetail.title`/`processSteps.title`/`importantNotes` item and `lufeAngle` (all panels in server HTML), `id="plans"`, each `id="<slug>"`, no `id="match"`, no `算算你能拿`; status rule tests; `SubsidyAlertBand` test still passes (anchors `#<slug>` exist).

## 8. Verification
COMMON.md steps 1–8. Font guard: paste the output (expected new characters from §1 and §7 copy).
Screenshot paths: `/`, `/contact`, `/field-notes`, `/insights`, `/insights/agent-vs-distributor-exclusive`, `/insights/first-time-export-checklist`, `/resources`, `/resources/subsidies`, `/resources/subsidies#overseas-exhibition`.
Playwright extras (1440 + 390, paste output):
- Home count-up: scroll `#jumping [data-lufe-counter]` (first) into view, wait 1000ms → numeric part strictly between 0 and 120; wait 2200ms → `120+`. Print both values.
- Home: `document.querySelector("#jumping").textContent.includes("躍馬") === false`.
- Every hero on the screenshot paths: `section.lufe-hero [data-lufe-counter], section.lufe-hero .num` count `=== 0`; `section.lufe-hero nav[aria-label="Breadcrumb"]` count `=== 1` (except `/`).
- `/contact`: `#partners` absent; text `預約 30 分鐘諮詢` and `快速留言 →` absent from `main`.
- Article pages: `document.querySelectorAll("#main-content article figure").length === 1` and no `img[src*="/insights/inline/"]`; FAQ numbers `01` visible.
- `/resources/subsidies#overseas-exhibition`: after load the active tab is the exhibition plan (`aria-checked="true"` on that segment) and its panel is visible; clicking a stage-map tile switches the panel and updates `location.hash`.
- Report `document.documentElement.scrollWidth === innerWidth` on all (the sticky tab row must not overflow at 390).
