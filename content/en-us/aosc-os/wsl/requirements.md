---
title: System Requirements - AOSC OS on WSL
---

AOSC OS on WSL is available for devices running Windows. Its system requirements are similar to that of AOSC OS's. However, WSL and WSLg dictates additional requirements for processors, graphics cards, storage devices, and network connection, as well as Windows versions and components.

Below is a table of system requirements to guarantee good user experience.

System Requirements - AOSC OS on WSL (x64):

| Software/Hardware Components | Requirement(s)                                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Processor                    | x86-64 (Intel 64 or AMD64) prcoessors, with VMM features such as Intel VT or AMD-V, XD or NX bit, as well as SLAT        |
| OS Components                | Windows 10, Version 1607 or above (for WSLg applications, Windows 10, Version 2004 or above, or Windows 11 is required)  |
| Graphics                     | WSLg-compatible GPU drivers (when using graphical and OpenGL-accelerated applications via WSLg)                          |
| RAM                          | 4GiB                                                                                                                     |
| Storage                      | 4GiB                                                                                                                     |
| Networking                   | Internet connectivity                                                                                                    |

System Requirements - AOSC OS on WSL (ARM64):

| Software/Hardware Components | Requirement(s)                                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Processor                    | Processors compatible with Windows on ARM                                                                                |
| OS Components                | Windows 10, Version 1709 or above (for WSLg applications, Windows 10, Version 2004 or above, or Windows 11 is required)  |
| Graphics                     | WSLg-compatible GPU drivers (when using graphical and OpenGL-accelerated applications via WSLg)                          |
| RAM                          | 4GiB                                                                                                                     |
| Storage                      | 4GiB                                                                                                                     |
| Networking                   | Internet connectivity                                                                                                    |

## Additional Notes

- AOSC OS on WSL does not support 32-bit x86 (Windows x86) or ARM (Windows ARM32).
- Nested virtualisation is required when running AOSC OS on WSL requires in virtual machines.
- Most AOSC OS applications assumes good VT support - as such, it is recommended to use latest Windows Terminal rather than Windows Console (the former requires Windows 10, Verison 2004 or newer).
- systemd support found in WSL 2 requires WSL 0.67.6 or newer.
- It is recommended to use the latest Windows, WSL, and Windows Terminal versions - maintainers may not be able to provide assistance on versions unsupported/no longer supported by Microsoft.
- Please use solid-state drive as system storage where possible - the superior random read/write performance found on solid-state drives will significantly improve system responsibility, as well as general user experience whilst installing software and multitasking.
- AOSC OS updates via the Internet - please maintain a stable Internet connection for timely system updates.

## References

- [Instruction Set Architecture Support Matrix - AOSC OS](/aosc-os/isa)
