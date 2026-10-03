// Flip to true only on open day (spec §6 P5): shows the toggle, allows indexing, emits hreflang.
export const EN_PUBLIC = false;

// Chinese paths that already have a finished English page. Grows page by page (Plan 2).
export const EN_ROUTES: readonly string[] = ["/services"];

export function hasEnglishRoute(zhPath: string): boolean {
  return EN_ROUTES.includes(zhPath);
}
