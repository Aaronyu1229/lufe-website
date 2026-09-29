import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { renderStaticBoldMarkup } from "@/components/insights/ArticleDetail";

const renderMarkup = (text: string) =>
  renderToStaticMarkup(createElement(Fragment, null, renderStaticBoldMarkup(text)));

describe("renderStaticBoldMarkup", () => {
  it("renders balanced ** markers as strong elements", () => {
    const markup = renderMarkup("補助比例最高 **90%**，而且 **經費用罄即止**。");

    expect(markup).toContain('<strong class="text-tx font-semibold">90%</strong>');
    expect(markup).toContain('<strong class="text-tx font-semibold">經費用罄即止</strong>');
    expect(markup).not.toContain("**");
  });

  it("keeps an unpaired marker as text", () => {
    expect(renderMarkup("這個 **標記沒有結尾")).toBe("這個 **標記沒有結尾");
  });
});
