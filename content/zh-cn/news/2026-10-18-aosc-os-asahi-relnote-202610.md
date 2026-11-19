---
categories:
  - advisories
title: "安同 OS (Apple silicon) 发行更新公告（2026 年 10 月）"
date: 2026-10-18T20:00:00+08:00
important: true
home: true
---

![2026 年 10 月发行更新 (Apple silicon)](/assets/news/aosc-on-apple-silicon-20261018.webp)

安同 OS (Apple silicon) 是面向基于 Apple 芯片的 Mac 设备发布的系统版本，本次更新包含截至 2026 年 10 月 17 日的所有系统更新。

除主线系统更新的内容外，额外包含了带有最新 Asahi 补丁集的 Linux 内核、与之配套的 Apple Video Decoder 固件及新版本的 m1n1 引导器。本次发行更新还包含一些功能和体验上的修缮。

## Linux 内核：修复 macOS 27 固件兼容性问题

较旧版本的 Linux 内核 (< 7.1.13) 与 macOS 27 固件共同使用时因无法正确识别电池状态，系统启动后数秒内会紧急关机，可能造成系统损坏。

**如您有更新 macOS 27 的需求，请务必提前使用 `oma upgrade` 更新系统，确保内核版本不低于 7.1.13，并做好重要数据备份，以防后续因系统无法启动而造成损失。**

如您已经遇到此故障，请在 macOS 下先备份对应分区中的数据，然后重新安装最新版本的安同 OS。

## 窗口系统：默认使用 Wayland 会话

由于 Asahi Linux 上游不面向 X11 提供支持，且近期我们观察到 X11 会话下出现性能低下和渲染错误等问题，本次发行更新预装了 Wayland 会话，并将其在新安装的系统上设为默认，其能够提供明显更好的图形性能。**我们建议您尽快迁移到 Wayland 会话。** 

更新系统后，您只须在登录系统时在屏幕左下角选择“Plasma (Wayland)”，然后正常登录即可。X11 相关组件和会话仍会正常保留，并且您每次在登录时手动选择的会话依然会记录为下次的默认选项。

[系统下载](/download#aosc-os-apple-silicon-download)｜[发行注记](/aosc-os/asahi/relnote)
