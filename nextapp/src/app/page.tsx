"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Detector from "@/components/Detector";
import HowItWorks from "@/components/HowItWorks";
import MetricsSection from "@/components/MetricsSection";
import About from "@/components/About";
import Footer from "@/components/Footer";
import TrustCloud from "@/components/TrustCloud";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import Newsletter from "@/components/Newsletter";
import Pricing from "@/components/Pricing";
import { fetchStatus } from "@/lib/api";
import type { SystemStatus } from "@/lib/types";

export default function Home() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [bestAccuracy, setBestAccuracy] = useState<number | null>(null);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 10;

    const checkStatus = () => {
      fetchStatus()
        .then((data) => {
          setStatus(data);
          console.log("Backend status:", data);
        })
        .catch((err) => {
          console.error("Status check failed", err);
          if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(checkStatus, 2000);
          }
        });
    };

    checkStatus();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Header />
      <main>
        <Hero status={status} accuracy={bestAccuracy} />
        <TrustCloud />
        <Detector
          modelReady={status?.model_ready ?? false}
          isConnecting={status === null}
        />
        <HowItWorks />
        <MetricsSection />
        <FAQSection />
        <Pricing />
        <About />
      </main>
      <Footer />
    </div>
  );
}
