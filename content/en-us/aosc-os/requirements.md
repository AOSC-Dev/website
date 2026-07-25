---
title: AOSC OS System Requirements
---

AOSC OS is a desktop-oriented and reletively feature-complete operating system, the pre-installed software and basic management features have certain requirements on CPU, GPU, storage, and internet connectivity. Based on our testing, we have summarized the system requirements below, which considers good user experience as basic baseline.

| Component        | Requirement                                                      |
| ---------------- | ---------------------------------------------------------------- |
| Processor        | Any processor compatible with AOSC OS                            |
| Memory           | At least 2 GiB                                                   |
| GPU              | GPU supporting OpenGL 2.1 / OpenGL ES 3.1 or later               |
| Storage          | At least 64 GiB                                                  |
| Network          | Internet connection                                              |

## Additional Notes

- For details on processors compatible with AOSC OS, please refer to the [AOSC OS Architecture Support Specifications](/en-us/aosc-os/isa).
- Web browsing significantly increases memory and CPU usage. If you plan to browse a large amount of web pages or watch high-definition stream content, we recommend using AOSC OS on a device with at least 4 CPU cores and 4 GiB of RAM.
- Generally, a GPU with at least 2 GiB of VRAM is required for a smooth AOSC OS desktop experience at 4K resolution.
- The recommended storage capacity ensures sufficient space for daily work and system updates after installation. If your device has a large amount of memory, the installer will create a larger swap file by default, please account for this when partitioning.
- Use an SSD as your primary system drive if possible. The superior random read/write performance of SSDs significantly improves system responsiveness, software installation speeds and multitasking performance.
- AOSC OS receives updates over the internet. Please ensure a stable internet connection to receive timely system updates.

## Support Documentation

- [AOSC OS Architecture Support Specifications](/en-us/aosc-os/isa)
