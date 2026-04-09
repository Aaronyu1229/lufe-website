"use client";

import { useState } from "react";
import { useMessageBox } from "../MessageBox";

type Route = "A" | "C" | null;
type Step = "entry" | "q1" | "q2" | "q3" | "q4" | "result";

const productCategories = [
  "食品 / 保健品",
  "美妝 / 日用品",
  "電子 / 3C",
  "服飾 / 時尚",
  "農產品 / 生鮮",
  "其他",
];

const targetMarkets = ["美國", "東南亞", "其他"];

const revenueRanges = [
  "500 萬以下",
  "500 萬 – 3,000 萬",
  "3,000 萬 – 1 億",
  "1 億以上",
];

const concernsA = [
  "不知道有沒有市場",
  "不懂當地法規",
  "物流太複雜",
  "預算有限",
  "找不到通路",
];

const concernsC = [
  "物流成本太高",
  "通關總出問題",
  "通路表現不如預期",
  "合規風險不確定",
  "想進新市場",
];

export function AssessWizard() {
  const { open } = useMessageBox();
  const [route, setRoute] = useState<Route>(null);
  const [step, setStep] = useState<Step>("entry");
  const [product, setProduct] = useState("");
  const [markets, setMarkets] = useState<string[]>([]);
  const [revenue, setRevenue] = useState("");
  const [concerns, setConcerns] = useState<string[]>([]);

  const totalSteps = 4;
  const currentStep =
    step === "q1" ? 1 : step === "q2" ? 2 : step === "q3" ? 3 : step === "q4" ? 4 : 0;

  const toggleMarket = (m: string) => {
    setMarkets((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  const toggleConcern = (c: string) => {
    setConcerns((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const canProceed = () => {
    if (step === "q1") return product !== "";
    if (step === "q2") return markets.length > 0;
    if (step === "q3") return revenue !== "";
    if (step === "q4") return concerns.length > 0;
    return true;
  };

  const nextStep = () => {
    if (step === "q1") setStep("q2");
    else if (step === "q2") setStep("q3");
    else if (step === "q3") setStep("q4");
    else if (step === "q4") setStep("result");
  };

  const startRoute = (r: Route) => {
    setRoute(r);
    setStep("q1");
  };

  const reset = () => {
    setRoute(null);
    setStep("entry");
    setProduct("");
    setMarkets([]);
    setRevenue("");
    setConcerns([]);
  };

  return (
    <section className="min-h-screen pt-[100px] md:pt-[120px] pb-16 md:pb-20 px-5 md:px-10 bg-white">
      <div className="max-w-[680px] mx-auto">
        {/* Entry */}
          {step === "entry" && (
            <div>
              <div className="text-center mb-10">
                <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold mb-3">
                  免費出海評估
                </div>
                <h1 className="font-heading text-[clamp(28px,3.5vw,42px)] leading-[1.2] mb-3 font-normal tracking-[-0.5px]">
                  兩分鐘，找到你的出海起點
                </h1>
                <p className="text-[15px] text-tx2 leading-[1.7] font-normal">
                  選擇你目前的狀態，我們幫你快速評估。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => startRoute("A")}
                  className="group p-8 rounded-none border border-sky/20 bg-white text-left cursor-pointer transition-colors duration-300 hover:border-sky"
                >
                  <div className="w-12 h-12 rounded-sm bg-[rgba(91,143,168,0.08)] flex items-center justify-center mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="8" stroke="#5B8FA8" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="2" fill="#5B8FA8" />
                      <path d="M12,4 L12,8" stroke="#5B8FA8" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <h3 className="text-[18px] font-semibold mb-2 text-sky">還沒出海</h3>
                  <p className="text-[13.5px] text-tx2 leading-[1.65] font-normal">
                    想知道出海可不可行、該怎麼開始。
                  </p>
                </button>

                <button
                  onClick={() => startRoute("C")}
                  className="group p-8 rounded-none border border-ember/20 bg-white text-left cursor-pointer transition-colors duration-300 hover:border-ember"
                >
                  <div className="w-12 h-12 rounded-sm bg-[rgba(217,139,74,0.08)] flex items-center justify-center mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M6,16 Q10,8 14,14 Q18,20 22,10" stroke="#D98B4A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                      <path d="M18,8 L22,10 L20,14" stroke="#D98B4A" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-[18px] font-semibold mb-2 text-ember">已經在出海</h3>
                  <p className="text-[13.5px] text-tx2 leading-[1.65] font-normal">
                    想降低成本、提升效率、打開新市場。
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Questions */}
          {(step === "q1" || step === "q2" || step === "q3" || step === "q4") && (
            <div>
              {/* Progress bar */}
              <div className="mb-10">
                <div className="flex justify-between text-[12px] text-tx3 mb-2">
                  <span>第 {currentStep} / {totalSteps} 題</span>
                  <button onClick={reset} className="text-tx3 hover:text-tx cursor-pointer transition-colors">
                    重新開始
                  </button>
                </div>
                <div className="h-1 bg-bd rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-gold rounded-sm transition-all duration-500"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* Q1: Product category */}
              {step === "q1" && (
                <div>
                  <h2 className="font-heading text-[28px] mb-2 font-normal">你的產品類別是？</h2>
                  <p className="text-[14px] text-tx2 mb-8 font-normal">選擇最接近的一個。</p>
                  <div className="space-y-3">
                    {productCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setProduct(cat)}
                        className={`w-full text-left px-5 py-3.5 rounded-sm border transition-all duration-200 cursor-pointer text-[14px] ${
                          product === cat
                            ? "border-gold bg-[rgba(212,168,92,0.08)] text-tx font-medium"
                            : "border-bd bg-white text-tx2 hover:border-gold/50"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Q2: Target markets */}
              {step === "q2" && (
                <div>
                  <h2 className="font-heading text-[28px] mb-2 font-normal">想去哪些市場？</h2>
                  <p className="text-[14px] text-tx2 mb-8 font-normal">可以多選。</p>
                  <div className="flex flex-wrap gap-3">
                    {targetMarkets.map((m) => (
                      <button
                        key={m}
                        onClick={() => toggleMarket(m)}
                        className={`px-6 py-3 rounded-sm border text-[14px] font-medium cursor-pointer transition-all duration-200 ${
                          markets.includes(m)
                            ? "border-gold bg-gold text-navy"
                            : "border-bd bg-white text-tx2 hover:border-gold/50"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Q3: Revenue */}
              {step === "q3" && (
                <div>
                  <h2 className="font-heading text-[28px] mb-2 font-normal">目前年營收規模？</h2>
                  <p className="text-[14px] text-tx2 mb-8 font-normal">大概就好，幫我們判斷適合哪種方案。</p>
                  <div className="space-y-3">
                    {revenueRanges.map((r) => (
                      <button
                        key={r}
                        onClick={() => setRevenue(r)}
                        className={`w-full text-left px-5 py-3.5 rounded-sm border transition-all duration-200 cursor-pointer text-[14px] ${
                          revenue === r
                            ? "border-gold bg-[rgba(212,168,92,0.08)] text-tx font-medium"
                            : "border-bd bg-white text-tx2 hover:border-gold/50"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Q4: Concerns */}
              {step === "q4" && (
                <div>
                  <h2 className="font-heading text-[28px] mb-2 font-normal">
                    {route === "A" ? "你最大的顧慮是？" : "你最想改善什麼？"}
                  </h2>
                  <p className="text-[14px] text-tx2 mb-8 font-normal">可以多選。</p>
                  <div className="flex flex-wrap gap-3">
                    {(route === "A" ? concernsA : concernsC).map((c) => (
                      <button
                        key={c}
                        onClick={() => toggleConcern(c)}
                        className={`px-5 py-2.5 rounded-sm border text-[13.5px] font-medium cursor-pointer transition-all duration-200 ${
                          concerns.includes(c)
                            ? route === "A"
                              ? "border-sky bg-sky text-white"
                              : "border-ember bg-ember text-white"
                            : "border-bd bg-white text-tx2 hover:border-tx3"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Next button */}
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`mt-10 w-full py-3.5 rounded-sm text-[15px] font-semibold cursor-pointer transition-all duration-300 ${
                  canProceed()
                    ? "bg-navy text-white hover:bg-navy-l"
                    : "bg-bd text-tx3 cursor-not-allowed"
                }`}
              >
                {step === "q4" ? "看我的評估結果" : "下一題"}
              </button>
            </div>
          )}

          {/* Result */}
          {step === "result" && route === "A" && (
              <ResultA
                product={product}
                markets={markets}
                concerns={concerns}
                onReset={reset}
                onOpenMsg={open}
              />
          )}

          {step === "result" && route === "C" && (
              <ResultC
                concerns={concerns}
                onReset={reset}
                onOpenMsg={open}
              />
          )}
      </div>
    </section>
  );
}

/* ─── Route A Result ─── */
function ResultA({
  product,
  markets,
  concerns,
  onReset,
  onOpenMsg,
}: {
  product: string;
  markets: string[];
  concerns: string[];
  onReset: () => void;
  onOpenMsg: () => void;
}) {
  const lights = [
    {
      color: "bg-sky",
      label: "市場需求",
      value: markets.includes("美國") ? "潛力高" : "需驗證",
    },
    {
      color: "bg-gold",
      label: "合規難度",
      value: concerns.includes("不懂當地法規") ? "中高" : "中等",
    },
    {
      color: concerns.includes("預算有限") ? "bg-[#E5A800]" : "bg-sky",
      label: "預算匹配",
      value: concerns.includes("預算有限") ? "需評估" : "可行",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-sky">
          你的評估結果
        </div>
        <button onClick={onReset} className="text-[13px] text-tx3 hover:text-tx cursor-pointer transition-colors">
          重新測試
        </button>
      </div>

      <h2 className="font-heading text-[32px] mb-2 font-semibold leading-[1.2]">
        {product}出海，看起來值得一試
      </h2>
      <p className="text-[15px] text-tx2 mb-8 font-normal leading-[1.7]">
        根據你的回答，我們快速幫你看了三個關鍵指標。
      </p>

      {/* Traffic lights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
        {lights.map((l) => (
          <div key={l.label} className="bg-white rounded-none p-5 border border-bd text-center">
            <div className={`w-5 h-5 rounded-full ${l.color} mx-auto mb-3`} />
            <div className="text-[12px] text-tx3 font-medium mb-1">{l.label}</div>
            <div className="text-[15px] font-semibold">{l.value}</div>
          </div>
        ))}
      </div>

      {/* Insight */}
      <div className="bg-[rgba(212,168,92,0.06)] border-l-[3px] border-gold rounded-r-sm p-6 mb-8">
        <h4 className="text-[14px] font-semibold text-gold mb-2">我們的洞察</h4>
        <p className="text-[13.5px] text-tx2 leading-[1.7] font-normal">
          {markets.includes("美國")
            ? `${product}在美國市場有穩定需求。建議先從小批量測試開始，驗證產品定位與定價策略，再逐步擴大。`
            : `${product}在${markets.join("、")}市場有成長空間。建議先進行市場調查，了解當地消費習慣與競品狀況。`}
        </p>
      </div>

      {/* Next steps */}
      <div className="bg-white rounded-none p-6 border border-bd mb-8">
        <h4 className="text-[15px] font-semibold mb-3">建議下一步</h4>
        <ol className="space-y-2 text-[13.5px] text-tx2 leading-[1.7] font-normal list-decimal list-inside">
          <li>免費 30 分鐘諮詢，深入了解你的產品與目標</li>
          <li>我們提供完整市場評估報告</li>
          <li>制定專屬出海路徑與時程</li>
        </ol>
      </div>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={onOpenMsg}
          className="bg-gold text-navy px-7 py-3.5 rounded-sm text-[15px] font-semibold cursor-pointer transition-colors hover:border-gold"
        >
          聊聊你的產品
        </button>
        <a
          href="/services"
          className="px-7 py-3.5 border border-bd bg-white text-tx rounded-sm text-[14px] font-medium transition-all duration-300 hover:border-tx inline-flex items-center"
        >
          看完整出海路徑 →
        </a>
      </div>
    </div>
  );
}

/* ─── Route C Result ─── */
function ResultC({
  concerns,
  onReset,
  onOpenMsg,
}: {
  concerns: string[];
  onReset: () => void;
  onOpenMsg: () => void;
}) {
  const diagnoses = concerns.slice(0, 3).map((c) => {
    const map: Record<string, { title: string; desc: string; saving: string }> = {
      "物流成本太高": {
        title: "物流成本偏高",
        desc: "透過路線優化與合併出貨，平均可降低 15-25% 物流成本。",
        saving: "-20%",
      },
      "通關總出問題": {
        title: "通關效率不佳",
        desc: "合規文件標準化 + 預審機制，可將通關時間縮短 40%。",
        saving: "-40%",
      },
      "通路表現不如預期": {
        title: "通路策略需調整",
        desc: "重新定位品類與定價策略，平均提升 2-3 倍通路表現。",
        saving: "2-3x",
      },
      "合規風險不確定": {
        title: "合規風險需釐清",
        desc: "全面合規健檢，確保你的產品符合目標市場所有法規要求。",
        saving: "100%",
      },
      "想進新市場": {
        title: "新市場開拓",
        desc: "評估新市場潛力、找到最適進入策略，縮短試錯時間。",
        saving: "6 個月",
      },
    };
    return map[c] ?? { title: c, desc: "我們會根據你的狀況提供具體建議。", saving: "—" };
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-ember">
          你的優化診斷
        </div>
        <button onClick={onReset} className="text-[13px] text-tx3 hover:text-tx cursor-pointer transition-colors">
          重新測試
        </button>
      </div>

      <h2 className="font-heading text-[32px] mb-2 font-semibold leading-[1.2]">
        我們看到幾個可以改善的地方
      </h2>
      <p className="text-[15px] text-tx2 mb-8 font-normal leading-[1.7]">
        根據你選擇的痛點，以下是初步診斷。
      </p>

      {/* Diagnosis cards */}
      <div className="space-y-4 mb-8">
        {diagnoses.map((d) => (
          <div key={d.title} className="bg-white rounded-none p-4 md:p-6 border border-bd flex gap-3 md:gap-5 items-start">
            <div className="font-heading text-[24px] md:text-[28px] text-ember font-normal flex-shrink-0 min-w-[50px] md:min-w-[60px] text-center">
              {d.saving}
            </div>
            <div>
              <h4 className="text-[15px] font-semibold mb-1">{d.title}</h4>
              <p className="text-[13.5px] text-tx2 leading-[1.7] font-normal">{d.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-[rgba(217,139,74,0.04)] rounded-none p-6 border border-ember/10 mb-8">
        <h4 className="text-[15px] font-semibold mb-2">想要更詳細的診斷？</h4>
        <p className="text-[13.5px] text-tx2 leading-[1.7] font-normal mb-4">
          預約 60 分鐘深度諮詢，我們會根據你的實際數據提供完整優化方案。
        </p>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => window.open("https://calendly.com", "_blank")}
            className="bg-ember text-white px-6 py-3 rounded-sm text-[14px] font-semibold cursor-pointer transition-colors hover:border-gold"
          >
            預約 60 分鐘諮詢
          </button>
          <button
            onClick={onOpenMsg}
            className="px-6 py-3 border border-bd bg-white text-tx rounded-sm text-[14px] font-medium cursor-pointer transition-all duration-300 hover:border-tx"
          >
            先留個訊息
          </button>
        </div>
      </div>

      <a
        href="/services#optimize"
        className="text-[14px] text-ember font-medium hover:underline inline-flex items-center gap-1"
      >
        看進階優化方案 →
      </a>
    </div>
  );
}
