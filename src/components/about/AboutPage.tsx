"use client";

import { useMessageBox } from "../MessageBox";

/* ───────── data ───────── */

const networkCards = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="8" width="24" height="16" rx="3" stroke="#D4A85C" strokeWidth="1.5" />
        <path d="M4 13H28" stroke="#D4A85C" strokeWidth="1.5" />
        <circle cx="8" cy="20" r="1.5" fill="#D4A85C" />
        <rect x="18" y="18" width="6" height="3" rx="1" stroke="#D4A85C" strokeWidth="1" />
      </svg>
    ),
    title: "北美通路",
    desc: "與 Costco、Walmart、Amazon 等主流通路的直接合作關係，幫你省去一層層中間人。",
    color: "gold" as const,
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="12" r="4" stroke="#5B8FA8" strokeWidth="1.5" />
        <path d="M8 26C8 21.5817 11.5817 18 16 18C20.4183 18 24 21.5817 24 26" stroke="#5B8FA8" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="10" r="2.5" stroke="#5B8FA8" strokeWidth="1" />
        <circle cx="8" cy="10" r="2.5" stroke="#5B8FA8" strokeWidth="1" />
      </svg>
    ),
    title: "東南亞團隊",
    desc: "菲律賓、越南、泰國在地夥伴，從法規到營運都有人幫你搞定，不用自己摸索。",
    color: "sky" as const,
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="14" width="10" height="12" rx="1" stroke="#D4A85C" strokeWidth="1.5" />
        <rect x="16" y="8" width="10" height="18" rx="1" stroke="#D4A85C" strokeWidth="1.5" />
        <path d="M9 18H13M9 21H13" stroke="#D4A85C" strokeWidth="1" strokeLinecap="round" />
        <path d="M19 12H23M19 15H23M19 18H23" stroke="#D4A85C" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    title: "國際物流",
    desc: "覆蓋 30+ 國家的物流網絡，從報關、倉儲到最後一哩配送，全程可追蹤。",
    color: "gold" as const,
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="6" width="20" height="20" rx="4" stroke="#D98B4A" strokeWidth="1.5" />
        <path d="M12 16L15 19L21 13" stroke="#D98B4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "科技工具",
    desc: "自主開發的 TradePilot 關稅查詢工具，2,400+ 用戶使用中。用科技降低出海的資訊門檻。",
    color: "ember" as const,
  },
];

const colorMap: Record<string, { border: string; iconBg: string }> = {
  gold: { border: "hover:border-gold", iconBg: "bg-[rgba(212,168,92,0.08)]" },
  sky: { border: "hover:border-sky", iconBg: "bg-[rgba(91,143,168,0.08)]" },
  ember: { border: "hover:border-ember", iconBg: "bg-[rgba(217,139,74,0.08)]" },
};

const beliefs = [
  {
    title: "好產品值得被世界看見",
    desc: "台灣有太多好產品，只是缺一條順暢的出海路。我們的工作就是幫你找到那條路。",
  },
  {
    title: "全程陪跑，不只做其中一段",
    desc: "從評估到落地，你不需要找三家公司才能走完一條路。一個團隊，一條線，全程搞定。",
  },
  {
    title: "用數據做決策，不靠猜",
    desc: "每一步都有數據支撐。我們不會叫你「先試試看」，而是先幫你搞清楚值不值得試。",
  },
];

/* ───────── component ───────── */

