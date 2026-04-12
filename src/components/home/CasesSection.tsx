"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ────────────────────────────────────────────────────────────────────────
 * 首頁案例切片
 *
 * 設計重點（以客戶視角設計，不只是「秀作品」）：
 * 1. 大數字下面有 micro label，讓「6 個月」「-15%」立刻有商業意義
 * 2. 4 張卡都有 from→to 路線（台灣→Costco / 大陸→越南 / 台灣→Amazon / 台灣→Manila）
 * 3. 標題前面加「規模 + 產業」前綴，讓客戶第一秒判斷「這是不是和我同等級的案子」
 * 4. 副標用「痛 → 解」的對比結構（從 CASE_CARD_META.beats 取 [1] 與 [2]）
 * 5. 卡片底部有 NDA / 客戶授權公開的信任訊號
 * 6. featured 卡片有「最常被問到」徽章
 * 7. 上方有產業 / 市場兩條 filter pills
 * 8. 底部「看更多案例」CTA 強化成有 micro 描述的卡片式按鈕
 *
 * 全部 4 張卡片都是可點擊的——這很關鍵，原本只有 featured 有 route。
 * ──────────────────────────────────────────────────────────────────────── */

type IndustryFilter = "all" | "food" | "electronics" | "apparel" | "fnb";
type MarketFilter = "all" | "north-america" | "sea";

interface CaseCardData {
  readonly slug: string;
  readonly featured: boolean;
  readonly industry: Exclude<IndustryFilter, "all">;
  readonly market: Exclude<MarketFilter, "all">;
  readonly tags: readonly { label: string; variant: "sky" | "gold" }[];
  readonly num: string;
  readonly numLabel: string; // ← micro label under big number
  readonly scalePrefix: string; // ← 「年營收 8,000 萬的台灣保健品廠」
  readonly title: string;
  readonly painLine: string; // ← 痛點（從 beats[1] 改寫）
  readonly solutionLine: string; // ← 解法 + 結果（從 beats[3] 改寫）
  readonly route: { from: string; to: string };
  readonly trustSignal: string; // ← NDA / 授權公開
  readonly image: string;
}

const CASE_CARDS: readonly CaseCardData[] = [
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
    image: "/images/cases/case-1-costco.jpg",
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
    image: "/images/cases/case-2-tariff.jpg",
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
    image: "/images/cases/case-3-pivot.jpg",
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
    image: "/images/cases/case-4-manila.jpg",
  },
];

const tagStyles: Record<"sky" | "gold", string> = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold-d",
};

const INDUSTRY_FILTERS: readonly { value: IndustryFilter; label: string }[] = [
  { value: "all", label: "全部產業" },
  { value: "food", label: "食品保健" },
  { value: "electronics", label: "電子" },
  { value: "apparel", label: "服飾" },
  { value: "fnb", label: "餐飲" },
];

const MARKET_FILTERS: readonly { value: MarketFilter; label: string }[] = [
  { value: "all", label: "全部市場" },
  { value: "north-america", label: "北美" },
  { value: "sea", label: "東南亞" },
];

/* ────────── Sub-components ────────── */

function FromToRoute({ from, to }: { from: string; to: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px] text-tx3 font-medium">
      <span>{from}</span>
      <svg width="36" height="10" viewBox="0 0 36 10" aria-hidden="true">
        <path
          d="M0,5 Q18,-1 36,5"
          stroke="#D4A85C"
          strokeWidth="1.5"
          fill="none"
          opacity="0.55"
        />
      </svg>
      <span className="text-tx2">{to}</span>
    </div>
  );
}

function TrustSignal({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[10.5px] text-tx3 font-medium">
      <svg
        width="11"
        height="11"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 1L2 3v3.5C2 8.7 3.7 10.5 6 11c2.3-.5 4-2.3 4-4.5V3L6 1z"
          stroke="#9A8456"
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
      <span>{text}</span>
    </div>
  );
}

