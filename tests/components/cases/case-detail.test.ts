import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { CaseDetailPageContent } from "@/components/cases/CaseDetailPage";
import { CASES } from "@/data/cases";

describe("CaseDetailPageContent", () => {
  it("keeps every timeline carousel card and detail panel text in server markup", () => {
    for (const caseItem of CASES) {
      const markup = renderToStaticMarkup(createElement(CaseDetailPageContent, { caseItem }));

      expect(markup).toContain(caseItem.title);
      expect(markup).toContain(caseItem.summary);
      expect(markup).toContain(caseItem.challenge);
      expect(markup).toContain(caseItem.approach);
      expect(markup).toContain(caseItem.result);

      for (const stat of caseItem.stats) {
        expect(markup).toContain(stat.label);
        expect(markup).toContain(stat.value);
      }
      for (const event of caseItem.timeline) {
        expect(markup).toContain(event.when);
        expect(markup).toContain(event.title);
        expect(markup).toContain(event.desc);
      }
      for (const decision of caseItem.keyDecisions) {
        expect(markup).toContain(decision.moment);
        expect(markup).toContain(decision.choice);
        expect(markup).toContain(decision.reasoning);
        for (const option of decision.options) expect(markup).toContain(option);
      }
      if (caseItem.quote) {
        expect(markup).toContain(caseItem.quote.text);
        expect(markup).toContain(caseItem.quote.attribution);
      }
    }
  });

  it("uses rounded-full only for the decision option dots", () => {
    const markup = renderToStaticMarkup(createElement(CaseDetailPageContent, { caseItem: CASES[0] }));

    expect(markup).not.toMatch(/\brounded-(?!full\b)/);
    expect(markup).toContain("rounded-full");
  });

  it("maps legacy stages to the new service routes without duplicate links", () => {
    const markup = renderToStaticMarkup(createElement(CaseDetailPageContent, { caseItem: CASES[0] }));

    expect(markup).toContain('href="/services/product-testing"');
    expect(markup).toContain('href="/services/north-america"');
    expect(markup.match(/href="\/services\/product-testing"/g)).toHaveLength(1);
  });
});
