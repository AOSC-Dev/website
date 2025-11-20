---
categories:
  - journals
title: "安记冰室・九月号"
date: 2025-10-01T02:00:00+08:00
important: false
home: false
---

本期编辑：ZeroAurora Camber  
本期审校：白铭骢

> 咕咕咕——

欢迎阅读安同开源社区 (AOSC) 期刊《安记冰室》！本栏目旨在以轻松可及的方式，以图文形式介绍过去一个月的开发进展、社区事务与近期社区内外活动资讯。本栏目不发表评论性内容。

## 编者按：私密吗喽——

是谁说的每个月第三个周末更新来着？（笑）

其实《安记冰室》九月号早在当时便已大致定稿，但因编辑团队事务缠身，美工和发布工作被迫一拖再拖，最终赶在九月的尾巴 ~~（30 小时制）~~ 发布了——在此向关注安同社区动态的读者致歉，久等了！

本月的月刊编撰工作反映出了一些人手上的问题：我们急需新的具有平面设计能力的编者与参与审校的志愿者。如果您对《安记冰室》的编辑工作感兴趣，欢迎移步各聊天群组与我们聊聊。

说来也巧，发布日正值国庆中秋双节同庆，安同开源社区在此祝大家节日快乐！

## 安同 OS 重要更新一览

在过去的一个月时间，安同 OS 发布了一系列重要更新，**请尽快更新您的安同 OS！**

（时间范围：2025 年 8 月 17 日至 2025 年 9 月 30 日）

### 安全更新

- CUPS 打印系统 2.4.13：修复两个安全漏洞，漏洞编号 CVE-2025-58060, CVE-2025-58364（含一个严重漏洞）
- curl 8.16.0：修复一处 Cookie 越界读取 (Out-of-bound cookie path read) 漏洞，漏洞编号 CVE-2025-9086（严重性：低），及一处可预测 WebSocket 掩码漏洞，漏洞编号 CVE-2025-10148（严重性：低）
- Exim 4.98.2：修复一处远程 SQL 注入漏洞，漏洞编号 CVE-2025-26794（严重性：高）；修复一处提权漏洞，漏洞编号 CVE-2025-30232（严重性：高）
- Expat XML 解析器 2.7.2：修复一处内存放大型拒绝服务 (DoS) 漏洞，漏洞编号 CVE-2025-59375（严重性：高）
- Firefox 143.0：修复 Mozilla 基金会第 2025-73 号安全公告中披露的 11 个安全漏洞（含 3 个高危漏洞）
- Go 1.25.1 安全更新：修复八处安全漏洞（含 2 个严重漏洞，6 个高危漏洞）
- Linux 内核，版本 6.16.7：包含针对 AMD、Intel 及海光平台的 VMSCAPE 漏洞规避，并修复 AMD Radeon RX 9000 系列在龙架构等平台无法正确驱动的问题
- Perl JSON::XS 4.04：修复一处堆缓冲区溢出 (Heap-based Buffer Overflow) 漏洞，漏洞编号 CVE-2025-40928（严重性：高）
- Thunderbird 143.0：修复 Mozilla 基金会第 2025-77 号安全公告中披露的 9 个安全漏洞（含 3 个高危漏洞）
- UDisks 2.10.2：修复一处越界读取 (out-of-bounds read) 漏洞，漏洞编号 CVE-2025-8067（严重性：高）
- WebKitGTK 2.48.6：修复 WebKitGTK 及 WPE WebKit 第 WSA-2025-0005 号安全公告中披露的 10 个安全漏洞

### 其他更新

- 小熊猫包管理 (oma) 1.21.0：新增帮助信息及手册本地化，以及使用中内核保护功能、why 命令修复及 OSC 9;4 终端进度反馈等新特性
- Linux 内核，版本 6.16.0：包含大量新设备支持及功能修复，为龙架构引入 16KiB/4KiB 分页双内核功能、修复部分 Lenovo ThinkBook 型号 FnLock 及背光在重启后被错误复位的问题，修复部分 USB 音频设备静音阈值设置错误的问题，修复龙芯 3B6000/3C6000 家族 KVM 客户机稳定性问题，修复龙芯 3A5000/3A6000 笔记本电脑屏幕背光调整功能，为龙架构及 RISC-V 启用 AMDGPU KFD（异构计算）支持，并引入 SG2042/2044 平台初步支持
- systemd SysRq 默认设置更新：默认启用除调试转储以外的所有 SysRq 组合键

## 别了，LTS：Linux 6.12 长期支持内核停止维护

![搞不赢噻！](/assets/news/coffee-break/20251001/imgs/linux-kernel-lts-retirement.webp)

作为一个同时兼顾稳定性和及时性的发行版，安同 OS 一直紧跟着上游的补丁动向，通过及时向内核源代码树中移植补丁来为用户提供上游的最新工作成果。一段时间以来，安同 OS 同时跟进着三个内核版本的维护：主线稳定版（Mainline）、长期支持版（LTS）和预发布版 (RC)。

