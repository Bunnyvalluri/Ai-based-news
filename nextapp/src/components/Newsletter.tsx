"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] bg-indigo-600 dark:bg-indigo-950 py-16 px-6 md:px-12 text-center overflow-hidden shadow-2xl shadow-indigo-500/20">

          {/* Animated Background Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full -ml-32 -mb-32 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Join the Fight Against Misinformation
            </h2>
            <p className="text-indigo-100 mb-10 text-lg">
              Get weekly digest of newly discovered fake news patterns and system updates directly in your inbox.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-md transition-all"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-2xl bg-white text-indigo-600 font-bold hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-4 text-xs text-indigo-300 font-medium">
              Join 5,000+ subscribers. No spam, ever.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
