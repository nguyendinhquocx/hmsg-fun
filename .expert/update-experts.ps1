# PowerShell Script to Update All Expert Files
# Removes duplicate Vietnamese instructions and adds enhanced commands

param(
    [switch]$DryRun = $false,
    [switch]$Backup = $true
)

Write-Host "BMAD Expert System Updater" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# Get all expert files (excluding system files)
$expertFiles = Get-ChildItem -Path "." -Filter "Chuyên gia *.md" 

Write-Host "Found $($expertFiles.Count) expert files to process" -ForegroundColor Yellow

if ($Backup) {
    Write-Host "Creating additional backup..." -ForegroundColor Blue
    $backupDir = "backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    Copy-Item "Chuyên gia *.md" $backupDir -Force
    Write-Host "Backup created in: $backupDir" -ForegroundColor Blue
}

# Load base template
$baseTemplate = Get-Content "_base_template.md" -Raw -Encoding UTF8

foreach ($file in $expertFiles) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Cyan
    
    try {
        # Read original content
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        
        # Find the start of unique expert content (after Vietnamese instructions)
        $lines = $content -split "`n"
        $startIndex = -1
        
        for ($i = 0; $i -lt $lines.Count; $i++) {
            # Look for the end of the Vietnamese instructions section
            if ($lines[$i] -match "^##\s+(?!ƯU TIÊN NGÔN NGỮ)" -and 
                $lines[$i] -notmatch "NGUYÊN TẮC NGÔN NGỮ" -and
                $lines[$i] -notmatch "CẤU TRÚC TRẢ LỜI") {
                $startIndex = $i
                break
            }
        }
        
        if ($startIndex -eq -1) {
            Write-Host "  Warning: Could not find unique content start for $($file.Name)" -ForegroundColor Yellow
            continue
        }
        
        # Extract unique expert content
        $uniqueContent = $lines[$startIndex..($lines.Count-1)] -join "`n"
        
        # Create new file content
        $newContent = $baseTemplate + "`n`n" + $uniqueContent
        
        if ($DryRun) {
            Write-Host "  [DRY RUN] Would update: $($file.Name)" -ForegroundColor Yellow
            Write-Host "  [DRY RUN] Original size: $($content.Length) chars" -ForegroundColor Yellow
            Write-Host "  [DRY RUN] New size: $($newContent.Length) chars" -ForegroundColor Yellow
        } else {
            # Write updated content
            Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
            Write-Host "  ✅ Updated successfully" -ForegroundColor Green
        }
        
    } catch {
        Write-Host "  ❌ Error processing $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

if ($DryRun) {
    Write-Host "`nDRY RUN COMPLETED" -ForegroundColor Yellow
    Write-Host "Run without -DryRun flag to apply changes" -ForegroundColor Yellow
} else {
    Write-Host "`nUPDATE COMPLETED" -ForegroundColor Green
    Write-Host "All expert files have been updated with enhanced commands" -ForegroundColor Green
}

Write-Host "`nNEXT STEPS:" -ForegroundColor Magenta
Write-Host "1. Test enhanced expert consultation flow" -ForegroundColor White
Write-Host "2. Verify *exit, *save, *recommendations commands work" -ForegroundColor White
Write-Host "3. Check consultation documentation auto-generation" -ForegroundColor White
Write-Host "4. Validate BMAD workflow integration" -ForegroundColor White