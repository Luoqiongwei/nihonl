/* 首页：按日期轮换「今日文化 / 今日一曲」，并填充学习进度 */

import { culture, songsIndex, getWord } from '../data/index.js';
import { esc, link } from '../lib/helpers.js';
import store from '../lib/store.js';

const day = Math.floor(Date.now() / 86400000);
const c = culture[day % culture.length];
const song = songsIndex[day % songsIndex.length];

document.getElementById('today-culture').innerHTML = `
  <a class="card culture-card" href="${link(`culture/${encodeURIComponent(c.id)}`)}" style="display:block">
    <div class="c-ja">${esc(c.ja)}<span class="c-zh" style="margin-left:0.5rem">${esc(c.zh)}</span></div>
    <div class="c-tagline">${esc(c.tagline)}</div>
    <div class="c-words">
      ${(c.words || []).slice(0, 3).map((id) => { const w = getWord(id); return w ? `<span class="tag ghost">${esc(w.kana)}</span>` : ''; }).join('')}
      <span class="muted" style="font-size:0.82rem">关联词汇 · 点击阅读 →</span>
    </div>
  </a>`;

document.getElementById('today-song').innerHTML = `
  <a class="card song-card" href="${link(`music/${encodeURIComponent(song.id)}`)}" style="display:block">
    <div class="song-ja">${esc(song.title)}<span class="song-romaji" style="margin-left:0.5rem">${esc(song.romajiTitle || '')}</span></div>
    <div class="song-meta">${esc(song.artist)}${song.year ? ` · ${song.year}` : ''}</div>
    <div class="song-tags">
      <span class="tag">${esc(song.project || '其他')}</span>
      ${song.lyricsStatus === 'complete' ? '<span class="tag green">歌词节选</span>' : '<span class="tag gold">歌词待补</span>'}
      <span class="muted" style="font-size:0.82rem">边听歌边学词 →</span>
    </div>
  </a>`;

const s = store.stats();
const goalPct = Math.min(100, Math.round((s.reviewedToday / s.dailyGoal) * 100));
document.getElementById('stat-due').textContent = s.due;
document.getElementById('stat-new').textContent = s.newCount;
document.getElementById('stat-learned').textContent = `${s.learned} / ${s.total}`;
document.getElementById('stat-mastered').textContent = s.mastered;
document.getElementById('goal-text').textContent = `${s.reviewedToday} / ${s.dailyGoal} 张卡片`;
document.getElementById('goal-fill').style.width = goalPct + '%';
document.getElementById('goal-pct').textContent = goalPct + '%';
