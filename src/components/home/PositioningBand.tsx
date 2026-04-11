"use client";

import Link from "next/link";

/**
 * PositioningBand
 * Direction A — "一條線". Four stages shown as connected nodes on a single
 * golden path. The metaphor "one team, one line" is the visual hook: the
 * path visually links market assessment → product testing → channel entry
 * → localization, each node deep-linking to its /services/[stage] sub-page.
 *
 * Also fixes the taxonomy bug: step 02 is now "產品測試" (not 合規認證),
 * matching the four-stage taxonomy used everywhere else on the site.
 */

type Accent = "sky" | "gold" | "ember";

interface Step {
  readonly slug: string;
  readonly num: string;
  readonly title: string;
  readonly desc: string;
  readonly accent: Accent;
}

const steps: readonly Step[] = [
  {
    slug: "market-assessment",
    num: "01",
    title: "市場評估",
    desc: "值不值得去",
    accent: "sky",
  },
  {
    slug: "product-testing",
    num: "02",
    title: "產品測試",
    desc: "能不能賣出去",
    accent: "sky",
  },
  {
    slug: "channel-entry",
    num: "03",
    title: "通路進入",
    desc: "用什麼條件上架",
    accent: "gold",
  },
  {
    slug: "localization",
    num: "04",
    title: "海外落地",
    desc: "長期站得住腳",
    accent: "ember",
  },
];

const accentMap: Record<
  Accent,
  { border: string; text: string; glow: string }
> = {
  sky: {
    border: "border-sky",
    text: "text-sky",
    glow: "group-hover:shadow-[0_0_0_6px_rgba(91,143,168,0.12)]",
  },
  gold: {
    border: "border-gold-d",
    text: "text-gold-d",
    glow: "group-hover:shadow-[0_0_0_6px_rgba(212,168,92,0.15)]",
  },
  ember: {
    border: "border-ember",
    text: "text-ember",
    glow: "group-hover:shadow-[0_0_0_6px_rgba(217,139,74,0.14)]",
  },
};

// Horizontal gradient: sky → gold → ember, matching accent progression
const LINE_GRADIENT_H =
  "linear-gradient(to right, rgba(91,143,168,0.35) 0%, rgba(91,143,168,0.5) 22%, rgba(212,168,92,0.6) 50%, rgba(217,139,74,0.5) 78%, rgba(217,139,74,0.35) 100%)";

const LINE_GRADIENT_V =
  "linear-gradient(to bottom, rgba(91,143,168,0.35) 0%, rgba(91,143,168,0.5) 22%, rgba(212,168,92,0.6) 50%, rgba(217,139,74,0.5) 78%, rgba(217,139,74,0.35) 100%)";

export function PositioningBand() {
  return (
    <section className="relative bg-cream py-[80px] md:py-[104px] px-5 md:px-10 overflow-hidden">
      {/* Soft gold radial glow — gives the section visual weight without a photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 35%, rgba(212,168,92,0.075) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto">
        {/* Identity header — centered, single memorable headline */}
        <div className="text-center mb-14 md:mb-20">
          <div className="text-[11.5px] font-semibold tracking-[2.5px] uppercase text-gold-d mb-5">
            鹿飛是什麼
          </div>
          <h2 className="font-sans text-[clamp(32px,5vw,58px)] leading-[1.05] font-light tracking-[-0.8px] text-navy mb-6">
            一個團隊，
            <span className="text-gold-d font-normal">一條線。</span>
          </h2>
          <p className="text-[15px] md:text-[17px] text-tx2 max-w-[640px] mx-auto leading-[1.75] font-normal">
            從「<span className="text-tx font-medium">值不值得去</span>」走到「
            <span className="text-tx font-medium">站得住腳</span>
            」，四個階段我們全程陪跑。
          </p>
        </div>

        {/* ─── Desktop path ─── */}
        <div className="hidden md:block relative">
          {/* Connector line — runs through the vertical center of the circles */}
          <div
            aria-hidden="true"
            className="absolute left-[12%] right-[12%] top-[36px] h-[2px]"
            style={{ background: LINE_GRADIENT_H }}
          />

          <ul className="grid grid-cols-4 gap-6 relative list-none p-0 m-0">
            {steps.map((s) => {
              const c = accentMap[s.accent];
              return (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex flex-col items-center text-center"
                  >
                    <div
                      className={`relative z-10 w-[72px] h-[72px] rounded-full border-2 bg-cream flex items-center justify-center transition-all duration-300 ${c.border} ${c.glow} group-hover:-translate-y-1`}
                    >
                      <span
                        className={`font-sans text-[20px] font-semibold tabular-nums ${c.text}`}
                      >
                        {s.num}
                      </span>
                    </div>
                    <h3 className="text-[16px] lg:text-[17px] font-semibold mt-6 mb-1.5 text-tx group-hover:text-navy transition-colors">
                      {s.title}
                    </h3>
                    <p className={`text-[12.5px] lg:text-[13px] font-normal ${c.text}`}>
                      {s.desc}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ─── Mobile path — vertical ─── */}
        <div className="md:hidden relative">
          <div
            aria-hidden="true"
            className="absolute left-[27px] top-[27px] bottom-[27px] w-[2px]"
            style={{ background: LINE_GRADIENT_V }}
          />

          <ul className="space-y-7 list-none p-0 m-0">
            {steps.map((s) => {
              const c = accentMap[s.accent];
              return (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex items-start gap-5"
                  >
                    <div
                      className={`relative z-10 w-[54px] h-[54px] rounded-full border-2 bg-cream flex items-center justify-center shrink-0 transition-all ${c.border} group-hover:scale-105`}
                    >
                      <span
                        className={`font-sans text-[16px] font-semibold tabular-nums ${c.text}`}
                      >
                        {s.num}
                      </span>
                    </div>
                    <div className="pt-1">
                      <h3 className="text-[16px] font-semibold text-tx mb-0.5">
                        {s.title}
                      </h3>
                      <p className={`text-[13px] font-normal ${c.text}`}>
                        {s.desc}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ─── Proof narrative — numbers woven into a single sentence ─── */}
        <div className="mt-14 md:mt-20 pt-8 border-t border-bd/50 text-center">
          <p className="text-[14.5px] md:text-[16px] text-tx2 leading-[1.85] font-normal">
            這條線，我們走過{" "}
            <strong className="text-navy font-semibold tabular-nums">
              500+
            </strong>{" "}
            次，覆蓋{" "}
            <strong className="text-navy font-semibold tabular-nums">
              30+
            </strong>{" "}
            國家，累積{" "}
            <strong className="text-navy font-semibold tabular-nums">10</strong>{" "}
            年實戰。
          </p>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 mt-6 text-[13px] font-semibold text-tx2 hover:text-navy transition-colors"
          >
            <span className="border-b border-tx3/40 pb-0.5 group-hover:border-navy transition-colors">
              看每個階段做什麼
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
