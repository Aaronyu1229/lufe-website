"use client";

const partners = [
  { name: "Costco", abbr: "COSTCO" },
  { name: "Amazon", abbr: "AMAZON" },
  { name: "Walmart", abbr: "WALMART" },
  { name: "CVS", abbr: "CVS" },
  { name: "Shopee", abbr: "SHOPEE" },
  { name: "Lazada", abbr: "LAZADA" },
];

export function LogoStrip() {
  // Double the list for seamless infinite scroll
  const doubled = [...partners, ...partners];

  return (
    <section className="py-14 px-5 md:px-10 border-b border-bd bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <p className="text-[11px] text-tx3 tracking-[2px] uppercase text-center mb-8 font-medium">
          我們的客戶進入過這些通路
        </p>
        <div className="relative">
          <div className="flex items-center gap-12 md:gap-16 animate-marquee whitespace-nowrap">
            {doubled.map((p, i) => (
              <span
                key={`${p.name}-${i}`}
                className="text-[14px] md:text-[16px] font-bold tracking-[3px] text-tx3/30 uppercase select-none flex-shrink-0"
              >
                {p.abbr}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
