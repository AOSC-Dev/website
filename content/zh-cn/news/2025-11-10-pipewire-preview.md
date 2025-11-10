---
categories:
  - advisories
title: "PipeWire 音频系统迁移测试公告"
date: 2025-11-10T19:15:00+08:00
important: true
home: true
---

![喵—— 同同掏出了妙妙更新！](/assets/news/testing-topic-pipewire-20251110.webp)

作为安同 OS 目前默认使用的音频服务，PulseAudio 已经伴随我们数十年。然而，随着 PipeWire 及 JACK 等新的音频服务软件的开发，PulseAudio 的局限性也逐渐显现：延迟过高、蓝牙特性支持不全，不够灵活（无法灵活分配输入或输出）。

PipeWire 作为新的音频服务实现，可提供更低的延迟、原生蓝牙音频解码器支持，亦可更高效地处理音频、实时分配输入或输出。同时，用于 Apple silicon 平台的安同 OS 不支持 PulseAudio，也对迁移到 PipeWire 音频系统提出了迫切需求。

鉴于上述原因，我们决定将默认的音频服务切换到 PipeWire，以便为用户朋友们提供更好的音频体验。虽然 PipeWire 内置 PulseAudio 兼容服务，由于音频系统影响到的应用程序和使用场景众多，且可能在不同硬件平台表现不同，我们决定在未来约 1 个月开放测试，并在确认本修改影响不大后再将这项修改合并至稳定源。

由于 Asahi 发行的特殊性，自本测试公告发布后的所有 Asahi 发行均默认使用 PipeWire。

## 测试指南

感兴趣的用户，特别是在 Linux 上运行老旧软件及 DAW 的用户或玩节奏游戏的玩家，请考虑通过如下命令加入测试源，以便切换至 PipeWire 音频系统：

```bash
sudo oma topics --opt-in pipewire-default-migration
```

加入测试源并更新后，您需要重新登录才能完成音频系统切换。

我们期待您的测试与反馈！如果您在测试 PipeWire 的过程中遇到问题或有任何建议，欢迎您来我社各聊天群组与我们联系反馈。