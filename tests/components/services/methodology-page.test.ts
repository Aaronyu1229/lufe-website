import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  BOUNDARIES_COPY,
  COMPANIONSHIP_COPY,
  DOUBLE_SCORE_COPY,
  EXAMPLES_CLOSING,
  FIRST_MONTH_COPY,
  FOUNDATIONS_CLOSING,
  FOUNDATIONS_FOOTNOTE,
  METHODOLOGY_DECISIONS,
  METHODOLOGY_DIMENSIONS,
  METHODOLOGY_EXAMPLES,
  METHODOLOGY_FOUNDATIONS,
  MethodologyPage,
  ORIGIN_STORY,
  REPORT_DISCLAIMER,
  REPORT_OUTLINE,
  RULES_COPY,
  SCALE_INTRO,
  THIRD_MONTH_INTRO,
} from "@/components/services/MethodologyPage";
import { splitDimensionName } from "@/components/services/methodology/RubricItem";

const renderPage = () => renderToStaticMarkup(createElement(MethodologyPage));
const markupText = (markup: string) => markup.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&");

describe("MethodologyPage", () => {
  it("keeps every specified text section and collapsed detail in server markup", () => {
    const markup = markupText(renderPage());

    for (const copy of [
      ORIGIN_STORY,
      EXAMPLES_CLOSING,
      FIRST_MONTH_COPY,
      THIRD_MONTH_INTRO,
      REPORT_DISCLAIMER,
      SCALE_INTRO,
      DOUBLE_SCORE_COPY,
      RULES_COPY,
      COMPANIONSHIP_COPY,
      FOUNDATIONS_CLOSING,
      FOUNDATIONS_FOOTNOTE,
      BOUNDARIES_COPY,
    ]) {
      expect(markup).toContain(copy);
    }

    for (const example of METHODOLOGY_EXAMPLES) {
      expect(markup).toContain(example.title);
      for (const section of example.sections) {
        expect(markup).toContain(section.label);
        expect(markup).toContain(section.body);
      }
    }
    for (const item of REPORT_OUTLINE) expect(markup).toContain(item);
    for (const dimension of METHODOLOGY_DIMENSIONS) {
      const [en, zh] = splitDimensionName(dimension.name);
      expect(`${en} ${zh}`).toBe(dimension.name);
      expect(markup).toContain(en);
      expect(markup).toContain(zh);
      expect(markup).toContain(dimension.question);
      expect(markup).toContain(dimension.criteria);
      expect(markup).toContain(dimension.redAt);
    }
    for (const decision of METHODOLOGY_DECISIONS) {
      expect(markup).toContain(decision.score);
      expect(markup).toContain(decision.verdict);
      expect(markup).toContain(decision.advice);
    }
    for (const foundation of METHODOLOGY_FOUNDATIONS) {
      expect(markup).toContain(foundation.lead);
      expect(markup).toContain(foundation.footnote);
      expect(markup).toContain(foundation.body);
    }
  });

  it("uses five SSR rubric accordions, with only the first rubric open", () => {
    const markup = renderPage();

    expect(markup.match(/aria-expanded="(?:true|false)"/g)).toHaveLength(METHODOLOGY_DIMENSIONS.length);
    expect(markup.match(/aria-expanded="true"/g)).toHaveLength(1);
  });

  it("renders the mobile carousel controls and both cards in server markup", () => {
    const markup = renderPage();

    expect(markup).toContain('aria-label="查看例子 1"');
    expect(markup).toContain('aria-label="查看例子 2"');
    expect(markup).toContain('aria-current="true"');
  });

  it("keeps the specified red-line percentages and has no rubric weight data", () => {
    const markup = renderPage();

    expect(markup).toContain("70%");
    expect(markup).toContain("5%");
    for (const dimension of METHODOLOGY_DIMENSIONS) expect("weight" in dimension).toBe(false);
  });

  it("uses square corners except for the carousel dots", () => {
    expect(renderPage()).not.toMatch(/\brounded-(?!full\b)/);
  });
});
