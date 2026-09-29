"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useId,
  type ReactNode,
} from "react";

import { useSpring } from "@/lib/motion";

export interface DisclosureProps {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  id?: string;
}

function Chevron({ open }: { open: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 transition-transform" style={{ transform: `rotate(${open ? 180 : 0}deg)` }} fill="none">
    <path d="m3 5.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

export function Disclosure({ summary, children, defaultOpen = false, id }: DisclosureProps) {
  const generatedId = useId();
  const contentId = id ?? `disclosure-${generatedId}`;
  const contentRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(defaultOpen);
  const measuredRef = useRef(false);
  const [open, setOpen] = useState(defaultOpen);
  const [interacted, setInteracted] = useState(false);
  const contentHeight = useRef(0);
  const height = useSpring(defaultOpen ? 1 : 0);

  const measure = useCallback(() => {
    const nextHeight = contentRef.current?.scrollHeight ?? 0;
    contentHeight.current = nextHeight;
    if (!measuredRef.current) {
      measuredRef.current = true;
      height.jump(openRef.current ? nextHeight : 0);
      return;
    }
    if (openRef.current) height.jump(nextHeight);
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
    const next = !open;
    openRef.current = next;
    setInteracted(true);
    setOpen(next);
    height.to(next ? contentHeight.current : 0, { response: 0.42 });
  };

  return <div className="border-t border-bd2 last:border-b">
    <button type="button" aria-expanded={open} aria-controls={contentId} onClick={toggle} className="grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-3 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-sky">
      <span className="text-lg font-semibold text-tx">{summary}</span>
      <span className="grid h-7 w-7 place-items-center bg-black/[.06] text-tx2"><Chevron open={open} /></span>
    </button>
    <div id={contentId} aria-hidden={!open} inert={!open} className="overflow-hidden" style={{ height: open && !interacted ? "auto" : height.value }}>
      <div ref={contentRef} className="pb-6 text-tx2">{children}</div>
    </div>
  </div>;
}
