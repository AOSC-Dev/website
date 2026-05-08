---
categories:
  - advisories
title: "安全公告：Linux 内核本地提权漏洞（代号 Dirty Frag）"
date: 2026-05-08T15:00:00+08:00
important: true
home: true
---

![Linux 内核更新安全公告：本地提权漏洞（代号 Dirty Frag）](/assets/news/cve-dirty-frag-20260508.webp)

2026 年 5 月 8 日，独立安全研究员 Hyunwoo Kim [披露了](https://www.openwall.com/lists/oss-security/2026/05/07/8) Linux 内核 `esp4`、`esp6` 及 `rxrpc` 模块中的一系列漏洞（CVE-2026-43284 及 CVE-2026-43500，代号 [Dirty Frag](https://github.com/V4bel/dirtyfrag)），可通过恶意程序实现本地提权。

目前我们已通过系统更新修补这一漏洞，请参考如下软件版本：

- 主线发行支持的设备：`linux+kernel >= 3:6.18.27`
- Apple silicon 设备：`linux+kernel+asahi >= 3:6.18.27`

请择机更新您的安同 OS（服务器、多用户或公用设备用户请加急此更新）。

如果您在安装该更新过程中遇到问题，或对本安全公告有任何疑问或建议，欢迎您来社区[各聊天群组](https://aosc.io/contact)与我们联系反馈。
