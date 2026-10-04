import type { Metadata } from "next";

import { AaronAuthorPage } from "@/components/about/AaronAuthorPage";
import { BreadcrumbJsonLd, ProfilePageJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

const TITLE = "Aaron Yu · Founder’s Column";
const DESCRIPTION = "The founder’s column from LUFÉ. The founder comes from Jumping Freight and writes about where Taiwanese brands get stuck in their first year in the Philippines: Market Test, Consignment, Company Setup, and North America Retail.";

export const metadata: Metadata = {
  ...createPageMetadata({ path: "/about/aaron-yu", locale: "en", title: TITLE, description: DESCRIPTION }),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "LUFÉ",
    url: "/en/about/aaron-yu",
    title: `${TITLE} | LUFÉ`,
    description: DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "LUFÉ Founder’s Column" }],
  },
  twitter: { card: "summary_large_image", title: `${TITLE} | LUFÉ`, description: DESCRIPTION, images: ["/og-image.jpg"] },
};

export default function EnglishAaronYuPage() {
  return <>
    <BreadcrumbJsonLd items={[
      { name: "Home", path: "/en" },
      { name: "About LUFÉ", path: "/en/about" },
      { name: "Aaron Yu", path: "/en/about/aaron-yu" },
    ]} />
    <ProfilePageJsonLd />
    <AaronAuthorPage locale="en" />
  </>;
}
