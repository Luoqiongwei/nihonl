/* 歌曲库扩展（批量收录）
 * 通过 Vocaloid Lyrics Wiki 批量查证后收录的歌曲，字段说明见 data.js 顶部注释。
 * 只收录已确认歌词的歌曲；不写点评，仅保留客观信息 + 歌词节选 + 词汇讲解。
 */

(function () {
  const songs = [
    {
      id: "shinpakusuu0822",
      title: "心拍数♯0822",
      romajiTitle: "Shinpakusuu♯0822",
      artist: "初音ミク（Dark）",
      producer: "蝶々P（作詞・作曲）",
      year: 2011,
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "僕の心臓がね、止まる頃にはね", zh: "等到我的心跳停止的时候" },
        { ja: "きっとこの世をね、満喫し終わっていると思うんだ", zh: "我一定已经好好享受完这个世界了吧" },
        { ja: "この胸が脈打つうちは君をまだ守っていたい", zh: "在这颗心还在跳动的时候，我还想继续守护你" },
        { ja: "生きる意味なんてそれでいいの", zh: "活着的意义，这样就好" }
      ],
      points: [
        { ja: "脈打つうちは", zh: "在（心脏）跳动期间", note: "脈打つ=（心脏）搏动；「〜うちは」表示在某个状态持续的期间内。", wordId: "kokoro" },
        { ja: "満喫し終わっている", zh: "已经尽情享受完了", note: "満喫=尽情享受；「〜し終わる」表示动作做完。", wordId: "tanoshii" },
        { ja: "生きる意味なんてそれでいいの", zh: "活着的意义，这样就好", note: "意味=意义；「なんて」轻描淡写地举例，否定严肃化。", wordId: "yume" }
      ],
      words: ["kokoro", "tanoshii", "yume"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E5%BF%83%E6%8B%8D%E6%95%B0%E2%99%AF0822_(Shinpakusuu%E2%99%AF0822)" }
      ]
    },
    {
      id: "harehareya",
      title: "ハレハレヤ",
      romajiTitle: "Harehareya",
      artist: "flower",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "夜の街迷いし穢れの乱歩", zh: "在夜晚的街道上彷徨的、污浊的漫步" },
        { ja: "ねぇうちにおいで温めてあげるよ", zh: "呐，来我家里吧，我会帮你暖身子的" },
        { ja: "ここらで休んでみませんか", zh: "要不要在这里歇一歇" },
        { ja: "足跡は雪が消していた", zh: "脚印被雪抹去了" }
      ],
      points: [
        { ja: "うちにおいで", zh: "来我家吧", note: "おいで=来る的礼貌劝诱形，日常口语里邀请对方“过来”常用。", wordId: "iku" },
        { ja: "温めてあげるよ", zh: "我来帮你暖暖", note: "「〜てあげる」表示“为对方做…”，是授受动词的基本用法。", wordId: "kokoro" },
        { ja: "休んでみませんか", zh: "要不要试着歇一歇", note: "「〜てみませんか」= 要不要试着…，委婉提议的礼貌说法。", wordId: "nemuru" }
      ],
      words: ["iku", "nemuru", "kokoro"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E3%83%8F%E3%83%AC%E3%83%8F%E3%83%AC%E3%83%A4_(Harehare_Ya)" }
      ]
    },
    {
      id: "metafiction",
      title: "メタフィクション",
      romajiTitle: "Metafiction",
      artist: "*Luna feat. ねんね",
      producer: "*Luna（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "想像で創造した 恣意ワンダーランド", zh: "用想象创造出的、恣意的仙境" },
        { ja: "形而上が波形化した 思惟スペクトラム", zh: "形而上学波形化而成的思维光谱" },
        { ja: "ダサい ダサい なんて 言っちゃ嫌", zh: "不许说“好土、好土”哦" }
      ],
      points: [
        { ja: "想像で創造した", zh: "用想象创造出来的", note: "想像（そうぞう）与創造（そうぞう）读音相同，是歌词里的文字游戏；「で」表手段。", wordId: "yume" },
        { ja: "言っちゃ嫌", zh: "说了可不行", note: "「言っては嫌」的口语缩略（〜ちゃ＝〜ては），表示“如果那样做的话就讨厌/不行”。", wordId: "hanasu" },
        { ja: "ダサい", zh: "土气；俗气", note: "年轻人常用的贬义形容词，形容穿着、言行不上档次。", wordId: "yabai" }
      ],
      words: ["yume", "hanasu", "yabai"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E3%83%A1%E3%82%BF%E3%83%95%E3%82%A3%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3_(Metafiction)" }
      ]
    },
    {
      id: "rei-no-hana",
      title: "零ノ花",
      romajiTitle: "Rei no Hana",
      artist: "flower",
      producer: "足立レイ（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "届くから 叶うから", zh: "会传达到的，会实现的" },
        { ja: "僕の手と君の手 繋いだら 離さずに ずっと", zh: "一旦牵起我的手和你的手，就永远不松开" },
        { ja: "ぎゅっと ここでは", zh: "紧紧地，就在这里" }
      ],
      points: [
        { ja: "届くから 叶うから", zh: "会传达到的，会实现的", note: "届く=传达、到达；叶う=（愿望）实现。两句连用强调希望。", wordId: "yume" },
        { ja: "繋いだら 離さずに", zh: "一旦牵上就不松开", note: "「〜たら」= 一旦…；「離さずに」= 不松开地（ずに＝否定+伴随）。", wordId: "kiseki" },
        { ja: "ぎゅっと", zh: "紧紧地", note: "拟声拟态词，形容用力拥抱或握紧的样子。", wordId: "kokoro" }
      ],
      words: ["yume", "kiseki", "kokoro"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E9%9B%B6%E3%83%8E%E8%8A%B1_(Rei_no_Hana)" }
      ]
    },
    {
      id: "karabako-ni-ai",
      title: "カラバコにアイ",
      romajiTitle: "Karabako ni Ai",
      artist: "初音ミク",
      producer: "MIMI（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "消えてゆく儚さだけポケットにしまって", zh: "只把渐渐消逝的虚幻收进口袋里" },
        { ja: "上手く生きられない からからから", zh: "没法好好地活着，咔啦咔啦咔啦" },
        { ja: "何かが足りない からからから", zh: "总觉得缺了点什么，咔啦咔啦咔啦" },
        { ja: "涙を隠してた からからから", zh: "一直藏起眼泪，咔啦咔啦咔啦" }
      ],
      points: [
        { ja: "儚さ", zh: "虚幻；转瞬即逝", note: "儚い（虚幻的）的名词化，与「物哀」的审美相通。", wordId: "setsunai" },
        { ja: "上手く生きられない", zh: "没法好好地活着", note: "上手く=好好地；「生きられない」= 无法活下去（可能形否定）。", wordId: "yume" },
        { ja: "からからから", zh: "咔啦咔啦咔啦", note: "拟声叠词，模拟空转的声音，也暗示“空（から）”的心。", wordId: "kokoro" }
      ],
      words: ["kokoro", "setsunai", "yume"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E3%82%AB%E3%83%A9%E3%83%90%E3%82%B3%E3%81%AB%E3%82%A2%E3%82%A4_(Karabako_ni_Ai)" }
      ]
    },
    {
      id: "choujigen-aika",
      title: "超次元愛歌",
      romajiTitle: "Choujigen Aika",
      artist: "初音ミク",
      producer: "Orangestar（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "次元を越えた遠距離恋愛", zh: "跨越次元的远距离恋爱" },
        { ja: "僕は僕なりの「現実」を生きてんだ", zh: "我正活在我自己的「现实」里" },
        { ja: "所詮僕の愛も二次元だ", zh: "说到底，我的爱也只是二次元" }
      ],
      points: [
        { ja: "次元を越えた", zh: "跨越了次元的", note: "次元=维度；越える=跨越。御宅文化语境里的常用梗。", wordId: "kiseki" },
        { ja: "僕なりの", zh: "属于我自己的", note: "「〜なり」表示“以自己的方式、属于自己的”。", wordId: "yume" },
        { ja: "所詮", zh: "说到底；终究", note: "网络与歌曲里常见的副词，带一点自嘲的口气。" }
      ],
      words: ["yume", "kiseki"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E8%B6%85%E6%AC%A1%E5%85%83%E6%84%9B%E6%AD%8C_(Choujigen_Aika)" }
      ]
    },
    {
      id: "kanbi-na-muhou",
      title: "甘美な無法",
      romajiTitle: "Kanbi na Muhou",
      artist: "理芽",
      project: "神椿",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "３＋１は４ではないんです", zh: "3+1 并不是 4" },
        { ja: "海の向こうへ、空中の遊泳", zh: "向着海的另一边，在空中遨游" },
        { ja: "甘美な無法地帯へ", zh: "走向甘美的无法地带" }
      ],
      points: [
        { ja: "〜ではないんです", zh: "并不是…（强调说明）", note: "「ではない」＋「んです」构成强调解释的句式。", wordId: "sora" },
        { ja: "無法地帯", zh: "无法地带", note: "指没有法律约束的地方，这里作为比喻使用。", wordId: "kaze" },
        { ja: "甘美な", zh: "甘美的；甜美的", note: "甘美（かんび）=甜美，形容带有诱惑感的美好。", wordId: "utsukushii" }
      ],
      words: ["sora", "kaze", "utsukushii"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E7%94%98%E7%BE%8E%E3%81%AA%E7%84%A1%E6%B3%95_(Kanbi_na_Muhou)" }
      ]
    },
    {
      id: "erika-no-urei",
      title: "エリカの憂い",
      romajiTitle: "Erica no Urei",
      artist: "星界",
      producer: "香椎モイミ（作詞・作曲）",
      project: "神椿",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "他人の瞳に映った 私の姿は偽物だ", zh: "映在别人眼里的我，是赝品" },
        { ja: "今日はさようなら またね、は要らない", zh: "今天就说再见吧，“回头见”不需要" },
        { ja: "可憐に咲く花のように 一度儚く生きて", zh: "像可怜绽放的花一样，短暂地活一次" }
      ],
      points: [
        { ja: "偽物", zh: "赝品；冒牌货", note: "与「本物」（真货）相对，常用在自我怀疑的歌词里。", wordId: "sayounara" },
        { ja: "またね、は要らない", zh: "“回头见”不需要", note: "「要らない」= 不需要；对比「さようなら」与轻松的「またね」。", wordId: "sayounara" },
        { ja: "儚く生きて", zh: "短暂地活一次", note: "儚い的连用形＋生きる，物哀式的表达。", wordId: "setsunai" }
      ],
      words: ["sayounara", "setsunai", "hana"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E3%82%A8%E3%83%AA%E3%82%AB%E3%81%AE%E6%86%82%E3%81%84_(Erica_no_Urei)" }
      ]
    },
    {
      id: "taisetsu-na-hitotachi-e",
      title: "大切な人たちへ",
      romajiTitle: "Taisetsu na Hitotachi e",
      artist: "初音ミク",
      producer: "傘村トータ（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "音楽と出会ってよかったと思う", zh: "我觉得能遇见音乐真是太好了" },
        { ja: "音楽に救われたことがあるから", zh: "因为我曾被音乐拯救过" },
        { ja: "不幸にならないでくれ", zh: "请你不要遭遇不幸" }
      ],
      points: [
        { ja: "出会ってよかった", zh: "幸好遇见了", note: "「〜てよかった」= 幸好…了，表达庆幸。", wordId: "kiseki" },
        { ja: "救われたことがある", zh: "曾被拯救过", note: "救われる=被拯救（受身）；「〜たことがある」= 曾经…过。", wordId: "arigatou" },
        { ja: "〜ないでくれ", zh: "请不要…", note: "「〜ないでくれ」是恳切请求“不要做某事”的说法。", wordId: "yume" }
      ],
      words: ["kiseki", "arigatou", "kokoro"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E5%A4%A7%E5%88%87%E3%81%AA%E4%BA%BA%E3%81%9F%E3%81%A1%E3%81%B8_(Taisetsu_na_Hitotachi_e)" }
      ]
    },
    {
      id: "sakurabiyori-to-timemachine",
      title: "桜日和とタイムマシン",
      romajiTitle: "Sakurabiyori to Time Machine",
      artist: "Ado × 初音ミク",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "今年も春が来ると 懐かしい声がするような", zh: "今年春天一到，仿佛又听到那怀念的声音" },
        { ja: "桜日和の空 ふたり 歩く道にはひとしきり", zh: "樱花日和的天，两人走过的路上，一阵风" },
        { ja: "「さよなら」よりも相応しい言葉は 胸の奥につっかえて", zh: "比起“再见”更合适的话，卡在心底深处" }
      ],
      points: [
        { ja: "懐かしい声がする", zh: "仿佛听到怀念的声音", note: "「〜がする」表示五感上的感觉（听到、闻到）；懐かしい=令人怀念。", wordId: "natsukashii" },
        { ja: "〜よりも相応しい", zh: "比起…更合适", note: "相応しい=相称、恰当；「AよりもB」= 比起 A，B 更…。", wordId: "sayounara" },
        { ja: "胸の奥につっかえて", zh: "卡在心底深处", note: "つっかえる=卡住、堵住；形容想说却说不出口。", wordId: "kokoro" }
      ],
      words: ["natsukashii", "sayounara", "hana"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E6%A1%9C%E6%97%A5%E5%92%8C%E3%81%A8%E3%82%BF%E3%82%A4%E3%83%A0%E3%83%9E%E3%82%B7%E3%83%B3_(Sakurabiyori_to_Time_Machine)" }
      ]
    }
  ];

  for (const s of songs) NihonlData.songs.push(s);
})();
