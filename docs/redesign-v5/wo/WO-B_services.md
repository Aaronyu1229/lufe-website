# 工單 WO-B：服務總覽＋五個方案頁＋轉址＋海外客服登記表（v5 第一波）

你在 `~/dev/lufe-v5-b`（git worktree，分支 `v5/b-services`，從 `redesign/v5` 開出）。
先讀 `docs/redesign-v5/DECISIONS.md`，再讀 `docs/redesign-v5/copy/01_v4_story.md` 第 10 節、`docs/redesign-v5/copy/02_v4.1_inner.md` 第 0 節與 1.1～1.5。
最終樣子：瀏覽器開 `docs/redesign-v5/prototype/after.html#services`、`#product-testing`、`#consignment`、`#localization`、`#call-center`、`#north-america`。文字與區塊順序以原型為準。

## 這一波只做「文字、區塊、資料、路由、表單」，不做設計層
- 沿用網站現有元件與樣式語言（方正、現有色票、`h1/h2/h3/lead/body` class、`Disclosure` 等 `src/components/ui` 元件照原本方式使用）。
- **不要**做毛玻璃、全滿大圖、遮罩漸層、彈簧動畫、拖曳、報告紙傾斜——第三波才做。章節列這一波做成**一般的** sticky 橫條（沒有毛玻璃），下一章卡、延伸閱讀做成一般卡片。
- 區塊**結構**照原型：例如品測的四步、報告示意＋三點、價格卡「過了／沒過」兩條；寄賣的雙軌時間軸、五張小卡；公司落地的兩欄表、三條路三張卡；海外客服的四步、為什麼是菲律賓段、登記卡＋表單；北美的四步、誰在做兩欄。
- 大圖照片先沿用各頁現有圖（新照片是第三波）。

## 只准改／新增這些檔案
- `src/data/chapters.ts`（新增）：四章＋北美的資料，以及 DECISIONS §3 的文章分章對照（`CHAPTER_ARTICLES`，章節 key 用 `m1`、`m3`、`m9`、`after`、`na`、`sub`，另匯出只當標籤的 slug 清單）。這是之後洞察頁也會用的**單一來源**，匯出要乾淨、有型別。
- `src/components/services/ServicesPage.tsx`、新增 `src/components/services/` 底下的元件（例如 `ChapterPage.tsx`、`ChapterBar.tsx`、`NextChapter.tsx`、`RelatedReading.tsx`、`WaitlistForm.tsx`）
- `src/app/services/page.tsx`、`src/app/services/product-testing/page.tsx`、`src/app/services/localization/page.tsx`
- 新增 `src/app/services/consignment/page.tsx`、`src/app/services/call-center/page.tsx`、`src/app/services/north-america/page.tsx`
- 刪除 `src/app/services/market-assessment/`、`src/app/services/channel-entry/`（改由 `next.config.ts` 301）
- `next.config.ts`（只加 `redirects()`）
- `src/app/sitemap.ts`
- `src/app/api/lead/route.ts`、`src/lib/leads/repository.ts`
- `tests/components/services/**`、`tests/api/lead.test.ts`，新增的測試
**不准動**：`src/data/services.ts`（別的頁還在用 `STAGES`／`PILLARS`，這一波保持原樣）、`src/components/services/OptimizePage.tsx`、`MethodologyPage.tsx`、`src/app/services/optimize/**`、`src/app/services/methodology/**`（第二波）、`Navbar`、`Footer`、`layout.tsx`、`src/components/home/**`、`src/components/ui/**`、`src/lib/motion/**`、`globals.css`、`src/app/fonts/**`。
`StagePage.tsx` 如果刪掉舊頁後沒人用了，可以刪；還有人用就留著。

## 要做的事

### 1. 服務總覽 `/services`（v4 §10）
Hero（標題、內文、四個數字）、四章四段（每段是可點的列，連到方案頁）、兩個故事兩張卡、躍馬段落、三個關鍵問題（Q2 內文＝首頁 FAQ 01 全文，見 v4 §8）、結尾 CTA。原本的三支柱區塊整個換掉。

