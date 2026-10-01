import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { InsightArticleCard } from "@/components/insights/InsightArticleCard";
import { toInsightCard } from "@/lib/articles/presentation";
import { getPublishedArticles } from "@/lib/articles/published";

export function AaronAuthorPage() {
  const authorArticles = getPublishedArticles().map(toInsightCard);

  return (
    <>
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop
          src="/images/about/author-hero-port-1600.webp"
          srcSet="/images/about/author-hero-port-640.webp 640w, /images/about/author-hero-port-1080.webp 1080w, /images/about/author-hero-port-1600.webp 1600w, /images/about/author-hero-port-2400.webp 2400w"
          position="60% 50%"
        />
        <div className="lufe-container lufe-hero-content pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60">
            <Link href="/" className="hover:text-white">首頁</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <Link href="/about" className="hover:text-white">關於我們</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span className="text-white/75">Aaron Yu</span>
          </nav>
          <h1 className="display mb-5 max-w-[620px] font-sans text-white">Aaron Yu</h1>
          <p className="mb-3 text-[17px] font-medium text-gold md:text-[18px]">鹿飛 LUFÉ 創辦人・來自躍馬企業</p>
          <p className="mb-8 max-w-[500px] text-[17px] leading-[1.8] text-white/70">看了很多年貨櫃出去，決定去接貨到了之後的事。</p>
          <a href="https://www.linkedin.com/in/wibp/" target="_blank" rel="me noopener" className="inline-flex border-b border-gold pb-1 text-[15px] font-medium text-gold hover:text-gold-l">LinkedIn ↗</a>
        </div>
      </section>

      <section className="bg-white pb-[80px] pt-[60px] md:pb-[110px] md:pt-[80px]">
        <div className="lufe-container">
          <h2 className="h2 mb-10">Aaron 寫的文章</h2>
          <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {authorArticles.map((article) => <InsightArticleCard key={article.slug} article={article} />)}
          </div>
        </div>
      </section>
    </>
  );
}
