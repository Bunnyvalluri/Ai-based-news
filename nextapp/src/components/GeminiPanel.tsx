"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { GeminiAnalysis } from "@/lib/types";

interface GeminiPanelProps {
  gemini: GeminiAnalysis;
}

export default function GeminiPanel({ gemini }: GeminiPanelProps) {
  const [credWidth, setCredWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 600);
    const t2 = setTimeout(() => setCredWidth((gemini.credibility_score ?? 5) * 10), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [gemini.credibility_score]);

  const verdict = (gemini.gemini_verdict ?? "").toUpperCase();

  const chipClass =
    verdict === "REAL"
      ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
      : verdict === "FAKE"
        ? "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400"
        : "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400";

  return (
    <div className="rounded-xl border border-blue-200 dark:border-blue-500/25 overflow-hidden bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-red-50/50 dark:from-blue-500/[0.06] dark:via-purple-500/[0.06] dark:to-red-500/[0.04]">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-blue-100 dark:border-blue-500/15 bg-blue-50/80 dark:bg-blue-500/[0.05]">
        <div className="w-9 h-9 rounded-lg bg-white dark:bg-blue-500/12 border border-blue-200 dark:border-blue-500/25 flex items-center justify-center flex-shrink-0 shadow-sm dark:shadow-none">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="url(#gGrd)" />
            <path d="M8 12l2.5 2.5L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="gGrd" x1="2" y1="2" x2="22" y2="22">
                <stop stopColor="#4285f4" />
                <stop offset="0.5" stopColor="#9b59b6" />
                <stop offset="1" stopColor="#ea4335" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold gemini-gradient-text">Gemini AI Analysis</p>
          <p className="text-xs text-slate-500 dark:text-slate-600">Powered by Google Gemini 1.5 Flash</p>
        </div>
        <div className={`px-4 py-1 rounded-full text-xs font-bold border tracking-wider ${chipClass}`} role="status">
          {verdict || "—"}
        </div>
      </div>

      {!gemini.gemini_available ? (
        <div className="px-5 py-6 flex items-center gap-3 text-slate-500 text-sm" role="alert">
          <span aria-hidden="true">⚠️</span>
          <p>Gemini AI analysis is unavailable for this result.</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="p-5 space-y-5"
        >
          {/* Credibility bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider flex-shrink-0 w-24 sm:w-28">Credibility</span>
            <div className="flex-1 h-2 bg-slate-200 dark:bg-white/[0.05] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full credibility-bar"
                style={{
                  width: `${credWidth}%`,
                  background: "linear-gradient(90deg, #ea4335 0%, #fbbc04 50%, #34a853 100%)",
                }}
                role="progressbar"
                aria-valuenow={gemini.credibility_score ?? 0}
                aria-valuemin={0}
                aria-valuemax={10}
                aria-label="Credibility Score"
              />
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 w-10 text-right" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {gemini.credibility_score ?? "—"}/10
            </span>
          </div>

          {/* Two column */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-white/60 dark:bg-white/[0.02] border border-red-100 dark:border-white/[0.05]">
              <h4 className="text-xs font-bold text-red-600 dark:text-red-400 mb-3 flex items-center gap-1.5">
                <span aria-hidden="true">🚩</span> Red Flags
              </h4>
              {(gemini.red_flags ?? []).length > 0 ? (
                <ul className="space-y-1.5" aria-label="List of red flags">
                  {gemini.red_flags.map((f, i) => (
                    <li key={i} className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex gap-1.5">
                      <span className="text-slate-400 dark:text-slate-600 flex-shrink-0 mt-0.5" aria-hidden="true">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-600 italic">None detected</p>
              )}
            </div>

            <div className="p-4 rounded-xl bg-white/60 dark:bg-white/[0.02] border border-emerald-100 dark:border-white/[0.05]">
              <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
                <span aria-hidden="true">✅</span> Credibility Signals
              </h4>
              {(gemini.credibility_signals ?? []).length > 0 ? (
                <ul className="space-y-1.5" aria-label="List of credibility signals">
                  {gemini.credibility_signals.map((s, i) => (
                    <li key={i} className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex gap-1.5">
                      <span className="text-slate-400 dark:text-slate-600 flex-shrink-0 mt-0.5" aria-hidden="true">•</span>
                      {s}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-600 italic">None detected</p>
              )}
            </div>
          </div>

          {/* Language analysis */}
          {gemini.language_analysis && (
            <div className="border-t border-slate-200 dark:border-white/[0.05] pt-4">
              <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-600 uppercase tracking-wider mb-1.5">💬 Language & Tone</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{gemini.language_analysis}</p>
            </div>
          )}

          {/* Fact-check verdict */}
          {gemini.fact_check_verdict && (
            <div className="border-t border-slate-200 dark:border-white/[0.05] pt-4">
              <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-600 uppercase tracking-wider mb-1.5">🔍 Fact-Check Verdict</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{gemini.fact_check_verdict}</p>
            </div>
          )}

          {/* Recommendation */}
          {gemini.recommendation && (
            <div className="flex gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-500/[0.06] border border-blue-100 dark:border-blue-500/20">
              <span className="text-xl flex-shrink-0" aria-hidden="true">💡</span>
              <div>
                <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">Reader Recommendation</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{gemini.recommendation}</p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
