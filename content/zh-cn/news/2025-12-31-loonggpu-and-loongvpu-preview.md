---
categories:
  - advisories
title: "LoongGPU 及 LoongVPU 驱动更新测试公告"
date: 2025-12-31T22:00:00+08:00
important: true
home: false
---

![龙芯 2K3000 SoC](/assets/news/2k3000-soc.webp)

2025 年最后一天，龙芯中科发布了 LoongGPU 及 LoongVPU 驱动更新。

其中，LoongGPU 1.0.2 新增了 2K3000/3B6000M SoC 中 LoongGPU LG200 的支持及对 LG110（7A2000 桥片附带）GPU 的功能性修复；LoongVPU 0.1.0 则包含 2K3000/3B6000M 的 VPU 支持驱动及组件（官方包亦包含 2K1000LA SoC 中附带的 VPU 支持，但由于我们尚未测试该 SoC 的支持情况，故没有包含）。

测试指南
---

如果您希望测试 LoongGPU 1.0.2 更新，请使用如下命令加入测试源：

```bash
oma topics --opt-in loonggpu-1.0.2
```

如果您希望在 2K3000/3B6000M 平台测试 LoongVPU 0.1.0 驱动，请使用如下命令加入测试源并安装相关软件包（由于下述已知问题，我们计划暂缓引入 VPU 驱动，并将该驱动作为预览更新提供）：

```bash
oma topics --opt-in loongvpu-0.1.0 && \
oma install loongvpu
```

已知更新内容
---

- LoongGPU LG200 支持（龙芯 2K3000 及 3B6000M SoC 内置），包含 OpenGL 3.3、OpenGL ES 3.1 支持、X11 图形驱动 (DDX) 等组件，无 Vulkan 及 OpenCL 支持
- LoongGPU LG110 高分辨率支持改善，我们测试发现该版驱动可顺利驱动 2K (2560×1440) 及 4K (3840×2160) 分辨率（4K 分辨率下性能欠佳）
- 基于 VA-API 的 VPU 驱动，支持龙芯 2K3000 及 3B6000M SoC 内置的视频处理单元，可支持 H.264、H.265 及 AV1 解码及 H.264、H.265 编码

已知问题
---

- VPU 驱动在解码 AV1 编码的视频时画面不正常
- VPU 驱动编码生成的视频画面不正常
- Firefox 及 Chromium 浏览器无法正常利用 VA-API 接口调用该 VPU：前者可探测到编解码支持情况，但无法使用加速功能；后者报 VA-API 初始化错误

开发参考
---

LoongGPU 1.0.2 及 LoongVPU 0.1.0 的内核态驱动开源 (DKMS)，但仅适配到 Linux 6.6 内核。安同开源社区的开发者们已经将这两个驱动的内核部分适配到最高 Linux 6.18 内核。

欢迎您按需参考我们的驱动补丁，抑或提交代码修复等：

- [LoongGPU v1.0.2-lnd25.1~rc1.7](https://github.com/AOSC-Tracking/loonggpu-kernel-dkms/tree/aosc/v1.0.2-lnd25.1-rc1.7)
- [LoongVPU v0.1.0-lnd25.1~rc1.7](https://github.com/AOSC-Tracking/loongvpu-kernel-dkms/tree/aosc/v0.1.0-lnd25.1-rc1.7)