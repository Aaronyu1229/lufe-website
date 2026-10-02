"use client";

import Link from "next/link";

import { PackageIcon, SlidersIcon, SproutIcon } from "@/components/icons/LineIcons";
import { Carousel, ExpandCard } from "@/components/ui";
import { isNumericValue } from "@/data/cases";

type Industry = "food" | "personal-care" | "fnb";
type Market = "north-america" | "sea" | "global";

interface CaseCardData {
  readonly slug: string;
  readonly featured: boolean;
  readonly industry: Industry;
  readonly market: Market;
  readonly tags: readonly { label: string; variant: "sky" | "gold" }[];
  readonly num: string;
  readonly numLabel: string;
  readonly scalePrefix: string;
  readonly title: string;
  readonly painLine: string;
  readonly solutionLine: string;
  readonly route: { from: string; to: string };
  readonly trustSignal?: string;
  readonly image: string;
}

export const HOME_CASE_CARDS: readonly CaseCardData[] = [
  {
    slug: "goat-milk-soap-global",
    featured: false,
    industry: "personal-care",
    market: "global",
    tags: [
      { label: "美妝個護", variant: "sky" },
      { label: "全球", variant: "gold" },
    ],
    num: "全球",
    numLabel: "現在的銷售範圍",
    scalePrefix: "台灣羊奶皂品牌",
    title: "一塊台灣羊奶皂，怎麼賣到全球？",
    painLine: "產品在台灣口碑好，但到了海外，買家看不懂它的價值",
    solutionLine: "先拆解海外買家怎麼看羊奶皂，再調整品牌定位、包裝與說法，讓每個市場講同一個故事",
    route: { from: "台灣", to: "全球市場" },
    image: "/images/hero-video/case-soap-1600.webp",
  },
  {
    slug: "fish-floss-us-fda",
    featured: false,
    industry: "food",
    market: "north-america",
    tags: [
      { label: "食品", variant: "sky" },
      { label: "美國", variant: "gold" },
    ],
    num: "FDA",
    numLabel: "先解決法規，再談上市",
    scalePrefix: "台灣魚鬆品牌",
    title: "魚鬆進美國，卡在哪一關？",
    painLine: "配方裡的成分與標示方式，在美國都可能過不了關",
    solutionLine: "先釐清 FDA 規範與成分問題，再透過美國消費者調研測試接受度，重新設計美國版包裝",
    route: { from: "台灣", to: "美國" },
    image: "/images/hero-video/case-floss-1600.webp",
  },
  {
    slug: "bubble-tea",
    featured: true,
    industry: "fnb",
    market: "sea",
    tags: [
      { label: "飲品", variant: "sky" },
      { label: "東南亞", variant: "gold" },
    ],
    num: "10 家",
    numLabel: "一年內加盟 + 直營門市",
    scalePrefix: "在台灣有 80 家門市的珍奶連鎖",
    title: "兩次失敗後，第三次怎麼把馬尼拉做成功？",
    painLine:
      "市場已被日出茶太、COCO、Tiger Sugar 佔住，前兩次一次被拿走配方、一次選錯區",
    solutionLine:
      "機會點調研、九宮格盤點全市場奶茶、盲飲找到健康賽道，第一家開在 BGC、混合直營與加盟，單店月營收做到台灣母店 1.2 倍",
    route: { from: "台灣母店", to: "馬尼拉 BGC" },
    trustSignal: "已簽 NDA · 經營層審閱",
    image: "/images/cases/case-4-manila-1080.webp",
  },
];

export const HOME_CASE_ROADS = [
  {
    label: "第一條",
    title: "從零開始",
    detail: "在當地蓋一間英語教育機構——招募師資、找場地、招第一個學生；\n後來用同樣的方法，做了一個連鎖手搖飲品牌",
    icon: SproutIcon,
  },
  {
    label: "第二條",
    title: "改了再帶過去",
    detail: "台灣的產品到了當地，改配方、改價格、改包裝，\n變成當地人願意掏錢的樣子",
    icon: SlidersIcon,
  },
  {
    label: "第三條",
    title: "原封不動帶過去",
    detail: "一個台灣的美業品牌，什麼都不改，只做當地的行銷，看它站不站得住",
    icon: PackageIcon,
  },
] as const;

const tagStyles: Record<"sky" | "gold", string> = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold-d",
};

function FromToRoute({ from, to }: { from: string; to: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2 text-[11px] font-medium text-tx3">
      <span>{from}</span>
      <svg width="36" height="10" viewBox="0 0 36 10" aria-hidden="true" className="shrink-0">
        <path d="M0,5 Q18,-1 36,5" stroke="#D4A85C" strokeWidth="1.5" fill="none" opacity="0.55" />
      </svg>
      <span className="text-tx2">{to}</span>
    </div>
  );
}

function TrustSignal({ text }: { text: string }) {
  return <span className="text-[11px] font-medium text-tx3">{text}</span>;
}

function CaseTags({ tags }: { tags: CaseCardData["tags"] }) {
  return (
    <div className="mb-3 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span key={tag.label} className={`px-2.5 py-[3px] text-[11px] font-medium ${tagStyles[tag.variant]}`}>
          {tag.label}
        </span>
      ))}
    </div>
  );
}

