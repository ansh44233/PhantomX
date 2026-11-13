@echo off
echo Starting VoidStream WITHOUT Discord RPC...
echo.
echo This version will not show Discord activity but won't have errors.
echo.

:: Backup current electron.js
copy public\electron.js public\electron-backup.js

:: Use the no-discord version
copy public\electron-no-discord.js public\electron.js

echo Starting app...
call npm run electron-dev

:: Restore original electron.js after app closes
copy public\electron-backup.js public\electron.js
del public\electron-backup.js

echo Restored original electron.js
pause