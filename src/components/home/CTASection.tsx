"use client";

import Image from "next/image";
import Link from "next/link";
import { useMessageBox } from "../MessageBox";

/**
 * CTASection — final conversion block.
 * CTA rule (site-wide): primary "聊聊你的產品" → MessageBox,
 * secondary "先做 2 分鐘評估" → /assess. No other labels.
 */

export function CTASection() {
  const { open } = useMessageBox();

  return (
    <section className="relative bg-navy py-[60px] md:py-[80px] px-5 md:px-10 overflow-hidden">
      {/* Background executive image */}
      <Image
        src="/images/cta/cta-executive.jpg"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className="object-cover object-[70%_center] img-navy-unify opacity-50"
      />
      {/* Navy gradient from left so text stays readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40"
      />
      <div className="relative z-10 max-w-[1400px] mx-auto text-center">
        <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold/70 mb-5">
          下一步
        </div>

        <h2 className="font-sans text-[clamp(28px,3.5vw,44px)] leading-[1.15] mb-4 font-light tracking-[-0.5px] text-white">
          想清楚了，就聊聊
          <br />
          還沒想清楚，也可以聊聊
        </h2>
        <p className="text-[16.5px] text-white/55 max-w-[480px] mx-auto leading-[1.8] mb-10 font-normal">
          30 分鐘，不收費、不推銷。
          <br />
          聊完你會知道下一步該做什麼——或者該先不做什麼。
        </p>
        <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap">
          <button
            onClick={open}
            className="bg-gold text-navy px-9 py-[15px] rounded-none text-[15.5px] font-semibold tracking-[0.5px] transition-all hover:bg-gold-l cursor-pointer"
          >
            聊聊你的產品 →
          </button>
          <Link
            href="/assess"
            className="group inline-flex items-center gap-2 text-white/75 text-[15.5px] font-medium tracking-[0.3px] transition-colors duration-300 hover:text-white"
          >
            <span className="border-b border-white/30 pb-0.5 group-hover:border-white transition-colors">
              先做 2 分鐘評估
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
