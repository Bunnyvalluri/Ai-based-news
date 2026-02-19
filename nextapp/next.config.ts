import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // In production on Vercel, the Python API functions live under /api/
  // In local dev we proxy API calls to the Flask server on :5000
  async rewrites() {
    return process.env.NODE_ENV === "development"
      ? [
        {
          source: "/api/:path*",
          destination: "http://localhost:5000/api/:path*",
        },
      ]
      : [];
  },
};

export default nextConfig;
