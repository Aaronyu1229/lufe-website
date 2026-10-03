# 中英雙語 Plan 2／4：其餘頁面＋選單頁尾 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把除了文章（`/insights`，Plan 3）以外的所有頁面、全站選單、頁尾做出英文版，照 Plan 1 試點頁（`/en/services`）的同一套做法；中文輸出逐字不變；英文仍 noindex、切換鈕仍隱藏。

**Architecture:** 每頁套用同一份「頁面配方」（本文件 §配方）：中文文字逐字搬進 `src/i18n/zh/<module>.ts`、英文寫在 `src/i18n/en/<module>.ts`（同形狀）、元件收 `locale`、連結走 `localizedHref`、加 `src/app/en/<path>/page.tsx`、登記 `I18N_MODULES` 與 `EN_ROUTES`。資料檔（`chapters.ts`、`cases.ts`、`subsidies.ts` 等）用「覆寫」模式：英文物件 `{ ...zh, <所有文字欄位改英文> }`，非文字欄位沿用中文那份。

**Tech Stack:** 同 Plan 1（Next.js 16.2.2、React 19、vitest）。

**Spec:** `docs/superpowers/specs/2026-10-03-bilingual-site-design.md`；**前置：** Plan 1 已上線（PR #139）。

**Aaron 2026-10-04 確認：** 五批分批照做；運營優化＝Operations Optimization、鹿飛方法論＝The LUFÉ Method、處境比對＝Situation Check 三個名稱定案。

**分批：** 五批，各自一個分支、一個 PR、審查合併後才派下一批（每批改到的元件其他視窗要暫停改中文，見各批「凍結」）。

| 批 | 內容 | 英文路由 |
|---|---|---|
| A | 選單、頁尾、全站共用小元件、測試輔助、字型守門調整 | （無新頁；`/en/services` 的選單頁尾變英文） |
| B | 首頁 | `/en` |
| C | 服務章節頁＋方法論＋運營優化 | `/en/services/{product-testing,consignment,localization,call-center,north-america,methodology,optimize}` |
| D | 關於我們、創辦人專欄、聯絡（介面文字）、案例總覽＋案例頁、處境比對 | `/en/about`、`/en/about/aaron-yu`、`/en/contact`、`/en/cases`、`/en/cases/<slug>`、`/en/assess`、`/en/assess/result` |
| E | 資源頁、補助頁 | `/en/resources`、`/en/resources/subsidies` |

**不在本計畫：** `/insights` 列表與文章、首頁「最新洞察」區塊在英文版的內容（Plan 3）；對話框 `MessageBox`、聯絡表單與候補表單的**送出語言與錯誤訊息**、英文詢問 Email（Plan 4）；開放日（切換鈕顯示＋顏色、hreflang、sitemap、英文 OG 圖、`SiteStructuredData` 英文版）。

## Global Constraints

- 繼承 Plan 1 全部 Global Constraints（網址、noindex、用語表、翻譯鐵律、不放「以中文版為準」、建置鎖、字型守門、Next 16 先讀 docs、英文註解、commit 尾行）。
- **用語表（定案，不得自創）**：鹿飛＝LUFÉ；市場探查＝Market Test；寄賣＝Consignment；公司落地＝Company Setup；海外客服＝Call Center；北美通路＝North America Retail；運營優化＝Operations Optimization；鹿飛方法論＝The LUFÉ Method；躍馬企業＝Jumping Freight；免費初步評估 30 分鐘＝Free 30-minute initial assessment；一個工作天內回覆＝We reply within one business day；四章總覽＝All four chapters；處境比對＝Situation Check；創辦人專欄＝Founder's Column。
- **英文文風**：美式拼字；標題用 sentence case；平實、具體、B2B 語氣；不加驚嘆號；保留 `→`、`↓`；不新增中文沒有的形容、案例、數字或承諾；中文的「我們」→ we；中文的「你」→ you。
- **中文逐字不變**：每個改動到的頁面／元件都要有改動前存的黃金快照，改完逐字比對。
- **英文完整**：英文輸出整份 HTML（含 `alt`、`aria-label`、`title`、JSON-LD）不得含任何漢字；站內連結全部在 `/en` 底下。
- 對話框（`MessageBox`）、表單送出值與後端驗證訊息**本計畫不動**；英文頁上的表單**欄位標籤與說明**要翻，但 `<option value>`／送出的值維持中文原值。

