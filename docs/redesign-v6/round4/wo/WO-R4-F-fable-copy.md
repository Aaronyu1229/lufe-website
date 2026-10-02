# WO-R4-F — Apply Fable case/about copy

Read `docs/redesign-v6/wo/COMMON.md` first, then `docs/redesign-v6/round4/FABLE-CASES-COPY.md` (authority; paste copy verbatim).
Branch `v6/r4-f-fable-copy` from latest `origin/redesign/v6`. PR → `redesign/v6`. Port `3430`. Only Codex run; mkdir build lock.

## Apply
1. §1 goat-milk soap → `src/data/cases.ts` entry `goat-milk-soap-global`, plus the linked lines in `src/components/home/CasesSection.tsx` and `src/components/home/JumpingSection.tsx` listed in §1.
2. §2 fish floss → entry `fish-floss-us-fda`.
3. §3 bubble tea → only the fields listed in §3 (incl. chapter-1 title change).
4. §4 about → option **A** in `AboutPage.tsx` `storyChapters[3]` plus the "連動（選 A 時）" edits.
5. `keyDecisions` for goat soap and fish floss: Aaron has NOT confirmed them yet → keep `[]` (do not paste the proposed keyDecisions); keep them in the doc for later.
6. Do not invent anything beyond the doc. Never edit `src/data/articles.ts`.

## Allowed paths
`src/data/cases.ts`, `src/components/home/CasesSection.tsx`, `src/components/home/JumpingSection.tsx`, `src/components/about/AboutPage.tsx`, `src/components/story/StoryChapters.tsx` (only if the doc requires), related tests, and `src/app/fonts/*` (rebuild AND commit in a separate `chore(fonts): rebuild subset` commit — this is the last change before review).

## Verification
COMMON.md steps; locked build green incl. postbuild font guard; screenshots 1440/390 of `/cases/goat-milk-soap-global`, `/cases/fish-floss-us-fda`, `/cases/bubble-tea`, `/about`, `/`; scrollWidth; console errors. Paste a diff summary showing every pasted string.
