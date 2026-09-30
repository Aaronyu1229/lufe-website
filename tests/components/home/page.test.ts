import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/articles/repository", () => ({
  listPublishedArticles: async () => [],
}));

import Home from "@/app/page";
import { HOME_CASE_CARDS, HOME_CASE_ROADS } from "@/components/home/CasesSection";
import { HOME_FAQ_ITEMS } from "@/components/home/HomeFAQ";
import { HOME_HERO_SLIDES } from "@/components/home/HeroSection";
import { HOME_CHAPTERS } from "@/components/home/PositioningBand";
import { HOME_CONTRACT_COLUMNS, HOME_CONTRACT_ROWS, HOME_CONTRACT_WEEKDAYS } from "@/components/home/WhySection";

const markup = async () => renderToStaticMarkup(await Home());

describe("home page", () => {
  it("keeps all tab, chapter, carousel, article, table, and disclosure text in static markup", async () => {
    const rendered = await markup();

    for (const slide of HOME_HERO_SLIDES) {
      expect(rendered).toContain(slide.chipLabel);
      expect(rendered).toContain(slide.titleLines[0]);
      expect(rendered).toContain(slide.titleLines[1]);
      expect(rendered).toContain(slide.subtitle);
      expect(rendered).toContain(slide.primary.label);
      expect(rendered).toContain(slide.secondary.label);
    }

    for (const item of HOME_CASE_CARDS) {
      for (const tag of item.tags) expect(rendered).toContain(tag.label);
      expect(rendered).toContain(item.num);
      expect(rendered).toContain(item.numLabel);
      expect(rendered).toContain(item.scalePrefix);
      expect(rendered).toContain(item.title);
      expect(rendered).toContain(item.painLine);
      expect(rendered).toContain(item.solutionLine);
      expect(rendered).toContain(item.route.from);
      expect(rendered).toContain(item.route.to);
      expect(rendered).toContain(item.trustSignal);
    }

    for (const road of HOME_CASE_ROADS) {
      expect(rendered).toContain(road.label);
      expect(rendered).toContain(road.title);
      expect(rendered).toContain(road.detail);
    }

    for (const item of HOME_FAQ_ITEMS) {
      expect(rendered).toContain(item.question);
      expect(rendered).toContain(item.takeaway);
      expect(rendered).toContain(item.answer);
    }

    for (const chapter of HOME_CHAPTERS) {
      expect(rendered).toContain(chapter.label);
      expect(rendered).toContain(chapter.title);
      expect(rendered).toContain(chapter.scene);
      expect(rendered).toContain(chapter.detail);
      expect(rendered).toContain(chapter.price);
      expect(rendered).toContain(chapter.linkLabel);
    }

    for (const column of HOME_CONTRACT_COLUMNS) expect(rendered).toContain(column);
    for (const row of HOME_CONTRACT_ROWS) expect(rendered).toContain(row.label);
    for (const [day, text] of HOME_CONTRACT_WEEKDAYS) {
      expect(rendered).toContain(day);
      expect(rendered).toContain(text);
    }

    expect(rendered).toContain("很多品牌的出海故事，");
    expect(rendered).toContain("貨代把貨送到馬尼拉，報關、清關、進倉，一切順利。");
    expect(rendered).toContain("貨都有送到，差別從來不在物流。");
    expect(rendered).toContain("四十二年，");
    expect(rendered).toContain("我們相信的事很簡單");
    expect(rendered).toContain("躍馬企業 · 年國際物流實戰");
    expect(rendered).toContain("讀到一半想深入的，");
    expect(rendered).toContain("看所有文章 →");
    expect(rendered).not.toContain("越南市場進入指南：台灣品牌該知道的 5 個關鍵");
  });

  it("uses no rounded utility classes", async () => {
    expect(await markup()).not.toContain("rounded-");
  });

  it("uses no legacy heading utility classes", async () => {
    const rendered = await markup();

    expect(rendered).not.toContain("hero-title");
    expect(rendered).not.toContain("section-heading");
  });
});