## Review Focus

1. **中文首屏字型被弄壞**：選單與首頁 hero 的文字搬出 `Navbar.tsx`／`HeroSection.tsx` 後，`critical-charset.txt` 必須逐字不變 → Batch A Task A2、Batch B Task B1 的驗證步驟。
2. **選單／頁尾在英文頁點了掉回中文**：選單所有連結（含 mega panel、手機選單、頁尾）在 `/en/...` 都要指向 `/en/...` → Batch A 測試。
3. **資料檔覆寫漏欄位**：英文物件用 `{ ...zh }` 起手，漏蓋的欄位會留中文 → 英文頁「整份 HTML 無漢字」測試會抓到；不准用放寬測試解決。
4. **其他頁共用元件預設值被改**：`FaqSection`、`ScrollCue`、`ContactButton`、`SubsidiesCTASection` 等加 prop 時，**預設值必須是原中文**，中文頁黃金快照會抓到。
5. **案例、補助這類有日期與金額的頁**：英文漏掉或改寫了日期、金額、百分比 → 一致性檢查（數字、「預計」）會抓到；不准刪數字來過檢查。

---

## 配方（每頁照做）

下列以 `<module>` 代表模組名（kebab-case，例如 `chapter-pages`），`<Component>` 代表元件。

**R1 黃金快照（改動前）**

```ts
// tests/snap-<module>.test.ts (temporary; delete after running)
import { writeFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { it, vi } from "vitest";
vi.mock("next/navigation", () => ({ usePathname: () => "<zh path>", useRouter: () => ({ push: () => {} }), useSearchParams: () => new URLSearchParams() }));
vi.mock("@/lib/articles/repository", () => ({ listPublishedArticles: async () => [], getPublishedArticleBySlug: async () => null }));
import { <Component> } from "@/components/<path>";
it("snapshot", async () => {
  writeFileSync("tests/fixtures/<module>.zh.html", renderToStaticMarkup(await <Component>(<zh props>)));
});
```
跑 `npx vitest run tests/snap-<module>.test.ts`，刪掉這個暫時測試，`git add tests/fixtures/<module>.zh.html` 單獨 commit：`test: snapshot Chinese <module> before i18n extraction`。元件是 client component（不能 await 呼叫）時改用 `renderToStaticMarkup(createElement(<Component>, props))`。

**R2 測試（先紅）**

```ts
// tests/i18n/<module>-en.test.ts
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
vi.mock("next/navigation", () => ({ usePathname: () => "<en path>", useRouter: () => ({ push: () => {} }), useSearchParams: () => new URLSearchParams() }));
vi.mock("@/lib/articles/repository", () => ({ listPublishedArticles: async () => [], getPublishedArticleBySlug: async () => null }));
import { <Component> } from "@/components/<path>";
import { expectEnglishMarkup } from "./helpers";

describe("<module> i18n", () => {
  it("keeps Chinese byte-identical", async () => {
    expect(renderToStaticMarkup(await <Component>(<zh props>))).toBe(readFileSync("tests/fixtures/<module>.zh.html", "utf8"));
  });
  it("renders complete English", async () => {
    expectEnglishMarkup(renderToStaticMarkup(await <Component>({ ...<zh props>, locale: "en" })));
  });
});
```
（`zh` 測試裡的 `usePathname` mock 要回中文路徑：把兩個 it 拆成兩個檔，或在 zh 檔 mock 中文路徑；以實際元件是否讀 pathname 決定。）

**R3 抽中文（逐字）** — `src/i18n/zh/<module>.ts` 匯出 `type <Module>Copy` 與 `<module>Zh`。元件內所有給人看的字（含 `alt`、`aria-label`、`title`、麵包屑、按鈕、空狀態）都要搬。資料檔（`src/data/*.ts`）**不搬**：原檔原匯出保留，zh 模組直接 `import` 引用；英文用覆寫模式（R4）。搬移前用 `git show origin/main:<file>` 核對，以 main 為準。

**R4 寫英文** — `src/i18n/en/<module>.ts`：

```ts
import type { <Module>Copy } from "@/i18n/zh/<module>";
// Fingerprint of the Chinese this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const <MODULE>_SOURCE_FINGERPRINT = "SET_AFTER_FIRST_RUN";
export const <module>En: <Module>Copy = { /* every text field in English */ };
```
資料檔覆寫模式（例：章節）：

