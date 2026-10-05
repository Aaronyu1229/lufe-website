"use client";

import { useReportWebVitals } from "next/web-vitals";

type GtagEventParameters = Record<string, boolean | number | string>;

type GtagArguments =
  | [command: "js", date: Date]
  | [command: "config", measurementId: string]
  | [command: "event", eventName: string, parameters: GtagEventParameters];

declare global {
  interface Window {
    dataLayer?: GtagArguments[];
    gtag?: (...args: GtagArguments) => void;
  }
}

type ReportWebVitalsCallback = Parameters<typeof useReportWebVitals>[0];

export const reportWebVitals: ReportWebVitalsCallback = (metric) => {
  if (
    metric.name !== "CLS" &&
    metric.name !== "FCP" &&
    metric.name !== "INP" &&
    metric.name !== "LCP" &&
    metric.name !== "TTFB"
  ) {
    return;
  }

  const parameters = {
    value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.delta,
    metric_rating: metric.rating,
    page_path: window.location.pathname,
    non_interaction: true,
  };

  if (!window.gtag) {
    // Same stub as the GA snippet: gtag.js only processes Arguments objects, not arrays.
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments as unknown as GtagArguments);
    };
  }
  window.gtag("event", metric.name, parameters);
};

export function WebVitalsReporter() {
  useReportWebVitals(reportWebVitals);

  return null;
}
