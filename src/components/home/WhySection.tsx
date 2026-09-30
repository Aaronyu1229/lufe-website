export const HOME_CONTRACT_COLUMNS = ["品測與寄賣", "落地與客服", "國際物流"] as const;

type ContractRow = {
  readonly label: string;
  readonly pillars: readonly [boolean, boolean, boolean];
  readonly isLufe?: boolean;
};

export const HOME_CONTRACT_ROWS: readonly ContractRow[] = [
  { label: "顧問公司，出一份策略報告", pillars: [true, false, false] },
  { label: "貿易商，幫你把貨賣掉", pillars: [true, false, false] },
  { label: "客服外包，幫你接電話", pillars: [false, true, false] },
  { label: "貨代，把貨送到", pillars: [false, false, true] },
  { label: "鹿飛 LUFÉ，一份合約走完", pillars: [true, true, true], isLufe: true },
];

export const HOME_CONTRACT_WEEKDAYS = [
  ["星期一", "顧問來催進度"],
  ["星期二", "貿易商來催付款"],
  ["星期三", "貨代來催艙位"],
  ["星期四", "客服外包問這封信要怎麼回"],
] as const;

export function OneContractSection() {
  return (
    <section className="bg-cream px-5 py-[80px] md:px-10 md:py-[104px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-[760px]">
          <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-tx [text-wrap:balance]">
            一個窗口，
            <br />
            <span className="text-gold-d">一條進度線</span>
          </h2>
          <p className="mt-5 text-[17px] leading-[1.8] text-tx2">我們常聽到的版本是這樣：</p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-px border border-bd bg-bd md:grid-cols-4">
          {HOME_CONTRACT_WEEKDAYS.map(([day, text]) => (
            <div key={day} className="bg-white px-4 py-5 text-[14px] leading-[1.65] text-tx2 md:px-5">
              <strong className="mb-2 block text-[15px] text-gold-d">{day}</strong>
              {text}
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-[760px] whitespace-pre-line text-[16px] leading-[1.85] text-tx2">老闆自己變成了中央窗口——每一家做完一件事，就交給下一家。{"\n\n"}鹿飛把品測、寄賣、落地、客服，加上物流，放在同一份合約裡。{"\n"}你開一次會，其他人我們去對。</p>

        <div className="mt-10 overflow-x-auto border border-bd bg-white">
          <table className="w-full min-w-[620px] table-fixed border-collapse">
            <thead>
              <tr className="border-b border-bd bg-cream">
                <th scope="col" className="w-[42%] px-3 py-4 text-left text-[13px] font-medium text-tx2 md:px-5">類型</th>
                {HOME_CONTRACT_COLUMNS.map((column) => (
                  <th key={column} scope="col" className="px-2 py-4 text-center text-[12px] font-medium text-tx2 md:text-[13px]">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOME_CONTRACT_ROWS.map((row) => (
                <tr key={row.label} data-lufe-sweep={row.isLufe ? "" : undefined} className={`lufe-contract-row border-t border-bd ${row.isLufe ? "bg-gold/10" : ""}`}>
                  <th scope="row" className={`px-3 py-4 text-left text-[14px] font-medium md:px-5 ${row.isLufe ? "text-gold-d" : "text-tx"}`}>{row.label}</th>
                  {row.pillars.map((covered, index) => (
                    <td key={HOME_CONTRACT_COLUMNS[index]} aria-label={covered ? `${row.label}涵蓋${HOME_CONTRACT_COLUMNS[index]}` : `${row.label}不涵蓋${HOME_CONTRACT_COLUMNS[index]}`} className={`px-2 py-4 text-center text-[14px] ${covered ? (row.isLufe ? "text-gold-d" : "text-tx2") : "text-tx3"}`}>
                      <span aria-hidden="true">{covered ? "●" : "—"}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-[15px] font-medium leading-[1.8] text-tx2">沒有責任轉交，沒有窗口切換，貨到了之後也不會沒人接。</p>
      </div>
    </section>
  );
}
