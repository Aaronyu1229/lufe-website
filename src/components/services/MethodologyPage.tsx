"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Disclosure, Segmented } from "@/components/ui";
import { useMessageBox } from "../MessageBox";

export const METHODOLOGY_DIMENSIONS = [
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
] as const;

export const METHODOLOGY_DECISIONS = [
  {
    score: "≥ 75",
    verdict: "Go",
    color: "border-l-emerald-500 bg-emerald-50/50",
    advice: "可以進，建議正常執行四階段路徑。",
  },
  {
    score: "60–74",
    verdict: "Conditional Go",
    color: "border-l-amber-500 bg-amber-50/50",
    advice: "可以進，但需要先解決某 1–2 個弱項（通常是 Barrier 或 Profitability）。",
  },
  {
    score: "45–59",
    verdict: "Hold",
    color: "border-l-orange-500 bg-orange-50/50",
    advice: "建議暫緩 6–12 個月，等市場、法規或你的產品本身發生某個關鍵變化再重估。",
  },
  {
    score: "< 45",
    verdict: "No-Go",
    color: "border-l-red-500 bg-red-50/50",
    advice: "直接不建議。我們會給出下次可以重新考慮的具體條件。",
  },
] as const;

export const WORKED_EXAMPLE = {
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
} as const;

export const METHODOLOGY_INDEX = [
  { value: "framework", label: "MBCPR 五維評分" },
  { value: "dimensions", label: "具體評的是什麼" },
  { value: "decision", label: "加權總分 → 決策" },
  { value: "example", label: "這套框架跑一次長什麼樣" },
  { value: "why", label: "我們不靠直覺做決策" },
] as const;

