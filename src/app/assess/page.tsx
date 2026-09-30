import { AssessWizard } from "@/components/assess/AssessWizard";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/assess",
  title: "免費出海評估",
  description: "兩分鐘找到你的出海起點。免費評估你的產品適不適合出海、該怎麼開始。",
});

export default function AssessPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "免費出海評估", path: "/assess" }]} />
    <AssessWizard />
  </>;
}
