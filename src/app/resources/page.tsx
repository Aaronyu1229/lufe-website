import type { Metadata } from "next";
import Link from "next/link";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { ScrollCue } from "@/components/ScrollCue";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { SUBSIDIES } from "@/data/subsidies";
import { ACTIVITIES } from "@/data/fieldNotes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/resources",
  title: "資源 · 補助與活動",
  description: "正在開放的政府出海補助、加盟展、論壇、商會活動——一個入口看完所有可以幫你出海的資源。",
});

const subsidyCount = SUBSIDIES.length;
const activityCount = ACTIVITIES.length;

export default function ResourcesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "資源", path: "/resources" }]} />
      <div className="bg-white">
      {/* ───── Hero ───── */}
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src="/images/hero/hero-compass-1600.webp" video={HERO_VIDEOS.resources} />
        <div className="lufe-container lufe-hero-content pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <h1 className="h1 mb-7 max-w-[820px] text-white">
            正在開放的補助，
            <br />
            <span className="text-gold/90">和我們現場去的地方。</span>
          </h1>

          <p className="text-[17px] md:text-[18px] text-white/70 font-normal leading-[1.8] max-w-[680px]">
            兩種資源、一個入口：{" "}
            <span className="text-white font-medium">政府出海補助</span>{" "}
            幫你降低成本，{" "}
            <span className="text-white font-medium">活動與現場紀錄</span>{" "}
            告訴你我們這個月在哪裡、和誰談、看到什麼。 兩條路你都可以直接對接到鹿飛的服務。
          </p>
        </div>
        <ScrollCue />
      </section>

      {/* ───── Two-card hub ───── */}
      <section className="py-[60px] md:py-[88px]">
        <div className="lufe-container grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7">
          {/* Card 1 — 補助 */}
          <Link
            href="/resources/subsidies"
            className="lufe-card group relative bg-cream/40 border border-bd hover:border-gold transition-all duration-300 p-8 md:p-10 flex flex-col overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-[3px] bg-gold/70"
            />
            <h2 className="h2 mb-3 text-navy">
              2026 政府出海補助
            </h2>
            <p className="text-[15.5px] text-tx2 leading-[1.8] mb-7">
              貿易署、經濟部、中企署——4 個正在開放的計畫，單筆最高補助
              NT$1,000 萬。 我們替你整理好誰適合申請、可以包含哪些服務、和鹿飛三支柱怎麼對齊。
            </p>

            <div className="grid grid-cols-3 gap-4 py-5 border-y border-bd/70 mb-7">
              <div>
                <div className="num text-[26px] text-gold-d leading-none mb-1.5">
                  {subsidyCount}
                </div>
                <div className="text-[10.5px] text-tx3 tracking-[0.5px]">當期計畫</div>
              </div>
              <div>
                <div className="num text-[26px] text-gold-d leading-none mb-1.5">
                  3
                </div>
                <div className="text-[10.5px] text-tx3 tracking-[0.5px]">主管機關</div>
              </div>
              <div>
                <div className="num text-[26px] text-gold-d leading-none mb-1.5">
                  1,000萬
                </div>
                <div className="text-[10.5px] text-tx3 tracking-[0.5px]">單筆最高</div>
              </div>
            </div>

            <span className="mt-auto inline-flex items-center gap-2 text-[15.5px] font-medium text-navy group-hover:text-gold-d transition-colors">
              看補助整理
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </Link>

          {/* Card 2 — 活動 / 現場紀錄 */}
          <Link
            href="/field-notes"
            className="lufe-card group relative bg-cream/40 border border-bd hover:border-sky transition-all duration-300 p-8 md:p-10 flex flex-col overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-[3px] bg-sky/70"
            />
            <h2 className="h2 mb-3 text-navy">
              活動 · 現場紀錄
            </h2>
            <p className="text-[15.5px] text-tx2 leading-[1.8] mb-7">
              我們這個月在哪裡：北美和東南亞兩個主戰場的第一手紀錄。 加盟展、論壇、商會、客戶現場、媒體露出，全部攤開給你看。
            </p>

            <div className="grid grid-cols-3 gap-4 py-5 border-y border-bd/70 mb-7">
              <div>
                <div className="num text-[26px] text-sky leading-none mb-1.5">
                  {activityCount}
                </div>
                <div className="text-[10.5px] text-tx3 tracking-[0.5px]">活動紀錄</div>
              </div>
              <div>
                <div className="num text-[26px] text-sky leading-none mb-1.5">
                  2
                </div>
                <div className="text-[10.5px] text-tx3 tracking-[0.5px]">主戰場</div>
              </div>
              <div>
                <div className="num text-[26px] text-sky leading-none mb-1.5">
                  月更
                </div>
                <div className="text-[10.5px] text-tx3 tracking-[0.5px]">更新節奏</div>
              </div>
            </div>

            <span className="mt-auto inline-flex items-center gap-2 text-[15.5px] font-medium text-navy group-hover:text-sky transition-colors">
              看現場紀錄
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </div>

        {/* Cross-discovery footnote */}
        <div className="lufe-container mt-14 border-t border-bd/60 pt-8 md:mt-16">
          <p className="text-[14.5px] text-tx3 leading-[1.8] text-center">
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
    </>
  );
}
