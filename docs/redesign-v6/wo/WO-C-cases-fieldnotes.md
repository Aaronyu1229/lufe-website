# WO-C — Cases (list + 4 story detail pages) and Field notes

Read `docs/redesign-v6/wo/COMMON.md` first. Starts after WO-A and WO-B are merged (or at least after WO-0; it shares no paths with A/B). **Runs in parallel with WO-D.**
Implements DECISIONS #49–#54, #57, #58 (videos for `/cases` and `/field-notes` already wired by WO-0; case-detail videos are wired here).

- Branch: `v6/c-cases-fieldnotes` from `origin/redesign/v6`. PR → `redesign/v6`. Screenshot port: `3103`.

## Allowed paths
- `src/components/cases/**`, `src/app/cases/**`, `src/data/cases.ts`
- `public/images/cases/story/**` (new)
- `src/components/field-notes/**`, `src/app/field-notes/**`
- Tests: `tests/components/cases/**`, `tests/components/field-notes/**`
- Read-only: `@/components/icons/LineIcons`, `@/data/heroVideos`, `@/components/HeroBackdrop`, `@/components/TieredImage`, `@/components/ui`.
Do not change exported names/fields of `src/data/cases.ts` that other files read (`CASES`, `CASE_CARD_META`, `getCase`, `INDUSTRIES`, `MARKETS`, `title`, `num`, `tags`, `heroImage`, `summary`, `challenge`, `approach`, `result`, `keyDecisions`, `timeline`, `quote`, `stats`) — only add.

## 1. Story images
Download each (`curl -L -A "Mozilla/5.0"`), save under `public/images/cases/story/`, then run `npm run images:build` after the paths are referenced in `src/data/cases.ts` as `/images/cases/story/<name>-1600.webp`; commit the source jpg/png **and** the generated tiers. URL pattern `https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?auto=compress&cs=tinysrgb&w=2400` (33328957 → `.png`).

| file | Pexels ID |
|---|---|
| costco-health-1.jpg | 17891275 |
| costco-health-2.jpg | 28846857 |
| costco-health-3.jpg | 7875990 |
| costco-health-4.jpg | 33824584 |
| electronics-tariff-1.jpg | 5554948 |
| electronics-tariff-2.jpg | 2144905 |
| electronics-tariff-3.jpg | 36801012 |
| shoe-brand-1.jpg | 5894239 |
| shoe-brand-2.jpg | 9594142 |
| shoe-brand-3.jpg | 4440800 |
| bubble-tea-1.jpg | 26904228 |
| bubble-tea-2.jpg | 39294651 |
| bubble-tea-3.jpg | 12368762 |
| bubble-tea-4.png | 33328957 |

Portrait sources (28846857, 26904228, 12368762, 33328957, 4440800) are displayed 3:2 with `object-cover`; set an `objectPosition` per image only if the screenshot crops badly (note it in the PR).

## 2. `src/data/cases.ts` — add `story`
```ts
export interface StoryChapter {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly image?: { readonly src: string; readonly alt: string; readonly position?: string };
  readonly showStageLinks?: boolean;
}
// CaseStudy gains: readonly story: readonly StoryChapter[];
```
Fill `story` for all four cases **verbatim** from DECISIONS §B-5 (copy each backticked heading/paragraph exactly; image `src` = `/images/cases/story/<name>-1600.webp`, `alt` = the alt given there; `showStageLinks: true` on the chapter marked「這一章後面放『用到的方案』連結列」). Paragraphs keep their final `。` (long-form rule).

For convenience the full text is reproduced here — it must match DECISIONS §B-5 character for character:

**costco-health**
1. heading `一個在台灣站穩的品牌，在北美沒有人認識`; image costco-health-1 alt `保健品膠囊與瓶裝產品`
   - `小山羊保健品在台灣已有穩定市場。下一步想走進北美，卻發現每一關都陌生：FDA 註冊流程繁複、Costco 的供應商門檻極高，產品包裝與成分標示也必須全面合規。`
   - `在這之前，品牌已經試過兩次。第一次找貿易商，對方只處理物流，品牌在通路端完全沒有話語權；第二次找顧問，拿到一份 80 頁的市場報告，卻沒有任何執行。`
