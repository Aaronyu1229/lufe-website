import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SubsidyAlertBand } from "@/components/home/SubsidyAlertBand";

describe("SubsidyAlertBand", () => {
  it("features market expansion before its 2026-10-30 18:00 deadline and buyer direct after", () => {
    const beforeDeadline = renderToStaticMarkup(createElement(SubsidyAlertBand, {
      now: new Date("2026-10-30T17:59:59+08:00"),
    }));
    const afterDeadline = renderToStaticMarkup(createElement(SubsidyAlertBand, {
      now: new Date("2026-10-30T18:00:01+08:00"),
    }));

    expect(beforeDeadline).toContain("海外通路布建補助 2026/10/30 18:00 截止");
    expect(beforeDeadline).toContain('href="/resources/subsidies#market-expansion"');
    expect(afterDeadline).toContain("買主直達受理至 2027/9/15");
    expect(afterDeadline).toContain('href="/resources/subsidies#cross-border-ecommerce"');
  });
});
