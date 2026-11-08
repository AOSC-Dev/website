---
title: Oh My Ailurus (oma)
---

Oh My Ailurus (oma) is a package management frontend designed for distributions using [dpkg](https://wiki.debian.org/Teams/Dpkg), and serves as the default package management interface for [AOSC OS](/en-us/aosc-os). The primary design goals of oma are:

- **Improved APT Interface**: While remaining compatible with the commonly used APT package management tools on dpkg distributions, oma provides clearer interface guidance, error messages, and operational logic
- **Enhanced Safeguards**: Through clear guidance and mechanisms such as operation undo, oma helps you avoid wasting time and effort due to system failures caused by carelessness or other reasons
- **Optimized Network Performance**: With technologies such as HTTP/2 and multi-threaded downloading, oma significantly speeds up package installation and updates
- **Improved Usability**: Combining CLI (Command Line Interface) and TUI (Terminal User Interface), oma makes your system management experience easier and clearer
- **Integrated System Features**: Integrated with AOSC OS's testing repository and mirror metadata mechanisms, providing an one-stop system component management experience
- **Compatibility with Mainstream Systems**: Supporting mainstream dpkg-based distributions such as Debian, Ubuntu and deepin, making package management more accessible

[Source Code Repository](https://github.com/AOSC-Dev/oma) | [Download oma](en-us/download#oma-download)

![oma screenshot](/oma/oma.png)
