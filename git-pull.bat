@echo off
echo 🔄 Pulling latest changes from GitHub...
git pull origin main
if %errorlevel% equ 0 (
    echo ✅ Pull completed successfully!
    echo 📦 Installing/updating dependencies...
    npm install
    echo 🎉 Ready to run!
) else (
    echo ❌ Pull failed. Please check for conflicts.
)
pause