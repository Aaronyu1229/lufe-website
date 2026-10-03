import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

import { normalizePathname, pathnameHasDarkHero } from "@/components/Navbar";
import { getContextualCopy, getContextualSubsidy } from "@/data/subsidies";

describe("paths under /en behave like their Chinese counterparts", () => {
  it("normalizes /en paths to the Chinese path", () => {
    expect(normalizePathname("/en")).toBe("/");
    expect(normalizePathname("/en/services")).toBe("/services");
    expect(normalizePathname("/index")).toBe("/");
  });

  it("keeps dark hero detection identical", () => {
    for (const path of ["/", "/services", "/services/consignment", "/about", "/insights", "/contact"]) {
      expect(pathnameHasDarkHero(normalizePathname(`/en${path === "/" ? "" : path}`))).toBe(pathnameHasDarkHero(path));
    }
  });

  it("picks the same contextual subsidy copy", () => {
    expect(getContextualCopy("/en/services/product-testing")).toEqual(getContextualCopy("/services/product-testing"));
    expect(getContextualSubsidy("/en/services/localization")).toEqual(getContextualSubsidy("/services/localization"));
  });
});
