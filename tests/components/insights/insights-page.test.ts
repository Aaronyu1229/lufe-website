import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { INSIGHT_CHAPTERS, InsightsPageContent } from "@/components/insights/InsightsPage";
import { articles } from "@/data/articles";
import { toInsightCard } from "@/lib/articles/presentation";

const insightCards = articles.map(toInsightCard);
const renderPage = () => renderToStaticMarkup(createElement(InsightsPageContent, { articles: insightCards, active: "all" }));

describe("InsightsPageContent", () => {
  it("keeps every chapter filter and article card in the server markup", () => {
    const markup = renderPage();

    // Filters with no articles are hidden; the rest are listed.
    expect(markup).not.toContain("之後的每一天：客服與營運");
    for (const chapter of INSIGHT_CHAPTERS.filter((item) => item.key !== "after")) expect(markup).toContain(chapter.label);
    for (const article of articles) {
      expect(markup).toContain(article.title);
      expect(markup).toContain(article.summary);
      expect(markup).toContain(article.date);
      expect(markup).toContain(article.readTime);
    }
    expect(markup).not.toContain("篇實戰文章");
    expect(markup).not.toContain("章節分類");
  });

  it("renders the empty chapter state", () => {
    const markup = renderToStaticMarkup(createElement(InsightsPageContent, { articles: insightCards, active: "after" }));

    expect(markup).toContain("這個分類暫時還沒有文章");
  });

  it("does not render rounded utility classes", () => {
    expect(renderPage()).not.toMatch(/\brounded-(?!full\b)/);
  });

  it("renders a neutral placeholder for an article without an image", () => {
    const articleWithoutImage = { ...insightCards[0], image: "" };
    const markup = renderToStaticMarkup(createElement(InsightsPageContent, { articles: [articleWithoutImage], active: "all" }));

    expect(markup).toContain("bg-black/[.06]");
  });

  it("keeps the featured card out of the hero and renders the shared CTA in the list", () => {
    const markup = renderPage();
    const heroMarkup = markup.slice(0, markup.indexOf('aria-label="洞察章節"'));

    expect(heroMarkup).not.toContain("精選");
    expect(markup).toContain("精選");
    expect(markup).toContain("把文章裡的方法，");
    expect(markup).toContain("預約 30 分鐘");
    expect(markup).toContain("一個工作天內回覆");
  });

  it("uses the first-year hero copy and keeps retired list wording out", () => {
    const markup = renderPage();

    expect(markup).toContain("出海第一年，");
    expect(markup).toContain("每個月會卡住的事");
    expect(markup).toContain(">北美通路<");
    expect(markup).toContain("按你現在走到哪一個月來找：第一個月問市場，第三個月談通路與證，第九個月落地與團隊。北美通路另成一條線。");
    for (const retired of ["24 小時內回覆", "各有權重", "加權後", "Conditional Go", "No-Go", "五題評分（MBCPR）", "北美市場", "寄賣通路", "首次諮詢即說明費用與時程"]) {
      expect(markup).not.toContain(retired);
    }
  });

  it("shows the month-one note and pins why-philippines-first as the m1 featured card", () => {
    const m1 = renderToStaticMarkup(createElement(InsightsPageContent, { articles: insightCards, active: "m1" }));
    const featuredStart = m1.indexOf("精選");
    expect(m1).toContain("第一個月只問一件事：當地的人會不會買、願意付多少。");
    expect(m1).toContain('href="/services/product-testing"');
    expect(featuredStart).toBeGreaterThan(-1);
    const why = insightCards.find((card) => card.slug === "why-philippines-first")!;
    expect(m1.slice(featuredStart, featuredStart + 2000)).toContain(why.title);

    const m3 = renderToStaticMarkup(createElement(InsightsPageContent, { articles: insightCards, active: "m3" }));
    expect(m3).not.toContain("第一個月只問一件事");
  });
});
