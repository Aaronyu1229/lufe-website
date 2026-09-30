import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  AboutPage,
  howWeWorkSteps,
  storyCards,
  thingsWeDontDo,
} from "@/components/about/AboutPage";

const renderStoryCopy = (copy: (typeof storyCards)[number]["copy"]) =>
  renderToStaticMarkup(createElement(Fragment, null, copy));

describe("AboutPage", () => {
  it("keeps carousel and list content in the server markup without rounded classes", () => {
    const markup = renderToStaticMarkup(createElement(AboutPage));

    for (const card of storyCards) {
      expect(markup).toContain(card.title);
      expect(markup).toContain(renderStoryCopy(card.copy));
    }

    for (const step of howWeWorkSteps) {
      expect(markup).toContain(step.title);
      expect(markup).toContain(step.desc);
    }

    for (const item of thingsWeDontDo) {
      expect(markup).toContain(item.title);
      expect(markup).toContain(item.desc);
    }

    expect(markup).toContain("鹿飛 LUFÉ 創辦人・來自躍馬企業");
    expect(markup).toContain("看了很多年貨櫃出去，決定去接貨到了之後的事。");
    expect(markup).toContain("誠實的邊界");
    expect(markup).not.toContain("不做行銷代操");

    expect(markup).not.toContain("section-heading");
    expect(markup).not.toContain("hero-title");
    expect(markup).not.toContain("rounded-");
  });
});
