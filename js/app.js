/* 启动与导航 */

Nihonl.navItems = [
  { href: "#/", label: "首页" },
  { href: "#/kana", label: "五十音" },
  { href: "#/vocab", label: "词汇" },
  { href: "#/study", label: "背单词" },
  { href: "#/culture", label: "文化" },
  { href: "#/stats", label: "进度" }
];

Nihonl.updateNav = function (parts) {
  const activeKey = parts[0] || "";
  const nav = document.getElementById("nav");
  nav.innerHTML = this.navItems.map((item) => {
    const key = item.href.replace(/^#\/?/, "").split("/")[0];
    const active = key === activeKey;
    return `<a href="${item.href}" ${active ? 'class="active" aria-current="page"' : ""}>${item.label}</a>`;
  }).join("");
};

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("hashchange", () => Nihonl.router.render());
  if (!location.hash) location.hash = "#/";
  Nihonl.router.render();
});
