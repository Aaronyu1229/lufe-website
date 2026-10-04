import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SERVICE_FAQS, ServicesPage } from "@/components/services/ServicesPage";

const chapterTileLines = [
  "讓當地真實消費者先用、先說，再決定要不要往下走",
  "產品證由當地持證進口商代辦、代持；證下來之前，先把通路和市場活動準備好",
  "註冊、招聘、掛證，在當地建立你自己的團隊",
  "英文客服由菲律賓團隊接手，服務規則由台灣端制定。預計 2027 Q1 開放首批",
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
    expect(normalizedMarkup()).toContain("由當地老師、家長等有固定收入、自己花錢買東西的消費者組成的試用面板，產品上架前先拿到真實反應");
    expect(normalizedMarkup()).not.toContain("當地上班族與家長組成的測試面板");
  });

  it("does not render rounded utility classes", () => {
    expect(renderPage()).not.toMatch(/\brounded-(?!full\b)/);
  });

  it("renders the updated service overview and FAQ ordinals without the stats strip", () => {
    const markup = normalizedMarkup();

    expect(markup).toContain("我們不會先報價再問你需求。");
    expect(markup).toContain("第一次見面，我們想先聽你的產品在台灣怎麼賣、為什麼想出去。");
    expect(markup).toContain("主線是菲律賓；產品已經站穩的，另有北美通路");
    expect(markup).toContain("市場探查、寄賣、公司落地、海外客服——台灣品牌進菲律賓的第一年，多半會依序遇到這四件事。我們把它做成四個方案，每個都有明碼價格。可以只走一章，也可以一路走完。");
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
