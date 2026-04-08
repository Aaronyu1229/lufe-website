"use client";

import { useState } from "react";
import Link from "next/link";

/* ───────── data ───────── */

const categories = ["全部", "市場趨勢", "實戰指南", "法規解讀", "工具推薦"] as const;

type Category = (typeof categories)[number];

const articles = [
  {
    category: "市場趨勢" as Category,
    date: "2026-03-28",
    title: "2026 東南亞電商市場：台灣品牌的三大機會",
    summary:
      "東南亞電商市場預計在 2026 年突破 2,000 億美元。我們分析了菲律賓、越南、泰國三個市場，找到台灣品牌最有機會切入的品類和通路。",
    readTime: "8 分鐘",
    color: "sky" as const,
  },
  {
    category: "實戰指南" as Category,
    date: "2026-03-15",
    title: "第一次出海就上手：從零到上架的完整 Checklist",
    summary:
      "我們把十年來幫客戶出海的經驗濃縮成一份 Checklist。從市場評估到產品上架，每個階段該做什麼、要注意什麼，一次講清楚。",
    readTime: "12 分鐘",
    color: "gold" as const,
  },
  {
    category: "法規解讀" as Category,
    date: "2026-03-01",
    title: "美國 FDA 註冊全攻略：保健品出海必讀",
    summary:
      "想把保健品賣到美國？FDA 註冊是第一關。這篇文章完整解析註冊流程、費用、時程，以及台灣企業最常踩的五個坑。",
    readTime: "10 分鐘",
    color: "ember" as const,
  },
  {
    category: "工具推薦" as Category,
    date: "2026-02-20",
    title: "TradePilot 使用教學：三分鐘查完目標市場關稅",
    summary:
      "我們自主開發的關稅查詢工具 TradePilot，已有 2,400+ 用戶。這篇手把手教你如何用它計算出海成本，做出更精準的定價決策。",
    readTime: "5 分鐘",
    color: "sky" as const,
  },
  {
    category: "市場趨勢" as Category,
    date: "2026-02-10",
    title: "中美關稅戰下的產地轉移策略：越南還是印度？",
    summary:
      "越來越多企業考慮將產線從中國轉移。我們比較了越南和印度在成本、效率、法規上的優劣，幫你選對下一個生產基地。",
    readTime: "9 分鐘",
    color: "sky" as const,
  },
  {
    category: "實戰指南" as Category,
    date: "2026-01-25",
    title: "亞馬遜品類分析：如何找到你的藍海品項",
    summary:
      "在亞馬遜上賣什麼比怎麼賣更重要。這篇分享我們幫客戶做品類分析的方法論，以及如何用數據找到高毛利、低競爭的品項。",
    readTime: "11 分鐘",
    color: "gold" as const,
  },
];

const colorMap: Record<string, string> = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold",
  ember: "bg-[rgba(217,139,74,0.08)] text-ember",
};

const categoryColorMap: Record<string, string> = {
  "市場趨勢": "sky",
  "實戰指南": "gold",
  "法規解讀": "ember",
  "工具推薦": "sky",
};

/* ───────── component ───────── */

export function InsightsPage() {
  const [active, setActive] = useState<Category>("全部");

  const filtered =
    active === "全部"
      ? articles
      : articles.filter((a) => a.category === active);

  return (
    <section className="bg-[#FAFAF8] min-h-screen pt-[120px] pb-[80px] px-5 md:px-10">
      <div className="max-w-[1000px] mx-auto">
        <div className="section-label">洞察與資源</div>
        <h1 className="section-heading">出海路上，知識就是捷徑</h1>
        <p className="section-desc">
          市場趨勢、實戰經驗、法規解讀——幫你用最少的時間搞懂出海。
        </p>

        {/* Category chips */}
        <div className="flex gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2.5 rounded-none text-[13px] font-medium cursor-pointer transition-all ${
                active === cat
                  ? "bg-navy text-white"
                  : "bg-white text-tx2 border border-bd hover:border-tx"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((article) => (
            <div
              key={article.title}
              className="group bg-white rounded-none border border-bd overflow-hidden transition-all hover:border-gold hover:shadow-lg cursor-pointer"
            >
              {/* Cover image */}
              <div className="h-[160px] overflow-hidden">
                <img
                  src={article.title.includes("東南亞") || article.title.includes("產地轉移") ? "/insight-sea.jpg" : article.title.includes("Checklist") || article.title.includes("亞馬遜") ? "/insight-checklist.jpg" : "/insight-fda.jpg"}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-[11px] px-2.5 py-[3px] rounded-none font-medium ${colorMap[article.color]}`}
                  >
                    {article.category}
                  </span>
                  <span className="text-[11px] text-tx3">{article.readTime}</span>
                </div>
                <h3 className="text-[16px] font-semibold leading-[1.5] mb-2 group-hover:text-gold transition-colors">
                  {article.title}
                </h3>
                <p className="text-[13px] text-tx2 leading-[1.7] font-normal line-clamp-3">
                  {article.summary}
                </p>
                <div className="mt-4 text-[12px] text-tx3">{article.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-tx3 text-[14px]">
            這個分類暫時還沒有文章，敬請期待！
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-14 p-8 bg-white rounded-none border border-bd text-center">
          <h3 className="text-[18px] font-medium mb-2">
            看完文章，想知道你的產品適不適合出海？
          </h3>
          <p className="text-[14px] text-tx2 font-normal mb-5">
            兩分鐘免費評估，找到你的出海起點。
          </p>
          <Link
            href="/assess"
            className="inline-block bg-gold text-navy px-7 py-3.5 rounded-none text-[15px] font-semibold transition-colors hover:bg-gold-l"
          >
            免費出海評估 →
          </Link>
        </div>
      </div>
    </section>
  );
}
