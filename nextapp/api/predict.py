"""
Vercel Python Serverless Function — POST /api/predict
Handles text-based fake news prediction using the trained ML model + Gemini AI.
"""
import sys
import os
import json
import time

# Add backend folder to path so we can import predictor, gemini_analyzer, config
BACKEND_DIR = os.path.join(os.path.dirname(__file__), "..", "backend")
sys.path.insert(0, BACKEND_DIR)

from predictor import predict
from gemini_analyzer import analyze_with_gemini


def _cors(response_body: dict, status: int = 200):
    return {
        "statusCode": status,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
        "body": json.dumps(response_body),
    }


def handler(request, response):
    """Vercel Python runtime handler."""
    if request.method == "OPTIONS":
        response.status_code = 200
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return ""

    if request.method != "POST":
        response.status_code = 405
        return json.dumps({"error": "Method not allowed"})

    try:
        body = request.body if hasattr(request, "body") else request.get_data(as_text=True)
        if isinstance(body, bytes):
            body = body.decode("utf-8")
        data = json.loads(body) if isinstance(body, str) else body
        text = (data.get("text") or "").strip()
    except Exception:
        response.status_code = 400
        return json.dumps({"error": "Invalid JSON body"})

    if not text:
        response.status_code = 400
        return json.dumps({"error": "Field 'text' is required"})
    if len(text) < 20:
        response.status_code = 400
        return json.dumps({"error": "Text too short (min 20 chars)"})

    t0 = time.time()
    try:
        result = predict(text)
    except Exception as e:
        response.status_code = 500
        return json.dumps({"error": f"Prediction failed: {str(e)}"})
    ml_ms = round((time.time() - t0) * 1000)

    t1 = time.time()
    gemini = analyze_with_gemini(text, result["label"], result["confidence"])
    g_ms = round((time.time() - t1) * 1000)

    result.update(gemini)
    result["ml_time_ms"] = ml_ms
    result["gemini_time_ms"] = g_ms
    result["response_time_ms"] = round((time.time() - t0) * 1000)

    response.status_code = 200
    response.headers["Content-Type"] = "application/json"
    response.headers["Access-Control-Allow-Origin"] = "*"
    return json.dumps(result)
