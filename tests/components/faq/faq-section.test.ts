import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { FaqSection } from "@/components/faq/FaqSection";
import type { FaqEntry } from "@/components/faq/FaqItem";

const FAQ_ITEMS: readonly FaqEntry[] = [
  {
    num: "01",
    question: "第一個問題",
    answer: "第一個答案。",
    takeaway: "第一個重點",
  },
  {
    num: "02",
    question: "第二個問題",
    answer: "第二個答案。",
  },
];

const renderFaqSection = () => renderToStaticMarkup(createElement(FaqSection, {
  title: "常見問題",
  items: FAQ_ITEMS,
  idPrefix: "faq-test",
}));

describe("FaqSection", () => {
  it("keeps every question and answer in server markup", () => {
    const markup = renderFaqSection();

    for (const item of FAQ_ITEMS) {
      expect(markup).toContain(item.question);
      expect(markup).toContain(item.answer);
      if (item.takeaway) expect(markup).toContain(item.takeaway);
    }
    expect(markup).toContain("還有其他問題？");
    expect(markup).toContain("直接問鹿飛 →");
    expect(markup.match(/aria-expanded="true"/g)).toHaveLength(1);
  });

  it("uses no rounded utility classes", () => {
    expect(renderFaqSection()).not.toContain("rounded-");
  });
});
