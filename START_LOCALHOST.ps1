$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
$port = 4173
Write-Host "Yash Portfolio - Interactive Local Experience" -ForegroundColor Cyan
Write-Host "Opening http://127.0.0.1:$port"
Start-Process "http://127.0.0.1:$port"
if (Get-Command py -ErrorAction SilentlyContinue) {
  py -m http.server $port --bind 127.0.0.1
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
  python -m http.server $port --bind 127.0.0.1
} else {
  throw "Python is not installed or is not available in PATH."
}
