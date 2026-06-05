param(
  [switch]$Quiet
)

$ErrorActionPreference = "Stop"

function Resolve-FirstExistingPath {
  param(
    [string[]]$Candidates,
    [string]$CommandName
  )

  foreach ($candidate in $Candidates) {
    if ([string]::IsNullOrWhiteSpace($candidate)) {
      continue
    }

    if (Test-Path $candidate) {
      return (Resolve-Path $candidate).Path
    }
  }

  if ($CommandName) {
    $command = Get-Command $CommandName -ErrorAction SilentlyContinue
    if ($command -and $command.Source) {
      return $command.Source
    }
  }

  return $null
}

$resolvedNode = Resolve-FirstExistingPath -Candidates @(
  $env:CODEARTS_MCP_NODE_EXE,
  "C:\nvm4w\nodejs\node.exe",
  "C:\Users\Yao\AppData\Local\nvm\v22.22.1\node.exe",
  "C:\Program Files\nodejs\node.exe"
) -CommandName "node.exe"

if (-not $resolvedNode) {
  throw "Unable to locate node.exe. Set CODEARTS_MCP_NODE_EXE or install Node.js locally."
}

$nodeDir = Split-Path -Parent $resolvedNode

$resolvedNpm = Resolve-FirstExistingPath -Candidates @(
  $env:CODEARTS_MCP_NPM_CMD,
  (Join-Path $nodeDir "npm.cmd"),
  "C:\nvm4w\nodejs\npm.cmd",
  "C:\Users\Yao\AppData\Local\nvm\v22.22.1\npm.cmd",
  "C:\Program Files\nodejs\npm.cmd"
) -CommandName "npm.cmd"

if (-not $resolvedNpm) {
  throw "Unable to locate npm.cmd. Set CODEARTS_MCP_NPM_CMD or install Node.js locally."
}

$resolvedNpx = Resolve-FirstExistingPath -Candidates @(
  $env:CODEARTS_MCP_NPX_CMD,
  (Join-Path $nodeDir "npx.cmd"),
  "C:\nvm4w\nodejs\npx.cmd",
  "C:\Users\Yao\AppData\Local\nvm\v22.22.1\npx.cmd",
  "C:\Program Files\nodejs\npx.cmd"
) -CommandName "npx.cmd"

if (-not $resolvedNpx) {
  throw "Unable to locate npx.cmd. Set CODEARTS_MCP_NPX_CMD or install Node.js locally."
}

$repoRoot = Split-Path -Parent $PSScriptRoot
$localBinDir = Join-Path $repoRoot "node_modules\.bin"

$pathEntries = @($env:PATH -split ';' | Where-Object { -not [string]::IsNullOrWhiteSpace($_) })
$prependEntries = @()

if (Test-Path $localBinDir) {
  $resolvedLocalBinDir = (Resolve-Path $localBinDir).Path
  if (-not ($pathEntries | Where-Object { $_.TrimEnd('\') -ieq $resolvedLocalBinDir.TrimEnd('\') })) {
    $prependEntries += $resolvedLocalBinDir
  }
}

if (-not ($pathEntries | Where-Object { $_.TrimEnd('\') -ieq $nodeDir.TrimEnd('\') })) {
  $prependEntries += $nodeDir
}

if ($prependEntries.Count -gt 0) {
  $env:PATH = (($prependEntries + $pathEntries) -join ';')
}

$env:CODEARTS_MCP_NODE_EXE = $resolvedNode
$env:CODEARTS_MCP_NPM_CMD = $resolvedNpm
$env:CODEARTS_MCP_NPX_CMD = $resolvedNpx

if (-not $Quiet) {
  $isDotSourced = $MyInvocation.InvocationName -eq "."
  Write-Host "[use-local-node] node.exe => $resolvedNode"
  Write-Host "[use-local-node] npm.cmd  => $resolvedNpm"
  Write-Host "[use-local-node] npx.cmd  => $resolvedNpx"
  if (Test-Path $localBinDir) {
    Write-Host "[use-local-node] .bin     => $localBinDir"
  }
  Write-Host "[use-local-node] PATH     => prepended resolved tool directories"
  if (-not $isDotSourced) {
    Write-Warning "To keep these environment changes in the current PowerShell session, run: . .\scripts\use-local-node.ps1"
  }
}
