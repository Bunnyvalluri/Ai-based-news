"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";

const LOGOS = [
  {
    name: "CNN",
    color: "#CC0000",
    bg: "rgba(204,0,0,0.08)",
    border: "rgba(204,0,0,0.2)",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
      </svg>
    ),
  },
  {
    name: "Reuters",
    color: "#FF6200",
    bg: "rgba(255,98,0,0.08)",
    border: "rgba(255,98,0,0.2)",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    ),
  },
  {
    name: "BBC News",
    color: "#BB1919",
    bg: "rgba(187,25,25,0.08)",
    border: "rgba(187,25,25,0.2)",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 5h18v14H3V5zm2 2v10h14V7H5zm3 2h2v6H8V9zm3 0h2v6h-2V9zm3 0h2v6h-2V9z" />
      </svg>
    ),
  },
  {
    name: "New York Times",
    color: "#333333",
    bg: "rgba(51,51,51,0.06)",
    border: "rgba(51,51,51,0.15)",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 4h16v2H4V4zm0 4h10v2H4V8zm0 4h16v2H4v-2zm0 4h10v2H4v-2z" />
      </svg>
    ),
  },
  {
    name: "AP News",
    color: "#D93025",
    bg: "rgba(217,48,37,0.08)",
    border: "rgba(217,48,37,0.2)",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11H9V9h6v6zm2-8H7V5h10v2z" />
      </svg>
    ),
  },
  {
    name: "The Guardian",
    color: "#005689",
    bg: "rgba(0,86,137,0.08)",
    border: "rgba(0,86,137,0.2)",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
      </svg>
    ),
  },
  {
    name: "Al Jazeera",
    color: "#009A44",
    bg: "rgba(0,154,68,0.08)",
    border: "rgba(0,154,68,0.2)",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
      </svg>
    ),
  },
  {
    name: "Bloomberg",
    color: "#0D6EFD",
    bg: "rgba(13,110,253,0.08)",
    border: "rgba(13,110,253,0.2)",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 3h18v18H3V3zm4 4v10h2V7H7zm4 3v7h2v-7h-2zm4-5v12h2V5h-2z" />
      </svg>
    ),
  },
  {
    name: "Wall St. Journal",
    color: "#0274B6",
    bg: "rgba(2,116,182,0.08)",
    border: "rgba(2,116,182,0.2)",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M2 3h20v4H2V3zm0 6h20v2H2V9zm0 4h14v2H2v-2zm0 4h10v2H2v-2z" />
      </svg>
    ),
  },
  {
    name: "Financial Times",
    color: "#FF5C00",
    bg: "rgba(255,92,0,0.08)",
    border: "rgba(255,92,0,0.2)",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm1 4v2h5v2H8v5h2v-3h3v-2H10V7H6z" />
      </svg>
    ),
  },
];

// Triple for seamless loop
const MARQUEE_ITEMS = [...LOGOS, ...LOGOS, ...LOGOS];

// Width per badge (px) — approx. Keep in sync with CSS width
const BADGE_WIDTH = 200;
const GAP = 20;
const LOOP_WIDTH = LOGOS.length * (BADGE_WIDTH + GAP);

export default function TrustCloud() {
  return (
    <section className="py-14 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300"
      style={{ borderTop: "1px solid rgba(100,116,139,0.12)", borderBottom: "1px solid rgba(100,116,139,0.12)" }}
    >
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-8 h-px" style={{ background: "linear-gradient(to right, transparent, #818cf8)" }} />
          <svg className="w-4 h-4" style={{ color: "#818cf8" }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          <span className="w-8 h-px" style={{ background: "linear-gradient(to left, transparent, #818cf8)" }} />
        </div>
        <p
          className="text-sm font-bold uppercase tracking-[0.25em]"
          style={{
            background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Trusted by Journalists &amp; Researchers Worldwide
        </p>
      </div>

      {/* Marquee wrapper */}
      <div className="relative" style={{ overflowX: "hidden" }}>
        {/* Framer Motion continuous scroll */}
        <motion.div
          className="flex"
          style={{ gap: GAP, willChange: "transform" }}
          animate={{ x: [`0px`, `-${LOOP_WIDTH}px`] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {MARQUEE_ITEMS.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 inline-flex items-center gap-2.5 py-2.5 rounded-full select-none"
              style={{
                width: BADGE_WIDTH,
                paddingLeft: 18,
                paddingRight: 18,
                background: logo.bg,
                border: `1px solid ${logo.border}`,
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <span style={{ color: logo.color, flexShrink: 0 }}>{logo.icon}</span>
              <span
                className="text-sm font-bold truncate"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: logo.color,
                }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 pointer-events-none z-10 bg-gradient-to-r from-white dark:from-slate-950 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 pointer-events-none z-10 bg-gradient-to-l from-white dark:from-slate-950 to-transparent" />
      </div>
    </section>
  );
}