2. heading `先確認市場要什麼，再決定產品怎麼改`; image costco-health-2 alt `倉儲賣場的保健品貨架走道`; `showStageLinks: true`
   - `鹿飛從市場評估開始，先釐清北美保健品市場的需求缺口，以及 Costco 會員的消費偏好。`
   - `第三週出現第一個關鍵判斷：要不要為北美修改配方？消費者測試顯示，台灣原味的甜度偏低，北美使用者普遍反映「不夠味」。調整配方會多花 3 週認證時間，但通路採購最在意首月數據——首月數字不漂亮，Costco 會直接取消供應商資格。與其搶那 3 週，不如用對配方。`
   - `配方微調、FDA 設施登記與標示在地化同步進行。第三個月，先在亞馬遜投放 500 件測試消費者反應，數據優於預期。`
3. heading `走進採購會議室，把條件談到品牌撐得住`; image costco-health-3 alt `會議桌上討論合約條件`
   - `第四個月，鹿飛透過既有通路關係，直接把品牌帶進 Costco 採購評估流程。`
   - `原合約包含 60 天付款週期與 5% 行銷分攤。5% 行銷分攤在 Costco 屬業界標準，但 60 天付款會壓垮品牌的現金流。鹿飛以「首批訂單保證交期」作為籌碼，換到 45 天條款——這個差距，讓品牌未來 12 個月少借了 800 萬週轉金。`
4. heading `首批出貨遇上塞港，守住第一次的信任`; image costco-health-4 alt `機場地勤正在裝載空運貨物`
   - `第五個月，首批貨遇上美西港口塞港。延遲上架會影響往後所有合作機會；改走美東港口，又會再晚 2 週。`
   - `鹿飛的判斷是空運補救。毛利損失約 6%，但保住了「第一次合作就準時」的信任資本——這份信任，在第二批訂單的談判上遠比 6% 毛利值錢。`
5. heading `6 個月，120+ 家門市同步上架`
   - `從啟動到產品正式在北美 Costco 門市上架，前後 6 個月。首月銷量超過預期 40%，品牌知名度在北美華人社群迅速擴散。`
   - `目前已進入第二批訂單，並開始洽談加拿大 Costco。`

**electronics-tariff**
1. `25% 的額外關稅，把毛利打成負數`; image electronics-tariff-1 alt `產線上排列整齊的電子電路板`
   - `中美貿易戰讓這家電子大廠的美國出貨成本暴增，25% 的額外關稅直接吃掉利潤。工廠在大陸、客戶在美國，短期內無法完全搬遷產線。`
   - `客戶的降價要求已經讓毛利轉負，再不動，訂單就會流失——而手上幾乎沒有 6 個月以上的緩衝期。`
2. `四個候選產地，用同一把尺打分`; image electronics-tariff-2 alt `胡志明市西貢河上的貨櫃船`; `showStageLinks: true`
   - `鹿飛先盤點所有可行的轉移方案：越南、印度、墨西哥、馬來西亞，從成本、時效、風險三個維度打分。`
   - `墨西哥有 USMCA 免關稅的優勢，但客戶需要的元件在當地供應鏈不足，等於要把整條供應鏈拉過去；印度長期潛力大，但基礎設施不成熟，時程與風險都太高。越南海運雖然略長，卻能靠直飛美西縮短整體時程，加上既有的組件廠生態，轉移成本最低。`
   - `最終建議將部分組裝線移至越南，利用 CPTPP 框架降低關稅負擔，並重新規劃物流路線：從越南直接出貨到美國西岸港口，減少中轉環節。`
3. `寧可多付一段成本，也不讓訂單斷線`; image electronics-tariff-3 alt `港口岸邊的貨櫃起重機`
   - `完全切換到越南有交期風險：新廠良率不穩時，客戶訂單就會中斷。鹿飛建議兩條產線並行 6 個月作為保險；短期成本較高，但任一條線出問題都有備援。`
   - `這個保守的選擇事後證明是對的——越南廠在第 3 個月確實發生一次品質事故。`
4. `4 個月建廠，一年省下 200 萬美金`
   - `越南產線在 4 個月內完成設置，並通過客戶驗廠。整體關稅成本降低 15%，物流時效反而縮短 3 天，年節省成本超過 USD 200 萬。`
   - `客戶的美國訂單不但保住，還因為交期優勢拿到了新的 SKU。`

**shoe-brand**
1. `200 萬行銷預算，半年只換回 50 萬營收`; image shoe-brand-1 alt `工作檯上的手工皮鞋`
   - `這家台灣皮鞋品牌在國內市場穩定，進入美國時卻發現：皮鞋在亞馬遜上競爭極為激烈，前 20 名賣家都是知名國際品牌；加上尺寸問題，皮鞋的退貨率高達 30%。`
   - `品牌投入了 200 萬台幣的行銷預算，半年只換回 50 萬營收，投入與回報完全不成比例。`
