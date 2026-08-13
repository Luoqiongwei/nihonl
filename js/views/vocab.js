/* 词汇库 */

Nihonl.views.vocab = {
  state: { q: "", cat: "all", status: "all", expanded: null },

  render() {
    const st = this.state;
    const catChips = `<button class="chip ${st.cat === "all" ? "active" : ""}" data-cat="all">全部</button>` +
      NihonlData.categories.map((c) =>
        `<button class="chip ${st.cat === c.id ? "active" : ""}" data-cat="${c.id}">${c.label}</button>`).join("");

    const statusChips = `
      <select id="vocab-status">
        <option value="all">全部状态</option>
        <option value="new" ${st.status === "new" ? "selected" : ""}>未学</option>
        <option value="learning" ${st.status === "learning" ? "selected" : ""}>学习中</option>
        <option value="mastered" ${st.status === "mastered" ? "selected" : ""}>已掌握</option>
      </select>`;

    return `
      <div class="page-head">
        <span class="kicker">ことば</span>
        <h1>词汇库</h1>
        <p class="lead">入门词条示例，每条都带例句与文化联想。点击词条展开详情。</p>
      </div>

      <div class="toolbar">
        <input class="search" id="vocab-search" type="search" placeholder="搜索假名 / 汉字 / 中文释义…" value="${Nihonl.esc(st.q)}">
        ${statusChips}
      </div>
      <div class="chip-row" style="margin-bottom:1rem">${catChips}</div>

      <div class="card flat" id="vocab-list" style="padding:0"></div>
    `;
  },

  renderList(el) {
    const st = this.state;
    let words = NihonlData.words.filter((w) => {
      if (st.cat !== "all" && w.category !== st.cat) return false;
      const status = NihonlStore.statusOf(w.id);
      if (st.status !== "all" && status !== st.status) return false;
      if (st.q) {
        const q = st.q.toLowerCase();
        const hay = `${w.kana} ${w.kanji || ""} ${w.romaji} ${w.meaning} ${w.pos}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (!words.length) {
      el.innerHTML = `<div class="empty"><span class="big">空</span>没有符合条件的词汇，换个筛选试试。</div>`;
      return;
    }

    el.innerHTML = words.map((w) => {
      const status = NihonlStore.statusOf(w.id);
      const dot = { new: "new", learning: "learning", mastered: "mastered" }[status];
      const statusText = { new: "未学", learning: "学习中", mastered: "已掌握" }[status];
      const open = st.expanded === w.id;
      return `
        <div class="word-row" data-id="${w.id}">
          <div class="ja-main">
            <span class="kana">${w.kana}</span>
            ${w.kanji ? `<span class="kanji">${w.kanji}</span>` : ""}
            <span class="romaji">${w.romaji}</span>
          </div>
          <div class="meaning">${Nihonl.esc(w.meaning)}</div>
          <div class="meta"><span class="tag ghost">${NihonlData.categoryLabel(w.category)}</span><span class="tag ghost">${w.pos}</span></div>
          <div class="meta"><span class="status-dot ${dot}"></span>${statusText}</div>
        </div>
        ${open ? this.detailHtml(w) : ""}
      `;
    }).join("");
  },

  detailHtml(w) {
    const cultures = NihonlData.cultureForWord(w.id);
    const songs = NihonlData.songsForWord(w.id);
    return `
      <div class="word-detail" data-id="${w.id}">
        <dl>
          <dt>读音</dt><dd>${w.kana} ${w.kanji ? "（" + w.kanji + "）" : ""} · ${w.romaji}</dd>
          <dt>释义</dt><dd>${Nihonl.esc(w.meaning)}</dd>
          <dt>词性 / 等级</dt><dd>${w.pos} · ${w.level}</dd>
          <dt>分类</dt><dd>${NihonlData.categoryLabel(w.category)}</dd>
        </dl>
        <div class="example">
          <div class="ja">${w.example.ja}</div>
          <div class="muted">${Nihonl.esc(w.example.zh)}</div>
        </div>
        ${w.mnemonic ? `<div class="mnemonic"><b>联想记忆</b>　${Nihonl.esc(w.mnemonic)}</div>` : ""}
        ${cultures.length ? `
          <div class="culture-links">
            ${cultures.map((c) => `<a class="tag" href="#/culture/${encodeURIComponent(c.id)}">${Nihonl.esc(c.zh)}</a>`).join("")}
            <span class="muted" style="font-size:0.8rem">点击进入文化词条</span>
          </div>` : ""}
        ${songs.length ? `
          <div class="culture-links">
            ${songs.map((s) => `<a class="tag gold" href="#/music/${encodeURIComponent(s.id)}">♪ ${Nihonl.esc(s.title)}</a>`).join("")}
            <span class="muted" style="font-size:0.8rem">出自歌曲</span>
          </div>` : ""}
      </div>
    `;
  },

  mount(el) {
    const list = el.querySelector("#vocab-list");
    this.renderList(list);

    const search = el.querySelector("#vocab-search");
    search.addEventListener("input", () => {
      this.state.q = search.value.trim();
      this.state.expanded = null;
      this.renderList(list);
    });

    const status = el.querySelector("#vocab-status");
    status.addEventListener("change", () => {
      this.state.status = status.value;
      this.state.expanded = null;
      this.renderList(list);
    });

    el.querySelectorAll(".chip[data-cat]").forEach((chip) => {
      chip.addEventListener("click", () => {
        this.state.cat = chip.dataset.cat;
        this.state.expanded = null;
        el.querySelectorAll(".chip[data-cat]").forEach((c) => c.classList.toggle("active", c === chip));
        this.renderList(list);
      });
    });

    list.addEventListener("click", (e) => {
      const row = e.target.closest(".word-row");
      if (!row) return;
      const id = row.dataset.id;
      const w = NihonlData.getWord(id);
      if (!w) return;
      this.state.expanded = this.state.expanded === id ? null : id;
      this.renderList(list);
      if (this.state.expanded) {
        const detail = list.querySelector(`.word-detail[data-id="${id}"]`);
        detail && detail.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    });
  }
};
