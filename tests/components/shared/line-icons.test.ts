import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  ArrowRightIcon,
  BuildingIcon,
  CalendarClockIcon,
  ClockIcon,
  CompassIcon,
  FileIcon,
  HeadsetIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  MessageIcon,
  PackageIcon,
  PenIcon,
  PlusIcon,
  ReceiptIcon,
  SlidersIcon,
  SproutIcon,
  TargetIcon,
  TrendIcon,
} from "@/components/icons/LineIcons";

const icons = [
  CompassIcon,
  TrendIcon,
  BuildingIcon,
  HeadsetIcon,
  SproutIcon,
  SlidersIcon,
  PackageIcon,
  ClockIcon,
  TargetIcon,
  PenIcon,
  FileIcon,
  ReceiptIcon,
  MailIcon,
  MapPinIcon,
  CalendarClockIcon,
  MessageIcon,
  LinkedInIcon,
  ArrowRightIcon,
  PlusIcon,
];

describe("LineIcons", () => {
  it("renders each named icon as an aria-hidden SVG", () => {
    for (const Icon of icons) {
      const markup = renderToStaticMarkup(createElement(Icon));

      expect(markup).toContain("<svg");
      expect(markup).toContain('aria-hidden="true"');
    }
  });
});
