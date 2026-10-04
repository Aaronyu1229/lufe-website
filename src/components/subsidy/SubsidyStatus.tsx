import { isSubsidyActive, type Subsidy } from "@/data/subsidies";
import { subsidiesPageEn } from "@/i18n/en/subsidies-page";
import { type Locale } from "@/i18n/locale";
import { subsidiesPageZh } from "@/i18n/zh/subsidies-page";

export type SubsidyStatus = "open" | "pending" | "closed";

export function subsidyStatus(subsidy: Subsidy, now = new Date(), locale: Locale = "zh"): SubsidyStatus {
  if (!subsidy.deadlineDate && (locale === "en" ? /\b(expected|pending)\b/i.test(subsidy.deadline) : subsidy.deadline.includes("預計") || subsidy.deadline.includes("待公告"))) return "pending";
  if (isSubsidyActive(subsidy, now)) return "open";
  return "closed";
}

const statusClasses: Record<SubsidyStatus, string> = {
  open: "border border-sky text-sky",
  pending: "border border-gold text-gold-d",
  closed: "border border-bd text-tx3",
};

export function SubsidyStatusBadge({ subsidy, now, locale = "zh" }: { readonly subsidy: Subsidy; readonly now: Date; readonly locale?: Locale }) {
  const status = subsidyStatus(subsidy, now, locale);
  const copy = locale === "en" ? subsidiesPageEn : subsidiesPageZh;

  return <span className={`inline-flex px-2 py-0.5 text-[12px] font-semibold ${statusClasses[status]}`}>{copy.plans.statuses[status]}</span>;
}
