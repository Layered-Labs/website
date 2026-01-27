import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Layered Labs | Applied AI for Health",
  description:
    "An Applied AI Lab based in NYC building and deploying open-source, small LLMs for health.",
  keywords: [
    "AI",
    "Healthcare",
    "LLM",
    "Open Source",
    "Machine Learning",
    "NYC",
    "Applied AI",
  ],
  authors: [{ name: "Layered Labs" }],
  openGraph: {
    title: "Layered Labs | Applied AI for Health",
    description:
      "An Applied AI Lab based in NYC building and deploying open-source, small LLMs for health.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Layered Labs | Applied AI for Health",
    description:
      "An Applied AI Lab based in NYC building and deploying open-source, small LLMs for health.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
