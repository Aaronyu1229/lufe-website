import { FaqSection } from "@/components/faq/FaqSection";
import { homeFaqEn } from "@/i18n/en/home-faq";
import { type Locale } from "@/i18n/locale";
import { homeFaqZh } from "@/i18n/zh/home-faq";

export { HOME_FAQ_ITEMS } from "@/data/homeFaq";

export function HomeFAQ({ locale = "zh" }: { readonly locale?: Locale }) {
  const copy = locale === "en" ? homeFaqEn : homeFaqZh;
  return <FaqSection title={copy.title} askLabel={copy.askLabel} moreLabel={copy.moreLabel} items={copy.items} idPrefix="home-faq" />;
}
