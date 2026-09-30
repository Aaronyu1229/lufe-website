import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { INSIGHT_CHAPTERS, InsightsPageContent } from "@/components/insights/InsightsPage";
import { articles } from "@/data/articles";
import { toInsightCard } from "@/lib/articles/presentation";

const insightCards = articles.map(toInsightCard);
const renderPage = () => renderToStaticMarkup(createElement(InsightsPageContent, { articles: insightCards, active: "all" }));

describe("InsightsPageContent", () => {
  it("keeps every chapter filter and non-Vietnam article card in the server markup", () => {
    const markup = renderPage();

    for (const chapter of INSIGHT_CHAPTERS) expect(markup).toContain(chapter.label);
    for (const article of articles.filter((article) => article.slug !== "vietnam-market-entry-guide")) {
      expect(markup).toContain(article.title);
      expect(markup).toContain(article.summary);
      expect(markup).toContain(article.date);
      expect(markup).toContain(article.readTime);
    }
    expect(markup).not.toContain("越南市場進入指南");
  });

  it("renders the empty chapter state", () => {
    const markup = renderToStaticMarkup(createElement(InsightsPageContent, { articles: insightCards, active: "after" }));

    expect(markup).toContain("這個分類暫時還沒有文章，敬請期待！");
  });

  it("does not render rounded utility classes", () => {
    expect(renderPage()).not.toMatch(/\brounded-(?!full\b)/);
  });

  it("renders a neutral placeholder for an article without an image", () => {
    const articleWithoutImage = { ...insightCards[0], image: "" };
    const markup = renderToStaticMarkup(createElement(InsightsPageContent, { articles: [articleWithoutImage], active: "all" }));

    expect(markup).toContain("bg-black/[.06]");
  });
});
