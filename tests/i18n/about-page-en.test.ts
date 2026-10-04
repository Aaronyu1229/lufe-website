import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { AboutPage, storyChapters } from "@/components/about/AboutPage";
import { FreightRateChart } from "@/components/about/FreightRateChart";
import { NetworkGlobe } from "@/components/about/NetworkGlobe";
import { StoryChapters } from "@/components/story/StoryChapters";

import { expectEnglishMarkup } from "./helpers";

describe("About page i18n", () => {
  it("keeps Chinese byte-identical", () => {
    expect(renderToStaticMarkup(createElement(AboutPage))).toBe(readFileSync("tests/fixtures/about-page.zh.html", "utf8"));
    expect(renderToStaticMarkup(createElement(StoryChapters, { chapters: storyChapters }))).toBe(readFileSync("tests/fixtures/about-story-chapters.zh.html", "utf8"));
    expect(renderToStaticMarkup(createElement(FreightRateChart))).toBe(readFileSync("tests/fixtures/freight-rate-chart.zh.html", "utf8"));
    expect(renderToStaticMarkup(createElement(NetworkGlobe))).toBe(readFileSync("tests/fixtures/network-globe.zh.html", "utf8"));
  });

  it("renders complete English", () => {
    expectEnglishMarkup(renderToStaticMarkup(createElement(AboutPage, { locale: "en" })));
  });
});
