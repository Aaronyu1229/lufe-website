"use client";

import Link from "next/link";

import { useMessageBox } from "@/components/MessageBox";
import { CTA_LINE, CTA_LINE_EN } from "@/data/cta";
import { localizedHref, type Locale } from "@/i18n/locale";

export function InsightCta({ locale = "zh" }: { readonly locale?: Locale }) {
  const { open } = useMessageBox();
  const copy = locale === "en"
    ? {
      heading: "Put the method from the article,",
      headingAccent: "to work for your product",
      cta: "Book 30 minutes",
      situationCheck: "2-minute Situation Check",
      line: CTA_LINE_EN,
    }
    : {
      heading: "把文章裡的方法，",
      headingAccent: "用在自己的產品上",
      cta: "預約 30 分鐘",
      situationCheck: "2 分鐘處境比對",
      line: CTA_LINE,
    };

  return (
    <section className="border-t border-bd bg-white py-[96px]">
      <div className="mx-auto max-w-[760px] px-5 text-center">
        <h2 className="font-sans text-[clamp(32px,4.4vw,52px)] font-[650] leading-[1.12] tracking-[-.022em] text-tx [text-wrap:balance]">
          {copy.heading}
          <br />
          <span className="text-gold-d">{copy.headingAccent}</span>
        </h2>
        <p className="lead mx-auto mt-5 max-w-[560px]">{copy.line}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={open} className="group cursor-pointer bg-gold px-8 py-4 text-[16px] font-semibold text-navy transition-transform duration-100 hover:bg-gold-l active:scale-[.97]">
            {copy.cta} <span aria-hidden="true" className="inline-block transition-transform duration-150 group-hover:translate-x-[3px]">→</span>
          </button>
          <Link href={localizedHref(locale, "/assess")} className="border border-navy/15 bg-white px-8 py-4 text-[16px] font-semibold text-navy transition-colors hover:border-navy/40 active:scale-[.97]">{copy.situationCheck}</Link>
        </div>
      </div>
    </section>
  );
}
