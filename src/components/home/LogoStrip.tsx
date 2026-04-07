const partners = [
  { name: "Costco", abbr: "COSTCO" },
  { name: "Amazon", abbr: "AMAZON" },
  { name: "Walmart", abbr: "WALMART" },
  { name: "CVS", abbr: "CVS" },
  { name: "Shopee", abbr: "SHOPEE" },
  { name: "Lazada", abbr: "LAZADA" },
];

export function LogoStrip() {
  return (
    <section className="py-12 px-5 md:px-10 border-b border-bd bg-white">
      <div className="max-w-[1400px] mx-auto">
        <p className="text-[11px] text-tx3 tracking-[2px] uppercase text-center mb-8 font-medium">
          我們的客戶進入過這些通路
        </p>
        <div className="flex items-center justify-center gap-12 md:gap-16 flex-wrap">
          {partners.map((p) => (
            <span
              key={p.name}
              className="text-[14px] md:text-[16px] font-bold tracking-[3px] text-tx3/30 uppercase select-none"
            >
              {p.abbr}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
