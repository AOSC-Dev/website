<script lang="ts" setup>
defineProps<{ year: number }>();
</script>

<template>
  <div
    :class="`aoscc-banner-bg-${year}`"
    class="relative m-0! px-10 py-6 text-white">
    <div class="absolute bottom-0 mb-10 ml-1 flex gap-4">
      <AosccLinkButton to="https://aoscc.aosc.io" target="_blank" variant="green">
        报名与签到
      </AosccLinkButton>
      <AosccLinkButton :to="`/aoscc/${year}`">活动简介</AosccLinkButton>
      <AosccLinkButton :to="`/aoscc/${year}-schedule`">
        会议日程
      </AosccLinkButton>
      <AosccLinkButton :to="`/aoscc/${year}-guide`">交通和住宿</AosccLinkButton>
    </div>
  </div>
</template>

<style scoped>
.aoscc-banner-bg-2025 {
  background-image: url(/aoscc/aoscc-2025-portal-banner.png);
  background-size: 1088px;
  height: calc(var(--spacing) * 70);
}

.aoscc-banner-bg-2026 {
  background-image: url(/aoscc/aoscc-2026-portal-banner.webp);
  background-size: 1088px;
  height: calc(var(--spacing) * 76);
}
</style>

<style>
[class*="aoscc-banner-bg-"] + * {
  margin-top: 0 !important;
  margin-block-start: 0 !important;
}
</style>
