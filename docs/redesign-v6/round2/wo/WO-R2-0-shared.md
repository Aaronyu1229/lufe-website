# WO-R2-0 — Shared accordion, FaqSection, new line icons

Read first: `docs/redesign-v6/wo/COMMON.md` (all rules apply), then `docs/redesign-v6/round2/DECISIONS-R2.md` (authority for round 2; §0 R-4, §C).
Runs **first and alone**. WO-R2-1 and WO-R2-A both depend on it.

- Branch: `v6/r2-0-shared` from latest `origin/redesign/v6`. PR → `redesign/v6`. Port `3410`.
- Allowed paths:
  - `src/components/faq/AccordionItem.tsx` (new)
  - `src/components/faq/FaqItem.tsx` (new)
  - `src/components/faq/FaqSection.tsx` (new)
  - `src/components/home/HomeFAQ.tsx`
  - `src/components/home/HomeFaqItem.tsx` (delete)
  - `src/components/icons/LineIcons.tsx`
  - `tests/components/faq/**` (new), `tests/components/home/page.test.ts` (only if a selector it pins changes)
- No copy changes in this WO (no new Chinese characters expected; still run the font guard and paste its output).

## 1. `AccordionItem` (extract from `HomeFaqItem`)
Move the spring-height disclosure logic of the current `src/components/home/HomeFaqItem.tsx` into a generic client component. Behaviour must stay **identical** (same `useSpring` configs: height `response 0.42`; plus rotation `response 0.3, damping 1, precision 0.001`; accent line `response 0.35, damping 1, precision 0.001`; `ResizeObserver` re-measure; `inert`/`aria-hidden` on the closed panel; content always in the server HTML).

```ts
export function AccordionItem(props: {
  readonly id: string;              // stable DOM id for the panel (used for aria-controls)
  readonly num: string;             // "01"
  readonly header: React.ReactNode; // rendered right of the number, inside the <button>
  readonly children: React.ReactNode; // panel content
  readonly defaultOpen?: boolean;
}): JSX.Element
```
Markup = current HomeFaqItem markup with these substitutions: the question `<span>` becomes `{header}`; the panel inner `<div ref={contentRef} className="pb-7 pl-[42px] md:pl-[58px]">` contains `{children}`. Keep classes: number `font-[var(--font-inter)] text-[28px] font-semibold tabular-nums`, `text-tx3/40` closed → `text-gold-d` open (`transition-colors duration-200` is fine here — this file is not in globals.css); 32×32 bordered box with `PlusIcon` rotating 45°; 3px gold left line `scaleY`; button hover `bg-cream/60` only in `[@media(hover:hover)]`, `active:scale-[.995]`, `focus-visible:ring-2 ring-gold`. Under `prefers-reduced-motion: reduce` jump springs instead of animating (height, rotation, accent) — add this if HomeFaqItem did not already (check `window.matchMedia` once in the toggle).

## 2. `FaqItem`
```ts
export type FaqEntry = { readonly num: string; readonly question: string; readonly answer: string; readonly takeaway?: string };
export function FaqItem({ item, idPrefix, defaultOpen }: { item: FaqEntry; idPrefix: string; defaultOpen?: boolean })
```
= `AccordionItem` with `id={`${idPrefix}-${item.num}`}`, header `<span className="text-[20px] font-semibold leading-[1.5] text-tx">{item.question}</span>`, children: takeaway paragraph (only if present; exact current classes `max-w-[650px] border-l-2 border-gold pl-4 text-[17px] font-medium leading-[1.65] text-tx`) + answer paragraph (current classes; `mt-4` only when a takeaway precedes it; `whitespace-pre-line`).
Use a deterministic id (no `useId` suffix needed now that ids are prefixed) — two FAQ lists can share a page, so the prefix must differ per list.

## 3. `FaqSection`
```ts
export function FaqSection(props: {
  readonly title: string;
  readonly items: readonly FaqEntry[];
  readonly idPrefix: string;
  readonly className?: string; // section background/padding override; default "py-[62px] md:py-[96px] md:pb-[100px]"
}): JSX.Element
```
Client component. Markup = current `HomeFAQ` layout exactly: 12-col grid, left `md:col-span-4 md:sticky md:top-[96px]` with the `h2` (current HomeFAQ classes), `還有其他問題？` and the `直接問鹿飛 →` button (opens `useMessageBox().open`); right `md:col-span-8` list of `FaqItem`, first item `defaultOpen`.
Then `HomeFAQ` becomes `<FaqSection title="你可能想先問的三件事" items={HOME_FAQ_ITEMS} idPrefix="home-faq" />` (keep the `HOME_FAQ_ITEMS` re-export). Delete `HomeFaqItem.tsx`; `HomeFaqItem` type in `src/data/homeFaq.ts` stays (it already matches `FaqEntry`).
Home must look pixel-identical: compare 1440/390 screenshots of `/` before and after (take "before" from `origin/redesign/v6` first).

## 4. New icons in `LineIcons.tsx`
Add, in the same style as the existing ones (`Icon` wrapper, 24 viewBox, stroke 1.75): `UsersIcon`, `InboxIcon`, `BadgeCheckIcon`, `ListChecksIcon`, `ChartColumnIcon`, `SearchIcon`, `PresentationIcon`, `HandshakeIcon`, `StoreIcon`, `CheckIcon`.
Source: Lucide (ISC, already credited at the top of the file). Fetch the exact SVG children from `https://unpkg.com/lucide-static@latest/icons/<name>.svg` for `users inbox badge-check list-checks chart-column search presentation handshake store check` and paste the child elements verbatim (convert attributes to JSX). Do not hand-draw paths. Note the lucide-static version in the PR.

## 5. Tests (new `tests/components/faq/faq-section.test.ts`)
- `renderToStaticMarkup(<FaqSection …>)` with two entries (one with takeaway, one without) contains both questions, both answers, the takeaway, `還有其他問題？`, `直接問鹿飛 →`, and `aria-expanded="true"` exactly once. (Mock `@/components/MessageBox` `useMessageBox` if needed.)
- No `rounded-` class except `rounded-full`.
- Existing home test still passes (HOME_FAQ_ITEMS answers in server HTML).

## 6. Verification
COMMON.md steps 1–8. Screenshot paths: `/` (before/after pair in `/tmp/lufe-v6-shots/WO-R2-0/{before,after}`). In the PR, state that home FAQ is visually unchanged and list any pixel difference you saw.
