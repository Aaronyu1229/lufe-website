import Image from "next/image";
import Link from "next/link";

import { Disclosure } from "@/components/ui";
import type { Chapter, ChapterSection, PhilippinesChapterKey } from "@/data/chapters";

import { ChapterBar } from "./ChapterBar";
import { ContactButton } from "./ContactButton";
import { NextChapter } from "./NextChapter";
import { RelatedReading } from "./RelatedReading";
import { WaitlistForm } from "./WaitlistForm";

function ChatAction({ children, className }: { readonly children: string; readonly className: string }) {
  return <ContactButton className={className}>{children}</ContactButton>;
}

function ChapterHero({ chapter }: { readonly chapter: Chapter }) {
  const actionClass = "inline-flex cursor-pointer items-center justify-center bg-gold px-6 py-3.5 text-[15px] font-semibold text-navy hover:bg-gold-l";

  return (
    <>
      <section className="border-b border-navy-l bg-navy px-5 py-[108px] text-white md:px-10 md:py-[132px]">
        <div className="mx-auto grid max-w-[1100px] min-w-0 grid-cols-1 items-stretch gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] md:gap-12">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="mb-7 text-[13px] text-white/55">
              <Link href="/" className="hover:text-white">首頁</Link>
              <span className="mx-2 text-white/30">/</span>
              <Link href="/services" className="hover:text-white">服務</Link>
              <span className="mx-2 text-white/30">/</span>
              <span className="text-white/80">{chapter.label}</span>
            </nav>
            {chapter.key === "after" ? <p className="mb-4 inline-block border border-gold bg-gold px-2.5 py-1 text-[12px] font-semibold text-navy">2027 Q1 首批・登記中</p> : null}
            <p className="mb-4 text-[14px] font-medium text-gold">{chapter.label}</p>
            <h1 className="h1 max-w-[650px] text-white">{chapter.title}</h1>
            <p className="lead mt-5 max-w-[620px] whitespace-pre-line !text-white/75">{chapter.scene}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {chapter.key === "after" ? <Link href="#waitlist" className={actionClass}>{chapter.heroAction}</Link> : <ChatAction className={actionClass}>{chapter.heroAction}</ChatAction>}
              {chapter.key === "m1" ? <Link href="/assess" className="inline-flex items-center justify-center border border-white/40 px-6 py-3.5 text-[15px] font-medium text-white hover:border-white">先做 2 分鐘處境比對</Link> : null}
            </div>
          </div>
          <div className="relative min-h-[240px] overflow-hidden border border-white/15 md:min-h-full">
            <Image src={chapter.image} alt={chapter.imageAlt} fill priority sizes="(max-width: 767px) 100vw, 42vw" className="object-cover" />
          </div>
        </div>
      </section>
      {!chapter.showChapterBar ? <div className="border-b border-bd bg-cream px-5 py-4 text-[14px] leading-[1.8] text-tx2 md:px-10"><p className="mx-auto max-w-[1100px]"><strong className="text-tx">另一個故事。</strong> 這一頁跟菲律賓的四章是兩個故事。北美由北美團隊執行，鹿飛負責合約與進度。</p></div> : null}
    </>
  );
}

function Scenarios({ chapter }: { readonly chapter: Chapter }) {
  return (
    <section className="bg-white px-5 py-[72px] md:px-10 md:py-[88px]">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="h2 mb-8 text-tx">你可能是這樣走到這裡的</h2>
        <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-3">
          {chapter.scenarios.map((scenario) => <p key={scenario} className="border border-bd bg-cream p-5 text-[15.5px] leading-[1.8] text-tx2">{scenario}</p>)}
        </div>
      </div>
    </section>
  );
}

