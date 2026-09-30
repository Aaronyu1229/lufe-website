# lufe.world v5 改版：定案總表（2026-09-30，Aaron 已逐項同意）

這份是 v5 改版的**唯一權威**。文案文件與原型有出入時，照這份判斷。

## 0. 資料來源與優先順序

1. 本文件（DECISIONS.md）
2. `prototype/after.html`：**最終樣子**。所有網站文字都已經在裡面，而且已套用下面的所有決定。找字、找結構先看它。
   - 原型用 hash 切頁：`after.html#product-testing`。每頁是 `<main class="page" id="p-頁名">`。
   - 原型裡 `.designnote`、`.vtag`、`.verify`、`.note`、`.pending` 是審稿標註，**不上網站**（after.html 已用 CSS 隱藏）。
   - 原型左下角的「大圖遮罩」切換器、最上方深色「AFTER · v5」列是原型工具，**不上網站**。
3. `copy/01_v4_story.md`（首頁、服務總覽、全站）、`copy/02_v4.1_inner.md`（五個方案頁、案例、洞察、關於）、`copy/03_v4.1_advanced.md`（運營優化、方法論）。反引號與程式碼區塊裡的字＝網站上的字，一字不改。
4. `prototype/compare.html`：Before／After 逐層對照，每層列出設計改了什麼。

## 1. 已定案的決定

| # | 決定 |
|---|---|
| D1 | 首頁不放「貨到了之後」「來自躍馬企業」兩個獨立小標。**章節標籤（例：`第一個月 · 品測`）保留**。其他地方一律不加大標題上方的小字（2026-09-30 已全站拿掉）。 |
| D2 | 四章用月份：第一個月／第三個月／第九個月／之後的每一天。 |
| D3 | 首頁 FAQ 區塊標題：`你可能想先問的三件事`。 |
| D4 | 文章分章（見 §3）。 |
| D5 | `/insights/vietnam-market-entry-guide` 301 → `/insights/southeast-asia-ecommerce-2026`，列表不再出現。 |
| D6 | 關於我們保留原站的 TradePilot 科技工具卡、「不拿股權、不投資」「不賣課、不收招生費」；拿掉「不做行銷代操」。 |
| D7 | 關於我們網絡橫幅字：`30+ 國家 · 500+ 出口案件 · 42 年國際物流`。 |
| D8 | 方法論 Costco 評分例子保留，**加上**原站那句「實際結果：6 個月上架，首月銷量超標 40%」。四篇個案照現況掛著（Aaron：可以，放上去）。 |
| D9 | v4.1 的承諾句都保留：每支產品至少六個數據來源、第一次談完給一頁建議、客服工作台與月報、30 分鐘免費評估。 |
| D10 | 運營優化用軟版：物流「盤完通常都有可省的空間，數字第一次談給你範圍。」；集客拿掉「自然流量平均成長 200%+」改「目標是讓 AI 回答時有你的名字。」；營運系統「目標是新人第一天就知道東西在哪、事情怎麼跑。」；診斷報告不寫頁數。 |
| D11 | 維持方正直角，不做圓角。 |
| D12 | 各頁大圖照片：見 §4。 |
| D13 | 大圖遮罩：**只在文字側**（左側漸層＋底部淡漸層；手機改由下往上）。數值照 after.html `html[data-scrim="local"]` 那組。 |
| D14 | 每一頁打開就是一整張圖：大圖從頁面最頂端開始、`min-height:100svh`，導覽列透明浮在大圖上，捲過大圖才變毛玻璃（跟 2026-09 正式站首頁一樣）。 |
| D15 | 延伸閱讀：某章沒有文章就**整塊不顯示**。第一批 8 篇待寫文章先不寫。 |
| D16 | 原站說法保留：TradePilot 2,400+ 用戶、英文老師等級、北美團隊。 |
| D18 | 現場紀錄的待補項目「媒體專訪 · 二代與出海」先放著不動（Aaron 2026-09-30）；全站「二代」檢查排除 `src/data/fieldNotes.ts`。 |
| D17 | 海外客服登記表多兩個欄位：每月大概幾封客訊（`<100`／`100～500`／`500 以上`）、現在誰在接（自由填）。 |

## 2. 網址

| 動作 | 網址 |
|---|---|
| 保留 | `/`、`/services`、`/services/product-testing`、`/services/localization`、`/services/optimize`、`/services/methodology`、`/about`、`/cases`、`/cases/[slug]`、`/insights`、`/insights/[slug]`、`/contact`、`/assess`、`/resources/**`、`/field-notes` |
| 新增 | `/services/consignment`、`/services/call-center`、`/services/north-america` |
| 301 | `/services/channel-entry` → `/services/north-america`；`/services/market-assessment` → `/services/product-testing`；`/insights/vietnam-market-entry-guide` → `/insights/southeast-asia-ecommerce-2026` |
| 不動 | `/assess`、`/cases/[slug]` 內文、`/resources/**`、`/field-notes`、`/contact` 版面 |

sitemap 要同步：加三個新頁、拿掉兩個轉走的舊頁與越南文章。

