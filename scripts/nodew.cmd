@echo off
setlocal EnableExtensions

set "RESOLVED_NODE="

if defined CODEARTS_MCP_NODE_EXE (
  if exist "%CODEARTS_MCP_NODE_EXE%" set "RESOLVED_NODE=%CODEARTS_MCP_NODE_EXE%"
)

if not defined RESOLVED_NODE if exist "C:\nvm4w\nodejs\node.exe" set "RESOLVED_NODE=C:\nvm4w\nodejs\node.exe"
if not defined RESOLVED_NODE if exist "C:\Users\Yao\AppData\Local\nvm\v22.22.1\node.exe" set "RESOLVED_NODE=C:\Users\Yao\AppData\Local\nvm\v22.22.1\node.exe"
if not defined RESOLVED_NODE if exist "C:\Program Files\nodejs\node.exe" set "RESOLVED_NODE=C:\Program Files\nodejs\node.exe"

if not defined RESOLVED_NODE (
  for /f "delims=" %%I in ('where node.exe 2^>nul') do (
    if not defined RESOLVED_NODE set "RESOLVED_NODE=%%~fI"
  )
)

if not defined RESOLVED_NODE (
  echo [nodew] Unable to locate node.exe. Set CODEARTS_MCP_NODE_EXE or install Node.js locally.>&2
  exit /b 1
)

echo [nodew] using %RESOLVED_NODE%
"%RESOLVED_NODE%" %*
exit /b %ERRORLEVEL%
