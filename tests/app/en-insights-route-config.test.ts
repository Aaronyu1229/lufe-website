import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Scheduled English articles go live after the last deploy; with dynamicParams = false
// they 404 until the next build. Publish-time gating lives in getEnglishArticle().
describe("English insights route config", () => {
  it("renders slugs not prebuilt at deploy time", () => {
    const source = readFileSync(join(process.cwd(), "src/app/en/insights/[slug]/page.tsx"), "utf8");
    expect(source).toMatch(/export const dynamicParams = true;/);
  });
});
