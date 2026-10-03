# 鹿飛官網中英雙語：設計文件

日期：2026-10-03｜狀態：待 Aaron 確認｜審查：Fable 獨立審查已併入（見附錄 A）

---

## 0. 一句話

在不動任何中文網址的前提下，替 lufe.world 加上完整英文版（`/en/...`）與中英切換鈕；英文版一頁一頁做、做完一次開放；之後每篇新文章中英同時上線；英文詢問改用 Email 寄給 Aaron，附中文翻譯與英文回覆草稿。

## 1. Aaron 已拍板的決定

| # | 決定 | 日期 |
|---|---|---|
| D1 | 英文讀者：菲律賓合作夥伴、北美合作方與買家、讀英文的台灣客人、Google 英文搜尋，四種都要 | 10-03 |
| D2 | 文章全部翻，包含自動駕駛之後的新文章 | 10-03 |
| D3 | 英文不找人把關、直接上；開放前由 AI 用多角色交叉檢查一次，Aaron 事後自己看摘要 | 10-03 |
| D4 | 做法 A：同一套頁面、中英兩份文字；中文網址不變，英文在 `/en` | 10-03 |
| D5 | 英文詢問：網站上的對話框（表單）送出 → **寄 Email 給 Aaron**，附中文翻譯＋英文回覆草稿，Aaron 自己回。**不用 WhatsApp、不用 LINE** | 10-03 |
| D6 | 台灣政府補助內容照樣全文翻 | 10-03 |
| D7 | 另外經營英文原生流量：先做約 US$1 的英文關鍵字調查，有量再開英文原生文章線（另立設計，不在本文件範圍） | 10-03 |

## 2. 網址與切換鈕

- 中文網址全部不變。英文＝同路徑加 `/en` 前綴，例：`/services/consignment` → `/en/services/consignment`；文章同 slug：`/en/insights/<slug>`。
- 切換鈕：桌機放在導覽列右上「聊聊你的產品 →」左邊；中文頁顯示 `EN`、英文頁顯示 `中文`；手機放在選單展開後最上方。不用國旗。
- 點切換鈕到「同一頁」的另一語言。該頁沒有英文版時（例如剛發、英文還沒好的文章）→ 去 `/en/insights` 列表，不去 404。
- **不依瀏覽器語言自動跳轉**，預設永遠中文。
- 搜尋引擎：x-default 指向中文版。hreflang、sitemap 的 `/en` 項目、英文 OG 圖在**開放日當天**一起打開；開放前中文頁不出現任何指向 `/en` 的標記，`/en` 頁一律 noindex。

## 3. 文字怎麼放

- 英文文字放在**獨立檔案**（`src/data/en/`、`src/i18n/en/`），不改中文檔案的結構；避免和每天改中文的其他視窗互撞。
- **中英漂移守門**：每條英文旁存對應中文的指紋（hash）；中文改了、英文沒更新 → 測試失敗、不能上線。改中文的那個視窗會看到紅燈並順手補英文。
- 用語表（全站統一，之後翻譯照表）：

| 中文 | 英文 |
|---|---|
| 鹿飛 | LUFÉ |
| 市場探查 | Market Probe |
| 寄賣 | Consignment |
| 公司落地 | Company Setup |
| 海外客服 | Overseas Customer Service |
| 北美通路 | North America Retail |
| 躍馬企業 | Jumping Group |
| 免費初步評估 30 分鐘 | Free 30-minute initial assessment |
| 一個工作天內回覆 | We reply within one business day |

- 翻譯鐵律（機器檢查，不過就不上）：
  1. 英文不得比中文多說：數字、年份、百分比、金額與「預計／estimated」的出現次數，中英必須一致。
  2. 金額一律 NT$（例：NT$10,000–20,000），不換算 USD／PHP。
  3. 禁用詞英文版：guarantee(d)、golden decade、demographic dividend 等，對應中文鐵律。
  4. 中文沒有的案例、經驗、客戶數字，英文一律不得出現。
- 英文頁頁尾固定一句：*The Chinese version of this site prevails in case of any discrepancy.*