### 2. 五個方案頁（v4.1 §1.1～1.5）
四個菲律賓方案頁共用一個版型（`ChapterPage`），順序：
Hero（章節標籤、標題、場景段、按鈕）→ 章節列（四章、目前這章高亮、其他可點）→ 你可能是這樣走到這裡的（三張小卡）→ 本頁核心段 → 你會拿到什麼 → 價格與時間 → FAQ（手風琴，文字要在伺服器 HTML）→ 延伸閱讀 → 下一章卡 → CTA。
每頁核心段照 v4.1 各頁「段 4、段 5…」。
- 品測：四步「品測那一天會發生什麼」、「你會拿到一頁，不是八十頁」（左邊一頁報告的線框示意、右邊三點＋一句）、價格卡（1～2 萬／前 10 家實驗價；過了／沒過兩條）、FAQ 三題、CTA（含「有時候聽完，我們會建議你再等等——那也是一種答案。」）。
- 寄賣：雙軌「證在跑的 6～12 週，我們在做什麼」、「寄賣包裡有什麼」五張、你會拿到什麼、價格、FAQ 三題。
- 公司落地：兩欄表「落地的每一件事，都要有人在當地」（最後一列「你的角色」）、三條路三張直卡（每張有「適合：」）、價格、FAQ 三題。
- 海外客服：hero 標籤「2027 Q1 首批・登記中」、四步「一封信進來之後」、為什麼是菲律賓、為什麼是老師、適合誰、登記卡＋表單（見第 4 點）、FAQ 三題、下一章卡是「故事從頭來 → 第一個月 · 品測」、CTA。
- 北美通路：**不放章節列**，hero 下放一行「這一頁跟菲律賓的四章是兩個故事。北美由北美團隊執行，鹿飛負責合約與進度。」；四步「北美這條路怎麼走」（節點用「步」）、誰在做、價格、「去北美的品牌，第一封英文客訴信也會來。海外客服一樣用得到 →」、延伸閱讀、CTA。
- 延伸閱讀：用 `CHAPTER_ARTICLES` 取該章文章（最多 3 篇，新到舊）。**該章沒有文章就整塊不渲染**（DECISIONS D15）。文章卡的標題、日期、閱讀分鐘、封面圖，照洞察頁現有的取法（讀 `src/app/insights/page.tsx`、`src/lib/articles/presentation.ts`，只讀不改）。
- 各頁 `metadata`：title 用「頁名｜一句話 | 鹿飛 LUFÉ」，description 用該頁 hero 場景段。

### 3. 轉址（DECISIONS §2）
`next.config.ts` 加 `redirects()`，全部 `permanent: true`：
- `/services/market-assessment` → `/services/product-testing`
- `/services/channel-entry` → `/services/north-america`
- `/insights/vietnam-market-entry-guide` → `/insights/southeast-asia-ecommerce-2026`
sitemap：加三個新頁；拿掉兩個舊服務頁；拿掉越南文章（sitemap 怎麼列文章就在那裡排除該 slug）。

### 4. 海外客服登記表（DECISIONS D17）
資料庫**已經**改好（主控做的，你不用也不准碰資料庫）：`lufe.leads.form` 允許 `'waitlist'`；新增欄位 `monthly_volume text`、`current_handler text`。
- 前端 `WaitlistForm`：欄位 品牌名稱（必填）、Email（必填、格式驗證）、每月大概幾封客訊（單選：`<100`／`100～500`／`500 以上`，必填）、現在誰在接（選填，placeholder「例如：老闆自己、台灣客服、還沒人接」）、蜜罐欄位 `website`（照現有表單的做法）。送出 `POST /api/lead`，`form: "waitlist"`。成功／失敗的畫面照現有 `ContactPage` 的做法（失敗要給寄信連結）。
- `/api/lead`：接受 `form: "waitlist"`；驗證 name（品牌名稱）、email、monthlyVolume（只能是那三個值）、currentHandler（≤100 字）；寫入 `lufe.leads`（form='waitlist'、name、email、message 放「海外客服首批登記」、page、monthly_volume、current_handler、user_agent）；通知 payload 的 `source` 用 `海外客服首批登記`，`msg` 內含「每月客訊：…」「現在誰在接：…」。`quick`／`contact` 兩種的行為**完全不變**。
- `repository.ts`：`LeadValues` 加兩個可為 null 的欄位並寫進 INSERT。
- 測試：`tests/api/lead.test.ts` 加 waitlist 的成功、缺欄位、非法 monthlyVolume、蜜罐四個案例；原本的案例要全部照舊通過。

## 驗證（全部要做，數字寫進 PR）
1. `npm ci`（worktree 第一次要裝）。
2. `npx tsc --noEmit`、`npx eslint src`。
3. `npx vitest run --maxWorkers=2`：新頁要有測試（重點文字在伺服器 HTML、FAQ 內文在 HTML、延伸閱讀空章節不渲染、北美沒有章節列）。
4. 建置：`until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done; npm run build; rmdir /tmp/lufe-build.lock`（**只准 mkdir／rmdir，不准 lockf／flock**）。字型守門擋下時：不要跑 font:rebuild、不要提交字型檔、不要繞過守門，把缺字列在 PR；tsc／lint／test 必須綠。
5. `git status` 乾淨、全部 commit 推上去。

## 交付
- commit 結尾加 `Co-Authored-By: Codex <noreply@openai.com>`。
- `git push -u origin v5/b-services`，`gh pr create --base redesign/v5 --title "v5 B：服務總覽＋五個方案頁＋轉址＋登記表"`，body 列：新增／刪除的路由、測試數字、字型缺字清單、有疑問的地方。
- **不准合併、不准碰 main、不准碰資料庫。**
