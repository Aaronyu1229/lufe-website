"use client";

import Link from "next/link";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import { useMessageBox } from "../MessageBox";
import { ACTIVITIES, FIELD_NOTES } from "@/data/fieldNotes";

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
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src="/images/field-notes/activity-forum-1600.webp" video={HERO_VIDEOS.fieldNotes} />
        <div className="lufe-container lufe-hero-content pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60">
            <Link href="/" className="hover:text-white">首頁</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span className="text-white/75">現場紀錄</span>
          </nav>

          <h1 className="h1 mb-6 max-w-[880px] font-sans text-white">
            我們這個月
            <br />
            <span className="text-gold">在哪裡</span>
          </h1>
          <p className="lead max-w-[640px] !text-white/75">
            活動、演講、客戶現場、媒體露出——北美和東南亞兩個主戰場的第一手紀錄。
            <br />
            這些是正式文章裡不會寫、但對你來說可能最有用的細節
          </p>
        </div>
        <ScrollCue />
      </section>

      <section className="bg-white py-[80px] md:py-[110px]">
        <div className="lufe-container">
          <h2 className="h2 max-w-[800px] text-tx">
            我們去過、
            <br />
            <span className="text-gold-d">講過、辦過的地方</span>
          </h2>
          <p className="lead mt-5 max-w-[620px]">加盟展、論壇、商會活動、客戶現場——這些都是平常不會寫成正式內容的紀錄</p>

          <div className="mt-10 grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {ACTIVITIES.map((activity) => (
              <article key={activity.id} className="lufe-card min-w-0 overflow-hidden border border-bd bg-white hover:border-gold/60">
                <div className="relative aspect-[16/10] overflow-hidden bg-navy text-gold">
                  {activity.image && !activity.tbd ? (
                    <TieredImage
                      src={activity.image}
                      alt={activity.title}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      className="absolute inset-0 h-full w-full object-cover"
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

      <section className="bg-cream py-[80px] md:py-[110px]">
        <div className="lufe-container">
          <h2 className="h2 max-w-[800px] text-tx">
            飛回來之後，<span className="text-gold-d">馬上記下來的事</span>
          </h2>
          <p className="lead mt-5 max-w-[620px]">短篇現場觀察，不是深度文章。適合你想快速抓一下某個市場的現況</p>

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

      <section className="bg-navy py-[72px] text-white md:py-[96px]">
        <div className="lufe-container"><div className="mx-auto max-w-[720px] text-center">
          <h2 className="h2 mb-4 text-white">想知道我們下個月在哪？</h2>
          <p className="lead mx-auto mb-10 max-w-[520px] text-white/70">如果你在考慮北美或東南亞、剛好碰上我們的行程，可以約一杯咖啡</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button onClick={open} className="cursor-pointer bg-gold px-8 py-3.5 text-[15.5px] font-semibold text-navy hover:bg-gold-l">
              聊聊你的狀況 →
            </button>
            <Link href="/contact" className="inline-flex items-center gap-2 text-[15.5px] font-medium text-white/75 hover:text-white">
              <span className="border-b border-white/30 pb-0.5">我是合作夥伴</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div></div>
      </section>
    </>
  );
}