2. `數據裡藏著一個被忽略的品項`; image shoe-brand-2 alt `摺疊整齊的襪子商品`; `showStageLinks: true`
   - `鹿飛深入分析亞馬遜品類數據後發現：品牌原本只當作搭配商品的「機能襪」，搜尋量高、競品少、退貨率極低，平均售價 $15–$25 美金，正好落在良好價帶。`
   - `資料也顯示，皮鞋的 CAC 是襪子的 4.2 倍；而襪子因為回購率高，LTV 反而更高。`
3. `兩小時的會議，把數字攤在桌上`; image shoe-brand-3 alt `貼好標籤、準備出貨的紙箱`
   - `品牌方一開始堅持先推皮鞋：「我們叫某某鞋業，不賣襪子很奇怪。」這是可以理解的情感反應。鹿飛用一場兩小時的會議，把 CAC 與 LTV 的數字攤在桌上，最後品牌方同意「先用襪子賺到進場票」。`
   - `第二個月，襪子正式上架。面對要不要降價 20% 衝銷量，鹿飛判斷問題不在價格，而在產品頁的說服力：襪子售價已在競品低位，再降只會進入血海。於是維持價格，加強 listing 優化，並推出組合包提升 AOV——效果更好，毛利也保住了。`
4. `三個月，3 倍營收、4.7 星評價`
   - `襪子品類上線三個月內，營收達到皮鞋品類的 3 倍，退貨率僅 2%。品牌評價迅速累積到 4.7 星，為後續皮鞋品類建立了品牌信任基礎。`
   - `到了第六個月，皮鞋銷量也因為品牌認知累積而成長 120%。`

**bubble-tea**
1. `第三次進馬尼拉，前兩次都敗在夥伴`; image bubble-tea-1 alt `櫃檯上的珍珠奶茶`
   - `這個台灣珍奶品牌想進入菲律賓，卻面臨多重挑戰：當地已有大量珍奶品牌，包括日出茶太、COCO、麥吉、Tiger Sugar；原物料供應鏈不穩定，加盟模式也水土不服。`
   - `前兩次嘗試都因為找不到合適的在地夥伴而失敗——第一次被合資夥伴拿走了配方，第二次進了馬尼拉錯的區域。`
2. `低價打不過規模，高端市場又太窄`; image bubble-tea-2 alt `馬尼拉都會區的商業大樓街景`; `showStageLinks: true`
   - `鹿飛先做了菲律賓珍奶市場的深度調研：競品集中在低價帶，打不過日出茶太的規模；高端精品在馬尼拉市場又不夠大。中高端價位帶 P150–200 競品少，同時符合目標客群——25–35 歲白領——的消費能力。`
   - `消費者研究裡有一個關鍵訊號：這個客群對「台灣正統」有明確的 premium 感知，願意多付 20–30% 換取品質保證。`
   - `產品線也依菲律賓的消費習慣調整：甜度偏高，並加入 ube 等在地特色口味。`
3. `第一家店開在 BGC，當成行銷投資`; image bubble-tea-3 alt `Taguig 市 BGC 一帶的天際線`
   - `第二個月，透過鹿飛在馬尼拉的商會關係，從 6 組候選夥伴中篩選出 1 組可靠的合資夥伴。供應鏈同步建立：珍珠從台灣直送，茶葉在地採購。`
   - `第三個月，首家店開在 BGC。BGC 是租金最貴的中央商業區，但客群精準、媒體曝光度最高；第一家店是招牌，也是未來加盟商的參考樣板。鹿飛說服品牌方把這筆租金當成行銷預算，而不是單店損益。`
4. `核心直營、外圍加盟`; image bubble-tea-4 alt `手搖飲門市內的櫃檯與店員`
   - `第四到第八個月，陸續開設 3 家直營門市，測試不同商圈。第六個月面臨擴張模式的選擇：純直營太慢、資本壓力大；純加盟品質容易失控。`
   - `最終採用混合模式：核心商圈直營，保留樣板與定價權；外圍以加盟快速鋪點，並用「首年績效評核」機制，過濾想賺快錢的加盟商。`
5. `一年 10 家門市，單店營收是台灣的 1.2 倍`
   - `一年內開設 10 家門市，其中 6 家為加盟店。單店月均營收達到台灣門市的 1.2 倍，品牌在馬尼拉都會區建立了穩定的消費者基礎。`
   - `目前正在評估擴展到宿霧與達沃市。`

