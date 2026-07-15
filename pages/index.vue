<script setup>
const { t, tm } = useI18n();
useHead({ title: t('index.title') });

const columnBorderlessList = [
  '/icons/key-enter.min.svg',
  '/icons/document-properties.min.svg',
  '/icons/tools-wizard.min.svg',
  '/icons/love.min.svg'
];
</script>

<template>
  <div class="flex">
    <div class="w-[62.5%] bg-content-main-bg p-0">
      <app-link to="/aoscc/2026" class="flex w-full">
        <img class="imgScale1 w-full" src="/jumbotron/main1.webp" />
      </app-link>
      <!-- 资讯要点 -->
      <div>
        <CategorySecond :title="t('index.newsHighlights')" />
        <div>
          <CategoryList
            category="news"
            :limit="6"
            :filters="[{ key: 'home', value: 1 }]" />
          <div
            class="px-[15px] py-[10px] text-right leading-6 font-[12pt] text-link">
            <link-standard-test :title="t('index.viewNews')" url="/news" />
          </div>
        </div>
        <CategorySecond :title="$t('index.securityAdvisories')" />
        <div>
          <CategoryList
            category="news"
            :limit="4"
            :filters="[{ key: 'path', value: '%patch-tuesday%' }]" />
          <div
            class="px-[15px] py-[10px] text-right leading-6 font-[12pt] text-link">
            <link-standard-test :title="$t('index.viewSecurityAdvisories')" url="/news/list/advisories" />
          </div>
        </div>
      </div>
      <!-- 专栏 -->
      <div id="topic">
        <CategorySecond :title="t('index.indexSpecialTitle')" />
        <article class="p-[1em] leading-6">
          <div
            v-for="(item, index) in tm('index.specialColumns')"
            :key="item.title"
            class="flex items-center pb-[15px]">
            <div class="mr-[20px] ml-[0.5em] basis-[50px]">
              <img :src="columnBorderlessList[index]" />
            </div>
            <div class="flex-1 p-0">
              <div class="text-[14pt] font-semibold">{{ item.title }}</div>
              <div class="text-[12pt]">{{ item.description }}</div>
            </div>
          </div>
          <div class="px-[15px] text-right text-[12pt] leading-6">
            <link-standard-test
              :title="t('index.aoscRightForMe')"
              url="/aosc-os/right-for-me" />
          </div>
        </article>
      </div>
    </div>
    <BarRight />
  </div>
</template>

<style scoped>
.imgScale1 {
  aspect-ratio: 16/11;
}
</style>
