# 中英雙語 Plan 4／4：英文詢問 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 英文頁的對話框、聯絡表單、候補表單整套英文化並送出 `lang: "en"`；JP 收到英文詢問時用 AI 產出中文翻譯＋英文回覆草稿，寄 Email 給 Aaron；中文詢問流程完全不變。

**Architecture:** 兩個 repo、兩個 PR，先 JP 後鹿飛。JP 先上線（鹿飛目前一律送 `lang: "zh"`，所以 JP 上線後行為不變）；鹿飛再上線，英文頁開始送 `lang: "en"`。JP 端新增 `src/notify/lufe-english-lead.ts`：AI 失敗照樣寄原文、Email 失敗退回 LINE／Telegram 通知，詢問不會遺失。

**Tech Stack:** JP：Cloudflare Workers、Hono、zod、vitest、Resend、Anthropic（`MODELS.route`＝Haiku）。鹿飛：Next.js 16.2.2、React 19、vitest。

**Spec:** `docs/superpowers/specs/2026-10-03-bilingual-site-design.md` §5、§6 P3。

**與規格的差異（需 Aaron 知悉）：** 規格寫 `lufe.leads` 新增 `lang` 欄位。`lufe.leads` 已存 `page`（送出時的網址），英文頁一律是 `/en...`，語言可直接由 `page` 判斷；加欄位需要資料庫管理者手動跑 migration。**本計畫不加欄位**，日後真的需要再補。

## Global Constraints

- 鹿飛 repo：繼承 Plan 1–3 全部 Global Constraints（中文輸出逐字不變、英文無漢字、建置鎖只准 `mkdir`／`rmdir`、絕不用編碼躲檢查、絕不放寬測試、commit 尾行 `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`）。
- JP repo：`AGENTS.md`／`CLAUDE.md` 的規則優先；PR 必須 CI 綠才能合併；**Codex 不得部署、不得合併**（部署由 Claude 依 JP 既有流程做，部署前通知 JP 其他視窗）。
- **中文詢問流程逐位元不變**：`lang` 缺省或 `"zh"` 時，JP 的 LINE／Telegram 訊息內容與目前完全相同（既有測試不得修改）。
- **英文詢問只寄 Email**，不發 LINE／Telegram；**唯一例外**：Email 寄送失敗時，退回既有 `notifyLufeLead`（LINE／Telegram），訊息第一行加「⚠️ 英文詢問 Email 寄送失敗，改用這裡通知」。
- **AI 失敗不得遺失詢問**：AI 呼叫失敗、逾時、回傳格式不對 → 照樣寄 Email，主旨加「（翻譯失敗）」，內文只放英文原文與對方聯絡方式。
- 收件人：環境變數 `LUFE_EN_LEAD_EMAIL_TO`，未設定時預設 `aaron.yu@reborn.in`。寄件人沿用 `REPORT_EMAIL_FROM`／預設寄件人（Resend 已驗證網域）。
- Email 主旨：`[LUFÉ 英文詢問] <姓名>`；有公司時 `[LUFÉ 英文詢問] <姓名>／<公司>`。
- Email 內文順序（純文字）：`【中文翻譯】` → `【英文原文】` → `【英文回覆草稿（可直接複製）】` → `【對方聯絡方式】`（姓名、公司、Email、電話、來源、頁面）。
- AI 草稿規則（寫進 system prompt）：只根據詢問內容回覆；**不得承諾價格、時程、成果、法規結論**；需要報價或細節時，用「想約 30 分鐘線上談」收尾；署名 `Aaron Yu, LUFÉ`；不超過 150 個英文字。中文翻譯要忠實、不加油添醋。
- 客戶原文送 Anthropic：JP 本來就把客戶的 LINE 訊息送 Anthropic 做路由，屬既有資料流，不新增服務。

## Review Focus

1. **中文詢問被改壞**：`lang` 缺省／`zh` 必須走原路 → JP Task 1 測試：`zh` 與缺省各一則，斷言 `notifyLufeLead` 被呼叫、Email 函式沒被呼叫。
2. **AI 掛掉詢問就不見**：AI throw／回傳非 JSON／缺欄位 → JP Task 1 測試三種，皆斷言 Email 仍寄出且主旨含「（翻譯失敗）」。
3. **Email 也失敗**：Resend 回 500 → JP Task 1 測試斷言退回 `notifyLufeLead` 且第一行含警示；路由回 200。
4. **英文頁送出中文值以外的東西／漏送 lang**：鹿飛 Task 2 測試：`/en/contact` 送出的 body 含 `lang: "en"`，候補表單的 `monthlyVolume` 仍是中文原值。
5. **英文使用者看到中文錯誤訊息**：`lang: "en"` 時 `/api/lead` 回英文錯誤 → 鹿飛 Task 1 測試逐欄斷言。

