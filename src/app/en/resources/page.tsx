import type { Metadata } from "next";

import { ResourcesPage } from "@/components/resources/ResourcesPage";
import { resourcesPageEn } from "@/i18n/en/resources-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/resources",
  locale: "en",
  title: resourcesPageEn.metadata.title,
  description: resourcesPageEn.metadata.description,
});

export default function EnglishResourcesPage() {
  return <ResourcesPage locale="en" />;
}
