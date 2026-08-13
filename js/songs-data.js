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
    },
    {
      id: "kami-no-kotoba",
      title: "カミノコトバ",
      romajiTitle: "Kami no Kotoba",
      artist: "初音ミク（Append）",
      producer: "Yuyoyuppe（作詞・作曲）",
      year: 2011,
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "針を愛でる意味を授けた　僕のコトバ", zh: "赋予我「欣赏恶意」之意义的，我的话语" },
        { ja: "赤く光る哀れみの束　繰り返して連なる", zh: "赤红发光的怜悯之束，反复地连绵不绝" },
        { ja: "傷痕はもう慣れっこさ　灯る焦燥", zh: "伤痕早已习以为常，燃起的焦躁" }
      ],
      points: [
        { ja: "愛でる", zh: "欣赏；珍视", note: "与愛する不同，愛でる带有「细细观赏」的意味，是这首歌标题的关键词。", wordId: "kokoro" },
        { ja: "慣れっこさ", zh: "早就习惯了", note: "慣れる的口语强调形（〜っこ），表示「已经习以为常」。", wordId: "natsukashii" },
        { ja: "繰り返して連なる", zh: "反复地连绵不绝", note: "繰り返す=重复；連なる=接连不断。", wordId: "kiseki" }
      ],
      words: ["kokoro", "natsukashii"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E3%82%AB%E3%83%9F%E3%83%8E%E3%82%B3%E3%83%88%E3%83%90_(Kami_no_Kotoba)" }
      ]
    },
    {
      id: "light-falls",
      title: "Light Falls",
      romajiTitle: "Light Falls",
      artist: "初音ミク",
      producer: "yuxuki waga（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "溢れる程　舞う", zh: "多到满溢般飞舞" },
        { ja: "色　失って　滲んだ　世界に立って　そっと見上げたら", zh: "在失去颜色而晕染的世界里，轻轻抬头仰望" },
        { ja: "君に届く光", zh: "传达给你的光" }
      ],
      points: [
        { ja: "溢れる程", zh: "多到满溢的程度", note: "溢れる=满溢；「〜程」= 到…的程度。", wordId: "yume" },
        { ja: "見上げたら", zh: "一抬头看", note: "見上げる=仰望；「〜たら」= 一…就…。", wordId: "sora" },
        { ja: "君に届く光", zh: "传达给你的光", note: "届く=传达、到达，是本曲的关键意象。", wordId: "kiseki" }
      ],
      words: ["sora", "yume", "kiseki"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/Light_Falls" }
      ]
    },
    {
      id: "little-traveler",
      title: "Little Traveler",
      romajiTitle: "Little Traveler",
      artist: "初音ミク",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "君と僕だけのステーション", zh: "只属于你和我的车站" },
        { ja: "管制塔の指示を振り切って飛び越して", zh: "甩开管制塔的指示，飞跃过去" },
        { ja: "見えるのは確かな幻想回廊", zh: "看见的是确切的幻想回廊" }
      ],
      points: [
        { ja: "振り切って飛び越して", zh: "甩开并飞跃", note: "振り切る=甩开、摆脱；飛び越す=飞越。连用形制造奔跑感。", wordId: "iku" },
        { ja: "幻想回廊", zh: "幻想回廊", note: "幻想（げんそう）＋回廊（かいろう）的组合造词。", wordId: "yume" },
        { ja: "ステーション", zh: "车站", note: "英语 station 的片假名，歌词里指「只属于两人的场所」。", wordId: "tomodachi" }
      ],
      words: ["iku", "yume", "tomodachi"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/Little_traveler" }
      ]
    },
    {
      id: "yomei-mikka-shoujo",
      title: "余命3日少女",
      romajiTitle: "Yomei Mikka Shoujo",
      artist: "くろくも",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "白く脆く崩れる　思いを繋ぐの", zh: "苍白而脆弱地崩落，将思念维系起来" },
        { ja: "誰かに気づいて欲しくて　ただ　ただ　歩きまわるの", zh: "好想被谁发现，只是一遍又一遍地徘徊" },
        { ja: "夜空を仰いで　星になるの", zh: "仰望夜空，化作星星" }
      ],
      points: [
        { ja: "気づいて欲しくて", zh: "好想（被谁）注意到", note: "「〜てほしい」表示希望对方做某事；て形连用表原因。", wordId: "kokoro" },
        { ja: "歩きまわる", zh: "四处徘徊", note: "歩く＋まわる（转），表示漫无目的地走来走去。", wordId: "iku" },
        { ja: "夜空を仰いで", zh: "仰望夜空", note: "仰ぐ=仰望；夜空=夜晚的天空。", wordId: "sora" }
      ],
      words: ["kokoro", "iku", "sora"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E4%BD%99%E5%91%BD3%E6%97%A5%E5%B0%91%E5%A5%B3_(Yomei_Mikka_Shoujo)" }
      ]
    },
    {
      id: "doomer",
      title: "Doomer",
      romajiTitle: "Doomer",
      artist: "重音テト",
      producer: "東京真中（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "ぶっ飛んだアイデアにはNo No", zh: "对过于离谱的点子，No No" },
        { ja: "平凡なんじゃカッコ悪いぜ", zh: "平平无奇的话也太逊了" },
        { ja: "「期待」「愛」「未来」無い", zh: "期待、爱、未来，都没有" }
      ],
      points: [
        { ja: "ぶっ飛んだ", zh: "离谱的；夸张的", note: "ぶっ飛ぶ（夸张、飞脱）的过去式，年轻人形容点子天马行空。", wordId: "yabai" },
        { ja: "カッコ悪い", zh: "逊；没面子", note: "かっこ悪い的省略说法，与かっこいい相对。", wordId: "kakkoii" },
        { ja: "なんじゃ", zh: "什么的（口语）", note: "なんて的方言/口语变体，带一点随便的口气。", wordId: "yume" }
      ],
      words: ["yabai", "kakkoii", "yume"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E3%83%89%E3%82%A5%E3%83%BC%E3%83%9E%E3%83%BC_(Doomer)" }
      ]
    },
    {
      id: "deep-in-the-night",
      title: "Deep In The Night",
      romajiTitle: "Deep In The Night",
      artist: "初音ミク V4X",
      producer: "regulus（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "深く突き刺さる黒い鼓動", zh: "深深刺入的黑色心跳" },
        { ja: "何処に捨てて来た？二人の夢", zh: "把两个人的梦，丢到哪里去了？" },
        { ja: "少しずつ遠くへ離れてしまう", zh: "一点一点地，渐渐远去" }
      ],
      points: [
        { ja: "突き刺さる", zh: "刺入；扎进", note: "突く＋刺さる的复合自动词，形容尖锐地扎进来。", wordId: "kokoro" },
        { ja: "捨てて来た", zh: "丢弃后离开", note: "捨てる＋てくる，表示「丢下（它）来到这里」。", wordId: "yume" },
        { ja: "〜てしまう", zh: "（无可挽回地）…了", note: "表达遗憾、无法挽回的语气，情歌高频语法。", wordId: "setsunai" }
      ],
      words: ["kokoro", "yume", "setsunai"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/Deep_In_The_Night" }
      ]
    },
    {
      id: "beautiful-day",
      title: "Beautiful Day",
      romajiTitle: "Beautiful Day",
      artist: "初音ミク",
      producer: "Mwk（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "夜が明けたら　きっと日は昇る", zh: "天一亮，太阳一定会升起" },
        { ja: "雨が上がったら　光芒が刺さる", zh: "雨一停，光芒就会照进来" },
        { ja: "明日を彩る　青空描く音", zh: "为明天上色、描绘晴空的声音" }
      ],
      points: [
        { ja: "〜たら　きっと", zh: "一…就一定…", note: "「たら」表条件，「きっと」加强肯定，是期许未来时的常用句式。", wordId: "ashita" },
        { ja: "彩る", zh: "点缀；上色", note: "给画面增添色彩，引申为「让…变得多彩」。", wordId: "utsukushii" },
        { ja: "青空描く", zh: "描绘晴空", note: "青空=晴空；描く=描绘。", wordId: "sora" }
      ],
      words: ["ashita", "sora", "utsukushii"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/Beautiful_Day/Mwk" }
      ]
    },
    {
      id: "juusan",
      title: "『13』",
      romajiTitle: "Juu-san",
      artist: "初音ミク",
      producer: "とあ（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "届かない紙飛行機を　またひとつ　飛ばした", zh: "又放飞了一架传达不到的纸飞机" },
        { ja: "キレイな箱に　仕舞い込んでいた", zh: "一直收在漂亮的盒子里" },
        { ja: "飾って　繋いで　焦って　揺らいで", zh: "装饰着、维系着、焦急着、动摇着" }
      ],
      points: [
        { ja: "紙飛行機", zh: "纸飞机", note: "紙＋飛行機；「届かない」呼应「传达不到的心意」。", wordId: "yume" },
        { ja: "仕舞い込んでいた", zh: "一直收起来", note: "仕舞い込む=收纳、藏起；过去进行时表持续状态。", wordId: "kokoro" },
        { ja: "揺らいで", zh: "动摇着", note: "揺らぐ=摇摆、动摇，形容心情不定。", wordId: "setsunai" }
      ],
      words: ["yume", "kokoro", "setsunai"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E3%80%8E13%E3%80%8F" }
      ]
    },
    {
      id: "where-shall-we-go",
      title: "Where shall we go",
      romajiTitle: "Where shall we go",
      artist: "鏡音リン・鏡音レン",
      producer: "めろくる（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "おはよう　私もさっき着いたばかりなんだけど", zh: "早上好，我也是刚到" },
        { ja: "とりあえず僕もコーヒー", zh: "总之我也来杯咖啡" },
        { ja: "それじゃ適当に買い物しよっか", zh: "那就随便逛逛买点东西吧" }
      ],
      points: [
        { ja: "着いたばかり", zh: "刚到", note: "「〜たばかり」= 刚刚做完…，强调时间很近。", wordId: "ohayou" },
        { ja: "とりあえず", zh: "总之；暂且", note: "口语高频副词，表示「先这样吧」。", wordId: "asobu" },
        { ja: "しよっか", zh: "做…吧（邀约）", note: "「しようか」的口语缩略，带轻松邀约的语气。", wordId: "asobu" }
      ],
      words: ["ohayou", "asobu"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/Where_shall_we_go%3F" }
      ]
    },
    {
      id: "gps",
      title: "GPS",
      romajiTitle: "GPS",
      artist: "桃音モモ",
      producer: "ナカノは4番（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "１番星に火がついた　３百円のライターで", zh: "第一颗星被点燃了，用三百日元的打火机" },
        { ja: "屋根まで飛ばして気がついた", zh: "飞到屋顶才发觉" },
        { ja: "今でも目に染みついた", zh: "至今仍烙印在眼里" }
      ],
      points: [
        { ja: "火がついた", zh: "点着了火", note: "火＋がつく（着火），自动词表达；名词＋が＋自动词是常见搭配。", wordId: "hoshi" },
        { ja: "気がついた", zh: "察觉到", note: "気がつく=注意到、发觉，日常高频惯用句。", wordId: "kokoro" },
        { ja: "染みついた", zh: "烙印下来", note: "染みつく=深深染上、挥之不去。", wordId: "natsukashii" }
      ],
      words: ["hoshi", "kokoro", "natsukashii"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/GPS" }
      ]
    },
    {
      id: "rat-hope",
      title: "ラットホープ",
      romajiTitle: "Rat Hope",
      artist: "GUMI",
      producer: "kemu（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "「殺してください」　誰にともなく願った愚かを　赦してください", zh: "请原谅我，原谅我向无人许下的「请杀了我」的愚蠢愿望" },
        { ja: "苦しみにも終わりがある？", zh: "痛苦也有尽头吗？" },
        { ja: "どうして泣いている", zh: "为什么在哭呢" }
      ],
      points: [
        { ja: "誰にともなく", zh: "不面向任何人", note: "「ともなく」表示漫无目的地、不是冲着谁。", wordId: "kokoro" },
        { ja: "赦してください", zh: "请原谅我", note: "赦す=宽恕；「〜てください」= 请（对方）做…。", wordId: "sabishii" },
        { ja: "どうして泣いている", zh: "为什么在哭", note: "どうして=为什么；泣く=哭。", wordId: "setsunai" }
      ],
      words: ["kokoro", "sabishii", "setsunai"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E3%83%A9%E3%83%83%E3%83%88%E3%83%9B%E3%83%BC%E3%83%97_(Rat_Hope)" }
      ]
    },
    {
      id: "uz",
      title: "Uz",
      romajiTitle: "Uz",
      artist: "IA",
      producer: "Orangestar（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "ユメニ　ユメノ　ユユカラ　ユレル　ユラレル　ユエニテ", zh: "梦中、梦的，摇摇晃晃、摇曳不止" },
        { ja: "マ　ソラシテ　トラシテ　ナラセテ　ラルル", zh: "ま，空着、取着、响着，らるる" },
        { ja: "ユメニマミテ　マルマテミテ", zh: "梦见着，圆圆地看着" }
      ],
      points: [
        { ja: "ユメ＝夢", zh: "梦（谐音字谜）", note: "歌词用假名音节拼出「夢（ゆめ）」的意象，是 Orangestar 式的文字游戏。", wordId: "yume" },
        { ja: "ソラ＝空", zh: "空（天空）", note: "ソラ（そら）嵌入无意义的音节流中，暗示天空。", wordId: "sora" },
        { ja: "ユレル　ユラレル", zh: "摇曳、被摇曳", note: "揺れる（摇曳）与其被动形的拟音变奏。", wordId: "kokoro" }
      ],
      words: ["yume", "sora", "kokoro"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/UZ" }
      ]
    },
    {
      id: "housenka",
      title: "鳳仙花",
      romajiTitle: "Housenka",
      artist: "歌愛ユキ",
      producer: "cillia（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "白んだ空が眩しく刺さった", zh: "泛白的天空刺眼地扎进来" },
        { ja: "届かない夢 黎明の音", zh: "传达不到的梦，黎明的声音" },
        { ja: "美しい散り様で果てて往くんだ", zh: "以美丽的散落之姿走向终结" }
      ],
      points: [
        { ja: "白んだ", zh: "泛白了", note: "白む（发白、泛白）的口语连音（〜んだ）。", wordId: "hana" },
        { ja: "刺さった", zh: "扎了进来", note: "刺さる（扎入）的过去式，形容光线强烈刺眼。", wordId: "kokoro" },
        { ja: "散り様", zh: "散落的样子", note: "散る＋様（样子），「以美丽的凋零收场」是物哀式的表达。", wordId: "setsunai" }
      ],
      words: ["hana", "kokoro", "setsunai"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E9%B3%B3%E4%BB%99%E8%8A%B1_(Housenka)/Wei%C3%9Fe_Schokolade" }
      ]
    },
    {
      id: "memento-mori",
      title: "メメントモリ",
      romajiTitle: "Memento Mori",
      artist: "ゲーム『メメントモリ』",
      project: "其他",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "幾千の星を 繋げてキミにあげる", zh: "把千万颗星星串起来送给你" },
        { ja: "触れた刹那の夢が オワレたとしても メメントモリ", zh: "即使触碰到的刹那之梦终将结束，memento mori" },
        { ja: "錆び付いた 鼓動が 願い叶える", zh: "生锈的心跳，让愿望实现" }
      ],
      points: [
        { ja: "せめてもの", zh: "至少；聊以慰藉的", note: "表示「虽然没有更好，但至少…」，带一点让步语气。", wordId: "yume" },
        { ja: "〜たとしても", zh: "即使…也", note: "「終わったとしても」= 即使结束了也…，假设让步句式。", wordId: "kiseki" },
        { ja: "メメントモリ", zh: "记住你终将死去（拉丁语）", note: "拉丁语 memento mori，提醒人珍惜当下，游戏名也取自这里。" }
      ],
      words: ["yume", "kiseki"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E3%83%A1%E3%83%B3%E3%83%88%E3%83%A2%E3%83%AA_(MementoMori)" }
      ]
    },
    {
      id: "amaryllis",
      title: "amaryllis",
      romajiTitle: "Amaryllis",
      artist: "初音ミク",
      producer: "Guiano（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "沈んで消えた 赤い水底", zh: "沉没消失的，赤红的水底" },
        { ja: "忘れてしまえ その重荷が僕さえも沈める", zh: "忘掉吧，那重担连我也要一起沉没" },
        { ja: "生きる意味を教えられたかな", zh: "说不定就能教会我活着的意义了吧" }
      ],
      points: [
        { ja: "〜てしまえ", zh: "干脆…掉", note: "「〜てしまう」的命令形，带「干脆放弃/忘掉」的语气。", wordId: "yume" },
        { ja: "重荷", zh: "重担", note: "重（おも）＋荷（に），沉重的负担。", wordId: "kokoro" },
        { ja: "生きる意味", zh: "活着的意义", note: "生きる＋意味，歌词里反复追问的主题。", wordId: "yume" }
      ],
      words: ["yume", "kokoro", "setsunai"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/Amaryllis/Guiano" }
      ]
    },
    {
      id: "stained-nocturne",
      title: "Stained Nocturne",
      romajiTitle: "Stained Nocturne",
      artist: "鏡音リン・初音ミク",
      producer: "Toa（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "奪われて 僕の色 この想いは戻らない", zh: "被夺走了，我的颜色，这份心意不会回来" },
        { ja: "染めあげてノクターン いつまでも踊って遊ぼう", zh: "染上吧夜曲，永远跳着舞玩耍吧" },
        { ja: "響かせてちょうだい 言葉も時間も", zh: "响起来吧，言语也好时间也好" }
      ],
      points: [
        { ja: "奪われて", zh: "被夺走", note: "奪う（夺走）的受身（〜われる），「被…夺走」。", wordId: "kokoro" },
        { ja: "ちょうだい", zh: "给我…（口语）", note: "「ください」的撒娇/亲密说法，常见于歌词。", wordId: "asobu" },
        { ja: "ノクターン", zh: "夜曲", note: "英语 nocturne 的片假名，指夜晚氛围的音乐。" }
      ],
      words: ["kokoro", "asobu"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E3%82%B9%E3%83%86%E3%83%B3%E3%83%89%E3%83%8E%E3%82%AF%E3%82%BF%E3%83%BC%E3%83%B3_(Stained_Nocturne)" }
      ]
    },
    {
      id: "kindan-no-kotowari",
      title: "禁断の理は絶望の吐息の中に",
      romajiTitle: "Kindan no Kotowari wa Zetsubou no Toiki no Naka ni",
      artist: "重音テト",
      producer: "いーえるP（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "粉々に千切れた魂に 悪魔はそっと腰掛ける", zh: "恶魔悄悄坐在粉碎的灵魂上" },
        { ja: "星はどんな時でも手を差し伸べ", zh: "星星无论何时都会伸出手" },
        { ja: "目醒めれば消える 偽善者の仮面 絶望の吐息", zh: "醒来就会消失的，伪善者的面具，绝望的叹息" }
      ],
      points: [
        { ja: "粉々に千切れた", zh: "粉碎地碎开", note: "粉々=粉碎（拟态词）；千切れる=撕碎、破碎。", wordId: "kokoro" },
        { ja: "手を差し伸べ", zh: "伸出援手", note: "差し伸べる=伸出；搭配「手を」表示帮助。", wordId: "hoshi" },
        { ja: "目醒めれば", zh: "一醒来就…", note: "目醒める=醒来；「〜れば」表条件。", wordId: "yume" }
      ],
      words: ["kokoro", "hoshi", "yume"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E7%A6%81%E6%96%AD%E3%81%AE%E7%90%86%E3%81%AF%E7%B5%B6%E6%9C%9B%E3%81%AE%E5%90%90%E6%81%AF%E3%81%AE%E4%B8%AD%E3%81%AB_(Kindan_no_Kotowari_wa_Zetsubou_no_Toiki_no_Naka_ni)" }
      ]
    },
    {
      id: "ur-style",
      title: "Ur-Style",
      romajiTitle: "Ur-Style",
      artist: "鏡音リン",
      producer: "DATEKEN（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "さぁ始めようか non-stop music", zh: "来吧，开始吧，不停歇的音乐" },
        { ja: "理屈抜きに直接心に響く オトとコトバ", zh: "不讲道理、直接震撼心灵的声音与话语" },
        { ja: "声が枯れる迄 歌い続けよう", zh: "直到声音嘶哑为止，继续唱下去吧" }
      ],
      points: [
        { ja: "理屈抜きに", zh: "抛开道理", note: "「〜抜きに」= 抛开…地、不讲…地。", wordId: "kokoro" },
        { ja: "響く", zh: "回响；震撼", note: "形容声音直达内心，与「聞く」同源词根。", wordId: "kiku" },
        { ja: "〜迄", zh: "直到…", note: "まで的汉字写法，歌词中常见。" }
      ],
      words: ["kokoro", "kiku"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/Ur-Style" }
      ]
    },
    {
      id: "mousou-aika",
      title: "妄想哀歌",
      romajiTitle: "Mousou Aika",
      artist: "初音ミク＆可不",
      producer: "MIMI（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "確かなことだけは今日がさ 少し寂しいことだけさ", zh: "唯一确定的是，今天有点寂寞" },
        { ja: "変わらない空にサヨナラ", zh: "向一成不变的天空说再见" },
        { ja: "止まらないから今だけは 夢の始まりを見せてよ", zh: "因为停不下来，至少现在让我看看梦的开始" }
      ],
      points: [
        { ja: "確かなことだけは", zh: "唯一确定的事", note: "確か=确实的；「だけは」强调「唯有…」。", wordId: "kokoro" },
        { ja: "サヨナラ", zh: "再见", note: "さようなら的口语缩略，歌词里很常见。", wordId: "sayounara" },
        { ja: "夢の始まり", zh: "梦的开始", note: "始まり=开端，与「終わり」相对。", wordId: "yume" }
      ],
      words: ["sayounara", "yume", "sora", "sabishii"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E5%A6%84%E6%83%B3%E5%93%80%E6%AD%8C_(Mousou_Aika)" }
      ]
    },
    {
      id: "alice-in-reitouko",
      title: "Alice in 冷凍庫",
      romajiTitle: "Alice in Reitouko",
      artist: "IA",
      producer: "Orangestar（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "それは時の果てる 劇場世界のプロローグ", zh: "那是时间尽头的、剧场世界的序章" },
        { ja: "彷徨う僕は何故か 君を探しているのだ", zh: "彷徨的我不知为何，正在寻找你" },
        { ja: "あぁ 僕は何故 僕をどこまで連れてくの", zh: "啊，我为何，要把我带向何方" }
      ],
      points: [
        { ja: "時の果てる", zh: "时间终结", note: "果てる=终结、到头；「時の果て」是常见意象。", wordId: "kiseki" },
        { ja: "彷徨う", zh: "彷徨；徘徊", note: "与「さまよう」同义，形容找不到方向。", wordId: "iku" },
        { ja: "何故か", zh: "不知为何", note: "何故（为什么）＋か（不确定），「说不清为什么」。", wordId: "kokoro" }
      ],
      words: ["iku", "kokoro", "kiseki"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/Alice_in_%E5%86%B7%E5%87%8D%E5%BA%AB_(Alice_in_Reitouko)" }
      ]
    },
    {
      id: "damnation",
      title: "Damnation",
      romajiTitle: "Damnation",
      artist: "初音ミク",
      producer: "Mwk（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "道のりさえも 解らないまま 終わってゆく", zh: "连路途都不明白，就这样走向终结" },
        { ja: "夢の中", zh: "在梦中" },
        { ja: "蛇を殺した この手が 僕を壊した", zh: "杀死了蛇的这只手，毁掉了我" }
      ],
      points: [
        { ja: "〜さえも", zh: "连…都", note: "「さえ」加强语气，表示「连…也不（能）」。", wordId: "yume" },
        { ja: "解らないまま", zh: "不明白地（保持原状）", note: "まま=维持现状；「不明白地走下去」。", wordId: "kokoro" },
        { ja: "壊した", zh: "毁掉了", note: "壊す（破坏，他动词）的过去式，与壊れる相对。", wordId: "kokoro" }
      ],
      words: ["yume", "kokoro"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/Damnation" }
      ]
    },
    {
      id: "cat-loving",
      title: "キャットラビング",
      romajiTitle: "Cat Loving",
      artist: "神楽七奈",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "痛いことは嫌いですが 君の手の平は嫌いじゃない", zh: "虽然讨厌痛的事情，却不讨厌你的手心" },
        { ja: "言葉は飴玉みたいに 甘く広がってココロ満たす", zh: "言语像糖果一样，甜甜地扩散、填满心房" },
        { ja: "嗚呼全然分かってない", zh: "啊啊，你完全不明白" }
      ],
      points: [
        { ja: "手の平", zh: "手心；手掌", note: "平（ひら）=掌面，与「手のひら」同义。", wordId: "kokoro" },
        { ja: "飴玉みたいに", zh: "像糖果一样", note: "飴玉=硬糖；「みたいに」= 像…一样（比喻）。飴（あめ）与雨（あめ）同音，可一起记。", wordId: "ame" },
        { ja: "嫌いじゃない", zh: "并不讨厌", note: "嫌い＋じゃない（不是）的双重否定，表达含蓄的好感。", wordId: "sabishii" }
      ],
      words: ["kokoro", "ame"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E3%82%AD%E3%83%A3%E3%83%83%E3%83%88%E3%83%A9%E3%83%93%E3%83%B3%E3%82%B0_(Cat_Loving)" }
      ]
    },
    {
      id: "darling-dance",
      title: "Darling Dance",
      romajiTitle: "Darling Dance",
      artist: "初音ミク",
      producer: "かいりきベア（作詞・作曲）",
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "存在証明 愛だって愛だって吐いたって", zh: "存在证明，就算把爱说了一遍又一遍" },
        { ja: "寂しい寂しいナンセンスDAY", zh: "寂寞、寂寞的无意义的一天" },
        { ja: "愛だ 恋だ 何だってんだ", zh: "爱啊、恋啊，到底算什么啊" }
      ],
      points: [
        { ja: "〜だって〜だって", zh: "就算…就算…", note: "「だって」重复使用，表示列举并加强「即使如此」的语气。", wordId: "sabishii" },
        { ja: "何だってんだ", zh: "到底算什么", note: "「何だと言うんだ」的口语缩略，情绪化的反问。", wordId: "yabai" },
        { ja: "ナンセンス", zh: "无意义（nonsense）", note: "英语外来语，形容荒唐、没有道理。", wordId: "sabishii" }
      ],
      words: ["sabishii", "yabai"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/%E3%83%80%E3%83%BC%E3%83%AA%E3%83%B3%E3%83%80%E3%83%B3%E3%82%B9_(Darling_Dance)" }
      ]
    }
  ];

  for (const s of songs) NihonlData.songs.push(s);
})();
