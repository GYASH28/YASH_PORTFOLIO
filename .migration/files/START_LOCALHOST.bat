@echo off
setlocal
cd /d "%~dp0"
set PORT=4173

echo.
echo ==================================================
echo   YASH PORTFOLIO - INTERACTIVE LOCAL EXPERIENCE
echo ==================================================
echo.
echo Starting at http://127.0.0.1:%PORT%
echo Keep this window open. Press Ctrl+C to stop.
echo.

where py >nul 2>nul
if %errorlevel%==0 (
  start "" cmd /c "timeout /t 2 /nobreak >nul & start http://127.0.0.1:%PORT%"
  py -m http.server %PORT% --bind 127.0.0.1
  goto :end
)

where python >nul 2>nul
if %errorlevel%==0 (
  start "" cmd /c "timeout /t 2 /nobreak >nul & start http://127.0.0.1:%PORT%"
  python -m http.server %PORT% --bind 127.0.0.1
  goto :end
)

echo Python was not found on this computer.
echo Install Python from https://www.python.org/downloads/ and enable "Add Python to PATH".
pause

:end
endlocal
