"use client";

import { useEffect, useRef, useState } from "react";
import { useMessageBox } from "../MessageBox";

const tooltips: Record<string, string> = {
  n1us: "市場評估 — 搞清楚值不值得出去",
  n2us: "產品測試 — 用真實數據驗證你的直覺",
  n3us: "通路談判 — 進入 Costco / CVS / Walmart",
  n1sea: "市場評估 — 當地消費者測試",
  n2sea: "落地營運 — 團隊建置與通路鋪設",
};

export function HeroSection() {
  const { open } = useMessageBox();
  const [visibleNodes, setVisibleNodes] = useState<Set<string>>(new Set());
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleNodes((s) => new Set([...s, "n1"])), 1500),
      setTimeout(() => setVisibleNodes((s) => new Set([...s, "n2"])), 2200),
      setTimeout(() => setVisibleNodes((s) => new Set([...s, "n3"])), 2800),
      setTimeout(() => setVisibleNodes((s) => new Set([...s, "n4"])), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleNodeHover = (
    id: string,
    e: React.MouseEvent<SVGGElement>
  ) => {
    const tipText = tooltips[id];
    if (!tipText || !svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const target = e.currentTarget.getBoundingClientRect();
    setTooltip({
      text: tipText,
      x: target.left - svgRect.left + target.width / 2,
      y: target.top - svgRect.top - 36,
    });
  };

  const nodeClass = (level: string) =>
    `transition-opacity duration-300 ${visibleNodes.has(level) ? "opacity-100" : "opacity-0"}`;

  return (
    <section className="min-h-screen flex items-center bg-navy relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 pt-[160px] pb-[100px] grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-1">
        {/* Left */}
        <div className="relative z-2">
          <div className="inline-block px-3.5 py-[5px] border-b-2 border-gold/40 text-gold text-[12.5px] font-medium mb-6 tracking-[0.5px] uppercase">
            企業出海的導航系統
          </div>
          <h1 className="font-heading text-[clamp(36px,4.5vw,58px)] text-white leading-[1.15] mb-[18px] font-bold tracking-[-1px]">
            好產品值得一條
            <br />
            順暢的<em className="not-italic font-bold text-gold">出海路</em>
          </h1>
          <p className="text-[16px] text-white/50 max-w-[440px] leading-[1.75] mb-3.5 font-normal">
            從市場驗證到落地營運，我們陪你走完全程。
            <br />
            別人幫你開車，我們幫你找路。
          </p>
          <p className="text-[14px] text-gold mb-8 font-normal opacity-85">
            平均 6-9 個月，讓你的產品站上海外貨架。
          </p>
          <button
            onClick={open}
            className="bg-gold text-navy px-[30px] py-3.5 rounded-sm text-[15px] font-semibold cursor-pointer transition-all hover:bg-cream-d"
          >
            聊聊你的產品
          </button>
          <p className="text-[12px] text-white/30 mt-3.5">
            不確定該不該出海？先聊聊，不收費。
          </p>
        </div>

        {/* Right — Route Map SVG */}
        <div className="relative h-[260px] md:h-[400px]">
          <svg
            ref={svgRef}
            className="w-full h-full"
            viewBox="0 0 500 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Taiwan origin */}
            <circle cx="80" cy="200" r="5" fill="#D4A85C" opacity="0.8" />
            <text
              x="80"
              y="228"
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize="11"
              fontFamily="DM Sans"
              fontWeight="400"
            >
              台灣
            </text>

            {/* Route to US */}
            <path
              d="M85,200 Q200,80 420,120"
              className="animate-draw-path"
              stroke="#D4A85C"
              strokeWidth="2"
              fill="none"
              strokeDasharray="600"
              strokeDashoffset="600"
              style={{
                animation: "drawPath 3s ease forwards 0.5s",
              }}
            />
            {/* Route to SEA */}
            <path
              d="M85,200 Q200,320 420,300"
              stroke="#D4A85C"
              strokeWidth="2"
              fill="none"
              strokeDasharray="600"
              strokeDashoffset="600"
              style={{
                animation: "drawPath 3s ease forwards 0.8s",
              }}
            />

            {/* US Destination */}
            <circle
              cx="420"
              cy="120"
              r="6"
              fill="none"
              stroke="#D4A85C"
              strokeWidth="1"
              className={`${nodeClass("n4")}`}
              style={{ animation: "pulse 2s ease-in-out infinite" }}
            />
            <circle
              cx="420"
              cy="120"
              r="4"
              fill="#D4A85C"
              className={nodeClass("n4")}
            />
            <text
              x="420"
              y="106"
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize="11"
              className={nodeClass("n4")}
            >
              美國
            </text>

            {/* SEA Destination */}
            <circle
              cx="420"
              cy="300"
              r="6"
              fill="none"
              stroke="#5B8FA8"
              strokeWidth="1"
              className={nodeClass("n4")}
              style={{
                animation: "pulse 2s ease-in-out infinite 1s",
              }}
            />
            <circle
              cx="420"
              cy="300"
              r="4"
              fill="#5B8FA8"
              className={nodeClass("n4")}
            />
            <text
              x="420"
              y="322"
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize="11"
              className={nodeClass("n4")}
            >
              東南亞
            </text>

            {/* US Route Nodes */}
            <g
              className={nodeClass("n1")}
              onMouseEnter={(e) => handleNodeHover("n1us", e)}
              onMouseLeave={() => setTooltip(null)}
            >
              <circle
                cx="160"
                cy="155"
                r="16"
                fill="rgba(212,168,92,0.1)"
                stroke="rgba(212,168,92,0.3)"
                strokeWidth="1"
              />
              <text
                x="160"
                y="152"
                textAnchor="middle"
                fill="#D4A85C"
                fontSize="16"
              >
                🔍
              </text>
              <text
                x="160"
                y="172"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="10"
                fontWeight="500"
              >
                評估
              </text>
            </g>

            <g
              className={nodeClass("n2")}
              onMouseEnter={(e) => handleNodeHover("n2us", e)}
              onMouseLeave={() => setTooltip(null)}
            >
              <circle
                cx="240"
                cy="115"
                r="16"
                fill="rgba(212,168,92,0.1)"
                stroke="rgba(212,168,92,0.3)"
                strokeWidth="1"
              />
              <text
                x="240"
                y="112"
                textAnchor="middle"
                fill="#D4A85C"
                fontSize="16"
              >
                📊
              </text>
              <text
                x="240"
                y="132"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="10"
                fontWeight="500"
              >
                測試
              </text>
            </g>

            <g
              className={nodeClass("n3")}
              onMouseEnter={(e) => handleNodeHover("n3us", e)}
              onMouseLeave={() => setTooltip(null)}
            >
              <circle
                cx="330"
                cy="105"
                r="16"
                fill="rgba(212,168,92,0.1)"
                stroke="rgba(212,168,92,0.3)"
                strokeWidth="1"
              />
              <text
                x="330"
                y="102"
                textAnchor="middle"
                fill="#D4A85C"
                fontSize="16"
              >
                🤝
              </text>
              <text
                x="330"
                y="122"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="10"
                fontWeight="500"
              >
                通路
              </text>
            </g>

            {/* SEA Route Nodes */}
            <g
              className={nodeClass("n1")}
              onMouseEnter={(e) => handleNodeHover("n1sea", e)}
              onMouseLeave={() => setTooltip(null)}
            >
              <circle
                cx="170"
                cy="260"
                r="14"
                fill="rgba(91,143,168,0.1)"
                stroke="rgba(91,143,168,0.3)"
                strokeWidth="1"
              />
              <text
                x="170"
                y="257"
                textAnchor="middle"
                fill="#5B8FA8"
                fontSize="14"
              >
                🔍
              </text>
              <text
                x="170"
                y="275"
                textAnchor="middle"
                fill="rgba(255,255,255,0.5)"
                fontSize="10"
              >
                評估
              </text>
            </g>

            <g
              className={nodeClass("n2")}
              onMouseEnter={(e) => handleNodeHover("n2sea", e)}
              onMouseLeave={() => setTooltip(null)}
            >
              <circle
                cx="290"
                cy="300"
                r="14"
                fill="rgba(91,143,168,0.1)"
                stroke="rgba(91,143,168,0.3)"
                strokeWidth="1"
              />
              <text
                x="290"
                y="297"
                textAnchor="middle"
                fill="#5B8FA8"
                fontSize="14"
              >
                🏪
              </text>
              <text
                x="290"
                y="315"
                textAnchor="middle"
                fill="rgba(255,255,255,0.5)"
                fontSize="10"
              >
                落地
              </text>
            </g>
          </svg>

          {/* Tooltip */}
          {tooltip && (
            <div
              className="absolute bg-[rgba(20,34,56,0.95)] text-white px-3.5 py-2 rounded-sm text-[12px] font-normal pointer-events-none whitespace-nowrap border border-gold/20 transition-opacity"
              style={{
                left: tooltip.x,
                top: tooltip.y,
                transform: "translateX(-50%)",
              }}
            >
              {tooltip.text}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes drawPath {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  );
}
