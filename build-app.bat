@echo off
echo Building VoidStream Desktop App...
echo.
echo Installing dependencies...
call npm install
echo.
echo Building React app...
call npm run build
echo.
echo Packaging Electron app...
call npm run electron-pack-win
echo.
echo Build complete! Check the 'dist' folder for the installer.
pause