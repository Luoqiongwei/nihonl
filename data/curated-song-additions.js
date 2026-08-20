/* 人工兜底查证的歌曲。
 *
 * 这些条目来自自动检索链未命中的队列；经“标题/歌手消歧 → 日语歌词确认 →
 * 第二来源或官方元数据核对”后收录。这里只保存教学所需的短节选与来源 URL，
 * 不保存整篇第三方歌词。
 */

const songs = [
  {
    id: 'gousei-suru-mirai', title: '合成するミライ', romajiTitle: 'Gousei Suru Mirai',
    artist: '初音ミク', producer: '阿修（作詞・作曲）', year: 2024, project: 'VOCALOID',
    excerpt: [['世界の秘密を一つ暴くように', '仿佛要揭开世界的一个秘密'], ['未来へ繋ぐ', '连接向未来']],
    points: [['秘密を暴く', '揭开秘密', '「暴く」表示揭露隐藏的事实。', 'sekai'], ['未来へ繋ぐ', '连接向未来', '「へ」标示方向；「繋ぐ」是连接。', 'mirai']],
    words: ['sekai', 'mirai'], source: ['初音ミク Wiki', 'https://w.atwiki.jp/hmiku/pages/60449.html']
  },
  {
    id: 'shinkuu-toshi', title: '真空都市', romajiTitle: 'Shinkuu Toshi',
    artist: 'ナナツカゼ', producer: 'ナナツカゼ（作詞・作曲）', year: 2025, project: 'J-POP',
    excerpt: [['此処は真空都市', '这里是真空都市'], ['また創造していくんだ', '还要继续创造下去']],
    points: [['此処は', '这里是', '「此処」是「ここ」的汉字写法。', 'machi'], ['〜ていく', '继续向前…', '表示动作从现在向未来延续。', 'mirai']],
    words: ['machi', 'mirai'], source: ['TuneCore Japan（官方歌词页）', 'https://linkco.re/ZtCDfQ0D/songs/4024424/lyrics?lang=ja']
  },
  {
    id: 'lando', title: 'L∧NNDØ', romajiTitle: 'Lando',
    artist: 'sasalasa / sasakure.UK / lasah', producer: 'lasah（作詞）・sasakure.UK（作曲）', year: 2022, project: 'J-POP',
    excerpt: [['遠い昔に憧れたお伽話は', '很久以前所憧憬的童话'], ['君だけ「本当」だった', '只有你是真实的']],
    points: [['遠い昔', '遥远的过去', '时间表达，「昔」指从前。', 'kinou'], ['君だけ', '只有你', '「だけ」表示限定。', 'tomodachi']],
    words: ['kinou', 'tomodachi'], source: ['TuneCore Japan / PetitLyrics', 'https://petitlyrics.com/lyrics/3098536']
  },
  {
    id: 'natsu-ni-toumei', title: '夏に透明', romajiTitle: 'Natsu ni Toumei',
    artist: '初音ミク', producer: 'Twinfield（作詞・作曲）', year: 2025, project: 'VOCALOID',
    excerpt: [['自転車をこいで', '骑着自行车'], ['鈴の音で気づいてほしいよ', '希望你能听见铃声注意到我']],
    points: [['〜てほしい', '希望别人做…', '表达希望对方采取某个动作。', 'kiku'], ['気づく', '注意到', '常与助词「に」搭配表示注意到对象。', 'miru']],
    words: ['kiku', 'miru', 'natsu'], source: ['萌娘百科（歌词与作品信息）', 'https://moegirl.icu/%E4%B8%96%E7%95%8C%E8%AE%A1%E5%88%92%E8%99%9A%E6%8B%9F%E6%AD%8C%E6%89%8B%E6%BC%94%E5%94%B1%E6%AD%8C%E6%9B%B2/%E5%8E%9F%E5%88%9B%E6%AD%8C%E6%9B%B23']
  },
  {
    id: 'colorcode-f', title: 'ColorCode-F', romajiTitle: 'ColorCode-F',
    artist: 'PIKASONIC feat. Felt', producer: 'PIKASONIC（作曲）・Felt（作詞）', year: 2021, project: 'J-POP',
    excerpt: [['君の夢はどんな色をしているのでしょう', '你的梦想会是什么颜色'], ['君だけの色がある', '你有只属于自己的颜色']],
    points: [['どんな色', '什么样的颜色', '「どんな＋名词」询问性质或种类。', 'ao'], ['君だけの', '只属于你的', '「だけ」限定范围。', 'jibun']],
    words: ['yume', 'jibun'], source: ['Shazam（歌词与作品信息）', 'https://www.shazam.com/en-us/song/1587316998/colorcode-f-feat-felt']
  },
  {
    id: 'mu-tachiiri-kinshi', title: '無', romajiTitle: 'Mu',
    artist: '歌愛ユキ / 詩岸', producer: '立入禁止（作詞・作曲）', year: 2023, project: 'VOCALOID',
    excerpt: [['僕らの居場所はどこなんだ', '我们的归处究竟在哪里'], ['空っぽな僕の体', '我这空荡荡的身体']],
    points: [['どこなんだ', '到底在哪里', '「んだ」带解释或追问语气。', null], ['空っぽ', '空无一物', '名词、形容动词式用法，形容内部空空。', 'jibun']],
    words: ['jibun', 'kokoro'], source: ['作者 YouTube 投稿（歌词）', 'https://www.youtube.com/watch?v=SOznQVt6hR0']
  },
  {
    id: 'aristolast', title: 'アリストラスト', romajiTitle: 'Aristolast',
    artist: '初音ミク', producer: 'n-buna（作詞・作曲）', year: 2012, project: 'VOCALOID',
    excerpt: [['君に届きはしない唄', '无法传达到你那里的歌'], ['僕が作った愛の言葉', '由我写下的爱之言语']],
    points: [['届きはしない', '绝对传达不到', '「は」插入否定句可加强对比和强调。', 'uta'], ['愛の言葉', '爱的话语', '「AのB」表示所属或性质。', 'koi']],
    words: ['uta', 'koi'], source: ['PetitLyrics', 'https://petitlyrics.com/lyrics/1194709']
  },
  {
    id: 'shinitakatta-kyou', title: '私が死にたかった今日は誰かが生きたかった明日らしい', romajiTitle: 'Watashi ga Shinitakatta Kyou wa Dareka ga Ikitakatta Ashita Rashii',
    artist: 'はるな。feat. 海恋', producer: 'はるな。（作詞・作曲）', year: 2025, project: 'J-POP',
    excerpt: [['私が死にたかった今日', '我曾想死去的今天'], ['誰かが生きたかった明日らしい', '似乎是某人想活到的明天']],
    points: [['〜たかった', '曾经想要…', '愿望助动词「たい」的过去式。', 'kinou'], ['〜らしい', '好像；听说', '表示根据线索作出的判断。', 'ashita']],
    words: ['kinou', 'ashita', 'inochi'], source: ['PetitLyrics', 'https://petitlyrics.com/lyrics/3828970']
  },
  {
    id: 'overkill-nazoj', title: 'オーバーキル！', romajiTitle: 'Overkill!',
    artist: '鏡音リン', producer: '謎J（作詞・作曲）', year: 2023, project: 'VOCALOID',
    excerpt: [['暗い棺の中眠ってました', '曾睡在黑暗的棺材里'], ['もう反省してるの', '我已经在反省了']],
    points: [['眠ってました', '曾经睡着', '「眠っていました」的口语缩略。', 'nemuru'], ['もう〜てる', '已经在…', '「〜ている」口语中常缩为「〜てる」。', 'ima']],
    words: ['nemuru', 'ima'], source: ['初音ミク Wiki', 'https://w.atwiki.jp/hmiku/pages/59888.html']
  },
  {
    id: 'split-danzi', title: 'SPLIT', romajiTitle: 'Split',
    artist: '重音テトSV / 初音ミク', producer: 'DANZI（作詞・作曲）', year: 2025, project: 'VOCALOID',
    excerpt: [['君の臆病が僕を生み出した', '你的怯懦创造了我'], ['君の勇気が僕を否定した', '你的勇气否定了我']],
    points: [['〜が僕を', '…把我…', '「が」标主语，「を」标动作对象。', 'jibun'], ['生み出す', '创造；产生', '由「生む」与「出す」组成的复合动词。', 'inochi']],
    words: ['jibun', 'inochi'], source: ['作者 YouTube 投稿（歌词）', 'https://www.youtube.com/watch?v=Fo5Tje4wYg8']
  },
  {
    id: 'toka-no-hana', title: '十夏の花', romajiTitle: 'Toka no Hana',
    artist: 'HoneyComeBear', producer: 'Kaako（作詞）・Kaako / Monkey（作曲）', year: 2021, project: 'J-POP',
    excerpt: [['遠い祭囃子を風が運んだ', '风送来了远处的祭典乐声'], ['君は夏そのものだ', '你就是夏天本身']],
    points: [['風が運んだ', '风送来了', '自然现象作主语时也使用「が」。', 'kaze'], ['そのもの', '本身；本体', '强调完全就是前述事物。', 'natsu']],
    words: ['kaze', 'natsu'], source: ['PetitLyrics', 'https://petitlyrics.com/lyrics/3025552']
  },
  {
    id: 'sugiyuku-hi-to-kimi-e', title: '過ぎゆく日と君へ', romajiTitle: 'Sugiyuku Hi to Kimi e',
    artist: 'Aiobahn feat. nayuta', producer: 'Aiobahn', year: 2018, project: 'J-POP',
    excerpt: [['何気ない言葉が未来を紡ぐ', '平常的话语编织着未来'], ['涙は似合わない', '眼泪并不适合你']],
    points: [['何気ない', '不经意的；平常的', '常用来形容日常中看似普通的事物。', 'mainichi'], ['未来を紡ぐ', '编织未来', '「紡ぐ」原指纺线，也常用于抽象事物。', 'mirai']],
    words: ['mainichi', 'mirai'], source: ['作者官方 YouTube 投稿（歌词）', 'https://www.youtube.com/watch?v=n5Jv-FFhfDU']
  },
  {
    id: 'teien-nite', title: '庭園にて。', romajiTitle: 'Teien nite',
    artist: 'GUMI / 初音ミク / 巡音ルカ', producer: 'acane_madder（作詞・作曲）', year: 2011, project: 'VOCALOID',
    excerpt: [['言葉はいらない', '不需要言语'], ['歌うよライライライライ', '唱吧，啦依啦依啦依啦依']],
    points: [['〜はいらない', '不需要…', '「要る」的否定形表示不需要。', 'hanasu'], ['歌うよ', '要唱哦', '句尾「よ」用于告知或强调。', 'utau']],
    words: ['hanasu', 'utau'], source: ['VOCALOID 中文歌词 Wiki', 'https://w.atwiki.jp/vocaloidchly/pages/4774.html']
  },
  {
    id: 'tenkyuu-no-musica', title: '天球のMúsica', romajiTitle: 'Tenkyuu no Musica',
    artist: 'Ave Mujica', producer: "Diggy-MO'（作詞）", year: 2025, project: '动漫歌曲',
    excerpt: [['ゆこう 明日へと', '走吧，向着明天'], ['鮮やかな夜明けとともに', '伴随着鲜明的黎明']],
    points: [['明日へと', '向着明天', '「へと」比单独「へ」更强调方向。', 'ashita'], ['〜とともに', '伴随着…', '表示两件事物或变化同时发生。', 'asahi']],
    words: ['ashita', 'asahi'], source: ['J-Lyric', 'https://j-lyric.net/artist/a0651f8/l064740.html']
  },
  {
    id: 'shidarezakura-anna', title: '枝垂桜', romajiTitle: 'Shidarezakura',
    artist: 'Anna', producer: 'Anna（作詞・作曲）', year: 2021, project: 'J-POP',
    excerpt: [['桜の花が咲いていた', '樱花开了'], ['今、新しい春を待つ', '现在等待新的春天']],
    points: [['咲いていた', '曾经开着', '「〜ていた」表示过去持续的状态。', 'hana'], ['春を待つ', '等待春天', '「待つ」的对象用「を」标记。', 'atarashii']],
    words: ['hana', 'atarashii'], source: ['歌ネット', 'https://www.uta-net.com/song/302253/']
  },
  {
    id: 'muyuu-tayori', title: '夢遊', romajiTitle: 'Muyuu',
    artist: 'tayori', producer: 'raku（作詞・作曲）', year: 2024, project: 'J-POP',
    excerpt: [['この夢が覚めたら', '如果从这场梦中醒来'], ['月明りが照らしている', '月光正照耀着']],
    points: [['〜たら', '如果…；当…之后', '接过去形构成条件表达。', 'yume'], ['照らしている', '正照耀着', '「〜ている」表示持续状态。', 'tsuki']],
    words: ['yume', 'tsuki'], source: ['JOOX（歌词页）', 'https://www.joox.com/hk/single/GCap7dIKk4ilmRsSaCR9XQ%3D%3D']
  },
  {
    id: 'hachigatsu-no-hotaru', title: '八月の蛍', romajiTitle: 'Hachigatsu no Hotaru',
    artist: 'HACHI', producer: '海野水玉（作詞・作曲）', year: 2021, project: 'J-POP',
    excerpt: [['花火の音を遠くで聴いた', '在远方听见了烟花声'], ['僕は八月の蛍火', '我是八月的萤火']],
    points: [['遠くで聴いた', '在远处听见了', '「で」标示动作发生的地点。', 'kiku'], ['蛍火', '萤火', '「蛍」是萤火虫，「火」描写其光。', 'hikari']],
    words: ['kiku', 'hikari', 'natsu'], source: ['PetitLyrics', 'https://petitlyrics.com/lyrics/3034043']
  },
  {
    id: 'rainy-proof', title: 'Rainy proof', romajiTitle: 'Rainy proof',
    artist: 'HACHI', producer: '海野水玉（作詞・作曲）', year: 2020, project: 'J-POP',
    excerpt: [['涙が止まるまで', '直到泪水停止'], ['雨音が強くなる', '雨声越来越响']],
    points: [['〜まで', '直到…为止', '标示动作或状态持续的终点。', 'naku'], ['強くなる', '变强；变响', '形容词去「い」加「くなる」表示变化。', 'ame']],
    words: ['naku', 'ame'], source: ['Cifra Club（歌词）', 'https://www.cifraclub.com/hachi/rainy-proof/letra/']
  },
  {
    id: 'suisei-orangestar', title: '水星', romajiTitle: 'Suisei',
    artist: 'Orangestar feat. IA', producer: 'Orangestar（作詞・作曲）', year: 2017, project: 'VOCALOID',
    excerpt: [['はらはら 波の音', '簌簌的浪声'], ['君が居ない物語で', '在没有你的故事里']],
    points: [['はらはら', '簌簌；纷纷', '拟态词，可描写轻物飘落或不安。', 'umi'], ['君が居ない', '你不在', '存在动词「居る」的否定形。', 'tomodachi']],
    words: ['umi', 'tomodachi'], source: ['歌ネット', 'https://www.uta-net.com/song/222354/']
  },
  {
    id: 'kaitou-mimi', title: '解答', romajiTitle: 'Kaitou',
    artist: 'MIMI feat. わん子', producer: 'MIMI（作詞・作曲）', year: 2024, project: 'J-POP',
    excerpt: [['今日だって不正解だ', '今天也仍是不正确答案'], ['模範解答少しだけ教えて', '请稍微告诉我标准答案']],
    points: [['〜だって', '即使…也；就连…', '此处强调“今天也是如此”。', 'kyou'], ['少しだけ', '只要一点点', '「だけ」限制数量。', 'sukoshi']],
    words: ['kyou', 'sukoshi'], source: ['作者官方 YouTube 投稿（歌词）', 'https://www.youtube.com/watch?v=ZiUwbmrMiAY']
  },
  {
    id: 'prism-cube', title: 'プリズムキューブ', romajiTitle: 'Prism Cube',
    artist: '初音ミク', producer: 'wowaka（作詞・作曲）', year: 2011, project: 'VOCALOID',
    excerpt: [['暗い世界から', '从黑暗的世界'], ['僕に「泣いて」って言うんだ', '对我说“哭吧”']],
    points: [['〜から', '从…', '这里表示空间上的起点。', 'sekai'], ['〜って言う', '说…', '「って」是引用助词「と」的口语形式。', 'naku']],
    words: ['sekai', 'naku'], source: ['Vocaloid Lyrics Wiki', 'https://vocaloidlyrics.fandom.com/wiki/%E3%83%97%E3%83%AA%E3%82%BA%E3%83%A0%E3%82%AD%E3%83%A5%E3%83%BC%E3%83%96_(Prism_Cube)']
  },
  {
    id: 'aimaisa-kaihi', title: '曖昧さ回避', romajiTitle: 'Aimaisa Kaihi',
    artist: '闇音レンリ', producer: 'ポリスピカデリー（作詞・作曲）', year: 2017, project: 'VOCALOID',
    excerpt: [['気持ちを掻き出して欲しい', '希望你把这份心情挖出来'], ['君のそばじゃないと意味が無いよ', '不在你身边就没有意义']],
    points: [['〜て欲しい', '希望你…', '对他人的动作表达愿望。', 'kokoro'], ['〜じゃないと', '如果不是…就…', '口语条件表达，后接不理想结果。', 'tomodachi']],
    words: ['kokoro', 'tomodachi'], source: ['UtaTen', 'https://utaten.com/lyric/xc17112202/']
  },
  {
    id: 'indoor-kei-trackmaker', title: 'インドア系ならトラックメイカー', romajiTitle: 'Indoor Kei Nara Trackmaker',
    artist: 'Yunomi feat. nicamoq', producer: 'Yunomi / nicamoq（作詞・作曲）', year: 2018, project: 'J-POP',
    excerpt: [['マイハウス is 段ボール', '我的房子是纸箱'], ['納期は明日だ 絶対徹夜', '交期是明天，绝对要通宵']],
    points: [['〜なら', '如果是…的话', '提示前提或话题。', 'ie'], ['明日だ', '是明天', '名词句的简体断定。', 'ashita']],
    words: ['ie', 'ashita'], source: ['歌ネット', 'https://www.uta-net.com/song/327064/']
  },
  {
    id: 'bokura-no-tsuzuki', title: '僕らのつづき', romajiTitle: 'Bokura no Tsuzuki',
    artist: '初音ミクAppend', producer: 'じょん（作詞・作曲）', year: 2011, project: 'VOCALOID',
    excerpt: [['涙はまだ果てを知らないで', '泪水还不知道尽头'], ['忘れないで 夢を', '请不要忘记梦想']],
    points: [['〜ないで', '请不要…', '动词否定形加「で」构成请求。', 'yume'], ['果てを知らない', '不知道尽头', '「果て」表示终点或极限。', 'naku']],
    words: ['yume', 'naku'], source: ['初音ミク Wiki', 'https://w.atwiki.jp/hmiku/pages/19794.html']
  },
  {
    id: 'shironeko-kaizokusen', title: '白猫海賊船', romajiTitle: 'Shironeko Kaizokusen',
    artist: 'Yunomi feat. 日南結里', producer: 'Yunomi（作曲）', year: 2019, project: 'J-POP',
    excerpt: [['群青色の空', '群青色的天空'], ['追い風に白い帆を上げよう', '迎着顺风扬起白帆吧']],
    points: [['群青色', '群青色', '深而鲜明的蓝色。', 'ao'], ['〜よう', '来…吧', '动词意志形可用于提议。', 'umi']],
    words: ['ao', 'umi'], source: ['Lyrhub（歌词）', 'https://lyrhub.com/track/Yunomi-feat-%E6%97%A5%E5%8D%97%E7%B5%90%E9%87%8C/%E7%99%BD%E7%8C%AB%E6%B5%B7%E8%B3%8A%E8%88%B9']
  },
  {
    id: 'sakurairo-canvas', title: '桜色キャンバス', romajiTitle: 'Sakurairo Canvas',
    artist: 'IA / 初音ミク / 結月ゆかり', producer: '綿飴（作詞・作曲）', project: 'VOCALOID',
    excerpt: [['桜の木の下 蕾を見つけた', '在樱树下发现了花蕾'], ['未来描いてた', '曾描绘着未来']],
    points: [['見つけた', '发现了', '「見つける」的过去形。', 'miru'], ['描いてた', '曾描绘着', '「描いていた」的口语缩略。', 'mirai']],
    words: ['miru', 'mirai', 'hana'], source: ['JOYSOUND', 'https://www.joysound.com/web/search/song/407772']
  },
  {
    id: 'ookami-to-shoujo', title: 'オオカミと少女', romajiTitle: 'Ookami to Shoujo',
    artist: '鎖那', producer: '鎖那（作詞）・TOKOTOKO（作曲）', year: 2017, project: 'J-POP',
    excerpt: [['雨粒のゆめ', '雨滴的梦'], ['ぼくは愚かな獣だ', '我是愚蠢的野兽']],
    points: [['雨粒', '雨滴', '「雨」与「粒」组成的复合名词。', 'ame'], ['〜だ', '是…', '名词和形容动词句的简体断定。', 'jibun']],
    words: ['ame', 'jibun'], source: ['J-Lyric', 'https://j-lyric.net/artist/a000000/l0431b8.html']
  },
  {
    id: 'tawagoto-speaker', title: '戯言スピーカー', romajiTitle: 'Tawagoto Speaker',
    artist: '初音ミクAppend', producer: 'ねこぼーろ（作詞・作曲）', year: 2011, project: 'VOCALOID',
    excerpt: [['詰め込んだ感情を', '把塞进去的感情'], ['君は知らないの 私の心を', '你不知道我的心']],
    points: [['詰め込む', '塞入；装进', '由「詰める」和「込む」构成。', 'kokoro'], ['知らない', '不知道', '「知る」的否定形不是「知っていない」。', 'jibun']],
    words: ['kokoro', 'jibun'], source: ['UtaTen', 'https://utaten.com/lyric/jb51209086/']
  },
  {
    id: 'odo-ado', title: '踊', romajiTitle: 'Odo',
    artist: 'Ado', producer: 'DECO*27（作詞）・Giga / TeddyLoid（作曲）', year: 2021, project: 'J-POP',
    excerpt: [['半端なら K.O.', '半吊子的话就出局'], ['もっと頑張って', '再努力一点']],
    points: [['〜なら', '如果是…', '提出假定条件。', 'odoru'], ['もっと', '更加；再…一点', '表示程度进一步增加。', 'totemo']],
    words: ['odoru', 'totemo'], source: ['歌ネット', 'https://www.uta-net.com/song/301298/']
  },
  {
    id: 'hai-yorokonde', title: 'はいよろこんで', romajiTitle: 'Hai Yorokonde',
    artist: 'こっちのけんと', producer: 'こっちのけんと（作詞・作曲）', year: 2024, project: 'J-POP',
    excerpt: [['はい 喜んで', '好的，乐意效劳'], ['あなた方のため', '为了各位']],
    points: [['喜んで', '乐意地；欣然', '来自「喜ぶ」的て形，常作固定应答。', 'ureshii'], ['〜のため', '为了…', '表示目的或受益对象。', 'tomodachi']],
    words: ['ureshii', 'tomodachi'], source: ['官方 MV', 'https://www.youtube.com/watch?v=jzi6RNVEOtA']
  },
  {
    id: 'ringing-bloom', title: 'Ringing Bloom', romajiTitle: 'Ringing Bloom',
    artist: 'Roselia', producer: '織田あすか（作詞）・藤永龍太郎（作曲）', year: 2019, project: '动漫歌曲',
    excerpt: [['私を動かすのは この居場所', '推动我前进的是这个归处'], ['未来への道を照らす', '照亮通往未来的道路']],
    points: [['私を動かす', '推动我', '使役意义的他动词表达。', 'jibun'], ['未来への道', '通往未来的路', '「へ」与「の」组合修饰名词。', 'mirai']],
    words: ['jibun', 'mirai'], source: ['歌ネット', 'https://www.uta-net.com/song/270944/']
  },
  {
    id: 'dango-daikazoku', title: 'だんご大家族', romajiTitle: 'Dango Daikazoku',
    artist: '茶太', producer: '麻枝准（作詞・作曲）', year: 2007, project: '动漫歌曲',
    excerpt: [['みんなあわせて百人家族', '大家合在一起就是百人家族'], ['大きなまるい輪になるよ', '会围成一个大大的圆圈']],
    points: [['みんなあわせて', '大家合在一起', '「あわせて」表示合并或合计。', 'hyaku'], ['〜になる', '变成…', '表示状态或身份变化。', 'dango']],
    words: ['hyaku', 'dango'], source: ['歌ネット', 'https://www.uta-net.com/song/58613/']
  },
  {
    id: 'tsugihagi-staccato', title: 'ツギハギスタッカート', romajiTitle: 'Tsugihagi Staccato',
    artist: '初音ミク', producer: 'とあ（作詞・作曲）', year: 2014, project: 'VOCALOID',
    excerpt: [['君との時間も', '与你一起的时间'], ['そろそろ終わりにしよう', '差不多该让它结束了']],
    points: [['そろそろ', '差不多该…', '表示某个时机即将到来。', 'ima'], ['〜にしよう', '就决定为…吧', '「する」意志形表示决定或提议。', 'tomodachi']],
    words: ['ima', 'tomodachi'], source: ['初音ミク Wiki', 'https://w.atwiki.jp/hmiku/pages/29529.html']
  },
  {
    id: 'one-hundredth-ai', title: '1/100のアイ', romajiTitle: 'Hyaku-bun no Ichi no Ai',
    artist: '初音ミク', producer: 'すりぃ（作詞・作曲）', year: 2018, project: 'VOCALOID',
    excerpt: [['1mmの愛を思い出が10倍に', '一毫米的爱被回忆放大十倍'], ['僕等は愛と感じるんだ', '我们会把它感受为爱']],
    points: [['〜と感じる', '感到是…', '用引用助词「と」标记感受的内容。', 'kokoro'], ['〜んだ', '是因为…；就是…', '「のだ」的口语形式，用于说明或强调。', 'koi']],
    words: ['koi', 'kokoro'], source: ['初音ミク Wiki', 'https://w.atwiki.jp/hmiku/pages/37711.html']
  },
  {
    id: 'chuu-de-oyasumi', title: '宙でおやすみ', romajiTitle: 'Chuu de Oyasumi',
    artist: 'Aiobahn feat. 長瀬有花', producer: 'にゃるら（作詞）・Aiobahn（作曲）', year: 2023, project: 'J-POP',
    excerpt: [['聞こえますか 星の声', '能听见吗，星星的声音'], ['蝶の羽根で おやすみなさい', '在蝴蝶的翅膀上说晚安']],
    points: [['聞こえますか', '能听见吗', '「聞こえる」表示声音自然进入耳中。', 'hoshi'], ['おやすみなさい', '晚安', '睡前使用的固定寒暄语。', 'oyasumi']],
    words: ['hoshi', 'oyasumi'], source: ['Aiobahn 官方 Bandcamp', 'https://aiobahn.bandcamp.com/album/feat']
  },
  {
    id: 'towa-no-utage', title: '永久の宴', romajiTitle: 'Towa no Utage',
    artist: 'Aiobahn feat. YUC’e', producer: 'YUC’e（作詞・作曲）', year: 2016, project: 'J-POP',
    excerpt: [['今宵も宴は続いて', '今夜宴会仍在继续'], ['貴方と一緒にいたい', '想和你在一起']],
    points: [['〜は続いて', '…继续着', '「続く」的て形连接后续状态。', 'yoru'], ['〜と一緒にいたい', '想和…在一起', '「たい」接动词连用形表达愿望。', 'tomodachi']],
    words: ['yoru', 'tomodachi'], source: ['YUC’e 官方作品页', 'https://yyucee.wixsite.com/yuce/works']
  },
  {
    id: 'paradox-hanakyo', title: 'paradøx', romajiTitle: 'Paradox',
    artist: '花鋏キョウ', producer: 'ポリスピカデリー（作詞・作曲）', year: 2019, project: 'J-POP',
    excerpt: [['互いに誤魔化していたよ', '彼此一直在蒙混掩饰'], ['似たもの同士わかり合いたいだけ', '相似的两个人只是想互相理解']],
    points: [['互いに', '彼此；互相', '副词性表达，表示双方相互作用。', 'tomodachi'], ['〜たいだけ', '只是想…', '「たい」表达愿望，「だけ」限定范围。', 'kokoro']],
    words: ['tomodachi', 'kokoro'], source: ['官方 MV', 'https://www.youtube.com/watch?v=uQ0r3pXPYFE']
  },
  {
    id: 'three-queens', title: 'スリークイーンズ ～吸血女王伝～', romajiTitle: 'Three Queens: Kyuuketsu Joouden',
    artist: '初音ミク / 鏡音リン / 巡音ルカ / KAITO', producer: 'いーえるP @ TinySymphony（作詞・作曲）', year: 2011, project: 'VOCALOID',
    excerpt: [['霧に閉ざされた城に', '在被雾封闭的城堡里'], ['美しき三人の王女が住まう', '住着三位美丽的公主']],
    points: [['〜に閉ざされた', '被…封闭的', '被动形过去式修饰后面的名词。', 'hikari'], ['美しき', '美丽的', '文语形，现代口语通常说「美しい」。', 'utsukushii']],
    words: ['hikari', 'utsukushii'], source: ['初音ミク Wiki', 'https://w.atwiki.jp/hmiku/pages/14035.html']
  },
  {
    id: 'koi-no-sainou', title: '恋の才能', romajiTitle: 'Koi no Sainou',
    artist: '初音ミクAppend Dark', producer: 'とあ（作詞・作曲）', year: 2014, project: 'VOCALOID',
    excerpt: [['キラキラした君が大好きです', '最喜欢闪闪发光的你'], ['恋の才能なんてないよ', '我并没有什么恋爱的才能']],
    points: [['大好きです', '非常喜欢', '「好き」前加「大」表示很喜欢。', 'koi'], ['〜なんてない', '才没有什么…', '「なんて」带有轻视、意外或强调语气。', 'kokoro']],
    words: ['koi', 'kokoro'], source: ['初音ミク Wiki', 'https://w.atwiki.jp/hmiku/pages/30921.html']
  },
  {
    id: 'hansei-koukai-nashi', title: '反省はしていない、そして後悔もしていない。', romajiTitle: 'Hansei wa Shiteinai, Soshite Koukai mo Shiteinai',
    artist: '重音テト', producer: '青谷（作詞・作曲）', project: 'UTAU',
    excerpt: [['今を生きてはいるが', '虽然活在当下'], ['良くない！けど悪くはないか！', '是不太好！但也不算坏吧！']],
    points: [['〜てはいる', '确实在…；虽在…', '在持续状态上添加对比或限定语感。', 'ima'], ['〜けど', '但是；不过', '口语转折，也可把后半句留给听者推断。', 'yabai']],
    words: ['ima', 'yabai'], source: ['UtaTen', 'https://utaten.com/lyric/rq20100707/']
  },
  {
    id: 'deepstaria-enigmatica', title: 'ディープスタリア・エニグマティカ', romajiTitle: 'Deepstaria Enigmatica',
    artist: 'flower', producer: '軽井さん（作詞・作曲）', year: 2021, project: 'VOCALOID',
    excerpt: [['僕らの信号を分かり合っていられるの？', '我们还能理解彼此的信号吗？'], ['不規則な光の中で', '在不规则的光芒之中']],
    points: [['分かり合う', '互相理解', '动词连用形加「合う」表示相互进行。', 'tomodachi'], ['〜の中で', '在…之中', '表示动作或状态所在的范围。', 'hikari']],
    words: ['tomodachi', 'hikari'], source: ['官方 MV', 'https://www.youtube.com/watch?v=cCGDnCkNzow']
  },
  {
    id: 'instant-love-lapriere', title: 'Instant Love', romajiTitle: 'Instant Love',
    artist: 'La prière', producer: '棗いつき（作詞）・aran（作曲）', year: 2021, project: 'J-POP',
    excerpt: [['損得勘定論 割り切ってリサーチ＆サーチ', '权衡得失，干脆地调查和搜索'], ['インスタントな愛がほしいの', '我想要即时的爱']],
    points: [['割り切って', '想开后；干脆地', '「割り切る」的て形，在这里连接后续动作。', 'koi'], ['〜がほしい', '想要…', '用助词「が」标记想要的对象。', 'kokoro']],
    words: ['koi', 'kokoro'], source: ['La prière 官方作品页', 'https://lapriere.jp/information/discographys/instant-love']
  },
  {
    id: 'heroine-pikasonic', title: 'ヒロイン', romajiTitle: 'Heroine',
    artist: 'PIKASONIC / nakotanmaru', producer: 'nakotanmaru（作詞）・PIKASONIC（作曲）', year: 2022, project: 'J-POP',
    excerpt: [['僕はいつも 不器用な笑みを', '我总是露出笨拙的笑容'], ['この歌に乗せてみるよ', '试着把它寄托在这首歌里']],
    points: [['僕はいつも', '我总是…', '「いつも」表示动作或状态经常发生。', 'jibun'], ['〜てみる', '试着…', '动词て形加「みる」表示尝试。', 'uta']],
    words: ['jibun', 'uta'], source: ['TuneCore Japan', 'https://linkco.re/Vx6QmSqX/songs/1831143/lyrics?lang=ja']
  },
  {
    id: 'kanojo-wa-tabi-ni-deru', title: '彼女は旅に出る', romajiTitle: 'Kanojo wa Tabi ni Deru',
    artist: '鎖那', producer: '鎖那（作詞・作曲）', project: 'J-POP',
    excerpt: [['白昼夢 繋いでいて', '请让白日梦延续着'], ['どこへいこう どこへいこう', '要去哪里呢，要去哪里呢']],
    points: [['〜ていて', '请保持…', 'て形加「いる」表示持续状态；此处带请求语气。', 'yume'], ['〜へいこう', '去往…吧', '方向助词「へ」加「行く」的意志形。', 'iku']],
    words: ['yume', 'iku'], source: ['J-Lyric', 'https://j-lyric.net/artist/a05d6c1/l0431b5.html']
  },
  {
    id: 'utopia-tayori', title: 'ユートピア', romajiTitle: 'Utopia',
    artist: 'tayori', producer: 'raku（作詞・作曲）', year: 2024, project: 'J-POP',
    excerpt: [['波が攫うつま先', '海浪掠过脚尖'], ['それはまるでおとぎ話のよう', '那简直就像童话一样']],
    points: [['まるで〜よう', '简直像…一样', '常与比况表达「ようだ」搭配。', 'yume'], ['〜てしまえたら', '如果能够彻底…', '「てしまう」的可能形加假定「たら」。', 'kokoro']],
    words: ['yume', 'kokoro'], source: ['歌ネット', 'https://www.uta-net.com/song/380479/']
  },
  {
    id: 'shiva-heaven-burns-red', title: 'シヴァ', romajiTitle: 'Shiva',
    artist: 'やなぎなぎ', producer: '麻枝准（作詞・作曲）・MANYO（編曲）', year: 2023, project: '游戏歌曲',
    excerpt: [['何かが起きそうで何も起きなくて', '仿佛会发生什么，却什么也没发生'], ['ひとりでも世界を変えてみせる', '即使独自一人也一定要改变世界']],
    points: [['〜そうで', '看起来像要…', '动词ます形去「ます」加「そう」表示样态。', 'sekai'], ['〜てみせる', '一定要做给人看', '表达说话人的强烈意志或决心。', 'jibun']],
    words: ['sekai', 'jibun'], source: ['TuneCore Japan', 'https://linkco.re/Ty8RFb36/songs/2222293/lyrics?lang=ja']
  },
  {
    id: 'x-taira-aoi', title: 'x', romajiTitle: 'X',
    artist: '平葵', producer: 'タイラトシユキ（作詞）・平葵 / タイラトシユキ / 小唄（作曲）', year: 2025, project: 'J-POP',
    excerpt: [['夢なんて見せないでよ', '别让我看什么梦想了'], ['昔も今もずっと絵空事で', '无论过去还是现在都一直只是幻想']],
    points: [['〜なんて', '什么…之类的', '把话题举出，并带有轻视或强烈感情色彩。', 'yume'], ['〜ないで', '不要…', '否定形加「で」可表达禁止或不做某事。', 'ima']],
    words: ['yume', 'ima'], source: ['TuneCore Japan', 'https://linkco.re/8E099S89/songs/4134579/lyrics?lang=ja']
  },
  {
    id: 'cheer-up-hearts-up', title: 'CHEER UP! HEARTS UP!', romajiTitle: 'Cheer Up! Hearts Up!',
    artist: '望月杏奈 / 矢吹可奈 / 天海春香 / ジュリア', producer: 'nobara kaede（作詞）・渡辺泰司（作曲）', year: 2022, project: '游戏歌曲',
    excerpt: [['輝くキミが好き', '喜欢闪闪发光的你'], ['大丈夫！自分信じて', '没问题！相信自己']],
    points: [['〜が好き', '喜欢…', '用助词「が」标记喜欢的对象。', 'koi'], ['自分信じて', '相信自己', '口语歌词省略了宾语助词「を」。', 'jibun']],
    words: ['koi', 'jibun'], source: ['歌ネット', 'https://www.uta-net.com/song/320883/']
  },
  {
    id: 'koibito-o-uchiotoshita-hi', title: '恋人を射ち堕とした日', romajiTitle: 'Koibito o Uchiotoshita Hi',
    artist: 'Sound Horizon', producer: 'Revo（作詞・作曲）', year: 2004, project: 'J-POP',
    excerpt: [['遠い日の忘れ物', '遥远往日的遗忘之物'], ['愛する人を失った世界には', '在失去了所爱之人的世界里']],
    points: [['愛する人', '所爱之人', '动词普通形直接修饰后面的名词。', 'koi'], ['〜を失った', '失去了…', '他动词「失う」的过去形。', 'sekai']],
    words: ['koi', 'sekai'], source: ['歌ネット', 'https://www.uta-net.com/song/103057/']
  },
  {
    id: 'kamippoi-na', title: '神っぽいな', romajiTitle: 'Kamippoi na',
    artist: '初音ミク', producer: 'ピノキオピー（作詞・作曲）', year: 2021, project: 'VOCALOID',
    excerpt: [['愛のネタバレ 「別れ」っぽいな', '爱的剧透，像是“离别”呢'], ['それっぽい単語集で踊ってんだ', '用那些似是而非的词汇跳着舞']],
    points: [['〜っぽい', '像…；有…感觉', '接名词或词干，表示带有某种倾向或感觉。', 'koi'], ['踊ってんだ', '正在跳舞啊', '「踊っているんだ」的口语缩略。', 'odoru']],
    words: ['koi', 'odoru'], source: ['初音ミク Wiki', 'https://w.atwiki.jp/hmiku/pages/45336.html']
  },
  {
    id: 'heat-waves-japanese-lime', title: 'Heat Waves (Japanese Version)', romajiTitle: 'Heat Waves (Japanese Version)',
    artist: 'Lime', producer: 'Dave Bayley（原作詞・作曲）・Tokyo Cabin（日本語詞）', year: 2022, project: 'J-POP',
    excerpt: [['思い浮かぶの 君ばかり', '脑中浮现的净是你'], ['初夏0時 過ぎたばかり', '初夏的零点刚过']],
    points: [['〜ばかり', '净是…；刚刚…', '可表示限定，也可接过去形表示动作刚发生。', 'natsu'], ['思い浮かぶ', '浮现在脑海', '「思い」与「浮かぶ」构成的复合动词。', 'kokoro']],
    words: ['natsu', 'kokoro'], source: ['官方音源', 'https://www.youtube.com/watch?v=5jbjN0Ai9X4']
  },
  {
    id: 'sea-of-stars-aozorafantasii', title: 'Sea Of Stars', romajiTitle: 'Sea of Stars',
    artist: 'aozorafantasii', producer: 'aozorafantasii（作詞・作曲）', year: 2010, project: 'J-POP',
    excerpt: [['離れ離れになりたくない', '不想彼此分离'], ['ただ前を見れば', '只要向前看']],
    points: [['〜たくない', '不想…', '动词「たい」形的否定。', 'kokoro'], ['〜ば', '如果…；只要…', '动词假定形，表示条件。', 'mirai']],
    words: ['kokoro', 'mirai'], source: ['OTOTOY 官方商店页', 'https://ototoy.jp/_/default/p/14032']
  },
  {
    id: 'etoile-mementomori', title: 'Étoile', romajiTitle: 'Etoile',
    artist: '霜月はるか', producer: 'Bank of Innovation, Inc.（作詞・作曲）', year: 2023, project: '游戏歌曲',
    excerpt: [['ありのまま生きるわ', '我要按真实的自己活下去'], ['終わりはきっと 光の中にある', '结局一定就在光芒之中']],
    points: [['ありのまま', '如实；保持本来的样子', '固定表达，表示不加掩饰或改变。', 'jibun'], ['〜の中にある', '在…之中', '用「に」标记事物存在的位置。', 'hikari']],
    words: ['jibun', 'hikari'], source: ['UtaTen', 'https://utaten.com/lyric/mi24120454/']
  }
];

