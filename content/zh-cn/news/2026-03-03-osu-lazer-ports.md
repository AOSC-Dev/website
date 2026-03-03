---
categories:
  - advisories
title: "osu! (lazer) 现已支持全部一级架构"
date: 2026-03-03T20:10:00+08:00
important: true
home: true
---

![osu! (lazer) 现已支持全部一级架构](/assets/news/osu-lazer.webp)

> 爱玩音游的朋友们，欢迎在非 x86 架构上试玩 osu! (lazer)！

在春节期间，我们为安同 OS 引入了 .NET 10，这也意味着我们可以给所有一级架构（x86-64、AArch64 及龙架构）打包更多 .NET 程序了——其中之一便是知名音游 osu!

试玩指南
---

osu! (lazer) 目前位于测试源，安装非常简单：

```bash
oma topics --opt-in osu-add-loongarch-support && \
oma install osu-lazer
```

而后从应用菜单点选“osu!”图标即可。

> **请注意，由于该版 osu! 是我们自行编译的，您将无法使用该版游戏上传分数。**

特别鸣谢
---

- [Catty Steve](https://github.com/Catty2014) 的 [osu-lazer-loongarch](https://github.com/Catty2014/osu-lazer-loongarch) 构建流程与耐心指导
- [Un4seen Developments](https://www.un4seen.com/) 的 Ian 提供的[龙架构 BASS 音频库二进制](https://www.un4seen.com/stuff/bass24-linux-loongarch64.zip)