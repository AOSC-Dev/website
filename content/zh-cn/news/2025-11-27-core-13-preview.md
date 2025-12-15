---
categories:
  - advisories
title: "安同 OS 核心包 13.0.0 测试公告"
date: 2025-11-27T23:00:00+08:00
important: true
home: false
---

![喵～](/assets/news/core-13-preview.webp)
> 喵～

一年一度的核心包 (Core) 更新来啦！

本次更新，我们除了更新各类核心运行时和工具链到最新版（如 glibc 2.42 和 GCC 15.2.0）外，我们还将所有组件的补丁、编译脚本等进行了整理，提高了整体维护质量。

尽管本次更新对用户朋友们来说是无感的，但为了确保更新质量和提前发现潜在问题，我们鼓励各位用户和开发者提前获取测试更新：

```bash
oma topics --opt-in core-13
```

如果您在测试 Core 13 的过程中遇到问题或有任何建议，欢迎您来我社[各聊天群组](https://aosc.io/contact)与我们联系反馈。