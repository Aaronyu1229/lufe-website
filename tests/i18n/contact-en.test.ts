import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ContactPage } from "@/components/contact/ContactPage";
import { expectEnglishMarkup } from "./helpers";

describe("ContactPage i18n", () => {
  it("keeps Chinese byte-identical", () => {
    expect(renderToStaticMarkup(createElement(ContactPage))).toBe(readFileSync("tests/fixtures/contact-page.zh.html", "utf8"));
  });

  it("renders the contact interface in complete English", () => {
    const html = renderToStaticMarkup(createElement(ContactPage, { locale: "en" } as any));

    expectEnglishMarkup(html);
    expect(html).toContain("We reply within one business day");
    expect(html).toContain("aaron.yu@reborn.in");
  });
});
