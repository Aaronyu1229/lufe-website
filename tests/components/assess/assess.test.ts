import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { AssessQuestionFlow, EntryScreen, assessQuestions } from "@/components/assess/AssessWizard";
import { CASES } from "@/data/cases";

describe("AssessQuestionFlow", () => {
  it("keeps every question and answer in SSR markup without rounded classes", () => {
    const markup = renderToStaticMarkup(createElement(AssessQuestionFlow));
    const entryMarkup = renderToStaticMarkup(createElement(EntryScreen, { onStart: () => undefined, focusCase: undefined }));

    for (const question of assessQuestions) {
      expect(markup).toContain(question.label);
      expect(entryMarkup).toContain(question.label);
      for (const option of question.options) {
        expect(markup).toContain(option.label);
        expect(entryMarkup).toContain(option.label);
        if (option.hint) expect(markup).toContain(option.hint);
      }
    }

    for (const caseStudy of CASES) {
      expect(entryMarkup).toContain(caseStudy.title);
      for (const tag of caseStudy.tags) expect(entryMarkup).toContain(tag.label);
    }

    expect(markup).not.toContain("rounded-");
    expect(entryMarkup).not.toContain("rounded-");
  });
});