function FilterPills({
  options,
  active,
  onChange,
  ariaLabel,
}: {
  options: readonly { value: string; label: string }[];
  active: string;
  onChange: (v: string) => void;
  ariaLabel: string;
}) {
  return (
    <div
      className="flex items-center gap-1.5 flex-wrap"
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((opt) => {
        const isActive = active === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`text-[12px] px-3 py-1.5 rounded-none border transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-navy text-white border-navy"
                : "bg-white text-tx2 border-bd hover:border-navy hover:text-navy"
            }`}
            aria-pressed={isActive}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function CaseTags({
  tags,
}: {
  tags: readonly { label: string; variant: "sky" | "gold" }[];
}) {
  return (
    <div className="flex gap-1.5 mb-2.5">
      {tags.map((t) => (
        <span
          key={t.label}
          className={`text-[11px] px-2.5 py-[3px] rounded-sm font-medium ${tagStyles[t.variant]}`}
        >
          {t.label}
        </span>
      ))}
    </div>
  );
}

/* ────────── Main section ────────── */

export function CasesSection() {
  const [industry, setIndustry] = useState<IndustryFilter>("all");
  const [market, setMarket] = useState<MarketFilter>("all");

  const filtered = useMemo(() => {
    return CASE_CARDS.filter((c) => {
      if (industry !== "all" && c.industry !== industry) return false;
      if (market !== "all" && c.market !== market) return false;
      return true;
    });
  }, [industry, market]);

  return (
    <section className="py-[60px] md:py-[80px] px-5 md:px-10 max-w-[1400px] mx-auto">
      {/* ─── Heading ─── */}
      <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold-d mb-3">
        案例
      </div>
      <div className="flex items-center gap-6 mb-4">
        <h2 className="font-sans text-[clamp(28px,3.5vw,44px)] leading-[1.15] font-light tracking-[-0.5px] md:whitespace-nowrap">
          這些企業都找到了自己的路
        </h2>
        <div className="hidden md:block flex-1 h-px bg-bd" />
      </div>
      <p className="text-[15px] text-tx2 max-w-[560px] leading-[1.7] mb-8 font-normal">
        4 個案例，從食品到電子、從北美到東南亞——
        <span className="text-tx">每一個都是真的決策、真的數字、真的結果</span>。
      </p>

      {/* ─── Filter pills ─── */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-8 pb-7 border-b border-bd/70">
        <div className="flex items-center gap-3">
          <span className="text-[10.5px] font-semibold tracking-[1.5px] uppercase text-tx3 shrink-0">
            產業
          </span>
          <FilterPills
            options={INDUSTRY_FILTERS}
            active={industry}
            onChange={(v) => setIndustry(v as IndustryFilter)}
            ariaLabel="依產業篩選案例"
          />
        </div>
        <div className="hidden md:block w-px h-5 bg-bd/70" />
        <div className="flex items-center gap-3">
          <span className="text-[10.5px] font-semibold tracking-[1.5px] uppercase text-tx3 shrink-0">
            市場
          </span>
          <FilterPills
            options={MARKET_FILTERS}
            active={market}
            onChange={(v) => setMarket(v as MarketFilter)}
            ariaLabel="依市場篩選案例"
          />
        </div>
      </div>

      {/* ─── Empty state ─── */}
      {filtered.length === 0 && (
        <div className="text-center py-16 border border-dashed border-bd">
          <p className="text-[14px] text-tx3 mb-3">這個產業 × 市場組合還沒有公開案例。</p>
          <button
            type="button"
            onClick={() => {
              setIndustry("all");
              setMarket("all");
            }}
            className="text-[13px] font-medium text-navy underline underline-offset-4 hover:text-gold-d transition-colors cursor-pointer"
          >
            重設篩選
          </button>
        </div>
      )}

      {/* ─── Grid ─── */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((c) =>
            c.featured ? (
              <Link
                key={c.slug}
                href={`/cases/${c.slug}`}
                className="group md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch p-5 md:p-10 bg-white rounded-none transition-all duration-300 cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-lg relative"
              >
                {/* 「最常被問到」badge */}
                <div className="absolute top-4 right-4 md:top-5 md:right-5 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-gold/15 text-gold-d text-[10.5px] font-semibold px-2.5 py-1 tracking-[0.5px]">
                    <span className="w-1 h-1 rounded-full bg-gold-d animate-pulse" />
                    最常被問到
                  </span>
                </div>

                <div className="flex flex-col">
                  <CaseTags tags={c.tags} />

                  {/* 大數字 + micro label */}
                  <div className="mb-3">
                    <div className="font-sans text-[48px] md:text-[56px] font-semibold text-gold-d leading-none">
                      {c.num}
                    </div>
                    <div className="text-[11px] text-tx3 tracking-[0.5px] mt-2 font-medium">
                      {c.numLabel}
                    </div>
                  </div>

                  {/* 規模前綴 */}
                  <div className="text-[11.5px] text-tx2 font-medium tracking-[0.3px] mb-2">
                    {c.scalePrefix}
                  </div>

                  <h3 className="font-sans text-[20px] md:text-[24px] leading-[1.35] mb-3 font-bold text-tx">
                    {c.title}
                  </h3>

                  {/* 痛 → 解 */}
                  <div className="space-y-2 mb-4">
                    <p className="text-[13px] text-tx2 leading-[1.7]">
                      <span className="text-tx3 font-medium">卡點 · </span>
                      {c.painLine}
                    </p>
                    <p className="text-[13px] text-tx leading-[1.7]">
                      <span className="text-gold-d font-medium">怎麼解 · </span>
                      {c.solutionLine}
                    </p>
                  </div>

                  {/* Footer: route + trust signal + CTA */}
                  <div className="mt-auto pt-4 border-t border-bd/60 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4 flex-wrap">
                      <FromToRoute from={c.route.from} to={c.route.to} />
                      <TrustSignal text={c.trustSignal} />
                    </div>
                    <span className="text-[12.5px] font-semibold text-navy group-hover:text-gold-d transition-colors">
                      看完整故事 →
                    </span>
                  </div>
                </div>

                <div className="rounded-none h-full min-h-[220px] overflow-hidden relative">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </Link>
            ) : (
              <Link
                key={c.slug}
                href={`/cases/${c.slug}`}
                className="group bg-white rounded-none transition-all duration-300 cursor-pointer relative overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-lg flex flex-col"
              >
                <div className="h-[180px] overflow-hidden relative">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7 md:p-8 flex flex-col flex-1">
                  <CaseTags tags={c.tags} />

                  {/* 大數字 + micro label */}
                  <div className="mb-3">
                    <div className="font-sans text-[40px] font-semibold text-gold-d leading-none">
                      {c.num}
                    </div>
                    <div className="text-[10.5px] text-tx3 tracking-[0.5px] mt-1.5 font-medium">
                      {c.numLabel}
                    </div>
                  </div>

                  {/* 規模前綴 */}
                  <div className="text-[11px] text-tx2 font-medium tracking-[0.3px] mb-2">
                    {c.scalePrefix}
                  </div>

                  <h3 className="font-sans text-[17px] leading-[1.4] mb-3 font-bold text-tx">
                    {c.title}
                  </h3>

                  {/* 痛 → 解 */}
                  <div className="space-y-2 mb-5">
                    <p className="text-[12.5px] text-tx2 leading-[1.7]">
                      <span className="text-tx3 font-medium">卡點 · </span>
                      {c.painLine}
                    </p>
                    <p className="text-[12.5px] text-tx leading-[1.7]">
                      <span className="text-gold-d font-medium">怎麼解 · </span>
                      {c.solutionLine}
                    </p>
                  </div>

                  {/* Footer: route + trust signal + CTA */}
                  <div className="mt-auto pt-4 border-t border-bd/60">
                    <div className="flex items-center justify-between gap-3 flex-wrap mb-2.5">
                      <FromToRoute from={c.route.from} to={c.route.to} />
                      <span className="text-[12px] font-medium text-tx3 group-hover:text-gold transition-colors">
                        閱讀案例 →
                      </span>
                    </div>
                    <TrustSignal text={c.trustSignal} />
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      )}

      {/* ─── Bottom CTA (cardified) ─── */}
      <div className="mt-12 md:mt-14">
        <Link
          href="/cases"
          className="group block max-w-[640px] mx-auto border border-bd hover:border-navy bg-white p-6 md:p-7 transition-all duration-300"
        >
          <div className="flex items-center justify-between gap-5 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-gold-d mb-1.5">
                看所有案例
              </div>
              <div className="text-[15px] font-semibold text-tx group-hover:text-navy transition-colors">
                4 個完整故事 · 食品 / 電子 / 服飾 / 飲品
              </div>
              <div className="text-[12px] text-tx3 mt-1">
                每個案例都附 3 個關鍵決策時刻 · 涵蓋北美與東南亞兩個主戰場
              </div>
            </div>
            <span className="text-[20px] text-navy group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
