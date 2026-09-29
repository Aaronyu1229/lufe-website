import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { StagePage } from "@/components/services/StagePage";
import { STAGES, STAGE_ORDER } from "@/data/services";

const renderStage = (slug: (typeof STAGE_ORDER)[number]) =>
  renderToStaticMarkup(createElement(StagePage, { stage: STAGES[slug] }));

const markupText = (markup: string) => markup.replaceAll("&lt;", "<").replaceAll("&gt;", ">");

describe("StagePage", () => {
  it("includes every stage deliverable and collapsed weekly and stop-condition text in server markup", () => {
    for (const slug of STAGE_ORDER) {
      const stage = STAGES[slug];
      const markup = markupText(renderStage(slug));

      for (const deliverable of stage.deliverables) {
        expect(markup).toContain(deliverable.title);
        expect(markup).toContain(deliverable.desc);
      }

      for (const process of stage.process) {
        expect(markup).toContain(process.week);
        expect(markup).toContain(process.title);
        for (const item of process.items) expect(markup).toContain(item);
      }

      for (const redFlag of stage.redFlags) {
        expect(markup).toContain(redFlag.title);
        expect(markup).toContain(redFlag.desc);
      }
    }
  });

  it("does not render rounded utility classes", () => {
    for (const slug of STAGE_ORDER) {
      expect(renderStage(slug)).not.toMatch(/\brounded-/);
    }
  });
});
