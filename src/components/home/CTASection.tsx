"use client";

import Link from "next/link";

import { useMessageBox } from "../MessageBox";
import { homeCtaEn } from "@/i18n/en/home-cta";
import { localizedHref, type Locale } from "@/i18n/locale";
import { homeCtaZh } from "@/i18n/zh/home-cta";

/**
 * CTASection — final conversion block.
 * Primary: opens MessageBox; secondary text link goes to /assess.
 */

export function CTASection({ locale = "zh" }: { readonly locale?: Locale }) {
  const copy = locale === "en" ? homeCtaEn : homeCtaZh;
  const { open } = useMessageBox();

  return (
    <section className="bg-navy py-[80px]">
      <div className="lufe-container text-center">
        <h2 className="mb-[18px] font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-white [text-wrap:balance]">
          {copy.heading[0]}
          <br />
          {copy.heading[1]}
        </h2>
        <p className="mx-auto mb-8 max-w-[560px] text-[17px] font-normal leading-[1.7] text-white/70">
          {copy.line}
        </p>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={open}
            className="bg-gold text-navy px-[26px] py-[14px] text-[16px] font-semibold cursor-pointer"
          >
            {copy.primary}
          </button>
          <Link href={localizedHref(locale, "/assess")} className="text-[15px] font-semibold text-white/80 underline-offset-4 hover:underline">
            {copy.secondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
