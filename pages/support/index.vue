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
    description: '使用各种软件包管理器安安装软件',
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

const faqData = await useAsyncCategoryData(locale.value, 'support/faq', 8);
const newsData = await useAsyncCategoryData(locale.value, 'news', 8);
</script>

<template>
  <div>
    <category-second title="芝士中心" />
    <div class="grid auto-rows-[200px] overflow-hidden *:px-8">
      <div class="flex bg-[#C6DCEC]">
        <img
          :src="ananReactionList[queryState].img"
          class="mr-8 size-36 shrink-0 self-end" />
        <div class="flex grow items-center justify-between">
          <div class="flex-grow gap-4">
            <span class="mb-2 text-xl">
              {{ ananReactionList[queryState].text }}
            </span>
            <div class="mt-2 flex">
              <el-select v-model="queryCategory" large class="max-w-[6.5em]">
                <el-option
                  v-for="category in queryCategoryList"
                  :key="category.path"
                  :label="category.name"
                  :value="category.path" />
              </el-select>
              <div>
                <el-input
                  v-model="query"
                  large
                  inputmode="search"
                  placeholder="请输入文本"
                  class="max-full" />
                <div
                  v-if="results?.length || queryState === 'oma'"
                  class="relative">
                  <!--TODO: investigate z-index?-->
                  <ul
                    class="absolute z-1 w-full border-1 border-(--primary) bg-white px-3 py-1">
                    <NuxtLinkLocale
                      v-if="queryState === 'oma'"
                      to="/support/software#oma"
                      class="hover:no-underline">
                      <div
                        class="border-2 border-(--primary) p-1 hover:bg-[#eee]">
                        <div>这里可以是特殊的提示</div>
                        <div>前往 oma 版块 →</div>
                      </div>
                    </NuxtLinkLocale>
                    <li
                      v-for="result in results?.slice(0, 10)"
                      :key="result.id">
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
          <div class="grid-col-2 grid gap-x-1">
            <div class="col-start-1 text-right">在线帮助主题</div>
            <div class="col-start-1 self-baseline text-right text-2xl">
              1145141
            </div>
            <span class="col-start-2 self-baseline">篇</span>
          </div>
        </div>
      </div>

      <div class="flex items-center bg-[#eee3c4]">
        <img
          src="/download/oma-mascot.svg"
          class="mr-8 size-36 shrink-0 self-end" />
        <div class="grow">
          <div class="mb-2 flex items-center justify-between">
            <div class="text-xl">帮助主题</div>
            <AppLink to="/contact" class="text-black">
              还有高手？联系按安同临时工→
            </AppLink>
          </div>
          <div class="grid grid-cols-3">
            <NuxtLinkLocale
              v-for="category in supportCategoryList"
              :key="category.path"
              :to="category.path"
              class="flex items-center gap-2 px-2 py-1 hover:bg-[#ddd2b4] hover:no-underline">
              <Icon :name="category.icon" size="28" class="shrink-0" />
              <div>
                <div>{{ category.name }}</div>
                <div class="text-[10pt]">{{ category.description }}</div>
              </div>
            </NuxtLinkLocale>
          </div>
        </div>
      </div>

      <div class="flex items-center bg-[#e4cdcd]">
        <img
          src="/support/anan/break.png"
          class="mr-8 size-36 shrink-0 self-end object-contain" />
        <div class="grow">
          <div class="mb-2 flex items-center justify-between">
            <div class="text-xl">常见问题</div>
            <AppLink to="" class="text-black">看看更多常见问题→</AppLink>
          </div>
          <div
            v-if="faqData.status.value === 'success'"
            class="grid w-full grid-flow-col grid-cols-2 grid-rows-4 gap-1">
            <AppLink
              v-for="faqItem in faqData.data.value"
              :key="faqItem.path"
              :to="faqItem.path"
              class="block text-black">
              {{ faqItem.title }}
            </AppLink>
          </div>
        </div>
      </div>

      <div class="flex items-center bg-[#cdcee4]">
        <img
          src="/support/anan/upstream.svg"
          class="mr-8 size-36 shrink-0 self-end" />
        <div class="grow">
          <div class="mb-2 text-xl">最新公告</div>
          <div
            v-if="newsData.status.value === 'success'"
            class="grid grid-flow-col grid-cols-2 grid-rows-4 gap-1">
            <AppLink
              v-for="newsItem in newsData.data.value"
              :key="newsItem.path"
              :to="newsItem.path"
              class="block text-black">
              {{ newsItem.title }}
            </AppLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
