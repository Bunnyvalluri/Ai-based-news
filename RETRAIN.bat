@echo off
title TruthLens — Retrain Model
echo.
echo  Retraining all ML models with existing dataset...
echo.
cd backend
python trainer.py
echo.
echo  [DONE] Retraining complete. Restart START.bat to use the new model.
pause
