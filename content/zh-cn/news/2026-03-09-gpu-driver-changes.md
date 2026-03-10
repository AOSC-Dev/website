---
categories:
  - advisories
title: "部分显卡驱动已取消预装且可能被自动卸载"
date: 2026-03-09T23:50:00+08:00
important: true
home: true
---

![desktop-base 更新公告](/assets/news/testing-topic-desktop-base-20260309.webp)

从 2026 年 3 月发布的系统镜像开始，我们将拆分标准的桌面版发行及各类非主线支持的显卡驱动组件，以便在安装时供用户选用，并避免预装过多此类驱动，在更新系统时由于 DKMS 内核模块编译等造成额外耗时和资源占用。

由于这一调整，我们从桌面套件包 (desktop-base) 的依赖中移除了如下几个系列显卡的驱动：

- 兆芯开先 KX-6000G/7000 集成显卡（兆芯 C-1080/1190）
- 兆芯开先 KX-6000/6900 集成显卡（兆芯 C-960）
- 龙芯 LoongGPU LG110/120/200

在这一调整后，小熊猫包管理 (oma) 可能提示您这些显卡驱动被标记为不再需要的软件包，而提示删除。

为解决这一问题，请根据如下流程手动安装上述显卡的驱动，而后 oma 将不再提示卸载。

兆芯开先 KX-6000G/7000 集成显卡
---

```bash
oma mark manual cx4-linux-graphics-driver-dri
```

兆芯开先 KX-6000/6900 集成显卡
---

```bash
oma mark manual zhaoxin-linux-graphics-driver-dri
```

龙芯 LoongGPU LG110/120/200
---

```bash
oma mark manual loonggpu-driver
```