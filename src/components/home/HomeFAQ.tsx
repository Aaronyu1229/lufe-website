import { FaqSection } from "@/components/faq/FaqSection";
import { HOME_FAQ_ITEMS } from "@/data/homeFaq";

export { HOME_FAQ_ITEMS } from "@/data/homeFaq";

export function HomeFAQ() {
  return <FaqSection title="你可能想先問的三件事" items={HOME_FAQ_ITEMS} idPrefix="home-faq" />;
}
