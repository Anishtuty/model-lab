@echo off
set /p path=Enter path:

if exist "%path%\*" (
    echo Directory
) else if exist "%path%" (
    echo File
) else (
    echo Not exist
)