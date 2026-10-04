import type { Metadata } from "next";

import { ChapterPage } from "@/components/services/ChapterPage";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { CHAPTERS_EN } from "@/i18n/en/chapters";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/services/north-america",
  locale: "en",
  title: "North America Retail | Put Taiwanese products on North American shelves",
  description: "The North America team handles local product selection, evaluations, exhibitions, and negotiation. LUFÉ is your point of contact in Taiwan.",
});

export default function EnglishNorthAmericaPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: "/en" }, { name: "Services", path: "/en/services" }, { name: CHAPTERS_EN.na.label, path: "/en/services/north-america" }]} />
    <FaqJsonLd items={CHAPTERS_EN.na.faqs} />
    <ChapterPage chapter={CHAPTERS_EN.na} locale="en" />
  </>;
}
