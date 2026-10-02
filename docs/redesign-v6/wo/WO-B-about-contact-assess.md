# WO-B — About, author page, Contact, Assess

Read `docs/redesign-v6/wo/COMMON.md` first. Starts after WO-0 is merged. **Runs in parallel with WO-A** (disjoint paths).
Implements DECISIONS #31–#47 and #55 (hero videos already wired by WO-0 — keep the `video` prop on every `HeroBackdrop` you touch).

- Branch: `v6/b-about-contact-assess` from `origin/redesign/v6`. PR → `redesign/v6`. Screenshot port: `3102`.

## Allowed paths
- `src/components/about/**`, `src/app/about/**`
- `src/components/contact/**`, `src/app/contact/**`
- `src/components/assess/**`, `src/app/assess/**` (new `src/app/assess/result/page.tsx`)
- `package.json`, `package-lock.json` — **only** to add `cobe` (`npm install cobe@2.0.1 --save-exact`)
- Tests: `tests/components/about/**`, `tests/components/contact/**`, `tests/components/assess/**`
- Read-only imports: `@/components/icons/LineIcons`, `@/data/heroVideos`, `@/lib/motion`, `@/components/ui`, `@/data/cases`, `@/lib/articles/*`.
Do not touch `Navbar.tsx` (WO-A removes the two about-menu anchors and adds `/assess/result` to the dark-hero list).

