import { HeroSection } from "@/components/home/HeroSection";
import { PositioningBand } from "@/components/home/PositioningBand";
import { SubsidyAlertBand } from "@/components/home/SubsidyAlertBand";
import { CasesSection } from "@/components/home/CasesSection";
import { WhySection } from "@/components/home/WhySection";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { CTASection } from "@/components/home/CTASection";

// Self-referencing canonical. The root layout no longer sets a global one —
// it made every page claim the homepage as its canonical. Each page owns its
// own from here on; the remaining pages are handled in a follow-up.
export const metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

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
