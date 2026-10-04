import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { expectEnglishMarkup } from "./helpers";

const pathname = vi.hoisted(() => ({ current: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => pathname.current,
}));

import { Navbar } from "@/components/Navbar";

const zhGolden = readFileSync("tests/fixtures/navbar.zh.html", "utf8");

const renderNavbar = () => renderToStaticMarkup(createElement(Navbar));

describe("navbar i18n", () => {
  it("keeps the Chinese navbar byte-identical", () => {
    pathname.current = "/";
    expect(renderNavbar()).toBe(zhGolden);
  });

  it("renders complete English", () => {
    pathname.current = "/en/services";
    const html = renderNavbar();

    expectEnglishMarkup(html);
    for (const label of ["Market Test", "Consignment", "Company Setup", "Call Center", "North America Retail"]) {
      expect(html).toContain(label);
    }
  });

  it("keeps links inside English routes", () => {
    pathname.current = "/en/services";
    expect(renderNavbar()).toContain('href="/en/services/consignment"');
  });
});
