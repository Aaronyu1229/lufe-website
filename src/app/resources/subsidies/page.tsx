import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SUBSIDIES, STAGE_LABELS, SUBSIDY_CARD_COPY, type Subsidy } from "@/data/subsidies";
import { SubsidyIcon } from "@/components/subsidy/SubsidyIcons";
import { SubsidiesCTASection } from "@/components/subsidy/SubsidiesCTASection";

export const metadata: Metadata = {
  title: "2026 政府出海補助 — 鹿飛 LUFÉ",
  description:
    "貿易署、經濟部、中企署——四個正在開放的計畫，幫台灣企業降低出海成本。鹿飛整理的實戰版本，直接告訴你哪個適合你。",
};

const accentMap: Record<
  Subsidy["accent"],
  {
    badge: string;
    num: string;
    border: string;
    bar: string;
    iconBg: string;
  }
> = {
  sky: {
    badge: "bg-sky/10 text-sky",
    num: "text-sky",
    border: "hover:border-sky",
    bar: "bg-sky",
    iconBg: "bg-[rgba(91,143,168,0.08)] text-sky",
  },
  gold: {
    badge: "bg-gold/15 text-[#8A6A2C]",
    num: "text-gold",
    border: "hover:border-gold",
    bar: "bg-gold",
    iconBg: "bg-[rgba(212,168,92,0.1)] text-gold",
  },
  ember: {
    badge: "bg-ember/10 text-ember",
    num: "text-ember",
    border: "hover:border-ember",
    bar: "bg-ember",
    iconBg: "bg-[rgba(217,139,74,0.08)] text-ember",
  },
};

