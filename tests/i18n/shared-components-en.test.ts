import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/articles/repository", () => ({
  listPublishedArticles: vi.fn().mockResolvedValue([]),
}));

import { InsightCta } from "@/components/insights/InsightCta";
import { ChapterBar } from "@/components/services/ChapterBar";
import { RelatedReading, RelatedReadingContent } from "@/components/services/RelatedReading";
import { SubsidiesCTASection } from "@/components/subsidy/SubsidiesCTASection";
import { Carousel } from "@/components/ui/Carousel";
import { ExpandCard } from "@/components/ui/ExpandCard";
import { CHAPTER_ARTICLES } from "@/data/chapters";
import { getPublishedEnglishArticles } from "@/lib/articles/english";

import { expectEnglishMarkup } from "./helpers";

describe("shared component i18n", () => {
  it("keeps Chinese defaults", () => {
    expect(renderToStaticMarkup(createElement(InsightCta))).toContain("把文章裡的方法");
    expect(renderToStaticMarkup(createElement(SubsidiesCTASection))).toContain("不確定哪個適合你？");
    expect(renderToStaticMarkup(createElement(Carousel, {
      label: "中文輪播",
    } as import("@/components/ui/Carousel").CarouselProps, "內容"))).toContain('aria-label="上一個"');
    expect(renderToStaticMarkup(createElement(ExpandCard, {
      card: "卡片",
      panel: "內容",
      title: "標題",
    }))).toContain('aria-label="關閉"');
    expect(renderToStaticMarkup(createElement(ChapterBar, { current: "m1" }))).toContain('aria-label="菲律賓服務章節"');
    expect(renderToStaticMarkup(createElement(RelatedReadingContent, {
      articles: [{ slug: "sample", title: "範例文章", summary: "摘要", image: "/images/a.webp", date: "2026-10-04", readTime: "5 分鐘", color: "sky", category: "出海實戰" }],
    }))).toContain("延伸閱讀");
  });

  it("renders complete English", () => {
    expectEnglishMarkup(renderToStaticMarkup(createElement(InsightCta, { locale: "en" })));
    expectEnglishMarkup(renderToStaticMarkup(createElement(SubsidiesCTASection, { locale: "en" })));
    expectEnglishMarkup(renderToStaticMarkup(createElement(Carousel, {
      label: "Carousel",
      previousLabel: "Previous",
      nextLabel: "Next",
    } as import("@/components/ui/Carousel").CarouselProps, "Content")));
    expectEnglishMarkup(renderToStaticMarkup(createElement(ExpandCard, {
      card: "Card",
      panel: "Panel",
      title: "Title",
      closeLabel: "Close",
    })));
    expectEnglishMarkup(renderToStaticMarkup(createElement(ChapterBar, { current: "m1", locale: "en" })));
  });

  it("shows English related reading only for chapter articles that have English", async () => {
    const markup = renderToStaticMarkup(await RelatedReading({ chapter: "m1", locale: "en" }));
    const englishSlugs = new Set(getPublishedEnglishArticles().map((article) => article.slug));
    if (CHAPTER_ARTICLES.m1.some((slug) => englishSlugs.has(slug))) expectEnglishMarkup(markup);
    else expect(markup).toBe("");
  });
});
