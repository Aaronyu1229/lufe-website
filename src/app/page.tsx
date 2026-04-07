import { HeroSection } from "@/components/home/HeroSection";
import { StagesSection } from "@/components/home/StagesSection";
import { CasesSection } from "@/components/home/CasesSection";
import { WhySection } from "@/components/home/WhySection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StagesSection />
      <CasesSection />
      <WhySection />
      <CTASection />
    </>
  );
}
