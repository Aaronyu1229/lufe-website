import Link from "next/link";
import { getSubsidyBySlug, isSubsidyActive } from "@/data/subsidies";
import { homeSubsidyAlertEn } from "@/i18n/en/home-subsidy-alert";
import { localizedHref, type Locale } from "@/i18n/locale";
import { homeSubsidyAlertZh } from "@/i18n/zh/home-subsidy-alert";

/**
 * SubsidyAlertBand — a limited-time government funding news flash.
 *
 * Why it exists:
 *   The current programme has a deadline; after it closes, the Buyer Direct programme is featured.
 *   This is a news event, not permanent information, so it uses an editorial, timestamped treatment
 *   rather than a marketing banner.
 *
 * Design principles:
 *   - No animated carousel or pop-up CTA
 *   - It looks like an editorial news flash
 *   - The primary CTA links to the active funding card for the details
 *   - Secondary CTA links to /assess for a 2-minute situation comparison.
 *
 * The band uses the data deadline at build time and shows the selected programme's verifiedOn date.
 * Update src/data/subsidies.ts when the programme changes.
 */
export function SubsidyAlertBand({ now = new Date(), locale = "zh" }: { readonly now?: Date; readonly locale?: Locale }) {
  const copy = locale === "en" ? homeSubsidyAlertEn : homeSubsidyAlertZh;
  const marketExpansion = getSubsidyBySlug("market-expansion")!;
  const ecommerce = getSubsidyBySlug("cross-border-ecommerce")!;
  const isMarketExpansionOpen = isSubsidyActive(marketExpansion, now);
  const subsidy = isMarketExpansionOpen ? marketExpansion : ecommerce;
  const alert = isMarketExpansionOpen ? copy.marketExpansion : copy.ecommerce;

  return (
    <section
      aria-label={copy.ariaLabel}
      className="bg-cream pb-[80px] md:pb-[104px]"
    >
      <div className="lufe-container">
        <div className="bg-navy px-7 py-9 text-white shadow-[0_30px_60px_-20px_rgba(16,27,48,0.35)] md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:px-14 md:py-11">
          <div className="min-w-0">
          <span className="inline-flex bg-gold/15 px-3 py-[5px] text-[12px] font-semibold tracking-[0.04em] text-gold">{alert.badge}</span>
          <h2 className="mt-3 font-sans text-[clamp(22px,2.6vw,30px)] font-semibold leading-[1.35] tracking-normal [text-wrap:balance]">
            {alert.title}
          </h2>
          <p className="mt-2 max-w-[620px] text-[15px] leading-[1.75] text-white/70">
            {alert.description}
          </p>
          <div className="mt-2 text-[12px] font-semibold tracking-[0.05em] text-gold/80">
            {copy.verifiedPrefix}{subsidy.verifiedOn}
          </div>
        </div>

          <div className="mt-6 flex shrink-0 flex-col gap-3 md:mt-0 md:items-end">
            <Link
              href={localizedHref(locale, `/resources/subsidies#${subsidy.slug}`)}
              className="inline-flex items-center gap-2 bg-gold px-[26px] py-[14px] text-[16px] font-semibold text-navy"
            >
              <span>{copy.primaryCta}</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={localizedHref(locale, "/assess")}
              className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-gold"
            >
              {copy.secondaryCta}
              <span
                aria-hidden="true"
                className="h-[7px] w-[7px] shrink-0 rotate-[-45deg] border-b border-r border-current"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
