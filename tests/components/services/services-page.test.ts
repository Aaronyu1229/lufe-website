import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SERVICE_FAQS, ServicesPage } from "@/components/services/ServicesPage";
import { CHAPTERS, PHILIPPINES_CHAPTER_KEYS } from "@/data/chapters";

const renderPage = () => renderToStaticMarkup(createElement(ServicesPage));
const normalizedMarkup = () => renderPage().replaceAll("\n", "");

describe("ServicesPage", () => {
  it("includes every chapter and disclosure answer in the server markup", () => {
    const markup = normalizedMarkup();

    for (const key of PHILIPPINES_CHAPTER_KEYS) {
      const chapter = CHAPTERS[key];
      expect(markup).toContain(chapter.label);
      expect(markup).toContain(chapter.overview?.body.replaceAll("\n", ""));
    }

    for (const faq of SERVICE_FAQS) {
      expect(markup).toContain(faq.q);
      expect(markup).toContain(faq.a.replaceAll("\n", ""));
    }
  });

  it("does not render rounded utility classes", () => {
    expect(renderPage()).not.toMatch(/\brounded-(?!full\b)/);
  });

  it("renders the complete pricing answer and FAQ ordinals", () => {
    const markup = normalizedMarkup();

    expect(markup).toContain("我們不會先報價再問你需求。");
    expect(markup).toContain("第一次見面，我們想先聽你的產品在台灣怎麼賣、為什麼想出去。有時候聽完，我們會建議你再等等——那也是一種答案。");
    expect(markup).toContain("菲律賓的第一年，北美的貨架");

    for (const [index] of SERVICE_FAQS.entries()) {
      expect(markup).toContain(String(index + 1).padStart(2, "0"));
    }
  });
});
