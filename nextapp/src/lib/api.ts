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
    const res = await fetch(`${API_BASE}/api/status`, { cache: "no-store" });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Proxy status fetch failed, trying direct...", e);
  }

  // Fallback for local development if proxy fails
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    const fallbackRes = await fetch(`http://localhost:5000/api/status`, {
      cache: "no-store",
    });
    if (fallbackRes.ok) return await fallbackRes.json();
  }

  throw new Error("Status unavailable");
}

/**
 * Poll for the Gemini background result.
 * Resolves with the gemini object once ready, or null on timeout.
 */
export async function pollGeminiResult(
  requestId: string,
  maxWaitMs = 15000,
  intervalMs = 900
): Promise<Record<string, unknown> | null> {
  const base =
    typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : API_BASE;

  const deadline = Date.now() + maxWaitMs;
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, intervalMs));
    try {
      const res = await fetch(`${base}/api/gemini-result/${requestId}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.ready) return data.gemini as Record<string, unknown>;
      }
    } catch (_) {
      // network blip, keep polling
    }
  }
  return null;
}
