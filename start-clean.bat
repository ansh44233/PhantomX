@echo off
echo Starting VoidStream (Clean Version)...
echo.
echo This version has Discord RPC completely disabled to avoid errors.
echo.

echo Installing dependencies...
call npm install

echo.
echo Starting the app...
call npm run electron-dev

echo.
echo App closed.
pause