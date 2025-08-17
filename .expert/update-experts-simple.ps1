# Simple PowerShell Script to Update Expert Files
# Safe version without Vietnamese regex patterns

param(
    [switch]$DryRun = $false
)

Write-Host "BMAD Expert System Updater (Simple)" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

# Get all expert files
$expertFiles = Get-ChildItem -Path "." -Filter "Chuyên gia *.md" 

Write-Host "Found $($expertFiles.Count) expert files to process" -ForegroundColor Yellow

# Check if base template exists
if (-not (Test-Path "_base_template.md")) {
    Write-Host "Error: _base_template.md not found!" -ForegroundColor Red
    exit 1
}

$baseTemplate = Get-Content "_base_template.md" -Raw -Encoding UTF8

foreach ($file in $expertFiles) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Cyan
    
    try {
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        $lines = $content -split "`r?`n"
        
        # Find first line that starts with # and is not Vietnamese instructions
        $startIndex = -1
        $inVietnameseSection = $false
        
        for ($i = 0; $i -lt $lines.Count; $i++) {
            $line = $lines[$i].Trim()
            
            # Skip Vietnamese instruction sections
            if ($line -match "ƯU TIÊN NGÔN NGỮ" -or $line -match "NGUYÊN TẮC NGÔN NGỮ" -or $line -match "CẤU TRÚC TRẢ LỜI") {
                $inVietnameseSection = $true
                continue
            }
            
            # Look for the first heading after Vietnamese instructions
            if ($line -match "^#" -and -not $inVietnameseSection -and $line -notmatch "ƯU TIÊN" -and $line -notmatch "NGUYÊN TẮC") {
                $startIndex = $i
                break
            }
            
            # End of Vietnamese section detection
            if ($inVietnameseSection -and $line -eq "" -and $i -gt 50) {
                $inVietnameseSection = $false
            }
        }
        
        if ($startIndex -eq -1) {
            Write-Host "  Warning: Could not find unique content start, using line 60" -ForegroundColor Yellow
            $startIndex = [Math]::Min(60, $lines.Count - 1)
        }
        
        # Extract unique content
        $uniqueContent = ($lines[$startIndex..($lines.Count-1)] | Where-Object { $_ -ne $null }) -join "`n"
        
        # Create new content
        $newContent = $baseTemplate + "`n`n" + $uniqueContent
        
        if ($DryRun) {
            Write-Host "  [DRY RUN] Would update file" -ForegroundColor Yellow
            Write-Host "  [DRY RUN] Start index: $startIndex" -ForegroundColor Yellow
            Write-Host "  [DRY RUN] Original size: $($content.Length) chars" -ForegroundColor Yellow
            Write-Host "  [DRY RUN] New size: $($newContent.Length) chars" -ForegroundColor Yellow
        } else {
            Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
            Write-Host "  ✅ Updated successfully (start index: $startIndex)" -ForegroundColor Green
        }
        
    } catch {
        Write-Host "  ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

if ($DryRun) {
    Write-Host "`nDRY RUN COMPLETED - No files modified" -ForegroundColor Yellow
} else {
    Write-Host "`nUPDATE COMPLETED" -ForegroundColor Green
}

Write-Host "`nNext: Test expert consultation với enhanced commands" -ForegroundColor Magenta