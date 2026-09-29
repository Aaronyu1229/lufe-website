import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  OptimizePage,
  OPTIMIZE_PAIN_POINTS,
  OPTIMIZE_SERVICES,
} from "@/components/services/OptimizePage";

const renderPage = () => renderToStaticMarkup(createElement(OptimizePage));

describe("OptimizePage", () => {
  it("includes every collapsed problem fix and plan deliverable in server markup", () => {
    const markup = renderPage();

    for (const point of OPTIMIZE_PAIN_POINTS) {
      expect(markup).toContain(point.title);
      expect(markup).toContain(point.fix);
      for (const sign of point.signs) expect(markup).toContain(sign);
    }

    for (const service of OPTIMIZE_SERVICES) {
      expect(markup).toContain(service.title);
      expect(markup).toContain(service.timeline);
      expect(markup).toContain(service.price);
      expect(markup).toContain(service.desc);
      expect(markup).toContain(service.deliverable);
      for (const item of service.items) expect(markup).toContain(item);
    }
  });

  it("does not render rounded utility classes", () => {
    expect(renderPage()).not.toMatch(/\brounded-/);
  });
});
