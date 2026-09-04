$root = $PSScriptRoot
Set-Location $root
$fail = 0

$pages = 'index.html', 'start\index.html', 'governance\index.html', 'evidence\index.html',
'glossary\index.html', 'author\index.html'

# The redirect stub has no nav, so it is link-checked and version-checked but not nav-compared.
$stubs = 'security\index.html'

# Resolve a page-relative href to a site-root-relative path, so pages at different depths compare.
function Resolve-Target([string]$pageFile, [string]$href) {
  if ($href -match '^(https?:|mailto:|data:)') { return $href }
  $dir = Split-Path $pageFile -Parent
  $frag = ''
  if ($href.Contains('#')) { $frag = $href.Substring($href.IndexOf('#')); $href = $href.Substring(0, $href.IndexOf('#')) }
  if ($href -eq './') { $href = '' }
  $combined = if ($dir) { "$dir\$href" } else { $href }
  $combined = $combined -replace '/', '\'
  $parts = New-Object System.Collections.ArrayList
  foreach ($seg in ($combined -split '\\')) {
    if ($seg -eq '' -or $seg -eq '.') { continue }
    if ($seg -eq '..') { if ($parts.Count) { $parts.RemoveAt($parts.Count - 1) }; continue }
    [void]$parts.Add($seg)
  }
  return '/' + ($parts -join '/') + $frag
}

Write-Output '=========== nav consistency ==========='
$sigs = @{}
foreach ($p in $pages) {
  $raw = Get-Content (Join-Path $root $p) -Raw
  $nav = [regex]::Match($raw, '(?s)<nav class="site-nav".*?</nav>')
  if (-not $nav.Success) { Write-Output "  MISSING NAV $p"; $fail++; continue }
  $items = foreach ($m in [regex]::Matches($nav.Value, '(?s)<a\s+href="([^"]+)"[^>]*>(.*?)</a>')) {
    $label = ($m.Groups[2].Value -replace '(?s)<span.*?</span>', '' -replace '<[^>]+>', '').Trim()
    "$label => " + (Resolve-Target $p $m.Groups[1].Value)
  }
  $sigs[$p] = ($items -join ' ; ')
}
$distinct = @($sigs.Values | Sort-Object -Unique)
Write-Output ("  distinct nav shapes: " + $distinct.Count)
if ($distinct.Count -ne 1) {
  $fail++
  foreach ($k in ($sigs.Keys | Sort-Object)) { Write-Output ("  {0,-22} {1}" -f $k, $sigs[$k]) }
}
else {
  ($distinct[0] -split ' ; ') | ForEach-Object { '    ' + $_ }
}

Write-Output ''
Write-Output '=========== asset versions ==========='
$all = foreach ($p in ($pages + $stubs)) {
  $raw = Get-Content (Join-Path $root $p) -Raw
  [regex]::Matches($raw, '\?v=([\d.]+)') | ForEach-Object { $_.Groups[1].Value }
}
$uniqueVers = @($all | Sort-Object -Unique)
Write-Output ("  versions in use: " + ($uniqueVers -join ', '))
if ($uniqueVers.Count -ne 1) { Write-Output '  MISMATCH'; $fail++ }

Write-Output ''
Write-Output '=========== relative links and assets resolve ==========='
$bad = 0
foreach ($p in ($pages + $stubs)) {
  $full = Join-Path $root $p
  $dir = Split-Path $full
  $raw = Get-Content $full -Raw
  foreach ($m in [regex]::Matches($raw, '(?:href|src)="([^"]+)"')) {
    $t = $m.Groups[1].Value
    if ($t -match '^(https?:|mailto:|data:|#)') { continue }
    $t = (($t -split '#')[0] -split '\?')[0]
    if ($t -eq '') { continue }
    $target = Join-Path $dir $t
    if ($t.EndsWith('/')) { $target = Join-Path $target 'index.html' }
    if (-not (Test-Path $target)) { Write-Output ("  MISSING  {0} -> {1}" -f $p, $m.Groups[1].Value); $bad++ }
  }
}
Write-Output "  broken: $bad"
if ($bad) { $fail++ }

Write-Output ''
Write-Output '=========== same-page anchors ==========='
$sameBad = 0
foreach ($p in $pages) {
  $raw = Get-Content (Join-Path $root $p) -Raw
  $ids = [regex]::Matches($raw, 'id="([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
  foreach ($m in [regex]::Matches($raw, 'href="#([^"]+)"')) {
    if ($ids -notcontains $m.Groups[1].Value) { Write-Output ("  DEAD  {0} -> #{1}" -f $p, $m.Groups[1].Value); $sameBad++ }
  }
}
Write-Output "  dead: $sameBad"
if ($sameBad) { $fail++ }

Write-Output ''
Write-Output '=========== home-page anchors linked from elsewhere ==========='
$homeRaw = Get-Content (Join-Path $root 'index.html') -Raw
$homeIds = [regex]::Matches($homeRaw, 'id="([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
$missing = 0
foreach ($p in $pages) {
  $raw = Get-Content (Join-Path $root $p) -Raw
  foreach ($m in [regex]::Matches($raw, 'href="\.\./#([^"]+)"')) {
    if ($homeIds -notcontains $m.Groups[1].Value) { Write-Output ("  DEAD  {0} -> ../#{1}" -f $p, $m.Groups[1].Value); $missing++ }
  }
}
Write-Output "  dead: $missing"
if ($missing) { $fail++ }

Write-Output ''
Write-Output ("RESULT: " + $(if ($fail) { "$fail check(s) FAILED" } else { 'all checks passed' }))
