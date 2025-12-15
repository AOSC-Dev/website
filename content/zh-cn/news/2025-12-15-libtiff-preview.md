---
categories:
  - advisories
title: "LibTIFF 安全更新测试公告"
date: 2025-12-15T19:00:00+08:00
important: true
home: true
---

![喵—— 同同掏出了妙妙更新！](/assets/news/testing-topic-libtiff-20251215.webp)

安同 OS 目前提供的 LibTIFF 图像库受近日披露的 `TIFFReadRGBAImageOriented()` 函数中任意内存写入漏洞（CVE-2025-9900）等数个安全漏洞影响，需要尽快更新。

但是，由于本次 LibTIFF 安全更新包含 ABI 变更，需要重构较多的软件包。为保障用户使用体验，我们决定进行为期一周的测试，并在确认更新未导致显著可用性问题后，再将这项修改合并至稳定源。

测试指南
---

感兴趣的用户，特别是常用软件处于影响范围内的用户，请考虑通过如下命令加入测试源：

```
sudo oma topic --opt-in libtiff-4.7.1
```

亦可使用如下命令按需退出测试源：

```
sudo oma topic --opt-out libtiff-4.7.1
```

如果您在测试本次 LibTIFF 更新的过程中遇到问题或有任何建议，欢迎您来我社[各聊天群组](https://aosc.io/contact)与我们联系反馈。

注意事项
---

如果您在加入测试源后发现某些商用软件无法正常运行，请使用如下命令安装 `libtiff-5` 软件包：

```
sudo oma install libtiff-5
```

该软件包亦通过 Spiral 框架提供 Debian 兼容包名  (`libtiff5`)，本轮更新不应导致任何第三方软件被卸载。