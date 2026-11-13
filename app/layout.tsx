import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// The same Satoshi files as the ortho write-up (fast-and-slow-ortho.vercel.app),
// served from this site.
const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

const description =
  "Layered Labs is a research lab in New York City. We test whether medical AI is fair, accurate and private, and we publish the data behind every test.";

export const metadata: Metadata = {
  metadataBase: new URL("https://layeredlabs.ai"),
  title: "Layered Labs",
  description,
  openGraph: { title: "Layered Labs", description, url: "/", siteName: "Layered Labs", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${satoshi.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