---

## JP PR（repo `~/jp-system`，worktree `~/jp-system-wt-lufe-en`，分支 `feat/lufe-english-lead`）

### JP Task 1：英文詢問 Email

**Files:**
- Modify: `src/notify/email.ts`（新增 `sendEmail(env, { to, subject, text }): Promise<ReportEmailResult>`；`sendReportEmail` 改成呼叫它，行為不變）
- Create: `src/notify/lufe-english-lead.ts`
- Modify: `src/index.ts`（只改 `app.post('/web/lufe-lead')` 內部：`body.data.lang === 'en'` 時呼叫 `notifyLufeEnglishLead`，否則照舊）
- Modify: `src/env.ts`（加 `LUFE_EN_LEAD_EMAIL_TO?: string | undefined`）
- Test: `test/notify/lufe-english-lead.test.ts`（依 repo 既有測試目錄慣例放）、既有 `/web/lufe-lead` 路由測試新增案例（不改既有斷言）

**Interfaces:**
- Produces:
  - `export interface EnglishLeadDraft { zhTranslation: string; replyDraft: string }`
  - `export async function draftEnglishLead(env: Env, lead: WebLead): Promise<EnglishLeadDraft | null>`：用 `callClaudeJson`、`MODELS.route`，失敗或格式不對回 `null`（不 throw）
  - `export function formatEnglishLeadEmail(lead: WebLead, draft: EnglishLeadDraft | null): { subject: string; text: string }`
  - `export async function notifyLufeEnglishLead(env: Env, lead: WebLead): Promise<{ email: boolean; fallback: DeliveryResult | null }>`
- 路由回應：英文 `{ ok: true, email: <bool>, fallback: <DeliveryResult|null> }`；Email 與退回都失敗才回 502。

- [ ] **Step 1: 失敗測試**（mock `callClaudeJson` 與 `fetch`）：
  - `formatEnglishLeadEmail`：有草稿 → 主旨 `[LUFÉ 英文詢問] Jane Doe／Acme`，內文四段依序出現；`draft = null` → 主旨結尾「（翻譯失敗）」，沒有「中文翻譯」段，英文原文與聯絡方式仍在。
  - `draftEnglishLead`：AI throw → `null`；回傳缺 `replyDraft` → `null`；正常 → 物件。
  - `notifyLufeEnglishLead`：Resend 200 → `email: true`、`notifyLufeLead` 未呼叫；Resend 500 → `email: false`、`notifyLufeLead` 被呼叫一次且第一行含「⚠️ 英文詢問 Email 寄送失敗」。
  - 路由：`lang: 'en'` 走英文；`lang: 'zh'` 與缺省走 `notifyLufeLead`，Email 不寄。
  - 收件人：未設 `LUFE_EN_LEAD_EMAIL_TO` → `aaron.yu@reborn.in`；有設 → 用設定值（逗號分隔多位）。
- [ ] **Step 2: 跑** `npx vitest run <test file>` → FAIL
- [ ] **Step 3: 實作**（system prompt 照 Global Constraints 的草稿規則；要求回 JSON `{"zhTranslation": "...", "replyDraft": "..."}`）
- [ ] **Step 4: 跑** repo 全套測試與型別檢查（依 repo `package.json` 的指令），全綠
- [ ] **Step 5: Commit** `feat(lufe): email English LUFÉ inquiries with translation and reply draft`
- [ ] **Step 6:** push、開 PR（base 為 repo 預設分支），等 CI 綠，回報。**不合併、不部署。**

---

## 鹿飛 PR（repo `~/dev/lufe-website`，分支 `feat/i18n-p4-english-inquiries`）

### 鹿飛 Task 1：`/api/lead` 收 `lang`、英文錯誤訊息

**Files:**
- Modify: `src/app/api/lead/route.ts`
- Create: `src/i18n/zh/lead-errors.ts`、`src/i18n/en/lead-errors.ts`（把現有中文錯誤訊息逐字搬到 zh，英文同形狀；登記 `I18N_MODULES`）
- Test: `tests/api/lead.test.ts` 新增案例（不改既有斷言）

- [ ] **Step 1: 失敗測試**：body 帶 `lang: "en"`：
  - 每個驗證錯誤回英文（例：`name` → `"Please enter your name"`），整份回應無漢字；
  - 通知 payload `lang: "en"`；`lang` 缺省或不是 `"en"` → `"zh"`，錯誤訊息與 payload 和現在完全相同；
  - 候補表單 `lang: "en"` 時 `monthlyVolume` 仍只接受中文原值 `<100`／`100～500`／`500 以上`；
  - `lang: "en"` 時通知的 `source` 與 `msg` 內附加的標籤用英文（`Quick message`／`Contact form`／`Call Center waitlist`、`Product:`、`Stage:`、`Monthly messages:`、`Current handler:`），中文時完全不變。
