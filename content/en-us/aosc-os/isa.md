---
title: Instruction Set Architecture Support Matrix - AOSC OS
---

AOSC OS supports a wide range of instruction set architectures. The table below outlines Afterglow's supported architectures as well as ISA extension requirements, dpkg architecture, as well as target triples.

AOSC OS ports are catagorised into primary, secondary, and experimental (tertiary) architectures, denoting different levels of support and quality of maintenance - as shown below.

## Primary Architectures

Primary architectures are best supported by AOSC OS. Primary architectures get the most complete software selection and features, and are most timely updated. Devices based on the primary architectures are commonly used amongst AOSC OS developers and as such, gets the most comprehensive user testing. 

| Instruction Set Architecture  | ISA Extensions Required  | dpkg Architecture | Target Triple                  |
| ----------------------------- | ------------------------ | ------------- | ---------------------------------- |
| x86-64                        | SSE2\*                   | `amd64`       | `x86_64-aosc-linux-gnu`            |
| AArch64                       | ARMv8.0, NEON            | `arm64`       | `aarch64-aosc-linux-gnu`           |
| LoongArch                     | LSX                      | `loongarch64` | `loongarch64-aosc-linux-gnu`       |

\*: Some applications (such as Blender) may require newer ISA extensions, such as AVX2.

## Secondary Architectures

Secondary architectures are adequately supported by AOSC OS, but may be limited in software selection and features. They may also experience delay in updates. Devices based on these architectures are less commonly available and less frequently used and, as such, user testing may be incomplete.

| Instruction Set Architecture  | ISA Extensions Required  | dpkg Architecture | Target Triple                  |
| ----------------------------- | ------------------------ | ------------- | ---------------------------------- |
| Loongson 3 (MIPS) \*          | None                     | `loongson3`   | `mips64el-aosc-linux-gnuabi64`     |
| POWER (64-bit, little endian) | AltiVec, VMW, VSX        | `ppc64el`     | `powerpc64le-aosc-linux-gnu`       |
| RISC-V (64-bit)               | G, C                     | `riscv64`     | `riscv64-aosc-linux-gnu`           |

\*: This series of processors include models such as Loongson 3A1000, 3A1500-I, 3A2000(C), 3A3000, 3A4000, 3B1000, 3B1500, 3B2000, 3B3000, and 3B4000, etc.；model names suffixed with 5000 or higher are LoongArch-based processors.
