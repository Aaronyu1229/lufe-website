"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { CHAPTERS, PHILIPPINES_CHAPTER_KEYS, type PhilippinesChapterKey } from "@/data/chapters";
import { localizedHref, type Locale } from "@/i18n/locale";

const chapterBarEn: Record<PhilippinesChapterKey, { readonly label: string; readonly title: string }> = {
  m1: { label: "Month 1 · Market Test", title: "Validate the market before deciding what to invest" },
  m3: { label: "Month 3 · Consignment", title: "Get listed, then let people try it" },
  m9: { label: "Month 9 · Company Setup", title: "Build your own team on the ground" },
  after: { label: "Every day after · Call Center", title: "Let a professional English-speaking team handle customer service" },
};

export function ChapterBar({ current, locale = "zh" }: { readonly current: PhilippinesChapterKey; readonly locale?: Locale }) {
  const [atEdge, setAtEdge] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const currentIndex = PHILIPPINES_CHAPTER_KEYS.indexOf(current);

  useEffect(() => {
    const update = () => setAtEdge(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const link = scroller?.querySelector<HTMLAnchorElement>(`[data-chapter-key="${current}"]`);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (scroller && link) {
      scroller.scrollTo({
        left: link.offsetLeft - (scroller.clientWidth - link.offsetWidth) / 2,
        behavior: reduced ? "auto" : "smooth",
      });
    }
  }, [current]);

  return (
    <nav aria-label={locale === "en" ? "Philippines service chapters" : "菲律賓服務章節"} className={`lufe-chapter-bar sticky top-[64px] z-20 py-3 ${atEdge ? "lufe-chapter-bar-edge" : ""}`}>
      <div ref={scrollerRef} className="lufe-container flex items-center gap-0 overflow-x-auto md:justify-between md:overflow-visible">
        {PHILIPPINES_CHAPTER_KEYS.map((key, index) => {
          const chapter = CHAPTERS[key];
          const copy = locale === "en" ? chapterBarEn[key] : chapter;
          const isCurrent = key === current;
          const isDone = index < currentIndex;
          const previewOn = previewIndex !== null && index > currentIndex && index <= previewIndex;

          return (
            <div key={key} className="flex shrink-0 items-center gap-2">
              {index > 0 ? <span aria-hidden="true" className={`lufe-chapter-line ${index <= currentIndex ? "lufe-chapter-line-done" : ""}`}><span className="lufe-chapter-line-preview" data-on={previewOn} /></span> : null}
              <Link
                href={localizedHref(locale, chapter.path)}
                data-chapter-key={key}
                aria-current={isCurrent ? "page" : undefined}
                className={`lufe-chapter-link ${isCurrent ? "lufe-chapter-link-current" : ""} ${isDone ? "lufe-chapter-link-done" : ""}`}
                onPointerEnter={() => setPreviewIndex(index)}
                onPointerLeave={() => setPreviewIndex(null)}
                onFocus={() => setPreviewIndex(index)}
                onBlur={() => setPreviewIndex(null)}
              >
                <span aria-hidden="true" className="lufe-chapter-dot" />
                <span>{copy.label}</span>
                <span aria-hidden="true" className="lufe-chapter-peek">{copy.title}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
