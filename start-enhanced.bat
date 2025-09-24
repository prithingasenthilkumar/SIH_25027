@echo off
echo ========================================
echo    AyurTrace Enhanced Web Application
echo ========================================
echo.
echo Starting server with animations and smooth transitions...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm packages are installed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo Features Enabled:
echo ✓ Smooth page transitions
echo ✓ Interactive animations
echo ✓ Enhanced hover effects
echo ✓ Progress bar animations
echo ✓ Notification system
echo ✓ Parallax effects
echo ✓ Black/Red theme for signup
echo ✓ Dashboard animations
echo ========================================
echo.

echo Starting server on http://localhost:3000
echo.
echo Demo Panel: Add ?demo=true to any URL to see animation controls
echo Keyboard Shortcut: Ctrl+D to toggle demo panel
echo.

REM Start the server
npm start

pause