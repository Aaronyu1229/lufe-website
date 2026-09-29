import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { InsightsPageContent } from "@/components/insights/InsightsPage";
import { articles } from "@/data/articles";
import { toInsightCard } from "@/lib/articles/presentation";

const insightCards = articles.map(toInsightCard);
const renderPage = () => renderToStaticMarkup(createElement(InsightsPageContent, { articles: insightCards, active: "全部" }));

describe("InsightsPageContent", () => {
  it("keeps every category and article card in the server markup", () => {
    const markup = renderPage();

    for (const category of new Set(["全部", ...articles.map((article) => article.category)])) {
      expect(markup).toContain(category);
    }

    for (const article of articles) {
      expect(markup).toContain(article.title);
      expect(markup).toContain(article.summary);
      expect(markup).toContain(article.date);
      expect(markup).toContain(article.readTime);
    }
  });

  it("does not render rounded utility classes", () => {
    expect(renderPage()).not.toMatch(/\brounded-(?!full\b)/);
  });

  it("renders a neutral placeholder for an article without an image", () => {
    const articleWithoutImage = { ...insightCards[0], image: "" };
    const markup = renderToStaticMarkup(
      createElement(InsightsPageContent, { articles: [articleWithoutImage], active: "全部" }),
    );

    expect(markup).toContain("bg-black/[.06]");
  });
});
