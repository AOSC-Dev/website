<script setup>
defineProps({
  title: { type: String, required: true },
  titleUrl: { type: String, default: undefined },
  rightText: { type: String, default: undefined },
  rightUrl: { type: String, default: undefined },
  showRightChevron: { type: Boolean },
  rssUrl: { type: String, default: undefined }
});
</script>

<template>
  <div class="category-second">
    <span>
      <span v-if="titleUrl === undefined">
        {{ title }}
      </span>
      <AppLink v-else :to="titleUrl" class="no-underline">{{ title }}</AppLink>
      <span v-if="rssUrl !== undefined">
        |
        <a :href="rssUrl">RSS</a>
      </span>
    </span>

    <span v-if="rightText !== undefined">
      <span v-if="rightUrl === undefined">
        {{ rightText }}
      </span>
      <AppLink v-else class="" :to="rightUrl">
        {{ rightText }}
      </AppLink>
      <!-- 右箭头 -->
      <Icon
        v-if="showRightChevron"
        name="bi-chevron-double-right"
        class="align-[-0.1em]" />
    </span>
  </div>
</template>

<style scoped></style>
