# 工單 WO-A：首頁＋全站文字（v5 第一波）

你在 `~/dev/lufe-v5-a`（git worktree，分支 `v5/a-home-global`，從 `redesign/v5` 開出）。
先讀 `docs/redesign-v5/DECISIONS.md`，再讀 `docs/redesign-v5/copy/01_v4_story.md` 第 1～9 節。
最終樣子：用瀏覽器開 `docs/redesign-v5/prototype/after.html#home`（原型；文字與區塊順序以它為準）。

## 這一波只做「文字、區塊、資料」，不做設計層
- 沿用網站現有的元件、樣式、版面語言（方正、現有色票、現有字級 class）。
- **不要**做 after.html 裡的動態效果、毛玻璃、全滿大圖、遮罩漸層、底部抽屜——那是第三波。
- 但是區塊的**結構**要照原型（例如四章四張卡、三條路三張卡、星期一到四四格、對比表五列）。

## 只准改這些檔案
- `src/app/layout.tsx`（只改 metadata：title／description／keywords／openGraph／twitter 的文字）
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/components/home/**`、`src/app/page.tsx`
- `tests/components/home/**`，以及因為 Navbar／Footer 改動而需要更新的測試
- 需要新元件就新增在 `src/components/home/` 底下
其他檔案一律不准動（尤其 `src/data/**`、`src/lib/**`、`src/components/ui/**`、`globals.css`、`src/app/fonts/**`）。

## 要做的事

### 1. 全站（v4 第 1 節）
- `<title>`／og:title：`鹿飛 LUFÉ — 貨到了之後，我們接著走｜台灣品牌進菲律賓`
- description／og:description／twitter description：v4 第 1 節 meta description 原文。
- keywords：v4 第 1 節原文（逗號分隔）。
- 導覽列（桌機下拉＋手機選單都要改）：
  - 「服務」五項，照順序，連結與副標照 after.html 的 `.drop`：品測 `/services/product-testing`、寄賣 `/services/consignment`、公司落地 `/services/localization`、海外客服 `/services/call-center`、北美通路 `/services/north-america`。
  - 新增「進階」兩項：運營優化 `/services/optimize`、鹿飛方法論 `/services/methodology`。
  - 案例、洞察、關於我們：**內容不動**（洞察選單裡的主題分類 icon 不動）。
  - Navbar **不准再 import `@/data/services`**：服務選單的五項直接寫在 Navbar 裡（因為另一條線會改服務資料）。
- Footer 一句話：v4 第 1 節原文。
- 導覽列桌機「服務」下拉原本的四階段／進階方案結構整個換掉。

### 2. 首頁（v4 第 2～9 節＋DECISIONS D1、D3）
依序：
1. Hero：**三張文字完全不動**。底下三顆標籤的連結改成：產品適配性 → `#chapters`（四章區塊）；通路銷售力 → `#chapter-2`（四章的第二張卡）；基石 → `#jumping`（躍馬區塊）。
2. 新增「貨到了之後」開場段：標題＋場景內文（v4 §3）。**不放小標**（D1）。最後三句加粗。
3. 四章區塊 `id="chapters"`：標題、引言（v4 §4）、四張卡（每張有章節標籤、標題、場景段、我們做的、價格、連結）、卡片上方的四點時間軸（第一個月／第三個月／第九個月／之後的每一天）、卡片下方的起手包條、再下一行北美連結。取代原本的三支柱區塊（`PositioningBand` 裡的三支柱卡片）。第二張卡 `id="chapter-2"`。
4. 躍馬區塊 `id="jumping"`：v4 §5 標題、內文、三個數字（標籤改成 `躍馬企業 · 年國際物流實戰`／`躍馬企業 · 出口實戰案件`／`國家與地區覆蓋`）、「我們相信的事很簡單」小段。**不放「來自躍馬企業」小標**（D1）。
5. 案例區：v4 §6 標題；引言改成「三條路」三張卡（after.html 首頁 `.roads`）；四張個案卡本體不動。
6. 新增「讀到一半想深入的，這裡有」：三張**最新**文章卡＋「看所有文章 →」連到 `/insights`。資料用洞察頁現有的取文章方式（讀 `src/app/insights/page.tsx` 怎麼拿，照做；只讀不改那些檔）。排除 `vietnam-market-entry-guide`。
7. 一份合約：v4 §7 標題、內文（星期一到四做成四格）、對比表五列（欄名 `品測與寄賣／落地與客服／國際物流`）、表下一句。**陳執行長證言整段拿掉**。
8. FAQ：區塊標題 `你可能想先問的三件事`；三題照 v4 §8（副標、內文換行照原文）。
9. CTA：標題不動，副標換 v4 §9。
- 首頁其他現有區塊（補助快訊條等）如果 after.html 沒有，就拿掉；有疑問就在 PR 裡列出，不要自己猜。

### 3. 全站字眼
改完後在 `src/` 搜尋：`接班人`、`二代`、`第二代`、`陳執行長`、`印尼市場`、`越南市場進入`、`42+ 年國際物流實戰`。**你負責的檔案裡**要是 0 筆；其他檔案有的，列在 PR 說明，不要去改。

## 驗證（全部要做，數字寫進 PR）
1. `npm ci`（worktree 第一次要裝）。
2. `npx tsc --noEmit`、`npx eslint src`。
3. `npx vitest run --maxWorkers=2`：更新你改到的測試，新區塊要有測試（文字在伺服器 HTML 裡）。
4. 建置：`until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done; npm run build; rmdir /tmp/lufe-build.lock`（**只准 mkdir／rmdir**）。字型守門（prebuild 的 check-font-subset）擋下時：**不要**跑 font:rebuild、不要提交字型檔、不要想辦法繞過守門——直接在 PR 列出它說缺的字，其餘驗證照做（tsc／lint／test 必須綠）。
5. `git status` 必須乾淨、commit 全部推上去。

## 交付
- commit 訊息用 `feat: ...`／`refactor: ...` 格式，結尾加一行 `Co-Authored-By: Codex <noreply@openai.com>`。
- `git push -u origin v5/a-home-global`，`gh pr create --base redesign/v5 --title "v5 A：首頁＋全站文字" --body ...`（body 列：改了哪些區塊、測試數字、字型守門缺字清單、搜尋字眼結果、有疑問的地方）。
- **不准合併、不准碰 main。**
