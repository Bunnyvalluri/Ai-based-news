"""
Prediction Module for AI-Based Fake News Detection System.
Handles real-time single-article prediction with confidence scoring (FR-7.x).
"""

import os
import json
import logging
import joblib
import numpy as np
from preprocessor import preprocess
from config import MODEL_PATH, VECTORIZER_PATH, METRICS_PATH

logger = logging.getLogger(__name__)

_model = None
_vectorizer = None
_metrics = None


def _load_artifacts():
    """Lazy-load model and vectorizer from disk."""
    global _model, _vectorizer, _metrics

    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                f"No trained model found at {MODEL_PATH}. "
                "Please run trainer.py to train a model first."
            )
        logger.info("Loading model from disk...")
        _model = joblib.load(MODEL_PATH)
        _vectorizer = joblib.load(VECTORIZER_PATH)
        logger.info("Model and vectorizer loaded successfully.")

    if _metrics is None and os.path.exists(METRICS_PATH):
        with open(METRICS_PATH, 'r') as f:
            _metrics = json.load(f)

    return _model, _vectorizer, _metrics


def predict(text: str) -> dict:
    """
    Classify a single piece of text as Real or Fake news.

    Args:
        text: Raw input text from the user.

    Returns:
        Dict with keys:
          - label: 'REAL' or 'FAKE'
          - confidence: float 0-100
          - processed_text: cleaned text
          - model_name: name of the model used
          - model_accuracy: accuracy on held-out test set
    """
    model, vectorizer, metrics = _load_artifacts()

    # Preprocess
    processed = preprocess(text)
    if not processed.strip():
        raise ValueError("Text could not be processed. Please provide more meaningful content.")

    # Vectorize
    features = vectorizer.transform([processed])

    # Predict
    pred_class = model.predict(features)[0]
    label = 'FAKE' if pred_class == 1 else 'REAL'

    # Confidence score
    if hasattr(model, 'predict_proba'):
        proba = model.predict_proba(features)[0]
        confidence = float(proba[pred_class]) * 100
    elif hasattr(model, 'decision_function'):
        decision = model.decision_function(features)[0]
        # Sigmoid transform for SVM
        confidence = float(1 / (1 + np.exp(-abs(decision)))) * 100
    else:
        confidence = 80.0  # Fallback

    confidence = round(min(max(confidence, 0.0), 100.0), 1)

    # Top contributing keywords (explainability)
    top_keywords = _get_top_keywords(model, vectorizer, features, pred_class)

    # Model info
    model_name = metrics.get('best_model', 'Ensemble') if metrics else 'ML Classifier'
    best_metrics = metrics.get('models', {}).get(model_name, {}) if metrics else {}
    model_accuracy = best_metrics.get('accuracy', None)

    return {
        'label': str(label),
        'confidence': float(confidence),
        'processed_text': str(processed[:500]),
        'model_name': str(model_name),
        'model_accuracy': float(round(model_accuracy * 100, 1)) if model_accuracy else None,
        'top_keywords': top_keywords,
        'is_fake': bool(pred_class == 1)
    }


def _get_top_keywords(model, vectorizer, features, pred_class, top_n=10) -> list:
    """
    Extract top TF-IDF keywords contributing to the prediction.
    Works for linear models with coef_ attribute.
    """
    try:
        feature_names = vectorizer.get_feature_names_out()
        nonzero = features.nonzero()[1]
        tfidf_scores = np.array(features[0, nonzero].toarray())[0]

        # For linear models, use coefficients
        if hasattr(model, 'coef_'):
            coefs = model.coef_[0] if model.coef_.ndim > 1 else model.coef_
            coef_scores = coefs[nonzero]
            # Combine TF-IDF weight with model coefficient
            combined = tfidf_scores * np.abs(coef_scores)
        elif hasattr(model, 'calibrated_classifiers_'):
            # CalibratedClassifierCV wrapping LinearSVC
            base = model.calibrated_classifiers_[0].estimator
            if hasattr(base, 'coef_'):
                coef_scores = base.coef_[0][nonzero]
                combined = tfidf_scores * np.abs(coef_scores)
            else:
                combined = tfidf_scores
        else:
            combined = tfidf_scores

        top_indices = combined.argsort()[::-1][:top_n]
        keywords = [
            {'word': feature_names[nonzero[i]], 'score': round(float(combined[i]), 4)}
            for i in top_indices
            if combined[i] > 0
        ]
        return keywords[:top_n]
    except Exception as e:
        logger.debug(f"Keyword extraction failed: {e}")
        return []


def get_model_metrics() -> dict:
    """Return stored model metrics for display in the UI."""
    try:
        _, _, metrics = _load_artifacts()
        return metrics or {}
    except Exception:
        return {}


def model_is_ready() -> bool:
    """Check if trained model artifacts exist."""
    return os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH)
