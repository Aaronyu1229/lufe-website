"use client";

import type { MouseEvent } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Scrolls to the next content section without relying on page-specific IDs. */
export function ScrollCue({ label = "往下看" }: { readonly label?: string } = {}) {
  function scrollToNextSection(event: MouseEvent<HTMLButtonElement>) {
    const current = event.currentTarget.closest("section");
    let next = current?.nextElementSibling;

    while (next && next.tagName !== "SECTION") next = next.nextElementSibling;
    next?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }

  return (
    <button type="button" aria-label={label} className="lufe-scroll-cue" onClick={scrollToNextSection}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
