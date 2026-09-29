export interface CarouselItemGeometry {
  offsetLeft: number;
  width: number;
}

export interface CarouselGeometry {
  minX: number;
  snaps: number[];
}

export interface SegmentGeometry {
  left: number;
  width: number;
}

export interface RectGeometry {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function clampValue(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function carouselGeometry(
  items: readonly CarouselItemGeometry[],
  paddingLeft: number,
  viewportWidth: number,
): CarouselGeometry {
  if (!items.length) return { minX: 0, snaps: [0] };

  const last = items.at(-1)!;
  const minX = Math.min(0, -(last.offsetLeft + last.width + paddingLeft - viewportWidth));
  const snaps = Array.from(new Set([
    ...items.map((item) => Math.max(minX, -(item.offsetLeft - paddingLeft))),
    minX,
  ])).sort((first, second) => second - first);

  return { minX, snaps };
}

export function nearestSnap(snaps: readonly number[], value: number) {
  if (!snaps.length) return 0;

  return snaps.reduce((current, candidate) =>
    Math.abs(candidate - value) < Math.abs(current - value) ? candidate : current,
  );
}

export function segmentedPill(segments: readonly SegmentGeometry[], fractionalIndex: number): SegmentGeometry {
  if (!segments.length) return { left: 0, width: 0 };

  const bounded = clampValue(fractionalIndex, 0, segments.length - 1);
  const startIndex = Math.floor(bounded);
  const endIndex = Math.min(startIndex + 1, segments.length - 1);
  const progress = bounded - startIndex;
  const start = segments[startIndex];
  const end = segments[endIndex];

  return {
    left: start.left + (end.left - start.left) * progress,
    width: start.width + (end.width - start.width) * progress,
  };
}

export function flipDelta(before: RectGeometry, after: RectGeometry) {
  return {
    x: before.left - after.left,
    y: before.top - after.top,
  };
}
