---
title: AOSC OS and Secure Boot
---

AOSC OS does not support Secure Boot. It is required to disable Secure Boot in the UEFI firmware settings before booting up AOSC OS or the installation media.

If your device came with Windows preinstalled, or you have installed Windows with Secure Boot enabled, please be aware of the following:

- If you are playing online games with kernel level anti-cheat system (e.g. BattlEye, EA Anti-Cheat, Easy Anti-Cheat), we recommend that you install AOSC OS in a virtual machine or with another supported device.
- Please check BitLocker status in your Windows installation, and deactivate BitLocker if it is active.
  - You need to select "Turn off BitLocker". Do not select "Suspend protection".
  - In most cases, Windows will fail to boot if Secure Boot is disabled before deactivating BitLocker (Windows will ask for a BitLocker recovery key).

::h2{id="secure-boot-faq"}
Why does AOSC OS not support Secure Boot?
::

AOSC OS does not support Secure Boot due to numerous reasons, however they can be categorized into the following:

- We do not hold a legal entity and, as a result, is unable to apply and sign the kernel and bootloader with Secure Boot certificate(s) from Microsoft.
- It is difficult to justify the substantial expenses associated with purchasing the certificate.

We kindly ask for your understanding.
