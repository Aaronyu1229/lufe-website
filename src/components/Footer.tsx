import Link from "next/link";

const serviceLinks = [
  { label: "市場評估", href: "/services/market-assessment" },
  { label: "產品測試", href: "/services/product-testing" },
  { label: "通路進入", href: "/services/channel-entry" },
  { label: "海外落地", href: "/services/localization" },
  { label: "進階優化方案", href: "/services/optimize" },
  { label: "方法論", href: "/services/methodology" },
];

const resourceLinks = [
  { label: "洞察與指南", href: "/insights" },
  { label: "2 分鐘自助評估", href: "/assess" },
  { label: "TradePilot 工具", href: "https://tradepiloter.com", external: true },
  { label: "關於我們", href: "/about" },
];

const contactLinks = [
  { label: "hello@lufe.co", href: "mailto:hello@lufe.co" },
  { label: "LINE 官方帳號", href: "https://line.me", external: true },
  { label: "台北市", href: "" },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white/50 pt-[72px] pb-8 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <span className="font-sans font-bold text-[18px] text-white">
            鹿飛 LUF<span className="text-gold">É</span>
          </span>
          <p className="text-[13px] max-w-[250px] leading-[1.7] font-light mt-2 text-white/55">
            跨境顧問與執行團隊。結合十年物流實戰與科技，從策略到落地一條線搞定。
          </p>
        </div>

        <div>
          <h2 className="text-[11.5px] font-semibold text-white/60 mb-3 tracking-[1px] uppercase">
            服務
          </h2>
          {serviceLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-[14px] text-white/50 mb-2 py-1.5 font-light hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <h2 className="text-[11.5px] font-semibold text-white/60 mb-3 tracking-[1px] uppercase">
            資源
          </h2>
          {resourceLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[14px] text-white/50 mb-2 py-1.5 font-light hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="block text-[14px] text-white/50 mb-2 py-1.5 font-light hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div>
          <h2 className="text-[11.5px] font-semibold text-white/60 mb-3 tracking-[1px] uppercase">
            聯絡
          </h2>
          {contactLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[14px] text-white/50 mb-2 py-1.5 font-light hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ) : link.href ? (
              <a
                key={link.label}
                href={link.href}
                className="block text-[14px] text-white/50 mb-2 py-1.5 font-light hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <span
                key={link.label}
                className="block text-[14px] text-white/50 mb-2 py-1.5 font-light"
              >
                {link.label}
              </span>
            )
          )}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-7 pt-[18px] border-t border-white/5 text-[11.5px] text-center font-light text-white/40">
        © 2026 鹿飛 LUFÉ — 版權所有
      </div>
    </footer>
  );
}
