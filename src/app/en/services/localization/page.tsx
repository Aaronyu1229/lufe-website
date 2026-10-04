import type { Metadata } from "next";

import { ChapterPage } from "@/components/services/ChapterPage";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { CHAPTERS_EN } from "@/i18n/en/chapters";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/services/localization",
  locale: "en",
  title: "Company Setup | Start wanting your own people on the ground",
  description: "Connect company registration, hiring, certification, premises, and day-to-day operations through one point of contact.",
});

export default function EnglishLocalizationPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: "/en" }, { name: "Services", path: "/en/services" }, { name: CHAPTERS_EN.m9.label, path: "/en/services/localization" }]} />
    <FaqJsonLd items={CHAPTERS_EN.m9.faqs} />
    <ChapterPage chapter={CHAPTERS_EN.m9} locale="en" />
  </>;
}
