"use client";

/**
 * SubsidyCard — 單一目的的 floating wedge
 *
 * 行為：
 *  - 進站 12 秒後從右下角滑入
 *  - 按 X 關閉 → 當次 session 不再出現
 *  - 手機：底部 sheet
 *  - 尊重 prefers-reduced-motion
 *  - 點卡片 → /resources/subsidies#match（直接到 quiz 區段）
 *
 * 內容：
 *  - 根據當前 pathname 從 CONTEXTUAL_COPY 取出對應的文案
 *  - 彈窗只講一句話 + 一個 CTA，其他深度全部放在 landing page
 *  - 避免 dual variant 和決策爆炸
 */

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SUBSIDY_CARD_COPY,
  getContextualCopy,
  getActiveSubsidyCount,
  getNearestDeadline,
  getTodayFormatted,
} from "@/data/subsidies";

const DELAY_MS = 12_000;
const SESSION_KEY = "lufe.subsidyCard.dismissed";

// 不顯示卡片的頁面
const HIDDEN_PATHS = ["/assess", "/contact", "/resources/subsidies"];

export function SubsidyCard() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  const activeCount = useMemo(() => getActiveSubsidyCount(), []);
  const nearestDeadline = useMemo(() => getNearestDeadline(), []);
  const todayStr = useMemo(() => getTodayFormatted(), []);

  const isHidden = HIDDEN_PATHS.some((p) => pathname?.startsWith(p));

  // If all concrete-deadline subsidies have expired, hide the card
  const isExpired = activeCount === 0;

  // Pick contextual copy based on current page
  const copy = useMemo(() => getContextualCopy(pathname ?? ""), [pathname]);

  useEffect(() => {
    if (isHidden) return;

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

  if (isHidden || isExpired || !visible) return null;

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
        ${
          exiting
            ? "opacity-0 translate-y-3 md:translate-x-3 md:translate-y-0"
            : "opacity-100 translate-y-0 motion-safe:animate-subsidy-slide-in"
        }
      `}
    >
      <div className="relative bg-navy text-white shadow-[0_20px_60px_-12px_rgba(16,27,48,0.6)] overflow-hidden">
        {/* Compact image strip */}
        <div className="relative h-[64px] overflow-hidden">
          <Image
            src={SUBSIDY_CARD_COPY.image}
            alt=""
            fill
            sizes="360px"
            className="object-cover"
            aria-hidden="true"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy/20 to-navy/80" />
        </div>
        <div className="h-[2px] bg-gradient-to-r from-gold/40 via-gold to-gold/40" />

        {/* Dismiss button */}
        <button
          onClick={dismiss}
          aria-label={SUBSIDY_CARD_COPY.dismissAria}
          className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <Link
          href={SUBSIDY_CARD_COPY.href}
          className="block px-6 pt-5 pb-6 group"
          onClick={() => {
            try {
              sessionStorage.setItem(SESSION_KEY, "1");
            } catch {
              /* ignore */
            }
          }}
        >
          {/* Live status — single line */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse shrink-0"
              aria-hidden="true"
            />
            <span className="text-[12px] text-white/50 font-medium">
              {todayStr} 更新 · {activeCount} 個補助開放中
              {nearestDeadline && nearestDeadline.daysLeft <= 60 && (
                <span className="text-amber-400"> · 剩 {nearestDeadline.daysLeft} 天</span>
              )}
            </span>
          </div>

          {/* Headline */}
          <h3 className="font-sans text-[24px] font-light leading-[1.2] tracking-[-0.5px] text-white mb-2">
            {copy.headline}
          </h3>

          {/* One-liner */}
          <p className="text-[14px] text-white/55 leading-[1.7] mb-5">
            {copy.oneLiner}
          </p>

          {/* CTA */}
          <span className="flex items-center justify-center gap-2 w-full bg-gold text-navy py-3 text-[14.5px] font-semibold transition-colors group-hover:bg-gold-l">
            {copy.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
