import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/articles/english", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/articles/english")>();
  return {
    ...actual,
    hasEnglishArticle: (slug: string) => slug === "agent-vs-distributor-exclusive",
  };
});

import { ArticleDetail } from "@/components/insights/ArticleDetail";
import { InsightsPage } from "@/components/insights/InsightsPage";
import { localizeArticleHref } from "@/components/insights/StaticArticleContent";
import { CATEGORY_LABELS_EN } from "@/data/en/article-categories";
import type { EnglishArticle } from "@/data/en/articles";
import { articles, getArticleImage } from "@/data/articles";
import { toEnglishArticle } from "@/lib/articles/english";
import { toInsightCard } from "@/lib/articles/presentation";
import { getPublishedArticles } from "@/lib/articles/published";

import { expectEnglishMarkup } from "./helpers";

const chineseArticle = articles[0];
const englishSource: EnglishArticle = {
  slug: chineseArticle.slug,
  sourceFingerprint: "test",
  title: "A practical English article",
  summary: "A concise English summary.",
  readTime: "6 min read",
  content: ["## Scenario: A test\n\nA paragraph with a source [1]."],
  faq: [{ q: "What is the question?", a: "This is the answer." }],
  sources: [{ id: 1, title: "A source", publisher: "A publisher", url: "https://example.com", note: "A source note." }],
};
const englishArticle = toEnglishArticle(chineseArticle, englishSource);

describe("insight component i18n", () => {
  it("keeps Chinese ArticleDetail byte-identical", () => {
    const markup = renderToStaticMarkup(createElement(ArticleDetail, {
      article: chineseArticle,
      image: getArticleImage(chineseArticle),
      related: [],
    }));

    expect(markup).toBe(readFileSync("tests/fixtures/article-detail.zh.html", "utf8"));
  });

  it("keeps Chinese InsightsPage byte-identical", () => {
    const markup = renderToStaticMarkup(createElement(InsightsPage, {
      articles: getPublishedArticles().map(toInsightCard),
    }));

    expect(markup).toBe(readFileSync("tests/fixtures/insights-page.zh.html", "utf8"));
  });

  it("localizes article links and preserves non-page links", () => {
    expect(localizeArticleHref("zh", "/insights/agent-vs-distributor-exclusive")).toBe("/insights/agent-vs-distributor-exclusive");
    expect(localizeArticleHref("en", "/insights/agent-vs-distributor-exclusive")).toBe("/en/insights/agent-vs-distributor-exclusive");
    expect(localizeArticleHref("en", "/insights/no-english-version")).toBe("/en/insights");
    expect(localizeArticleHref("en", "/services/product-testing")).toBe("/en/services/product-testing");
    expect(localizeArticleHref("en", "https://example.com")).toBe("https://example.com");
    expect(localizeArticleHref("en", "#source-1")).toBe("#source-1");
    expect(localizeArticleHref("en", "mailto:hello@example.com")).toBe("mailto:hello@example.com");
  });

  it("renders a complete English article detail with English category labels", () => {
    const markup = renderToStaticMarkup(createElement(ArticleDetail, {
      article: englishArticle,
      image: getArticleImage(englishArticle),
      related: [],
      locale: "en",
    }));

    expectEnglishMarkup(markup);
    expect(markup).toContain(CATEGORY_LABELS_EN[chineseArticle.category]);
  });

  it("renders a complete English insights page", () => {
    const markup = renderToStaticMarkup(createElement(InsightsPage, {
      articles: [toInsightCard(englishArticle)],
      locale: "en",
    }));

    expectEnglishMarkup(markup);
  });
});
