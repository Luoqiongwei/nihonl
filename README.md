# NIHONL · 日语入门

面向中文母语者的日语入门学习网站。第一版聚焦**词汇记忆**，并以日本新生代二次元文化与日本美学作为引申与记忆辅助；全部数据内置于前端，学习进度保存在浏览器 `localStorage` 中，不需要数据库。

## 运行

直接双击 `index.html` 即可使用；也可以用任意静态服务器：

```powershell
python -m http.server 8080
# 或 node scripts/serve.js
```

然后浏览器访问 `http://localhost:8080`。

## 部署到 GitHub Pages

仓库已内置 GitHub Actions 工作流（`.github/workflows/deploy.yml`）：推送到 `main` 后会自动跑冒烟测试并把站点发布到

<https://luoqiongwei.github.io/nihonl/>

首次部署需要两步设置（之后推送即自动发布）：

1. **公开仓库**：GitHub Pages 在免费方案下只支持公开仓库。到仓库 Settings → General → Danger Zone → Change repository visibility 改为 Public。
2. **开启 Pages**：Settings → Pages → Source 选择 **GitHub Actions** → Save。

然后到 Actions 页面手动 Run workflow 一次（或再推送一次代码），等待绿色勾号后即可访问上面的地址。

> 站点使用相对路径与 hash 路由，无需修改代码就能在 `/nihonl/` 子路径下运行。

## 功能

- **五十音**：平假名 / 片假名清音、浊音、拗音表
- **词汇库**：内置约 50 个入门词条，含假名、声调提示、例句、文化联想；支持搜索与分类筛选
- **背单词**：卡片式记忆 + 简易间隔复习（记忆度 0–5 级，忘记/模糊/记得/很熟四档评分）
- **文化**：二次元文化（萌、推し、卡哇伊、若者言葉）与日本美学（物哀、侘寂、幽玄、間）词条，附关联词汇
- **音楽**：J-POP / J-Rock / VOCALOID / 神椿 歌曲的歌词节选与词汇讲解（VOCALOID、Project SEKAI、神椿等）；只摘录数句用于学习，完整歌词链接到来源页
- **进度**：学习量、掌握分布、近 14 天复习记录

## 目录结构

```
nihonl/
├── index.html          # 页面骨架
├── css/style.css       # 全局样式（和风配色）
├── js/
│   ├── data.js         # 数据：词汇、文化词条、五十音（新增内容改这里）
│   ├── store.js        # localStorage 进度与间隔复习逻辑
│   ├── router.js       # hash 路由
│   ├── app.js          # 启动与导航
│   └── views/          # 各页面视图
│       ├── home.js  kana.js  vocab.js
│       ├── study.js  culture.js  stats.js
└── scripts/serve.js    # 简易静态服务器
```

## 扩展词汇

打开 `js/data.js`，在 `NihonlData.words` 数组中追加词条即可。字段说明见文件顶部注释。

## 数据说明

- 学习进度：`localStorage["nihonl.progress.v1"]`
- 如需重新开始，可在「进度」页点击重置，或在浏览器控制台执行 `NihonlStore.reset()`
