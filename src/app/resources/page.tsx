import type { Metadata } from "next";

import { ResourcesPage } from "@/components/resources/ResourcesPage";
import { resourcesPageZh } from "@/i18n/zh/resources-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/resources",
  title: resourcesPageZh.metadata.title,
  description: resourcesPageZh.metadata.description,
});

export default function ResourcesRoutePage() {
  return <ResourcesPage />;
}
