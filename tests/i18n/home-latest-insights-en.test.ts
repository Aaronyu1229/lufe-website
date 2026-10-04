import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LatestInsightsSection } from "@/components/home/LatestInsightsSection";

const articles = [{
  slug: "fixture-insight",
  title: "測試文章",
  summary: "測試摘要",
  category: "市場",
  date: "2026-10-04",
  readTime: "5 分鐘",
  image: "/images/hero/hero-poster-1600.webp",
}] as const;

describe("home latest insights i18n", () => {
  it("keeps the Chinese section byte-identical", () => {
    expect(renderToStaticMarkup(createElement(LatestInsightsSection, { articles }))).toBe(readFileSync("tests/fixtures/home-latest-insights.zh.html", "utf8"));
  });

  it("does not render English insights before Plan 3", () => {
    expect(renderToStaticMarkup(createElement(LatestInsightsSection, { articles, locale: "en" }))).toBe("");
  });
});
