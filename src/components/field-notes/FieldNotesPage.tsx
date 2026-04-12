"use client";

import Image from "next/image";
import Link from "next/link";
import { useMessageBox } from "../MessageBox";
import {
  ACTIVITIES,
  FIELD_NOTES,
  MEDIA_MENTIONS,
  PARTNER_LOGOS,
} from "@/data/fieldNotes";

/**
 * FieldNotesPage — Portfolio / Activity page.
 * All slots render as gradient + icon placeholders until real assets land.
 * Designed so every slot can be individually upgraded by flipping `tbd: false`
 * and providing an image path in `/data/fieldNotes.ts`.
 */

const tagColor: Record<string, string> = {
  加盟展: "text-gold",
  論壇: "text-sky",
  商會活動: "text-ember",
  演講: "text-gold",
  客戶現場: "text-sky",
  訪談: "text-ember",
};

export function FieldNotesPage() {
  const { open } = useMessageBox();

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-navy pt-[130px] md:pt-[170px] pb-[70px] md:pb-[90px] px-5 md:px-10 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none animate-hero-glow-drift"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 25% 15%, rgba(212,168,92,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-7 text-[11px] font-medium tracking-[1px] text-white/50">
            <Link href="/" className="hover:text-gold transition-colors">首頁</Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/75">現場紀錄</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-px bg-gold" />
            <span className="text-[11.5px] font-semibold tracking-[2.5px] uppercase text-gold">
              現場紀錄 · FIELD NOTES
            </span>
          </div>

          <h1 className="font-heading text-[clamp(34px,5vw,60px)] text-white leading-[1.08] font-light tracking-[-0.8px] mb-6 max-w-[920px]">
            我們這個月
            <br />
            <span className="font-normal text-gold">在哪裡</span>
          </h1>
          <p className="text-[17px] md:text-[18px] text-white/65 max-w-[620px] font-light leading-[1.8] mb-12">
            活動、演講、客戶現場、媒體露出——北美和東南亞兩個主戰場的第一手紀錄。
            這些是正式文章裡不會寫、但對你來說可能最有用的細節。
          </p>

          {/* Stats strip */}
          <div className="border-t border-white/10 pt-7 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {[
              { n: String(ACTIVITIES.length), l: "場活動現場" },
              { n: String(FIELD_NOTES.length), l: "篇現場筆記" },
              { n: String(MEDIA_MENTIONS.length), l: "次媒體露出" },
              { n: String(PARTNER_LOGOS.length), l: "個合作單位" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-heading text-[24px] md:text-[28px] font-light text-gold leading-none tabular-nums">
                  {s.n}
                </div>
                <div className="text-[11px] md:text-[11.5px] text-white/50 mt-1.5 tracking-[0.5px]">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 1 · 活動與演講 ─── */}
      <section className="bg-white py-[80px] md:py-[100px] px-5 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="section-label">活動與演講</div>
          <h2 className="section-heading">
            我們去過、<span className="text-gold-d font-normal">講過、辦過的地方</span>
          </h2>
          <p className="section-desc">
            加盟展、論壇、商會活動、客戶現場——這些都是平常不會寫成正式內容的紀錄。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-10">
            {ACTIVITIES.map((a) => (
              <article
                key={a.id}
                className="group bg-white border border-bd hover:border-gold/40 hover:shadow-[0_8px_28px_rgba(18,38,63,0.08)] transition-all overflow-hidden"
              >
                {/* Image area — real photo or gradient placeholder */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-navy via-navy-l to-navy">
                  {a.image && !a.tbd ? (
                    <>
                      <Image
                        src={a.image}
                        alt={a.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent"
                      />
                    </>
                  ) : (
                    <>
                      <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,168,92,0.18) 0%, transparent 65%)",
                        }}
                      />
                      {/* Centered placeholder icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          width="44"
                          height="44"
                          viewBox="0 0 44 44"
                          fill="none"
                          className="text-gold/40"
                          aria-hidden="true"
                        >
                          <rect x="6" y="10" width="32" height="24" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                          <circle cx="22" cy="22" r="5" stroke="currentColor" strokeWidth="1.5" />
                          <circle cx="22" cy="22" r="2" fill="currentColor" opacity="0.5" />
                          <path d="M14 10L16 6H28L30 10" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </div>
                    </>
                  )}
                  {/* Tag badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className={`text-[10px] px-2 py-0.5 bg-white/95 font-semibold tracking-[1.5px] uppercase ${tagColor[a.tag] ?? "text-tx3"}`}
                    >
                      {a.tag}
                    </span>
                  </div>
                  {/* TBD marker */}
                  {a.tbd && (
                    <div className="absolute bottom-3 right-3">
                      <span className="text-[9px] tracking-[1.5px] uppercase text-white/40 font-medium">
                        待補
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-2 text-[11px] text-tx3 font-medium">
                    <span>{a.location}</span>
                    <span className="text-tx3/40">·</span>
                    <span>{a.date}</span>
                  </div>
                  <h3 className="text-[16.5px] md:text-[17px] font-semibold leading-tight text-tx mb-2">
                    {a.title}
                  </h3>
                  <p className="text-[14.5px] text-tx2 leading-[1.8] font-normal">
                    {a.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 2 · 現場筆記 ─── */}
      <section className="bg-cream py-[80px] md:py-[100px] px-5 md:px-10">
        <div className="max-w-[1000px] mx-auto">
          <div className="section-label">現場筆記</div>
          <h2 className="section-heading">
            飛回來之後，<span className="text-gold-d font-normal">馬上記下來的事</span>
          </h2>
          <p className="section-desc">
            短篇現場觀察，不是深度文章。適合你想快速抓一下某個市場的現況。
          </p>

          <div className="space-y-6 md:space-y-7 mt-10">
            {FIELD_NOTES.map((note) => (
              <article
                key={note.id}
                className="group bg-white border border-bd hover:border-gold/40 transition-all grid grid-cols-1 md:grid-cols-[1.2fr_2fr]"
              >
                {/* Placeholder image */}
                <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[220px] overflow-hidden bg-gradient-to-br from-navy via-navy-l to-navy">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse 70% 50% at 40% 40%, rgba(212,168,92,0.2) 0%, transparent 60%)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      className="text-gold/40"
                      aria-hidden="true"
                    >
                      <path
                        d="M24 4C14 4 8 14 8 22C8 32 24 44 24 44C24 44 40 32 40 22C40 14 34 4 24 4Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <circle cx="24" cy="22" r="5" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  </div>
                  {note.tbd && (
                    <div className="absolute bottom-3 right-3">
                      <span className="text-[9px] tracking-[1.5px] uppercase text-white/40 font-medium">
                        待補
                      </span>
                    </div>
                  )}
                </div>

                {/* Text body */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] font-semibold tracking-[1.5px] uppercase text-gold-d">
                      📍 {note.location}
                    </span>
                    <span className="text-tx3/40">·</span>
                    <span className="text-[11px] text-tx3 font-medium">{note.date}</span>
                  </div>
                  <h3 className="text-[20px] md:text-[22px] font-semibold leading-tight text-tx mb-3">
                    {note.title}
                  </h3>
                  <p className="text-[15px] md:text-[15.5px] text-tx2 leading-[1.85] font-normal">
                    {note.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 3 · 媒體露出 ─── */}
      <section className="bg-white py-[72px] md:py-[96px] px-5 md:px-10">
        <div className="max-w-[1000px] mx-auto">
          <div className="section-label">媒體露出</div>
          <h2 className="section-heading">
            別人<span className="text-gold-d font-normal">怎麼說我們</span>
          </h2>

          <div className="border-t border-bd mt-10">
            {MEDIA_MENTIONS.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between gap-4 py-5 md:py-6 border-b border-bd"
              >
                <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
                  {/* Logo placeholder */}
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-cream border border-bd/60 flex items-center justify-center shrink-0">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      className="text-tx3/50"
                      aria-hidden="true"
                    >
                      <rect x="2" y="4" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M2 9H20" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-gold-d mb-1">
                      {m.outlet}
                    </div>
                    <div className="text-[15.5px] md:text-[16.5px] font-semibold text-tx leading-tight mb-1 truncate">
                      {m.title}
                    </div>
                    <div className="text-[11.5px] text-tx3">{m.date}</div>
                  </div>
                </div>
                {m.tbd ? (
                  <span className="text-[10px] tracking-[1.5px] uppercase text-tx3/50 font-medium shrink-0">
                    待補
                  </span>
                ) : (
                  <a
                    href={m.href ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14.5px] font-semibold text-gold-d hover:text-gold transition-colors shrink-0"
                  >
                    看報導 →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 4 · 合作單位 ─── */}
      <section className="bg-cream py-[72px] md:py-[96px] px-5 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="section-label">合作單位</div>
          <h2 className="section-heading">
            一起做事的<span className="text-gold-d font-normal">夥伴網絡</span>
          </h2>
          <p className="section-desc">
            商會、顧問、物流、通路、協會、政府——我們的路不是自己一個人走的。
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-10">
            {PARTNER_LOGOS.map((p) => (
              <div
                key={p.id}
                className="aspect-[3/2] bg-white border border-bd/60 flex flex-col items-center justify-center text-center p-4 transition-all hover:border-gold/40"
              >
                {/* Logo placeholder icon */}
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="text-tx3/40 mb-2"
                  aria-hidden="true"
                >
                  <rect x="4" y="8" width="24" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10 14L22 14M10 18L22 18M10 22L16 22" stroke="currentColor" strokeWidth="1" />
                </svg>
                <div className="text-[11px] font-semibold text-tx2 leading-tight">
                  {p.name}
                </div>
                <div className="text-[9.5px] text-tx3/60 tracking-[1px] uppercase mt-1">
                  {p.type}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-navy py-[72px] md:py-[96px] px-5 md:px-10">
        <div className="max-w-[720px] mx-auto text-center">
          <h2 className="font-sans text-[clamp(24px,3.2vw,36px)] text-white leading-[1.25] font-light tracking-[-0.4px] mb-4">
            想知道我們下個月在哪？
          </h2>
          <p className="text-[16px] text-white/60 leading-[1.8] mb-10 max-w-[520px] mx-auto">
            如果你在考慮北美或東南亞、剛好碰上我們的行程，可以約一杯咖啡。
          </p>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <button
              onClick={open}
              className="bg-gold text-navy px-8 py-[14px] rounded-none text-[15.5px] font-semibold tracking-[0.5px] transition-all hover:bg-gold-l cursor-pointer"
            >
              聊聊你的狀況 →
            </button>
            <Link
              href="/contact#partners"
              className="group inline-flex items-center gap-2 text-white/75 text-[15.5px] font-medium transition-colors hover:text-white"
            >
              <span className="border-b border-white/30 pb-0.5 group-hover:border-white transition-colors">
                我是合作夥伴
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
