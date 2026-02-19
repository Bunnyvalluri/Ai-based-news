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

// The user's specific tech stack
const TECH_STACK = [
  "Python 3.10", "Flask", "scikit-learn", "NLTK", "Pandas",
  "Next.js 14", "React", "Tailwind CSS", "Gemini AI"
];

// Duplicate for seamless loop
const MARQUEE_ITEMS = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-300" aria-labelledby="about-heading">

      {/* Background blobs - faint (Dark/Light aware) */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-[120px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-4">
            About the Project
          </div>
          <h2 id="about-heading" className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Why Build TruthLens?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Misinformation spreads 6x faster than truth. We built TruthLens to give readers a
            fast, unbiased, and explainable tool to verify what they read online.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 hover:border-indigo-100 dark:hover:border-indigo-500/30 shadow-sm hover:shadow-xl dark:hover:shadow-indigo-500/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-800 transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                {f.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Animated Tech Stack Section */}
        <div className="text-center">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-8">Built With Modern Tech</h4>

          <div className="relative max-w-4xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
              {MARQUEE_ITEMS.map((tech, i) => (
                <div
                  key={`${tech}-${i}`}
                  className="px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-bold shadow-sm flex items-center gap-2 whitespace-nowrap hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-md transition-colors duration-300 cursor-default"
                >
                  <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-500 group-hover:bg-indigo-400"></span>
                  {tech}
                </div>
              ))}
            </div>
          </div>

          <style jsx global>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                animation: marquee 30s linear infinite;
              }
            `}</style>
        </div>
      </div>
    </section>
  );
}
