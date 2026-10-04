import Image from "next/image";
import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ScrollCue } from "@/components/ScrollCue";
import { Tilt } from "@/components/Tilt";
import { FaqSection } from "@/components/faq/FaqSection";
import {
  BadgeCheckIcon,
  ChartColumnIcon,
  CheckIcon,
  FileIcon,
  HandshakeIcon,
  InboxIcon,
  ListChecksIcon,
  PackageIcon,
  PenIcon,
  PresentationIcon,
  SearchIcon,
  StoreIcon,
  UsersIcon,
} from "@/components/icons/LineIcons";
import { TieredImage } from "@/components/TieredImage";
import { HERO_VIDEOS } from "@/data/heroVideos";
import type { Chapter, ChapterSection, PhilippinesChapterKey, StepIcon } from "@/data/chapters";
import { chapterPageEn } from "@/i18n/en/chapter-page";
import { type Locale, localizedHref } from "@/i18n/locale";
import { chapterPageZh } from "@/i18n/zh/chapter-page";

import { ChapterBar } from "./ChapterBar";
import { ContactButton } from "./ContactButton";
import { NextChapter } from "./NextChapter";
import { RelatedReading } from "./RelatedReading";
import { WaitlistForm } from "./WaitlistForm";

function ChatAction({ children, className }: { readonly children: string; readonly className: string }) {
  return <ContactButton className={className}>{children}</ContactButton>;
}

const CHAPTER_HERO_IMAGES = {
  m1: { src: "/images/v5/product-testing-1600.webp", srcSet: "/images/v5/product-testing-1600.webp 1600w, /images/v5/product-testing-2400.webp 2400w", position: "center 35%" },
  m3: { src: "/images/v5/consignment-1600.webp", srcSet: "/images/v5/consignment-1600.webp 1600w, /images/v5/consignment-2400.webp 2400w" },
  m9: { src: "/images/v5/localization-1600.webp", srcSet: "/images/v5/localization-1600.webp 1600w, /images/v5/localization-2400.webp 2400w", position: "center 40%" },
  after: { src: "/images/v5/call-center-1600.webp", srcSet: "/images/v5/call-center-1600.webp 1600w, /images/v5/call-center-2400.webp 2400w", position: "right center", night: true },
  na: { src: "/images/v5/north-america-1600.webp", srcSet: "/images/v5/north-america-1600.webp 1600w, /images/v5/north-america-2400.webp 2400w" },
} as const;

const STEP_ICONS = {
  package: PackageIcon,
  users: UsersIcon,
  pen: PenIcon,
  file: FileIcon,
  inbox: InboxIcon,
  "badge-check": BadgeCheckIcon,
  "list-checks": ListChecksIcon,
  "chart-column": ChartColumnIcon,
  search: SearchIcon,
  presentation: PresentationIcon,
  handshake: HandshakeIcon,
  store: StoreIcon,
} satisfies Record<StepIcon, typeof PackageIcon>;

function ChapterHero({ chapter, locale }: { readonly chapter: Chapter; readonly locale: Locale }) {
  const actionClass = "inline-flex cursor-pointer items-center justify-center bg-gold px-6 py-3.5 text-[15px] font-semibold text-navy active:scale-[.97] [@media(hover:hover)]:hover:bg-gold-l";
  const image = CHAPTER_HERO_IMAGES[chapter.key];
  const copy = locale === "en" ? chapterPageEn : chapterPageZh;

  return (
    <>
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop {...image} video={HERO_VIDEOS[`chapter:${chapter.key}`]} />
        <div className="lufe-container lufe-hero-content min-w-0 pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <div className="min-w-0 max-w-[760px]">
            <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60">
              <Link href={localizedHref(locale, "/")} className="[@media(hover:hover)]:hover:text-white">{copy.home}</Link>
              <span className="text-white/30">/</span>
              <Link href={localizedHref(locale, "/services")} className="[@media(hover:hover)]:hover:text-white">{copy.services}</Link>
              <span className="text-white/30">/</span>
              <span className="text-white/75">{chapter.label}</span>
            </nav>
            {chapter.key === "after" ? <p className="mb-4 inline-block border border-gold bg-gold px-2.5 py-1 text-[12px] font-semibold text-navy">{copy.afterHeroNotice}</p> : null}
            <h1 className="h1 mb-6 max-w-[650px] text-white">{chapter.title}</h1>
            <p className="lead max-w-[620px] whitespace-pre-line !text-white/75">{chapter.scene}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {chapter.key === "after" ? <Link href="#waitlist" className={actionClass}>{chapter.heroAction}</Link> : <ChatAction className={actionClass}>{chapter.heroAction}</ChatAction>}
              {chapter.key === "m1" ? <Link href={localizedHref(locale, "/assess")} className="inline-flex items-center justify-center border border-white/40 px-6 py-3.5 text-[15px] font-medium text-white active:scale-[.97] [@media(hover:hover)]:hover:border-white">{copy.assessAction}</Link> : null}
            </div>
          </div>
        </div>
        <ScrollCue label={copy.scrollCueLabel} />
      </section>
      {!chapter.showChapterBar ? <div className="border-b border-bd bg-cream py-4 text-[14px] leading-[1.8] text-tx2"><p className="lufe-container"><strong className="text-tx">{copy.northAmericaBand.title}</strong>{copy.northAmericaBand.body}</p></div> : null}
    </>
  );
}