```ts
import { CHAPTERS, type Chapter, type ChapterKey } from "@/data/chapters";
export const CHAPTERS_EN: Record<ChapterKey, Chapter> = {
  m1: { ...CHAPTERS.m1, label: "Market Test", title: "…", scene: "…", /* every text field */ },
  // …
};
```
翻譯照 Global Constraints 的用語表與文風；中文有「預計」英文要有 expected／estimated／planned；金額寫 `NT$`。

**R5 元件吃 locale** — 元件加 `locale?: Locale`（預設 `"zh"`），`const copy = locale === "en" ? <module>En : <module>Zh;`；所有站內 `href` 改 `localizedHref(locale, …)`；子元件需要文字的就加 prop（**預設值＝原中文**）。`key` 用不會翻譯的值（href、slug、索引）。

**R6 英文路由** — `src/app/en/<path>/page.tsx`：

```tsx
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
// …same imports as the Chinese page
export const metadata: Metadata = createPageMetadata({ path: "<zh path>", locale: "en", title: "<English title>", description: "<English description>" });
export default function English<Name>() {
  return <>{/* same JSON-LD as zh page but with English names and /en paths */}<<Component> locale="en" {...props} /></>;
}
```
有 `generateStaticParams`／`generateMetadata` 的動態頁（`/cases/[slug]`）照中文頁的做法複製，資料改讀英文。

**R7 登記** — `src/i18n/registry.ts` 的 `I18N_MODULES` 加一筆 `{ name, zh, en, sourceFingerprint, enFile }`（`zh` 放中文模組物件＋它引用的資料檔物件，例如 `{ copy: chapterPagesZh, chapters: CHAPTERS }`；`en` 同形狀）；`src/i18n/config.ts` 的 `EN_ROUTES` 加入該頁中文路徑。

**R8 指紋** — 跑 `npx vitest run tests/i18n`，`registry` 測試會印出 `set its source fingerprint to "<hash>"`，填進英文檔；再跑一次全綠。

**R9 Commit** — 一頁（或一組共用元件）一個 commit：`feat(i18n): English <page>`。

---

## Batch A：選單、頁尾、共用元件

凍結：`src/components/Navbar.tsx`、`src/components/Footer.tsx`、`scripts/check-font-subset.mjs`、`scripts/build-font-subset.py`。

### Task A1: 測試輔助 `expectEnglishMarkup`

**Files:**
- Create: `tests/i18n/helpers.ts`
- Test: `tests/i18n/helpers.test.ts`

**Interfaces:**
- Produces: `expectEnglishMarkup(html: string): void`——整份 HTML 無漢字；站內 `href` 全在 `/en` 底下（`#…`、`/api/`、靜態檔、外部、`mailto:`、`tel:` 除外）。

- [ ] **Step 1: Write the failing test**

```ts
// tests/i18n/helpers.test.ts
import { describe, expect, it } from "vitest";
import { expectEnglishMarkup } from "./helpers";

describe("expectEnglishMarkup", () => {
  it("accepts clean English", () => {
    expect(() => expectEnglishMarkup('<a href="/en/services">Services</a><a href="#x">x</a><img alt="A team" src="/images/a.webp">')).not.toThrow();
  });
  it("rejects Han anywhere, including attributes", () => {
    expect(() => expectEnglishMarkup('<img alt="團隊" src="/a.webp">')).toThrow();
  });
  it("rejects internal links outside /en", () => {
    expect(() => expectEnglishMarkup('<a href="/services">Services</a>')).toThrow();
  });
  it("allows api, static files, external, mailto", () => {
    expect(() => expectEnglishMarkup('<a href="/api/lead">a</a><a href="/files/x.pdf">b</a><a href="https://jumping.group">c</a><a href="mailto:aaron.yu@reborn.in">d</a>')).not.toThrow();
  });
});
```

- [ ] **Step 2: Run to verify it fails** — `npx vitest run tests/i18n/helpers.test.ts` → FAIL（module not found）

- [ ] **Step 3: Implement**

