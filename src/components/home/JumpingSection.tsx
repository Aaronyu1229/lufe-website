"use client";

import type { MouseEvent } from "react";

import styles from "./JumpingRoute.module.css";

type RouteNode = {
  readonly title: string;
  readonly note: string;
  readonly side: "jumping" | "handoff" | "lufe";
  readonly target?: string;
};

export const JUMPING_COPY = {
  eyebrow: "躍馬企業 × 鹿飛",
  title: ["從你的工廠，到菲律賓的貨架，", "是同一條路"],
  intro: "這條路的前半段，躍馬企業走了 43 年：500 多個出口案件，30 多個國家。看了這麼多年，我們最清楚貨櫃門打開之後，品牌會卡在哪裡。所以鹿飛的創辦人從躍馬走出來，把後半段接上。",
  jumping: { title: "躍馬企業 · 把貨送到", body: "報關、倉儲、海空運、最後一哩。貨怎麼過去、到岸成本大概多少，不用另外找人問。" },
  lufe: { title: "鹿飛 · 到了之後", body: "陪台灣品牌走完在菲律賓的第一年。這四步，就在下面。" },
  primaryExit: "往下看這四章 ↓",
  secondaryExit: "現在只需要把貨送出去？找躍馬企業 ↗",
} as const;

export const JUMPING_ROUTE: readonly RouteNode[] = [
  { title: "台灣出廠", note: "報關、文件", side: "jumping" },
  { title: "裝櫃出港", note: "倉儲、併櫃", side: "jumping" },
  { title: "海上", note: "海空運", side: "jumping" },
  { title: "櫃門打開", note: "在這裡交棒", side: "handoff" },
  { title: "市場探查", note: "第一個月", side: "lufe", target: "chapter-1" },
  { title: "寄賣", note: "第三個月", side: "lufe", target: "chapter-2" },
  { title: "公司落地", note: "第九個月", side: "lufe", target: "chapter-3" },
  { title: "海外客服", note: "之後的每一天", side: "lufe", target: "chapter-4" },
];

const FLASH_CLASS = "lufe-home-chapter-flash";

// Smooth-scroll to an in-page target; plain anchor navigation remains the no-JS fallback.
function scrollToTarget(event: MouseEvent<HTMLAnchorElement>, id: string, block: ScrollLogicalPosition, flash: boolean) {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block });
  window.history.replaceState(null, "", `#${id}`);
  if (flash && !reduce) {
    target.classList.add(FLASH_CLASS);
    window.setTimeout(() => target.classList.remove(FLASH_CLASS), 1200);
  }
}

export function JumpingSection() {
  return (
    <section id="jumping" className="py-[80px] md:py-[104px]">
      <div className="lufe-container">
        <div className="max-w-[820px]">
          <p className="mb-4 text-[13px] font-semibold text-gold-d">{JUMPING_COPY.eyebrow}</p>
          <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-navy [text-wrap:balance]">
            {/* Keep each comma phrase whole so "到" never strands at a line end on phones. */}
            {JUMPING_COPY.title[0].split(/(?<=，)/).map((phrase) => <span key={phrase} className="inline-block">{phrase}</span>)}
            <br />
            <span className="text-gold-d">{JUMPING_COPY.title[1]}</span>
          </h2>
          <p className="mt-6 max-w-[720px] text-[17px] leading-[1.8] text-tx2 md:text-[18px]">{JUMPING_COPY.intro}</p>
        </div>

        <ol role="list" aria-label="從台灣到菲律賓的同一條路" className={`${styles.route} mt-12 md:mt-16`}>
          {JUMPING_ROUTE.map((node) => (
            <li key={node.title} role="listitem" className={`${styles.node} ${node.side === "handoff" ? styles.handoff : node.side === "lufe" ? styles.lufe : ""}`}>
              <span className={styles.mark} aria-hidden="true"><span className={styles.dot} /></span>
              <span className={styles.text}>
                {node.target ? (
                  <a href={`#${node.target}`} onClick={(event) => scrollToTarget(event, node.target!, "center", true)} className={styles.title}>{node.title}</a>
                ) : (
                  <span className={styles.title}>{node.title}</span>
                )}
                <span className={styles.note}>{node.note}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 md:gap-10">
          <div className="border-t-2 border-navy pt-5">
            <h3 className="text-[19px] font-semibold leading-[1.4] text-navy">{JUMPING_COPY.jumping.title}</h3>
            <p className="mt-2 text-[16px] leading-[1.8] text-tx2">{JUMPING_COPY.jumping.body}</p>
          </div>
          <div className="border-t-2 border-gold pt-5">
            <h3 className="text-[19px] font-semibold leading-[1.4] text-gold-d">{JUMPING_COPY.lufe.title}</h3>
            <p className="mt-2 text-[16px] leading-[1.8] text-tx2">{JUMPING_COPY.lufe.body}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3">
          <a href="#chapters" onClick={(event) => scrollToTarget(event, "chapters", "start", false)} className="lufe-press inline-block text-[16px] font-semibold text-gold-d underline-offset-4 hover:underline">{JUMPING_COPY.primaryExit}</a>
          <a href="https://jumping.group" target="_blank" rel="noopener noreferrer" className="lufe-press inline-block text-[15px] text-tx3 underline-offset-4 hover:text-tx2 hover:underline">{JUMPING_COPY.secondaryExit}</a>
        </div>
      </div>
    </section>
  );
}