## 3. 文章分章（洞察六個主分類＋各方案頁延伸閱讀）

| 章 | 文章 slug |
|---|---|
| 第一個月：市場與品測 | `go-no-go-framework`、`first-time-export-checklist`、`product-testing-best-practices` |
| 第三個月：通路與證 | `tradepilot-tariff-tutorial` |
| 第九個月：落地與團隊 | `manila-beverage-first-store-90-days` |
| 之後的每一天：客服與營運 | （目前沒有 → 延伸閱讀不顯示；洞察頁該分類顯示空狀態） |
| 北美市場 | `us-fda-registration-guide`、`amazon-category-analysis` |
| 補助與活動 | `overseas-exhibition-subsidy-115-upgrade` |
| 只當標籤、不進主分類 | `southeast-asia-ecommerce-2026`、`china-tariff-relocation-strategy` |

- 舊分類（菲律賓、東南亞趨勢、北美市場、出海實戰、企業體質）保留為文章卡上的標籤，不刪文章。
- 資料庫（Ghost 相容 API）發的新文章：用 tag 對應章節，tag 名稱就是章節名（例：`第一個月：市場與品測`）；沒有章節 tag 的只出現在「全部」。
- 單一來源：`src/data/chapters.ts`。

各方案頁延伸閱讀：品測→第一個月；寄賣→第三個月；公司落地→第九個月；海外客服→之後的每一天（目前隱藏）；北美通路→北美市場；運營優化→之後的每一天（目前隱藏）。最多 3 篇，新到舊。

## 4. 大圖照片（Pexels License，可商用；下載後放 `public/images/v5/`，轉 webp，1600／2400 兩種寬度）

| 頁 | Pexels ID | 內容 |
|---|---|---|
| 首頁、服務總覽、關於我們 | — | 沿用現有圖／影片 |
| 品測 | 8545635 | 兩位女性在桌邊看資料（`background-position:center 35%`） |
| 寄賣 | 4487383 | 倉庫貨架走道 |
| 公司落地 | 21563946 | 夜裡的茶飲店（center 40%） |
| 海外客服 | 7709179 | 亞洲客服團隊（right center） |
| 北美通路 | 11835349 | 量販賣場 |
| 運營優化 | 4484075 | 拿平板的倉庫主管（70% 30%） |
| 方法論 | 5302808 | 地圖與指南針 |
| 案例 | 10869666 | 馬尼拉天際線（center 60%） |
| 洞察 | 5951549 | 筆記本與咖啡 |

下載網址：`https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?auto=compress&cs=tinysrgb&w=2400`

## 5. 設計層（apple-design，第三波才做）

照 `prototype/after.html` 末段的 CSS／JS，用站內既有的 `src/lib/motion`（spring、project、rubberband、draggable）實作，不另外裝套件：
- 字距依字級：display -0.028em／h1 -0.022em／h2 -0.016em；行高 1.08／1.10／1.16。
- 按下回饋：按鈕 `:active scale(.97)`、卡片 `scale(.985)`；hover 浮起 3px（只在 `(hover:hover)`）。
- 材質：導覽列深色毛玻璃（在大圖上透明）、下拉選單淺色毛玻璃從觸發點長出、章節列淺色毛玻璃；陰影只在底下有內容時出現。
- 章節列（四個方案頁 hero 下方，sticky）、下一章卡、延伸閱讀。
- FAQ 彈簧展開（可中途反向）、洞察分段控制滑動底塊、關於我們橫向卡片拖曳吸附＋橡皮筋、品測報告紙傾斜、方法論分數條長出、首頁時間軸隨捲動填色。
- 「聊聊」表單改成底部抽屜（往下拖關閉）。**必須保留 `/api/lead` 送出流程**。
- 手機底部浮動 CTA。
- `prefers-reduced-motion`／`prefers-reduced-transparency`／`prefers-contrast` 都要有對應。

## 6. 全站檢查（build 後）

- 網站原始碼與產出 HTML 搜尋下列字，應為 0 筆（例外見 D18）：`接班人`、`二代`、`第二代`、`陳執行長`、`印尼市場`、`越南市場進入`、`42+ 年國際物流實戰`。
- `MBCPR` 只能出現在 `/services/methodology`（以及文章內文）。
- 改了中文就要 `npm run font:rebuild`（主控統一做，Codex 不提交字型檔）。

## 7. 施工規則（寫進每張工單）

- 整合分支 `redesign/v5`。每條線從它開分支、開 PR 回它；**不准碰 main、不准自己合併**。
- 只准改工單列的檔案。真的需要改別的就停下來，在 PR 說明。
- 建置排隊：`mkdir /tmp/lufe-build.lock` 拿鎖，做完 `rmdir`；**只准 mkdir／rmdir，不准 lockf／flock**。vitest 一律 `--maxWorkers=2`。
- 不提交 `src/app/fonts/**`；字型守門擋下就在 PR 列出缺字。
- 收合、切換的文字必須在伺服器 HTML 裡。
- 同時最多 2 個 Codex。
