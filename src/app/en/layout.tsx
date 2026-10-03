import type { Metadata } from "next";

import { HtmlLang } from "@/components/i18n/HtmlLang";
import { EN_PUBLIC } from "@/i18n/config";

const EN_TITLE = "LUFÉ — Your first year in the Philippines, after the freight arrives";
const EN_DESCRIPTION = "Freight gets your goods there; the work starts after. LUFÉ walks Taiwanese brands through their first year in the Philippines: Market Test, Consignment, Company Setup and Call Center — four services, each with its own price. Start with NT$10,000–20,000 to see how the market responds. Our founder comes from Jumping Freight, backed by 43 years of international logistics.";

export const metadata: Metadata = {
  title: { default: EN_TITLE, template: "%s | LUFÉ" },
  description: EN_DESCRIPTION,
  keywords: "Philippines market entry, Taiwanese brands, importers in the Philippines, consignment, company registration Philippines, FDA registration Philippines, call center outsourcing, LUFÉ",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "LUFÉ",
    title: EN_TITLE,
    description: EN_DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "LUFÉ" }],
  },
  twitter: { card: "summary_large_image", title: EN_TITLE, description: EN_DESCRIPTION, images: ["/og-image.jpg"] },
  robots: EN_PUBLIC ? { index: true, follow: true } : { index: false, follow: true },
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <><HtmlLang lang="en" />{children}</>;
}
