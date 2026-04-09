"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMessageBox } from "../MessageBox";

/* ───────── data ───────── */

const stages = [
  {
    num: "01",
    color: "sky" as const,
    title: "搞清楚值不值得出去",
    timeline: "2-4 週",
    subtitle: "市場評估",
    desc: "在你花大錢之前，先花小錢搞清楚。",
    items: [
      "目標市場需求分析（消費者行為、競品、法規）",
      "產品定位與差異化策略",
      "價格帶分析與利潤結構估算",
      "進入門檻評估（認證、關稅、合規）",
      "Go / No-Go 建議報告",
    ],
    deliverable: "一份清楚告訴你「值不值得去」的評估報告",
  },
  {
    num: "02",
    color: "sky" as const,
    title: "用真實數據驗證你的直覺",
    timeline: "4-6 週",
    subtitle: "產品測試",
    desc: "小批量投放，讓市場幫你回答。",
    items: [
      "測試市場選擇與通路規劃",
      "小批量產品寄送與鋪貨",
      "消費者反饋收集與分析",
      "定價策略微調",
      "測試期銷售數據追蹤",
    ],
    deliverable: "一組真實的市場反饋數據，而不是猜測",
  },
  {
    num: "03",
    color: "gold" as const,
    title: "讓市場告訴你答案",
    timeline: "2-3 個月",
    subtitle: "通路進入",
    desc: "從試水溫到正式上架，一步步走穩。",
    items: [
      "通路商談判與合約簽訂",
      "產品合規與認證協助",
      "包裝與標示在地化",
      "首批正式訂單執行",
      "物流與倉儲方案落實",
    ],
    deliverable: "產品正式上架海外通路",
  },
  {
    num: "04",
    color: "ember" as const,
    title: "從試水溫到真正扎根",
    timeline: "持續",
    subtitle: "落地營運",
    desc: "不只是賣出去，還要站穩腳步。",
    items: [
      "在地團隊建立與管理",
      "行銷與品牌推廣策略",
      "供應鏈持續優化",
      "客戶服務與售後體系",
      "擴展到更多通路與市場",
    ],
    deliverable: "一個可持續的海外營運體系",
  },
];

const faqData = [
  {
    q: "出海前需要準備多少資金？",
    a: "取決於你的產品類型和目標市場。一般來說，初步評估階段的投入不大（幾萬到十幾萬台幣），測試階段可能需要 50-100 萬。我們會在評估報告中給出具體的預算建議，幫你在每個階段做最有效率的投資。",
  },
  {
    q: "我的產品適不適合出海？",
    a: "大多數有品質優勢的台灣產品都有出海機會。關鍵是找到對的市場和對的方式。我們的免費評估工具可以在兩分鐘內給你初步方向，或者直接跟我們聊聊，不收費。",
  },
  {
    q: "從開始到產品上架要多久？",
    a: "平均 6-9 個月，取決於產品類型和目標市場的認證要求。食品和保健品可能需要更長的認證時間，而消費電子產品可能較快。我們會在評估階段給出明確的時間表。",
  },
  {
    q: "鹿飛跟傳統貿易商有什麼不同？",
    a: "傳統貿易商通常只做買賣——幫你找到買家，賺取中間價差。鹿飛做的是全程導航：從市場評估、產品測試、通路進入到落地營運，我們陪你走完全程，而且我們不賺價差，我們賺的是讓你的品牌在海外建立起來的服務費。",
  },
  {
    q: "如果評估結果顯示不適合出海怎麼辦？",
    a: "那就是最好的結果之一——你省下了大量的時間和金錢。我們的評估報告會告訴你具體原因，以及如果未來條件改變，什麼時候可以再考慮。有時候「現在不適合」只是「換個方式更好」。",
  },
];

const optimizeServices = [
  {
    title: "出海效率診斷",
    desc: "全面檢視你的出海流程，找出效率瓶頸",
    timeline: "2-3 週",
    items: [
      "供應鏈與物流效率分析",
      "通路績效評估",
      "成本結構優化建議",
      "合規風險盤點",
    ],
  },
  {
    title: "營運優化方案",
    desc: "針對診斷結果，執行具體的改善計畫",
    timeline: "1-3 個月",
    items: [
      "物流路線重新規劃",
      "倉儲方案優化",
      "通路結構調整",
      "行銷策略升級",
    ],
  },
];

/* ───────── color map ───────── */

const colorMap: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  sky: {
    border: "border-sky",
    bg: "bg-[rgba(91,143,168,0.08)]",
    text: "text-sky",
    dot: "bg-sky",
  },
  gold: {
    border: "border-gold",
    bg: "bg-[rgba(212,168,92,0.08)]",
    text: "text-gold",
    dot: "bg-gold",
  },
  ember: {
    border: "border-ember",
    bg: "bg-[rgba(217,139,74,0.08)]",
    text: "text-ember",
    dot: "bg-ember",
  },
};

