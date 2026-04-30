---
categories:
  - advisories
title: "安全公告：Linux 内核 (CVE-2026-31431)"
date: 2026-04-30T23:00:00+08:00
important: true
home: true
---

![Linux 内核更新安全公告](/assets/news/cve-copy-fail-20260430.webp)

2026 年 4 月 30 日，Linux 内核公布了 `algif_aead` 模块中的一个安全漏洞 [CVE-2026-31431](https://www.cve.org/CVERecord?id=CVE-2026-31431)（代号 [Copy Fail](https://copy.fail/)），可通过恶意程序实现本地提权。

目前我们已通过系统更新修补这一漏洞，请参考如下软件版本：

- 主线发行支持的设备：`linux+kernel >= 3:6.18.25`
- Apple silicon 设备：`linux+kernel+asahi >= 3:6.18.25`

请择机更新您的安同 OS（服务器、多用户或公用设备用户请加急此更新）。

如果您在安装该更新过程中遇到问题，或对本安全公告有任何疑问或建议，欢迎您来我社[各聊天群组](https://aosc.io/contact)与我们联系反馈。
