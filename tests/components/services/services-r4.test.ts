import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/articles/repository", () => ({
  listPublishedArticles: vi.fn().mockResolvedValue([]),
}));

import { ChapterPage } from "@/components/services/ChapterPage";
import { MethodologyPage } from "@/components/services/MethodologyPage";
import { CHAPTERS, type ChapterKey } from "@/data/chapters";

const renderChapter = async (key: ChapterKey) =>
  renderToStaticMarkup(await ChapterPage({ chapter: CHAPTERS[key] }));

describe("services round four", () => {
  it("uses the professional product-testing heading without audience labels", async () => {
    const markup = await renderChapter("m1");

    expect(markup).toContain("先驗證市場，再決定投入");
    expect(markup).not.toMatch(/媽媽|家長|上班族/);
  });

  it("uses the professional call-center h1", async () => {
    const markup = await renderChapter("after");

    expect(markup).toMatch(/<h1[^>]*>海外客服，交給專業英語團隊<\/h1>/);
  });

  it("renders the four consignment inclusions without the withdrawn copy", async () => {
    const markup = await renderChapter("m3");

    expect(markup).toContain("寄賣包包含的四件事");
    for (const title of ["通路媒合", "產品證代持", "社群試用", "市場報告", "三種通路，我們替你去談", "接上通路之後，我們還在", "成為通路夥伴"]) expect(markup).toContain(title);
    expect(markup).toContain("核心服務");
    for (const banned of ["鹿飛的做法", "鹿飛這一軌", "五件事", "架上已經有人在等", "有人拍了影片", "資料歸品牌", "平台費用與抽成", "學校家長"]) expect(markup).not.toContain(banned);
  });

  it("uses the localization pricing specification table", async () => {
    const markup = await renderChapter("m9");
    const priceSection = markup.match(/<section[^>]*data-lufe-price[^>]*>[\s\S]*?<\/section>/)?.[0] ?? "";

    for (const copy of ["費用", "按案報價", "談清楚之後會給你", "公司註冊", "律師文件", "招聘", "場地", "時間表"]) expect(priceSection).toContain(copy);
    expect(priceSection).not.toMatch(/class="[^"]*(?:border-navy-l[^"]*bg-navy|bg-navy[^"]*border-navy-l)[^"]*"/);
  });

  it("renders both methodology examples and all findings without audience labels", () => {
    const markup = renderToStaticMarkup(createElement(MethodologyPage));

    for (const copy of [
      "一盒台灣手工花生糖禮盒，想去菲律賓",
      "一瓶台灣防曬乳，想去菲律賓",
      "花生糖禮盒",
      "防曬乳",
      "決策意涵",
      "換算後是當地心理價位的兩倍以上",
      "效期遠長於當地主流產品",
      "其中一個口味評價兩極",
      "沒有競品主打全素與潔淨標章",
      "「維他命 C」被聽成美白",
      "當地偏好有香味",
    ]) expect(markup).toContain(copy);

    expect(markup).not.toMatch(/女性上班族|小資|她們/);
  });
});