## 4. 文章

- **靜態文章**（`src/data/articles.ts`，現 18 篇＋自動駕駛新增）：英文放 `src/data/en/articles.ts`，以 slug 對應；`articles.ts` 本身結構不動（排程腳本靠它）。
- **資料庫文章**（Ghost 相容發文介面）：`lufe.articles` **只新增** `locale` 欄位（預設 `zh`），唯一鍵改成 `(slug, locale)`；英文版以同 slug、`locale='en'` 存入。
- `/en/insights/[slug]` 只產生有英文的文章；沒有英文 → 404，不拿中文充數。
- **自動駕駛 RUNBOOK 修改**：第 5 步同一個 PR 產出英文版；第 6 步鐵律對英文同樣跑＋中英數字比對；不過就整篇（含中文）不發。

## 5. 英文詢問（D5）

```
英文頁對話框／聯絡頁表單（lang=en）
  → lufe.world /api/lead：存 lufe.leads（新增 lang 欄位，只加不減）
  → JP /web/lufe-lead（lang:'en'，JP 已支援此欄位）
  → JP 判斷 lang=en：用 AI（Haiku）產出「中文翻譯＋英文回覆草稿」
  → 用 JP 既有的 Resend 寄 Email 給 Aaron
     主旨：[LUFÉ 英文詢問] <姓名/公司>
     內容：中文翻譯 → 英文原文 → 英文回覆草稿（可直接複製）→ 對方 Email
```

- 中文詢問流程完全不變（照舊 LINE＋Telegram）。
- 英文詢問**只寄 Email**，不發 LINE／Telegram。
- AI 失敗時照樣寄出原文 Email（標「翻譯失敗」），詢問不能因 AI 掛掉而遺失。
- 英文頁聯絡方式：對話框＋Email（`aaron.yu@reborn.in`），不放 LINE、不放 WhatsApp。
- 收件信箱預設 `aaron.yu@reborn.in`（網站現行聯絡信箱）。
- 費用：Resend 免費額度內、AI 每則不到台幣 1 元；無月費。
- 表單送出的選項值（例如月量級距）英文頁送出原中文值，顯示英文；後端驗證不變。

## 6. 上線順序

| 階段 | 內容 | 對外可見？ |
|---|---|---|
| P0 地基 | `/en` 路由、英文 layout（`lang="en"`、noindex）、切換鈕（隱藏）、會跟語言走的站內連結、字型守門加入英文特殊字元（₱ é ñ 等）、漂移守門測試 | 否 |
| P1 頁面 | 20 頁逐頁翻譯上線（做到哪頁先通知，該頁暫停改中文） | 否（noindex） |
| P2 文章 | 18 篇靜態文章＋資料庫文章英文版；RUNBOOK 改成中英同發 | 否 |
| P3 詢問 | 表單帶 lang、`lufe.leads` 加欄位、JP 英文 Email＋翻譯草稿（JP repo） | 否（但可用預覽測） |
| P4 交叉檢查 | 五角色看全部英文：菲律賓通路夥伴、北美零售買家、英文母語編輯、可信度與法務、讀英文的台灣品牌主；修完後產中文摘要給 Aaron（不擋流程） | 否 |
| P5 開放日 | 同一個 PR：切換鈕顯示、拿掉 noindex、hreflang 雙向、sitemap 加 `/en`、英文 OG 圖 | **是** |

開放門檻：19 個非文章頁＋文章列表＋截至當天的全部靜態文章英文完成、P3 端到端測通、P4 修完。之後新文章靠 RUNBOOK 中英同發，不累積待翻清單。noindex 期間目標不超過 4 週。

執行：程式由 Codex（gpt-5.6-terra）依工單實作；Claude 負責設計、工單、審查、正式站驗證。

## 7. 驗收條件

