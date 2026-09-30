"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";

/**
 * Keeps children visible in SSR HTML. The initial hidden state is added only
 * after hydration, then released as the group enters the viewport.
 */
export function Reveal({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    element.dataset.revealReady = "";
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      element.dataset.revealed = "";
      observer.disconnect();
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`lufe-reveal ${className}`} {...props}>{children}</div>;
}
