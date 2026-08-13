/* ============================================================
 * NIHONL 进度存储与间隔复习
 * 数据保存在浏览器 localStorage，无需数据库。
 *
 * 记忆度 level：0（未学）~ 5（长期掌握）
 * 四档评分：
 *   0 忘了 again   → 记忆度 -1，10 分钟后再次出现
 *   1 模糊 hard    → 记忆度不变，1 天后复习
 *   2 记得 good    → 记忆度 +1，按间隔表安排下次
 *   3 很熟 easy    → 记忆度 +2，间隔更长
 * ============================================================ */

window.NihonlStore = (function () {
  const KEY = "nihonl.progress.v1";
  const DAY = 24 * 60 * 60 * 1000;
  const INTERVALS = [0, 1, 2, 4, 7, 15, 30]; // 按记忆度索引的天数

  function todayKey(d = new Date()) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function defaultState() {
    return { level: 0, due: 0, reps: 0, lapses: 0, last: 0 };
  }

  let cache = null;

  function load() {
    if (cache) return cache;
    try {
      const raw = localStorage.getItem(KEY);
      cache = raw
        ? JSON.parse(raw)
        : { version: 1, words: {}, log: {}, settings: { dailyGoal: 20 } };
    } catch {
      cache = { version: 1, words: {}, log: {}, settings: { dailyGoal: 20 } };
    }
    return cache;
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(cache));
  }

  function wordState(id) {
    const data = load();
    if (!data.words[id]) data.words[id] = defaultState();
    return data.words[id];
  }

  function review(id, rating) {
    const s = wordState(id);
    const now = Date.now();
    s.reps += 1;
    s.last = now;
    if (rating === 0) {
      s.lapses += 1;
      s.level = Math.max(0, s.level - 1);
      s.due = now + 10 * 60 * 1000;
    } else if (rating === 1) {
      s.due = now + 1 * DAY;
    } else if (rating === 2) {
      s.level = Math.min(5, s.level + 1);
      s.due = now + INTERVALS[s.level] * DAY;
    } else {
      s.level = Math.min(5, s.level + 2);
      s.due = now + INTERVALS[Math.min(5, s.level + 1)] * DAY;
    }
    addLog(todayKey(), rating >= 2 ? 1 : 0);
    save();
    return s;
  }

  function addLog(date, remembered) {
    const data = load();
    if (!data.log[date]) data.log[date] = { reviewed: 0, remembered: 0 };
    data.log[date].reviewed += 1;
    data.log[date].remembered += remembered;
  }

  /* ---------- 统计 ---------- */

  function isLearned(s) { return s.level >= 1; }
  function isMastered(s) { return s.level >= 3; }

  function stats() {
    const data = load();
    const now = Date.now();
    const t = todayKey();
    let learned = 0, mastered = 0, due = 0, newCount = 0, reviewedToday = 0, rememberedToday = 0;
    NihonlData.words.forEach((w) => {
      const s = data.words[w.id] || defaultState();
      if (isLearned(s)) learned += 1;
      if (isMastered(s)) mastered += 1;
      if (isLearned(s) && s.due <= now) due += 1;
      if (!isLearned(s)) newCount += 1;
    });
    if (data.log[t]) {
      reviewedToday = data.log[t].reviewed;
      rememberedToday = data.log[t].remembered;
    }
    return {
      total: NihonlData.words.length,
      learned, mastered, due, newCount,
      reviewedToday, rememberedToday,
      dailyGoal: data.settings.dailyGoal
    };
  }

  function levelDistribution() {
    const data = load();
    const dist = [0, 0, 0, 0, 0, 0];
    NihonlData.words.forEach((w) => {
      const s = data.words[w.id] || defaultState();
      dist[Math.min(5, s.level)] += 1;
    });
    return dist;
  }

  function recentActivity(days = 14) {
    const data = load();
    const out = [];
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = todayKey(d);
      const log = data.log[key] || { reviewed: 0, remembered: 0 };
      out.push({ date: key, label: key.slice(5), reviewed: log.reviewed, remembered: log.remembered });
    }
    return out;
  }

  function statusOf(id) {
    const s = wordState(id);
    if (s.level >= 3) return "mastered";
    if (s.level >= 1) return "learning";
    return "new";
  }

  function queue(filter) {
    const data = load();
    const now = Date.now();
    const due = [];
    const fresh = [];
    NihonlData.words.forEach((w) => {
      const s = data.words[w.id] || defaultState();
      const learned = isLearned(s);
      if (filter === "new" && learned) return;
      if (filter === "review" && !learned) return;
      if (learned && s.due <= now) due.push(w);
      else if (!learned) fresh.push(w);
    });
    return { due, fresh };
  }

  function setDailyGoal(n) {
    load().settings.dailyGoal = Math.max(5, Math.min(100, Number(n) || 20));
    save();
  }

  function reset() {
    localStorage.removeItem(KEY);
    cache = null;
  }

  return {
    review, stats, queue, statusOf, levelDistribution, recentActivity,
    setDailyGoal, reset, todayKey
  };
})();