```ts
// tests/i18n/helpers.ts
import { expect } from "vitest";

const isLocalizable = (href: string) => {
  if (!href.startsWith("/") || href.startsWith("//")) return false;
  const path = href.split(/[?#]/)[0] ?? href;
  return !path.startsWith("/api/") && !/\.[a-z0-9]+$/i.test(path);
};

export function expectEnglishMarkup(html: string): void {
  const han = html.match(/\p{Script=Han}+/gu);
  expect(han, `English markup still contains Chinese: ${han?.slice(0, 10).join(" ")}`).toBeNull();
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  const leaks = hrefs.filter(isLocalizable).filter((href) => !(href === "/en" || href.startsWith("/en/") || href.startsWith("/en?") || href.startsWith("/en#")));
  expect(leaks, `English markup links back to Chinese pages: ${leaks.join(", ")}`).toEqual([]);
}
```

- [ ] **Step 4: Run** — PASS. 同時把 Plan 1 的 `tests/i18n/services-page-en.test.ts` 的「no Chinese text」與「links inside /en」兩個 it 改成呼叫 `expectEnglishMarkup`（行為更嚴：連屬性也查）。跑 `npx vitest run tests/i18n` 全綠。

- [ ] **Step 5: Commit** — `test(i18n): add expectEnglishMarkup helper`

### Task A2: 選單（Navbar）＋字型守門調整

**Files:**
- Create: `src/i18n/zh/navbar-critical.ts`（首屏字：`navItems` 標籤、`MessageBoxTrigger` 文字、logo 旁文字、手機選單按鈕文字、開關選單的 aria 文字）
- Create: `src/i18n/zh/navbar-menu.ts`（mega panel 與手機子選單裡的其餘文字）
- Create: `src/i18n/en/navbar-critical.ts`、`src/i18n/en/navbar-menu.ts`
- Modify: `src/components/Navbar.tsx`
- Modify: `scripts/check-font-subset.mjs`（critical `sourceFiles` 加 `src/i18n/zh/navbar-critical.ts`；`criticalSourceText` 對這個檔取整檔非 ASCII 字）
- Modify: `scripts/build-font-subset.py`（critical 字集同樣納入 `src/i18n/zh/navbar-critical.ts` 整檔）
- Test: `tests/i18n/navbar-en.test.ts`

**Interfaces:**
- Consumes: `localeFromPathname`, `localizedHref`, `expectEnglishMarkup`.
- Produces: `Navbar` 內部依 `localeFromPathname(usePathname())` 選語言（不加 prop）。

- [ ] **Step 1: 改動前記錄** — `cp src/app/fonts/critical-charset.txt /tmp/critical-before.txt`；照 R1 存 `tests/fixtures/navbar.zh.html`（mock `usePathname` 回 `/`，`createElement(Navbar)`）。commit 快照。

- [ ] **Step 2: Write the failing test** — 照 R2；zh 部分比對快照（pathname `/`）；en 部分 mock pathname `/en/services`，`expectEnglishMarkup`，並斷言含 `Market Test`、`Consignment`、`Company Setup`、`Call Center`、`North America Retail`。另加一個 it：pathname `/en/services` 時輸出含 `href="/en/services/consignment"`。

- [ ] **Step 3: Run** → FAIL

- [ ] **Step 4: 實作** — 照 R3–R5。`navItems`、`ABOUT_MENU_ITEMS`、`INSIGHT_CHAPTER_FALLBACK_HREF` 等常數只留非文字欄位，文字從 copy 取。`insightChapterHref` 回傳值也要過 `localizedHref`。`MessageBoxTrigger` 文字從 critical copy 取。

- [ ] **Step 5: 字型守門** — 改兩支腳本後跑 `npm run font:rebuild`，再 `diff /tmp/critical-before.txt src/app/fonts/critical-charset.txt`。
Expected：**無差異**。有差異就代表首屏字集變了：檢查 `navbar-critical.ts` 是否多放或少放了字，修到無差異為止（不准接受差異）。`subset-charset.txt` 可以有新增（英文特殊字元）但不得少字。

- [ ] **Step 6: 登記與指紋（R7、R8）**，跑 `npx vitest run tests/i18n tests/components/navbar.test.ts` 全綠。

- [ ] **Step 7: Commit** — `feat(i18n): English navbar with unchanged critical font subset`

### Task A3: 頁尾（Footer）

**Files:**
- Create: `src/i18n/zh/footer.ts`、`src/i18n/en/footer.ts`
- Create: `src/components/FooterSwitch.tsx`（`"use client"`；`usePathname` → `localeFromPathname` → `<Footer locale={…} />`）
- Modify: `src/components/Footer.tsx`（收 `locale`；連結走 `localizedHref`）
- Modify: `src/app/layout.tsx`（`<Footer />` 改 `<FooterSwitch />`，其餘不動）
- Test: `tests/i18n/footer-en.test.ts`

