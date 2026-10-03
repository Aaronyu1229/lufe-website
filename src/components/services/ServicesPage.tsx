"use client";

import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import { SnapRail } from "@/components/motion/SnapRail";
import { BuildingIcon, PackageIcon, TargetIcon, UsersIcon } from "@/components/icons/LineIcons";
import { FaqSection } from "@/components/faq/FaqSection";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { SERVICE_FAQS } from "@/data/serviceFaqs";

import { ContactButton } from "./ContactButton";
import { CTA_LINE } from "@/data/cta";

export { SERVICE_FAQS } from "@/data/serviceFaqs";

type ChapterTile = {
  readonly month: string;
  readonly name: string;
  readonly line: string;
  readonly href: string;
  readonly image: string;
  readonly alt: string;
  readonly maxTierWidth?: number;
  readonly badge?: string;
};

const CHAPTER_TILES: readonly ChapterTile[] = [
  {
    month: "第一個月",
    name: "市場探查",
    line: "讓當地真實消費者先用、先說，再決定要不要往下走",
    href: "/services/product-testing",
    image: "/images/hero-video/chapter-research-1600.webp",
    alt: "會議中討論圖表的團隊",
  },
  {
    month: "第三個月",
    name: "寄賣",
    line: "產品證由當地持證進口商代辦、代持；證下來之前，先把通路和市場活動準備好",
    href: "/services/consignment",
    image: "/images/hero-video/chapter-warehouse-1600.webp",
    alt: "貨架上待出貨的包裹",
  },
  {
    month: "第九個月",
    name: "公司落地",
    line: "註冊、招聘、掛證，在當地建立你自己的團隊",
    href: "/services/localization",
    image: "/images/hero-video/chapter-storefront-1600.webp",
    alt: "夜晚街角的咖啡店與行人",
  },
  {
    month: "之後的每一天",
    name: "海外客服",
    line: "英文客服由菲律賓團隊接手，服務規則由台灣端制定。預計 2027 Q1 開放首批",
    href: "/services/call-center",
    image: "/images/hero-video/chapter-callcenter-1600.webp",
    alt: "一邊通話一邊打字的客服人員",
    maxTierWidth: 1600,
  },
];

const SERVICE_PATHS = [
  {
    href: "/services/product-testing",
    image: "/images/subsidies/card-skyline-1600.webp",
    alt: "馬尼拉都會區的商業大樓街景",
    eyebrow: "菲律賓 · 第一年四章",
    eyebrowClassName: "text-sky",
    title: "先花 1～2 萬，確認市場要不要這個產品",
    line: "市場探查 → 寄賣 → 公司落地 → 海外客服，可以只走一章，也可以一路走完",
    specs: [
      ["適合", "有產品的消費品牌與連鎖餐飲；沒出過海，或出過但沒站穩"],
      ["收費", "每章明碼。起手包 7 萬（市場探查 1～2 萬＋寄賣包 5～6 萬，市場探查費可抵）；公司落地按案，第一次談給範圍；海外客服第一次談給區間"],
      ["第一步", "市場探查，用一頁報告決定下一步"],
    ],
    cta: "從第一章開始 →",
  },
  {
    href: "/services/north-america",
    image: "/images/hero-video/chapter-retail-1600.webp",
    alt: "超市貨架走道",
    eyebrow: "北美 · 北美通路",
    eyebrowClassName: "text-gold-d",
    title: "進入北美主流零售通路",
    line: "市場研究、展覽、引進買家、上桌談判，由北美合作團隊執行；我們負責合約與進度",
    specs: [
      ["適合", "產品已經在台灣或其他市場站穩的品牌"],
      ["收費與時程", "依品類不同，第一次談就給明確數字"],
    ],
    cta: "了解北美通路 →",
  },
] as const;

const CAPABILITIES = [
  {
    icon: UsersIcon,
    title: "在地試用面板",
    body: "由當地老師與家長組成的試用面板，產品上架前先拿到真實反應",
  },
  {
    icon: PackageIcon,
    title: "持證進口與通路夥伴",
    body: "產品證由當地持證進口商代辦、代持，你不用先開公司；上架接合作的電商通路",
  },
  {
    icon: BuildingIcon,
    title: "律師行與招聘夥伴",
    body: "公司註冊、文件與招聘，由當地律師行與招聘夥伴執行",
  },
  {
    icon: TargetIcon,
    title: "台灣端專案管理",
    body: "合約、進度與品質指標都在我們的台灣公司，你只對一個窗口",
  },
] as const;

