---
categories:
  - security
title: "安同 OS 每周安全公告 (2026/7/28)"
date: 2026-07-28T23:00:00+08:00
important: true
home: false
---

![安同 OS 每周安全公告 (2026/7/28)）](/assets/news/cve-weekly-20260728.webp)

在过去一周（2026 年 7 月 22 日至 2026 年 7 月 28  日），安同 OS 维护者共发布了 13 个安全更新，包含针对 306 个安全漏洞的修复，其中 1 个被认定为严重 (Critical) 漏洞，53 个被认定为高危漏洞。

本周较需要关注的安全更新有 Firefox 153.0 修复的 [Mozilla 基金会第 2026-68 号安全公告](https://www.mozilla.org/en-US/security/advisories/mfsa2026-68/)中披露的 63 个安全漏洞（含 20 个高危漏洞）、Thunderbird 153.0 修复的 [Mozilla 基金会第 2026-71 号安全公告](https://www.mozilla.org/en-US/security/advisories/mfsa2026-71/)中披露的 61 个安全漏洞（含 20 个高危漏洞）、socat 1.8.1.3 修复的 1 个堆缓冲区溢出漏洞（漏洞编号 [CVE-2026-56123](https://www.cve.org/CVERecord?id=CVE-2026-56123)，严重性：严重）及 Oracle VM VirtualBox 7.2.14 修复的 [Oracle 重要更新公告（2026 年 7 月）](https://www.oracle.com/security-alerts/cpujul2026.html)中披露的 15 个安全漏洞（含 5 个高危漏洞和 7 个中危漏洞）。

更新指引
---

请使用 oma 更新您的系统：

```bash
oma upgrade
```

在更新确认界面，oma 将向您展示安全更新的详情（安全更新条目标题为红色加粗字体）。

我们强烈推荐您及时更新您的安同 OS。

安全更新详表
---

以下末尾加  **\[\*\]** 的条目为包含高危（及以上）漏洞修复的更新。

- exim: 4.99.4 → 4.99.5
- firefox: 152.0 → 153.0  **\[\*\]**
- gitea: 1.26.2 → 1.27.0
- imagemagick: 6.9.13+44 → 7.1.2+27
- inetutils: 2.8 → 2.8-1
- imagemagick: 6.9.13+44 → 7.1.2+27
- libjxl: 0.11.2 → 0.12.0
- imagemagick: 6.9.13+44 → 7.1.2+27
- libssh, libssh+32: 0.12.0 → 0.12.1  **\[\*\]**
- ntfs-3g: 2022.10.3 → 2026.7.7  **\[\*\]**
- redis: 8.8.0 → 8.8.1
- socat: 1.8.0.3 → 1.8.1.3  **\[\*\]**
- vim: 9.2.0838 → 9.2.0854
- virtualbox: 7.2.12 → 7.2.14  **\[\*\]**