/* ───────── components ───────── */

function StageCard({
  stage,
  isOpen,
  onToggle,
}: {
  stage: (typeof stages)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const c = colorMap[stage.color];
  return (
    <div className={`border-l-4 ${c.border} bg-white rounded-none p-7 md:p-9 transition-colors hover:border-gold`}>
      {/* header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-[13px] font-semibold ${c.text} tracking-wider`}>
              STAGE {stage.num}
            </span>
            <span className="text-[12px] text-tx3 font-normal">
              {stage.timeline}
            </span>
          </div>
          <h3 className="font-heading text-[clamp(20px,2.5vw,26px)] leading-[1.3] font-bold tracking-[-0.3px] mb-1">
            {stage.title}
          </h3>
          <p className="text-[14px] text-tx2 font-normal">{stage.desc}</p>
        </div>
        <button
          onClick={onToggle}
          className="mt-1 w-11 h-11 rounded-none border border-bd flex items-center justify-center transition-colors hover:bg-cream shrink-0 cursor-pointer"
          aria-label={isOpen ? "收合" : "展開"}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          >
            <path d="M3 5.5L7 9.5L11 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* expandable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-bd">
              <ul className="space-y-3 mb-5">
                {stage.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] text-tx2">
                    <span className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-[7px] shrink-0`} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={`${c.bg} rounded-none px-5 py-4`}>
                <span className="text-[12px] font-semibold tracking-wider text-tx3 uppercase">
                  交付成果
                </span>
                <p className={`text-[14px] font-medium mt-1 ${c.text}`}>
                  {stage.deliverable}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQItem({ item, isOpen, onToggle }: { item: (typeof faqData)[number]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-bd">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
      >
        <span className="text-[15px] font-medium pr-4">{item.q}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[14px] text-tx2 leading-[1.8] font-normal">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────── main ───────── */

export function ServicesPage() {
  const { open } = useMessageBox();
  const [openStages, setOpenStages] = useState<Set<number>>(new Set([0]));
  const [openFAQ, setOpenFAQ] = useState<Set<number>>(new Set());

  const toggleStage = (i: number) => {
    setOpenStages((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const toggleFAQ = (i: number) => {
    setOpenFAQ((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <>
      {/* ─── Hero / Why section ─── */}
      <section className="bg-white pt-[100px] md:pt-[120px] pb-[60px] md:pb-[80px] px-5 md:px-10">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="section-label">服務</div>
          <h1 className="section-heading">
            出海不難，難的是沒人告訴你
            <br />
            <span className="font-light text-gold">完整的路怎麼走</span>
          </h1>
          <p className="section-desc mx-auto text-center">
            我們不只做其中一段，而是從評估到落地，幫你把整條路串起來。
          </p>

          {/* Two entry cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[720px] mx-auto mt-8">
            {/* Card A */}
            <a
              href="#path"
              className="group block p-7 bg-white rounded-none border-l-4 border-sky text-left transition-colors hover:border-gold"
            >
              <div className="w-12 h-12 rounded-none bg-[rgba(91,143,168,0.1)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L12 22M12 2L6 8M12 2L18 8" stroke="#5B8FA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-[17px] font-semibold mb-1.5">從零開始出海</h3>
              <p className="text-[13px] text-tx2 font-normal leading-[1.6] mb-3">
                還沒出過海？我們帶你從評估走到上架。
              </p>
              <span className="text-[13px] font-semibold text-sky group-hover:translate-x-1 transition-transform inline-block">
                看完整出海路徑 →
              </span>
            </a>

            {/* Card B */}
            <a
              href="#optimize"
              className="group block p-7 bg-white rounded-none border-l-4 border-ember text-left transition-colors hover:border-gold"
            >
              <div className="w-12 h-12 rounded-none bg-[rgba(217,139,74,0.1)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#D98B4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-[17px] font-semibold mb-1.5">讓出海跑得更好</h3>
              <p className="text-[13px] text-tx2 font-normal leading-[1.6] mb-3">
                已經在海外？我們幫你優化效率、降低成本。
              </p>
              <span className="text-[13px] font-semibold text-ember group-hover:translate-x-1 transition-transform inline-block">
                看進階優化方案 →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Sticky page nav */}
      <div className="sticky top-[64px] z-40 bg-white/95 backdrop-blur-md border-b border-bd">
        <div className="max-w-[900px] mx-auto px-5 md:px-10 flex gap-6 overflow-x-auto">
          <a href="#path" className="py-3.5 text-[13px] font-medium text-tx2 hover:text-navy border-b-2 border-transparent hover:border-gold transition-all whitespace-nowrap">
            完整路徑
          </a>
          <a href="#faq" className="py-3.5 text-[13px] font-medium text-tx2 hover:text-navy border-b-2 border-transparent hover:border-gold transition-all whitespace-nowrap">
            常見問題
          </a>
          <a href="#optimize" className="py-3.5 text-[13px] font-medium text-tx2 hover:text-navy border-b-2 border-transparent hover:border-gold transition-all whitespace-nowrap">
            進階優化
          </a>
        </div>
      </div>

      {/* ─── Full Path Section ─── */}
      <section id="path" className="bg-white py-[80px] px-5 md:px-10 scroll-mt-[120px]">
        <div className="max-w-[900px] mx-auto">
          <div className="section-label">完整路徑</div>
          <h2 className="section-heading">四個階段，一條完整的出海路</h2>
          <p className="section-desc">
            每個階段都有明確的目標和交付成果。你不用猜下一步，我們陪你走。
          </p>

          {/* Timeline */}
          <div className="space-y-5">
            {stages.map((stage, i) => (
              <StageCard
                key={stage.num}
                stage={stage}
                isOpen={openStages.has(i)}
                onToggle={() => toggleStage(i)}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 text-center">
            <h3 className="text-[18px] font-medium mb-2">
              想知道你的產品適合從哪個階段開始？
            </h3>
            <p className="text-[14px] text-tx2 font-normal mb-6">
              聊聊你的狀況，我們幫你規劃最適合的路徑。
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <button
                onClick={open}
                className="bg-gold text-navy px-7 py-3.5 rounded-none text-[15px] font-semibold cursor-pointer transition-colors hover:bg-cream-d"
              >
                聊聊你的產品
              </button>
              <button
                onClick={() => {
                  const email = prompt("輸入你的 Email，我們會寄出海指南 PDF 給你：");
                  if (email) alert(`感謝！我們會將出海指南寄到 ${email}`);
                }}
                className="px-7 py-[13px] border border-bd bg-white text-tx rounded-none text-[14px] font-medium cursor-pointer transition-colors duration-300 hover:border-tx"
              >
                下載出海指南 PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="bg-white py-[80px] md:py-[120px] px-5 md:px-10 scroll-mt-[120px]">
        <div className="max-w-[700px] mx-auto">
          <div className="section-label">常見問題</div>
          <h2 className="section-heading mb-8">你可能會想知道</h2>
          <div>
            {faqData.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openFAQ.has(i)}
                onToggle={() => toggleFAQ(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Optimize Section ─── */}
      <section id="optimize" className="bg-white py-[80px] px-5 md:px-10 scroll-mt-[120px]">
        <div className="max-w-[900px] mx-auto">
          <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-ember mb-3">
            進階優化
          </div>
          <h2 className="section-heading">
            已經在海外了，但總覺得
            <br />
            <span className="font-light text-ember">可以做得更好？</span>
          </h2>

          {/* Pain point questions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-12">
            {[
              { icon: "📦", q: "物流成本太高，利潤被吃掉？" },
              { icon: "📉", q: "通路表現不穩，銷量起伏大？" },
              { icon: "⚙️", q: "營運流程卡卡，效率上不去？" },
            ].map((item) => (
              <div
                key={item.q}
                className="p-5 rounded-none bg-[rgba(217,139,74,0.04)] border border-[rgba(217,139,74,0.1)] text-center"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-[14px] font-medium leading-[1.6]">{item.q}</p>
              </div>
            ))}
          </div>

          {/* Two services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {optimizeServices.map((svc) => (
              <div
                key={svc.title}
                className="p-7 bg-white rounded-none border border-[rgba(217,139,74,0.15)] transition-colors hover:border-gold"
              >
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-[17px] font-semibold">{svc.title}</h3>
                  <span className="text-[12px] text-ember font-medium bg-[rgba(217,139,74,0.08)] px-2.5 py-0.5 rounded-none">
                    {svc.timeline}
                  </span>
                </div>
                <p className="text-[14px] text-tx2 font-normal mb-4">{svc.desc}</p>
                <ul className="space-y-2">
                  {svc.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[13px] text-tx2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ember mt-[6px] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-[18px] font-medium mb-2">
              想知道你的出海效率能提升多少？
            </h3>
            <p className="text-[14px] text-tx2 font-normal mb-6">
              預約 60 分鐘深度診斷，我們幫你找到最值得優化的環節。
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <button
                onClick={() => window.open("https://calendly.com", "_blank")}
                className="bg-ember text-white px-7 py-3.5 rounded-none text-[15px] font-semibold cursor-pointer transition-colors hover:bg-cream-d"
              >
                預約 60 分鐘診斷
              </button>
              <button
                onClick={open}
                className="px-7 py-[13px] border border-bd bg-white text-tx rounded-none text-[14px] font-medium cursor-pointer transition-colors duration-300 hover:border-tx"
              >
                先用訊息聊聊
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
