"use client";
import React from "react";

export default function AnalyticsPage() {
  return (
    <>
      <header className="h-16 flex items-center justify-between px-8 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#101622]/80 backdrop-blur-md sticky top-0 z-10 text-slate-900 dark:text-slate-100">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold tracking-tight">Dataset Analytics</h2>
          <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded uppercase border border-emerald-500/20">Live Sync</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#135bec] hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-500/20">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export Dataset
          </button>
        </div>
      </header>

      <div className="p-8 space-y-8 max-w-7xl mx-auto w-full text-slate-900 dark:text-slate-100">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-[#135bec]/10 text-[#135bec] rounded-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
              </div>
              <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">+12%</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Records</p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">42,804</h3>
          </div>

          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span className="text-slate-500 text-xs font-bold">Updated 2m ago</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Authenticity Ratio</p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">1.08:1</h3>
          </div>

          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Unique Sources</p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">856</h3>
          </div>

          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span className="text-slate-500 text-xs font-bold">Stable</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Avg Token Count</p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">342</h3>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donut Chart */}
          <div className="lg:col-span-1 bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h4 className="font-bold text-lg mb-6 text-slate-900 dark:text-white">Class Balance</h4>
            <div className="relative h-64 flex items-center justify-center">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 192 192">
                <circle className="text-slate-100 dark:text-slate-700" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="24"></circle>
                <circle className="text-[#135bec]" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502" strokeDashoffset="241" strokeWidth="24"></circle>
                <circle className="text-rose-500" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502" strokeDashoffset="400" strokeWidth="24"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">42k</span>
                <span className="text-xs text-slate-500 uppercase">Total Items</span>
              </div>
            </div>
            <div className="mt-6 flex justify-around">
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1 justify-center">
                  <span className="w-3 h-3 rounded-full bg-[#135bec]"></span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Real</span>
                </div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">52.4%</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1 justify-center">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Fake</span>
                </div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">47.6%</p>
              </div>
            </div>
          </div>

          {/* Source Distribution */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h4 className="font-bold text-lg mb-6 text-slate-900 dark:text-white">Distribution of News Sources</h4>
            <div className="space-y-5">
              {[
                { name: "Reuters", count: "8,421", pct: "85%", color: "bg-[#135bec]" },
                { name: "Associated Press", count: "7,102", pct: "72%", color: "bg-[#135bec]" },
                { name: "Twitter/X", count: "6,854", pct: "68%", color: "bg-rose-400" },
                { name: "BBC News", count: "5,920", pct: "60%", color: "bg-[#135bec]" },
                { name: "The Guardian", count: "4,210", pct: "42%", color: "bg-[#135bec]" }
              ].map((source, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold uppercase text-slate-500">
                    <span>{source.name}</span>
                    <span>{source.count}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full ${source.color}`} style={{ width: source.pct }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Word Cloud & History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
          {/* Word Cloud */}
          <div className="lg:col-span-1 bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col items-center justify-center">
            <h4 className="font-bold text-lg mb-4 w-full text-left text-slate-900 dark:text-white">Frequent Tokens</h4>
            <div className="flex flex-wrap gap-3 items-center justify-center p-4">
              <span className="text-3xl font-bold text-[#135bec] opacity-90">Election</span>
              <span className="text-xl font-semibold text-slate-400">Claims</span>
              <span className="text-2xl font-bold text-[#135bec]/70">Verified</span>
              <span className="text-sm font-medium text-rose-500/60">Scandal</span>
              <span className="text-lg font-bold text-slate-600 dark:text-slate-300">Report</span>
              <span className="text-4xl font-extrabold text-[#135bec]">Politics</span>
              <span className="text-sm font-semibold text-emerald-500">Official</span>
              <span className="text-xl font-bold text-slate-400">Statement</span>
            </div>
          </div>

          {/* Version History Table */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h4 className="font-bold text-lg mb-6 text-slate-900 dark:text-white">Data Management & Versioning</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                    <th className="pb-3 font-semibold">Version ID</th>
                    <th className="pb-3 font-semibold">Update Date</th>
                    <th className="pb-3 font-semibold">Changes</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-50 dark:divide-slate-800">
                  <tr>
                    <td className="py-4 font-mono font-bold text-[#135bec]">v2.4.1</td>
                    <td className="py-4 text-slate-600 dark:text-slate-400">Oct 24, 2023</td>
                    <td className="py-4 font-medium text-slate-800 dark:text-slate-200">Added X/Twitter 2023 Archive</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-mono font-bold text-[#135bec]">v2.4.0</td>
                    <td className="py-4 text-slate-600 dark:text-slate-400">Oct 15, 2023</td>
                    <td className="py-4 font-medium text-slate-800 dark:text-slate-200">Re-cleaned Reuters dataset</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-mono font-bold text-[#135bec]">v2.3.8</td>
                    <td className="py-4 text-slate-600 dark:text-slate-400">Sep 28, 2023</td>
                    <td className="py-4 font-medium text-slate-800 dark:text-slate-200">Integrated FactCheck.org API</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
