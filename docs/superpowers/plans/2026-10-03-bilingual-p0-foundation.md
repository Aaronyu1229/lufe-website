# 中英雙語 Plan 1／4：地基＋試點頁（/en/services）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立英文版的共用地基（`/en` 路由、語系工具、英文 layout＋noindex、隱藏中的切換鈕、中英漂移與數字一致性守門），並用 `/services` 做第一個完整英文試點頁；中文站任何網址與輸出都不變。

**Architecture:** 不搬動中文路由樹。新增 `src/app/en/**` 薄頁面（同元件、傳 `locale="en"`）與一個巢狀 `src/app/en/layout.tsx`（覆寫 metadata、noindex、用 client 元件把 `<html lang>` 設成 `en`）。語系判斷一律由路徑前綴 `/en` 決定（`src/i18n/locale.ts`）。每個翻譯模組的中文與英文放在 `src/i18n/zh/*`、`src/i18n/en/*`，形狀相同；英文模組存一個中文指紋，中文改了英文沒更新 → 測試紅。

**Tech Stack:** Next.js 16.2.2 App Router、React 19.2.4、TypeScript、Tailwind v4、vitest 4（`environment: node`，`renderToStaticMarkup`）。

**Spec:** `docs/superpowers/specs/2026-10-03-bilingual-site-design.md`

**本計畫範圍：** 規格第 6 段 P0 全部＋P1 的第一頁（`/services`）。其餘頁面（Plan 2）、文章與自動駕駛（Plan 3）、英文詢問 Email（Plan 4，含 JP repo）、開放日另立計畫。

## Global Constraints

- 中文網址全部不變；英文＝同路徑加 `/en` 前綴。
- 不依瀏覽器語言自動跳轉；預設永遠中文。
- 開放前（`EN_PUBLIC = false`）：切換鈕不顯示、`/en` 一律 `robots: { index: false, follow: true }`、不輸出 hreflang、sitemap 不含 `/en`、`robots.ts` 不得 disallow `/en`。
- 用語表（定案）：鹿飛＝LUFÉ；市場探查＝Market Test；寄賣＝Consignment；公司落地＝Company Setup；海外客服＝Call Center；北美通路＝North America Retail；躍馬企業＝Jumping Freight；免費初步評估 30 分鐘＝Free 30-minute initial assessment；一個工作天內回覆＝We reply within one business day。
- 翻譯鐵律：英文不得比中文多說——英文出現的阿拉伯數字必須都出自中文；中文的阿拉伯數字（「N 萬」換算成 N×10000）必須都出現在英文；英文的保留語（expected／estimated／planned）次數 ≥ 中文「預計」次數；金額一律 `NT$`、不換算外幣；英文字串不得含漢字。
- 英文頁頁尾**不**放「以中文版為準」。
- 不改任何中文文案。
- 新增中文字或英文特殊字元（₱ é ñ 等）會被字型守門擋：先 `npm run font:rebuild` 再 commit `src/app/fonts/` 兩檔。
- 建置一律：`until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done; npm run build; rmdir /tmp/lufe-build.lock`（只准 mkdir／rmdir）。
- Next 16 與訓練資料不同：寫 layout／metadata 前先讀 `node_modules/next/dist/docs/` 相關章節（repo `AGENTS.md` 要求）。
- 程式註解用英文；commit 結尾 `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`。

## Review Focus

1. **中文頁被不小心改到**：`/services` 中文輸出必須與改動前逐字相同 → Task 6 Step 1 先存黃金快照，Step 6 比對。
2. **英文頁點連結掉回中文**：`/en/services` 輸出裡任何站內 `href` 都必須以 `/en` 開頭（錨點 `#…`、`/api/`、靜態檔、外部連結除外）→ Task 6 測試。
3. **`/en` 路徑讓既有行為壞掉**：深色 hero 判斷、選單 active、補助情境文案在 `/en/...` 要和中文同頁一致 → Task 2 測試。
4. **`/en/services` 被 Google 收錄**：開放前 metadata 必須 noindex、不得有 hreflang → Task 4 測試。
5. **之後有人只改中文**：改任何一句中文 → 指紋測試紅、錯誤訊息直接告訴他新指紋與要更新的英文檔 → Task 3＋Task 6 測試。

---

### Task 1: 語系工具與開放旗標

**Files:**
- Create: `src/i18n/locale.ts`
- Create: `src/i18n/config.ts`
- Test: `tests/i18n/locale.test.ts`

**Interfaces:**
- Produces:
  - `type Locale = "zh" | "en"`
  - `localeFromPathname(pathname: string | null | undefined): Locale`
  - `stripLocale(pathname: string): string`
  - `localizedHref(locale: Locale, href: string): string`
  - `switchLocalePath(pathname: string, target: Locale, hasEnglish: (zhPath: string) => boolean): string`
  - `EN_PUBLIC: boolean`（`false`）、`EN_ROUTES: readonly string[]`、`hasEnglishRoute(zhPath: string): boolean`

- [ ] **Step 1: Write the failing test**

```ts
// tests/i18n/locale.test.ts
import { describe, expect, it } from "vitest";

import { EN_PUBLIC, EN_ROUTES, hasEnglishRoute } from "@/i18n/config";
import { localeFromPathname, localizedHref, stripLocale, switchLocalePath } from "@/i18n/locale";

describe("locale helpers", () => {
  it("detects locale from the /en prefix only", () => {
    expect(localeFromPathname("/en")).toBe("en");
    expect(localeFromPathname("/en/services")).toBe("en");
    expect(localeFromPathname("/english-guide")).toBe("zh");
    expect(localeFromPathname("/services")).toBe("zh");
    expect(localeFromPathname(null)).toBe("zh");
  });

  it("strips the /en prefix", () => {
    expect(stripLocale("/en")).toBe("/");
    expect(stripLocale("/en/services/consignment")).toBe("/services/consignment");
    expect(stripLocale("/services")).toBe("/services");
    expect(stripLocale("/english-guide")).toBe("/english-guide");
  });

  it("localizes internal page links and leaves everything else alone", () => {
    expect(localizedHref("zh", "/services")).toBe("/services");
    expect(localizedHref("en", "/")).toBe("/en");
    expect(localizedHref("en", "/services")).toBe("/en/services");
    expect(localizedHref("en", "/about#team")).toBe("/en/about#team");
    expect(localizedHref("en", "/insights?chapter=m1")).toBe("/en/insights?chapter=m1");
    expect(localizedHref("en", "/en/services")).toBe("/en/services");
    expect(localizedHref("en", "#chapters")).toBe("#chapters");
    expect(localizedHref("en", "/api/lead")).toBe("/api/lead");
    expect(localizedHref("en", "/images/a.webp")).toBe("/images/a.webp");
    expect(localizedHref("en", "https://jumping.group")).toBe("https://jumping.group");
    expect(localizedHref("en", "//cdn.example.com/x")).toBe("//cdn.example.com/x");
    expect(localizedHref("en", "mailto:aaron.yu@reborn.in")).toBe("mailto:aaron.yu@reborn.in");
  });

  it("switches to the same page, falling back when English is missing", () => {
    const has = (path: string) => path === "/services";
    expect(switchLocalePath("/services", "en", has)).toBe("/en/services");
    expect(switchLocalePath("/en/services", "zh", has)).toBe("/services");
    expect(switchLocalePath("/insights/some-article", "en", has)).toBe("/en/insights");
    expect(switchLocalePath("/contact", "en", has)).toBe("/en");
    expect(switchLocalePath("/en", "zh", has)).toBe("/");
  });

  it("keeps English closed and lists the pilot route", () => {
    expect(EN_PUBLIC).toBe(false);
    expect(EN_ROUTES).toContain("/services");
    expect(hasEnglishRoute("/services")).toBe(true);
    expect(hasEnglishRoute("/contact")).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/i18n/locale.test.ts`
