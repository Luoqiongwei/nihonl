/* hash 路由：支持 /vocab、/culture/:id 这类路径 */

Nihonl.router = {
  routes: [
    { pattern: "/", view: "home" },
    { pattern: "/kana", view: "kana" },
    { pattern: "/vocab", view: "vocab" },
    { pattern: "/study", view: "study" },
    { pattern: "/culture", view: "culture" },
    { pattern: "/culture/:id", view: "cultureDetail" },
    { pattern: "/music", view: "music" },
    { pattern: "/music/:id", view: "musicDetail" },
    { pattern: "/stats", view: "stats" }
  ],

  parse() {
    const raw = location.hash.replace(/^#\/?/, "");
    return raw.split("/").filter(Boolean).map((p) => {
      try { return decodeURIComponent(p); } catch { return p; }
    });
  },

  match(parts) {
    for (const r of this.routes) {
      const rp = r.pattern.split("/").filter(Boolean);
      if (rp.length !== parts.length) continue;
      const params = {};
      let ok = true;
      for (let i = 0; i < rp.length; i++) {
        if (rp[i].startsWith(":")) params[rp[i].slice(1)] = parts[i];
        else if (rp[i] !== parts[i]) { ok = false; break; }
      }
      if (ok) return { view: r.view, params };
    }
    return { view: "home", params: {} };
  },

  render() {
    const parts = this.parse();
    const { view, params } = this.match(parts);
    const app = document.getElementById("app");
    const v = Nihonl.views[view];
    if (!v) {
      app.innerHTML = `<div class="empty"><span class="big">無</span>页面不存在。<a class="btn" style="margin-top:1rem" href="#/">回首页</a></div>`;
      return;
    }
    app.innerHTML = v.render(params);
    if (v.mount) v.mount(app);
    Nihonl.updateNav(parts);
    window.scrollTo(0, 0);
  }
};
