"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { BuildingIcon, CompassIcon, HeadsetIcon, TrendIcon } from "@/components/icons/LineIcons";

type Chapter = {
  readonly id?: string;
  readonly label: string;
  readonly title: string;
  readonly subtitle: string;
  readonly href: string;
  readonly linkLabel: string;
  readonly icon: typeof CompassIcon;
};

export const HOME_CHAPTERS: readonly Chapter[] = [
  {
    id: "chapter-1",
    label: "第一個月",
    title: "市場探查",
    subtitle: "在當地找真實消費者試用，確認誰會買、願意付多少",
    href: "/services/product-testing",
    linkLabel: "看市場探查怎麼做 →",
    icon: CompassIcon,
  },
  {
    id: "chapter-2",
    label: "第三個月",
    title: "寄賣",
    subtitle: "產品證審核期間，電商上架與市場活動同步推進",
    href: "/services/consignment",
    linkLabel: "看寄賣包內容 →",
    icon: TrendIcon,
  },
  {
    id: "chapter-3",
    label: "第九個月",
    title: "公司落地",
    subtitle: "公司註冊、人員招聘、FDA 掛證，建立當地據點",
    href: "/services/localization",
    linkLabel: "看落地怎麼做 →",
    icon: BuildingIcon,
  },
  {
    id: "chapter-4",
    label: "之後的每一天",
    title: "海外客服",
    subtitle: "菲律賓是全球英語客服外包的重鎮。由當地專業團隊接手英文客服，品質標準由台灣端制定與管理。預計 2027 Q1 開放首批。",
    href: "/services/call-center",
    linkLabel: "登記首批 →",
    icon: HeadsetIcon,
  },
];

const TIMELINE_LABELS = ["第一個月", "第三個月", "第九個月", "之後的每一天"] as const;

export function ChaptersSection() {
  const cardsRef = useRef<Array<HTMLElement | null>>([]);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [flashIndex, setFlashIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timelineProgress = hoveredIndex === null ? progress : hoveredIndex / (TIMELINE_LABELS.length - 1);
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
            一家品牌在馬尼拉的第一年，
            <br />
            <span className="text-gold-d">通常是這樣走的</span>
          </h2>
          <p className="mx-auto max-w-[720px] text-[17px] font-normal leading-[1.8] text-tx2 md:text-[18px]">
            四個章節，四個方案。可從第一章開始，也可一路走完；每一章獨立計價，每一章結束都能決定是否繼續
          </p>
        </div>

        <ol className="lufe-home-timeline mx-auto mb-8 grid max-w-[1040px] grid-cols-4 gap-2 border-y border-bd py-5 md:mb-10 md:gap-5" style={{ "--lufe-home-progress": timelineProgress } as CSSProperties}>
          {TIMELINE_LABELS.map((label, index) => (
            <li key={label} className="min-w-0 text-center">
              <button type="button" onClick={() => jumpToChapter(index)} onPointerEnter={() => setHoveredIndex(index)} onPointerLeave={() => setHoveredIndex(null)} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} onFocus={() => setHoveredIndex(index)} onBlur={() => setHoveredIndex(null)} className={`lufe-home-timeline-button ${index <= reachedIndex ? "lufe-home-timeline-hit" : ""}`}>
                <span className="lufe-home-timeline-dot" aria-hidden="true" />
                {label}
              </button>
            </li>
          ))}
        </ol>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {HOME_CHAPTERS.map((chapter, index) => {
            const Icon = chapter.icon;

            return (
            <article ref={(element) => { cardsRef.current[index] = element; }} id={chapter.id} key={chapter.label} onPointerEnter={() => setHoveredIndex(index)} onPointerLeave={() => setHoveredIndex(null)} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className={`lufe-card group flex min-w-0 flex-col border border-bd bg-white p-6 md:p-8 ${flashIndex === index ? "lufe-home-chapter-flash" : ""}`}>
              <span aria-hidden="true" className="mb-5 grid h-10 w-10 place-items-center border border-gold/40 text-gold-d transition-colors duration-200 [@media(hover:hover)]:group-hover:border-gold-d">
                <Icon size={20} className="transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-px" />
              </span>
              <h3 className="mb-5 font-sans text-[clamp(21px,2.2vw,26px)] font-semibold leading-[1.3] text-tx">{chapter.title}</h3>
              <p className="text-[15px] leading-[1.85] text-tx2">{chapter.subtitle}</p>
              <Link href={chapter.href} className="mt-6 inline-flex text-[15px] font-semibold text-sky">
                {chapter.linkLabel}
              </Link>
            </article>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-[860px] text-[15px] leading-[1.85] text-tx2 md:text-[16px]">出海起手包 7 萬 ＝ 市場探查 1～2 萬 ＋ 寄賣包 5～6 萬。先付市場探查；沒過，錢到此為止；過了，這筆抵進寄賣包。前 10 家是實驗價。</p>

        <Link href="/services/north-america" className="group mt-6 flex items-center gap-4 border-y border-bd py-4">
          <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center font-[var(--font-inter)] text-[12px] font-bold tracking-[-.01em] text-gold-d">US</span>
          <span className="text-[15px] text-tx transition-colors [@media(hover:hover)]:group-hover:text-sky">產品已經成熟、目標是北美貨架？那是另一條路，由北美團隊執行</span>
          <span className="ml-auto whitespace-nowrap text-[15px] font-semibold text-sky">北美通路 <span aria-hidden="true" className="inline-block transition-transform [@media(hover:hover)]:group-hover:translate-x-[3px]">→</span></span>
        </Link>
      </div>
    </section>
  );
}
