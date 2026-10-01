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
          想清楚了，就聊聊
          <br />
          還沒想清楚，也可以聊聊
        </h2>
        <p className="text-[17px] text-white/55 max-w-[520px] mx-auto leading-[1.7] mb-9 font-normal">
          我們想找的，是想把事業做大、也願意先走一小步的人。送出後 24 小時內由 Aaron 本人回覆，第一次談就把費用跟時間講清楚。
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
