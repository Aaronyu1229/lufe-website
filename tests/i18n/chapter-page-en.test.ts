import { readFileSync } from "node:fs";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/services/product-testing", useRouter: () => ({ push: () => {} }), useSearchParams: () => new URLSearchParams() }));
vi.mock("@/lib/articles/repository", () => ({ listPublishedArticles: async () => [] }));

import { ChapterPage } from "@/components/services/ChapterPage";
import { CHAPTERS } from "@/data/chapters";
import { CHAPTERS_EN } from "@/i18n/en/chapters";

import { expectEnglishMarkup } from "./helpers";

const chapterKeys = ["m1", "m3", "m9", "after", "na"] as const;

describe("chapter pages i18n", () => {
  for (const key of chapterKeys) {
    it(`keeps ${key} Chinese byte-identical`, async () => {
      expect(renderToStaticMarkup(await ChapterPage({ chapter: CHAPTERS[key] }))).toBe(readFileSync(`tests/fixtures/chapter-${key}.zh.html`, "utf8"));
    });

    it(`renders complete English for ${key}`, async () => {
      const html = renderToStaticMarkup(await ChapterPage({ chapter: CHAPTERS_EN[key], locale: "en" }));
      expectEnglishMarkup(html);
    });
  }

  it("preserves the expected Q1 2027 Call Center opening", async () => {
    const html = renderToStaticMarkup(await ChapterPage({ chapter: CHAPTERS_EN.after, locale: "en" }));
    expect(html).toContain("Expected to open in Q1 2027");
  });

  it("does not add North America month or fee figures", async () => {
    const html = renderToStaticMarkup(await ChapterPage({ chapter: CHAPTERS_EN.na, locale: "en" }));
    expect(html).not.toMatch(/Month \d|NT\$/);
  });
});
