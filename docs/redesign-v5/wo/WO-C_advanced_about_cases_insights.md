# 工單 WO-C：運營優化＋方法論＋關於我們＋案例＋洞察（v5 第二波）

你在 `~/dev/lufe-v5-c`（git worktree，分支 `v5/c-inner`，從 `redesign/v5` 開出；第一波 A、B 已經合進去）。
先讀 `docs/redesign-v5/DECISIONS.md`，再讀：
- `docs/redesign-v5/copy/03_v4.1_advanced.md`（運營優化、方法論，**整份**）
- `docs/redesign-v5/copy/02_v4.1_inner.md` 第 3.1（案例）、3.2（洞察）、3.3（關於）
最終樣子：瀏覽器開 `docs/redesign-v5/prototype/after.html#optimize`、`#methodology`、`#cases`、`#insights`、`#about`。**文字以原型為準**（原型已套用 DECISIONS D6、D7、D8、D10）。

## 這一波只做「文字、區塊、資料」，不做設計層
- 沿用網站現有元件與樣式語言（方正、色票、字級 class、`src/components/ui` 的 `Disclosure`／`Segmented`／`Carousel` 照原本用法）。
- **不要**做毛玻璃、全滿大圖、遮罩漸層、彈簧、拖曳、分數條動畫——第三波才做。
- 區塊**結構**照原型。

## 只准改這些檔案
- `src/components/services/OptimizePage.tsx`、`src/components/services/MethodologyPage.tsx`、`src/app/services/optimize/**`、`src/app/services/methodology/**`
- `src/components/about/**`、`src/app/about/**`
- `src/components/cases/**`、`src/app/cases/**`
- `src/components/insights/InsightsPage.tsx`、`src/app/insights/page.tsx`
- `src/data/services.ts`（只准做第 6 點的清理）
- `src/components/services/StagePage.tsx`（沒人用就刪）
- 對應的 `tests/**`
**不准動**：`src/data/chapters.ts`（只准 import；真的缺東西就在 PR 說明）、`Navbar`、`Footer`、`layout.tsx`、`src/components/home/**`、其他服務頁、`src/app/api/**`、`src/lib/**`、`src/components/ui/**`、`globals.css`、`src/app/fonts/**`、文章內文（`src/data/articles.ts` 的 html 內文不准改）。

## 要做的事

### 1. 運營優化 `/services/optimize`（補件第 1 節＋D10）
Hero（章節標籤「進階 · 運營優化」、標題「已經跑起來了，該讓每公里更省」、場景段、按鈕）→ hero 下一行說明（「還沒開始的品牌，先看四章…」，「四章」連 `/services`）→ 五張卡「你大概卡在這五段之一」（每張錨到下面對應段）→ 五段（省不下來／賣得起伏／沒被找到／跑得卡卡／看不見；用 **D10 軟版**，不要出現 12–25%、200%+、90 天縮到 1 天）→ 兩種合作方式（診斷報告**不寫頁數**）→ FAQ 三題 → 延伸閱讀（`CHAPTER_ARTICLES.after`，沒文章就不渲染）→ CTA。
- 「沒被找到」「跑得卡卡」兩段裡，原本服務總覽頁「AI 集客引擎」「海外營運系統五階」的原字已經寫在補件裡，照補件。

### 2. 方法論 `/services/methodology`（補件第 2 節＋D8）
Hero（標籤「方法論」、標題「四個方案，是從這裡長出來的」、場景段）→ 一行說明「這不是第五章…」→ 為什麼要有一張表（最後一句「我們自己的規矩：總分不到 60 分，我們不接。」要做成強調）→ 五個問題（五張卡：維度名＋權重、白話問句、看：…、紅線）→ 分數怎麼讀（四格）→ 五個問題，四章裡誰在回答（對照表，章名連到方案頁）→ 一個評分的例子（Costco；**加上**「實際結果：6 個月上架，首月銷量超標 40%。」D8）→ 五個問題背後，是三件事（三支柱說明：用 `PILLARS` 裡現有的原字）→ FAQ 三題 → 回到四章卡（連 `/services`）→ CTA「免費初步評估」。
- 方法論現有的其他內容（框架全貌、決策樹、實戰範例等）：補件沒提到的，**保留在五個問題與分數之後、三件事之前**，字不動；如果跟補件新內容重複（例如同一張 MBCPR 表出現兩次），留補件版本、刪舊的重複段，並在 PR 列出刪了什麼。

