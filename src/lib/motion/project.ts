/** Apple's exponential-decay momentum projection. */
export function project(velocity: number, decelerationRate = 0.998): number {
  return (velocity / 1000) * decelerationRate / (1 - decelerationRate);
}

export function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

export function nearest<T extends number>(values: readonly T[], value: number): T {
  if (values.length === 0) {
    throw new Error("nearest requires at least one value");
  }

  return values.reduce((current, candidate) =>
    Math.abs(candidate - value) < Math.abs(current - value) ? candidate : current,
  );
}
