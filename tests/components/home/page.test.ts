import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/articles/repository", () => ({
  listPublishedArticles: async () => [],
}));

import Home from "@/app/page";
import { CasesSection, HOME_CASE_CARDS, HOME_CASE_ROADS } from "@/components/home/CasesSection";
import { HOME_FAQ_ITEMS } from "@/components/home/HomeFAQ";
import { HOME_HERO_SLIDES } from "@/components/home/HeroSection";
import { JUMPING_COPY, JUMPING_ROUTE } from "@/components/home/JumpingSection";
import { ChaptersSection, HOME_CHAPTERS } from "@/components/home/PositioningBand";
import { HOME_CONTRACT_COLUMNS, HOME_CONTRACT_ROWS, HOME_CONTRACT_WEEKDAYS } from "@/components/home/WhySection";

const markup = async () => renderToStaticMarkup(await Home());

const HOME_CHAPTER_COPY = [
  { label: "第一個月", title: "市場探查", subtitle: "在當地找真實消費者試用，確認誰會買、願意付多少", linkLabel: "看市場探查怎麼做 →" },
  { label: "第三個月", title: "寄賣", subtitle: "產品證審核期間，電商上架與市場活動同步推進", linkLabel: "看寄賣包內容 →" },
  { label: "第九個月", title: "公司落地", subtitle: "公司註冊、人員招聘、FDA 掛證，建立當地據點", linkLabel: "看落地怎麼做 →" },
  { label: "之後的每一天", title: "海外客服", subtitle: "菲律賓是全球英語客服外包的重鎮。由當地專業團隊接手英文客服，品質標準由台灣端制定與管理。2027 Q1 開放首批。", linkLabel: "登記首批 →" },
] as const;

