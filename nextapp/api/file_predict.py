from flask import Flask, request, jsonify
import sys
import os
import pandas as pd
from werkzeug.exceptions import BadRequest

# Ensure backend modules are importable
BACKEND_DIR = os.path.join(os.path.dirname(__file__), "..", "backend")
sys.path.insert(0, BACKEND_DIR)

# Try importing core logic
try:
    from predictor import predict
    from gemini_analyzer import analyze_with_gemini
except ImportError:
    # Fallback if imports fail (should not happen in prod if deployment correct)
    def predict(t): return {"label": "ERROR", "confidence": 0, "is_fake": False}
    def analyze_with_gemini(*args): return {}

app = Flask(__name__)

# Route for file upload handling
@app.route('/api/predict/file', methods=['POST', 'OPTIONS'])
def handle_file_prediction():
    if request.method == 'OPTIONS':
        return _build_cors_response()

    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        text_content = ""
        
        # CSV Handling
        if file.filename.lower().endswith('.csv'):
            try:
                df = pd.read_csv(file)
                # Intelligently find the text column (first column containing 'text' or 'content' or 'title')
                cols_lower = [c.lower() for c in df.columns]
                target_col = next((c for c in df.columns if 'text' in c.lower() or 'content' in c.lower() or 'title' in c.lower()), None)
                
                if target_col:
                    # Take first 5 rows and combine
                    sample_texts = df[target_col].dropna().astype(str).head(5).tolist()
                    text_content = "\n\n".join(sample_texts)
                else:
                    # Fallback: combine first row
                    text_content = " ".join(df.iloc[0].astype(str).tolist())
            except Exception as e:
                return jsonify({"error": f"Failed to parse CSV: {str(e)}"}), 400
        
        # TXT Handling
        else:
            try:
                text_content = file.read().decode('utf-8', errors='ignore')
            except Exception as e:
                return jsonify({"error": "File decoding failed. Only UTF-8 supported."}), 400

        # Trim and Validate
        text_content = text_content.strip()
        if not text_content:
            return jsonify({"error": "File is empty or contains no readable text."}), 400
        
        if len(text_content) < 20:
             return jsonify({"error": "File content too short (min 20 characters)."}), 400

        # Limit size for API
        text_content = text_content[:15000] 

        # PREDICT
        result = predict(text_content)
        
        # GEMINI (Optional enhancement)
        gemini = {}
        try:
             gemini = analyze_with_gemini(text_content, result["label"], result["confidence"])
        except Exception:
             pass 
        
        result['gemini'] = gemini
        
        return _corsify_actual_response(jsonify(result))

    except Exception as e:
        return jsonify({"error": f"Internal processing error: {str(e)}"}), 500

def _build_cors_response():
    resp = jsonify({})
    resp.headers.add("Access-Control-Allow-Origin", "*")
    resp.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
    resp.headers.add("Access-Control-Allow-Headers", "Content-Type")
    return resp

def _corsify_actual_response(resp):
    resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp
