<script setup>
const route = useRoute();
defineProps({
  navigationList: {
    type: Array,
    required: true
  },
  linkClass: {
    type: String,
    default: 'text-link'
  },
  spanClass: {
    type: String
  }
});
</script>

<template>
  <span
    v-for="(item, index) in navigationList"
    :key="`${route.path}-${getSpecifiedTitle(item)}-${index}`">
    <span v-if="index !== 0" :class="spanClass">
      <slot>|</slot>
    </span>
    <!-- 如果没有 url 则一定是 thisPageXXX 此时引用 route.path 和 item.hash 即可 
     如果有 url 但没有 hIndex 直接引用 item.url ; 如果还有 hIndex 则 添加 hash 进去。 -->
    <span v-if="item.notLink">{{ item.title }}</span>
    <AppLink
      v-else
      :to="
        item.url
          ? Number.isFinite(item.hIndex)
            ? `${item.url}${item.hash[item.hIndex]}`
            : item.url
          : `${route.path.replace(/\/+$/, '')}${item.hash}`
      "
      :class="linkClass">
      {{ getSpecifiedTitle(item) }}
    </AppLink>
  </span>
</template>

<style scoped></style>
