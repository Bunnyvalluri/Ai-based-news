"use client";
import { motion } from "framer-motion";
import type { MetricsData } from "@/lib/types";

const HOW_STEPS = [
  { icon: "📥", label: "Input", title: "Article Input", desc: "Paste text or upload .txt/.csv files. Supports full articles or headlines." },
  { icon: "🧹", label: "Preprocess", title: "NLP Preprocessing", desc: "Text normalization, stop-word removal, stemming — TF-IDF vectorization." },
  { icon: "🤖", label: "ML Model", title: "ML Classification", desc: "Ensemble model (NB/SVM/Logistic/RF) trained on 20K+ real & fake news articles." },
  { icon: "✨", label: "Gemini AI", title: "Gemini Analysis", desc: "Google Gemini 1.5 Flash provides contextual reasoning, red flags & credibility." },
  { icon: "📊", label: "Verdict", title: "Combined Verdict", desc: "Dual AI results, confidence score, keyword insights, and reader recommendation." },
];

interface MetricsSectionProps {
  metrics: MetricsData | null;
  loading: boolean;
}

export default function MetricsSection({ metrics, loading }: MetricsSectionProps) {
  return (
    <>
      {/* ── How it works ── */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-transparent via-indigo-500/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Pipeline
            </div>
            <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              How TruthLens Works
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              A 5-stage dual-AI pipeline processes your article in under 3 seconds.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 lg:gap-0">
            {HOW_STEPS.map((step, i) => (
              <div key={i} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-6 text-center w-48 hover:-translate-y-1 transition-all duration-200 hover:border-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/10"
                >
                  <div className="text-xs font-bold tracking-widest text-slate-600 uppercase mb-3">
                    STEP {i + 1}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg">
                    {step.icon}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </motion.div>
                {i < HOW_STEPS.length - 1 && (
                  <div className="text-slate-700 px-2 text-lg hidden lg:block">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Metrics ── */}
      <section id="metrics" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Performance
            </div>
            <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Model Performance
            </h2>
            <p className="text-slate-400">Evaluated on a held-out test set, never seen during training.</p>
          </motion.div>

          {loading && (
            <div className="flex items-center justify-center gap-3 py-16 text-slate-500">
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
              </svg>
              Loading metrics…
            </div>
          )}

          {metrics && (
            <div className="space-y-6">
              {/* Best model card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl border border-indigo-500/25 bg-gradient-to-br from-indigo-500/[0.07] to-purple-500/[0.04] shadow-xl shadow-indigo-500/10"
              >
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <span className="text-4xl">👑</span>
                  <div>
                    <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {metrics.best_model}
                    </h3>
                    <p className="text-slate-500 text-sm">Best performing model</p>
                  </div>
                  <div className="ml-auto px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/25">
                    RECOMMENDED
                  </div>
                </div>
                <div className="grid sm:grid-cols-4 gap-4">
                  {Object.entries(metrics.models[metrics.best_model] ?? {})
                    .filter(([k]) => ["accuracy", "precision", "recall", "f1_score"].includes(k))
                    .map(([k, v]) => (
                      <div key={k} className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <div
                          className="text-3xl font-bold gradient-text mb-1"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {typeof v === "number" ? `${(v * 100).toFixed(1)}%` : "—"}
                        </div>
                        <div className="text-xs text-slate-500 capitalize font-medium">
                          {k.replace("_", " ")}
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>

              {/* All models */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(metrics.models).map(([name, m], i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="glass rounded-xl p-5 hover:-translate-y-0.5 hover:border-indigo-500/25 transition-all duration-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-sm text-slate-200">{name}</h4>
                      <span className="text-indigo-400 font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {m.accuracy != null ? `${(m.accuracy * 100).toFixed(0)}%` : "—"}
                      </span>
                    </div>
                    {[
                      { k: "Precision", v: m.precision },
                      { k: "Recall", v: m.recall },
                      { k: "F1 Score", v: m.f1_score },
                    ].map(({ k, v }) => (
                      <div key={k} className="flex justify-between py-1.5 border-b border-white/[0.04] last:border-0">
                        <span className="text-xs text-slate-600">{k}</span>
                        <span className="text-xs font-semibold text-slate-300">
                          {v != null ? `${(v * 100).toFixed(1)}%` : "—"}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {!loading && !metrics && (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">📊</p>
              <p className="text-slate-500">
                No metrics available. Train the model first using{" "}
                <code className="bg-white/[0.05] px-1.5 py-0.5 rounded text-xs">START.bat</code>.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
