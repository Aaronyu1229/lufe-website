import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { EntryScreen, getAssessResult, InvalidAssessResult, assessQuestions } from "@/components/assess/AssessWizard";

describe("Assess", () => {
  it("keeps every question and answer in the entry SSR markup", () => {
    const markup = renderToStaticMarkup(createElement(EntryScreen));

    for (const question of assessQuestions) {
      expect(markup).toContain(question.label);
      for (const option of question.options) {
        expect(markup).toContain(option.label);
        if (option.hint) expect(markup).toContain(option.hint);
      }
    }

    expect(markup).not.toContain("AY");
    expect(markup).not.toContain("Aaron Yu · 鹿飛創辦人");
    expect(markup).not.toContain("開始比對 →");
    expect(markup).not.toContain("rounded-");
  });

  it("parses valid results into a primary case and renders incomplete links safely", () => {
    const valid = getAssessResult(new URLSearchParams("stage=scaling&blocker=channel&market=us"));
    expect(valid?.primary.slug).toBe("costco-health");
    expect(getAssessResult(new URLSearchParams("stage=bad&blocker=channel&market=us"))).toBeNull();
    expect(renderToStaticMarkup(createElement(InvalidAssessResult))).toContain("這份比對連結不完整");
  });
});
