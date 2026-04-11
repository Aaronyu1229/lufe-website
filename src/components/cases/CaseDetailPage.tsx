"use client";

import Image from "next/image";
import Link from "next/link";
import { useMessageBox } from "../MessageBox";
import { getRelatedCases, type CaseStudy } from "@/data/cases";
import { STAGES } from "@/data/services";

interface Props {
  readonly caseItem: CaseStudy;
}

const tagStyles: Record<string, string> = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold",
};

export function CaseDetailPage({ caseItem }: Props) {
  const { open } = useMessageBox();
  const relatedCases = getRelatedCases(caseItem.slug);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-navy pt-[130px] md:pt-[170px] pb-[60px] md:pb-[80px] px-5 md:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={caseItem.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/60 to-navy" />
        </div>

        <div className="relative max-w-[1000px] mx-auto">
          <nav className="flex items-center gap-2 text-[12px] text-white/50 mb-6">
            <Link href="/cases" className="hover:text-white transition-colors">
              案例
            </Link>
            <span>/</span>
            <span className="text-white/80">{caseItem.tags[0]?.label}</span>
          </nav>

          <div className="flex gap-1.5 mb-4">
            {caseItem.tags.map((t) => (
              <span
                key={t.label}
                className={`text-[11px] px-2.5 py-[3px] rounded-sm font-medium ${tagStyles[t.variant]}`}
              >
                {t.label}
              </span>
            ))}
          </div>

          <h1 className="font-heading text-[clamp(28px,4.2vw,48px)] text-white leading-[1.15] font-light tracking-[-0.6px] mb-6 max-w-[840px]">
            {caseItem.title}
          </h1>
          <p className="text-[16px] md:text-[18px] text-white/70 max-w-[720px] leading-[1.7] font-light">
            {caseItem.summary}
          </p>

          {/* Stats row */}
          <div className="flex gap-8 md:gap-12 mt-10 flex-wrap">
            {caseItem.stats.map((s) => (
              <div key={s.label}>
                <div className="font-heading text-[36px] md:text-[44px] text-gold leading-none font-semibold tabular-nums">
                  {s.value}
                </div>
                <div className="text-[11px] md:text-[12px] text-white/55 mt-2 tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Story: Challenge / Approach / Result ─── */}
      <section className="bg-white py-[80px] md:py-[100px] px-5 md:px-10">
        <div className="max-w-[820px] mx-auto">
          <div className="space-y-12">
            <div>
              <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-sky mb-3">
                01 挑戰
              </div>
              <h2 className="text-[22px] md:text-[26px] font-light leading-tight mb-4">
                起點：客戶遇到什麼問題？
              </h2>
              <p className="text-[15.5px] text-tx2 leading-[1.9] font-normal">
                {caseItem.challenge}
              </p>
            </div>

            <div>
              <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold mb-3">
                02 我們的做法
              </div>
              <h2 className="text-[22px] md:text-[26px] font-light leading-tight mb-4">
                怎麼切入這個問題？
              </h2>
              <p className="text-[15.5px] text-tx2 leading-[1.9] font-normal">
                {caseItem.approach}
              </p>

              {/* Stages used */}
              {caseItem.stagesUsed.length > 0 && (
                <div className="mt-6 pt-6 border-t border-bd">
                  <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-tx3 mb-3">
                    這個案子用到的階段
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {caseItem.stagesUsed.map((stageSlug) => {
                      const stage = STAGES[stageSlug];
                      return (
                        <Link
                          key={stageSlug}
                          href={`/services/${stageSlug}`}
                          className="group inline-flex items-center gap-2 px-3 py-2 border border-bd hover:border-gold transition-colors text-[12.5px]"
                        >
                          <span className="font-sans font-semibold text-gold tabular-nums">
                            {stage.num}
                          </span>
                          <span className="text-tx2 group-hover:text-tx transition-colors">
                            {stage.title}
                          </span>
                          <span className="text-tx3 group-hover:text-gold transition-colors">
                            →
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-ember mb-3">
                03 結果
              </div>
              <h2 className="text-[22px] md:text-[26px] font-light leading-tight mb-4">
                最後發生了什麼？
              </h2>
              <p className="text-[15.5px] text-tx2 leading-[1.9] font-normal">
                {caseItem.result}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Key Decisions ─── */}
      {caseItem.keyDecisions.length > 0 && (
        <section className="bg-cream py-[80px] md:py-[100px] px-5 md:px-10">
          <div className="max-w-[900px] mx-auto">
            <div className="section-label">關鍵決策</div>
            <h2 className="section-heading">
              過程中<span className="font-normal text-gold">做過的判斷</span>
            </h2>
            <p className="section-desc">
              不只寫「發生了什麼」，把當時的選項和為什麼這樣選也攤出來——這才是經驗真正的價值。
            </p>

            <div className="space-y-6 mt-10">
              {caseItem.keyDecisions.map((d, i) => (
                <div
                  key={i}
                  className="bg-white rounded-none p-6 md:p-8 border-l-4 border-gold"
                >
                  <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-gold mb-3">
                    決策 {i + 1}
                  </div>
                  <h3 className="text-[18px] md:text-[20px] font-semibold mb-5 leading-tight">
                    {d.moment}
                  </h3>

                  <div className="mb-5">
                    <div className="text-[10.5px] font-semibold tracking-[1px] uppercase text-tx3 mb-2">
                      當時的選項
                    </div>
                    <ul className="space-y-1.5">
                      {d.options.map((opt, j) => {
                        const isChoice = opt === d.choice || d.choice.includes(opt.split("（")[0]?.trim() ?? opt);
                        return (
                          <li
                            key={j}
                            className={`flex items-start gap-2.5 text-[13.5px] leading-[1.7] ${
                              isChoice ? "text-tx font-medium" : "text-tx3"
                            }`}
                          >
                            <span
                              className={`mt-[7px] shrink-0 w-3 h-3 rounded-full border-2 ${
                                isChoice
                                  ? "border-gold bg-gold"
                                  : "border-bd"
                              }`}
                            />
                            {opt}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-bd">
                    <div className="text-[10.5px] font-semibold tracking-[1px] uppercase text-gold mb-2">
                      我們選了：{d.choice}
                    </div>
                    <p className="text-[13.5px] text-tx2 leading-[1.8]">
                      <span className="text-tx font-medium">理由：</span>
                      {d.reasoning}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Timeline ─── */}
      {caseItem.timeline.length > 0 && (
        <section className="bg-white py-[80px] md:py-[100px] px-5 md:px-10">
          <div className="max-w-[820px] mx-auto">
            <div className="section-label">時間軸</div>
            <h2 className="section-heading">
              從啟動到收尾的<span className="font-normal text-gold">時間節奏</span>
            </h2>

            <div className="relative mt-12">
              {/* Vertical line */}
              <div className="absolute left-[22px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-gold/60 via-gold/30 to-gold/10" />

              <div className="space-y-8">
                {caseItem.timeline.map((t, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="relative z-10 w-11 h-11 rounded-full bg-gold border-4 border-white flex items-center justify-center text-navy font-heading text-[13px] font-semibold shrink-0 shadow-md">
                      {i + 1}
                    </div>
                    <div className="pt-1">
                      <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-gold mb-1">
                        {t.when}
                      </div>
                      <h3 className="text-[16px] md:text-[17px] font-semibold mb-1 leading-tight">
                        {t.title}
                      </h3>
                      <p className="text-[13.5px] text-tx2 leading-[1.7]">
                        {t.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Quote ─── */}
      {caseItem.quote && (
        <section className="bg-navy py-[72px] md:py-[96px] px-5 md:px-10">
          <div className="max-w-[760px] mx-auto">
            <div className="border-l-2 border-gold pl-6 md:pl-8">
              <q className="block text-[18px] md:text-[22px] text-white/90 italic leading-[1.7] font-light mb-5 font-[var(--font-playfair)]">
                {caseItem.quote.text}
              </q>
              <cite className="text-[13px] text-gold not-italic font-medium">
                — {caseItem.quote.attribution}
              </cite>
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="bg-cream py-[72px] md:py-[96px] px-5 md:px-10">
        <div className="max-w-[720px] mx-auto text-center">
          <h2 className="font-sans text-[clamp(24px,3vw,36px)] leading-[1.2] font-light tracking-[-0.4px] mb-4">
            你的產品也有<span className="text-gold font-normal">類似的機會</span>嗎？
          </h2>
          <p className="text-[15px] text-tx2 leading-[1.75] mb-10 max-w-[520px] mx-auto">
            每個案子的起點都是一場對話。聊聊你的狀況，我們會告訴你這個故事裡哪一段跟你最相關。
          </p>
          <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap">
            <button
              onClick={open}
              className="bg-gold text-navy px-9 py-[15px] rounded-none text-[14px] font-semibold tracking-[0.5px] transition-all hover:bg-gold-l cursor-pointer"
            >
              聊聊你的產品 →
            </button>
            <Link
              href="/assess"
              className="group inline-flex items-center gap-2 text-tx2 text-[14px] font-medium transition-colors hover:text-navy"
            >
              <span className="border-b border-tx3/40 pb-0.5 group-hover:border-navy transition-colors">
                先做 2 分鐘評估
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Related Cases ─── */}
      {relatedCases.length > 0 && (
        <section className="bg-white py-[72px] md:py-[96px] px-5 md:px-10 border-t border-bd">
          <div className="max-w-[1100px] mx-auto">
            <div className="section-label">相關案例</div>
            <h2 className="section-heading">更多成功的故事</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
              {relatedCases.map((rc) => (
                <Link
                  key={rc.slug}
                  href={`/cases/${rc.slug}`}
                  className="group bg-cream rounded-none text-left cursor-pointer transition-all hover:shadow-lg relative overflow-hidden"
                >
                  <div className="h-[180px] overflow-hidden relative">
                    <Image
                      src={rc.heroImage}
                      alt={rc.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 md:p-7">
                    <div className="flex gap-1.5 mb-3">
                      {rc.tags.map((t) => (
                        <span
                          key={t.label}
                          className={`text-[11px] px-2.5 py-[3px] rounded-none font-medium ${tagStyles[t.variant]}`}
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>
                    <div className="font-heading text-[36px] text-gold leading-none font-semibold mb-2.5">
                      {rc.num}
                    </div>
                    <h3 className="font-heading text-[17px] leading-[1.4] mb-2 font-bold">
                      {rc.title}
                    </h3>
                    <p className="text-[13px] text-tx2 leading-[1.65] font-normal mb-3">
                      {rc.summary}
                    </p>
                    <span className="text-[13px] font-semibold text-gold group-hover:translate-x-0.5 inline-block transition-transform">
                      看完整案例 →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Back to all cases ─── */}
      <section className="bg-white pb-[60px] px-5 md:px-10">
        <div className="max-w-[1100px] mx-auto text-center">
          <Link
            href="/cases"
            className="group inline-flex items-center gap-2 text-[13px] text-tx2 font-medium hover:text-navy transition-colors"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
            <span className="border-b border-tx3/40 pb-0.5 group-hover:border-navy transition-colors">
              回到所有案例
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
