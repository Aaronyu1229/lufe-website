"use client";

/**
 * SubsidyCard — Bain-style floating "selected for you" card
 *
 * 行為：
 *  - 進站 12 秒後從右下角滑入
 *  - 使用者按 X 關閉後，當次 session 不再出現 (sessionStorage)
 *  - 手機：改為 inline bottom sheet (靠底)
 *  - 尊重 prefers-reduced-motion
 *  - 點卡片 → /resources/subsidies
 *  - 智慧 context：根據當前 pathname 顯示最相關的補助 (CONTEXT_SUBSIDY_MAP)
 *
 * 視覺：
 *  - 頂部 120px 圖像帶 (regulatory document) + navy overlay
 *  - agency strip 顯示三個主管機關，取代抽象的 01 02 03 04 圓點
 *  - 大字金額在視覺中心
 *  - 有 context 時顯示該補助的名稱與圖標；無 context 時顯示總覽版
 */

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SUBSIDIES,
  SUBSIDY_CARD_COPY,
  getContextualSubsidy,
  type Subsidy,
} from "@/data/subsidies";
import { SubsidyIcon } from "./subsidy/SubsidyIcons";

const DELAY_MS = 12_000;
const SESSION_KEY = "lufe.subsidyCard.dismissed";

// 不顯示卡片的頁面
const HIDDEN_PATHS = ["/assess", "/contact", "/resources/subsidies"];

const accentClasses: Record<
  Subsidy["accent"],
  { text: string; glow: string }
> = {
  sky: { text: "text-sky", glow: "shadow-[0_0_0_1px_rgba(91,143,168,0.3)]" },
  gold: { text: "text-gold", glow: "shadow-[0_0_0_1px_rgba(212,168,92,0.35)]" },
  ember: { text: "text-ember", glow: "shadow-[0_0_0_1px_rgba(217,139,74,0.3)]" },
};

export function SubsidyCard() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  const isHidden = HIDDEN_PATHS.some((p) => pathname?.startsWith(p));

  // Determine which subsidy (if any) to show contextually
  const contextSubsidy = useMemo(() => {
    if (!pathname) return null;
    return getContextualSubsidy(pathname);
  }, [pathname]);

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

  if (isHidden || !visible) return null;

  // Decide link target — contextual version deep-links to its anchor on the subsidies page
  const linkHref = contextSubsidy
    ? `/resources/subsidies#${contextSubsidy.slug}`
    : "/resources/subsidies";

  return (
    <div
      role="complementary"
      aria-label="政府補助資訊"
      className={`
        fixed z-[90]
        bottom-5 right-5
        md:bottom-7 md:right-7
        w-[calc(100vw-40px)] max-w-[380px]
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
        <div className="relative h-[120px] overflow-hidden">
          <Image
            src={SUBSIDY_CARD_COPY.image}
            alt=""
            fill
            sizes="380px"
            className="object-cover"
            aria-hidden="true"
          />
          {/* Navy gradient overlay for legibility */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,26,58,0.5) 0%, rgba(10,26,58,0.85) 70%, rgba(10,26,58,1) 100%)",
            }}
          />
          {/* Urgency badge */}
          <div className="absolute top-3 left-4 flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-gold motion-safe:animate-pulse"
              aria-hidden="true"
            />
            <span className="text-[9.5px] font-semibold tracking-[2px] uppercase text-gold">
              2026 開放中
            </span>
          </div>
        </div>

        {/* Top accent line */}
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
          href={linkHref}
          className="block px-6 pt-5 pb-6 group"
          onClick={() => {
            try {
              sessionStorage.setItem(SESSION_KEY, "1");
            } catch {
              /* ignore */
            }
          }}
        >
          {/* Eyebrow */}
          <div className="text-gold text-[10px] font-semibold tracking-[2px] uppercase mb-3">
            {contextSubsidy
              ? SUBSIDY_CARD_COPY.contextualTitle
              : SUBSIDY_CARD_COPY.eyebrow}
          </div>

          {contextSubsidy ? (
            // ─── Contextual variant ───
            <>
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={`shrink-0 w-11 h-11 bg-white/5 border border-white/15 flex items-center justify-center ${
                    accentClasses[contextSubsidy.accent].text
                  }`}
                >
                  <SubsidyIcon iconKey={contextSubsidy.iconKey} size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-sans text-[18px] font-semibold leading-[1.3] text-white mb-1">
                    {contextSubsidy.shortTitle}
                  </h3>
                  <p
                    className={`text-[12px] font-medium ${
                      accentClasses[contextSubsidy.accent].text
                    }`}
                  >
                    {contextSubsidy.amount}
                  </p>
                </div>
              </div>
              <p className="text-[12.5px] text-white/65 leading-[1.65] mb-4">
                {contextSubsidy.oneLiner}
              </p>
            </>
          ) : (
            // ─── General/overview variant ───
            <>
              <h3 className="font-sans text-[30px] md:text-[32px] font-extralight leading-[1.05] tracking-[-1px] text-white mb-1">
                {SUBSIDY_CARD_COPY.title}
              </h3>
              <p className="text-[13px] text-white/65 leading-[1.6] mb-4 pr-4">
                {SUBSIDY_CARD_COPY.subtitle}
              </p>
            </>
          )}

          {/* Agency strip — replaces the old 01/02/03/04 dots */}
          <div className="flex items-center gap-2 py-3 border-t border-b border-white/10 mb-4">
            <span
              className="w-4 h-px bg-white/25"
              aria-hidden="true"
            />
            <span className="text-[10px] font-medium tracking-[1px] uppercase text-white/50">
              {SUBSIDY_CARD_COPY.agencies}
            </span>
          </div>

          {/* CTA row */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-sans text-[18px] font-semibold text-gold tabular-nums leading-none">
                {SUBSIDIES.length}
              </span>
              <span className="text-[11px] text-white/55 tracking-wide">
                個計畫 · 立即可申請
              </span>
            </div>
            <span className="flex items-center gap-1.5 text-[12.5px] font-semibold text-white group-hover:text-gold transition-colors">
              {SUBSIDY_CARD_COPY.cta}
              <span
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                →
              </span>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
