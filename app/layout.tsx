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
import OrganicCursor from "./components/OrganicCursor";
import DotGrid from "./components/DotGrid";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${fraunces.variable} antialiased font-sans`} suppressHydrationWarning>
        {/* Retell AI Widget — replace YOUR_PUBLIC_KEY and YOUR_AGENT_ID */}
        <Script
          id="retell-widget"
          src="https://dashboard.retellai.com/retell-widget.js"
          strategy="afterInteractive"
          type="module"
          data-public-key="public_key_b5b3c9c757e9852587b32"
          data-agent-id="agent_94da05c0270927199c6218c129"
          data-title="Book a Consultation"
          data-bot-name="SCAPERS AI"
          data-color="#283618"
          data-auto-open="false"
        />
        <DotGrid />
        <OrganicCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

