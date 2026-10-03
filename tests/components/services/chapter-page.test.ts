import { readFileSync } from "node:fs";
import path from "node:path";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/articles/repository", () => ({
  listPublishedArticles: vi.fn().mockResolvedValue([]),
}));

import { ChapterPage } from "@/components/services/ChapterPage";
import { RelatedReadingContent } from "@/components/services/RelatedReading";
import { CHAPTERS, type ChapterKey } from "@/data/chapters";

const renderChapter = async (key: ChapterKey) =>
  renderToStaticMarkup(await ChapterPage({ chapter: CHAPTERS[key] }));

describe("ChapterPage", () => {
  it("renders scenario and FAQ copy in server HTML", async () => {
    for (const key of ["m1", "m3", "m9", "after", "na"] as const) {
      const chapter = CHAPTERS[key];
      const markup = renderToStaticMarkup(await ChapterPage({ chapter })).replaceAll("\n", "");

      expect(markup).toContain(chapter.title);
      expect(markup).toContain(chapter.scene.replaceAll("\n", ""));
      expect(markup).toContain(chapter.scenariosHeading);
      for (const scenario of chapter.scenarios) {
        expect(markup).toContain(scenario.title);
        expect(markup).toContain(scenario.body);
        expect(markup).toContain(scenario.answer);
      }
      for (const faq of chapter.faqs) {
        expect(markup).toContain(faq.question);
        expect(markup).toContain(faq.answer.replaceAll("\n", ""));
        expect(markup).toContain(faq.takeaway);
      }

      expect(markup).not.toContain("你可能是這樣走到這裡的");
      expect(markup).not.toContain("老師");
    }
  });

  it("renders the product-testing report, consignment tracks, localization table, and waitlist form", async () => {
    await expect(renderChapter("m1")).resolves.toContain("市場探查報告 · 產品 A");
    await expect(renderChapter("m3")).resolves.toContain("證下來那天");
    await expect(renderChapter("m9")).resolves.toContain("品牌方的角色");

    const waitlistMarkup = await renderChapter("after");
    expect(waitlistMarkup).toContain("2027 Q1 開放首批客戶");
    expect(waitlistMarkup).toContain("每月大概幾封客訊");
    expect(waitlistMarkup).toContain("現在誰在接");
    expect(waitlistMarkup).toContain("適合的品牌");
    expect(waitlistMarkup).not.toContain("Where is my refund?");
  });

  it("does not render a related-reading section when the chapter has no articles", async () => {
    expect(renderToStaticMarkup(createElement(RelatedReadingContent, { articles: [] }))).toBe("");
    await expect(renderChapter("after")).resolves.not.toContain(">延伸閱讀<");
  });

  it("does not render the Philippines chapter bar on the North America page", async () => {
    const markup = await renderChapter("na");

    expect(markup).toContain("進入北美主流零售通路");
    expect(markup).not.toContain('aria-label="菲律賓服務章節"');
    expect(markup).toContain("步 01");
    expect(markup).toContain('href="/services/call-center"');
    for (const faq of CHAPTERS.na.faqs) {
      expect(markup).toContain(faq.question);
      expect(markup).toContain(faq.answer.replaceAll("\n", ""));
      expect(markup).toContain(faq.takeaway);
    }
  });

  it("does not reveal teacher or education-background claims in service content", () => {
    const root = process.cwd();
    const files = [
      "src/data/chapters.ts",
      "src/components/services/ChapterBar.tsx",
      "src/components/services/ChapterPage.tsx",
      "src/components/services/NextChapter.tsx",
      "src/components/services/RelatedReading.tsx",
    ];

    for (const file of files) {
      const content = readFileSync(path.join(root, file), "utf8");
      expect(content).not.toContain("老師");
      expect(content).not.toContain("教師");
      expect(content).not.toContain("英語教育體系");
      expect(content).not.toContain("出身");
    }
  });
});
