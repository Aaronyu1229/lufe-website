"use client";

import { useCallback, useEffect, useRef, type JSX, type ReactNode } from "react";

import { clamp } from "@/lib/motion";

export function SnapRail({ className, children, tone = "light" }: {
  readonly className: string;
  readonly children: ReactNode;
  readonly tone?: "light" | "dark";
}): JSX.Element {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef(0);

  const update = useCallback(() => {
    frameRef.current = 0;
    const scroller = scrollerRef.current;
    const rail = railRef.current;
    const thumb = thumbRef.current;
    if (!scroller || !rail || !thumb) return;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const emphasize = mobile && !reducedMotion;

    Array.from(scroller.children).forEach((child) => {
      const element = child as HTMLElement;
      if (!emphasize) {
        element.style.opacity = "";
        element.style.transform = "";
        element.style.transformOrigin = "";
        return;
      }

      const rect = element.getBoundingClientRect();
      const visible = clamp((Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0)) / rect.width, 0, 1);
      element.style.opacity = String(0.45 + 0.55 * visible);
      element.style.transform = `scale(${0.97 + 0.03 * visible})`;
      element.style.transformOrigin = "center";
    });

    if (!mobile) return;
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    const thumbWidth = Math.max(rail.clientWidth * 0.12, rail.clientWidth * (scroller.clientWidth / Math.max(scroller.scrollWidth, 1)));
    const progress = maxScroll > 0 ? clamp(scroller.scrollLeft / maxScroll, 0, 1) : 0;
    thumb.style.width = `${thumbWidth}px`;
    thumb.style.transform = `translate3d(${progress * (rail.clientWidth - thumbWidth)}px, 0, 0)`;
  }, []);

  const scheduleUpdate = useCallback(() => {
    if (!frameRef.current) frameRef.current = window.requestAnimationFrame(update);
  }, [update]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const smallScreen = window.matchMedia("(max-width: 767px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(scheduleUpdate);

    scheduleUpdate();
    scroller.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    smallScreen.addEventListener("change", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);
    observer?.observe(scroller);

    return () => {
      scroller.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      smallScreen.removeEventListener("change", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
      observer?.disconnect();
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [scheduleUpdate]);

  const railClassName = tone === "dark" ? "bg-white/15" : "bg-bd";

  return <>
    <div ref={scrollerRef} data-snap-rail-scroller className={className}>{children}</div>
    <div ref={railRef} data-snap-rail className={`relative mt-5 h-[2px] ${railClassName} md:hidden`}>
      <span ref={thumbRef} className="absolute inset-y-0 left-0 bg-gold" style={{ width: "12%", transform: "translate3d(0, 0, 0)" }} />
    </div>
  </>;
}
