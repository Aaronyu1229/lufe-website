import type { Metadata } from "next";
import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { ACTIVITIES } from "@/data/fieldNotes";
import { SUBSIDIES } from "@/data/subsidies";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/resources",
  title: "資源 · 補助與活動",
  description: "正在開放的政府出海補助、加盟展、論壇、商會活動——一個入口看完所有可以幫你出海的資源。",
});

const activities = ACTIVITIES.filter((activity) => activity.image && !activity.tbd).slice(0, 3);

export default function ResourcesPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "資源", path: "/resources" }]} />
    <div className="bg-white">
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src="/images/hero/hero-compass-1600.webp" video={HERO_VIDEOS.resources} />
        <div className="lufe-container lufe-hero-content min-w-0 pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60"><Link href="/" className="hover:text-white">首頁</Link><span aria-hidden="true" className="text-white/30">/</span><span className="text-white/75">資源</span></nav>
          <h1 className="h1 mb-6 max-w-[880px] text-white">出海資源中心，<br /><span className="text-gold">補助與現場一次看完</span></h1>
          <p className="lead max-w-[640px] !text-white/75">政府出海補助協助降低成本，活動與現場紀錄提供第一手市場觀察。兩條路都能直接銜接鹿飛的服務</p>
        </div>
        <ScrollCue />
      </section>

      <section className="bg-white py-[80px] md:py-[110px]">
        <div className="lufe-container">
          <h2 className="h2 text-tx">政府出海補助</h2>
          <p className="lead mt-5 max-w-[700px]">貿易署、經濟部、中企署的出海相關計畫，鹿飛整理成適用對象、補助範圍與申請重點</p>
          <div className="mt-10">
            <div className="hidden grid-cols-[48px_1.6fr_1fr_1.2fr_1.2fr] gap-4 border-b border-bd pb-3 text-[12px] font-semibold text-tx3 md:grid"><span>編號</span><span>計畫</span><span>主管機關</span><span>額度</span><span>時程</span></div>
            {SUBSIDIES.map((subsidy) => <Link key={subsidy.slug} href={`/resources/subsidies#${subsidy.slug}`} className="grid gap-2 border-t border-bd py-5 transition-transform hover:bg-cream active:scale-[.995] md:grid-cols-[48px_1.6fr_1fr_1.2fr_1.2fr] md:gap-4">
              <span className="num text-gold-d">{subsidy.num}</span>
              <strong className="text-[16px] font-semibold text-tx">{subsidy.shortTitle}</strong>
              <span className="text-[14px] text-tx2">{subsidy.agency}</span>
              <span className="num text-[15px] text-tx">{subsidy.amount}</span>
              <span className="text-[13px] leading-[1.6] text-tx3">{subsidy.deadline}</span>
            </Link>)}
          </div>
          <Link href="/resources/subsidies" className="mt-8 inline-block text-[15px] font-semibold text-gold-d hover:text-navy">看完整補助整理 →</Link>
        </div>
      </section>

      <section className="bg-cream py-[80px] md:py-[110px]">
        <div className="lufe-container">
          <h2 className="h2 text-tx">活動與現場紀錄</h2>
          <p className="lead mt-5 max-w-[700px]">加盟展、論壇、商會與客戶現場，北美與東南亞的第一手紀錄</p>
          <div className="mt-10 grid min-w-0 gap-5 md:grid-cols-3 md:gap-6">
            {activities.map((activity) => <article key={activity.id} className="min-w-0 overflow-hidden border border-bd bg-white">
              <div className="relative aspect-[16/10] overflow-hidden"><TieredImage src={activity.image!} alt={activity.title} sizes="(max-width: 767px) 100vw, 33vw" className="absolute inset-0 h-full w-full object-cover" /><span className="absolute left-3 top-3 bg-white px-2 py-0.5 text-[11px] font-semibold text-gold-d">{activity.tag}</span></div>
              <div className="p-5 md:p-6"><p className="mb-2 text-[12px] text-tx3">{activity.location} · {activity.date}</p><h3 className="h3 mb-2 text-tx">{activity.title}</h3><p className="text-[14.5px] leading-[1.8] text-tx2">{activity.summary}</p></div>
            </article>)}
          </div>
          <Link href="/field-notes" className="mt-8 inline-block text-[15px] font-semibold text-gold-d hover:text-navy">看所有現場紀錄 →</Link>
        </div>
      </section>

      <div className="lufe-container py-10 text-center text-[14.5px] leading-[1.8] text-tx3">
        想看實際做過的案子？前往<Link href="/cases" className="font-medium text-tx hover:text-gold-d">案例</Link>｜想了解市場趨勢？前往<Link href="/insights" className="font-medium text-tx hover:text-gold-d">洞察</Link>
      </div>
    </div>
  </>;
}
