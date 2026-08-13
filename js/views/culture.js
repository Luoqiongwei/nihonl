/* 文化：二次元 × 日本美学 */

Nihonl.views.culture = {
  render() {
    return `
      <div class="page-head">
        <span class="kicker">ぶんか</span>
        <h1>文化引申</h1>
        <p class="lead">新生代二次元文化与日本美学，既是背景知识，也是记忆词汇的「挂钩」——先读懂文化，再记单词会容易得多。</p>
      </div>
      <div class="grid grid-2">
        ${NihonlData.culture.map((c) => {
          const words = NihonlData.wordsForCulture(c.id).slice(0, 3);
          return `
            <a class="card culture-card" href="#/culture/${encodeURIComponent(c.id)}">
              <div>
                <span class="c-ja">${Nihonl.esc(c.ja)}</span>
                <span class="c-zh">${Nihonl.esc(c.zh)}</span>
              </div>
              <div class="c-tagline">${Nihonl.esc(c.tagline)}</div>
              <div class="c-meta"><span class="tag">${Nihonl.esc(c.kind)}</span><span class="tag ghost">关联 ${c.words.length} 词</span></div>
              <div class="c-words">
                ${words.map((w) => `<span class="tag gold">${Nihonl.esc(w.kana)}</span>`).join("")}
              </div>
            </a>`;
        }).join("")}
      </div>
    `;
  }
};

Nihonl.views.cultureDetail = {
  render(params) {
    const c = NihonlData.getCulture(params.id);
    if (!c) {
      return `
        <div class="empty"><span class="big">無</span>没有这个文化词条。<br><a class="btn" style="margin-top:1rem" href="#/culture">返回文化列表</a></div>`;
    }
    const words = NihonlData.wordsForCulture(c.id);
    return `
      <a class="back-link" href="#/culture">← 返回文化列表</a>
      <div class="card culture-hero">
        <div class="c-ja">${Nihonl.esc(c.ja)}<span style="font-size:1.1rem;color:var(--ink-soft);margin-left:0.6rem">${Nihonl.esc(c.zh)}</span></div>
        <div class="c-tagline" style="margin-top:0.4rem">${Nihonl.esc(c.tagline)}</div>
        <div style="margin-top:0.5rem"><span class="tag">${Nihonl.esc(c.kind)}</span></div>
      </div>

      <div class="card culture-body" style="margin-top:1rem">
        <h3>是什么</h3>
        <p>${Nihonl.esc(c.summary)}</p>
        ${c.quote ? `<div class="quote">${Nihonl.esc(c.quote)}</div>` : ""}
        <h3>引申</h3>
        <p>${Nihonl.esc(c.extra)}</p>
        <h3>关联词汇</h3>
        <ul class="c-words" style="padding-left:1.1rem;margin:0.4rem 0">
          ${words.map((w) => `
            <li>
              <span class="ja" style="font-weight:600">${w.kana}</span>
              <span class="muted">${w.romaji} · ${Nihonl.esc(w.meaning)}</span>
              <a class="tag" href="#/vocab" style="margin-left:0.4rem">去背</a>
            </li>`).join("")}
        </ul>
      </div>
    `;
  }
};
