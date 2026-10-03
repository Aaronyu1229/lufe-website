import Link from "next/link";
import Image from "next/image";

const serviceLinks = [
  { label: "四章總覽", href: "/services" },
  { label: "市場探查", href: "/services/product-testing" },
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
];

const partnerLinks = [
  { name: "TradePilot", note: "線上報關工具", href: "https://tradepiloter.com", logo: "/images/logo/partners/tradepilot-white.png", width: 22 },
  { name: "躍馬企業", note: "國際物流・官網", href: "https://jumping.group", logo: "/images/logo/partners/jumping-white.png", width: 17 },
];

const insightLinks = [
  { label: "案例", href: "/cases" },
  { label: "洞察與指南", href: "/insights" },
];

const contactLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "合作夥伴聯繫", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-navy pb-[120px] pt-[72px] text-white/70">
      <div className="lufe-container grid grid-cols-2 gap-x-9 gap-y-9 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/logo/logo-mark-white.png"
              alt=""
              width={26}
              height={26}
            />
            <span className="font-sans font-semibold text-[17px] text-white">
              鹿飛 LUF<span className="text-gold">É</span>
            </span>
          </Link>
          <p className="text-[14px] max-w-[260px] leading-[1.8] font-normal mt-[14px] text-white/70">
            協助台灣企業在北美與東南亞落地：市場探查、寄賣、公司落地到海外客服，一個窗口走完出海第一年。以躍馬企業 43 年國際物流為後盾
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
                className="text-[14px] text-white/70 hover:text-white transition-colors"
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
                className="text-[14px] text-white/70 hover:text-white transition-colors"
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
            {resourceLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-[14px] text-white/70 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-[18px] grid gap-[12px] border-t border-white/10 pt-[14px]">
            <p className="text-[12px] text-white/45">相關企業</p>
            {partnerLinks.map((partner) => (
              <a key={partner.name} href={partner.href} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-2.5">
                <span className="grid h-[22px] w-[22px] shrink-0 place-items-center opacity-75 transition-opacity group-hover:opacity-100">
                  <Image src={partner.logo} alt="" width={partner.width} height={22} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] text-white/85 transition-colors group-hover:text-white">
                    {partner.name}<span aria-hidden="true" className="ml-1 text-[12px] opacity-60">↗</span>
                  </span>
                  <span className="mt-0.5 block text-[12.5px] text-white/45">{partner.note}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[14px] font-semibold text-white mb-[14px]">
            聯絡
          </h2>
          <div className="grid gap-[10px]">
            <Link href="/about" className="text-[14px] text-white/70 hover:text-white transition-colors">關於我們</Link>
            <Link href="/contact" className="text-[14px] text-white/70 hover:text-white transition-colors">聯絡我們</Link>
            {contactLinks.map((link) =>
              link.href ? (
                <a key={link.label} href={link.href} className="text-[14px] text-white/70 hover:text-white transition-colors">
                  {link.label}
                </a>
              ) : (
                <span key={link.label} className="text-[14px] text-white/70">{link.label}</span>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="lufe-container mt-14 border-t border-white/10 pt-6 text-[13px] font-normal text-white/70">
        © 2026 鹿飛 LUFÉ — 版權所有
      </div>
    </footer>
  );
}
