import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MessageBox, MessageBoxProvider } from "@/components/MessageBox";
import { SubsidyCard } from "@/components/SubsidyCard";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_LOCALE } from "@/lib/site";

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

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  display: "swap",
});

const DEFAULT_TITLE = `${SITE_NAME} — 協助台灣企業落地北美與東南亞`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  keywords: [
    "台灣企業出海",
    "東南亞落地",
    "北美通路",
    "菲律賓商機",
    "印尼市場",
    "越南市場進入",
    "產品適配性",
    "通路銷售",
    "海外團隊建置",
    "跨境顧問",
    "企業出海方法論",
    "鹿飛",
    "LUFÉ",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
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
    description: SITE_DESCRIPTION,
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
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <MessageBox />
          <SubsidyCard />
        </MessageBoxProvider>
      </body>
    </html>
  );
}
