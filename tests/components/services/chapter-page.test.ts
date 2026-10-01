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
  it("renders the page copy and collapsed FAQ answers in server HTML", async () => {
    for (const key of ["m1", "m3", "m9", "after"] as const) {
      const chapter = CHAPTERS[key];
      const markup = renderToStaticMarkup(await ChapterPage({ chapter })).replaceAll("\n", "");

      expect(markup).toContain(chapter.title);
      expect(markup).toContain(chapter.scene.replaceAll("\n", ""));
      for (const faq of chapter.faqs) {
        expect(markup).toContain(faq.question);
        expect(markup).toContain(faq.answer);
      }
    }
  });

  it("renders the product-testing report, consignment tracks, localization table, and waitlist form", async () => {
    await expect(renderChapter("m1")).resolves.toContain("市場探查報告 · 產品 A");
    await expect(renderChapter("m3")).resolves.toContain("證下來那天");
    await expect(renderChapter("m9")).resolves.toContain("你的角色");

    const waitlistMarkup = await renderChapter("after");
    expect(waitlistMarkup).toContain("2027 Q1 開放首批客戶");
    expect(waitlistMarkup).toContain("每月大概幾封客訊");
    expect(waitlistMarkup).toContain("現在誰在接");
  });

  it("does not render a related-reading section when the chapter has no articles", async () => {
    expect(renderToStaticMarkup(createElement(RelatedReadingContent, { articles: [] }))).toBe("");
    await expect(renderChapter("after")).resolves.not.toContain(">延伸閱讀<");
  });

  it("does not render the Philippines chapter bar on the North America page", async () => {
    const markup = await renderChapter("na");

    expect(markup).toContain("北美市場拓展。</strong> 本頁服務與菲律賓四章各自獨立，由北美專責團隊規劃執行，鹿飛負責合約與進度。");
    expect(markup).not.toContain('aria-label="菲律賓服務章節"');
    expect(markup).toContain("步 01");
  });
});
