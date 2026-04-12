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
        {/* ─── Top image strip ─── */}
        <div className="relative h-[104px] overflow-hidden">
          <Image
            src={SUBSIDY_CARD_COPY.image}
            alt=""
            fill
            sizes="360px"
            className="object-cover"
            aria-hidden="true"
          />
          {/* Navy gradient overlay for legibility */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,26,58,0.4) 0%, rgba(10,26,58,0.9) 75%, rgba(10,26,58,1) 100%)",
            }}
          />
          {/* Live status indicator — date-aware */}
          <div className="absolute top-3 left-4 flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse"
              aria-hidden="true"
            />
            <span className="text-[9.5px] font-semibold tracking-[2px] uppercase text-gold">
              {todayStr} 更新 · {activeCount} 個計畫開放中
            </span>
          </div>
          {nearestDeadline && (
            <div className="absolute bottom-2 left-4">
              <span className="text-[9px] font-medium tracking-[1px] text-white/50">
                最近截止 {nearestDeadline.formatted}
                {nearestDeadline.daysLeft <= 60 && (
                  <span className="text-amber-400 ml-1">
                    · 剩 {nearestDeadline.daysLeft} 天
                  </span>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Accent line */}
        <div className="h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0" />

        {/* Dismiss button */}
        <button
          onClick={dismiss}
          aria-label={SUBSIDY_CARD_COPY.dismissAria}
          className="
            absolute top-3 right-3 z-10
            w-8 h-8 flex items-center justify-center
            text-white/70 hover:text-white
            bg-black/40 hover:bg-black/60
            backdrop-blur-sm rounded-full
            transition-colors cursor-pointer
          "
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1L11 11M11 1L1 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
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
          {/* Eyebrow — contextual, with live count */}
          <div className="text-gold text-[10px] font-semibold tracking-[2px] uppercase mb-3">
            {copy.eyebrow}
          </div>
          <div className="text-[10.5px] text-white/40 font-medium mb-2">
            截至 {todayStr}，共 {activeCount} 個補助計畫仍可申請
          </div>

          {/* Headline — larger, more visual weight */}
          <h3 className="font-sans text-[28px] md:text-[32px] font-light leading-[1.1] tracking-[-0.8px] text-white mb-3">
            {copy.headline}
          </h3>

          {/* One-liner — contextual explanation */}
          <p className="text-[13.5px] text-white/65 leading-[1.8] mb-6 pr-2">
            {copy.oneLiner}
          </p>

          {/* CTA — filled gold button */}
          <span className="flex items-center justify-center gap-2 w-full bg-gold text-navy py-[13px] text-[15px] font-semibold tracking-[0.5px] transition-colors group-hover:bg-gold-l">
            {copy.cta}
            <span
              className="text-[16.5px] transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}
