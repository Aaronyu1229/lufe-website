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
  tone?: "light" | "dark";
  previousLabel?: string;
  nextLabel?: string;
}

type SlideGeometry = { readonly offsetLeft: number; readonly width: number };

const emptyGeometry: CarouselGeometry = { minX: 0, snaps: [0] };

function Arrow({ direction }: { direction: "left" | "right" }) {
  const path = direction === "left" ? "M9 3 4 8 9 13" : "M7 3 12 8 7 13";

  return <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none">
    <path d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

function ordinal(value: number) {
  return String(value).padStart(2, "0");
}

export function Carousel({ children, label, showControls = true, className, itemClassName, tone = "light", previousLabel = "上一個", nextLabel = "下一個" }: CarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const railThumbRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const geometryRef = useRef<CarouselGeometry>(emptyGeometry);
  const slideGeometryRef = useRef<readonly SlideGeometry[]>([]);
  const dragFrom = useRef(0);
  const wheelTimer = useRef<number | undefined>(undefined);
  const [geometry, setGeometry] = useState<CarouselGeometry>(emptyGeometry);
  const [reducedMotion, setReducedMotion] = useState(false);
  const trackX = useSpring(0);
  const childCount = Children.count(children);

  const updatePresentation = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const viewportRect = viewport.getBoundingClientRect();
    const viewportCenter = viewportRect.left + viewportRect.width / 2;
    const x = trackX.value;
    Array.from(track.children).forEach((slide, index) => {
      const element = slide as HTMLElement;
      const measurement = slideGeometryRef.current[index];
      if (!measurement) return;

      if (reducedMotion) {
        element.style.opacity = "1";
        element.style.transform = "scale(1)";
        element.style.transformOrigin = "center";
        element.querySelectorAll<HTMLElement>("[data-carousel-parallax]").forEach((parallax) => {
          parallax.style.transform = "";
        });
        return;
      }

      const left = viewportRect.left + measurement.offsetLeft + x;
      const right = left + measurement.width;
      const visible = clamp((Math.min(right, viewportRect.right) - Math.max(left, viewportRect.left)) / measurement.width, 0, 1);
      const slideCenter = left + measurement.width / 2;
      element.style.opacity = String(0.45 + 0.55 * visible);
      element.style.transform = `scale(${0.97 + 0.03 * visible})`;
      element.style.transformOrigin = "center";
      element.querySelectorAll<HTMLElement>("[data-carousel-parallax]").forEach((parallax) => {
        parallax.style.transform = `translate3d(${-0.06 * (slideCenter - viewportCenter)}px, 0, 0) scale(1.12)`;
      });
    });

    const thumb = railThumbRef.current;
    const rail = railRef.current;
    if (thumb && rail) {
      const contentWidth = Math.max(track.scrollWidth, viewport.clientWidth);
      const thumbWidth = Math.max(rail.clientWidth * 0.12, rail.clientWidth * (viewport.clientWidth / contentWidth));
      const progress = geometryRef.current.minX === 0 ? 0 : clamp(-x / -geometryRef.current.minX, 0, 1);
      thumb.style.width = `${thumbWidth}px`;
      thumb.style.transform = `translate3d(${progress * (rail.clientWidth - thumbWidth)}px, 0, 0)`;
    }

    const snap = nearest(geometryRef.current.snaps, clamp(x, geometryRef.current.minX, 0));
    const current = Math.min(childCount, geometryRef.current.snaps.indexOf(snap) + 1);
    if (counterRef.current) counterRef.current.textContent = `${ordinal(current)} / ${ordinal(childCount)}`;
  }, [childCount, reducedMotion, trackX]);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const paddingLeft = Number.parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
    const slides = Array.from(track.children, (item) => {
      const child = item as HTMLElement;
      return { offsetLeft: child.offsetLeft, width: child.clientWidth };
    });
    slideGeometryRef.current = slides;
    const next = carouselGeometry(slides, paddingLeft, viewport.clientWidth);
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
    if (reducedMotion) trackX.jump(target);
    else trackX.to(target, { damping: 1, response: 0.45 });
  }, [reducedMotion, trackX]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => setReducedMotion(mediaQuery.matches);

    updateReducedMotion();
    mediaQuery.addEventListener("change", updateReducedMotion);
    return () => mediaQuery.removeEventListener("change", updateReducedMotion);
  }, []);

  useEffect(() => {
    if (!reducedMotion) return;
    const next = geometryRef.current;
    trackX.jump(nearest(next.snaps, clamp(trackX.value, next.minX, 0)));
  }, [reducedMotion, trackX]);

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

  useLayoutEffect(() => {
    updatePresentation();
  }, [geometry, trackX.value, updatePresentation]);

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
        if (reducedMotion) trackX.jump(target);
        else trackX.to(target, { velocity, damping: Math.abs(velocity) > 500 ? 0.85 : 1, response: 0.45 });
      },
    });
  }, [band, reducedMotion, trackX]);

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
        const target = nearest(next.snaps, clamp(trackX.value, next.minX, 0));
        if (reducedMotion) trackX.jump(target);
        else trackX.to(target, { damping: 1, response: 0.45 });
      }, 90);
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.clearTimeout(wheelTimer.current);
      viewport.removeEventListener("wheel", onWheel);
    };
  }, [band, reducedMotion, trackX]);

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
  const isDark = tone === "dark";
  const railClassName = isDark ? "bg-white/15" : "bg-bd";
  const counterClassName = isDark ? "text-white/55" : "text-tx3";
  const buttonClassName = isDark
    ? "border-white/25 bg-transparent text-white"
    : "border-bd bg-white text-tx";

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
        data-carousel-track
        className="relative flex gap-4 px-5 will-change-transform md:px-8"
        style={{ transform: `translate3d(${trackX.value}px, 0, 0)` }}
      >
        {Children.toArray(children).map((child, index) => <div key={index} className={`${itemClassName ?? "basis-[clamp(280px,82vw,380px)]"} shrink-0`}>{child}</div>)}
      </div>
    </div>
    {showControls && <div className="flex items-center gap-4">
      <div ref={railRef} data-carousel-rail className={`relative h-[2px] flex-1 ${railClassName}`}>
        <span ref={railThumbRef} className="absolute inset-y-0 left-0 bg-gold" style={{ width: "12%", transform: "translate3d(0, 0, 0)" }} />
      </div>
      <span ref={counterRef} aria-hidden="true" className={`text-[13px] tabular-nums ${counterClassName}`}>{ordinal(1)} / {ordinal(childCount)}</span>
      <button type="button" aria-label={previousLabel} disabled={atStart} onClick={() => step(-1)} className={`grid h-10 w-10 cursor-pointer place-items-center border active:scale-[.94] disabled:cursor-not-allowed disabled:opacity-35 [@media(hover:hover)]:hover:border-gold ${buttonClassName}`}>
        <Arrow direction="left" />
      </button>
      <button type="button" aria-label={nextLabel} disabled={atEnd} onClick={() => step(1)} className={`grid h-10 w-10 cursor-pointer place-items-center border active:scale-[.94] disabled:cursor-not-allowed disabled:opacity-35 [@media(hover:hover)]:hover:border-gold ${buttonClassName}`}>
        <Arrow direction="right" />
      </button>
    </div>}
  </div>;
}
