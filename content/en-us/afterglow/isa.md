---
title: Instruction Set Architecture Support Matrix - Afterglow
---

Afterglow supports a wide range of instruction set architectures. The table below outlines Afterglow's supported architectures as well as ISA extension requirements, dpkg architecture, as well as target triples.

::div{id="afterglow-isa-table"}
| Instruction Set Architecture  | ISA Extensions Required  | dpkg Architecture | Target Triple                  |
| ----------------------------- | ------------------------ | ----------------- | ------------------------------ |
| Alpha                         | None                     | `alpha`           | `alpha-aosc-linux-gnu`         |
| ARMv4                         | None                     | `armv4`           | `arm-aosc-linux-gnueabi`       |
| ARMv6 (Hard Float)            | Thumb-2, NEON            | `armv6hf`         | `arm-aosc-linux-gnueabihf`     |
| ARMv7 (Hard Float)            | Thumb-2, NEON            | `armv7hf`         | `arm-aosc-linux-gnueabihf`     |
| Loongson 2 (MIPS)\*           | LoongMMI                 | `loongson2f`      | `mips64el-aosc-linux-gnuabi64` |
| Intel 80486 or Newer          | None                     | `i486`            | `i486-aosc-linux-gnu`          |
| Motorola 68000\*\*            | None                     | `m68k`            | `m68k-aosc-linux-gnu`          |
| PowerPC (32-bit, Big Endian)  | None                     | `powerpc`         | `powerpc-aosc-linux-gnu`       |
| PowerPC (64-bit, Big Endian)  | AltiVec                  | `ppc64`           | `powerpc64-aosc-linux-gnu`     |
| SPARC (64-bit)                | SPARC V9, VIS 1.0        | `sparc64`         | `sparc64-aosc-linux-gnu`       |
::

\*: This port only supports Loongson 2F - Loongson 2E and earlier models are not supported.

\*\*: This port only supports Motorola 68020 and newer processors, MMU is required.

## References

- [System Requirements - Afterglow](/afterglow/requirements#afterglow-requirements-table)