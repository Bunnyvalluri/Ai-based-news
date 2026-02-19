from flask import Flask, jsonify
import os
import sys

app = Flask(__name__)

def _build_cors_response():
    resp = jsonify({})
    resp.headers.add("Access-Control-Allow-Origin", "*")
    resp.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
    resp.headers.add("Access-Control-Allow-Headers", "Content-Type")
    return resp

def _corsify_actual_response(resp):
    resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp

@app.route('/api/status', methods=['GET', 'OPTIONS'])
def handle_status():
    if __name__ != '__main__' and hasattr(app, 'request') and app.request.method == 'OPTIONS':
        return _build_cors_response()

    # Determine paths
    base_dir = os.path.dirname(__file__)
    # Try multiple standard backend locations for Vercel
    possible_backend_dirs = [
        os.path.join(base_dir, '..', 'backend'),
        os.path.join(base_dir, 'backend'),
        os.path.join(os.getcwd(), 'backend'),
        os.path.join(os.getcwd(), 'nextapp', 'backend')
    ]
    
    found_model_path = None
    debug_search = {}
    
    for p in possible_backend_dirs:
        candidate = os.path.join(p, 'models', 'best_model.joblib')
        path_exists = os.path.exists(candidate)
        debug_search[candidate] = path_exists
        if path_exists:
            found_model_path = candidate
            break
            
    # Also list directory contents to help debug
    try:
        root_ls = os.listdir(os.getcwd())
    except:
        root_ls = ["error"]
        
    try:
        api_ls = os.listdir(base_dir)
    except:
        api_ls = ["error"]

    response = {
        "status": "ok",
        "model_ready": found_model_path is not None,
        "version": "1.0.0",
        "debug": {
            "cwd": os.getcwd(),
            "base_dir": base_dir,
            "search_results": debug_search,
            "root_ls": root_ls,
            "api_ls": api_ls
        }
    }
    
    return _corsify_actual_response(jsonify(response))

# Only for local dev
if __name__ == '__main__':
    app.run(port=5328)
