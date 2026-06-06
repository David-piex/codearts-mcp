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

function Resolve-NpxCmd {
  if ($env:CODEARTS_MCP_NPX_CMD -and (Test-Path $env:CODEARTS_MCP_NPX_CMD)) {
    return $env:CODEARTS_MCP_NPX_CMD
  }

  $command = Get-Command npx.cmd -ErrorAction SilentlyContinue
  if ($command -and $command.Source) {
    return $command.Source
  }

  $nodeExe = Resolve-NodeExe
  if ($nodeExe) {
    $nodeDir = Split-Path -Parent $nodeExe
    $pairedNpx = Join-Path $nodeDir "npx.cmd"
    if (Test-Path $pairedNpx) {
      return $pairedNpx
    }

    $pairedPx = Join-Path $nodeDir "px.cmd"
    if (Test-Path $pairedPx) {
      return $pairedPx
    }
  }

  foreach ($candidate in @(
    "C:\nvm4w\nodejs\npx.cmd",
    "C:\Users\Yao\AppData\Local\nvm\v22.22.1\npx.cmd",
    "C:\Program Files\nodejs\npx.cmd"
  )) {
    if (Test-Path $candidate) {
      return $candidate
    }
  }

  return $null
}

$resolved = Resolve-NpxCmd

if (-not $resolved) {
  throw "Unable to locate npx.cmd. Set CODEARTS_MCP_NPX_CMD or install Node.js locally."
}

Write-Host "[npxw] using $resolved"
& $resolved @Args
exit $LASTEXITCODE