- [ ] **Step 1:** R1 快照 `tests/fixtures/footer.zh.html`（`createElement(Footer)`）。
- [ ] **Step 2:** R2 測試（zh 比快照；en `createElement(Footer, { locale: "en" })` → `expectEnglishMarkup`）→ FAIL。
- [ ] **Step 3:** 實作。若 `Footer` 引用了不能在 client 端執行的東西（例如 `server-only`、資料庫），停下來回報，不要硬改。
- [ ] **Step 4:** R7、R8；`npx vitest run tests/i18n tests/components/footer.test.ts` 全綠。
- [ ] **Step 5:** Commit `feat(i18n): English footer`

### Task A4: 全站共用小元件

**Files（只處理會出現在多頁的元件；每個加 prop、預設值＝原中文）：**
- `src/components/services/ContactButton.tsx`（若有文字）
- `src/components/insights/InsightCta.tsx`
- `src/components/subsidy/SubsidiesCTASection.tsx`
- `src/components/ui/Carousel.tsx`、`src/components/ui/ExpandCard.tsx`（aria 文字）
- `src/components/services/ChapterBar.tsx`、`src/components/services/RelatedReading.tsx`
- `src/data/cta.ts`：新增 `CTA_LINE_EN = "Free 30-minute initial assessment. We reply within one business day."`（原 `CTA_LINE` 不動）
- Test: `tests/i18n/shared-components-en.test.ts`

- [ ] **Step 1:** 對每個元件跑一次 `npx vitest run`（既有測試基準）並記錄通過數。
- [ ] **Step 2:** 寫測試：每個元件以英文 props 渲染 → `expectEnglishMarkup`；以預設 props 渲染 → 含原中文字串（從原檔複製一到兩句當斷言）。→ FAIL
- [ ] **Step 3:** 實作（加 prop、預設中文）。`RelatedReading` 若讀文章資料，英文版本計畫先回傳 `null`（Plan 3 再接），測試斷言英文渲染為空字串。
- [ ] **Step 4:** 全套 `npx vitest run --maxWorkers=2` 通過數 ≥ Step 1 + 新增數。
- [ ] **Step 5:** Commit `feat(i18n): locale props for shared components`

### Task A5: 驗證與 PR
- [ ] `npx tsc --noEmit`；`npx eslint src`（只允許主線既有那 1 個 error）；`npx vitest run --maxWorkers=2`（貼出完整摘要行，含 failed 數）；建置（建置鎖指令）。
- [ ] `npm run start` 後：`curl -s localhost:3000/en/services | grep -c '\p{Han}'` 不可用 grep 判斷漢字——改用 `node -e` 讀取並以 `/\p{Script=Han}/u` 檢查；在**畫面可見文字**上，`/en/services` 只允許 `MessageBox` 對話框（Plan 4）與 `SiteStructuredData`（開放日）兩處殘留中文，列出殘留清單在 PR 描述。
- [ ] Push、開 PR（base main）：`feat(i18n): English navbar, footer and shared components (Plan 2 batch A)`，不合併。

---

## Batch B：首頁 `/en`

凍結：`src/components/home/**`、`src/data/homeFaq.ts`、`src/app/page.tsx`。

### Task B1: 首頁 hero（首屏字型敏感）
- Files: Create `src/i18n/zh/home-hero.ts`、`src/i18n/en/home-hero.ts`；Modify `src/components/home/HeroSection.tsx`；Modify 兩支字型腳本（critical 來源把 `HeroSection.tsx` 換成「`HeroSection.tsx` ＋ `src/i18n/zh/home-hero.ts` 整檔」）。
- [ ] 先 `cp src/app/fonts/critical-charset.txt /tmp/critical-before.txt`，R1 快照 → R2 → R3–R5 → 字型 rebuild → `diff` **必須無差異** → R7、R8 → commit。
- ⚠️ HeroSection 第 118／152 行的三處競態是刻意的（`eslint-disable` ＋理由註解），**不得改動那幾段邏輯**。

