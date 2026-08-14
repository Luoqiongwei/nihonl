/* 一次性迁移工具：把旧版浏览器全局数据（data/legacy/data.js + data/legacy/songs-data.js）
 * 转换为 src/data/ 下的 ESM 模块，供 Astro 构建期导入。
 * 用法：node scripts/convert_data.mjs
 */

import vm from 'node:vm';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import grammar from '../data/grammar.js';
import grammarMap from '../data/grammar-map.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// 用 vm 装载旧文件，得到完整 NihonlData（含 87 首歌）
const ctx = { console, window: {} };
Object.defineProperty(ctx, 'NihonlData', {
  get() { return ctx.window.NihonlData; },
  configurable: true
});
vm.createContext(ctx);
for (const f of ['data/legacy/data.js', 'data/legacy/songs-data.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
}
const data = ctx.window.NihonlData;
if (!data || !Array.isArray(data.songs)) {
  console.error('数据装载失败');
  process.exit(1);
}

// 注入歌曲学习点 → 语法关联（grammarId）
for (const s of data.songs) {
  const map = grammarMap[s.id];
  if (!map) continue;
  for (const p of s.points || []) {
    if (map[p.ja]) p.grammarId = map[p.ja];
  }
}

const outDir = path.join(root, 'src', 'data');
fs.mkdirSync(outDir, { recursive: true });

const emit = (name, varName, value, extra = '') => {
  fs.writeFileSync(
    path.join(outDir, name),
    `// 由 scripts/convert_data.mjs 生成，勿手改。\n${extra}\nexport const ${varName} = ${JSON.stringify(value, null, 2)};\n`,
    'utf8'
  );
};

emit('categories.js', 'categories', data.categories);
emit('words.js', 'words', data.words);
emit('culture.js', 'culture', data.culture);
emit('kana.js', 'kana', data.kana);
emit('songs.js', 'songs', data.songs);
emit('grammar.js', 'grammar', grammar);

// 轻量歌曲索引：供首页等客户端场景选曲，不携带整份歌词
const songsIndex = data.songs.map((s) => ({
  id: s.id,
  title: s.title,
  romajiTitle: s.romajiTitle || '',
  artist: s.artist,
  year: s.year || null,
  project: s.project || '其他',
  lyricsStatus: s.lyricsStatus
}));
emit('songs-index.js', 'songsIndex', songsIndex);

const indexJs = `// 由 scripts/convert_data.mjs 生成的数据入口
import { categories } from './categories.js';
import { words } from './words.js';
import { culture } from './culture.js';
import { kana } from './kana.js';
import { songs } from './songs.js';
import { grammar } from './grammar.js';
import { songsIndex } from './songs-index.js';

export { categories, words, culture, kana, songs, grammar, songsIndex };

export function getWord(id) {
  return words.find((w) => w.id === id);
}

export function getCulture(id) {
  return culture.find((c) => c.id === id);
}

export function getSong(id) {
  return songs.find((s) => s.id === id);
}

export function getGrammar(id) {
  return grammar.find((g) => g.id === id);
}

export function songsForWord(wordId) {
  return songs.filter(
    (s) =>
      (s.words || []).includes(wordId) ||
      (s.points || []).some((p) => p.wordId === wordId)
  );
}

export function songsForGrammar(grammarId) {
  return songs.filter((s) => (s.points || []).some((p) => p.grammarId === grammarId));
}

export function songProjects() {
  const seen = [];
  for (const s of songs) {
    if (s.project && !seen.includes(s.project)) seen.push(s.project);
  }
  return seen;
}
`;
fs.writeFileSync(path.join(outDir, 'index.js'), indexJs, 'utf8');

console.log(
  `转换完成：words=${data.words.length} culture=${data.culture.length} songs=${data.songs.length} songsIndex=${songsIndex.length} kana(hira seion)=${data.kana.hiragana.seion.length}`
);
