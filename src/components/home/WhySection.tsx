export const HOME_CONTRACT_COLUMNS = ["市場探查與寄賣", "落地與客服", "國際物流"] as const;

type ContractRow = {
  readonly type: string;
  readonly desc: string;
  readonly pillars: readonly [boolean, boolean, boolean];
  readonly isLufe?: boolean;
};

export const HOME_CONTRACT_ROWS: readonly ContractRow[] = [
  { type: "顧問公司", desc: "出一份策略報告", pillars: [true, false, false] },
  { type: "貿易商", desc: "幫你把貨賣掉", pillars: [true, false, false] },
  { type: "客服外包", desc: "幫你接電話", pillars: [false, true, false] },
  { type: "貨代", desc: "把貨送到", pillars: [false, false, true] },
  { type: "鹿飛 LUFÉ", desc: "一份合約走完", pillars: [true, true, true], isLufe: true },
];

export const HOME_CONTRACT_WEEKDAYS = [
  ["星期一", "顧問來催進度"],
  ["星期二", "貿易商來催付款"],
  ["星期三", "貨代來催艙位"],
  ["星期四", "客服外包問這封信要怎麼回"],
] as const;

export function OneContractSection() {
  return (
    <section className="bg-cream py-[80px] md:py-[104px]">
      <div className="lufe-container">
        <div className="max-w-[760px]">
          <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-tx [text-wrap:balance]">
            顧問、貿易商、貨代、客服各管一段，
            <br />
            <span className="text-gold-d">老闆成了唯一的窗口</span>
          </h2>
          <p className="mt-5 text-[17px] leading-[1.8] text-tx2">多數企業出海的一週，是這樣過的：</p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-px border border-bd bg-bd md:grid-cols-4">
          {HOME_CONTRACT_WEEKDAYS.map(([day, text]) => (
            <div key={day} className="bg-white px-4 py-5 text-[14px] leading-[1.65] text-tx2 md:px-5">
              <strong className="mb-2 block text-[15px] text-gold-d">{day}</strong>
              {text}
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-[760px] whitespace-pre-line text-[16px] leading-[1.85] text-tx2">每一家只負責自己那一段，進度卡住時，沒有人負責把它串起來。{"\n\n"}鹿飛把市場探查、寄賣、落地、客服與國際物流，整合在同一份合約裡{"\n"}一個窗口對接所有環節，企業只需要開一次會</p>

        <div className="mt-10 overflow-x-auto border border-bd bg-white">
          <table className="w-full min-w-[620px] table-fixed border-collapse">
            <thead>
              <tr className="border-b border-bd">
                <th scope="col" className="w-[40%] px-3 py-5 text-left text-[13px] font-medium text-tx3 md:px-5">類型</th>
                {HOME_CONTRACT_COLUMNS.map((column) => (
                  <th key={column} scope="col" className="px-2 py-5 text-center text-[12px] font-medium text-tx3 md:text-[13px]">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOME_CONTRACT_ROWS.map((row) => (
                <tr key={row.type} className={`border-t border-bd ${row.isLufe ? "bg-gold/10" : ""}`}>
                  <th scope="row" className={`px-3 py-5 text-left text-[14px] text-tx md:px-5 ${row.isLufe ? "border-l-[3px] border-gold" : ""}`}>
                    <span className="font-semibold">{row.type}</span><span className="text-tx3"> - </span><span className={row.isLufe ? "font-normal text-gold-d" : "font-normal text-tx2"}>{row.desc}</span>
                  </th>
                  {row.pillars.map((covered, index) => (
                    <td key={HOME_CONTRACT_COLUMNS[index]} aria-label={covered ? `${row.type} - ${row.desc}涵蓋${HOME_CONTRACT_COLUMNS[index]}` : `${row.type} - ${row.desc}不涵蓋${HOME_CONTRACT_COLUMNS[index]}`} className={`px-2 py-5 text-center ${covered ? "text-gold-d" : "text-tx3/50"}`}>
                      {covered ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="inline-block align-middle"><path d="m3 8 3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" /></svg> : <span aria-hidden="true" className="inline-block text-[18px] leading-none">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-[15px] font-medium leading-[1.8] text-tx2">沒有責任轉交，沒有窗口切換，抵達之後也有人接手</p>
      </div>
    </section>
  );
}
