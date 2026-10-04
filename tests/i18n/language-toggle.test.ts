import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LanguageToggle } from "@/components/i18n/LanguageToggle";
import { getPublishedEnglishArticles } from "@/lib/articles/english";

const render = (pathname: string, visible?: boolean) =>
  renderToStaticMarkup(createElement(LanguageToggle, { pathname, visible }));

describe("LanguageToggle", () => {
  it("renders by default when English is public", () => {
    expect(render("/services")).toContain('href="/en/services"');
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

  it("links insights to its English route", () => {
    expect(render("/insights", true)).toContain('href="/en/insights"');
  });

  it("links article pages to their reciprocal routes", () => {
    const article = getPublishedEnglishArticles()[0]!;

    expect(render(`/insights/${article.slug}`)).toContain(`href="/en/insights/${article.slug}"`);
    expect(render(`/en/insights/${article.slug}`)).toContain(`href="/insights/${article.slug}"`);
  });

  it("falls back to English insights for an article without English data", () => {
    const missingSlug = `missing-english-article-${getPublishedEnglishArticles().length}`;

    expect(render(`/insights/${missingSlug}`)).toContain('href="/en/insights"');
  });
});
