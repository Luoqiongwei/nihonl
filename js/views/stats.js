/* 进度统计 */

Nihonl.views.stats = {
  render() {
    const s = NihonlStore.stats();
    const dist = NihonlStore.levelDistribution();
    const labels = ["未学", "刚认识", "学习中", "较熟", "熟悉", "掌握"];
    const activity = NihonlStore.recentActivity(14);
    const maxDay = Math.max(1, ...activity.map((d) => d.reviewed));
    const today = NihonlStore.todayKey();

    return `
      <div class="page-head">
        <span class="kicker">しんちょく</span>
        <h1>学习进度</h1>
        <p class="lead">数据保存在本浏览器中，不会上传。想重新开始可以随时重置。</p>
      </div>

      <div class="stat-strip">
        <div class="stat"><div class="num">${s.learned}</div><div class="label">已学习 / ${s.total}</div></div>
        <div class="stat"><div class="num accent-text">${s.mastered}</div><div class="label">已掌握（3 级以上）</div></div>
        <div class="stat"><div class="num">${s.reviewedToday}</div><div class="label">今日复习</div></div>
        <div class="stat"><div class="num">${s.rememberedToday}</div><div class="label">今日记住</div></div>
      </div>

      <div class="grid grid-2" style="margin-top:1rem">
        <div class="card">
          <h3 style="margin-top:0">记忆度分布</h3>
          ${dist.map((n, i) => {
            const pct = s.total ? Math.round((n / s.total) * 100) : 0;
            return `
              <div class="progress-bar">
                <div class="label">${labels[i]}（Lv${i}）</div>
                <div class="track"><div class="fill lv${i}" style="width:${pct}%"></div></div>
                <div class="pct">${n} 词</div>
              </div>`;
          }).join("")}
        </div>

        <div class="card">
          <h3 style="margin-top:0">近 14 天复习记录</h3>
          <div class="activity-chart">
            ${activity.map((d) => {
              const h = d.reviewed ? Math.max(12, Math.round((d.reviewed / maxDay) * 100)) : 0;
              return `
                <div class="day" title="${d.date}：复习 ${d.reviewed} 张">
                  <div class="bar ${d.date === today ? "hot" : ""}" style="height:${h}%"></div>
                  <div class="d">${d.date === today ? "今" : d.label}</div>
                </div>`;
            }).join("")}
          </div>
          <p class="muted" style="font-size:0.82rem;margin-bottom:0">坚持每天一点，间隔复习的效果才会显现。</p>
        </div>
      </div>

      <div class="card" style="margin-top:1rem">
        <h3 style="margin-top:0">每日目标</h3>
        <p class="muted" style="margin-top:0">当前目标：${s.dailyGoal} 张 / 天</p>
        <div style="display:flex;gap:0.6rem;flex-wrap:wrap">
          <input type="number" id="goal-input" min="5" max="100" value="${s.dailyGoal}" style="width:110px">
          <button class="btn" id="goal-save">保存目标</button>
        </div>
      </div>

      <div class="card danger-zone" style="margin-top:1rem">
        <h3 style="margin-top:0;color:var(--bad)">重置学习进度</h3>
        <p class="muted" style="margin-top:0">清空全部记忆度与复习记录，词汇数据本身不会丢失。此操作不可撤销。</p>
        <button class="btn" id="reset-btn" style="border-color:var(--bad);color:var(--bad)">重置进度</button>
      </div>
    `;
  },

  mount(el) {
    const goalInput = el.querySelector("#goal-input");
    el.querySelector("#goal-save").addEventListener("click", () => {
      NihonlStore.setDailyGoal(goalInput.value);
      Nihonl.toast("每日目标已更新");
      Nihonl.router.render();
    });
    el.querySelector("#reset-btn").addEventListener("click", () => {
      if (confirm("确定要清空所有学习进度吗？此操作不可撤销。")) {
        NihonlStore.reset();
        Nihonl.toast("进度已重置");
        setTimeout(() => Nihonl.router.render(), 0);
      }
    });
  }
};
