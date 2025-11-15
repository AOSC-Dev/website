<script setup>
const { t,tm } = useI18n();
const linkValue = tm('allUniversalLink');
</script>

<template>
  <div class="flex flex-col gap-2">
    <p>
      {{ t('DownloadDetailsAppleSiliconInstruction.text1') }}
      <link-standard :link="linkValue.asahiDocumentation" />
      {{ linkValue.periodPoint }}
    </p>
    <p>{{ t('DownloadDetailsAppleSiliconInstruction.text2') }}</p>
    <CopyButton content="curl https://releases.aosc.io/install-asahi | sh" />

    <p>
      {{ t('DownloadDetailsAppleSiliconInstruction.text4') }}
      <link-standard :link="useTIndex(linkValue.local.contact, 2)" />
      {{ t('DownloadDetailsAppleSiliconInstruction.text5') }}
    </p>
  </div>
</template>

<style scoped>
/* For el-descriptions-item */
:deep(td[colspan='1']) {
  min-width: fit-content;
}
</style>
