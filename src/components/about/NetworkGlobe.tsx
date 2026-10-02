"use client";

import { useEffect, useRef, useState } from "react";

import { TieredImage } from "@/components/TieredImage";

const locations = {
  taipei: [25.033, 121.565] as [number, number],
  manila: [14.599, 120.984] as [number, number],
  losAngeles: [34.052, -118.244] as [number, number],
  newYork: [40.713, -74.006] as [number, number],
  sanFrancisco: [37.775, -122.419] as [number, number],
  lasVegas: [36.17, -115.14] as [number, number],
  singapore: [1.352, 103.82] as [number, number],
  kualaLumpur: [3.139, 101.687] as [number, number],
  bangkok: [13.756, 100.502] as [number, number],
  hoChiMinhCity: [10.823, 106.63] as [number, number],
  jakarta: [-6.208, 106.846] as [number, number],
  cebu: [10.316, 123.885] as [number, number],
};

export function NetworkGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    setSupported(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
  }, []);

  useEffect(() => {
    if (!supported || !containerRef.current) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "200px" });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [supported]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!supported || !visible || !canvas) return;

    let cancelled = false;
    let frame: number | undefined;
    let phi = 4.1;
    let momentum = 0;
    let dragging = false;
    let lastX = 0;
    let ready = false;
    let inView = true;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const render = async () => {
      const { default: createGlobe } = await import("cobe");
      if (cancelled) return;

      const size = Math.min(canvas.getBoundingClientRect().width || 320, 480);
      const globe = createGlobe(canvas, {
        width: size,
        height: size,
        devicePixelRatio: dpr,
        phi,
        theta: 0.25,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 5,
        baseColor: [0.16, 0.22, 0.33],
        markerColor: [0.83, 0.66, 0.36],
        glowColor: [0.2, 0.28, 0.42],
        markers: [
          { location: locations.taipei, size: 0.08 },
          { location: locations.manila, size: 0.07 },
          { location: locations.losAngeles, size: 0.06 },
          { location: locations.newYork, size: 0.06 },
          { location: locations.sanFrancisco, size: 0.05 },
          { location: locations.lasVegas, size: 0.05 },
          { location: locations.singapore, size: 0.035, color: [0.36, 0.56, 0.66] },
          { location: locations.kualaLumpur, size: 0.035, color: [0.36, 0.56, 0.66] },
          { location: locations.bangkok, size: 0.035, color: [0.36, 0.56, 0.66] },
          { location: locations.hoChiMinhCity, size: 0.035, color: [0.36, 0.56, 0.66] },
          { location: locations.jakarta, size: 0.035, color: [0.36, 0.56, 0.66] },
          { location: locations.cebu, size: 0.035, color: [0.36, 0.56, 0.66] },
        ],
        arcs: [
          { from: locations.taipei, to: locations.manila },
          { from: locations.taipei, to: locations.losAngeles },
          { from: locations.taipei, to: locations.newYork },
          { from: locations.taipei, to: locations.sanFrancisco },
          { from: locations.taipei, to: locations.lasVegas },
        ],
        arcColor: [0.83, 0.66, 0.36],
        arcWidth: 0.5,
        arcHeight: 0.25,
      });

      const resize = () => {
        const nextSize = Math.min(canvas.getBoundingClientRect().width || 320, 480);
        globe.update({ width: nextSize, height: nextSize, devicePixelRatio: dpr });
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);

      const markReady = () => {
        if (ready) return;
        ready = true;
        canvas.classList.remove("opacity-0");
        canvas.classList.add("opacity-100");
      };
      const schedule = () => {
        if (reducedMotion || cancelled || !inView || document.hidden || frame !== undefined) return;
        frame = window.requestAnimationFrame(() => {
          frame = undefined;
          tick();
        });
      };
      const tick = () => {
        if (cancelled || !inView || document.hidden) return;
        if (!reducedMotion && !dragging) {
          if (Math.abs(momentum) >= 0.0005) {
            phi += momentum;
            momentum *= 0.95;
          } else {
            phi += 0.0035;
          }
        }
        globe.update({ phi });
        markReady();
        schedule();
      };

      const onVisibility = () => {
        if (document.hidden) {
          if (frame !== undefined) window.cancelAnimationFrame(frame);
          frame = undefined;
        } else {
          schedule();
        }
      };
      const onPointerDown = (event: PointerEvent) => {
        if (reducedMotion) return;
        dragging = true;
        momentum = 0;
        lastX = event.clientX;
        canvas.setPointerCapture(event.pointerId);
      };
      const onPointerMove = (event: PointerEvent) => {
        if (!dragging || reducedMotion) return;
        const delta = event.clientX - lastX;
        lastX = event.clientX;
        phi += delta / 200;
        momentum = delta / 200;
        globe.update({ phi });
      };
      const onPointerEnd = (event: PointerEvent) => {
        if (!dragging) return;
        dragging = false;
        if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      };

      const observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        if (inView) schedule();
        if (!inView && frame !== undefined) {
          window.cancelAnimationFrame(frame);
          frame = undefined;
        }
      });
      observer.observe(canvas);
      document.addEventListener("visibilitychange", onVisibility);
      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerup", onPointerEnd);
      canvas.addEventListener("pointercancel", onPointerEnd);

      globe.update({ phi });
      window.requestAnimationFrame(markReady);

      return () => {
        observer.disconnect();
        resizeObserver.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerup", onPointerEnd);
        canvas.removeEventListener("pointercancel", onPointerEnd);
        if (frame !== undefined) window.cancelAnimationFrame(frame);
        globe.destroy();
      };
    };

    let dispose: (() => void) | undefined;
    void render().then((cleanup) => {
      if (cancelled) cleanup?.();
      else if (cleanup) dispose = cleanup;
    });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [supported, visible]);

  return (
    <div ref={containerRef} className="mx-auto aspect-square w-full max-w-[320px] lg:max-w-[480px]">
      {supported === false ? (
        <TieredImage src="/images/about/network-saigon-night-1600.webp" alt="西貢夜景" sizes="(max-width: 1024px) 320px, 480px" className="h-full w-full object-cover" />
      ) : supported ? (
        <canvas ref={canvasRef} aria-hidden="true" className="aspect-square w-full max-w-[480px] cursor-grab touch-pan-y opacity-0 transition-opacity duration-[600ms] active:cursor-grabbing" />
      ) : null}
    </div>
  );
}
