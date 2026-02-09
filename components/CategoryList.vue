<script lang="ts" setup>
const { locale, defaultLocale } = useI18n();

const props = defineProps<{
  category?: string;
  filters?: Array<{ key: string; value: string }>;
  limit?: number;
}>();

const fetchCategoryData = async (
  localeValue: typeof locale.value,
  limit?: number
) =>
  await useAsyncData(
    `${localeValue}:CategoryList:${props.category}:${limit}:${props.filters?.map((obj) => `${obj.key}-${obj.value}`).join('--')}`,
    queryCollectionCategory(
      localeValue,
      props.category,
      limit,
      props.filters
    )
  );

const data: Awaited<ReturnType<typeof fetchCategoryData>>['data'] = ref([]);
const error = ref();
const status = ref();

// Nuxt content 不支持一次请求多个 collection 的内容
// 先请求默认语言对应的列表，作为完整列表或 fallback 部分
const dataDefaultLocale = await fetchCategoryData(defaultLocale, props.limit);
data.value = dataDefaultLocale.data.value;
error.value = dataDefaultLocale.error.value;
status.value = dataDefaultLocale.status.value;

if (
  dataDefaultLocale.data.value &&
  // 长度不够再请求当前语言对应的列表补足
  dataDefaultLocale.data.value.length < (props.limit ?? Infinity) &&
  locale.value !== defaultLocale
) {
  const dataCurrentLocale = await fetchCategoryData(
    locale.value,
    props.limit ? props.limit - dataDefaultLocale.data.value.length : undefined
  );
  if (dataCurrentLocale.data.value) {
    // 去重，当前语言优先
    const pathMap = new Map<string, NonNullable<typeof data.value>[number]>();
    for (const item of dataCurrentLocale.data.value)
      pathMap.set(item.path, item);
    for (const item of data.value ?? [])
      if (!pathMap.has(item.path)) pathMap.set(item.path, item);

    // 根据时间排序
    data.value = Array.from(pathMap.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  error.value = dataCurrentLocale.error.value;
  status.value = dataCurrentLocale.status.value;
}
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
            [{{ new Date(item.date).toLocaleDateString('en-CA') }}]
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
