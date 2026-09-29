"use client";

import {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { clamp, draggable, nearest, project, rubberband, useSpring } from "@/lib/motion";

import { carouselGeometry, type CarouselGeometry } from "./geometry";

export interface CarouselProps {
  children: ReactNode;
  label: string;
  showControls?: boolean;
  className?: string;
  itemClassName?: string;
}

const emptyGeometry: CarouselGeometry = { minX: 0, snaps: [0] };

function Arrow({ direction }: { direction: "left" | "right" }) {
  const path = direction === "left" ? "M9 3 4 8 9 13" : "M7 3 12 8 7 13";

  return <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none">
    <path d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

export function Carousel({ children, label, showControls = true, className, itemClassName }: CarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const geometryRef = useRef<CarouselGeometry>(emptyGeometry);
  const dragFrom = useRef(0);
  const wheelTimer = useRef<number | undefined>(undefined);
  const [geometry, setGeometry] = useState<CarouselGeometry>(emptyGeometry);
  const trackX = useSpring(0);
  const childCount = Children.count(children);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const paddingLeft = Number.parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
    const next = carouselGeometry(
      Array.from(track.children, (item) => {
        const child = item as HTMLElement;
        return { offsetLeft: child.offsetLeft, width: child.clientWidth };
      }),
      paddingLeft,
      viewport.clientWidth,
    );
    geometryRef.current = next;
    setGeometry(next);
    trackX.jump(nearest(next.snaps, clamp(trackX.value, next.minX, 0)));
  }, [trackX]);

  const band = useCallback((value: number) => {
    const { minX } = geometryRef.current;
    const width = viewportRef.current?.clientWidth ?? 1;

    if (value > 0) return rubberband(value, width);
    if (value < minX) return minX + rubberband(value - minX, width);
    return value;
  }, []);

  const step = useCallback((direction: number) => {
    const next = geometryRef.current;
    const index = next.snaps.indexOf(nearest(next.snaps, trackX.target));
    const target = next.snaps[clamp(index + direction, 0, next.snaps.length - 1)];
    trackX.to(target, { response: 0.5 });
  }, [trackX]);

  useLayoutEffect(() => {
    measure();
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(measure);
    observer?.observe(viewport);
    window.addEventListener("resize", measure);
    void document.fonts?.ready.then(measure);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [childCount, measure]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    return draggable(viewport, "x", {
      start() {
        trackX.stop();
        dragFrom.current = trackX.value;
      },
      move(delta) {
        trackX.jump(band(dragFrom.current + delta));
      },
      end(velocity) {
        const next = geometryRef.current;
        const target = nearest(next.snaps, clamp(trackX.value + project(velocity), next.minX, 0));
        trackX.to(target, { velocity, damping: Math.abs(velocity) > 500 ? 0.9 : 1, response: 0.5 });
      },
    });
  }, [band, trackX]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      trackX.stop();
      trackX.jump(band(trackX.value - event.deltaX));
      window.clearTimeout(wheelTimer.current);
      wheelTimer.current = window.setTimeout(() => {
        const next = geometryRef.current;
        trackX.to(nearest(next.snaps, clamp(trackX.value, next.minX, 0)), { response: 0.45 });
      }, 90);
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.clearTimeout(wheelTimer.current);
      viewport.removeEventListener("wheel", onWheel);
    };
  }, [band, trackX]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  };

  const atStart = trackX.value > -2;
  const atEnd = trackX.value < geometry.minX + 2;

  return <div className={className}>
    <div
      ref={viewportRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      className="touch-pan-y cursor-grab select-none overflow-hidden pb-8 pt-2 outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-sky"
      onKeyDown={onKeyDown}
    >
      <div
        ref={trackRef}
        className="relative flex gap-4 px-5 will-change-transform md:px-8"
        style={{ transform: `translate3d(${trackX.value}px, 0, 0)` }}
      >
        {Children.toArray(children).map((child, index) => <div key={index} className={`${itemClassName ?? "basis-[clamp(280px,82vw,380px)]"} shrink-0`}>{child}</div>)}
      </div>
    </div>
    {showControls && <div className="flex gap-2">
      <button type="button" aria-label="上一個" disabled={atStart} onClick={() => step(-1)} className="grid h-10 w-10 cursor-pointer place-items-center border border-bd bg-white text-tx disabled:cursor-not-allowed disabled:opacity-35">
        <Arrow direction="left" />
      </button>
      <button type="button" aria-label="下一個" disabled={atEnd} onClick={() => step(1)} className="grid h-10 w-10 cursor-pointer place-items-center border border-bd bg-white text-tx disabled:cursor-not-allowed disabled:opacity-35">
        <Arrow direction="right" />
      </button>
    </div>}
  </div>;
}
