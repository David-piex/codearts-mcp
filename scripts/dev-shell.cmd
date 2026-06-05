@echo off
setlocal EnableExtensions

powershell -NoExit -ExecutionPolicy Bypass -Command ". '%~dp0use-local-node.ps1'"
exit /b %ERRORLEVEL%
