import { AssessWizard } from "@/components/assess/AssessWizard";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/assess",
  title: "2 分鐘處境比對",
  description: "三個問題，看你的出海處境跟我們參與過的哪個案例最像，以及多半從哪一章開始。想聽具體判斷，再約 30 分鐘。",
});

export default function AssessPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "2 分鐘處境比對", path: "/assess" }]} />
    <AssessWizard />
  </>;
}
