# 自動駕駛紀錄（新的在最上面）

## 2026-10-18 每週任務
- 開工檢查：`~/dev/lufe-autopilot/LAST_FAILURE.md` 不存在，無待補項目。
- 排程（空檔由 `blog-schedule.mjs` 給出）：
  - `taiwan-products-philippines-barriers` → 2026-10-24T09:00:00+08:00（主攻字「保健食品 出口」月量 10，「化妝品 出口」「食品 外銷」各 10 為變體；6 個來源）
  - `how-to-read-market-research-report` → 2026-10-27T09:00:00+08:00（主攻字「市場調查報告」月量 30；5 個來源）
  - `first-year-overseas-small-budget` → 2026-10-29T09:00:00+08:00（主攻字「開拓海外市場」月量 10；7 個來源）
- 選題判斷：
  - 三題都不在 jumping.group 的 insights 清單內；小預算篇的「已有買家下單」情況連到躍馬〈incoterms-trade-terms-guide〉。
  - 原先想用的主攻字意圖不符、未採用：「菲律賓市場」（20）SERP 全是沙巴的菲律賓市集旅遊文；「菲律賓 保養品」（20）是旅遊購物推薦；「試水溫」（70）是字義與抓漏；「出海」（480）幾乎全是中國大陸內容；「東南亞市場」（70）是當地傳統市場 vlog。「市調」480、「市場調查」390 是「怎麼做市調」的意圖，報告篇改用「市場調查報告」。
  - 資訊增益：「保健食品 出口」首頁是台灣進口法規與中國出口指南，沒有菲律賓三類產品分開的關卡；「市場調查報告」首頁是定義、做法與報告寫法，沒有「拿到別人的報告怎麼看」；「開拓海外市場」首頁全是貿易署補助公告，沒有「幾十萬做得到什麼」。
  - 卡關篇引用菲律賓 AO 2014-0029 附件 C（進口商 LTO 要附的原廠文件五選一）、東協化妝品指令 FAQ（受理通報不等於合規、樣品也要通報、改配方要重新通報）；引用鹿飛 `/cases/bubble-tea` 案例頁既有內容，未加寫細節。
  - 報告篇以 AAPOR 揭露標準與皮尤研究中心的誤差範圍說明為骨架，並引用鹿飛市場探查頁自己寫明的樣本限制。
  - 小預算篇的參展補助只寫貿易署常見問答頁上查得到的數字（一攤 12 萬、每增一攤加 1 萬、每展上限 16 萬）；「最高補 90%」與「展後核銷撥款」在該頁查不到，未寫。布建海外通路補助 115 年度受理到 10-30 18:00，本篇 10-29 發布，文末註明以貿易署當年度公告為準。
- 上週檢查：`philippines-food-cosmetic-label-checklist`（10-13）、`us-fda-food-import-fsvp-prior-notice`（10-15）、`philippines-market-assessment-deck`（10-17）皆 200；`philippines-registration-waiting-period`、`distribution-agreement-clause-checklist` 尚未到 publishAt，404 正確；其餘 17 篇皆 200、皆在 sitemap。
- 花費：DataForSEO 約 US$0.20（搜尋量 2 次 0.18＋SERP 9 次 0.018）；查詢前餘額 US$32.75。
- 異常與處理：
  - **sitemap 仍然沒有自動更新（上週已報，未修）**：正式站 `sitemap.xml` 74 筆 lastmod 全是 2026-10-11T12:21:38Z（上次部署），10-13、10-15、10-17 三篇已上線（200）卻不在 sitemap。本 PR 合併會觸發部署而暫時補上；依「不改網站」規則未動 `sitemap.ts`，仍請人工處理。
  - 菲律賓 FDA Advisory 2023-2205（線上販售未通報化妝品）頁面對腳本與抓取工具都回 403，本週無法重新查證，卡關篇沒有引用。
  - 字型子集有 1 個字元由系統字型繪製，是既有的 FALLBACK 項目，本次未新增。
  - `npx eslint src`：0 error、4 warning（與上週相同）。
- 待查：既有〈overseas-exhibition-subsidy-115-upgrade〉寫的「最高補 90%」以貿易署常見問答為出處 [1]，但 2026-10-18 該頁已查不到 90% 的字樣，建議下次每月任務複查並更新該篇；菲律賓保健食品中、高風險分級在送件文件上的實際差異（AO 2014-0029 只列分類，本文未寫差異）。

