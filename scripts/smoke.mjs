/* NIHONL 冒烟测试：在 Node 中用 DOM/localStorage 桩跑通全部视图与复习逻辑
 * 用法：node scripts/smoke.mjs
 */

import vm from "node:vm";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* ---------- 浏览器环境桩 ---------- */

const makeEl = () => ({
  innerHTML: "",
  hidden: false,
  textContent: "",
  value: "20",
  dataset: {},
  style: {},
  classList: { add() {}, remove() {}, toggle() {} },
  addEventListener() {},
  querySelector() { return makeEl(); },
  querySelectorAll() { return []; },
  closest() { return null; },
  scrollIntoView() {}
});

const storage = new Map();
globalThis.localStorage = {
  getItem: (k) => (storage.has(k) ? storage.get(k) : null),
  setItem: (k, v) => storage.set(k, String(v)),
  removeItem: (k) => storage.delete(k)
};
globalThis.window = globalThis; // 浏览器中 window 即全局对象
globalThis.scrollTo = () => {};
globalThis.addEventListener = () => {};
globalThis.speechSynthesis = { cancel() {}, speak() {} };
globalThis.document = {
  getElementById: () => makeEl(),
  addEventListener() {}
};
globalThis.location = { hash: "#/" };
globalThis.confirm = () => true;
globalThis.SpeechSynthesisUtterance = function (t) { this.text = t; };

/* ---------- 加载源码 ---------- */

const files = [
  "js/core.js", "js/data.js", "js/store.js",
  "js/views/home.js", "js/views/kana.js", "js/views/vocab.js",
  "js/views/study.js", "js/views/culture.js", "js/views/music.js", "js/views/stats.js",
  "js/router.js", "js/app.js"
];
for (const f of files) {
  const code = fs.readFileSync(path.join(root, f), "utf8");
  vm.runInThisContext(code, { filename: f });
}

/* ---------- 断言工具 ---------- */

let failures = 0;
function check(name, cond) {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}`);
  if (!cond) failures += 1;
}

/* ---------- 数据完整性 ---------- */

check("词汇条数 >= 40", NihonlData.words.length >= 40);
check("文化词条 >= 8", NihonlData.culture.length >= 8);
check("词汇 id 唯一", new Set(NihonlData.words.map((w) => w.id)).size === NihonlData.words.length);
check("文化 id 唯一", new Set(NihonlData.culture.map((c) => c.id)).size === NihonlData.culture.length);
check("歌曲条数 >= 5", NihonlData.songs.length >= 5);
check("歌曲 id 唯一", new Set(NihonlData.songs.map((s) => s.id)).size === NihonlData.songs.length);
for (const w of NihonlData.words) {
  check(`词 ${w.id} 字段完整`, w.kana && w.romaji && w.meaning && w.example?.ja && w.example?.zh && w.mnemonic);
  for (const cid of w.culture) check(`词 ${w.id} 文化标签存在`, !!NihonlData.getCulture(cid));
}
for (const s of NihonlData.songs) {
  check(`歌 ${s.id} 字段完整`, s.title && s.artist && s.summary?.ja && s.summary?.zh && s.sources?.length);
  check(`歌 ${s.id} 歌词状态合法`, s.lyricsStatus === "complete" || s.lyricsStatus === "missing");
  if (s.lyricsStatus === "complete") {
    check(`歌 ${s.id} 有歌词节选`, s.excerpt.length >= 2 && s.excerpt.every((e) => e.ja && e.zh));
    check(`歌 ${s.id} 有学习点`, s.points.length >= 2 && s.points.every((p) => p.ja && p.zh && p.note));
  }
  for (const wid of s.words || []) check(`歌 ${s.id} 关联词存在`, !!NihonlData.getWord(wid));
  for (const p of s.points || []) {
    if (p.wordId) check(`歌 ${s.id} 学习点词存在`, !!NihonlData.getWord(p.wordId));
  }
}
const kanaCount = NihonlData.kana.hiragana.seion.length;
check("平假名清音 46 个", kanaCount === 46);
check("片假名清音 46 个", NihonlData.kana.katakana.seion.length === 46);

/* ---------- 路由 ---------- */

check("路由 #/culture/moe → cultureDetail",
  Nihonl.router.match(["culture", "moe"]).view === "cultureDetail");
check("路由 #/culture → culture",
  Nihonl.router.match(["culture"]).view === "culture");
check("路由 #/music → music",
  Nihonl.router.match(["music"]).view === "music");
check("路由 #/music/soragoto → musicDetail",
  Nihonl.router.match(["music", "soragoto"]).view === "musicDetail");
check("路由未知 → home", Nihonl.router.match(["nope"]).view === "home");

/* ---------- 视图渲染 + 挂载 ---------- */

const cases = [
  ["home", {}], ["kana", {}], ["vocab", {}], ["study", {}],
  ["culture", {}], ["cultureDetail", { id: "moe" }], ["cultureDetail", { id: "不存在" }],
  ["music", {}], ["musicDetail", { id: "soragoto" }], ["musicDetail", { id: "不存在" }],
  ["stats", {}]
];
for (const [name, params] of cases) {
  const view = Nihonl.views[name];
  let html = "";
  try {
    html = view.render(params);
    const el = makeEl();
    if (view.mount) view.mount(el);
    check(`视图 ${name} 渲染并挂载`, html.length > 50);
  } catch (err) {
    check(`视图 ${name} 渲染并挂载（异常：${err.message}）`, false);
  }
}

/* ---------- 复习逻辑 ---------- */

const w1 = NihonlData.words[0].id;
let s = NihonlStore.review(w1, 2); // 记得
check("记得 → 等级 +1", s.level === 1 && s.due > Date.now());
s = NihonlStore.review(w1, 0);     // 忘了
check("忘了 → 等级回落", s.level === 0 && s.lapses === 1);
s = NihonlStore.review(w1, 3);     // 很熟
check("很熟 → 等级 +2", s.level === 2);

const q1 = NihonlStore.queue("new");
check("新词队列只含未学", q1.fresh.every((w) => NihonlStore.statusOf(w.id) === "new"));
const st = NihonlStore.stats();
check("统计 learned >= 1", st.learned >= 1);
check("统计 mastered 合理", st.mastered >= 0 && st.mastered <= st.total);
check("近 14 天记录为 14 条", NihonlStore.recentActivity(14).length === 14);

console.log(failures === 0 ? "\n全部通过 ✓" : `\n${failures} 项失败 ✗`);
process.exit(failures === 0 ? 0 : 1);
