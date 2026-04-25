<script setup>
const { t } = useI18n();
// const linkValue = tm('allUniversalLink');
const newsLimit = 10;
useHead({
  title: t('news.index.headingMain'),
  link: [
    { rel: 'alternate', type: 'application/rss+xml', title: t('news.index.headingMain'), href: '/news/feed/all.xml' },
    { rel: 'alternate', type: 'application/rss+xml', title: t('news.index.headingAdvisories'), href: '/news/feed/advisories.xml' },
    { rel: 'alternate', type: 'application/rss+xml', title: t('news.index.headingNews'), href: '/news/feed/news.xml' },
    { rel: 'alternate', type: 'application/rss+xml', title: t('news.index.headingPeriodicals'), href: '/news/feed/journals.xml' },
    { rel: 'alternate', type: 'application/rss+xml', title: t('news.index.headingMinutes'), href: '/news/feed/minutes.xml' }
  ]
});
const filters = (newsCategory) => [{ key: 'categories', value: `%"${newsCategory}"%` }];
</script>

<template>
  <div class="flex flex-wrap *:w-1/2">
    <div>
      <category-second
        :title="t('news.index.headingAdvisories')"
        rss-url="/news/feed/advisories.xml"
        :right-text="t('news.index.seeAll')"
        right-url="/news/list/advisories"
        :show-right-chevron="true" />
      <category-list
        category="news"
        :limit="newsLimit"
        :filters="filters('advisories')"
        class="overflow-y-auto" />
    </div>
    <div class="">
      <category-second
        :title="t('news.index.headingNews')"
        rss-url="/news/feed/news.xml"
        :right-text="t('news.index.seeAll')"
        right-url="/news/list/news"
        class="border-l border-l-white"
        :show-right-chevron="true" />
      <category-list
        category="news"
        :limit="newsLimit"
        :filters="filters('news')"
        class="theme-border-secondary overflow-y-auto border-l-[1px]" />
    </div>
    <div>
      <category-second
        :title="t('news.index.headingPeriodicals')"
        rss-url="/news/feed/journals.xml"
        :right-text="t('news.index.seeAll')"
        right-url="/news/list/journals"
        :show-right-chevron="true" />
      <category-list
        category="news"
        :limit="newsLimit"
        :filters="filters('journals')"
        class="overflow-y-auto" />
    </div>

    <div class="">
      <category-second
        :title="t('news.index.headingMinutes')"
        rss-url="/news/feed/minutes.xml"
        :right-text="t('news.index.seeAll')"
        right-url="/news/list/minutes"
        :show-right-chevron="true"
        class="border-l border-l-white" />
      <category-list
        category="news"
        :limit="newsLimit"
        :filters="filters('minutes')"
        class="theme-border-secondary overflow-y-auto border-l-[1px]" />
    </div>
  </div>
</template>

<style scoped></style>
./components/Header.vue
