import { CTASection } from "@/components/home/CTASection";
import { CasesSection } from "@/components/home/CasesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { JumpingSection } from "@/components/home/JumpingSection";
import { OpeningSection } from "@/components/home/OpeningSection";
import { ChaptersSection } from "@/components/home/PositioningBand";
import { OneContractSection } from "@/components/home/WhySection";
import { FaqJsonLd } from "@/components/seo/StructuredData";
import { HOME_FAQ_ITEMS_EN } from "@/i18n/en/home-faq";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ path: "/", locale: "en" });

export default function EnglishHome() {
  return <>
    <FaqJsonLd items={HOME_FAQ_ITEMS_EN.map(({ question, answer }) => ({ question, answer }))} />
    <HeroSection locale="en" />
    <OpeningSection locale="en" />
    <JumpingSection locale="en" />
    <ChaptersSection locale="en" />
    <CasesSection locale="en" />
    <OneContractSection locale="en" />
    <HomeFAQ locale="en" />
    <CTASection locale="en" />
  </>;
}
