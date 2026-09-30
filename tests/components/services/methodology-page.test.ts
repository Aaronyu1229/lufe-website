import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  METHODOLOGY_DECISIONS,
  METHODOLOGY_DIMENSIONS,
  METHODOLOGY_FAQS,
  MethodologyPage,
  WORKED_EXAMPLE,
} from "@/components/services/MethodologyPage";

const renderPage = () => renderToStaticMarkup(createElement(MethodologyPage));
const markupText = (markup: string) => markup.replaceAll("&lt;", "<").replaceAll("&gt;", ">");

describe("MethodologyPage", () => {
  it("keeps every score detail, answer, and FAQ answer in server markup", () => {
    const markup = markupText(renderPage());

    for (const dimension of METHODOLOGY_DIMENSIONS) {
      expect(markup).toContain(dimension.name);
      expect(markup).toContain(dimension.question);
      expect(markup).toContain(dimension.weight);
      expect(markup).toContain(dimension.criteria);
      expect(markup).toContain(dimension.redAt);
    }
    for (const decision of METHODOLOGY_DECISIONS) {
      expect(markup).toContain(decision.score);
      expect(markup).toContain(decision.verdict);
      expect(markup).toContain(decision.advice);
    }
    for (const score of WORKED_EXAMPLE.scores) {
      expect(markup).toContain(score.dim);
      expect(markup).toContain(score.note);
      expect(markup).toContain(String(score.score));
    }
    expect(markup).toContain(WORKED_EXAMPLE.condition);
    expect(markup).toContain(WORKED_EXAMPLE.outcome);
    for (const [question, answer] of METHODOLOGY_FAQS) {
      expect(markup).toContain(question);
      expect(markup).toContain(answer);
    }
  });

  it("includes the D8 Costco outcome", () => {
    expect(renderPage()).toContain("實際結果：6 個月上架，首月銷量超標 40%。");
  });

  it("does not render rounded utility classes", () => {
    expect(renderPage()).not.toMatch(/\brounded-/);
  });
});
