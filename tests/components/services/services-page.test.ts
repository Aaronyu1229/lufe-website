import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SERVICE_FAQS, ServicesPage } from "@/components/services/ServicesPage";
import { PILLARS, PILLAR_ORDER } from "@/data/services";

const renderPage = () => renderToStaticMarkup(createElement(ServicesPage));

describe("ServicesPage", () => {
  it("includes every segmented pillar and disclosure answer in the server markup", () => {
    const markup = renderPage();

    for (const slug of PILLAR_ORDER) {
      const pillar = PILLARS[slug];
      expect(markup).toContain(pillar.title);
      expect(markup).toContain(pillar.tagline);
      expect(markup).toContain(pillar.description);

      for (const service of pillar.services) {
        expect(markup).toContain(service.title);
        expect(markup).toContain(service.desc);
      }
    }

    for (const faq of SERVICE_FAQS) {
      expect(markup).toContain(faq.q);
      expect(markup).toContain(faq.a);
    }
  });

  it("does not render rounded utility classes", () => {
    expect(renderPage()).not.toMatch(/\brounded-(?!full\b)/);
  });

  it("renders the proposal sticky switch and FAQ ordinals", () => {
    const markup = renderPage();

    expect(markup).toContain("sticky top-[74px]");
    expect(markup).toContain("w-fit max-w-full");
    expect(markup).toContain("bg-[rgba(245,242,236,0.9)]");
    expect(markup).toContain("backdrop-blur-[16px]");
    expect(markup).toContain("scroll-mt-[126px]");
    expect(markup).not.toContain("font-heading");

    for (const [index] of SERVICE_FAQS.entries()) {
      expect(markup).toContain(String(index + 1).padStart(2, "0"));
    }
  });
});
