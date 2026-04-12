import type { Metadata } from "next";
import Link from "next/link";
import { SUBSIDIES } from "@/data/subsidies";
import { ACTIVITIES } from "@/data/fieldNotes";

export const metadata: Metadata = {
  title: "資源 · 補助與活動 — 鹿飛 LUFÉ",
  description:
    "正在開放的政府出海補助、加盟展、論壇、商會活動——一個入口看完所有可以幫你出海的資源。",
};

const subsidyCount = SUBSIDIES.length;
const activityCount = ACTIVITIES.length;

export default function ResourcesPage() {
  return (
    <div className="bg-white">
      {/* ───── Hero ───── */}
      <section className="relative bg-navy text-white overflow-hidden">
        {/* Ambient accents */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 28%, #D4A85C 0%, transparent 42%), radial-gradient(circle at 82% 72%, #5B8FA8 0%, transparent 48%)",
          }}
        />

        <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16 pt-[130px] md:pt-[170px] pb-[64px] md:pb-[88px] relative">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-5 h-px bg-gold/70" />
            <span className="text-gold/80 text-[11px] font-medium tracking-[2.5px] uppercase">
              Resources · 補助與活動
            </span>
          </div>

          <h1
            className="font-sans text-white leading-[1.08] mb-7 font-extralight tracking-[-1.5px] max-w-[820px]"
            style={{ fontSize: "clamp(34px, 4.6vw, 56px)" }}
          >
            正在開放的補助，
            <br />
            <span className="text-gold/90">和我們現場去的地方。</span>
          </h1>

          <p className="text-[16px] md:text-[17px] text-white/70 font-normal leading-[1.75] max-w-[680px]">
            兩種資源、一個入口：{" "}
            <span className="text-white font-medium">政府出海補助</span>{" "}
            幫你降低成本，{" "}
            <span className="text-white font-medium">活動與現場紀錄</span>{" "}
            告訴你我們這個月在哪裡、和誰談、看到什麼。 兩條路你都可以直接對接到鹿飛的服務。
          </p>
        </div>
      </section>

      {/* ───── Two-card hub ───── */}
      <section className="px-5 md:px-10 lg:px-16 py-[60px] md:py-[88px]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
          {/* Card 1 — 補助 */}
          <Link
            href="/resources/subsidies"
            className="group relative bg-cream/40 border border-bd hover:border-gold transition-all duration-300 p-8 md:p-10 flex flex-col overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-[3px] bg-gold/70"
            />
            <div className="flex items-center gap-2 mb-5">
              <span className="text-[10.5px] font-semibold tracking-[2px] uppercase text-gold-d">
                01 · Subsidies
              </span>
            </div>
            <h2 className="font-sans text-[26px] md:text-[30px] font-light leading-[1.2] tracking-[-0.5px] text-navy mb-3">
              2026 政府出海補助
            </h2>
            <p className="text-[14px] text-tx2 leading-[1.75] mb-7">
              貿易署、經濟部、中企署——4 個正在開放的計畫，單筆最高補助
              NT$1,000 萬。 我們替你整理好誰適合申請、可以包含哪些服務、和鹿飛三支柱怎麼對齊。
            </p>

            <div className="grid grid-cols-3 gap-4 py-5 border-y border-bd/70 mb-7">
              <div>
                <div className="font-sans text-[26px] font-semibold text-gold-d leading-none mb-1.5">
                  {subsidyCount}
                </div>
                <div className="text-[10.5px] text-tx3 tracking-[0.5px]">當期計畫</div>
              </div>
              <div>
                <div className="font-sans text-[26px] font-semibold text-gold-d leading-none mb-1.5">
                  3
                </div>
                <div className="text-[10.5px] text-tx3 tracking-[0.5px]">主管機關</div>
              </div>
              <div>
                <div className="font-sans text-[26px] font-semibold text-gold-d leading-none mb-1.5">
                  1,000萬
                </div>
                <div className="text-[10.5px] text-tx3 tracking-[0.5px]">單筆最高</div>
              </div>
            </div>

            <span className="mt-auto inline-flex items-center gap-2 text-[14px] font-medium text-navy group-hover:text-gold-d transition-colors">
              看補助整理
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </Link>

          {/* Card 2 — 活動 / 現場紀錄 */}
          <Link
            href="/field-notes"
            className="group relative bg-cream/40 border border-bd hover:border-sky transition-all duration-300 p-8 md:p-10 flex flex-col overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-[3px] bg-sky/70"
            />
            <div className="flex items-center gap-2 mb-5">
              <span className="text-[10.5px] font-semibold tracking-[2px] uppercase text-sky">
                02 · Field Notes
              </span>
            </div>
            <h2 className="font-sans text-[26px] md:text-[30px] font-light leading-[1.2] tracking-[-0.5px] text-navy mb-3">
              活動 · 現場紀錄
            </h2>
            <p className="text-[14px] text-tx2 leading-[1.75] mb-7">
              我們這個月在哪裡：北美和東南亞兩個主戰場的第一手紀錄。 加盟展、論壇、商會、客戶現場、媒體露出，全部攤開給你看。
            </p>

            <div className="grid grid-cols-3 gap-4 py-5 border-y border-bd/70 mb-7">
              <div>
                <div className="font-sans text-[26px] font-semibold text-sky leading-none mb-1.5">
                  {activityCount}
                </div>
                <div className="text-[10.5px] text-tx3 tracking-[0.5px]">活動紀錄</div>
              </div>
              <div>
                <div className="font-sans text-[26px] font-semibold text-sky leading-none mb-1.5">
                  2
                </div>
                <div className="text-[10.5px] text-tx3 tracking-[0.5px]">主戰場</div>
              </div>
              <div>
                <div className="font-sans text-[26px] font-semibold text-sky leading-none mb-1.5">
                  月更
                </div>
                <div className="text-[10.5px] text-tx3 tracking-[0.5px]">更新節奏</div>
              </div>
            </div>

            <span className="mt-auto inline-flex items-center gap-2 text-[14px] font-medium text-navy group-hover:text-sky transition-colors">
              看現場紀錄
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </div>

        {/* Cross-discovery footnote */}
        <div className="max-w-[1200px] mx-auto mt-14 md:mt-16 pt-8 border-t border-bd/60">
          <p className="text-[13px] text-tx3 leading-[1.8] text-center">
            想看實際做過的案子？前往{" "}
            <Link
              href="/cases"
              className="text-navy font-medium border-b border-tx3/40 hover:border-navy transition-colors"
            >
              案例
            </Link>
            。 想搞懂市場趨勢？前往{" "}
            <Link
              href="/insights"
              className="text-navy font-medium border-b border-tx3/40 hover:border-navy transition-colors"
            >
              洞察
            </Link>
            。
          </p>
        </div>
      </section>
    </div>
  );
}