export function ServicesPage() {
  return (
    <>
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src="/images/services/services-hero-dhl-1600.webp" position="center" video={HERO_VIDEOS.services} />
        <div className="lufe-container lufe-hero-content min-w-0 pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <div className="min-w-0 max-w-[760px]">
            <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60"><Link href="/" className="hover:text-white">首頁</Link><span className="text-white/30">/</span><span className="text-white/75">服務</span></nav>
            <h1 className="h1 mb-6 max-w-[760px] text-white">一家品牌在馬尼拉的第一年</h1>
            <p className="lead max-w-[720px] !text-white/75">市場探查、寄賣、公司落地、海外客服——台灣品牌進菲律賓的第一年，多半會依序遇到這四件事。我們把它做成四個方案，每個都有明碼價格。可以只走一章，也可以一路走完。</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ContactButton className="inline-flex cursor-pointer items-center justify-center bg-gold px-6 py-3.5 text-[15px] font-semibold text-navy hover:bg-gold-l active:scale-[.97]">免費初步評估 30 分鐘 →</ContactButton>
              <a href="#chapters" className="inline-flex items-center justify-center border border-white/40 px-6 py-3.5 text-[15px] font-medium text-white hover:border-white active:scale-[.97]">看四個章節 ↓</a>
            </div>
          </div>
        </div>
        <ScrollCue />
      </section>

      <section id="chapters" className="scroll-mt-[100px] bg-white py-[88px] md:py-[120px]">
        <div className="lufe-container">
          <h2 className="text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-[-.022em] text-navy">四個章節，按你的節奏往前走</h2>
          <p className="lead mt-5 text-tx2">每一章獨立計價。每一章結束，你都可以決定往下走、停下來，或換方向。</p>
          <SnapRail className="mt-12 flex min-w-0 gap-5 overflow-x-auto snap-x snap-mandatory pb-2 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
            {CHAPTER_TILES.map((tile) => (
              <Link key={tile.name} href={tile.href} aria-label="了解方案 →" className="group relative w-[82%] shrink-0 snap-start transition-transform active:scale-[.985] motion-reduce:transition-none md:w-auto">
                <figure className="relative mt-0 aspect-[4/5] overflow-hidden">
                  <TieredImage src={tile.image} alt={tile.alt} maxTierWidth={tile.maxTierWidth} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 82vw" loading="lazy" className="block h-full w-full object-cover transition-transform duration-[600ms] motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-[1.04] motion-reduce:group-hover:scale-100" />
                  {tile.badge ? <span className="absolute left-0 top-0 bg-gold px-2.5 py-1 text-[12px] font-semibold text-navy">{tile.badge}</span> : null}
                </figure>
                <h3 className="mt-1 text-[24px] font-[650] leading-[1.3] text-tx">{tile.name}</h3>
                <p className="mt-2 text-[15px] leading-[1.75] text-tx2">{tile.line}</p>
                <p className="mt-4 text-[14px] font-semibold text-sky">了解方案 <span aria-hidden="true" className="inline-block transition-transform motion-reduce:transition-none [@media(hover:hover)]:group-hover:translate-x-[3px]">→</span></p>
              </Link>
            ))}
          </SnapRail>
        </div>
      </section>

      <section className="bg-cream py-[72px] md:py-[88px]">
        <div className="lufe-container">
          <h2 className="h2 text-tx">主線是菲律賓；產品已經站穩的，另有北美通路</h2>
          <div className="mt-8 grid min-w-0 gap-5 md:grid-cols-2">
            {SERVICE_PATHS.map((path) => (
              <Link key={path.href} href={path.href} className="group border border-bd bg-white transition-transform active:scale-[.985] [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-gold motion-reduce:transition-none">
                <figure className="aspect-[16/9] overflow-hidden">
                  <TieredImage src={path.image} alt={path.alt} sizes="(min-width: 768px) 50vw, 100vw" loading="lazy" className="block h-full w-full object-cover transition-transform duration-[500ms] motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-[1.03] motion-reduce:group-hover:scale-100" />
                </figure>
                <div className="p-6 md:p-9">
                  <p className={`text-[14px] font-semibold ${path.eyebrowClassName}`}>{path.eyebrow}</p>
                  <h3 className="h3 mt-4 text-tx">{path.title}</h3>
                  <p className="mt-4 text-[15px] leading-[1.85] text-tx2">{path.line}</p>
                  <dl className="mt-6">
                    {path.specs.map(([term, detail]) => (
                      <div key={term} className="grid grid-cols-[72px_minmax(0,1fr)] gap-4 border-t border-bd py-4">
                        <dt className="text-[13px] font-semibold text-tx3">{term}</dt>
                        <dd className="text-[15px] leading-[1.8] text-tx2">{detail}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-2 text-[15px] font-semibold text-sky">{path.cta}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-[88px] text-white md:py-[112px]">
        <div className="lufe-container">
          <h2 className="text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-[-.022em] text-white">一個窗口，<span className="block text-gold">串起當地的每一個執行夥伴</span></h2>
          <p className="mt-5 max-w-[680px] text-[17px] leading-[1.85] text-white/70">我們負責合約、進度與品質；當地的試用、通路、法務與招聘，由合作夥伴分工執行。</p>
          <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((capability) => {
              const Icon = capability.icon;
              return <div key={capability.title} className="bg-navy p-6 md:p-7"><span aria-hidden="true" className="grid h-10 w-10 place-items-center border border-gold/40 text-gold"><Icon size={20} /></span><h3 className="mt-5 text-[17px] font-[650] text-white">{capability.title}</h3><p className="mt-2 text-[15px] leading-[1.8] text-white/70">{capability.body}</p></div>;
            })}
          </div>
        </div>
      </section>

      <FaqSection title="選方案之前，最常被問的三件事" idPrefix="services-faq" items={SERVICE_FAQS.map((faq, index) => ({ num: String(index + 1).padStart(2, "0"), question: faq.q, answer: faq.a, takeaway: faq.takeaway }))} className="bg-white py-[72px] md:py-[96px]" />

      <section className="bg-navy py-[78px] text-white md:py-[96px]"><div className="lufe-container"><div className="mx-auto max-w-[720px] text-center"><h2 className="h2 text-white">想知道該從哪一章開始？</h2><p className="mt-4 text-[16px] leading-[1.85] text-white/70">{CTA_LINE}</p><ContactButton className="mt-8 cursor-pointer bg-gold px-7 py-3.5 text-[16px] font-semibold text-navy hover:bg-gold-l">免費初步評估 30 分鐘 →</ContactButton></div></div></section>
    </>
  );
}
