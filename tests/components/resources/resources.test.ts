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
});
