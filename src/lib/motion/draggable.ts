export type DragAxis = "x" | "y";

export interface DraggableHandlers {
  start?: () => void;
  move: (delta: number) => void;
  end: (velocity: number) => void;
}

/**
 * Pointer drag with 10px hysteresis and axis locking. A completed drag suppresses
 * the following click, while the losing axis remains available to native scrolling.
 */
export function draggable(
  element: HTMLElement,
  axis: DragAxis,
  { start, move, end }: DraggableHandlers,
): () => void {
  let pointerId: number | null = null;
  let startX = 0;
  let startY = 0;
  let locked = false;
  let rejected = false;
  let dragged = false;
  let history: Array<{ time: number; position: number }> = [];

  const onPointerDown = (event: PointerEvent) => {
    if (event.button > 0 || pointerId !== null) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    locked = false;
    rejected = false;
    dragged = false;
    history = [];
  };

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerId !== pointerId || rejected) return;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (!locked) {
      if (Math.hypot(dx, dy) < 10) return;
      const followsAxis = axis === "x" ? Math.abs(dx) > Math.abs(dy) : Math.abs(dy) >= Math.abs(dx);
      if (!followsAxis) {
        rejected = true;
        return;
      }

      locked = true;
      dragged = true;
      element.setPointerCapture(event.pointerId);
      startX = event.clientX;
      startY = event.clientY;
      const position = axis === "x" ? event.clientX : event.clientY;
      history = [{ time: event.timeStamp, position }];
      start?.();
    }

    const position = axis === "x" ? event.clientX : event.clientY;
    history.push({ time: event.timeStamp, position });
    while (history.length > 2 && event.timeStamp - history[0].time > 100) history.shift();
    move(axis === "x" ? event.clientX - startX : event.clientY - startY);
  };

  const finish = (event: PointerEvent) => {
    if (event.pointerId !== pointerId) return;
    pointerId = null;
    if (!locked) return;
    locked = false;

    const first = history[0];
    const last = history.at(-1);
    const velocity = first && last && last.time > first.time && event.timeStamp - last.time < 80
      ? (last.position - first.position) / ((last.time - first.time) / 1000)
      : 0;
    end(velocity);
  };

  const onClick = (event: MouseEvent) => {
    if (!dragged) return;
    event.preventDefault();
    event.stopPropagation();
    dragged = false;
  };

  const onDragStart = (event: DragEvent) => event.preventDefault();
  element.addEventListener("dragstart", onDragStart);
  element.addEventListener("pointerdown", onPointerDown);
  element.addEventListener("pointermove", onPointerMove);
  element.addEventListener("pointerup", finish);
  element.addEventListener("pointercancel", finish);
  element.addEventListener("click", onClick, true);

  return () => {
    element.removeEventListener("dragstart", onDragStart);
    element.removeEventListener("pointerdown", onPointerDown);
    element.removeEventListener("pointermove", onPointerMove);
    element.removeEventListener("pointerup", finish);
    element.removeEventListener("pointercancel", finish);
    element.removeEventListener("click", onClick, true);
  };
}
