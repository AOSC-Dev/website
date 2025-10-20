---
categories:
  - advisories
title: "小熊猫包管理 (oma) 登陆 Termux 官方源"
date: 2025-10-20T09:45:00+08:00
important: true
home: true
---

![可以用 pkg 命令安装 oma 啦！](/assets/news/oma-on-termux-official.webp)

感谢 Termux 贡献者 [Kevin Williams](https://github.com/2096779623) 的[投稿](https://github.com/termux/termux-packages/pull/26927)，oma 现已登陆 Termux 官方源！

运行如下命令即可安装使用 oma：

```bash
pkg install oma
```

请注意：oma 需要 Termux >= 0.118.2 才能正常工作（探测环境所使用的 `TERMUX__PREFIX` 变量是该版本[引入](https://github.com/termux/termux-app/commit/b7d2a4b6633979ad7181db89b73d2d836fe99bcc)的）。此外，由于运行时库的兼容性问题，oma 暂时只支持 AArch64 (aarch64) 架构的 Termux 环境，我们正在研究 ARMv7 (armv7a) 和 32 位 x86 (i686) 架构的修复方案。