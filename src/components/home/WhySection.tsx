export const HOME_COVERAGE_PILLARS = ["產品適配", "通路銷售", "國際物流"] as const;

type CoverageRow = {
  label: string;
  note: string;
  pillars: readonly [boolean, boolean, boolean];
  variant: "default" | "lufe";
};

export const HOME_COVERAGE_ROWS: readonly CoverageRow[] = [
  {
    label: "傳統顧問",
    note: "只出策略報告",
    pillars: [true, false, false],
    variant: "default",
  },
  {
    label: "貿易商",
    note: "只做中段通路",
    pillars: [false, true, false],
    variant: "default",
  },
  {
    label: "貨代 / 物流商",
    note: "只跑後段運輸",
    pillars: [false, false, true],
    variant: "default",
  },
  {
    label: "鹿飛 LUFÉ",
    note: "三件事全程自營",
    pillars: [true, true, true],
    variant: "lufe",
  },
];

export function WhySection() {
  return (
    <section className="bg-navy px-5 py-[96px] text-white md:px-10 md:py-[128px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-14 max-w-[860px] text-center md:mb-16">
          <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-semibold leading-[1.14] tracking-normal">
            從評估市場到貨上架，
            <br />
            你面對的<span className="text-gold">只有我們</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[17px] font-normal leading-[1.8] text-white/65">
            產品適配、通路銷售、躍馬 42 年國際物流 ——
            <br className="hidden md:block" />
            不是三家拼起來的拼盤，是一個團隊從頭跑到尾。一個專案經理、一份合約、一條進度線。
          </p>
        </div>

        <div className="mx-auto max-w-[860px] overflow-hidden border border-white/[0.08] bg-white/[0.04]">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th scope="col" className="w-[36%] px-3 py-4 text-left text-[13px] font-medium text-white/60 md:w-[40%] md:px-5">
                  <span className="sr-only">類型</span>
                </th>
                {HOME_COVERAGE_PILLARS.map((pillar) => (
                  <th key={pillar} scope="col" className="px-1 py-4 text-center text-[12px] font-medium text-white/60 md:px-2 md:text-[13px]">
                    {pillar}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOME_COVERAGE_ROWS.map((row) => {
                const isLufe = row.variant === "lufe";

                return (
                  <tr key={row.label} className={`border-t border-white/[0.06] ${isLufe ? "bg-gold/10" : ""}`}>
                    <th scope="row" className={`px-3 py-4 text-left text-[14px] font-medium md:px-5 ${isLufe ? "text-gold" : "text-white/80"}`}>
                      {row.label}
                      <small className={`mt-0.5 block text-[12px] font-normal ${isLufe ? "text-gold/85" : "text-white/55"}`}>
                        {row.note}
                      </small>
                    </th>
                    {row.pillars.map((covered, index) => (
                      <td
                        key={HOME_COVERAGE_PILLARS[index]}
                        role="img"
                        aria-label={covered ? `${row.label}涵蓋${HOME_COVERAGE_PILLARS[index]}` : `${row.label}不涵蓋${HOME_COVERAGE_PILLARS[index]}`}
                        className={`px-1 py-4 text-center text-[14px] md:px-2 ${covered ? (isLufe ? "text-gold" : "text-white/45") : "text-white/20"}`}
                      >
                        <span aria-hidden="true">{covered ? "●" : "—"}</span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mx-auto mt-6 max-w-[720px] text-center text-[12px] font-normal leading-[1.8] text-white/65 md:text-[13.5px]">
          對手做完一件事交給下一家，鹿飛三件事<span className="text-gold/80">全程自營</span>——
          <br className="hidden md:block" />
          沒有責任轉交，沒有窗口切換，沒有進度真空。
        </p>

        <div className="mx-auto mt-16 max-w-[680px] text-center md:mt-[72px]">
          <q className="block text-[18px] font-normal leading-[1.8] text-white/85 md:text-[20px]">
            以前要同時盯三家——顧問催進度、貿易商催付款、貨代催艙位。換成鹿飛之後，
            我只開一次會，每週一份進度信。本來要三週的事情，七天就跑完。
          </q>
          <div className="mt-5 text-[13.5px] font-normal text-white/50">
            <span className="font-medium text-white/75">陳執行長</span>
            <span>台灣食品品牌・東南亞市場</span>
          </div>
        </div>
      </div>
    </section>
  );
}
