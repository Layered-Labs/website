import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Layered Labs | Clinical AI for All",
  description:
    "Layered Labs is a nonprofit research institute studying the clinical capabilities of open-source AI models and their suitability for deployment in low-resource settings.",
  keywords: [
    "clinical AI",
    "open-source models",
    "low-resource healthcare",
    "clinical benchmarks",
    "MedQA",
    "nonprofit research",
    "community health",
  ],
  authors: [{ name: "Layered Labs" }],
  openGraph: {
    title: "Layered Labs | Clinical AI for All",
    description:
      "Layered Labs is a nonprofit research institute studying the clinical capabilities of open-source AI models and their suitability for deployment in low-resource settings.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Layered Labs | Clinical AI for All",
    description:
      "Layered Labs is a nonprofit research institute studying the clinical capabilities of open-source AI models and their suitability for deployment in low-resource settings.",
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
