<script lang="ts" setup>
import { useSearchStore } from '~/stores/search';

const props = defineProps<{ defaultCategory?: typeof queryCategory.value }>();

const {
  category: queryCategory,
  status,
  result
} = storeToRefs(useSearchStore());
if (props.defaultCategory) queryCategory.value = props.defaultCategory;
</script>

<template>
  <div
    class="absolute z-10 mt-1 min-w-125 border-2 border-(--primary) bg-white px-2 pb-2 shadow-md">
    <ElTabs v-model="queryCategory" class="px-2">
      <ElTabPane
        v-for="category in Object.entries($tm('search.categories'))"
        :key="category[0]"
        :label="category[1]"
        :name="category[0]" />
    </ElTabs>
    <ul
      v-if="status === 'success' && result?.hits.length"
      class="u:bg-(--primary) mt-2 max-h-150 max-w-125 overflow-auto">
      <!--
      <NuxtLinkLocale
        v-if="queryState === 'oma'"
        to="/support/software#oma"
        class="hover:no-underline">
        <div class="border-2 border-(--primary) p-1 hover:bg-[#eee]">
          <div>这里可以是特殊的提示</div>
          <div>前往 oma 版块 →</div>
        </div>
      </NuxtLinkLocale>
      -->
      <li
        v-for="r in result?.hits"
        :key="r.id"
        class="px-2 py-1 hover:bg-[#eee]">
        <NuxtLinkLocale :to="r.id">
          <span v-for="title in r.titles" :key="title">{{ title }} ></span>
          <span v-html="r._formatted?.title" />
        </NuxtLinkLocale>
        <p
          class="truncate text-nowrap text-[#8d8d8d]"
          v-html="r._formatted?.content" />
      </li>
    </ul>
    <div v-else class="w-full p-4 *:m-auto">
      <img
        src="/support/anan/catfish.png"
        width="100px"
        height="100px"
        class="opacity-50" />
    </div>
  </div>
</template>

<style>
:deep(.el-tabs__header) {
  margin: 0;
}
</style>