## 1. `/about` (`AboutPage.tsx`)
**Hero (#31 #32)**
- Keep breadcrumb, h1, quote `「別人幫你開車，我們幫你找路。」` (drop its `italic`/`font-light`; 18px `text-white/80`).
- New lead under the quote (`lead !text-white/75 max-w-[640px] mt-4 mb-10`):
  `鹿飛協助台灣企業規劃並執行海外落地，從市場驗證、通路進入到在地團隊與客服，一個窗口串起出海的每一段。以躍馬企業 42 年國際物流為基礎，讓每一步都有實際的執行力`
- Delete the founder block entirely (`Aaron Yu`, `鹿飛 LUFÉ 創辦人・來自躍馬企業`, `看了很多年貨櫃出去…`, `看 Aaron 的文章 →`).
- Keep the stats strip (`data-lufe-counter`).

**Story cards (#33 #34)** — `storyCards` copy (use `whiteSpace: pre-line` strings instead of JSX `<br/>`):
- 01 `看到的問題`:
```
在躍馬企業看了很多年

躍馬做的是把貨送出去——42 年，500 多個出口案件，30 多個國家。
看的不是報表，是貨櫃出去以後的事：
有的品牌在當地開了第二家店，
更多的是幾個月後貨退回來，或者就沒有下文了
```
- 02 `想通的事`:
```
差別從來不在物流，貨都有送到。
差別在抵達之後，有沒有人接著走：
證照有沒有人辦、貨架上有沒有人推、第一封英文客訴有沒有人回
```
- 03 `做了什麼`:
```
台灣市場不夠大，出海是遲早的事；出去有難度，但出得去。
鹿飛把抵達之後最難的四件事，做成四個方案，
讓第一步小到企業敢踏，後面的每一步都有人在
```
- alts: 01 `鹿飛工作坊現場，分享跨境實戰觀察`; 02 unchanged; 03 `台視新聞訪問躍馬企業市場經理`.

**Team (#35 #36)**
- h2 (`h2`): line 1 `小而精的核心團隊，`, line 2 `<span className="text-gold-d">連結全球在地節點</span>`
- description (replace `section-desc` with `lead mt-5 max-w-[720px]`): `鹿飛刻意維持精簡規模：每個案子由核心團隊親自把關，再由北美與東南亞的在地夥伴分工執行`
- `teamRoles` descs: 台灣核心 `負責合約、進度與對口窗口。從第一次諮詢到每一章執行，都由同一位窗口負責到底`; 菲律賓合作夥伴 `在當地經營英語教育機構與連鎖餐飲多年，市場探查面板、落地執行、客服團隊都從這裡來`; 北美團隊 `在北美當地做研究、展覽、買家引進、談判。北美這條線由他們執行`
- Delete the footnote `* 我們的定位是…`.

**How we work (#37 #38 #39)** — delete the whole `#how-we-work` section and the `howWeWorkSteps` export.

**Network (#40 #41)** — replace the Saigon banner + section header with a navy band (`bg-navy text-white`, `id="network"` stays on the section):
- Grid `lg:grid-cols-[1fr_480px] items-center gap-12`. Left: h2 (white) line 1 `跨越三地的資源網絡，`, line 2 `<span className="text-gold">支援每一個出海計畫</span>`; lead `!text-white/70`: `通路關係、在地夥伴與科技工具，整合為同一套跨境執行體系`; then three stats (`data-lufe-counter`, `num text-gold`): `30+` / `國家與地區`, `500+` / `出口案件`, `42` / `年國際物流`; then one line 13px `text-white/55`: `台北・馬尼拉・洛杉磯・多倫多`.
- Right: new `NetworkGlobe.tsx` (client), spec DECISIONS §C-3 "地球儀":
  - `const createGlobe = (await import("cobe")).default` only after an `IntersectionObserver` sees the section (rootMargin `200px`).
  - Options: `devicePixelRatio: Math.min(2, window.devicePixelRatio)`, `width/height = size*dpr` (size = canvas CSS width; 480 desktop, container width ≤ 320 on mobile), `phi` state, `theta: 0.25`, `dark: 1`, `diffuse: 1.2`, `mapSamples: 16000`, `mapBrightness: 5`, `baseColor: [0.16,0.22,0.33]`, `markerColor: [0.83,0.66,0.36]`, `glowColor: [0.2,0.28,0.42]`, `markers`: Taipei `[25.033,121.565]` 0.08, Manila `[14.599,120.984]` 0.07, Los Angeles `[34.052,-118.244]` 0.06, Toronto `[43.653,-79.383]` 0.05; `arcs` Taipei→Manila, Taipei→LA, Taipei→Toronto, `arcColor: [0.83,0.66,0.36]`, `arcWidth: 0.5`, `arcHeight: 0.25`. Verify option names against the installed cobe 2.0.1 typings/README and adapt (note in PR).
  - Auto-rotate `phi += 0.0035` per frame in `onRender`; pointer drag rotates 1:1 (`setPointerCapture`, `phi += dx / 200`), on release keep the last velocity and decay it by ×0.95 per frame until < 0.0005, then resume auto-rotate. `cursor-grab`/`active:cursor-grabbing`, `touch-action: pan-y` so vertical page scroll still works on phones.
  - Pause rendering (cobe `globe.toggle(false)` or skip updates per README) when out of view or `document.hidden`; `destroy()` on unmount.
  - Reduced motion: no auto-rotate, no drag momentum; render a static globe.
  - No WebGL (`!canvas.getContext('webgl2') && !…('webgl')`) → render the existing `/images/about/network-saigon-night-1600.webp` with `TieredImage` instead.
  - Canvas `aria-hidden="true"`, `className="aspect-square w-full max-w-[480px] mx-auto"`; fade in `opacity 0→1` 600ms after first frame.
- Below the band, keep the four `networkCards` on white (drop final `。` in descs; keep text otherwise; `section-desc` gone).

**Philosophy (#42)** — two columns (`lg:grid-cols-[1fr_440px] gap-14 items-center`), navy section, remove the faint background image layer:
- h2 `鹿飛相信的四件事`
- Left list (keep `data-lufe-belief` items and numbering style), descs exactly:
  1 `出海是遲早的事：早一點、小一點開始，成本最低`
  2 `先做最難的事：辦證、設公司、接客訴，做不到就直說`
  3 `有立場：建議能讓企業長大的選項，而非最省事的`
  4 `判斷有數據，做法有實績`
- Right: `TieredImage` `/images/about/philosophy-compass-1600.webp`, `aspect-[4/5] object-cover`, alt `羅盤與地圖`, lazy. Mobile: image first at `aspect-[16/9]`, list below.

**What we don't do (#43)** — delete the whole `#what-we-dont-do` section and the `thingsWeDontDo` export.

**Closing CTA (#34)** — h2 `從一次對話，開始規劃出海`; p `首次諮詢不收費，先釐清方向，再決定下一步`; image alt `工作坊現場，陪學員實際操作`; button unchanged.

## 2. `/about/aaron-yu` (`AaronAuthorPage.tsx`, `src/app/about/aaron-yu/page.tsx`) — #44 #45 #46
- Hero: keep breadcrumb, h1 `Aaron Yu`, gold line `鹿飛 LUFÉ 創辦人・來自躍馬企業`. Subtitle: `躍馬企業國際物流背景出身，專注研究台灣企業如何在北美與東南亞市場落地`.
- Remove the standalone `LinkedIn ↗` link. Add a meta row (14px `text-white/60`, `flex flex-wrap items-center gap-x-3 gap-y-2`, separated by `・`): `專欄文章 {N} 篇` (N = number of published static articles), `最近更新 {date}` (newest `date`), and an icon link `<LinkedInIcon size={16}/> LinkedIn` → `https://www.linkedin.com/in/wibp/` (`rel="me noopener"`, `target="_blank"`, `hover:text-white`).
- Section h2: `專欄文章`.
- `metadata.description`: `躍馬企業國際物流背景出身，專注研究台灣企業如何在北美與東南亞市場落地。` (metadata keeps its final 。). Keep title and JSON-LD.

## 3. `/contact` (`ContactPage.tsx`) — #55 (DECISIONS §C-8)
Keep **every line** of the form logic (`/api/lead` POST, validation, honeypot `website`, `buildContactLeadPayload`, `stageOptions`, success/error UI, fallback mailto). Only the layout and the copy listed here change.
- Hero: `lufe-hero` with `min-h-[56svh]` (override the 100svh min-height for this page only via class), `HeroBackdrop` with `video={HERO_VIDEOS.contact}`. h1 `聯絡鹿飛`; lead `!text-white/75`: `出海規劃、合作洽談或媒體邀約，留下訊息，一個工作天內回覆`. Remove `ScrollCue`.
- Main section (white, `py-[72px] md:py-[96px]`): `grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16`.
  - Left: four info rows (`border-t border-bd py-5`, last also `border-b`), each `grid grid-cols-[24px_1fr] gap-4`: icon (`text-gold-d`, 20px) + label (13px `text-tx3`) + value (16px `text-tx`):
    `MailIcon` `Email` `aaron.yu@reborn.in` (mailto link) · `MapPinIcon` `地點` `台北市｜線上會議為主` · `CalendarClockIcon` `服務時間` `週一至週五 09:00–18:00` · `MessageIcon` `回覆時間` `一個工作天內`.
    Then two text links (15px semibold `text-sky`, stacked, `mt-6`): `預約 30 分鐘諮詢 →` (existing booking mailto) and a button `快速留言 →` (`useMessageBox().open`).
    Then partners block `id="partners"` (`scroll-mt-[100px] mt-10 border-l-2 border-gold pl-5`): h2 `h3` `合作洽談`; p 15px `text-tx2`: `商會、同業顧問、在地服務商與物流夥伴，歡迎來信洽談合作。不收介紹費、不綁獨家`; link `寄信洽談合作 →` (existing partner mailto).
  - Right: `bg-cream p-6 md:p-10`: h2 `h3` `留下你的需求`; p 15px `text-tx2 mb-8`: `資訊越完整，第一次回覆越精準`; then the existing form unchanged (labels, placeholders, messages).
- Delete: channel cards, business info strip, `或者選擇其他方式聯繫我們：`, partners navy section with the three cards and background images, form section background image, `section-label`.

## 4. `/assess` + `/assess/result` — #47 (DECISIONS §C-6)
- `EntryScreen` becomes the whole `/assess` page (no "開始比對" button, no `started` state). Navy section `pt-[120px] pb-20 md:pt-[150px]`:
  - `grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14 items-start`.
  - Left: `TieredImage` `/images/cases/cases-hero-collab-1600.webp`, alt `團隊討論出海策略`, `aspect-[16/9] lg:aspect-[4/5] object-cover`, `loading="eager" fetchPriority="high"` (it is the LCP image; no `HeroBackdrop`, no video).
  - Right: breadcrumb (unchanged logic incl. focus case), focus-case strip (unchanged), h1 `h1` line 1 `看看你的處境，`, line 2 `<span className="text-gold">跟哪個案例最像</span>`; lead `!text-white/70 mb-10`: `三個問題，約 2 分鐘。比對鹿飛做過的四個案例，找出最接近的一個，以及當時的判斷方法`; then `MatcherFlow` with `assessQuestions` directly.
  - Delete: the AY/Aaron authority block, the italic honesty paragraph, the four case chips, the gold radial glow.
  - Keep `AssessQuestionStaticCopy` (sr-only SEO copy).
- On completion (`onComplete`): compute nothing; `router.push(\`/assess/result?stage=${s}&blocker=${b}&market=${m}${focusCase ? \`&case=${focusCase.slug}\` : ""}\`)` and return a small "載入結果…" placeholder.
- New `src/app/assess/result/page.tsx`: static server page (`metadata` title `處境比對結果`, `robots: { index: false, follow: true }`), renders `<Suspense fallback={<AssessFallback/>}><AssessResult/></Suspense>`; `AssessResult` (client) reads `useSearchParams`, validates each value against the option lists; invalid → navy section with h1 `這份比對連結不完整` and link `重新比對 →` (`/assess`). Valid → existing ranking logic + `ResultScreen` (move/export what you need; keep narrative copy as is). `ResultScreen`'s `重新比對` becomes a `Link` to `/assess`. Build must list `/assess` and `/assess/result` as `○`.
- Result copy: drop final `。` only on `closing` strings? **No** — narrative sentences are body text; keep them unchanged.

## 5. Full-stop + voice sweep
Run the COMMON.md `rg` sweep on your allowed paths and apply DECISIONS §C-2; grep `rg -n "Aaron|我" src/components/about src/components/contact src/components/assess` and list remaining hits with the reason each is allowed (byline/author page/email/quote) in the PR.

## Tests
- `tests/components/about/about.test.ts`: remove `howWeWorkSteps`/`thingsWeDontDo`; assert markup has none of `誠實的邊界`, `你會得到什麼樣的陪跑`, `看 Aaron 的文章`, `不是 Aaron 一個人`, `* 我們的定位`; has all three story card texts, the four beliefs, `跨越三地的資源網絡`; no `<canvas` in static markup (globe mounts client-side) but the stats text is present.
- `tests/components/contact/contact.test.ts`: form field names unchanged; `id="partners"` present; `合作洽談`, `aaron.yu@reborn.in`, `留下你的需求` present; `選一個你最方便的方式` absent; `buildContactLeadPayload` test unchanged and passing.
- `tests/components/assess/assess.test.ts`: entry markup has all question labels and option labels, has no `AY`, `Aaron Yu · 鹿飛創辦人`, `開始比對 →`; result parser: valid params produce a primary case, invalid params produce the incomplete-link state.

## Verification
COMMON.md steps 1–8. Screenshot paths: `/about /about/aaron-yu /contact /assess /assess/result?stage=scaling&blocker=channel&market=us /assess/result?stage=bad`. In Playwright at 1440 on `/about`: scroll to `#network`, wait 2 s, screenshot the band, and assert a `canvas` exists; with `reducedMotion: 'reduce'` take a second screenshot. On `/assess`: click one option per question and assert the URL becomes `/assess/result?…`. On `/contact`: fill the form with name `系統測試（Codex）`, a valid email and message, **do not submit** (no real lead), screenshot.
Bundle check: paste the size of the `/about` route chunk from the build output before/after; `cobe` must not appear in any chunk loaded by other routes (`grep -l "createGlobe\|cobe" .next/static/chunks/*.js` → list and confirm only the about-route dynamic chunk).
