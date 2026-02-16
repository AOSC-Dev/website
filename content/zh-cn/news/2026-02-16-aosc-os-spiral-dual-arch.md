---
categories:
  - advisories
title: "安同 OS 龙架构及龙芯三号 (MIPS) 跨架构软件包兼容更新"
date: 2026-02-16T22:50:00+08:00
important: true
home: true
---

![还记得 Spiral 吗？过去一年余的软件包重构让它变得更强了。](/assets/news/aosc-os-loong-or-snake.webp)
> 还记得 Spiral 吗？过去一年余的软件包重构让它变得更强了。

在 2024 年引入 Spiral 框架标记 Debian 兼容软件包标记后不久，我们针对与 Debian 架构名不同的龙架构（`loongarch64`，Debian 使用 `loong64`）及龙芯三号 (MIPS)（`loongson3`，Debian 使用 `mips64el`）作了双架构标记。以龙架构的 `libusb` 软件包为例，其 `Provides:` 字段包含如下内容：

```yaml
Provides: libusb-1.0-0:loong64 (= 2:1.0.29), libusb-1.0-0-dev:loong64 (= 2:1.0.29),
libusb-1.0-0:loongarch64 (= 2:1.0.29), libusb-1.0-0-dev:loongarch64 (= 2:1.0.29)
```

这意味着 `libusb` 可以同时提供与 Debian 兼容的 `loongarch64` 及 `loong64` 包。

过去几天，我们在一年多来通过重构和更新软件包提高 Spiral 标记覆盖的基础上，为龙架构及龙芯三号 (MIPS) 架构系统的 dpkg 标记了双架构兼容（利用 dpkg 内置 [Multiarch](https://wiki.debian.org/CategoryMultiarch) 设施实现的同时允许安装“原生 (native)”及“外来 (foreign)”架构软件包的机制），各位在今晚更新系统后，就可以在上述两个架构上随心安装为 Debian/Loongnix 发行的软件包了！