function ChapterSectionContent({ section }: { readonly section: ChapterSection }) {
  switch (section.type) {
    case "steps":
      return <section className="bg-cream px-5 py-[72px] md:px-10 md:py-[88px]"><div className="mx-auto max-w-[1100px]"><h2 className="h2 mb-8 text-tx">{section.heading}</h2><div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">{section.items.map((item) => <article key={item.number} className="border border-bd bg-white p-5 md:p-6"><span className="text-[13px] font-semibold text-gold-d">{item.number}</span><h3 className="h3 mt-3 text-tx">{item.title}</h3><p className="mt-3 whitespace-pre-line text-[15px] leading-[1.8] text-tx2">{item.body}</p></article>)}</div></div></section>;
    case "report":
      return <section className="bg-white px-5 py-[72px] md:px-10 md:py-[88px]"><div className="mx-auto grid max-w-[960px] min-w-0 grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12"><div aria-hidden="true" className="border border-bd bg-cream p-5 text-tx2"><p className="border-b border-bd pb-3 text-[12px] font-semibold">品測報告 · 產品 A</p>{["誰會買", "多少錢會買", "為什麼不買"].map((label) => <div key={label} className="border-b border-bd py-4"><p className="text-[13px] font-semibold">{label}</p><div className="mt-2 h-2 w-4/5 bg-sky/30" /><div className="mt-2 h-2 w-3/5 bg-gold/30" /></div>)}</div><div><h2 className="h2 text-tx">{section.heading}</h2><ul className="mt-6 grid gap-3">{section.items.map((item) => <li key={item} className="border-l-4 border-gold bg-cream px-4 py-3 text-[15px] leading-[1.7] text-tx2">{item}</li>)}</ul><p className="mt-6 text-[16px] leading-[1.8] text-tx">{section.ending}</p></div></div></section>;
    case "price":
      return <section className="bg-cream px-5 py-[72px] md:px-10 md:py-[88px]"><div className="mx-auto grid max-w-[960px] min-w-0 grid-cols-1 gap-7 border border-navy-l bg-navy p-6 text-white md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:p-9"><div><h2 className="h2 text-gold">{section.title}</h2>{section.caption ? <p className="mt-3 text-[15px] leading-[1.7] text-white/70">{section.caption}</p> : null}</div><div className="space-y-4">{section.details.map((detail) => <p key={detail} className="whitespace-pre-line text-[15px] leading-[1.8] text-white/80">{detail}</p>)}{section.paths ? <div className="grid gap-3 border-t border-white/15 pt-4">{section.paths.map((path) => <p key={path.label} className={`p-4 text-[14.5px] leading-[1.75] ${path.dark ? "bg-white/10 text-white" : "bg-white text-tx2"}`}><strong className={path.dark ? "text-gold" : "text-tx"}>{path.label}</strong> {path.body}</p>)}</div> : null}</div></div></section>;
    case "tracks":
      return <section className="bg-cream px-5 py-[72px] md:px-10 md:py-[88px]"><div className="mx-auto max-w-[1100px]"><h2 className="h2 mb-8 text-tx">{section.heading}</h2><div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]"><article className="border border-bd bg-white p-6"><h3 className="h3 text-tx">證那一軌（你看不到，但在動）</h3><p className="mt-4 text-[15px] leading-[1.8] text-tx2">{section.passive}</p></article><article className="border border-sky/40 bg-white p-6"><h3 className="h3 text-tx">我們這一軌（每週有事發生）</h3><div className="mt-5 divide-y divide-bd">{section.active.map((item) => <div key={item.label} className="grid gap-2 py-4 md:grid-cols-[110px_1fr]"><strong className="text-[14px] text-sky">{item.label}</strong><p className="text-[15px] leading-[1.75] text-tx2">{item.body}</p></div>)}</div></article></div></div></section>;
    case "cards":
      return <section className="bg-white px-5 py-[72px] md:px-10 md:py-[88px]"><div className="mx-auto max-w-[1100px]"><h2 className="h2 mb-8 text-tx">{section.heading}</h2><div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-3">{section.items.map((item) => <article key={item.title} className="border border-bd bg-cream p-5"><h3 className="h3 text-tx">{item.title}</h3><p className="mt-3 whitespace-pre-line text-[15px] leading-[1.8] text-tx2">{item.body}</p>{item.fit ? <p className="mt-4 border-t border-bd pt-4 text-[14px] font-medium leading-[1.7] text-tx">{item.fit}</p> : null}</article>)}</div>{section.ending ? <p className="mt-7 whitespace-pre-line border-l-4 border-sky bg-cream px-5 py-4 text-[16px] leading-[1.8] text-tx">{section.ending}</p> : null}</div></section>;
    case "table":
      return <section className="bg-cream px-5 py-[72px] md:px-10 md:py-[88px]"><div className="mx-auto max-w-[960px]"><h2 className="h2 mb-8 text-tx">{section.heading}</h2><div className="overflow-x-auto border border-bd"><table className="min-w-[640px] w-full border-collapse bg-white text-left"><thead className="border-b border-bd bg-navy text-white"><tr><th className="p-4 text-[14px]">要處理的事</th><th className="p-4 text-[14px]">誰在當地</th></tr></thead><tbody>{section.rows.map((row) => <tr key={row.task} className={`border-b border-bd last:border-0 ${row.isYou ? "bg-gold/15" : ""}`}><td className="p-4 text-[15px] font-medium text-tx">{row.task}</td><td className="p-4 text-[15px] leading-[1.75] text-tx2">{row.owner}</td></tr>)}</tbody></table></div></div></section>;
    case "dark-copy":
      return <section className="bg-navy px-5 py-[72px] text-white md:px-10 md:py-[88px]"><div className="mx-auto max-w-[900px]"><h2 className="h2 text-white">{section.heading}</h2><div className="mt-6 grid gap-4">{section.paragraphs.map((paragraph) => <p key={paragraph} className="text-[16px] leading-[1.9] text-white/75">{paragraph}</p>)}</div></div></section>;
    case "callout":
      return <section className="bg-white px-5 py-[72px] md:px-10 md:py-[88px]"><div className="mx-auto max-w-[960px]"><h2 className="h2 mb-7 text-tx">{section.heading}</h2><p className="whitespace-pre-line border-l-4 border-sky bg-cream px-5 py-5 text-[17px] leading-[1.85] text-tx">{section.body}</p></div></section>;
    case "two-cards":
      return <section className="bg-white px-5 py-[72px] md:px-10 md:py-[88px]"><div className="mx-auto max-w-[960px]"><h2 className="h2 mb-8 text-tx">{section.heading}</h2><div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">{section.items.map((item) => <article key={item.title} className="border-l-4 border-sky bg-cream p-6"><h3 className="h3 text-tx">{item.title}</h3><p className="mt-3 text-[16px] leading-[1.8] text-tx2">{item.body}</p></article>)}</div></div></section>;
    case "link-card":
      return <section className="bg-cream px-5 py-[40px] md:px-10"><div className="mx-auto max-w-[960px]"><Link href={section.href} className="flex items-center justify-between gap-5 border border-bd bg-white p-6 hover:border-gold"><div><p className="text-[14px] text-sky">{section.label}</p><h2 className="h3 mt-2 text-tx">{section.heading}</h2></div><span aria-hidden="true" className="text-[28px] text-gold-d">→</span></Link></div></section>;
    case "waitlist":
      return <section id="waitlist" className="scroll-mt-[100px] bg-cream px-5 py-[72px] md:px-10 md:py-[88px]"><div className="mx-auto grid max-w-[960px] min-w-0 grid-cols-1 gap-8 border border-bd bg-white p-6 md:grid-cols-2 md:p-9"><div><p className="inline-block bg-gold px-2.5 py-1 text-[12px] font-semibold text-navy">登記中</p><h2 className="h2 mt-4 text-tx">2027 Q1 開放首批客戶</h2><p className="mt-4 text-[16px] leading-[1.8] text-tx2">現在登記，開放時優先。報價區間第一次談就給。</p></div><WaitlistForm /></div></section>;
  }
}

