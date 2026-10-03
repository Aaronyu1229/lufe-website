"use client";

import { usePathname } from "next/navigation";

import { localeFromPathname } from "@/i18n/locale";

import { Footer } from "./Footer";

export function FooterSwitch() {
  return <Footer locale={localeFromPathname(usePathname())} />;
}
