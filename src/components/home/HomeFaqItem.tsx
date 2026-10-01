"use client";

import {
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { PlusIcon } from "@/components/icons/LineIcons";
import { useSpring } from "@/lib/motion";
import type { HomeFaqItem as HomeFaqItemData } from "@/data/homeFaq";

function disclosureHeight(open: boolean, currentHeight: number, moving: boolean): number | "auto" {
  return open && !moving ? "auto" : currentHeight;
}

export function HomeFaqItem({ item, defaultOpen = false }: { item: HomeFaqItemData; defaultOpen?: boolean }) {
  const generatedId = useId();
  const contentId = `home-faq-${item.num}-${generatedId}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(defaultOpen);
  const measuredRef = useRef(false);
  const [open, setOpen] = useState(defaultOpen);
  const contentHeight = useRef(0);
  const height = useSpring(0);
  const plusProgress = useSpring(defaultOpen ? 1 : 0, { response: 0.3, damping: 1, precision: 0.001 });
  const accentProgress = useSpring(defaultOpen ? 1 : 0, { response: 0.35, damping: 1, precision: 0.001 });

  const measure = useCallback(() => {
    const nextHeight = contentRef.current?.scrollHeight ?? 0;
    contentHeight.current = nextHeight;
    if (!measuredRef.current) {
      measuredRef.current = true;
      height.jump(openRef.current ? nextHeight : 0);
      return;
    }
    if (openRef.current) {
      if (height.moving) height.to(nextHeight, { response: 0.42 });
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

    openRef.current = next;
    setOpen(next);
    height.jump(currentHeight);
    height.to(next ? targetHeight : 0, { response: 0.42 });
    plusProgress.to(next ? 1 : 0, { response: 0.3, damping: 1 });
    accentProgress.to(next ? 1 : 0, { response: 0.35, damping: 1 });
  };

  return (
    <div className="relative border-t border-bd last:border-b">
      <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-[3px] origin-top bg-gold" style={{ transform: `scaleY(${accentProgress.value})` }} />
      <button type="button" aria-expanded={open} aria-controls={contentId} onClick={toggle} className="grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_32px] items-center gap-4 py-6 text-left outline-none transition-[background-color,transform] duration-150 [@media(hover:hover)]:hover:bg-cream/60 active:scale-[.995] focus-visible:ring-2 focus-visible:ring-gold">
        <span className="grid min-w-0 grid-cols-[42px_minmax(0,1fr)] items-center gap-3 md:grid-cols-[58px_minmax(0,1fr)] md:gap-4">
          <span className={`font-[var(--font-inter)] text-[28px] font-semibold leading-[1.4] tabular-nums transition-colors duration-200 ${open ? "text-gold-d" : "text-tx3/40"}`}>{item.num}</span>
          <span className="text-[20px] font-semibold leading-[1.5] text-tx">{item.question}</span>
        </span>
        <span aria-hidden="true" className="grid h-8 w-8 place-items-center border border-bd text-tx">
          <span className="block" style={{ transform: `rotate(${plusProgress.value * 45}deg)` }}><PlusIcon size={18} /></span>
        </span>
      </button>
      <div ref={containerRef} id={contentId} aria-hidden={!open} inert={!open} className="overflow-hidden" style={{ height: disclosureHeight(open, height.value, height.moving) }}>
        <div ref={contentRef} className="pb-7 pl-[42px] md:pl-[58px]">
          <p className="max-w-[650px] border-l-2 border-gold pl-4 text-[17px] font-medium leading-[1.65] text-tx">{item.takeaway}</p>
          <p className="mt-4 max-w-[650px] whitespace-pre-line text-[15.5px] leading-[1.85] text-tx2">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}