export async function ChapterPage({ chapter }: { readonly chapter: Chapter }) {
  const relatedReading = await RelatedReading({ chapter: chapter.key });

  return (
    <>
      <ChapterHero chapter={chapter} />
      {chapter.showChapterBar ? <ChapterBar current={chapter.key as PhilippinesChapterKey} /> : null}
      <Scenarios chapter={chapter} />
      {chapter.sections.map((section, index) => <ChapterSectionContent key={`${section.type}-${index}`} section={section} />)}
      {chapter.faqs.length > 0 ? <section className="bg-white px-5 py-[72px] md:px-10 md:py-[88px]"><div className="mx-auto max-w-[860px]"><h2 className="h2 mb-6 text-tx">常見問題</h2><div className="border-b border-bd">{chapter.faqs.map((faq, index) => <Disclosure key={faq.question} id={`${chapter.key}-faq-${index + 1}`} defaultOpen={index === 0} summary={<span><span aria-hidden="true" className="mr-4 text-[13px] font-semibold text-gold-d">{String(index + 1).padStart(2, "0")}</span>{faq.question}</span>}><p className="text-[15.5px] leading-[1.85] text-tx2">{faq.answer}</p></Disclosure>)}</div></div></section> : null}
      {relatedReading}
      <NextChapter chapter={chapter} />
      <section className="bg-navy px-5 py-[78px] text-white md:px-10 md:py-[96px]"><div className="mx-auto max-w-[720px] text-center"><h2 className="h2 text-white">{chapter.cta.title}</h2><p className="mt-4 whitespace-pre-line text-[16px] leading-[1.85] text-white/70">{chapter.cta.body}</p><div className="mt-8">{chapter.cta.href ? <Link href={chapter.cta.href} className="inline-flex items-center justify-center bg-gold px-7 py-3.5 text-[16px] font-semibold text-navy hover:bg-gold-l">{chapter.cta.action}</Link> : <ChatAction className="bg-gold px-7 py-3.5 text-[16px] font-semibold text-navy hover:bg-gold-l">{chapter.cta.action}</ChatAction>}</div></div></section>
    </>
  );
}