## 2026-10-11 每週任務
- 開工檢查：`~/dev/lufe-autopilot/LAST_FAILURE.md` 不存在，無待補項目。
- 排程（空檔由 `blog-schedule.mjs` 給出）：
  - `philippines-market-assessment-deck` → 2026-10-17T09:00:00+08:00（主攻字「市場分析報告」月量 40；7 個來源）
  - `philippines-registration-waiting-period` → 2026-10-20T09:00:00+08:00（主攻字「產品登記」月量 20；5 個來源）
  - `distribution-agreement-clause-checklist` → 2026-10-22T09:00:00+08:00（主攻字「經銷合約」月量 50，「經銷合約範本」「經銷商合約」「代理合約」各 30 為變體；6 個來源）
- 選題判斷：
  - 三題都不在 jumping.group 的 insights 清單內；合約篇的交貨條件連到躍馬〈incoterms-trade-terms-guide〉。
  - QUEUE 第 8 題原標「產品證要 6～12 週」：查不到「6～12 週」的官方出處，改用 FDA 服務章程的官方處理天數（LTO 14、CPR 變更 20、CPN 23 個工作天），標題改為「產品登記還沒下來，這段時間可以先做哪三件事」。食品 CPR 初次申請的官方天數章程未單獨列出，未寫。
  - 「查驗登記」月量 260 但 SERP 全是台灣食藥署國內登記，意圖不符，未採用；「產品登記」SERP 也全是台灣化粧品與貨物稅，無菲律賓內容（資訊增益）。
  - 合約篇與既有〈agent-vs-distributor-exclusive〉區隔：該篇談獨家與壓貨，本篇是 12 條全條款清單，重點放在台灣範本沒有的商標與產品證；「保證最低業績」依鐵律改寫為「約定最低業績」（英文 agreed minimum sales）。
  - 「市場分析報告」SERP 前 6 名都是市場研究定義與步驟，沒有給決策用的頁面大綱與停損點。
- 上週檢查：`philippines-cpr-transfer-change-importer`（10-06）、`market-entry-modes-compared`（10-08）、`taiwan-food-export-philippines-steps`（10-10）皆 200；`philippines-food-cosmetic-label-checklist`、`us-fda-food-import-fsvp-prior-notice` 尚未到 publishAt，404 正確；其餘 14 篇皆 200。
- 花費：DataForSEO 約 US$0.096（搜尋量 1 次 0.09＋SERP 3 次 0.006）；查詢前餘額 US$33.04。
- 異常與處理：
  - **sitemap 沒有自動更新**：正式站 `sitemap.xml` 的 lastmod 全是 2026-10-06T00:24:03Z（最後一次部署），10-06、10-08、10-10 三篇已上線（200、列表頁有）卻不在 sitemap。`src/app/sitemap.ts` 雖設 `revalidate = 300`，實際沒有重新產生。本 PR 合併會觸發部署而暫時補上，但之後每篇排程文章都會等到下一次部署才進 sitemap。依「不改網站」規則未動 `sitemap.ts`，請人工處理（例如改成動態或用排程 revalidate）。
  - **中文頁面 fixture 測試會隨時間失效**：`tests/i18n` 的 5 個「Chinese byte-identical」測試（首頁、/insights、m1、m3 章節、作者頁）用真實時間渲染，10-06 第一篇排程文章上線後，乾淨的 main 也會失敗（已在 origin/main 驗證 5 failed）。已新增 `atFixtureTime()`（`tests/i18n/helpers.ts`），只在這 5 個渲染時把時間固定在 fixture 產生時的 2026-10-05 12:00；main 套用後 234/234 通過。未改任何 fixture 或元件。
  - 一致性檢查把英文出處標題的「July 2024」讀成數字 7；`philippines-registration-waiting-period` 的 FDA 服務章程出處中文標題改為「（第 1 版，2024 年 7 月 18 日）」。
  - `npx eslint src`：0 error、4 warning（上週的 FreightRateChart error 已不在）。
- 待查：食品 CPR 初次申請在新 eServices 系統下的官方處理天數；IPOPHL 商標申請規費與審查時間（文中未寫）。

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
