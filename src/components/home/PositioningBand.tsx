"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type Chapter = {
  readonly id?: string;
  readonly label: string;
  readonly title: string;
  readonly scene: string;
  readonly detail: string;
  readonly price: string;
  readonly priceDetail?: string;
  readonly href: string;
  readonly linkLabel: string;
};

export const HOME_CHAPTERS: readonly Chapter[] = [
  {
    label: "第一個月 · 市場探查",
    title: "先讓馬尼拉的媽媽拿起來看看",
    scene: "你把三支產品寄到馬尼拉。兩個星期後，\n一群當地學校的老師和家長圍著桌子，拿起來、聞一聞、翻價錢。\n有人皺眉，有人問哪裡買得到。",
    detail: "我們把這一桌的反應整理成一頁：\n誰會買、多少錢會買、為什麼不買。",
    price: "1～2 萬（前 10 家實驗價）",
    priceDetail: "沒過，故事在這裡停，你花的是 1～2 萬，不是幾百萬。\n過了，這筆抵進下一章。",
    href: "/services/product-testing",
    linkLabel: "看市場探查怎麼做 →",
  },
  {
    id: "chapter-2",
    label: "第三個月 · 寄賣",
    title: "上架了，讓人先用過再說",
    scene: "報告說可以。貨上了菲律賓的電商，\n產品證還在跑，這 6～12 週，學校的家長活動先讓大家用過。\n有人在社群裡問，有人拍了影片，證下來那天，架上已經有人在等。",
    detail: "我們做的：電商上架、產品證代持、學校家長活動、市場報告，\n加上網紅與活動的配套。貨放合作夥伴的倉，賣多少算多少。",
    price: "5～6 萬（跟市場探查合起來就是 7 萬起手包，市場探查費可抵）",
    href: "/services/consignment",
    linkLabel: "看寄賣包內容 →",
  },
  {
    label: "第九個月 · 公司落地",
    title: "開始想要在當地有自己的人",
    scene: "賣得動了。你開始想：要不要開一間自己的公司、\n找第一個員工、把證掛到自己名下。\n這時候你會發現，每一件事都需要有人在當地——而你不可能一直飛。",
    detail: "我們做的：註冊、招聘、律師行文件、FDA 掛證、日常營運陪跑。\n不是每個品牌都會走到這一章；走到的，我們接得住。",
    price: "按案報價，第一次談就給成本框架",
    href: "/services/localization",
    linkLabel: "看落地怎麼做 →",
  },
  {
    label: "之後的每一天 · 海外客服",
    title: "星期五晚上十一點的那封信",
    scene: "一封英文客訴信。退貨、換貨、問哪裡有賣。\n你不會想為了這件事養一組人，但也不能不回。",
    detail: "我們做的：一群受過完整訓練、英文老師等級的菲律賓客服團隊，替你接。\n寄賣就用得到，落地更用得到，要去北美的，一樣用得到。",
    price: "2027 Q1 開放首批，先登記",
    href: "/services/call-center",
    linkLabel: "登記首批 →",
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
    <section id="chapters" className="bg-cream px-5 py-[80px] md:px-10 md:py-[104px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 max-w-[820px] text-center md:mb-16">
          <h2 className="mb-5 font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-navy [text-wrap:balance] md:mb-6">
            一家品牌在馬尼拉的第一年，
            <br />
            <span className="text-gold-d">通常是這樣走的</span>
          </h2>
          <p className="mx-auto max-w-[720px] text-[17px] font-normal leading-[1.8] text-tx2 md:text-[18px]">
            四個章節，四個方案。可以只走第一章，也可以一路走完。每一章都有價，每一章結束你都可以決定要不要繼續。
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
          {HOME_CHAPTERS.map((chapter, index) => (
            <article ref={(element) => { cardsRef.current[index] = element; }} id={chapter.id} key={chapter.label} onPointerEnter={() => setHoveredIndex(index)} onPointerLeave={() => setHoveredIndex(null)} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className={`lufe-card flex min-w-0 flex-col border border-bd bg-white p-6 md:p-8 ${flashIndex === index ? "lufe-home-chapter-flash" : ""}`}>
              <p className="mb-4 text-[13px] font-semibold text-gold-d">{chapter.label}</p>
              <h3 className="mb-5 font-sans text-[clamp(21px,2.2vw,26px)] font-semibold leading-[1.3] text-tx">{chapter.title}</h3>
              <p className="whitespace-pre-line text-[15px] leading-[1.85] text-tx2">{chapter.scene}</p>
              <p className="mt-5 whitespace-pre-line border-t border-bd pt-5 text-[15px] font-medium leading-[1.85] text-tx">{chapter.detail}</p>
              <div className="mt-6 border-t border-bd pt-5">
                <p className="text-[15px] font-semibold leading-[1.7] text-gold-d">{chapter.price}</p>
                {chapter.priceDetail ? <p className="mt-2 whitespace-pre-line text-[14px] leading-[1.75] text-tx2">{chapter.priceDetail}</p> : null}
              </div>
              <Link href={chapter.href} className="mt-6 inline-flex text-[15px] font-semibold text-sky">
                {chapter.linkLabel}
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-5 border-l-2 border-gold bg-white px-5 py-4 text-[15px] leading-[1.8] text-tx2">
          出海起手包 <strong className="text-tx">7 萬</strong> ＝ 第一章市場探查 1～2 萬 ＋ 第二章寄賣包 5～6 萬。<br />
          先付市場探查。沒過，錢到此為止；過了，這筆抵進寄賣包。前 10 家是實驗價。
        </p>
        <Link href="/services/north-america" className="mt-5 inline-flex text-[15px] font-semibold text-sky">
          產品已經成熟、目標是北美貨架？那是另一個故事，由北美團隊執行 →
        </Link>
      </div>
    </section>
  );
}
