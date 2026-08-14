/* 音楽列表：企划筛选 + 搜索（直接操作已渲染的 DOM，不加载整份歌曲数据） */

const grid = document.getElementById('song-grid');
const cards = Array.from(grid.querySelectorAll('.song-card'));
let project = 'all';
let q = '';

function apply() {
  cards.forEach((card) => {
    const okProject = project === 'all' || card.dataset.project === project;
    const okQ = !q || (card.dataset.hay || '').includes(q);
    card.style.display = okProject && okQ ? '' : 'none';
  });
}

document.getElementById('music-search').addEventListener('input', (e) => {
  q = e.target.value.trim().toLowerCase();
  apply();
});
document.querySelectorAll('.chip[data-project]').forEach((chip) => {
  chip.addEventListener('click', () => {
    project = chip.dataset.project;
    document.querySelectorAll('.chip[data-project]').forEach((c) => c.classList.toggle('active', c === chip));
    apply();
  });
});
