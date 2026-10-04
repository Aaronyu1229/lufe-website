import { readFileSync } from "node:fs";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ContactPage } from "@/components/contact/ContactPage";
import { expectEnglishMarkup } from "./helpers";

const ContactPageForTest = ContactPage as ComponentType<NonNullable<Parameters<typeof ContactPage>[0]>>;

describe("ContactPage i18n", () => {
  it("keeps Chinese byte-identical", () => {
    const html = renderToStaticMarkup(createElement(ContactPage));

    expect(html).not.toContain("Before you write");
    expect(html).toBe(readFileSync("tests/fixtures/contact-page.zh.html", "utf8"));
  });

  it("renders the contact interface in complete English", () => {
    const html = renderToStaticMarkup(createElement(ContactPageForTest, { locale: "en" }));

    expectEnglishMarkup(html);
    expect(html).toContain("Before you write");
    expect(html).toContain("We reply within one business day");
    expect(html).toContain("aaron.yu@reborn.in");
  });
});
