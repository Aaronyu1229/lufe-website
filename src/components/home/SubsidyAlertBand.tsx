import Link from "next/link";

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
 *   - 次要 CTA 導向 /assess 讓還在猶豫的人先做 2 分鐘評估
 *
 * 過期後：補助第 2 次公告結束後，把整個組件從 page.tsx 拿掉即可（單檔可拔除）。
 */
export function SubsidyAlertBand() {
  return (
    <section
      aria-label="限期政府補助加碼"
      className="relative bg-navy text-white overflow-hidden"
    >
      {/* Subtle ambient accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, #D4A85C 0%, transparent 45%), radial-gradient(circle at 85% 80%, #D98B4A 0%, transparent 40%)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 py-[56px] md:py-[72px] relative">
        <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center">
          {/* Left — status chip */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-2 bg-ember text-white text-[11px] font-semibold tracking-[1.5px] uppercase px-3 py-1.5">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              政府加碼中
            </span>
            <span className="hidden md:inline-block w-8 h-px bg-white/20" />
          </div>

          {/* Middle — headline + subtext */}
          <div className="min-w-0">
            <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-gold/80 mb-2">
              Ministry of Economic Affairs · 115 年度
            </div>
            <h2 className="font-sans text-[clamp(22px,2.6vw,32px)] leading-[1.25] font-light tracking-[-0.3px] mb-3">
              海外參展補助從 4 萬跳到{" "}
              <span className="text-gold font-normal">16 萬</span>——
              <br className="hidden md:block" />
              歷年最優，經費用罄即止。
            </h2>
            <p className="text-[14.5px] text-white/70 leading-[1.75] max-w-[620px]">
              因應國際關稅情勢，經濟部依特別條例加碼補助國內廠商赴海外參展。115
              年度第 2 次公告預計 4-5 月開放，執行期至 12 月底。一年只有兩次機會。
            </p>
          </div>

          {/* Right — CTA */}
          <div className="flex flex-col gap-2 shrink-0 md:items-end">
            <Link
              href="/resources/subsidies#overseas-exhibition"
              className="inline-flex items-center gap-2 bg-gold text-navy px-5 py-3 text-[14.5px] font-semibold hover:bg-gold/90 transition-colors group"
            >
              <span>看申請細節</span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <Link
              href="/assess"
              className="text-[13px] text-white/60 hover:text-gold transition-colors inline-flex items-center gap-1.5 md:self-end"
            >
              <span className="border-b border-white/20 group-hover:border-gold pb-0.5">
                或先做 2 分鐘評估
              </span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
