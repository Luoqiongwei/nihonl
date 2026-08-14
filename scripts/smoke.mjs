/* NIHONL 冒烟测试：校验 src/data 数据完整性 + SRS 复习逻辑 + 构建产物
 * 用法：node scripts/smoke.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { words, culture, songs, getWord, getCulture, kana } from '../src/data/index.js';
import store from '../src/lib/store.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* ---------- localStorage 桩 ---------- */
const storage = new Map();
globalThis.localStorage = {
  getItem: (k) => (storage.has(k) ? storage.get(k) : null),
  setItem: (k, v) => storage.set(k, String(v)),
  removeItem: (k) => storage.delete(k)
};

/* ---------- 断言工具 ---------- */
let failures = 0;
function check(name, cond) {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}`);
  if (!cond) failures += 1;
}

/* ---------- 数据完整性 ---------- */

check('词汇条数 >= 40', words.length >= 40);
check('文化词条 >= 8', culture.length >= 8);
check('词汇 id 唯一', new Set(words.map((w) => w.id)).size === words.length);
check('文化 id 唯一', new Set(culture.map((c) => c.id)).size === culture.length);
check('歌曲条数 >= 5', songs.length >= 5);
check('歌曲 id 唯一', new Set(songs.map((s) => s.id)).size === songs.length);
for (const w of words) {
  check(`词 ${w.id} 字段完整`, w.kana && w.romaji && w.meaning && w.example?.ja && w.example?.zh && w.mnemonic);
  for (const cid of w.culture) check(`词 ${w.id} 文化标签存在`, !!getCulture(cid));
}
for (const c of culture) {
  check(`文化 ${c.id} 字段完整`, c.ja && c.zh && c.tagline && c.summary && Array.isArray(c.words));
  for (const wid of c.words) check(`文化 ${c.id} 关联词存在`, !!getWord(wid));
}
for (const s of songs) {
  check(`歌 ${s.id} 字段完整`, s.title && s.artist && s.sources?.length);
  check(`歌 ${s.id} 歌词状态合法`, s.lyricsStatus === 'complete' || s.lyricsStatus === 'missing');
  if (s.lyricsStatus === 'complete') {
    check(`歌 ${s.id} 有歌词节选`, s.excerpt.length >= 2 && s.excerpt.every((e) => e.ja && e.zh));
    check(`歌 ${s.id} 有学习点`, s.points.length >= 2 && s.points.every((p) => p.ja && p.zh && p.note));
  }
  for (const wid of s.words || []) check(`歌 ${s.id} 关联词存在`, !!getWord(wid));
  for (const p of s.points || []) {
    if (p.wordId) check(`歌 ${s.id} 学习点词存在`, !!getWord(p.wordId));
  }
}
check('平假名清音 46 个', kana.hiragana.seion.length === 46);
check('片假名清音 46 个', kana.katakana.seion.length === 46);

/* ---------- 复习逻辑 ---------- */

const w1 = words[0].id;
let s = store.review(w1, 2); // 记得
check('记得 → 等级 +1', s.level === 1 && s.due > Date.now());
s = store.review(w1, 0);     // 忘了
check('忘了 → 等级回落', s.level === 0 && s.lapses === 1);
s = store.review(w1, 3);     // 很熟
check('很熟 → 等级 +2', s.level === 2);

const q1 = store.queue('new');
check('新词队列只含未学', q1.fresh.every((w) => store.statusOf(w.id) === 'new'));
const st = store.stats();
check('统计 learned >= 1', st.learned >= 1);
check('统计 mastered 合理', st.mastered >= 0 && st.mastered <= st.total);
check('近 14 天记录为 14 条', store.recentActivity(14).length === 14);

/* ---------- 客户端脚本初始化（DOM 桩） ---------- */

const makeEl = () => ({
  innerHTML: '',
  textContent: '',
  style: {},
  dataset: {},
  hidden: false,
  value: '20',
  classList: { add() {}, remove() {}, toggle() {} },
  addEventListener() {},
  querySelector() { return makeEl(); },
  querySelectorAll() { return []; },
  closest() { return null; }
});

const els = new Map();
globalThis.document = {
  getElementById: (id) => {
    if (!els.has(id)) els.set(id, makeEl());
    return els.get(id);
  },
  querySelectorAll: () => [],
  addEventListener() {}
};
globalThis.speechSynthesis = { cancel() {}, speak() {} };
globalThis.SpeechSynthesisUtterance = function (t) { this.text = t; };
globalThis.confirm = () => true;
globalThis.scrollTo = () => {};

for (const script of ['home', 'kana', 'music', 'vocab', 'study', 'stats']) {
  try {
    await import(`../src/scripts/${script}.js`);
    check(`客户端脚本 ${script} 初始化无异常`, true);
  } catch (err) {
    check(`客户端脚本 ${script} 初始化无异常（${err.message}）`, false);
  }
}

/* ---------- 构建产物（可选） ---------- */

const dist = path.join(root, 'dist');
if (fs.existsSync(dist)) {
  const pages = [
    'index.html', 'kana/index.html', 'vocab/index.html', 'study/index.html',
    'culture/index.html', 'music/index.html', 'stats/index.html'
  ];
  for (const p of pages) {
    check(`构建产物 ${p} 存在`, fs.existsSync(path.join(dist, p)));
  }
  const detailDir = path.join(dist, 'music');
  if (fs.existsSync(detailDir)) {
    check('构建产物 music 详情页 >= 1', fs.readdirSync(detailDir).length >= 1);
  }
}

console.log(failures === 0 ? '\n全部通过 ✓' : `\n${failures} 项失败 ✗`);
process.exit(failures === 0 ? 0 : 1);
