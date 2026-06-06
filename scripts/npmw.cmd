@echo off
setlocal EnableExtensions

set "RESOLVED_NODE="
set "RESOLVED_NPM="

if defined CODEARTS_MCP_NODE_EXE (
  if exist "%CODEARTS_MCP_NODE_EXE%" set "RESOLVED_NODE=%CODEARTS_MCP_NODE_EXE%"
)
if not defined RESOLVED_NODE (
  for /f "delims=" %%I in ('where node.exe 2^>nul') do (
    if not defined RESOLVED_NODE set "RESOLVED_NODE=%%~fI"
  )
)
if not defined RESOLVED_NODE if exist "C:\nvm4w\nodejs\node.exe" set "RESOLVED_NODE=C:\nvm4w\nodejs\node.exe"
if not defined RESOLVED_NODE if exist "C:\Users\Yao\AppData\Local\nvm\v22.22.1\node.exe" set "RESOLVED_NODE=C:\Users\Yao\AppData\Local\nvm\v22.22.1\node.exe"
if not defined RESOLVED_NODE if exist "C:\Program Files\nodejs\node.exe" set "RESOLVED_NODE=C:\Program Files\nodejs\node.exe"

if defined CODEARTS_MCP_NPM_CMD (
  if exist "%CODEARTS_MCP_NPM_CMD%" set "RESOLVED_NPM=%CODEARTS_MCP_NPM_CMD%"
)

if not defined RESOLVED_NPM (
  for /f "delims=" %%I in ('where npm.cmd 2^>nul') do (
    if not defined RESOLVED_NPM set "RESOLVED_NPM=%%~fI"
  )
)

if not defined RESOLVED_NPM if defined RESOLVED_NODE (
  for %%I in ("%RESOLVED_NODE%") do (
    if exist "%%~dpInpm.cmd" set "RESOLVED_NPM=%%~dpInpm.cmd"
  )
)

if not defined RESOLVED_NPM if exist "C:\nvm4w\nodejs\npm.cmd" set "RESOLVED_NPM=C:\nvm4w\nodejs\npm.cmd"
if not defined RESOLVED_NPM if exist "C:\Users\Yao\AppData\Local\nvm\v22.22.1\npm.cmd" set "RESOLVED_NPM=C:\Users\Yao\AppData\Local\nvm\v22.22.1\npm.cmd"
if not defined RESOLVED_NPM if exist "C:\Program Files\nodejs\npm.cmd" set "RESOLVED_NPM=C:\Program Files\nodejs\npm.cmd"

if not defined RESOLVED_NPM (
  echo [npmw] Unable to locate npm.cmd. Set CODEARTS_MCP_NPM_CMD or install Node.js locally.>&2
  exit /b 1
)

echo [npmw] using %RESOLVED_NPM%
call "%RESOLVED_NPM%" %*
exit /b %ERRORLEVEL%
