---
categories:
  - minutes
title: "纪要：KDE 6 稳定源推送评审（2026/7/5，第二期）"
date: 2026-07-05T22:00:00+08:00
important: false
---

UTC+8 时间 2026 年 7 月 5 日 20:00，社区贡献者组织了 KDE 6 稳定源推送的第二轮评审，进一步复查了当前 KDE 6 的已知问题并设计 KDE 6 的默认配置，并初步排查了 KDE 具体存在 X11 依赖的组件，以便确认 6.8 后的维护计划。

缺少的软件包
----------

- Aurorae: KWin 的主题引擎
- Union: 主题引擎
- Spacebar: KDE 短信软件
- Plasma Mobile 相关包

关于稳定交付后的持续维护问题
-----------------------

KDE Frameworks 5 根据 KDE Gears 和第三方软件的需要会继续提供，软件包名后附加 `-5` 后缀。

Plasma 6.8 将移除 X11 支持，经排查确认受影响的软件包如下（目前判断受影响的代码量不大，可以在中短期继续保持 revert + rebase 维护）：

- libplasma
- kdeplasma-addons
- plasma-desktop (kaccess)
- plasma-workspace
- powerdevil
- spectactle
- plasma-keyboard（未打包）

问题排查
-------

- Skanpage 需同时列在“办公”分类中（白铭骢）
- Dolphin 左面板宽度不正确（疑似中文字符宽度计算错误，导致默认宽度很窄）（SignKirigami）
- Qt 5 附属开发工具未去除（白铭骢）
- CUPS “打印机管理” 菜单项未去除（白铭骢）
- “序列号” 按钮需改为右上角 Actions 按钮（SignKirigami）
- Kamoso 视频流卡顿问题未查（白铭骢）
- TuneD（tuned-ppd 功能）: 依赖了 nmap；应拆包或使用更简单的 tlp-pd 或 power-profiles-daemon（白铭骢）
- Spectactle 录屏按钮依旧无响应（SignKirigami）
- Gwenview 默认依旧使用软件渲染：由于 `QT_NO_OPENGL` 定义导致默认使用软件（白铭骢）
- Konsole: 亮白色配色问题；默认配色改为 Campbell（Windows Terminal 配色）（白铭骢）
- 系统设置
  - “触摸板” 页应默认开启自然滚动（白铭骢）
  - “屏幕边缘” 应设置为无操作（白铭骢）
  - “屏幕阅读器” 一旦启动就无法关闭，且系统设置对应软件包 (systemsettings) 缺少 Orca 依赖（白铭骢）
  - Orca 对中文支持较差，在中文环境下几乎不可用（白铭骢）
  - “代理服务器” 的工具提示内容较长且中文下没有换行，且中文下信息按钮位置错误（SignKirigami）
  - “开机屏幕” 没有预览图片，待查（白铭骢）
  - “桌面动效”：默认关闭最大化、全屏及气泡动效及气泡滑动效果（白铭骢）
  - “Plasma 搜索”（Baloo 桌面索引）应默认关闭（白铭骢）
  - “时区” 选项（SignKirigami）
      - 存在冗杂条目，KDE 5 无此问题
      - 部分地区国旗未正确显示
      - 部分本地化信息缺失
- 气象站 Applet 问题（SignKirigami）
  - 搜索时按回车会直接关闭面板
  - SignKirigami 报告有偶发崩溃
  - 设置界面标题错误：“设置天气报告… 设置”

其他待办事项
------

- 实现第一轮评审中确认的默认配置修改项（白铭骢）
- 换用 Plasma Login Manager（白铭骢）
    - sddm-kcm 无需预装（因为切换到了 Plasma Login Manager）
    - 确认默认使用 Plasma Login Manager 可能造成的风险点（如无 EFI Framebuffer 且无可用 DRM 驱动的平台，效果会如何；另须确认支持不完整的平台无法显示 Login Manager 是否属于问题）
- PySide 6 引入了 LLVM 20，需将其剔除（白铭骢）
- Backport KWin OpenGL ES 支持降级（Rick Liu）
- 集成 KRunner/Kicker 拼音搜索功能（SignKirigami）
- 检查 KDE 6 合并后仍需要依赖 KDE Frameworks 5 的软件并尝试更新或清退（BillZhou233）
