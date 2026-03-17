---
categories:
  - advisories
title: "Linux 内核 6.18.12 版本无法正常卸载"
date: 2026-03-17T19:00:00+08:00
important: true
home: true
---

![私密吗喽！我们又搞砸了，这次是 linux-kernel-6.18.12](/assets/news/oopsies-linux-kernel-6.18.12-20260317.webp)

由于打包疏忽，您在手动卸载 linux-kernel-6.18.12 内核包或清理未使用依赖时将遇到如下报错：

```
Removing left-over directory for DKMS modules ...
rm: 无法删除 '/usr/lib/modules//updates': 没有那个文件或目录
dpkg: 处理软件包 linux-kernel-6.18.12 (--remove)时出错：
 old linux-kernel-6.18.12 package postrm maintainer script subprocess failed with exit status 1
dpkg: 出现过多错误，正在停止
在处理时有错误发生：
 linux-kernel-6.18.12
由于出现了太多错误，处理过程被中止了。
```

该问题为打包该内核时未正确在卸载后处理脚本 (`postrm`) 中写入对应内核版本所导致。由于问题出现在软件包维护脚本中，因此简单更新无法解决该问题，需要在遇到该问题时手动绕过。

绕过方法
---

您可以通过如下命令替换系统中的 postrm 脚本并继续卸载：

```bash
echo "" | \
sudo tee /var/lib/dpkg/info/linux-kernel-6.18.12.postrm && \
sudo oma remove linux-kernel-6.18.12
```

然后，清理为该内核版本编译的内核模块：

```bash
[ -d /usr/lib/modules/6.18.12-aosc-main ] && \
sudo rm -r /usr/lib/modules/6.18.12-aosc-main
```

龙架构用户则需要移除两处内核模块目录：

```bash
for i in 4k 16k ; do
    [ -d /usr/lib/modules/6.18.12-aosc-main-$i ] && \
    sudo rm -r /usr/lib/modules/6.18.12-aosc-main-$i
done
```

我们再次为该内核包带来的不便表达歉意。我们会将卸载及更新测试加入软件包测试流程中，以确保安装及卸载流程通畅。

如果您在此过程中遇到问题或有任何建议，欢迎您来我社[各聊天群组](https://aosc.io/contact)与我们联系反馈。
