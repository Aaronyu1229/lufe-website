import { ContactPage } from "@/components/contact/ContactPage";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/contact",
  title: "聯絡我們",
  description: "留言、預約諮詢、LINE 或 Email，選擇最方便的方式跟我們聊聊你的出海計畫。",
});

export default function Contact() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "聯絡我們", path: "/contact" }]} />
    <ContactPage />
  </>;
}
