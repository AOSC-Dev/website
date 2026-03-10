---
categories:
  - advisories
title: "hwdata 信息缺漏征集"
date: 2024-11-19T22:00:00+08:00
important: false
home: false
---

![](/assets/news/hwdata-missing.png)

在维护安同 OS 的过程中，我们发现[硬件信息数据库 hwdata ](https://github.com/vcrhonek/hwdata) 对许多新硬件信息的维护并不到位，导致许多硬件具体名称等信息缺失；如果在您的 Linux 机器上运行 `lspci` 或 `lsusb` 命令，发现有类似：
```
Intel Corporation device 008a
```
即：
```
[公司名] device xxxx
```
这样的输出，则说明目前 hwdata 中缺少您设备对应的正式名称；我们目前正在收集这些信息，并尝试向 hwdata 上游补全相关信息，让 PCI/USB 等硬件信息查阅更为便利。

如果您的设备有类似上述输出，欢迎您将 `lspci -nnk` 及/或 `lsusb` 的输出通过如下表单提交给我们，感谢！

> 本表欢迎所有 Linux 发行版的用户填写，欢迎扩散

[填写《hwdata 信息缺漏征集表》>>](https://f.wps.cn/g/CVMkcGLP/)

![](/assets/news/hwdata-missing-qr.png)
