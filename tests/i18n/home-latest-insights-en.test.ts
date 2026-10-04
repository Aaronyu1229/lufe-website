import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LatestInsightsSection } from "@/components/home/LatestInsightsSection";
import type { InsightCard } from "@/lib/articles/presentation";

import { expectEnglishMarkup } from "./helpers";

const chineseArticles: readonly InsightCard[] = [{
  slug: "fixture-insight",
  title: "測試文章",
  summary: "測試摘要",
  category: "市場",
  date: "2026-10-04",
  readTime: "5 分鐘",
  color: "sky",
  image: "/images/hero/hero-poster-1600.webp",
}] as unknown as readonly InsightCard[];

const englishArticles: readonly InsightCard[] = [{
  ...chineseArticles[0],
  title: "An English test article",
  summary: "An English test summary.",
  category: "菲律賓",
  readTime: "5 min read",
}];

describe("home latest insights i18n", () => {
  it("keeps the Chinese section byte-identical", () => {
    expect(renderToStaticMarkup(createElement(LatestInsightsSection, { articles: chineseArticles }))).toBe(readFileSync("tests/fixtures/home-latest-insights.zh.html", "utf8"));
  });

  it("renders English insights after Plan 3", () => {
    const markup = renderToStaticMarkup(createElement(LatestInsightsSection, { articles: englishArticles, locale: "en" }));

    expectEnglishMarkup(markup);
    expect(markup).toContain("An English test article");
  });
});
