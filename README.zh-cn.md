安同开源社区门户网站 (AOSC Portal)
===

[English readme file >>](/README.md)

本仓库存放自 2024 年末启用的社区门户网站，本网站使用 [Nuxt](https://nuxt.com/) 构建。

简述
---

本门户网站的主要设计目标是在单屏幕空间中显示尽可能多的有用信息，其主要实现手段是综合使用多列布局及纵横导航部件。此外，本门户网站还尝试摆脱 FOSS 社区网站的一些常见设计导向，采取图文混编、产品导向为主要呈现逻辑，方便新老用户了解社区项目、活动及公告等。

外观设计方面，本门户网站有意地模仿了来自 2000 年代的 Web 1.0 审美（但从布局及技术上依然采用了现代技术）。本网站的布局灵感来源于 2001 - 2004 年间的微软 Windows 主页：

- [参考甲：Windows XP 主页（2001 年末）](https://web.archive.org/web/20011211230629/http://microsoft.com/windowsxp/default.asp)
- [参考乙：Windows XP 中期主页（2004 年）](https://web.archive.org/web/20040204080626/http://www.microsoft.com/china/windows/default.mspx)

目前网站亦未对移动端、低性能（星霞 OS 目标）设备及功能受限的浏览器优化，我们计划在后续研判是否通过实现专用网站解决此问题。

部署及测试
---

本网站使用 GitHub workflow 自动部署到我们的网站服务器。其中剪贴板后端为部署在 paste.aosc.io 的 [paste-server-rs](https://github.com/AOSC-Dev/website-utils/tree/master/paste-server-rs)。

本地测试时，您需要安装 Node.js + NPM 工具链，安同 OS 用户可使用如下命令安装：

```sh
oma install nodejs
```

安装依赖：
```sh
npm install
```

而后，使用如下命令构建网站并预览：

```sh
npm run generate
npm run preview
```

如果您需要测试 nginx 相关配置或在独立环境测试完整预览，请使用：
```sh
docker compose down --volumes
docker compose up --build
```

如果需要配合 `npm run dev` 命令单独测试剪贴板或搜索功能，请单独运行相关容器，例如：
```sh
# Search
docker compose up meilisearch meilisearch-indexer meilisearch-keyupdater
# Paste
docker compose up paste-server-rs paste-server-db
```

提交新闻
---

本站新闻使用 Markdown 格式编写，存放于 `/content/{language}/news`；额外文件（如图片等）存放于 `/public/...`。引用额外文件时，应使用站内引用（`/...`）而非站外引用（`https://...`）。

新闻文件均带有文件头，如下例：

```
---
categories:
  - journals
title: "安记冰室・九月上"
date: 2024-09-19T23:00:00+08:00
important: false
home: true
---
```

- `categories`（枚举值）：
    - `advisories`：用户公告（一般与安同 OS 有关）
    - `news`：社区活动新闻、赞助方鸣谢及公告等
    - `journals`：社区期刊（《安记冰室》）
    - `minutes`：贡献者会议纪要
- `title`（字符串）：新闻标题
- `date`（字符串）：用于网站呈现的发布日期
- `important`（布尔值）：是否标记为重要新闻
- `home`（布尔值）：是否在门户主页的要点栏目列出

### 新闻本地化

本地化新闻文章时，在对应语言文件夹下新建同名文件即可（如 `/content/zh-cn/`）：

```
/content/zh-cn/news/2024-09-18-aosc-os-relnote.md
```