const sourceNoById = {
  'gousei-suru-mirai': 2, 'shinkuu-toshi': 9, lando: 26, 'natsu-ni-toumei': 52,
  'colorcode-f': 60, 'mu-tachiiri-kinshi': 68, aristolast: 71, 'shinitakatta-kyou': 109,
  'overkill-nazoj': 113, 'split-danzi': 115, 'toka-no-hana': 135,
  'sugiyuku-hi-to-kimi-e': 140, 'teien-nite': 142, 'tenkyuu-no-musica': 144,
  'shidarezakura-anna': 149, 'muyuu-tayori': 155, 'hachigatsu-no-hotaru': 158,
  'rainy-proof': 163, 'suisei-orangestar': 172, 'kaitou-mimi': 184, 'prism-cube': 186,
  'aimaisa-kaihi': 191, 'indoor-kei-trackmaker': 193, 'bokura-no-tsuzuki': 195,
  'shironeko-kaizokusen': 201, 'sakurairo-canvas': 204, 'ookami-to-shoujo': 206,
  'tawagoto-speaker': 214, 'odo-ado': 221, 'hai-yorokonde': 236,
  'ringing-bloom': 105, 'dango-daikazoku': 233, 'tsugihagi-staccato': 262,
  'one-hundredth-ai': 85, 'chuu-de-oyasumi': 131, 'towa-no-utage': 134,
  'paradox-hanakyo': 150, 'three-queens': 174, 'koi-no-sainou': 177,
  'hansei-koukai-nashi': 196, 'deepstaria-enigmatica': 197,
  'instant-love-lapriere': 31, 'heroine-pikasonic': 82,
  'kanojo-wa-tabi-ni-deru': 209, 'utopia-tayori': 156,
  'shiva-heaven-burns-red': 227, 'x-taira-aoi': 32,
  'cheer-up-hearts-up': 99, 'koibito-o-uchiotoshita-hi': 129,
  'kamippoi-na': 117, 'heat-waves-japanese-lime': 8,
  'sea-of-stars-aozorafantasii': 16, 'etoile-mementomori': 145
};

export const curatedSongAdditions = songs.map((s) => ({
  ...s,
  sourceNo: sourceNoById[s.id],
  lyricsStatus: 'complete',
  excerpt: s.excerpt.map(([ja, zh]) => ({ ja, zh })),
  points: s.points.map(([ja, zh, note, wordId]) => ({ ja, zh, note, ...(wordId ? { wordId } : {}) })),
  sources: [{ label: s.source[0], url: s.source[1] }]
})).map(({ source, ...s }) => s);
