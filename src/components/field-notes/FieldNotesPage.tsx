"use client";

import Image from "next/image";
import Link from "next/link";
import { useMessageBox } from "../MessageBox";
import { ACTIVITIES, FIELD_NOTES, MEDIA_MENTIONS, PARTNER_LOGOS } from "@/data/fieldNotes";

const tagColor: Record<string, string> = {
  加盟展: "text-gold-d",
  論壇: "text-sky",
  商會活動: "text-ember",
  演講: "text-gold-d",
  客戶現場: "text-sky",
  訪談: "text-ember",
};

function PlaceholderMark() {
  return <span aria-hidden="true" className="h-8 w-8 border border-current opacity-40" />;
}

export function FieldNotesPage() {
  const { open } = useMessageBox();

  return (
    <>
      <section className="relative overflow-hidden bg-navy px-5 pb-[70px] pt-[130px] text-white md:px-10 md:pb-[90px] md:pt-[170px]">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 50% at 25% 15%, rgba(212,168,92,0.12) 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[1200px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60">
            <Link href="/" className="hover:text-white">首頁</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span className="text-white/75">現場紀錄</span>
          </nav>

          <h1 className="display mb-6 max-w-[920px] font-sans text-white">
            我們這個月
            <br />
            <span className="text-gold">在哪裡</span>
          </h1>
          <p className="lead mb-12 max-w-[620px] text-white/70">
            活動、演講、客戶現場、媒體露出——北美和東南亞兩個主戰場的第一手紀錄。
            <br />
            這些是正式文章裡不會寫、但對你來說可能最有用的細節。
          </p>

          <div className="grid grid-cols-2 gap-5 border-t border-white/10 pt-7 md:grid-cols-4 md:gap-8">
            {[
              { n: String(ACTIVITIES.length), l: "場活動現場" },
              { n: String(FIELD_NOTES.length), l: "篇現場筆記" },
              { n: String(MEDIA_MENTIONS.length), l: "次媒體露出" },
              { n: String(PARTNER_LOGOS.length), l: "個合作單位" },
            ].map((stat) => (
              <div key={stat.l} className="min-w-0">
                <div className="num text-[clamp(24px,3vw,32px)] leading-none text-gold">{stat.n}</div>
                <div className="mt-1.5 text-[11px] tracking-[0.5px] text-white/50 md:text-[11.5px]">{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-[80px] md:px-10 md:py-[110px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="h2 max-w-[800px] text-tx">
            我們去過、
            <br />
            <span className="text-gold-d">講過、辦過的地方</span>
          </h2>
          <p className="lead mt-5 max-w-[620px]">加盟展、論壇、商會活動、客戶現場——這些都是平常不會寫成正式內容的紀錄。</p>

          <div className="mt-10 grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {ACTIVITIES.map((activity) => (
              <article key={activity.id} className="min-w-0 overflow-hidden border border-bd bg-white hover:border-gold/60">
                <div className="relative aspect-[16/10] overflow-hidden bg-navy text-gold">
                  {activity.image && !activity.tbd ? (
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlaceholderMark />
                    </div>
                  )}
                  <span className={`absolute left-3 top-3 bg-white/95 px-2 py-0.5 text-[10px] font-semibold tracking-[1.5px] ${tagColor[activity.tag] ?? "text-tx3"}`}>
                    {activity.tag}
                  </span>
                  {activity.tbd ? <span className="absolute bottom-3 right-3 text-[10px] tracking-[1.5px] text-white/60">待補</span> : null}
                </div>
                <div className="min-w-0 p-5 md:p-6">
                  <p className="mb-2 text-[11px] font-medium text-tx3">
                    {activity.location}　·　{activity.date}
                  </p>
                  <h3 className="h3 mb-2 text-tx">{activity.title}</h3>
                  <p className="text-[14.5px] leading-[1.8] text-tx2">{activity.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-[80px] md:px-10 md:py-[110px]">
        <div className="mx-auto max-w-[1040px]">
          <h2 className="h2 max-w-[800px] text-tx">
            飛回來之後，<span className="text-gold-d">馬上記下來的事</span>
          </h2>
          <p className="lead mt-5 max-w-[620px]">短篇現場觀察，不是深度文章。適合你想快速抓一下某個市場的現況。</p>

          <div className="mt-10 space-y-6 md:space-y-7">
            {FIELD_NOTES.map((note) => (
              <article key={note.id} className="grid min-w-0 grid-cols-1 border border-bd bg-white md:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-navy text-gold md:aspect-auto md:min-h-[220px]">
                  <PlaceholderMark />
                  {note.tbd ? <span className="absolute bottom-3 right-3 text-[10px] tracking-[1.5px] text-white/60">待補</span> : null}
                </div>
                <div className="min-w-0 p-6 md:flex md:flex-col md:justify-center md:p-8">
                  <p className="mb-3 text-[11px] font-semibold tracking-[1.5px] text-gold-d">
                    📍 {note.location}　·　<span className="font-medium tracking-normal text-tx3">{note.date}</span>
                  </p>
                  <h3 className="h3 mb-3 text-tx">{note.title}</h3>
                  <p className="text-[15px] leading-[1.85] text-tx2 md:text-[15.5px]">{note.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-[72px] md:px-10 md:py-[96px]">
        <div className="mx-auto max-w-[1040px]">
          <h2 className="h2 text-tx">別人<span className="text-gold-d">怎麼說我們</span></h2>

          <div className="mt-10 border-t border-bd">
            {MEDIA_MENTIONS.map((mention) => (
              <div key={mention.id} className="flex min-w-0 items-center justify-between gap-4 border-b border-bd py-5 md:py-6">
                <div className="flex min-w-0 items-center gap-4 md:gap-6">
                  <div aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center border border-bd bg-cream text-tx3 md:h-16 md:w-16">
                    <PlaceholderMark />
                  </div>
                  <div className="min-w-0">
                    <p className="mb-1 text-[11px] font-semibold tracking-[1.5px] text-gold-d">{mention.outlet}</p>
                    <p className="mb-1 text-[15.5px] font-semibold leading-tight text-tx md:text-[16.5px]">{mention.title}</p>
                    <p className="text-[11.5px] text-tx3">{mention.date}</p>
                  </div>
                </div>
                {mention.tbd ? (
                  <span className="shrink-0 text-[10px] font-medium tracking-[1.5px] text-tx3/50">待補</span>
                ) : (
                  <a href={mention.href ?? "#"} target="_blank" rel="noopener noreferrer" className="shrink-0 text-[14.5px] font-semibold text-gold-d hover:text-gold">
                    看報導 →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-[72px] md:px-10 md:py-[96px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="h2 text-tx">一起做事的<span className="text-gold-d">夥伴網絡</span></h2>
          <p className="lead mt-5 max-w-[620px]">商會、顧問、物流、通路、協會、政府——我們的路不是自己一個人走的。</p>

          <div className="mt-10 grid min-w-0 grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {PARTNER_LOGOS.map((partner) => (
              <div key={partner.id} className="flex aspect-[3/2] min-w-0 flex-col items-center justify-center border border-bd bg-white p-4 text-center text-tx3">
                <PlaceholderMark />
                <p className="mt-2 text-[11px] font-semibold leading-tight text-tx2">{partner.name}</p>
                <p className="mt-1 text-[9.5px] tracking-[1px] text-tx3/60">{partner.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-5 py-[72px] text-white md:px-10 md:py-[96px]">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="h2 mb-4 text-white">想知道我們下個月在哪？</h2>
          <p className="lead mx-auto mb-10 max-w-[520px] text-white/70">如果你在考慮北美或東南亞、剛好碰上我們的行程，可以約一杯咖啡。</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button onClick={open} className="cursor-pointer bg-gold px-8 py-3.5 text-[15.5px] font-semibold text-navy hover:bg-gold-l">
              聊聊你的狀況 →
            </button>
            <Link href="/contact#partners" className="inline-flex items-center gap-2 text-[15.5px] font-medium text-white/75 hover:text-white">
              <span className="border-b border-white/30 pb-0.5">我是合作夥伴</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
