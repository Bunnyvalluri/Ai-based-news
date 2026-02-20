"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PredictionResult } from "@/lib/types";
import GeminiPanel from "./GeminiPanel";

export default function ResultPanel({
  result,
  geminiLoading = false,
  onReset,
}: {
  result: PredictionResult;
  geminiLoading?: boolean;
  onReset: () => void;
}) {
  const [geminiOpen, setGeminiOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const isFake = result.label === "FAKE";
  const confidence = (Number(result.confidence) || 0).toFixed(1);

  // Colors
  const accentColor = isFake ? "#f87171" : "#34d399";
  const accentBg = isFake ? "rgba(248,113,113,0.1)" : "rgba(52,211,153,0.1)";
  const accentBorder = isFake ? "rgba(248,113,113,0.25)" : "rgba(52,211,153,0.25)";
  const barColor = isFake
    ? "linear-gradient(90deg,#f87171,#ef4444)"
    : "linear-gradient(90deg,#34d399,#10b981)";

  // Confidence label
  const confidenceLabel =
    Number(confidence) >= 85
      ? "The model is highly confident in this classification."
      : Number(confidence) >= 70
        ? `A ${confidence}% confidence score means the model is moderately confident in its ${result.label} classification. Consider seeking additional sources to verify this content.`
        : `A ${confidence}% confidence score suggests some uncertainty. We recommend cross-checking with multiple sources.`;

  // Why verdict text
  const whyText = isFake
    ? `The AI detected language patterns typical of misleading content: sensationalist tone, unverifiable claims, emotional manipulation, and absence of credible sourcing. We strongly recommend verifying this content before sharing.`
    : `The AI detected language patterns typical of credible news: measured tone, attributable claims, factual reporting style, and absence of manipulative rhetoric. While promising, we recommend verifying important claims through multiple reputable sources.`;

  // Copy report
  const handleCopy = () => {
    const report = `TruthLens Analysis Report\n\nVerdict: ${result.label} NEWS\nConfidence: ${confidence}%\nModel: ${result.model_name}\nResponse Time: ${result.response_time_ms}ms\n\nTop Keywords: ${result.top_keywords?.map((k) => k.word).join(", ") || "N/A"}\n\nSummary: ${whyText}`;
    navigator.clipboard.writeText(report).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4 }}
      className="mt-8 space-y-4"
    >
      {/* ── 1. Main Verdict Card ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%)",
          border: `1px solid ${accentBorder}`,
          boxShadow: `0 0 40px ${accentBg}`,
        }}
      >
        {/* Top row: verdict + confidence */}
        <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {/* Verdict */}
          <div className="p-6 md:p-8 flex items-start gap-5">
            {/* Icon */}
            <div
              className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center"
              style={{ background: accentBg, border: `1.5px solid ${accentBorder}` }}
            >
              {isFake ? (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke={accentColor} strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke={accentColor} strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <div>
              <div
                className="text-4xl font-extrabold tracking-tight"
                style={{ color: accentColor, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {result.label}
              </div>
              <p className="mt-1 text-sm text-slate-400 leading-relaxed max-w-xs">
                {isFake
                  ? "This content shows patterns associated with misleading or false reporting."
                  : "This content shows patterns consistent with credible reporting."}
              </p>
            </div>
          </div>

          {/* Confidence */}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Confidence Score
              </span>
              <span
                className="text-2xl font-extrabold"
                style={{ color: accentColor, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {confidence}%
              </span>
            </div>

            {/* Bar */}
            <div className="h-2 w-full rounded-full mb-3" style={{ background: "rgba(255,255,255,0.08)" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: barColor }}
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{confidenceLabel}</p>
          </div>
        </div>

        {/* ── Model info row ── */}
        <div
          className="grid grid-cols-3 divide-x divide-white/10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          {[
            { label: "Model Used", value: result.model_name || "ML Classifier" },
            {
              label: "Model Accuracy",
              value: result.model_accuracy != null
                ? `${(Number(result.model_accuracy)).toFixed(1)}%`
                : "—",
            },
            { label: "Response Time", value: `${result.response_time_ms}ms` },
          ].map((item) => (
            <div key={item.label} className="px-5 py-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                {item.label}
              </div>
              <div className="text-sm font-bold text-white">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. Top Influencing Keywords ── */}
      {result.top_keywords && result.top_keywords.length > 0 && (
        <div
          className="rounded-2xl p-6"
          style={{
            background: "#0f172a",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-1">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            Top Influencing Keywords
          </h4>
          <p className="text-xs text-slate-500 mb-4">These words most influenced the AI's decision:</p>
          <div className="flex flex-wrap gap-2">
            {result.top_keywords.slice(0, 10).map((k, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  background: "rgba(99,102,241,0.12)",
                  border: "1px solid rgba(99,102,241,0.25)",
                  color: "#a5b4fc",
                }}
              >
                {k.word}
                <span className="opacity-60">{k.score.toFixed(3)}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── 3. Why verdict? ── */}
      <div
        className="rounded-2xl p-5 flex gap-4 items-start"
        style={{
          background: "#0f172a",
          border: `1px solid ${accentBorder}`,
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
          style={{ background: accentBg, border: `1px solid ${accentBorder}` }}
        >
          {isFake ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={accentColor} strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={accentColor} strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          <span className="font-bold" style={{ color: accentColor }}>
            Why {result.label}?
          </span>{" "}
          {whyText}
        </p>
      </div>

      {/* ── 4. Gemini AI Analysis (collapsible) ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Header */}
        <button
          onClick={() => setGeminiOpen((o) => !o)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}
            >
              <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-indigo-400">Gemini AI Analysis</div>
              <div className="text-xs text-slate-500">Powered by Google Gemini 1.5 Flash</div>
            </div>
          </div>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <svg
              className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200"
              style={{ transform: geminiOpen ? "rotate(0deg)" : "rotate(180deg)" }}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </div>
        </button>

        {/* Body */}
        <AnimatePresence initial={false}>
          {geminiOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="px-6 py-5">
                {geminiLoading ? (
                  <div className="flex items-center gap-3 text-sm text-indigo-400">
                    <svg className="w-4 h-4 animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                    </svg>
                    Gemini AI is analyzing in the background… results will appear shortly.
                  </div>
                ) : result.gemini && result.gemini.gemini_available ? (
                  <GeminiPanel analysis={result.gemini} />
                ) : (
                  <div className="flex items-center gap-2 text-sm text-amber-400">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                    Gemini AI analysis unavailable for this result.
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 5. Action buttons ── */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-slate-300 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Analyze Another Article
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all"
          style={{
            background: copied ? "rgba(52,211,153,0.15)" : "rgba(99,102,241,0.15)",
            border: copied ? "1px solid rgba(52,211,153,0.4)" : "1px solid rgba(99,102,241,0.4)",
            color: copied ? "#34d399" : "#a5b4fc",
          }}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Report
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
