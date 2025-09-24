@echo off
echo 🔄 Syncing with GitHub repository...

echo 📥 Step 1: Pulling latest changes...
git pull origin main

if %errorlevel% neq 0 (
    echo ❌ Pull failed. Resolving conflicts...
    echo Please resolve conflicts manually and run this script again.
    pause
    exit /b 1
)

echo 📝 Step 2: Adding local changes...
git add .

echo 💾 Step 3: Committing changes...
set /p commit_message="Enter commit message (or press Enter for default): "
if "%commit_message%"=="" (
    set commit_message="Sync: Update blockchain integration and features"
)
git commit -m "%commit_message%"

echo 🚀 Step 4: Pushing to GitHub...
git push origin main

if %errorlevel% equ 0 (
    echo ✅ Sync completed successfully!
    echo 🎉 Your blockchain project is now synced with GitHub
) else (
    echo ❌ Push failed. Please check your credentials.
)
pause