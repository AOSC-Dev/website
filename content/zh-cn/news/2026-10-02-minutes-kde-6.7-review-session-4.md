---
categories:
  - minutes
title: "纪要：KDE 6 稳定源推送评审（2026/10/2，第四期）"
date: 2026-10-02T21:00:00+08:00
important: false
---

UTC+8 时间 2026 年 10 月 2 日 20:00，社区贡献者组织了 KDE 6 稳定源推送的第四轮评审，进一步复查了剩余已知问题，并初步确认了合并流程和用户通知等事宜。

我们计划在十一假期内推送 KDE 6 更新。

界面问题
---

- Plasma Login Manager 外观设置界面缺少部分本地化

MIME 绑定
---

- mpc-qt: 设置 MIME 绑定（更换原来绑定在 Haruna 上的）（白铭骢）
- 字体文件的绑定错误，应为 kfontview

依赖调整
---

- 部分软件包仍须调整依赖
    - Krita 仍推荐 Qt 5 版本 (5.x)，保持不变
    - 部分软件仍显式指定 Qt 5/KF5，应改为 Qt 6/KF6
    - Box64 改用 Qt 6
    - SimpleScreenRecorder 改用 Qt 6
    - 其他详见 [kde-6-3rdparty-survey-20261002](https://github.com/AOSC-Dev/aosc-os-abbs/commits/) 分支
- 待查依赖问题
    - `plasma-workspace` 是否还需要保留 `appstream-qt` 及 `packagekit-qt` 依赖？
    - `kolourpaint` 是否还需要保留 KF5 依赖？
    - GnuPlot Qt 无法启动（启动后卡死），是否保留 Qt 功能？如保留，切换到 Qt 6
    - 以下双 Qt 版本包是否需要保留 Qt 5 版本？
        - libdbusmenu-qt
        - libqaccessiblityclient
        - phonon
        - polkit-qt-1
        - qtkeychain
        - qcoro
        - qca
- Fcitx 各功能须为 KDE 6 重构
- `deb-installer` 须合并到 `kde-6` 分支一同构建，改用 KF6
- `plasma-distro-base` 须引入 `plasma-aosc-update`

推送注意事项
---

- 构建过程中冻结其他稳定源 (stable) 合并操作，安全更新一事一议
- 上传时使用 Staging 路径，在 `/mirror` 之外，避免提前扫描
- 推送后网管禁用一级源 (repo-us, jlu, nju) 外镜像的同步，同步完成后再放开

用户须知
---

在 KDE 6 推送前，准备好用户更新须知（通过支持中心发出？）：

- 更新前请尽可能保存桌面上应用程序的工作并退出
- 更新过程中图标和面板样式会不间断“鬼畜”并恢复，属于正常现象
- 更新后请第一时间重启电脑，此时应用菜单中的重启路径将不可用，请使用终端模拟器运行 `reboot` 命令
- 可能无法迁移的默认配置
    - “天气预报”挂件不会被禁用，可按需调整
    - 如在 KDE 5 设置过缩放并调整面板，此时面板的物理分辨率将改为逻辑分辨率，如在 KDE 5 下设置 48px @ 200% 缩放，到 KDE 6 下显示的高度将为 48*2 = 96px；各面板弹窗的大小如在 KDE 5 下修改过，也可能会被错误缩放
- KNewStuff 在 KDE 6 更新后将被默认禁用，如需使用，可通过修改 ~/.config/kdeglobals 新增如下行重新启用
    - 注意：KNewStuff 直接分发来自第三方的二进制及素材插件，可能存在兼容性问题，甚至安全问题

```ini
[KDE Action Restrictions]
ghns=false
```
