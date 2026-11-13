@echo off
echo Testing VoidStream without ad blocking...
echo.
echo Temporarily switching to preload script without ad blocker...

:: Backup current preload
copy public\preload.js public\preload-backup.js

:: Use the no-ads version
copy public\preload-no-ads.js public\preload.js

echo Starting app...
call npm run electron-dev

:: Restore original preload after app closes
copy public\preload-backup.js public\preload.js
del public\preload-backup.js

echo Restored original preload script.
pause