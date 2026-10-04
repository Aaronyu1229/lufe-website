import type { Metadata } from "next";

import { ChapterPage } from "@/components/services/ChapterPage";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { CHAPTERS_EN } from "@/i18n/en/chapters";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/services/product-testing",
  locale: "en",
  title: "Market Test | Validate the market before deciding what to invest",
  description: "Bring your product to local people in the Philippines and learn how they respond before deciding what to invest.",
});

export default function EnglishProductTestingPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: "/en" }, { name: "Services", path: "/en/services" }, { name: CHAPTERS_EN.m1.label, path: "/en/services/product-testing" }]} />
    <FaqJsonLd items={CHAPTERS_EN.m1.faqs} />
    <ChapterPage chapter={CHAPTERS_EN.m1} locale="en" />
  </>;
}
