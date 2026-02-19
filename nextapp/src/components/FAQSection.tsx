"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: "How accurate is the detection engine?",
    a: "TruthLens combines 4 specialized ML models (Logistic Regression, Naive Bayes, Random Forest, and SVM) with an ensemble accuracy of 94.8% on our verified dataset of 20,000+ articles."
  },
  {
    q: "Does it support languages other than English?",
    a: "Currently, our core ML models are optimized for English text. However, the Gemini 1.5 AI layer can provide cross-lingual analysis for over 35 major world languages."
  },
  {
    q: "Can I use this for social media posts?",
    a: "Yes. While TruthLens is optimized for news articles, its NLP pipeline is effective at detecting patterns of sensationalism and bias in social media posts and headlines."
  },
  {
    q: "How does the 'Dual Intelligence' work?",
    a: "We first process the text through traditional ML for linguistic patterns (TF-IDF features). Simultaneously, Google's Gemini 1.5 Flash performs deep contextual fact-checking against its massive knowledge base."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Common Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Learn more about our methodology and the technology behind TruthLens.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:border-indigo-500/30"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 text-left flex items-center justify-between"
              >
                <span className="font-bold text-slate-900 dark:text-white">{faq.q}</span>
                <span className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
