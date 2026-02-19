"use client";
import { motion } from "framer-motion";

const FEATURES = [
  { icon: "⚡", title: "Wait-Free Analysis", desc: "Optimized inference pipeline delivers results in under 3 seconds." },
  { icon: "🤖", title: "Dual Intelligence", desc: "Combines 4 traditional ML models with Google's Gemini LLM." },
  { icon: "🔍", title: "Full Transparency", desc: "See exactly why an article was flagged with keyword highlighting." },
  { icon: "📊", title: "Dataset-Backed", desc: "Trained on 20,000+ verified articles from trusted global sources." },
  { icon: "🌐", title: "Open API", desc: "Developers can hook into our detection engine via standard REST API." },
  { icon: "✨", title: "Smart Context", desc: "Gemini 1.5 checks facts against its massive knowledge base." },
];

const TECH = ["Python 3.10", "Flask", "scikit-learn", "NLTK", "Pandas", "Next.js 14", "React", "Tailwind CSS", "Gemini AI"];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden" aria-labelledby="about-heading">

      {/* Background blobs - faint */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-100 rounded-full blur-[120px] opacity-60" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-100 rounded-full blur-[120px] opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-widest mb-4">
            About the Project
          </div>
          <h2 id="about-heading" className="text-3xl md:text-4xl font-bold mb-4 text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Why Build TruthLens?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Misinformation spreads 6x faster than truth. We built TruthLens to give readers a
            fast, unbiased, and explainable tool to verify what they read online.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-indigo-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 group-hover:bg-indigo-100 transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors">
                {f.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Built With Modern Tech</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH.map((t, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-slate-600 text-sm font-medium hover:bg-white hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
