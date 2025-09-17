安同开源社区门户网站 (AOSC Portal)
===

[英文自述文件 >>](/README.md)

本仓库存放自 2024 年末启用的社区门户网站（设计稿 2023 年完成，故此得名）。本网站使用 Vue.js 构建。

简述
---

本门户网站的主要设计目标是在单屏幕空间中显示尽可能多的有用信息，其主要实现手段是综合使用多列布局及纵横导航部件。此外，本门户网站还尝试摆脱 FOSS 社区网站的一些常见设计导向，采取图文混编、产品导向为主要呈现逻辑，方便新老用户了解社区项目、活动及公告等。

外观设计方面，本门户网站有意地模仿了来自 2000 年代的 Web 1.0 审美（但从布局及技术上依然采用了现代技术）。本网站的布局灵感来源于 2001 - 2004 年间的微软 Windows 主页：

- [参考甲：Windows XP 主页（2001 年末）](https://web.archive.org/web/20011211230629/http://microsoft.com/windowsxp/default.asp)
- [参考乙：Windows XP 中期主页（2004 年）](https://web.archive.org/web/20040204080626/http://www.microsoft.com/china/windows/default.mspx)

技术架构方面，该网站为客户端渲染 (client-side render) 的单页 Web 应用程序，我们计划在未来一段时间就将网站转写为服务端渲染 (server-side render) 或静态生成网站 (static site generator)，提高网站的可索引性及性能。

目前网站亦未对移动端、低性能（星霞 OS 目标）设备及功能受限的浏览器优化，我们计划在后续研判是否通过实现专用网站解决此问题。

部署及测试
---

本网站使用 GitHub workflow 自动部署到我们的网站服务器，搭配 [website-2023-utils](https://github.com/AOSC-Dev/website-2023-utils) 一同使用（请注意阅读该仓库中的部署指南）。

本地测试时，您需要安装 Node.js + NPM 工具链，安同 OS 用户可使用如下命令安装；您也需要部署 [website-2023-utils](https://github.com/AOSC-Dev/website-2023-utils)：

```
oma install nodejs
```

而后，使用如下命令启动网站构建及服务：

```
npm i
npm run dev
```

提交新闻
---

本站新闻使用 Markdown 格式编写，存放于 `/public/news`；额外文件（如图片等）存放于 `/assets/...`。引用额外文件时，应使用站内引用（`/assets/...`）而非站外引用（`https://...`）。

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

本地化新闻文章时，在文件名后加语言代号作为后缀即可（如 `.zh-cn`）：

```
2024-09-18-aosc-os-relnote.zh-cn.md
```
