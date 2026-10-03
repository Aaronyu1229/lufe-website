import type { Metadata } from "next";

import { AaronAuthorPage } from "@/components/about/AaronAuthorPage";
import { BreadcrumbJsonLd, ProfilePageJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";
import { SITE_LOCALE, SITE_NAME } from "@/lib/site";

const TITLE = "Aaron Yu · 創辦人專欄";
const DESCRIPTION = "鹿飛 LUFÉ 創辦人專欄。創辦人來自躍馬企業，寫台灣品牌進菲律賓第一年會卡住的事：市場探查、通路與證、落地與團隊，以及北美通路。";

export const metadata: Metadata = {
  ...createPageMetadata({ path: "/about/aaron-yu", title: TITLE, description: DESCRIPTION }),
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    url: "/about/aaron-yu",
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "鹿飛 LUFÉ 創辦人專欄" }],
  },
  twitter: { card: "summary_large_image", title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION, images: ["/og-image.jpg"] },
};

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
