"use client";

import { useRef, type HTMLAttributes, type PointerEvent } from "react";

import { useSpring } from "@/lib/motion";

/** A light, pointer-driven report tilt that returns with a momentum-appropriate spring. */
export function Tilt({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { precision: 0.02 });
  const rotateY = useSpring(0, { precision: 0.02 });

  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rotateX.to(((rect.height / 2 - (event.clientY - rect.top)) / rect.height) * 5, { response: .4 });
    rotateY.to(((event.clientX - rect.left - rect.width / 2) / rect.width) * 5, { response: .4 });
  }

  function reset() {
    rotateX.to(0, { response: .4, damping: .8 });
    rotateY.to(0, { response: .4, damping: .8 });
  }

  return <div ref={ref} className={className} style={{ transform: `perspective(800px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)` }} onPointerMove={move} onPointerLeave={reset} {...props}>{children}</div>;
}
