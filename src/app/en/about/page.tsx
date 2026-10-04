import { existsSync } from "node:fs";
import path from "node:path";

import { AboutPage } from "@/components/about/AboutPage";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { ABOUT_PHOTO_SLOTS, type AboutPhotoSources } from "@/data/aboutPhotoSlots";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/about",
  locale: "en",
  title: "About LUFÉ: taking the next step after 43 years at Jumping Freight",
  description: "Jumping Freight has handled international freight forwarding for 43 years. We saw goods arrive while the problems remained after arrival. LUFÉ starts there: Market Test, Consignment, Company Setup, and Call Center for Taiwanese brands entering the Philippines.",
});

function availablePhotoSources(): AboutPhotoSources {
  return Object.fromEntries(
    Object.values(ABOUT_PHOTO_SLOTS)
      .filter((slot) => existsSync(path.join(process.cwd(), "public/images/about", slot.file)))
      .map((slot) => [slot.slotId, `/images/about/${slot.file}`]),
  );
}

export default function EnglishAboutPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: "/en" }, { name: "About LUFÉ", path: "/en/about" }]} />
    <AboutPage locale="en" photoSources={availablePhotoSources()} />
  </>;
}
