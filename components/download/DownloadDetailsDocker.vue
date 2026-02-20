<script setup>
const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-2">
    <p>
      {{ t('DownloadDetailsDocker.text1') }}
      <AppLink to="https://hub.docker.com/r/aosc/aosc-os" target="_blank">Docker Hub</AppLink>
      {{ t('DownloadDetailsDocker.text2') }}
    </p>

    <p>{{ t('DownloadDetailsDocker.text3') }}</p>
    <CopyButton :content="`docker pull aosc/aosc-os`"/>
  </div>
</template>

<style scoped></style>
