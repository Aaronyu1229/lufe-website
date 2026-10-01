"use client";

import { useEffect, useRef, useState } from "react";

interface HeroBackdropVideoProps {
  readonly src: string;
  readonly position: string;
}

interface NavigatorConnection {
  readonly saveData?: boolean;
}

interface IdleWindow {
  readonly requestIdleCallback?: (callback: IdleRequestCallback) => number;
  readonly cancelIdleCallback?: (handle: number) => void;
}

function shouldPlay(mediaQuery: MediaQueryList) {
  return !mediaQuery.matches && !(navigator as Navigator & { connection?: NavigatorConnection }).connection?.saveData;
}

export function HeroBackdropVideo({ src, position }: HeroBackdropVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const idleWindow = window as unknown as IdleWindow;
    let idleCallback: number | undefined;
    let timeout: number | undefined;

    const mount = () => {
      if (shouldPlay(mediaQuery)) setMounted(true);
    };
    const scheduleMount = () => {
      if (!shouldPlay(mediaQuery)) return;
      if (idleWindow.requestIdleCallback) {
        idleCallback = idleWindow.requestIdleCallback(mount);
      } else {
        timeout = window.setTimeout(mount, 200);
      }
    };
    const onLoad = () => scheduleMount();
    const onMotionChange = () => {
      if (mediaQuery.matches) {
        videoRef.current?.pause();
        setReady(false);
        setMounted(false);
      } else {
        scheduleMount();
      }
    };

    if (document.readyState === "complete") scheduleMount();
    else window.addEventListener("load", onLoad, { once: true });
    mediaQuery.addEventListener("change", onMotionChange);

    return () => {
      window.removeEventListener("load", onLoad);
      mediaQuery.removeEventListener("change", onMotionChange);
      if (idleCallback !== undefined) idleWindow.cancelIdleCallback?.(idleCallback);
      if (timeout !== undefined) window.clearTimeout(timeout);
    };
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!mounted || !video) return;

    let visible = true;
    const play = () => {
      if (!document.hidden && visible) void video.play().catch(() => undefined);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.intersectionRatio >= 0.1;
      if (visible) play();
      else video.pause();
    }, { threshold: 0.1 });
    const onVisibilityChange = () => {
      if (document.hidden) video.pause();
      else play();
    };

    observer.observe(video);
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (document.hidden) video.pause();
    else play();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      video.pause();
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <video
      ref={videoRef}
      className="lufe-hero-video"
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      aria-hidden="true"
      disablePictureInPicture
      data-ready={ready ? "" : undefined}
      style={{ objectPosition: position }}
      onPlaying={() => setReady(true)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
