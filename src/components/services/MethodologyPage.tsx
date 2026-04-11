"use client";

import Link from "next/link";
import { useMessageBox } from "../MessageBox";

/**
 * MethodologyPage — the intellectual-authority page.
 * Spells out LUFÉ's Go/No-Go framework, scoring matrix, and red-flag rules.
 * Purpose: shift perception from "experienced consultancy" to "consultancy with IP."
 */

const dimensions = [
  {
    code: "M",
    name: "Market",
    question: "這個市場夠大嗎？",
    weight: "20%",
    criteria: [
      "目標品類的可觸達市場規模（TAM / SAM）",
      "年複合成長率（CAGR）",
      "消費者支付意願（ARPU）",
      "市場成熟度曲線位置",
    ],
    redAt: "若 SAM < 預估年營收的 20 倍，我們會建議換市場。",
  },
  {
    code: "B",
    name: "Barrier",
    question: "進去的門檻有多高？",
    weight: "20%",
    criteria: [
      "認證要求與成本",
      "通路進入難度（是否需要特殊關係）",
      "在地化改造成本（包裝、配方、標示）",
      "合規風險與灰色地帶",
    ],
    redAt: "若合規認證成本 > 預估首年毛利的 50%，直接 No-Go。",
  },
  {
    code: "C",
    name: "Competition",
    question: "你打得過嗎？",
    weight: "20%",
    criteria: [
      "前 10 大品牌的市佔集中度",
      "競品的品牌護城河深度",
      "競品的弱點（哪些客戶抱怨無人回應）",
      "價格戰的可能性",
    ],
    redAt: "若 CR3（前 3 名市佔總和）> 70%，正面競爭我們不做。",
  },
  {
    code: "P",
    name: "Profitability",
    question: "做得動嗎？",
    weight: "25%",
    criteria: [
      "到岸成本（FOB + 關稅 + 物流 + 保險）",
      "通路佣金與行銷攤提",
      "退貨 / 換貨預估",
      "外幣波動風險",
    ],
    redAt: "若悲觀情境下淨利率 < 5%，我們會建議回頭調整產品或定價。",
  },
  {
    code: "R",
    name: "Regulatory",
    question: "法規會不會突然改變？",
    weight: "15%",
    criteria: [
      "當地貿易政策穩定度",
      "產品類別的法規變動歷史",
      "政治風險與突發事件",
      "退出成本（如果一年後想撤）",
    ],
    redAt: "若該產品類別在目標市場過去 3 年曾被禁或大幅加稅，風險加權。",
  },
];

const decisionTree = [
  {
    score: "≥ 75",
    verdict: "Go",
    color: "emerald",
    advice: "可以進，建議正常執行四階段路徑。",
  },
  {
    score: "60–74",
    verdict: "Conditional Go",
    color: "amber",
    advice: "可以進，但需要先解決某 1–2 個弱項（通常是 Barrier 或 Profitability）。",
  },
  {
    score: "45–59",
    verdict: "Hold",
    color: "orange",
    advice: "建議暫緩 6–12 個月，等市場、法規或你的產品本身發生某個關鍵變化再重估。",
  },
  {
    score: "< 45",
    verdict: "No-Go",
    color: "red",
    advice: "直接不建議。我們會給出下次可以重新考慮的具體條件。",
  },
];

const workedExample = {
  caseName: "保健品 → 北美 Costco（真實案例）",
  scores: [
    { dim: "Market", score: 82, note: "北美保健品市場 $600B+，年增 5.2%" },
    { dim: "Barrier", score: 62, note: "FDA 註冊成本可控，Costco 關係是關鍵" },
    { dim: "Competition", score: 71, note: "CR3 約 45%，中位集中度" },
    { dim: "Profitability", score: 78, note: "毛利空間充足，但需承受 Costco 條款" },
    { dim: "Regulatory", score: 80, note: "北美法規穩定，風險低" },
  ],
  weighted: 74,
  verdict: "Conditional Go",
  condition: "前提是配方需微調符合北美口感偏好（Barrier 弱項需先解決）",
  outcome: "實際執行後 6 個月上架，首月銷量超標 40%。",
};

