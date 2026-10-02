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
  { label: "第三個月", title: "試銷寄賣", subtitle: "電商上架與產品證同步進行，用實際銷售驗證市場", linkLabel: "看寄賣包內容 →" },
  { label: "第九個月", title: "在地設立", subtitle: "公司註冊、人員招聘、FDA 證照轉移，建立當地據點", linkLabel: "看落地怎麼做 →" },
  { label: "之後的每一天", title: "海外客服", subtitle: "菲律賓是全球英語客服外包的重鎮。由當地專業團隊接手英文客服，品質標準由台灣端制定與管理", linkLabel: "登記首批 →" },
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

    expect(rendered).toContain("出海不是把貨送出去，");
    expect(rendered).toContain("多數台灣企業的出海，是這樣開始的：");
    expect(rendered).toContain("出海的成敗，不在第一張訂單。");
    expect(rendered).toContain(JUMPING_COPY.title[0]);
    expect(rendered).toContain(JUMPING_COPY.title[1]);
    expect(rendered).toContain(JUMPING_COPY.body);
    expect(rendered).toContain("鹿飛相信的事很簡單");
    expect(rendered).toContain("鹿飛案例成果");
    expect(rendered).toContain("家北美 Costco 門市同步上架");
    expect(rendered).toContain("家馬尼拉門市，一年內開出");
    expect(rendered).toContain("營收成長，皮鞋品牌轉型襪子");
    expect(rendered).toContain("出海實務洞察，");
    expect(rendered).toContain("看所有文章 →");
    expect(rendered).not.toContain("越南市場進入指南：台灣品牌該知道的 5 個關鍵");
  });

  it("renders the approved chapter and container copy exactly", async () => {
    const rendered = await markup();

    expect(rendered).not.toContain("馬尼拉的媽媽");
    expect(JUMPING_COPY.title).toEqual(["一家企業出海的", "後半段旅程"]);
    expect(JUMPING_COPY.body).toBe("企業出海的前半段，是把產品送到海外——\n訂單、報關、運輸，多數企業都走得過去。\n\n後半段，才是真正的考驗：\n產品要被當地市場接受，通路要談得下來，\n證照、團隊與客服，要有人在當地接住。\n\n多數企業的出海，不是輸在運輸，\n而是輸在抵達之後沒有人接手。\n\n鹿飛，是為了這後半段旅程而成立的");
    expect(JUMPING_COPY.body).not.toContain("躍馬");
  });

  it("removes the starter-package price and renders the prescribed card icons", async () => {
    const chaptersMarkup = renderToStaticMarkup(createElement(ChaptersSection));
    const casesMarkup = renderToStaticMarkup(createElement(CasesSection));
    const rendered = await markup();

    expect(chaptersMarkup).not.toContain("出海起手包 7 萬");
    expect(chaptersMarkup.match(/<svg/g)).toHaveLength(HOME_CHAPTERS.length);
    expect(casesMarkup).not.toContain("三條路的成本、坑、時間都不一樣。");
    expect(rendered).toContain("一家企業出海的");
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