function readSourceTree(directory: string): string {
  return readdirSync(directory, { withFileTypes: true }).map((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return readSourceTree(entryPath);
    return entry.isFile() ? readFileSync(entryPath, "utf8") : "";
  }).join("");
}

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
      if (item.trustSignal) expect(rendered).toContain(item.trustSignal);
    }

    for (const road of HOME_CASE_ROADS) {
      expect(rendered).toContain(road.title);
      expect(rendered).toContain(road.detail);
    }

    for (const item of HOME_FAQ_ITEMS) {
      expect(rendered).toContain(item.question);
      expect(rendered).toContain(item.takeaway);
      expect(rendered).toContain(item.answer);
    }

    for (const [index, expected] of HOME_CHAPTER_COPY.entries()) {
      const chapter = HOME_CHAPTERS[index];
      expect(chapter).toMatchObject(expected);
      expect(rendered).toContain(`>${expected.title}</h3>`);
      expect(rendered).toContain(expected.subtitle);
      expect(rendered).toContain(`>${expected.linkLabel}</a>`);
    }

    for (const column of HOME_CONTRACT_COLUMNS) expect(rendered).toContain(column);
    for (const row of HOME_CONTRACT_ROWS) {
      expect(rendered).toContain(row.type);
      expect(rendered).toContain(row.desc);
    }
    for (const [day, text] of HOME_CONTRACT_WEEKDAYS) {
      expect(rendered).toContain(day);
      expect(rendered).toContain(text);
    }

    expect(rendered).toContain("企業出海，前半段是把貨送到，");
    expect(rendered).toContain("後半段才是真正的考驗");
    expect(rendered).toContain("先花 1～2 萬問市場，過了，再一章一章往下走。");
    expect(rendered.replace(/<[^>]+>/g, "")).toContain(JUMPING_COPY.title[0]);
    expect(rendered).toContain(JUMPING_COPY.title[1]);
    expect(rendered).toContain(JUMPING_COPY.intro);
    for (const node of JUMPING_ROUTE) {
      expect(rendered).toContain(node.title);
      expect(rendered).toContain(node.note);
    }
    expect(rendered).toContain("預約 30 分鐘 →");
    expect(rendered).toContain("還不確定？先做 2 分鐘處境比對 →");
    expect(rendered).toContain("免費 30 分鐘初步評估，一個工作天內回覆。");
    expect(rendered).not.toContain("24 小時內");
    for (const removed of ["80 家", "1.2 倍", "已簽 NDA", "24 小時內由鹿飛顧問團隊回覆"]) expect(rendered).not.toContain(removed);
    expect(rendered).toContain("出海實務洞察，");
    expect(rendered).toContain("看所有文章 →");
    expect(rendered).not.toContain("越南市場進入指南：台灣品牌該知道的 5 個關鍵");
  });

  it("renders the approved chapter and container copy exactly", async () => {
    const rendered = await markup();

    expect(rendered).not.toContain("馬尼拉的媽媽");
    expect(JUMPING_COPY.eyebrow).toBe("躍馬企業 × 鹿飛");
    expect(JUMPING_COPY.title).toEqual(["從你的工廠，到菲律賓的貨架，", "是同一條路"]);
    expect(JUMPING_COPY.intro).toBe("這條路的前半段，躍馬企業走了 43 年：500 多個出口案件，30 多個國家。看了這麼多年，我們最清楚貨櫃門打開之後，品牌會卡在哪裡。所以成立了鹿飛，專門處理貨到了之後的事。");
    expect(rendered).toContain("每一家只負責自己那一段，進度卡住時，沒有人負責把它串起來。\n我們把市場探查、寄賣、公司落地與海外客服，放在同一份合約裡；國際物流交給躍馬企業。\n一個窗口對接所有環節，你只需要開一次會。");
  });

  it("shows the starter-package price and renders the prescribed card icons", async () => {
    const chaptersMarkup = renderToStaticMarkup(createElement(ChaptersSection));
    const casesMarkup = renderToStaticMarkup(createElement(CasesSection));
    const rendered = await markup();

    expect(chaptersMarkup).toContain("出海起手包 7 萬 ＝ 市場探查 1～2 萬 ＋ 寄賣包 5～6 萬");
    expect(chaptersMarkup.match(/<svg/g)).toHaveLength(HOME_CHAPTERS.length);
    expect(casesMarkup).not.toContain("三條路的成本、坑、時間都不一樣。");
    for (const removed of ["後半段旅程", "四十二年，", "看著貨櫃一個一個出去", "貨櫃關上門的那一刻", "接班人", "二代"]) expect(rendered).not.toContain(removed);
  });

  it("states one reply time site-wide: 一個工作天內 (Aaron, 2026-10-03)", () => {
    const sources = readSourceTree(path.join(process.cwd(), "src", "components")) + readFileSync(path.join(process.cwd(), "src", "data", "chapters.ts"), "utf8") + readFileSync(path.join(process.cwd(), "src", "data", "cases.ts"), "utf8");
    expect(sources).not.toMatch(/24 ?小時內/);
  });

  it("does not retain the deprecated North America wording in source files", () => {
    expect(readSourceTree(path.join(process.cwd(), "src"))).not.toContain("另一個故事");
  });

  it("places the Jumping route before the chapters and links each LUFÉ node to its chapter card", async () => {
    const rendered = await markup();
    const opening = rendered.indexOf("企業出海，前半段是把貨送到，");
    const route = rendered.indexOf('id="jumping"');
    const chapters = rendered.indexOf('id="chapters"');
    expect(opening).toBeLessThan(route);
    expect(route).toBeLessThan(chapters);
    expect(rendered.match(/id="jumping"/g)).toHaveLength(1);
    expect(rendered).toContain('aria-label="從台灣到菲律賓的同一條路"');
    for (const [index, id] of ["chapter-1", "chapter-2", "chapter-3", "chapter-4"].entries()) {
      expect(rendered).toContain(`href="#${id}"`);
      expect(HOME_CHAPTERS[index].id).toBe(id);
    }
    expect(JUMPING_ROUTE.filter((node) => node.target)).toHaveLength(4);
    expect(rendered).toContain('href="#chapters"');
    expect(rendered).toMatch(/href="https:\/\/jumping\.group" target="_blank" rel="noopener noreferrer"/);
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
