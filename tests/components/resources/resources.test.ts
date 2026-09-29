import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ResourcesPage from "@/app/resources/page";
import { SUBSIDIES } from "@/data/subsidies";
import { ACTIVITIES } from "@/data/fieldNotes";

describe("ResourcesPage", () => {
  it("renders the resource counts without rounded classes", () => {
    const markup = renderToStaticMarkup(createElement(ResourcesPage));

    expect(markup).toContain(String(SUBSIDIES.length));
    expect(markup).toContain(String(ACTIVITIES.length));
    expect(markup).toContain("2026 政府出海補助");
    expect(markup).toContain("活動 · 現場紀錄");
    expect(markup).not.toContain("rounded-");
  });
});
