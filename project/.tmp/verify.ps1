$css = Get-Content 'dist\assets\*.css' -Raw
$html = Get-Content 'dist\index.html' -Raw

Write-Output "=== CSS classes present ==="
@('btn--primary','btn--ghost','hero__actions','.skip',':focus-visible','focus:not').ForEach({
    $n = $_
    if ($css -match [regex]::Escape($n)) { Write-Output ("YES: " + $n) } else { Write-Output ("NO:  " + $n) }
})

Write-Output ""
Write-Output "=== index.html elements ==="
@('rel="icon"','href="/assets/images/image.png"','href="#main-content"','class="skip"').ForEach({
    $p = $_
    if ($html -match [regex]::Escape($p)) { Write-Output ("YES: " + $p) } else { Write-Output ("NO:  " + $p) }
})

Write-Output ""
Write-Output "=== CDN refs in dist (should be NONE) ==="
$cdn = Select-String -Path 'dist\assets\*.css','dist\assets\*.js' -Pattern 'gstatic|googleapis' -ErrorAction SilentlyContinue
if ($cdn) { $cdn | Select-Object Filename, Line | Format-Table -AutoSize } else { Write-Output "NONE" }

Write-Output ""
Write-Output "=== font files ==="; Get-ChildItem 'dist\assets\fonts' -ErrorAction SilentlyContinue | Measure-Object | Select-Object Count
Write-Output "=== fetchpriority in JS ==="; (Select-String -Path 'dist\assets\*.js' -Pattern 'fetchpriority' -AllMatches).Matches.Value | Sort-Object -Unique | Write-Output
