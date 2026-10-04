import Link from "next/link";

export default function EnglishNotFound() {
  return (
    <section className="bg-cream py-40" aria-labelledby="not-found-title">
      <div className="lufe-container max-w-[720px]">
        <p className="eyebrow mb-4">404</p>
        <h1 id="not-found-title" className="h1 mb-5 text-tx">This page is not here.</h1>
        <p className="lead mb-8">The link may be out of date, or the page may have moved.</p>
        <Link href="/en" className="inline-flex items-center bg-gold px-[26px] py-[14px] text-[16px] font-semibold text-navy">
          Go to the homepage →
        </Link>
      </div>
    </section>
  );
}
