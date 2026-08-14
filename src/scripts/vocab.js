/* 词汇库：搜索 / 分类 / 状态筛选 + 展开详情 */

import { words, categories, getWord, getCulture } from '../data/index.js';
import { esc, link } from '../lib/helpers.js';
import store from '../lib/store.js';

const state = { q: '', cat: 'all', status: 'all', expanded: null };

function categoryLabel(id) {
  const c = categories.find((x) => x.id === id);
  return c ? c.label : id;
}

function cultureForWord(wordId) {
  const w = getWord(wordId);
  if (!w || !w.culture) return [];
  return w.culture.map((id) => getCulture(id)).filter(Boolean);
}

function detailHtml(w) {
  const cultures = cultureForWord(w.id);
  return `
    <div class="word-detail" data-id="${w.id}">
      <dl>
        <dt>读音</dt><dd>${w.kana} ${w.kanji ? `（${w.kanji}）` : ''} · ${w.romaji}</dd>
        <dt>释义</dt><dd>${esc(w.meaning)}</dd>
        <dt>词性 / 等级</dt><dd>${w.pos} · ${w.level}</dd>
        <dt>分类</dt><dd>${categoryLabel(w.category)}</dd>
      </dl>
      <div class="example">
        <div class="ja">${w.example.ja}</div>
        <div class="muted">${esc(w.example.zh)}</div>
      </div>
      ${w.mnemonic ? `<div class="mnemonic"><b>联想记忆</b>　${esc(w.mnemonic)}</div>` : ''}
      ${cultures.length ? `
        <div class="culture-links">
          ${cultures.map((c) => `<a class="tag" href="${link(`culture/${encodeURIComponent(c.id)}`)}">${esc(c.zh)}</a>`).join('')}
          <span class="muted" style="font-size:0.8rem">点击进入文化词条</span>
        </div>` : ''}
      <div class="culture-links" id="songs-${w.id}"></div>
    </div>
  `;
}

/* 展开时才加载歌曲数据（懒加载，避免词汇页背整份歌词库） */
async function loadSongs(id) {
  const box = document.getElementById(`songs-${id}`);
  if (!box) return;
  const { songs } = await import('../data/songs.js');
  const found = songs.filter(
    (s) => (s.words || []).includes(id) || (s.points || []).some((p) => p.wordId === id)
  );
  if (!found.length) return;
  box.innerHTML = found
    .map((s) => `<a class="tag gold" href="${link(`music/${encodeURIComponent(s.id)}`)}">♪ ${esc(s.title)}</a>`)
    .join('') + `<span class="muted" style="font-size:0.8rem">出自歌曲</span>`;
}

function renderList() {
  const el = document.getElementById('vocab-list');
  let list = words.filter((w) => {
    if (state.cat !== 'all' && w.category !== state.cat) return false;
    const status = store.statusOf(w.id);
    if (state.status !== 'all' && status !== state.status) return false;
    if (state.q) {
      const q = state.q.toLowerCase();
      const hay = `${w.kana} ${w.kanji || ''} ${w.romaji} ${w.meaning} ${w.pos}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  if (!list.length) {
    el.innerHTML = `<div class="empty"><span class="big">空</span>没有符合条件的词汇，换个筛选试试。</div>`;
    return;
  }

  el.innerHTML = list.map((w) => {
    const status = store.statusOf(w.id);
    const dot = { new: 'new', learning: 'learning', mastered: 'mastered' }[status];
    const statusText = { new: '未学', learning: '学习中', mastered: '已掌握' }[status];
    const open = state.expanded === w.id;
    return `
      <div class="word-row" data-id="${w.id}">
        <div class="ja-main">
          <span class="kana">${w.kana}</span>
          ${w.kanji ? `<span class="kanji">${w.kanji}</span>` : ''}
          <span class="romaji">${w.romaji}</span>
        </div>
        <div class="meaning">${esc(w.meaning)}</div>
        <div class="meta"><span class="tag ghost">${categoryLabel(w.category)}</span><span class="tag ghost">${w.pos}</span></div>
        <div class="meta"><span class="status-dot ${dot}"></span>${statusText}</div>
      </div>
      ${open ? detailHtml(w) : ''}
    `;
  }).join('');
}

const list = document.getElementById('vocab-list');
renderList();

document.getElementById('vocab-search').addEventListener('input', (e) => {
  state.q = e.target.value.trim();
  state.expanded = null;
  renderList();
});

document.getElementById('vocab-status').addEventListener('change', (e) => {
  state.status = e.target.value;
  state.expanded = null;
  renderList();
});

document.querySelectorAll('.chip[data-cat]').forEach((chip) => {
  chip.addEventListener('click', () => {
    state.cat = chip.dataset.cat;
    state.expanded = null;
    document.querySelectorAll('.chip[data-cat]').forEach((c) => c.classList.toggle('active', c === chip));
    renderList();
  });
});

list.addEventListener('click', (e) => {
  const row = e.target.closest('.word-row');
  if (!row) return;
  const id = row.dataset.id;
  const w = getWord(id);
  if (!w) return;
  state.expanded = state.expanded === id ? null : id;
  renderList();
  if (state.expanded) {
    loadSongs(id);
    const detail = list.querySelector(`.word-detail[data-id="${id}"]`);
    detail && detail.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
});
