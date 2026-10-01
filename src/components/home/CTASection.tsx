"use client";

import { useMessageBox } from "../MessageBox";

/**
 * CTASection — final conversion block.
 * CTA rule (site-wide): primary "聊聊你的產品" → MessageBox,
 * secondary "先做 2 分鐘處境比對" → /assess. No other labels.
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
        <p className="mx-auto mb-9 max-w-[520px] text-[17px] font-normal leading-[1.7] text-white/70">
          提交需求後，24 小時內由鹿飛顧問團隊回覆；首次諮詢即說明費用與時程
        </p>
        <div className="flex justify-center items-center gap-3 flex-wrap">
          <button
            onClick={open}
            className="bg-gold text-navy px-[26px] py-[14px] text-[16px] font-semibold cursor-pointer"
          >
            聊聊你的產品 →
          </button>
        </div>
      </div>
    </section>
  );
}
