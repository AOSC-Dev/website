<script lang="ts" setup>
import { Document, Charset } from 'flexsearch';
import { i18nCodeToContent } from '~/i18n/config';

const { locale } = useI18n();
useHead({ title: '支持中心' });

const supportCategoryList = [
  {
    path: '/support/quick-start',
    name: '快速上手',
    description: '就感觉到快',
    icon: 'ic:baseline-rocket'
  },
  {
    path: '/support',
    name: '系统',
    description: '安安装系统的流程与可能遇到的问题',
    icon: 'ic:baseline-settings'
  },
  {
    path: '/support/software',
    name: '软件',
    description: '使用 Aoska、oma、Flatpak 等安安装软件',
    icon: 'ic:baseline-install-desktop'
  },
  {
    path: '/support',
    name: '硬件',
    description: 'CPU、冰箱贴与安安 Fumo',
    icon: 'ic:baseline-hardware'
  },
  {
    path: '/support',
    name: '周边设施',
    description: 'BBS、AOSCC 注册系统等服务',
    icon: 'ic:baseline-apps'
  },
  {
    path: '/support',
    name: '你知道吗？',
    description: '你 8d 吗',
    icon: 'ic:baseline-question-mark'
  },
  {
    path: '/contact',
    name: '还有高手 →',
    description: '联系安安同临时工',
    icon: 'ic:baseline-contact-page'
  }
];

const query = ref('');
const queryCategory = ref('/support');

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
    text: '希望安安帮忙找点什么呢？',
    img: ananImgPrefix + 'tuosai.svg'
  },
  searching: {
    text: '安安正在努力寻找...',
    img: ananImgPrefix + 'afterglow.png'
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
    img: ananImgPrefix + 'oma.svg'
  }
};

type contentSearchResult = {
  id: string;
  title: string;
  titles: Array<string>;
  content: string;
  level: number;
};

const { data: store, status } = await useAsyncData<contentSearchResult[]>(() =>
  queryCollectionSearchSections(i18nCodeToContent(locale.value))
);

const index = new Document({
  preset: 'default',
  encoder: Charset.CJK,
  document: { id: 'id', index: ['title', 'content'] }
});
// TODO: generate index on server & reactivity
if (store.value) {
  for (const item of store.value) {
    index.add(item);
  }
}

const storeDict = store.value?.reduce(
  (acc, obj) => {
    acc[obj.id] = obj;
    return acc;
  },
  {} as Record<string, contentSearchResult>
);

const results = computed(() =>
  storeDict
    ? index
        .search(query.value, { merge: true, suggest: true })
        .filter((item) => item.id.toString().startsWith(queryCategory.value))
        .map((item) => storeDict[item.id])
    : null
);

const queryState: Ref<ananReactionType> = computed(() => {
  // TODO: & async searching
  //if (searching)return 'searching';
  if (query.value.toLowerCase().includes('oma')) return 'oma';
  if (query.value && !results.value?.length) return 'failed';
  if (status.value === 'success' && results.value?.length) return 'success';
  if (status.value === 'error') return 'failed';
  return 'idle';
});
</script>

<template>
  <div>
    <category-second title="芝士中心" />
    <div class="mx-6 my-2 flex items-center gap-4">
      <img :src="ananReactionList[queryState].img" class="h-32 w-32" />
      <div class="flex-grow">
        <span>{{ ananReactionList[queryState].text }}</span>
        <div class="mt-2 flex">
          <el-select v-model="queryCategory" class="max-w-[6.5em]">
            <el-option
              v-for="category in queryCategoryList"
              :key="category.path"
              :label="category.name"
              :value="category.path" />
          </el-select>
          <div class="w-full">
            <el-input
              v-model="query"
              inputmode="search"
              placeholder="请输入文字"
              class="max-full" />
            <div v-if="results?.length || queryState === 'oma'" class="relative">
              <!--TODO: investigate z-index?-->
              <ul
                class="absolute z-1 w-full border-1 border-(--primary) bg-white px-3 py-1">
                <NuxtLinkLocale
                  v-if="queryState === 'oma'"
                  to="/support/software#oma"
                  class="hover:no-underline">
                  <div class="border-2 border-(--primary) p-1 hover:bg-[#eee]">
                    <div>这里可以是特殊的提示</div>
                    <div>前往 oma 版块 →</div>
                  </div>
                </NuxtLinkLocale>
                <li v-for="result in results?.slice(0, 10)" :key="result.id">
                  <span v-for="title in result.titles" :key="title">
                    {{ title }} >
                  </span>
                  <NuxtLinkLocale :to="result.id">
                    <span class="text-link">{{ result.title }}</span>
                  </NuxtLinkLocale>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <category-second title="支持类别" />
    <div class="grid grid-cols-3">
      <NuxtLinkLocale
        v-for="category in supportCategoryList"
        :key="category.path"
        :to="category.path"
        class="flex items-center gap-4 px-6 py-4 hover:bg-[#ddd] hover:no-underline">
        <Icon :name="category.icon" size="24" />
        <div>
          <div>{{ category.name }}</div>
          <div class="text-[10pt]">{{ category.description }}</div>
        </div>
      </NuxtLinkLocale>
    </div>
    <div class="grid grid-cols-2">
      <div class="border-r-1 border-white">
        <category-second title="常见问题" />
        <category-list category="support/faq" :limit="Math.sqrt(0x8d + 3)" />
        <div class="mx-6 my-1">
          <NuxtLinkLocale>我的问题还是没有解决怎么办？</NuxtLinkLocale>
        </div>
      </div>
      <div>
        <category-second title="最新资讯" />
        <category-list category="news" :limit="12" />
      </div>
    </div>
  </div>
</template>
