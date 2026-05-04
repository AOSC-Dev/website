<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import SearchResult from '~/components/search/SearchResult.vue';
import { useSearchStore } from '~/stores/search';
useHead({ title: '支持中心' });
const { locale, tm } = useI18n();

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

// #region search
const searchStore = useSearchStore();
const { query, category: queryCategory, status } = storeToRefs(searchStore);
queryCategory.value = 'support';
watch([query, queryCategory], () => searchStore.search(locale.value));

const searchRef = ref();
const showSearchDetail = ref(false);
const handleSearchFocus = () => (showSearchDetail.value = true);
onClickOutside(searchRef, () => (showSearchDetail.value = false));

const ananImgPrefix = '/support/anan/';
const ananReactionList: Record<
  typeof status.value,
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
  }
};
// #endregion

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
          :src="ananReactionList[status].img"
          class="anan-outline mx-(--anan-header-mx) size-[calc(var(--left-anan-width)-2*var(--anan-header-mx))] shrink-0 self-end" />
        <div class="flex max-w-108 grow flex-col justify-center">
          <span class="text-xl">{{ ananReactionList[status].text }}</span>
          <div ref="searchRef" class="mt-2">
            <input
              v-model="query"
              type="search"
              placeholder="请输入文本"
              class="bg-white bg-[url(/support/search.svg)] bg-size-[18px] bg-position-[left_8px_center] bg-no-repeat py-[6px] pr-1 pl-8 leading-0"
              @focus="handleSearchFocus" />
            <SearchResult v-if="showSearchDetail" default-category="support" />
          </div>
        </div>

        <!-- Tips panel - Uses TIPS_BREAKPOINT (1390px) -->
        <div
          :class="{
            'right-0!': showTips === true,
            '-right-88!': showTips === false
          }"
          class="absolute -right-88 z-2 flex h-full w-108 flex-row bg-[url(/support/y2k-gradient.svg)] bg-cover text-white transition-[right] duration-300 ease-out min-[1390px]:right-0">
          <!-- Toggle button - Uses TIPS_BREAKPOINT (1390px) -->
          <button
            class="absolute top-4 left-9 aspect-square size-7 cursor-pointer bg-[#5387c0] hover:bg-[#6ca1d9] min-[1390px]:rotate-180"
            :class="{
              'rotate-180!': showTips === true,
              'rotate-0!': showTips === false
            }"
            @click="toggleTips">
            <Icon
              name="material-symbols:keyboard-double-arrow-left"
              size="28px" />
          </button>
          <div class="flex grow flex-col gap-2 px-40 py-10 pr-10">
            <div
              class="shrink-0 text-[1.3rem] text-shadow-[1.5px_1.5px_0px_#033180]">
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
        class="bg-linear-to-b from-[#EEE3C4] to-[#DDD2B4]">
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
        class="bg-linear-to-b from-[#E4CDCD] to-[#CEB9B9]">
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
        class="bg-linear-to-b from-[#CDCEE4] to-[#BEBFD3]">
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
  /* cqw resolves against content-container */
  --left-anan-width: clamp(11rem, 17cqw, 13rem);
  --anan-header-mx: clamp(0.42rem, 0.66cqw, 0.5rem);
  --anan-section-mx: clamp(1.69rem, 2.64cqw, 2rem);
}

:deep(.anan-outline) {
  filter: url(#support-anan-outline);
  clip-path: inset(-10px -10px 0 -10px);
}
</style>
