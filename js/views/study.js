/* 背单词：卡片 + 简易间隔复习 */

Nihonl.views.study = {
  session: null, // { filter, queue, index, reviewed, remembered }

  render() {
    return `
      <div class="page-head" style="text-align:center">
        <span class="kicker">おぼえる</span>
        <h1>背单词</h1>
        <p class="lead">看假名回忆意思；记得不好也没关系，系统会帮你安排下一次复习。</p>
      </div>
      <div class="study-wrap">
        <div class="study-settings">
          <button class="chip ${!this.session || this.session.filter === "all" ? "active" : ""}" data-filter="all">全部</button>
          <button class="chip ${this.session && this.session.filter === "new" ? "active" : ""}" data-filter="new">只看新词</button>
          <button class="chip ${this.session && this.session.filter === "review" ? "active" : ""}" data-filter="review">只复习</button>
          <span class="muted" style="font-size:0.82rem">忘了 → 10 分钟后 · 模糊 → 明天 · 记得/很熟 → 间隔拉长</span>
        </div>
        <div id="study-stage"></div>
      </div>
    `;
  },

  buildSession(filter) {
    const q = NihonlStore.queue(filter);
    this.session = {
      filter,
      queue: Nihonl.shuffle([...q.due, ...q.fresh]),
      index: 0,
      reviewed: 0,
      remembered: 0
    };
  },

  renderStage(el) {
    const s = this.session;
    if (!s || !s.queue.length) {
      el.innerHTML = `
        <div class="card study-done">
          <div class="seal">了</div>
          <h2>没有可学的词</h2>
          <p class="muted">当前没有到期复习的词，也没有新词。<br>去词汇库逛逛，或者明天再来。</p>
          <p><a class="btn" href="#/vocab">浏览词汇库</a></p>
        </div>`;
      return;
    }
    if (s.index >= s.queue.length) {
      el.innerHTML = `
        <div class="card study-done">
          <div class="seal">完</div>
          <h2>本轮完成！</h2>
          <p class="muted">共复习 <b>${s.reviewed}</b> 张 · 记得 <b>${s.remembered}</b> 张</p>
          <p>
            <button class="btn btn-primary" id="again">再来一轮</button>
            <a class="btn" href="#/">回首页</a>
          </p>
        </div>`;
      el.querySelector("#again").addEventListener("click", () => {
        this.buildSession(s.filter);
        this.renderStage(el);
      });
      return;
    }

    const w = s.queue[s.index];
    const total = s.queue.length;
    const pct = Math.round((s.index / total) * 100);
    const cultures = NihonlData.cultureForWord(w.id);

    el.innerHTML = `
      <div class="study-bar">
        <span class="count">${s.index + 1} / ${total}</span>
        <div class="progress"><i style="width:${pct}%"></i></div>
        <span class="count">${s.remembered} 记住</span>
      </div>
      <div class="card flashcard" id="card">
        <div class="f-top">
          <span class="tag ghost">${NihonlData.categoryLabel(w.category)}</span>
          <span class="tag ghost">${w.level}</span>
        </div>
        <div class="f-main">
          <div class="f-kana">${w.kana}</div>
          ${w.kanji ? `<div class="f-kanji">${w.kanji}</div>` : ""}
          <div class="f-romaji">${w.romaji}</div>
        </div>
        <div class="f-hint" id="hint">心里默念意思，然后…</div>
        <div class="f-reveal" id="reveal" hidden>
          <div class="f-meaning">${Nihonl.esc(w.meaning)}</div>
          <div class="f-example">${w.example.ja}<br><span class="muted">${Nihonl.esc(w.example.zh)}</span></div>
          ${w.mnemonic ? `<div class="f-mnemo">联想：${Nihonl.esc(w.mnemonic)}</div>` : ""}
          ${cultures.length ? `<div style="margin-top:0.8rem">${cultures.map((c) => `<a class="tag" href="#/culture/${encodeURIComponent(c.id)}">${Nihonl.esc(c.zh)}</a>`).join("")}</div>` : ""}
          <div class="rating-row" id="ratings">
            <button class="rating-btn again" data-rating="0"><span class="jp">忘れた</span><span class="zh">忘了</span></button>
            <button class="rating-btn hard" data-rating="1"><span class="jp">うーん</span><span class="zh">模糊</span></button>
            <button class="rating-btn good" data-rating="2"><span class="jp">わかった</span><span class="zh">记得</span></button>
            <button class="rating-btn easy" data-rating="3"><span class="jp">簡単！</span><span class="zh">很熟</span></button>
          </div>
        </div>
      </div>
    `;

    const card = el.querySelector("#card");
    const reveal = el.querySelector("#reveal");
    const hint = el.querySelector("#hint");
    const ratings = el.querySelector("#ratings");

    const show = () => {
      reveal.hidden = false;
      hint.textContent = "对照一下，然后给自己打分：";
      Nihonl.speak(`${w.kana}。${w.example.ja}`);
    };
    card.addEventListener("click", (e) => {
      if (e.target.closest(".rating-btn") || e.target.closest("a")) return;
      if (reveal.hidden) show();
    });
    hint.style.cursor = "pointer";
    hint.addEventListener("click", show);
    ratings.addEventListener("click", (e) => {
      const btn = e.target.closest(".rating-btn");
      if (!btn) return;
      NihonlStore.review(w.id, Number(btn.dataset.rating));
      s.reviewed += 1;
      if (Number(btn.dataset.rating) >= 2) s.remembered += 1;
      s.index += 1;
      this.renderStage(el);
    });
  },

  mount(el) {
    const stage = el.querySelector("#study-stage");
    if (!this.session) this.buildSession("all");
    this.renderStage(stage);

    el.querySelectorAll(".chip[data-filter]").forEach((chip) => {
      chip.addEventListener("click", () => {
        this.buildSession(chip.dataset.filter);
        el.querySelectorAll(".chip[data-filter]").forEach((c) => c.classList.toggle("active", c === chip));
        this.renderStage(stage);
      });
    });
  }
};
