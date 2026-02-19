"use client";
import React from 'react';
import { motion } from 'framer-motion';

const LOGOS = [
  "CNN", "Reuters", "BBC News", "The New York Times", "The Associated Press",
  "The Guardian", "Al Jazeera", "Bloomberg", "Wall Street Journal", "Financial Times"
];

// Duplicate for seamless marquee
const MARQUEE_LOGOS = [...LOGOS, ...LOGOS, ...LOGOS];

export default function TrustCloud() {
  return (
    <section className="py-12 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          Trusted by Journalists & Researchers Worldwide
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="flex gap-12 py-4 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
          {MARQUEE_LOGOS.map((logo, i) => (
            <div
              key={i}
              className="text-xl md:text-2xl font-black text-slate-200 dark:text-slate-800 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300 cursor-default px-4 select-none italic tracking-tighter"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {logo}
            </div>
          ))}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10" />
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