function Scenarios({ chapter, locale }: { readonly chapter: Chapter; readonly locale: Locale }) {
  const copy = locale === "en" ? chapterPageEn : chapterPageZh;
  return (
    <section className="bg-white py-[72px] md:py-[88px]">
      <div className="lufe-container">
        <h2 className="h2 text-tx">{chapter.scenariosHeading}</h2>
        <div className="mt-16 space-y-16 md:mt-20 md:space-y-24">
          {chapter.scenarios.map((scenario, index) => (
            <div key={scenario.title} className="grid min-w-0 grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-16">
              <figure className={`aspect-[4/3] overflow-hidden md:col-span-6 ${index === 1 ? "md:order-2" : ""}`}>
                <TieredImage src={scenario.image} alt={scenario.imageAlt} sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover" />
              </figure>
              <div className={`min-w-0 max-w-[520px] md:col-span-6 ${index === 1 ? "md:order-1" : ""}`}>
                <h3 className="h3 text-tx">{scenario.title}</h3>
                <p className="mt-4 text-[16px] leading-[1.85] text-tx2">{scenario.body}</p>
                <div className="mt-6 border-l-2 border-gold pl-4">
                  <Image src="/images/logo/logo-mark-navy.png" alt={chapter.scenarioAnswerLabel ?? copy.scenarioAnswerFallback} width={24} height={24} />
                  <p className="mt-2 text-[15.5px] leading-[1.8] text-tx">{scenario.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChapterSectionContent({ section, locale }: { readonly section: ChapterSection; readonly locale: Locale }) {
  const copy = locale === "en" ? chapterPageEn : chapterPageZh;
  switch (section.type) {
    case "steps": {
      return <section className="bg-cream py-[72px] md:py-[88px]"><div className="lufe-container"><h2 className="h2 mb-8 text-tx">{section.heading}</h2><div data-lufe-steps className="lufe-steps grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">{section.items.map((item) => { const StepIcon = STEP_ICONS[item.icon]; return <article key={item.number} data-lufe-step className="lufe-card lufe-step border border-bd bg-white p-5 md:p-6"><div className="flex items-center gap-3"><span className="lufe-step-icon border border-gold/40 text-gold-d"><StepIcon size={22} /></span><span className="text-[13px] font-semibold text-gold-d">{item.number}</span></div><h3 className="h3 mt-5 text-tx">{item.title}</h3><p className="mt-3 whitespace-pre-line text-[15px] leading-[1.8] text-tx2">{item.body}</p></article>; })}</div></div></section>;
    }
    case "report":
      return <section className="bg-white py-[72px] md:py-[88px]"><div className="lufe-container grid min-w-0 grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12"><Tilt aria-hidden="true" className="lufe-report-paper border border-bd bg-cream p-5 text-tx2 md:order-2"><p className="border-b border-bd pb-3 text-[12px] font-semibold">{copy.reportPreview.title}</p>{copy.reportPreview.questions.map((label) => <div key={label} className="border-b border-bd py-4"><p className="text-[13px] font-semibold">{label}</p><div className="mt-2 h-2 w-4/5 bg-sky/30" /><div className="mt-2 h-2 w-3/5 bg-gold/30" /></div>)}</Tilt><div className="md:order-1"><h2 className="h2 text-tx">{section.heading}</h2><ul className="mt-6 grid gap-3">{section.items.map((item) => <li key={item} className="border-l-4 border-gold bg-cream px-4 py-3 text-[15px] leading-[1.7] text-tx2">{item}</li>)}</ul><p className="mt-6 text-[16px] leading-[1.8] text-tx">{section.ending}</p></div></div></section>;
    case "price":
      return <section data-lufe-price className="bg-cream py-[72px] md:py-[88px]"><div className="lufe-container grid min-w-0 gap-10 border-t border-bd pt-10 lg:grid-cols-12"><div className="lg:col-span-5"><h2 className={/\d/.test(section.title) ? "num text-[clamp(44px,6vw,72px)] leading-[1.1] text-navy" : "text-[clamp(30px,3.6vw,44px)] font-[650] leading-[1.2] tracking-[-.02em] text-tx"}>{section.title}</h2>{section.caption ? <p className="mt-3 whitespace-pre-line text-[15px] leading-[1.7] text-tx2">{section.caption}</p> : null}</div><div className="lg:col-span-7">{section.breakdown ? <div>{section.breakdown.rows.map((row) => <div key={row.item} className="grid gap-2 border-t border-bd py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-4"><p className="text-[16px] font-[650] text-tx">{row.item}</p><p className="text-[14px] leading-[1.7] text-tx2 sm:text-right">{row.note}</p></div>)}</div> : null}{section.details.map((detail) => <div key={detail} className="flex gap-3 border-t border-bd py-4"><CheckIcon size={18} className="mt-1 shrink-0 text-gold-d" /><p className="whitespace-pre-line text-[15px] leading-[1.8] text-tx2">{detail}</p></div>)}{section.paths ? <div className="mt-6 grid gap-4 md:grid-cols-2">{section.paths.map((path) => <article key={path.label} className={`lufe-price-path p-6 text-[14.5px] leading-[1.75] ${path.dark ? "bg-navy text-white" : "border border-bd bg-white text-tx2"}`}><strong className={path.dark ? "text-gold" : "text-tx"}>{path.label}</strong><p className="mt-3">{path.body}</p><span className={`lufe-price-route mt-5 block text-[13px] font-semibold ${path.dark ? "text-gold" : "text-gold-d"}`}>{path.dark ? copy.pricePaths.dark : copy.pricePaths.light}</span></article>)}</div> : null}</div></div></section>;
    case "tracks":
      return <section className="bg-cream py-[72px] md:py-[88px]"><div className="lufe-container"><h2 className="h2 mb-8 text-tx">{section.heading}</h2><div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]"><article className="border border-bd bg-white p-6"><h3 className="h3 text-tx">{section.passiveLabel ?? copy.trackDefaults.passive}</h3><p className="mt-4 whitespace-pre-line text-[15px] leading-[1.8] text-tx2">{section.passive}</p></article><article className="border border-sky/40 bg-white p-6"><h3 className="h3 text-tx">{section.activeLabel ?? copy.trackDefaults.active}</h3><div data-lufe-track-rows className="mt-5 divide-y divide-bd">{section.active.map((item, index) => <div key={item.label} data-lufe-track-row={index === section.active.length - 1 ? "last" : ""} data-lufe-track-last={index === section.active.length - 1 ? "" : undefined} className="lufe-track-row grid gap-2 py-4 md:grid-cols-[110px_1fr]"><strong className="text-[14px] text-sky">{item.label}</strong><p className="whitespace-pre-line text-[15px] leading-[1.75] text-tx2">{item.body}</p></div>)}</div></article></div>{section.ending ? <p className="mt-7 whitespace-pre-line border-l-4 border-sky bg-white px-5 py-4 text-[16px] leading-[1.8] text-tx">{section.ending}</p> : null}</div></section>;
    case "cards":
      return <section className="bg-white py-[72px] md:py-[88px]"><div className="lufe-container"><h2 className="h2 mb-8 text-tx">{section.heading}</h2><div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-3">{section.items.map((item) => <article key={item.title} className="lufe-card border border-bd bg-cream p-5"><h3 className="h3 text-tx">{item.title}</h3><p className="mt-3 whitespace-pre-line text-[15px] leading-[1.8] text-tx2">{item.body}</p>{item.fit ? <p className="mt-4 border-t border-bd pt-4 text-[14px] font-medium leading-[1.7] text-tx">{item.fit}</p> : null}</article>)}</div>{section.ending ? <p className="mt-7 whitespace-pre-line border-l-4 border-sky bg-cream px-5 py-4 text-[16px] leading-[1.8] text-tx">{section.ending}</p> : null}</div></section>;
    case "included":
      return <section className="bg-white py-[72px] md:py-[88px]"><div className="lufe-container"><h2 className="h2 mb-8 text-tx">{section.heading}</h2><div className={`grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ${section.featureNote ? "lg:grid-rows-2" : ""}`}>{section.items.map((item, index) => { const StepIcon = STEP_ICONS[item.icon]; const featured = index === 0 && Boolean(section.featureNote); return <article key={item.title} className={featured ? "flex flex-col bg-navy p-8 text-white md:col-span-2 lg:col-span-1 lg:row-span-2" : "border border-bd bg-cream p-6 transition-transform [@media(hover:hover)]:hover:-translate-y-[3px] motion-reduce:transition-none motion-reduce:hover:translate-y-0"}><div className={featured ? "flex flex-1 flex-col" : ""}><div className={featured ? "" : "flex items-center justify-between gap-3"}><span className={`grid h-10 w-10 place-items-center border ${featured ? "border-gold/40 text-gold" : "border-gold/40 text-gold-d"}`}><StepIcon size={20} /></span></div><h3 className={featured ? "mt-3 text-[clamp(26px,3vw,34px)] font-[650] leading-[1.2] tracking-[-.02em] text-white" : "h3 mt-5 text-tx"}>{item.title}</h3><p className={`mt-3 whitespace-pre-line ${featured ? "text-[16px] leading-[1.85] text-white/75" : "text-[15px] leading-[1.8] text-tx2"}`}>{item.body}</p>{featured ? <p className="mt-auto pt-8 text-[13px] font-semibold text-gold">{section.featureNote}</p> : null}</div></article>; })}</div>{section.footnote ? <p className="mt-5 text-[14px] leading-[1.7] text-tx3">{section.footnote}</p> : null}</div></section>;
    case "table":
      return <section className="bg-cream py-[72px] md:py-[88px]"><div className="lufe-container"><h2 className="h2 mb-8 text-tx">{section.heading}</h2><div className="overflow-x-auto border border-bd"><table className="lufe-local-table min-w-[640px] w-full border-collapse bg-white text-left"><thead className="border-b border-bd bg-navy text-white"><tr><th className="p-4 text-[14px]">{copy.table.task}</th><th className="p-4 text-[14px]">{copy.table.owner}</th></tr></thead><tbody>{section.rows.map((row) => <tr key={row.task} className={`border-b border-bd last:border-0 ${row.isYou ? "bg-gold/15" : ""}`}><td className="p-4 text-[15px] font-medium text-tx">{row.task}</td><td className="lufe-local-owner p-4 text-[15px] leading-[1.75] text-tx2">{row.owner}</td></tr>)}</tbody></table></div></div></section>;
    case "dark-copy":
      return <section className="bg-navy py-[72px] text-white md:py-[88px]"><div className="lufe-container"><h2 className="h2 text-white">{section.heading}</h2><div className="mt-6 grid gap-4">{section.paragraphs.map((paragraph) => <p key={paragraph} className="text-[16px] leading-[1.9] text-white/75">{paragraph}</p>)}</div></div></section>;
    case "callout":
      return <section className="bg-white py-[72px] md:py-[88px]"><div className="lufe-container"><h2 className="h2 mb-7 text-tx">{section.heading}</h2><p className="whitespace-pre-line border-l-4 border-sky bg-cream px-5 py-5 text-[17px] leading-[1.85] text-tx">{section.body}</p></div></section>;
    case "two-cards":
      return <section className="bg-white py-[72px] md:py-[88px]"><div className="lufe-container"><h2 className="h2 mb-8 text-tx">{section.heading}</h2><div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">{section.items.map((item) => <article key={item.title} className="border-l-4 border-sky bg-cream p-6"><h3 className="h3 text-tx">{item.title}</h3><p className="mt-3 text-[16px] leading-[1.8] text-tx2">{item.body}</p></article>)}</div></div></section>;
    case "fit":
      return <section className="bg-white py-[72px] md:py-[88px]"><div className="lufe-container grid min-w-0 grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16"><div className="min-w-0 md:col-span-7"><h2 className="h2 text-tx">{section.heading}</h2><p className="lead mt-5">{section.lead}</p><ul className="mt-8 grid gap-5">{section.items.map((item) => <li key={item.label} className="border-t border-bd pt-5"><div className="flex gap-3"><CheckIcon size={20} className="mt-0.5 shrink-0 text-gold-d" /><div><p className="text-[16px] font-[650] text-tx">{item.label}</p><p className="mt-2 text-[15.5px] leading-[1.8] text-tx2">{item.body}</p></div></div></li>)}</ul></div><figure className="aspect-[16/9] overflow-hidden md:col-span-5 md:aspect-[4/5]"><TieredImage src={section.image} alt={section.imageAlt} sizes="(min-width: 768px) 40vw, 100vw" className="h-full w-full object-cover" /></figure></div></section>;
    case "waitlist":
      return <section id="waitlist" className="scroll-mt-[100px] bg-cream py-[72px] md:py-[88px]"><div className="lufe-container grid min-w-0 grid-cols-1 gap-8 border border-bd bg-white p-6 md:grid-cols-2 md:p-9"><div><p className="inline-block bg-gold px-2.5 py-1 text-[12px] font-semibold text-navy">{copy.waitlist.status}</p><h2 className="h2 mt-4 text-tx">{copy.waitlist.title}</h2><p className="mt-4 text-[16px] leading-[1.8] text-tx2">{copy.waitlist.body}</p></div><WaitlistForm locale={locale} /></div></section>;
  }
}

export async function ChapterPage({ chapter, locale = "zh" }: { readonly chapter: Chapter; readonly locale?: Locale }) {
  const copy = locale === "en" ? chapterPageEn : chapterPageZh;
  const relatedReading = await RelatedReading({ chapter: chapter.key, locale });

  return (
    <>
      <ChapterHero chapter={chapter} locale={locale} />
      {chapter.showChapterBar ? <ChapterBar current={chapter.key as PhilippinesChapterKey} locale={locale} /> : null}
      <Scenarios chapter={chapter} locale={locale} />
      {chapter.sections.map((section, index) => <ChapterSectionContent key={`${section.type}-${index}`} section={section} locale={locale} />)}
      {chapter.faqs.length > 0 ? <FaqSection title={copy.faq.title} askLabel={copy.faq.ask} moreLabel={copy.faq.more} idPrefix={`${chapter.key}-faq`} items={chapter.faqs.map((faq, index) => ({ num: String(index + 1).padStart(2, "0"), question: faq.question, answer: faq.answer, takeaway: faq.takeaway }))} className="bg-white py-[72px] md:py-[96px]" /> : null}
      {relatedReading}
      <NextChapter chapter={chapter} locale={locale} />
      <section className="bg-navy py-[78px] text-white md:py-[96px]"><div className="lufe-container"><div className="mx-auto max-w-[720px] text-center"><h2 className="h2 text-white">{chapter.cta.title}</h2><p className="mt-4 whitespace-pre-line text-[16px] leading-[1.85] text-white/70">{chapter.cta.body}</p>{chapter.cta.notes ? <p className="mt-5 whitespace-pre-line text-[14px] leading-[1.8] text-white/60">{chapter.cta.notes}</p> : null}<div className="mt-8">{chapter.cta.href ? <Link href={localizedHref(locale, chapter.cta.href)} className="inline-flex items-center justify-center bg-gold px-7 py-3.5 text-[16px] font-semibold text-navy active:scale-[.97] [@media(hover:hover)]:hover:bg-gold-l">{chapter.cta.action}</Link> : <ChatAction className="bg-gold px-7 py-3.5 text-[16px] font-semibold text-navy active:scale-[.97] [@media(hover:hover)]:hover:bg-gold-l">{chapter.cta.action}</ChatAction>}</div>{chapter.cta.link ? <p className="mt-5"><Link href={localizedHref(locale, chapter.cta.link.href)} className="text-[15px] font-medium text-gold [@media(hover:hover)]:hover:text-gold-l">{chapter.cta.link.label}</Link></p> : null}{chapter.cta.footnote ? <p className="mt-6 text-[13px] text-white/50">{chapter.cta.footnote}</p> : null}</div></div></section>
      {chapter.partnerStrip ? <PartnerStrip strip={chapter.partnerStrip} locale={locale} /> : null}
    </>
  );
}

/** Secondary audience band: a quiet card, question as the headline, one clear action. */
function PartnerStrip({ strip, locale }: { readonly strip: NonNullable<Chapter["partnerStrip"]>; readonly locale: Locale }) {
  const [question, ...rest] = strip.body.split("\n");
  return <section className="bg-white py-[56px] md:py-[72px]"><div className="lufe-container">
    <Link href={localizedHref(locale, strip.href)} className="group grid gap-6 bg-cream p-7 transition-colors md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-12 md:p-12 [@media(hover:hover)]:hover:bg-[#efe9dc]">
      <div className="min-w-0">
        <h2 className="text-[clamp(22px,2.4vw,28px)] font-[650] leading-[1.35] tracking-[-.01em] text-tx">{question}</h2>
        {rest.length ? <p className="mt-3 max-w-[640px] text-[16px] leading-[1.8] text-tx2">{rest.join("\n")}</p> : null}
      </div>
      <span className="inline-flex w-fit items-center gap-2 whitespace-nowrap border border-navy/20 bg-white px-6 py-3.5 text-[15px] font-semibold text-navy transition-[border-color,transform] duration-100 group-active:scale-[.97] [@media(hover:hover)]:group-hover:border-navy/50">{strip.action}</span>
    </Link>
  </div></section>;
}
