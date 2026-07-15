---
categories:
  - advisories
title: "安同 OS 每周安全公告 (2026/6/9)"
date: 2026-06-09T19:15:00+08:00
important: true
home: false
---

![安同 OS 每周安全公告 (2026/6/9)）](/assets/news/cve-weekly-20260609.webp)

在过去一周（2026 年 6 月 2 日至 2026 年 6 月 9 日），安同 OS 共发布了 9 个安全更新，包含针对 32 个安全漏洞的修复，其中 11 个被认定为高危漏洞。

本周的漏洞中较为重要的有针对 Nginx 及 Apache HTTP 服务器 (httpd) 披露的代号为 [HTTP/2 Bomb](https://blog.calif.io/p/codex-discovered-a-hidden-http2-bomb) 的安全漏洞（Apache HTTP 服务器漏洞编号为 [CVE-2026-49975](https://www.cve.org/CVERecord?id=CVE-2026-49975)）。

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

以下末尾加 **\[\*\]** 的条目为包含高危漏洞修复的更新。

- `go`: 1.26.3+tools0.42.0 → 1.26.4+tools0.45.0 **\[\*\]**
- `httpd`: 2.4.67 → 2.4.68 **\[\*\]**
- `libinput`: 1.31.0 → 1.31.3 **\[\*\]**
- `nginx`: 1.30.1（先前已推送，漏洞于本周被披露） **\[\*\]**
- `pip`: 26.0.1 → 26.1.2
- `python-3`: 3.14.4 → 3.14.5-1 **\[\*\]**
- `redis`: 8.4.0 → 8.8.0 **\[\*\]**
