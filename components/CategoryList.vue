<script lang="ts" setup>
const { locale } = useI18n();

const props = defineProps<{
  category?: string;
  filters?: Array<{ key: string; value: string }>;
  limit?: number;
}>();

const { data, error, status } = await useAsyncData(
  `${locale.value}:CategoryList:${props.category}:${props.limit}:${props.filters?.map((obj) => `${obj.key}-${obj.value}`).join('--')}`,
  queryCollectionCategory(
    locale.value,
    props.category,
    props.limit,
    props.filters
  )
);
</script>

<template>
  <div>
    <div v-if="status === 'error'">
      {{ error }}
    </div>
    <div v-else-if="status === 'success'" class="flex flex-col">
      <div v-for="item in data" :key="item.path" class="newslist-item">
        <NuxtLinkLocale
          v-if="new Date() > new Date(item.date)"
          :to="item.path"
          class="flex h-[2rem] cursor-pointer pl-6 leading-8 hover:bg-leftbar-bg">
          <span class="flex-1 truncate">
            {{ item.title }}
          </span>
          <span v-if="item.date" class="pr-6">
            [{{ item.date.split('T')[0] }}]
          </span>
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>

<style scoped>
.newslist-item:nth-child(2n) {
  background-color: #fefaf6;
}
.newslist-item:nth-child(2n + 1) {
  background-color: white;
}
</style>
