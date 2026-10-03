import Link from "next/link";
import Image from "next/image";

import { footerEn } from "@/i18n/en/footer";
import { footerZh } from "@/i18n/zh/footer";
import { localizedHref, type Locale } from "@/i18n/locale";

const serviceHrefs = [
  "/services",
  "/services/product-testing",
  "/services/consignment",
  "/services/localization",
  "/services/call-center",
  "/services/north-america",
  "/services/optimize",
  "/services/methodology",
] as const;

const partnerLinks = [
  { href: "https://tradepiloter.com", logo: "/images/logo/partners/tradepilot-white.png", width: 22 },
  { href: "https://jumping.group", logo: "/images/logo/partners/jumping-white.png", width: 17 },
];

const insightHrefs = ["/cases", "/insights"] as const;

const resourceHrefs = ["/assess", "/resources/subsidies", "/resources"] as const;
const contactHrefs = ["/contact"] as const;

type FooterProps = {
  readonly locale?: Locale;
};

export function Footer({ locale = "zh" }: FooterProps) {
  const copy = locale === "en" ? footerEn : footerZh;
  const href = (path: string) => localizedHref(locale, path);

  return (
    <footer className="bg-navy pb-[120px] pt-[72px] text-white/70">
      <div className="lufe-container grid grid-cols-2 gap-x-9 gap-y-9 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="col-span-2 md:col-span-1">
          <Link href={href("/")} className="flex items-center gap-2.5">
            <Image
              src="/images/logo/logo-mark-white.png"
              alt=""
              width={26}
              height={26}
            />
            <span className="font-sans font-semibold text-[17px] text-white">
              {copy.brandPrefix}<span className="text-gold">É</span>
            </span>
          </Link>
          <p className="text-[14px] max-w-[260px] leading-[1.8] font-normal mt-[14px] text-white/70">
            {copy.description}
          </p>
        </div>

        <div>
          <h2 className="text-[14px] font-semibold text-white mb-[14px]">
            {copy.servicesHeading}
          </h2>
          <div className="grid gap-[10px]">
            {serviceHrefs.map((path, index) => (
              <Link
                key={path}
                href={href(path)}
                className="text-[14px] text-white/70 hover:text-white transition-colors"
              >
                {copy.serviceLinks[index]}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[14px] font-semibold text-white mb-[14px]">
            {copy.casesAndInsightsHeading}
          </h2>
          <div className="grid gap-[10px]">
            {insightHrefs.map((path, index) => (
              <Link
                key={path}
                href={href(path)}
                className="text-[14px] text-white/70 hover:text-white transition-colors"
              >
                {copy.insightLinks[index]}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[14px] font-semibold text-white mb-[14px]">
            {copy.resourcesHeading}
          </h2>
          <div className="grid gap-[10px]">
            {resourceHrefs.map((path, index) => (
              <Link key={path} href={href(path)} className="text-[14px] text-white/70 hover:text-white transition-colors">
                {copy.resourceLinks[index]}
              </Link>
            ))}
          </div>
          <div className="mt-[18px] grid gap-[12px] border-t border-white/10 pt-[14px]">
            <p className="text-[12px] text-white/45">{copy.relatedBusinessesHeading}</p>
            {partnerLinks.map((partner, index) => (
              <a key={partner.href} href={partner.href} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-2.5">
                <span className="grid h-[22px] w-[22px] shrink-0 place-items-center opacity-75 transition-opacity group-hover:opacity-100">
                  <Image src={partner.logo} alt="" width={partner.width} height={22} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] text-white/85 transition-colors group-hover:text-white">
                    {copy.partners[index].name}<span aria-hidden="true" className="ml-1 text-[12px] opacity-60">↗</span>
                  </span>
                  <span className="mt-0.5 block text-[12.5px] text-white/45">{copy.partners[index].note}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[14px] font-semibold text-white mb-[14px]">
            {copy.contactHeading}
          </h2>
          <div className="grid gap-[10px]">
            <Link href={href("/about")} className="text-[14px] text-white/70 hover:text-white transition-colors">{copy.about}</Link>
            <Link href={href("/contact")} className="text-[14px] text-white/70 hover:text-white transition-colors">{copy.contact}</Link>
            {contactHrefs.map((path, index) => <a key={path} href={href(path)} className="text-[14px] text-white/70 hover:text-white transition-colors">{copy.contactLinks[index]}</a>)}
          </div>
        </div>
      </div>

      <div className="lufe-container mt-14 border-t border-white/10 pt-6 text-[13px] font-normal text-white/70">
        {copy.copyright}
      </div>
    </footer>
  );
}
