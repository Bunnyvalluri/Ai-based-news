"use client";
import { motion } from "framer-motion";

const FEATURES = [
  { icon: "🤖", title: "Dual AI Engine", desc: "ML models (Naive Bayes, SVM, Logistic, Random Forest) combined with Google Gemini for maximum accuracy." },
  { icon: "⚡", title: "Real-Time Analysis", desc: "Blazing-fast inference in under 3 seconds. No queues, no waiting — just instant, on-demand detection." },
  { icon: "🔍", title: "Explainable AI", desc: "See exactly which keywords and patterns drove the classification decision with TF-IDF importance scores." },
  { icon: "📊", title: "90%+ Accuracy", desc: "Trained on 20K+ labeled articles from credible sources, validated on a held-out test set." },
  { icon: "🌐", title: "REST API", desc: "Programmatic access via a clean REST API. Integrate fake-news detection into your own apps and workflows." },
  { icon: "✨", title: "Gemini Contextual AI", desc: "Google Gemini 1.5 Flash provides credibility scoring, red-flag identification, and reader recommendations." },
];

const TECH = ["Python 3.10+", "Flask", "scikit-learn", "NLTK", "Pandas", "NumPy", "joblib", "REST API", "Gemini AI", "Next.js", "React", "Tailwind CSS"];

export default function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-transparent via-indigo-500/[0.02] to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">
            About
          </div>
          <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Why TruthLens?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Misinformation erodes trust and causes real harm. TruthLens combines classical machine learning
            rigor with Google Gemini's advanced reasoning to give you a dual-perspective verdict you can count on.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass rounded-2xl p-6 hover:-translate-y-1 hover:border-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {f.icon}
              </div>
              <h3 className="font-bold text-white mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mb-4">Tech Stack</p>
          <div className="flex flex-wrap justify-center gap-2">
            {TECH.map((t) => (
              <span
                key={t}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 hover:-translate-y-0.5 ${t === "Gemini AI"
                    ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                    : t === "Next.js" || t === "React" || t === "Tailwind CSS"
                      ? "bg-teal-500/10 border-teal-500/30 text-teal-400"
                      : "glass text-slate-400 hover:border-indigo-500/30 hover:text-slate-200"
                  }`}
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