然而，安同 OS 的 LTS 内核的补丁维护工作长期处于无效状态。具体而言，我们针对主线内核维护了一套总计约 350 个补丁且在不断扩张的补丁集，这些补丁往往会引入新功能、改变设备行为。一直以来，这些补丁直接应用到了 LTS 内核的源码中，实际上破坏了 LTS 内核“冻结功能”的基本假设。而若是手动筛选补丁以避免增加新功能，不但大量耗费维护精力，还会给选择 LTS 内核的用户带来使用体验上的不便。

此外，在上游内核的维护工作中，补丁一般首先合入主线分支（抑或对应的子系统）中。而后，若该补丁抄送到了 stable 邮件列表，稳定分支的维护者便会手动将补丁摘取到各自维护的分支中。但是，因为这个流程基本依靠手动，而稳定分支的维护者对各个子系统的开发、技术状态的掌握难以做到透彻，尽管维护者会在邮件列表发布测试公告并预留测试时间，修复不完整、回归等问题亦时有发生。此时，测试工作还是落在了发行版维护者和用户身上。

基于这一现象，加之以安同 OS 另有维护一组规模可观的补丁的情况，LTS 内核的维护难度非常高。和广为流传的猜测不同的是，LTS 并不能真正代表“稳定性”：只要维护、测试和用户支持工作到位，即使是最新的内核也能令人满意；而倘若缺乏修缮工作，即使是 LTS 内核也可能漏洞百出。

种种因素叠加之后，摆在维护者面前的 LTS 内核陷入了鸡肋一样的困境：食之无味，弃之可惜。在社区内部讨论后，我们决定终止对 Linux LTS 内核的维护工作，并鼓励用户切换到稳定版。

如果您正在使用 LTS 内核，请尽快切换。具体而言，您应当先安装稳定版内核：

```
oma install linux+kernel
```

然后卸载 LTS 内核：

```
oma remove linux+kernel+lts
```

如果您不清楚什么是 LTS 内核，那么您大概无须关注此项变更。

## 好耶！安同 OS 登陆操作系统信息网站 DistroWatch

![DistroWatch 信息页](/assets/news/coffee-break/20251001/imgs/distrowatch.webp)

