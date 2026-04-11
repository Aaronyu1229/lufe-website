import { HeroSection } from "@/components/home/HeroSection";
import { PositioningBand } from "@/components/home/PositioningBand";
import { LogoStrip } from "@/components/home/LogoStrip";
import { CasesSection } from "@/components/home/CasesSection";
import { WhySection } from "@/components/home/WhySection";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PositioningBand />
      <LogoStrip />
      <CasesSection />
      <WhySection />
      <HomeFAQ />
      <CTASection />
    </>
  );
}
