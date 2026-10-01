import { SITE_NAME, SITE_URL } from "@/lib/site";
import { toAbsoluteUrl } from "@/lib/seo";

export type BreadcrumbItem = {
  readonly name: string;
  readonly path: string;
};

export type FaqItem = {
  readonly question: string;
  readonly answer: string;
};

type ArticleStructuredData = {
  readonly headline: string;
  readonly description: string;
  readonly image: string;
  readonly datePublished: string;
  readonly dateModified: string;
  readonly canonical: string;
  readonly citation?: readonly string[];
};

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/#aaron-yu`;
const AARON_PROFILE_PATH = "/about/aaron-yu";
const AARON_IMAGE_PATH = "/images/about/aaron-portrait-studio-1080.webp";

function JsonLd({ data }: { readonly data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function SiteStructuredData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": ORGANIZATION_ID,
            name: SITE_NAME,
            url: SITE_URL,
            logo: toAbsoluteUrl("/images/logo/logo-mark-navy.png"),
            founder: { "@id": PERSON_ID },
            sameAs: [],
          },
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            name: SITE_NAME,
            url: SITE_URL,
          },
          {
            "@type": "Person",
            "@id": PERSON_ID,
            name: "Aaron Yu",
            jobTitle: "鹿飛 LUFÉ 創辦人",
            worksFor: { "@id": ORGANIZATION_ID },
            description: "看了很多年貨櫃出去，決定去接貨到了之後的事。",
            url: toAbsoluteUrl(AARON_PROFILE_PATH),
            image: toAbsoluteUrl(AARON_IMAGE_PATH),
            sameAs: ["https://www.linkedin.com/in/wibp/"],
          },
        ],
      }}
    />
  );
}

export function ProfilePageJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        mainEntity: { "@id": PERSON_ID },
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { readonly items: readonly BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: toAbsoluteUrl(item.path),
        })),
      }}
    />
  );
}

export function FaqJsonLd({ items }: { readonly items: readonly FaqItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

export function ArticleJsonLd({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  canonical,
  citation,
}: ArticleStructuredData) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline,
        description,
        image: toAbsoluteUrl(image),
        datePublished,
        dateModified,
        ...(citation?.length ? { citation } : {}),
        author: {
          "@type": "Person",
          "@id": PERSON_ID,
          name: "Aaron Yu",
          url: toAbsoluteUrl(AARON_PROFILE_PATH),
        },
        publisher: {
          "@type": "Organization",
          "@id": ORGANIZATION_ID,
          name: SITE_NAME,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonical,
        },
      }}
    />
  );
}
