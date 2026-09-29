"use client";

import { spring } from "@/lib/motion";

import { flipDelta, type RectGeometry } from "./geometry";

interface FlipState {
  x: number;
  y: number;
  opacity: number;
}

interface FlipSprings {
  state: FlipState;
  x: ReturnType<typeof spring>;
  y: ReturnType<typeof spring>;
  opacity: ReturnType<typeof spring>;
}

const flipSprings = new WeakMap<HTMLElement, FlipSprings>();

const rectOf = (element: HTMLElement): RectGeometry => {
  const rect = element.getBoundingClientRect();
  return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
};

const keyedChildren = (container: HTMLElement) =>
  Array.from(container.children).filter((element): element is HTMLElement =>
    element instanceof HTMLElement && Boolean(element.dataset.key) && element.offsetParent !== null,
  );

function stateFor(element: HTMLElement) {
  const existing = flipSprings.get(element);
  if (existing) return existing;

  const state: FlipState = { x: 0, y: 0, opacity: 1 };
  const apply = () => {
    element.style.transform = state.x || state.y ? `translate3d(${state.x}px, ${state.y}px, 0)` : "";
    element.style.opacity = state.opacity < 1 ? String(state.opacity) : "";
  };
  const next: FlipSprings = {
    state,
    x: spring(0, (value) => { state.x = value; apply(); }),
    y: spring(0, (value) => { state.y = value; apply(); }),
    opacity: spring(1, (value) => { state.opacity = value; apply(); }),
  };
  flipSprings.set(element, next);
  return next;
}

/** Animate keyed layout changes from each child’s current on-screen position. */
export function flip(container: HTMLElement, mutate: () => void) {
  const before = new Map(keyedChildren(container).map((element) => [element.dataset.key!, rectOf(element)]));
  mutate();

  keyedChildren(container).forEach((element) => {
    const previous = before.get(element.dataset.key!);
    const current = rectOf(element);
    const springs = stateFor(element);

    if (previous) {
      const delta = flipDelta(previous, current);
      springs.x.jump(springs.state.x + delta.x);
      springs.y.jump(springs.state.y + delta.y);
      springs.x.to(0, { response: 0.5 });
      springs.y.to(0, { response: 0.5 });
      return;
    }

    springs.opacity.jump(0);
    springs.opacity.to(1, { response: 0.4 });
  });
}
