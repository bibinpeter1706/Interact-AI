import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InteractAI — Conversational AI Platform",
  description: "Deploy intelligent voice and chat agents across WhatsApp, phone calls, and web — in minutes.",
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link 
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=general-sans@400,500,600&f[]=satoshi@400,500,700&f[]=cabinet-grotesk@400,500,700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col selection:bg-gold/30 selection:text-white`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
