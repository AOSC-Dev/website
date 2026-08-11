---
categories:
  - security
title: "安同 OS 每周安全公告 (2026/8/11)"
date: 2026-08-11T22:00:00+08:00
important: true
home: false
---

![安同 OS 每周安全公告 (2026/8/11)）](/assets/news/cve-weekly-20260811.webp)

在过去一周（2026 年 8 月 4 日至 2026 年 8 月 11 日），安同 OS 维护者共发布了 5 个安全更新，包含针对 12 个安全漏洞的修复，其中 2 个被认定为严重 (Critical) 漏洞，3 个被认定为高危漏洞。

本周较需要关注的安全更新有 Linux 内核，版本 7.1.7 中修复的代号为 ["Zapscape"](https://github.com/V4bel/Zapscape) 的 KVM 逃逸漏洞（[CVE-2026-64561](https://www.cve.org/CVERecord?id=CVE-2026-64561)，严重性：高）及 Gitea 1.27.1 与 Forgejo 16.0.2 中修复的路径遍历漏洞（[CVE-2026-59774](https://github.com/go-gitea/gitea/security/advisories/GHSA-6v53-hr58-556r)，严重性：严重）与代码注入漏洞（[CVE-2026-60004](https://github.com/go-gitea/gitea/security/advisories/GHSA-rcr6-4jqh-j84m)，严重性：严重）。

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

以下末尾加 **\[\*\]** 的条目为包含高危（及以上）漏洞修复的更新。

- `forgejo`: 14.0.2-3 → 16.0.2 **\[\*\]**
- `gitea`: 1.27.0 → 1.27.1 **\[\*\]**
- `libheif`: 1.23.0 → 1.23.1 **\[\*\]**
- `linux-kernel`: 7.1.5-4 → 7.1.7-1 **\[\*\]**
- `openssh`: 10.4p1-1 → 10.5p1
- `udisks-2`: 2.11.0-3 → 2.11.2 **\[\*\]**
