import Link from "next/link";
import Image from "next/image";

const serviceLinks = [
  { label: "四章總覽", href: "/services" },
  { label: "品測", href: "/services/product-testing" },
  { label: "寄賣", href: "/services/consignment" },
  { label: "公司落地", href: "/services/localization" },
  { label: "海外客服", href: "/services/call-center" },
  { label: "北美通路", href: "/services/north-america" },
  { label: "運營優化", href: "/services/optimize" },
  { label: "鹿飛方法論", href: "/services/methodology" },
];

const resourceLinks = [
  { label: "2 分鐘處境比對", href: "/assess" },
  { label: "政府補助整理", href: "/resources/subsidies" },
  { label: "全部資源", href: "/resources" },
  { label: "TradePilot 工具 ↗", href: "https://tradepiloter.com", external: true },
  { label: "躍馬企業官網 ↗", href: "https://jumping.group", external: true },
];

const insightLinks = [
  { label: "案例", href: "/cases" },
  { label: "洞察與指南", href: "/insights" },
  { label: "現場紀錄", href: "/field-notes" },
];

const contactLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "aaron.yu@reborn.in", href: "mailto:aaron.yu@reborn.in" },
  { label: "合作夥伴聯繫", href: "/contact#partners" },
  { label: "台北市", href: "" },
];

export function Footer() {
  return (
    <footer className="bg-[#0B1322] text-white/60 pt-[72px] pb-[120px] px-5 md:px-10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)] gap-x-9 gap-y-9">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/logo/logo-mark-white.png"
              alt="鹿飛 LUFÉ"
              width={26}
              height={26}
            />
            <span className="font-sans font-semibold text-[17px] text-white">
              鹿飛 LUF<span className="text-gold">É</span>
            </span>
          </Link>
          <p className="text-[14px] max-w-[260px] leading-[1.8] font-normal mt-[14px] text-white/60">
            貨到了之後，我們接著走。品測、寄賣、公司落地、海外客服，陪台灣品牌走完在菲律賓的第一年。底下是躍馬企業 42 年的國際物流。
          </p>
        </div>

        <div>
          <h2 className="text-[14px] font-semibold text-white mb-[14px]">
            服務
          </h2>
          <div className="grid gap-[10px]">
            {serviceLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[14px] text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[14px] font-semibold text-white mb-[14px]">
            案例與洞察
          </h2>
          <div className="grid gap-[10px]">
            {insightLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[14px] text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[14px] font-semibold text-white mb-[14px]">
            資源
          </h2>
          <div className="grid gap-[10px]">
            {resourceLinks.map((link) =>
              link.external ? (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-[14px] text-white/60 hover:text-white transition-colors">
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} href={link.href} className="text-[14px] text-white/60 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>

        <div>
          <h2 className="text-[14px] font-semibold text-white mb-[14px]">
            聯絡
          </h2>
          <div className="grid gap-[10px]">
            <Link href="/about" className="text-[14px] text-white/60 hover:text-white transition-colors">關於我們</Link>
            <Link href="/contact" className="text-[14px] text-white/60 hover:text-white transition-colors">聯絡我們</Link>
            {contactLinks.map((link) =>
              link.href ? (
                <a key={link.label} href={link.href} className="text-[14px] text-white/60 hover:text-white transition-colors">
                  {link.label}
                </a>
              ) : (
                <span key={link.label} className="text-[14px] text-white/60">{link.label}</span>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-14 pt-6 border-t border-white/10 text-[13px] font-normal text-white/60">
        © 2026 鹿飛 LUFÉ — 版權所有
      </div>
    </footer>
  );
}
