import Link from "next/link";
import { getSubsidyBySlug } from "@/data/subsidies";

/**
 * SubsidyAlertBand — 限期政府加碼 news flash
 *
 * 為什麼存在：
 *   115 年度海外參展補助從每展 4-5 萬加碼到 16 萬，時間敏感（4-5 月申請 · 經費用罄即止）。
 *   這是「新聞事件」不是「常設資訊」，所以用編輯感、有 timestamp、有 urgency 的視覺處理，
 *   不是 marketing banner。
 *
 * 設計原則：
 *   - 不做動畫輪播、不做彈跳 CTA
 *   - 視覺上像一則編輯精選的快訊
 *   - 主 CTA 導向 /resources/subsidies#overseas-exhibition 讓使用者直接看細節
 *   - Secondary CTA links to /assess for a 2-minute situation comparison.
 *
 * The band never claims a live application window; it shows the data's verifiedOn date instead.
 * Update src/data/subsidies.ts when the programme changes.
 */
export function SubsidyAlertBand() {
  const { verifiedOn } = getSubsidyBySlug("overseas-exhibition")!;

  return (
    <section
      aria-label="限期政府補助加碼"
      className="bg-cream pb-[80px] md:pb-[104px]"
    >
      <div className="lufe-container">
        <div className="bg-navy px-7 py-9 text-white shadow-[0_30px_60px_-20px_rgba(16,27,48,0.35)] md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:px-14 md:py-11">
          <div className="min-w-0">
          <span className="inline-flex bg-gold/15 px-3 py-[5px] text-[12px] font-semibold tracking-[0.04em] text-gold">
            115 年度加碼
          </span>
          <h2 className="mt-3 font-sans text-[clamp(22px,2.6vw,30px)] font-semibold leading-[1.35] tracking-normal [text-wrap:balance]">
            海外參展補助從 4 萬跳到{" "}
            <span className="text-gold">16 萬</span>——
            <br className="hidden md:block" />
            歷年最優，經費用罄即止
          </h2>
          <p className="mt-2 max-w-[620px] text-[15px] leading-[1.75] text-white/70">
            執行期至 12 月底。下一次公告時程以國際貿易署最新公告為準
          </p>
          <div className="mt-2 text-[12px] font-semibold tracking-[0.05em] text-gold/80">
            資料確認：{verifiedOn}
          </div>
        </div>

          <div className="mt-6 flex shrink-0 flex-col gap-3 md:mt-0 md:items-end">
            <Link
              href="/resources/subsidies#overseas-exhibition"
              className="inline-flex items-center gap-2 bg-gold px-[26px] py-[14px] text-[16px] font-semibold text-navy"
            >
              <span>看申請細節</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/assess"
              className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-gold"
            >
              或先做 2 分鐘處境比對
              <span
                aria-hidden="true"
                className="h-[7px] w-[7px] shrink-0 rotate-[-45deg] border-b border-r border-current"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
