<#
批量歌词查证 · 第一阶段：Vocaloid Lyrics Wiki（miraheze API）

消费 data/songlist.json 中日文歌曲队列，逐首查证歌词来源。
结果只保留来源元数据与最多 3 行语言核验样本，属于可随时删除的本地临时文件。
（miraheze 的 Cloudflare 会拦截 Node/curl 的 TLS 指纹，因此本脚本用 PowerShell/.NET 请求）

用法：
  powershell -NoProfile -ExecutionPolicy Bypass -File scripts/lookup_lyrics.ps1
  powershell ... -From 41 -To 80
  powershell ... -Only 神椿 -Force -Delay 1500
#>
param(
  [int]$From = 1,
  [int]$To = 1000000,
  [string]$Only = "",
  [switch]$Force,
  [int]$Delay = 1300
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$queueFile = Join-Path $root 'data\songlist.json'
$outFile = Join-Path $root 'data\lyrics-found.json'
$api = 'https://vocaloidlyrics.miraheze.org/w/api.php'
$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'

function Invoke-ApiJson([string]$url) {
  for ($i = 0; $i -lt 3; $i++) {
    try {
      return Invoke-RestMethod -Uri $url -Headers @{ 'User-Agent' = $ua } -TimeoutSec 25
    } catch {
      $code = 0
      if ($_.Exception.Response) { $code = [int]$_.Exception.Response.StatusCode }
      if ($code -eq 429 -or $code -ge 500) {
        Start-Sleep -Seconds (4 * ($i + 1))
        continue
      }
      if ($i -eq 2) { Write-Host ("    [api] " + $_.Exception.Message) -ForegroundColor DarkGray; return $null }
      Start-Sleep -Seconds 2
    }
  }
  return $null
}

function Search-Miraheze([string]$title) {
  $q = [uri]::EscapeDataString($title)
  $j = Invoke-ApiJson "${api}?action=query&list=search&srsearch=$q&srlimit=6&format=json&formatversion=2"
  if ($null -eq $j) { return @{ error = 'api-error' } }
  return @{ items = @($j.query.search) }
}

function Get-MirahezeWikitext([string]$page) {
  $p = [uri]::EscapeDataString($page)
  $j = Invoke-ApiJson "${api}?action=parse&page=$p&prop=wikitext&format=json&formatversion=2"
  if ($null -eq $j -or $null -eq $j.parse -or $null -eq $j.parse.wikitext) { return $null }
  return [string]$j.parse.wikitext
}

function Get-LyricLines([string]$wikitext) {
  $body = $wikitext
  $sec = $body.IndexOf('==Lyrics==')
  if ($sec -lt 0) { $sec = $body.IndexOf('==歌詞==') }
  if ($sec -ge 0) { $body = $body.Substring($sec) }
  $out = [System.Collections.Generic.List[string]]::new()
  foreach ($raw in ($body -split "\r?\n")) {
    $line = $raw.Trim()
    if ($line.Length -lt 2) { continue }
    if ($line -match '^(==|\{\{|\}\}|!--|\!|\{\||\[\[Category|作詞|作曲|編曲|歌詞|Lyrics|Romaji|Romanji|Translation|feat|link|URL|Source|Album|Single|投稿|公開|niconico|YouTube|Notes|External)') { continue }
    if ($line.StartsWith('|')) {
      $line = $line.Substring(1).Trim()
      if ($line -match '^[-|]') { continue }
    }
    if ($line -notmatch '[\u3040-\u30ff]') { continue }
    $line = $line -replace '<br\s*/?>', ' '
    $line = ($line -replace '\s{2,}', ' ').Trim()
    if ($line.Length -lt 2) { continue }
    $out.Add(($line -replace '\s{2,}', ' '))
    if ($out.Count -ge 3) { break }
  }
  return @($out)
}

function Get-Normalized([string]$s) {
  return (($s.ToLower()) -replace '[\p{P}\p{S}\s]', '')
}

function Find-Lyrics([string]$title) {
  $r1 = Search-Miraheze $title
  Start-Sleep -Milliseconds 400
  $pages = @()
  if ($r1.error) { return @{ found = $false; reason = 'api-error' } }
  $pages = $r1.items
  if ($pages.Count -eq 0) {
    $r2 = Search-Miraheze ($title + ' Vocaloid')
    Start-Sleep -Milliseconds 400
    if (-not $r2.error) { $pages = @($r2.items) }
  }
  if ($pages.Count -eq 0) { return @{ found = $false; reason = 'no-search-result' } }

  $t = Get-Normalized $title
  $scored = @()
  foreach ($p in $pages) {
    $pt = Get-Normalized ([string]$p.title)
    $score = 0
    if ($pt -eq $t) { $score = 100 }
    elseif ($pt.Contains($t) -or $t.Contains($pt)) { $score = 50 }
    $scored += [pscustomobject]@{ title = [string]$p.title; score = $score }
  }
  $scored = @($scored | Sort-Object -Property score -Descending)
  $best = $scored | Select-Object -First 1
  if ($null -ne $best -and $best.score -ge 50) {
    $wt = Get-MirahezeWikitext $best.title
    if ($null -ne $wt) {
      $lines = Get-LyricLines $wt
      if ($lines.Count -gt 0) {
        return @{
          found = $true
          page = $best.title
          url = 'https://vocaloidlyrics.miraheze.org/wiki/' + ($best.title -replace ' ', '_')
          verificationSample = $lines
          candidates = @($scored | Select-Object -First 3 | ForEach-Object { $_.title })
        }
      }
      return @{ found = $false; reason = 'no-lyric-lines'; page = $best.title }
    }
    return @{ found = $false; reason = 'parse-error' }
  }
  return @{ found = $false; reason = 'no-confident-match'; candidates = @($scored | Select-Object -First 5 | ForEach-Object { $_.title }) }
}

# ---------- 主流程 ----------

$queue = Get-Content -Raw -Encoding UTF8 $queueFile | ConvertFrom-Json
$items = @($queue.items | Where-Object {
  ($_.lang -eq 'jp' -or $_.lang -eq 'mixed') -and
  $_.kind -eq 'song' -and
  [int]$_.no -ge $From -and [int]$_.no -le $To -and
  ($Only -eq '' -or $_.project -eq $Only)
})

$results = @{}
if (Test-Path $outFile) {
  try {
    $existing = Get-Content -Raw -Encoding UTF8 $outFile | ConvertFrom-Json
    foreach ($r in @($existing)) { $results[[int]$r.no] = $r }
  } catch { $results = @{} }
}

$lastNo = if ($queue.counts) { [int]$queue.counts.total } else { 999999 }
$onlyInfo = if ($Only) { "，$Only" } else { '' }
Write-Host "队列 $($items.Count) 首（#$From–#$([Math]::Min($To, $lastNo))$onlyInfo），开始查证 Vocaloid Lyrics Wiki…"

foreach ($item in $items) {
  $no = [int]$item.no
  if (-not $Force -and $results.ContainsKey($no)) {
    $prev = $results[$no]
    $info = if ($prev.found) { "找到·$($prev.page)" } else { $prev.reason }
    Write-Host "  #$no 已查（$info），跳过"
    continue
  }
  $r = Find-Lyrics ([string]$item.title)
  $rec = [pscustomobject]@{
    no = $no
    title = [string]$item.title
    raw = [string]$item.raw
    project = [string]$item.project
    sub = [string]$item.sub
    found = [bool]$r.found
    page = $(if ($r.ContainsKey('page')) { [string]$r.page } else { '' })
    url = $(if ($r.ContainsKey('url')) { [string]$r.url } else { '' })
    verificationSample = $(if ($r.ContainsKey('verificationSample')) { $r.verificationSample } else { @() })
    reason = $(if ($r.ContainsKey('reason')) { [string]$r.reason } else { '' })
    candidates = $(if ($r.ContainsKey('candidates')) { $r.candidates } else { @() })
  }
  $results[$no] = $rec
  $sorted = @($results.Keys | Sort-Object) | ForEach-Object { $results[$_] }
  $sorted | ConvertTo-Json -Depth 8 | Set-Content -Encoding UTF8 $outFile
  if ($r.found) {
    Write-Host "  #$no [$($item.project)] $($item.title) → ✓ $($r.page)（核验样本 $(@($r.verificationSample).Count) 行）"
  } else {
    Write-Host "  #$no [$($item.project)] $($item.title) → ✗ $($r.reason)"
  }
  Start-Sleep -Milliseconds $Delay
}

$foundCount = @($results.Values | Where-Object { $_.found }).Count
Write-Host ""
Write-Host "完成：已处理 $($results.Count) 首，找到歌词 $foundCount 首，未找到 $($results.Count - $foundCount) 首。"
Write-Host "结果写入 $outFile"
