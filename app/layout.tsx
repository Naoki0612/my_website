import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Naoki.OS",
  description: "A cyber-style personal website for blog posts, software, career progress, and paper progress."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh">
      <body className={`${geistSans.variable} ${geistMono.variable} font-display antialiased`}>{children}</body>
    </html>
  );
}
