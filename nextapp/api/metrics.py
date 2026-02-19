from flask import Flask, jsonify
import sys
import os

BACKEND_DIR = os.path.join(os.path.dirname(__file__), "..", "backend")
sys.path.insert(0, BACKEND_DIR)

try:
    from predictor import get_model_metrics
except ImportError:
    def get_model_metrics(): return {}

app = Flask(__name__)

@app.route('/api/metrics', methods=['GET', 'OPTIONS'])
def handle_metrics():
    if request.method == 'OPTIONS':
        return _build_cors_response()

    metrics = get_model_metrics()
    return _corsify_actual_response(jsonify(metrics))

def _build_cors_response():
    resp = jsonify({})
    resp.headers.add("Access-Control-Allow-Origin", "*")
    resp.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
    return resp

def _corsify_actual_response(resp):
    resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp
