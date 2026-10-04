"use client";

import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import type { AboutPhotoSources } from "@/data/aboutPhotoSlots";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { aboutPageEn } from "@/i18n/en/about-page";
import { localizedHref, type Locale } from "@/i18n/locale";
import { aboutPageZh, type AboutPageCopy } from "@/i18n/zh/about-page";

import { useMessageBox } from "../MessageBox";
import { StoryChapters, type StoryChapter } from "../story/StoryChapters";
import { FreightRateChart } from "./FreightRateChart";
import { NetworkGlobe } from "./NetworkGlobe";
import { PhotoSlot } from "./PhotoSlot";

const networkCards = [
  {
    id: "northAmerica",
    className: "text-gold-d",
    icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="4" y="8" width="24" height="16" stroke="currentColor" strokeWidth="1.5" /><path d="M4 13H28" stroke="currentColor" strokeWidth="1.5" /><circle cx="8" cy="20" r="1.5" stroke="currentColor" strokeWidth="1" /><rect x="18" y="18" width="6" height="3" stroke="currentColor" strokeWidth="1" /></svg>,
  },
  {
    id: "southeastAsia",
    className: "text-sky",
    icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" /><path d="M8 26C8 21.5817 11.5817 18 16 18C20.4183 18 24 21.5817 24 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="24" cy="10" r="2.5" stroke="currentColor" strokeWidth="1" /><circle cx="8" cy="10" r="2.5" stroke="currentColor" strokeWidth="1" /></svg>,
  },
  {
    id: "globalLogistics",
    className: "text-gold-d",
    icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="6" y="14" width="10" height="12" stroke="currentColor" strokeWidth="1.5" /><rect x="16" y="8" width="10" height="18" stroke="currentColor" strokeWidth="1.5" /><path d="M9 18H13M9 21H13M19 12H23M19 15H23M19 18H23" stroke="currentColor" strokeWidth="1" strokeLinecap="round" /></svg>,
  },
  {
    id: "technology",
    className: "text-ember",
    icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="6" y="6" width="20" height="20" stroke="currentColor" strokeWidth="1.5" /><path d="M12 16L15 19L21 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
] as const;

const teamRoles = [
  {
    id: "taiwan",
    photoSlot: "PHOTO-SLOT-05A",
    icon: <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" /><path d="M7 26C7 21.0294 11.0294 17 16 17C20.9706 17 25 21.0294 25 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="25" cy="9" r="2" stroke="currentColor" strokeWidth="1.2" /><circle cx="7" cy="9" r="2" stroke="currentColor" strokeWidth="1.2" /></svg>,
  },
  {
    id: "philippines",
    photoSlot: "PHOTO-SLOT-05B",
    icon: <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5" /><path d="M5 16H27M16 5C19 8 19 24 16 27M16 5C13 8 13 24 16 27" stroke="currentColor" strokeWidth="1.2" /><circle cx="22" cy="11" r="1.5" stroke="currentColor" strokeWidth="1" /></svg>,
  },
  {
    id: "northAmerica",
    photoSlot: "PHOTO-SLOT-05C",
    icon: <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect x="4" y="10" width="24" height="14" stroke="currentColor" strokeWidth="1.5" /><path d="M4 15H28M10 6L10 10M22 6L22 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><rect x="18" y="18" width="6" height="3" stroke="currentColor" strokeWidth="1" /></svg>,
  },
] as const;

function makeStoryChapters(copy: AboutPageCopy): readonly StoryChapter[] {
  return copy.storyChapters.map(({ chartAfterParagraph, ...chapter }) => ({
    ...chapter,
    ...(chartAfterParagraph === undefined ? {} : { insert: { afterParagraph: chartAfterParagraph, content: <FreightRateChart copy={copy.freightRateChart} /> } }),
  }));
}

export const storyChapters = makeStoryChapters(aboutPageZh);

export function AboutPage({ photoSources = {}, locale = "zh" }: { readonly photoSources?: AboutPhotoSources; readonly locale?: Locale }) {
  const { open } = useMessageBox();
  const copy = locale === "en" ? aboutPageEn : aboutPageZh;
  const chapters = locale === "zh" ? storyChapters : makeStoryChapters(copy);

  return (
    <>
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src="/images/about/about-hero-executive-1600.webp" position="65% center" video={HERO_VIDEOS.about} />
        <div className="lufe-container lufe-hero-content pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60">
            <Link href={localizedHref(locale, "/")} className="hover:text-gold">{copy.home}</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span className="text-white/75">{copy.breadcrumb}</span>
          </nav>
          <h1 className="h1 mb-6 max-w-[880px] text-white">
            {copy.hero.title[0]}<br /><span className="text-gold">{copy.hero.title[1]}</span>
          </h1>
          <p className="max-w-[640px] text-[18px] leading-[1.8] text-white/80">{copy.hero.quote}</p>
          <p className="lead mb-0 mt-4 max-w-[640px] !text-white/75">{copy.hero.lead}</p>
        </div>
        <ScrollCue label={copy.hero.scrollCue} />
      </section>

      <section id="story" className="scroll-mt-[80px] bg-white py-[80px] md:py-[112px]">
        <div className="lufe-container">
          <StoryChapters chapters={chapters} photoSources={photoSources} stats={copy.storyStats} servicesLinkLabel={copy.servicesLink} locale={locale} />
        </div>
      </section>

      <section id="team" className="scroll-mt-[80px] border-y border-bd/40 bg-cream py-[72px]">
        <div className="lufe-container">
          <h2 className="h2">{copy.team.title[0]}<br /><span className="text-gold-d">{copy.team.title[1]}</span></h2>
          <p className="lead mt-5 max-w-[720px]">{copy.team.lead}</p>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {teamRoles.map((role) => {
              const roleCopy = copy.team.roles[role.id];
              return <article key={role.id} className="border border-bd bg-white p-6">
                <PhotoSlot slotId={role.photoSlot} src={photoSources[role.photoSlot]} ratioClassName="aspect-[4/3]" className="-mx-6 -mt-6 mb-6" sizes="(max-width: 768px) 100vw, 360px" locale={locale} />
                <div className="mb-4 flex h-12 w-12 items-center justify-center border border-gold/40 text-gold-d">{role.icon}</div>
                <h3 className="h3 mb-2">{roleCopy.title}</h3>
                <p className="text-[14.5px] leading-[1.8] text-tx2">{roleCopy.description}</p>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section id="network" className="scroll-mt-[80px] bg-navy py-[80px] text-white md:py-[96px]">
        <div className="lufe-container grid items-center gap-12 lg:grid-cols-[1fr_480px]">
          <div className="min-w-0">
            <h2 className="h2 text-white">{copy.network.title[0]}<br /><span className="text-gold">{copy.network.title[1]}</span></h2>
            <p className="lead !text-white/70 mt-5 max-w-[620px]">{copy.network.lead}</p>
            <p className="mt-8 text-[13px] text-white/55">{copy.network.cities}</p>
            <div className="mt-4 grid gap-2 text-[13px] text-white/55">
              <div className="flex items-center gap-2"><span aria-hidden="true" className="h-2 w-2 bg-gold" />{copy.network.networkCities}</div>
              <div className="flex items-center gap-2"><span aria-hidden="true" className="h-2 w-2 bg-sky" />{copy.network.focusMarkets}</div>
            </div>
          </div>
          <NetworkGlobe fallbackAlt={copy.network.fallbackImageAlt} />
        </div>
      </section>

      <section className="bg-white py-[72px] md:py-[96px]">
        <div className="lufe-container grid grid-cols-1 gap-5 md:grid-cols-2">
          {networkCards.map((card) => {
            const cardCopy = copy.network.cards[card.id];
            return <article key={card.id} className="border border-bd p-7">
              <div className={`mb-4 flex h-14 w-14 items-center justify-center bg-cream ${card.className}`}>{card.icon}</div>
              <h3 className="h3 mb-2">{cardCopy.title}</h3>
              <p className="text-[15.5px] leading-[1.8] text-tx2">{cardCopy.description}</p>
            </article>;
          })}
        </div>
      </section>

      <section id="philosophy" className="scroll-mt-[80px] bg-navy py-[80px] text-white md:py-[96px]">
        <div className="lufe-container grid items-center gap-14 lg:grid-cols-[1fr_440px]">
          <div className="order-2 lg:order-1">
            <h2 className="h2 text-white">{copy.beliefs.title}</h2>
            <div className="mt-10 divide-y divide-white/15 border-y border-white/15">
              {copy.beliefs.items.map((belief, index) => (
                <div key={belief} data-lufe-belief className="lufe-belief flex items-start gap-5 py-6">
                  <div className="lufe-belief-number num flex h-8 w-8 shrink-0 items-center justify-center text-[15.5px] text-gold">{index + 1}</div>
                  <p className="text-[15.5px] leading-[1.8] text-white/70">{belief}</p>
                </div>
              ))}
            </div>
          </div>
          <TieredImage src="/images/about/philosophy-compass-1600.webp" alt={copy.beliefs.imageAlt} sizes="(max-width: 1024px) 100vw, 440px" className="order-1 aspect-[16/9] w-full object-cover lg:order-2 lg:aspect-[4/5]" />
        </div>
      </section>

      <section className="bg-navy py-[80px] text-white md:py-[96px]">
        <div className="lufe-container">
          <div className="mx-auto max-w-[720px] text-center">
            <div className="relative mx-auto mb-8 h-[180px] w-full max-w-[680px] overflow-hidden">
              <TieredImage src="/images/about/aaron-teaching-1600.webp" alt={copy.cta.imageAlt} sizes="(max-width: 680px) 100vw, 680px" className="absolute inset-0 h-full w-full object-cover object-[center_35%]" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/20 to-navy/75" />
            </div>
            <h2 className="h2 text-white">{copy.cta.title}</h2>
            <p className="mt-4 text-[15.5px] leading-[1.8] text-white/70">{copy.cta.body}</p>
            <button type="button" onClick={open} className="mt-7 cursor-pointer bg-gold px-8 py-3.5 text-[16.5px] font-semibold text-navy active:scale-[.97]">{copy.cta.button}</button>
          </div>
        </div>
      </section>
    </>
  );
}
