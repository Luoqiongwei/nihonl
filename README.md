# NIHONL · 日语入门

面向中文母语者的日语入门学习网站。核心是**词汇记忆**，并以日本新生代二次元文化与日本美学作为引申与记忆辅助；全部数据内置于前端，学习进度保存在浏览器 `localStorage` 中，不需要数据库。

站点基于 [Astro](https://astro.build/)（MPA + 原生 JS 小脚本）构建，按页面代码分割与静态预渲染实现懒加载。

## 本地开发

```powershell
pnpm install
pnpm dev        # http://localhost:4321/nihonl/
pnpm test       # 数据完整性 + 复习逻辑 + 客户端脚本冒烟
pnpm build      # 产出 dist/
pnpm preview    # 预览构建产物
```

> 本仓库使用 pnpm（>= 11）。构建前请确保 `pnpm install` 已执行过 esbuild / sharp 的构建脚本（`pnpm-workspace.yaml` 已配置允许）。

## 部署到 GitHub Pages

仓库内置 GitHub Actions 工作流（`.github/workflows/deploy.yml`）：推送到 `main` 后自动执行冒烟测试 → `pnpm build` → 发布 `dist/` 到

<https://luoqiongwei.github.io/nihonl/>

首次部署需要两步设置（之后推送即自动发布）：

1. **公开仓库**：Settings → General → Danger Zone → Change repository visibility 改为 Public。
2. **开启 Pages**：Settings → Pages → Source 选择 **GitHub Actions** → Save。

然后到 Actions 页面手动 Run workflow 一次（或再推送一次代码），等待绿色勾号后即可访问上面的地址。

> `astro.config.mjs` 中配置了 `site` 与 `base: '/nihonl/'`，旧版 hash 链接（`#/music/xxx`）会自动重定向到真实路径。

## 功能

- **五十音**：平假名 / 片假名清音、浊音、拗音表，点击可试发音
- **词汇库**：内置 70+ 入门词条，含假名、例句、文化联想；支持搜索、分类与学习状态筛选
- **背单词**：卡片式记忆 + 简易间隔复习（记忆度 0–5 级，忘记/模糊/记得/很熟四档评分）
- **文化**：二次元文化（萌、推し、卡哇伊、若者言葉）与日本美学（物哀、侘寂、幽玄、間）词条，附关联词汇
- **音楽**：J-POP / J-Rock / VOCALOID / 神椿 歌曲的歌词节选与词汇讲解（140 首）；只摘录数句用于学习，并保留可复核来源链接
- **进度**：学习量、掌握分布、近 14 天复习记录

## 目录结构

```
nihonl/
├── src/
│   ├── pages/            # Astro 页面（/、/kana、/vocab、/study、/culture、/music、/music/:id、/stats、404）
│   ├── layouts/          # Base 布局（导航、页脚、旧 hash 重定向）
│   ├── styles/global.css # 全局样式（和风配色）
│   ├── data/             # 构建期导入的数据（由 convert_data.mjs 生成）
│   │   ├── words.js  culture.js  kana.js
│   │   ├── songs.js  songs-index.js  categories.js
│   │   └── index.js      # 数据访问辅助函数
│   ├── scripts/          # 客户端小脚本（按页面代码分割）
│   └── lib/              # store.js（SRS）+ helpers.js（转义/朗读/链接）
├── data/
│   ├── songlist.json     # 曲目清单解析结果
│   ├── song-audit.json   # 不含歌词正文的筛选与来源审计
│   └── legacy/           # 旧版数据源（js/data.js、js/songs-data.js），供 convert_data.mjs 参考
├── scripts/
│   ├── convert_data.mjs  # 旧数据 → src/data 的转换器
│   ├── smoke.mjs         # 冒烟测试
│   ├── analyze_songlist.mjs
│   └── lookup_*.ps1      # 歌词查证脚本
├── astro.config.mjs
└── pnpm-workspace.yaml
```

歌单标题的清洗、演唱语言判定和歌词来源优先级见 [`docs/lyrics-workflow.md`](docs/lyrics-workflow.md)。

歌词查证生成的 HTML、`lyrics-*.json`、LRC 与 TTML 均为本地临时产物，已被 Git 忽略；确认 2–3 句教学节选和来源链接后应立即删除，不得进入生产数据库或部署包。

## 新增 / 修改内容

- **词汇**：编辑 `src/data/words.js`（数组追加词条即可）。
- **文化词条**：编辑 `src/data/culture.js`。
- **歌曲**：历史条目编辑 `data/legacy/`；自动检索未命中的人工查证条目编辑 `data/curated-song-additions.js`，再运行 `node scripts/convert_data.mjs`。`src/data/songs.js` 是生成文件，不应直接修改。
- **页面**：在 `src/pages/` 下新增 / 修改 `.astro` 文件；需要交互的页面把逻辑放在 `src/scripts/` 并由页面 `<script>` 引入（Astro 会按页面做代码分割）。

## 数据说明

- 学习进度：`localStorage["nihonl.progress.v1"]`（迁移后 key 不变，旧进度继续有效）
- 如需重新开始，可在「进度」页点击重置。
