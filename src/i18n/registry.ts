import { SERVICES_PAGE_SOURCE_FINGERPRINT, servicesPageEn } from "./en/services-page";
import { NAVBAR_CRITICAL_SOURCE_FINGERPRINT, navbarCriticalEn } from "./en/navbar-critical";
import { NAVBAR_MENU_SOURCE_FINGERPRINT, navbarMenuEn } from "./en/navbar-menu";
import { FOOTER_SOURCE_FINGERPRINT, footerEn } from "./en/footer";
import { HOME_HERO_SOURCE_FINGERPRINT, homeHeroEn } from "./en/home-hero";
import { HOME_OPENING_SOURCE_FINGERPRINT, homeOpeningEn } from "./en/home-opening";
import { HOME_JUMPING_SOURCE_FINGERPRINT, homeJumpingEn } from "./en/home-jumping";
import { HOME_CHAPTERS_SOURCE_FINGERPRINT, homeChaptersEn } from "./en/home-chapters";
import { HOME_CASES_SOURCE_FINGERPRINT, homeCasesEn } from "./en/home-cases";
import { HOME_WHY_SOURCE_FINGERPRINT, homeWhyEn } from "./en/home-why";
import { HOME_FAQ_SOURCE_FINGERPRINT, homeFaqEn } from "./en/home-faq";
import { HOME_CTA_SOURCE_FINGERPRINT, homeCtaEn } from "./en/home-cta";
import { servicesPageZh } from "./zh/services-page";
import { navbarCriticalZh } from "./zh/navbar-critical";
import { navbarMenuZh } from "./zh/navbar-menu";
import { footerZh } from "./zh/footer";
import { homeHeroZh } from "./zh/home-hero";
import { homeOpeningZh } from "./zh/home-opening";
import { homeJumpingZh } from "./zh/home-jumping";
import { homeChaptersZh } from "./zh/home-chapters";
import { homeCasesZh } from "./zh/home-cases";
import { homeWhyZh } from "./zh/home-why";
import { homeFaqZh } from "./zh/home-faq";
import { homeCtaZh } from "./zh/home-cta";

export const I18N_MODULES = [
  { name: "services-page", zh: servicesPageZh, en: servicesPageEn, sourceFingerprint: SERVICES_PAGE_SOURCE_FINGERPRINT, enFile: "src/i18n/en/services-page.ts" },
  { name: "navbar-critical", zh: navbarCriticalZh, en: navbarCriticalEn, sourceFingerprint: NAVBAR_CRITICAL_SOURCE_FINGERPRINT, enFile: "src/i18n/en/navbar-critical.ts" },
  { name: "navbar-menu", zh: navbarMenuZh, en: navbarMenuEn, sourceFingerprint: NAVBAR_MENU_SOURCE_FINGERPRINT, enFile: "src/i18n/en/navbar-menu.ts" },
  { name: "footer", zh: footerZh, en: footerEn, sourceFingerprint: FOOTER_SOURCE_FINGERPRINT, enFile: "src/i18n/en/footer.ts" },
  { name: "home-hero", zh: homeHeroZh, en: homeHeroEn, sourceFingerprint: HOME_HERO_SOURCE_FINGERPRINT, enFile: "src/i18n/en/home-hero.ts" },
  { name: "home-opening", zh: homeOpeningZh, en: homeOpeningEn, sourceFingerprint: HOME_OPENING_SOURCE_FINGERPRINT, enFile: "src/i18n/en/home-opening.ts" },
  { name: "home-jumping", zh: homeJumpingZh, en: homeJumpingEn, sourceFingerprint: HOME_JUMPING_SOURCE_FINGERPRINT, enFile: "src/i18n/en/home-jumping.ts" },
  { name: "home-chapters", zh: homeChaptersZh, en: homeChaptersEn, sourceFingerprint: HOME_CHAPTERS_SOURCE_FINGERPRINT, enFile: "src/i18n/en/home-chapters.ts" },
  { name: "home-cases", zh: homeCasesZh, en: homeCasesEn, sourceFingerprint: HOME_CASES_SOURCE_FINGERPRINT, enFile: "src/i18n/en/home-cases.ts" },
  { name: "home-why", zh: homeWhyZh, en: homeWhyEn, sourceFingerprint: HOME_WHY_SOURCE_FINGERPRINT, enFile: "src/i18n/en/home-why.ts" },
  { name: "home-faq", zh: homeFaqZh, en: homeFaqEn, sourceFingerprint: HOME_FAQ_SOURCE_FINGERPRINT, enFile: "src/i18n/en/home-faq.ts" },
  { name: "home-cta", zh: homeCtaZh, en: homeCtaEn, sourceFingerprint: HOME_CTA_SOURCE_FINGERPRINT, enFile: "src/i18n/en/home-cta.ts" },
] as const;
