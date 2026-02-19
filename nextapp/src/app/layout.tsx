import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TruthLens — AI Fake News Detector",
  description:
    "TruthLens uses advanced Machine Learning and Google Gemini AI to instantly detect fake news with confidence scoring and explainable AI.",
  keywords: ["fake news detection", "AI", "machine learning", "NLP", "fact check", "misinformation", "Gemini AI"],
  openGraph: {
    title: "TruthLens — AI Fake News Detector",
    description: "Detect fake news in seconds with ML + Gemini AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#070711] text-slate-200 antialiased">{children}</body>
    </html>
  );
}
