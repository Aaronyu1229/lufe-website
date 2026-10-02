# WO-A — Home page + global shell (Navbar, mega menu, Footer)

Read `docs/redesign-v6/wo/COMMON.md` first. Starts after WO-0 is merged. **Runs in parallel with WO-B** (disjoint paths).
Implements DECISIONS #0–#8, #10–#29 (logo application), and the menu side of #39/#43.

- Branch: `v6/a-home-shell` from `origin/redesign/v6`. PR → `redesign/v6`. Screenshot port: `3101`.

## Allowed paths
- `src/components/home/**`, `src/app/page.tsx`, `src/data/homeFaq.ts`
- `src/components/Navbar.tsx`, `src/components/Footer.tsx`
- Tests: `tests/components/home/**`, `tests/components/navbar.test.ts`, `tests/components/footer.test.ts` (new)
- Import (read-only) `@/components/icons/LineIcons`, `@/lib/motion`, `@/components/ui`.

## 1. Hero (`HeroSection.tsx`) — #1
Only change the three `subtitle` strings (drop the final `。`), nothing else in the hero:
- slide 1: `這個市場真的要你嗎？市場評估、產品測試、決策框架 — 先把勝率搞清楚`
- slide 2: `通路進入、展會佈局、數位集客 — 把產品放進對的通路，讓消費者找得到`
- slide 3: `出海不是報告寫得出來的。鹿飛站在躍馬企業 42 年的國際物流實戰上，幫你把產品適配跟通路銷售兩件事跑通`

## 2. Opening section (`OpeningSection.tsx`) — #0
- h2 line 1: `出海不是把貨送出去，`
- h2 line 2 (`text-gold-d` span): `是把生意做起來`
- paragraph 1 (`whitespace-pre-line`, keep current classes):
```
多數台灣企業的出海，是這樣開始的：

拿到一張海外訂單、參加一次展會、找到一位代理商。
產品上了架，當地消費者卻不知道它為什麼值得買；
證照、通路、售後一件一件冒出來，每一件都要老闆親自處理。
半年後，海外業務還停在「試試看」
```
- paragraph 2 (bold, `text-tx`):
```
出海的成敗，不在第一張訂單。
在於市場、通路、團隊與服務，有沒有一套系統一起往前走。
鹿飛做的，就是這套系統
```

## 3. Chapters (`PositioningBand.tsx`) — #2 #3 #4 #5 #6
- Lead under the h2 (h2 unchanged): `四個章節，四個方案。可從第一章開始，也可一路走完；每一章獨立計價，每一章結束都能決定是否繼續`
- `HOME_CHAPTERS[].subtitle`:
  - `在當地找真實消費者試用，確認誰會買、願意付多少`
  - `電商上架與產品證同步進行，用實際銷售驗證市場`
  - `公司註冊、人員招聘、FDA 證照轉移，建立當地據點`
  - `菲律賓是全球英語客服外包的重鎮。由當地專業團隊接手英文客服，品質標準由台灣端制定與管理`
- Add `icon` to each chapter: `CompassIcon`, `TrendIcon`, `BuildingIcon`, `HeadsetIcon`. Render at the top-left of each card, above the month label: a 40×40 square `grid place-items-center border border-gold/25 bg-gold/10 text-gold-d` with the 20px icon; card `group`; on `[@media(hover:hover)]:group-hover` the square becomes `bg-gold/15` and the icon `translate-x-px` (200ms).
- Delete the whole 起手包 `<p>` (`出海起手包 7 萬 ＝ …前 10 家是實驗價。`).
- Replace the North-America link with a full-width link row: `<Link href="/services/north-america" className="group mt-8 flex items-center gap-4 border-y border-bd py-4">` containing: a 28×28 `US` mark (same markup/style as the Navbar `US` marker), the text `已具規模、準備進入北美零售通路` (15px, `text-tx`, `group-hover:text-sky`), and on the right (`ml-auto`) `北美市場拓展 →` (15px semibold `text-sky`; the arrow `inline-block transition-transform group-hover:translate-x-[3px]`).

## 4. Jumping section (`JumpingSection.tsx`) — #7 #8 (#9 is done by WO-0)
- `JUMPING_COPY.title`: `["一家企業出海的", "後半段旅程"]`
- `JUMPING_COPY.body`:
```
企業出海的前半段，是把產品送到海外——
這一段，躍馬企業做了 42 年、500 多個案件、30 多個國家。

後半段，才是真正的考驗：
產品要被當地市場接受，通路要談得下來，
證照、團隊與客服，要有人在當地接住。

多數企業的出海，不是輸在運輸，
而是輸在抵達之後沒有人接手。

鹿飛，是為了這後半段旅程而成立的
```
- Right-side small block: h3 `鹿飛相信的事很簡單`; paragraph `台灣市場不夠大，這件事做生意的人都知道。\n出去有難度，但出得去。\n鹿飛想做的，是讓第一步小到企業敢踏，\n後面的每一步，都有人在`
- Keep the three stats and `data-lufe-counter`; give the stat grid `pb-2` so WO-0's gold underline does not touch the labels (check screenshot).

