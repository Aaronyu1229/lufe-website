"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { Disclosure } from "@/components/ui";
import { useMessageBox } from "../MessageBox";

export const OPTIMIZE_PAIN_POINTS: ReadonlyArray<{
  icon: ReactNode;
  title: string;
  signs: readonly string[];
  fix: string;
}> = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 8L12 3L21 8V16L12 21L3 16V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M3 8L12 13L21 8M12 13V21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "物流成本吃掉毛利",
    signs: [
      "海運報價每半年漲一次，你沒有議價籌碼",
      "倉儲費用不透明，月結單看不懂",
      "退貨物流成本比正品物流還高",
    ],
    fix: "我們會重新盤點你的物流結構，從運輸方式、倉儲位置、退貨處理三個層面優化。通常可省 12–25%。",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 6L9 12L13 8L21 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 16H21V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 21H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "通路績效起伏大",
    signs: [
      "銷量看天吃飯，節慶暴增、平常低迷",
      "廣告關了就沒單，自然流量難以累積",
      "review 品質不穩定，退貨率偏高",
    ],
    fix: "我們會做通路健診，檢視 listing、定價、運營節奏、競品動態，給你一份可執行的改善計畫。",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2V5M12 19V22M4.22 4.22L6.34 6.34M17.66 17.66L19.78 19.78M2 12H5M19 12H22M4.22 19.78L6.34 17.66M17.66 6.34L19.78 4.22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "營運流程卡卡",
    signs: [
      "跨時區溝通成本高，一件事要來回好幾天",
      "在地團隊與台灣總部經常對不上",
      "SOP 散落在各處，新人接手要學一個月",
    ],
    fix: "我們會重整你的溝通流程、會議節奏、文件結構，必要時幫你招募 country manager。",
  },
];

export const OPTIMIZE_SERVICES = [
  {
    title: "運營效率診斷",
    timeline: "2–3 週",
    price: "定額診斷費",
    desc: "全面檢視你的海外運營，找出效率瓶頸與成本黑洞。",
    items: [
      "供應鏈與物流效率分析（從工廠到終端）",
      "通路績效評估（Amazon、實體通路、自營站）",
      "成本結構拆解（隱性成本識別）",
      "合規與風險盤點（避免未爆彈）",
      "在地團隊運作檢視",
    ],
    deliverable: "一份 40–60 頁的診斷報告 + 一次 90 分鐘的結論會議",
  },
  {
    title: "運營優化方案",
    timeline: "1–3 個月",
    price: "月費 + 績效獎金",
    desc: "針對診斷結果，陪你執行具體的改善計畫。",
    items: [
      "物流路線重新規劃與簽約",
      "倉儲方案優化（整合、遷移、委外）",
      "通路結構調整（進入新通路 / 退出劣質通路）",
      "行銷策略升級（降低 CAC、提升 LTV）",
      "SOP 建立與在地團隊訓練",
    ],
    deliverable: "一套可持續運作的優化後營運體系，並留下文件與 SOP。",
  },
] as const;

