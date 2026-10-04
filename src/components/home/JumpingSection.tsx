"use client";

import type { MouseEvent } from "react";

import { homeJumpingEn } from "@/i18n/en/home-jumping";
import { type Locale } from "@/i18n/locale";
import { homeJumpingZh, type HomeJumpingCopy } from "@/i18n/zh/home-jumping";

import styles from "./JumpingRoute.module.css";

type RouteNode = {
  readonly id: string;
  readonly title: string;
  readonly note: string;
  readonly side: "jumping" | "handoff" | "lufe";
  readonly target?: string;
};

const JUMPING_ROUTE_CONFIG = [
  { id: "factory", side: "jumping" },
  { id: "port", side: "jumping" },
  { id: "sea", side: "jumping" },
  { id: "handoff", side: "handoff" },
  { id: "market-test", side: "lufe", target: "chapter-1" },
  { id: "consignment", side: "lufe", target: "chapter-2" },
  { id: "company-setup", side: "lufe", target: "chapter-3" },
  { id: "call-center", side: "lufe", target: "chapter-4" },
] as const;

function createRoute(copy: HomeJumpingCopy): RouteNode[] {
  return JUMPING_ROUTE_CONFIG.map((config, index) => ({ ...config, ...copy.nodes[index]! }));
}

export const JUMPING_COPY = homeJumpingZh;
export const JUMPING_ROUTE = createRoute(homeJumpingZh);

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

export function JumpingSection({ locale = "zh" }: { readonly locale?: Locale } = {}) {
  const copy = locale === "en" ? homeJumpingEn : homeJumpingZh;
  const route = createRoute(copy);

  return (
    <section id="jumping" className="py-[80px] md:py-[104px]">
      <div className="lufe-container">
        <div className="max-w-[820px]">
          <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-navy [text-wrap:balance]">
            {/* Keep each comma phrase whole so "到" never strands at a line end on phones. */}
            {copy.title[0].split(locale === "zh" ? /(?<=，)/ : /(?<=,)/).map((phrase) => <span key={phrase} className="inline-block">{phrase}</span>)}
            <br />
            <span className="text-gold-d">{copy.title[1]}</span>
          </h2>
          <p className="mt-6 max-w-[720px] text-[17px] leading-[1.8] text-tx2 md:text-[18px]">{copy.intro}</p>
        </div>

        <ol role="list" aria-label={copy.routeAriaLabel} className={`${styles.route} mt-12 md:mt-16`}>
          {route.map((node) => (
            <li key={node.id} role="listitem" className={`${styles.node} ${node.side === "handoff" ? styles.handoff : node.side === "lufe" ? styles.lufe : ""}`}>
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
            <h3 className="text-[19px] font-semibold leading-[1.4] text-navy">{copy.jumping.title}</h3>
            <p className="mt-2 text-[16px] leading-[1.8] text-tx2">{copy.jumping.body}</p>
          </div>
          <div className="border-t-2 border-gold pt-5">
            <h3 className="text-[19px] font-semibold leading-[1.4] text-gold-d">{copy.lufe.title}</h3>
            <p className="mt-2 text-[16px] leading-[1.8] text-tx2">{copy.lufe.body}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3">
          <a href="#chapters" onClick={(event) => scrollToTarget(event, "chapters", "start", false)} className="lufe-press inline-block text-[16px] font-semibold text-gold-d underline-offset-4 hover:underline">{copy.primaryExit}</a>
          <a href="https://jumping.group" target="_blank" rel="noopener noreferrer" className="lufe-press inline-block text-[15px] text-tx3 underline-offset-4 hover:text-tx2 hover:underline">{copy.secondaryExit}</a>
        </div>
      </div>
    </section>
  );
}
