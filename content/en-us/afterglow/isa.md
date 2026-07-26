---
title: Afterglow OS Architecture Support Specifications
---

Afterglow OS supports various processor architectures. This table introduces the supported processor architectures, their corresponding microarchitecture instruction set extensions, package architecture names, and compiler target names.

::div{id="afterglow-isa-table"}
| Processor Architecture                | Microarchitecture Instruction Set Extension Requirements | Package Architecture Name  | Compiler Target Name            |
| ------------------------------------- | -------------------------------------------------------- | -------------------------- | ------------------------------- |
| Alpha                                 | None                                                     | `alpha`                    | `alpha-aosc-linux-gnu`          |
| ARMv4                                 | None                                                     | `armv4`                    | `arm-aosc-linux-gnueabi`        |
| ARMv6 (Hard Float)                    | Thumb-2, NEON                                            | `armv6hf`                  | `arm-aosc-linux-gnueabihf`      |
| ARMv7 (Hard Float)                    | Thumb-2, NEON                                            | `armv7hf`                  | `arm-aosc-linux-gnueabihf`      |
| MIPS-based Loongson 2 Processors\*    | LoongMMI                                                 | `loongson2f`               | `mips64el-aosc-linux-gnuabi64`  |
| Intel 80486 or newer                  | None                                                     | `i486`                     | `i486-aosc-linux-gnu`           |
| Motorola 68000 Series Processors\*\*  | None                                                     | `m68k`                     | `m68k-aosc-linux-gnu`           |
| PowerPC (32-bit, Big Endian)          | None                                                     | `powerpc`                  | `powerpc-aosc-linux-gnu`        |
| PowerPC (64-bit, Big Endian)          | AltiVec                                                  | `ppc64`                    | `powerpc64-aosc-linux-gnu`      |
| SPARC (64-bit)                        | SPARC V9, VIS 1.0                                        | `sparc64`                  | `sparc64-aosc-linux-gnu`        |
::

\*: This architecture port only supports Loongson 2F processors; 2E and earlier models are not supported.

\*\*: This architecture port only supports 68020 and newer processor models equipped with a Memory Management Unit (MMU).

## Support Documentation

- [Afterglow OS System Requirements](/en-us/afterglow/requirements#afterglow-requirements-table)
