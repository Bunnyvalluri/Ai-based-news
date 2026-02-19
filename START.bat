@echo off
title TruthLens — AI Fake News Detector
color 0A

echo.
echo  ████████╗██████╗ ██╗   ██╗████████╗██╗  ██╗██╗     ███████╗███╗   ██╗███████╗
echo  ╚══██╔══╝██╔══██╗██║   ██║╚══██╔══╝██║  ██║██║     ██╔════╝████╗  ██║██╔════╝
echo     ██║   ██████╔╝██║   ██║   ██║   ███████║██║     █████╗  ██╔██╗ ██║███████╗
echo     ██║   ██╔══██╗██║   ██║   ██║   ██╔══██║██║     ██╔══╝  ██║╚██╗██║╚════██║
echo     ██║   ██║  ██║╚██████╔╝   ██║   ██║  ██║███████╗███████╗██║ ╚████║███████║
echo     ╚═╝   ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝
echo.
echo  AI-Based Fake News Detection System v1.0
echo  ─────────────────────────────────────────────────────────────────────

:: Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo  [ERROR] Python not found. Please install Python 3.10+ from https://python.org
    pause
    exit /b 1
)

echo.
echo  [1/4] Installing Python dependencies...
pip install -r requirements.txt -q
if errorlevel 1 (
    echo  [ERROR] Failed to install dependencies.
    pause
    exit /b 1
)
echo  [OK] Dependencies installed.

echo.
echo  [2/4] Checking for dataset...
if not exist "backend\data\news_dataset.csv" (
    echo  Dataset not found. Generating synthetic dataset ^(20,000 articles^)...
    cd backend
    python generate_dataset.py
    cd ..
    echo  [OK] Dataset generated.
) else (
    echo  [OK] Dataset found.
)

echo.
echo  [3/4] Checking for trained model...
if not exist "backend\models\best_model.joblib" (
    echo  Model not found. Training ML models ^(this may take 2-5 minutes^)...
    cd backend
    python trainer.py
    cd ..
    echo  [OK] Model trained successfully.
) else (
    echo  [OK] Trained model found.
)

echo.
echo  [4/4] Starting Flask server...
:: Cleanup old processes on port 5000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000 ^| findstr LISTENING') do taskkill /f /pid %%a >nul 2>&1

echo.
echo  ─────────────────────────────────────────────────────────────────────
echo   🌐  TruthLens is running at: http://localhost:5000
echo   📊  API endpoint:             http://localhost:5000/api/predict
echo   🔍  Health check:             http://localhost:5000/api/health
echo  ─────────────────────────────────────────────────────────────────────
echo.
echo  Press Ctrl+C to stop the server.
echo.

cd backend
python app.py

pause
