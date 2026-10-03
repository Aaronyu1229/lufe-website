"use client";

import Link from "next/link";

import { useMessageBox } from "../MessageBox";

/**
 * CTASection — final conversion block.
 * Primary: "預約 30 分鐘" → MessageBox; secondary text link → /assess.
 */

const CTA_NEXT_STEPS = [
  "第一次談 30 分鐘，先聽你的產品在台灣怎麼賣、為什麼想出去。",
  "談完給你一頁：建議從哪一章開始，或建議再等等。",
  "要不要走、走幾章，由你決定。",
] as const;

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
          免費初步評估 30 分鐘。用五個問題粗跑一次你的產品，告訴你在哪一格、該不該試。不收費。
        </p>
        <div className="mx-auto mb-9 max-w-[560px] border-y border-white/15 py-5 text-left">
          <p className="mb-3 text-[13px] font-semibold text-gold">按了之後</p>
          <ol className="space-y-2 text-[15px] leading-[1.75] text-white/75">
            {CTA_NEXT_STEPS.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span aria-hidden="true" className="font-semibold text-gold">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
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
        <p className="mt-6 text-[13px] text-white/50">送出後一個工作天內回覆。</p>
      </div>
    </section>
  );
}
