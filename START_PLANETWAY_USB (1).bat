@echo off
title PLANETWAY - USB START
setlocal

cd /d "%~dp0"

echo.
echo ==========================================
echo          PLANETWAY USB START
echo ==========================================
echo.
echo Folder:
echo %CD%
echo.

if not exist "package.json" (
    echo ERROR: package.json nije pronadjen.
    echo.
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo ERROR: node_modules nije pronadjen.
    echo.
    echo Pokreni: npm install
    echo.
    pause
    exit /b 1
)

echo [1/3] Pokrecem PlanetWay Backend...
start "PlanetWay Backend" cmd /k "cd /d ""%~dp0"" && node server.cjs"

timeout /t 2 /nobreak >nul

echo [2/3] Pokrecem PlanetWay Frontend...
start "PlanetWay Frontend" cmd /k "cd /d ""%~dp0"" && npm run dev"

echo.
echo [3/3] Cekam da Vite pokrene platformu...
timeout /t 5 /nobreak >nul

echo Otvaram PlanetWay...
start "" "http://localhost:5173/"

echo.
echo ==========================================
echo PlanetWay je pokrenut.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo ==========================================
echo.
echo Ovaj prozor mozes zatvoriti.
echo Backend i Frontend ostaju pokrenuti u svojim prozorima.
echo.
pause
