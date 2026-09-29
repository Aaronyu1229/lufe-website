import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { CasesPageContent } from "@/components/cases/CasesPage";
import { CASES, CASE_CARD_META, INDUSTRIES, MARKETS } from "@/data/cases";

const renderCasesPage = () => renderToStaticMarkup(
  createElement(CasesPageContent, { industry: "all", market: "all" }),
);

describe("CasesPageContent", () => {
  it("keeps every filter, case card, and expanded panel summary in server markup", () => {
    const markup = renderCasesPage();

    for (const option of [...INDUSTRIES, ...MARKETS]) {
      expect(markup).toContain(option.label);
    }

    for (const caseItem of CASES) {
      const meta = CASE_CARD_META[caseItem.slug];
      expect(markup).toContain(caseItem.title);
      expect(markup).toContain(caseItem.summary);
      expect(markup).toContain(caseItem.num);
      expect(markup).toContain(meta.headline);
      expect(markup).toContain(meta.painTitle);

      for (const tag of caseItem.tags) expect(markup).toContain(tag.label);
      for (const beat of meta.beats) expect(markup).toContain(beat);
    }
  });

  it("does not render rounded utility classes", () => {
    expect(renderCasesPage()).not.toMatch(/\brounded-(?!full\b)/);
  });
});
