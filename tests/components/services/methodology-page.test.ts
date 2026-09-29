import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  METHODOLOGY_DECISIONS,
  METHODOLOGY_DIMENSIONS,
  METHODOLOGY_INDEX,
  MethodologyPage,
  WORKED_EXAMPLE,
} from "@/components/services/MethodologyPage";

const renderPage = () => renderToStaticMarkup(createElement(MethodologyPage));
const markupText = (markup: string) => markup.replaceAll("&lt;", "<").replaceAll("&gt;", ">");

describe("MethodologyPage", () => {
  it("includes every index, collapsed dimension, and worked-example detail in server markup", () => {
    const markup = markupText(renderPage());

    for (const item of METHODOLOGY_INDEX) expect(markup).toContain(item.label);

    for (const dimension of METHODOLOGY_DIMENSIONS) {
      expect(markup).toContain(dimension.name);
      expect(markup).toContain(dimension.question);
      expect(markup).toContain(dimension.weight);
      expect(markup).toContain(dimension.redAt);
      for (const criterion of dimension.criteria) expect(markup).toContain(criterion);
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
  });

  it("does not render rounded utility classes", () => {
    expect(renderPage()).not.toMatch(/\brounded-/);
  });
});
