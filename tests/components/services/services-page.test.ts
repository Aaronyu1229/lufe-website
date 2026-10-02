import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SERVICE_FAQS, ServicesPage } from "@/components/services/ServicesPage";

const chapterTileLines = [
  "用當地真實消費者的反應，決定要不要往下走",
  "產品證審核期間，上架與市場活動同步推進",
  "註冊、招聘、掛證，在當地建立自己的團隊",
  "英文客服由菲律賓專業團隊接手，服務規則由台灣端制定",
];

const renderPage = () => renderToStaticMarkup(createElement(ServicesPage));
const normalizedMarkup = () => renderPage().replaceAll("\n", "");

describe("ServicesPage", () => {
  it("includes every chapter tile and FAQ answer in the server markup", () => {
    const markup = normalizedMarkup();

    for (const line of chapterTileLines) expect(markup).toContain(line);
    expect(markup).toContain("了解方案 →");

    for (const faq of SERVICE_FAQS) {
      expect(markup).toContain(faq.q);
      expect(markup).toContain(faq.a.replaceAll("\n", ""));
      expect(markup).toContain(faq.takeaway);
    }
  });

  it("never shows a literal backslash-n to visitors", () => {
    expect(renderPage()).not.toContain("\\n");
  });

  it("uses the approved testing-panel description", () => {
    expect(normalizedMarkup()).toContain("當地消費者組成的測試面板，產品上架前先取得真實反應");
    expect(normalizedMarkup()).not.toContain("當地上班族與家長組成的測試面板");
  });

  it("does not render rounded utility classes", () => {
    expect(renderPage()).not.toMatch(/\brounded-(?!full\b)/);
  });

  it("renders the updated service overview and FAQ ordinals without the stats strip", () => {
    const markup = normalizedMarkup();

    expect(markup).toContain("我們不會先報價再問你需求。");
    expect(markup).toContain("第一次見面，我們想先聽你的產品在台灣怎麼賣、為什麼想出去。有時候聽完，我們會建議你再等等——那也是一種答案。");
    expect(markup).toContain("兩條出海路徑：菲律賓在地落地，北美通路拓展");
    expect(markup).toContain("市場探查、寄賣、公司落地、海外客服——企業出海第一年會遇到的四件事，鹿飛做成四個方案。可以只走一章，也可以一路走完");
    expect(markup).toContain("進入北美主流零售通路");
    expect(markup).toContain("串起當地的每一個執行夥伴");
    expect(markup).not.toContain("躍馬企業 · 年物流底層");
    expect(markup).not.toContain("data-lufe-counter");
    expect(markup).not.toContain("42+");
    expect(markup).not.toContain("500+");

    for (const [index] of SERVICE_FAQS.entries()) {
      expect(markup).toContain(String(index + 1).padStart(2, "0"));
    }
  });
});
