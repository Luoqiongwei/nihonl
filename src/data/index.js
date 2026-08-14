// 由 scripts/convert_data.mjs 生成的数据入口
import { categories } from './categories.js';
import { words } from './words.js';
import { culture } from './culture.js';
import { kana } from './kana.js';
import { songs } from './songs.js';
import { grammar } from './grammar.js';
import { songsIndex } from './songs-index.js';

export { categories, words, culture, kana, songs, grammar, songsIndex };

export function getWord(id) {
  return words.find((w) => w.id === id);
}

export function getCulture(id) {
  return culture.find((c) => c.id === id);
}

export function getSong(id) {
  return songs.find((s) => s.id === id);
}

export function getGrammar(id) {
  return grammar.find((g) => g.id === id);
}

export function songsForWord(wordId) {
  return songs.filter(
    (s) =>
      (s.words || []).includes(wordId) ||
      (s.points || []).some((p) => p.wordId === wordId)
  );
}

export function songsForGrammar(grammarId) {
  return songs.filter((s) => (s.points || []).some((p) => p.grammarId === grammarId));
}

export function songProjects() {
  const seen = [];
  for (const s of songs) {
    if (s.project && !seen.includes(s.project)) seen.push(s.project);
  }
  return seen;
}
