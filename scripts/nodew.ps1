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

$resolved = Resolve-NodeExe

if (-not $resolved) {
  throw "Unable to locate node.exe. Set CODEARTS_MCP_NODE_EXE or install Node.js locally."
}

Write-Host "[nodew] using $resolved"
& $resolved @Args
exit $LASTEXITCODE
