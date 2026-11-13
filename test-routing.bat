@echo off
echo Testing VoidStream routing fix...
echo.
echo ✅ ROUTING FIX APPLIED:
echo - Changed from BrowserRouter to HashRouter
echo - This should fix navigation issues in production
echo - Settings and other pages should now work
echo.
echo 🔄 IMPORTANT: Close any running VoidStream instances first!
echo.
pause
echo.
echo Starting VoidStream to test routing...
start "" "dist\win-unpacked\VoidStream.exe"
echo.
echo 🧪 TEST INSTRUCTIONS:
echo 1. Try clicking on different sidebar items (Settings, Search, etc.)
echo 2. Check if pages actually load instead of staying blank
echo 3. The URL should show hash (#) symbols like: #/settings
echo 4. All navigation should work properly now
echo.
echo If navigation works, the routing fix is successful!
pause