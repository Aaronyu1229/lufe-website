import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LanguageToggle } from "@/components/i18n/LanguageToggle";

const render = (pathname: string, visible?: boolean) =>
  renderToStaticMarkup(createElement(LanguageToggle, { pathname, visible }));

describe("LanguageToggle", () => {
  it("renders nothing while English is closed", () => {
    expect(render("/services")).toBe("");
  });

  it("links a Chinese page to its English twin", () => {
    const html = render("/services", true);
    expect(html).toContain('href="/en/services"');
    expect(html).toMatch(/hreflang="en"/i);
    expect(html).toContain(">EN<");
  });

  it("links an English page back to Chinese", () => {
    const html = render("/en/services", true);
    expect(html).toContain('href="/services"');
    expect(html).toMatch(/hreflang="zh-Hant"/i);
    expect(html).toContain(">中文<");
  });

  it("links the resources page to its English twin", () => {
    expect(render("/resources", true)).toContain('href="/en/resources"');
  });

  it("links the subsidies page to its English twin", () => {
    expect(render("/resources/subsidies", true)).toContain('href="/en/resources/subsidies"');
  });

  it("falls back to /en when the page has no English yet", () => {
    expect(render("/insights", true)).toContain('href="/en"');
  });
});
