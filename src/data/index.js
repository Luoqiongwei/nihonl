// 由 scripts/convert_data.mjs 生成的数据入口
import { categories } from './categories.js';
import { words } from './words.js';
import { culture } from './culture.js';
import { kana } from './kana.js';
import { songs } from './songs.js';
import { songsIndex } from './songs-index.js';

export { categories, words, culture, kana, songs, songsIndex };

export function getWord(id) {
  return words.find((w) => w.id === id);
}

export function getCulture(id) {
  return culture.find((c) => c.id === id);
}

export function getSong(id) {
  return songs.find((s) => s.id === id);
}

export function songsForWord(wordId) {
  return songs.filter(
    (s) =>
      (s.words || []).includes(wordId) ||
      (s.points || []).some((p) => p.wordId === wordId)
  );
}

export function songProjects() {
  const seen = [];
  for (const s of songs) {
    if (s.project && !seen.includes(s.project)) seen.push(s.project);
  }
  return seen;
}
