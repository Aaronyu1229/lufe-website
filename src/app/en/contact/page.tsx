import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/ContactPage";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/contact",
  locale: "en",
  title: "Contact LUFÉ",
  description: "For expansion planning, partnership discussions, or media inquiries, leave a message. We reply within one business day.",
});

export default function EnglishContactPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: "/en" }, { name: "Contact LUFÉ", path: "/en/contact" }]} />
    <ContactPage locale="en" />
  </>;
}
