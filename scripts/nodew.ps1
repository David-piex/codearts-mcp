param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$Args
)

$ErrorActionPreference = "Stop"

function Resolve-NodeExe {
  $candidates = @()

  if ($env:CODEARTS_MCP_NODE_EXE) {
    $candidates += $env:CODEARTS_MCP_NODE_EXE
  }

  $candidates += @(
    "C:\nvm4w\nodejs\node.exe",
    "C:\Users\Yao\AppData\Local\nvm\v22.22.1\node.exe",
    "C:\Program Files\nodejs\node.exe"
  )

  foreach ($candidate in $candidates) {
    if ([string]::IsNullOrWhiteSpace($candidate)) {
      continue
    }

    if (Test-Path $candidate) {
      return $candidate
    }
  }

  $command = Get-Command node.exe -ErrorAction SilentlyContinue
  if ($command -and $command.Source) {
    return $command.Source
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
