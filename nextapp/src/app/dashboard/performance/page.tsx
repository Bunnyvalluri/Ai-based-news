"use client";
import React, { useEffect, useState } from "react";
import { fetchMetrics } from "@/lib/api";
import type { MetricsData } from "@/lib/types";

export default function PerformancePage() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics().then(setMetrics).catch(() => { }).finally(() => setLoading(false));
  }, []);

  const totalRecords = metrics ? (metrics.train_size + metrics.test_size) : 44267;
  const bestAcc = metrics?.models[metrics.best_model]?.accuracy
    ? (metrics.models[metrics.best_model].accuracy * 100).toFixed(1)
    : "95.2";
  const bestModelName = metrics?.best_model || "Random Forest v4.2";

  return (
    <>
      <header className="h-16 flex items-center justify-between px-8 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#101622]/80 backdrop-blur-md sticky top-0 z-10 text-slate-900 dark:text-slate-100">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold">Model Performance Dashboard</h2>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase border border-emerald-500/20">System Healthy</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Actions */}
          <button className="flex items-center gap-2 px-4 py-2 bg-[#135bec] text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Run Benchmark
          </button>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto w-full space-y-6 text-slate-900 dark:text-slate-100">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Records</p>
                <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{totalRecords.toLocaleString()}</h3>
              </div>
              <div className="p-2 bg-[#135bec]/10 text-[#135bec] rounded-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-500">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              <span>+1.2k new samples</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Class Balance</p>
                <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">52% / 48%</h3>
              </div>
              <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
              </div>
            </div>
            <div className="mt-4 w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden flex">
              <div className="bg-[#135bec] w-[52%] h-full"></div>
              <div className="bg-slate-300 dark:bg-slate-500 w-[48%] h-full"></div>
            </div>
            <p className="mt-2 text-[10px] text-slate-400 font-medium">Real vs. Fake distribution</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Peak Accuracy</p>
                <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{bestAcc}%</h3>
              </div>
              <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">{bestModelName}</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Last Retraining</p>
                <h3 className="text-xl font-bold mt-1 text-slate-900 dark:text-white">Oct 27, 2023</h3>
              </div>
              <div className="p-2 bg-slate-500/10 text-slate-500 rounded-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Duration: 2h 14m</span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-[#1e293b]">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Model Comparison Metrics</h4>
                <p className="text-xs text-slate-500 mt-1">Experimental results across validated dataset</p>
              </div>
              <button className="text-xs font-bold text-[#135bec] hover:underline flex items-center gap-1">
                Download CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Model Architecture</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Accuracy</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Precision</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">F1-Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                  {/* Row 1 (Static) */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">Logistic Regression</td>
                    <td className="px-6 py-4 text-center"><span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-mono">0.92</span></td>
                    <td className="px-6 py-4 text-center"><span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-mono">0.91</span></td>
                    <td className="px-6 py-4 text-center"><span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-mono">0.92</span></td>
                  </tr>
                  {/* Row 2 (Static) */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">Naïve Bayes</td>
                    <td className="px-6 py-4 text-center"><span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-mono text-red-500">0.88</span></td>
                    <td className="px-6 py-4 text-center"><span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-mono text-red-500">0.87</span></td>
                    <td className="px-6 py-4 text-center"><span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-mono text-red-500">0.88</span></td>
                  </tr>
                  {/* Row 3 (Best/Real) */}
                  <tr className="bg-[#135bec]/5 hover:bg-[#135bec]/10 transition-colors border-l-4 border-l-[#135bec]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#135bec]">{bestModelName}</span>
                        <span className="text-[10px] font-bold bg-[#135bec] text-white px-1.5 py-0.5 rounded uppercase">Best</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center"><span className="bg-[#135bec] text-white px-2 py-1 rounded text-xs font-mono font-bold mr-1">{Number(bestAcc) / 100 || 0.95}</span></td>
                    <td className="px-6 py-4 text-center"><span className="bg-[#135bec]/10 text-[#135bec] px-2 py-1 rounded text-xs font-mono font-bold">0.94</span></td>
                    <td className="px-6 py-4 text-center"><span className="bg-[#135bec]/10 text-[#135bec] px-2 py-1 rounded text-xs font-mono font-bold">0.95</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Performance Distribution Chart (Visual) */}
          <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h4 className="text-base font-bold mb-6 text-slate-900 dark:text-white">Accuracy Comparison</h4>
            <div className="h-64 flex items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2 px-2">
              {/* Bar 1 */}
              <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="bg-slate-300 dark:bg-slate-700 w-full rounded-t-lg h-[92%] group-hover:bg-slate-400 transition-all relative">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">.92</span>
                </div>
              </div>
              {/* Bar 2 */}
              <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="bg-slate-300 dark:bg-slate-700 w-full rounded-t-lg h-[88%] group-hover:bg-slate-400 transition-all relative">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">.88</span>
                </div>
              </div>
              {/* Bar 3 (Best) */}
              <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="bg-[#135bec] w-full rounded-t-lg h-[95%] group-hover:bg-blue-600 transition-all relative shadow-[0_0_20px_rgba(19,91,236,0.3)]">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-[#135bec] opacity-100 transition-opacity">{Number(bestAcc) / 100}</span>
                </div>
              </div>
              {/* Bar 4 */}
              <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="bg-slate-300 dark:bg-slate-700 w-full rounded-t-lg h-[94%] group-hover:bg-slate-400 transition-all relative">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">.94</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase">
              <span>LogReg</span>
              <span>NBayes</span>
              <span>RandomF</span>
              <span>SVM</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
