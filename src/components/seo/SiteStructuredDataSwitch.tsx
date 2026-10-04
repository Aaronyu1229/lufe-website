"use client";

import { usePathname } from "next/navigation";

import { localeFromPathname } from "@/i18n/locale";

import { SiteStructuredData } from "./StructuredData";

export function SiteStructuredDataSwitch() {
  return <SiteStructuredData locale={localeFromPathname(usePathname())} />;
}
