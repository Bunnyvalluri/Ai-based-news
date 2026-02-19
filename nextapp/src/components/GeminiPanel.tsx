"use client";
import { motion } from "framer-motion";
import type { GeminiAnalysis } from "@/lib/types";

export default function GeminiPanel({ analysis }: { analysis: GeminiAnalysis }) {
  if (!analysis) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-2xl border border-indigo-100 bg-white shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border-b border-indigo-100/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-xl border border-indigo-100">
            ✨
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Gemini AI Analysis
            </h3>
            <p className="text-xs text-slate-500 font-medium">Powered by Google Gemini 1.5 Flash</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* 1. Credibility Score */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-sm font-bold uppercase tracking-widest text-slate-500">Credibility Score</span>
            <span className={`text-3xl font-bold ${analysis.credibility_score >= 7 ? "text-emerald-600" :
                analysis.credibility_score >= 4 ? "text-amber-500" : "text-red-500"
              }`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {analysis.credibility_score}/10
            </span>
          </div>
          <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${analysis.credibility_score * 10}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={`h-full rounded-full ${analysis.credibility_score >= 7 ? "bg-gradient-to-r from-emerald-400 to-emerald-600" :
                  analysis.credibility_score >= 4 ? "bg-gradient-to-r from-amber-400 to-amber-600" :
                    "bg-gradient-to-r from-red-500 to-red-700"
                }`}
            />
          </div>
        </div>

        {/* 2. Red Flags & Signals */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Red Flags */}
          <div className="bg-red-50 rounded-xl p-5 border border-red-100">
            <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-red-700 mb-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              Red Flags
            </h4>
            <ul className="space-y-2">
              {analysis.red_flags && analysis.red_flags.length > 0 ? (
                analysis.red_flags.map((flag, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-red-500 mt-0.5">•</span>
                    {flag}
                  </li>
                ))
              ) : (
                <li className="text-sm text-slate-500 italic">No red flags detected.</li>
              )}
            </ul>
          </div>

          {/* Credibility Signals (using correct type property 'credibility_signals') */}
          <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
            <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-emerald-700 mb-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Standard Signals
            </h4>
            <ul className="space-y-2">
              {analysis.credibility_signals && analysis.credibility_signals.length > 0 ? (
                analysis.credibility_signals.map((signal, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    {signal}
                  </li>
                ))
              ) : (
                <li className="text-sm text-slate-500 italic">No positive signals detected.</li>
              )}
            </ul>
          </div>
        </div>

        {/* 3. Explanation (using correct type property 'language_analysis') */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
          <h4 className="text-sm font-bold uppercase tracking-wide text-indigo-600 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Why this verdict?
          </h4>
          <p className="text-slate-700 leading-relaxed text-sm">
            {analysis.language_analysis || analysis.fact_check_verdict || "Detailed analysis not available."}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
