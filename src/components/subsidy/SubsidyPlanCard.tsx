import Link from "next/link";

import { Disclosure } from "@/components/ui";
import { STAGE_LABELS, type Subsidy } from "@/data/subsidies";
import { SubsidyIcon } from "./SubsidyIcons";

const accentMap: Record<Subsidy["accent"], { num: string; bar: string; iconBg: string }> = {
  sky: { num: "text-sky", bar: "bg-sky", iconBg: "bg-[rgba(91,143,168,0.08)] text-sky" },
  gold: { num: "text-gold-d", bar: "bg-gold", iconBg: "bg-[rgba(212,168,92,0.1)] text-gold-d" },
  ember: { num: "text-ember", bar: "bg-ember", iconBg: "bg-[rgba(217,139,74,0.08)] text-ember" },
};

export function SubsidyPlanCard({ subsidy }: { readonly subsidy: Subsidy }) {
  const accent = accentMap[subsidy.accent];
  const stage = STAGE_LABELS[subsidy.stage];

  return (
    <article id={subsidy.slug} className="relative min-w-0 border border-bd bg-white p-6 scroll-mt-[100px] md:p-8">
      <div aria-hidden="true" className={`absolute bottom-0 left-0 top-0 w-[3px] ${accent.bar}`} />

      {subsidy.highlight && (
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="bg-ember px-2.5 py-1 text-[11px] font-semibold tracking-wider text-white">{subsidy.highlight}</span>
          {subsidy.highlightNote && <span className="text-[12px] font-medium text-ember">{subsidy.highlightNote}</span>}
        </div>
      )}

      <header className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          <div className={`grid h-14 w-14 shrink-0 place-items-center ${accent.iconBg}`}>
            <SubsidyIcon iconKey={subsidy.iconKey} size={26} />
          </div>
          <div className="min-w-0">
            <div className="mb-1 flex flex-wrap items-baseline gap-2.5">
              <span className={`num text-[24px] leading-none ${accent.num}`}>{subsidy.num}</span>
              <span className="text-[10.5px] font-semibold tracking-[1.5px] text-tx3">{subsidy.agency}</span>
            </div>
            <h3 className="h3 text-tx">{subsidy.shortTitle}</h3>
            <p className="mt-1 text-[13.5px] leading-snug text-tx3">{subsidy.program}</p>
          </div>
        </div>
        <span className="shrink-0 bg-cream px-2.5 py-1 text-[10.5px] font-semibold tracking-wider text-tx2">{stage.label}</span>
      </header>

      <div className="mt-6 grid min-w-0 gap-5 border-y border-bd/60 py-5 sm:grid-cols-2">
        <div className="min-w-0">
          <p className="eyebrow mb-1 text-tx3">補助額度</p>
          <p className={`num text-[22px] ${accent.num}`}>{subsidy.amount}</p>
          {subsidy.amountNote && <p className="mt-1 text-[11.5px] leading-[1.65] text-tx3">{subsidy.amountNote}</p>}
        </div>
        <div className="min-w-0 sm:text-right">
          <p className="eyebrow mb-1 text-tx3">申請時程</p>
          <p className="text-[15.5px] font-medium text-tx">{subsidy.deadline}</p>
          <p className="mt-1 text-[11.5px] leading-[1.65] text-tx3">{subsidy.applicationNote}</p>
        </div>
      </div>

      <p className="mt-5 text-[15.5px] leading-[1.8] text-tx2">{subsidy.oneLiner}</p>

      <div className="mt-6 border-b border-bd2">
        <Disclosure summary={`適合（${subsidy.whoFor.length} 項）`} id={`${subsidy.slug}-fit`}>
          <ul className="grid gap-2">
            {subsidy.whoFor.map((item) => <li key={item} className="flex gap-2 text-[14px] leading-[1.7]"><span className={`mt-[.55em] h-1 w-1 shrink-0 ${accent.bar}`} />{item}</li>)}
          </ul>
        </Disclosure>
        <Disclosure summary={`補助涵蓋（${subsidy.covers.length} 項）`} id={`${subsidy.slug}-covers`}>
          <div className="flex flex-wrap gap-2">
            {subsidy.covers.map((item) => <span key={item} className="bg-cream px-2.5 py-1 text-[12px] text-tx2">{item}</span>)}
          </div>
        </Disclosure>
        <Disclosure summary={`可補助費用明細（${subsidy.coversDetail?.length ?? 0} 項）`} id={`${subsidy.slug}-costs`}>
          {subsidy.coversDetail && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[440px] border-collapse text-left text-[13px]">
                <thead className="border-y border-bd bg-cream text-tx3"><tr><th className="p-3 font-semibold">項目</th><th className="p-3 font-semibold">上限</th></tr></thead>
                <tbody>
                  {subsidy.coversDetail.map((item) => (
                    <tr key={item.title} className="border-b border-bd2 align-top">
                      <td className="p-3"><strong className="text-tx">{item.title}</strong><p className="mt-1 leading-[1.7]">{item.note}</p></td>
                      <td className="p-3 leading-[1.7] text-tx">{item.limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Disclosure>
        <Disclosure summary={`申請與核銷流程（${subsidy.processSteps?.length ?? 0} 步）`} id={`${subsidy.slug}-process`}>
          {subsidy.processSteps && (
            <ol className="relative grid gap-4 border-l border-bd pl-5">
              {subsidy.processSteps.map((item, index) => (
                <li key={item.title} className="relative">
                  <span className={`num absolute -left-[31px] top-0 grid h-5 w-5 place-items-center text-[11px] ${accent.iconBg}`}>{index + 1}</span>
                  <strong className="text-[14px] text-tx">{item.title}</strong>
                  <p className="mt-1 text-[13px] leading-[1.7]">{item.note}</p>
                </li>
              ))}
            </ol>
          )}
        </Disclosure>
        <Disclosure summary={<span className="text-ember">容易踩雷的點（{subsidy.importantNotes?.length ?? 0} 點）</span>} id={`${subsidy.slug}-pitfalls`}>
          <ul className="grid gap-2 border-l-2 border-ember bg-ember/5 p-4">
            {subsidy.importantNotes?.map((item) => <li key={item} className="flex gap-2 text-[13px] leading-[1.7]"><span className="mt-[.6em] h-1 w-1 shrink-0 bg-ember" />{item}</li>)}
          </ul>
        </Disclosure>
      </div>

      <div className="mt-6 bg-navy p-5 text-white/90">
        <p className="eyebrow mb-2 text-gold">鹿飛怎麼幫上忙</p>
        <p className="text-[14.5px] leading-[1.8]">{subsidy.lufeAngle}</p>
      </div>

      <footer className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <Link href="/assess" className="inline-flex items-center gap-2 text-[14.5px] font-semibold text-navy hover:text-gold">查我是否符合 →</Link>
        <div className="text-right text-[11px] leading-[1.6] text-tx3">
          {subsidy.sourceUrl && <a href={subsidy.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">官方公告 ↗</a>}
          {subsidy.verifiedOn && <><br />資料最後確認：{subsidy.verifiedOn}（經濟部、國際貿易署公告）</>}
        </div>
      </footer>
    </article>
  );
}

export function SubsidyComparison({ subsidies }: { readonly subsidies: readonly Subsidy[] }) {
  return (
    <section className="mb-12 border-y border-bd bg-cream/60 py-7 md:py-8">
      <div className="px-5 md:px-8">
        <div className="grid min-w-0 gap-px border border-bd bg-bd sm:grid-cols-2 lg:grid-cols-4">
          {subsidies.map((subsidy) => (
            <Link key={subsidy.slug} href={`#${subsidy.slug}`} className="min-w-0 bg-cream p-4 transition-colors hover:bg-white">
              <span className="num text-[14px] text-gold-d">{subsidy.num}</span>
              <strong className="mt-2 block text-[15px] leading-[1.45] text-tx">{subsidy.shortTitle}</strong>
              <span className="num mt-4 block text-[14px] text-tx">{subsidy.amount}</span>
              <span className="mt-1 block text-[12px] leading-[1.6] text-tx3">{subsidy.deadline}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
