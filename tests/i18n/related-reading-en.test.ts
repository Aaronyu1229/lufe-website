import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { articles } from "@/data/articles";

const chineseArticle = articles.find((article) => article.slug === "go-no-go-framework")!;
const englishArticle = {
  ...chineseArticle,
  title: "An English related article",
  summary: "An English related article summary.",
  readTime: "5 min read",
  content: ["English article content."],
};

vi.mock("@/lib/articles/english", () => ({
  getPublishedEnglishArticles: () => [englishArticle],
}));

vi.mock("@/lib/articles/repository", () => ({
  listPublishedArticles: async () => [],
}));

import { RelatedReading } from "@/components/services/RelatedReading";

import { expectEnglishMarkup } from "./helpers";

describe("related reading i18n", () => {
  it("renders English article cards for English service pages", async () => {
    const markup = renderToStaticMarkup(await RelatedReading({ chapter: "m1", locale: "en" }));

    expectEnglishMarkup(markup);
    expect(markup).toContain("Related reading");
    expect(markup).toContain("An English related article");
    expect(markup).toContain(`href="/en/insights/${englishArticle.slug}"`);
  });
});
