/* 将标题解析、已确认来源和人工校订合并为一份可追溯审计。
 * 用法：node scripts/build_song_audit.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { curatedSongAdditions } from '../data/curated-song-additions.js';
import { songs } from '../src/data/songs.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (relative) => JSON.parse(
  fs.readFileSync(path.join(root, relative), 'utf8').replace(/^\uFEFF/, '')
);

const queue = readJson('data/songlist.json');
const previousAuditPath = path.join(root, 'data', 'song-audit.json');
const previousAudit = fs.existsSync(previousAuditPath)
  ? readJson('data/song-audit.json')
  : { items: [] };
const previousEvidenceByNo = new Map(
  (previousAudit.items || []).map((item) => [Number(item.no), item.evidence || []])
);
const additionsByNo = new Map(curatedSongAdditions.map((song) => [song.sourceNo, song]));

// 同一首歌在标题清单中出现了不止一次；只保留一个站内条目。
const duplicateOf = new Map([
  [57, 'soragoto'],
  [62, 'terra'],
  [76, 'gousei-suru-mirai']
]);

// 仅靠中文译名无法与站内日文标题做机械匹配的既有条目。
const translatedExisting = new Map([
  [5, 'naraku'],
  [43, 'mugen-hachi'],
  [66, 'gunjo-sanka'],
  [70, 'arika'],
  [81, 'juusan'],
  [84, 'eien-kashii-moimi'],
  [119, 'chicchana-watashi'],
  [128, 'uz'],
  [164, 'shindeshimattanda'],
  [171, 'ano-natsu-ga-houwasuru'],
  [181, 'sayonara-wa-iwanai-de-sa'],
  [218, 'mai-guiano'],
  [223, 'kuu-ni-naru'],
  [232, 'kokorogoshi'],
  [272, 'bokuga-shinou-to-omotta']
]);

const manualExclusions = new Map([
  [19, ['zh', '中文 VOCALOID 原创，演唱为星尘']],
  [54, ['zh', '标题明确标注洛天依中文原创曲']],
  [94, ['zh', '墨清弦中文原创系列曲']],
  [110, ['zh', '心华、乐正绫、洛天依、言和中文原创']],
  [116, ['zh', '标题明确标注洛天依、乐正绫中文原创曲']],
  [122, ['zh', '标题明确标注乐正绫原创，检索结果为中文歌词']],
  [127, ['zh', '言和与星尘中文原创']],
  [175, ['en', '标题明确标注初音ミク English，歌词为英语']],
  [207, ['zh', '标题明确标注洛天依原创，检索结果为中文歌词']],
  [230, ['zh', '心华、乐正绫中文原创']],
  [248, ['zh', '洛天依、言和中文原创']],
  [277, ['zh', '洛天依、言和中文原创']],
  [282, ['zh', '言和中文原创']]
]);

const normalizeTitle = (value) => value
  .normalize('NFKC')
  .toLocaleLowerCase('ja')
  .replace(/2nd\.?ver/gi, '')
  .replace(/[^\p{L}\p{N}∞]+/gu, '');

function findExistingSong(item) {
  const translatedId = translatedExisting.get(item.no);
  if (translatedId) return songs.find((song) => song.id === translatedId);
  const parsed = normalizeTitle(item.title);
  const raw = normalizeTitle(item.raw);
  return songs.find((song) => {
    const title = normalizeTitle(song.title);
    return title.length >= 3 && (parsed.includes(title) || raw.includes(title));
  });
}

function evidenceFor(no) {
  const seen = new Set();
  return (previousEvidenceByNo.get(no) || [])
    .filter((record) => record.url)
    .filter((record) => !seen.has(record.url) && seen.add(record.url))
    .map((record) => ({
      type: record.type === 'manual-source' ? record.type : 'verified-source',
      label: record.label,
      url: record.url
    }));
}

const items = queue.items.map((item) => {
  const addition = additionsByNo.get(item.no);
  const existing = findExistingSong(item);
  const exclusion = manualExclusions.get(item.no);
  const automaticEvidence = evidenceFor(item.no);
  let status;
  let songId;
  let reason;
  let evidence = automaticEvidence;

  if (item.kind !== 'song') {
    status = 'excluded-non-song';
    reason = '标题解析器判定为专辑、活动、预告或试听等非单曲项目';
  } else if (exclusion) {
    status = 'excluded-confirmed-non-japanese';
    reason = exclusion[1];
  } else if (addition) {
    status = 'catalogued-manual-review';
    songId = addition.id;
    reason = '人工核对演唱语言、曲名、作者和歌词来源后收录';
    evidence = addition.sources.map((source) => ({ type: 'manual-source', ...source }));
  } else if (duplicateOf.has(item.no)) {
    status = 'catalogued-duplicate';
    songId = duplicateOf.get(item.no);
    reason = '与站内已有曲目重复，不另建歌曲记录';
  } else if (existing) {
    status = 'catalogued-existing';
    songId = existing.id;
    reason = '与站内既有歌曲标题或人工登记的译名匹配';
    if (!evidence.length) {
      evidence = existing.sources.map((source) => ({ type: 'catalogue-source', ...source }));
    }
  } else if (automaticEvidence.length) {
    status = 'source-found-pending-curation';
    reason = '自动检索命中歌词来源，但未能可靠匹配到站内歌曲 ID，保留待复核';
  } else if (item.lang === 'zh') {
    status = 'excluded-chinese-candidate';
    reason = '标题和演唱者规则指向中文歌曲，未进入日语歌词栏';
  } else if (item.lang === 'jp' || item.lang === 'mixed') {
    status = 'unresolved-after-workflow';
    reason = '日语候选，但三轮自动检索与本次人工查证均不足以安全摘录';
  } else {
    status = 'excluded-or-unresolved-other';
    reason = '缺少足够的日语演唱证据，可能是其他语言、纯音乐或格式噪声';
  }

  return {
    no: item.no,
    raw: item.raw,
    parsedTitle: item.title,
    heuristicLanguage: item.lang,
    ...(exclusion ? { reviewedLanguage: exclusion[0] } : {}),
    project: item.project,
    status,
    ...(songId ? { songId } : {}),
    reason,
    evidence
  };
});

const byStatus = Object.fromEntries(
  [...Map.groupBy(items, (item) => item.status)]
    .map(([status, rows]) => [status, rows.length])
    .sort(([a], [b]) => a.localeCompare(b))
);
const output = {
  generatedAt: new Date().toISOString().slice(0, 10),
  source: queue.source,
  workflow: 'docs/lyrics-workflow.md',
  note: '状态是筛选审计，不是版权授权记录；未获授权时不归档整首第三方歌词。',
  summary: { total: items.length, byStatus },
  items
};

const outputPath = path.join(root, 'data', 'song-audit.json');
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
console.log(`歌曲筛选审计已写入 ${outputPath}`);
console.log(JSON.stringify(output.summary, null, 2));
