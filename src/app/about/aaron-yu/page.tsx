import { AaronAuthorPage } from "@/components/about/AaronAuthorPage";
import { BreadcrumbJsonLd, ProfilePageJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/about/aaron-yu",
  title: "Aaron Yu · 鹿飛 LUFÉ 創辦人",
  description: "躍馬企業國際物流背景出身，專注研究台灣企業如何在北美與東南亞市場落地。",
});

export default function AaronYuPage() {
  return <>
    <BreadcrumbJsonLd items={[
      { name: "首頁", path: "/" },
      { name: "關於我們", path: "/about" },
      { name: "Aaron Yu", path: "/about/aaron-yu" },
    ]} />
    <ProfilePageJsonLd />
    <AaronAuthorPage />
  </>;
}
