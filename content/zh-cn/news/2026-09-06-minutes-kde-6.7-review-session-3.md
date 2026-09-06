---
categories:
  - minutes
title: "纪要：KDE 6 稳定源推送评审（2026/9/6，第三期）"
date: 2026-09-06T17:15:00+08:00
important: false
---

UTC+8 时间 2026 年 9 月 6 日 14:00，社区贡献者组织了 KDE 6 稳定源推送的第三轮评审，进一步复查了剩余已知问题、预装调整、默认配置及其他待办项。

经过本轮评审，我们认为 KDE 6 更新已非常接近稳定交付，十一假期有望正式合并。

是否使用 KDE 6.6 LTS？
---

2026 年 8 月 13 日，Kubuntu Focus、Techpaladin Software 及 KDE e.V. 于 EIN Presswire 公布了名为[“Bullet-proof KDE Software Initiative”](https://www.einpresswire.com/article/930823977/kubuntu-focus-techpaladin-software-and-kde-e-v-announce-the-bullet-proof-kde-software-initiative)的项目，旨在为从业人员、企业和公营单位维护 KDE 6.6 长期支持分支。

根据今日进行的 Kubuntu 26.04.1 测试，LTS 版本亦无对我们较为关注 X11 环境作特别关照，因此我们判断没有必要跟随 LTS 分支。

我们将继续推动 KDE 的更新，并继续维护必要的 X11 支持组件和代码。

软件包缺漏
---

- Aurorae: KWin 的主题引擎
- Union: 主题引擎

本轮预装调整
---

- 取消了如下组件的预装
    - `haruna`：性能远低于其后端 `libmpv` 且维护不活跃
    - `kamoso`：性能极差且维护不活跃，需要使用摄像头的用户一般也是在具体应用，如会议和聊天软件、OBS Studio 等场景使用，预装必要性不大
    - `plymouth-kcm`：用处有限且界面有显著问题，即各启动画面主题均未正确显示预览，需要重新实现或补充素材
    - `sddm`：换用 Plasma Login Manager
    - `tlp`：换用 power-profiles-daemon
- 新增了如下组件的预装
    - `audex`：用于 CD 抓轨
    - `mpc-qt`：类似 [MPC-HC](https://mpc-hc.org/)，替代 Haruna，同样使用 `libmpv`，性能显著更好
    - `power-profiles-daemon`：用于提供一站式电源方案管理

剩余问题
---

相对于[第一次](https://aosc.io/news/2026-06-18-minutes-kde-6.7-review-session-1)及[第二次](https://aosc.io/news/2026-07-05-minutes-kde-6.7-review-session-2)评审记录，KDE 6 在交付前仍需解决如下问题（括号中为计划解决相关问题的维护者）：

- KCalc 缺少依赖库 `mpc`（白铭骢）
- 应用菜单 (Kicker)
    - 设置中菜单图标预览未考虑暗色面板，设置了 `fill:currentColor` 属性的图标几乎不可见（白铭骢）
    - 预装的 Vim 不是图形化版本，应隐藏非图形化版本的 `.desktop` 文件（白铭骢）
    - “系统信息中心”启动项在两个类别（“帮助”及“系统”）下重复显示，应删除“帮助”下的启动项（白铭骢）
- Plasma Login Manager
    - 须设置默认壁纸《兴安秋韵》（白铭骢）
    - 设置壁纸后，界面中出现重复的壁纸（SignKirigami）
- 系统设置
    - “电源管理”设置：交流供电情况下应默认取消睡眠（白铭骢）
    - “屏幕边缘”设置：默认无法改为“无操作”，配置文件为空时有默认值，但设置为“无操作”的时候配置文件未有记录相关配置（SignKirigami）
    - “桌面特效”设置：默认启用“窗口背景虚化”，该设置可在不支持模糊的配置（如 LLVMpipe）下实现取消半透明的效果，提高界面可读性（白铭骢）
- 新的默认视频播放器 `mpc-qt` 须更改默认设置
    - 默认不显示播放列表（白铭骢）
    - 小幅度调整界面比例，默认大小更符合预期（白铭骢）
    - 设置 MIME 绑定（更换原来绑定在 Haruna 上的）（白铭骢）
- 桌面面板
    - 应默认禁用天气插件，其可访问性不良且 UI 不成熟（白铭骢）；根据第二次评审发现，该插件：
        - 搜索时按回车会直接关闭面板
        - SignKirigami 报告有偶发崩溃
        - 设置界面标题错误：“设置天气报告… 设置”
    - <b>（非关键）</b>应用进度显示功能未跟随单独窗口，如 Konsole 和 Dolphin 文件管理器（SignKirigami）
- 多屏幕支持
    - 调查用户报告的多屏幕插拔后，窗口布局混乱的问题（SignKirigami）
