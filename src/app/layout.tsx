import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MessageBox, MessageBoxProvider } from "@/components/MessageBox";
import { SubsidyCard } from "@/components/SubsidyCard";

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

export const metadata: Metadata = {
  title: "鹿飛 LUFÉ — 企業出海的導航系統",
  description:
    "從市場驗證到落地營運，我們陪你走完全程。平均 6-9 個月讓你的產品站上海外貨架。",
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
