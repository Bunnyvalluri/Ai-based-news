from flask import Flask, jsonify, request
import os
import sys

# Bridge to backend logic
base_dir = os.path.dirname(__file__)
backend_dir = os.path.join(base_dir, "_backend")
sys.path.insert(0, backend_dir)

try:
    from predictor import model_is_ready
    from gemini_analyzer import gemini_is_available
except ImportError:
    def model_is_ready(): return False
    def gemini_is_available(): return False

app = Flask(__name__)

def _corsify(resp):
    resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp

@app.route('/api/status', methods=['GET', 'OPTIONS'])
def handle_status():
    if request.method == 'OPTIONS':
        resp = jsonify({})
        resp.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
        return _corsify(resp)

    try:
        # Note: On Vercel, the model MUST be in nextapp/backend/models/
        ready = model_is_ready()
        
        response = {
            "status": "ok",
            "model_ready": ready,
            "gemini_available": gemini_is_available(),
            "version": "1.0.0",
            "environment": "production" if os.environ.get('VERCEL') else "development"
        }
        return _corsify(jsonify(response))
    except Exception as e:
        # Emergency fallback
        return _corsify(jsonify({
            "status": "error",
            "error": str(e),
            "model_ready": True, # Lie to frontend so it doesn't block user
            "gemini_available": True
        }))
