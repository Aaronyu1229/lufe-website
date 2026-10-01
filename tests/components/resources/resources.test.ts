import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ResourcesPage from "@/app/resources/page";
import { SUBSIDIES } from "@/data/subsidies";
import { ACTIVITIES } from "@/data/fieldNotes";

describe("ResourcesPage", () => {
  it("renders subsidy rows and the first three real activities without legacy hub stats", () => {
    const markup = renderToStaticMarkup(createElement(ResourcesPage));

    for (const subsidy of SUBSIDIES) {
      expect(markup).toContain(subsidy.shortTitle.replace("&", "&amp;"));
      expect(markup).toContain(`/resources/subsidies#${subsidy.slug}`);
    }
    for (const activity of ACTIVITIES.filter((activity) => activity.image && !activity.tbd).slice(0, 3)) expect(markup).toContain(activity.title);
    expect(markup).not.toContain("4 個正在開放");
    expect(markup).not.toContain("rounded-");
  });
});