- [ ] **Step 2: 跑** → FAIL
- [ ] **Step 3: 實作**；`LeadNotification.lang` 型別改 `"zh" | "en"`。
- [ ] **Step 4: 跑** `npx vitest run tests/api tests/i18n` 全綠
- [ ] **Step 5: Commit** `feat(i18n): lead API accepts lang and returns English errors`

### 鹿飛 Task 2：對話框、聯絡表單、候補表單英文化並送出 `lang`

**Files:**
- Modify: `src/components/MessageBox.tsx`（依 `localeFromPathname(usePathname())` 選語言；介面文字搬 `src/i18n/zh/message-box.ts`／`src/i18n/en/message-box.ts`；送出 body 加 `lang`）
- Modify: `src/components/contact/ContactPage.tsx`、`src/components/services/WaitlistForm.tsx`（送出 body 加 `lang: locale`；成功與失敗訊息走 copy）
- Test: `tests/i18n/message-box-en.test.ts`、`tests/i18n/lead-submit-lang.test.ts`

- [ ] **Step 1:** 照 Plan 2 配方 R1 存 `MessageBox` 中文黃金快照（`usePathname` 回 `/`），單獨 commit。
- [ ] **Step 2: 失敗測試**：
  - `MessageBox` 在 `/` 逐字等於快照；在 `/en/services` → `expectEnglishMarkup`，含 `We reply within one business day`。
  - 三個表單送出時（mock `fetch`）：英文頁 body 含 `"lang":"en"`，中文頁含 `"lang":"zh"`；候補表單英文頁 `monthlyVolume` 為中文原值。
- [ ] **Step 3: 跑** → FAIL
- [ ] **Step 4: 實作**（R3–R5；字型守門：`MessageBox` 若在首屏字集範圍，跑 `npm run font:rebuild` 並確認 `critical-charset.txt` 無差異）
- [ ] **Step 5: 跑** `npx vitest run --maxWorkers=2` 全綠
- [ ] **Step 6: Commit** `feat(i18n): English message box and forms send lang`

### 鹿飛 驗證與 PR

- `npx tsc --noEmit`；`npx eslint src`（只允許 `FreightRateChart.tsx:21`）；`npx vitest run --maxWorkers=2` 完整摘要行；建置（建置鎖）。
- `npm run start`：所有 `/en` 頁可見文字**完全無漢字**（對話框也翻了，Plan 2 列的殘留清單應歸零）；中文頁不變；1440／390 寬無水平捲動。
- PR 標題 `feat(i18n): English inquiries (Plan 4)`，等 `test` 綠，回報。**不合併。**

## 上線順序與端到端驗收（Claude 執行）

1. JP PR 審查 → 合併 → 確認 master 頭是本 PR → 通知 JP 其他視窗 → 依 JP 既有流程部署 → `/health` 的 gitSha 等於合併 commit。
2. 鹿飛 PR 審查 → 合併 → Vercel 部署完成。
3. 端到端：在 `https://lufe.world/en/contact` 送一則**標明測試**的英文詢問（姓名 `TEST Claude`），確認 Aaron 信箱收到 Email、主旨與四段內文正確；在中文 `/contact` 送一則測試，確認 LINE／Telegram 照舊、沒有 Email。
4. 清掉兩筆測試資料（`lufe.leads` 依姓名 `TEST Claude` 刪除），並在 Aaron 的 LINE／Telegram 說明那則是測試。

## Self-Review

1. **Spec 覆蓋：** §5 流程每一步 → JP Task 1（AI、Email、主旨、內文、AI 失敗照寄）、鹿飛 Task 1–2（lang、表單）；「中文流程不變」→ Review Focus 1；「英文只寄 Email」→ JP Task 1（含 Email 失敗退回的例外，理由：詢問不可遺失）；「選項值送中文原值」→ 鹿飛 Task 1、2；`lufe.leads.lang` → 明確不做（見差異）。
2. **佔位字：** 無。
3. **型別一致：** `EnglishLeadDraft`、`draftEnglishLead`、`formatEnglishLeadEmail`、`notifyLufeEnglishLead`、`sendEmail` 定義與使用一致；`LeadNotification.lang` 改 `"zh" | "en"`。
4. **Review Focus：** 五條對應 JP Task 1 與鹿飛 Task 1、2 的測試。
