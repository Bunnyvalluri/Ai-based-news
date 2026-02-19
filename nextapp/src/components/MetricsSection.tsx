"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const STEPS = [
  { id: 1, title: "Input Analysis", desc: "Text is cleaned (stopword removal, stemming) and vectorized using TF-IDF." },
  { id: 2, title: "ML Classification", desc: "Ensemble of 4 models (Naive Bayes, SVM, LR, RF) predicts probability." },
  { id: 3, title: "Gemini Validation", desc: "Google Gemini 1.5 Flash cross-checks facts and provides explainability." },
  { id: 4, title: "Final Verdict", desc: "Weighted average of ML and LLM scores determines the final result." },
];

const MODELS = [
  { name: "Naive Bayes", acc: "92%", color: "bg-blue-500" },
  { name: "SVM", acc: "94%", color: "bg-indigo-500" },
  { name: "Random Forest", acc: "91%", color: "bg-purple-500" },
  { name: "Logistic Regression", acc: "93%", color: "bg-teal-500" },
];

export default function MetricsSection() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="metrics" className="py-24 bg-slate-50 relative overflow-hidden" aria-labelledby="metrics-heading">

      {/* Background decoration */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold uppercase tracking-widest mb-4">
            Under the Hood
          </div>
          <h2 id="metrics-heading" className="text-3xl md:text-4xl font-bold mb-4 text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            How TruthLens Works
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A hybrid approach combining the speed of traditional Machine Learning with the reasoning of Large Language Models.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Interactive Graph / Stats */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold shadow-sm">1</span>
              Model Performance
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {MODELS.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-semibold text-slate-700">{m.name}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors`}>{m.acc}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${m.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: m.acc }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">

              <div className="relative z-10">
                <div className="text-sm font-bold uppercase tracking-widest text-indigo-200 mb-2">Total Accuracy</div>
                <div className="text-5xl font-extrabold mb-1 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>94.8%</div>
                <p className="text-indigo-100 text-sm">On held-out test set (20% split)</p>
              </div>
              {/* Simplified decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            </div>
          </div>

          {/* Right: Steps Pipeline */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center text-sm font-bold shadow-sm">2</span>
              Processing Pipeline
            </h3>

            <div className="relative space-y-8 pl-8 border-l-2 border-slate-200 ml-4">
              {STEPS.map((step, i) => (
                <div key={i} className="relative group">
                  <div
                    className={`absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 transition-all duration-300 ${activeStep === step.id
                        ? "border-indigo-600 bg-white scale-125 shadow-[0_0_0_4px_rgba(99,102,241,0.2)]"
                        : "border-slate-300 bg-white group-hover:border-indigo-400"
                      }`}
                  />
                  <div
                    onClick={() => setActiveStep(step.id)}
                    className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer ${activeStep === step.id
                        ? "bg-white border-indigo-200 shadow-lg shadow-indigo-500/5 translate-x-2"
                        : "bg-transparent border-transparent hover:bg-white hover:border-slate-200"
                      }`}
                  >
                    <h4 className={`font-bold mb-1 transition-colors ${activeStep === step.id ? "text-indigo-700" : "text-slate-800"}`}>
                      {step.title}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
