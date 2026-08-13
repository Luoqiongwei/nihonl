/* ============================================================
 * NIHONL 数据文件
 * ------------------------------------------------------------
 * 词汇字段说明：
 *   id       唯一标识（英文/拼音，勿重复）
 *   kana     假名（背单词卡片主显示）
 *   kanji    汉字写法（可省略）
 *   romaji   罗马音
 *   meaning  中文释义
 *   pos      词性（名/动/形/叹…）
 *   category 分类 id（见 categories）
 *   level    日语等级（N5/N4…）
 *   example  例句 { ja, zh }
 *   culture  关联文化词条 id 数组（见 culture）
 *   mnemonic 中文联想记忆（可关联动漫/文化）
 *
 * 新增词汇：直接在 words 数组末尾追加对象即可。
 *
 * 歌曲字段说明（songs 数组）：
 *   id / title / romajiTitle / artist / producer / year / project
 *   summary   { ja, zh } 歌曲简介
 *   excerpt   歌词节选 [{ ja, zh }]（版权考虑：只摘录数句）
 *   points    学习点 [{ ja, zh, note, wordId? }]
 *   words     关联词汇 id 数组
 *   sources   来源链接 [{ label, url }]
 *   lyricsStatus "complete" | "missing"（固定查证流程走完仍未找到则 missing）
 * ============================================================ */

