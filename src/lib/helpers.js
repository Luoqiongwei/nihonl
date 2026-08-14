/* 公共工具：HTML 转义、轻提示、语音朗读、洗牌（由旧 js/core.js 迁移） */

export function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function toast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* 用浏览器语音合成朗读日语（系统未装日语语音时静默失败，不影响使用） */
export function speak(text) {
  if (!('speechSynthesis' in window) || !text) return;
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    u.rate = 0.85;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch {
    /* 忽略 */
  }
}

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* 站点内链接：统一加上 base 前缀（GitHub Pages 部署在 /nihonl/ 下） */
export function link(p) {
  const base = (import.meta.env && import.meta.env.BASE_URL) || '/';
  return base.replace(/\/$/, '') + '/' + String(p).replace(/^\//, '');
}
