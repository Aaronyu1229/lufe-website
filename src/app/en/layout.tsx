import type { Metadata } from "next";

import { HtmlLang } from "@/components/i18n/HtmlLang";
import { EN_PUBLIC } from "@/i18n/config";
import { EN_SITE_DESCRIPTION, EN_SITE_TITLE } from "@/lib/english-site";

export const metadata: Metadata = {
  title: { absolute: EN_SITE_TITLE, template: "%s | LUFÉ" },
  description: EN_SITE_DESCRIPTION,
  keywords: "Philippines market entry, Taiwanese brands, importers in the Philippines, consignment, company registration Philippines, FDA registration Philippines, call center outsourcing, LUFÉ",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "LUFÉ",
    title: EN_SITE_TITLE,
    description: EN_SITE_DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "LUFÉ" }],
  },
  twitter: { card: "summary_large_image", title: EN_SITE_TITLE, description: EN_SITE_DESCRIPTION, images: ["/og-image.jpg"] },
  robots: EN_PUBLIC ? { index: true, follow: true } : { index: false, follow: true },
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <><HtmlLang lang="en" />{children}</>;
}