[DistroWatch](https://distrowatch.com/) 是一个有着二十余年历史的开源操作系统信息网站，收录有各式 Linux 发行版、BSD 变种与其他操作系统的介绍信息和最新资讯。该网站在开源操作系统社区，尤其是 Linux 发行版社区中，具有着较高的知名度。

此前，社区贡献者 [abc1763613206](https://github.com/abc1763613206) 向 DistroWatch 网站方提交了安同 OS 的收录申请。9 月 22 日，他为我们带来了一个好消息：[安同 OS 的介绍页](https://distrowatch.com/table.php?distribution=aosc)顺利上线了！

尽管安同 OS 目前仍主要服务于中文使用者，DistroWatch 介绍页依然有助于扩大安同 OS 的影响力。之后各位好友向身边人推荐安同 OS 的时候，终于可以像推荐其他发行版一样附带 DistroWatch 的链接啦！

## 咕咕嘎嘎：小熊猫包管理 (oma) v1.21 更新

![oma 1.21：让我也一起说中文！](/assets/news/oma-1.21.webp)

> 让... 让我也一起说中文！

小熊猫包管理在 9 月 9 日考得中文十级！

本版更新，我们为 oma 实现了帮助信息及用户手册 (man pages) 中文翻译，方便各位了解 oma 的各项功能和参数。此外，我们还引入了使用中 Linux 内核的卸载保护、终端进度显示和自定义命令等一系列新功能：1.21 版更新内容相当丰富。

![oma v1.21 中文帮助信息](/assets/news/oma-1.21-help-chinese.webp)

您可以在[此处](https://aosc.io/news/detail/2025-09-09-oma-1.21-preview.zh-cn.md)阅读 oma 1.21 的完整更新公告。

### 安装指北

oma v1.21 日前已经推送安同 OS 稳定源，更新系统即可获取。

我们亦同步将 oma 更新推送到了我们的 Debian/Ubuntu 软件源中，Debian、Ubuntu 及衍生版，Linux Mint、deepin 及 openKylin 用户可以通过如下命令获取 oma v1.21 更新。

```sh
curl -sSf https://repo.aosc.io/get-oma.sh | sudo sh
```

## 新闻汇总

本节用以汇集过去一个月中我社发布的新闻和公告，以供读者查阅。

- [Bash 拼音补全 v0.3.0 更新日志](https://aosc.io/news/detail/2025-08-30-bash-pinyin-completion-rs-0.3.0-preview.zh-cn.md)（2025 年 8 月 30 日）
- [安同 OS 测试公告：内核更新 (6.16, 6.17)](https://aosc.io/news/detail/2025-09-03-kernel-testing-advisory.zh-cn.md)（2025 年 9 月 3 日）
- [小熊猫包管理 (oma) v1.21 测试公告](https://aosc.io/news/detail/2025-09-09-oma-1.21-preview.zh-cn.md)（2025 年 9 月 9 日）

## 例会纪要汇总

本节用以汇集过去一个月内社区例会纪要链接，若有意参与社区例会，敬请留意我社各聊天群组消息。

- [2025 年 8 月 30 日](https://aosc.io/news/detail/2025-08-30-contributor-minutes.zh-cn.md)
    - 开源之夏项目研发情况同步
    - oma Clap 本地化功能测试及翻译整理
    - Devena + OOBE 实现情况同步
    - bash-pinyin-completion-rs 发行注记定稿
    - 主题制维护流程调整及中文翻译
    - 软件包样式指南修改
    - 长期维护分支沟通问题
    - k8s 及云服务相关软件包维护讨论
    - KDE 中文搜索功能测试
    - 其他维护疑难问题讨论、PR 审阅请求等现场处理
- [2025 年 9 月 6 日](https://aosc.io/news/detail/2025-09-06-contributor-minutes.zh-cn.md)
    - 开源之夏项目研发情况同步
    - Linux 内核及 GRUB 更新交付评审
    - KDE 中文搜索功能第二轮测试
    - 更新 PR 模板并添加审阅待办
    - BuildIt! with_topics 功能测试
    - Aoska 设计稿评审
    - 其他维护疑难问题讨论、PR 审阅请求等现场处理
- [2025 年 9 月 27 日](https://aosc.io/news/detail/2025-09-27-contributor-minutes.zh-cn.md)
    - 同步开源之夏项目研发、结项情况
    - KDE 6 默认配置初步评审、测试
    - Kaboom 实现改进讨论
    - 其他维护疑难问题讨论、PR 审阅请求等现场处理
    - 《安记冰室》九月号发布讨论

## 红花榜

感谢在过去一个月中参与 AOSC 项目开发和维护工作的各位同事（统计时段：2025/09/30 之前 31 天）：

- [abc1763613206](https://github.com/abc1763613206)
- [AirFortressIlikara](https://github.com/AirFortressIlikara)
- [aosc-buildit-bot](https://github.com/aosc-buildit-bot)
- [BenderBlog](https://github.com/BenderBlog)
- [bh1xaq](https://github.com/bh1xaq)
- [billchenchina](https://github.com/billchenchina)
- [black-desk](https://github.com/black-desk)
- [CAB233](https://github.com/CAB233)
- [CamberLoid](https://github.com/CamberLoid)
- [chenx97](https://github.com/chenx97)
- [Cherrling](https://github.com/Cherrling)
- [Cryolitia](https://github.com/Cryolitia)
- [CSharperMantle](https://github.com/CSharperMantle)
- [Cyanoxygen](https://github.com/Cyanoxygen)
- [darkyzhou](https://github.com/darkyzhou)
- [eatradish](https://github.com/eatradish)
- [Fearyncess](https://github.com/Fearyncess)
- [grayawa](https://github.com/grayawa)
- [HmnSn](https://github.com/HmnSn)
- [Icenowy](https://github.com/Icenowy)
- [liushuyu](https://github.com/liushuyu)
- [LuolikongQwQ](https://github.com/LuolikongQwQ)
- [MingcongBai](https://github.com/MingcongBai)
- [miwu04](https://github.com/miwu04)
- [OriginCode](https://github.com/OriginCode)
- [ouankou](https://github.com/ouankou)
- [ouni666](https://github.com/ouni666)
- [outloudvi](https://github.com/outloudvi)
- [pch666777](https://github.com/pch666777)
- [prcups](https://github.com/prcups)
- [pugaizai](https://github.com/pugaizai)
- [qaqland](https://github.com/qaqland)
- [rickliu2000](https://github.com/rickliu2000)
- [RyogiMutsuki](https://github.com/RyogiMutsuki)
- [ShellWen](https://github.com/ShellWen)
- [SkyBird233](https://github.com/SkyBird233)
- [sparrowhe](https://github.com/sparrowhe)
- [stdmnpkg](https://github.com/stdmnpkg)
- [stydxm](https://github.com/stydxm)
- [wxiwnd](https://github.com/wxiwnd)
- [xflcx1991](https://github.com/xflcx1991)
- [Xinmudotmoe](https://github.com/Xinmudotmoe)
- [xry111](https://github.com/xry111)
- [xtexx](https://github.com/xtexx)

## 一起吹水

我社成员遍布世界各地，正因这一特质，我们的日常工作和交流基本都通过互联网进行。每天，社区好友们在我们的众多聊天群组中工作、交流和娱乐。若您对我们的工作感兴趣，欢迎来一起聊天吹水！

我社的各个即时聊天群组的加入方式可在[门户网站](https://aosc.io/contact)上找到。

## 栏目介绍

《安记冰室》是我社用于工作展示的月刊，每月不定时发布，发布平台包括：

- 社区门户
- 微信公众号“安同开源”

此外，我们正寻求国内开源及 Linux 相关媒体的朋友合作，一起将我社的工作和文化广而告之。