import { HeroSection } from "@/components/home/HeroSection";
import { LogoStrip } from "@/components/home/LogoStrip";
import { StagesSection } from "@/components/home/StagesSection";
import { StatsBanner } from "@/components/home/StatsBanner";
import { CasesSection } from "@/components/home/CasesSection";
import { WhySection } from "@/components/home/WhySection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoStrip />
      <StagesSection />
      <StatsBanner />
      <CasesSection />
      <WhySection />
      <CTASection />
    </>
  );
}
