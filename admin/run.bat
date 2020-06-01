@echo off&setlocal enabledelayedexpansion
::%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit

::define variables
set var=%~dp0
set var=%var:~,-1%
cd /d "%var%"
call "%var%\envConfig.bat"

::print title and backgroud-color
title [%company%-%product%-%service%-%action3%-%current_date2%]
color %bkcolour3%

@echo ------This script is used to run service------
@echo.
@echo.
@echo.
@echo run start......
call cnpm run dev
@echo run stop......

pause
