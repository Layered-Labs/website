import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Layered Labs | Applied Clinical AI",
  description:
    "An applied clinical AI lab building open-source systems that maintain longitudinal patient state, enabling continuity of care in fragmented and underserved environments.",
  keywords: [
    "clinical AI",
    "longitudinal health",
    "patient state",
    "open source",
    "health companion",
    "applied AI",
    "NYC",
  ],
  authors: [{ name: "Layered Labs" }],
  openGraph: {
    title: "Layered Labs | Applied Clinical AI",
    description:
      "An applied clinical AI lab building open-source systems that maintain longitudinal patient state, enabling continuity of care in fragmented and underserved environments.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Layered Labs | Applied Clinical AI",
    description:
      "An applied clinical AI lab building open-source systems that maintain longitudinal patient state, enabling continuity of care in fragmented and underserved environments.",
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
