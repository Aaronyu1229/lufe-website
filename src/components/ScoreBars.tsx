"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";

/** Starts score fills only after their example reaches the viewport. */
export function ScoreBars({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    element.dataset.scoreBarsReady = "";
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      element.dataset.scoreBarsIn = "";
      observer.disconnect();
    }, { threshold: .25 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`lufe-score-bars ${className}`} {...props}>{children}</div>;
}
