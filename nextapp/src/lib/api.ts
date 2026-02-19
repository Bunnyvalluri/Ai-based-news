import type { PredictionResult, MetricsData, SystemStatus } from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" ? window.location.origin : "");

export async function predictText(text: string): Promise<PredictionResult> {
  const body = JSON.stringify({ text });
  const headers = { "Content-Type": "application/json" };

  try {
    const res = await fetch(`${API_BASE}/api/predict`, {
      method: "POST",
      headers,
      body,
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Prediction via proxy failed, trying direct...", e);
  }

  // Local fallback
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    const res = await fetch(`http://localhost:5000/api/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    if (res.ok) return data as PredictionResult;
    throw new Error(data.error || "Prediction failed");
  }

  throw new Error("Prediction server unreachable");
}

export async function predictFile(file: File): Promise<PredictionResult> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_BASE}/api/predict/file`, {
    method: "POST",
    body: form,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "File prediction failed");
  return data as PredictionResult;
}

export async function fetchMetrics(): Promise<MetricsData> {
  const res = await fetch(`${API_BASE}/api/metrics`);
  if (!res.ok) throw new Error("Metrics unavailable");
  return res.json();
}

export async function fetchStatus(): Promise<SystemStatus> {
  try {
    const res = await fetch(`${API_BASE}/api/status`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Proxy status fetch failed, trying direct...", e);
  }

  // Fallback for local development if proxy fails
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    const fallbackRes = await fetch(`http://localhost:5000/api/status`, { cache: 'no-store' });
    if (fallbackRes.ok) return await fallbackRes.json();
  }

  throw new Error("Status unavailable");
}
