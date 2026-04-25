<script lang="ts" setup>
import { i18nCodeToContent } from '~/i18n/config';
const { locale } = useI18n();
const route = useRoute();
const { search: meiliSearch, result } = useMeiliSearch(
  `_content_${i18nCodeToContent(locale.value)}`
);

const query = ref(route.query?.q?.toString() ?? '');
const queryCategory = ref(route.query?.category?.toString() ?? '/');

const queryCategoryList = [
  { path: '/', name: 'ALL' },
  { path: '/news', name: '新闻' },
  { path: '/support', name: '支持中心' }
];

const ananImgPrefix = '/support/anan/';
type ananReactionType = 'idle' | 'searching' | 'success' | 'failed' | 'oma';
const ananReactionList: Record<
  ananReactionType,
  { text: string; img: string }
> = {
  idle: {
    text: '搜索安安知识库...',
    img: ananImgPrefix + 'tuosai.svg'
  },
  searching: {
    text: '安安正在努力寻找...',
    img: ananImgPrefix + 'afterglow.svg'
  },
  success: {
    text: '安安找到了这些：',
    img: ananImgPrefix + 'success.svg'
  },
  failed: {
    text: '安安没找到...',
    img: ananImgPrefix + 'cry.svg'
  },
  oma: {
    text: '是在找 oma 吗？',
    img: '/download/oma-mascot.svg'
  }
};

// type contentSearchResult = {
//   id: string;
//   title: string;
//   titles: Array<string>;
//   content: string;
//   level: number;
// };

const status = ref<ananReactionType>('idle');
const search = async () => {
  if (!query.value) {
    status.value = 'idle';
    return;
  }
  status.value = 'searching';
  console.log(
    await meiliSearch(query.value, {
      limit: 20,
      attributesToCrop: ['content'],
      attributesToHighlight: ['title', 'content'],
      cropLength: 30,
      highlightPreTag: '<u>',
      highlightPostTag: '</u>'
    })
  );
  if (result.value?.hits.length) status.value = 'success';
  else status.value = 'failed';
};

const queryState: Ref<ananReactionType> = computed(() => {
  if (query.value.toLowerCase().includes('oma')) return 'oma';
  return status.value;
});

onMounted(search);
</script>

<template>
  <div>
    <CategorySecond title="找安 sir" />
    <div class="flex gap-4 m-2">
      <img
        :src="ananReactionList[queryState].img"
        class="size-[150px] shrink-0 self-end" />
      <div class="flex max-w-108 grow flex-col justify-center">
        <span class="text-xl">
          {{ ananReactionList[queryState].text }}
        </span>
        <div class="my-2 flex">
          <ElInput
            v-model="query"
            large
            inputmode="search"
            placeholder="请输入文本"
            class="max-full" />
          <ElButton @click="search">Go</ElButton>
        </div>
        <ElSelect v-model="queryCategory" large class="max-w-[6.5em]">
          <ElOption
            v-for="category in queryCategoryList"
            :key="category.path"
            :label="category.name"
            :value="category.path" />
        </ElSelect>
      </div>
    </div>
    <div v-if="result?.estimatedTotalHits">
      <ul class="">
        <NuxtLinkLocale
          v-if="queryState === 'oma'"
          to="/support/software#oma"
          class="hover:no-underline">
          <div class="border-2 border-(--primary) p-1 hover:bg-[#eee]">
            <div>这里可以是特殊的提示</div>
            <div>前往 oma 版块 →</div>
          </div>
        </NuxtLinkLocale>
        <li
          v-for="r in result?.hits"
          :key="r.id"
          class="px-4 py-2 hover:bg-[#eee]">
          <NuxtLinkLocale :to="r.id">
            <span v-for="title in r.titles" :key="title">{{ title }} > </span>
            <span v-html="r._formatted?.title"></span>
          </NuxtLinkLocale>
          <p
            class="truncate text-nowrap text-[#8d8d8d]"
            v-html="r._formatted?.content"></p>
        </li>
      </ul>
    </div>
  </div>
</template>
