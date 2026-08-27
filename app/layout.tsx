import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const title = "Hikari Tsai — AI Engineer & Creative Technologist";
const description = "Hikari Tsai 的個人作品集：Physics AI、RAG、AIoT、Music Gen、SVS 歌聲合成、電商金流與 AWS 專業認證。開放求職與專案合作。";

export const metadata: Metadata = {
  metadataBase: new URL("https://hikari-tsai.github.io/code-portfolio/"),
  title,
  description,
  icons: {
    icon: "https://hikari-tsai.github.io/code-portfolio/favicon.svg",
    shortcut: "https://hikari-tsai.github.io/code-portfolio/favicon.svg",
  },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "https://hikari-tsai.github.io/code-portfolio/og.png", width: 1792, height: 936, alt: "Hikari Tsai — AI Engineer & Creative Technologist" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["https://hikari-tsai.github.io/code-portfolio/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
