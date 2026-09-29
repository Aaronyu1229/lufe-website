"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { clamp, draggable, project, rubberband, useSpring } from "@/lib/motion";

interface PanelRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface ExpandCardProps {
  card: ReactNode;
  panel: ReactNode;
  title: string;
  image?: { src: string; alt: string };
  className?: string;
}

const interpolate = (from: number, to: number, progress: number) => from + (to - from) * progress;

const rectOf = (element: HTMLElement): PanelRect => {
  const rect = element.getBoundingClientRect();
  return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
};

function CloseIcon() {
  return <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none">
    <path d="m4 4 8 8m0-8-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>;
}

export function ExpandCard({ card, panel, title, image, className }: ExpandCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dragFrom = useRef(0);
  const dialogId = useId();
  const [present, setPresent] = useState(false);
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState<PanelRect | null>(null);
  const [to, setTo] = useState<PanelRect | null>(null);
  const morph = useSpring(0);
  const pull = useSpring(0);

  const finalRect = useCallback((): PanelRect => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    if (viewportWidth < 700) return { left: 0, top: 44, width: viewportWidth, height: viewportHeight - 44 };

    const width = Math.min(760, viewportWidth - 80);
    const height = Math.min(viewportHeight - 80, 860);
    return { left: (viewportWidth - width) / 2, top: (viewportHeight - height) / 2, width, height };
  }, []);

  const close = useCallback((velocity = 0) => {
    const source = cardRef.current;
    if (!source || !present) return;

    setFrom(rectOf(source));
    setOpen(false);
    pull.to(0, { response: 0.45, velocity });
    morph.to(0, {
      response: 0.45,
      onRest: () => {
        setPresent(false);
        window.requestAnimationFrame(() => source.focus({ preventScroll: true }));
      },
    });
  }, [morph, present, pull]);

  const openPanel = () => {
    const source = cardRef.current;
    if (!source || present) return;

    setFrom(rectOf(source));
    setTo(finalRect());
    morph.jump(0);
    pull.jump(0);
    setPresent(true);
    setOpen(true);
    morph.to(1, { response: 0.5 });
  };

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }));
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, open]);

  useLayoutEffect(() => {
    const onResize = () => {
      if (!present) return;
      setTo(finalRect());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [finalRect, present]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media || !open) return;

    return draggable(media, "y", {
      start() {
        pull.stop();
        dragFrom.current = pull.value;
      },
      move(delta) {
        const next = dragFrom.current + delta;
        pull.jump(next < 0 ? rubberband(next, window.innerHeight) : next);
      },
      end(velocity) {
        if (pull.value + project(velocity) > window.innerHeight * 0.25) {
          close(velocity);
          return;
        }
        pull.to(0, { velocity, response: 0.35 });
      },
    });
  }, [close, open, pull]);

  const onCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openPanel();
  };

  const progress = morph.value;
  const panelRect = from && to ? {
    left: interpolate(from.left, to.left, progress),
    top: interpolate(from.top, to.top, progress),
    width: interpolate(from.width, to.width, progress),
    height: interpolate(from.height, to.height, progress),
  } : null;
  const viewportWidth = typeof window === "undefined" ? 1 : window.innerWidth;
  const viewportHeight = typeof window === "undefined" ? 1 : window.innerHeight;
  const downwardPull = Math.max(0, pull.value);
  const pullProgress = clamp(downwardPull / viewportHeight, 0, 1);

  return <>
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      className={`cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky ${className ?? ""}`}
      style={{ visibility: present ? "hidden" : undefined }}
      onClick={openPanel}
      onKeyDown={onCardKeyDown}
    >
      {card}
    </div>
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={dialogId}
      aria-hidden={!present}
      inert={!open}
      className="fixed inset-0 z-[90]"
      style={{ visibility: present ? "visible" : "hidden", pointerEvents: open ? "auto" : "none" }}
    >
      <button type="button" tabIndex={-1} aria-label="關閉" className="absolute inset-0 h-full w-full cursor-default bg-[#0A1222]/50" style={{ opacity: progress * (1 - pullProgress) }} onClick={() => close()} />
      <div
        className="absolute inset-0 origin-top will-change-[clip-path,transform]"
        style={{
          clipPath: panelRect ? `inset(${panelRect.top}px ${viewportWidth - panelRect.left - panelRect.width}px ${viewportHeight - panelRect.top - panelRect.height}px ${panelRect.left}px)` : "inset(100%)",
          transform: `translate3d(0, ${pull.value}px, 0) scale(${1 - pullProgress * 0.08})`,
          transformOrigin: `50% ${to?.top ?? 0}px`,
        }}
      >
        <div
          className="lufe-glass-panel absolute flex flex-col overflow-hidden bg-white will-change-transform"
          style={to ? {
            left: to.left,
            top: to.top,
            width: to.width,
            height: to.height,
            transform: `translate3d(${(panelRect?.left ?? to.left) - to.left}px, ${(panelRect?.top ?? to.top) - to.top}px, 0)`,
          } : undefined}
        >
          <div ref={mediaRef} className={`relative shrink-0 touch-none cursor-grab overflow-hidden bg-black/[.06] active:cursor-grabbing ${image ? "aspect-[16/10] max-h-[44vh]" : "h-14"}`}>
            {image && (
              // eslint-disable-next-line @next/next/no-img-element -- callers supply arbitrary image sources.
              <img src={image.src} alt={image.alt} className="h-full w-full object-cover" draggable={false} />
            )}
            <span aria-hidden="true" className="absolute left-1/2 top-2 block h-[5px] w-10 -translate-x-1/2 bg-white/75 shadow-[0_1px_4px_rgba(0,0,0,.3)]" />
          </div>
          <button ref={closeRef} type="button" aria-label="關閉" onClick={() => close()} className="lufe-glass-dark absolute right-3 top-3 z-10 grid h-10 w-10 cursor-pointer place-items-center text-white outline-none focus-visible:ring-2 focus-visible:ring-white">
            <CloseIcon />
          </button>
          <div className="min-h-0 flex-1 overflow-auto overscroll-contain px-7 pb-10 pt-7 md:px-12 md:pb-12 md:pt-10" style={{ opacity: clamp((progress - 0.35) / 0.65, 0, 1) }}>
            <h2 id={dialogId} className="mb-4 text-xl font-semibold text-tx">{title}</h2>
            {panel}
          </div>
        </div>
      </div>
    </div>
  </>;
}