export function MethodologyPage() {
  const { open } = useMessageBox();

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-navy pt-[140px] md:pt-[180px] pb-[80px] md:pb-[100px] px-5 md:px-10 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(212,168,92,0.12) 0%, rgba(212,168,92,0.02) 40%, transparent 70%)",
          }}
        />

        <div className="relative max-w-[1000px] mx-auto">
          <nav className="flex items-center gap-2 text-[12px] text-white/50 mb-6">
            <Link href="/services" className="hover:text-white transition-colors">
              服務
            </Link>
            <span>/</span>
            <span className="text-white/80">方法論</span>
          </nav>

          <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold mb-3">
            鹿飛方法論
          </div>
          <h1 className="font-heading text-[clamp(32px,5vw,56px)] text-white leading-[1.1] font-light tracking-[-0.8px] mb-5">
            我們怎麼判斷
            <br />
            <span className="text-gold font-normal">值不值得去</span>
          </h1>
          <p className="text-[17px] md:text-[19px] text-white/75 max-w-[720px] leading-[1.6] font-light">
            這頁不是行銷文案，是我們實際用來替每個客戶做 Go / No-Go 決策的框架。
            如果你想了解顧問公司背後的判斷邏輯，而不是只看結論，這頁就是為你寫的。
          </p>
        </div>
      </section>

      {/* ─── Framework intro ─── */}
      <section className="bg-white py-[80px] md:py-[100px] px-5 md:px-10">
        <div className="max-w-[900px] mx-auto">
          <div className="section-label">框架全貌</div>
          <h2 className="section-heading">
            MBCPR 五維評分
          </h2>
          <p className="section-desc">
            每個案子我們都會從五個維度打分，每個維度有各自的權重與紅線。
            加權後的總分直接決定 Go / No-Go。
          </p>

          <div className="grid grid-cols-5 gap-2 md:gap-4 mt-10 mb-3">
            {dimensions.map((d) => (
              <div key={d.code} className="text-center">
                <div className="w-14 h-14 md:w-20 md:h-20 mx-auto bg-gold/10 border-2 border-gold/40 rounded-none flex items-center justify-center text-gold font-heading text-[22px] md:text-[32px] font-semibold mb-2">
                  {d.code}
                </div>
                <div className="text-[11px] md:text-[13px] font-semibold text-tx">
                  {d.name}
                </div>
                <div className="text-[10px] md:text-[11px] text-gold font-medium mt-0.5">
                  {d.weight}
                </div>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-tx3 text-center tracking-wider">
            MARKET · BARRIER · COMPETITION · PROFITABILITY · REGULATORY
          </div>
        </div>
      </section>

      {/* ─── Dimension detail ─── */}
      <section className="bg-cream py-[80px] md:py-[100px] px-5 md:px-10">
        <div className="max-w-[900px] mx-auto">
          <div className="section-label">每個維度詳解</div>
          <h2 className="section-heading">
            具體評的是什麼
          </h2>

          <div className="space-y-5 mt-10">
            {dimensions.map((d) => (
              <div
                key={d.code}
                className="bg-white p-6 md:p-8 border-l-4 border-gold/40"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gold/10 border-2 border-gold/40 rounded-none flex items-center justify-center text-gold font-heading text-[22px] font-semibold shrink-0">
                    {d.code}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                      <h3 className="text-[19px] md:text-[21px] font-semibold">
                        {d.name}
                      </h3>
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-gold bg-gold/10 px-2 py-0.5">
                        權重 {d.weight}
                      </span>
                    </div>
                    <p className="text-[15px] text-tx2 italic mb-4">
                      「{d.question}」
                    </p>
                    <div className="mb-4">
                      <div className="text-[10.5px] font-semibold tracking-[1px] uppercase text-tx3 mb-2">
                        評分依據
                      </div>
                      <ul className="space-y-1.5">
                        {d.criteria.map((cr) => (
                          <li
                            key={cr}
                            className="flex items-start gap-2.5 text-[13.5px] text-tx2 leading-[1.65]"
                          >
                            <span className="w-1 h-1 rounded-full bg-gold/60 mt-[9px] shrink-0" />
                            {cr}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 border-t border-red-200/60 bg-red-50/40 -mx-6 md:-mx-8 px-6 md:px-8 pb-1 -mb-6 md:-mb-8 mt-4">
                      <div className="text-[10.5px] font-semibold tracking-[1px] uppercase text-red-600/80 mb-1 mt-3">
                        紅線
                      </div>
                      <p className="text-[13px] text-red-700/90 leading-[1.65] pb-4">
                        {d.redAt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Decision Tree ─── */}
      <section className="bg-white py-[80px] md:py-[100px] px-5 md:px-10">
        <div className="max-w-[900px] mx-auto">
          <div className="section-label">決策樹</div>
          <h2 className="section-heading">
            加權總分 → 決策
          </h2>
          <p className="section-desc">
            五個維度的加權平均直接對應到四種結論。我們不玩「都有機會」的話術。
          </p>

          <div className="space-y-4 mt-10">
            {decisionTree.map((d) => {
              const colorMap: Record<string, string> = {
                emerald:
                  "border-l-emerald-500 bg-emerald-50/50 text-emerald-800",
                amber: "border-l-amber-500 bg-amber-50/50 text-amber-800",
                orange: "border-l-orange-500 bg-orange-50/50 text-orange-800",
                red: "border-l-red-500 bg-red-50/50 text-red-800",
              };
              return (
                <div
                  key={d.verdict}
                  className={`p-5 md:p-6 border-l-4 ${colorMap[d.color]}`}
                >
                  <div className="flex items-start gap-4 flex-wrap md:flex-nowrap">
                    <div className="min-w-[100px]">
                      <div className="text-[11px] font-semibold tracking-[1.5px] uppercase opacity-70 mb-0.5">
                        總分
                      </div>
                      <div className="font-heading text-[22px] font-semibold tabular-nums">
                        {d.score}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[17px] font-semibold mb-1.5">
                        {d.verdict}
                      </h3>
                      <p className="text-[13.5px] leading-[1.7] opacity-90">
                        {d.advice}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Worked Example ─── */}
      <section className="bg-navy py-[80px] md:py-[100px] px-5 md:px-10">
        <div className="max-w-[900px] mx-auto">
          <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold mb-3">
            實戰範例
          </div>
          <h2 className="font-sans text-[clamp(26px,3.2vw,40px)] text-white leading-[1.2] font-light tracking-[-0.5px] mb-3">
            這套框架跑一次<span className="text-gold font-normal">長什麼樣</span>
          </h2>
          <p className="text-[15px] text-white/60 leading-[1.7] mb-10 max-w-[620px]">
            下面是我們跑「{workedExample.caseName}」時的實際評分表。
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-none p-6 md:p-8 mb-8">
            <div className="space-y-4 mb-6">
              {workedExample.scores.map((s) => (
                <div
                  key={s.dim}
                  className="grid grid-cols-[80px_1fr_60px] gap-4 items-center"
                >
                  <div className="text-[12px] font-semibold text-gold tracking-wider uppercase">
                    {s.dim}
                  </div>
                  <div>
                    <div className="h-2 bg-white/5 relative overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gold/40 to-gold"
                        style={{ width: `${s.score}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-white/50 mt-1.5">
                      {s.note}
                    </div>
                  </div>
                  <div className="font-sans text-[20px] text-white font-light tabular-nums text-right">
                    {s.score}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="flex items-baseline justify-between mb-3 gap-4 flex-wrap">
                <div>
                  <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-white/50 mb-0.5">
                    加權總分
                  </div>
                  <div className="font-heading text-[40px] text-gold font-semibold tabular-nums leading-none">
                    {workedExample.weighted}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-white/50 mb-0.5">
                    結論
                  </div>
                  <div className="text-[20px] text-amber-400 font-semibold">
                    {workedExample.verdict}
                  </div>
                </div>
              </div>
              <p className="text-[14px] text-white/70 leading-[1.7] mt-4">
                <span className="text-gold font-semibold">條件：</span>
                {workedExample.condition}
              </p>
              <p className="text-[14px] text-white/70 leading-[1.7] mt-2">
                <span className="text-gold font-semibold">實際結果：</span>
                {workedExample.outcome}
              </p>
            </div>
          </div>

          <Link
            href="/cases/costco-health"
            className="group inline-flex items-center gap-2 text-gold text-[14px] font-semibold transition-colors hover:text-white"
          >
            <span className="border-b border-gold/40 pb-0.5 group-hover:border-white transition-colors">
              看這個案例的完整故事
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </section>

      {/* ─── Why this matters ─── */}
      <section className="bg-cream py-[72px] md:py-[96px] px-5 md:px-10">
        <div className="max-w-[760px] mx-auto">
          <div className="section-label">為什麼要這樣做</div>
          <h2 className="section-heading">
            我們不靠直覺做決策
          </h2>
          <div className="space-y-5 text-[15px] text-tx2 leading-[1.85] mt-6">
            <p>
              多數顧問公司的「建議」是建立在老闆的個人經驗上。有經驗當然是好事，
              但經驗會老化、會帶偏見、而且最重要的是——
              <span className="text-tx font-medium">客戶無法檢驗</span>。
            </p>
            <p>
              我們寫出這套框架的目的，是讓客戶在跟我們合作時，
              能知道我們的每一個判斷「是怎麼得出來的」。
              如果你覺得我們某個維度打分不合理，你可以直接問，我們會拿出依據。
            </p>
            <p>
              這套框架也是我們內部的自律工具——它強迫我們在接案前必須跑完整個流程。
              如果總分不到 60，我們不會接。不管客戶多想做，
              也不管我們短期內需不需要這筆營收。
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-navy py-[80px] md:py-[100px] px-5 md:px-10">
        <div className="max-w-[720px] mx-auto text-center">
          <h2 className="font-sans text-[clamp(26px,3.2vw,38px)] text-white leading-[1.2] font-light tracking-[-0.4px] mb-4">
            想用這套框架<span className="text-gold font-normal">評估你的產品</span>？
          </h2>
          <p className="text-[15px] text-white/60 leading-[1.75] mb-10 max-w-[520px] mx-auto">
            聊聊你的狀況，我們會用 30 分鐘粗跑一次這五個維度，
            告訴你目前的大致落點，不收費。
          </p>
          <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap">
            <button
              onClick={open}
              className="bg-gold text-navy px-9 py-[15px] rounded-none text-[14px] font-semibold tracking-[0.5px] transition-all hover:bg-gold-l cursor-pointer"
            >
              聊聊你的產品 →
            </button>
            <Link
              href="/services/market-assessment"
              className="group inline-flex items-center gap-2 text-white/75 text-[14px] font-medium transition-colors hover:text-white"
            >
              <span className="border-b border-white/30 pb-0.5 group-hover:border-white transition-colors">
                看完整市場評估服務
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
