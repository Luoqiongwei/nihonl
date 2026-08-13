/* 首页 */

Nihonl.views.home = {
  render() {
    const s = NihonlStore.stats();
    const goalPct = Math.min(100, Math.round((s.reviewedToday / s.dailyGoal) * 100));
    const spotlight = NihonlData.culture[Math.floor(Math.random() * NihonlData.culture.length)];
    const spotWords = NihonlData.wordsForCulture(spotlight.id).slice(0, 3);

    return `
      <section class="hero">
        <div class="inner">
          <span class="kicker">日本語の入り口</span>
          <h1>日语入门，从「言葉」<br>与<span class="jp">文化</span>开始</h1>
          <p class="lead">面向中文母语者的词汇记忆站：用卡片背单词，用二次元文化与日本美学做联想，让每个词都有画面。</p>
          <p style="margin:0.4rem 0 0">
            <a class="btn btn-primary" href="#/study">开始背单词</a>
            <a class="btn" href="#/vocab">浏览词汇库</a>
          </p>
        </div>
        <div class="tate">一期一会<small>いちごいちえ</small></div>
      </section>

      <div class="stat-strip">
        <div class="stat"><div class="num accent-text">${s.due}</div><div class="label">今日待复习</div></div>
        <div class="stat"><div class="num indigo-text">${s.newCount}</div><div class="label">新词待学</div></div>
        <div class="stat"><div class="num">${s.learned}</div><div class="label">已学习 / ${s.total}</div></div>
        <div class="stat"><div class="num">${s.mastered}</div><div class="label">已掌握</div></div>
      </div>

      <div class="card" style="margin-bottom:0.4rem">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:1rem;flex-wrap:wrap">
          <h3 style="margin:0">今日目标 <span class="muted" style="font-size:0.85rem;font-weight:400">${s.reviewedToday} / ${s.dailyGoal} 张卡片</span></h3>
          <a class="btn btn-sm btn-indigo" href="#/study">去学习</a>
        </div>
        <div class="progress-bar" style="margin-top:0.7rem">
          <div class="track"><div class="fill" style="width:${goalPct}%;background:linear-gradient(90deg,var(--accent),var(--gold))"></div></div>
          <div class="pct">${goalPct}%</div>
        </div>
      </div>

      <div class="section-title">
        <h2>怎么用</h2>
        <span class="ja-sub">どうやって使う</span>
      </div>
      <div class="grid grid-3">
        <div class="card steps">
          <div class="step"><h3>先认识五十音</h3><p>在「五十音」页熟悉平假名与片假名，点击可试发音。</p></div>
        </div>
        <div class="card steps">
          <div class="step"><h3>用卡片背单词</h3><p>看假名想意思，按记忆程度打分，系统安排下一次复习。</p></div>
        </div>
        <div class="card steps">
          <div class="step"><h3>用文化加深印象</h3><p>每个词都配有动漫/美学联想，在「文化」页读一读背后的故事。</p></div>
        </div>
      </div>

      <div class="section-title">
        <h2>今日文化一角</h2>
        <span class="ja-sub">きょうの文化</span>
      </div>
      <a class="card culture-card" href="#/culture/${encodeURIComponent(spotlight.id)}" style="display:block">
        <div class="c-ja">${Nihonl.esc(spotlight.ja)}<span class="c-zh" style="margin-left:0.5rem">${Nihonl.esc(spotlight.zh)}</span></div>
        <div class="c-tagline">${Nihonl.esc(spotlight.tagline)}</div>
        <div class="c-words">
          ${spotWords.map((w) => `<span class="tag ghost">${Nihonl.esc(w.kana)}</span>`).join("")}
          <span class="muted" style="font-size:0.82rem">关联词汇 · 点击阅读 →</span>
        </div>
      </a>
    `;
  }
};
