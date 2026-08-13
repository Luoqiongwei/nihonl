<#
批量歌词查证 · 网易云音乐链（music.163.com）

思路：网易云有不少 V 家/神椿歌曲带「日文原文 + 中文翻译」双行歌词。
流程：
  1) GET /api/search/get/web?s=<歌名>&type=1 搜歌曲，按标题归一化 + 歌手提示打分
  2) GET /api/song/lyric?id=<id>&lv=-1&kv=-1&tv=-1 取 lrc（日文）与 tlyric（中文）
  3) 按时间戳配对成 ja/zh 行
结果写入 data/lyrics-netease.json，可断点续跑。

用法：
  powershell -NoProfile -ExecutionPolicy Bypass -File scripts/lookup_netease.ps1
  powershell ... -From 1 -To 100 -OnlyNos 49,77,84 -Delay 1200
#>
param(
  [int]$From = 1,
  [int]$To = 1000000,
  [switch]$Force,
  [int]$Delay = 1200,
  [string]$OnlyNos = ""
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$queueFile = Join-Path $root 'data\lyrics-found.json'
$outFile = Join-Path $root 'data\lyrics-netease.json'
$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'

function Get-Norm([string]$s) {
  return ([System.Net.WebUtility]::HtmlDecode($s).ToLower() -replace '[\p{P}\p{S}\s]', '')
}

# 中文标题 → 日文原名的映射（用户提示：不少中文标题其实是日文歌，按歌手/制作人推断）
$titleMap = @{
  '心理作用' = '心做し'
  '曾经我也想过一了百了' = '僕が死のうと思ったのは'
  '那个夏日已然饱和。' = 'あの夏が飽和する'
  '不要说再见' = 'サヨナラは言わないでさ'
  '成为空' = 'くうになる'
  '群青赞歌' = '群青讃歌'
  '回避暧昧' = '曖昧回避'
  '小小的我' = 'ちいさなわたし'
  '已经死掉了' = 'もう死んでる'
}

# 从 raw 标题里提取「歌手/制作人」提示（片假名/平假名 token，过滤常见非人名）
$hintStop = @('オリジナル','日本語','中日','字幕','収録','公式','歌詞','ボカロ','オリジナル曲','自調','搬运','翻唱','中文','原创曲','原创','MV','PV','ver','Ver','feat','Cover','cover','カバー','版','纪念','周年','生贺','企划','単品','原创歌曲','曲','歌','篇','第','号','期','话','收录','广播','播放器','样式','中字','官方','投稿','新曲','无','影像','音乐','音频','動画','歌ってみた','セカイ','プロセカ','ver.','视频','作品','频道','虚拟','歌手','推荐','东方','收藏','安利','分享','现场','歌词','字幕','翻唱','原曲','专辑','单曲','乐','唱','声','曲目','音乐推荐')
function Get-ArtistHint([string]$raw, [string]$title) {
  $rest = $raw -replace [regex]::Escape($title), ''
  $tokens = [regex]::Matches($rest, '[\u4e00-\u9fff\u3040-\u30ffＡ-Ｚａ-ｚA-Za-z0-9]{2,16}')
  foreach ($tk in $tokens) {
    $v = $tk.Value
    $hasStopSub = $false
    foreach ($s in $hintStop) {
      if ($s.Length -ge 2 -and $v.Contains($s)) { $hasStopSub = $true; break }
      if ($s.Length -eq 1 -and $v -eq $s) { $hasStopSub = $true; break }
    }
    if (-not $hasStopSub -and $v -notmatch '^(feat|ver|cover)' -and $v -notmatch '^[A-Za-z0-9]+$' -and $v -notmatch '[A-Za-z0-9]') {
      return $v
    }
  }
  return ''
}

function Get-SearchTitle([string]$title) {
  if ($titleMap.ContainsKey($title)) { return $titleMap[$title] }
  # 取 '/' '／' 的第一段（跳过空段），再去掉 '（' ' - ' 后缀
  $t = ($title -split '[/／]' | Where-Object { $_.Trim() } | Select-Object -First 1)
  if ($null -eq $t) { $t = $title }
  $t = ($t -split '[（(]')[0]
  $t = ($t -split ' - ')[0].Trim()
  # 丢弃「、」分隔的人名/版本后缀（如「とても痛い痛がりたい 朝比奈まふゆ、初音ミク…」）
  $parts = $t -split '\s+'
  $keep = @()
  foreach ($p in $parts) {
    if ($p -match '、' -or $p -match '^(SEKAI|ver\.?|V\.?)$' -or $p -in @('ver','Ver','SEKAI')) { break }
    $keep += $p
  }
  return (($keep -join ' ').Trim())
}

function Get-Json([string]$url) {
  for ($i = 0; $i -lt 3; $i++) {
    try {
      $raw = curl.exe -s -A $ua -H "Referer: https://music.163.com/" --max-time 30 $url
      if ($LASTEXITCODE -ne 0) { throw "curl exit $LASTEXITCODE" }
      if ([string]::IsNullOrWhiteSpace($raw)) { throw 'empty response' }
      return ($raw | ConvertFrom-Json)
    } catch {
      if ($i -eq 2) { return $null }
      Start-Sleep -Seconds (2 * ($i + 1))
    }
  }
  return $null
}

function Get-SearchResults([string]$query) {
  $u = 'https://music.163.com/api/search/get/web?s=' + [uri]::EscapeDataString($query) + '&type=1&offset=0&limit=12'
  $j = Get-Json $u
  if ($null -eq $j -or $null -eq $j.result -or $null -eq $j.result.songs) { return @() }
  return @($j.result.songs)
}

function Get-LyricPair([int64]$songId) {
  $u = "https://music.163.com/api/song/lyric?id=$songId&lv=-1&kv=-1&tv=-1"
  $j = Get-Json $u
  if ($null -eq $j) { return $null }
  $lrcText = if ($null -ne $j.lrc) { [string]$j.lrc.lyric } else { '' }
  $tlText = if ($null -ne $j.tlyric) { [string]$j.tlyric.lyric } else { '' }
  if ([string]::IsNullOrWhiteSpace($lrcText)) { return $null }

  function Parse-Lrc([string]$text) {
    $map = @{}
    foreach ($m in [regex]::Matches($text, '\[(\d+):(\d+(?:\.\d+)?)\](.*)')) {
      $sec = ([int]$m.Groups[1].Value * 60) + [double]$m.Groups[2].Value
      $line = $m.Groups[3].Value.Trim()
      if ($line -and $line -notmatch '^(作词|作曲|编曲|作詞|作曲|編曲|制作人|混音|吉他|贝斯|鼓|和声|原文|翻译|by:|词：|曲：)') {
        $map[[math]::Round($sec, 3)] = $line
      }
    }
    return $map
  }
  $ja = Parse-Lrc $lrcText
  $zh = Parse-Lrc $tlText
  $keys = @($ja.Keys | Sort-Object)
  $out = [System.Collections.Generic.List[object]]::new()
  foreach ($k in $keys) {
    $zhLine = if ($zh.ContainsKey($k)) { $zh[$k] } else { '' }
    $out.Add([pscustomobject]@{ t = $k; ja = $ja[$k]; zh = $zhLine })
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
Write-Host "网易云链：待查 $($items.Count) 首（#$From–#$To）…"

foreach ($item in $items) {
  $no = [int]$item.no
  if (-not $Force -and $results.ContainsKey($no)) {
    $prev = $results[$no]
    $info = if ($prev.found) { "找到·$($prev.songName)" } else { $prev.reason }
    Write-Host "  #$no 已查（$info），跳过"
    continue
  }
  $title = [string]$item.title
  $raw = [string]$item.raw
  $st = Get-SearchTitle $title
  $hint = Get-ArtistHint $raw $title
  $rec = $null

  if ([string]::IsNullOrWhiteSpace($st)) {
    $rec = [pscustomobject]@{ no = $no; title = $title; project = [string]$item.project; found = $false; reason = 'skip-no-kana-title' }
    Write-Host "  #$no [$($item.project)] $title → 跳过（标题为空，需日文原名）"
  } else {
    $query = $st
    $songs = Get-SearchResults $query
    if ($songs.Count -eq 0) {
      $rec = [pscustomobject]@{ no = $no; title = $title; project = [string]$item.project; found = $false; reason = 'netease-no-result'; query = $query }
      Write-Host "  #$no [$($item.project)] $title → ✗ 无搜索结果（$query）"
    } else {
      $normSt = Get-Norm $st
      $scored = @()
      foreach ($s in $songs) {
        $sTitle = Get-Norm ([string]$s.name)
        if ($sTitle -ne $normSt) { continue }
        $score = 2
        if ($hint) {
          $artistStr = (($s.artists | ForEach-Object { $_.name }) -join ' ')
          $normHint = Get-Norm $hint
          if ($artistStr -match [regex]::Escape($normHint)) { $score += 3 }
          elseif ($artistStr -match [regex]::Escape($hint)) { $score += 3 }
        }
        $scored += [pscustomobject]@{ s = $s; score = $score }
      }
      if ($scored.Count -eq 0) {
        $rec = [pscustomobject]@{ no = $no; title = $title; project = [string]$item.project; found = $false; reason = 'netease-title-mismatch'; query = $query; candidates = @($songs | Select-Object -First 5 | ForEach-Object { "$($_.name) - $((($_.artists | ForEach-Object { $_.name }) -join '/')) (id=$($_.id))" }) }
        Write-Host "  #$no [$($item.project)] $title → ✗ 无精确标题匹配（$query）"
      } else {
        $best = $scored | Sort-Object score -Descending | Select-Object -First 1
        $pairs = Get-LyricPair $best.s.id
        if ($null -eq $pairs -or $pairs.Count -eq 0) {
          $rec = [pscustomobject]@{ no = $no; title = $title; project = [string]$item.project; found = $false; reason = 'netease-no-lyric'; songId = $best.s.id; songName = $best.s.name; artists = @($best.s.artists | ForEach-Object { $_.name }); candidates = @($scored | Select-Object -First 6 | ForEach-Object { "$($_.s.name) / $(($_.s.artists | ForEach-Object { $_.name }) -join '/') (id=$($_.s.id))" }) }
          Write-Host "  #$no [$($item.project)] $title → ✗ 无歌词（$($best.s.name) / $(($best.s.artists | ForEach-Object { $_.name }) -join '/'))"
        } else {
          $rec = [pscustomobject]@{ no = $no; title = $title; project = [string]$item.project; found = $true; source = 'netease'; songId = $best.s.id; songName = $best.s.name; artists = @($best.s.artists | ForEach-Object { $_.name }); lines = $pairs; candidates = @($scored | Select-Object -First 6 | ForEach-Object { "$($_.s.name) / $(($_.s.artists | ForEach-Object { $_.name }) -join '/') (id=$($_.s.id))" }) }
          Write-Host "  #$no [$($item.project)] $title → ✓ $($best.s.name) / $(($best.s.artists | ForEach-Object { $_.name }) -join '/')（$($pairs.Count) 行）"
        }
      }
    }
  }
  $results[$no] = $rec
  $sorted = @($results.Keys | Sort-Object) | ForEach-Object { $results[$_] }
  $sorted | ConvertTo-Json -Depth 10 | Set-Content -Encoding UTF8 $outFile
  Start-Sleep -Milliseconds $Delay
}

$foundCount = @($results.Values | Where-Object { $_.found }).Count
Write-Host ""
Write-Host "完成：已处理 $($results.Count) 首，网易云找到歌词 $foundCount 首。结果写入 $outFile"
