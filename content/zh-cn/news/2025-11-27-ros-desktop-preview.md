---
categories:
  - advisories
title: "ROS Jazzy 测试公告"
date: 2025-11-27T23:15:00+08:00
important: true
home: true
---

![ROS 登陆安同 OS！](/assets/news/aosc-ros-desktop.webp)
> ROS 登陆安同 OS！

Robot Operating System (ROS)是一套完全开源的用于构建机器人应用软件库和工具。包括了驱动程序、算法和开发工具等构建机器人项目所需的软件。

近日，我们将 Desktop 变种的 [Jazzy Jalisco 版本的 ROS](https://docs.ros.org/en/jazzy/Releases/Release-Jazzy-Jalisco.html) 引入了安同 OS ，使安同 OS 上的机器人相关开发工作更加便利。由于 ROS 复杂度高，涉及数百个互相耦合的包，所以在进入稳定分支前我们希望有更多的用户可以对它进行测试。

需要注意的是，相比较 ROS 官方打包的 `ros-jazzy-desktop`，我们打包的版本缺少了 RTI Connext DDS（不开源）和 mimick_vendor（缺少架构支持）。

测试指南
---

感兴趣的用户，特别是正在使用非 x86 架构的，请考虑通过如下命令加入测试源：

```bash
oma topics --opt-in ros-jazzy-survey-20251031
oma install ros-jazzy-desktop
```

成功安装软件包后，在每个终端窗口都需要[使用 source 命令](https://docs.ros.org/en/jazzy/Installation/Ubuntu-Install-Debs.html#id8)后才能使用 ROS（有 `setup.bash`, `setup.sh`, `setup.zsh` 可选）：

```bash
source /opt/ros/jazzy/setup.bash
```

我们期待您的测试与反馈！如果您在测试的过程中遇到问题或有任何建议，欢迎您来我社[各聊天群组](https://aosc.io/contact)与我们联系反馈。

> 本篇配图使用 Nano Banana Pro 生成。

> The "nine dots" ROS logo is a trademark of Open Source Robotics Foundation.