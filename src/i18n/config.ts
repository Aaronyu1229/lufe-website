// Flip to true only on open day (spec §6 P5): shows the toggle, allows indexing, emits hreflang.
export const EN_PUBLIC = false;

// Chinese paths that already have a finished English page. Grows page by page (Plan 2).
export const EN_ROUTES: readonly string[] = ["/", "/services", "/services/product-testing", "/services/consignment", "/services/localization", "/services/call-center", "/services/north-america", "/services/methodology", "/services/optimize", "/about", "/contact", "/cases", "/cases/[slug]"];

export function hasEnglishRoute(zhPath: string): boolean {
  return EN_ROUTES.some((route) => route === zhPath || new RegExp(`^${route.replace(/\[[^/]+\]/g, "[^/]+")}$`).test(zhPath));
}
