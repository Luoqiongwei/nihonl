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
    { id: "music", label: "音乐" },
    { id: "family", label: "家族" },
    { id: "place", label: "场所" },
    { id: "study", label: "学习" },
    { id: "object", label: "物品" },
    { id: "color", label: "颜色" },
    { id: "body", label: "身体" },
    { id: "transport", label: "交通" },
    { id: "adv", label: "副词" },
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
      culture: [], mnemonic: "ichi/ni/san 与中文「一、二、三」同源，比赛开场倒数常用。" },

    // ---------- 音乐 ----------
    { id: "uta", kana: "うた", kanji: "歌", romaji: "uta", meaning: "歌；歌曲", pos: "名词", category: "music", level: "N5",
      example: { ja: "この歌、何度も聞いてしまう。", zh: "这首歌，我忍不住听了一遍又一遍。" },
      culture: ["vocaloid"], mnemonic: "「うた」是日本音乐文化的起点：从童谣、演歌到ボカロ曲，都叫「歌」。" },
    { id: "ongaku", kana: "おんがく", kanji: "音楽", romaji: "ongaku", meaning: "音乐", pos: "名词", category: "music", level: "N5",
      example: { ja: "音楽を聴きながら歩くのが好きです。", zh: "我喜欢边听音乐边走路。" },
      culture: ["vocaloid"], mnemonic: "汉字「音楽」= 声音的快乐，和中文「音乐」同源。" },
    { id: "kashi", kana: "かし", kanji: "歌詞", romaji: "kashi", meaning: "歌词", pos: "名词", category: "music", level: "N5",
      example: { ja: "この歌詞に共感する。", zh: "我对这段歌词很有共鸣。" },
      culture: ["vocaloid"], mnemonic: "本网站的音乐页就是在教你读「歌詞」。" },
    { id: "utau", kana: "うたう", kanji: "歌う", romaji: "utau", meaning: "唱歌", pos: "动词", category: "music", level: "N5",
      example: { ja: "カラオケで歌を歌う。", zh: "在卡拉OK唱歌。" },
      culture: ["vocaloid"], mnemonic: "歌（うた）+ う = 唱歌。「歌う」是日语里最常用的动词之一。" },

    // ---------- 自然补充 ----------
    { id: "natsu", kana: "なつ", kanji: "夏", romaji: "natsu", meaning: "夏天", pos: "名词", category: "nature", level: "N5",
      example: { ja: "夏が終わるのが寂しい。", zh: "夏天结束让人寂寞。" },
      culture: ["mono-no-aware", "matsuri"], mnemonic: "夏恋慕、あの夏が飽和する——日系歌曲最爱的季节。" },
    { id: "hikari", kana: "ひかり", kanji: "光", romaji: "hikari", meaning: "光；光芒", pos: "名词", category: "nature", level: "N5",
      example: { ja: "朝の光が部屋に差し込む。", zh: "清晨的光照进房间。" },
      culture: ["yugen"], mnemonic: "「そこに在る、光。」——光芒是希望与救赎的通用意象。" },
    { id: "niji", kana: "にじ", kanji: "虹", romaji: "niji", meaning: "彩虹", pos: "名词", category: "nature", level: "N5",
      example: { ja: "雨の後に虹が出た。", zh: "雨后出现了彩虹。" },
      culture: ["yugen"], mnemonic: "Toge 里「夕立の後に rainbow」——雨后的彩虹就是转机。" },
    { id: "yozora", kana: "よぞら", kanji: "夜空", romaji: "yozora", meaning: "夜空", pos: "名词", category: "nature", level: "N5",
      example: { ja: "夜空に星がたくさん見える。", zh: "夜空中能看到很多星星。" },
      culture: ["yugen"], mnemonic: "夜+空=夜空。看星星、看流星，都是「夜空」。" },
    { id: "tori", kana: "とり", kanji: "鳥", romaji: "tori", meaning: "鸟", pos: "名词", category: "nature", level: "N5",
      example: { ja: "鳥が空を飛んでいる。", zh: "鸟儿在天上飞。" },
      culture: ["mono-no-aware"], mnemonic: "永遠里「真っ白な鳥のように」——白鸟是自由与重生的象征。" },
    { id: "semi", kana: "せみ", kanji: "蝉", romaji: "semi", meaning: "蝉", pos: "名词", category: "nature", level: "N5",
      example: { ja: "夏の終わりに蝉の声が聞こえる。", zh: "夏末还能听到蝉鸣。" },
      culture: ["mono-no-aware"], mnemonic: "あるふぁYOU 里的「蝉時雨」——蝉鸣如雨，是夏天的声音。" },
    { id: "sakana", kana: "さかな", kanji: "魚", romaji: "sakana", meaning: "鱼", pos: "名词", category: "nature", level: "N5",
      example: { ja: "帽子を被っている魚がいる？", zh: "有戴帽子的鱼吗？" },
      culture: [], mnemonic: "「帽子を被っている魚」——光听歌名就记住了「さかな」。" },
    { id: "usagi", kana: "うさぎ", kanji: "兎", romaji: "usagi", meaning: "兔子", pos: "名词", category: "nature", level: "N5",
      example: { ja: "月にはうさぎが住んでいる。", zh: "月亮上住着兔子。" },
      culture: ["matsuri"], mnemonic: "月兔捣年糕——お月見数え唄里蹦蹦跳的主角。" },

    // ---------- 心情补充 ----------
    { id: "koi", kana: "こい", kanji: "恋", romaji: "koi", meaning: "恋爱；恋情", pos: "名词", category: "feeling", level: "N4",
      example: { ja: "初恋は忘れられない。", zh: "初恋难以忘怀。" },
      culture: [], mnemonic: "恋爱的才能、初恋日記、夏恋慕——恋是日系歌永恒的主题。" },
    { id: "kanashimi", kana: "かなしみ", kanji: "悲しみ", romaji: "kanashimi", meaning: "悲伤", pos: "名词", category: "feeling", level: "N4",
      example: { ja: "悲しみを歌にのせる。", zh: "把悲伤写进歌里。" },
      culture: ["mono-no-aware"], mnemonic: "悲しみ是很多ボカロ曲的情绪底色，与寂しい、切ない是近亲。" },
    { id: "inochi", kana: "いのち", kanji: "命", romaji: "inochi", meaning: "生命；性命", pos: "名词", category: "feeling", level: "N4",
      example: { ja: "命の限り叫ぶ。", zh: "拼尽生命呐喊。" },
      culture: ["mono-no-aware"], mnemonic: "あるふぁYOU 里「命の限り叫んで」——把生命用尽也要呐喊。" },

    // ---------- 人物 / 日常补充 ----------
    { id: "jibun", kana: "じぶん", kanji: "自分", romaji: "jibun", meaning: "自己", pos: "名词", category: "people", level: "N5",
      example: { ja: "自分らしく生きたい。", zh: "想活出自己的样子。" },
      culture: [], mnemonic: "「自分らしく」（做自己）——Toge 里唱的那句「君らしくでいい」。" },
    { id: "sekai", kana: "せかい", kanji: "世界", romaji: "sekai", meaning: "世界", pos: "名词", category: "daily", level: "N5",
      example: { ja: "世界は広い。", zh: "世界很大。" },
      culture: [], mnemonic: "それを世界と言うんだね——花譜用歌告诉你怎么称呼「世界」。" },
    { id: "mirai", kana: "みらい", kanji: "未来", romaji: "mirai", meaning: "未来", pos: "名词", category: "time", level: "N5",
      example: { ja: "未来は自分で描くものだ。", zh: "未来是自己描绘的。" },
      culture: [], mnemonic: "エガクミライ（描绘未来）、合成するミライ——未来是希望系歌曲的高频词。" },
    { id: "neko", kana: "ねこ", kanji: "猫", romaji: "neko", meaning: "猫", pos: "名词", category: "anime", level: "N5",
      example: { ja: "猫が好きな人は多い。", zh: "喜欢猫的人很多。" },
      culture: ["kawaii"], mnemonic: "白猫海賊船、猫耳——猫在二次元里永远是主角。" },
    { id: "boushi", kana: "ぼうし", kanji: "帽子", romaji: "boushi", meaning: "帽子", pos: "名词", category: "daily", level: "N5",
      example: { ja: "帽子を被って出かける。", zh: "戴上帽子出门。" },
      culture: [], mnemonic: "帽子を被っている魚——用歌名记单词，最牢。" },
    { id: "dango", kana: "だんご", kanji: "団子", romaji: "dango", meaning: "团子（日式点心）", pos: "名词", category: "food", level: "N5",
      example: { ja: "月見団子をお供えする。", zh: "供奉月见团子。" },
      culture: ["matsuri"], mnemonic: "月見団子——赏月时摆的白团子，お月見数え唄里亲手做。" },

    // ---------- 问候补充 ----------
    { id: "konbanwa", kana: "こんばんは", romaji: "konbanwa", meaning: "晚上好", pos: "寒暄语", category: "greeting", level: "N5",
      example: { ja: "こんばんは、今夜もいい夜ですね。", zh: "晚上好，今夜也是个好夜晚呢。" },
      culture: [], mnemonic: "「空搬哇」——夜间直播开场白，和こんにちは成对记。" },
    { id: "oyasumi", kana: "おやすみ", kanji: "お休み", romaji: "oyasumi", meaning: "晚安", pos: "寒暄语", category: "greeting", level: "N5",
      example: { ja: "おやすみなさい、いい夢を見てね。", zh: "晚安，做个好梦。" },
      culture: [], mnemonic: "「哦呀斯密」——睡前互道晚安，动漫里说完就切黑屏。" },
    { id: "hajimemashite", kana: "はじめまして", romaji: "hajimemashite", meaning: "初次见面", pos: "寒暄语", category: "greeting", level: "N5",
      example: { ja: "はじめまして、よろしくお願いします。", zh: "初次见面，请多关照。" },
      culture: [], mnemonic: "「哈吉美玛西贴」——自我介绍第一句，转学番开场必备。" },
    { id: "yoroshiku", kana: "よろしく", kanji: "宜しく", romaji: "yoroshiku", meaning: "请多关照", pos: "寒暄语", category: "greeting", level: "N5",
      example: { ja: "これからよろしくね。", zh: "今后请多关照啦。" },
      culture: [], mnemonic: "「哟咯西哭」——和はじめまして连用，社交开场白套餐。" },

    // ---------- 人物补充 ----------
    { id: "onnanoko", kana: "おんなのこ", kanji: "女の子", romaji: "onnanoko", meaning: "女孩", pos: "名词", category: "people", level: "N5",
      example: { ja: "隣の女の子は歌が上手です。", zh: "隔壁的女孩很会唱歌。" },
      culture: [], mnemonic: "女（おんな）+ 子（こ）。恋爱番女主角的标准称呼。" },
    { id: "otokonoko", kana: "おとこのこ", kanji: "男の子", romaji: "otokonoko", meaning: "男孩", pos: "名词", category: "people", level: "N5",
      example: { ja: "男の子は外で遊ぶのが好き。", zh: "男孩子喜欢在外面玩。" },
      culture: [], mnemonic: "与女の子成对：男（おとこ）+ 子（こ）。" },

    // ---------- 家族 ----------
    { id: "oniisan", kana: "おにいさん", kanji: "お兄さん", romaji: "oniisan", meaning: "哥哥", pos: "名词", category: "family", level: "N5",
      example: { ja: "お兄さん、宿題を教えて。", zh: "哥哥，教我做作业。" },
      culture: [], mnemonic: "「哦尼酱」——妹妹撒娇时喊的经典称呼，二次元浓度拉满。" },
    { id: "oneesan", kana: "おねえさん", kanji: "お姉さん", romaji: "oneesan", meaning: "姐姐", pos: "名词", category: "family", level: "N5",
      example: { ja: "お姉さんは大学生です。", zh: "姐姐是大学生。" },
      culture: [], mnemonic: "「哦内酱」与「哦尼酱」成对：哥哥姐姐一起记。" },
    { id: "otouto", kana: "おとうと", kanji: "弟", romaji: "otouto", meaning: "弟弟", pos: "名词", category: "family", level: "N5",
      example: { ja: "弟と一緒にゲームをします。", zh: "我和弟弟一起打游戏。" },
      culture: [], mnemonic: "「哦托托」——家里最小的男孩子。" },
    { id: "imouto", kana: "いもうと", kanji: "妹", romaji: "imouto", meaning: "妹妹", pos: "名词", category: "family", level: "N5",
      example: { ja: "妹はかわいいです。", zh: "妹妹很可爱。" },
      culture: ["moe"], mnemonic: "「妹」读 imouto，二次元妹系角色专用词，萌属性之一。" },
    { id: "ojiisan", kana: "おじいさん", kanji: "お祖父さん", romaji: "ojiisan", meaning: "爷爷；老爷爷", pos: "名词", category: "family", level: "N5",
      example: { ja: "おじいさんは毎朝散歩します。", zh: "爷爷每天早晨散步。" },
      culture: [], mnemonic: "「哦吉依酱」——和「哦巴酱」（奶奶）成对记。" },
    { id: "obaasan", kana: "おばあさん", kanji: "お祖母さん", romaji: "obaasan", meaning: "奶奶；老奶奶", pos: "名词", category: "family", level: "N5",
      example: { ja: "おばあさんのおでんは最高です。", zh: "奶奶做的关东煮最好吃。" },
      culture: [], mnemonic: "注意长音别读成おばさん（阿姨），长音=长辈。" },

    // ---------- 日常补充 ----------
    { id: "mizu", kana: "みず", kanji: "水", romaji: "mizu", meaning: "水", pos: "名词", category: "daily", level: "N5",
      example: { ja: "お水を一杯ください。", zh: "请给我一杯水。" },
      culture: [], mnemonic: "「米兹」——注意与「お湯」（热水）区分，冬天喝お湯。" },
    { id: "ocha", kana: "おちゃ", kanji: "お茶", romaji: "ocha", meaning: "茶", pos: "名词", category: "daily", level: "N5",
      example: { ja: "お茶でも飲みながら話そう。", zh: "边喝茶边聊吧。" },
      culture: [], mnemonic: "加「お」的礼貌说法。茶道、抹茶、日常的お茶一起记。" },
    { id: "gohan", kana: "ごはん", kanji: "ご飯", romaji: "gohan", meaning: "米饭；饭", pos: "名词", category: "daily", level: "N5",
      example: { ja: "ご飯を食べたら宿題をする。", zh: "吃完饭就做作业。" },
      culture: [], mnemonic: "开饭前「いただきます」，吃完「ごちそうさま」。" },
    { id: "ofuro", kana: "おふろ", kanji: "お風呂", romaji: "ofuro", meaning: "洗澡；浴缸", pos: "名词", category: "daily", level: "N5",
      example: { ja: "お風呂に入ってから寝ます。", zh: "洗完澡再睡觉。" },
      culture: [], mnemonic: "日式泡澡文化：入浴剂、温泉、泡完说「あー気持ちいい」。" },
    { id: "shigoto", kana: "しごと", kanji: "仕事", romaji: "shigoto", meaning: "工作", pos: "名词", category: "daily", level: "N5",
      example: { ja: "今日も仕事が忙しい。", zh: "今天工作也很忙。" },
      culture: [], mnemonic: "社畜系日剧高频词，加班场景自带 BGM。" },

    // ---------- 二次元补充 ----------
    { id: "otaku", kana: "オタク", kanji: "お宅", romaji: "otaku", meaning: "御宅族；重度爱好者", pos: "名词", category: "anime", level: "N4",
      example: { ja: "彼はアニメオタクだ。", zh: "他是个动漫宅。" },
      culture: ["wakamono"], mnemonic: "「お宅」本义是「贵府」，后来指沉迷某事物的人，现已中性化。" },
    { id: "seichi", kana: "せいち", kanji: "聖地", romaji: "seichi", meaning: "圣地；巡礼地", pos: "名词", category: "anime", level: "N4",
      example: { ja: "推しの聖地巡礼に行きたい。", zh: "想去我推的圣地巡礼。" },
      culture: ["oshi"], mnemonic: "圣（せい）+ 地（ち）。动画取景地=宅的圣地，巡礼是推し活重要一环。" },
    { id: "kyarakutaa", kana: "キャラクター", romaji: "kyarakutaa", meaning: "角色；人物", pos: "名词", category: "anime", level: "N4",
      example: { ja: "このキャラクターが一番好き。", zh: "这个角色我最喜欢。" },
      culture: ["moe"], mnemonic: "英语 character 的片假名，口语常说「キャラ」。" },

    // ---------- 美食补充 ----------
    { id: "matcha", kana: "まっちゃ", kanji: "抹茶", romaji: "matcha", meaning: "抹茶", pos: "名词", category: "food", level: "N5",
      example: { ja: "抹茶ラテが好きです。", zh: "我喜欢抹茶拿铁。" },
      culture: [], mnemonic: "抹茶+拉铁=抹茶拿铁，便利店就能买到的日式风味。" },
    { id: "tempura", kana: "てんぷら", kanji: "天ぷら", romaji: "tempura", meaning: "天妇罗", pos: "名词", category: "food", level: "N5",
      example: { ja: "えびの天ぷらを注文しました。", zh: "我点了炸虾天妇罗。" },
      culture: [], mnemonic: "酥脆的炸物，和「そば」（荞麦面）是经典搭配。" },
    { id: "oden", kana: "おでん", romaji: "oden", meaning: "关东煮", pos: "名词", category: "food", level: "N5",
      example: { ja: "冬はおでんが食べたくなる。", zh: "一到冬天就想吃关东煮。" },
      culture: [], mnemonic: "便利店冬天的暖柜里咕嘟咕嘟煮着的，就是おでん。" },
    { id: "bentou", kana: "べんとう", kanji: "弁当", romaji: "bentou", meaning: "便当", pos: "名词", category: "food", level: "N5",
      example: { ja: "お弁当を持ってピクニックに行く。", zh: "带着便当去野餐。" },
      culture: ["matsuri"], mnemonic: "花见、远足、春游——日式便当是野餐的灵魂，妈妈手作最棒。" },

    // ---------- 自然补充2 ----------
    { id: "ki", kana: "き", kanji: "木", romaji: "ki", meaning: "树；木头", pos: "名词", category: "nature", level: "N5",
      example: { ja: "公園の木の下で休みましょう。", zh: "在公园的树下休息吧。" },
      culture: [], mnemonic: "一个音节「ki」就是树，森林（もり）就是「木」多到成林。" },
    { id: "yama", kana: "やま", kanji: "山", romaji: "yama", meaning: "山", pos: "名词", category: "nature", level: "N5",
      example: { ja: "富士山は日本で一番高い山です。", zh: "富士山是日本最高的山。" },
      culture: [], mnemonic: "「亚麻」——登山番、夏日露营的标配背景。" },
    { id: "kawa", kana: "かわ", kanji: "川", romaji: "kawa", meaning: "河；河流", pos: "名词", category: "nature", level: "N5",
      example: { ja: "夏休みに川で泳ぎました。", zh: "暑假在河里游了泳。" },
      culture: [], mnemonic: "注意与「皮（かわ）」同音，语境区分。" },
    { id: "mori", kana: "もり", kanji: "森", romaji: "mori", meaning: "森林", pos: "名词", category: "nature", level: "N5",
      example: { ja: "森の中で迷子になった。", zh: "在森林里迷路了。" },
      culture: ["yugen"], mnemonic: "木（き）+木+木=森。宫崎骏电影里的森林总是藏着神秘。" },
    { id: "kumo", kana: "くも", kanji: "雲", romaji: "kumo", meaning: "云", pos: "名词", category: "nature", level: "N5",
      example: { ja: "空に白い雲が浮かんでいる。", zh: "天空飘着白云。" },
      culture: [], mnemonic: "注意与「蜘蛛（くも）」同音：天上的雲、屋檐下的蜘蛛。" },
    { id: "hare", kana: "はれ", kanji: "晴れ", romaji: "hare", meaning: "晴天", pos: "名词", category: "nature", level: "N5",
      example: { ja: "明日は晴れらしい。", zh: "明天好像是晴天。" },
      culture: [], mnemonic: "天气预报三兄弟：晴れ（はれ）・曇り（くもり）・雨（あめ）。" },
    { id: "kumori", kana: "くもり", kanji: "曇り", romaji: "kumori", meaning: "阴天", pos: "名词", category: "nature", level: "N5",
      example: { ja: "曇りだから傘を持って行こう。", zh: "阴天，带把伞去吧。" },
      culture: [], mnemonic: "「雲（くも）+ り」——天上布满云就是阴天。" },
    { id: "yuuyake", kana: "ゆうやけ", kanji: "夕焼け", romaji: "yuuyake", meaning: "晚霞", pos: "名词", category: "nature", level: "N5",
      example: { ja: "夕焼け空がとても綺麗だ。", zh: "晚霞染红的天空真美。" },
      culture: ["mono-no-aware"], mnemonic: "夕（傍晚）+ 焼け（烧）——天空被夕阳烧红，放学路上的物哀时刻。" },
    { id: "asahi", kana: "あさひ", kanji: "朝日", romaji: "asahi", meaning: "朝阳", pos: "名词", category: "nature", level: "N5",
      example: { ja: "朝日を見ながら走るのが好き。", zh: "我喜欢看着朝阳跑步。" },
      culture: ["yugen"], mnemonic: "朝（早上）+ 日（太阳），与夕焼け成对：日出日落都值得看。" },
    { id: "taifuu", kana: "たいふう", kanji: "台風", romaji: "taifuu", meaning: "台风", pos: "名词", category: "nature", level: "N4",
      example: { ja: "台風のため電車が止まった。", zh: "因为台风电车停了。" },
      culture: [], mnemonic: "中文「台风」就是借自日语的「台風」。" },

    // ---------- 心情补充2 ----------
    { id: "ureshii", kana: "うれしい", kanji: "嬉しい", romaji: "ureshii", meaning: "高兴的", pos: "形容词", category: "feeling", level: "N5",
      example: { ja: "手紙をもらって嬉しい。", zh: "收到信好开心。" },
      culture: [], mnemonic: "「乌勒西」——收到生日礼物、见到推し时的标准反应。" },
    { id: "kanashii", kana: "かなしい", kanji: "悲しい", romaji: "kanashii", meaning: "悲伤的", pos: "形容词", category: "feeling", level: "N5",
      example: { ja: "別れは悲しい。", zh: "离别是悲伤的。" },
      culture: ["mono-no-aware"], mnemonic: "与「悲しみ」（悲伤的名词）同源，物哀系歌曲的情绪底色。" },
    { id: "kowai", kana: "こわい", kanji: "怖い", romaji: "kowai", meaning: "可怕的", pos: "形容词", category: "feeling", level: "N5",
      example: { ja: "幽霊は怖い。", zh: "幽灵好可怕。" },
      culture: [], mnemonic: "「扣哇伊」——恐怖番、怪谈场景必备感叹。" },
    { id: "hazukashii", kana: "はずかしい", kanji: "恥ずかしい", romaji: "hazukashii", meaning: "害羞的；难为情的", pos: "形容词", category: "feeling", level: "N5",
      example: { ja: "人前で歌うのは恥ずかしい。", zh: "在大家面前唱歌好害羞。" },
      culture: [], mnemonic: "告白成功、被夸可爱时捂住脸的「哈兹卡西」。" },
    { id: "anshin", kana: "あんしん", kanji: "安心", romaji: "anshin", meaning: "安心；放心", pos: "名词/形容动词", category: "feeling", level: "N4",
      example: { ja: "君の声を聞くと安心する。", zh: "听到你的声音就安心了。" },
      culture: [], mnemonic: "「安（あん）心（しん）」——和中文同形，治愈系歌曲常唱的主题。" },

    // ---------- 美学补充 ----------
    { id: "ichigoichie", kana: "いちごいちえ", kanji: "一期一会", romaji: "ichigoichie", meaning: "一期一会；一生只有一次的相遇", pos: "惯用语", category: "aesthetics", level: "N4",
      example: { ja: "一期一会の出会いを大切に。", zh: "珍惜一期一会的相遇。" },
      culture: ["mono-no-aware"], mnemonic: "茶道用语：每一次相遇都只此一回。首页装饰词就是它。" },
    { id: "yohaku", kana: "よはく", kanji: "余白", romaji: "yohaku", meaning: "留白", pos: "名词", category: "aesthetics", level: "N4",
      example: { ja: "余白のある暮らしがしたい。", zh: "想要有留白的生活。" },
      culture: ["ma"], mnemonic: "日本美学的核心之一：不填满，才有呼吸的空间。" },

    // ---------- 动作补充 ----------
    { id: "kuru", kana: "くる", kanji: "来る", romaji: "kuru", meaning: "来", pos: "动词", category: "action", level: "N5",
      example: { ja: "明日また来るよ。", zh: "明天我还会来的。" },
      culture: [], mnemonic: "「库鲁」——与行く（去）方向相反，车站送别时最常说。" },
    { id: "kaeru", kana: "かえる", kanji: "帰る", romaji: "kaeru", meaning: "回去；回家", pos: "动词", category: "action", level: "N5",
      example: { ja: "そろそろ家に帰ります。", zh: "差不多该回家了。" },
      culture: [], mnemonic: "回家第一句「ただいま（我回来了）」，家人回「おかえり」。" },
    { id: "yomu", kana: "よむ", kanji: "読む", romaji: "yomu", meaning: "读；看（书）", pos: "动词", category: "action", level: "N5",
      example: { ja: "寝る前に本を読みます。", zh: "睡前读书。" },
      culture: [], mnemonic: "「哟姆」——图书馆、咖啡店看书的场景，和本（ほん）一起记。" },
    { id: "kaku", kana: "かく", kanji: "書く", romaji: "kaku", meaning: "写", pos: "动词", category: "action", level: "N5",
      example: { ja: "日記を書くのが好き。", zh: "我喜欢写日记。" },
      culture: [], mnemonic: "「卡哭」——写日记、写信、写歌词，都是「書く」。" },
    { id: "okiru", kana: "おきる", kanji: "起きる", romaji: "okiru", meaning: "起床；起来", pos: "动词", category: "action", level: "N5",
      example: { ja: "毎朝六時に起きます。", zh: "每天早上六点起床。" },
      culture: [], mnemonic: "与寝る（睡觉）相对：起きる↔寝る，一天的开始与结束。" },
    { id: "au", kana: "あう", kanji: "会う", romaji: "au", meaning: "见面；遇见", pos: "动词", category: "action", level: "N5",
      example: { ja: "また会おうね。", zh: "再见面吧。" },
      culture: [], mnemonic: "「阿乌」——「また会おう」是告别时最温柔的约定。" },
    { id: "warau", kana: "わらう", kanji: "笑う", romaji: "warau", meaning: "笑", pos: "动词", category: "action", level: "N5",
      example: { ja: "笑う門には福来たる。", zh: "笑口常开，福气自来。" },
      culture: [], mnemonic: "「哇劳」——和泣く（哭）成对：笑ったり泣いたり。" },
    { id: "naku", kana: "なく", kanji: "泣く", romaji: "naku", meaning: "哭", pos: "动词", category: "action", level: "N5",
      example: { ja: "感動して泣いてしまった。", zh: "感动得哭了。" },
      culture: ["mono-no-aware"], mnemonic: "「那哭」——催泪番结局的标准动作。" },
    { id: "odoru", kana: "おどる", kanji: "踊る", romaji: "odoru", meaning: "跳舞", pos: "动词", category: "action", level: "N5",
      example: { ja: "音楽に合わせて踊ろう。", zh: "跟着音乐跳舞吧。" },
      culture: ["vocaloid"], mnemonic: "VOCALOID 歌曲 PV 里的 3D 舞姿，就是「踊る」。" },

    // ---------- 形容补充 ----------
    { id: "takai", kana: "たかい", kanji: "高い", romaji: "takai", meaning: "高的；贵的", pos: "形容词", category: "adj", level: "N5",
      example: { ja: "この山は高い。／この店は高い。", zh: "这座山很高。／这家店很贵。" },
      culture: [], mnemonic: "「塔卡伊」——高和贵是同一个词，语境分辨。" },
    { id: "yasui", kana: "やすい", kanji: "安い", romaji: "yasui", meaning: "便宜的", pos: "形容词", category: "adj", level: "N5",
      example: { ja: "この店は安くて美味しい。", zh: "这家店又便宜又好吃。" },
      culture: [], mnemonic: "与高い成对：「安（やす）い」=便宜，和中文「安」同源。" },
    { id: "atsui", kana: "あつい", kanji: "暑い", romaji: "atsui", meaning: "（天气）热的", pos: "形容词", category: "adj", level: "N5",
      example: { ja: "今日は本当に暑い。", zh: "今天真的好热。" },
      culture: [], mnemonic: "三兄弟：暑い（天气热）・熱い（东西烫）・厚い（厚）。" },
    { id: "samui", kana: "さむい", kanji: "寒い", romaji: "samui", meaning: "（天气）冷的", pos: "形容词", category: "adj", level: "N5",
      example: { ja: "冬はとても寒い。", zh: "冬天很冷。" },
      culture: [], mnemonic: "与暑い成对：冬天说寒い，夏天说暑い。" },
    { id: "isogashii", kana: "いそがしい", kanji: "忙しい", romaji: "isogashii", meaning: "忙的", pos: "形容词", category: "adj", level: "N5",
      example: { ja: "最近仕事が忙しい。", zh: "最近工作很忙。" },
      culture: [], mnemonic: "「一搜嘎西」——加班、赶稿、期末周通用感叹。" },
    { id: "nemui", kana: "ねむい", kanji: "眠い", romaji: "nemui", meaning: "困的；想睡的", pos: "形容词", category: "adj", level: "N5",
      example: { ja: "眠いからもう寝るね。", zh: "好困，我先睡了。" },
      culture: [], mnemonic: "和动词眠る（睡觉）同源：先「眠い」再「眠る」。" },

    // ---------- 时间数字补充 ----------
    { id: "ima", kana: "いま", kanji: "今", romaji: "ima", meaning: "现在", pos: "名词", category: "time", level: "N5",
      example: { ja: "今、何時ですか？", zh: "现在几点了？" },
      culture: [], mnemonic: "「依玛」——今すぐ（立刻）、今から（从现在起），都离不开它。" },
    { id: "asa", kana: "あさ", kanji: "朝", romaji: "asa", meaning: "早上", pos: "名词", category: "time", level: "N5",
      example: { ja: "朝ご飯はパンと卵です。", zh: "早餐是面包和鸡蛋。" },
      culture: [], mnemonic: "朝ご飯（早餐）・昼ご飯（午餐）・晩ご飯（晚餐），三餐连成一条线。" },
    { id: "hiru", kana: "ひる", kanji: "昼", romaji: "hiru", meaning: "中午；白天", pos: "名词", category: "time", level: "N5",
      example: { ja: "昼ご飯を食べに行こう。", zh: "去吃午饭吧。" },
      culture: [], mnemonic: "昼（ひる）↔ 夜（よる），中午和夜晚成对。" },
    { id: "yoru", kana: "よる", kanji: "夜", romaji: "yoru", meaning: "夜晚", pos: "名词", category: "time", level: "N5",
      example: { ja: "夜になると星が見える。", zh: "到了晚上就能看到星星。" },
      culture: ["yugen"], mnemonic: "夜+空=夜空（よぞら）。夜晚是无数歌曲与故事的主场。" },
    { id: "shuumatsu", kana: "しゅうまつ", kanji: "週末", romaji: "shuumatsu", meaning: "周末", pos: "名词", category: "time", level: "N5",
      example: { ja: "週末は友達と遊ぶ。", zh: "周末和朋友玩。" },
      culture: [], mnemonic: "週（星期）+ 末（末尾）——一周的尾巴，学生和社畜的救赎。" },
    { id: "mainichi", kana: "まいにち", kanji: "毎日", romaji: "mainichi", meaning: "每天", pos: "名词/副词", category: "time", level: "N5",
      example: { ja: "毎日日本語を勉強しています。", zh: "我每天在学日语。" },
      culture: [], mnemonic: "毎（mai）+ 日（nichi）：每一天。背单词打卡专用词。" },
    { id: "yon", kana: "よん", kanji: "四", romaji: "yon", meaning: "四", pos: "数词", category: "time", level: "N5",
      example: { ja: "四時にお茶にしましょう。", zh: "四点去喝茶吧。" },
      culture: [], mnemonic: "四的两种读法：よん（一般数数）和し（忌讳，因为像死）。" },
    { id: "go", kana: "ご", kanji: "五", romaji: "go", meaning: "五", pos: "数词", category: "time", level: "N5",
      example: { ja: "五時まで働きます。", zh: "工作到五点。" },
      culture: [], mnemonic: "「国」的日语音读也是ご（国ごと）。" },
    { id: "roku", kana: "ろく", kanji: "六", romaji: "roku", meaning: "六", pos: "数词", category: "time", level: "N5",
      example: { ja: "六時に起きる。", zh: "六点起床。" },
      culture: [], mnemonic: "「咯哭」——闹钟定在六点的那个数字。" },
    { id: "nana", kana: "なな", kanji: "七", romaji: "nana", meaning: "七", pos: "数词", category: "time", level: "N5",
      example: { ja: "七時から始まります。", zh: "七点开始。" },
      culture: [], mnemonic: "七的两种读法：なな（数数）和しち（时间）。”" },
    { id: "hachi", kana: "はち", kanji: "八", romaji: "hachi", meaning: "八", pos: "数词", category: "time", level: "N5",
      example: { ja: "八時まで寝たい。", zh: "想睡到八点。" },
      culture: [], mnemonic: "「哈奇」——八月（はちがつ）的开头。" },
    { id: "kyuu", kana: "きゅう", kanji: "九", romaji: "kyuu", meaning: "九", pos: "数词", category: "time", level: "N5",
      example: { ja: "九時十分です。", zh: "九点十分。" },
      culture: [], mnemonic: "「Q——」拉长音就是九（きゅう）。" },
    { id: "juu", kana: "じゅう", kanji: "十", romaji: "juu", meaning: "十", pos: "数词", category: "time", level: "N5",
      example: { ja: "十人で歌います。", zh: "十个人一起唱歌。" },
      culture: [], mnemonic: "「究」——十是进位的关键，十、二十、三十全靠它。" },
    { id: "hyaku", kana: "ひゃく", kanji: "百", romaji: "hyaku", meaning: "一百", pos: "数词", category: "time", level: "N5",
      example: { ja: "百円ショップに行こう。", zh: "去百元店逛逛吧。" },
      culture: [], mnemonic: "「哈雅哭」——百元店的「百」。这网站要背到第 200 个词，就是两个百。" },
    { id: "sen", kana: "せん", kanji: "千", romaji: "sen", meaning: "一千", pos: "数词", category: "time", level: "N5",
      example: { ja: "千円札を出しました。", zh: "我拿出一千日元纸币。" },
      culture: [], mnemonic: "「森」？不对，是「先」——千円是日元的基本单位。" },
    { id: "man", kana: "まん", kanji: "万", romaji: "man", meaning: "一万", pos: "数词", category: "time", level: "N4",
      example: { ja: "一万円は約70元です。", zh: "一万日元约合人民币70元。" },
      culture: [], mnemonic: "中文的「万」也来自这里，汉字同形同义。" },

    // ---------- 音乐补充 ----------
    { id: "merodii", kana: "メロディー", romaji: "merodii", meaning: "旋律", pos: "名词", category: "music", level: "N4",
      example: { ja: "この曲のメロディーが大好き。", zh: "我超喜欢这首歌的旋律。" },
      culture: ["vocaloid"], mnemonic: "英语 melody 的片假名，VOCALOID 歌曲的灵魂。" },
    { id: "rizumu", kana: "リズム", romaji: "rizumu", meaning: "节奏", pos: "名词", category: "music", level: "N4",
      example: { ja: "リズムに乗って踊ろう。", zh: "跟着节奏跳起来吧。" },
      culture: ["vocaloid"], mnemonic: "「里兹姆」——跟着节拍点头，就是「リズムを取る」。" },
    { id: "bokaru", kana: "ボーカル", romaji: "bokaru", meaning: "主唱；人声", pos: "名词", category: "music", level: "N4",
      example: { ja: "ボーカルの声が綺麗です。", zh: "主唱的声音很美。" },
      culture: ["vocaloid"], mnemonic: "VOCALOID 的名字就来自 vocal（人声）+ oid。" },
    { id: "raibu", kana: "ライブ", romaji: "raibu", meaning: "现场演出；演唱会", pos: "名词", category: "music", level: "N4",
      example: { ja: "推しのライブに行くのが夢。", zh: "去看我推的演唱会是我的梦想。" },
      culture: ["oshi"], mnemonic: "live 的片假名。荧光棒、应援色、合唱——推し活的最高潮。" },

    // ---------- 场所 ----------
    { id: "eki", kana: "えき", kanji: "駅", romaji: "eki", meaning: "车站", pos: "名词", category: "place", level: "N5",
      example: { ja: "駅で待ち合わせましょう。", zh: "在车站碰头吧。" },
      culture: [], mnemonic: "「哎ki」——日剧里「駅の改札口で待つ」的经典场景。" },
    { id: "kouen", kana: "こうえん", kanji: "公園", romaji: "kouen", meaning: "公园", pos: "名词", category: "place", level: "N5",
      example: { ja: "公園でピクニックをする。", zh: "在公园野餐。" },
      culture: ["matsuri"], mnemonic: "花见、夏日祭、樱花树下的座位——公园是日系日常的舞台。" },
    { id: "mise", kana: "みせ", kanji: "店", romaji: "mise", meaning: "店铺；商店", pos: "名词", category: "place", level: "N5",
      example: { ja: "あの店のラーメンは有名だ。", zh: "那家店的拉面很有名。" },
      culture: [], mnemonic: "「米塞」——便利店、拉面店、二手店都叫「店」。" },
    { id: "byouin", kana: "びょういん", kanji: "病院", romaji: "byouin", meaning: "医院", pos: "名词", category: "place", level: "N5",
      example: { ja: "頭が痛いので病院へ行きます。", zh: "头痛，去医院。" },
      culture: [], mnemonic: "病（びょう）+ 院（いん），和中文同形。" },
    { id: "ginkou", kana: "ぎんこう", kanji: "銀行", romaji: "ginkou", meaning: "银行", pos: "名词", category: "place", level: "N5",
      example: { ja: "銀行でお金を下ろします。", zh: "去银行取钱。" },
      culture: [], mnemonic: "「银（ぎん）行（こう）」——和中文读音神似。" },
    { id: "toshokan", kana: "としょかん", kanji: "図書館", romaji: "toshokan", meaning: "图书馆", pos: "名词", category: "place", level: "N5",
      example: { ja: "図書館で本を借りました。", zh: "在图书馆借了书。" },
      culture: [], mnemonic: "図（图）+ 書館——安静到只能翻书的地方。" },
    { id: "ie", kana: "いえ", kanji: "家", romaji: "ie", meaning: "家；房子", pos: "名词", category: "place", level: "N5",
      example: { ja: "家に帰ってお風呂に入る。", zh: "回家洗澡。" },
      culture: [], mnemonic: "「依诶」——回家说ただいま的地方。" },
    { id: "heya", kana: "へや", kanji: "部屋", romaji: "heya", meaning: "房间", pos: "名词", category: "place", level: "N5",
      example: { ja: "私の部屋は四畳半だ。", zh: "我的房间是四叠半大小。" },
      culture: [], mnemonic: "「嘿呀」——少女的房间、乐队的练习室，故事的舞台。" },
    { id: "machi", kana: "まち", kanji: "町", romaji: "machi", meaning: "城镇；街道", pos: "名词", category: "place", level: "N5",
      example: { ja: "この町は海が近い。", zh: "这个小镇离海很近。" },
      culture: ["mono-no-aware"], mnemonic: "日系青春片里的「町」，总是带着怀旧滤镜。" },

    // ---------- 学习 ----------
    { id: "benkyou", kana: "べんきょう", kanji: "勉強", romaji: "benkyou", meaning: "学习", pos: "名词/动词", category: "study", level: "N5",
      example: { ja: "日本語を勉強しています。", zh: "我在学日语。" },
      culture: [], mnemonic: "「本Q」——本网站存在的意义：勉強する。" },
    { id: "shiken", kana: "しけん", kanji: "試験", romaji: "shiken", meaning: "考试", pos: "名词", category: "study", level: "N5",
      example: { ja: "明日は日本語の試験がある。", zh: "明天有日语考试。" },
      culture: [], mnemonic: "JLPT 考试就叫「能力試験」，背完 200 词去应战。" },
    { id: "shukudai", kana: "しゅくだい", kanji: "宿題", romaji: "shukudai", meaning: "作业", pos: "名词", category: "study", level: "N5",
      example: { ja: "宿題を忘れてしまった。", zh: "忘了做作业。" },
      culture: [], mnemonic: "「休（しゅく）題（だい）」——放学后的头号敌人。" },
    { id: "kyoushitsu", kana: "きょうしつ", kanji: "教室", romaji: "kyoushitsu", meaning: "教室", pos: "名词", category: "study", level: "N5",
      example: { ja: "教室で友達と話した。", zh: "在教室里和朋友聊了天。" },
      culture: [], mnemonic: "校园番的舞台：窗边座位、黑板、放学后的教室。" },
    { id: "gakusei", kana: "がくせい", kanji: "学生", romaji: "gakusei", meaning: "学生", pos: "名词", category: "study", level: "N5",
      example: { ja: "私は大学生です。", zh: "我是大学生。" },
      culture: [], mnemonic: "「嘎哭塞」——学（がく）+ 生（せい），和中文同形。" },
    { id: "daigaku", kana: "だいがく", kanji: "大学", romaji: "daigaku", meaning: "大学", pos: "名词", category: "study", level: "N5",
      example: { ja: "大学で日本語を専攻する。", zh: "在大学专攻日语。" },
      culture: [], mnemonic: "「大（だい）学（がく）」——与中文几乎同音。" },
    { id: "jugyou", kana: "じゅぎょう", kanji: "授業", romaji: "jugyou", meaning: "课；上课", pos: "名词", category: "study", level: "N5",
      example: { ja: "授業が始まります。", zh: "要上课了。" },
      culture: [], mnemonic: "「就Q」——上课铃响前最后冲刺的那声「授業だ！」。" },
    { id: "tesuto", kana: "テスト", romaji: "tesuto", meaning: "测验；测试", pos: "名词", category: "study", level: "N5",
      example: { ja: "明日、単語のテストがある。", zh: "明天有单词测验。" },
      culture: [], mnemonic: "test 的片假名。本网站的背单词页就是你的単語テスト。" },

    // ---------- 物品 ----------
    { id: "hon", kana: "ほん", kanji: "本", romaji: "hon", meaning: "书", pos: "名词", category: "object", level: "N5",
      example: { ja: "この本は面白い。", zh: "这本书很有趣。" },
      culture: [], mnemonic: "「宏恩」——注意量词「本」也读ほん，一根、一本书都用它。" },
    { id: "kagi", kana: "かぎ", kanji: "鍵", romaji: "kagi", meaning: "钥匙", pos: "名词", category: "object", level: "N5",
      example: { ja: "鍵を忘れて家に入れない。", zh: "忘带钥匙进不了门。" },
      culture: [], mnemonic: "「卡gi」——放学回家掏钥匙的动作，日剧里常有。" },
    { id: "saifu", kana: "さいふ", kanji: "財布", romaji: "saifu", meaning: "钱包", pos: "名词", category: "object", level: "N5",
      example: { ja: "財布を落としてしまった。", zh: "把钱包弄丢了。" },
      culture: [], mnemonic: "「赛夫」——出门三件套：鍵・財布・スマホ（手机）。" },
    { id: "kasa", kana: "かさ", kanji: "傘", romaji: "kasa", meaning: "伞", pos: "名词", category: "object", level: "N5",
      example: { ja: "雨が降るから傘を持って行く。", zh: "要下雨了，带把伞去。" },
      culture: ["mono-no-aware"], mnemonic: "「卡撒」——雨天的透明伞，日系摄影经典道具。" },
    { id: "tokei", kana: "とけい", kanji: "時計", romaji: "tokei", meaning: "钟；手表", pos: "名词", category: "object", level: "N5",
      example: { ja: "時計を見ると三時だった。", zh: "一看表已经三点了。" },
      culture: [], mnemonic: "时（とき）计的合体：时间+测量工具。" },
    { id: "fuku", kana: "ふく", kanji: "服", romaji: "fuku", meaning: "衣服", pos: "名词", category: "object", level: "N5",
      example: { ja: "新しい服を買った。", zh: "买了新衣服。" },
      culture: [], mnemonic: "「夫哭」——制服、私服、痛T，都是「服」。" },
    { id: "kutsu", kana: "くつ", kanji: "靴", romaji: "kutsu", meaning: "鞋子", pos: "名词", category: "object", level: "N5",
      example: { ja: "靴を脱いで家に入る。", zh: "脱鞋进家门。" },
      culture: [], mnemonic: "进门脱鞋是日本生活仪式：「靴を脱ぐ」。" },
    { id: "keitai", kana: "けいたい", kanji: "携帯", romaji: "keitai", meaning: "手机", pos: "名词", category: "object", level: "N4",
      example: { ja: "携帯の充電が切れた。", zh: "手机没电了。" },
      culture: [], mnemonic: "「携（けい）帯（たい）」——随身携带的东西，现在特指手机。" },
    { id: "kaban", kana: "かばん", romaji: "kaban", meaning: "包；书包", pos: "名词", category: "object", level: "N5",
      example: { ja: "鞄に教科書を入れました。", zh: "把课本装进包里了。" },
      culture: [], mnemonic: "「卡邦」——上学、通勤都背着它，日语没有「背包」的叫法。" },

    // ---------- 颜色 ----------
    { id: "aka", kana: "あか", kanji: "赤", romaji: "aka", meaning: "红色", pos: "名词", category: "color", level: "N5",
      example: { ja: "赤い服が好きです。", zh: "我喜欢红色的衣服。" },
      culture: [], mnemonic: "「阿卡」——鸟居、神社、新年装饰，红色是日本传统色。" },
    { id: "ao", kana: "あお", kanji: "青", romaji: "ao", meaning: "蓝色；青（绿）", pos: "名词", category: "color", level: "N5",
      example: { ja: "青い空を見上げた。", zh: "仰望了蓝色的天空。" },
      culture: ["yugen"], mnemonic: "「阿哦」——青空、青信号（绿灯），日语里的青范围很广。" },
    { id: "shiro", kana: "しろ", kanji: "白", romaji: "shiro", meaning: "白色", pos: "名词", category: "color", level: "N5",
      example: { ja: "白い雲が流れている。", zh: "白云在流动。" },
      culture: [], mnemonic: "「西罗」——「真っ白な鳥のように」（《永遠》），纯白=自由。" },
    { id: "kuro", kana: "くろ", kanji: "黒", romaji: "kuro", meaning: "黑色", pos: "名词", category: "color", level: "N5",
      example: { ja: "黒い猫が夜に現れた。", zh: "黑猫在夜里出现了。" },
      culture: [], mnemonic: "「库罗」——与白成对，黑猫=夜晚的精灵。" },
    { id: "kiiro", kana: "きいろ", kanji: "黄色", romaji: "kiiro", meaning: "黄色", pos: "名词", category: "color", level: "N5",
      example: { ja: "黄色い花が咲いている。", zh: "黄色的花开了。" },
      culture: [], mnemonic: "黄色（きいろ）——小心和「嫌い（讨厌）」的发音区分。" },
    { id: "midori", kana: "みどり", kanji: "緑", romaji: "midori", meaning: "绿色", pos: "名词", category: "color", level: "N5",
      example: { ja: "緑の森が広がっている。", zh: "绿色的森林一望无际。" },
      culture: [], mnemonic: "「米多利」——信号灯、森林、抹茶都是「緑」。" },
    { id: "murasaki", kana: "むらさき", kanji: "紫", romaji: "murasaki", meaning: "紫色", pos: "名词", category: "color", level: "N4",
      example: { ja: "紫の空が好きだ。", zh: "我喜欢紫色的天空。" },
      culture: ["yugen"], mnemonic: "「穆拉萨ki」——黄昏与霓虹之间的颜色，新海诚滤镜常客。" },
    { id: "chairo", kana: "ちゃいろ", kanji: "茶色", romaji: "chairo", meaning: "棕色；茶色", pos: "名词", category: "color", level: "N5",
      example: { ja: "茶色い猫が日向で寝ている。", zh: "棕色的猫在阳光下睡觉。" },
      culture: [], mnemonic: "茶（ちゃ）+ 色（いろ）——茶水的颜色就是棕色。" },

    // ---------- 身体 ----------
    { id: "atama", kana: "あたま", kanji: "頭", romaji: "atama", meaning: "头；头脑", pos: "名词", category: "body", level: "N5",
      example: { ja: "頭がいい人はすごい。", zh: "头脑聪明的人真厉害。" },
      culture: [], mnemonic: "「阿塔玛」——頭がいい=聪明，摸头杀的对象。" },
    { id: "kao", kana: "かお", kanji: "顔", romaji: "kao", meaning: "脸", pos: "名词", category: "body", level: "N5",
      example: { ja: "顔を洗って朝ご飯を食べる。", zh: "洗脸吃早饭。" },
      culture: [], mnemonic: "「卡哦」——看脸色说「顔色をうかがう」。" },
    { id: "me", kana: "め", kanji: "目", romaji: "me", meaning: "眼睛", pos: "名词", category: "body", level: "N5",
      example: { ja: "目が悪いので眼鏡をかけている。", zh: "眼睛不好所以戴着眼镜。" },
      culture: [], mnemonic: "「咩」——记住它是名词「目」，和动词見る（看）同源。" },
    { id: "mimi", kana: "みみ", kanji: "耳", romaji: "mimi", meaning: "耳朵", pos: "名词", category: "body", level: "N5",
      example: { ja: "音楽を聴くときは耳が幸せ。", zh: "听音乐的时候耳朵最幸福。" },
      culture: ["vocaloid"], mnemonic: "「米米」——听（聞く）歌用的是耳（みみ）。" },
    { id: "kuchi", kana: "くち", kanji: "口", romaji: "kuchi", meaning: "嘴", pos: "名词", category: "body", level: "N5",
      example: { ja: "口に合いますか？", zh: "合口味吗？" },
      culture: [], mnemonic: "「哭泣」——「口に合う」=合口味，美食番高频句。" },
    { id: "te", kana: "て", kanji: "手", romaji: "te", meaning: "手", pos: "名词", category: "body", level: "N5",
      example: { ja: "手を繋いで歩こう。", zh: "牵着手走吧。" },
      culture: [], mnemonic: "「贴」——「手を繋ぐ」是无数情歌的经典画面。" },
    { id: "ashi", kana: "あし", kanji: "足", romaji: "ashi", meaning: "脚；腿", pos: "名词", category: "body", level: "N5",
      example: { ja: "足が疲れた。", zh: "脚好累。" },
      culture: [], mnemonic: "「阿西」——注意别和「明日（あした）」混在一起。" },
    { id: "kami", kana: "かみ", kanji: "髪", romaji: "kami", meaning: "头发", pos: "名词", category: "body", level: "N5",
      example: { ja: "髪を切りに行きたい。", zh: "想去剪头发。" },
      culture: [], mnemonic: "「卡米」——和「神（かみ）」同音，日语谐音梗素材。" },

    // ---------- 交通 ----------
    { id: "densha", kana: "でんしゃ", kanji: "電車", romaji: "densha", meaning: "电车", pos: "名词", category: "transport", level: "N5",
      example: { ja: "電車で学校へ行きます。", zh: "坐电车去学校。" },
      culture: [], mnemonic: "「登夏」——日本通勤通学的绝对主角，站台与车窗是无数故事发生地。" },
    { id: "basu", kana: "バス", romaji: "basu", meaning: "公交车", pos: "名词", category: "transport", level: "N5",
      example: { ja: "バスで町を巡る。", zh: "坐公交逛小镇。" },
      culture: [], mnemonic: "bus 的片假名，与電車一起组成通勤二件套。" },
    { id: "kuruma", kana: "くるま", kanji: "車", romaji: "kuruma", meaning: "汽车", pos: "名词", category: "transport", level: "N5",
      example: { ja: "車で海に行った。", zh: "开车去了海边。" },
      culture: [], mnemonic: "「库鲁玛」——公路片的标配，摇下车窗吹风。" },
    { id: "hikouki", kana: "ひこうき", kanji: "飛行機", romaji: "hikouki", meaning: "飞机", pos: "名词", category: "transport", level: "N5",
      example: { ja: "飛行機で日本に行きます。", zh: "坐飞机去日本。" },
      culture: [], mnemonic: "飛（ひ）+ 行（こう）+ 機（き）——会飞行的机器，和中文异曲同工。" },

    // ---------- 副词 ----------
    { id: "totemo", kana: "とても", romaji: "totemo", meaning: "很；非常", pos: "副词", category: "adv", level: "N5",
      example: { ja: "この曲はとても好きです。", zh: "我非常喜欢这首歌。" },
      culture: [], mnemonic: "「托忒莫」——万能程度副词，夸人夸歌都能用。" },
    { id: "sukoshi", kana: "すこし", kanji: "少し", romaji: "sukoshi", meaning: "一点点；稍微", pos: "副词", category: "adv", level: "N5",
      example: { ja: "日本語が少し話せます。", zh: "我会说一点日语。" },
      culture: [], mnemonic: "「斯扣西」——谦虚地回答「我会一点点」。" },
    { id: "itsumo", kana: "いつも", romaji: "itsumo", meaning: "总是；平时", pos: "副词", category: "adv", level: "N5",
      example: { ja: "いつも応援してくれてありがとう。", zh: "谢谢你一直为我应援。" },
      culture: ["oshi"], mnemonic: "「一茨莫」——推し活里最常说的感谢：いつもありがとう。" },
    { id: "chotto", kana: "ちょっと", romaji: "chotto", meaning: "稍微；一下", pos: "副词", category: "adv", level: "N5",
      example: { ja: "ちょっと待ってください。", zh: "请稍等一下。" },
      culture: [], mnemonic: "「俏托」——日语国民口头禅：ちょっと待って（等等）！" }
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
      words: ["yabai", "sugoi", "kakkoii", "oshi"] },
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
      words: ["takoyaki", "umi", "hana"] },
    { id: "vocaloid", ja: "ボカロ", zh: "VOCALOID / 术力口", tagline: "虚拟歌姬与 P 主共创的音乐生态", kind: "文化场景",
      summary: "VOCALOID 是雅马哈开发的歌声合成技术，2007 年初音ミク（初音未来）登场后引爆了「虚拟歌姬」热潮。创作者（被称为 P 主，如蝶々P、Wonder-K、EZFG）用软件作曲调声，让虚拟歌手「唱」自己的歌。niconico 上再生数破 10 万被称为殿堂曲、破 100 万为传说曲。中文圈习惯把 VOCALOID 曲统称为「术力口」。",
      extra: "延伸：虚拟歌手还有可不（CeVIO）、重音テト（UTAU）等；演唱会常用全息投影实现「虚拟歌姬登台」。",
      quote: "歌うのは、人間だけじゃない。",
      words: ["uta", "ongaku", "kashi", "utau", "kiku", "yume"] },
    { id: "kamitsubaki", ja: "神椿 / V.W.P", zh: "神椿工作室（V.W.P）", tagline: "花譜、理芽、春猿火、ヰ世界情緒——虚拟与音乐的结合", kind: "文化场景",
      summary: "神椿工作室（Kamitsubaki Studio）是运营虚拟歌手与音乐人的企划：虚拟歌姬组合 V.W.P 由花譜、理芽、春猿火、ヰ世界情緒、幸祜五人组成，另有可不、裏命、星界等「音乐的同位体」。カンザキイオリ、Guiano、香椎モイミ、MIMI 等 P 主都为其供曲。",
      extra: "延伸：V.W.P 的演唱会「不可解」系列以剧场级制作著称；本网站的 TERRA、食虫植物、永遠 等歌都出自神椿系。",
      quote: "音楽で、世界を繋ぐ。",
      words: ["uta", "oshi", "yume", "sabishii", "kokoro", "sekai"] },
    { id: "sekaiproject", ja: "プロジェクトセカイ", zh: "世界计划（Project SEKAI）", tagline: "虚拟歌姬与真人乐队同台演出的音游企划", kind: "文化场景",
      summary: "《世界计划 彩色舞台 feat. 初音未来》是 SEGA 与 Colorful Palette 开发的手机音游。玩家在「SEKAI」里与初音ミク等虚拟歌手互动，并为 25時、ナイトコードで。等原创乐队解锁曲目。群青讃歌、そこに在る、光。、とても痛い痛がりたい（SEKAI 版）等都与这个企划有关。",
      extra: "延伸：游戏里每支乐队都有自己的主题与故事，25時ナイトコードで。（通称 25 時）主打「在夜晚歌唱的孤独感」。",
      quote: "歌が、世界をつなぐ。",
      words: ["uta", "ongaku", "tomodachi", "yume", "sora"] },
    { id: "touhou", ja: "東方Project", zh: "东方Project", tagline: "ZUN 一人创作的弹幕游戏与庞大的同人音乐圈", kind: "文化场景",
      summary: "东方Project 是 ZUN（上海爱丽丝幻乐团）一人包办程序、音乐、设定的弹幕射击游戏系列，角色如博丽灵梦、雾雨魔理沙深入人心。东方拥有全球最庞大的同人创作生态之一，尤其以「二次创作音乐」闻名：IOSYS 的搞笑电波曲、森羅万象的流行摇滚等，都是东方同人音乐的招牌。",
      extra: "延伸：东方同人曲常见角色主题曲改编（アレンジ），明日なき暴走、メイドノココロハ アヤツリドール 都属此类。",
      quote: "幻想郷の音楽は、終わらない。",
      words: ["uta", "ongaku", "tori", "yume", "tanoshii"] }
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
