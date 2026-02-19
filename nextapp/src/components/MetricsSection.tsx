"use client";
import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { label: "Accuracy", value: "94.8%", desc: "On held-out test set" },
  { label: "Latency", value: "2.1s", desc: "Average response time" },
  { label: "Dataset", value: "20k", desc: "Verified news articles" },
  { label: "Uptime", value: "99.9%", desc: "API Availability" },
];

export default function MetricsSection() {
  return (
    <section id="metrics" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-widest mb-4">
            Performance
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Real-Time System Metrics
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our dual-engine architecture delivers industry-leading accuracy without compromising speed.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg dark:hover:shadow-indigo-500/10 transition-all duration-300 group text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
