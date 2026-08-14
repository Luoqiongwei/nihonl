/* 背单词：卡片 + 简易间隔复习（由旧 js/views/study.js 迁移） */

import { getWord, getCulture, categories } from '../data/index.js';
import { esc, link, speak, shuffle } from '../lib/helpers.js';
import store from '../lib/store.js';

const session = { filter: 'all', queue: [], index: 0, reviewed: 0, remembered: 0 };
const stage = document.getElementById('study-stage');

function categoryLabel(id) {
  const c = categories.find((x) => x.id === id);
  return c ? c.label : id;
}

function buildSession(filter) {
  const q = store.queue(filter);
  session.filter = filter;
  session.queue = shuffle([...q.due, ...q.fresh]);
  session.index = 0;
  session.reviewed = 0;
  session.remembered = 0;
}

function renderStage() {
  if (!session.queue.length) {
    stage.innerHTML = `
      <div class="card study-done">
        <div class="seal">了</div>
        <h2>没有可学的词</h2>
        <p class="muted">当前没有到期复习的词，也没有新词。<br>去词汇库逛逛，或者明天再来。</p>
        <p><a class="btn" href="${link('vocab')}">浏览词汇库</a></p>
      </div>`;
    return;
  }
  if (session.index >= session.queue.length) {
    stage.innerHTML = `
      <div class="card study-done">
        <div class="seal">完</div>
        <h2>本轮完成！</h2>
        <p class="muted">共复习 <b>${session.reviewed}</b> 张 · 记得 <b>${session.remembered}</b> 张</p>
        <p>
          <button class="btn btn-primary" id="again">再来一轮</button>
          <a class="btn" href="${link('')}">回首页</a>
        </p>
      </div>`;
    stage.querySelector('#again').addEventListener('click', () => {
      buildSession(session.filter);
      renderStage();
    });
    return;
  }

  const w = session.queue[session.index];
  const total = session.queue.length;
  const pct = Math.round((session.index / total) * 100);
  const cultures = (w.culture || []).map((id) => getCulture(id)).filter(Boolean);

  stage.innerHTML = `
    <div class="study-bar">
      <span class="count">${session.index + 1} / ${total}</span>
      <div class="progress"><i style="width:${pct}%"></i></div>
      <span class="count">${session.remembered} 记住</span>
    </div>
    <div class="card flashcard" id="card">
      <div class="f-top">
        <span class="tag ghost">${categoryLabel(w.category)}</span>
        <span class="tag ghost">${w.level}</span>
      </div>
      <div class="f-main">
        <div class="f-kana">${w.kana}</div>
        ${w.kanji ? `<div class="f-kanji">${w.kanji}</div>` : ''}
        <div class="f-romaji">${w.romaji}</div>
      </div>
      <div class="f-hint" id="hint">心里默念意思，然后…</div>
      <div class="f-reveal" id="reveal" hidden>
        <div class="f-meaning">${esc(w.meaning)}</div>
        <div class="f-example">${w.example.ja}<br><span class="muted">${esc(w.example.zh)}</span></div>
        ${w.mnemonic ? `<div class="f-mnemo">联想：${esc(w.mnemonic)}</div>` : ''}
        ${cultures.length ? `<div style="margin-top:0.8rem">${cultures.map((c) => `<a class="tag" href="${link(`culture/${encodeURIComponent(c.id)}`)}">${esc(c.zh)}</a>`).join('')}</div>` : ''}
        <div class="rating-row" id="ratings">
          <button class="rating-btn again" data-rating="0"><span class="jp">忘れた</span><span class="zh">忘了</span></button>
          <button class="rating-btn hard" data-rating="1"><span class="jp">うーん</span><span class="zh">模糊</span></button>
          <button class="rating-btn good" data-rating="2"><span class="jp">わかった</span><span class="zh">记得</span></button>
          <button class="rating-btn easy" data-rating="3"><span class="jp">簡単！</span><span class="zh">很熟</span></button>
        </div>
      </div>
    </div>
  `;

  const card = stage.querySelector('#card');
  const reveal = stage.querySelector('#reveal');
  const hint = stage.querySelector('#hint');
  const ratings = stage.querySelector('#ratings');

  const show = () => {
    reveal.hidden = false;
    hint.textContent = '对照一下，然后给自己打分：';
    speak(`${w.kana}。${w.example.ja}`);
  };
  card.addEventListener('click', (e) => {
    if (e.target.closest('.rating-btn') || e.target.closest('a')) return;
    if (reveal.hidden) show();
  });
  hint.style.cursor = 'pointer';
  hint.addEventListener('click', show);
  ratings.addEventListener('click', (e) => {
    const btn = e.target.closest('.rating-btn');
    if (!btn) return;
    store.review(w.id, Number(btn.dataset.rating));
    session.reviewed += 1;
    if (Number(btn.dataset.rating) >= 2) session.remembered += 1;
    session.index += 1;
    renderStage();
  });
}

buildSession('all');
renderStage();

document.querySelectorAll('.chip[data-filter]').forEach((chip) => {
  chip.addEventListener('click', () => {
    buildSession(chip.dataset.filter);
    document.querySelectorAll('.chip[data-filter]').forEach((c) => c.classList.toggle('active', c === chip));
    renderStage();
  });
});
