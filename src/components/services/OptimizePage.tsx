"use client";

import Image from "next/image";
import Link from "next/link";
import { useMessageBox } from "../MessageBox";

/**
 * OptimizePage — dedicated page for clients who are already overseas
 * and want to improve performance. Previously a section inside /services.
 * Now a standalone /services/optimize route with deeper content.
 */

const painPoints = [
  {
    icon: "📦",
    title: "物流成本吃掉毛利",
    signs: [
      "海運報價每半年漲一次，你沒有議價籌碼",
      "倉儲費用不透明，月結單看不懂",
      "退貨物流成本比正品物流還高",
    ],
    fix: "我們會重新盤點你的物流結構，從運輸方式、倉儲位置、退貨處理三個層面優化。通常可省 12–25%。",
  },
  {
    icon: "📉",
    title: "通路績效起伏大",
    signs: [
      "銷量看天吃飯，節慶暴增、平常低迷",
      "廣告關了就沒單，自然流量難以累積",
      "review 品質不穩定，退貨率偏高",
    ],
    fix: "我們會做通路健診，檢視 listing、定價、運營節奏、競品動態，給你一份可執行的改善計畫。",
  },
  {
    icon: "⚙️",
    title: "營運流程卡卡",
    signs: [
      "跨時區溝通成本高，一件事要來回好幾天",
      "在地團隊與台灣總部經常對不上",
      "SOP 散落在各處，新人接手要學一個月",
    ],
    fix: "我們會重整你的溝通流程、會議節奏、文件結構，必要時幫你招募 country manager。",
  },
];

const services = [
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
];

export function OptimizePage() {
  const { open } = useMessageBox();

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-navy pt-[140px] md:pt-[180px] pb-[80px] md:pb-[100px] px-5 md:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/services/services-optimize-whiteboard.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.18]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/60 to-navy" />
        </div>

        <div className="relative max-w-[1000px] mx-auto">
          <nav className="flex items-center gap-2 text-[12px] text-white/50 mb-6">
            <Link href="/services" className="hover:text-white transition-colors">
              服務
            </Link>
            <span>/</span>
            <span className="text-white/80">進階優化</span>
          </nav>

          <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-ember mb-3">
            進階方案 · 已經在海外
          </div>
          <h1 className="font-heading text-[clamp(32px,5vw,56px)] text-white leading-[1.1] font-light tracking-[-0.8px] mb-5">
            已經跑起來了，
            <br />
            該讓每公里<span className="text-ember font-normal">更省</span>
          </h1>
          <p className="text-[17px] md:text-[19px] text-white/75 max-w-[680px] leading-[1.6] font-light">
            產品在海外已經賣得動，但總覺得利潤被吃掉、效率上不去、決策像在猜。
            這個階段不需要從零開始——我們幫你把既有的營運診斷、優化、重整。
          </p>
        </div>
      </section>

      {/* ─── Pain points ─── */}
      <section className="bg-white py-[80px] md:py-[100px] px-5 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="section-label">常見的狀況</div>
          <h2 className="section-heading">
            你是不是也遇到<span className="text-ember font-normal">這些問題</span>？
          </h2>
          <p className="section-desc">
            如果你對下列任何一個場景點頭，這頁就是為你寫的。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            {painPoints.map((p) => (
              <div
                key={p.title}
                className="p-6 md:p-7 bg-cream rounded-none border-l-4 border-ember/40"
              >
                <div className="text-[28px] mb-3">{p.icon}</div>
                <h3 className="text-[17px] font-semibold mb-4">{p.title}</h3>
                <ul className="space-y-2 mb-5">
                  {p.signs.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2 text-[13px] text-tx2 leading-[1.65]"
                    >
                      <span className="w-1 h-1 rounded-full bg-ember/60 mt-[8px] shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-bd/60">
                  <div className="text-[10.5px] font-semibold tracking-[1px] uppercase text-ember mb-1.5">
                    怎麼解
                  </div>
                  <p className="text-[12.5px] text-tx2 leading-[1.7]">{p.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section className="bg-cream py-[80px] md:py-[100px] px-5 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="section-label">兩種切入方式</div>
          <h2 className="section-heading">
            診斷為先，<span className="text-ember font-normal">執行為後</span>
          </h2>
          <p className="section-desc">
            你可以只做診斷，了解問題在哪；也可以直接進入執行。兩者都可以，順序不能顛倒。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {services.map((svc, i) => (
              <div
                key={svc.title}
                className="p-7 md:p-9 bg-white rounded-none border-l-4 border-ember"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-sans text-[18px] font-light text-ember tabular-nums">
                    0{i + 1}
                  </span>
                  <h3 className="text-[19px] font-semibold">{svc.title}</h3>
                </div>
                <div className="flex items-center gap-4 mb-4 text-[11px] font-medium tracking-wider uppercase">
                  <span className="text-ember bg-[rgba(217,139,74,0.08)] px-2.5 py-1">
                    {svc.timeline}
                  </span>
                  <span className="text-tx3">{svc.price}</span>
                </div>
                <p className="text-[14px] text-tx2 leading-[1.75] mb-5">{svc.desc}</p>
                <ul className="space-y-2.5 mb-6">
                  {svc.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[13.5px] text-tx2 leading-[1.7]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-ember mt-[7px] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-5 border-t border-bd/60">
                  <div className="text-[10.5px] font-semibold tracking-[1px] uppercase text-tx3 mb-1.5">
                    交付成果
                  </div>
                  <p className="text-[13px] text-ember font-medium">{svc.deliverable}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-navy py-[80px] md:py-[100px] px-5 md:px-10">
        <div className="max-w-[720px] mx-auto text-center">
          <h2 className="font-sans text-[clamp(26px,3.2vw,38px)] text-white leading-[1.2] font-light tracking-[-0.4px] mb-4">
            不確定你的問題屬於哪一類？
          </h2>
          <p className="text-[15px] text-white/60 leading-[1.75] mb-10 max-w-[520px] mx-auto">
            先聊聊。我們會花 30 分鐘聽你現在的狀況，
            告訴你是該做診斷還是可以直接進執行，不需要你先決定。
          </p>
          <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap">
            <button
              onClick={open}
              className="bg-gold text-navy px-9 py-[15px] rounded-none text-[14px] font-semibold tracking-[0.5px] transition-all hover:bg-gold-l cursor-pointer"
            >
              聊聊你的產品 →
            </button>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-white/75 text-[14px] font-medium transition-colors hover:text-white"
            >
              <span className="border-b border-white/30 pb-0.5 group-hover:border-white transition-colors">
                回服務總覽
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
