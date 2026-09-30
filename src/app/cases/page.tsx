import { CasesPage } from "@/components/cases/CasesPage";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/cases",
  title: "案例 · 北美與東南亞實戰",
  description: "兩個主戰場，四個真實案例：從台灣保健品進北美 Costco、電子廠關稅轉移，到珍奶品牌落地菲律賓。每個案例都能翻到最後一個決策。",
});

export default function Cases() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "案例", path: "/cases" }]} />
    <CasesPage />
  </>;
}
