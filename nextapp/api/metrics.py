"""Vercel serverless: GET /api/metrics"""
import sys, os, json

BACKEND_DIR = os.path.join(os.path.dirname(__file__), "..", "backend")
sys.path.insert(0, BACKEND_DIR)

METRICS_PATH = os.path.join(BACKEND_DIR, "models", "model_metrics.json")


def handler(request, response):
    response.headers["Content-Type"] = "application/json"
    response.headers["Access-Control-Allow-Origin"] = "*"
    if not os.path.exists(METRICS_PATH):
        response.status_code = 404
        return json.dumps({"error": "Model not trained yet"})
    with open(METRICS_PATH) as f:
        data = json.load(f)
    response.status_code = 200
    return json.dumps(data)
