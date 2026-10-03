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
import { JUMPING_COPY } from "@/components/home/JumpingSection";
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
      expect(rendered).toContain(road.label);
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
      expect(rendered).toContain(expected.label);
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
    expect(rendered).toContain(JUMPING_COPY.title[0]);
    expect(rendered).toContain(JUMPING_COPY.title[1]);
    expect(rendered).toContain(JUMPING_COPY.body);
    expect(rendered).toContain("我們相信的事很簡單");
    expect(rendered).toContain("鹿飛案例成果");
    expect(rendered).toContain("合作夥伴在菲律賓從零做起的手搖飲品牌，已開放加盟");
    expect(rendered).toContain("台灣羊奶皂品牌重新定位後，銷往多個海外市場");
    expect(rendered).toContain("台灣魚鬆進美國，先過法規，再談上市");
    expect(rendered).toContain("預約 30 分鐘 →");
    expect(rendered).toContain("還不確定？先做 2 分鐘處境比對 →");
    expect(rendered).toContain("送出後 24 小時內回覆。");
    for (const removed of ["80 家", "1.2 倍", "已簽 NDA", "24 小時內由鹿飛顧問團隊回覆"]) expect(rendered).not.toContain(removed);
    expect(rendered).toContain("出海實務洞察，");
    expect(rendered).toContain("看所有文章 →");
    expect(rendered).not.toContain("越南市場進入指南：台灣品牌該知道的 5 個關鍵");
  });

  it("renders the approved chapter and container copy exactly", async () => {
    const rendered = await markup();

    expect(rendered).not.toContain("馬尼拉的媽媽");
    expect(JUMPING_COPY.eyebrow).toBe("來自躍馬企業");
    expect(JUMPING_COPY.title).toEqual(["四十二年，", "看著貨櫃一個一個出去"]);
    expect(JUMPING_COPY.body).toBe("躍馬企業做國際物流 42 年，500 多個出口案件，30 多個國家。\n在躍馬看的不是報表，是貨櫃出去以後的事：\n有的品牌在當地開了第二家店；\n更多的，是幾個月後貨退回來，或者就沒有下文了。\n\n貨都有送到。差別在到了之後，有沒有人接。\n鹿飛就是從這個觀察長出來的。");
  });

  it("shows the starter-package price and renders the prescribed card icons", async () => {
    const chaptersMarkup = renderToStaticMarkup(createElement(ChaptersSection));
    const casesMarkup = renderToStaticMarkup(createElement(CasesSection));
    const rendered = await markup();

    expect(chaptersMarkup).toContain("出海起手包 7 萬 ＝ 市場探查 1～2 萬 ＋ 寄賣包 5～6 萬");
    expect(chaptersMarkup.match(/<svg/g)).toHaveLength(HOME_CHAPTERS.length);
    expect(casesMarkup).not.toContain("三條路的成本、坑、時間都不一樣。");
    expect(rendered).toContain("看著貨櫃一個一個出去");
  });

  it("does not retain the deprecated North America wording in source files", () => {
    expect(readSourceTree(path.join(process.cwd(), "src"))).not.toContain("另一個故事");
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
