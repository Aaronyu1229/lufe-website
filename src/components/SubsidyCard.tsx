"use client";

/**
 * SubsidyCard — Bain-style floating "selected for you" card
 *
 * 行為：
 *  - 進站 12 秒後從右下角滑入
 *  - 使用者按 X 關閉後，當次 session 不再出現 (sessionStorage)
 *  - 手機：改為 inline bottom sheet
 *  - 尊重 prefers-reduced-motion
 *  - 點卡片 → /resources/subsidies
 *
 * 延續性：
 *  - 文案來源為 SUBSIDY_CARD_COPY，改文案無需動此元件
 *  - 可在 path 陣列過濾要出現的頁面
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SUBSIDY_CARD_COPY } from "@/data/subsidies";

const DELAY_MS = 12_000;
const SESSION_KEY = "lufe.subsidyCard.dismissed";

// 不顯示卡片的頁面 (申請頁、聯絡頁本身已經在 CTA 漏斗裡)
const HIDDEN_PATHS = [
  "/assess",
  "/contact",
  "/resources/subsidies",
];

export function SubsidyCard() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  const isHidden = HIDDEN_PATHS.some((p) => pathname?.startsWith(p));

  useEffect(() => {
    if (isHidden) return;

    // already dismissed this session?
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    } catch {
      // ignore storage errors
    }

    const timer = window.setTimeout(() => {
      setVisible(true);
    }, DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [isHidden, pathname]);

  const dismiss = () => {
    setExiting(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
    window.setTimeout(() => {
      setVisible(false);
      setExiting(false);
    }, 300);
  };

  if (isHidden || !visible) return null;

  return (
    <div
      role="complementary"
      aria-label="政府補助資訊"
      className={`
        fixed z-[90]
        bottom-5 right-5
        md:bottom-7 md:right-7
        w-[calc(100vw-40px)] max-w-[360px]
        transition-all duration-[420ms] ease-out
        motion-reduce:transition-none
        ${exiting
          ? "opacity-0 translate-y-3 md:translate-x-3 md:translate-y-0"
          : "opacity-100 translate-y-0 motion-safe:animate-subsidy-slide-in"}
      `}
    >
      <div className="relative bg-navy text-white shadow-[0_20px_50px_-12px_rgba(16,27,48,0.5)] border-t-2 border-gold">
        {/* Dismiss */}
        <button
          onClick={dismiss}
          aria-label={SUBSIDY_CARD_COPY.dismissAria}
          className="
            absolute top-3 right-3 z-10
            w-7 h-7 flex items-center justify-center
            text-white/50 hover:text-white
            hover:bg-white/10
            transition-colors cursor-pointer
          "
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M1 1L11 11M11 1L1 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <Link
          href="/resources/subsidies"
          className="block p-6 pb-7 group"
          onClick={() => {
            try {
              sessionStorage.setItem(SESSION_KEY, "1");
            } catch {
              /* ignore */
            }
          }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-4 h-px bg-gold" />
            <span className="text-gold text-[10px] font-semibold tracking-[2px] uppercase">
              {SUBSIDY_CARD_COPY.eyebrow}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-sans text-[24px] md:text-[26px] font-extralight leading-[1.15] tracking-[-0.8px] mb-2">
            {SUBSIDY_CARD_COPY.title}
          </h3>

          {/* Subtitle */}
          <p className="text-[13px] text-white/65 leading-[1.6] mb-5 pr-4">
            {SUBSIDY_CARD_COPY.subtitle}
          </p>

          {/* 4 number dots — hints at 4 programs */}
          <div className="flex items-center gap-5 mb-5">
            {["01", "02", "03", "04"].map((n) => (
              <span
                key={n}
                className="text-[10px] font-medium text-white/40 tabular-nums tracking-wider"
              >
                {n}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-[13px] font-semibold text-white group-hover:text-gold transition-colors">
              {SUBSIDY_CARD_COPY.cta}
            </span>
            <span
              className="text-gold text-[16px] transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
