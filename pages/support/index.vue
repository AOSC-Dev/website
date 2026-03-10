<script lang="ts" setup>
import { Document, Charset } from 'flexsearch';
import { i18nCodeToContent } from '~/i18n/config';

const { locale, tm } = useI18n();
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

// #region tips
// Use CSS to set state before hydration
const TIPS_BREAKPOINT = 1390;
const showTips: Ref<boolean | null> = ref(null);
const toggleTips = () => {
  showTips.value =
    showTips.value === null
      ? !window.matchMedia(`(min-width: ${TIPS_BREAKPOINT}px)`).matches
      : !showTips.value;
};
const tipsList = tm('support.index.tips') as {
  title: string;
  content: string;
}[];
const tipIndex = ref(0);
// #endregion

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
  <div class="support-center">
    <category-second title="芝士中心" />
    <div class="overflow-hidden">
      <FilterOutline filter-id="support-anan-outline" />

      <div class="relative flex h-72 bg-[#C6DCEC] pr-8">
        <img
          :src="ananReactionList[queryState].img"
          class="anan-outline mx-[0.5rem] size-[calc(var(--left-anan-width)-2*0.5rem)] shrink-0 self-end" />
        <div class="flex max-w-108 grow flex-col justify-center">
          <span class="text-xl">
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
            <div class="grow">
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
                  class="absolute z-1 w-full border-1 border-(--primary) bg-white pl-6 pr-2 py-1 list-disc">
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

        <!-- Tips panel - Uses TIPS_BREAKPOINT (1390px) -->
        <div
          :class="{
            '!right-0': showTips === true,
            '!-right-88': showTips === false
          }"
          class="absolute -right-88 z-2 flex h-full w-108 flex-row text-white transition-[right] duration-300 ease-out min-[1390px]:right-0">
          <!-- Toggle button - Uses TIPS_BREAKPOINT (1390px) -->
          <button
            class="absolute top-4 left-9 aspect-square size-7 cursor-pointer bg-[#5387c0] hover:bg-[#6ca1d9] min-[1390px]:rotate-180"
            :class="{
              '!rotate-180': showTips === true,
              '!rotate-0': showTips === false
            }"
            @click="toggleTips">
            <Icon
              name="material-symbols:keyboard-double-arrow-left"
              size="28px" />
          </button>
          <img
            src="/support/y2k-gradient.svg"
            class="mr-[-0.5px] aspect-[108.5/264] h-full" />
          <div class="flex grow flex-col gap-2 bg-[#5387c0] px-10 py-10">
            <div class="shrink-0 text-[1.3rem]">
              {{ tipsList[tipIndex]?.title }}
            </div>
            <div class="grow overflow-y-auto text-[0.9rem] whitespace-pre-line">
              {{ tipsList[tipIndex]?.content }}
            </div>
            <div
              class="flex shrink-0 flex-row items-center justify-end gap-2 leading-5">
              <button
                class="h-4 cursor-pointer"
                @click="
                  tipIndex = (tipIndex + tipsList.length - 1) % tipsList.length
                ">
                <Icon name="material-symbols:arrow-back-ios-new" size="16" />
              </button>
              <span>{{ tipIndex + 1 }} / {{ tipsList.length }}</span>
              <button
                class="h-4 cursor-pointer"
                @click="
                  tipIndex = (tipIndex + tipsList.length + 1) % tipsList.length
                ">
                <Icon name="material-symbols:arrow-forward-ios" size="16" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <SupportSection
        img-src="/download/oma-mascot.svg"
        img-class="anan-outline"
        class="bg-gradient-to-b from-[#EEE3C4] to-[#DDD2B4]">
        <SupportSectionHeader
          title="帮助主题"
          link-to="/contact"
          link-text="还有高手？联系按安同临时工" />
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
      </SupportSection>

      <SupportSection
        img-src="/support/anan/break.png"
        img-class="anan-outline object-contain"
        class="bg-gradient-to-b from-[#E4CDCD] to-[#CEB9B9]">
        <SupportSectionHeader
          title="常见问题"
          link-to="/support/faq"
          link-text="看看更多常见问题" />
        <SupportLinkGrid
          :items="
            faqData.status.value === 'success' ? faqData.data.value : null
          " />
      </SupportSection>

      <SupportSection
        img-src="/support/anan/upstream.svg"
        img-class="anan-outline"
        class="bg-gradient-to-b from-[#CDCEE4] to-[#BEBFD3]">
        <SupportSectionHeader
          title="最新公告"
          link-to="/news"
          link-text="查看更多公告" />
        <SupportLinkGrid
          :items="
            newsData.status.value === 'success' ? newsData.data.value : null
          " />
      </SupportSection>
    </div>
  </div>
</template>

<style scoped>
.support-center {
  --left-anan-width: 13rem;
}

:deep(.anan-outline) {
  filter: url(#support-anan-outline);
  clip-path: inset(-10px -10px 0 -10px);
}
</style>
