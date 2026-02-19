import type { PredictionResult, MetricsData, SystemStatus } from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" ? window.location.origin : "");

export async function predictText(text: string): Promise<PredictionResult> {
  const res = await fetch(`${API_BASE}/api/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Prediction failed");
  return data as PredictionResult;
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
  const res = await fetch(`${API_BASE}/api/status`);
  if (!res.ok) throw new Error("Status unavailable");
  return res.json();
}
