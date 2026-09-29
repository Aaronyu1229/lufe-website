/** Progressive resistance beyond a boundary, matching Apple's sheet treatment. */
export function rubberband(overshoot: number, dimension: number, constant = 0.55): number {
  if (dimension <= 0) return 0;

  return (overshoot * dimension * constant) /
    (dimension + constant * Math.abs(overshoot));
}
