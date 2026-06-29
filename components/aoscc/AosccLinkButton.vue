<script setup>
import AppLink from '../app/AppLink.vue';
const props = defineProps({ ...AppLink.props });
</script>

<template>
  <AppLink
    v-bind="props"
    class="theme-bg-color-secondary-primary override-heti cursor-pointer overflow-hidden px-4 py-2 text-white hover:no-underline">
    <slot />
  </AppLink>
</template>

<style scoped>
.override-heti {
  color: unset !important;
}

.override-heti:hover {
  padding-block-end: unset !important;
  border-block-end: unset !important;
}
</style>
