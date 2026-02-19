import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // In local dev, proxy /api/* to Flask so the full ML model is used.
  // In production (Vercel), the src/pages/api/ TypeScript handlers serve requests.
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/predict",
          destination: "http://localhost:5000/api/predict",
        },
        {
          source: "/api/predict/file",
          destination: "http://localhost:5000/api/predict/file",
        },
        {
          source: "/api/status",
          destination: "http://localhost:5000/api/status",
        },
        {
          source: "/api/metrics",
          destination: "http://localhost:5000/api/metrics",
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
