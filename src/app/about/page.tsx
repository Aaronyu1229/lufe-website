import { AboutPage } from "@/components/about/AboutPage";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/about",
  title: "關於鹿飛 · 從 42 年物流底層到三支柱方法論",
  description: "鹿飛看到的問題、相信的事、正在做的事。從躍馬企業 42 年國際物流實戰底層，到協助台灣企業用三支柱方法論在北美與東南亞落地。",
});

export default function About() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "關於我們", path: "/about" }]} />
    <AboutPage />
  </>;
}