export function MethodologyPage() {
  const { open } = useMessageBox();
  const [activeSection, setActiveSection] = useState<string>(METHODOLOGY_INDEX[0].value);

  const goToSection = (value: string) => {
    setActiveSection(value);
    const target = document.getElementById(value);
    if (!target) return;

    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const sections = METHODOLOGY_INDEX.map(({ value }) => document.getElementById(value)).filter(
      (section): section is HTMLElement => section !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (active) setActiveSection(active.target.id);
      },
      { rootMargin: "-24% 0px -58% 0px", threshold: [0, 0.15, 0.35] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-navy px-5 pb-[72px] pt-[128px] md:px-10 md:pb-[104px] md:pt-[160px]">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0, rgba(212,168,92,0.14), transparent 53%)",
          }}
        />
        <div className="relative mx-auto max-w-[1000px]">
          <nav aria-label="Breadcrumb" className="mb-7 text-[11px] font-medium tracking-[1px] text-white/50">
            <Link href="/services" className="hover:text-gold">
              服務
            </Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/75">方法論</span>
          </nav>
          <h1 className="font-sans text-[clamp(34px,5vw,60px)] font-[650] leading-[1.12] tracking-normal text-white [text-wrap:balance]">
            我們怎麼判斷
            <br />
            <span className="text-gold">值不值得去</span>
          </h1>
          <p className="mt-5 max-w-[720px] text-[clamp(17px,1.5vw,20px)] leading-[1.7] text-white/75">
            這頁不是行銷文案，是我們實際用來替每個客戶做 Go / No-Go 決策的框架。
            如果你想了解顧問公司背後的判斷邏輯，而不是只看結論，這頁就是為你寫的。
          </p>
        </div>
      </section>

      <div>
        <div className="sticky top-[74px] z-20 mx-auto w-full max-w-full overflow-hidden px-5 py-[14px] md:w-fit md:px-10">
          <div className="max-w-full overflow-hidden border border-bd bg-[rgba(245,242,236,0.92)] px-1 py-1 text-center shadow-[0_10px_28px_rgba(16,27,48,0.13)] backdrop-blur-[18px]">
            <Segmented
              label="頁內導覽"
              value={activeSection}
              onChange={goToSection}
              options={METHODOLOGY_INDEX.map((item) => ({ ...item }))}
              className="max-w-full justify-center bg-transparent"
            />
          </div>
        </div>

        <section id="framework" className="scroll-mt-[126px] bg-cream px-5 py-[80px] md:px-10 md:py-[110px]">
          <div className="mx-auto max-w-[900px]">
            <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-navy [text-wrap:balance]">
              MBCPR 五維評分
            </h2>
            <p className="mt-4 max-w-[680px] text-[clamp(17px,1.5vw,20px)] leading-[1.7] text-tx2">
              每個案子我們都會從五個維度打分，每個維度有各自的權重與紅線。
              加權後的總分直接決定 Go / No-Go。
            </p>
            <div
              aria-label="MARKET · BARRIER · COMPETITION · PROFITABILITY · REGULATORY"
              className="mt-[38px] grid min-w-0 grid-cols-5 gap-1.5 md:gap-2"
            >
              {METHODOLOGY_DIMENSIONS.map((dimension) => (
                <button
                  key={dimension.code}
                  type="button"
                  onClick={() => goToSection("dimensions")}
                  className="grid min-w-0 place-items-center bg-gold/10 px-1 py-4 text-center outline-none focus-visible:ring-2 focus-visible:ring-sky md:min-h-[94px] md:px-2"
                >
                  <span className="font-sans text-[clamp(28px,5vw,46px)] font-semibold leading-none tracking-[-0.035em] text-gold-d">
                    {dimension.code}
                  </span>
                  <span className="mt-2 break-words text-[10px] font-semibold leading-tight text-tx md:text-[13px]">
                    {dimension.name}
                  </span>
                  <span className="mt-0.5 text-[10px] font-medium text-gold-d md:text-[12px]">
                    {dimension.weight}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-[14px] text-center text-[11px] tracking-wider text-tx3">
              MARKET · BARRIER · COMPETITION · PROFITABILITY · REGULATORY
            </p>
          </div>
        </section>

        <section id="dimensions" className="scroll-mt-[126px] bg-white px-5 py-[80px] md:px-10 md:py-[110px]">
          <div className="mx-auto max-w-[900px]">
            <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-navy [text-wrap:balance]">
              具體評的是什麼
            </h2>
            <div className="mt-9">
              {METHODOLOGY_DIMENSIONS.map((dimension) => (
                <Disclosure
                  key={dimension.code}
                  id={`methodology-${dimension.code}`}
                  summary={
                    <span className="grid min-w-0 grid-cols-[38px_minmax(0,1fr)_auto] items-center gap-2 md:grid-cols-[52px_minmax(0,1fr)_auto_28px] md:gap-3">
                      <span className="font-sans text-[26px] font-semibold leading-none tracking-[-0.035em] text-gold-d">
                        {dimension.code}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-sans text-[18px] font-semibold leading-[1.3] text-tx md:text-[21px]">
                          {dimension.name}
                        </span>
                        <span className="mt-1 block text-[14px] font-normal leading-[1.7] text-tx2 md:text-[16px]">
                          「{dimension.question}」
                        </span>
                      </span>
                      <span className="hidden whitespace-nowrap text-[13px] font-semibold text-gold-d md:block">
                        權重 {dimension.weight}
                      </span>
                    </span>
                  }
                >
                  <div className="pl-[46px] md:pl-[62px]">
                    <p className="text-[13px] font-semibold tracking-[0.06em] text-gold-d">評分依據</p>
                    <ul className="my-5 space-y-2.5">
                      {dimension.criteria.map((criterion) => (
                        <li key={criterion} className="flex items-start gap-3 text-[15px] leading-[1.7] text-tx2">
                          <span aria-hidden="true" className="mt-[0.7em] size-[5px] shrink-0 bg-gold" />
                          {criterion}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 border-l-[3px] border-red-700/55 bg-red-50/50 p-[18px]">
                      <p className="mb-1.5 text-[13px] font-semibold tracking-[0.06em] text-red-600">紅線</p>
                      <p className="text-[14.5px] leading-[1.75] text-red-800">{dimension.redAt}</p>
                    </div>
                  </div>
                </Disclosure>
              ))}
            </div>
          </div>
        </section>

        <section id="decision" className="scroll-mt-[126px] bg-cream px-5 py-[80px] md:px-10 md:py-[110px]">
          <div className="mx-auto max-w-[900px]">
            <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-navy [text-wrap:balance]">
              加權總分 → 決策
            </h2>
            <p className="mt-4 max-w-[680px] text-[clamp(17px,1.5vw,20px)] leading-[1.7] text-tx2">
              五個維度的加權平均直接對應到四種結論。我們不玩「都有機會」的話術。
            </p>
            <div className="mt-[38px] grid gap-3">
              {METHODOLOGY_DECISIONS.map((decision) => (
                <article key={decision.verdict} className={`grid gap-2 border-l-4 p-[22px] md:grid-cols-[96px_minmax(0,1fr)] md:gap-5 ${decision.color}`}>
                  <div>
                    <p className="text-[14px] leading-[1.6] text-tx3">總分</p>
                    <p className="font-sans text-[24px] font-semibold leading-none tracking-[-0.035em] tabular-nums text-tx">
                      {decision.score}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <h3 className="mb-1.5 font-sans text-[18px] font-semibold leading-[1.4] text-tx">
                      {decision.verdict}
                    </h3>
                    <p className="text-[15px] leading-[1.75] text-tx2">{decision.advice}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="example" className="scroll-mt-[126px] bg-navy px-5 py-[80px] text-white md:px-10 md:py-[110px]">
          <div className="mx-auto max-w-[900px]">
            <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal [text-wrap:balance]">
              這套框架跑一次<span className="text-gold">長什麼樣</span>
            </h2>
            <p className="mt-4 max-w-[620px] text-[clamp(17px,1.5vw,20px)] leading-[1.7] text-white/70">
              下面是我們跑「{WORKED_EXAMPLE.caseName}」時的實際評分表。
            </p>
            <div className="mt-10 border border-white/10 bg-white/[0.045] p-5 md:p-7">
              <div>
                {WORKED_EXAMPLE.scores.map((score) => (
                  <div key={score.dim} className="grid min-w-0 grid-cols-[72px_minmax(0,1fr)_36px] items-center gap-2 border-b border-white/10 py-3.5 md:grid-cols-[86px_minmax(0,1fr)_48px] md:gap-3.5">
                    <span className="text-[12px] font-semibold text-gold md:text-[14px]">{score.dim}</span>
                    <span className="min-w-0">
                      <span className="block h-[7px] overflow-hidden bg-white/10">
                        <span className="block h-full bg-gradient-to-r from-gold/45 to-gold" style={{ width: `${score.score}%` }} />
                      </span>
                      <span className="mt-1.5 block text-[11px] leading-[1.55] text-white/60">{score.note}</span>
                    </span>
                    <span className="font-sans text-right text-[22px] font-semibold leading-none tracking-[-0.035em] tabular-nums text-white">
                      {score.score}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap justify-between gap-x-6 gap-y-5 border-t border-white/15 pt-7">
                <div>
                  <p className="text-[14px] leading-[1.6] text-white/55">加權總分</p>
                  <p className="font-sans text-[42px] font-semibold leading-none tracking-[-0.035em] tabular-nums text-gold">
                    {WORKED_EXAMPLE.weighted}
                  </p>
                </div>
                <div>
                  <p className="text-[14px] leading-[1.6] text-white/55">結論</p>
                  <h3 className="font-sans text-[clamp(21px,2.2vw,26px)] font-semibold leading-[1.3] text-amber-300">
                    {WORKED_EXAMPLE.verdict}
                  </h3>
                </div>
                <p className="w-full text-[15.5px] leading-[1.8] text-white/75">
                  <span className="font-semibold text-gold">條件：</span>
                  {WORKED_EXAMPLE.condition}
                </p>
                <p className="w-full text-[15.5px] leading-[1.8] text-white/75">
                  <span className="font-semibold text-gold">實際結果：</span>
                  {WORKED_EXAMPLE.outcome}
                </p>
              </div>
            </div>
            <Link href="/cases/costco-health" className="mt-[26px] inline-flex items-center gap-2 text-[16px] font-semibold text-gold hover:text-white">
              看這個案例的完整故事 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section id="why" className="scroll-mt-[126px] bg-cream px-5 py-[80px] md:px-10 md:py-[110px]">
          <div className="mx-auto max-w-[760px]">
            <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-navy [text-wrap:balance]">
              我們不靠直覺做決策
            </h2>
            <div className="mt-6 space-y-[18px] text-[16px] leading-[1.85] text-tx2">
              <p>
                多數顧問公司的「建議」是建立在老闆的個人經驗上。有經驗當然是好事，但經驗會老化、會帶偏見、而且最重要的是——
                <span className="font-medium text-tx">客戶無法檢驗</span>。
              </p>
              <p>
                我們寫出這套框架的目的，是讓客戶在跟我們合作時，能知道我們的每一個判斷「是怎麼得出來的」。如果你覺得我們某個維度打分不合理，你可以直接問，我們會拿出依據。
              </p>
              <p>
                這套框架也是我們內部的自律工具——它強迫我們在接案前必須跑完整個流程。如果總分不到 60，我們不會接。不管客戶多想做，也不管我們短期內需不需要這筆營收。
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-navy px-5 py-[80px] text-white md:px-10 md:py-[110px]">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal [text-wrap:balance]">
            想用這套框架<span className="text-gold">評估你的產品</span>？
          </h2>
          <p className="mx-auto mt-[18px] max-w-[520px] text-[clamp(17px,1.5vw,20px)] leading-[1.7] text-white/70">
            聊聊你的狀況，我們會用 30 分鐘粗跑一次這五個維度，告訴你目前的大致落點，不收費。
          </p>
          <div className="mt-[34px] flex flex-wrap items-center justify-center gap-3">
            <button onClick={open} className="cursor-pointer bg-gold px-[26px] py-[14px] text-[16px] font-semibold text-navy hover:bg-gold-l">
              聊聊你的產品 →
            </button>
            <Link href="/services/market-assessment" className="bg-white/15 px-[26px] py-[14px] text-[16px] font-semibold text-white hover:bg-white/25">
              看完整市場評估服務 →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
