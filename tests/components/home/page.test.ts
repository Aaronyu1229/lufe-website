import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";
import { HOME_CASE_CARDS } from "@/components/home/CasesSection";
import { HOME_FAQ_ITEMS } from "@/components/home/HomeFAQ";
import { HOME_HERO_SLIDES } from "@/components/home/HeroSection";
import { HOME_COVERAGE_PILLARS, HOME_COVERAGE_ROWS } from "@/components/home/WhySection";
import { getSubsidyBySlug } from "@/data/subsidies";

const markup = () => renderToStaticMarkup(createElement(Home));

describe("home page", () => {
  it("keeps all tab, carousel, panel, and disclosure text in static markup", () => {
    const rendered = markup();

    for (const slide of HOME_HERO_SLIDES) {
      expect(rendered).toContain(slide.chipLabel);
      expect(rendered).toContain(slide.eyebrow);
      expect(rendered).toContain(slide.titleLines[0]);
      expect(rendered).toContain(slide.titleLines[1]);
      expect(rendered).toContain(slide.subtitle);
      expect(rendered).toContain(slide.primary.label);
      expect(rendered).toContain(slide.secondary.label);
    }

    for (const item of HOME_CASE_CARDS) {
      for (const tag of item.tags) expect(rendered).toContain(tag.label);
      expect(rendered).toContain(item.num);
      expect(rendered).toContain(item.numLabel);
      expect(rendered).toContain(item.scalePrefix);
      expect(rendered).toContain(item.title);
      expect(rendered).toContain(item.painLine);
      expect(rendered).toContain(item.solutionLine);
      expect(rendered).toContain(item.route.from);
      expect(rendered).toContain(item.route.to);
      expect(rendered).toContain(item.trustSignal);
    }

    for (const item of HOME_FAQ_ITEMS) {
      expect(rendered).toContain(item.question);
      expect(rendered).toContain(item.takeaway);
      expect(rendered).toContain(item.answer);
    }

    for (const pillar of HOME_COVERAGE_PILLARS) expect(rendered).toContain(pillar);
    for (const row of HOME_COVERAGE_ROWS) {
      expect(rendered).toContain(row.label);
      expect(rendered).toContain(row.note);
    }

    expect(rendered).toContain(getSubsidyBySlug("overseas-exhibition")!.verifiedOn);
  });

  it("uses no rounded utility classes", () => {
    expect(markup()).not.toContain("rounded-");
  });

  it("uses no legacy heading utility classes", () => {
    const rendered = markup();

    expect(rendered).not.toContain("hero-title");
    expect(rendered).not.toContain("section-heading");
  });
});
