import { SERVICES_PAGE_SOURCE_FINGERPRINT, servicesPageEn } from "./en/services-page";
import { NAVBAR_CRITICAL_SOURCE_FINGERPRINT, navbarCriticalEn } from "./en/navbar-critical";
import { NAVBAR_MENU_SOURCE_FINGERPRINT, navbarMenuEn } from "./en/navbar-menu";
import { servicesPageZh } from "./zh/services-page";
import { navbarCriticalZh } from "./zh/navbar-critical";
import { navbarMenuZh } from "./zh/navbar-menu";

export const I18N_MODULES = [
  { name: "services-page", zh: servicesPageZh, en: servicesPageEn, sourceFingerprint: SERVICES_PAGE_SOURCE_FINGERPRINT, enFile: "src/i18n/en/services-page.ts" },
  { name: "navbar-critical", zh: navbarCriticalZh, en: navbarCriticalEn, sourceFingerprint: NAVBAR_CRITICAL_SOURCE_FINGERPRINT, enFile: "src/i18n/en/navbar-critical.ts" },
  { name: "navbar-menu", zh: navbarMenuZh, en: navbarMenuEn, sourceFingerprint: NAVBAR_MENU_SOURCE_FINGERPRINT, enFile: "src/i18n/en/navbar-menu.ts" },
] as const;
