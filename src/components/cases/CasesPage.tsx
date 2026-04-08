"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ───────── data ───────── */

const casesData = [
  {
    slug: "costco-health",
    tags: [
      { label: "食品", variant: "sky" as const },
      { label: "北美", variant: "gold" as const },
    ],
    num: "6 個月",
    title: "保健品怎麼從台灣走進北美 Costco？",
    summary:
      "從 FDA 註冊到通路談判，打進全球最大會員制零售通路。完整走過評估、測試、通路進入的每一步。",
    challenge:
      "小山羊保健品在台灣已有穩定市場，但北美市場完全陌生：FDA 註冊流程繁複、Costco 的供應商門檻極高、產品包裝與成分標示需全面合規。過去嘗試過找貿易商，但對方只處理物流，品牌在通路端完全沒有話語權。",
    approach:
      "鹿飛從市場評估開始，先確認北美保健品市場的需求缺口，再協助產品配方微調以符合 FDA 要求。同步進行包裝在地化設計，並透過既有通路關係直接對接 Costco 採購團隊。小批量測試反饋良好後，快速進入正式上架流程。",
    result:
      "從啟動到產品正式在北美 Costco 門市上架，前後僅花 6 個月。首月銷量超過預期 40%，品牌知名度在北美華人社群迅速擴散。目前已進入第二批訂單，並開始洽談加拿大 Costco。",
    stats: [
      { label: "上架時間", value: "6 個月" },
      { label: "首月超標", value: "+40%" },
      { label: "覆蓋門市", value: "120+" },
    ],
    related: ["electronics-tariff", "bubble-tea"],
  },
  {
    slug: "electronics-tariff",
    tags: [
      { label: "電子", variant: "sky" as const },
      { label: "美國", variant: "gold" as const },
    ],
    num: "-15%",
    title: "電子大廠怎麼靠產地轉移省下關稅？",
    summary: "從大陸轉越南出貨，找到中美關稅戰中的最優路徑。",
    challenge:
      "中美貿易戰讓這家電子大廠的美國出貨成本暴增，25% 的額外關稅直接吃掉利潤。工廠在大陸，客戶在美國，短期內無法完全搬遷產線，需要在成本與效率之間找到平衡。",
    approach:
      "鹿飛團隊分析了所有可行的產地轉移方案，最終建議將部分組裝線移至越南，利用 CPTPP 框架降低關稅負擔。同時重新規劃物流路線，從越南直接出貨到美國西岸港口，減少中轉環節。",
    result:
      "整體關稅成本降低 15%，物流時效反而縮短了 3 天。越南產線在 4 個月內完成設置並通過客戶驗廠。年節省成本超過 USD 200 萬。",
    stats: [
      { label: "關稅降低", value: "-15%" },
      { label: "時效縮短", value: "3 天" },
      { label: "年省成本", value: "$200萬" },
    ],
    related: ["costco-health", "shoe-brand"],
  },
  {
    slug: "shoe-brand",
    tags: [
      { label: "服飾", variant: "sky" as const },
      { label: "美國", variant: "gold" as const },
    ],
    num: "3x",
    title: "知名皮鞋品牌為什麼改賣襪子大賺？",
    summary: "分析亞馬遜數據後調整品類策略，找到高毛利藍海品項。",
    challenge:
      "這家台灣皮鞋品牌在國內市場穩定，但想進入美國市場時發現：皮鞋品類在亞馬遜上競爭極為激烈，且退貨率高達 30%。品牌投入大量行銷預算卻遲遲打不開局面。",
    approach:
      "鹿飛深入分析亞馬遜品類數據後發現，該品牌的「機能襪」搜索量高但競品少、退貨率極低。建議品牌以襪子品項作為切入點，先建立品牌認知和好評基礎，再逐步擴展到皮鞋主力品類。",
    result:
      "襪子品類上線三個月內，營收達到皮鞋品類的 3 倍，退貨率僅 2%。品牌 review 迅速累積至 4.7 星，為後續皮鞋品類上架建立了強大的品牌信任基礎。",
    stats: [
      { label: "營收成長", value: "3x" },
      { label: "退貨率", value: "2%" },
      { label: "品牌評分", value: "4.7★" },
    ],
    related: ["costco-health", "bubble-tea"],
  },
  {
    slug: "bubble-tea",
    tags: [
      { label: "飲品", variant: "sky" as const },
      { label: "東南亞", variant: "gold" as const },
    ],
    num: "10 家",
    title: "珍珠奶茶品牌怎麼在菲律賓成功落地？",
    summary: "從市場探索到門市營運，建立穩定營收基地。",
    challenge:
      "台灣珍奶品牌想進入菲律賓市場，但面臨多重挑戰：當地已有大量珍奶品牌、原物料供應鏈不穩定、加盟模式水土不服。前兩次嘗試都因為找不到合適的在地夥伴而失敗。",
    approach:
      "鹿飛先做了菲律賓珍奶市場的深度調研，發現中高端定位仍有空間。協助品牌找到可靠的在地合資夥伴，建立穩定的原物料供應鏈（珍珠從台灣直送，茶葉在地採購），並設計了適合菲律賓消費習慣的產品線。",
    result:
      "一年內成功開設 10 家門市，其中 6 家為加盟店。單店月均營收達到台灣門市的 1.2 倍，品牌在馬尼拉都會區建立了穩定的消費者基礎。",
    stats: [
      { label: "門市數", value: "10 家" },
      { label: "其中加盟", value: "6 家" },
      { label: "單店月營收", value: "1.2x" },
    ],
    related: ["costco-health", "electronics-tariff"],
  },
];

