import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  return NextResponse.json({
    status: "ok",
    model_ready: true,
    gemini_available: true,
    version: "1.0.0"
  });
}
