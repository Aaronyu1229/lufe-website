"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type JSX,
  type ReactNode,
} from "react";

import { PlusIcon } from "@/components/icons/LineIcons";
import { useSpring } from "@/lib/motion";

function disclosureHeight(open: boolean, currentHeight: number, moving: boolean): number | "auto" {
  return open && !moving ? "auto" : currentHeight;
}

export function AccordionItem({ id, num, header, children, defaultOpen = false }: {
  readonly id: string;
  readonly num: string;
  readonly header: ReactNode;
  readonly children: ReactNode;
  readonly defaultOpen?: boolean;
}): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(defaultOpen);
  const measuredRef = useRef(false);
  const [open, setOpen] = useState(defaultOpen);
  const contentHeight = useRef(0);
  const height = useSpring(0);
  const plusProgress = useSpring(defaultOpen ? 1 : 0, { response: 0.25, damping: 1, precision: 0.001 });

  const measure = useCallback(() => {
    const nextHeight = contentRef.current?.scrollHeight ?? 0;
    contentHeight.current = nextHeight;
    if (!measuredRef.current) {
      measuredRef.current = true;
      height.jump(openRef.current ? nextHeight : 0);
      return;
    }
    if (openRef.current) {
      if (height.moving) height.to(nextHeight, { response: 0.32, damping: 1 });
      else height.jump(nextHeight);
    }
  }, [height]);

  useLayoutEffect(() => {
    measure();
    const content = contentRef.current;
    if (!content) return;

    const observer = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(measure);
    observer?.observe(content);
    return () => observer?.disconnect();
  }, [measure]);

  const toggle = () => {
    const next = !openRef.current;
    const currentHeight = containerRef.current?.getBoundingClientRect().height ?? height.value;
    const targetHeight = contentRef.current?.scrollHeight ?? contentHeight.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    openRef.current = next;
    setOpen(next);
    height.jump(currentHeight);
    if (reducedMotion) {
      height.jump(next ? targetHeight : 0);
      plusProgress.jump(next ? 1 : 0);
      return;
    }
    height.to(next ? targetHeight : 0, { response: 0.32, damping: 1 });
    plusProgress.to(next ? 1 : 0, { response: 0.25, damping: 1 });
  };

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    content.style.opacity = String(height.moving
      ? Math.max(0, Math.min(1, height.value / Math.max(contentHeight.current, 1) * 1.4 - 0.2))
      : open ? 1 : 0);
  }, [height.moving, height.value, open]);

  return (
    <div className="border-t border-bd last:border-b">
      <button type="button" aria-expanded={open} aria-controls={id} onClick={toggle} className="group grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_32px] items-center gap-4 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-gold">
        <span className="grid min-w-0 grid-cols-[42px_minmax(0,1fr)] items-center gap-3 md:grid-cols-[58px_minmax(0,1fr)] md:gap-4">
          <span className={`font-[var(--font-inter)] text-[28px] font-semibold leading-[1.4] tabular-nums ${open ? "text-gold-d" : "text-tx3/40"}`}>{num}</span>
          {header}
        </span>
        <span aria-hidden="true" className="grid h-8 w-8 place-items-center border border-bd text-tx [@media(hover:hover)]:group-hover:border-gold-d">
          <span className="block" style={{ transform: `rotate(${plusProgress.value * 45}deg)` }}><PlusIcon size={18} /></span>
        </span>
      </button>
      <div ref={containerRef} id={id} aria-hidden={!open} inert={!open} className="overflow-hidden" style={{ height: disclosureHeight(open, height.value, height.moving) }}>
        <div ref={contentRef} className="pb-7 pl-[42px] md:pl-[58px]">
          {children}
        </div>
      </div>
    </div>
  );
}
