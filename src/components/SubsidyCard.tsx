"use client";

/**
 * SubsidyCard is a focused floating prompt that never shows on the homepage.
 * It enters once from the bottom-right, respects reduced motion, and stays
 * dismissed for the current session after the user closes it.
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

const DELAY_MS = 5_000;
const SESSION_KEY = "lufe.subsidyCard.dismissed";

// Paths where the card is not shown.
const HIDDEN_PATHS = ["/assess", "/contact", "/resources/subsidies"];

export function SubsidyCard() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  const activeCount = useMemo(() => getActiveSubsidyCount(), []);
  const nearestDeadline = useMemo(() => getNearestDeadline(), []);
  const todayStr = useMemo(() => getTodayFormatted(), []);

  // The homepage already carries the SubsidyAlertBand, so the card stays off `/`.
  const isHidden = pathname === "/" || HIDDEN_PATHS.some((p) => pathname?.startsWith(p));

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
        bottom-5 max-[375px]:bottom-0 right-5
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
        <div className="relative h-[64px] overflow-hidden hidden md:block">
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
        <div className="h-[2px] bg-gradient-to-r from-gold/40 via-gold to-gold/40">
        </div>

        {/* Dismiss button */}
        <button
          onClick={dismiss}
          aria-label={SUBSIDY_CARD_COPY.dismissAria}
          className="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer max-[375px]:top-1.5 max-[375px]:right-1.5 md:top-3 md:right-3 md:w-7 md:h-7"
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <Link
          href={SUBSIDY_CARD_COPY.href}
          className="block px-4 pr-10 pt-3 pb-3 group max-[375px]:px-3 max-[375px]:pr-9 max-[375px]:pt-2 max-[375px]:pb-2 md:px-6 md:pr-6 md:pt-5 md:pb-6"
          onClick={() => {
            try {
              sessionStorage.setItem(SESSION_KEY, "1");
            } catch {
              /* ignore */
            }
          }}
        >
          {/* Live status */}
          <div className="flex items-center gap-1.5 mb-2 max-[375px]:mb-1 md:gap-2 md:mb-4">
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 md:w-2 md:h-2"
              aria-hidden="true"
            />
            <span className="text-[11px] leading-4 text-white/60 font-medium max-[375px]:text-[10px] max-[375px]:leading-[14px] md:text-[12px] md:leading-normal">
              {todayStr} 更新 ·{" "}
              <span className="text-emerald-400 font-bold text-[12px] max-[375px]:text-[11px] md:text-[14px]">
                {activeCount}
              </span>{" "}
              個補助開放中
              {nearestDeadline && nearestDeadline.daysLeft <= 60 && (
                <span className="text-amber-400"> · 剩 {nearestDeadline.daysLeft} 天</span>
              )}
            </span>
          </div>

          {/* Headline */}
          <h3 className="font-sans text-[19px] font-light leading-[1.25] tracking-[-0.3px] text-white mb-1 max-[375px]:text-[18px] max-[375px]:leading-[1.15] max-[375px]:mb-0 md:text-[24px] md:leading-[1.2] md:tracking-[-0.5px] md:mb-2">
            {copy.headline}
          </h3>

          {/* One-liner */}
          <p className="text-[12px] text-white/55 leading-[1.5] mb-2.5 max-[375px]:text-[11px] max-[375px]:leading-[1.35] max-[375px]:mb-1 md:text-[14px] md:leading-[1.7] md:mb-5">
            {copy.oneLiner}
          </p>

          {/* CTA */}
          <span className="flex items-center justify-center gap-2 w-full bg-gold text-navy py-2.5 text-[13px] font-semibold transition-colors group-hover:bg-gold-l max-[375px]:py-2 max-[375px]:text-[12px] md:py-3 md:text-[14.5px]">
            {copy.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
