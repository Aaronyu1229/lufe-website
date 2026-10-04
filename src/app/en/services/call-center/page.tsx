import type { Metadata } from "next";

import { ChapterPage } from "@/components/services/ChapterPage";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { CHAPTERS_EN } from "@/i18n/en/chapters";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/services/call-center",
  locale: "en",
  title: "Call Center | A professional English-speaking customer-service team",
  description: "Expected to begin in Q1 2027: let a professional English-speaking team handle customer-service messages for your overseas market.",
});

export default function EnglishCallCenterPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: "/en" }, { name: "Services", path: "/en/services" }, { name: CHAPTERS_EN.after.label, path: "/en/services/call-center" }]} />
    <FaqJsonLd items={CHAPTERS_EN.after.faqs} />
    <ChapterPage chapter={CHAPTERS_EN.after} locale="en" />
  </>;
}
