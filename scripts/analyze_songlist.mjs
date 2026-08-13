/* 曲目清单解析器
 * 读取从 B 站视频标题摘取的曲目清单（格式杂乱），做初步分类：
 *   lang:    jp / zh / mixed / other
 *   project: VOCALOID/术力口 / 神椿 / SEKAI / J-POP/其他 / 中V / 中文歌曲 / 非歌曲
 *   kind:    song / album / event / other
 * 输出 data/songlist.json 作为后续歌词批量查证的工作队列。
 *
 * 用法：node scripts/analyze_songlist.mjs [清单路径] [输出路径]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = process.argv[2] || "C:/Users/kjldp/Desktop/thinking/py/dynamic_analysis/titles.txt";
const output = process.argv[3] || path.join(root, "data", "songlist.json");

/* ---------- 关键词表 ---------- */

const ZH_SINGERS = [
  "洛天依", "乐正绫", "言和", "心华", "星尘", "海伊", "赤羽", "诗岸",
  "墨清弦", "徵羽摩柯", "东方栀子", "知声", "乐正龙牙", "摩柯", "A-SOUL",
  "Vsinger", "泠鸢", "嘉然", "茶玖", "林籁", "韵泉", "苍穹", "战音",
  "星尘infinity", "洛天依AI", "言和AI", "乐正绫AI", "墨清弦AI", "徵羽摩柯AI",
  "洛天依·言和", "洛天依×乐正绫", "洛天依&言和", "乐正绫&洛天依"
];

const JP_SINGERS = [
  "初音", "ミク", "未來", "鏡音", "リン", "レン", "巡音", "ルカ", "GUMI",
  "MEIKO", "KAITO", "flower", "可不", "歌愛ユキ", "歌愛", "歌爱", "重音テト",
  "音街ウナ", "結月ゆかり", "裏命", "星界", "闇音レンリ", "理芽", "花譜", "花谱",
  "明透", "春猿火", "異世界情緒", "异世界情绪", "ヰ世界", "幸祜", "春茶", "鹿乃",
  "Ado", "milet", "HACHI", "tayori", "Islet", "ナツノセ", "La prière", "PIKASONIC",
  "Aiobahn", "Yunomi", "鎖那", "日南結里", "伶", "鹫尾伶菜", "あよ", "倚水",
  "沖石", "冬", "ねんね", "米津玄師", "kemu", "Orangestar", "MIMI", "蝶々P",
  "とあ", "かいりきベア", "いーえるP", "n-buna", "DECO*27", "keeno", "narry",
  "regulus", "201.", "201 feat", "MikitoP", "Wonder-K", "yuxuki waga", "Mwk", "傘村トータ",
  "香椎モイミ", "ポリスピカデリー", "Crusher-P", "Guiano", "*Luna", "ナナツカゼ",
  "めろくる", "ンバヂ", "マサラダ", "青谷", "くつう", "namaniental", "東京真中",
  "物理", "季節P", "Sya", "UtopiA", "KoiNs", "霾AXIS", "Sodatune", "Kevinz",
  "周黑亚", "砖厂浪人", "幻月音乐团", "ilem", "PoKeR", "Twinfield", "阿修",
  "案山子", "kobasolo", "すりぃ", "いよわ", "sasalasa", "L∧NNDØ", "Clesss",
  "KizunaAI", "HoneyComeBear", "Toa", "DATEKEN", "acane_madder", "ナカノは4番",
  "安娜", "Anna", "paradøx", "今井", "マサラダ", "伶"
];

const KAMITSUBAKI = ["花譜", "花谱", "理芽", "明透", "春猿火", "異世界情緒", "异世界情绪", "ヰ世界", "幸祜", "可不", "裏命"];
const SEKAI = ["Project SEKAI", "プロセカ", "世界计划", "世界計畫", "25時", "25時、ナイトコード"];
const VOCALOID_JP = ["VOCALOID", "UTAU", "術力口", "术力口", "ニコカラ", "ボカロ"];

const NON_SONG = [
  "生日会", "试听PV", "试听", "XFD", "原声集", "OST", "游戏化",
  "制作决定", "Trailer", "预告", "纪录片", "节目", "放送"
];

const SUBS = ["中文字幕", "中文CC字幕", "中日字幕", "中译", "中字", "中文还原字幕"];

/* ---------- 工具 ---------- */

const hasKana = (s) => /[\u3041-\u3096\u30A1-\u30FA]/.test(s);
const has = (s, list) => list.some((k) => s.includes(k));

const ARTIST_ALL = [...JP_SINGERS, ...ZH_SINGERS];
const isArtistName = (s) => ARTIST_ALL.some((k) => s.toLowerCase() === k.toLowerCase());

