"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const CODE_SNIPPET = `import requests

url = "https://truthlens.ai/api/predict"
payload = {
    "text": "Scientists discover new species of bioluminescent shark."
}

response = requests.post(url, json=payload)
result = response.json()

print(f"Verdict: {result['label']}")
# Output: Verdict: REAL`;

export default function ApiSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api" className="py-24 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-widest mb-6">
              For Developers
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Integrate TruthLens into Your App
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Building a news aggregator or social platform? Use our REST API to automatically flag misinformation in real-time.
              Our low-latency endpoints handle thousands of requests per second.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "99.9% Uptime SLA",
                "Sub-100ms Latency",
                "Detailed Confidence Scores",
                "Gemini Explanations Included"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-sm">
                    ✓
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <button className="px-8 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200">
              Get API Key
            </button>
          </div>

          {/* Right Code Block */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

            <div className="relative rounded-2xl bg-[#0f172a] border border-slate-700/50 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50 bg-slate-800/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                </div>
                <div className="text-xs font-mono text-slate-400">example.py</div>
              </div>

              <div className="p-6 overflow-x-auto">
                <pre className="text-sm font-mono leading-relaxed">
                  <code className="text-slate-300">
                    <span className="text-pink-400">import</span> requests{"\n\n"}
                    url = <span className="text-emerald-400">"https://truthlens.ai/api/predict"</span>{"\n"}
                    payload = {"{"}{"\n"}
                    {"    "}<span className="text-emerald-400">"text"</span>: <span className="text-amber-400">"Scientists discover..."</span>{"\n"}
                    {"}"}{"\n\n"}
                    response = requests.post(url, json=payload){"\n"}
                    result = response.json(){"\n\n"}
                    <span className="text-blue-400">print</span>(f<span className="text-emerald-400">"Verdict: {"{"}result['label']{"}"}"</span>){"\n"}
                    <span className="text-slate-500"># Output: Verdict: REAL</span>
                  </code>
                </pre>
              </div>

              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className="absolute top-14 right-4 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-400 hover:text-white transition-colors border border-slate-600/50"
                aria-label="Copy code"
              >
                {copied ? (
                  <span className="text-emerald-400 text-xs font-bold px-1">Copied!</span>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 20h6a2 2 0 012-2v-8a2 2 0 01-2-2h-6a2 2 0 01-2 2v8a2 2 0 012 2z" />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
