import { describe, expect, it } from "vitest";

import config from "../../next.config";

describe("redirects", () => {
  it("keeps permanent redirects for removed round-four pages", async () => {
    if (!config.redirects) throw new Error("next.config.ts must define redirects");

    const redirects = await config.redirects();

    expect(redirects).toEqual(expect.arrayContaining([
      { source: "/cases/shoe-brand", destination: "/cases", permanent: true },
      { source: "/cases/costco-health", destination: "/cases/goat-milk-soap-global", permanent: true },
      { source: "/cases/electronics-tariff", destination: "/cases/fish-floss-us-fda", permanent: true },
      { source: "/field" + "-notes", destination: "/resources", permanent: true },
    ]));
  });
});
