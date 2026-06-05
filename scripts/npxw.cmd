@echo off
setlocal EnableExtensions

set "RESOLVED_NODE="
set "RESOLVED_NPX="

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

if defined CODEARTS_MCP_NPX_CMD (
  if exist "%CODEARTS_MCP_NPX_CMD%" set "RESOLVED_NPX=%CODEARTS_MCP_NPX_CMD%"
)

if not defined RESOLVED_NPX if defined RESOLVED_NODE (
  for %%I in ("%RESOLVED_NODE%") do (
    if exist "%%~dpInpx.cmd" set "RESOLVED_NPX=%%~dpInpx.cmd"
  )
)

if not defined RESOLVED_NPX if exist "C:\nvm4w\nodejs\npx.cmd" set "RESOLVED_NPX=C:\nvm4w\nodejs\npx.cmd"
if not defined RESOLVED_NPX if exist "C:\Users\Yao\AppData\Local\nvm\v22.22.1\npx.cmd" set "RESOLVED_NPX=C:\Users\Yao\AppData\Local\nvm\v22.22.1\npx.cmd"
if not defined RESOLVED_NPX if exist "C:\Program Files\nodejs\npx.cmd" set "RESOLVED_NPX=C:\Program Files\nodejs\npx.cmd"

if not defined RESOLVED_NPX (
  for /f "delims=" %%I in ('where npx.cmd 2^>nul') do (
    if not defined RESOLVED_NPX set "RESOLVED_NPX=%%~fI"
  )
)

if not defined RESOLVED_NPX (
  echo [npxw] Unable to locate npx.cmd. Set CODEARTS_MCP_NPX_CMD or install Node.js locally.>&2
  exit /b 1
)

echo [npxw] using %RESOLVED_NPX%
call "%RESOLVED_NPX%" %*
exit /b %ERRORLEVEL%