export default function SubsidiesPage() {
  return (
    <div className="bg-white">
      {/* ───── Hero ───── */}
      <section className="relative bg-navy text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={SUBSIDY_CARD_COPY.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.22]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/65 to-navy" />
        </div>

        {/* Ambient accents */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #D4A85C 0%, transparent 40%), radial-gradient(circle at 80% 70%, #5B8FA8 0%, transparent 45%)",
          }}
        />

        <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 pt-[120px] md:pt-[160px] pb-[72px] md:pb-[100px] relative">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-5 h-px bg-gold/70" />
            <span className="text-gold/80 text-[11px] font-medium tracking-[2.5px] uppercase">
              2026 政府出海補助
            </span>
          </div>

          <h1
            className="font-sans text-white leading-[1.05] mb-8 font-extralight tracking-[-2px] max-w-[900px]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            政府在幫你出海，
            <br />
            <span className="text-gold/90">你知道怎麼拿嗎？</span>
          </h1>

          <p className="text-[17px] md:text-[18px] text-white/70 font-normal leading-[1.75] max-w-[680px] mb-12">
            貿易署、經濟部、中企署——每年都有上億元的預算在幫台灣企業走出去。
            但多數中小企業根本沒申請過，不是因為不符合資格，是因為不知道有這些計畫。
            我們替你整理了{" "}
            <span className="text-white font-medium">
              4 個正在開放、而且和鹿飛服務高度對齊
            </span>{" "}
            的計畫。
          </p>

          {/* Stat strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 pt-10 border-t border-white/10">
            <Stat num="4" label="當期開放計畫" />
            <Stat num="1,000萬" label="單筆最高補助額" />
            <Stat num="3" label="主管機關" />
            <Stat num="100%" label="和鹿飛服務對齊" />
          </div>
        </div>
      </section>

      {/* ───── Agency strip ───── */}
      <section className="bg-cream/60 border-y border-bd/60 py-7 px-5 md:px-10 lg:px-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-gold shrink-0">
              主管機關
            </div>
            <div className="flex-1 flex flex-wrap items-center gap-x-8 gap-y-2">
              <AgencyBadge name="國際貿易署" sub="TITA · 貿易署" />
              <span className="hidden md:block w-px h-5 bg-bd" aria-hidden="true" />
              <AgencyBadge name="經濟部" sub="MOEA" />
              <span className="hidden md:block w-px h-5 bg-bd" aria-hidden="true" />
              <AgencyBadge name="中小及新創企業署" sub="SMEA · 中企署" />
            </div>
            <div className="text-[11.5px] text-tx3 md:text-right shrink-0">
              最後更新 2026.04
            </div>
          </div>
        </div>
      </section>

      {/* ───── Why this matters ───── */}
      <section className="py-[72px] md:py-[96px] px-5 md:px-10 lg:px-16 bg-cream">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold mb-3">
            為什麼這件事值得花十分鐘了解
          </div>
          <h2 className="font-sans text-[clamp(26px,3.2vw,40px)] leading-[1.2] font-light tracking-[-0.5px] max-w-[780px] mb-10">
            補助不是額外收入，是
            <span className="text-gold font-normal">降低你出海的實際成本</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <Pillar
              num="01"
              title="錢是真的"
              desc="每年數億元的預算由貿易署、經濟部執行，不是畫大餅。重點是知道怎麼申請、寫對計畫書。"
            />
            <Pillar
              num="02"
              title="不只是申請表"
              desc="計畫書要和你的商業目標對齊，執行過程要有產出與報告。鹿飛的服務本身就符合大多數結案標準。"
            />
            <Pillar
              num="03"
              title="可以疊加使用"
              desc="同一家公司可以同時申請不同計畫——例如用展覽補助去美國展，用市場布建補助建立當地通路。"
            />
          </div>
        </div>
      </section>

      {/* ───── The 4 subsidies ───── */}
      <section className="py-[72px] md:py-[96px] px-5 md:px-10 lg:px-16 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold mb-3">
            當期開放計畫
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <h2 className="font-sans text-[clamp(28px,3.5vw,44px)] leading-[1.15] font-light tracking-[-0.5px] max-w-[780px]">
              4 個計畫，對應你出海的
              <span className="text-gold font-normal">不同階段</span>
            </h2>
            <div className="text-[13px] text-tx3 md:text-right">
              最後更新 2026.04
              <br />
              名額有限，建議盡早申請
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {SUBSIDIES.map((s) => {
              const c = accentMap[s.accent];
              const stage = STAGE_LABELS[s.stage];
              return (
                <article
                  key={s.slug}
                  id={s.slug}
                  className={`group relative bg-white border border-bd p-7 md:p-9 transition-all duration-400 ${c.border} hover:shadow-lg hover:-translate-y-0.5 scroll-mt-[100px]`}
                >
                  {/* Accent bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-[3px] ${c.bar}`}
                    aria-hidden="true"
                  />

                  {/* Header row */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-start gap-4 min-w-0">
                      {/* Icon */}
                      <div
                        className={`shrink-0 w-14 h-14 ${c.iconBg} flex items-center justify-center rounded-none`}
                      >
                        <SubsidyIcon iconKey={s.iconKey} size={26} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-baseline gap-2.5 mb-1">
                          <span
                            className={`font-sans text-[24px] font-light tabular-nums leading-none ${c.num}`}
                          >
                            {s.num}
                          </span>
                          <span className="text-[10.5px] font-semibold tracking-[1.5px] uppercase text-tx3">
                            {s.agency}
                          </span>
                        </div>
                        <h3 className="text-[19px] md:text-[21px] font-semibold leading-[1.3] text-tx mb-1">
                          {s.shortTitle}
                        </h3>
                        <div className="text-[12.5px] text-tx3 leading-snug">
                          {s.program}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 text-[10.5px] font-semibold tracking-wider uppercase px-2.5 py-1 ${c.badge}`}
                    >
                      {stage.label}
                    </span>
                  </div>

                  {/* Amount + Deadline row */}
                  <div className="grid grid-cols-[1fr_auto] gap-5 mb-5 pb-5 border-b border-bd/60">
                    <div>
                      <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-tx3 mb-1">
                        補助額度
                      </div>
                      <div className={`text-[22px] font-sans font-light ${c.num}`}>
                        {s.amount}
                      </div>
                      {s.amountNote && (
                        <div className="text-[11.5px] text-tx3 mt-1">
                          {s.amountNote}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-tx3 mb-1">
                        申請時程
                      </div>
                      <div className="text-[14px] font-medium text-tx">
                        {s.deadline}
                      </div>
                      <div className="text-[11.5px] text-tx3 mt-1">
                        {s.applicationNote}
                      </div>
                    </div>
                  </div>

                  {/* One-liner */}
                  <p className="text-[14px] text-tx2 leading-[1.75] mb-5">
                    {s.oneLiner}
                  </p>

                  {/* Who for */}
                  <div className="mb-5">
                    <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-tx3 mb-2">
                      適合
                    </div>
                    <ul className="space-y-1.5">
                      {s.whoFor.map((w) => (
                        <li
                          key={w}
                          className="text-[13px] text-tx2 leading-relaxed flex items-start gap-2"
                        >
                          <span className={`shrink-0 mt-[7px] w-1 h-1 ${c.bar}`} />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Covers */}
                  <div className="mb-6">
                    <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-tx3 mb-2">
                      補助涵蓋
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {s.covers.map((cov) => (
                        <span
                          key={cov}
                          className="text-[11.5px] text-tx2 bg-cream px-2.5 py-1"
                        >
                          {cov}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* LUFÉ angle */}
                  <div className="bg-navy text-white/90 p-5 mb-5">
                    <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-gold mb-2">
                      鹿飛怎麼幫上忙
                    </div>
                    <p className="text-[13px] leading-[1.7]">{s.lufeAngle}</p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between gap-4">
                    <Link
                      href="/assess"
                      className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy hover:text-gold transition-colors group/cta"
                    >
                      <span className="border-b border-navy/30 group-hover/cta:border-gold pb-0.5 transition-colors">
                        查我是否符合
                      </span>
                      <span className="transition-transform duration-300 group-hover/cta:translate-x-0.5">
                        →
                      </span>
                    </Link>
                    {s.sourceUrl && (
                      <a
                        href={s.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-tx3 hover:text-gold transition-colors"
                      >
                        官方公告 ↗
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── Stage mapping ───── */}
      <section className="py-[72px] md:py-[96px] px-5 md:px-10 lg:px-16 bg-cream">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold mb-3">
            對應你的出海階段
          </div>
          <h2 className="font-sans text-[clamp(26px,3.2vw,40px)] leading-[1.2] font-light tracking-[-0.5px] max-w-[780px] mb-10">
            不知道哪個適合？先看你
            <span className="text-gold font-normal">現在在哪一步</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {(["assess", "enter", "optimize"] as const).map((stageKey) => {
              const stageInfo = STAGE_LABELS[stageKey];
              const relevant = SUBSIDIES.filter((s) => s.stage === stageKey);
              return (
                <div
                  key={stageKey}
                  className="bg-white border border-bd p-7 md:p-8"
                >
                  <div className="text-[10.5px] font-semibold tracking-[1.5px] uppercase text-gold mb-3">
                    {stageInfo.label}
                  </div>
                  <div className="text-[15px] font-semibold text-tx leading-snug mb-4">
                    {stageInfo.desc}
                  </div>
                  <div className="pt-4 border-t border-bd/60">
                    <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-tx3 mb-2">
                      適用計畫
                    </div>
                    <ul className="space-y-2">
                      {relevant.length === 0 ? (
                        <li className="text-[12.5px] text-tx3">—</li>
                      ) : (
                        relevant.map((s) => (
                          <li
                            key={s.slug}
                            className="text-[13px] text-tx2 leading-snug"
                          >
                            <Link
                              href={`#${s.slug}`}
                              className="hover:text-gold transition-colors"
                            >
                              <span className="text-gold font-semibold">
                                {s.num}
                              </span>{" "}
                              {s.shortTitle}
                            </Link>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="py-[72px] md:py-[96px] px-5 md:px-10 lg:px-16 bg-white">
        <div className="max-w-[860px] mx-auto">
          <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold mb-3">
            常見問題
          </div>
          <h2 className="font-sans text-[clamp(26px,3.2vw,40px)] leading-[1.2] font-light tracking-[-0.5px] mb-12">
            申請前你最可能想問的事
          </h2>

          <div className="space-y-0 border-t border-bd">
            <FAQItem
              q="鹿飛會幫我申請補助嗎？"
              a="我們不是代辦公司。但我們能幫你把「為什麼要出海、要去哪、要怎麼做」講清楚——這剛好就是計畫書的核心。很多客戶是把我們的評估報告直接當成申請依據。"
            />
            <FAQItem
              q="我要自己寫計畫書嗎？"
              a="計畫書的主體要由你公司提出（這是規定）。但鹿飛會提供完整的市場分析、策略規劃與執行方案，讓你只要把內容整理成官方格式即可。"
            />
            <FAQItem
              q="可以同時申請多個計畫嗎？"
              a="可以。不同計畫針對不同用途，例如展覽補助不衝突海外通路布建補助。但同一筆費用不能重複請款，這是基本原則。"
            />
            <FAQItem
              q="申請通過率高嗎？"
              a="各計畫不同，但有策略、有數據、有明確商業目標的申請案明顯較容易過。鹿飛的產出剛好符合這三項——我們不會保證你一定拿到，但會把你的勝率拉到最高。"
            />
            <FAQItem
              q="如果我還沒開始出海，現在申請會不會太早？"
              a="第 4 項跨境電商輔導就是為你這種情況設計的——先用免費資源學，不用先投錢。等你有方向了再申請金額較大的計畫。"
            />
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <SubsidiesCTASection />
    </div>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <div className="font-sans text-[32px] md:text-[40px] text-gold font-extralight tracking-[-1px] leading-none mb-2">
        {num}
      </div>
      <div className="text-[11.5px] text-white/60 font-medium tracking-wider uppercase">
        {label}
      </div>
    </div>
  );
}

function AgencyBadge({ name, sub }: { name: string; sub: string }) {
  return (
    <div className="flex items-baseline gap-2.5">
      <span className="text-[14px] md:text-[15px] font-semibold text-tx tracking-[-0.2px]">
        {name}
      </span>
      <span className="text-[10.5px] text-tx3 font-medium tracking-wider uppercase">
        {sub}
      </span>
    </div>
  );
}

function Pillar({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white p-7 border border-bd">
      <div className="font-sans text-[24px] text-gold font-light tabular-nums mb-3">
        {num}
      </div>
      <h3 className="text-[17px] font-semibold mb-2 leading-tight">{title}</h3>
      <p className="text-[13.5px] text-tx2 leading-[1.75]">{desc}</p>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-bd py-6">
      <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
        <h3 className="text-[16px] md:text-[17px] font-semibold text-tx leading-snug group-hover:text-gold transition-colors">
          {q}
        </h3>
        <span className="shrink-0 w-6 h-6 rounded-full border border-bd flex items-center justify-center text-tx3 text-[14px] transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <p className="mt-4 text-[14px] text-tx2 leading-[1.85] max-w-[720px]">
        {a}
      </p>
    </details>
  );
}
