@echo off
echo ========================================
echo  Clearing Cache and Restarting Dev Server
echo ========================================
echo.

echo [1/4] Stopping any running dev server...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo [2/4] Clearing webpack cache...
if exist node_modules\.cache (
    rmdir /s /q node_modules\.cache
    echo     - Cleared node_modules\.cache
) else (
    echo     - No cache folder found
)

if exist build (
    rmdir /s /q build
    echo     - Cleared build folder
)

echo [3/4] Clearing npm cache...
call npm cache clean --force
echo.

echo [4/4] Starting development server...
echo.
echo ========================================
echo  Cache cleared! Starting fresh server...
echo ========================================
echo.
echo IMPORTANT: 
echo 1. Open browser in INCOGNITO mode (Ctrl+Shift+N)
echo 2. Navigate to http://localhost:3000
echo 3. Check console (F12) - should have NO errors
echo.
echo Starting in 3 seconds...
timeout /t 3 /nobreak >nul
echo.

call npm start
