"use client";
import { motion } from "framer-motion";
import { SystemStatus } from "@/lib/types";

interface HeroProps {
  status: SystemStatus | null;
  accuracy: number | null;
}

export default function Hero({ status, accuracy }: HeroProps) {
  return (
    <section
      className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
      id="hero"
      aria-label="Introduction"
    >
      {/* Animated background orbs - Theme Aware */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="orb-1 absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-200/40 dark:bg-indigo-600/10 blur-[90px]" />
        <div className="orb-2 absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-200/40 dark:bg-purple-600/10 blur-[100px]" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.4] dark:opacity-[0.05]"
          style={{
            backgroundImage: "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Dark Mode Grid Overlay (separate for cleaner CSS) */}
        <div
          className="absolute inset-0 hidden dark:block opacity-[0.1]"
          style={{
            backgroundImage: "linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: content */}
          <div className="text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold tracking-wide mb-6 shadow-sm"
              role="status"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 badge-pulse-dot" aria-hidden="true" />
              ML + Gemini AI · Real-Time · 90%+ Accuracy
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6 text-slate-900 dark:text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Stop Misinformation
              <br />
              <span className="text-gradient">Before It Spreads</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0 font-medium"
            >
              TruthLens uses advanced ML and Google Gemini AI to instantly classify
              news articles as <strong className="text-slate-900 dark:text-white">Real</strong> or{" "}
              <strong className="text-slate-900 dark:text-white">Fake</strong> — with confidence
              scoring, keyword explainability, and deep contextual analysis.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-14"
            >
              <a
                href="#detector"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white font-bold hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 shadow-md shadow-indigo-600/20"
                aria-label="Start analyzing an article"
              >
                Analyze an Article
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 font-medium transition-all duration-200 bg-white dark:bg-slate-900 shadow-sm"
              >
                How It Works
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start items-center gap-0 text-slate-900 dark:text-white"
            >
              {[
                { value: accuracy ? `${accuracy}%` : "100%", label: "Accuracy" },
                { value: "4", label: "ML Models" },
                { value: "<3s", label: "Response" },
                { value: "20K+", label: "Trained On" },
              ].map((s, i) => (
                <div key={i} className="flex items-center">
                  {i > 0 && <div className="w-px h-10 bg-slate-300 dark:bg-slate-700 mx-6" aria-hidden="true" />}
                  <div className="text-center">
                    <div
                      className="text-2xl font-bold text-gradient"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {s.value}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{s.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: floating cards (Visibility optimized for Dark/Light) */}
          <div className="relative h-[420px] hidden lg:block" aria-hidden="true">
            <div className="float-c1 absolute top-[10%] left-[5%] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-red-100 dark:border-red-900/30 rounded-2xl p-4 flex items-center gap-3 shadow-xl shadow-red-500/5 dark:shadow-black/40 min-w-[200px]">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center justify-center text-red-500 dark:text-red-400 font-bold text-lg">✗</div>
              <div>
                <div className="text-red-600 dark:text-red-400 font-bold text-sm">FAKE</div>
                <div className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Confidence: 97.2%</div>
              </div>
            </div>

            <div className="float-c2 absolute top-[42%] right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-emerald-100 dark:border-emerald-900/30 rounded-2xl p-4 flex items-center gap-3 shadow-xl shadow-emerald-500/5 dark:shadow-black/40 min-w-[200px]">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-lg">✓</div>
              <div>
                <div className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">REAL</div>
                <div className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Confidence: 94.8%</div>
              </div>
            </div>

            <div className="float-c3 absolute bottom-[8%] left-[18%] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-indigo-100 dark:border-indigo-900/30 rounded-2xl p-4 flex items-center gap-3 shadow-xl shadow-indigo-500/5 dark:shadow-black/40 min-w-[230px]">
              <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-lg">🔍</div>
              <div>
                <div className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase">Gemini AI Analysis</div>
                <div className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Credibility: 8/10</div>
              </div>
            </div>

            {/* Status badge */}
            <div className="absolute top-0 right-[8%] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm dark:shadow-md">
              <div className={`w-2 h-2 rounded-full ${status?.model_ready ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-amber-400"}`} />
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                {status?.model_ready ? "Model Ready" : "Model Loading"}
              </span>
              {status?.gemini_available && (
                <>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">Gemini Active</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll Down</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
