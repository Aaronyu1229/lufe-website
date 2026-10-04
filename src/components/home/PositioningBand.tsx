"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { BuildingIcon, CompassIcon, HeadsetIcon, TrendIcon } from "@/components/icons/LineIcons";
import { homeChaptersEn } from "@/i18n/en/home-chapters";
import { localizedHref, type Locale } from "@/i18n/locale";
import { homeChaptersZh, type HomeChaptersCopy } from "@/i18n/zh/home-chapters";

type Chapter = {
  readonly id?: string;
  readonly label: string;
  readonly title: string;
  readonly subtitle: string;
  readonly href: string;
  readonly linkLabel: string;
  readonly icon: typeof CompassIcon;
};

const HOME_CHAPTER_CONFIG = [
  { id: "chapter-1", href: "/services/product-testing", icon: CompassIcon },
  { id: "chapter-2", href: "/services/consignment", icon: TrendIcon },
  { id: "chapter-3", href: "/services/localization", icon: BuildingIcon },
  { id: "chapter-4", href: "/services/call-center", icon: HeadsetIcon },
] as const;

function createChapters(copy: HomeChaptersCopy): Chapter[] {
  return HOME_CHAPTER_CONFIG.map((config, index) => ({ ...config, ...copy.chapters[index]! }));
}

export const HOME_CHAPTERS = createChapters(homeChaptersZh);

export function ChaptersSection({ locale = "zh" }: { readonly locale?: Locale } = {}) {
  const copy = locale === "en" ? homeChaptersEn : homeChaptersZh;
  const chapters = createChapters(copy);
  const cardsRef = useRef<Array<HTMLElement | null>>([]);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [flashIndex, setFlashIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timelineProgress = hoveredIndex === null ? progress : hoveredIndex / (copy.timelineLabels.length - 1);
  const reachedIndex = hoveredIndex ?? activeIndex;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const cards = cardsRef.current.filter((card): card is HTMLElement => card !== null);
      if (cards.length === 0) return;
      const first = cards[0].getBoundingClientRect();
      const last = cards.at(-1)?.getBoundingClientRect();
      if (!last) return;
      const start = window.scrollY + first.top - window.innerHeight * .68;
      const end = window.scrollY + last.bottom - window.innerHeight * .45;
      const nextProgress = end <= start ? 1 : Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
      setProgress(nextProgress);
      setActiveIndex(Math.min(cards.length - 1, Math.max(0, Math.floor(nextProgress * cards.length))));
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  function jumpToChapter(index: number) {
    const card = cardsRef.current[index];
    if (!card) return;
    card.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
    setFlashIndex(index);
    window.setTimeout(() => setFlashIndex(null), 1200);
  }

  return (
    <section id="chapters" className="bg-cream py-[80px] md:py-[104px]">
      <div className="lufe-container">
        <div className="mx-auto mb-12 max-w-[820px] text-center md:mb-16">
          <h2 className="mb-5 font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-navy [text-wrap:balance] md:mb-6">
            {copy.heading[0]}
            <br />
            <span className="text-gold-d">{copy.heading[1]}</span>
          </h2>
          <p className="mx-auto max-w-[720px] text-[17px] font-normal leading-[1.8] text-tx2 md:text-[18px]">
            {copy.lead}
          </p>
        </div>

        <ol className="lufe-home-timeline mx-auto mb-8 grid max-w-[1040px] grid-cols-4 gap-2 border-y border-bd py-5 md:mb-10 md:gap-5" style={{ "--lufe-home-progress": timelineProgress } as CSSProperties}>
          {copy.timelineLabels.map((label, index) => (
            <li key={label} className="min-w-0 text-center">
              <button type="button" onClick={() => jumpToChapter(index)} onPointerEnter={() => setHoveredIndex(index)} onPointerLeave={() => setHoveredIndex(null)} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} onFocus={() => setHoveredIndex(index)} onBlur={() => setHoveredIndex(null)} className={`lufe-home-timeline-button ${index <= reachedIndex ? "lufe-home-timeline-hit" : ""}`}>
                <span className="lufe-home-timeline-dot" aria-hidden="true" />
                {label}
              </button>
            </li>
          ))}
        </ol>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {chapters.map((chapter, index) => {
            const Icon = chapter.icon;

            return (
            <article ref={(element) => { cardsRef.current[index] = element; }} id={chapter.id} key={chapter.label} onPointerEnter={() => setHoveredIndex(index)} onPointerLeave={() => setHoveredIndex(null)} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className={`lufe-card group flex min-w-0 flex-col border border-bd bg-white p-6 md:p-8 ${flashIndex === index ? "lufe-home-chapter-flash" : ""}`}>
              <span aria-hidden="true" className="mb-5 grid h-10 w-10 place-items-center border border-gold/40 text-gold-d transition-colors duration-200 [@media(hover:hover)]:group-hover:border-gold-d">
                <Icon size={20} className="transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-px" />
              </span>
              <h3 className="mb-5 font-sans text-[clamp(21px,2.2vw,26px)] font-semibold leading-[1.3] text-tx">{chapter.title}</h3>
              <p className="text-[15px] leading-[1.85] text-tx2">{chapter.subtitle}</p>
              <Link href={localizedHref(locale, chapter.href)} className="mt-6 inline-flex text-[15px] font-semibold text-sky">
                {chapter.linkLabel}
              </Link>
            </article>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-[860px] text-[15px] leading-[1.85] text-tx2 md:text-[16px]">{copy.starterPackage}</p>

        <Link href={localizedHref(locale, "/services/north-america")} className="group mt-6 flex items-center gap-4 border-y border-bd py-4">
          <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center font-[var(--font-inter)] text-[12px] font-bold tracking-[-.01em] text-gold-d">US</span>
          <span className="text-[15px] text-tx transition-colors [@media(hover:hover)]:group-hover:text-sky">{copy.northAmerica.description}</span>
          <span className="ml-auto whitespace-nowrap text-[15px] font-semibold text-sky">{copy.northAmerica.label} <span aria-hidden="true" className="inline-block transition-transform [@media(hover:hover)]:group-hover:translate-x-[3px]">→</span></span>
        </Link>
      </div>
    </section>
  );
}
