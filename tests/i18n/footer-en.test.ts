import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Footer } from "@/components/Footer";

import { expectEnglishMarkup } from "./helpers";

const zhGolden = readFileSync("tests/fixtures/footer.zh.html", "utf8");

describe("footer i18n", () => {
  it("keeps the Chinese footer byte-identical", () => {
    expect(renderToStaticMarkup(createElement(Footer))).toBe(zhGolden);
  });

  it("renders complete English", () => {
    expectEnglishMarkup(renderToStaticMarkup(createElement(Footer, { locale: "en" })));
  });
});
