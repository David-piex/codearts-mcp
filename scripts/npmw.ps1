param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$Args
)

$ErrorActionPreference = "Stop"

function Resolve-NodeExe {
  if ($env:CODEARTS_MCP_NODE_EXE -and (Test-Path $env:CODEARTS_MCP_NODE_EXE)) {
    return $env:CODEARTS_MCP_NODE_EXE
  }

  $command = Get-Command node.exe -ErrorAction SilentlyContinue
  if ($command -and $command.Source) {
    return $command.Source
  }

  foreach ($candidate in @(
    "C:\nvm4w\nodejs\node.exe",
    "C:\Users\Yao\AppData\Local\nvm\v22.22.1\node.exe",
    "C:\Program Files\nodejs\node.exe"
  )) {
    if (Test-Path $candidate) {
      return $candidate
    }
  }

  return $null
}

function Resolve-NpmCmd {
  if ($env:CODEARTS_MCP_NPM_CMD -and (Test-Path $env:CODEARTS_MCP_NPM_CMD)) {
    return $env:CODEARTS_MCP_NPM_CMD
  }

  $command = Get-Command npm.cmd -ErrorAction SilentlyContinue
  if ($command -and $command.Source) {
    return $command.Source
  }

  $nodeExe = Resolve-NodeExe
  if ($nodeExe) {
    $nodeDir = Split-Path -Parent $nodeExe
    $pairedNpm = Join-Path $nodeDir "npm.cmd"
    if (Test-Path $pairedNpm) {
      return $pairedNpm
    }
  }

  foreach ($candidate in @(
    "C:\nvm4w\nodejs\npm.cmd",
    "C:\Users\Yao\AppData\Local\nvm\v22.22.1\npm.cmd",
    "C:\Program Files\nodejs\npm.cmd"
  )) {
    if (Test-Path $candidate) {
      return $candidate
    }
  }

  return $null
}

$resolved = Resolve-NpmCmd

if (-not $resolved) {
  throw "Unable to locate npm.cmd. Set CODEARTS_MCP_NPM_CMD or install Node.js locally."
}

Write-Host "[npmw] using $resolved"
& $resolved @Args
exit $LASTEXITCODE
