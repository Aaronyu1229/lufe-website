"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { clamp, useSpring } from "@/lib/motion";

import { segmentedPill, type SegmentGeometry } from "./geometry";

export interface SegmentedOption {
  value: string;
  label: ReactNode;
}

export interface SegmentedProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
}

export function Segmented({ options, value, onChange, label, className }: SegmentedProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value));
  const [segments, setSegments] = useState<SegmentGeometry[]>([]);
  const pill = useSpring(selectedIndex, { precision: 0.002 });

  const measure = useCallback(() => {
    const nextSegments = buttonRefs.current.map((button) => ({
      left: button?.offsetLeft ?? 0,
      width: button?.offsetWidth ?? 0,
    }));
    const currentIndex = Math.max(0, buttonRefs.current.findIndex((button) => button?.getAttribute("aria-checked") === "true"));
    setSegments(nextSegments);
    if (!pill.moving) pill.jump(currentIndex);
  }, [pill]);

  useLayoutEffect(() => {
    measure();
    const root = rootRef.current;
    if (!root) return;

    const observer = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(measure);
    observer?.observe(root);
    window.addEventListener("resize", measure);
    void document.fonts?.ready.then(measure);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, options.length]);

  useEffect(() => {
    pill.to(selectedIndex, { response: 0.38 });
  }, [pill, selectedIndex]);

  const select = (index: number) => {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = clamp(index - 1, 0, options.length - 1);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = clamp(index + 1, 0, options.length - 1);
    if (next === index) return;

    event.preventDefault();
    select(next);
    buttonRefs.current[next]?.focus({ preventScroll: true });
  };

  const pillGeometry = segmentedPill(segments, pill.value);
  return <div ref={rootRef} role="radiogroup" aria-label={label} className={`relative inline-flex max-w-full gap-0.5 overflow-x-auto bg-black/[.06] p-1 ${className ?? ""}`}>
    <span aria-hidden="true" className="absolute bottom-1 left-0 top-1 z-0 bg-white shadow-[0_1px_3px_rgba(16,27,48,.12),0_0_0_.5px_rgba(16,27,48,.06)] will-change-transform" style={{ transform: `translate3d(${pillGeometry.left}px, 0, 0)`, width: pillGeometry.width }} />
    {options.map((option, index) => <button
      key={option.value}
      ref={(element) => { buttonRefs.current[index] = element; }}
      type="button"
      role="radio"
      aria-checked={option.value === value}
      tabIndex={option.value === value ? 0 : -1}
      className="relative z-10 cursor-pointer whitespace-nowrap px-4 py-2 text-sm font-medium text-tx2 outline-none focus-visible:ring-2 focus-visible:ring-gold"
      onClick={() => select(index)}
      onKeyDown={(event) => onKeyDown(event, index)}
    >
      {option.label}
    </button>)}
  </div>;
}
