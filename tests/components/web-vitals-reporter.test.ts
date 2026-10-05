import { afterEach, describe, expect, it, vi } from "vitest";

import { reportWebVitals } from "@/components/WebVitalsReporter";

const metric = (name: "CLS" | "FCP" | "LCP") => ({
  id: `${name}-id`,
  name,
  value: name === "CLS" ? 0.1236 : 123.6,
  delta: name === "CLS" ? 0.05 : 12.4,
  rating: "good" as const,
  entries: [],
  navigationType: "navigate" as const,
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("reportWebVitals", () => {
  it.each([
    ["CLS", 124],
    ["LCP", 124],
  ] as const)("sends %s to gtag with its rounded value", (name, value) => {
    const gtag = vi.fn();
    vi.stubGlobal("window", {
      gtag,
      location: { pathname: "/en/about" },
    });

    reportWebVitals(metric(name));

    expect(gtag).toHaveBeenCalledOnce();
    expect(gtag).toHaveBeenCalledWith("event", name, {
      value,
      metric_id: `${name}-id`,
      metric_value: name === "CLS" ? 0.1236 : 123.6,
      metric_delta: name === "CLS" ? 0.05 : 12.4,
      metric_rating: "good",
      page_path: "/en/about",
      non_interaction: true,
    });
  });

  it("queues an event when the GA stub has not loaded", () => {
    vi.stubGlobal("window", { location: { pathname: "/" } });

    reportWebVitals(metric("FCP"));

    // gtag.js only reads Arguments objects from dataLayer, never plain arrays.
    const queued = window.dataLayer?.[0];
    expect(Object.prototype.toString.call(queued)).toBe("[object Arguments]");
    expect(Array.from(queued as unknown as ArrayLike<unknown>)).toEqual([
      "event",
      "FCP",
      {
        value: 124,
        metric_id: "FCP-id",
        metric_value: 123.6,
        metric_delta: 12.4,
        metric_rating: "good",
        page_path: "/",
        non_interaction: true,
      },
    ]);
  });
});
