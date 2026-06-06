param(
  [switch]$Quiet
)

$ErrorActionPreference = "Stop"

function Resolve-FirstExistingPath {
  param(
    [string[]]$Candidates
  )

  foreach ($candidate in $Candidates) {
    if ([string]::IsNullOrWhiteSpace($candidate)) {
      continue
    }

    if (Test-Path $candidate) {
      return (Resolve-Path $candidate).Path
    }
  }

  return $null
}

$resolvedNode = $null
if ($env:CODEARTS_MCP_NODE_EXE -and (Test-Path $env:CODEARTS_MCP_NODE_EXE)) {
  $resolvedNode = (Resolve-Path $env:CODEARTS_MCP_NODE_EXE).Path
}

if (-not $resolvedNode) {
  $nodeCommand = Get-Command node.exe -ErrorAction SilentlyContinue
  if ($nodeCommand -and $nodeCommand.Source) {
    $resolvedNode = $nodeCommand.Source
  }
}

if (-not $resolvedNode) {
  $resolvedNode = Resolve-FirstExistingPath -Candidates @(
    "C:\nvm4w\nodejs\node.exe",
    "C:\Users\Yao\AppData\Local\nvm\v22.22.1\node.exe",
    "C:\Program Files\nodejs\node.exe"
  )
}

if (-not $resolvedNode) {
  throw "Unable to locate node.exe. Set CODEARTS_MCP_NODE_EXE or install Node.js locally."
}

$nodeDir = Split-Path -Parent $resolvedNode

$resolvedNpm = $null
if ($env:CODEARTS_MCP_NPM_CMD -and (Test-Path $env:CODEARTS_MCP_NPM_CMD)) {
  $resolvedNpm = (Resolve-Path $env:CODEARTS_MCP_NPM_CMD).Path
}

if (-not $resolvedNpm) {
  $npmCommand = Get-Command npm.cmd -ErrorAction SilentlyContinue
  if ($npmCommand -and $npmCommand.Source) {
    $resolvedNpm = $npmCommand.Source
  }
}

if (-not $resolvedNpm) {
  $resolvedNpm = Resolve-FirstExistingPath -Candidates @(
    (Join-Path $nodeDir "npm.cmd"),
    "C:\nvm4w\nodejs\npm.cmd",
    "C:\Users\Yao\AppData\Local\nvm\v22.22.1\npm.cmd",
    "C:\Program Files\nodejs\npm.cmd"
  )
}

if (-not $resolvedNpm) {
  throw "Unable to locate npm.cmd. Set CODEARTS_MCP_NPM_CMD or install Node.js locally."
}

$resolvedNpx = $null
if ($env:CODEARTS_MCP_NPX_CMD -and (Test-Path $env:CODEARTS_MCP_NPX_CMD)) {
  $resolvedNpx = (Resolve-Path $env:CODEARTS_MCP_NPX_CMD).Path
}

if (-not $resolvedNpx) {
  $npxCommand = Get-Command npx.cmd -ErrorAction SilentlyContinue
  if ($npxCommand -and $npxCommand.Source) {
    $resolvedNpx = $npxCommand.Source
  }
}

if (-not $resolvedNpx) {
  $resolvedNpx = Resolve-FirstExistingPath -Candidates @(
    (Join-Path $nodeDir "npx.cmd"),
    (Join-Path $nodeDir "px.cmd"),
    "C:\nvm4w\nodejs\npx.cmd",
    "C:\Users\Yao\AppData\Local\nvm\v22.22.1\npx.cmd",
    "C:\Program Files\nodejs\npx.cmd"
  )
}

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
