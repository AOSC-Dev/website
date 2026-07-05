<script lang="ts" setup>
defineProps<{ year: number }>();
</script>

<template>
  <div
    :class="`aoscc-banner-bg-${year}`"
    class="relative m-0! px-10 py-6 text-white">
    <div class="absolute bottom-0 mb-10 ml-1 flex gap-4">
      <AosccLinkButton to="https://aoscc.aosc.io" target="_blank">
        报名与签到
      </AosccLinkButton>
      <AosccLinkButton :to="`/aoscc/${year}-schedule`">
        会议日程
      </AosccLinkButton>
      <AosccLinkButton :to="`/aoscc/${year}-guide`">交通和住宿</AosccLinkButton>
    </div>
  </div>
  <ProseH2 id="aoscc-intro" class="mt-0!">AOSCC 简介</ProseH2>
  <p>
    AOSCC
    是我社每年一度的线下聚会，公开邀请社区好友参与。活动期间，社区邀请社区贡献者、高校社团成员和行业代表等分享、交流工作，并组织抽奖、代号投票等趣味活动。近年来，AOSCC
    均由中国高校社团协办，每年吸引超过 100 名与会者参与。
  </p>
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
