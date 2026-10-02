import { existsSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { CaseDetailPageContent } from "@/components/cases/CaseDetailPage";
import { CASES } from "@/data/cases";

describe("CaseDetailPageContent", () => {
  it("renders every prescribed story chapter and image in server markup", () => {
    for (const caseItem of CASES) {
      const markup = renderToStaticMarkup(createElement(CaseDetailPageContent, { caseItem }));

      expect(markup).toContain(caseItem.title);
      expect(markup).toContain(caseItem.summary);
      expect(markup).toContain("<img");
      expect(markup).not.toContain("<video");
      expect(markup).not.toContain("過程中");

      for (const stat of caseItem.stats) {
        expect(markup).toContain(stat.label);
        expect(markup).toContain(stat.value);
      }
      for (const chapter of caseItem.story) {
        expect(markup).toContain(chapter.heading);
        for (const paragraph of chapter.paragraphs) expect(markup).toContain(paragraph);
        if (chapter.image) {
          expect(markup).toContain(chapter.image.alt);
          expect(existsSync(join(process.cwd(), "public", chapter.image.src))).toBe(true);
          for (const width of [640, 1080, 1600]) {
            expect(existsSync(join(process.cwd(), "public", chapter.image.src.replace("-1600.webp", `-${width}.webp`)))).toBe(true);
          }
        }
      }
      for (const event of caseItem.timeline) {
        expect(markup).toContain(event.when);
        expect(markup).toContain(event.title);
        expect(markup).toContain(event.desc);
      }
      if (caseItem.quote) {
        expect(markup).toContain(caseItem.quote.text);
        expect(markup).toContain(caseItem.quote.attribution);
      }
    }
  });

  it("keeps every case statistic grounded in its story text", () => {
    for (const caseItem of CASES) {
      const storyText = caseItem.story.flatMap((chapter) => [chapter.heading, ...chapter.paragraphs]).join(" ");
      for (const stat of caseItem.stats) {
        const number = stat.value.match(/\d+(?:\.\d+)?/)?.[0];
        expect(number).toBeDefined();
        expect(storyText).toContain(number);
      }
    }
  });

  it("does not render rounded utility classes", () => {
    const markup = renderToStaticMarkup(createElement(CaseDetailPageContent, { caseItem: CASES[0] }));

    expect(markup).not.toMatch(/\brounded-/);
  });

  it("moves statistics out of the hero and keeps two story figures per case", () => {
    for (const caseItem of CASES) {
      const markup = renderToStaticMarkup(createElement(CaseDetailPageContent, { caseItem }));
      const heroMarkup = markup.slice(markup.indexOf('<section class="lufe-hero'), markup.indexOf("</section>") + "</section>".length);

      expect(heroMarkup).not.toContain("data-lufe-counter");
      for (const stat of caseItem.stats) expect(markup).toContain(stat.value);
      expect(markup.match(/<figure/g)).toHaveLength(2);
      expect(markup).not.toContain("h-10 w-10 place-items-center bg-gold");
    }
  });

  it("maps legacy stages to the new service routes without duplicate links", () => {
    const markup = renderToStaticMarkup(createElement(CaseDetailPageContent, { caseItem: CASES[0] }));

    expect(markup).toContain('href="/services/product-testing"');
    expect(markup).toContain('href="/services/north-america"');
    expect(markup.match(/href="\/services\/product-testing"/g)).toHaveLength(1);
  });
});
