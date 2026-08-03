<script setup>
import { computed } from 'vue';
import AppLink from '../app/AppLink.vue';

const props = defineProps({
  ...AppLink.props,
  variant: {
    type: String,
    default: 'default',
  },
});

const buttonClass = computed(() => {
  if (props.variant === 'green') {
    return 'aoscc-btn-green';
  }
  return 'theme-bg-color-secondary-primary';
});
</script>

<template>
  <AppLink
    v-bind="props"
    :class="[
      buttonClass,
      'override-heti cursor-pointer overflow-hidden px-4 py-2 text-white hover:no-underline'
    ]">
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

.aoscc-btn-green {
  background-color: #16a34a !important;
  transition: background-color 0.2s ease;
}

.aoscc-btn-green:hover {
  background-color: #15803d !important;
}
</style>
