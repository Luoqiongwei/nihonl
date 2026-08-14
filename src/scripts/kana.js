/* 五十音：点击假名试发音 */

import { speak } from '../lib/helpers.js';

document.querySelectorAll('.kana-cell').forEach((cell) => {
  cell.addEventListener('click', () => {
    speak(cell.dataset.kana);
    cell.style.transform = 'scale(0.94)';
    setTimeout(() => { cell.style.transform = ''; }, 140);
  });
});