export function AboutPage() {
  const { open } = useMessageBox();

  return (
    <>
      {/* ─── Founder Story ─── */}
      <section className="bg-navy text-white pt-[120px] pb-[80px] px-5 md:px-10">
        <div className="max-w-[900px] mx-auto">
          <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold mb-3">
            關於我們
          </div>
          <h1 className="font-heading text-[clamp(28px,3.5vw,42px)] leading-[1.2] font-light tracking-[-0.5px] mb-10">
            每個出海的企業
            <br />
            <span className="font-light text-gold">都值得一個懂路的人</span>
          </h1>

          {/* Avatar + Name */}
          <div className="flex items-center gap-6 mb-10 border-l-4 border-gold pl-6 py-2">
            <div className="w-[88px] h-[88px] rounded-none bg-gradient-to-br from-gold to-[#C49545] flex items-center justify-center text-navy text-[28px] font-heading font-semibold shrink-0 shadow-lg shadow-gold/20">
              AY
            </div>
            <div>
              <div className="text-[20px] font-semibold">Aaron Yu</div>
              <div className="text-[14px] text-gold font-medium">
                鹿飛 LUFÉ 創辦人
              </div>
              <div className="text-[12px] text-white/50 font-normal mt-1">
                十年國際物流實戰・500+ 出口案件・30+ 國家覆蓋
              </div>
            </div>
          </div>

          {/* Story: 3 parts */}
          <div className="space-y-8">
            {/* 看到問題 */}
            <div>
              <h3 className="text-[13px] font-semibold tracking-wider text-gold uppercase mb-3">
                看到的問題
              </h3>
              <p className="text-[15px] text-white/70 leading-[1.9] font-normal">
                在國際物流業打滾十年，我看到太多好產品倒在出海路上——不是產品不好，是沒人幫他們把路走通。
                找顧問只做評估、找貿易商只管買賣、找物流公司只跑運輸。每一段都有人做，但沒有人幫你串起來。
                企業自己得當專案經理，在三四家公司之間來回溝通，效率極低，成本極高。
              </p>
            </div>

            {/* 相信什麼 */}
            <div>
              <h3 className="text-[13px] font-semibold tracking-wider text-gold uppercase mb-3">
                相信的事
              </h3>
              <p className="text-[15px] text-white/70 leading-[1.9] font-normal">
                我相信每一家有好產品的台灣公司，都值得試試看出海。不是每個產品都適合，但至少應該有人幫你搞清楚。
                出海不應該是一場冒險，而應該是一次有計畫的探索。有人帶路，風險就小了一半。
              </p>
            </div>

            {/* 做了什麼 */}
            <div>
              <h3 className="text-[13px] font-semibold tracking-wider text-gold uppercase mb-3">
                做了什麼
              </h3>
              <p className="text-[15px] text-white/70 leading-[1.9] font-normal">
                所以我創立了鹿飛——一個企業出海的導航系統。結合十年物流實戰經驗和科技工具，
                從市場評估、產品測試、通路進入到落地營運，提供一條龍的出海服務。
                不是做其中一段，而是陪你走完全程。別人幫你開車，我們幫你找路。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Resource Network ─── */}
      <section className="bg-white py-[80px] px-5 md:px-10">
        <div className="max-w-[900px] mx-auto">
          <div className="section-label">資源網絡</div>
          <h2 className="section-heading">
            你不只是找到一家公司
            <br />
            而是接上一整個網絡
          </h2>
          <p className="section-desc">
            十年累積的通路關係、在地夥伴和科技工具，全部為你的出海服務。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {networkCards.map((card) => {
              const c = colorMap[card.color];
              return (
                <div
                  key={card.title}
                  className={`p-7 bg-white rounded-none shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all hover:shadow-lg ${c.border}`}
                >
                  <div
                    className={`w-14 h-14 rounded-none ${c.iconBg} flex items-center justify-center mb-4`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-[17px] font-semibold mb-2">{card.title}</h3>
                  <p className="text-[14px] text-tx2 font-normal leading-[1.7]">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Brand Philosophy ─── */}
      <section className="bg-white py-[80px] px-5 md:px-10">
        <div className="max-w-[900px] mx-auto">
          <div className="section-label">品牌理念</div>
          <h2 className="section-heading mb-10">我們相信的事</h2>

          <div className="space-y-6">
            {beliefs.map((item, i) => (
              <div
                key={item.title}
                className="flex gap-5 items-start p-6 rounded-none bg-cream"
              >
                <div className="w-8 h-8 rounded-none bg-gold flex items-center justify-center text-navy text-[14px] font-heading font-semibold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-tx2 font-normal leading-[1.7]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 text-center">
            <h3 className="text-[18px] font-medium mb-2">
              想認識我們？聊聊你的出海計畫
            </h3>
            <p className="text-[14px] text-tx2 font-normal mb-6">
              不確定該不該出海？先聊聊，不收費。
            </p>
            <button
              onClick={open}
              className="bg-gold text-navy px-7 py-3.5 rounded-none text-[15px] font-semibold cursor-pointer transition-colors hover:bg-cream-d"
            >
              聊聊你的產品
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
