/* NIHONL 公共工具：命名空间、HTML 转义、轻提示 */

window.Nihonl = window.Nihonl || {};
Nihonl.views = Nihonl.views || {};

Nihonl.esc = function (s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

Nihonl.toast = function (msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(Nihonl._toastTimer);
  Nihonl._toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
};

/* 用浏览器语音合成朗读日语（系统未装日语语音时静默失败，不影响使用） */
Nihonl.speak = function (text) {
  if (!("speechSynthesis" in window) || !text) return;
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.85;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch { /* 忽略 */ }
};

Nihonl.shuffle = function (arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
