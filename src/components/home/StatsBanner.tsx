"use client";

const stats = [
  { value: "10+", label: "年出海實戰經驗" },
  { value: "50+", label: "企業成功出海" },
  { value: "30+", label: "覆蓋國家市場" },
  { value: "2,400+", label: "TradePilot 用戶" },
];

export function StatsBanner() {
  return (
    <section className="bg-navy py-[72px] px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="font-heading text-[clamp(36px,4vw,52px)] text-gold leading-none font-bold mb-2">
              {s.value}
            </div>
            <div className="text-[13px] text-white/60 font-normal tracking-wide">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
