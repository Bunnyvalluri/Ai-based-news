"use client";
import type { GeminiAnalysis } from "@/lib/types";

export default function GeminiPanel({ analysis }: { analysis: GeminiAnalysis }) {
  // If analysis is minimal/empty
  const hasContent = analysis.language_analysis || analysis.credibility_signals?.length > 0;
  if (!hasContent) return null;

  return (
    <div className="rounded-2xl border border-indigo-100 dark:border-indigo-900/40 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
      <div className="bg-indigo-50/50 dark:bg-indigo-900/20 px-6 py-4 border-b border-indigo-50 dark:border-indigo-900/40 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-white dark:bg-indigo-900/50 shadow-sm flex items-center justify-center text-lg border border-indigo-100 dark:border-indigo-800">
          ✨
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">
            AI Context Analysis
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Powered by Google Gemini 1.5
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* 1. Language Analysis / Main Explanation */}
        {analysis.language_analysis && (
          <div>
            <h4 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 mb-3 text-sm">
              <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Detailed Explanation
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
              {analysis.language_analysis}
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* 2. Red Flags */}
          {analysis.red_flags && analysis.red_flags.length > 0 && (
            <div>
              <h4 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 mb-3 text-sm">
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Key Red Flags
              </h4>
              <ul className="space-y-2">
                {analysis.red_flags.map((flag, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600 dark:text-slate-400 bg-red-50 dark:bg-red-900/10 px-3 py-2 rounded-lg border border-red-100 dark:border-red-900/30">
                    <span className="text-red-500 dark:text-red-400 font-bold">•</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 3. Credibility Signals */}
          {analysis.credibility_signals && analysis.credibility_signals.length > 0 && (
            <div>
              <h4 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 mb-3 text-sm">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Credibility Signals
              </h4>
              <ul className="space-y-2">
                {analysis.credibility_signals.map((signal, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600 dark:text-slate-400 bg-emerald-50 dark:bg-emerald-900/10 px-3 py-2 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                    <span className="text-emerald-500 dark:text-emerald-400 font-bold">✓</span>
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 4. Fact Check Verdict (if any) */}
        {analysis.fact_check_verdict && (
          <div className="mt-4 pt-4 border-t border-indigo-50 dark:border-indigo-900/30">
            <div className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 mb-1">Fact Check Verdict</div>
            <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
              {analysis.fact_check_verdict}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
