/* 五十音 */

Nihonl.views.kana = {
  render() {
    const k = NihonlData.kana;
    const block = (title, sub, set, extraClass) => `
      <div class="kana-block">
        <h2>${title}<small>${sub}</small></h2>
        <div class="kana-grid">
          ${set.map(([ch, r]) => `
            <button class="kana-cell ${extraClass || ""}" data-kana="${Nihonl.esc(ch)}">
              <span class="k">${ch}</span>
              <span class="r">${r}</span>
            </button>`).join("")}
        </div>
      </div>`;

    return `
      <div class="page-head">
        <span class="kicker">五十音</span>
        <h1>假名入门</h1>
        <p class="lead">日语假名分为平假名（圆润，用于和语）与片假名（方正，用于外来语）。点击任意假名可试发音（需系统支持日语语音）。</p>
      </div>

      ${block("平假名 ひらがな", "清音", k.hiragana.seion)}
      ${block("平假名 浊音・半浊音", "がぎぐげご…", [...k.hiragana.dakuon, ...k.hiragana.handakuon], "dakuon")}
      ${block("平假名 拗音", "きゃ・しゅ・ちょ…", k.hiragana.youon, "yoon")}

      ${block("片假名 カタカナ", "清音", k.katakana.seion)}
      ${block("片假名 浊音・半浊音", "ガギグゲゴ…", [...k.katakana.dakuon, ...k.katakana.handakuon], "dakuon")}
      ${block("片假名 拗音", "キャ・シュ・チョ…", k.katakana.youon, "yoon")}

      <div class="card flat" style="margin-top:1rem">
        <h3 style="margin-top:0">小贴士</h3>
        <p class="muted">先认「清音」，再认浊音和拗音。片假名主要拼写外来语，比如 ラーメン（拉面）、アニメ（动画）。背单词时多用「看假名 → 想读音」的方式自测。</p>
      </div>
    `;
  },

  mount(el) {
    el.querySelectorAll(".kana-cell").forEach((cell) => {
      cell.addEventListener("click", () => {
        Nihonl.speak(cell.dataset.kana);
        cell.style.transform = "scale(0.94)";
        setTimeout(() => { cell.style.transform = ""; }, 140);
      });
    });
  }
};
