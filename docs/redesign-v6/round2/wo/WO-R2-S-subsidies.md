# WO-R2-S — Subsidy data refresh (verified 2026-10-02)

Read `docs/redesign-v6/wo/COMMON.md` first, then `docs/redesign-v6/round2/SUBSIDIES-UPDATE-2026-10-02.md` (the research report — the authority for every fact; each fact there has an official source URL and date).

- Branch: `v6/r2-s-subsidies` from latest `origin/redesign/v6`. PR → `redesign/v6`. Port `3418`.
- Runs in parallel with other round-2 lanes; disjoint paths; mkdir build lock only.

## Allowed paths
- `src/data/subsidies.ts`
- `src/app/resources/page.tsx`, `src/app/resources/subsidies/page.tsx`
- `src/components/subsidy/**`
- `src/components/home/SubsidyAlertBand.tsx`
- Tests: `tests/components/subsidy/**`, `tests/components/resources/**`, `tests/components/home/subsidy-alert*.test.ts` (new ok)
Forbidden: everything else (notably `src/data/articles.ts`, `src/components/home/HomeFAQ.tsx`, `src/components/faq/**`, `src/components/services/**`, fonts).

## Changes
1. Apply every field in the report's "ready-to-apply" section to `src/data/subsidies.ts` exactly (program 01 rename + new official URL + 2026-10-30 18:00 deadline + removed wrong eligibility/cost items; 02 status; 03 confirmation date; 04 deadline = 2027-09-15 and the 2026-08-14 change). Keep the existing types; if a value needs a field the type lacks, do not add fields — put it in an existing text field and say so in the PR.
2. Fix every dependent copy string the report lists on `/resources`, `/resources/subsidies`, and the matcher (e.g. 「最高 NT$1,000 萬」 → the official caps 單家最高 500 萬／聯合申請最高 2,000 萬 as the report words it; matcher 「參展補助最高 40 萬」 → per-exhibition cap 16 萬, 40 萬 only as the startup annual total if the report says so).
3. Remove claims the report marks 「無法查證」: 「往年每展 4 萬」, 「展前 60 天申請」. Program 04 「深度輔導 20 萬」: replace with the official wording the report quotes (「費用 NT$20 萬、名額 100 家」) — do not call it a subsidy.
4. Program 02 badge: 「115 年度加碼版」 → 「116 年度待公告」; status text must not claim it is open.
5. Program 01 after its deadline: card stays, and once `now > 2026-10-30T18:00:00+08:00` it shows 「116 年度待公告」 instead of the deadline CTA (derive from the deadline field at render/build time the same way existing expiry logic works; if there is no such logic, compute at build time and note that a rebuild after 10/30 is needed).
6. Home alert band (`SubsidyAlertBand`): feature program 01 (受理中，2026/10/30 18:00 截止) while open; after the deadline automatically feature program 04 (買主直達，受理至 2027/9/15). Short copy, keep current band design; no trailing 「。」 per COMMON full-stop rule.
7. Program 03 impact threshold (「對美出口衰退 10%」 vs 「營業額衰退 10%」): unverified — keep the current website wording unchanged and list it in the PR body under "needs Aaron".

## Verification
COMMON.md steps (tsc, lint 0 errors, vitest, font-guard procedure without committing fonts, locked build, screenshots 1440/390 of `/resources`, `/resources/subsidies` incl. a completed matcher result, and `/` alert band; scrollWidth; console errors). Plus: `rg -n "1,000 萬|1000 萬|每展 4 萬|60 天|2026/9/15|115 年度加碼版" src --glob '!src/data/articles.ts'` → 0 hits (paste output). Unit test: the alert band picks 01 before and 04 after 2026-10-30T18:00+08:00 (inject the date).
