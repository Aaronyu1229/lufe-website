import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ResourcesPage from "@/app/resources/page";
import { SUBSIDIES } from "@/data/subsidies";

describe("ResourcesPage", () => {
  it("renders subsidy rows without the removed activities section", () => {
    const markup = renderToStaticMarkup(createElement(ResourcesPage));

    for (const subsidy of SUBSIDIES) {
      expect(markup).toContain(subsidy.shortTitle.replace("&", "&amp;"));
      expect(markup).toContain(`/resources/subsidies#${subsidy.slug}`);
    }
    expect(markup).not.toContain("4 個正在開放");
    expect(markup).not.toContain("rounded-");
  });

  it("renders the R4 resources hero and exploration tiles", () => {
    const markup = renderToStaticMarkup(createElement(ResourcesPage));

    expect(markup).toContain("出海資源中心，");
    expect(markup).toContain("補助與工具一次看完");
    for (const href of ["/cases", "/insights", "/assess", "https://tradepiloter.com"]) expect(markup).toContain(`href=\"${href}\"`);
    expect(markup).not.toContain("現場紀錄");
    expect(markup).not.toContain("field-notes");
    expect(markup).not.toContain("想看實際做過的案子");
  });
});
