const RATES = [
  { label: "2019 年平均", value: 1420 },
  { label: "2021 年 9 月高點", value: 10377 },
] as const;

const MAX = Math.max(...RATES.map((rate) => rate.value));

/** CHART-SLOT-02: 40ft container world average rate, 2019 vs Sept 2021 (Drewry WCI). */
export function FreightRateChart() {
  return <figure data-slot="CHART-SLOT-02" className="mt-8" aria-label="2019 與 2021 年 40 呎貨櫃全球平均運價比較">
    <div className="flex flex-col justify-center gap-5 border-y border-bd py-6 md:aspect-[3/1] md:py-0">
      <p className="text-[13px] text-tx3">每個 40 呎貨櫃，全球平均運價</p>
      {RATES.map((rate, index) => <div key={rate.label} className="grid gap-2 sm:grid-cols-[132px_minmax(0,1fr)] sm:items-center sm:gap-4">
        <p className="text-[14px] text-tx2">{rate.label}</p>
        <div className="flex min-w-0 items-center gap-3">
          <span aria-hidden="true" className={`block h-3 ${index ? "bg-gold" : "bg-tx3/40"}`} style={{ width: `${Math.max(4, (rate.value / MAX) * 78)}%` }} />
          <span className="num shrink-0 text-[16px] text-tx">{rate.value.toLocaleString("en-US")} 美元</span>
        </div>
      </div>)}
    </div>
    <figcaption className="mt-3 text-[13px] text-tx3">資料來源：Drewry World Container Index</figcaption>
  </figure>;
}
