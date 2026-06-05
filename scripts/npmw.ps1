param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$Args
)

$ErrorActionPreference = "Stop"

$candidates = @()

if ($env:CODEARTS_MCP_NPM_CMD) {
  $candidates += $env:CODEARTS_MCP_NPM_CMD
}

$candidates += @(
  "C:\Users\Yao\AppData\Local\nvm\v22.22.1\npm.cmd",
  "C:\nvm4w\nodejs\npm.cmd",
  "C:\Program Files\nodejs\npm.cmd"
)

$resolved = $null
foreach ($candidate in $candidates) {
  if ([string]::IsNullOrWhiteSpace($candidate)) {
    continue
  }

  if (Test-Path $candidate) {
    $resolved = $candidate
    break
  }
}

if (-not $resolved) {
  $command = Get-Command npm.cmd -ErrorAction SilentlyContinue
  if ($command -and $command.Source) {
    $resolved = $command.Source
  }
}

if (-not $resolved) {
  throw "Unable to locate npm.cmd. Set CODEARTS_MCP_NPM_CMD or install Node.js locally."
}

Write-Host "[npmw] using $resolved"
& $resolved @Args
exit $LASTEXITCODE
