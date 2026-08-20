<#
批量歌词查证 · 备选链：UtaTen（utaten.com）

miraheze 未收录的歌在此查证。流程：
  1) GET /lyric/search?title=<歌名> 解析出 /lyric/mi.../ 候选页
  2) 逐页抓取，用页面 <title> 与目标歌名做归一化匹配，取第一个匹配页
  3) 提取最多 3 行 hiragana 区块作为语言核验样本（去掉 <span class="rt"> 注音）
结果写入可随时删除且被 Git 忽略的 data/lyrics-fallback.json。

用法：
  powershell -NoProfile -ExecutionPolicy Bypass -File scripts/lookup_utaten.ps1
  powershell ... -From 1 -To 60 -Force -Delay 1400
#>
param(
  [int]$From = 1,
  [int]$To = 1000000,
  [switch]$Force,
  [int]$Delay = 1400,
  [string]$OnlyNos = ""
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$queueFile = Join-Path $root 'data\lyrics-found.json'
$outFile = Join-Path $root 'data\lyrics-fallback.json'
$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'

function Get-Norm([string]$s) {
  return ([System.Net.WebUtility]::HtmlDecode($s).ToLower() -replace '[\p{P}\p{S}\s]', '')
}

function Get-Page([string]$url) {
  for ($i = 0; $i -lt 3; $i++) {
    try {
      $r = Invoke-WebRequest -Uri $url -Headers @{ 'User-Agent' = $ua } -UseBasicParsing -TimeoutSec 20
      if ($r.StatusCode -ge 500) { Write-Host ("    [utaten] HTTP " + $r.StatusCode + " retrying") -ForegroundColor DarkGray; Start-Sleep -Seconds (3 * ($i + 1)); continue }
      return [string]$r.Content
    } catch {
      if ($i -eq 2) { Write-Host ("    [utaten] " + $_.Exception.Message) -ForegroundColor DarkGray; return $null }
      Start-Sleep -Seconds 2
    }
  }
  return $null
}

function Get-CandidateLinks([string]$title) {
  $t = [uri]::EscapeDataString($title)
  $html = Get-Page "https://utaten.com/lyric/search?title=$t&sort=popular_sort_asc&show_artists=1"
  if ($null -eq $html) { return $null }
  # utaten 歌词页链接前缀不固定（mi/jb/hw/sa/ym/ma/nm/ay/qk 等），统一取 /lyric/<字母><数字>/
  $links = @([regex]::Matches($html, 'href="(/lyric/[a-z]+\d+/)"') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique | Where-Object { $_ })
  return $links
}

function Get-PageTitle([string]$html) {
  $m = [regex]::Match($html, '<title>([^<]*)</title>')
  if ($m.Success) { return $m.Groups[1].Value }
  return ''
}

function Get-LyricLines([string]$html) {
  $out = [System.Collections.Generic.List[string]]::new()
  $blocks = [regex]::Matches($html, '<div class="hiragana"[\s\S]*?</div>')
  foreach ($b in $blocks) {
    $t = $b.Value -replace '<span class="rt">[\s\S]*?</span>', ''
    $t = $t -replace '<br\s*/?>', "`n" -replace '<[^>]+>', ''
    $t = [System.Net.WebUtility]::HtmlDecode($t)
    foreach ($line in ($t -split "`n")) {
      $line = $line.Trim()
      if ($line.Length -ge 2 -and $line -match '[\u3040-\u30ff]') { $out.Add($line) }
      if ($out.Count -ge 3) { break }
    }
    if ($out.Count -ge 3) { break }
  }
  return @($out)
}

# ---------- 主流程 ----------

$queue = Get-Content -Raw -Encoding UTF8 $queueFile | ConvertFrom-Json
if ($queue -isnot [System.Array]) { $queue = @($queue) }
$results = @{}
if (Test-Path $outFile) {
  try {
    $existing = Get-Content -Raw -Encoding UTF8 $outFile | ConvertFrom-Json
    if ($existing -isnot [System.Array]) { $existing = @($existing) }
    foreach ($r in $existing) { $results[[int]$r.no] = $r }
  } catch { $results = @{} }
}

$onlySet = if ($OnlyNos) { @($OnlyNos -split ',' | ForEach-Object { [int]$_.Trim() }) } else { @() }
$items = @($queue | Where-Object {
  -not $_.found -and
  [int]$_.no -ge $From -and [int]$_.no -le $To -and
  ($onlySet.Count -eq 0 -or $onlySet -contains [int]$_.no)
})
Write-Host "备选链 UtaTen：待查 $($items.Count) 首（#$From–#$To）…"

foreach ($item in $items) {
  $no = [int]$item.no
  if (-not $Force -and $results.ContainsKey($no)) {
    $prev = $results[$no]
    $info = if ($prev.found) { "找到·$($prev.page)" } else { $prev.reason }
    Write-Host "  #$no 已查（$info），跳过"
    continue
  }
  $title = [string]$item.title
  $normTitle = Get-Norm $title
  $rec = $null
  if ($title -notmatch '[\u3040-\u30ffA-Za-z0-9]') {
    $rec = [pscustomobject]@{ no = $no; title = $title; project = [string]$item.project; found = $false; reason = 'skip-no-kana-title' }
    Write-Host "  #$no [$($item.project)] $title → 跳过（标题无假名，需日文原名）"
  } else {
    $links = Get-CandidateLinks $title
    if ($null -eq $links) {
      $rec = [pscustomobject]@{ no = $no; title = $title; project = [string]$item.project; found = $false; reason = 'utaten-api-error' }
      Write-Host "  #$no [$($item.project)] $title → ✗ 请求失败"
    } elseif ($links.Count -eq 0) {
      $rec = [pscustomobject]@{ no = $no; title = $title; project = [string]$item.project; found = $false; reason = 'utaten-no-result' }
      Write-Host "  #$no [$($item.project)] $title → ✗ 无搜索结果"
    } else {
      $picked = $null
      foreach ($link in @($links | Select-Object -First 3)) {
        $html = Get-Page ("https://utaten.com" + $link)
        Start-Sleep -Milliseconds 400
        if ($null -eq $html) { continue }
        $pt = Get-Norm (Get-PageTitle $html)
        if ($normTitle.Length -gt 0 -and ($pt.Contains($normTitle) -or $normTitle.Contains($pt))) {
          $lines = Get-LyricLines $html
          if ($lines.Count -gt 0) {
            $picked = [pscustomobject]@{ no = $no; title = $title; project = [string]$item.project; found = $true; source = 'utaten'; page = "https://utaten.com$link"; verificationSample = $lines }
            break
          }
        }
      }
      if ($null -eq $picked) {
        $rec = [pscustomobject]@{ no = $no; title = $title; project = [string]$item.project; found = $false; reason = 'utaten-no-match'; candidates = @($links | Select-Object -First 3) }
        Write-Host "  #$no [$($item.project)] $title → ✗ 候选页无匹配歌词"
      } else {
        $rec = $picked
        Write-Host "  #$no [$($item.project)] $title → ✓ $($picked.page)（核验样本 $(@($picked.verificationSample).Count) 行）"
      }
    }
  }
  $results[$no] = $rec
  $sorted = @($results.Keys | Sort-Object) | ForEach-Object { $results[$_] }
  $sorted | ConvertTo-Json -Depth 8 | Set-Content -Encoding UTF8 $outFile
  Start-Sleep -Milliseconds $Delay
}

$foundCount = @($results.Values | Where-Object { $_.found }).Count
Write-Host ""
Write-Host "完成：已处理 $($results.Count) 首，找到歌词 $foundCount 首。结果写入 $outFile"