1. 現有中文頁 20 個網址回應與內容不變（上線前後比對）。
2. `/en` 每頁：無中文殘留（除品牌名與刻意保留處）、站內連結全部指向 `/en/...`（測試擋）。
3. 切換鈕在每頁都到同頁另一語言；沒英文的文章到 `/en/insights`。
4. 漂移守門：故意改一句中文 → 測試紅。
5. 英文表單在正式站送出一筆測試 → Aaron 信箱收到含中文翻譯與草稿的信；AI 關掉時仍收到原文信。
6. 開放後：Google 能抓到 `/en` 頁，hreflang 無錯誤（Search Console）。

## 8. 不做的事

- 不用 WhatsApp、不用 LINE 接英文詢問。
- 不依瀏覽器語言自動跳轉。
- 不換算外幣。
- 不改任何中文網址、不改中文文案。
- 英文原生文章線（D7）另立設計，等關鍵字調查結果。

---

## 附錄 A：技術細節（工程用）

**A1 路由**：新增 `src/app/en/**` 薄頁面樹，import 同一套元件並傳 `locale="en"`；中文樹不搬進 `[locale]` 動態段（避免動到 20 頁、ISR 快取鍵與既有連結）。`<html lang>`：以 route group 拆兩個 root layout（`(zh)` 與 `(en)`），網址不變；搬移在一個 PR 內完成，挑安靜時段並先通知其他視窗。repo 無 middleware／proxy，不新增。

**A2 會被 `/en` 前綴弄壞、需剝前綴的地方**：`Navbar.tsx` 的 `normalizePathname`、`pathnameHasDarkHero`、`switchInsightChapterInPlace`；`DelightLayer.tsx:106`；`subsidies.ts` 的 `getContextualCopy`／`getContextualSubsidy`。做共用 `stripLocale()`。站內寫死 `href="/..."` 約 78 處＋`StaticArticleContent.tsx` 內文連結 → `localizedHref(locale, path)`；加測試：en 渲染輸出不得有非 `/en/`、非 `/api`、非外部的 href。

**A3 SEO**：`src/lib/seo.ts` `createPageMetadata`／`createArticleMetadata` 加 `alternates.languages`（`zh-Hant`、`en`、`x-default`=中文），由開放旗標控制；en layout 覆寫 `openGraph.locale`、預設標題描述、`robots`（開放前 `index:false, follow:true`）；不要用 robots.txt 擋 `/en`。`StructuredData.tsx` 英文頁傳英文並加 `inLanguage`。`sitemap.ts` 開放日加 `/en`。補英文 OG 圖。

**A4 字型守門**：`scripts/check-font-subset.mjs` 會擋所有子集外的非 ASCII 字元；P0 先 `npm run font:rebuild` 收入 `₱ é ñ Ñ • ™ ® ü ö à ç € £`；切換鈕的「中」不在首屏關鍵字集，放置位置要避開 `navbarCriticalPatterns` 或一併 rebuild。

**A5 文章**：`scripts/blog-schedule.mjs` 以 AST 讀 `articles.ts`、測試取 `articles[0]` → 英文另檔。資料庫：`docs/sql/` 新增 migration 加 `locale text not null default 'zh'`、唯一鍵改 `(slug, locale)`（由 postgres 管理者手動執行，`lufe_app` 無建表權限）；`ghost-admin.ts` 接受 locale、`revalidatePath` 一併處理 `/en/...`。

**A6 表單**：`src/app/api/lead/route.ts` 的 `lang:"zh"` 改由 client 傳入（`MessageBox.tsx`、`ContactPage.tsx`、`WaitlistForm.tsx`）；驗證錯誤訊息依 lang 回英文；`tests/api/lead.test.ts` 對應更新；`lufe.leads` 加 `lang` 欄位。JP：`src/index.ts` `/web/lufe-lead` 對 `lang==='en'` 改走新函式（AI 翻譯＋草稿 → `notify/email.ts` 的 Resend），收件人用新設定 `LUFE_EN_LEAD_EMAIL_TO`；AI 失敗降級寄原文。

**A7 測試**：`tests/components/navbar.test.ts` 既有中文斷言不放鬆，另寫 en 測試；新增：字典 key 對齊、中文指紋漂移、en 連結前綴、中英數字／「預計」一致性檢查（文章與頁面共用）。
