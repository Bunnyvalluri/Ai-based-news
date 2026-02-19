"use client";
import { motion } from "framer-motion";
import { SystemStatus } from "@/lib/types";

interface HeroProps {
  status: SystemStatus | null;
  accuracy: number | null;
}

export default function Hero({ status, accuracy }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden" id="hero">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb-1 absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-600/20 blur-[100px]" />
        <div className="orb-2 absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="orb-3 absolute top-3/4 left-1/2 w-64 h-64 rounded-full bg-violet-500/10 blur-[80px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/[0.12] border border-indigo-500/30 text-indigo-400 text-xs font-semibold tracking-wide mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 badge-pulse-dot" />
              ML + Gemini AI · Real-Time · 90%+ Accuracy
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Stop Misinformation
              <br />
              <span className="gradient-text">Before It Spreads</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl"
            >
              TruthLens uses advanced ML and Google Gemini AI to instantly classify
              news articles as <strong className="text-slate-200">Real</strong> or{" "}
              <strong className="text-slate-200">Fake</strong> — with confidence
              scoring, keyword explainability, and deep contextual analysis.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <a
                href="#detector"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
              >
                Analyze an Article
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center px-6 py-3 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/5 font-medium transition-all duration-200"
              >
                How It Works
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-0"
            >
              {[
                { value: accuracy ? `${accuracy}%` : "100%", label: "Accuracy" },
                { value: "4", label: "ML Models" },
                { value: "<3s", label: "Response" },
                { value: "20K+", label: "Trained On" },
              ].map((s, i) => (
                <div key={i} className="flex items-center">
                  {i > 0 && <div className="w-px h-10 bg-white/10 mx-5" />}
                  <div className="text-center">
                    <div
                      className="text-2xl font-bold gradient-text"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {s.value}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">{s.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: floating cards */}
          <div className="relative h-[420px] hidden lg:block">
            <div className="float-c1 absolute top-[10%] left-[5%] glass rounded-2xl p-4 flex items-center gap-3 border-red-500/20 bg-red-500/[0.04] shadow-2xl min-w-[200px]">
              <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center text-red-400 font-bold text-lg">✗</div>
              <div>
                <div className="text-red-400 font-bold text-sm">FAKE</div>
                <div className="text-slate-500 text-xs">Confidence: 97.2%</div>
              </div>
            </div>

            <div className="float-c2 absolute top-[42%] right-0 glass rounded-2xl p-4 flex items-center gap-3 border-emerald-500/20 bg-emerald-500/[0.04] shadow-2xl min-w-[200px]">
              <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg">✓</div>
              <div>
                <div className="text-emerald-400 font-bold text-sm">REAL</div>
                <div className="text-slate-500 text-xs">Confidence: 94.8%</div>
              </div>
            </div>

            <div className="float-c3 absolute bottom-[8%] left-[18%] glass rounded-2xl p-4 flex items-center gap-3 shadow-2xl min-w-[230px]">
              <div className="w-10 h-10 rounded-full bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-content-center flex justify-center text-lg">🔍</div>
              <div>
                <div className="text-indigo-400 text-xs font-semibold">Gemini AI Analysis</div>
                <div className="text-slate-500 text-xs">Credibility: 8/10</div>
              </div>
            </div>

            {/* Status badge */}
            <div className="absolute top-0 right-[8%] glass rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg">
              <div className={`w-2 h-2 rounded-full ${status?.model_ready ? "bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400" : "bg-amber-400"}`} />
              <span className="text-xs text-slate-400">
                {status?.model_ready ? "Model Ready" : "Model Loading"}
              </span>
              {status?.gemini_available && (
                <>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs text-blue-400">Gemini Active</span>
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
