@echo off
echo Enabling Discord RPC for VoidStream...
echo.
echo Make sure Discord desktop app is running!
echo.
echo Installing discord-rpc dependency...
call npm install discord-rpc
echo.
echo Starting VoidStream with Discord RPC enabled...
call npm run electron-dev
pause