Expected: FAIL（`Cannot find module '@/i18n/config'`）

- [ ] **Step 3: Write minimal implementation**

```ts
// src/i18n/locale.ts
export type Locale = "zh" | "en";

const EN_PREFIX = "/en";

export function localeFromPathname(pathname: string | null | undefined): Locale {
  if (!pathname) return "zh";
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`) ? "en" : "zh";
}

export function stripLocale(pathname: string): string {
  if (pathname === EN_PREFIX) return "/";
  return pathname.startsWith(`${EN_PREFIX}/`) ? pathname.slice(EN_PREFIX.length) : pathname;
}

const isStaticFile = (path: string) => /\.[a-z0-9]+$/i.test(path);

export function localizedHref(locale: Locale, href: string): string {
  if (locale === "zh") return href;
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const path = href.split(/[?#]/)[0] ?? href;
  if (path.startsWith("/api/") || isStaticFile(path)) return href;
  if (localeFromPathname(path) === "en") return href;
  if (path === "/") return `${EN_PREFIX}${href.slice(1)}`;
  return `${EN_PREFIX}${href}`;
}

export function switchLocalePath(pathname: string, target: Locale, hasEnglish: (zhPath: string) => boolean): string {
  const base = stripLocale(pathname);
  if (target === "zh") return base;
  if (hasEnglish(base)) return localizedHref("en", base);
  return base.startsWith("/insights/") ? `${EN_PREFIX}/insights` : EN_PREFIX;
}
```

```ts
// src/i18n/config.ts
// Flip to true only on open day (spec §6 P5): shows the toggle, allows indexing, emits hreflang.
export const EN_PUBLIC = false;

// Chinese paths that already have a finished English page. Grows page by page (Plan 2).
export const EN_ROUTES: readonly string[] = ["/services"];

export function hasEnglishRoute(zhPath: string): boolean {
  return EN_ROUTES.includes(zhPath);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/i18n/locale.test.ts`
Expected: PASS（5 tests）

- [ ] **Step 5: Commit**

```bash
git add src/i18n/locale.ts src/i18n/config.ts tests/i18n/locale.test.ts
git commit -m "feat(i18n): add locale helpers and closed EN_PUBLIC flag"
```

---

### Task 2: 讓依路徑判斷的既有程式看得懂 `/en`

**Files:**
- Modify: `src/components/Navbar.tsx:52-76`（`switchInsightChapterInPlace`、`normalizePathname`）
- Modify: `src/components/DelightLayer.tsx:106`
- Modify: `src/data/subsidies.ts`（`getContextualCopy`、`getContextualSubsidy`）
- Test: `tests/i18n/locale-aware-paths.test.ts`

**Interfaces:**
- Consumes: `stripLocale` from Task 1.
- Produces: `normalizePathname("/en/services") === "/services"`（之後所有用它的地方自動支援 `/en`）。

- [ ] **Step 1: Write the failing test**

```ts
// tests/i18n/locale-aware-paths.test.ts
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

import { normalizePathname, pathnameHasDarkHero } from "@/components/Navbar";
import { getContextualCopy, getContextualSubsidy } from "@/data/subsidies";

describe("paths under /en behave like their Chinese counterparts", () => {
  it("normalizes /en paths to the Chinese path", () => {
    expect(normalizePathname("/en")).toBe("/");
    expect(normalizePathname("/en/services")).toBe("/services");
    expect(normalizePathname("/index")).toBe("/");
  });

  it("keeps dark hero detection identical", () => {
    for (const path of ["/", "/services", "/services/consignment", "/about", "/insights", "/contact"]) {
      expect(pathnameHasDarkHero(normalizePathname(`/en${path === "/" ? "" : path}`))).toBe(pathnameHasDarkHero(path));
    }
  });

  it("picks the same contextual subsidy copy", () => {
    expect(getContextualCopy("/en/services/product-testing")).toEqual(getContextualCopy("/services/product-testing"));
    expect(getContextualSubsidy("/en/services/localization")).toEqual(getContextualSubsidy("/services/localization"));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/i18n/locale-aware-paths.test.ts`
Expected: FAIL（`normalizePathname("/en/services")` 回傳 `/en/services`）

- [ ] **Step 3: Write minimal implementation**

`src/components/Navbar.tsx` — add import and change two functions:

```ts
import { stripLocale } from "@/i18n/locale";
```

```ts
function switchInsightChapterInPlace(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (stripLocale(window.location.pathname) !== "/insights") return;
  event.preventDefault();
  window.history.pushState(null, "", href);
  window.dispatchEvent(new PopStateEvent("popstate"));
  document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" });
}
```

```ts
export function normalizePathname(pathname: string | null | undefined): string {
  if (!pathname || pathname === "/index") return "/";
  return stripLocale(pathname);
}
```

`src/components/DelightLayer.tsx:106`:

```ts
    const heroBackdrops = stripLocale(pathname ?? "") === "/" ? [] : Array.from(root.querySelectorAll<HTMLElement>(".lufe-hero-backdrop"));
```
（並在檔頭 `import { stripLocale } from "@/i18n/locale";`）

`src/data/subsidies.ts` — 在兩個函式開頭各加一行，其餘不動：

```ts
import { stripLocale } from "@/i18n/locale";
```

```ts
export function getContextualCopy(pathname: string): ContextualCopy {
  if (!pathname) return DEFAULT_COPY;
  const path = stripLocale(pathname);
  const sorted = [...CONTEXTUAL_COPY].sort(
    (a, b) => b.pathPrefix.length - a.pathPrefix.length
  );
  for (const entry of sorted) {
    if (path.startsWith(entry.pathPrefix)) return entry.copy;
  }
  return DEFAULT_COPY;
}
```

```ts
export function getContextualSubsidy(pathname: string): Subsidy | null {
  const path = stripLocale(pathname);
  // Longest prefix wins so /services/channel-entry matches before /services
  const sorted = [...CONTEXT_SUBSIDY_MAP].sort(
    (a, b) => b.pathPrefix.length - a.pathPrefix.length
  );
  for (const entry of sorted) {
    if (path.startsWith(entry.pathPrefix)) {
      const s = getSubsidyBySlug(entry.subsidySlug);
      if (s) return s;
    }
  }
  return null;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/i18n tests/components/navbar.test.ts`
Expected: PASS（既有 navbar 測試不得變紅）

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.tsx src/components/DelightLayer.tsx src/data/subsidies.ts tests/i18n/locale-aware-paths.test.ts
git commit -m "feat(i18n): make path-based UI logic ignore the /en prefix"
```

---

### Task 3: 漂移守門與中英一致性檢查

**Files:**
- Create: `src/i18n/fingerprint.ts`
- Create: `src/i18n/consistency.ts`
- Test: `tests/i18n/consistency.test.ts`

**Interfaces:**
- Produces:
  - `fingerprint(value: unknown): string`（16 位十六進位）
  - `flattenStrings(value: unknown): string[]`
  - `extractNumbers(text: string, locale: Locale): number[]`
  - `hedgeCount(text: string, locale: Locale): number`
  - `checkConsistency(zh: unknown, en: unknown): string[]`（空陣列＝通過；否則每條是一句英文問題描述）

- [ ] **Step 1: Write the failing test**

```ts
// tests/i18n/consistency.test.ts
import { describe, expect, it } from "vitest";

import { checkConsistency, extractNumbers, flattenStrings, hedgeCount } from "@/i18n/consistency";
import { fingerprint } from "@/i18n/fingerprint";

describe("fingerprint", () => {
  it("is stable and changes when any string changes", () => {
    const a = { title: "四個章節", items: ["一", "二"] };
    expect(fingerprint(a)).toBe(fingerprint({ title: "四個章節", items: ["一", "二"] }));
    expect(fingerprint(a)).not.toBe(fingerprint({ title: "四個章節", items: ["一", "三"] }));
    expect(fingerprint(a)).toMatch(/^[0-9a-f]{16}$/);
  });
});

describe("number extraction", () => {
  it("converts 萬 amounts and ranges in Chinese", () => {
    expect(extractNumbers("市場探查 1～2 萬，起手包 7 萬，前 10 家", "zh").sort((x, y) => x - y)).toEqual([10, 10000, 20000, 70000]);
  });
  it("reads comma-grouped English numbers", () => {
    expect(extractNumbers("NT$10,000–20,000 for the first 10 brands, Q1 2027", "en").sort((x, y) => x - y)).toEqual([1, 10, 2027, 10000, 20000]);
  });
});

describe("hedges", () => {
  it("counts 預計 and English equivalents", () => {
    expect(hedgeCount("預計 2027 Q1 開放", "zh")).toBe(1);
    expect(hedgeCount("Expected to open in Q1 2027; estimated timeline", "en")).toBe(2);
  });
});

describe("checkConsistency", () => {
  const zh = { a: "預計 2027 Q1 開放", b: ["市場探查 1～2 萬", "第三個月"] };

  it("passes a faithful translation", () => {
    const en = { a: "Expected to open in Q1 2027", b: ["Market Test NT$10,000–20,000", "Month 3"] };
    expect(checkConsistency(zh, en)).toEqual([]);
  });

  it("flags a dropped hedge", () => {
    const en = { a: "Opens in Q1 2027", b: ["Market Test NT$10,000–20,000", "Month 3"] };
    expect(checkConsistency(zh, en).join("\n")).toContain("hedge");
  });

  it("flags a number English invented", () => {
    const en = { a: "Expected to open in Q1 2027", b: ["Market Test NT$10,000–20,000, results in 14 days", "Month 3"] };
    expect(checkConsistency(zh, en).join("\n")).toContain("14");
  });

  it("flags a number English dropped", () => {
    const en = { a: "Expected to open in Q1", b: ["Market Test NT$10,000–20,000", "Month 3"] };
    expect(checkConsistency(zh, en).join("\n")).toContain("2027");
  });

  it("flags Han characters left in English", () => {
    const en = { a: "Expected to open in Q1 2027", b: ["市場探查 NT$10,000–20,000", "Month 3"] };
    expect(checkConsistency(zh, en).join("\n")).toContain("Han");
  });

  it("flattens nested strings in order", () => {
    expect(flattenStrings({ x: "a", y: [{ z: "b" }, ["c", 1]] })).toEqual(["a", "b", "c"]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/i18n/consistency.test.ts`
Expected: FAIL（module not found）

- [ ] **Step 3: Write minimal implementation**

```ts
// src/i18n/fingerprint.ts
import { createHash } from "node:crypto";

/** Short, stable hash of a copy object; English modules store the hash of the Chinese they were translated from. */
export function fingerprint(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 16);
}
```

```ts
// src/i18n/consistency.ts
import type { Locale } from "./locale";

export function flattenStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(flattenStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(flattenStrings);
  return [];
}

// Single Chinese numerals (第三個月 -> Month 3) may appear as digits in English.
const CHINESE_NUMERALS: Record<string, number> = { 一: 1, 二: 2, 兩: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 };
const WAN_PATTERN = /(\d+(?:\.\d+)?)(?:\s*[～~\-–]\s*(\d+(?:\.\d+)?))?\s*萬/g;
const NUMBER_PATTERN = /\d[\d,]*(?:\.\d+)?/g;

export function extractNumbers(text: string, locale: Locale): number[] {
  const numbers: number[] = [];
  let rest = text;
  if (locale === "zh") {
    rest = text.replace(WAN_PATTERN, (_match, low: string, high: string | undefined) => {
      numbers.push(Math.round(Number(low) * 10000));
      if (high) numbers.push(Math.round(Number(high) * 10000));
      return " ";
    });
  }
  for (const raw of rest.match(NUMBER_PATTERN) ?? []) numbers.push(Number(raw.replaceAll(",", "")));
  return numbers;
}

function chineseNumeralValues(text: string): number[] {
  return [...text].flatMap((char) => (char in CHINESE_NUMERALS ? [CHINESE_NUMERALS[char]] : []));
}

export function hedgeCount(text: string, locale: Locale): number {
  const pattern = locale === "zh" ? /預計/g : /\b(expected|estimated|planned)\b/gi;
  return text.match(pattern)?.length ?? 0;
}

export function checkConsistency(zh: unknown, en: unknown): string[] {
  const zhText = flattenStrings(zh).join("\n");
  const enText = flattenStrings(en).join("\n");
  const problems: string[] = [];

  const zhNumbers = new Set(extractNumbers(zhText, "zh"));
  const enNumbers = new Set(extractNumbers(enText, "en"));
  const allowed = new Set([...zhNumbers, ...chineseNumeralValues(zhText)]);
  for (const n of enNumbers) if (!allowed.has(n)) problems.push(`English adds number ${n} that the Chinese does not have`);
  for (const n of zhNumbers) if (!enNumbers.has(n)) problems.push(`English drops number ${n} from the Chinese`);

  const zhHedges = hedgeCount(zhText, "zh");
  const enHedges = hedgeCount(enText, "en");
  if (enHedges < zhHedges) problems.push(`English has ${enHedges} hedge words (expected/estimated/planned) but Chinese has ${zhHedges} 預計`);

  const han = enText.match(/\p{Script=Han}+/gu);
  if (han) problems.push(`English still contains Han characters: ${han.join(" ")}`);

  return problems;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/i18n/consistency.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/i18n/fingerprint.ts src/i18n/consistency.ts tests/i18n/consistency.test.ts
git commit -m "feat(i18n): add drift fingerprint and zh/en consistency checks"
```

---

### Task 4: 英文 layout、noindex、`<html lang>` 與 SEO 參數

**Files:**
- Create: `src/components/i18n/HtmlLang.tsx`
- Create: `src/app/en/layout.tsx`
- Modify: `src/lib/seo.ts`（`createPageMetadata` 加 `locale`）
- Test: `tests/i18n/en-seo.test.ts`

**Interfaces:**
- Consumes: `EN_PUBLIC`, `hasEnglishRoute`, `localizedHref`, `Locale`.
- Produces: `createPageMetadata({ path, title?, description?, locale? })`——`path` 永遠傳**中文路徑**；`locale: "en"` 時 canonical 自動變 `/en...`；`EN_PUBLIC && hasEnglishRoute(path)` 時才輸出 `alternates.languages`。

- [ ] **Step 0: Read Next 16 docs**

Run: `ls node_modules/next/dist/docs/` 然後讀 layouts／metadata（`generateMetadata`、metadata merging）章節，確認巢狀 layout 的 `metadata` 會覆寫 root 的 `title`／`openGraph`／`robots`（淺層覆寫）。若文件與下方做法不符，停下來回報，不要猜。

- [ ] **Step 1: Write the failing test**

```ts
// tests/i18n/en-seo.test.ts
import { describe, expect, it } from "vitest";

import robots from "@/app/robots";
import { metadata as enLayoutMetadata } from "@/app/en/layout";
import { createPageMetadata } from "@/lib/seo";

describe("English SEO while closed", () => {
  it("noindexes the whole /en tree", () => {
    expect(enLayoutMetadata.robots).toEqual({ index: false, follow: true });
    expect(enLayoutMetadata.openGraph).toMatchObject({ locale: "en_US", siteName: "LUFÉ" });
    expect(JSON.stringify(enLayoutMetadata)).not.toMatch(/\p{Script=Han}/u);
  });

  it("does not block /en in robots.txt (Google must be able to see noindex)", () => {
    expect(JSON.stringify(robots())).not.toContain("/en");
  });

  it("points English canonicals at /en and emits no hreflang yet", () => {
    const en = createPageMetadata({ path: "/services", title: "Services", locale: "en" });
    expect(en.alternates).toEqual({ canonical: "/en/services" });
    const zh = createPageMetadata({ path: "/services", title: "服務" });
    expect(zh.alternates).toEqual({ canonical: "/services" });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/i18n/en-seo.test.ts`
Expected: FAIL（`@/app/en/layout` 不存在）

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/i18n/HtmlLang.tsx
"use client";

import { useEffect } from "react";

/** The root layout renders lang="zh-Hant"; English pages correct it after hydration. */
export function HtmlLang({ lang }: { readonly lang: string }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => { document.documentElement.lang = previous; };
  }, [lang]);
  return null;
}
```

```tsx
// src/app/en/layout.tsx
import type { Metadata } from "next";

import { HtmlLang } from "@/components/i18n/HtmlLang";
import { EN_PUBLIC } from "@/i18n/config";

const EN_TITLE = "LUFÉ — Your first year in the Philippines, after the freight arrives";
const EN_DESCRIPTION = "Freight gets your goods there; the work starts after. LUFÉ walks Taiwanese brands through their first year in the Philippines: Market Test, Consignment, Company Setup and Call Center — four services, each with its own price. Start with NT$10,000–20,000 to see how the market responds. Our founder comes from Jumping Freight, backed by 43 years of international logistics.";

export const metadata: Metadata = {
  title: { default: EN_TITLE, template: "%s | LUFÉ" },
  description: EN_DESCRIPTION,
  keywords: "Philippines market entry, Taiwanese brands, importers in the Philippines, consignment, company registration Philippines, FDA registration Philippines, call center outsourcing, LUFÉ",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "LUFÉ",
    title: EN_TITLE,
    description: EN_DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "LUFÉ" }],
  },
  twitter: { card: "summary_large_image", title: EN_TITLE, description: EN_DESCRIPTION, images: ["/og-image.jpg"] },
  robots: EN_PUBLIC ? { index: true, follow: true } : { index: false, follow: true },
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <><HtmlLang lang="en" />{children}</>;
}
```

`src/lib/seo.ts` — replace `PageMetadataOptions` and `createPageMetadata`:

```ts
import { EN_PUBLIC, hasEnglishRoute } from "@/i18n/config";
import { localizedHref, type Locale } from "@/i18n/locale";

type PageMetadataOptions = {
  /** Always the Chinese path; English canonicals are derived from it. */
  readonly path: string;
  readonly title?: string;
  readonly description?: string;
  readonly locale?: Locale;
};

export function createPageMetadata({ path, title, description, locale = "zh" }: PageMetadataOptions): Metadata {
  const canonical = localizedHref(locale, path);
  const languages = EN_PUBLIC && hasEnglishRoute(path)
    ? { languages: { "zh-Hant": path, en: localizedHref("en", path), "x-default": path } }
    : {};
  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical, ...languages },
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/i18n tests/seo`
Expected: PASS（既有 `tests/seo/technical-seo.test.ts` 不得變紅）

- [ ] **Step 5: Commit**

```bash
git add src/components/i18n/HtmlLang.tsx src/app/en/layout.tsx src/lib/seo.ts tests/i18n/en-seo.test.ts
git commit -m "feat(i18n): add noindexed /en layout and locale-aware page metadata"
```

---

### Task 5: 切換鈕（開放前隱藏）

**Files:**
- Create: `src/components/i18n/LanguageToggle.tsx`
- Modify: `src/components/Navbar.tsx:257`（桌機，`MessageBoxTrigger` 前）與 `:283`（手機選單，`MessageBoxTrigger` 前）
- Test: `tests/i18n/language-toggle.test.ts`

**Interfaces:**
- Consumes: `EN_PUBLIC`, `hasEnglishRoute`, `localeFromPathname`, `switchLocalePath`.
- Produces: `LanguageToggle({ pathname, className?, visible? })`——`visible` 預設 `EN_PUBLIC`，只給測試覆寫。

- [ ] **Step 1: Write the failing test**

```ts
// tests/i18n/language-toggle.test.ts
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LanguageToggle } from "@/components/i18n/LanguageToggle";

const render = (pathname: string, visible?: boolean) =>
  renderToStaticMarkup(createElement(LanguageToggle, { pathname, visible }));

describe("LanguageToggle", () => {
  it("renders nothing while English is closed", () => {
    expect(render("/services")).toBe("");
  });

  it("links a Chinese page to its English twin", () => {
    const html = render("/services", true);
    expect(html).toContain('href="/en/services"');
    expect(html).toMatch(/hreflang="en"/i);
    expect(html).toContain(">EN<");
  });

  it("links an English page back to Chinese", () => {
    const html = render("/en/services", true);
    expect(html).toContain('href="/services"');
    expect(html).toMatch(/hreflang="zh-Hant"/i);
    expect(html).toContain(">中文<");
  });

  it("falls back to /en when the page has no English yet", () => {
    expect(render("/contact", true)).toContain('href="/en"');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/i18n/language-toggle.test.ts`
Expected: FAIL（module not found）

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/i18n/LanguageToggle.tsx
import { EN_PUBLIC, hasEnglishRoute } from "@/i18n/config";
import { localeFromPathname, switchLocalePath } from "@/i18n/locale";

export function LanguageToggle({ pathname, className = "", visible = EN_PUBLIC }: {
  readonly pathname: string;
  readonly className?: string;
  readonly visible?: boolean;
}) {
  if (!visible) return null;
  const target = localeFromPathname(pathname) === "en" ? "zh" : "en";
  const href = switchLocalePath(pathname, target, hasEnglishRoute);
  // Plain <a>: switching language is a full navigation, and the label is written in the target language.
  return target === "en"
    ? <a href={href} hrefLang="en" lang="en" className={className}>EN</a>
    : <a href={href} hrefLang="zh-Hant" lang="zh-Hant" className={className}>中文</a>;
}
```

`src/components/Navbar.tsx`：`Navbar` 內已有 `const pathname = normalizePathname(usePathname());`，但 toggle 需要**原始**路徑。在同一處加：

```ts
  const rawPathname = usePathname() ?? "/";
```

桌機（第 257 行 `MessageBoxTrigger` 之前）：

```tsx
            <LanguageToggle pathname={rawPathname} className="hidden px-2 text-[14px] font-semibold min-[900px]:inline-flex" />
```

手機（第 283 行 `MessageBoxTrigger` 之前）：

```tsx
        <LanguageToggle pathname={rawPathname} className="mx-3 mt-3 flex justify-center border border-bd py-2 text-[14px] font-semibold" />
```

並 `import { LanguageToggle } from "@/components/i18n/LanguageToggle";`。注意：顏色沿用該位置相鄰連結的 class（深色 hero 時用白字），實作時對照第 240–260 行既有連結的 class 取同一組，不要自訂顏色。

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/i18n tests/components/navbar.test.ts`
Expected: PASS；navbar 既有斷言不變（toggle 隱藏中，HTML 無差異）。

- [ ] **Step 5: Commit**

```bash
git add src/components/i18n/LanguageToggle.tsx src/components/Navbar.tsx tests/i18n/language-toggle.test.ts
git commit -m "feat(i18n): add hidden language toggle to navbar"
```

---

### Task 6: 試點頁 `/en/services`

**Files:**
- Create: `tests/fixtures/services-page.zh.html`（改動前的中文黃金快照）
- Create: `src/i18n/zh/services-page.ts`
- Create: `src/i18n/en/services-page.ts`
- Create: `src/i18n/registry.ts`
- Create: `src/app/en/services/page.tsx`
- Modify: `src/components/services/ServicesPage.tsx`（文字改讀 copy 物件、連結改走 `localizedHref`、收 `locale` prop）
- Modify: `src/components/faq/FaqSection.tsx`（`moreLabel` prop，預設「還有其他問題？」）
- Modify: `src/components/ScrollCue.tsx`（`label` prop，預設「往下看」）
- Test: `tests/i18n/services-page-en.test.ts`、`tests/i18n/registry.test.ts`

**Interfaces:**
- Consumes: `Locale`, `localizedHref`, `fingerprint`, `checkConsistency`, `createPageMetadata({ locale })`.
- Produces:
  - `ServicesPage({ locale?: Locale })`（預設 `"zh"`，中文輸出與現在逐字相同）
  - `type ServicesPageCopy`、`servicesPageZh`、`servicesPageEn`、`SERVICES_PAGE_SOURCE_FINGERPRINT`
  - `I18N_MODULES: readonly { name: string; zh: unknown; en: unknown; sourceFingerprint: string; enFile: string }[]`（Plan 2 每加一頁就加一筆）

- [ ] **Step 1: 存中文黃金快照（改動前）**

```bash
cat > /tmp/snap-services.test.ts <<'EOF'
import { writeFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { it } from "vitest";
import { ServicesPage } from "@/components/services/ServicesPage";
it("snapshot", () => { writeFileSync("tests/fixtures/services-page.zh.html", renderToStaticMarkup(createElement(ServicesPage))); });
EOF
cp /tmp/snap-services.test.ts tests/snap-services.test.ts && npx vitest run tests/snap-services.test.ts && rm tests/snap-services.test.ts
git add tests/fixtures/services-page.zh.html && git commit -m "test: snapshot Chinese services page before i18n extraction"
```

Expected: `tests/fixtures/services-page.zh.html` 存在且非空。

- [ ] **Step 2: Write the failing tests**

```ts
// tests/i18n/services-page-en.test.ts
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ServicesPage } from "@/components/services/ServicesPage";
import { metadata as enMetadata } from "@/app/en/services/page";

const zhGolden = readFileSync("tests/fixtures/services-page.zh.html", "utf8");

describe("services page i18n", () => {
  it("keeps the Chinese page byte-identical", () => {
    expect(renderToStaticMarkup(createElement(ServicesPage))).toBe(zhGolden);
  });

  it("renders English with no Chinese text", () => {
    const html = renderToStaticMarkup(createElement(ServicesPage, { locale: "en" }));
    const text = html.replace(/<[^>]+>/g, " ");
    expect(text).not.toMatch(/\p{Script=Han}/u);
    expect(html).toContain("A brand&#x27;s first year in Manila");
    expect(html).toContain("Market Test");
    expect(html).toContain("Call Center");
  });

  it("keeps every internal link inside /en", () => {
    const html = renderToStaticMarkup(createElement(ServicesPage, { locale: "en" }));
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
    const internal = hrefs.filter((href) => href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/api/") && !/\.[a-z0-9]+$/i.test(href.split(/[?#]/)[0]));
    expect(internal.length).toBeGreaterThan(0);
    for (const href of internal) expect(href === "/en" || href.startsWith("/en/") || href.startsWith("/en#")).toBe(true);
  });

  it("has English metadata pointing at /en/services", () => {
    expect(enMetadata.alternates).toEqual({ canonical: "/en/services" });
    expect(String(enMetadata.title)).not.toMatch(/\p{Script=Han}/u);
  });
});
```

```ts
// tests/i18n/registry.test.ts
import { describe, expect, it } from "vitest";

import { checkConsistency } from "@/i18n/consistency";
import { fingerprint } from "@/i18n/fingerprint";
import { I18N_MODULES } from "@/i18n/registry";

describe("i18n registry", () => {
  for (const mod of I18N_MODULES) {
    it(`${mod.name}: English is up to date with the Chinese`, () => {
      const current = fingerprint(mod.zh);
      expect(
        mod.sourceFingerprint,
        `Chinese copy for "${mod.name}" changed. Update the English in ${mod.enFile} to match, then set its source fingerprint to "${current}".`,
      ).toBe(current);
    });

    it(`${mod.name}: English says no more than the Chinese`, () => {
      expect(checkConsistency(mod.zh, mod.en)).toEqual([]);
    });
  }
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npx vitest run tests/i18n/services-page-en.test.ts tests/i18n/registry.test.ts`
Expected: FAIL（modules not found）

- [ ] **Step 4: 抽出中文 copy（逐字搬移，一字不改）**

`src/i18n/zh/services-page.ts`：把 `ServicesPage.tsx` 裡所有給人看的字（含 `alt`、`aria-label`、麵包屑、標題、段落、按鈕、`CHAPTER_TILES`／`SERVICE_PATHS`／`CAPABILITIES` 的文字欄位）以及 `SERVICE_FAQS`（`src/data/serviceFaqs.ts`）、`CTA_LINE`（`src/data/cta.ts`）放進同一個物件。`src/data/serviceFaqs.ts` 與 `src/data/cta.ts` **保留原檔原匯出**（其他頁與 JSON-LD 在用），zh 模組直接引用它們，不複製文字：

```ts
// src/i18n/zh/services-page.ts
import { CTA_LINE } from "@/data/cta";
import { SERVICE_FAQS } from "@/data/serviceFaqs";

export type ServicesPageCopy = {
  readonly breadcrumbHome: string;
  readonly breadcrumbServices: string;
  readonly h1: string;
  readonly lead: string;
  readonly primaryCta: string;
  readonly secondaryCta: string;
  readonly scrollCue: string;
  readonly chaptersHeading: string;
  readonly chaptersLead: string;
  readonly tileAriaLabel: string;
  readonly tileMore: string;
  readonly tiles: readonly { readonly month: string; readonly name: string; readonly line: string; readonly alt: string }[];
  readonly pathsHeading: string;
  readonly paths: readonly { readonly alt: string; readonly eyebrow: string; readonly title: string; readonly line: string; readonly specs: readonly (readonly [string, string])[]; readonly cta: string }[];
  readonly windowHeading: string;
  readonly windowHeadingAccent: string;
  readonly windowLead: string;
  readonly capabilities: readonly { readonly title: string; readonly body: string }[];
  readonly faqTitle: string;
  readonly faqAsk: string;
  readonly faqMore: string;
  readonly faqs: readonly { readonly q: string; readonly a: string; readonly takeaway: string }[];
  readonly ctaHeading: string;
  readonly ctaLine: string;
};

export const servicesPageZh: ServicesPageCopy = {
  breadcrumbHome: "首頁",
  breadcrumbServices: "服務",
  h1: "一家品牌在馬尼拉的第一年",
  lead: "市場探查、寄賣、公司落地、海外客服——台灣品牌進菲律賓的第一年，多半會依序遇到這四件事。我們把它做成四個方案，每個都有明碼價格。可以只走一章，也可以一路走完。",
  primaryCta: "免費初步評估 30 分鐘 →",
  secondaryCta: "看四個章節 ↓",
  scrollCue: "往下看",
  chaptersHeading: "四個章節，按你的節奏往前走",
  chaptersLead: "每一章獨立計價。每一章結束，你都可以決定往下走、停下來，或換方向。",
  tileAriaLabel: "了解方案 →",
  tileMore: "了解方案",
  tiles: [
    { month: "第一個月", name: "市場探查", line: "讓當地真實消費者先用、先說，再決定要不要往下走", alt: "會議中討論圖表的團隊" },
    { month: "第三個月", name: "寄賣", line: "產品證由當地持證進口商代辦、代持；證下來之前，先把通路和市場活動準備好", alt: "貨架上待出貨的包裹" },
    { month: "第九個月", name: "公司落地", line: "註冊、招聘、掛證，在當地建立你自己的團隊", alt: "夜晚街角的咖啡店與行人" },
    { month: "之後的每一天", name: "海外客服", line: "英文客服由菲律賓團隊接手，服務規則由台灣端制定。預計 2027 Q1 開放首批", alt: "一邊通話一邊打字的客服人員" },
  ],
  pathsHeading: "主線是菲律賓；產品已經站穩的，另有北美通路",
  paths: [
    {
      alt: "馬尼拉都會區的商業大樓街景",
      eyebrow: "菲律賓 · 第一年四章",
      title: "先花 1～2 萬，確認市場要不要這個產品",
      line: "市場探查 → 寄賣 → 公司落地 → 海外客服，可以只走一章，也可以一路走完",
      specs: [
        ["適合", "有產品的消費品牌與連鎖餐飲；沒出過海，或出過但沒站穩"],
        ["收費", "每章明碼。起手包 7 萬（市場探查 1～2 萬＋寄賣包 5～6 萬，市場探查費可抵）；公司落地按案，第一次談給範圍；海外客服第一次談給區間"],
        ["第一步", "市場探查，用一頁報告決定下一步"],
      ],
      cta: "從第一章開始 →",
    },
    {
      alt: "超市貨架走道",
      eyebrow: "北美 · 北美通路",
      title: "進入北美主流零售通路",
      line: "市場研究、展覽、引進買家、上桌談判，由北美合作團隊執行；我們負責合約與進度",
      specs: [
        ["適合", "產品已經在台灣或其他市場站穩的品牌"],
        ["收費與時程", "依品類不同，第一次談就給明確數字"],
      ],
      cta: "了解北美通路 →",
    },
  ],
  windowHeading: "一個窗口，",
  windowHeadingAccent: "串起當地的每一個執行夥伴",
  windowLead: "我們負責合約、進度與品質；當地的試用、通路、法務與招聘，由合作夥伴分工執行。",
  capabilities: [
    { title: "在地試用面板", body: "由當地老師與家長組成的試用面板，產品上架前先拿到真實反應" },
    { title: "持證進口與通路夥伴", body: "產品證由當地持證進口商代辦、代持，你不用先開公司；上架接合作的電商通路" },
    { title: "律師行與招聘夥伴", body: "公司註冊、文件與招聘，由當地律師行與招聘夥伴執行" },
    { title: "台灣端專案管理", body: "合約、進度與品質指標都在我們的台灣公司，你只對一個窗口" },
  ],
  faqTitle: "選方案之前，最常被問的三件事",
  faqAsk: "直接問鹿飛 →",
  faqMore: "還有其他問題？",
  faqs: SERVICE_FAQS,
  ctaHeading: "想知道該從哪一章開始？",
  ctaLine: CTA_LINE,
};
```

**搬移前必做：** 用 `git show origin/main:src/components/services/ServicesPage.tsx` 逐字核對上面每個字串與當下 main 一致（main 可能已被其他視窗改過）；以 main 為準。

- [ ] **Step 5: 英文 copy**

```ts
// src/i18n/en/services-page.ts
import type { ServicesPageCopy } from "@/i18n/zh/services-page";

// Fingerprint of servicesPageZh this English was translated from. registry.test.ts prints the new value when Chinese changes.
export const SERVICES_PAGE_SOURCE_FINGERPRINT = "REPLACE_IN_STEP_8";

export const servicesPageEn: ServicesPageCopy = {
  breadcrumbHome: "Home",
  breadcrumbServices: "Services",
  h1: "A brand's first year in Manila",
  lead: "Market Test, Consignment, Company Setup, Call Center — in their first year in the Philippines, most Taiwanese brands run into these four things, roughly in this order. We turned them into four services, each with a published price. Take one chapter, or go all the way.",
  primaryCta: "Free 30-minute initial assessment →",
  secondaryCta: "See the four chapters ↓",
  scrollCue: "Scroll down",
  chaptersHeading: "Four chapters, at your own pace",
  chaptersLead: "Each chapter is priced on its own. At the end of each one, you decide: keep going, stop, or change direction.",
  tileAriaLabel: "Learn more →",
  tileMore: "Learn more",
  tiles: [
    { month: "Month 1", name: "Market Test", line: "Let real local consumers try it and talk about it first, then decide whether to go further", alt: "A team discussing charts in a meeting" },
    { month: "Month 3", name: "Consignment", line: "A licensed local importer files and holds your product registration; while it is pending, we get your channels and marketing ready", alt: "Parcels on shelves waiting to ship" },
    { month: "Month 9", name: "Company Setup", line: "Registration, hiring and licensing — build your own team on the ground", alt: "A corner café and passers-by at night" },
    { month: "Every day after", name: "Call Center", line: "A Philippine team takes over English customer service, under rules set in Taiwan. First clients expected from Q1 2027", alt: "A customer service agent typing during a call" },
  ],
  pathsHeading: "The Philippines is our main line; for products already established, there is also North America Retail",
  paths: [
    {
      alt: "Business towers in Metro Manila",
      eyebrow: "Philippines · Year one, four chapters",
      title: "Spend NT$10,000–20,000 first to see whether the market wants your product",
      line: "Market Test → Consignment → Company Setup → Call Center. Take one chapter, or go all the way",
      specs: [
        ["Fits", "Consumer brands and restaurant chains with a product; never exported, or exported without gaining a foothold"],
        ["Pricing", "A fixed price per chapter. Starter pack NT$70,000 (Market Test NT$10,000–20,000 + Consignment pack NT$50,000–60,000; the Market Test fee is credited). Company Setup is quoted per project, with a range in our first conversation; Call Center comes with a price range in our first conversation"],
        ["First step", "Market Test — a one-page report to decide what comes next"],
      ],
      cta: "Start with chapter one →",
    },
    {
      alt: "A supermarket aisle",
      eyebrow: "North America · Retail",
      title: "Get into mainstream North American retail",
      line: "Market research, trade shows, buyer introductions and negotiations are run by our North American partner team; we handle the contract and progress",
      specs: [
        ["Fits", "Brands already established in Taiwan or other markets"],
        ["Pricing & timeline", "Depends on the category; we give clear numbers in our first conversation"],
      ],
      cta: "About North America Retail →",
    },
  ],
  windowHeading: "One point of contact,",
  windowHeadingAccent: "connecting every partner on the ground",
  windowLead: "We own the contract, progress and quality; local testing, channels, legal work and hiring are split among our partners.",
  capabilities: [
    { title: "Local tester panel", body: "A panel of local teachers and parents tries your product before launch, so you get real reactions first" },
    { title: "Licensed importer & channel partners", body: "A licensed local importer files and holds your product registration, so you don't need a company first; listings go through partner e-commerce channels" },
    { title: "Law firm & hiring partners", body: "Company registration, paperwork and hiring are handled by a local law firm and hiring partners" },
    { title: "Project management in Taiwan", body: "Contracts, progress and quality metrics sit with our Taiwan company — you deal with one point of contact" },
  ],
  faqTitle: "Three questions people ask before choosing",
  faqAsk: "Ask LUFÉ directly →",
  faqMore: "Other questions?",
  faqs: [
    {
      q: "Start with chapter one, or go straight to Company Setup?",
      a: "If you have never exported, or exported without gaining a foothold, start with Market Test. If you already have Philippine channels and know you want a company, talk to us about Company Setup directly. If you only need customer service, talk to us about Call Center. Not sure? We will look at it with you in our first conversation; sometimes we suggest you wait — that is an answer too.",
      takeaway: "Not sure? Start with Market Test",
    },
    {
      q: "How are the four services priced?",
      a: "The numbers: Market Test NT$10,000–20,000 (pilot price for the first 10 brands); Consignment pack NT$50,000–60,000. Together they make the NT$70,000 starter pack, with the Market Test fee credited. Company Setup is quoted per project and Call Center comes with a range — both given in our first conversation.\nHonestly: we won't quote before we understand what you need. At our first meeting we want to hear how your product sells in Taiwan and why you want to go abroad.",
      takeaway: "A fixed price per chapter; a range in our first conversation",
    },
    {
      q: "How are you different from trading companies or consultancies?",
      a: "Consultants write reports, traders buy and sell, freight forwarders move goods. We do four things under one contract and walk with you through the first year. Our founder comes from Jumping Freight, backed by 43 years of international logistics, so your goods won't get stuck at sea. We are not a trading company, and not a forwarder that just takes orders.",
      takeaway: "Four things, one contract, through your first year",
    },
  ],
  ctaHeading: "Wondering which chapter to start with?",
  ctaLine: "Free 30-minute initial assessment. We reply within one business day.",
};
```

- [ ] **Step 6: 改元件吃 copy＋locale**

`src/components/faq/FaqSection.tsx`：加 `moreLabel = "還有其他問題？"` prop，第 26 行改成 `{moreLabel}`；型別加 `readonly moreLabel?: string;`。

`src/components/ScrollCue.tsx`：`export function ScrollCue({ label = "往下看" }: { readonly label?: string } = {})`，`aria-label={label}`。

`src/components/services/ServicesPage.tsx`：
- `export function ServicesPage({ locale = "zh" }: { readonly locale?: Locale } = {})`，第一行 `const copy = locale === "en" ? servicesPageEn : servicesPageZh;`、`const href = (path: string) => localizedHref(locale, path);`
- `CHAPTER_TILES`、`SERVICE_PATHS`、`CAPABILITIES` 只保留非文字欄位（`href`、`image`、`maxTierWidth`、`badge`、`eyebrowClassName`、`icon`），渲染時以索引配對 `copy.tiles[i]`／`copy.paths[i]`／`copy.capabilities[i]`。
- 所有 JSX 內的中文改讀 `copy.*`；所有 `href="/..."`／`href={tile.href}`／`href={path.href}` 改成 `href(...)`；`#chapters` 不動。
- `<ScrollCue label={copy.scrollCue} />`；`<FaqSection title={copy.faqTitle} askLabel={copy.faqAsk} moreLabel={copy.faqMore} items={copy.faqs.map(...)} …/>`；底部 CTA 的 `{CTA_LINE}` 改 `{copy.ctaLine}`。
- 保留 `export { SERVICE_FAQS } from "@/data/serviceFaqs";`（既有測試在用）。
- `key` 仍用不變的值（`tile.href`、`path.href`），不要用翻譯後的文字當 key。

`src/i18n/registry.ts`：

```ts
import { SERVICES_PAGE_SOURCE_FINGERPRINT, servicesPageEn } from "./en/services-page";
import { servicesPageZh } from "./zh/services-page";

export const I18N_MODULES = [
  { name: "services-page", zh: servicesPageZh, en: servicesPageEn, sourceFingerprint: SERVICES_PAGE_SOURCE_FINGERPRINT, enFile: "src/i18n/en/services-page.ts" },
] as const;
```

`src/app/en/services/page.tsx`：

```tsx
import type { Metadata } from "next";

import { ServicesPage } from "@/components/services/ServicesPage";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { servicesPageEn } from "@/i18n/en/services-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/services",
  locale: "en",
  title: "Services | A brand's first year in Manila",
  description: "Market Test, Consignment, Company Setup, Call Center — four things the same company meets in different months, made into four services.",
});

export default function EnglishServices() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: "/en" }, { name: "Services", path: "/en/services" }]} />
    <FaqJsonLd items={servicesPageEn.faqs.map(({ q, a }) => ({ question: q, answer: a }))} />
    <ServicesPage locale="en" />
  </>;
}
```

- [ ] **Step 7: Run tests — page tests pass, registry fingerprint fails**

Run: `npx vitest run tests/i18n tests/components/services`
Expected: `services-page-en` PASS（中文逐字相同）；`registry` 的 fingerprint 測試 FAIL，訊息印出 `set its source fingerprint to "<hash>"`；consistency 測試 PASS（若列出數字或保留語問題，改英文而不是改檢查）。

- [ ] **Step 8: 填入指紋**

把 Step 7 印出的 `<hash>` 填進 `src/i18n/en/services-page.ts` 的 `SERVICES_PAGE_SOURCE_FINGERPRINT`。

Run: `npx vitest run tests/i18n tests/components/services`
Expected: 全 PASS。

- [ ] **Step 9: 驗證漂移守門真的會擋**

暫時把 `src/i18n/zh/services-page.ts` 的 `chaptersLead` 加一個字 → Run `npx vitest run tests/i18n/registry.test.ts` → Expected FAIL 且訊息指名 `src/i18n/en/services-page.ts` → **還原那個字** → 再跑一次 PASS。不要 commit 這個暫時改動。

- [ ] **Step 10: Commit**

```bash
git add src/i18n src/app/en/services src/components/services/ServicesPage.tsx src/components/faq/FaqSection.tsx src/components/ScrollCue.tsx tests/i18n
git commit -m "feat(i18n): pilot English services page at /en/services"
```

---

### Task 7: 全套驗證與 PR

**Files:** 無新增。

- [ ] **Step 1: 型別、lint、全套測試**

```bash
npx tsc --noEmit
npx eslint src
npx vitest run --maxWorkers=2
```
Expected: tsc 0 錯；eslint 0 error（hero 三處刻意的 `eslint-disable` 不要動）；vitest 全綠，檔數 = 原本 38＋本計畫新增。

- [ ] **Step 2: 字型守門＋建置**

```bash
until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done; npm run build; rmdir /tmp/lufe-build.lock
```
Expected: `Font subset check passed`、build 成功。若守門報缺字（例如英文裡的 `é`、`–`、`’`），跑 `npm run font:rebuild`，`git add src/app/fonts/` 後重跑。

- [ ] **Step 3: 本機實測**

```bash
npm run start &
sleep 5
curl -s localhost:3000/services | grep -c "一家品牌在馬尼拉的第一年"      # expect 1+
curl -s localhost:3000/en/services | grep -o '<meta name="robots"[^>]*>'  # expect noindex
curl -s localhost:3000/en/services | grep -c "A brand&#x27;s first year in Manila"  # expect 1+
curl -s localhost:3000/en/services | grep -c 'hrefLang\|hreflang'          # expect 0
curl -s localhost:3000/robots.txt | grep -c "/en"                          # expect 0
kill %1
```

- [ ] **Step 4: Push 與 PR（不合併）**

```bash
git push -u origin <branch>
gh pr create --base main --title "feat(i18n): bilingual foundation + pilot /en/services (Plan 1/4)" --body "<列出 7 個 task、驗證輸出、/en 為 noindex、切換鈕隱藏中>"
```
PR 由 Claude 審查後合併；Codex 不得自行合併。

---

## Self-Review（已執行）

1. **Spec 覆蓋：** §2 網址／切換鈕／不自動跳轉／開放前不出 hreflang → Task 1、4、5；§3 獨立檔、漂移守門、用語表、翻譯鐵律 → Task 3、6；§6 P0 → Task 1–5、P1 第一頁 → Task 6。§4 文章、§5 詢問 Email、P2–P5 → Plan 2–4（刻意不在本計畫）。字型守門 → Task 7 Step 2。
2. **佔位字：** 唯一刻意的佔位是 `REPLACE_IN_STEP_8`（指紋只能在中文抽出後計算），Step 8 明確填入並有測試保證。
3. **型別一致：** `Locale`、`localizedHref`、`stripLocale`、`switchLocalePath`、`hasEnglishRoute`、`EN_PUBLIC`、`fingerprint`、`checkConsistency`、`ServicesPageCopy`、`I18N_MODULES` 在各 task 名稱一致。
4. **Review Focus：** 五項皆有對應測試（Task 6 黃金快照與 `/en` 連結、Task 2 路徑、Task 4 noindex、Task 6 Step 9 漂移）。
