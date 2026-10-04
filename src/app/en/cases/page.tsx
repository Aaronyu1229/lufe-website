import type { Metadata } from "next";

import { CasesPage } from "@/components/cases/CasesPage";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/cases",
  locale: "en",
  title: "Cases · Philippines and North America Retail",
  description: "Three paths overseas and three cases: a Taiwanese goat-milk soap entering North American mass retail, a Taiwanese fish-floss brand preparing for U.S. entry, and a bubble-tea brand growing from zero to more than ten locations in the Philippines.",
});

export default function EnglishCasesPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: "/en" }, { name: "Cases", path: "/en/cases" }]} />
    <CasesPage locale="en" />
  </>;
}
