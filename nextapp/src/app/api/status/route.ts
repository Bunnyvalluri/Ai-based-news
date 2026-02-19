export async function GET() {
  return Response.json({
    status: "ok",
    model_ready: true,
    gemini_available: true,
    version: "1.0.0"
  });
}
