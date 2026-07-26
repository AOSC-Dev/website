---
title: Afterglow OS System Requirements
---

Afterglow OS is an operating system designed for legacy devices with limited capabilities, the pre-installed software and basic management features have certain requirements on CPU, GPU, storage, and internet connectivity. Based on our testing, we have summarized the system requirements below, which considers good user experience as basic baseline.

::div{id="afterglow-requirements-table"}
| Component      | Requirement                                                                         |
| -------------- | ----------------------------------------------------------------------------------- |
| Processor      | Any processor compatible with Afterglow OS                                          |
| Memory         | At least 64MiB                                                                      |
| GPU            | Any graphics card or framebuffer card supporting display output, or serial terminal |
| Storage        | At least 1GiB (Base Edition) or 3GiB (Desktop Edition)                              |
| Network        | Internet connection                                                                 |
::

## Additional Notes

- For details on processors compatible with Afterglow OS, please refer to the [Afterglow OS Architecture Support Specifications](/afterglow/isa).
- For the Desktop Edition with a graphical interface, SVGA resolution and color depth (800×600 resolution, 16-bit color depth / 65535 colors) are required.
- The recommended storage capacity ensures sufficient space for daily work and system updates after installation. If your device has a large amount of memory, the installer will create a larger swap file by default, please account for this when partitioning.

## Support Documentation

- [Afterglow OS Architecture Support Specifications](/en-us/afterglow/isa#afterglow-isa-table)
