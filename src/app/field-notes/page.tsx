import { FieldNotesPage } from "@/components/field-notes/FieldNotesPage";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/field-notes",
  title: "現場紀錄 · 活動、演講、媒體露出",
  description: "我們這個月在哪裡：北美和東南亞兩個主戰場的第一手紀錄。加盟展、論壇、商會、客戶現場、媒體露出。",
});

export default function FieldNotes() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "現場紀錄", path: "/field-notes" }]} />
    <FieldNotesPage />
  </>;
}
