"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const numberPattern = /^(.*?)(-?\d[\d,]*)([^\d]*)$/;

function isReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function DelightLayer() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("#main-content");
    if (!root) return;

    const reduced = isReducedMotion();
    const observers: IntersectionObserver[] = [];
    const cleanups: Array<() => void> = [];
    const onView = (elements: readonly Element[], callback: (element: HTMLElement) => void) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          callback(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -12% 0px" });
      elements.forEach((element) => observer.observe(element));
      observers.push(observer);
    };

    const goldHeadings = Array.from(root.querySelectorAll<HTMLElement>("h2"))
      .filter((heading) => Boolean(heading.querySelector('[class*="text-gold"]')));
    goldHeadings.forEach((heading) => heading.setAttribute("data-lufe-heading", ""));
    if (reduced) goldHeadings.forEach((heading) => { heading.dataset.lufeHeadingLit = ""; });
    else onView(goldHeadings, (heading) => { heading.dataset.lufeHeadingLit = ""; });
    root.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
      const text = link.textContent ?? "";
      if (text.includes("→")) link.setAttribute("data-lufe-arrow", "");
      if (/看所有|下一章|閱讀更多|完整故事|全部案例/.test(text)) link.setAttribute("data-lufe-text-link", "");
    });

    const counters = Array.from(root.querySelectorAll<HTMLElement>("[data-lufe-counter], .num"))
      .filter((element) => !element.hasAttribute("data-lufe-score-total") && !element.dataset.lufeCounterReady);
    counters.forEach((element) => { element.dataset.lufeCounterReady = ""; });
    onView(counters, (element) => {
      const match = (element.textContent ?? "").trim().match(numberPattern);
      if (!match || reduced) return;
      const [, prefix, value, suffix] = match;
      const target = Number(value.replace(/,/g, ""));
      if (!Number.isFinite(target)) return;
      const started = performance.now();
      const duration = 900 + Math.min(Math.abs(target), 600);
      const tick = (now: number) => {
        const progress = Math.min(1, (now - started) / duration);
        const eased = 1 - (1 - progress) ** 4;
        element.textContent = `${prefix}${Math.round(target * eased).toLocaleString()}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });

    const heroBackdrops = pathname === "/" ? [] : Array.from(root.querySelectorAll<HTMLElement>(".lufe-hero-backdrop"));
    heroBackdrops.forEach((backdrop) => backdrop.setAttribute("data-lufe-hero-photo", ""));
    if (!reduced) onView(heroBackdrops, (element) => { element.dataset.lufeHeroSettled = ""; });

    const sweepRows = Array.from(root.querySelectorAll<HTMLElement>("[data-lufe-sweep]"));
    if (!reduced) onView(sweepRows, (element) => { element.dataset.lufeSweep = ""; });

    const beliefs = Array.from(root.querySelectorAll<HTMLElement>("[data-lufe-belief]"));
    if (reduced) beliefs.forEach((belief) => { belief.dataset.lufeBeliefLit = ""; });
    else onView(beliefs, (belief) => { belief.dataset.lufeBeliefLit = ""; });

    const glowSections = Array.from(root.querySelectorAll<HTMLElement>("section.bg-navy"))
      .filter((section) => /聊聊|登記|預約/.test(section.textContent ?? ""));
    glowSections.forEach((section) => {
      section.dataset.lufeGlow = "";
      const move = (event: PointerEvent) => {
        const rect = section.getBoundingClientRect();
        section.style.setProperty("--lufe-glow-x", `${event.clientX - rect.left}px`);
        section.style.setProperty("--lufe-glow-y", `${event.clientY - rect.top}px`);
      };
      section.addEventListener("pointermove", move);
      cleanups.push(() => section.removeEventListener("pointermove", move));
    });

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
      const longPage = root.offsetHeight > window.innerHeight * 2.5;
      if (progressRef.current) {
        progressRef.current.style.opacity = longPage ? "1" : "0";
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
      const shouldShowTop = window.scrollY > window.innerHeight * 1.5;
      setShowTop((visible) => visible === shouldShowTop ? visible : shouldShowTop);
      if (!reduced) heroBackdrops.forEach((backdrop) => {
        const rect = backdrop.parentElement?.getBoundingClientRect();
        if (!rect || rect.bottom <= 0) return;
        backdrop.style.setProperty("--lufe-hero-drift", `${Math.max(0, -rect.top) * 0.15}px`);
      });
      root.querySelectorAll<HTMLElement>("[data-lufe-steps]").forEach((steps) => {
        const rect = steps.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (window.innerHeight * .75 - rect.top) / (rect.height + window.innerHeight * .25)));
        steps.style.setProperty("--lufe-step-progress", String(progress));
        Array.from(steps.querySelectorAll<HTMLElement>("[data-lufe-step]")).forEach((step, index, all) => {
          step.dataset.lufeStepReached = String(progress >= (index + .5) / all.length || reduced);
        });
      });
      root.querySelectorAll<HTMLElement>("[data-lufe-track-rows]").forEach((rows) => {
        const rect = rows.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (window.innerHeight * .7 - rect.top) / Math.max(rect.height, 1)));
        Array.from(rows.querySelectorAll<HTMLElement>("[data-lufe-track-row]")).forEach((row, index, all) => {
          row.dataset.lufeTrackReached = String(progress >= index / all.length || reduced);
          if (row.hasAttribute("data-lufe-track-last") && progress >= (all.length - 1) / all.length) row.dataset.lufeTrackArrived = "";
        });
      });
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
      observers.forEach((observer) => observer.disconnect());
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [pathname]);

  return <>
    <div ref={progressRef} aria-hidden="true" className="lufe-reading-progress" />
    <button
      type="button"
      aria-label="回到頂端"
      onClick={() => window.scrollTo({ top: 0, behavior: isReducedMotion() ? "auto" : "smooth" })}
      className={`lufe-back-to-top ${showTop ? "lufe-back-to-top-visible" : ""}`}
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 14 6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
  </>;
}
