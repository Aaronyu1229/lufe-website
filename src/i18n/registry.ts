import { SERVICES_PAGE_SOURCE_FINGERPRINT, servicesPageEn } from "./en/services-page";
import { NAVBAR_CRITICAL_SOURCE_FINGERPRINT, navbarCriticalEn } from "./en/navbar-critical";
import { NAVBAR_MENU_SOURCE_FINGERPRINT, navbarMenuEn } from "./en/navbar-menu";
import { FOOTER_SOURCE_FINGERPRINT, footerEn } from "./en/footer";
import { servicesPageZh } from "./zh/services-page";
import { navbarCriticalZh } from "./zh/navbar-critical";
import { navbarMenuZh } from "./zh/navbar-menu";
import { footerZh } from "./zh/footer";

export const I18N_MODULES = [
  { name: "services-page", zh: servicesPageZh, en: servicesPageEn, sourceFingerprint: SERVICES_PAGE_SOURCE_FINGERPRINT, enFile: "src/i18n/en/services-page.ts" },
  { name: "navbar-critical", zh: navbarCriticalZh, en: navbarCriticalEn, sourceFingerprint: NAVBAR_CRITICAL_SOURCE_FINGERPRINT, enFile: "src/i18n/en/navbar-critical.ts" },
  { name: "navbar-menu", zh: navbarMenuZh, en: navbarMenuEn, sourceFingerprint: NAVBAR_MENU_SOURCE_FINGERPRINT, enFile: "src/i18n/en/navbar-menu.ts" },
  { name: "footer", zh: footerZh, en: footerEn, sourceFingerprint: FOOTER_SOURCE_FINGERPRINT, enFile: "src/i18n/en/footer.ts" },
] as const;
