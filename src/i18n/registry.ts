import { SERVICES_PAGE_SOURCE_FINGERPRINT, servicesPageEn } from "./en/services-page";
import { NAVBAR_CRITICAL_SOURCE_FINGERPRINT, navbarCriticalEn } from "./en/navbar-critical";
import { NAVBAR_MENU_SOURCE_FINGERPRINT, navbarMenuEn } from "./en/navbar-menu";
import { FOOTER_SOURCE_FINGERPRINT, footerEn } from "./en/footer";
import { HOME_HERO_SOURCE_FINGERPRINT, homeHeroEn } from "./en/home-hero";
import { HOME_OPENING_SOURCE_FINGERPRINT, homeOpeningEn } from "./en/home-opening";
import { HOME_JUMPING_SOURCE_FINGERPRINT, homeJumpingEn } from "./en/home-jumping";
import { HOME_CHAPTERS_SOURCE_FINGERPRINT, homeChaptersEn } from "./en/home-chapters";
import { servicesPageZh } from "./zh/services-page";
import { navbarCriticalZh } from "./zh/navbar-critical";
import { navbarMenuZh } from "./zh/navbar-menu";
import { footerZh } from "./zh/footer";
import { homeHeroZh } from "./zh/home-hero";
import { homeOpeningZh } from "./zh/home-opening";
import { homeJumpingZh } from "./zh/home-jumping";
import { homeChaptersZh } from "./zh/home-chapters";

export const I18N_MODULES = [
  { name: "services-page", zh: servicesPageZh, en: servicesPageEn, sourceFingerprint: SERVICES_PAGE_SOURCE_FINGERPRINT, enFile: "src/i18n/en/services-page.ts" },
  { name: "navbar-critical", zh: navbarCriticalZh, en: navbarCriticalEn, sourceFingerprint: NAVBAR_CRITICAL_SOURCE_FINGERPRINT, enFile: "src/i18n/en/navbar-critical.ts" },
  { name: "navbar-menu", zh: navbarMenuZh, en: navbarMenuEn, sourceFingerprint: NAVBAR_MENU_SOURCE_FINGERPRINT, enFile: "src/i18n/en/navbar-menu.ts" },
  { name: "footer", zh: footerZh, en: footerEn, sourceFingerprint: FOOTER_SOURCE_FINGERPRINT, enFile: "src/i18n/en/footer.ts" },
  { name: "home-hero", zh: homeHeroZh, en: homeHeroEn, sourceFingerprint: HOME_HERO_SOURCE_FINGERPRINT, enFile: "src/i18n/en/home-hero.ts" },
  { name: "home-opening", zh: homeOpeningZh, en: homeOpeningEn, sourceFingerprint: HOME_OPENING_SOURCE_FINGERPRINT, enFile: "src/i18n/en/home-opening.ts" },
  { name: "home-jumping", zh: homeJumpingZh, en: homeJumpingEn, sourceFingerprint: HOME_JUMPING_SOURCE_FINGERPRINT, enFile: "src/i18n/en/home-jumping.ts" },
  { name: "home-chapters", zh: homeChaptersZh, en: homeChaptersEn, sourceFingerprint: HOME_CHAPTERS_SOURCE_FINGERPRINT, enFile: "src/i18n/en/home-chapters.ts" },
] as const;
