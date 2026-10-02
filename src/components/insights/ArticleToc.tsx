"use client";

import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent, type RefObject } from "react";

import { useSpring } from "@/lib/motion";

export type Heading = {
  readonly id: string;
  readonly text: string;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToHeading(event: MouseEvent<HTMLAnchorElement>, id: string) {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}

export function useActiveHeading(headings: readonly Heading[]) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!headings.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const next = headings.reduce((current, heading, index) => {
        const element = document.getElementById(heading.id);
        return element && element.getBoundingClientRect().top <= 120 ? index : current;
      }, 0);
      setActiveIndex(next);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [headings]);

  return activeIndex;
}

export function useReadingProgress() {
  const progress = useSpring(0, { precision: 0.001 });

  useEffect(() => {
    const update = () => {
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      progress.to(maximum > 0 ? Math.min(1, Math.max(0, window.scrollY / maximum)) : 0, { response: 0.24, damping: 1 });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progress]);

  return progress;
}

export function ReadingProgress({ progress }: { readonly progress: number }) {
  return <div aria-hidden="true" className="fixed left-0 right-0 top-[74px] z-[51] h-[2px] origin-left bg-gold will-change-transform" style={{ transform: `scaleX(${progress})` }} />;
}

export function ArticleTocList({
  headings,
  activeIndex,
  onNavigate,
  variant,
  progress,
  minutes,
}: {
  readonly headings: readonly Heading[];
  readonly activeIndex: number;
  readonly onNavigate?: () => void;
  readonly variant: "aside" | "inline" | "sheet";
  readonly progress?: number;
  readonly minutes?: number;
}) {
  const itemRefs = useRef(new Map<string, HTMLLIElement>());
  const plateY = useSpring(0, { response: 0.35, damping: 1, precision: 0.001 });
  const plateHeight = useSpring(0, { response: 0.35, damping: 1, precision: 0.001 });
  const hasAside = variant === "aside";

  useLayoutEffect(() => {
    if (!hasAside) return;
    const item = itemRefs.current.get(headings[activeIndex]?.id ?? "");
    if (!item) return;
    if (prefersReducedMotion()) {
      plateY.jump(item.offsetTop);
      plateHeight.jump(item.offsetHeight);
      return;
    }
    plateY.to(item.offsetTop, { response: 0.35, damping: 1 });
    plateHeight.to(item.offsetHeight, { response: 0.35, damping: 1 });
  }, [activeIndex, hasAside, headings, plateHeight, plateY]);

  if (!headings.length) return null;

  const current = String(activeIndex + 1).padStart(2, "0");
  const total = String(headings.length).padStart(2, "0");
  const remaining = minutes && progress !== undefined ? Math.ceil(minutes * (1 - progress)) : undefined;

  return <nav aria-label="本文目錄" data-article-toc-variant={variant} className="relative">
    {hasAside ? <div className="mb-3 flex items-center justify-between text-[13px] font-semibold text-tx3"><span>本文目錄</span><span className="tabular-nums">{current} / {total}</span></div> : null}
    <div className="relative">
      {hasAside ? <span aria-hidden="true" className="absolute left-0 top-0 z-0 w-full border-l-2 border-gold bg-cream" style={{ height: `${plateHeight.value}px`, transform: `translateY(${plateY.value}px)` }} /> : null}
      <ol className="relative z-[1]">
        {headings.map((heading, index) => {
          const state = index < activeIndex ? "text-tx3" : index === activeIndex ? "font-semibold text-tx" : "text-tx2";
          const numberState = index === activeIndex ? "text-gold-d" : "text-tx3";
          return <li key={heading.id} ref={hasAside ? (element) => { if (element) itemRefs.current.set(heading.id, element); } : undefined}>
            <a href={`#${heading.id}`} onClick={(event) => { scrollToHeading(event, heading.id); onNavigate?.(); }} className={`grid grid-cols-[28px_minmax(0,1fr)] gap-2 py-2.5 pr-3 pl-3 text-[14px] leading-[1.5] active:scale-[.985] [@media(hover:hover)]:hover:text-tx ${state}`}>
              <span className={`font-[var(--font-inter)] text-[12px] font-semibold tabular-nums ${numberState}`}>{String(index + 1).padStart(2, "0")}</span>
              <span className="line-clamp-2">{heading.text}</span>
            </a>
          </li>;
        })}
      </ol>
    </div>
    {hasAside && progress !== undefined ? <div className="mt-5">
      <div className="h-[2px] bg-bd"><span className="block h-full origin-left bg-gold" style={{ transform: `scaleX(${progress})` }} /></div>
      {remaining !== undefined ? <p className="mt-2 text-right text-[12px] text-tx3">{progress >= 0.98 ? "已讀完" : `剩約 ${remaining} 分鐘`}</p> : null}
    </div> : null}
  </nav>;
}

export function MobileArticleToc({
  headings,
  activeIndex,
  coverRef,
}: {
  readonly headings: readonly Heading[];
  readonly activeIndex: number;
  readonly coverRef: RefObject<HTMLElement | null>;
}) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reveal = useSpring(0, { response: 0.24, damping: 1, precision: 0.001 });
  const sheetHeight = useSpring(0, { response: 0.32, damping: 1, precision: 0.001 });
  const sheetOpacity = useSpring(0, { response: 0.24, damping: 1, precision: 0.001 });

  useEffect(() => {
    if (!headings.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible((coverRef.current?.getBoundingClientRect().top ?? Infinity) <= 0);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [coverRef, headings.length]);

  useEffect(() => {
    if (prefersReducedMotion()) reveal.jump(visible ? 1 : 0);
    else reveal.to(visible ? 1 : 0, { response: 0.24, damping: 1 });
  }, [reveal, visible]);

  useEffect(() => {
    if (!open) {
      if (prefersReducedMotion()) {
        sheetHeight.jump(0);
        sheetOpacity.jump(0);
      } else {
        sheetHeight.to(0, { response: 0.32, damping: 1 });
        sheetOpacity.to(0, { response: 0.24, damping: 1 });
      }
      return;
    }
    const measure = () => {
      const height = Math.min(contentRef.current?.scrollHeight ?? 0, window.innerHeight * 0.6);
      if (prefersReducedMotion()) {
        sheetHeight.jump(height);
        sheetOpacity.jump(1);
      } else {
        sheetHeight.to(height, { response: 0.32, damping: 1 });
        sheetOpacity.to(1, { response: 0.24, damping: 1 });
      }
    };
    const frame = window.requestAnimationFrame(measure);
    return () => window.cancelAnimationFrame(frame);
  }, [open, sheetHeight, sheetOpacity]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!shellRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!headings.length) return null;

  const current = String(activeIndex + 1).padStart(2, "0");
  const total = String(headings.length).padStart(2, "0");
  const controls = "article-toc-sheet";
  return <div ref={shellRef} className={`${visible ? "pointer-events-auto" : "pointer-events-none"} fixed inset-x-0 top-[76px] z-[50] lg:hidden`} style={{ opacity: reveal.value, transform: `translateY(${(1 - reveal.value) * -8}px)` }}>
    <div className="pointer-events-auto h-11 border-b border-bd bg-white/90 backdrop-blur [@media(prefers-reduced-transparency:reduce)]:bg-white">
      <button type="button" aria-expanded={open} aria-controls={controls} onClick={() => setOpen((value) => !value)} className="grid h-full w-full grid-cols-[auto_minmax(0,1fr)_28px] items-center gap-3 px-4 text-left active:scale-[.97]">
        <span className="text-[12px] tabular-nums text-gold-d">{current} / {total}</span>
        <span className="truncate text-[14px] font-semibold text-tx">{headings[activeIndex]?.text}</span>
        <span aria-hidden="true" className="grid h-7 w-7 place-items-center border border-bd text-[18px] text-tx" style={{ transform: `rotate(${open ? 45 : 0}deg)` }}>+</span>
      </button>
    </div>
    <div id={controls} hidden={!open} className="pointer-events-auto overflow-hidden border-b border-bd bg-white" style={{ height: `${sheetHeight.value}px` }}>
      <div ref={contentRef} className="max-h-[60svh] overflow-y-auto px-1" style={{ opacity: sheetOpacity.value }}>
        <ArticleTocList headings={headings} activeIndex={activeIndex} variant="sheet" onNavigate={() => setOpen(false)} />
      </div>
    </div>
  </div>;
}
