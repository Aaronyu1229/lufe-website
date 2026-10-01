"use client";

import Link from "next/link";

import { Carousel, ExpandCard } from "@/components/ui";

type Industry = "food" | "electronics" | "apparel" | "fnb";
type Market = "north-america" | "sea";

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
  readonly trustSignal: string;
  readonly image: string;
}

export const HOME_CASE_CARDS: readonly CaseCardData[] = [
  {
    slug: "costco-health",
    featured: true,
    industry: "food",
    market: "north-america",
    tags: [
      { label: "食品", variant: "sky" },
      { label: "北美", variant: "gold" },
    ],
    num: "6 個月",
    numLabel: "從 0 到 Costco 上架",
    scalePrefix: "年營收 8,000 萬的台灣保健品廠",
    title: "怎麼從零打進北美 Costco 120+ 門市？",
    painLine:
      "找過貿易商只管物流、找過顧問只丟 80 頁報告，沒人真的把品牌帶進通路。",
    solutionLine:
      "從消費者口感倒推配方、合約付款期硬談進 45 天、首月銷量超標 40%，直接進入第二批訂單談判。",
    route: { from: "台灣", to: "Costco 北美" },
    trustSignal: "客戶授權公開",
    image: "/images/cases/case-1-costco-1600.webp",
  },
  {
    slug: "electronics-tariff",
    featured: false,
    industry: "electronics",
    market: "north-america",
    tags: [
      { label: "電子", variant: "sky" },
      { label: "美國", variant: "gold" },
    ],
    num: "-15%",
    numLabel: "關稅成本",
    scalePrefix: "年出口 3,000 萬美金的電子組裝廠",
    title: "中美關稅戰下，怎麼把毛利搶回來？",
    painLine:
      "工廠在大陸、客戶在美國，25% 額外關稅把毛利打到負數，客戶降價要求已經在信箱裡。",
    solutionLine:
      "四地產地打分後選越南，雙線並行 6 個月當保險，物流時效反而縮短 3 天，一年省下 200 萬美金。",
    route: { from: "大陸廣東", to: "越南胡志明" },
    trustSignal: "已簽 NDA · 經營層審閱",
    image: "/images/cases/case-2-tariff-1600.webp",
  },
  {
    slug: "shoe-brand",
    featured: false,
    industry: "apparel",
    market: "north-america",
    tags: [
      { label: "服飾", variant: "sky" },
      { label: "美國", variant: "gold" },
    ],
    num: "3x",
    numLabel: "新品類營收倍數",
    scalePrefix: "成立 30 年的台灣皮鞋品牌",
    title: "200 萬行銷砸下去，半年只回 50 萬，怎麼救？",
    painLine:
      "上亞馬遜前 20 名全是國際品牌、退貨率 30%，品牌方堅持「我們叫鞋業，不能賣襪子」。",
    solutionLine:
      "兩小時把 CAC 與 LTV 攤上桌，用襪子當進場票，3 個月做到品類 3 倍、4.7 星，反推皮鞋銷量 +120%。",
    route: { from: "台灣品牌", to: "Amazon US" },
    trustSignal: "客戶授權公開",
    image: "/images/cases/case-3-pivot-1600.webp",
  },
  {
    slug: "bubble-tea",
    featured: false,
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
      "市場已被日出茶太、COCO、Tiger Sugar 佔住，前兩次一次被拿走配方、一次選錯區。",
    solutionLine:
      "鎖定 P150–200 中高端、第一家開在 BGC 當行銷投資、混合直營與加盟，單店月營收做到台灣母店 1.2 倍。",
    route: { from: "台灣母店", to: "馬尼拉 BGC" },
    trustSignal: "已簽 NDA · 經營層審閱",
    image: "/images/cases/case-4-manila-1080.webp",
  },
];

export const HOME_CASE_ROADS = [
  {
    label: "第一條",
    title: "從零開始。",
    detail: "在當地蓋一間英語教育機構——找老師、找場地、招第一個學生；\n後來用同樣的方法，做了一個連鎖手搖飲品牌。",
  },
  {
    label: "第二條",
    title: "改了再帶過去。",
    detail: "台灣的產品到了當地，改配方、改價格、改包裝，\n變成當地人願意掏錢的樣子。",
  },
  {
    label: "第三條",
    title: "原封不動帶過去。",
    detail: "一個台灣的美業品牌，什麼都不改，只做當地的行銷，看它站不站得住。",
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
            <div className={`font-sans font-semibold leading-none tabular-nums tracking-[-0.035em] text-gold-d ${item.featured ? "text-[52px]" : "text-[40px]"}`}>
              {item.num}
            </div>
            <div className="mb-4 mt-2 text-[13px] font-medium text-tx3">{item.numLabel}</div>
            <div className="mb-2 text-[13px] font-medium text-tx2">{item.scalePrefix}</div>
            <h3 className="font-sans text-[19px] font-semibold leading-[1.4] text-tx">{item.title}</h3>
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-bd pt-5">
              <FromToRoute from={item.route.from} to={item.route.to} />
              <span aria-hidden="true" className="grid h-[30px] w-[30px] shrink-0 place-items-center bg-navy text-white">
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
          <div className="font-sans text-[56px] font-semibold leading-none tabular-nums tracking-[-0.035em] text-gold-d">{item.num}</div>
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
            <TrustSignal text={item.trustSignal} />
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
            我們不是跟你賭市場，
            <br />
            <span className="text-gold-d">是有做過的事</span>
          </h2>
          <p className="mt-5 text-[17px] leading-[1.8] text-tx2">在菲律賓，我們跟合作夥伴走過三條不一樣的路。</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {HOME_CASE_ROADS.map((road) => (
            <article key={road.label} className="lufe-card border border-bd bg-cream p-6 md:p-7">
              <p className="text-[13px] font-semibold text-gold-d">{road.label}</p>
              <h3 className="mt-3 font-sans text-[22px] font-semibold leading-[1.35] text-tx">{road.title}</h3>
              <p className="mt-4 whitespace-pre-line text-[15px] leading-[1.85] text-tx2">{road.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-[720px] whitespace-pre-line text-[16px] leading-[1.85] text-tx2">三條路的成本、坑、時間都不一樣。{"\n"}第一次談，我們會先問你比較像哪一條。</p>
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