export function OptimizePage() {
  const { open } = useMessageBox();

  return (
    <>
      <section className="relative overflow-hidden bg-navy px-5 pb-[72px] pt-[128px] text-white md:px-10 md:pb-[104px] md:pt-[160px]">
        <div className="absolute inset-0">
          <Image
            src="/images/services/services-optimize-whiteboard.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.18]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 to-navy/95" />
        </div>
        <div className="relative mx-auto max-w-[1000px]">
          <nav aria-label="Breadcrumb" className="mb-7 text-[11px] font-medium tracking-[1px] text-white/50">
            <Link href="/services" className="hover:text-gold">
              服務
            </Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/75">進階優化</span>
          </nav>
          <h1 className="font-sans text-[clamp(34px,5vw,60px)] font-[650] leading-[1.12] tracking-normal [text-wrap:balance]">
            已經跑起來了，
            <br />
            該讓每公里<span className="text-ember">更省</span>
          </h1>
          <p className="mt-5 max-w-[680px] text-[clamp(17px,1.5vw,20px)] leading-[1.7] text-white/75">
            產品在海外已經賣得動，但總覺得利潤被吃掉、效率上不去、決策像在猜。
            這個階段不需要從零開始——我們幫你把既有的營運診斷、優化、重整。
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-[80px] md:px-10 md:py-[110px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-navy [text-wrap:balance]">
            你是不是也遇到<span className="text-ember">這些問題</span>？
          </h2>
          <p className="mt-4 max-w-[620px] text-[clamp(17px,1.5vw,20px)] leading-[1.7] text-tx2">
            如果你對下列任何一個場景點頭，這頁就是為你寫的。
          </p>
          <div className="mt-[38px] grid min-w-0 grid-cols-1 gap-4 md:grid-cols-3">
            {OPTIMIZE_PAIN_POINTS.map((point) => (
              <article key={point.title} className="min-w-0 border border-bd bg-white">
                <div className="p-[26px]">
                  <div className="mb-[18px] grid size-12 place-items-center bg-ember/10 text-ember">{point.icon}</div>
                  <h3 className="mb-4 font-sans text-[clamp(21px,2.2vw,26px)] font-semibold leading-[1.3] text-tx">
                    {point.title}
                  </h3>
                  <ul className="grid gap-2 text-[15px] leading-[1.65] text-tx2">
                    {point.signs.map((sign) => (
                      <li key={sign} className="flex items-start gap-2.5">
                        <span aria-hidden="true" className="mt-[0.66em] size-[5px] shrink-0 bg-ember/65" />
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-[26px] pb-2 [&>div]:!border-b-0 [&>div]:!border-bd">
                <Disclosure
                  id={`optimize-${point.title}`}
                  summary={
                    <span className="flex items-center justify-between gap-3 text-[14px] font-semibold text-ember">
                      怎麼解
                    </span>
                  }
                >
                  <p className="text-[15px] leading-[1.8] text-tx2">{point.fix}</p>
                </Disclosure>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-[80px] md:px-10 md:py-[110px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-navy [text-wrap:balance]">
            診斷為先，<span className="text-ember">執行為後</span>
          </h2>
          <p className="mt-4 max-w-[620px] text-[clamp(17px,1.5vw,20px)] leading-[1.7] text-tx2">
            你可以只做診斷，了解問題在哪；也可以直接進入執行。兩者都可以，順序不能顛倒。
          </p>
          <div className="mt-[38px] grid min-w-0 grid-cols-1 gap-[18px] md:grid-cols-2">
            {OPTIMIZE_SERVICES.map((service, index) => (
              <article key={service.title} className="min-w-0 border border-bd border-l-4 border-l-ember bg-white">
                <div className="p-[30px]">
                  <h3 className="mt-2 font-sans text-[clamp(21px,2.2vw,26px)] font-semibold leading-[1.3] text-tx">
                    {service.title}
                  </h3>
                  <div className="my-4 flex flex-wrap gap-2.5 text-[13px]">
                    <span className="bg-ember/10 px-2 py-[3px] text-ember">{service.timeline}</span>
                    <span className="py-[3px] text-tx3">{service.price}</span>
                  </div>
                  <p className="text-[16px] leading-[1.85] text-tx2">{service.desc}</p>
                </div>
                <div className="px-[30px] pb-2 [&>div]:!border-b-0 [&>div]:!border-bd">
                <Disclosure
                  id={`optimize-service-${index + 1}`}
                  summary={
                    <span className="flex items-center justify-between gap-3 text-[14px] font-semibold text-ember">
                      交付成果
                    </span>
                  }
                >
                  <div>
                    <ul className="my-[22px] grid gap-[11px]">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.75] text-tx2">
                          <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 bg-ember" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-bd2 pt-5">
                      <p className="bg-ember/10 p-[18px] text-[15px] font-semibold leading-[1.75] text-ember">
                        {service.deliverable}
                      </p>
                    </div>
                  </div>
                </Disclosure>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-5 py-[80px] text-white md:px-10 md:py-[110px]">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal [text-wrap:balance]">
            不確定你的問題屬於哪一類？
          </h2>
          <p className="mx-auto mt-[18px] max-w-[520px] text-[clamp(17px,1.5vw,20px)] leading-[1.7] text-white/70">
            先聊聊。我們會花 30 分鐘聽你現在的狀況，告訴你是該做診斷還是可以直接進執行，不需要你先決定。
          </p>
          <div className="mt-[34px] flex flex-wrap items-center justify-center gap-3">
            <button onClick={open} className="cursor-pointer bg-gold px-[26px] py-[14px] text-[16px] font-semibold text-navy hover:bg-gold-l">
              聊聊你的產品 →
            </button>
            <Link href="/services" className="bg-white/15 px-[26px] py-[14px] text-[16px] font-semibold text-white hover:bg-white/25">
              回服務總覽 →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