window.NihonlData = {
  categories: [
    { id: "greeting", label: "问候" },
    { id: "people", label: "人物" },
    { id: "daily", label: "日常" },
    { id: "anime", label: "二次元" },
    { id: "food", label: "美食" },
    { id: "nature", label: "自然" },
    { id: "feeling", label: "心情" },
    { id: "action", label: "动作" },
    { id: "adj", label: "形容" },
    { id: "time", label: "时间数字" },
    { id: "aesthetics", label: "美学" }
  ],

  words: [
    // ---------- 问候 ----------
    { id: "konnichiwa", kana: "こんにちは", romaji: "konnichiwa", meaning: "你好（白天问候）", pos: "寒暄语", category: "greeting", level: "N5",
      example: { ja: "こんにちは、元気ですか？", zh: "你好，你好吗？" },
      culture: [], mnemonic: "动漫里角色见面第一句，读音像「今日は」。午间相遇时自然脱口而出。" },
    { id: "ohayou", kana: "おはよう", romaji: "ohayou", meaning: "早上好", pos: "寒暄语", category: "greeting", level: "N5",
      example: { ja: "おはようございます！", zh: "早上好！（敬语）" },
      culture: [], mnemonic: "「哦哈哟」——早起番剧开场白，配上伸懒腰的画面记得更牢。" },
    { id: "arigatou", kana: "ありがとう", romaji: "arigatou", meaning: "谢谢", pos: "寒暄语", category: "greeting", level: "N5",
      example: { ja: "手伝ってくれてありがとう。", zh: "谢谢你帮我。" },
      culture: ["moe"], mnemonic: "全世界都会的「阿里嘎多」。记住角色说谢谢时微微鞠躬的样子。" },
    { id: "sumimasen", kana: "すみません", romaji: "sumimasen", meaning: "对不起 / 劳驾 / 不好意思", pos: "寒暄语", category: "greeting", level: "N5",
      example: { ja: "すみません、道を教えてください。", zh: "不好意思，请告诉我路怎么走。" },
      culture: [], mnemonic: "「斯密马赛」是万能口头禅：道歉、借过、点单、麻烦别人都能用。" },
    { id: "sayounara", kana: "さようなら", romaji: "sayounara", meaning: "再见（长别离）", pos: "寒暄语", category: "greeting", level: "N5",
      example: { ja: "さようなら、またいつか。", zh: "再见了，后会有期。" },
      culture: ["mono-no-aware"], mnemonic: "毕业番的告别场景专用，带着一丝物哀的「撒哟娜拉」。" },

    // ---------- 人物 ----------
    { id: "sensei", kana: "せんせい", kanji: "先生", romaji: "sensei", meaning: "老师；某领域的先生", pos: "名词", category: "people", level: "N5",
      example: { ja: "先生、質問があります。", zh: "老师，我有一个问题。" },
      culture: [], mnemonic: "校园番里学生喊「せんせい！」。中文「先生」的古义也是老师，同源更好记。" },
    { id: "tomodachi", kana: "ともだち", kanji: "友達", romaji: "tomodachi", meaning: "朋友", pos: "名词", category: "people", level: "N5",
      example: { ja: "ともだちと遊ぶのが好きです。", zh: "我喜欢和朋友一起玩。" },
      culture: ["moe"], mnemonic: "「友達」=朋友，读音 tomodachi。想想动画里并肩作战的伙伴们。" },
    { id: "gakkou", kana: "がっこう", kanji: "学校", romaji: "gakkou", meaning: "学校", pos: "名词", category: "daily", level: "N5",
      example: { ja: "毎日学校に行きます。", zh: "我每天去学校。" },
      culture: [], mnemonic: "汉字「学校」中日同形，读 gakkou。校园番主场。" },
    { id: "okaasan", kana: "おかあさん", kanji: "お母さん", romaji: "okaasan", meaning: "妈妈", pos: "名词", category: "people", level: "N5",
      example: { ja: "お母さん、ただいま！", zh: "妈妈，我回来了！" },
      culture: [], mnemonic: "「哦卡桑」——日剧里喊妈妈的经典声调，回家第一句「ただいま」。" },
    { id: "otousan", kana: "おとうさん", kanji: "お父さん", romaji: "otousan", meaning: "爸爸", pos: "名词", category: "people", level: "N5",
      example: { ja: "お父さんは会社員です。", zh: "爸爸是公司职员。" },
      culture: [], mnemonic: "「哦多桑」与「哦卡桑」成对记忆，父母一起记。" },

    // ---------- 二次元 ----------
    { id: "kawaii", kana: "かわいい", kanji: "可愛い", romaji: "kawaii", meaning: "可爱的", pos: "形容动词", category: "anime", level: "N5",
      example: { ja: "この猫、すごくかわいい！", zh: "这只猫超可爱！" },
      culture: ["kawaii", "moe"], mnemonic: "全球通用的「卡哇伊」。看到萌物脱口而出就对了。" },
    { id: "moe", kana: "萌え", romaji: "moe", meaning: "萌；对角色/事物的强烈喜爱", pos: "名词", category: "anime", level: "N5",
      example: { ja: "このキャラに萌えた。", zh: "我被这个角色萌到了。" },
      culture: ["moe"], mnemonic: "中文「萌」就来自日语的「萌え」。御宅文化的核心词，心动即萌。" },
    { id: "oshi", kana: "推し", romaji: "oshi", meaning: "本命；最喜欢的人/角色", pos: "名词", category: "anime", level: "N5",
      example: { ja: "推しのライブに行きたい！", zh: "好想去看我推的演唱会！" },
      culture: ["oshi"], mnemonic: "偶像与角色应援文化：说「我推」就像说「我的本命」，推し活=应援生活。" },
    { id: "yabai", kana: "やばい", romaji: "yabai", meaning: "糟糕；超厉害（语境万能）", pos: "形容词", category: "anime", level: "N5",
      example: { ja: "やばい、遅刻する！／この曲やばくない？", zh: "糟了，要迟到了！／这歌也太好听了吧？" },
      culture: ["wakamono"], mnemonic: "新生代万能词，坏事好事都能说「やばい」，语气和表情决定褒贬。" },
    { id: "sugoi", kana: "すごい", romaji: "sugoi", meaning: "厉害；了不起", pos: "形容词", category: "anime", level: "N5",
      example: { ja: "すごい！よくできたね。", zh: "好厉害！做得真好。" },
      culture: ["wakamono"], mnemonic: "「斯国一」——看番看到精彩打斗时的条件反射感叹。" },
    { id: "kakkoii", kana: "かっこいい", romaji: "kakkoii", meaning: "帅气的", pos: "形容词", category: "anime", level: "N5",
      example: { ja: "彼は本当にかっこいい。", zh: "他真的好帅。" },
      culture: ["wakamono"], mnemonic: "对帅气角色喊「卡阔以」，偶像登场专用感叹。" },

    // ---------- 美食 ----------
    { id: "sushi", kana: "すし", kanji: "寿司", romaji: "sushi", meaning: "寿司", pos: "名词", category: "food", level: "N5",
      example: { ja: "寿司が一番好きです。", zh: "我最喜欢寿司。" },
      culture: [], mnemonic: "汉字「寿司」直接借自中文，读音是 sush(i)，看到日料店招牌就会了。" },
    { id: "ramen", kana: "ラーメン", romaji: "raamen", meaning: "拉面", pos: "名词", category: "food", level: "N5",
      example: { ja: "夜にラーメンを食べます。", zh: "晚上吃拉面。" },
      culture: [], mnemonic: "深夜食堂里热气腾腾的一碗拉面，片假名ラーメン=拉面。" },
    { id: "takoyaki", kana: "たこやき", kanji: "たこ焼き", romaji: "takoyaki", meaning: "章鱼烧", pos: "名词", category: "food", level: "N5",
      example: { ja: "祭りでたこ焼きを買いました。", zh: "在祭典上买了章鱼烧。" },
      culture: ["matsuri"], mnemonic: "たこ=章鱼 + 焼き=烤。夏日祭摊位上的圆滚滚小丸子。" },
    { id: "onigiri", kana: "おにぎり", romaji: "onigiri", meaning: "饭团", pos: "名词", category: "food", level: "N5",
      example: { ja: "お弁当におにぎりを入れます。", zh: "便当里放饭团。" },
      culture: [], mnemonic: "お+握り（nigiri），用手握出来的三角饭团，野餐便当常客。" },

    // ---------- 自然 ----------
    { id: "sora", kana: "そら", kanji: "空", romaji: "sora", meaning: "天空", pos: "名词", category: "nature", level: "N5",
      example: { ja: "空がとても青いです。", zh: "天空非常蓝。" },
      culture: ["yugen"], mnemonic: "新海诚画风里大片大片的「そら」，抬头就是风景。" },
    { id: "umi", kana: "うみ", kanji: "海", romaji: "umi", meaning: "海", pos: "名词", category: "nature", level: "N5",
      example: { ja: "夏休みに海へ行きます。", zh: "暑假去海边。" },
      culture: ["matsuri"], mnemonic: "夏日祭、海边、花火大会——日系青春三件套里的「うみ」。" },
    { id: "hana", kana: "はな", kanji: "花", romaji: "hana", meaning: "花", pos: "名词", category: "nature", level: "N5",
      example: { ja: "春に花見をします。", zh: "春天去赏花。" },
      culture: ["matsuri"], mnemonic: "花見（赏樱）是春天的仪式，「はな」就是满开的樱花。" },
    { id: "tsuki", kana: "つき", kanji: "月", romaji: "tsuki", meaning: "月亮", pos: "名词", category: "nature", level: "N5",
      example: { ja: "今夜は月がきれいです。", zh: "今晚的月亮真美。" },
      culture: ["yugen", "mono-no-aware"], mnemonic: "「今夜は月がきれいですね」——夏目漱石的含蓄告白，月亮自带物哀。" },
    { id: "yuki", kana: "ゆき", kanji: "雪", romaji: "yuki", meaning: "雪", pos: "名词", category: "nature", level: "N5",
      example: { ja: "冬は雪が降ります。", zh: "冬天下雪。" },
      culture: [], mnemonic: "《冰雪奇缘》日版叫《アナと雪の女王》，雪=ゆき。" },
    { id: "ame", kana: "あめ", kanji: "雨", romaji: "ame", meaning: "雨", pos: "名词", category: "nature", level: "N5",
      example: { ja: "雨の日は本を読みます。", zh: "下雨天读书。" },
      culture: ["mono-no-aware"], mnemonic: "雨是日剧动漫的经典场景道具，雨声一响，物哀氛围就来了。" },
    { id: "kaze", kana: "かぜ", kanji: "風", romaji: "kaze", meaning: "风", pos: "名词", category: "nature", level: "N5",
      example: { ja: "風が強いです。", zh: "风很大。" },
      culture: ["mono-no-aware"], mnemonic: "宫崎骏《起风了》日文名《風立ちぬ》，风起时故事开始。" },
    { id: "hoshi", kana: "ほし", kanji: "星", romaji: "hoshi", meaning: "星星", pos: "名词", category: "nature", level: "N5",
      example: { ja: "夜空に星がきらきら光る。", zh: "夜空中星星闪闪发光。" },
      culture: ["yugen"], mnemonic: "「星」=hoshi，流星划过夜空时喊出愿望。" },

    // ---------- 心情 / 美学 ----------
    { id: "kokoro", kana: "こころ", kanji: "心", romaji: "kokoro", meaning: "心；内心", pos: "名词", category: "feeling", level: "N5",
      example: { ja: "心が温かくなりました。", zh: "心里变得暖暖的。" },
      culture: ["mono-no-aware"], mnemonic: "物哀就是「物の哀れを感じる心」——能感知万物之美的这颗心。" },
    { id: "yume", kana: "ゆめ", kanji: "夢", romaji: "yume", meaning: "梦想；梦", pos: "名词", category: "feeling", level: "N5",
      example: { ja: "夢を追いかける！", zh: "追逐梦想！" },
      culture: ["moe"], mnemonic: "动漫主题曲高频词「夢を追いかけて（追逐梦想）」，热血番标配。" },
    { id: "kiseki", kana: "きせき", kanji: "奇跡", romaji: "kiseki", meaning: "奇迹", pos: "名词", category: "feeling", level: "N5",
      example: { ja: "奇跡は起きる！", zh: "奇迹会发生！" },
      culture: ["moe"], mnemonic: "王道剧情高潮必出「奇跡」，绝望之后的翻盘时刻。" },
    { id: "natsukashii", kana: "なつかしい", romaji: "natsukashii", meaning: "令人怀念的", pos: "形容词", category: "feeling", level: "N5",
      example: { ja: "この曲を聞くと、なつかしい気持ちになる。", zh: "一听到这首歌就觉得很怀念。" },
      culture: ["mono-no-aware"], mnemonic: "看到童年动画重制时说「なつかしい」，怀旧本身就是一种美学。" },
    { id: "sabishii", kana: "さびしい", romaji: "sabishii", meaning: "寂寞的；冷清的", pos: "形容词", category: "feeling", level: "N5",
      example: { ja: "一人でいるとさびしい。", zh: "一个人的时候很寂寞。" },
      culture: ["mono-no-aware", "wabi-sabi"], mnemonic: "雨夜独处、番剧离别时的「撒比西」，物哀式孤独感。" },
    { id: "setsunai", kana: "せつない", romaji: "setsunai", meaning: "揪心的；难过的", pos: "形容词", category: "feeling", level: "N5",
      example: { ja: "この恋はせつない。", zh: "这段恋情让人揪心。" },
      culture: ["mono-no-aware"], mnemonic: "青春恋爱番的虐心情节：胸口发紧、说不出口的「せつない」。" },
    { id: "wabisabi", kana: "わびさび", kanji: "侘寂", romaji: "wabisabi", meaning: "侘寂（简素、不完美之美）", pos: "名词", category: "aesthetics", level: "N5",
      example: { ja: "侘び寂びの世界が好きです。", zh: "我喜欢侘寂的世界。" },
      culture: ["wabi-sabi"], mnemonic: "侘寂就是わびさび：旧茶碗、枯山水、缺了一角的器物——不完美即美。" },
    { id: "utsukushii", kana: "うつくしい", kanji: "美しい", romaji: "utsukushii", meaning: "美丽的", pos: "形容词", category: "aesthetics", level: "N5",
      example: { ja: "美しい景色ですね。", zh: "好美的景色啊。" },
      culture: ["yugen"], mnemonic: "「乌茨哭西」——正式又抒情的「美丽」，配黄昏与落樱使用。" },

    // ---------- 动作 ----------
    { id: "taberu", kana: "たべる", kanji: "食べる", romaji: "taberu", meaning: "吃", pos: "动词", category: "action", level: "N5",
      example: { ja: "朝ごはんを食べます。", zh: "吃早饭。" },
      culture: [], mnemonic: "「塔贝鲁」。开饭前记得说「いただきます（我开动了）」再吃。" },
    { id: "nomu", kana: "のむ", kanji: "飲む", romaji: "nomu", meaning: "喝", pos: "动词", category: "action", level: "N5",
      example: { ja: "水を飲みます。", zh: "喝水。" },
      culture: [], mnemonic: "「诺姆」，咕咚咕咚喝水的声音。" },
    { id: "miru", kana: "みる", kanji: "見る", romaji: "miru", meaning: "看", pos: "动词", category: "action", level: "N5",
      example: { ja: "アニメを見るのが好きです。", zh: "我喜欢看动漫。" },
      culture: ["moe"], mnemonic: "「米鲁」=看，看番就说「アニメを見る」。" },
    { id: "kiku", kana: "きく", kanji: "聞く", romaji: "kiku", meaning: "听；问", pos: "动词", category: "action", level: "N5",
      example: { ja: "音楽を聞きます。", zh: "听音乐。" },
      culture: [], mnemonic: "「奇哭」？不，是「きく」——耳朵在听（聞く）也在问（聞く）。" },
    { id: "iku", kana: "いく", kanji: "行く", romaji: "iku", meaning: "去", pos: "动词", category: "action", level: "N5",
      example: { ja: "学校へ行きます。", zh: "去学校。" },
      culture: [], mnemonic: "「以哭」→ 背上书包去（行く）上学。" },
    { id: "hanasu", kana: "はなす", kanji: "話す", romaji: "hanasu", meaning: "说；谈", pos: "动词", category: "action", level: "N5",
      example: { ja: "日本語で話しましょう。", zh: "用日语说吧。" },
      culture: [], mnemonic: "「哈那斯」→ 话（はなし）说出口，和朋友聊天。" },
    { id: "asobu", kana: "あそぶ", kanji: "遊ぶ", romaji: "asobu", meaning: "玩；游玩", pos: "动词", category: "action", level: "N5",
      example: { ja: "公園で遊びます。", zh: "在公园玩。" },
      culture: [], mnemonic: "「阿搜布」→ 玩耍嬉闹的声音，放学后的公园。" },
    { id: "nemuru", kana: "ねむる", kanji: "眠る", romaji: "nemuru", meaning: "睡觉", pos: "动词", category: "action", level: "N5",
      example: { ja: "早く眠りましょう。", zh: "早点睡吧。" },
      culture: [], mnemonic: "困到不行时说的「捏姆鲁」，和枕头一起记。" },

    // ---------- 形容 ----------
    { id: "ookii", kana: "おおきい", kanji: "大きい", romaji: "ookii", meaning: "大的", pos: "形容词", category: "adj", level: "N5",
      example: { ja: "大きい木の下で休みます。", zh: "在大树下休息。" },
      culture: [], mnemonic: "「哦哦——ki」：张大嘴感叹「好大」，音形义全对上。" },
    { id: "chiisai", kana: "ちいさい", kanji: "小さい", romaji: "chiisai", meaning: "小的", pos: "形容词", category: "adj", level: "N5",
      example: { ja: "小さい犬がかわいい。", zh: "小狗很可爱。" },
      culture: ["kawaii"], mnemonic: "和「おおきい」成对：小的东西才可爱（かわいい）。" },
    { id: "atarashii", kana: "あたらしい", kanji: "新しい", romaji: "atarashii", meaning: "新的", pos: "形容词", category: "adj", level: "N5",
      example: { ja: "新しい服を買いました。", zh: "买了新衣服。" },
      culture: [], mnemonic: "「啊，他拉稀」？换个画面：拆新游戏包装时「あたらしい！」。" },
    { id: "tanoshii", kana: "たのしい", kanji: "楽しい", romaji: "tanoshii", meaning: "快乐的；有趣的", pos: "形容词", category: "adj", level: "N5",
      example: { ja: "旅行は楽しいです。", zh: "旅行很快乐。" },
      culture: ["moe"], mnemonic: "「他诺西」——和朋友一起玩时的快乐，快乐=楽しい。" },
    { id: "shizuka", kana: "しずか", kanji: "静か", romaji: "shizuka", meaning: "安静的", pos: "形容动词", category: "adj", level: "N5",
      example: { ja: "静かな部屋で勉強します。", zh: "在安静的房间里学习。" },
      culture: ["ma", "wabi-sabi"], mnemonic: "静谧=安静。日式美学里「静」是留白（間）的前提。" },

    // ---------- 时间数字 ----------
    { id: "kyou", kana: "きょう", kanji: "今日", romaji: "kyou", meaning: "今天", pos: "名词", category: "time", level: "N5",
      example: { ja: "今日はいい天気です。", zh: "今天天气很好。" },
      culture: [], mnemonic: "「今日」=今天，汉字同形，读 kyou。" },
    { id: "ashita", kana: "あした", kanji: "明日", romaji: "ashita", meaning: "明天", pos: "名词", category: "time", level: "N5",
      example: { ja: "また明日ね！", zh: "明天见！" },
      culture: [], mnemonic: "放学道别专用「また明日（明天见）」，あした=明天。" },
    { id: "kinou", kana: "きのう", kanji: "昨日", romaji: "kinou", meaning: "昨天", pos: "名词", category: "time", level: "N5",
      example: { ja: "昨日は忙しかった。", zh: "昨天很忙。" },
      culture: [], mnemonic: "きょう（今天）、きのう（昨天）、あした（明天），三兄弟一起背。" },
    { id: "ichi-ni-san", kana: "いち・に・さん", kanji: "一・二・三", romaji: "ichi・ni・san", meaning: "一、二、三", pos: "数词", category: "time", level: "N5",
      example: { ja: "一、二、三、始め！", zh: "一、二、三，开始！" },
      culture: [], mnemonic: "ichi/ni/san 与中文「一、二、三」同源，比赛开场倒数常用。" }
  ],

  culture: [
    { id: "moe", ja: "萌え", zh: "萌文化", tagline: "对角色与事物产生强烈喜爱的二次元核心情感", kind: "二次元",
      summary: "「萌え」指对动漫角色、偶像或某类特质产生的强烈喜爱与心动，是御宅文化的核心词。中文的「萌」正是借自这个词。萌点可以是外貌、性格、口头禅，也可以是一种「想要守护」的心情。",
      extra: "延伸：新番讨论、弹幕里的「这波我直接萌死」「XX酱太萌了」，都是萌文化的日常表达。",
      quote: "萌えは、心が動くこと。",
      words: ["moe", "kawaii", "tomodachi", "miru", "yume", "kiseki", "arigatou", "tanoshii"] },
    { id: "oshi", ja: "推し", zh: "推 / 本命", tagline: "偶像文化与应援：我推的，就是最好的", kind: "二次元",
      summary: "「推し」指自己最喜欢、愿意全力应援的人或角色。由此衍生的「推し活」指围绕本命展开的活动：买谷子（周边）、打榜、圣地巡礼、看演唱会。近年「推し」还入选过日本流行语大赏。",
      extra: "延伸：推しが尊い（我推太神圣了）、推し変（换本命）、推し活。",
      quote: "推しがいるから、今日も頑張れる。",
      words: ["oshi"] },
    { id: "kawaii", ja: "かわいい", zh: "卡哇伊文化", tagline: "从「可爱」到一种审美与生活态度", kind: "二次元 × 美学",
      summary: "「かわいい」最初只是「可爱」，后来发展成涵盖少女心、萌系设计、吉祥物、角色经济的日本现代文化符号，甚至成为日本软实力的代表之一。Hello Kitty、卡比兽、各种吉祥物都是「かわいい」的化身。",
      extra: "延伸：日本街头随处可见的吉祥物（ゆるキャラ）、痛包、可爱系穿搭。",
      quote: "かわいいは正義。",
      words: ["kawaii", "chiisai"] },
    { id: "wakamono", ja: "若者言葉", zh: "新生代用语", tagline: "やばい、エモい、尊い——年轻一代的情绪词", kind: "二次元 × 语言",
      summary: "若者言葉（年轻人用语）是流行语的风向标：やばい从「糟糕」扩展成「太厉害了」，エモい（emoi）形容「情绪上头、好有感觉」，尊い（とうとい）用来表达「我推美好得让人膜拜」。这些词常出现在动漫台词、弹幕和社交媒体里。",
      extra: "延伸：学习这些词能让你听懂新生代日本人在聊什么。",
      quote: "やばい、エモい、尊い。",
      words: ["yabai", "sugoi", "kakkoii", "oshii"] },
    { id: "mono-no-aware", ja: "物の哀れ", zh: "物哀", tagline: "对稍纵即逝之美的感伤与珍惜", kind: "日本美学",
      summary: "「物哀」由江户时代国学家本居宣长提炼，指看到樱花凋零、夏夜萤火、秋日落叶时，心中涌起的「美易逝」的感伤。它不是消极，而是因为懂得短暂，所以更加珍惜当下。",
      extra: "延伸：日剧动漫里常见的毕业、告别、夏日结束，都是物哀的现代变奏。",
      quote: "美しいからこそ、切ない。",
      words: ["sayounara", "natsukashii", "sabishii", "setsunai", "ame", "kaze", "tsuki", "kokoro"] },
    { id: "wabi-sabi", ja: "侘び寂び", zh: "侘寂", tagline: "简素、不完美、岁月痕迹之美", kind: "日本美学",
      summary: "侘寂是日本美学的重要概念：侘（わび）指向简朴、安静、不张扬，寂（さび）指向时间留下的痕迹与孤寂感。裂痕的茶碗、褪色的木门、枯山水——接受不完美与无常，正是侘寂的哲学。",
      extra: "延伸：现代设计里的「极简」「原木风」，很多都能追溯到侘寂。",
      quote: "完璧より、不完全。",
      words: ["wabisabi", "sabishii", "shizuka"] },
    { id: "yugen", ja: "幽玄", zh: "幽玄", tagline: "含蓄深远、言有尽而意无穷", kind: "日本美学",
      summary: "幽玄源于能乐与和歌理论，指美不在直白表露，而在含蓄的余韵：黄昏的山影、月下微光、话说到一半的沉默。它讲究「不说的部分比说出的更有力量」。",
      extra: "延伸：新海诚电影里的黄昏与光影、留白式结尾，都带着幽玄的味道。",
      quote: "見えないものこそ、美しい。",
      words: ["sora", "tsuki", "hoshi", "utsukushii"] },
    { id: "ma", ja: "間", zh: "間（间）", tagline: "留白与停顿：空白本身也是节奏", kind: "日本美学",
      summary: "「間」是日本文化里极重要的概念，指时间或空间上的留白：相声里的停顿、和室里的空、茶道中的沉默、画面构图的空白。它让节奏有了呼吸，也让「静」变得有意义。",
      extra: "延伸：观察日式排版、电影运镜和建筑，到处都有「間」的存在。",
      quote: "余白こそ、美の一部。",
      words: ["shizuka"] },
    { id: "matsuri", ja: "祭り", zh: "祭典 / 夏日祭", tagline: "花火、浴衣、章鱼烧——日式夏天的全部想象", kind: "文化场景",
      summary: "祭り是日本传统节庆活动，最有代表性的夏日祭有花火大会、捞金鱼、章鱼烧摊位、浴衣和盂兰盆舞。动漫里的夏日祭是告白与青春的经典舞台，几乎每部青春番都有一个「祭り回」。",
      extra: "延伸：七夕祭、祇園祭、花火大会，各地祭典都有自己的特色。",
      quote: "夏祭り、青春の一ページ。",
      words: ["takoyaki", "umi", "hana"] }
  ],

  kana: {
    hiragana: {
      seion: [
        ["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"],
        ["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"],
        ["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"],
        ["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"],
        ["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"],
        ["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"],
        ["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"],
        ["や","ya"],["ゆ","yu"],["よ","yo"],
        ["ら","ra"],["り","ri"],["る","ru"],["れ","re"],["ろ","ro"],
        ["わ","wa"],["を","wo"],
        ["ん","n"]
      ],
      dakuon: [
        ["が","ga"],["ぎ","gi"],["ぐ","gu"],["げ","ge"],["ご","go"],
        ["ざ","za"],["じ","ji"],["ず","zu"],["ぜ","ze"],["ぞ","zo"],
        ["だ","da"],["ぢ","ji"],["づ","zu"],["で","de"],["ど","do"],
        ["ば","ba"],["び","bi"],["ぶ","bu"],["べ","be"],["ぼ","bo"]
      ],
      handakuon: [["ぱ","pa"],["ぴ","pi"],["ぷ","pu"],["ぺ","pe"],["ぽ","po"]],
      youon: [
        ["きゃ","kya"],["きゅ","kyu"],["きょ","kyo"],
        ["しゃ","sha"],["しゅ","shu"],["しょ","sho"],
        ["ちゃ","cha"],["ちゅ","chu"],["ちょ","cho"],
        ["にゃ","nya"],["にゅ","nyu"],["にょ","nyo"],
        ["ひゃ","hya"],["ひゅ","hyu"],["ひょ","hyo"],
        ["みゃ","mya"],["みゅ","myu"],["みょ","myo"],
        ["りゃ","rya"],["りゅ","ryu"],["りょ","ryo"],
        ["ぎゃ","gya"],["ぎゅ","gyu"],["ぎょ","gyo"],
        ["じゃ","ja"],["じゅ","ju"],["じょ","jo"],
        ["びゃ","bya"],["びゅ","byu"],["びょ","byo"],
        ["ぴゃ","pya"],["ぴゅ","pyu"],["ぴょ","pyo"]
      ]
    },
    katakana: {
      seion: [
        ["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"],
        ["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"],
        ["サ","sa"],["シ","shi"],["ス","su"],["セ","se"],["ソ","so"],
        ["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"],
        ["ナ","na"],["ニ","ni"],["ヌ","nu"],["ネ","ne"],["ノ","no"],
        ["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ホ","ho"],
        ["マ","ma"],["ミ","mi"],["ム","mu"],["メ","me"],["モ","mo"],
        ["ヤ","ya"],["ユ","yu"],["ヨ","yo"],
        ["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"],
        ["ワ","wa"],["ヲ","wo"],
        ["ン","n"]
      ],
      dakuon: [
        ["ガ","ga"],["ギ","gi"],["グ","gu"],["ゲ","ge"],["ゴ","go"],
        ["ザ","za"],["ジ","ji"],["ズ","zu"],["ゼ","ze"],["ゾ","zo"],
        ["ダ","da"],["ヂ","ji"],["ヅ","zu"],["デ","de"],["ド","do"],
        ["バ","ba"],["ビ","bi"],["ブ","bu"],["ベ","be"],["ボ","bo"]
      ],
      handakuon: [["パ","pa"],["ピ","pi"],["プ","pu"],["ペ","pe"],["ポ","po"]],
      youon: [
        ["キャ","kya"],["キュ","kyu"],["キョ","kyo"],
        ["シャ","sha"],["シュ","shu"],["ショ","sho"],
        ["チャ","cha"],["チュ","chu"],["チョ","cho"],
        ["ニャ","nya"],["ニュ","nyu"],["ニョ","nyo"],
        ["ヒャ","hya"],["ヒュ","hyu"],["ヒョ","hyo"],
        ["ミャ","mya"],["ミュ","myu"],["ミョ","myo"],
        ["リャ","rya"],["リュ","ryu"],["リョ","ryo"],
        ["ギャ","gya"],["ギュ","gyu"],["ギョ","gyo"],
        ["ジャ","ja"],["ジュ","ju"],["ジョ","jo"],
        ["ビャ","bya"],["ビュ","byu"],["ビョ","byo"],
        ["ピャ","pya"],["ピュ","pyu"],["ピョ","pyo"]
      ]
    }
  },

  songs: [
    {
      id: "soko-ni-aru-hikari",
      title: "そこに在る、光。",
      romajiTitle: "Soko ni Aru, Hikari.",
      artist: "25時、ナイトコードで。",
      producer: "DECO*27（作詞・作曲）",
      year: 2025,
      project: "Project SEKAI",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "光って 光って 眠らない25時", zh: "闪耀吧、闪耀吧，不眠的 25 点" },
        { ja: "消えたいと叫んだら「叶えたい」に気付いたよ", zh: "当喊出「好想消失」时，才发觉其实是「好想实现」" },
        { ja: "最低だって言われてもきっと出会えるから", zh: "就算被说「最差劲了」，也一定还能与你相遇" }
      ],
      points: [
        { ja: "光って 光って", zh: "闪耀吧、闪耀吧", note: "光る（发光）的て形重复使用，表示动作反复并加以强调，是歌词里常见的强调手法。", wordId: "yume" },
        { ja: "眠らない25時", zh: "不眠的 25 点", note: "眠らない是动词眠る的否定式作连体修饰；25時是剧中的「虚拟时间」——早已过了零点，却依然睡不着。", wordId: "nemuru" },
        { ja: "消えたいと叫んだら「叶えたい」に気付いたよ", zh: "当喊出「好想消失」时，才发觉其实是「好想实现」", note: "「〜たい」表示愿望；気付く（察觉）是常用动词，这里与「叶えたい」（想实现愿望）形成反转，把绝望唱成了渴望。", wordId: "kokoro" }
      ],
      words: ["yume", "nemuru", "kokoro"],
      sources: [
        { label: "Sekaipedia（完整歌词）", url: "https://www.sekaipedia.org/wiki/Soko_ni_Aru,_Hikari." },
        { label: "中文歌词翻译", url: "https://ttiqa817.hatenablog.com/entry/2025/01/28/000833" }
      ]
    },
    {
      id: "angelite",
      title: "angelite",
      romajiTitle: "angelite",
      artist: "初音ミク（Dark）",
      producer: "narry（作詞・作曲・編曲）",
      year: 2013,
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "聞こえないフリをして遠ざけていた", zh: "假装听不见，一直把这份心意推远" },
        { ja: "どうしてあなたのことを今になって愛しはじめてしまったのかな", zh: "为什么偏偏到了现在，我才开始爱上你呢" },
        { ja: "もう届かないと分かってるのに想いがあふれていくの", zh: "明明知道已经传不到了，思念却不断满溢" }
      ],
      points: [
        { ja: "聞こえないフリ", zh: "假装听不见", note: "聞こえる（听得见）的否定＋フリ（装作…的样子）。「〜ふりをする」是常用表达，歌词里常把する省掉。", wordId: "kiku" },
        { ja: "愛しはじめてしまった", zh: "开始爱上（无法挽回）", note: "「〜はじめる」表示开始，「〜てしまう」表示遗憾、无法挽回。两个语法叠用，把「迟来的心动」唱得很揪心。", wordId: "setsunai" },
        { ja: "想いがあふれていく", zh: "思念不断满溢", note: "想い（思い）=思念、心意；あふれる=满溢。整首歌都是「切ない」（揪心）的心情。", wordId: "setsunai" }
      ],
      words: ["kiku", "setsunai", "kokoro"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/Angelite" },
        { label: "VocaDB", url: "https://vocadb.net/S/35316" }
      ]
    },
    {
      id: "telomere",
      title: "Telomere",
      romajiTitle: "Telomere",
      artist: "初音ミク V4X",
      producer: "regulus（作詞・作曲）",
      year: 2018,
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "行かないでよ 此処にいてよ", zh: "别走啊，留在这里啊" },
        { ja: "もういっそ僕を壊してよ", zh: "干脆把我毁掉吧" },
        { ja: "生きていると感じたいの", zh: "我想真切地感受到自己活着" },
        { ja: "あと少しの命ならばねえどれくらい良かっただろう", zh: "如果生命还剩一点点的话，那该有多好" }
      ],
      points: [
        { ja: "行かないでよ 此処にいてよ", zh: "别走啊，留在这里啊", note: "「〜ないで」=请不要…；「いて」是いる的て形，よ是带感情的助词。请求、挽留时的经典句式。", wordId: "iku" },
        { ja: "僕を壊してよ", zh: "把我毁掉吧", note: "壊す=破坏（他动词），与壊れる（自动词）相对。歌词用「破坏」来表达想打破外壳、真切感受活着。", wordId: "kokoro" },
        { ja: "生きていると感じたい", zh: "想感受到活着", note: "「〜たい」表愿望；生きる=活着，感じる=感觉。句尾的の是口语化的语气，比はるか说「のです」更贴近日常。", wordId: "kokoro" },
        { ja: "あと少しの命ならば", zh: "如果只剩下一点点生命", note: "ならば=如果…的话（书面语/歌词用语）；あと少し=再一点。假设＋愿望是歌词里很常见的句式。", wordId: "yume" }
      ],
      words: ["iku", "kokoro", "yume"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/Telomere" }
      ]
    },
    {
      id: "falling-down",
      title: "falling down",
      romajiTitle: "falling down",
      artist: "歌愛ユキ",
      producer: "201（作詞・作曲）",
      year: 2023,
      project: "VOCALOID",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "falling downしても hold outしてよ", zh: "就算正在坠落，也请撑住啊" },
        { ja: "関係ない嘘も興味ないから", zh: "与我无关的谎言，我也毫不关心" },
        { ja: "愛されたいのに愛されない日に", zh: "在明明渴望被爱、却得不到爱的日子里" },
        { ja: "でも本当はあなたに救われたいんだ", zh: "但其实我真正想要的，是被你拯救" }
      ],
      points: [
        { ja: "falling downしても hold outしてよ", zh: "就算在坠落，也请撑住", note: "「〜しても」=即使…也；falling down、hold out 都是英语外来语，用「する」动词化。日式英语混搭是 J-pop 歌词常态。", wordId: "sabishii" },
        { ja: "愛されたいのに愛されない", zh: "明明想被爱，却得不到爱", note: "愛される=被爱（受身）；「〜たいのに」=明明想…却…，表达事与愿违的遗憾，是情歌高频句式。", wordId: "sabishii" },
        { ja: "あなたに救われたいんだ", zh: "我想被你拯救", note: "救う=拯救，救われる=被拯救（受身）；「〜たいんだ」=想要…（んだ用于强调心情/理由）。", wordId: "kokoro" }
      ],
      words: ["sabishii", "kokoro"],
      sources: [
        { label: "Vocaloid Lyrics Wiki", url: "https://vocaloidlyrics.miraheze.org/wiki/Falling_down/201" },
        { label: "VocaDB（单曲页）", url: "https://beta.vocadb.net/Al/36206" }
      ]
    },
    {
      id: "soragoto",
      title: "ソラゴト / 虚言",
      romajiTitle: "Soragoto / Kyogen",
      artist: "明透",
      producer: "ポリスピカデリー（作詞・作曲・編曲）",
      year: 2022,
      project: "神椿",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "淡い光に欺かれる", zh: "被淡淡的光芒所欺骗" },
        { ja: "風に抱かれ砂に溶け", zh: "被风拥抱，溶入沙中" },
        { ja: "満たされるまでここに居よう", zh: "在满足之前，就留在这里吧" },
        { ja: "痛みに似た足りないもの", zh: "那像疼痛一样、永远不够的东西" }
      ],
      points: [
        { ja: "空言（そらごと）", zh: "谎言；空话", note: "字面是「空中的话」，指不真实、如空中楼阁般的话语，与「虚言」同义。标题玩了一个双关：空（そら）也指天空。", wordId: "sora" },
        { ja: "風に抱かれ砂に溶け", zh: "被风拥抱，溶入沙中", note: "抱かれる=被拥抱（受身），溶ける=溶解。受身＋自然意象，是歌词里营造「无力又唯美」氛围的典型写法。", wordId: "kaze" },
        { ja: "満たされるまでここに居よう", zh: "在满足之前就留在这里吧", note: "満たされる=被填满、得到满足；「〜まで」=直到…为止；「〜よう」=意志形，表示「…吧」。", wordId: "kokoro" },
        { ja: "痛みに似た足りないもの", zh: "像疼痛一样、永远欠缺的东西", note: "似た=相似的；足りない=不足的。用定语连用修饰名词，歌词里常用这种抽象留白。", wordId: "setsunai" }
      ],
      words: ["sora", "kaze", "kokoro", "setsunai"],
      sources: [
        { label: "shiyinren（中日双语歌词）", url: "https://www.shiyinren.net/song/946646.html" },
        { label: "萌娘百科（歌曲信息）", url: "https://mzh.moegirl.org.cn/虚言(明透)" }
      ]
    },
    {
      id: "arika",
      title: "在処",
      romajiTitle: "Arika",
      artist: "FROZEN QUALIA",
      producer: "kazuki（作詞・作曲）",
      year: 2019,
      project: "同人音乐",
      lyricsStatus: "missing",
      excerpt: [],
      points: [],
      words: [],
      sources: [
        { label: "OTOTOY（专辑页）", url: "https://ototoy.jp/_/default/p/456802" },
        { label: "虾米音乐存档", url: "https://xiapi.quotsoft.net/album/yh/yhZWMbe15c1/" }
      ]
    },
    {
      id: "terra",
      title: "テラ / TERRA",
      romajiTitle: "Tera / TERRA",
      artist: "春猿火",
      producer: "たかやん（作詞・作曲）・安宅秀紀（編曲）",
      year: 2022,
      project: "神椿",
      lyricsStatus: "complete",
      excerpt: [
        { ja: "後悔なんて一切無い 希望は懲りない 虚無と飛び出して", zh: "后悔什么的完全没有；希望不知悔改，与虚无一同冲出" },
        { ja: "此処を通じて君と出会えた 君のお陰でより好きになれた", zh: "经由这里与你相遇，托你的福，我变得更喜欢了" },
        { ja: "人生 捨てちゃいられない", zh: "人生，可不能就这样丢掉啊" },
        { ja: "理想へ Dunk 理性無し Like a drunk", zh: "向着理想灌篮，毫无理性、如醉汉一般" }
      ],
      points: [
        { ja: "後悔なんて一切無い", zh: "后悔什么的，一点都没有", note: "「なんて」有轻描淡写或列举的语气；「一切（いっさい）〜ない」= 丝毫也不。把后悔清零、只管向前，是这首歌的底色。", wordId: "kokoro" },
        { ja: "希望は懲りない", zh: "希望不知悔改", note: "懲りる（こりる）本义是「吃过苦头后不敢再做」；「懲りない」反过来形容屡败屡战、不长记性，这里是在称赞希望本身。", wordId: "yume" },
        { ja: "此処を通じて君と出会えた / 君のお陰でより好きになれた", zh: "经由这里与你相遇，托你的福，我变得更喜欢了", note: "通じて=通过…（途径）；お陰で=托…的福，是表达感谢与归因的固定句型；「より＋形容词」= 更加。", wordId: "arigatou" },
        { ja: "理想へ Dunk 理性無し Like a drunk", zh: "向着理想灌篮，毫无理性、如醉汉一般", note: "理想（りそう）与理性（りせい）发音相近，故意押韵的文字游戏；「無し」= 没有；日英混搭让节奏更有冲击力。", wordId: "yume" }
      ],
      words: ["yume", "arigatou", "kokoro"],
      sources: [
        { label: "萌娘百科（歌曲信息）", url: "https://mzh.moegirl.org.cn/春猿火" },
        { label: "官方 MV（bilibili）", url: "https://www.bilibili.com/video/BV1wN4y1K7dv" },
        { label: "歌词由站主提供（2026-08）", url: "" }
      ]
    }
  ]
};

/* ---------- 数据辅助函数 ---------- */

NihonlData.getWord = function (id) {
  return this.words.find((w) => w.id === id);
};

NihonlData.getCulture = function (id) {
  return this.culture.find((c) => c.id === id);
};

NihonlData.categoryLabel = function (id) {
  const c = this.categories.find((c) => c.id === id);
  return c ? c.label : id;
};

NihonlData.wordsForCulture = function (cultureId) {
  const c = this.getCulture(cultureId);
  if (!c) return [];
  return c.words.map((id) => this.getWord(id)).filter(Boolean);
};

NihonlData.cultureForWord = function (wordId) {
  const w = this.getWord(wordId);
  if (!w || !w.culture) return [];
  return w.culture.map((id) => this.getCulture(id)).filter(Boolean);
};

NihonlData.getSong = function (id) {
  return this.songs.find((s) => s.id === id);
};

NihonlData.songsForWord = function (wordId) {
  return this.songs.filter((s) =>
    (s.words || []).includes(wordId) ||
    (s.points || []).some((p) => p.wordId === wordId)
  );
};

NihonlData.songProjects = function () {
  const seen = [];
  for (const s of this.songs) {
    if (s.project && !seen.includes(s.project)) seen.push(s.project);
  }
  return seen;
};
