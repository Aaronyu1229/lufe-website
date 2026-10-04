import { homeOpeningEn } from "@/i18n/en/home-opening";
import { type Locale } from "@/i18n/locale";
import { homeOpeningZh } from "@/i18n/zh/home-opening";

export function OpeningSection({ locale = "zh" }: { readonly locale?: Locale }) {
  const copy = locale === "en" ? homeOpeningEn : homeOpeningZh;

  return (
    <section className="py-[80px] md:py-[104px]">
      <div className="lufe-container grid gap-8 md:grid-cols-[.9fr_1.1fr] md:gap-16">
        <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-tx [text-wrap:balance]">
          {copy.heading[0]}
          <br />
          <span className="text-gold-d">{copy.heading[1]}</span>
        </h2>
        <div className="max-w-[620px] text-[16px] leading-[1.9] text-tx2 md:text-[17px]">
          <p className="whitespace-pre-line">{copy.body}</p>
          <p className="mt-6 whitespace-pre-line font-semibold text-tx">{copy.emphasis}</p>
        </div>
      </div>
    </section>
  );
}
