<script setup lang="ts">
const { t } = useI18n();

type ArchCode =
  | 'amd64'
  | 'arm64'
  | 'loongarch64'
  | 'ppc64el'
  | 'riscv64'
  | 'loongson3';
const { archCode } = defineProps<{ archCode: ArchCode }>();

const archMapDocker: Record<ArchCode, string> = {
  amd64: 'amd64',
  arm64: 'arm64',
  loongarch64: 'loong64',
  ppc64el: 'ppc64le',
  riscv64: 'riscv64',
  loongson3: 'mips64le/loongson3'
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <p>
      {{ t('DownloadDetailsDocker.text1') }}
      <AppLink to="https://hub.docker.com/r/aosc/aosc-os" target="_blank">
        Docker Hub
      </AppLink>
      {{ t('DownloadDetailsDocker.text2') }}
    </p>

    <p>{{ t('DownloadDetailsDocker.text3') }}</p>
    <CopyButton
      :content="`docker pull aosc/aosc-os --platform linux/${archMapDocker[archCode]}`" />
  </div>
</template>

<style scoped></style>
