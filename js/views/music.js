/* 音楽：J-POP / J-Rock / VOCALOID / 神椿 歌曲 × 词汇学习 */

Nihonl.views.music = {
  state: { project: "all", q: "" },

  render() {
    const chips = `<button class="chip ${this.state.project === "all" ? "active" : ""}" data-project="all">全部</button>` +
      NihonlData.songProjects().map((p) =>
        `<button class="chip ${this.state.project === p ? "active" : ""}" data-project="${Nihonl.esc(p)}">${Nihonl.esc(p)}</button>`).join("");

    const q = this.state.q.trim().toLowerCase();
    const songs = NihonlData.songs.filter((s) => {
      if (this.state.project !== "all" && s.project !== this.state.project) return false;
      if (!q) return true;
      const hay = `${s.title} ${s.romajiTitle || ""} ${s.artist} ${s.producer || ""} ${s.project || ""} ${s.summary.zh}`.toLowerCase();
      return hay.includes(q);
    });

    return `
      <div class="page-head">
        <span class="kicker">うた</span>
        <h1>音楽</h1>
        <p class="lead">用喜欢的 J-POP / J-Rock / VOCALOID / 神椿 歌曲记词汇：每首摘录几句歌词，讲解里面的单词与表达。点击卡片查看节选与讲解。</p>
      </div>

      <div class="card note">
        <b>版权说明</b>　本站只摘录少量歌词句子用于学习讲解，不提供整首歌词；歌曲版权归原作者 / 唱片公司所有，点击卡片内的来源链接可查看完整歌词与官方页面。
      </div>

      <div class="toolbar">
        <input class="search" id="music-search" type="search" placeholder="搜索歌名 / 歌手 / 企划…" value="${Nihonl.esc(this.state.q)}">
      </div>
      <div class="chip-row" style="margin:1rem 0">${chips}</div>

      <div class="grid grid-2">
        ${songs.map((s) => this.cardHtml(s)).join("")}
      </div>
    `;
  },

  cardHtml(s) {
    const preview = (s.excerpt || []).slice(0, 2)
      .map((e) => `<div class="lyric-line">${Nihonl.esc(e.ja)}</div>`).join("");
    const status = s.lyricsStatus === "complete"
      ? `<span class="tag green">歌词已收录</span>`
      : `<span class="tag gold">歌词待补</span>`;
    return `
      <a class="card song-card" href="#/music/${encodeURIComponent(s.id)}">
        <div class="song-head">
          <div class="song-ja">${Nihonl.esc(s.title)}</div>
          ${s.romajiTitle ? `<div class="song-romaji">${Nihonl.esc(s.romajiTitle)}</div>` : ""}
        </div>
        <div class="song-meta">${Nihonl.esc(s.artist)}${s.year ? ` · ${s.year}` : ""}</div>
        <div class="song-tags"><span class="tag">${Nihonl.esc(s.project || "其他")}</span>${status}</div>
        <div class="song-summary">${Nihonl.esc(s.summary.zh)}</div>
        ${preview ? `<div class="lyric-box song-preview">${preview}</div>` : ""}
        <div class="muted" style="font-size:0.85rem">查看歌词节选与词汇讲解 →</div>
      </a>
    `;
  },

  mount(el) {
    const search = el.querySelector("#music-search");
    if (search) {
      search.addEventListener("input", () => {
        this.state.q = search.value;
        const app = document.getElementById("app");
        app.innerHTML = this.render();
        this.mount(app);
      });
    }
    el.querySelectorAll(".chip[data-project]").forEach((chip) => {
      chip.addEventListener("click", () => {
        this.state.project = chip.dataset.project;
        const app = document.getElementById("app");
        app.innerHTML = this.render();
        this.mount(app);
      });
    });
  }
};

Nihonl.views.musicDetail = {
  render(params) {
    const s = NihonlData.getSong(params.id);
    if (!s) {
      return `
        <div class="empty"><span class="big">無</span>没有这首歌。<br><a class="btn" style="margin-top:1rem" href="#/music">返回音乐列表</a></div>`;
    }
    const status = s.lyricsStatus === "complete"
      ? `<span class="tag green">歌词已收录</span>`
      : `<span class="tag gold">歌词待补</span>`;
    const words = (s.words || []).map((id) => NihonlData.getWord(id)).filter(Boolean);

    return `
      <a class="back-link" href="#/music">← 返回音乐列表</a>

      <div class="card song-hero">
        <div class="song-ja">${Nihonl.esc(s.title)}
          ${s.romajiTitle ? `<span class="song-romaji" style="margin-left:0.6rem">${Nihonl.esc(s.romajiTitle)}</span>` : ""}
        </div>
        <div class="song-meta" style="margin-top:0.35rem">${Nihonl.esc(s.artist)}${s.year ? ` · ${s.year}` : ""}${s.producer ? ` · ${Nihonl.esc(s.producer)}` : ""}</div>
        <div class="song-tags" style="margin-top:0.5rem"><span class="tag">${Nihonl.esc(s.project || "其他")}</span>${status}</div>
      </div>

      <div class="card" style="margin-top:1rem">
        <h3>关于这首歌</h3>
        <p>${Nihonl.esc(s.summary.ja)}</p>
        <p class="muted">${Nihonl.esc(s.summary.zh)}</p>
      </div>

      ${s.lyricsStatus === "complete" ? `
        <div class="card lyric-box" style="margin-top:1rem">
          <h3>歌词节选</h3>
          ${s.excerpt.map((e) => `
            <div class="lyric-item">
              <div class="ja">${Nihonl.esc(e.ja)}</div>
              <div class="muted">${Nihonl.esc(e.zh)}</div>
            </div>`).join("")}
        </div>

        <div class="card song-points" style="margin-top:1rem">
          <h3>词汇与表达</h3>
          ${s.points.map((p) => `
            <div class="point-item">
              <div class="ja">${Nihonl.esc(p.ja)}<span class="muted" style="margin-left:0.5rem;font-weight:400">${Nihonl.esc(p.zh)}</span></div>
              <p class="note-text">${Nihonl.esc(p.note)}
                ${p.wordId ? ` <a class="tag" href="#/vocab">关联词：${Nihonl.esc((NihonlData.getWord(p.wordId) || {}).kana || "")}</a>` : ""}
              </p>
            </div>`).join("")}
        </div>` : `
        <div class="card warn-box" style="margin-top:1rem">
          <h3>歌词待补</h3>
          <p>按固定查证流程（Vocaloid Lyrics Wiki → marumaru → uta-net / utaten → shiyinren → 官方 MV / 其他）仍没有找到这首的完整歌词。先保留歌曲信息，找到后会补上节选与讲解。</p>
        </div>`}

      ${words.length ? `
        <div class="card" style="margin-top:1rem">
          <h3>关联词汇</h3>
          <p>${words.map((w) => `<a class="tag" href="#/vocab">${w.kana} ${Nihonl.esc(w.meaning)}</a>`).join("")}</p>
        </div>` : ""}

      <div class="card" style="margin-top:1rem">
        <h3>来源</h3>
        <ul class="source-list">
          ${s.sources.map((src) => src.url
            ? `<li><a href="${Nihonl.esc(src.url)}" target="_blank" rel="noopener noreferrer">${Nihonl.esc(src.label)}</a></li>`
            : `<li>${Nihonl.esc(src.label)}</li>`).join("")}
        </ul>
        <p class="muted" style="font-size:0.85rem">歌词节选仅用于学习讲解，完整歌词与版权归原作者所有。</p>
      </div>
    `;
  }
};
