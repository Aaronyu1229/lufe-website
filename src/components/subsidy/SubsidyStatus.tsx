import { isSubsidyActive, type Subsidy } from "@/data/subsidies";

export type SubsidyStatus = "open" | "pending" | "closed";

export function subsidyStatus(subsidy: Subsidy, now = new Date()): SubsidyStatus {
  if (isSubsidyActive(subsidy, now)) return "open";
  if (subsidy.deadline.includes("預計") || subsidy.deadline.includes("待公告")) return "pending";
  return "closed";
}

const statusCopy: Record<SubsidyStatus, { label: string; className: string }> = {
  open: { label: "開放申請中", className: "border border-sky text-sky" },
  pending: { label: "等待公告", className: "border border-gold text-gold-d" },
  closed: { label: "已截止", className: "border border-bd text-tx3" },
};

export function SubsidyStatusBadge({ subsidy, now }: { readonly subsidy: Subsidy; readonly now: Date }) {
  const status = subsidyStatus(subsidy, now);
  const copy = statusCopy[status];

  return <span className={`inline-flex px-2 py-0.5 text-[12px] font-semibold ${copy.className}`}>{copy.label}</span>;
}