Do not modify `quote` (customer's own words stay verbatim, including 「Aaron 的團隊」).

## 3. Case detail (`CaseDetailPage.tsx`) — #51 #52 #53 #54 (DECISIONS §C-7)
- Hero: `<section className="lufe-hero bg-navy text-white">` + `<HeroBackdrop src={caseItem.heroImage} video={HERO_VIDEOS[\`case:${caseItem.slug}\`]} />` (full-bleed, 100svh like other heroes; remove the old `opacity-[0.25]` image + gradient). Content in `lufe-container lufe-hero-content pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]`: breadcrumb, tags, `h1`, summary (`lead !text-white/75`), stats with `data-lufe-counter` on each value (`num`).
- Replace the three challenge/approach/result blocks with the story:
  - White section; for each chapter (index i): wrapper `mx-auto max-w-[680px]`; chapter number `String(i+1).padStart(2,"0")` (`num text-[13px] text-gold-d`), heading `h2` with class `h3 mt-2 text-tx`, paragraphs `mt-5 text-[17px] leading-[1.95] text-tx2` (first paragraph `mt-6`).
  - If `showStageLinks`: render the existing stage-link chips row after the paragraphs.
  - If `image`: `<figure className="mx-auto my-12 max-w-[980px]">` with `TieredImage` (`aspect-[3/2] w-full object-cover`, `sizes="(max-width: 1024px) 100vw, 980px"`, lazy) and `<figcaption className="mt-3 text-[13px] text-tx3">{alt}</figcaption>`.
  - Chapters separated by `mt-16`.
- Remove the "過程中做過的判斷" section (data stays in `cases.ts`).
- Keep the timeline, quote, CTA, related cases. CTA paragraph drop final `。`: `每個案子的起點都是一場對話。聊聊你的狀況，鹿飛會說明這個故事裡哪一段跟你最相關`.

## 4. Cases list (`CasesPage.tsx`) — #49 #50
- h1 line 1 `每一個判斷，`, line 2 `<span className="text-gold">都有案例可以對照</span>`
- lead (`whitespace-pre-line`): `在菲律賓與北美，鹿飛走過三條不一樣的出海路徑\n以下是其中幾個關鍵決策的完整過程`
- `CASE_ROADS`: add an `icon` per road (`SproutIcon`, `SlidersIcon`, `PackageIcon`), rendered as a 40×40 square `grid place-items-center border border-gold/25 bg-gold/10 text-gold-d` above the `第一條…` label; same hover as WO-A (`[@media(hover:hover)]:group-hover:bg-gold/15`). Drop final `。` in `body`/`lesson` strings.
- Other copy: drop final `。` per §C-2 (e.g. `先做 2 分鐘處境比對，鹿飛告訴你最像哪一個案例`, `聊聊你的產品，鹿飛先幫你看比較像哪一條路`, `這個組合暫時沒有案例。試試調整篩選條件` — note `我們` → `鹿飛` in the two CTA sentences).

## 5. Field notes (`FieldNotesPage.tsx`) — #57 #58
- Delete the sections "別人怎麼說我們" (media mentions) and "一起做事的夥伴網絡" (partner logos) entirely, and the now-unused imports.
- Hero stats: keep only `場活動現場` and `篇現場筆記` (grid `grid-cols-2 md:max-w-[420px]`).
- Full-stop sweep on the remaining page copy (leads/descriptions), §C-2.

## Tests
- `tests/components/cases/case-detail.test.ts`: for every case, every `story` heading, paragraph and image alt is in the static markup; `過程中` heading absent; hero contains the poster `<img` and no `<video`; every `story` image file and its tiers exist in `public/`.
- For every case, extract the numeric part of each `stats[].value` (`/\d+(?:\.\d+)?/`, e.g. `+40%`→`40`, `$200萬`→`200`, `4.7★`→`4.7`) and assert it appears in the joined story text (guards against lost facts).
- `tests/components/cases/cases.test.ts`: new h1 strings; three road `<svg` icons.
- `tests/components/field-notes/field-notes-page.test.ts`: `別人怎麼說我們` and `一起做事的夥伴網絡` absent; `次媒體露出`, `個合作單位` absent.

## Verification
COMMON.md steps 1–8. Screenshot paths: `/cases /cases/costco-health /cases/electronics-tariff /cases/shoe-brand /cases/bubble-tea /field-notes`. `/cases/[slug]` must remain `●` (SSG) in the build table.
