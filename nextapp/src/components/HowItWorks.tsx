"use client";
import React from 'react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-indigo-50/10 to-transparent dark:from-indigo-900/10 dark:to-transparent border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-4">
            Pipeline
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            How TruthLens Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            A 5-stage NLP + ML pipeline processes every article in under 3 seconds.
          </p>
        </div>

        {/* Pipeline Grid - Responsive */}
        <div className="flex flex-wrap justify-center items-stretch gap-0">

          {/* Step 1 */}
          <div className="flex-1 min-w-[200px] max-w-[240px] p-6 text-center rounded-2xl bg-white dark:bg-[#13131f] border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group z-10 m-2">
            <div className="text-xs font-bold tracking-widest text-slate-400 mb-4 font-[Space_Grotesk]">01</div>
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-700 ease-in-out" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Input &amp; Validation</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              User submits news text via web UI. Input undergoes validation: min length & format checks.
            </p>
          </div>

          <div className="hidden md:flex items-center justify-center text-slate-300 dark:text-slate-600 text-2xl pt-20 -mx-3">→</div>

          {/* Step 2 */}
          <div className="flex-1 min-w-[200px] max-w-[240px] p-6 text-center rounded-2xl bg-white dark:bg-[#13131f] border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group z-10 m-2">
            <div className="text-xs font-bold tracking-widest text-slate-400 mb-4 font-[Space_Grotesk]">02</div>
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-700 ease-in-out" style={{ background: 'linear-gradient(135deg,#8b5cf6,#a855f7)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="4 7 4 4 20 4 20 7" />
                <line x1="9" y1="20" x2="15" y2="20" />
                <line x1="12" y1="4" x2="12" y2="20" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">NLP Preprocessing</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Text is normalized: lowercased, punctuation stripped, stop-words removed, & lemmatized.
            </p>
          </div>

          <div className="hidden md:flex items-center justify-center text-slate-300 dark:text-slate-600 text-2xl pt-20 -mx-3">→</div>

          {/* Step 3 */}
          <div className="flex-1 min-w-[200px] max-w-[240px] p-6 text-center rounded-2xl bg-white dark:bg-[#13131f] border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group z-10 m-2">
            <div className="text-xs font-bold tracking-widest text-slate-400 mb-4 font-[Space_Grotesk]">03</div>
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-700 ease-in-out" style={{ background: 'linear-gradient(135deg,#a855f7,#ec4899)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">TF-IDF Vectorization</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Tokens converted to numerical vectors using 50K unigram+bigram features.
            </p>
          </div>

          <div className="hidden md:flex items-center justify-center text-slate-300 dark:text-slate-600 text-2xl pt-20 -mx-3">→</div>

          {/* Step 4 */}
          <div className="flex-1 min-w-[200px] max-w-[240px] p-6 text-center rounded-2xl bg-white dark:bg-[#13131f] border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group z-10 m-2">
            <div className="text-xs font-bold tracking-widest text-slate-400 mb-4 font-[Space_Grotesk]">04</div>
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-700 ease-in-out" style={{ background: 'linear-gradient(135deg,#ec4899,#f43f5e)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">ML Classification</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Feature vector classified by best model (LR, NB, RF, SVM) with confidence scoring.
            </p>
          </div>

          <div className="hidden md:flex items-center justify-center text-slate-300 dark:text-slate-600 text-2xl pt-20 -mx-3">→</div>

          {/* Step 5 */}
          <div className="flex-1 min-w-[200px] max-w-[240px] p-6 text-center rounded-2xl bg-white dark:bg-[#13131f] border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group z-10 m-2">
            <div className="text-xs font-bold tracking-widest text-slate-400 mb-4 font-[Space_Grotesk]">05</div>
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-700 ease-in-out" style={{ background: 'linear-gradient(135deg,#f43f5e,#f97316)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <polyline points="3 9 12 15 21 9" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Result &amp; Explanation</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              REAL/FAKE verdict + AI explanation returned to UI in &lt; 3 seconds.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
