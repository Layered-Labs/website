import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Layered Labs | Applied AI for Health Equity",
  description:
    "Layered Labs is a nonprofit AI research lab building and benchmarking open-source models for community health clinics that can't afford closed, proprietary systems.",
  keywords: [
    "health equity",
    "clinical AI",
    "open-source models",
    "community health clinics",
    "clinical benchmarks",
    "nonprofit research",
    "on-device AI",
  ],
  authors: [{ name: "Layered Labs" }],
  openGraph: {
    title: "Layered Labs | Applied AI for Health Equity",
    description:
      "Layered Labs is a nonprofit AI research lab building and benchmarking open-source models for community health clinics that can't afford closed, proprietary systems.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Layered Labs | Applied AI for Health Equity",
    description:
      "Layered Labs is a nonprofit AI research lab building and benchmarking open-source models for community health clinics that can't afford closed, proprietary systems.",
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