## 5. Cases section (`CasesSection.tsx`) — #10 #11
- h2 line 1 `用數據判斷方向，`, line 2 (`text-gold-d`) `用實戰調整做法`
- lead: `在菲律賓，鹿飛與合作夥伴走過三條不一樣的路；每一條都先小規模驗證，再依數據調整、放大`
- `HOME_CASE_ROADS` titles: `從零開始` / `改了再帶過去` / `原封不動帶過去`; details (drop final 。 only):
  - `在當地蓋一間英語教育機構——找老師、找場地、招第一個學生；\n後來用同樣的方法，做了一個連鎖手搖飲品牌`
  - `台灣的產品到了當地，改配方、改價格、改包裝，\n變成當地人願意掏錢的樣子`
  - `一個台灣的美業品牌，什麼都不改，只做當地的行銷，看它站不站得住`
- Add icons `SproutIcon` / `SlidersIcon` / `PackageIcon` in the same 40×40 square style as §3, above the `第一條/第二條/第三條` label.
- The paragraph under the roads: `三條路的成本、坑、時間都不一樣。\n第一次談，鹿飛會先確認企業比較像哪一條`
- Case cards (`HOME_CASE_CARDS`) unchanged except dropping final `。` in `painLine` / `solutionLine` if any.

## 6. Latest insights (`LatestInsightsSection.tsx`) — #12
h2 line 1 `出海實務洞察，`, line 2 (`text-gold-d`) `從市場、通路到法規`.

## 7. One contract (`WhySection.tsx`) — #13 #14
- h2 line 1 `顧問、貿易商、貨代、客服各管一段，`, line 2 (`text-gold-d`) `老闆成了唯一的窗口`
- intro: `多數企業出海的一週，是這樣過的：`
- explanation paragraph:
```
每一家只負責自己那一段，進度卡住時，沒有人負責把它串起來。

鹿飛把市場探查、寄賣、落地、客服與國際物流，整合在同一份合約裡
一個窗口對接所有環節，企業只需要開一次會
```
- Change `HOME_CONTRACT_ROWS` to `{ type, desc, pillars, isLufe? }`:
  `顧問公司`/`出一份策略報告`, `貿易商`/`幫你把貨賣掉`, `客服外包`/`幫你接電話`, `貨代`/`把貨送到`, `鹿飛 LUFÉ`/`一份合約走完`.
  Row header renders `<span className="font-semibold">{type}</span><span className="text-tx3"> - </span><span className="font-normal text-tx2">{desc}</span>` (LUFÉ row: desc `text-gold-d`). Keep `aria-label` text as `${type} - ${desc}涵蓋…`/`不涵蓋…`.
- Sentence under the table: `沒有責任轉交，沒有窗口切換，抵達之後也有人接手`

## 8. FAQ (`HomeFAQ.tsx`, `src/data/homeFaq.ts`) — #15 (DECISIONS §C-4)
- Data: only drop the final `。` of the `takeaway` strings (`先講數字，再講一句真心話`, `那是市場探查最有價值的一種結果`); answers unchanged (FAQ answers keep punctuation).
- Left column (sticky, unchanged h2) gets below it: `還有其他問題？` (15px `text-tx2`) and a text button `直接問鹿飛 →` (15px semibold `text-sky`, opens `useMessageBox().open`).
- Each item: the shared `Disclosure` renders its own chevron box and does not expose its open state, so create `src/components/home/HomeFaqItem.tsx` (client) that copies `Disclosure`'s behaviour exactly (button with `aria-expanded`/`aria-controls`; content container always rendered with `aria-hidden`/`inert` when closed; spring height via `useSpring` + `disclosureHeight` logic re-implemented locally since `src/components/ui/geometry` may be imported read-only; ResizeObserver re-measure). Do **not** edit `src/components/ui/**`.
  Summary row: number `01/02/03` as Inter 600 28px, `text-tx3/40`, turns `text-gold-d` when open (200ms color); question 20px/600; on the right a 32×32 square `border border-bd` box with `PlusIcon` that rotates to 45° when open via `useSpring` (response 0.3, damping 1, precision 0.001 on a 0..1 value → `rotate(${v*45}deg)`).
- Open item: 3px gold bar on the left edge (`absolute left-0 top-0 bottom-0 w-[3px] bg-gold origin-top`) scaled `scaleY(0→1)` with the same spring; hover row `bg-cream/60` only in hover-capable media; `active:scale-[.995]`.
- Panel: takeaway as `border-l-2 border-gold pl-4 text-[17px] font-medium text-tx` above the answer; answer unchanged.
- First item open by default (unchanged). Reduced motion: no rotation/scale animation (state switch only).

## 9. CTA (`CTASection.tsx`) — #16 #17
- h2 line 1 `從一次評估開始，`, line 2 `看清楚出海的下一步`
- sub (`text-white/70`): `提交需求後，24 小時內由鹿飛顧問團隊回覆；首次諮詢即說明費用與時程`

