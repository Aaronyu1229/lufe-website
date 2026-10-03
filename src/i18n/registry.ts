import { SERVICES_PAGE_SOURCE_FINGERPRINT, servicesPageEn } from "./en/services-page";
import { servicesPageZh } from "./zh/services-page";

export const I18N_MODULES = [
  { name: "services-page", zh: servicesPageZh, en: servicesPageEn, sourceFingerprint: SERVICES_PAGE_SOURCE_FINGERPRINT, enFile: "src/i18n/en/services-page.ts" },
] as const;
