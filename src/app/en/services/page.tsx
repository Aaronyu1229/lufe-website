import type { Metadata } from "next";

import { ServicesPage } from "@/components/services/ServicesPage";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { servicesPageEn } from "@/i18n/en/services-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/services",
  locale: "en",
  title: "Services | A brand's first year in Manila",
  description: "Market Test, Consignment, Company Setup, Call Center — four things the same company meets in different months, made into four services.",
});

export default function EnglishServices() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: "/en" }, { name: "Services", path: "/en/services" }]} />
    <FaqJsonLd items={servicesPageEn.faqs.map(({ q, a }) => ({ question: q, answer: a }))} />
    <ServicesPage locale="en" />
  </>;
}