function stripArtistPrefix(s) {
  s = s.replace(/^[#＃]?\d+[\s　]*/, ""); // “#91 / #27 / Op.3”等系列编号
  for (const k of ARTIST_ALL) {
    if (s === k) return "";
    if (s.startsWith(k) && /^[\s#＃\d:：·,，A-Za-z]/.test(s.slice(k.length))) {
      return s.slice(k.length).replace(/^[\s#＃\d:：·,，A-Za-z]+/, "");
    }
  }
  return s;
}

function guessTitle(raw) {
  let t = raw;
  const tags = [];
  t = t.replace(/[【\[]([^】\]]*)[】\]]/g, (m, g) => { tags.push(g.trim()); return " "; });
  t = t.replace(/\s+/g, " ").trim();
  t = t.replace(/^[—–\-_、☁☆★♪♫♬❀✥※°*✦]+/, "");

  // 若去掉【】后只剩“质量/字幕/搬运”等杂讯，则取最后一个含假名的【】内容（如【メメントモリ】4K HDR）
  const junkOnly = t
    .replace(/(Hi-Res|4K|HDR|1080p\+?|高清|无损|高音質|中日字幕|中文字幕|中文CC字幕|中文还原字幕|中字|中译|搬运|授权|Official|MV|PV|Live|Cover|ver\.|新曲|预告|试听|新版)/gi, " ")
    .replace(/[（(][^）)]*[）)]/g, " ")
    .replace(/[\s|,，|｜]+/g, " ").trim();
  if (!junkOnly) {
    const kanaBrackets = tags.filter(hasKana);
    if (kanaBrackets.length) return { title: kanaBrackets[kanaBrackets.length - 1], tags };
  }
  if (isArtistName(junkOnly.replace(/^[\s\-–—]+|[\s\-–—]+$/g, ""))) {
    const kanaBrackets = tags.filter(hasKana);
    if (kanaBrackets.length) return { title: kanaBrackets[kanaBrackets.length - 1], tags };
  }

  const book = t.match(/《([^》]+)》/);
  if (book) return { title: book[1].trim(), tags };

  // 「」结构：优先“前导假名标题”，其次两段式中间标题，再其次“」后短标题”，最后才是「」内容
  const kagiMatches = [...t.matchAll(/「([^」]*)」/g)];
  if (kagiMatches.length) {
    const kagi = kagiMatches.map((m) => m[1]);
    const firstOpen = t.indexOf("「");
    const leading = stripArtistPrefix(t.slice(0, firstOpen).trim());
    const lastClose = t.lastIndexOf("」");
    const lastOpen = t.lastIndexOf("「");
    const trailing = t.slice(lastClose + 1).trim().replace(/^[、。．.・\s]+/, "");
    const trailingToken = trailing.split(/[\s/]+/)[0] || "";
    const trailingJunk = /^(@|feat\.|Official|MV|PV|Cover|ver\.|Live|Hi-Res|4K|1080p|中日字幕|中文字幕|中文CC字幕|中字|高清|无损|高音質|搬运|授权)/i.test(trailingToken);
    const leadingJunk = /(开口心动|翻唱|推荐|日推|转载|搬运|原创|正式|告别作|游戏化|电音|Hi-Res|极致电音|新曲)/.test(leading);
    const lastKagiEndsDot = /[。．.]$/.test(kagi[kagi.length - 1]);

    if (leading && hasKana(leading)) t = leading;
    else if (kagi.length >= 2) {
      const middle = t.slice(firstOpen + kagi[0].length + 2, lastOpen).trim();
      if (middle && !isArtistName(middle)) t = middle;
      else if (!trailingJunk && trailingToken && hasKana(trailingToken) && trailingToken.length <= 40) t = trailingToken;
      else t = kagi[kagi.length - 1];
    } else if (!trailingJunk && trailingToken && (hasKana(trailingToken) || lastKagiEndsDot) && trailingToken.length <= 40) {
      t = trailingToken;
    } else if (leading && !leadingJunk) {
      t = leading;
    } else {
      t = kagi[kagi.length - 1];
    }
  }

  t = stripArtistPrefix(t); // 提前剥离行首歌手名（如“明透 Op.3 - ソラゴト”）
  t = t.replace(/^(东方音乐推荐|日推歌单|开口心动|翻唱|推荐|极致电音|电音|Hi-Res|4K)[:：!！]*\s*/, "");

  // 斜杠：优先含假名且非歌手的段；否则末段是歌手时取首段
  if (t.includes("/")) {
    const segs = t.split(/\s*\/\s*/).map((s) => s.trim());
    const kanaNonArtist = segs.filter((s) => hasKana(s) && !isArtistName(s));
    if (kanaNonArtist.length === 1 && segs.length >= 2) t = kanaNonArtist[0];
    else if (segs.length >= 2 && (isArtistName(segs[segs.length - 1]) || stripArtistPrefix(segs[segs.length - 1]) !== segs[segs.length - 1])) t = segs[0];
  }

  // “歌手 - 歌名”，仅当剩余部分含假名且不是 feat. 开头
  const dash = t.match(/^(.{1,20}?)\s*[-–—]\s*(.+)$/);
  const asciiPrefix = /^[A-Za-z0-9#＃\s.&_-]{1,20}$/.test(dash?.[1] || "");
  if (dash && !/^feat/i.test(dash[2]) &&
      ((isArtistName(dash[1]) && (hasKana(dash[2]) || asciiPrefix)) || (asciiPrefix && hasKana(dash[2])))) {
    t = dash[2];
  }

  // 尾部清理：去掉 feat./中文括注/杂讯后缀
  t = t.replace(/\s*[-–—]?\s*(feat\.?|ft\.?).*$/i, "");
  t = t.replace(/[（(][^）)]*$/, ""); // 去掉未闭合的（…（如“（TV动画…”被截断的情况）
  t = t.replace(/[（(]([^）)]*)[）)]$/g, (m, g) =>
    /[一-龥]|feat|Vo|BY|vocal|Official|Live|ver\.|字幕|动画|插曲|Hi-Res|4K|HDR|1080p|高清|无损|高音質|搬运|授权|Cover|MV|PV|生贺|生日|纪念|中译|中字/i.test(g) ? "" : m);
  t = t.replace(/(\s*(Hi-Res|4K|HDR|1080p\+?|高清|无损|高音質|中日字幕|中文字幕|中文CC字幕|中文还原字幕|中字|中译|搬运|授权|Official|MV|PV|Cover|ver\.|新曲|预告|试听))+\s*$/i, "");
  t = t.replace(/^[—–\-_、·・\s]+|[—–\-_、·・\s]+$/g, "").trim();
  return { title: t, tags };
}

function classify(raw) {
  const jpSinger = has(raw, JP_SINGERS);
  const zhSinger = has(raw, ZH_SINGERS);
  const jpProject = has(raw, [...SEKAI, ...VOCALOID_JP]);
  const kana = hasKana(raw);
  const nonSong = has(raw, NON_SONG);
  const sub = SUBS.filter((k) => raw.includes(k)).join("、");

  let lang;
  if (zhSinger && (jpSinger || kana)) lang = "mixed";
  else if (zhSinger) lang = "zh"; // 中文歌手优先于“术力口”等泛标签
  else if (jpSinger || jpProject || kana) lang = "jp";
  else lang = "other";

  let project = "其他";
  let kind = nonSong ? "album/event" : "song";
  if (lang === "jp" || lang === "mixed") {
    if (has(raw, KAMITSUBAKI)) project = "神椿";
    else if (has(raw, SEKAI)) project = "SEKAI";
    else if (has(raw, JP_SINGERS) || has(raw, VOCALOID_JP) || kana) project = "VOCALOID/术力口";
    else project = "J-POP/其他";
    if (has(raw, VOCALOID_JP)) kind = "song";
  } else if (lang === "zh") {
    project = zhSinger || has(raw, ["术力口", "虚拟歌姬", "原创曲"]) ? "中V" : "中文歌曲";
  }

  const { title } = guessTitle(raw);
  return { lang, project, kind, title, sub };
}

/* ---------- 主流程 ---------- */

const raw = fs.readFileSync(input, "utf8");
const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

const items = lines.map((line, i) => {
  const c = classify(line);
  return {
    no: i + 1,
    raw: line,
    lang: c.lang,
    project: c.project,
    kind: c.kind,
    title: c.title,
    sub: c.sub
  };
});

const counts = {
  total: items.length,
  jp: items.filter((x) => x.lang === "jp").length,
  zh: items.filter((x) => x.lang === "zh").length,
  mixed: items.filter((x) => x.lang === "mixed").length,
  other: items.filter((x) => x.lang === "other").length,
  nonSong: items.filter((x) => x.kind !== "song").length
};

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify({
  generatedAt: new Date().toISOString().slice(0, 10),
  source: input,
  counts,
  items
}, null, 2), "utf8");

/* ---------- 控制台摘要 ---------- */

console.log(`共 ${counts.total} 条，其中：`);
console.log(`  日文歌曲 ${counts.jp} 条（含中文字幕 ${items.filter((x) => x.lang === "jp" && x.sub).length} 条）`);
console.log(`  中文歌曲 ${counts.zh} 条`);
console.log(`  中日混合 ${counts.mixed} 条`);
console.log(`  其他/非歌曲 ${counts.other} 条`);
console.log(`  非歌曲标记 ${counts.nonSong} 条`);
console.log(`\n已写入 ${output}\n`);

console.log("===== 日文歌曲队列（按原顺序） =====");
for (const x of items.filter((x) => x.lang === "jp" && x.kind === "song")) {
  console.log(`  ${String(x.no).padStart(3)} [${x.project}] ${x.title}${x.sub ? `（${x.sub}）` : ""}`);
}
