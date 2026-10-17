---
title: 发行注记：2026 年 10 月
---

安同 OS (Apple silicon) 是面向基于 Apple 芯片的 Mac 设备发布的系统版本，本次更新包含如下主要内容。

## 组件更新

本次发行更新包含截至 2026 年 10 月 17 日的所有系统更新，除[主线系统更新的内容外](/aosc-os/relnote)：

- Linux 内核版本更新至 7.1.13，并带有最新的 Asahi Linux 补丁集
- 为 Asahi Linux 在内核中新引入的 Apple Video Decoder 驱动预装了对应固件（`avd-fw`)
- m1n1 引导器版本更新至 2.0.0

## 功能修缮

- 修复了在更新了 macOS 27 的 Mac 上启动系统后会在数秒内自动关机的问题

## 体验修缮

- 预装 Wayland 会话（`plasma-workspace-wayland-session`）并作为默认选项，能够获得更好的桌面图形性能
