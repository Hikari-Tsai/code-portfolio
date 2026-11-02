import type { Metadata } from "next";
import "./globals.css";

const title = "Hikari Tsai — AI, Audio DSP & Music Technology";
const description = "Hikari Tsai，獨立音樂人與資深生成式 AI 研發工程師。開發 TrackMate、Karaoke Battle、音訊 DSP 外掛與本機 ONNX 工具；專長涵蓋 PhysicsNeMo、PIE 物理研究流程、MCP、RAG、Music Gen 與 SVS 歌聲合成。開放求職與接案合作。";

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
    images: [{ url: "https://hikari-tsai.github.io/code-portfolio/og.png", width: 1792, height: 936, alt: "Hikari Tsai 個人作品集" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["https://hikari-tsai.github.io/code-portfolio/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
