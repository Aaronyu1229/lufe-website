import { SITE_NAME, SITE_URL } from "@/lib/site";
import { toAbsoluteUrl } from "@/lib/seo";
import { EN_SITE_DESCRIPTION } from "@/lib/english-site";
import type { Locale } from "@/i18n/locale";

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
  readonly locale?: Locale;
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

export function SiteStructuredData({ locale = "zh" }: { readonly locale?: Locale }) {
  const isEnglish = locale === "en";
  const siteUrl = isEnglish ? `${SITE_URL}/en` : SITE_URL;
  const organizationId = isEnglish ? `${siteUrl}#organization` : ORGANIZATION_ID;
  const personId = isEnglish ? `${siteUrl}#aaron-yu` : PERSON_ID;
  const profilePath = isEnglish ? "/en/about/aaron-yu" : AARON_PROFILE_PATH;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": organizationId,
            name: isEnglish ? "LUFÉ" : SITE_NAME,
            url: siteUrl,
            logo: toAbsoluteUrl("/images/logo/logo-mark-navy.png"),
            founder: { "@id": personId },
            sameAs: [],
            ...(isEnglish ? { description: EN_SITE_DESCRIPTION, inLanguage: "en" } : {}),
          },
          {
            "@type": "WebSite",
            "@id": isEnglish ? `${siteUrl}#website` : `${SITE_URL}/#website`,
            name: isEnglish ? "LUFÉ" : SITE_NAME,
            url: siteUrl,
            ...(isEnglish ? { description: EN_SITE_DESCRIPTION, inLanguage: "en" } : {}),
          },
          {
            "@type": "Person",
            "@id": personId,
            name: "Aaron Yu",
            jobTitle: isEnglish ? "Founder of LUFÉ" : "鹿飛 LUFÉ 創辦人",
            worksFor: { "@id": organizationId },
            description: isEnglish ? "After years of watching containers leave, he decided to take care of what happens after they arrive." : "看了很多年貨櫃出去，決定去接貨到了之後的事。",
            url: toAbsoluteUrl(profilePath),
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
  locale = "zh",
}: ArticleStructuredData) {
  const isEnglish = locale === "en";
  const organizationId = isEnglish ? `${SITE_URL}/en#organization` : ORGANIZATION_ID;
  const personId = isEnglish ? `${SITE_URL}/en#aaron-yu` : PERSON_ID;
  const profilePath = isEnglish ? "/en/about/aaron-yu" : AARON_PROFILE_PATH;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline,
        description,
        ...(isEnglish ? { inLanguage: "en" } : {}),
        image: toAbsoluteUrl(image),
        datePublished,
        dateModified,
        ...(citation?.length ? { citation } : {}),
        author: {
          "@type": "Person",
          "@id": personId,
          name: "Aaron Yu",
          url: toAbsoluteUrl(profilePath),
        },
        publisher: {
          "@type": "Organization",
          "@id": organizationId,
          name: isEnglish ? "LUFÉ" : SITE_NAME,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonical,
        },
      }}
    />
  );
}
