"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_ITEMS = [
  {
    question: "How accurate is TruthLens?",
    answer: "TruthLens combines multiple ML models (Ensemble) with Google Gemini's contextual understanding. In tests on over 20,000 articles, our combined model achieves accuracy rates above 90% for typical news content. However, AI models can make mistakes, so we always provide confidence scores and explanations."
  },
  {
    question: "What types of fake news can it detect?",
    answer: "Our system is trained to detect clickbait, satire (often flagged as 'FAKE' but with low confidence), fabricated stories, and politically biased misinformation. It works best on English-language news headlines and short articles."
  },
  {
    question: "Is my data stored or shared?",
    answer: "We process your article text in real-time. We do not store the text of articles you submit permanently, nor do we sell your data. We may log anonymized requests for system monitoring and improvement purposes only."
  },
  {
    question: "Can I integrate this into my own app?",
    answer: "Yes! We offer a developer API. See the 'For Developers' section above for integration details. Our API supports high-volume requests for enterprise use cases."
  },
  {
    question: "Is this tool free to use?",
    answer: "The web interface is free for public use (up to 50 requests/day). For higher limits or commercial API access, please contact our sales team."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Common questions about our technology and usage.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-colors duration-200"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
              >
                <span className="font-semibold text-slate-900 dark:text-white text-lg">
                  {item.question}
                </span>
                <span className={`transform transition-transform duration-300 text-indigo-500 ${activeIndex === index ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-700/50 pt-4">
                      {item.answer}
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