function CaseCard({ item }: { item: CaseCardData }) {
  const storyLabel = item.featured ? "看完整故事 →" : "閱讀案例 →";

  return (
    <ExpandCard
      title={item.title}
      image={{ src: item.image, alt: item.title }}
      className="h-full"
      card={
        <article className="lufe-card flex h-full min-w-0 flex-col overflow-hidden border border-bd bg-white shadow-[0_12px_32px_rgba(16,27,48,0.08)]">
          <div className="flex min-w-0 flex-1 flex-col p-6">
            <CaseTags tags={item.tags} />
            {item.featured && (
              <span className="mb-4 inline-flex w-fit bg-gold/15 px-2.5 py-1 text-[11px] font-semibold tracking-[0.5px] text-gold-d">
                最常被問到
              </span>
            )}
            {isNumericValue(item.num) ? (
              <div data-lufe-counter className={`font-sans font-semibold leading-none tabular-nums tracking-[-0.035em] text-gold-d ${item.featured ? "text-[52px]" : "text-[40px]"}`}>{item.num}</div>
            ) : (
              <div className={`font-sans font-[650] leading-[1.15] tracking-[-.02em] text-gold-d ${item.featured ? "text-[44px]" : "text-[36px]"}`}>{item.num}</div>
            )}
            <div className="mb-4 mt-2 text-[13px] font-medium text-tx3">{item.numLabel}</div>
            <div className="mb-2 text-[13px] font-medium text-tx2">{item.scalePrefix}</div>
            <h3 className="font-sans text-[19px] font-semibold leading-[1.4] text-tx">{item.title}</h3>
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-bd pt-5">
              <FromToRoute from={item.route.from} to={item.route.to} />
              <span aria-hidden="true" className="grid h-[30px] w-[30px] shrink-0 place-items-center border border-navy/30 text-navy">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </div>
        </article>
      }
      panel={
        <div>
          <CaseTags tags={item.tags} />
          {item.featured && (
            <span className="mb-4 inline-flex bg-gold/15 px-2.5 py-1 text-[11px] font-semibold tracking-[0.5px] text-gold-d">
              最常被問到
            </span>
          )}
          {isNumericValue(item.num) ? (
            <div data-lufe-counter className="font-sans text-[56px] font-semibold leading-none tabular-nums tracking-[-0.035em] text-gold-d">{item.num}</div>
          ) : (
            <div className={`font-sans font-[650] leading-[1.15] tracking-[-.02em] text-gold-d ${item.featured ? "text-[44px]" : "text-[36px]"}`}>{item.num}</div>
          )}
          <p className="mb-5 mt-2 text-[14px] font-medium text-tx3">{item.numLabel}</p>
          <p className="mb-6 text-[13px] font-medium text-tx2">{item.scalePrefix}</p>
          <div className="border-t border-bd py-4">
            <h3 className="mb-2 text-[14px] font-semibold text-tx3">卡點</h3>
            <p className="leading-[1.85] text-tx2">{item.painLine}</p>
          </div>
          <div className="border-t border-bd py-4">
            <h3 className="mb-2 text-[14px] font-semibold text-gold-d">怎麼解</h3>
            <p className="leading-[1.85] text-tx">{item.solutionLine}</p>
          </div>
          <div className="flex flex-wrap justify-between gap-3 border-t border-bd py-4 text-[13px] text-tx3">
            <FromToRoute from={item.route.from} to={item.route.to} />
            {item.trustSignal && <TrustSignal text={item.trustSignal} />}
          </div>
          <Link href={`/cases/${item.slug}`} className="inline-flex bg-navy px-5 py-3 text-[14px] font-semibold text-white">
            {storyLabel}
          </Link>
        </div>
      }
    />
  );
}

export function CasesSection() {
  return (
    <section className="overflow-hidden py-[80px]">
      <div className="lufe-container">
        <div className="max-w-[820px]">
          <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-tx [text-wrap:balance]">
            用數據判斷方向，
            <br />
            <span className="text-gold-d">用實戰調整做法</span>
          </h2>
          <p className="mt-5 text-[17px] leading-[1.8] text-tx2">在菲律賓，鹿飛與合作夥伴走過三條不一樣的路；每一條都先小規模驗證，再依數據調整、放大</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {HOME_CASE_ROADS.map((road) => {
            const Icon = road.icon;

            return (
            <article key={road.label} className="lufe-card group border border-bd bg-cream p-6 md:p-7">
              <span aria-hidden="true" className="mb-5 grid h-10 w-10 place-items-center border border-gold/40 text-gold-d transition-colors duration-200 [@media(hover:hover)]:group-hover:border-gold-d">
                <Icon size={20} className="transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-px" />
              </span>
              <p className="text-[13px] font-semibold text-gold-d">{road.label}</p>
              <h3 className="mt-3 font-sans text-[22px] font-semibold leading-[1.35] text-tx">{road.title}</h3>
              <p className="mt-4 whitespace-pre-line text-[15px] leading-[1.85] text-tx2">{road.detail}</p>
            </article>
            );
          })}
        </div>
      </div>

      <div className="lufe-container">
        <Carousel
          label="案例"
          className="mt-8 overflow-hidden"
          itemClassName="basis-[82vw] max-w-[520px] md:basis-[380px]"
        >
          {HOME_CASE_CARDS.map((item) => <CaseCard key={item.slug} item={item} />)}
        </Carousel>
      </div>

      <div className="lufe-container mt-4">
        <Link href="/cases" className="inline-flex text-[16px] font-semibold text-sky">
          全部案例 →
        </Link>
      </div>
    </section>
  );
}
