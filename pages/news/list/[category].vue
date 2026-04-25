<script setup>
const route = useRoute();
const { t } = useI18n();

const title = computed(() => {
  switch (route.params.category) {
    case 'advisories':
      return t('news.index.headingAdvisories');
    case 'news':
      return t('news.index.headingNews');
    case 'journals':
      return t('news.index.headingPeriodicals');
    case 'minutes':
      return t('news.index.headingMinutes');
    default:
      return '';
  }
});
useHead({
  title: title,
  link: [
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      title: title,
      href: `/news/feed/${route.params.category}.xml`
    }
  ]
});

const categoryFilter = computed(() => [
  { key: 'categories', value: `%"${route.params.category}"%` }
]);
</script>

<template>
  <div>
    <category-second
      :title="title"
      :rss-url="`/news/feed/${route.params.category}.xml`"
      class="border-r-solid border-r-white" />
    <category-list category="news" :filters="categoryFilter" />
  </div>
</template>

<style scoped></style>
./components/Header.vue
