"""
Model Training Module for AI-Based Fake News Detection System.
Implements FR-5.x: Train and evaluate LR, NB, RF, SVM classifiers.
Selects best model by F1-score and serializes artifacts.
"""

import os
import json
import logging
import joblib
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import LinearSVC
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score,
    f1_score, classification_report, confusion_matrix
)
from sklearn.pipeline import Pipeline
from sklearn.calibration import CalibratedClassifierCV

from preprocessor import preprocess_batch
from config import (
    MODEL_PATH, VECTORIZER_PATH, METRICS_PATH,
    TFIDF_MAX_FEATURES, TFIDF_NGRAM_RANGE,
    TRAIN_RATIO, VAL_RATIO, TEST_RATIO
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


CLASSIFIERS = {
    'Logistic Regression': LogisticRegression(
        C=1.0, max_iter=1000, class_weight='balanced', random_state=42
    ),
    'Naive Bayes': MultinomialNB(alpha=0.1),
    'Random Forest': RandomForestClassifier(
        n_estimators=200, max_depth=None, class_weight='balanced',
        random_state=42, n_jobs=-1
    ),
    'SVM (Linear)': CalibratedClassifierCV(
        LinearSVC(C=1.0, max_iter=2000, class_weight='balanced', random_state=42)
    ),
}


def load_dataset(data_path: str) -> pd.DataFrame:
    """Load and validate a CSV dataset."""
    logger.info(f"Loading dataset from: {data_path}")
    df = pd.read_csv(data_path)
    logger.info(f"Loaded {len(df)} records with columns: {list(df.columns)}")
    return df


def prepare_data(df: pd.DataFrame):
    """
    Identify text and label columns, clean and prepare data.
    Returns X (text series) and y (binary int labels).
    """
    # Flexible column detection
    text_col = None
    for col in ['text', 'body', 'content', 'article', 'news', 'headline', 'title']:
        if col in df.columns:
            text_col = col
            break
    if text_col is None:
        # Use first string column
        text_col = df.select_dtypes(include='object').columns[0]

    label_col = None
    for col in ['label', 'class', 'fake', 'target', 'category']:
        if col in df.columns:
            label_col = col
            break
    if label_col is None:
        label_col = df.select_dtypes(include=['int64', 'object']).columns[-1]

    logger.info(f"Using text column: '{text_col}', label column: '{label_col}'")

    # Combine title + text if both exist
    if 'title' in df.columns and text_col != 'title':
        df['combined_text'] = df['title'].fillna('') + ' ' + df[text_col].fillna('')
        text_col = 'combined_text'

    df = df.dropna(subset=[text_col, label_col])

    X = df[text_col].astype(str)

    # Normalize labels to 0/1 (0=REAL, 1=FAKE)
    unique_labels = df[label_col].unique()
    if set(unique_labels).issubset({'FAKE', 'REAL', 'fake', 'real', 0, 1, '0', '1'}):
        label_map = {'FAKE': 1, 'fake': 1, 'FALSE': 1, '1': 1, 1: 1,
                     'REAL': 0, 'real': 0, 'TRUE': 0, '0': 0, 0: 0}
        y = df[label_col].map(label_map).fillna(df[label_col]).astype(int)
    else:
        from sklearn.preprocessing import LabelEncoder
        le = LabelEncoder()
        y = le.fit_transform(df[label_col].astype(str))

    logger.info(f"Class distribution: REAL={sum(y==0)}, FAKE={sum(y==1)}")
    return X, y


def train_and_evaluate(data_path: str) -> dict:
    """
    Full training pipeline:
    1. Load + preprocess data
    2. Train/val/test split
    3. TF-IDF feature extraction
    4. Train all classifiers
    5. Evaluate and select best model
    6. Serialize artifacts
    Returns dict with all model metrics.
    """
    df = load_dataset(data_path)
    X_raw, y = prepare_data(df)

    logger.info("Running text preprocessing pipeline...")
    X_processed = preprocess_batch(X_raw.tolist())

    # Three-way split: 70% train, 15% val, 15% test
    test_size = TEST_RATIO + VAL_RATIO
    X_train_val, X_test, y_train_val, y_test = train_test_split(
        X_processed, y, test_size=test_size, random_state=42, stratify=y
    )
    val_size_rel = VAL_RATIO / (TRAIN_RATIO + VAL_RATIO)
    X_train, X_val, y_train, y_val = train_test_split(
        X_train_val, y_train_val, test_size=val_size_rel, random_state=42, stratify=y_train_val
    )

    logger.info(f"Split sizes — Train: {len(X_train)}, Val: {len(X_val)}, Test: {len(X_test)}")

    # TF-IDF vectorizer fitted only on training data (FR-4.2)
    logger.info("Fitting TF-IDF vectorizer on training data...")
    vectorizer = TfidfVectorizer(
        max_features=TFIDF_MAX_FEATURES,
        ngram_range=TFIDF_NGRAM_RANGE,
        sublinear_tf=True,
        min_df=2
    )
    X_train_tfidf = vectorizer.fit_transform(X_train)
    X_val_tfidf = vectorizer.transform(X_val)
    X_test_tfidf = vectorizer.transform(X_test)

    all_metrics = {}
    best_model_name = None
    best_f1 = -1
    best_clf = None

    for name, clf in CLASSIFIERS.items():
        logger.info(f"\nTraining: {name}...")
        try:
            clf.fit(X_train_tfidf, y_train)

            # Validation metrics
            y_val_pred = clf.predict(X_val_tfidf)
            val_f1 = f1_score(y_val, y_val_pred, average='weighted')
            val_acc = accuracy_score(y_val, y_val_pred)

            # Test metrics
            y_test_pred = clf.predict(X_test_tfidf)
            test_acc = accuracy_score(y_test, y_test_pred)
            test_prec = precision_score(y_test, y_test_pred, average='weighted', zero_division=0)
            test_rec = recall_score(y_test, y_test_pred, average='weighted', zero_division=0)
            test_f1 = f1_score(y_test, y_test_pred, average='weighted')
            test_f1_fake = f1_score(y_test, y_test_pred, pos_label=1, zero_division=0)
            cm = confusion_matrix(y_test, y_test_pred).tolist()
            report = classification_report(
                y_test, y_test_pred, target_names=['REAL', 'FAKE'], output_dict=True
            )

            metrics = {
                'val_accuracy': round(val_acc, 4),
                'val_f1': round(val_f1, 4),
                'accuracy': round(test_acc, 4),
                'precision': round(test_prec, 4),
                'recall': round(test_rec, 4),
                'f1_score': round(test_f1, 4),
                'f1_fake_class': round(test_f1_fake, 4),
                'confusion_matrix': cm,
                'classification_report': report
            }
            all_metrics[name] = metrics

            logger.info(
                f"  Val F1: {val_f1:.4f} | Test Accuracy: {test_acc:.4f} | "
                f"Test F1: {test_f1:.4f} | Fake-F1: {test_f1_fake:.4f}"
            )

            if test_f1 > best_f1:
                best_f1 = test_f1
                best_model_name = name
                best_clf = clf

        except Exception as e:
            logger.error(f"Error training {name}: {e}")
            all_metrics[name] = {'error': str(e)}

    logger.info(f"\n=== Best Model: {best_model_name} (F1={best_f1:.4f}) ===")

    # Save artifacts
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(best_clf, MODEL_PATH)
    joblib.dump(vectorizer, VECTORIZER_PATH)
    logger.info(f"Model saved: {MODEL_PATH}")
    logger.info(f"Vectorizer saved: {VECTORIZER_PATH}")

    results = {
        'best_model': best_model_name,
        'best_f1': round(best_f1, 4),
        'train_size': len(X_train),
        'val_size': len(X_val),
        'test_size': len(X_test),
        'models': all_metrics
    }

    with open(METRICS_PATH, 'w') as f:
        json.dump(results, f, indent=2)
    logger.info(f"Metrics saved: {METRICS_PATH}")

    return results


if __name__ == '__main__':
    import sys
    import os
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

    data_file = os.path.join(os.path.dirname(__file__), '..', 'data', 'news_dataset.csv')
    if not os.path.exists(data_file):
        logger.error(f"Dataset not found at {data_file}. Please run generate_dataset.py first.")
        sys.exit(1)

    results = train_and_evaluate(data_file)
    print(f"\n✅ Training complete! Best model: {results['best_model']} | F1: {results['best_f1']}")