const tagStyles = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold",
};

/* ───────── detail view ───────── */

function CaseDetail({
  caseItem,
  onBack,
  onNavigate,
}: {
  caseItem: (typeof casesData)[number];
  onBack: () => void;
  onNavigate: (slug: string) => void;
}) {
  const relatedCases = casesData.filter((c) =>
    caseItem.related.includes(c.slug)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[14px] text-tx2 mb-8 cursor-pointer hover:text-tx transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        回到全部案例
      </button>

      {/* Tags */}
      <div className="flex gap-1.5 mb-4">
        {caseItem.tags.map((t) => (
          <span
            key={t.label}
            className={`text-[11px] px-2.5 py-[3px] rounded-none font-medium ${tagStyles[t.variant]}`}
          >
            {t.label}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="font-heading text-[clamp(26px,3.5vw,38px)] leading-[1.25] font-normal tracking-[-0.5px] mb-4">
        {caseItem.title}
      </h1>

      {/* Stats row */}
      <div className="flex gap-6 mb-10 flex-wrap">
        {caseItem.stats.map((s) => (
          <div key={s.label}>
            <div className="font-heading text-[32px] text-gold leading-none font-semibold">
              {s.value}
            </div>
            <div className="text-[12px] text-tx3 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Story sections */}
      <div className="space-y-8">
        <div>
          <h3 className="text-[13px] font-semibold tracking-wider text-sky uppercase mb-3">
            挑戰
          </h3>
          <p className="text-[15px] text-tx2 leading-[1.8] font-normal">
            {caseItem.challenge}
          </p>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold tracking-wider text-gold uppercase mb-3">
            怎麼做
          </h3>
          <p className="text-[15px] text-tx2 leading-[1.8] font-normal">
            {caseItem.approach}
          </p>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold tracking-wider text-ember uppercase mb-3">
            結果
          </h3>
          <p className="text-[15px] text-tx2 leading-[1.8] font-normal">
            {caseItem.result}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 md:mt-12 p-5 md:p-7 bg-cream rounded-none text-center">
        <p className="text-[15px] font-medium mb-4">
          想知道你的產品是否也有類似的機會？
        </p>
        <Link
          href="/assess"
          className="inline-block bg-gold text-navy px-7 py-3.5 rounded-none text-[15px] font-semibold transition-colors hover:bg-gold-l"
        >
          免費出海評估 →
        </Link>
      </div>

      {/* Related cases */}
      {relatedCases.length > 0 && (
        <div className="mt-14">
          <h3 className="text-[13px] font-semibold tracking-wider text-gold uppercase mb-5">
            相關案例
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedCases.map((rc) => (
              <button
                key={rc.slug}
                onClick={() => onNavigate(rc.slug)}
                className="p-6 bg-white border border-bd rounded-none text-left cursor-pointer transition-all hover:border-gold hover:shadow-lg"
              >
                <div className="flex gap-1.5 mb-2">
                  {rc.tags.map((t) => (
                    <span
                      key={t.label}
                      className={`text-[11px] px-2.5 py-[3px] rounded-none font-medium ${tagStyles[t.variant]}`}
                    >
                      {t.label}
                    </span>
                  ))}
                </div>
                <div className="font-heading text-[28px] text-gold leading-none font-semibold mb-2">
                  {rc.num}
                </div>
                <h4 className="text-[15px] font-medium leading-[1.4]">
                  {rc.title}
                </h4>
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ───────── main ───────── */

export function CasesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeSlug, setActiveSlug] = useState<string | null>(
    searchParams.get("case")
  );

  // Sync URL → state when searchParams change
  useEffect(() => {
    setActiveSlug(searchParams.get("case"));
  }, [searchParams]);

  const navigateTo = (slug: string | null) => {
    const url = slug ? `/cases?case=${slug}` : "/cases";
    router.push(url, { scroll: false });
    setActiveSlug(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeCase = casesData.find((c) => c.slug === activeSlug);

  return (
    <section className="bg-[#FAFAF8] min-h-screen pt-[100px] md:pt-[120px] pb-[60px] md:pb-[80px] px-5 md:px-10">
      <div className="max-w-[1000px] mx-auto">
        <AnimatePresence mode="wait">
          {activeCase ? (
            <CaseDetail
              key={activeCase.slug}
              caseItem={activeCase}
              onBack={() => navigateTo(null)}
              onNavigate={(slug) => navigateTo(slug)}
            />
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="section-label">案例</div>
              <h1 className="section-heading">
                這些企業都找到了自己的出海路
              </h1>
              <p className="section-desc">
                不同產業、不同市場，但都用對的方法做了對的決策。點進去看看他們怎麼做到的。
              </p>

              {/* Card wall */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {casesData.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => navigateTo(c.slug)}
                    className="group bg-white border border-bd rounded-none text-left cursor-pointer transition-all hover:border-gold hover:shadow-lg relative overflow-hidden"
                  >
                    <div className="h-[140px] overflow-hidden">
                      <img src={`/case-${c.slug === "costco-health" ? "costco" : c.slug === "electronics-tariff" ? "electronics" : c.slug === "shoe-brand" ? "shoes" : "bubbletea"}.jpg`} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-7">
                    <div className="flex gap-1.5 mb-3">
                      {c.tags.map((t) => (
                        <span
                          key={t.label}
                          className={`text-[11px] px-2.5 py-[3px] rounded-none font-medium ${tagStyles[t.variant]}`}
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>
                    <div className="font-heading text-[46px] text-gold leading-none font-semibold mb-3">
                      {c.num}
                    </div>
                    <h3 className="font-heading text-[18px] leading-[1.4] mb-2 font-normal">
                      {c.title}
                    </h3>
                    <p className="text-[13px] text-tx2 leading-[1.65] font-normal">
                      {c.summary}
                    </p>
                    <span className="absolute bottom-5 right-5 text-[14px] text-tx3 transition-colors group-hover:text-gold">
                      →
                    </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="text-center mt-12">
                <p className="text-[15px] text-tx2 font-normal mb-4">
                  想知道你的產品適合哪條路？
                </p>
                <Link
                  href="/assess"
                  className="inline-block bg-gold text-navy px-7 py-3.5 rounded-none text-[15px] font-semibold transition-colors hover:bg-gold-l"
                >
                  免費出海評估 →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
