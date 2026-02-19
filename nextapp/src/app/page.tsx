"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Detector from "@/components/Detector";
import MetricsSection from "@/components/MetricsSection";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { fetchStatus, fetchMetrics } from "@/lib/api";
import type { SystemStatus, MetricsData } from "@/lib/types";

export default function Home() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [metricsLoading, setML] = useState(true);
  const [bestAccuracy, setBestAcc] = useState<number | null>(null);

  useEffect(() => {
    fetchStatus()
      .then(setStatus)
      .catch(() => { });

    fetchMetrics()
      .then((m) => {
        setMetrics(m);
        const best = m.models?.[m.best_model];
        if (best?.accuracy) setBestAcc(Math.round(best.accuracy * 100));
      })
      .catch(() => { })
      .finally(() => setML(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#070711]">
      <Header />
      <main>
        <Hero status={status} accuracy={bestAccuracy} />
        <Detector modelReady={status?.model_ready ?? true} />
        <MetricsSection metrics={metrics} loading={metricsLoading} />
        <About />
      </main>
      <Footer />
    </div>
  );
}
