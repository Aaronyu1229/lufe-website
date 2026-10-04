import { homeWhyEn } from "@/i18n/en/home-why";
import { type Locale } from "@/i18n/locale";
import { homeWhyZh, type HomeWhyCopy } from "@/i18n/zh/home-why";

type ContractRow = {
  readonly type: string;
  readonly desc: string;
  readonly pillars: readonly [boolean, boolean, boolean];
  readonly isLufe?: boolean;
  /** Shown in place of the dash where a partner covers the column. */
  readonly partner?: string;
};

const HOME_CONTRACT_PILLARS = [
  [true, false, false],
  [true, false, false],
  [false, true, false],
  [false, false, true],
  [true, true, false],
] as const;

function createRows(copy: HomeWhyCopy): ContractRow[] {
  return copy.rows.map((row, index) => ({
    ...row,
    pillars: HOME_CONTRACT_PILLARS[index]!,
    ...(index === 4 ? { isLufe: true } : {}),
  }));
}

const format = (template: string, values: Record<string, string>) =>
  template.replace(/\{(type|desc|column|partner)\}/g, (_match, key: string) => values[key] ?? "");

export const HOME_CONTRACT_COLUMNS = homeWhyZh.columns;
export const HOME_CONTRACT_ROWS = createRows(homeWhyZh);
export const HOME_CONTRACT_WEEKDAYS = homeWhyZh.weekdays;

export function OneContractSection({ locale = "zh" }: { readonly locale?: Locale }) {
  const copy = locale === "en" ? homeWhyEn : homeWhyZh;
  const rows = createRows(copy);

  return (
    <section className="bg-cream py-[80px] md:py-[104px]">
      <div className="lufe-container">
        <div className="max-w-[760px]">
          <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-tx [text-wrap:balance]">
            {copy.heading[0]}
            <br />
            <span className="text-gold-d">{copy.heading[1]}</span>
          </h2>
          <p className="mt-5 text-[17px] leading-[1.8] text-tx2">{copy.lead}</p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-px border border-bd bg-bd md:grid-cols-4">
          {copy.weekdays.map(([day, text]) => (
            <div key={day} className="bg-white px-4 py-5 text-[14px] leading-[1.65] text-tx2 md:px-5">
              <strong className="mb-2 block text-[15px] text-gold-d">{day}</strong>
              {text}
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-[760px] whitespace-pre-line text-[16px] leading-[1.85] text-tx2">{copy.body}</p>

        <div className="mt-10 overflow-x-auto border border-bd bg-white">
          <table className="w-full min-w-[620px] table-fixed border-collapse">
            <thead>
              <tr className="border-b border-bd">
                <th scope="col" className="w-[40%] px-3 py-5 text-left text-[13px] font-medium text-tx3 md:px-5">{copy.typeLabel}</th>
                {copy.columns.map((column) => (
                  <th key={column} scope="col" className="px-2 py-5 text-center text-[12px] font-medium text-tx3 md:text-[13px]">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.type} className={`border-t border-bd ${row.isLufe ? "bg-gold/10" : ""}`}>
                  <th scope="row" className={`px-3 py-5 text-left text-[14px] text-tx md:px-5 ${row.isLufe ? "border-l-[3px] border-gold" : ""}`}>
                    <span className="font-semibold">{row.type}</span><span className="text-tx3"> - </span><span className={row.isLufe ? "font-normal text-gold-d" : "font-normal text-tx2"}>{row.desc}</span>
                  </th>
                  {row.pillars.map((covered, index) => {
                    const column = copy.columns[index]!;
                    const ariaLabel = covered
                      ? format(copy.coverageTemplates.covered, { type: row.type, desc: row.desc, column })
                      : row.partner
                        ? format(copy.coverageTemplates.partner, { column, partner: row.partner })
                        : format(copy.coverageTemplates.missing, { type: row.type, desc: row.desc, column });
                    return <td key={column} aria-label={ariaLabel} className={`px-2 py-5 text-center ${covered ? "text-gold-d" : "text-tx3/50"}`}>
                      {covered ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="inline-block align-middle"><path d="m3 8 3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" /></svg> : row.partner ? <span aria-hidden="true" className="text-[13px] font-medium text-tx2">{row.partner}</span> : <span aria-hidden="true" className="inline-block text-[18px] leading-none">—</span>}
                    </td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
