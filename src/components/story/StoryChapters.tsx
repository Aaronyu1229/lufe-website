"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { PhotoSlot, photoSlotCaption } from "@/components/about/PhotoSlot";
import { TieredImage } from "@/components/TieredImage";
import type { AboutPhotoSlotId, AboutPhotoSources } from "@/data/aboutPhotoSlots";
import { aboutPageZh } from "@/i18n/zh/about-page";
import { localizedHref, type Locale } from "@/i18n/locale";

export type StoryChapter = {
  readonly num: string;
  readonly label: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly stats?: boolean;
  readonly servicesLink?: boolean;
  readonly image?: {
    readonly src: string;
    readonly alt: string;
    readonly maxTierWidth?: number;
    readonly position?: string;
  };
  /** Replaces `image` with a photo slot (its fallback is the current image). */
  readonly photoSlot?: AboutPhotoSlotId;
  /** Content inserted after the paragraph at this index. */
  readonly insert?: { readonly afterParagraph: number; readonly content: ReactNode };
};

export function StoryChapters({ chapters, photoSources = {}, stats = aboutPageZh.storyStats, servicesLinkLabel = aboutPageZh.servicesLink, locale = "zh" }: { readonly chapters: readonly StoryChapter[]; readonly photoSources?: AboutPhotoSources; readonly stats?: readonly { readonly value: string; readonly label: string }[]; readonly servicesLinkLabel?: string; readonly locale?: Locale }) {
  const figures = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      frame = 0;
      figures.current.forEach((figure) => {
        const image = figure?.querySelector<HTMLImageElement>("img");
        if (!figure || !image) return;
        if (reducedMotion.matches) {
          image.style.setProperty("--lufe-figure-drift", "0px");
          return;
        }
        const rect = figure.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight));
        image.style.setProperty("--lufe-figure-drift", `${progress * -4}%`);
      });
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <>{chapters.map((chapter, chapterIndex) => <div key={chapter.num}>
    <article className={`grid gap-8 py-14 md:py-20 lg:grid-cols-12 ${chapterIndex ? "border-t border-bd" : ""}`}>
      <div className="self-start lg:sticky lg:top-[112px] lg:col-span-4">
        <h2 className="mt-2 text-[clamp(24px,2.6vw,34px)] font-[650] leading-[1.3] text-tx">{chapter.title}</h2>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        {chapter.paragraphs.map((paragraph, index) => <div key={paragraph}>
          <p className={`${index ? "mt-6" : ""} text-[18px] leading-[1.9] text-tx2`}>{paragraph}</p>
          {chapter.insert?.afterParagraph === index ? chapter.insert.content : null}
        </div>)}
          {chapter.stats ? <div className="mt-10 grid grid-cols-3 gap-5 border-t border-bd pt-6">
          {stats.map((stat) => <div key={stat.label}><p data-lufe-counter className="num text-navy">{stat.value}</p><p className="mt-2 text-[13px] leading-[1.6] text-tx3">{stat.label}</p></div>)}
        </div> : null}
        {chapter.servicesLink ? <Link href={localizedHref(locale, "/services")} className="group mt-8 inline-flex text-[15px] font-semibold text-gold-d"><span>{servicesLinkLabel}</span><span className="transition-transform [@media(hover:hover)]:group-hover:translate-x-1">→</span></Link> : null}
      </div>
    </article>
    {chapter.photoSlot ? <figure ref={(element) => { figures.current[chapterIndex] = element; }} className="mx-auto max-w-[1180px]">
      <PhotoSlot slotId={chapter.photoSlot} src={photoSources[chapter.photoSlot]} ratioClassName="aspect-[4/3] md:aspect-[21/9]" maxTierWidth={chapter.image?.maxTierWidth} sizes="(max-width: 1180px) 100vw, 1180px" imageStyle={{ transform: "translateY(var(--lufe-figure-drift, 0px)) scale(1.06)", ...(chapter.image?.position && !photoSources[chapter.photoSlot] ? { objectPosition: chapter.image.position } : {}) } as CSSProperties} locale={locale} />
      <figcaption className="mt-3 text-[13px] text-tx3">{photoSlotCaption(chapter.photoSlot, photoSources[chapter.photoSlot], locale)}</figcaption>
    </figure> : chapter.image ? <figure ref={(element) => { figures.current[chapterIndex] = element; }} className="mx-auto max-w-[1180px]">
      <div className="aspect-[4/3] overflow-hidden md:aspect-[21/9]">
        <TieredImage src={chapter.image.src} alt={chapter.image.alt} maxTierWidth={chapter.image.maxTierWidth} loading="lazy" sizes="(max-width: 1180px) 100vw, 1180px" className="h-full w-full object-cover" style={{ transform: "translateY(var(--lufe-figure-drift, 0px)) scale(1.06)", ...(chapter.image.position ? { objectPosition: chapter.image.position } : {}) } as CSSProperties} />
      </div>
      <figcaption className="mt-3 text-[13px] text-tx3">{chapter.image.alt}</figcaption>
    </figure> : null}
  </div>)}</>;
}
