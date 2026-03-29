---
categories:
  - advisories
title: "systemd 259-3 导致触发器解析出现循环"
date: 2026-03-29T22:00:00+08:00
important: true
home: true
---

![私密吗喽！我们又搞砸了，这次是 systemd 259-3 触发器](/assets/news/oopsies-systemd-259-trigger-loop-20260329.webp)

由于打包疏忽，您在更新系统时将遇到如下报错：

```
dpkg: 处理触发器时发现回路：
 包含或可能包含对此有责任的触发器的软件包链：
  systemd -> systemd -> systemd -> systemd -> systemd -> systemd
 无法解决的软件包未决触发器：
  systemd: /usr/lib/systemd/system
dpkg: 处理软件包 systemd (--configure)时出错：
 触发器循环，放弃
dpkg:main/packages.c:258:process_queue(): 内部错误: exceeded dependtry 7 (sincenothing=0; queue.length=0)
```

稍早时我们为 `systemd` 添加了用于自动执行 `daemon-reload` 的触发器，以便在 `/usr/lib/systemd/system` 等目录发生变化时自动重新加载服务单元，但该触发器未使用 `interest-noawait` 类型声明，导致部分场景下计算触发链时出现循环。

如果您遇到此类问题，请运行如下命令解决：

```bash
oma fix-broken
```

我们为此带来的不便表示歉意。
