import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ServicesPage } from "@/components/services/ServicesPage";
import { metadata as enMetadata } from "@/app/en/services/page";

import { expectEnglishMarkup } from "./helpers";

const zhGolden = readFileSync("tests/fixtures/services-page.zh.html", "utf8");

describe("services page i18n", () => {
  it("keeps the Chinese page byte-identical", () => {
    const html = renderToStaticMarkup(createElement(ServicesPage));

    expect(html).not.toContain("How we work with you");
    expect(html).toBe(zhGolden);
  });

  it("renders English with no Chinese text", () => {
    const html = renderToStaticMarkup(createElement(ServicesPage, { locale: "en" }));
    expectEnglishMarkup(html);
    expect(html).toContain("How we work with you");
    expect(html).toContain("A brand&#x27;s first year in Manila");
    expect(html).toContain("Market Test");
    expect(html).toContain("Call Center");
  });

  it("keeps every internal link inside /en", () => {
    const html = renderToStaticMarkup(createElement(ServicesPage, { locale: "en" }));
    expectEnglishMarkup(html);
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
    const internal = hrefs.filter((href) => href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/api/") && !/\.[a-z0-9]+$/i.test(href.split(/[?#]/)[0]));
    expect(internal.length).toBeGreaterThan(0);
  });

  it("has English metadata pointing at /en/services", () => {
    expect(enMetadata.alternates).toEqual({ canonical: "/en/services" });
    expect(String(enMetadata.title)).not.toMatch(/\p{Script=Han}/u);
  });
});
