import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MessageBox, MessageBoxProvider } from "@/components/MessageBox";
import { SiteStructuredData } from "@/components/seo/StructuredData";
import { SITE_URL, SITE_NAME, SITE_LOCALE } from "@/lib/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Self-hosted subset: the Google-hosted variable font is split into 116
// unicode-range chunks, and Chinese text scatters across them, so the page
// pulled 22 chunks / 1,331 KB to draw ~1,300 glyphs. One subset file is 429 KB.
const notoSansTC = localFont({
  src: "./fonts/NotoSansTC-subset.woff2",
  variable: "--font-noto-sans-tc",
  // 保留完整軸。實測限縮到 200–700 只省 8 KB，卻會讓日後用 font-black 直接壞掉。
  weight: "100 900",
  style: "normal",
  display: "swap",
  // The subset covers every character on the site today. Anything added later
  // falls through to a real system Chinese face, never to a Latin default.
  fallback: ["PingFang TC", "Microsoft JhengHei", "Noto Sans CJK TC", "sans-serif"],
  // Important: Defaults to 'Arial' for next/font/local, which would apply Latin
  // metrics to Chinese text. Must be off.
  adjustFontFallback: false,
});

const DEFAULT_TITLE = "鹿飛 LUFÉ — 貨到了之後，我們接著走｜台灣品牌進菲律賓";
const DEFAULT_DESCRIPTION = "貨代把貨送到，故事才開始。鹿飛陪台灣品牌走完在菲律賓的第一年：市場探查、寄賣、公司落地、海外客服，四個方案各有價，先花 1～2 萬看市場反應。創辦人來自躍馬企業，底下是 42 年的國際物流。";
const DEFAULT_KEYWORDS = "台灣企業出海,菲律賓落地,菲律賓市場探查,菲律賓寄賣,菲律賓公司落地,海外客服外包,菲律賓 call center,出海起手包,連鎖餐飲出海,美妝出海菲律賓,北美通路,Costco 上架,鹿飛,LUFÉ";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  keywords: DEFAULT_KEYWORDS,
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — 企業出海的導航系統`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-icon.png",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1a33" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${playfair.variable} ${inter.variable} ${notoSansTC.variable}`}
    >
      <body>
        <MessageBoxProvider>
          <SiteStructuredData />
          <Navbar>
            <main id="main-content">{children}</main>
          </Navbar>
          <Footer />
          <MessageBox />
        </MessageBoxProvider>
      </body>
    </html>
  );
}