### Task B2: 首頁其餘區塊
- Components：`OpeningSection`、`JumpingSection`、`PositioningBand`（`ChaptersSection`）、`CasesSection`、`WhySection`（`OneContractSection`）、`HomeFAQ`（`src/data/homeFaq.ts` → 覆寫模式 `HOME_FAQ_ITEMS_EN`）、`CTASection`、`SubsidyAlertBand`。每個元件一個 module、一個 commit，照配方。
- `LatestInsightsSection`：英文版本計畫**不渲染**（傳空陣列時回傳 `null`；若現在空陣列會渲染空殼，加 `locale==="en"` 時回 `null`），Plan 3 再接英文文章。
- `JumpingSection` 提到躍馬：英文一律 Jumping Freight；中文若有「43 年」等數字英文必須保留。

### Task B3: `/en` 路由
- Create `src/app/en/page.tsx`：照 `src/app/page.tsx` 結構，所有區塊傳 `locale="en"`，`FaqJsonLd` 用英文 FAQ，`LatestInsightsSection` 不放；`metadata = createPageMetadata({ path: "/", locale: "en" })`（標題用 en layout 預設）。
- `EN_ROUTES` 加 `"/"`。
- Test：`src/app/en/page.tsx` 渲染結果 `expectEnglishMarkup`；`/` 中文頁各區塊黃金快照全過。

### Task B4: 驗證與 PR（同 A5，PR 標題 `… (Plan 2 batch B)`）

---

## Batch C：服務章節頁＋方法論＋運營優化

凍結：`src/components/services/**`、`src/data/chapters.ts`、`src/data/services.ts`、`src/components/services/methodology/**`。

### Task C1: 章節頁（5 頁共用 `ChapterPage`＋`chapters.ts`）
- Create `src/i18n/zh/chapter-page.ts`（`ChapterPage` 元件內固定文字）、`src/i18n/en/chapter-page.ts`、`src/i18n/en/chapters.ts`（`CHAPTERS_EN`，覆寫模式，**每個章節每個文字欄位都要覆寫**，含 `scenarios`、`faqs`、`takeaway`、相關閱讀標題）。
- `ChapterPage({ chapter, locale })`；`WaitlistForm`（海外客服頁）只翻欄位標籤與說明，送出值不變（Plan 4 處理送出語言）。
- 英文路由 5 個：`src/app/en/services/{product-testing,consignment,localization,call-center,north-america}/page.tsx`，各自 metadata 英文、JSON-LD 英文、傳 `CHAPTERS_EN.<key>`。
- 測試：對 `["m1","m3","m9","after","na"]` 每章：zh 黃金快照、en `expectEnglishMarkup`。登記一個 module `chapters`（zh：`{ copy: chapterPageZh, chapters: CHAPTERS }`）。
- 海外客服頁（`after`）英文必須保留 expected／Q1 2027（中文「預計 2027 Q1」）。北美頁不得出現月數或費用數字（中文沒有）。

### Task C2: 方法論（`MethodologyPage`＋`methodology/content.ts` 等）
- 照配方；`content.ts` 若是資料檔用覆寫模式（`src/i18n/en/methodology-content.ts`）。路由 `/en/services/methodology`。

### Task C3: 運營優化（`OptimizePage`＋`src/data/services.ts` 相關條目）
- 照配方；`services.ts` 覆寫模式只覆寫 Optimize 頁會用到的條目；**Aaron 2026-10-04 決定：「自然流量平均成長 200%+。」中英文都拿掉**——先單獨一個 commit 刪中文 `src/data/services.ts` 那句（`fix(copy): drop unsourced 200%+ traffic claim`，同步更新受影響的快照／指紋），英文不翻這句；其他無出處宣稱照翻不加碼也不刪，並在 PR 描述列出。路由 `/en/services/optimize`。

### Task C4: 驗證與 PR（同 A5，`… (Plan 2 batch C)`）

---

## Batch D：關於、創辦人、聯絡、案例、處境比對

凍結：`src/components/{about,contact,cases,assess}/**`、`src/data/{cases,aboutPhotoSlots}.ts`。

### Task D1: 關於我們（`AboutPage`、`FreightRateChart`、`NetworkGlobe`、`StoryChapters`、`aboutPhotoSlots`）
- 照配方，路由 `/en/about`。`FreightRateChart` 的數字（1,420、10,377 美元、七倍）英文必須保留；「七倍」→ "more than seven times"。⚠️ 主線 `FreightRateChart.tsx:21` 有既存 eslint error，**不要順手修**。

