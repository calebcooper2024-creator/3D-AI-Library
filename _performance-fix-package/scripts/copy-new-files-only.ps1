# Run this from inside the handoff package folder, not from project root.
# This script copies only the three new source files.
# It does not patch existing files.
# Existing files must still be edited manually using file-fixes/*.md.

$ProjectRoot = "C:\Users\Caleb\Downloads\calebs-3d-case-study"

$Files = @(
  @{ Source = "new-files\src\lib\heavyMotion.ts"; Target = "src\lib\heavyMotion.ts" },
  @{ Source = "new-files\src\lib\videoPlaybackCoordinator.ts"; Target = "src\lib\videoPlaybackCoordinator.ts" },
  @{ Source = "new-files\src\components\ManagedHeroVideo.tsx"; Target = "src\components\ManagedHeroVideo.tsx" }
)

foreach ($File in $Files) {
  $SourcePath = Join-Path (Get-Location) $File.Source
  $TargetPath = Join-Path $ProjectRoot $File.Target
  $TargetDir = Split-Path $TargetPath -Parent

  if (!(Test-Path $SourcePath)) {
    Write-Error "Missing source file: $SourcePath"
    exit 1
  }

  if (!(Test-Path $TargetDir)) {
    New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
  }

  if (Test-Path $TargetPath) {
    Write-Host "Target already exists, not overwriting: $TargetPath"
    Write-Host "Review manually before replacing."
  } else {
    Copy-Item $SourcePath $TargetPath
    Write-Host "Copied: $TargetPath"
  }
}
