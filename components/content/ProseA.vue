<template>
  <AppLink
    :href="props.href"
    :target="props.target"
  >
    <slot />
  </AppLink>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

// https://github.com/nuxt-content/mdc/blob/main/src/runtime/components/prose/ProseA.vue
const props = defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined>,
    default: undefined,
    required: false,
  },
})
</script>