### Task D2: 創辦人專欄（`AaronAuthorPage`、`AuthorArticleList`）
- 照配方，路由 `/en/about/aaron-yu`。文章清單在英文版本計畫顯示空狀態文字（英文）或不渲染清單區，Plan 3 再接。

### Task D3: 聯絡頁介面（`ContactPage`）
- 只翻介面文字（標題、說明、欄位標籤、placeholder、聯絡資訊標籤、回覆時間「We reply within one business day」）；**表單送出邏輯、送出值、`/api/lead` 不動**（Plan 4）。英文頁聯絡方式只放 Email `aaron.yu@reborn.in`，不顯示 LINE（若中文頁有 LINE 區塊，英文版不渲染該區塊）。路由 `/en/contact`。

### Task D4: 案例總覽＋案例頁（`CasesPage`、`CaseDetailPage`、`src/data/cases.ts`）
- `CASES_EN` 覆寫模式；`/en/cases`、`/en/cases/[slug]`（`generateStaticParams` 同中文）。`EN_ROUTES` 加 `/cases` 與每個案例路徑。
- 案例的日期、數量、金額英文必須保留；匿名寫法（例如宇松）照中文匿名，不得補名字。

### Task D5: 處境比對（`AssessWizard`、`MatcherFlow`、`InteractiveScorecard`）
- 照配方；`/en/assess`、`/en/assess/result`。結果頁 URL 參數的值不翻（`MARKET_SHORT` 等 key 保持原樣），只翻顯示文字。

### Task D6: 驗證與 PR（同 A5，`… (Plan 2 batch D)`）

---

## Batch E：資源頁、補助頁

凍結：`src/app/resources/**`、`src/components/subsidy/**`、`src/data/subsidies.ts`。

### Task E1: 資源頁（`src/app/resources/page.tsx` 內文字）
- 文字在 page 檔內：抽到 `src/i18n/{zh,en}/resources-page.ts`，把頁面主體拆成 `src/components/resources/ResourcesPage.tsx`（收 `locale`），中文 page 檔改為呼叫它；黃金快照比對拆分前後中文輸出逐字相同。路由 `/en/resources`。

### Task E2: 補助頁（`src/app/resources/subsidies/page.tsx`、`SubsidyPlans`、`SubsidyPlanPanel`、`SubsidyStatus`、`SubsidyCompare`、`subsidies.ts`）
- 同 E1 拆出 `SubsidiesPage` 元件；`SUBSIDIES_EN` 覆寫模式；政府機關與計畫名稱用官方英文名（查不到官方英文名時用直譯並在首次出現附中文原名的拼音或英文說明——**不得含漢字**，例如 "TAITRA's Buyer Direct program"）。民國年一律轉西元（中文已並列西元的照西元）。截止日、金額、比例必須保留。
- 路由 `/en/resources/subsidies`。

### Task E3: 驗證與 PR（同 A5，`… (Plan 2 batch E)`）

---

## 每批派工後（Claude 執行，不派 Codex）

- 讀 PR diff：中文檔只准「搬移」不准改字（`git diff` 中文字串的刪除行必須在 zh 模組的新增行裡逐字出現）；英文抽查 20 句對照中文。
- 自己跑 `npx tsc --noEmit`、`npx vitest run --maxWorkers=2`、建置。
- 合併後正式站：該批每個 `/en/...` 回 200、`noindex`、無 `hreflang`；對應中文頁回 200 且 `index, follow`；Playwright 全頁截圖目視一次。
- 通知 Aaron：該批上線＋解除凍結。

## Self-Review（已執行）

1. **Spec 覆蓋：** 規格 §6 P1（20 頁中除 `/insights` 兩頁外全部）＋選單頁尾 → Batch A–E。文章、詢問、開放日明確排除並指向 Plan 3／4／開放日。
2. **佔位字：** `SET_AFTER_FIRST_RUN` 為刻意佔位，R8 明確填入且有測試把關；配方中的 `<module>`／`<Component>` 為模板參數，每批已列出實際檔案與路由。
3. **型別一致：** `Locale`、`localizedHref`、`expectEnglishMarkup`、`I18N_MODULES` 欄位（`name, zh, en, sourceFingerprint, enFile`）與 Plan 1 一致。
4. **Review Focus：** 字型（A2、B1 diff 無差異）、選單連結（A2 測試）、覆寫漏欄位（`expectEnglishMarkup` 整份無漢字）、共用元件預設值（各頁黃金快照）、數字保留（registry 一致性檢查）。
