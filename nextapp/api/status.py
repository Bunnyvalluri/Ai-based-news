"""Vercel serverless: GET /api/status"""
import sys, os, json

BACKEND_DIR = os.path.join(os.path.dirname(__file__), "..", "backend")
sys.path.insert(0, BACKEND_DIR)

from predictor import model_is_ready
try:
    from gemini_analyzer import gemini_is_available
except Exception:
    gemini_is_available = lambda: False


def handler(request, response):
    response.status_code = 200
    response.headers["Content-Type"] = "application/json"
    response.headers["Access-Control-Allow-Origin"] = "*"
    return json.dumps({
        "model_ready":       model_is_ready(),
        "gemini_available":  gemini_is_available(),
        "version":           "2.0.0",
    })
