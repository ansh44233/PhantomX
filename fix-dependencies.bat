@echo off
echo Fixing VoidStream Dependencies...
echo.
echo Removing problematic electron-is-dev...
call npm uninstall electron-is-dev
echo.
echo Reinstalling dependencies...
call npm install
echo.
echo Dependencies fixed! You can now run:
echo npm run electron-dev
echo.
pause