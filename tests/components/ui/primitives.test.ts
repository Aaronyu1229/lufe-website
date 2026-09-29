import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Carousel } from "@/components/ui/Carousel";
import { ChoiceGroup } from "@/components/ui/ChoiceGroup";
import { Disclosure } from "@/components/ui/Disclosure";
import { ExpandCard } from "@/components/ui/ExpandCard";
import { Segmented } from "@/components/ui/Segmented";
import { carouselGeometry, flipDelta, nearestSnap, segmentedPill } from "@/components/ui/geometry";

describe("ui geometry", () => {
  it("calculates carousel bounds, card-edge snaps, and nearest releases", () => {
    const geometry = carouselGeometry([
      { offsetLeft: 24, width: 280 },
      { offsetLeft: 320, width: 280 },
      { offsetLeft: 616, width: 280 },
    ], 24, 400);

    expect(geometry).toEqual({ minX: -520, snaps: [0, -296, -520] });
    expect(nearestSnap(geometry.snaps, -470)).toBe(-520);
  });

  it("interpolates segmented pill geometry at fractional indices", () => {
    expect(segmentedPill([{ left: 4, width: 80 }, { left: 100, width: 120 }], 0.5)).toEqual({ left: 52, width: 100 });
  });

  it("returns a FLIP translation from old to new layout rectangles", () => {
    expect(flipDelta(
      { left: 20, top: 30, width: 100, height: 50 },
      { left: 65, top: 12, width: 100, height: 50 },
    )).toEqual({ x: -45, y: 18 });
  });
});

describe("ui SSR contracts", () => {
  it("keeps closed disclosure content in static markup", () => {
    const markup = renderToStaticMarkup(createElement(Disclosure, { summary: "Question", id: "answer" } as import("@/components/ui/Disclosure").DisclosureProps, "SSR answer"));

    expect(markup).toContain("SSR answer");
    expect(markup).toContain('aria-expanded="false"');
  });

  it("keeps expand card and panel content in static markup", () => {
    const markup = renderToStaticMarkup(createElement(ExpandCard, {
      card: "Card content",
      panel: "Panel content",
      title: "Panel title",
    }));

    expect(markup).toContain("Card content");
    expect(markup).toContain("Panel content");
  });

  it("renders every carousel child in static markup", () => {
    const markup = renderToStaticMarkup(createElement(Carousel, {
      label: "Cards",
      showControls: false,
    } as import("@/components/ui/Carousel").CarouselProps, [
      createElement("article", { key: "one" }, "First card"),
      createElement("article", { key: "two" }, "Second card"),
    ]));

    expect(markup).toContain("First card");
    expect(markup).toContain("Second card");
  });

  it("marks selected segmented and choice options", () => {
    const options = [{ value: "one", label: "One" }, { value: "two", label: "Two" }];
    const segmented = renderToStaticMarkup(createElement(Segmented, {
      options,
      value: "two",
      onChange: () => undefined,
      label: "Segments",
    }));
    const choices = renderToStaticMarkup(createElement(ChoiceGroup, {
      options,
      value: "one",
      onChange: () => undefined,
      label: "Choices",
    }));

    expect(segmented).toContain('aria-checked="true"');
    expect(choices).toContain('aria-pressed="true"');
  });
});
