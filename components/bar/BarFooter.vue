<script setup>
const nowYear = new Date().getFullYear();

const { tm, t } = useI18n();
const linkValue = tm('allUniversalLink');
const navigationList = [
  ...Object.values(linkValue.barFooter.navigation),
  useTIndex(linkValue.local.home, 1)
];
</script>

<template>
  <div
    class="theme-bg-color-secondary-static footerbar flex w-full justify-center py-[2px] text-white">
    <div class="m-auto">
      <span class="pl-[0.5rem]">
        &copy; {{ t('BarFooter.communityName') }}&nbsp;&nbsp;&nbsp;&nbsp;2011 -
        {{ nowYear }}
      </span>
      <span class="mx-[20px]">|</span>
      <AccordionNavigation
        :navigation-list="navigationList"
        span-class="mx-[20px]"
        link-class="cursor-pointer" />
    </div>
  </div>
</template>

<style scoped>
.footerbar {
  box-shadow: 0px 0px 8px #000000e0;
}

@media (max-width: 960px) {
  .footerbar .content-container {
    width: 100%;
    min-width: 0;
    overflow: auto;
  }
}
</style>
