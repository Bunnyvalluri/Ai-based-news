from flask import Flask, jsonify
import sys
import os

BACKEND_DIR = os.path.join(os.path.dirname(__file__), "..", "backend")
sys.path.insert(0, BACKEND_DIR)

try:
    from predictor import model_is_ready
except ImportError:
    def model_is_ready(): return False

app = Flask(__name__)

@app.route('/api/status', methods=['GET', 'OPTIONS'])
def handle_status():
    if request.method == 'OPTIONS':
        return _build_cors_response()

    ready = False
    try:
        ready = model_is_ready()
    except Exception:
        pass
        
    return _corsify_actual_response(jsonify({"status": "ok", "model_ready": ready, "version": "1.0.0"}))

def _build_cors_response():
    resp = jsonify({})
    resp.headers.add("Access-Control-Allow-Origin", "*")
    resp.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
    return resp

def _corsify_actual_response(resp):
    resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp
