import { existsSync } from "node:fs";
import path from "node:path";

import { AboutPage } from "@/components/about/AboutPage";
import { ABOUT_PHOTO_SLOTS, type AboutPhotoSources } from "@/data/aboutPhotoSlots";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/about",
  title: "關於鹿飛 · 躍馬 43 年之後，再往前走一步",
  description: "躍馬做國際貨運承攬 43 年，我們看見客戶的貨送到了，問題卻留在抵達之後。鹿飛從那裡開始：市場探查、寄賣、公司落地、海外客服，陪台灣品牌走完在菲律賓的第一年。",
});

/** Slots whose photo file has been added under public/images/about/. */
function availablePhotoSources(): AboutPhotoSources {
  return Object.fromEntries(
    Object.values(ABOUT_PHOTO_SLOTS)
      .filter((slot) => existsSync(path.join(process.cwd(), "public/images/about", slot.file)))
      .map((slot) => [slot.slotId, `/images/about/${slot.file}`]),
  );
}

export default function About() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "關於我們", path: "/about" }]} />
    <AboutPage photoSources={availablePhotoSources()} />
  </>;
}
