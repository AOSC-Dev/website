---
title: AOSC OS on WSL System Requirements
---

AOSC OS on WSL is designed for Windows-based devices, has similar basic system requirements to those of native AOSC OS. AOSC OS on WSL relies on technics such as WSL and WSLg, has specific demands on Windows system component versions in addition to processor, graphics, storage, and internet connectivity requirements. Based on our testing, we have summarized the system requirements below, which considers good user experience as basic baseline.

AOSC OS on WSL System Requirements (x64):

| Component       | Requirement                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Processor       | x86-64 compatible processor (Intel 64 or AMD64) with VMM features (Intel VT or AMD-V), XD/NX bit support and SLAT          |
| System Components | Windows 10 Version 1607 or later (Windows 10 Version 2004 or later, or Windows 11 for graphical applications via WSLg)   |
| GPU             | WSLg-compatible GPU driver (required for running graphical, OpenGL-accelerated applications via WSLg)                      |
| Memory          | At least 4 GiB                                                                                                             |
| Storage         | At least 4 GiB                                                                                                             |
| Network         | Internet connection                                                                                                        |

AOSC OS on WSL System Requirements (ARM64):

| Component       | Requirement                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Processor       | 64-bit ARM processor compatible with Windows on ARM                                                                        |
| System Components | Windows 10 Version 1709 or later (Windows 10 Version 2004+ or Windows 11 required for graphical applications via WSLg)   |
| Display         | Windows-compatible GPU driver (required for running graphical, OpenGL-accelerated applications via WSLg)                   |
| Memory          | At least 4 GiB                                                                                                             |
| Storage         | At least 4 GiB                                                                                                             |
| Network         | Internet connection                                                                                                        |

## Additional Notes

- AOSC OS on WSL does not support 32-bit x86 (Windows x86) or ARM (Windows ARM32) architectures.
- Nested virtualization must be enabled when running AOSC OS on WSL inside a virtual machine.
- Most AOSC OS applications assume great VT support. We recommend using latest Windows Terminal instead of Windows Console (the former requires Windows 10 Version 2004 or later).
- Systemd support in WSL 2 requires WSL version 0.67.6 or newer.
- We recommend keeping your operating system, WSL, and Windows Terminal up to date. Developers may not be able to assist with compatibility issues of software versions that are not supported by Microsoft.
- Use an SSD as your primary system drive if possible. The superior random read/write performance of SSDs significantly improves system responsiveness, software installation speeds and multitasking performance.
- AOSC OS receives updates over the internet. Please ensure a stable internet connection to receive timely system updates.

## Support Documentation

- [AOSC OS Architecture Support Specifications](/en-us/aosc-os/isa)
