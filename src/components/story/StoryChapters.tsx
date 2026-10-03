"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { PhotoSlot, photoSlotCaption } from "@/components/about/PhotoSlot";
import { TieredImage } from "@/components/TieredImage";
import type { AboutPhotoSlotId, AboutPhotoSources } from "@/data/aboutPhotoSlots";

export type StoryChapter = {
  readonly num: string;
  readonly label: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly stats?: boolean;
  readonly jumpingLink?: boolean;
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
  /** Small source line after the paragraphs, in the figure caption style. */
  readonly note?: string;
};

const storyStats = [
  { value: "43", label: "年國際物流・躍馬企業" },
  { value: "500+", label: "出口案件・躍馬企業" },
  { value: "30+", label: "國家與地區・躍馬物流網絡" },
] as const;

export function StoryChapters({ chapters, photoSources = {} }: { readonly chapters: readonly StoryChapter[]; readonly photoSources?: AboutPhotoSources }) {
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
        <p className="font-[var(--font-inter)] text-[14px] font-semibold text-gold-d">{chapter.num}</p>
        <p className="mt-1 text-[13px] font-semibold text-tx3">{chapter.label}</p>
        <h2 className="mt-2 text-[clamp(24px,2.6vw,34px)] font-[650] leading-[1.3] text-tx">{chapter.title}</h2>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        {chapter.paragraphs.map((paragraph, index) => <div key={paragraph}>
          <p className={`${index ? "mt-6" : ""} text-[18px] leading-[1.9] text-tx2`}>{paragraph}</p>
          {chapter.insert?.afterParagraph === index ? chapter.insert.content : null}
        </div>)}
        {chapter.note ? <p className="mt-6 text-[13px] text-tx3">{chapter.note}</p> : null}
        {chapter.stats ? <div className="mt-10 grid grid-cols-3 gap-5 border-t border-bd pt-6">
          {storyStats.map((stat) => <div key={stat.label}><p data-lufe-counter className="num text-navy">{stat.value}</p><p className="mt-2 text-[13px] leading-[1.6] text-tx3">{stat.label}</p></div>)}
        </div> : null}
        {chapter.jumpingLink ? <a href="https://jumping.group" target="_blank" rel="noopener noreferrer" aria-label="認識躍馬企業（另開新分頁）" className="group mt-8 grid grid-cols-[1fr_auto] items-center border border-bd p-6 transition-[border-color,transform] active:scale-[.985] [@media(hover:hover)]:hover:border-gold">
          <span><span className="block text-[13px] font-semibold text-gold-d">躍馬企業官網</span><span className="mt-2 block text-[22px] font-[650] leading-[1.3] text-tx">認識躍馬企業</span><span className="mt-2 block text-[14px] text-tx3">jumping.group</span></span>
          <span aria-hidden="true" className="grid h-11 w-11 place-items-center border border-gold/40 text-[20px] text-gold-d transition-transform [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:translate-x-0.5">↗</span>
        </a> : null}
        {chapter.servicesLink ? <Link href="/services" className="group mt-8 inline-flex text-[15px] font-semibold text-gold-d"><span>看四個方案 </span><span className="transition-transform [@media(hover:hover)]:group-hover:translate-x-1">→</span></Link> : null}
      </div>
    </article>
    {chapter.photoSlot ? <figure ref={(element) => { figures.current[chapterIndex] = element; }} className="mx-auto max-w-[1180px]">
      <PhotoSlot slotId={chapter.photoSlot} src={photoSources[chapter.photoSlot]} ratioClassName="aspect-[4/3] md:aspect-[21/9]" maxTierWidth={chapter.image?.maxTierWidth} sizes="(max-width: 1180px) 100vw, 1180px" imageStyle={{ transform: "translateY(var(--lufe-figure-drift, 0px)) scale(1.06)", ...(chapter.image?.position && !photoSources[chapter.photoSlot] ? { objectPosition: chapter.image.position } : {}) } as CSSProperties} />
      <figcaption className="mt-3 text-[13px] text-tx3">{photoSlotCaption(chapter.photoSlot, photoSources[chapter.photoSlot])}</figcaption>
    </figure> : chapter.image ? <figure ref={(element) => { figures.current[chapterIndex] = element; }} className="mx-auto max-w-[1180px]">
      <div className="aspect-[4/3] overflow-hidden md:aspect-[21/9]">
        <TieredImage src={chapter.image.src} alt={chapter.image.alt} maxTierWidth={chapter.image.maxTierWidth} loading="lazy" sizes="(max-width: 1180px) 100vw, 1180px" className="h-full w-full object-cover" style={{ transform: "translateY(var(--lufe-figure-drift, 0px)) scale(1.06)", ...(chapter.image.position ? { objectPosition: chapter.image.position } : {}) } as CSSProperties} />
      </div>
      <figcaption className="mt-3 text-[13px] text-tx3">{chapter.image.alt}</figcaption>
    </figure> : null}
  </div>)}</>;
}