## 10. Footer (`Footer.tsx`) — #18 #19 #20
- Tagline: `協助台灣企業在北美與東南亞落地：市場探查、寄賣、公司落地到海外客服，一個窗口走完出海第一年。以躍馬企業 42 年國際物流為後盾`
- External links: labels `TradePilot - 線上報關工具` and `躍馬企業 - 官網`; render the label followed by `<span aria-hidden="true" className="ml-1 text-[12px] opacity-60">↗</span>`; keep `target="_blank" rel="noopener noreferrer"`.

## 11. Navbar + mega menu — #21–#29, #39, #43 (DECISIONS §C-5)
- Delete every `MenuLabel` usage and the component (all kicker lines in all five panes, including `一頁看完`). `MenuColumn`/`MenuRail` lose the `label` prop; columns start with `pt-[22px]`.
- `MenuLink`: remove the `desc` prop and its render everywhere (services, advanced, cases tags, insights `N 篇`, about desc). Row = marker + title, `items-center`, `py-3`, title `text-[15.5px]`.
- No prices anywhere in the menu.
- Replace `FeatureLink`/`FeatureAction` (navy blocks) with one `FeatureTile` (link or button variant): `bg-white border border-bd p-5`; 32×32 icon square `bg-gold/10 text-gold-d`; title 16px/650 `mt-4`; body 13.5px `text-tx2 leading-[1.7] mt-1.5`; action 14px/600 `text-sky mt-4` with arrow `transition-transform group-hover:translate-x-[3px]`; `transition-[transform,border-color] duration-200 [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:border-gold/50 active:scale-[.985]`. No images.
  - Services rail: icon `CompassIcon`, `不確定從哪裡開始？` / `先做市場探查，用當地真實消費者的反應決定下一步` / `看市場探查怎麼做 →` → `/services/product-testing`
  - Advanced rail: icon `ClockIcon`, `免費初步評估` / `30 分鐘，用鹿飛方法論的五個問題，初步檢視出海條件` / `預約 30 分鐘 →` → opens MessageBox
  - Cases rail: keep the industry/market tag chips; below them icon `TargetIcon`, `不確定比較像哪一條？` / `2 分鐘處境比對，找出最接近的案例` / `開始比對 →` → `/assess`
  - About rail: icon `PenIcon`, `創辦人專欄` / `跨境市場、通路與法規的第一手觀察` / `閱讀專欄 →` → `/about/aaron-yu`
- Insights pane: rename the TradePilot item title to `TradePilot - 線上報關工具` (desktop and mobile; keep `↗` handling as in Footer).
- `ABOUT_MENU_ITEMS` becomes four items: `{ href: "/about#story", title: "品牌故事", num: "01" }`, `{ href: "/about#team", title: "團隊組成", num: "02" }`, `{ href: "/about#network", title: "合作夥伴網絡", num: "03" }`, `{ href: "/about#philosophy", title: "品牌理念", num: "04" }` (removes `#how-we-work` and `#what-we-dont-do`, deleted by WO-B). Split 2 + 2 across the two columns. Mobile menu uses the same list.
- `pathnameHasDarkHero`: add `"/assess/result"` (new dark page from WO-B).
- Deer logo (#29): add `className="lufe-deer-trigger …"` to the logo `<Link>` and `className="lufe-deer"` to the deer `<Image>` (keyframes provided by WO-0). Text untouched.

## 12. Full-stop sweep
Run the COMMON.md `rg` sweep on `src/components/home src/data/homeFaq.ts src/components/Navbar.tsx src/components/Footer.tsx` and apply DECISIONS §C-2.

## Tests
- Update `tests/components/home/page.test.ts` pinned copy to the new strings above (derive from the exported constants where possible) and assert: no `出海起手包 7 萬` in markup; each chapter card and road card renders an `<svg`; all FAQ answers and takeaways are in the static markup; `一家企業出海的` present.
- `tests/components/navbar.test.ts`: markup contains none of the deleted kicker strings (`菲律賓 · 第一年四章`, `另一條線`, `從這裡開始`, `一頁看完`, `第一個月 · 1～2 萬`), no `bg-navy` inside `#desktop-mega-menu`, the four FeatureTile titles present, no `/about#how-we-work`, no `/about#what-we-dont-do`, and `pathnameHasDarkHero("/assess/result") === true`.
- `tests/components/footer.test.ts` (new): tagline, `TradePilot - 線上報關工具`, `躍馬企業 - 官網` present.

## Verification
COMMON.md steps 1–8. Screenshot paths: `/` plus, at 1440 only, a screenshot with each mega-menu pane open (hover each `[data-menu-trigger]`, wait 500 ms, screenshot `#desktop-mega-menu`), and one of the FAQ with item 2 open. Lighthouse mobile on `/` before/after (same command as WO-0 with `/`): performance must stay ≥ the before score − 2 and LCP within +0.3 s.
