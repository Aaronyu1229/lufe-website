import { HeroSection } from "@/components/home/HeroSection";
import { PositioningBand } from "@/components/home/PositioningBand";
import { SubsidyAlertBand } from "@/components/home/SubsidyAlertBand";
import { CasesSection } from "@/components/home/CasesSection";
import { WhySection } from "@/components/home/WhySection";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PositioningBand />
      <SubsidyAlertBand />
      <CasesSection />
      <WhySection />
      <HomeFAQ />
      <CTASection />
    </>
  );
}
