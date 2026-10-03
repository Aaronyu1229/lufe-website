"use client";

import Link from "next/link";

import { useMessageBox } from "../MessageBox";
import { CTA_LINE } from "@/data/cta";

/**
 * CTASection — final conversion block.
 * Primary: "預約 30 分鐘" → MessageBox; secondary text link → /assess.
 */

export function CTASection() {
  const { open } = useMessageBox();

  return (
    <section className="bg-navy py-[80px]">
      <div className="lufe-container text-center">
        <h2 className="mb-[18px] font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-white [text-wrap:balance]">
          從一次評估開始，
          <br />
          看清楚出海的下一步
        </h2>
        <p className="mx-auto mb-8 max-w-[560px] text-[17px] font-normal leading-[1.7] text-white/70">
          {CTA_LINE}
        </p>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={open}
            className="bg-gold text-navy px-[26px] py-[14px] text-[16px] font-semibold cursor-pointer"
          >
            預約 30 分鐘 →
          </button>
          <Link href="/assess" className="text-[15px] font-semibold text-white/80 underline-offset-4 hover:underline">
            還不確定？先做 2 分鐘處境比對 →
          </Link>
        </div>
      </div>
    </section>
  );
}
