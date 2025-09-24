@echo off
echo 📝 Preparing to push changes to GitHub...

echo 📋 Current status:
git status

echo.
set /p commit_message="Enter commit message: "

if "%commit_message%"=="" (
    set commit_message="Update AyurTrace blockchain integration"
)

echo 📦 Adding all changes...
git add .

echo 💾 Committing changes...
git commit -m "%commit_message%"

echo 🚀 Pushing to GitHub...
git push origin main

if %errorlevel% equ 0 (
    echo ✅ Push completed successfully!
    echo 🌐 Changes are now live on GitHub
) else (
    echo ❌ Push failed. Please check your credentials or network.
)
pause