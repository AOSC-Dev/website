---
title: AOSC OS Architecture Support Specifications
---

AOSC OS supports various processor architectures. This table introduces the supported processor architectures, their corresponding microarchitecture instruction set extensions, package architecture names, and compiler target names. The architectures are categorized into three tiers: Tier 1, Tier 2, and Experimental, with different levels of support and maintenance.

## Tier 1 Architectures

Tier 1 architectures represent the highest level of support in AOSC OS, offering the most comprehensive software and feature support, as well as the most timely updates. These architectures have a larger user base among developers, which allows more thorough testing while using.

| Processor Architecture | Microarchitecture Instruction Set Extension Requirements | Package Architecture Name | Compiler Target Name             |
| ---------------------- | ---------------------------------------------------------- | ------------------------- | -------------------------------- |
| x86-64                 | SSE2\*                                                     | `amd64`                   | `x86_64-aosc-linux-gnu`          |
| AArch64                | ARMv8.0, NEON                                              | `arm64`                   | `aarch64-aosc-linux-gnu`         |
| LoongArch              | LSX                                                        | `loongarch64`             | `loongarch64-aosc-linux-gnu`     |

\*: Some software (e.g., Blender) may require more advanced microarchitecture instruction set support, such as AVX2.

## Tier 2 Architectures

Tier 2 architectures are relatively completely supported in AOSC OS, but the range of available software and features may be limited, and updates may be delayed. Due to a smaller developer user base and less usage, testing on these architectures may be incomplete.

| Processor Architecture            | Microarchitecture Instruction Set Extension Requirements | Package Architecture Name | Compiler Target Name               |
| --------------------------------- | -------------------------------------------------------- | ------------------------- | ---------------------------------- |
| Loongson 3 (MIPS) \*              | None                                                     | `loongson3`               | `mips64el-aosc-linux-gnuabi64`     |
| POWER (64-bit, Little Endian)     | AltiVec, VMW, VSX                                        | `ppc64el`                 | `powerpc64le-aosc-linux-gnu`       |
| RISC-V (64-bit)                   | G, C                                                     | `riscv64`                 | `riscv64-aosc-linux-gnu`           |

\*: This series includes models such as Loongson 3A1000, 3A1500-I, 3A2000(C), 3A3000, 3A4000, 3B1000, 3B1500, 3B2000, 3B3000, and 3B4000. Models numbered 5000 or above are all based on the LoongArch architecture.
