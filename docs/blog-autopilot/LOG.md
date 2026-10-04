# 自動駕駛紀錄（新的在最上面）

## 2026-10-04 每週任務
- 開工檢查：`~/dev/lufe-autopilot/LAST_FAILURE.md` 不存在，無待補項目。
- 排程（空檔由 `blog-schedule.mjs` 給出）：
  - `taiwan-food-export-philippines-steps` → 2026-10-10T09:00:00+08:00（主攻字「食品出口」月量 140；7 個來源）
  - `philippines-food-cosmetic-label-checklist` → 2026-10-13T09:00:00+08:00（主攻字「食品標籤」月量 260，「食品標示規定」260、「化妝品標示」170 為變體；5 個來源）
  - `us-fda-food-import-fsvp-prior-notice` → 2026-10-15T09:00:00+08:00（主攻字「FSVP」月量 70；15 個來源）
- 選題判斷：
  - QUEUE 第 6 題原標「美國 FDA 390」，但既有文章 `us-fda-registration-guide`（保健品）已搶這個字；為避免自家互搶，改以「FSVP」為主攻字、限定一般食品，並在文中連回保健品篇。
  - 三題都不在 jumping.group 的 insights 清單內；出貨報關段落連到躍馬〈incoterms-trade-terms-guide〉。
  - 資訊增益：「食品出口」首頁多為貿易商與美、日題目，無菲律賓逐步流程；「食品標籤」首頁全是台灣本地標示；「FSVP」首頁全是英文，「其他人也問了」有「fsvp是什麼？」，已作為 FAQ 原句。
  - 美國篇引用鹿飛 `/cases/fish-floss-us-fda` 案例頁既有內容，未加寫細節。
- 上週檢查：`philippines-fda-lto-cpr-cpn`（10-03 發布）200、在 sitemap；其餘 13 篇皆 200；`philippines-cpr-transfer-change-importer`、`market-entry-modes-compared` 尚未到 publishAt，404 正確。
- 花費：DataForSEO 約 US$0.096（搜尋量 1 次 0.09＋SERP 3 次 0.006）；查詢前餘額 US$33.26。
- 異常與處理：
  - `npx eslint src` 有 1 個 error：`src/components/about/FreightRateChart.tsx`（react-hooks/set-state-in-effect），來自 main 既有 commit 1217d10，非本 PR 變更；CI 只跑 vitest，依「不改元件」規則未動，請人工處理。
  - 產文期間 main 合併了 PR #160～#162，已 rebase 到最新 main 並重跑字型子集、tsc、vitest、build。
  - ChemLinked 來源對腳本回 403（瀏覽器可開，前一篇已用同一網址）。
- 待查（文中寫「查不到」或未寫）：菲律賓 FDA Circular 2024-004 原文（網站 403，樣品 50 公斤上限等細節未引用，只用服務章程已確認的內容）；進口商名稱地址可否用貼紙加註；菲律賓動物與水產品進口許可（BAI、BFAR）原文；美國食品追溯規則延期的最終規則。

## 2026-10-01 每週任務（第一次執行）
- 排程（空檔由 `blog-schedule.mjs` 給出）：
  - `philippines-fda-lto-cpr-cpn` → 2026-10-03T09:00:00+08:00（主攻字「菲律賓 FDA」月量 10；7 個來源）
  - `philippines-cpr-transfer-change-importer` → 2026-10-06T09:00:00+08:00（主攻字「菲律賓 CPR」，DataForSEO 無量，英文 cpr philippines 10；5 個來源）
  - `market-entry-modes-compared` → 2026-10-08T09:00:00+08:00（主攻字「國際市場進入模式」月量 10；9 個來源）
- 順序：QUEUE 第 1、2 題對調發布（先發 LTO／CPR／CPN 基礎篇，換人篇才能連回去；未發布的文章不能被連結）。
- 上週檢查：13 篇皆 200、皆在 sitemap。尚無已過 publishAt 的排程文章。
- 花費：DataForSEO 約 US$0.19（搜尋量 2 次 0.18＋SERP 3 次 0.006）；查詢前餘額 US$34.68。
- 異常與自行修正：
  - `tests/article-rewrites.test.ts` 寫死「文章共 13 篇」並對每篇渲染頁面（排程中文章會 404），已改為只檢查 PR #72 那 13 篇；引用與 FAQ 檢查仍套用全部文章。
  - `tests/seo/technical-seo.test.ts` 取 `articles[0]`，所以新文章一律加在 `articles` 陣列**尾端**（列表與首頁都依日期排序，不影響顯示）。已寫進 RUNBOOK。
  - 三題的台灣搜尋量都很低（≤10），屬 QUEUE 標註的 GEO 空白區，照寫。
- 待查（寫在文中為「查不到」，下次查證再補）：AO 2024-0016 新費率暫停期滿（約 2026 年中）後是否恢復；蝦皮台灣跨境是否開放菲律賓站。

## 2026-10-01 建立
- 授權：Aaron「一週三篇，我之後不管，你自行修正處理」。
- 節奏：每週二、四、六 09:00（+08:00）。每週日 20:00 產下週三篇；每月 1 號 10:00 成效報告。
- 已發布 13 篇（PR #72）。
