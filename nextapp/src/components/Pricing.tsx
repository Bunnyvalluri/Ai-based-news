"use client";
import React from 'react';
import { motion } from 'framer-motion';

const PLANS = [
  {
    name: "Open Source",
    price: "Free",
    desc: "For individual researchers and students.",
    features: ["1,000 requests/day", "Basic ML Analysis", "Web Interface Access", "Community Support"],
    cta: "Start Analyzing",
    highlight: false
  },
  {
    name: "Researcher Pro",
    price: "$0",
    desc: "Limited time for academic partners.",
    features: ["Unlimited requests", "Full Gemini 1.5 Analysis", "API Key Access", "Priority Batch Processing"],
    cta: "Apply for Access",
    highlight: true
  },
  {
    name: "Enterprise API",
    price: "Custom",
    desc: "Integration for newsrooms & platforms.",
    features: ["Scalable Infrastructure", "White-label Options", "Dedicated GPU Engine", "24/7 Expert Support"],
    cta: "Contact Sales",
    highlight: false
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-4">
            Licensing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Plans for Every Need
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-[2.5rem] border ${plan.highlight
                ? 'bg-white dark:bg-slate-800 border-indigo-500 shadow-2xl shadow-indigo-500/10 relative scale-105 z-10'
                : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 shadow-sm'
                } transition-all duration-300 hover:shadow-xl`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Recommended
                </div>
              )}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {plan.price}
                </span>
                {plan.price !== "Custom" && plan.price !== "$0" && <span className="text-slate-500 text-sm italic">/mo</span>}
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">
                {plan.desc}
              </p>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <svg className={`w-5 h-5 ${plan.highlight ? 'text-indigo-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.highlight
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
