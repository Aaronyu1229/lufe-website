import type { Metadata } from "next";

import { SubsidiesPage } from "@/components/subsidy/SubsidiesPage";
import { subsidiesPageEn } from "@/i18n/en/subsidies-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/resources/subsidies",
  locale: "en",
  title: subsidiesPageEn.metadata.title,
  description: subsidiesPageEn.metadata.description,
});

export default function EnglishSubsidiesPage() {
  return <SubsidiesPage locale="en" />;
}