### 3. 關於我們 `/about`（原型 `#about`，原站版面＋v4.1 文字）
**保留原站的版面與圖片**，只換文字（原型已經是這個結果，照它）：
- Hero：原本的大標、引言「別人幫你開車，我們幫你找路。」、創辦人照片區塊文字換成 v4 創辦人卡（`鹿飛 LUFÉ 創辦人・來自躍馬企業`／`看了很多年貨櫃出去，決定去接貨到了之後的事。`），三個數字標籤改 `躍馬企業 · 年國際物流實戰`／`躍馬企業 · 出口實戰案件`／`國家與地區覆蓋`。
- 創辦故事三張圖卡：v4.1 3.3 #story 全文照段落拆進三張（第一張「看到的問題」、第二張「想通的事」、第三張「做了什麼」），字不改。
- 團隊：原站標題、引言、註腳保留；三張卡換 v4.1（台灣核心／菲律賓合作夥伴／北美團隊），拿掉卡上的規模小字。
- 陪跑：標題「你會得到什麼樣的陪跑」＋原站引言；五步照 v4.1。
- 網絡：原站照片橫幅（字改 D7）、原站標題；卡片：北美、東南亞、全球物流三張照 v4.1，第四張保留原站 TradePilot 科技工具（D6）。
- 我們相信的事：四條照 v4.1（原站羅盤背景版面保留）。
- 誠實的邊界：標題「誠實的邊界」＋原站引言；v4.1 四條＋原站「不拿股權、不投資」「不賣課、不收招生費」（D6）；**拿掉**「不做行銷代操」「不做純貿易買賣」「不做純物流運輸」（被 v4.1 取代）。
- 結尾 CTA：原站那塊保留。
- 區塊順序：story → team → how-we-work → network → philosophy → what-we-dont-do → CTA；錨點 id 維持原本名稱。

### 4. 案例 `/cases`（v4.1 3.1）
Hero 換 v4.1 文字 → 新增三條路三張卡（每張有「這條路教我們的事」）→ 處境比對橋（連 `/assess`）→ 四張個案卡**不動** → CTA「你的故事會是哪一條？」。
`CaseDetailPage` 的「這個案子用到的階段」：舊的 `stagesUsed` 對到新方案頁：`market-assessment`、`product-testing` → 品測 `/services/product-testing`；`channel-entry` → 北美通路 `/services/north-america`；`localization` → 公司落地 `/services/localization`；同一頁只列一次。對照寫在 cases 元件裡或 `src/data/cases.ts` 旁的小工具，**不准**改 `chapters.ts`。

### 5. 洞察 `/insights`（v4.1 3.2＋DECISIONS §3、D5）
**保留原站版面**（大圖區的數字列與右側精選卡、篩選列、文章卡的分類／分鐘／摘要／日期／閱讀更多、底部聊聊框），改：
- Hero 文字：標籤「洞察」、標題「每一章讀到一半會想問的事，這裡先寫好」、副標「按你現在在故事的哪一個月找。」；數字列「N 篇實戰文章／6 章節分類／每月 新增更新」。
- 篩選：`全部` ＋ 六個章節（第一個月：市場與品測、第三個月：通路與證、第九個月：落地與團隊、之後的每一天：客服與營運、北美市場、補助與活動），分章用 `chapters.ts`；資料庫文章用 tag＝章節名對應（DECISIONS §3）。空章節顯示現有的空狀態文字。
- 文章卡：分類位置改顯示章節名；舊分類改成小標籤（只當標籤的兩篇顯示在「全部」）。
- `?cat=` 網址參數改用章節 key（例 `?cat=m1`）；舊的中文分類值進來時退回「全部」，不要報錯。
- 越南文章不出現在列表（已 301）。
- 導覽列洞察下拉目前連的是 `/insights?cat=菲律賓` 這類舊值——**不要改 Navbar**，在 PR 說明，由主控處理。

### 6. `src/data/services.ts` 清理
第一波後 `STAGES`／`STAGE_ORDER`／`ACCENT_CLASSES`／`getStage` 如果做完第 4 點後已經沒人用，就刪掉（連同只給它們用的型別與資料）；`PILLARS` 相關保留。刪前 `grep -rn` 全 repo（含 tests）確認。

## 驗證（全部要做，數字寫進 PR）
1. `npm ci`。
2. `npx tsc --noEmit`、`npx eslint src`。
3. `npx vitest run --maxWorkers=2`：每頁重點文字在伺服器 HTML、FAQ／收合內文在 HTML、運營優化沒有 12–25%／200%+／90 天、方法論有「首月銷量超標 40%」、關於沒有「不做行銷代操」、洞察六個章節篩選存在且越南文章不在列表。
4. 建置：`until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done; npm run build; rmdir /tmp/lufe-build.lock`（**只准 mkdir／rmdir，不准 lockf／flock**）。字型守門擋下：不跑 font:rebuild、不提交字型、不繞過，缺字列在 PR；tsc／lint／test 必須綠。
5. `git status` 乾淨、全部推上去。

## 交付
- commit 結尾 `Co-Authored-By: Codex <noreply@openai.com>`。
- `git push -u origin v5/c-inner`；`gh pr create --base redesign/v5 --title "v5 C：運營優化＋方法論＋關於＋案例＋洞察"`，body 列：各頁改了什麼、刪了哪些舊段落、測試數字、缺字清單、疑問。
- **不准合併、不准碰 main。**
