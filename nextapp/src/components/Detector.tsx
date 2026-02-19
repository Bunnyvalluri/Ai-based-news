"use client";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { predictText, predictFile } from "@/lib/api";
import type { PredictionResult, TabType } from "@/lib/types";
import ResultPanel from "./ResultPanel";

const EXAMPLES = {
  real: [
    `Scientists at MIT published findings in Nature showing a direct link between sleep quality and cognitive function in adults aged 35–54. The peer-reviewed study tracked 2,340 participants over 18 months and found that consistent sleep below 6 hours significantly impaired memory consolidation and decision-making.`,
    `The Federal Reserve announced interest rates would remain at 5.25% following its meeting on Wednesday. Fed Chair stated that economic data continues to show resilience and that the committee will remain data-dependent in future decisions regarding monetary policy. Markets responded positively.`,
  ],
  fake: [
    `BREAKING: Scientists HIDE evidence that common vitamin D supplements CURES cancer to protect Big Pharma profits! The CDC has been suppressing this information for years — here's the proof they DON'T want you to see! Share before deleted!`,
    `SHOCKING: Government plans to microchip the entire population by 2025 — whistleblower exposes everything! New 5G towers are causing brain cancer! Hollywood actor ARRESTED for human trafficking — mainstream media REFUSES to report!`,
  ],
};

export default function Detector({ modelReady }: { modelReady: boolean }) {
  const [tab, setTab] = useState<TabType>("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleAnalyze = useCallback(async () => {
    setError("");
    if (!text.trim()) { setError("Please enter a news article or headline."); return; }
    if (text.trim().length < 20) { setError("Input too short — please provide at least 20 characters."); return; }
    setLoading(true);
    const announce = document.getElementById("a11y-announcer");
    if (announce) announce.textContent = "Analyzing content, please wait.";

    try {
      const data = await predictText(text);
      setResult(data);
      if (announce) announce.textContent = "Analysis complete. Viewing results below.";
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to connect to the server.");
      if (announce) announce.textContent = "Analysis failed. Error: " + (e instanceof Error ? e.message : "unknown error");
    } finally {
      setLoading(false);
    }
  }, [text]);

  const handleFileAnalyze = useCallback(async () => {
    if (!file) { setError("Please select a file."); return; }
    setLoading(true); setError("");
    try {
      const data = await predictFile(file);
      setResult(data);
      setTab("text");
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "File processing failed.");
    } finally {
      setLoading(false);
    }
  }, [file]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  };

  const TABS: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: "text",
      label: "Text",
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    },
    {
      id: "file",
      label: "File",
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>,
    },
    {
      id: "examples",
      label: "Examples",
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
    },
  ];

  return (
    <section id="detector" className="py-16 md:py-24 bg-white dark:bg-slate-900 transition-colors duration-300" aria-label="Fake News Detector Tool">
      <div id="a11y-announcer" className="sr-only" aria-live="polite"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-4">
            Detector
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900 dark:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Analyze Your Article
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto font-medium">
            Paste any news headline or full article. Our dual AI will classify it in seconds.
          </p>
        </div>

        {!modelReady && (
          <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-sm" role="alert">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <span>Model not trained. Run <code className="bg-amber-100 dark:bg-amber-800/50 px-1.5 py-0.5 rounded text-xs font-mono text-amber-900 dark:text-amber-100">START.bat</code> first.</span>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xl dark:shadow-slate-900/30"
        >
          <div className="flex gap-1 p-2 md:p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                role="tab"
                aria-selected={tab === t.id}
                aria-controls={`panel-${t.id}`}
                className={`flex-1 flex items-center justify-center gap-2 px-3 md:px-4 py-2 rounded-lg md:rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${tab === t.id
                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-4 md:p-6" id={`panel-${tab}`} role="tabpanel">
            <AnimatePresence mode="wait">
              {tab === "text" && (
                <motion.div key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div className="relative">
                    <label htmlFor="article-input" className="sr-only">Article Text</label>
                    <textarea
                      id="article-input"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder={"Paste a news headline or full article here…\n\nExample: 'Scientists at MIT published findings in Nature showing a direct link between sleep quality and cognitive function in adults aged 35–54...'"}
                      rows={8}
                      maxLength={30000}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-sm leading-relaxed p-4 resize-y outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 min-h-[180px]"
                    />
                    <div className="flex justify-between items-center mt-2 px-1 text-xs text-slate-500 dark:text-slate-400">
                      <span>{text.length} chars · {wordCount} words</span>
                      {text && (
                        <button
                          onClick={() => { setText(""); setResult(null); }}
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors focus:outline-none focus:underline"
                        >
                          ✕ Clear
                        </button>
                      )}
                    </div>
                  </div>

                  {error && (
                    <div className="mt-3 flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm" role="alert">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="mt-5 w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-xl shadow-indigo-600/25 cursor-pointer hover:-translate-y-0.5"
                  >
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                          <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                        </svg>
                        <span>Analyzing with AI…</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                        </svg>
                        <span>Analyze Now</span>
                      </>
                    )}
                  </button>
                </motion.div>
              )}

              {tab === "file" && (
                <motion.div key="file" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
                    tabIndex={0}
                    role="button"
                    aria-label="Upload a file"
                    className={`border-2 border-dashed rounded-xl p-8 md:p-12 text-center cursor-pointer transition-all duration-200 ${dragOver
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10"
                        : "border-slate-200 dark:border-slate-700 hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                  >
                    <input ref={fileInputRef} type="file" accept=".txt,.csv" hidden onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} />
                    <svg className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <p className="text-slate-600 dark:text-slate-300 mb-1 font-medium">
                      Drag & drop or <span className="text-indigo-600 dark:text-indigo-400 font-semibold">browse files</span>
                    </p>
                    <p className="text-slate-500 dark:text-slate-500 text-sm">Supports .txt and .csv files up to 2MB</p>
                    {file && (
                      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {file.name}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleFileAnalyze}
                    disabled={!file || loading}
                    className="mt-5 w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    {loading ? "Analyzing…" : "Analyze File"}
                  </button>
                </motion.div>
              )}

              {tab === "examples" && (
                <motion.div key="examples" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Click an example to load it into the analyzer:</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {EXAMPLES.real.map((ex, i) => (
                      <button key={`real-${i}`} onClick={() => { setText(ex); setTab("text"); }}
                        className="text-left p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:border-emerald-300 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        <div className="text-[10px] font-bold tracking-widest text-emerald-700 dark:text-emerald-400 mb-2 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800/50 rounded-full inline-block">REAL NEWS</div>
                        <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed line-clamp-3 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">"{ex}"</p>
                      </button>
                    ))}
                    {EXAMPLES.fake.map((ex, i) => (
                      <button key={`fake-${i}`} onClick={() => { setText(ex); setTab("text"); }}
                        className="text-left p-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 hover:border-red-300 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-red-500">
                        <div className="text-[10px] font-bold tracking-widest text-red-700 dark:text-red-400 mb-2 px-2 py-0.5 bg-red-100 dark:bg-red-900/40 border border-red-200 dark:border-red-800/50 rounded-full inline-block">FAKE NEWS</div>
                        <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed line-clamp-3 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">"{ex}"</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div ref={resultRef} id="results-section">
          <AnimatePresence>
            {result && (
              <ResultPanel
                result={result}
                onReset={() => setResult(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
