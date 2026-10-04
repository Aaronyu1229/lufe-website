import type { Metadata } from "next";

import { MethodologyPage } from "@/components/services/MethodologyPage";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/services/methodology",
  locale: "en",
  title: "The LUFÉ Method | Small-step expansion",
  description: "Ask the Philippine market before deciding what to invest, then use a scorecard to make the next decision.",
});

export default function EnglishMethodologyPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: "/en" }, { name: "Services", path: "/en/services" }, { name: "The LUFÉ Method", path: "/en/services/methodology" }]} />
    <MethodologyPage locale="en" />
  </>;
}
