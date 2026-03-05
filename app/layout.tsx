import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SCAPERS | SF LANDSCAPING",
  description: "From not the best to effortless.",
};

import SmoothScroll from "./components/SmoothScroll";
import DotGrid from "./components/DotGrid";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${fraunces.variable} antialiased font-sans`} suppressHydrationWarning>

        <DotGrid />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

