# 工單：首頁文案三件（Aaron 2026-10-01 拍板 4A／5A／6B）

工作目錄 `~/dev/lufe-copy2`，分支 `fix/home-copy-4a5a6b`（從 main）。
**文字必須逐字照抄下面的內容**，不准潤飾、不准加減標點。不准動容器 max-w／px。

## 4A｜首頁四章卡片精簡（`src/components/home/PositioningBand.tsx`）
每張卡只留：月份小標 → 正式名稱（h3）→ 一句副標 → 連結。刪除 scene、detail、price、priceDetail 的顯示（`Chapter` 型別一併精簡，刪掉不再用的欄位）。卡片高度變矮是預期的；排版保持現有字級層級（小標 13px 金色、h3 現有樣式、副標用原 scene 的 15px `text-tx2`）。

| 月份小標 | h3 | 副標 | 連結（不變） |
|---|---|---|---|
| 第一個月 | 市場探查 | 在當地找真實消費者試用，確認誰會買、願意付多少。 | 看市場探查怎麼做 → |
| 第三個月 | 試銷寄賣 | 電商上架與產品證同步進行，用實際銷售驗證市場。 | 看寄賣包內容 → |
| 第九個月 | 在地設立 | 公司註冊、人員招聘、FDA 證照轉移，建立當地據點。 | 看落地怎麼做 → |
| 之後的每一天 | 海外客服 | 由菲律賓專業團隊接手英文客服，品質由台灣端管理。 | 登記首批 → |

卡片下方「出海起手包 7 萬…」那段說明保留不動。時間軸與 hover 金線行為保留。
`id="chapter-2"` 保留在第二張卡上（別處有錨點連過來）。

## 5A｜北美那一行
- `src/components/home/PositioningBand.tsx` 連結文字改為：`產品已具備規模、準備進入北美零售通路？了解北美市場拓展 →`
- `src/components/services/ServicesPage.tsx` 大圖引言裡的句子 `北美通路是另一個故事，由北美團隊執行。` 改為 `北美零售通路另由北美專責團隊規劃執行。`
- `src/data/chapters.ts` 的 label `另一個故事 · 北美貨架` 改為 `北美市場拓展`
- `src/components/services/ChapterPage.tsx` 北美頁頂部那條說明改為：`<strong className="text-tx">北美市場拓展。</strong> 本頁服務與菲律賓四章各自獨立，由北美專責團隊規劃執行，鹿飛負責合約與進度。`
- 其餘有「北美團隊」字樣的（關於我們、chapters 第 407 行）不要動。

## 6B｜「四十二年」段落改成貨櫃視角（`src/components/home/JumpingSection.tsx`）
標題（第二行金色，沿用現有結構）：
```
一只貨櫃的
後半段旅程
```
內文（`\n` 是換行，`\n\n` 是空一行，沿用現有 whitespace-pre-line 寫法）：
```
一只貨櫃離開台灣，躍馬企業負責把它準時送達——\n這件事，已經做了 42 年、500 多個案件、30 多個國家。\n\n抵達之後，它的故事才開始分岔：\n有的品牌在當地開了第二家店；\n更多的，幾個月後原封不動地退回，或從此沒有下文。\n\n運輸從來不是分水嶺，貨都送到了。\n分水嶺在於，抵達之後有沒有人接手。\n\n鹿飛，是為了這後半段旅程而成立的。
```
右欄數字與「我們相信的事很簡單」不動。

## 測試與驗證
- 更新／新增測試：首頁四章卡片的 h3 與副標逐字等於上表、卡片內不再出現原 scene 文字（例如「馬尼拉的媽媽」不在首頁 HTML 裡）；JumpingSection 標題與內文逐字；「另一個故事」在 `src/` 中出現 0 次。
- `npm ci`；`npx tsc --noEmit`；`npx eslint src`；`npx vitest run --maxWorkers=2`。
- 建置：`until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done; npm run build; rmdir /tmp/lufe-build.lock`（只准 mkdir／rmdir）。**若字型守門因新中文字擋下 build，不要自己跑 font:rebuild，照實寫在 PR 裡，主控處理。**
- commit 結尾 `Co-Authored-By: Codex <noreply@openai.com>`；`git push -u origin fix/home-copy-4a5a6b`；`gh pr create --base main --title "copy: 首頁四章精簡、北美用詞、貨櫃視角"`。**不准合併。**
