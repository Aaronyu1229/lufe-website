import { CasesPage } from "@/components/cases/CasesPage";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/cases",
  title: "案例 · 菲律賓與北美通路",
  description: "三種出海走法、三個案例：台灣羊奶皂配方不動、改說法與標示走進北美量販通路、台灣魚鬆先過 FDA 再談美國上市、一個手搖飲品牌在菲律賓從零做到十幾家。每個案例都寫到當時最關鍵的決定。",
});

export default function Cases() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "案例", path: "/cases" }]} />
    <CasesPage />
  </>;
}
