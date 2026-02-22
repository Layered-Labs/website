import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Layered Labs | Longitudinal Health AI Research",
  description:
    "We build benchmarks and study how AI systems reason over longitudinal patient health state: where they fail, and how performance differs across populations.",
  keywords: [
    "longitudinal health AI",
    "clinical reasoning",
    "patient state",
    "open source",
    "health benchmarks",
    "MedQA",
    "applied AI research",
  ],
  authors: [{ name: "Layered Labs" }],
  openGraph: {
    title: "Layered Labs | Longitudinal Health AI Research",
    description:
      "We build benchmarks and study how AI systems reason over longitudinal patient health state: where they fail, and how performance differs across populations.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Layered Labs | Longitudinal Health AI Research",
    description:
      "We build benchmarks and study how AI systems reason over longitudinal patient health state: where they fail, and how performance differs across populations.",
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
