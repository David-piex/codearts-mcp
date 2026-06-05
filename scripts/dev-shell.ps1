param(
  [switch]$Quiet
)

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$useLocalNode = Join-Path $scriptDir "use-local-node.ps1"

. $useLocalNode -Quiet:$Quiet

if (-not $Quiet) {
  Write-Host "[dev-shell] local Node toolchain is active in this PowerShell session"
  Write-Host "[dev-shell] node => $(node -v)"
  Write-Host "[dev-shell] npm  => $(npm -v)"
  Write-Host "[dev-shell] npx  => $(npx --version)"
}
