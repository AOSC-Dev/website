---
title: '[众筹成功] 龙架构主力构建服务器存储升级'
date: 2025-12-04
---

本次众筹旨在升级社区龙架构主力构建服务器 (YuanBao) 的存储。

2025 年初，一位社区好友向我们捐赠了一台搭载双路龙芯 3C6000/D 处理器的服务器。得益于这台服务器的性能，安同 OS 龙架构移植的维护效率得到了较大提升，也因此深受社区贡献者的喜爱。但近日我们发现其搭载的 800GB Intel 750 固态硬盘时常被占满，实际上影响到了社区自动化服务及各贡献者的使用，故发起该众筹，升级扩容该服务器使用的存储设备。

## 预算

由于近日闪存市场波动严重，价格不断提升，为尽可能减少价格上浮的风险，并综合考虑经济性，我们先行购买了一张北京忆恒创源 (Memblaze) PBlaze6 6536 (3.2TB) 固态硬盘，价格为 1680 元。

本次众筹用于报销该笔款项。

## 硬件说明

该固态硬盘运达时包装和配件完整，整体成色良好，其写入和寿命信息如下：

```
=== START OF SMART DATA SECTION ===
SMART overall-health self-assessment test result: PASSED

SMART/Health Information (NVMe Log 0x02, NSID 0xffffffff)
Critical Warning:                   0x00
Temperature:                        51 Celsius
Available Spare:                    100%
Available Spare Threshold:          5%
Percentage Used:                    15%
Data Units Read:                    10,443,449,815 [5.34 PB]
Data Units Written:                 13,869,090,112 [7.10 PB]
Host Read Commands:                 28,358,300,377
Host Write Commands:                14,919,881,755
Controller Busy Time:               192,911
Power Cycles:                       35
Power On Hours:                     12,463
Unsafe Shutdowns:                   2
Media and Data Integrity Errors:    0
Error Information Log Entries:      0
Warning  Comp. Temperature Time:    8877
Critical Comp. Temperature Time:    0
Thermal Temp. 1 Transition Count:   2733
Thermal Temp. 1 Total Time:         503991
```

`f3probe(1)` 检测结果如下：

```
root@aosc-73e563bf [ fio ] # f3probe /dev/nvme1n1
F3 probe 9.0
Copyright (C) 2010 Digirati Internet LTDA.
This is free software; see the source for copying conditions.

WARNING: Probing normally takes from a few seconds to 15 minutes, but
         it can take longer. Please be patient.

Probe finished, recovering blocks... Done

Good news: The device `/dev/nvme1n1' is the real thing

Device geometry:
                 *Usable* size: 2.91 TB (6251233968 blocks)
                Announced size: 2.91 TB (6251233968 blocks)
                        Module: 4.00 TB (2^42 Bytes)
        Approximate cache size: 0.00 Byte (0 blocks), need-reset=no
           Physical block size: 512.00 Byte (2^9 Bytes)

Probe time: 2.37s
```

使用[数码乱炖的 fio 测试脚本](https://github.com/bihell/fio/tree/2d95f5b1d462c47f8a77033f0da81fc4824d1977)测得性能如下，符合预期：

```
root@aosc-73e563bf [ fio ] # bash fio_mark.sh ssd /mnt
Executing SSD test:
                    Read [MB/s]     Read [IOPS]   Read [LAT_ns]    Write [MB/s]    Write [IOPS]  Write [LAT_ns]
     SEQ1M-Q8T1            6352            6352         1258250            4293            4293         1862165
     RND4K-Q1T1              50           13036           75473             175           44895           20935
   RND4K-Q32T16            4681         1198414          425980            2806          718472          710803
  SEQ128K-Q32T1            6255           50042          638504            4233           33868          943578
```

## 日程规划

- 2025 年 12 月初：下线维护服务器 (YuanBao) 时安装该固态硬盘，挂载在 `/buildroots` 供社区贡献者使用

## 参与人员

- Fearyncess "Lain" Yang <fearyncess@aosc.io>，采购负责人
- 白铭骢 <jeffbai@aosc.io>，服务器托管